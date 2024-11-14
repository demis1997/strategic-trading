// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IAggregatorToken is IERC20, IERC20Metadata {

    error DifferentArgumentsLenght();

    error WrongDepositValues();

    error BrokeSlippage();

    error MaxVaultsPerUser();

    error InsufficentSharesPerValut(address from, uint256 fromBalance,uint256 value);

    error InsufficentAssetsPerValut(address from, uint256 fromBalance,uint256 value);

    error InsufficentTotalShares(address from, uint256 fromBalance,uint256 value);

    error InsufficentTotalAssets(address from, uint256 fromBalance,uint256 value);

    error EmptyString(string target);

    error ZeroAmount(string target);

    error ZeroAddress(string target);

    error UnsupportedVault(address target);

    event Deposit(address indexed sender, address indexed receiver, address[] vaults, uint256[] amounts, uint256[] mintedShares, uint256 totalShares);

    event Withdrawal(address indexed from, address indexed to, address[] vaults, uint256[] amounts, uint256[] burnedShares, uint256 value);

    event TransferStrategySet(address indexed newTransterStrategy);

    event MaxVaultsPerHolderSet(uint256 newValue);

    event AggregatorFeeModelSet(address indexed newAggregatorFeeModel);

    event PortfolioValuationUpdated(address indexed tokenHolder);

    event SharesTransfer(address indexed from, address indexed to, address[] vaults, uint256[] shares, uint256 totalShares);

    // defines if deposits should continue if some vault is not procesing deposits
    // there wont be underlying assets left in aggregator contract, and every amount should be passed to vaults
    enum DepositFailureMode {
        RevertWhenFail,
        keepGoing
    }

    // defines if withdrawals are allowed or not
    enum WithdrawalMode {
        Enabled,
        Disabled
    }

    struct Portfolio {
        address[] vaults;
        mapping ( address  => uint256 ) sharesPerVault;
        mapping ( address => uint256 ) assetsPerVault;
        uint256 currentBalance;
        uint256 currentUnderlyingValue;
        uint256 lastblockUpdate;
    }

    function deposit(address receiver, address[] calldata vaults_, uint256[] calldata values_, uint256 totalValue_) external returns (uint256) ;

    function withdraw(address[] calldata vaults_, uint256[] calldata assets_, uint256 maxSlipage) external returns (uint256);

    function exchangeRate() external view returns (uint256);

    function getUnderlyingAsset() external view returns (address);

    function setTransferStrategy(address transferStrategy_) external;

    function setAggregatorFeeModel(address aggregatorFeeModel_) external;

    function vaultsOf(address tokenHolder_) external view returns (address[] memory vaults);

    function currentSharesPerVault(address tokenHolder_) external view returns (address[] memory vaults, uint256[] memory shares);

    function updatePortfolioValuation(address tokenHolder_) external returns (bool);
}