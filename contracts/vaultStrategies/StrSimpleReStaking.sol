// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {BaseStrategy} from "../BaseStrategy.sol";

import {IBaseAdapter} from "./../interfaces/IBaseAdapter.sol";
import {IAdapter} from "./../interfaces/IAdapter.sol";
import {IDeployStrategy} from "./../interfaces/IDeployStrategy.sol";
import {IGenericWrapping} from "./../interfaces/IGenericWrapping.sol";

// import {console} from "hardhat/console.sol";

/// @title Strategy for Simple ReStaking
/// @notice Implements simple re staking strategy for a single asset using adapters
contract StrSimpleReStaking is BaseStrategy, IDeployStrategy {
    /// @notice Number of deployment adapters specified for this strategy
    uint8 public constant DEPLOYMENT_ADAPTERS_QTY = 2;

    /// @notice Number of withdrawal adapters specified for this strategy
    uint8 public constant WITHDRAW_ADAPTERS_QTY = 1;

    /// @notice Encoded swap path and fee information used by Uniswap V3
    bytes public swapPath;

    /// @notice Emitted when the path used for swaps is updated
    event PathUpdated(bytes path);

    /// @notice Emitted when wrap ocurrs
    event WrappedAmount(
        address liquidTokenAddress,
        uint256 unwrappedAmount,
        address wrappedLiquidTokenAddress,
        uint256 wrappedAmount
    );

    /// @notice Emitted when unwrap ocurrs
    event UnwrappedAmount(
        address wrappedLiquidTokenAddress,
        uint256 wrappedAmount,
        address liquidTokenAddress,
        uint256 unwrappedAmount
    );

    /// @notice Error thrown when less than two tokens are provided for path creation
    error MinTwoTokensNeeded();

    /// @notice Error thrown when the path encoding is incorrect relative to token and fee length
    error MalformedPath();

    /// @notice Initializes the strategy with addresses and paths
    /// @param vaultAddress_ Address of the vault associated with this strategy
    /// @param liquidTokenAddress_ Address of the liquid token
    /// @param adaptersDeployPath_ Array of deployment adapter addresses
    /// @param adaptersWithdrawPath_ Array of withdraw adapter addresses
    /// @param strategyName_ Name of the strategy
    function initialize(
        address vaultAddress_,
        address liquidTokenAddress_,
        address[] memory adaptersDeployPath_,
        address[] memory adaptersWithdrawPath_,
        string calldata strategyName_
    ) external initializer {
        _checkZeroAddress(vaultAddress_, "vaultAddress_");
        _checkZeroAddress(liquidTokenAddress_, "liquidTokenAddress_");
        _checkEmptyString(strategyName_, "strategyName_");

        // init access control
        __AccessControl_init();

        // grant admin role to defined admin
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        // Check adapters path
        super._setAdaptersDeployPath(adaptersDeployPath_, DEPLOYMENT_ADAPTERS_QTY);
        super._setAdaptersWithdrawPath(adaptersWithdrawPath_, WITHDRAW_ADAPTERS_QTY);

        // update state variables
        vaultAddress = vaultAddress_;
        strategyName = strategyName_;

        liquidTokenAddress = liquidTokenAddress_;
    }

    /// @notice Replaces the entire deployment path for adapters with new addresses
    /// @param adaptersDeployPath_ Array of new adapter addresses for deployment
    function setAdaptersDeployPath(
        address[] memory adaptersDeployPath_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        super._setAdaptersDeployPath(adaptersDeployPath_, DEPLOYMENT_ADAPTERS_QTY);
    }

    /// @notice Replaces the entire withdrawal path for adapters with new addresses
    /// @param adaptersWithdrawPath_ Array of new adapter addresses for withdrawal
    function setAdaptersWithdrawPath(
        address[] memory adaptersWithdrawPath_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        super._setAdaptersWithdrawPath(adaptersWithdrawPath_, WITHDRAW_ADAPTERS_QTY);
    }

    /// @notice Configures the path for token swaps on Uniswap V3
    /// @param tokens_ Array of token addresses defining the swap path
    /// @param fees_ Array of pool fees associated with each token pair in the path
    function buildPath(
        address[] memory tokens_,
        uint24[] memory fees_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 tokensLength = tokens_.length;
        uint256 feesLength = fees_.length;

        if (tokensLength < 2) revert MinTwoTokensNeeded();
        if (tokensLength != feesLength + 1) revert MalformedPath();

        for (uint i = 0; i < tokensLength; ++i) {
            _checkZeroAddress(tokens_[i], "tokens_");
        }

        for (uint i = 0; i < feesLength; ++i) {
            _checkZeroAmount(fees_[i], "fees_");
        }

        swapPath = abi.encodePacked(tokens_[0]);
        for (uint i = 0; i < feesLength; ++i) {
            swapPath = abi.encodePacked(swapPath, fees_[i], tokens_[i + 1]);
        }

        emit PathUpdated(swapPath);
    }

    /// @notice Executes the deployment strategy for the given assets
    /// @param sender_ Address of the asset sender (vault)
    /// @param receiver_ Address of the asset receiver (this contract)
    /// @param asset_ Address of the asset to be deployed
    /// @param assetsAmount_ Amount of assets to be deployed
    /// @return liquidToken Address of the liquid token received after deployment
    /// @return liquidTokenAmount Amount of liquid tokens received after deployment
    function executeDeploymentStrategy(
        address sender_, // vault
        address receiver_, // this contract
        address asset_,
        uint256 assetsAmount_
    ) external whenNotPaused onlyRole(VAULT_MANAGER_ROLE) returns (address, uint256) {
        _checkZeroAddress(sender_, "sender_");
        _checkZeroAddress(receiver_, "receiver_");
        _checkZeroAddress(asset_, "asset_");
        _checkZeroAmount(assetsAmount_, "assetsAmount_");

        // operation index for error debugging
        uint256 opIndex = 1;

        // get first adapter
        address adapter = super._getFirstDepositAdapter();

        // send the assets to the first protocol (first adapter)
        // first protocol is already approved on the vault
        (address liquidToken, uint256 liquidTokenAmount) = _deployAssets(
            adapter,
            sender_, // vault
            receiver_, // this contract
            asset_,
            assetsAmount_,
            false // ex. to get stETH on Lido instead of wrapping
        );

        // check result
        if (liquidTokenAmount == 0) {
            revert ErrorStep({index: opIndex});
        }

        // increase operation index for error debugging
        opIndex = 2;

        // get final adapter
        adapter = super._getLastDepositAdapter();

        // approve adapter to take the liquid tokens directly
        IERC20(liquidToken).approve(adapter, liquidTokenAmount);

        // send the received liquid tokens to the other protocol
        // receive rLiquidToken from protocol
        (address rLiquidToken, uint256 rLiquidTokenAmount) = _deployAssets(
            adapter,
            address(this), // sender_ is this contract having liquid tokens
            address(this), // receiver is this contract as well
            liquidToken,
            liquidTokenAmount,
            false // ex. to get stETH on Lido instead of wrapping
        );

        // check result
        if (rLiquidTokenAmount == 0 || rLiquidToken != liquidTokenAddress) {
            revert ErrorStep({index: opIndex});
        }

        // @TODO CALL updateValuation function ?

        // emit event
        emit DeploymentStrategyExecuted(asset_, assetsAmount_, rLiquidToken, rLiquidTokenAmount);

        return (rLiquidToken, rLiquidTokenAmount);
    }

    /// @notice Updates the valuation of deployed assets based on current prices
    /// @param source_ Specifies from where to get the price when no oracle is defined
    /// @return deployedAssetsValue The new valuation of the deployed assets
    function updateDeployedAssetVaule(
        uint256 source_
    ) external onlyRole(VAULT_MANAGER_ROLE) returns (uint256) {
        // check source_ 1 is deposit adapter, 2 is withdraw
        require(source_ == 1 || source_ == 2, "Invalid source to get price");

        // ask adapter token price, get it from
        uint256 oneTokenInEth = getTokenPrice(liquidTokenAddress, source_);

        // store value of deployed asset for strategy
        deployedAssetsValue =
            (IERC20(liquidTokenAddress).balanceOf(address(this)) * oneTokenInEth) /
            1e18;

        emit DeployedAssetsValueUpdated(liquidTokenAddress, deployedAssetsValue, address(this));

        return deployedAssetsValue;
    }

    function executeWithdrawStrategy(
        address receiver_, // vault
        address asset_,
        uint256 assetsAmount_
    ) external whenNotPaused onlyRole(VAULT_MANAGER_ROLE) returns (address, uint256) {
        // check parameters
        _checkZeroAddress(receiver_, "receiver_"); // should be vault
        _checkZeroAmount(assetsAmount_, "assetsAmount_");
        _checkZeroAddress(asset_, "asset_"); // should be weth

        (address asset, uint256 assetsAmount) = _immediateWithdraw(
            receiver_, // vault
            asset_,
            assetsAmount_
        );

        if (assetsAmount == 0) revert ExecuteWithdrawWStrategyError();

        emit WithdrawStrategyExecuted(receiver_, asset, assetsAmount);

        return (asset, assetsAmount);
    }

    /// @notice wrap the rebasable token
    /// @param amount_ amount to wrap
    /// @return wrappedAmount
    function wrapToken(uint256 amount_) public onlyRole(VAULT_MANAGER_ROLE) returns (uint256) {
        require(wrappedLiquidTokenAddress != address(0), "No defined wrapper");

        // approve wstETH contract to get the stETH
        IERC20(liquidTokenAddress).approve(wrappedLiquidTokenAddress, amount_);

        uint256 wLiquidTknAmount = IGenericWrapping(wrappedLiquidTokenAddress).wrap(amount_);

        if (wLiquidTknAmount == 0)
            revert StrategyWrapError(wrappedLiquidTokenAddress, amount_, true);

        emit WrappedAmount(
            liquidTokenAddress,
            amount_,
            wrappedLiquidTokenAddress,
            wLiquidTknAmount
        );

        return wLiquidTknAmount;
    }

    /// @notice unwrap the token
    /// @param amount_ amount to wrap
    /// @return unwrappedAmount
    function unwrapToken(uint256 amount_) public onlyRole(VAULT_MANAGER_ROLE) returns (uint256) {
        require(wrappedLiquidTokenAddress != address(0), "No defined wrapper");

        // approve wstETH contract to get the wstETH
        IERC20(wrappedLiquidTokenAddress).approve(wrappedLiquidTokenAddress, amount_);

        uint256 liquidTknAmount = IGenericWrapping(wrappedLiquidTokenAddress).unwrap(amount_);

        if (liquidTknAmount == 0)
            revert StrategyWrapError(wrappedLiquidTokenAddress, amount_, false);

        emit UnwrappedAmount(
            wrappedLiquidTokenAddress,
            amount_,
            liquidTokenAddress,
            liquidTknAmount
        );

        return liquidTknAmount;
    }

    /// @notice Retrieves the address of the adapter used for asset deployment
    function getFirstDepositAdapter() external view returns (address) {
        return super._getFirstDepositAdapter();
    }

    /// @notice Retrieves the current value of assets deployed by the strategy
    function getDeployedAssetsValue() external view returns (uint256) {
        return super._getDeployedAssetsValue();
    }

    /// @notice This function is not applicable in this strategy and will always revert
    function executeHarvest() external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Executes withdrawal of assets using the specified adapter
    /// @param receiver_ Address of the asset receiver (vault)
    /// @param asset_ Address of the asset to be withdrawn
    /// @param assetsAmount_ Amount of assets to be withdrawn
    /// @return asset Address of the asset withdrawn
    /// @return assetsAmount Amount of assets withdrawn
    function _immediateWithdraw(
        address receiver_, // vault
        address asset_,
        uint256 assetsAmount_
    ) internal returns (address, uint256) {
        // get the token address to swap
        address token = wrappedLiquidTokenAddress != address(0)
            ? wrappedLiquidTokenAddress
            : liquidTokenAddress;

        // get the token price (wrapped or not)
        // tokenPrice holds price of staked asset or wrapped stake asset
        // depending on the emptyness or not of the wrappedLiquidTokenAddress
        // if no oracle is defined, price will be taken from withdraw adapter
        uint256 tokenPrice = getTokenPrice(token, 2);

        // get the needed amount
        // next line commented for stack too deep
        // uint256 exactAmountNeeded = (1e18 * assetsAmount_) / tokenPrice;
        // included in next operation

        // add slippage to exactAmountNeeded
        // this is the amount in tokens (or wtoken) i will need to swap
        uint256 amountInMaximum = (((1e18 * assetsAmount_) / tokenPrice) *
            (1e18 + IBaseAdapter(super._getAdapterForWithdraw()).getSlippage())) / 1e18;

        uint256 amountToSwap;
        if (token == wrappedLiquidTokenAddress) {
            // token needs wrapping
            /*
            1   lt = X weth
            1/X lt = 1 weth

            1   wlt = Y weth
            1/Y wlt = 1 weth

            1/X lt    = 1/Y wlt ==> multiply both sides with XY
            1/X XY lt = 1/Y XY wlt
            Y lt      = X wlt
            Y/X    lt = 1 wlt
            Y/X lt * 50    = 50  * 1 wlt
            */

            // do the math to get amount of lt to transform to wlt
            uint256 toBeWrapped = (tokenPrice * amountInMaximum) /
                getTokenPrice(liquidTokenAddress, 2);

            // check liquid token balance (not wrapped) is enough
            require(
                toBeWrapped <= IERC20(liquidTokenAddress).balanceOf(address(this)),
                "Not enough tokens to wrap"
            );
            amountToSwap = wrapToken(toBeWrapped);
        } else {
            // token does not need wrapping
            amountToSwap = amountInMaximum;
        }

        // get contract balance of liquid tokens holding
        uint256 liquidTokenBalance = IERC20(token).balanceOf(address(this));

        // check if there is suffcient amount to withdraw
        if (amountToSwap > liquidTokenBalance)
            revert InsufficientFundsToWithdraw({balance: liquidTokenBalance, needed: amountToSwap});

        // approve adapter to get the tokens
        IERC20(token).approve(super._getAdapterForWithdraw(), amountToSwap);

        // call the adapter to withdraw
        (address asset, uint256 assetsAmount) = IAdapter(super._getAdapterForWithdraw()).withdraw(
            address(this), // caller
            receiver_, // vault
            asset_,
            assetsAmount_,
            token,
            amountToSwap,
            swapPath
        );

        // if wrapped token and balance is bigger than 0, means there were leftovers
        // unwrap those to get the original token back
        if (token == wrappedLiquidTokenAddress) {
            uint256 wrappedTokenBalance = IERC20(wrappedLiquidTokenAddress).balanceOf(
                address(this)
            );

            if (wrappedTokenBalance > 0) {
                unwrapToken(wrappedTokenBalance);
            }
        }

        return (asset, assetsAmount);
    }
}
