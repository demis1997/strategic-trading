// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { IERC4626 } from "@openzeppelin/contracts/interfaces/IERC4626.sol";

import { ITransferStrategy } from "./interfaces/ITransferStrategy.sol";
import { IVaultsRegistry } from "./interfaces/IVaultsRegistry.sol";
import { BaseAggregatorToken } from "./BaseAggregatorToken.sol";
// import "hardhat/console.sol";

contract AggregatorToken is BaseAggregatorToken {
    DepositFailureMode public depositFailureMode;
    WithdrawalMode public withdrawalMode;

    uint8 private _scalingFactor;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    mapping(address account => mapping(address spender => uint256)) private _allowances;
    mapping(address holder => Portfolio) private userPortfolios;

    function initialize(
        address underlyingAsset_,
        address vaultsRegistry_,
        address ownerAddress_,
        string memory name_,
        string memory symbol_
    ) external initializer {
        _checkZeroAddress(underlyingAsset_, "underlyingAsset_");
        _checkZeroAddress(vaultsRegistry_, "vaultsRegistry_");
        _checkZeroAddress(ownerAddress_, "ownerAddress_");
        _checkEmptyString(name_, "name_");
        _checkEmptyString(symbol_, "symbol_");

        // Initialize inherited contracts and state
        __Pausable_init();
        __AccessControl_init();

        // Grant the roles to the specified owner
        _grantRole(FEE_MANAGER_ROLE, ownerAddress_);
        _grantRole(LYSADMIN_MANAGER_ROLE, ownerAddress_);
        _grantRole(VALUATIONS_MANAGER_ROLE, ownerAddress_);
        _grantRole(VAULTS_MANAGER_ROLE, ownerAddress_);
        _grantRole(DEFAULT_ADMIN_ROLE, ownerAddress_);

        // Set name and symbol
        _name = name_;
        _symbol = symbol_;
        _scalingFactor = 18;

        // Set master token and vault registry addresses
        underlyingAsset = underlyingAsset_;
        vaultsRegistry = vaultsRegistry_;
    }

    //*************************
    // GETTERS
    //*************************

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the default value returned by this function, unless
     * it's overridden.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account_) public view virtual returns (uint256) {
        return userPortfolios[account_].currentBalance;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev Returns the exchange rate of the token, calculated as the ratio of total supply to underlying value.
     * @return uint256 The exchange rate of the token.
     */
    function exchangeRate() external view returns (uint256) {
        if (_totalSupply == 0) {
            return 0;
        }
        return underlyingValue / _totalSupply;
    }

    /**
     * @dev Returns the address of the underlying asset.
     * @return address The address of the underlying asset.
     */
    function getUnderlyingAsset() external view returns (address) {
        return underlyingAsset;
    }

    /**
     * @dev Returns the list of vaults with a non-zero balance for a given address.
     * @param tokenHolder_ The address of the user whose vaults are being queried.
     * @return vaults An array of vault addresses with non-zero balance.
     */
    function vaultsOf(address tokenHolder_) external view returns (address[] memory vaults) {
        return userPortfolios[tokenHolder_].vaults;
    }

    /**
     * @dev Returns the number of vaults in a user's portfolio.
     * @param tokenHolder_ The address of the user whose number of vaults is being queried.
     * @return uint The number of vaults in the user's portfolio.
     */
    function numberOfVaults(address tokenHolder_) public view returns (uint) {
        return userPortfolios[tokenHolder_].vaults.length;
    }

    /*
        "current" denominated funtions read on underlyin vaults and update protfolio references.
    */

    /**
     * @dev Retrieves the current shares per vault for a user's portfolio.
     * @param tokenHolder_ The address of the user whose portfolio is being queried.
     * @return vaults An array of vault addresses.
     * @return shares An array of the current shares in each vault.
     */
    function currentSharesPerVault(
        address tokenHolder_
    ) external view returns (address[] memory vaults, uint256[] memory shares) {
        Portfolio storage portfolio = userPortfolios[tokenHolder_];
        uint256 length = portfolio.vaults.length;

        vaults = new address[](length);
        shares = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address vault = portfolio.vaults[i];
            vaults[i] = vault;
            shares[i] = portfolio.sharesPerVault[vault];
        }

        return (vaults, shares);
    }

    /**
     * @dev Retrieves the current asset values per vault for a user's portfolio by querying the vaults.
     * @param tokenHolder_ The address of the user whose portfolio is being queried.
     * @return vaults An array of vault addresses.
     * @return assets An array of the current assets in each vault.
     */
    function currentAssetsPerVault(
        address tokenHolder_
    ) external view returns (address[] memory vaults, uint256[] memory assets) {
        Portfolio storage portfolio = userPortfolios[tokenHolder_];
        uint256 length = portfolio.vaults.length;

        vaults = new address[](length);
        assets = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address vault = portfolio.vaults[i];
            vaults[i] = vault;
            uint256 shares = portfolio.sharesPerVault[vault];
            assets[i] = IERC4626(vault).convertToAssets(shares);
        }

        return (vaults, assets);
    }

    /*
        "last" denominated funtions do not read on underlying vaults, instead is read just in portfolio manager contract.
    */

    /**
     * @dev Retrieves the last recorded shares per vault for a user's portfolio without querying the vaults.
     * @param tokenHolder_ The address of the user whose portfolio is being queried.
     * @return vaults An array of vault addresses.
     * @return shares An array of the last recorded shares in each vault.
     */
    function lastSharesPerVault(
        address tokenHolder_
    ) external view returns (address[] memory vaults, uint256[] memory shares) {
        Portfolio storage portfolio = userPortfolios[tokenHolder_];
        uint256 length = portfolio.vaults.length;

        vaults = new address[](length);
        shares = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address vault = portfolio.vaults[i];
            vaults[i] = vault;
            shares[i] = portfolio.sharesPerVault[vault];
        }

        return (vaults, shares);
    }

    /**
     * @dev Retrieves the last recorded asset values per vault for a user's portfolio without querying the vaults.
     * @param tokenHolder_ The address of the user whose portfolio is being queried.
     * @return vaults An array of vault addresses.
     * @return assets An array of the last recorded assets in each vault.
     */
    function lastAssetsPerVault(
        address tokenHolder_
    ) external view returns (address[] memory vaults, uint256[] memory assets) {
        Portfolio storage portfolio = userPortfolios[tokenHolder_];
        uint256 length = portfolio.vaults.length;

        vaults = new address[](length);
        assets = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address vault = portfolio.vaults[i];
            vaults[i] = vault;
            assets[i] = portfolio.assetsPerVault[vault];
        }

        return (vaults, assets);
    }

    //*************************
    // USER
    //*************************

    /**
     * @dev See {IERC20-approve}.
     */
    function approve(address spender, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value, true);
        return true;
    }

    /**
     * @dev See {IERC20-transfer}.
     */
    function transfer(address to, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     */
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    /**
     * @notice Deposits the specified amounts into multiple vaults.
     * @param receiver_ The address to credit the shares.
     * @param vaults_ The list of vault addresses.
     * @param values_ The list of amounts to deposit into each vault.
     * @param totalValue_ The total amount of underlying assets to deposit.
     * @return mintedShares The total amount of shares minted.
     */
    function deposit(
        address receiver_,
        address[] calldata vaults_,
        uint256[] calldata values_,
        uint256 totalValue_
    ) external override whenNotPaused nonReentrant returns (uint256) {
        _checkZeroAddress(receiver_, "receiver_");
        _checkZeroAmount(totalValue_, "totalValue_");
        _validateArgumentsLength(vaults_, values_);

        _updatePortfolioValuation(receiver_);

        IERC20(underlyingAsset).transferFrom(_msgSender(), address(this), totalValue_);

        (
            uint256[] memory mintedShares,
            uint256 totalMintedShares,
            uint256 distributedFunds
        ) = _distributeDeposits(receiver_, vaults_, values_);

        if (distributedFunds != totalValue_) revert WrongDepositValues();

        unchecked {
            underlyingValue += distributedFunds;
        }

        _updateUserPortfolio(receiver_, totalMintedShares, distributedFunds, true);

        emit Deposit(_msgSender(), receiver_, vaults_, values_, mintedShares, totalMintedShares);
        return totalMintedShares;
    }

    /**
     * @notice Withdraws the specified amounts from multiple vaults.
     * @param vaults_ The list of vault addresses.
     * @param assets_ The list of amounts to withdraw from each vault.
     * @return withdrawnFunds The total amount of funds withdrawn.
     */
    function withdraw(
        address[] calldata vaults_,
        uint256[] calldata assets_,
        uint256
    ) external override whenNotPaused nonReentrant returns (uint256) {
        _validateArgumentsLength(vaults_, assets_);

        _updatePortfolioValuation(_msgSender());

        (
            uint256[] memory burnedShares,
            uint256 totalBurnedShares,
            uint256 withdrawnFunds
        ) = _distributeWithdrawals(_msgSender(), vaults_, assets_);

        // if (_checkSlippage(totalBurnedShares, withdrawnFunds, maxSlippage))
        //     revert BrokeSlippage();

        underlyingValue -= withdrawnFunds;
        _updateUserPortfolio(_msgSender(), totalBurnedShares, withdrawnFunds, false);

        IERC20(underlyingAsset).transfer(_msgSender(), withdrawnFunds);

        emit Withdrawal(
            address(this),
            _msgSender(),
            vaults_,
            assets_,
            burnedShares,
            withdrawnFunds
        );

        return withdrawnFunds;
    }

    /**
     * @dev External function to update the valuation of a user's portfolio.
     * @param tokenHolder_ The address of the user whose portfolio is being updated.
     * @return bool Returns true if the operation is successful.
     */
    function updatePortfolioValuation(address tokenHolder_) external returns (bool) {
        _checkZeroAddress(tokenHolder_, "tokenHolder_");
        return _updatePortfolioValuation(tokenHolder_);
    }

    /**
     * @dev Gets the last exchange rate of the user's portfolio, calculated as the ratio of current underlying value to current balance.
     * @param tokenHolder_ The address of the user whose portfolio exchange rate is being queried.
     * @return uint256 The exchange rate of the user's portfolio.
     */
    function getPortfolioLastExchangeRate(address tokenHolder_) external view returns (uint256) {
        _checkZeroAddress(tokenHolder_, "tokenHolder_");
        Portfolio storage portfolio = userPortfolios[tokenHolder_];
        if (portfolio.currentBalance == 0) {
            return 0;
        }

        return (portfolio.currentUnderlyingValue * 10 ** _scalingFactor) / portfolio.currentBalance;
    }

    //*************************
    // INTERNAL
    //*************************

    /**
     * @dev Checks if a vault is active in the registry.
     * @param vault_ The address of the vault.
     * @return bool True if the vault is active, false otherwise.
     */
    function _isVaultActive(address vault_) internal view returns (bool) {
        return IVaultsRegistry(vaultsRegistry).isVaultActive(vault_);
    }

    // function _checkSlippage(uint256 shares, uint256 funds, uint256 maxSlippage) internal view returns (bool) {
    //     return false;
    // }

    /**
     * @dev Approves the spender to transfer up to the specified value of the owner's tokens.
     * @param owner The address of the token owner.
     * @param spender The address allowed to spend the owner's tokens.
     * @param value The maximum amount of tokens the spender is allowed to transfer.
     * @param emitEvent Boolean indicating whether to emit the Approval event.
     */
    function _approve(
        address owner,
        address spender,
        uint256 value,
        bool emitEvent
    ) internal virtual {
        if (owner == address(0)) {
            revert ERC20InvalidApprover(address(0));
        }
        if (spender == address(0)) {
            revert ERC20InvalidSpender(address(0));
        }
        _allowances[owner][spender] = value;
        if (emitEvent) {
            emit Approval(owner, spender, value);
        }
    }

    /**
     * @dev Spends the specified value from the owner's allowance for the spender.
     * @param owner The address of the token owner.
     * @param spender The address allowed to spend the owner's tokens.
     * @param value The amount of tokens to spend from the allowance.
     */
    function _spendAllowance(address owner, address spender, uint256 value) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) {
                revert ERC20InsufficientAllowance(spender, currentAllowance, value);
            }
            unchecked {
                _approve(owner, spender, currentAllowance - value, false);
            }
        }
    }

    /**
     * @dev Transfers shares from one user to another.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param value The amount of shares to transfer.
     */
    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }

        _updatePortfolioValuation(from);
        _updatePortfolioValuation(to);

        (uint256 totalShares, uint256 totalAssets) = _handleTransfer(from, to, value);

        _updateUserPortfolio(from, totalShares, totalAssets, false);
        _updateUserPortfolio(to, totalShares, totalAssets, true);

        emit Transfer(from, to, value);
    }

    /**
     * @dev Internal function to handle the transfer logic of shares from one user to another.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param value The amount of shares to transfer.
     * @return totalShares The total shares transferred.
     * @return totalAssets The total assets transferred.
     */
    function _handleTransfer(
        address from,
        address to,
        uint256 value
    ) internal returns (uint256 totalShares, uint256 totalAssets) {
        if (balanceOf(from) < value) {
            revert ERC20InsufficientBalance(from, balanceOf(from), value);
        }

        (address[] memory vaults, uint256[] memory shares) = ITransferStrategy(transferStrategy)
            .executePartialTransferStrategy(from, to, value);

        Portfolio storage senderPortfolio = userPortfolios[from];
uint256 vaultsLength = vaults.length;
        for (uint256 i = 0; i < vaultsLength; ) {
            address vault = vaults[i];
            uint256 share = shares[i];

            if (share > senderPortfolio.sharesPerVault[vault]) {
                revert InsufficentSharesPerValut(
                    from,
                    senderPortfolio.sharesPerVault[vault],
                    share
                );
            }

            uint256 valuePerShare = _calculateValuePerShare(senderPortfolio, vault);

            if (valuePerShare > senderPortfolio.assetsPerVault[vault]) {
                revert InsufficentAssetsPerValut(
                    from,
                    senderPortfolio.assetsPerVault[vault],
                    valuePerShare
                );
            }

            _transferSharesAndAssets(from, to, vault, share, valuePerShare);

            unchecked {
                totalShares += share;
                totalAssets += share * valuePerShare;
            }

            unchecked {
                i++;
            }
        }

        if (totalShares > senderPortfolio.currentBalance) {
            revert InsufficentTotalShares(from, senderPortfolio.currentBalance, totalShares);
        }

        if (totalAssets > senderPortfolio.currentUnderlyingValue) {
            revert InsufficentTotalAssets(
                from,
                senderPortfolio.currentUnderlyingValue,
                totalAssets
            );
        }

        emit SharesTransfer(from, to, vaults, shares, totalShares);
    }

    /**
     * @dev Internal function to transfer shares and assets between users for a specific vault.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param vault The address of the vault.
     * @param share The amount of shares to transfer.
     * @param valuePerShare The value per share in the vault.
     */
    function _transferSharesAndAssets(
        address from,
        address to,
        address vault,
        uint256 share,
        uint256 valuePerShare
    ) internal {
        uint256 assets = share * valuePerShare;
        _updateVaultBalances(from, vault, share, assets, false);
        _updateVaultBalances(to, vault, share, assets, true);
    }

    /**
     * @dev Updates the balances of shares and assets for a specific vault in the user's portfolio.
     * @param receiver The address of the user.
     * @param vault The address of the vault.
     * @param shares The amount of shares to update.
     * @param value The amount of assets to update.
     * @param isDeposit Boolean indicating if the update is for a deposit or withdrawal.
     */
    function _updateVaultBalances(
        address receiver,
        address vault,
        uint256 shares,
        uint256 value,
        bool isDeposit
    ) internal {
        if (isDeposit) {
            _addVaultIfNotPresent(receiver, vault);
            unchecked {
                userPortfolios[receiver].sharesPerVault[vault] += shares;
                userPortfolios[receiver].assetsPerVault[vault] += value;
            }
        } else {
            unchecked {
                userPortfolios[receiver].sharesPerVault[vault] -= shares;
                userPortfolios[receiver].assetsPerVault[vault] -= value;
            }
            _removeVaultIfEmpty(receiver, vault);
        }
    }

    /**
     * @dev Adds a vault to a user's portfolio if not already present.
     * @param receiver The address of the user.
     * @param vault_ The address of the vault to add.
     */
    function _addVaultIfNotPresent(address receiver, address vault_) internal {
        if (userPortfolios[receiver].sharesPerVault[vault_] == 0) {
            if (userPortfolios[receiver].vaults.length >= maxVaultsPerHolder) {
                revert MaxVaultsPerUser();
            }
            userPortfolios[receiver].vaults.push(vault_);
        }
    }

    /**
     * @dev Removes a vault from a user's portfolio if their balance is zero.
     * @param receiver The address of the user.
     * @param vault_ The address of the vault to remove.
     */
    function _removeVaultIfEmpty(address receiver, address vault_) internal {
        if (userPortfolios[receiver].sharesPerVault[vault_] == 0) {
           
            uint256 vaultIndex = userPortfolios[receiver].vaults.length;
            for (uint256 i = 0; i < userPortfolios[receiver].vaults.length; ) {
                if (userPortfolios[receiver].vaults[i] == vault_) {
                    vaultIndex = i;
                    break;
                }

                unchecked {
                    i++;
                }
            }

            if (vaultIndex < userPortfolios[receiver].vaults.length) {
                userPortfolios[receiver].vaults[vaultIndex] = userPortfolios[receiver].vaults[
                    userPortfolios[receiver].vaults.length - 1
                ];
                userPortfolios[receiver].vaults.pop();
            }
        }
    }

    /**
     * @dev Updates the user's portfolio with the new balance and value.
     * @param receiver The address of the user.
     * @param shares The amount of shares to update.
     * @param value The amount of value to update.
     * @param isDeposit Boolean indicating if the update is for a deposit or withdrawal.
     */
    function _updateUserPortfolio(
        address receiver,
        uint256 shares,
        uint256 value,
        bool isDeposit
    ) internal {
        if (isDeposit) {
            unchecked {
                userPortfolios[receiver].currentBalance += shares;
                userPortfolios[receiver].currentUnderlyingValue += value;
            }
        } else {
            unchecked {
                userPortfolios[receiver].currentBalance -= shares;
                userPortfolios[receiver].currentUnderlyingValue -= value;
            }
        }
    }

    /**
     * @dev Internal function to update the valuation of a user's portfolio.
     * @param tokenHolder_ The address of the user whose portfolio is being updated.
     * @return bool Returns true if the operation is successful.
     */
    function _updatePortfolioValuation(address tokenHolder_) internal returns (bool) {
        Portfolio storage portfolio = userPortfolios[tokenHolder_];
        uint256 length = portfolio.vaults.length;
        uint256 totalAssets;
        for (uint256 i = 0; i < length; ) {
            address vault = portfolio.vaults[i];
            uint256 shares = portfolio.sharesPerVault[vault];
            uint256 assets = IERC4626(vault).convertToAssets(shares);

            portfolio.assetsPerVault[vault] = assets;

            unchecked {
                totalAssets += assets;
            }

            unchecked {
                i++;
            }
        }

        portfolio.lastblockUpdate = block.number;
        portfolio.currentUnderlyingValue = totalAssets;

        emit PortfolioValuationUpdated(tokenHolder_);
        return true;
    }

    /**
     * @dev Internal function to distribute deposits across multiple vaults.
     * @param receiver The address to credit the shares.
     * @param vaults_ The list of vault addresses.
     * @param values_ The list of amounts to deposit into each vault.
     * @return mintedShares An array of shares minted on vault.
     * @return totalMintedShares The total amount of shares minted.
     * @return distributedFunds The total amount of funds distributed.
     */
    function _distributeDeposits(
        address receiver,
        address[] calldata vaults_,
        uint256[] calldata values_
    )
        internal
        returns (uint256[] memory mintedShares, uint256 totalMintedShares, uint256 distributedFunds)
    {
        uint256 length = vaults_.length;
        mintedShares = new uint256[](length);

        for (uint256 i = 0; i < length; ) {
            address vault = vaults_[i];
            uint256 value = values_[i];

            _checkZeroAddress(vault, "vault");
            _checkZeroAmount(value, "value");

            if (!_isVaultActive(vault)) revert UnsupportedVault(vault);

            IERC20(underlyingAsset).approve(vault, value);
            uint256 shares = IERC4626(vault).deposit(value, address(this));

            mintedShares[i] = shares;

            unchecked {
                totalMintedShares += shares;
            }

            _updateVaultBalances(receiver, vault, shares, value, true);
            _incrementVaultShares(vault, shares);

            unchecked {
                distributedFunds += value;
            }

            unchecked {
                i++;
            }
        }
    }

    /**
     * @dev Internal function to handle withdrawals from multiple vaults.
     * @param vaults_ The list of vault addresses.
     * @param assets_ The list of amounts to withdraw from each vault.
     * @return burnedShares An array of shares burned from the vault
     * @return totalBurnedShares The total amount of shares burned.
     * @return withdrawnFunds The total amount of funds withdrawn.
     */
    function _distributeWithdrawals(
        address receiver,
        address[] calldata vaults_,
        uint256[] calldata assets_
    )
        internal
        returns (uint256[] memory burnedShares, uint256 totalBurnedShares, uint256 withdrawnFunds)
    {
        uint256 length = vaults_.length;
        burnedShares = new uint256[](length);

        for (uint256 i = 0; i < vaults_.length; ) {
            address vault = vaults_[i];
            uint256 value = assets_[i];

            _checkZeroAddress(vault, "vault");
            _checkZeroAmount(value, "value");

            if (value > userPortfolios[receiver].assetsPerVault[vault]) {
                revert InsufficentAssetsPerValut(
                    receiver,
                    userPortfolios[receiver].assetsPerVault[vault],
                    value
                );
            }

            if (!_isVaultActive(vault)) revert UnsupportedVault(vault);

            uint256 shares = IERC4626(vault).withdraw(value, address(this), address(this));

            burnedShares[i] = shares;
            totalBurnedShares += shares;

            _updateVaultBalances(_msgSender(), vault, shares, value, false);
            _decrementVaultShares(vault, shares);

            withdrawnFunds += value;

            unchecked {
                i++;
            }
        }
    }

    /**
     * @dev Calculates the value per share for a given vault in a user's portfolio.
     * @param portfolio The user's portfolio.
     * @param vault The address of the vault.
     * @return The value per share.
     */
    function _calculateValuePerShare(
        Portfolio storage portfolio,
        address vault
    ) internal view returns (uint256) {
        return portfolio.assetsPerVault[vault] / portfolio.sharesPerVault[vault];
    }

    /**
     * @dev Increases the total shares balance for a vault and total supply.
     * @param vault_ The address of the vault.
     * @param amount_ The amount of shares to increase.
     */
    function _incrementVaultShares(address vault_, uint256 amount_) internal {
        unchecked {
            vaultsShares[vault_] += amount_;
            _totalSupply += amount_;
        }
    }

    /**
     * @dev Decreases the total shares balance for a vault and total supply.
     * @param vault_ The address of the vault.
     * @param amount_ The amount of shares to decrease.
     */
    function _decrementVaultShares(address vault_, uint256 amount_) internal {
        vaultsShares[vault_] -= amount_;
        _totalSupply -= amount_;
    }
}
