// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {BaseAdapter} from "./../BaseAdapter.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IUniswapV3Protocol} from "./interfaces/IUniswapV3Protocol.sol";
import {IAdapter} from "./../../interfaces/IAdapter.sol";

// import {console} from "hardhat/console.sol";

/// @title Uniswap V3 Adapter for liquidity management with slippage control
/// @notice This contract interacts with Uniswap V3 for token swaps using defined paths and fees
contract UniswapV3Adapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Uniswap V3 Router used for swaps
    address public uniswapV3Router;

    /// @notice Address of the Uniswap V3 Quoter used for obtaining quotes
    address public uniswapQuoter;

    /// @notice Mapping to store pool address of each token to get the price
    mapping(address token => address poolForPrice) public poolsPerTokenForPrice;

    /// @notice Emitted when mapping of pools per token is updated
    event PoolForTokenPriceSet(address indexed token, address indexed pool);

    /// @notice Emitted when quoting is done
    event Quoted(
        uint256 amountIn,
        uint256 amountInMaximum,
        uint256 amountOut
    );

    /// @notice Initializes the Uniswap V3 adapter with necessary contract addresses
    /// @param uniswapV3Router_ The address of the Uniswap V3 Router
    /// @param uniswapQuoter_ The address of the Uniswap V3 Quoter
    /// @param wethAddress_ The address of the WETH token
    function initialize(
        address uniswapV3Router_,
        address uniswapQuoter_,
        address wethAddress_
    ) external initializer {
        _checkZeroAddress(uniswapV3Router_, "uniswapV3Router_");
        _checkZeroAddress(uniswapQuoter_, "uniswapQuoter_");
        _checkZeroAddress(wethAddress_, "wethAddress_");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        uniswapV3Router = uniswapV3Router_;
        uniswapQuoter = uniswapQuoter_;
        wethAddress = wethAddress_;

        // set default slippage
        slippage = 4e16; // 4%;
        // (this includes the swap fee)

        // set name of the protocol to use
        protocolName = "Uniswap";
    }

    /// @notice Set the pool address to get price for a specific token
    /// @param token_ Token to get the price
    /// @param pool_ New pool address
    function setPoolPerTokenForPrice(
        address token_,
        address pool_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(token_, "token_");
        _checkZeroAddress(pool_, "pool_");

        emit PoolForTokenPriceSet(token_, pool_);

        poolsPerTokenForPrice[token_] = pool_;
    }

    /// @notice Updates the address of the Uniswap V3 Router
    /// @param uniswapRouterAddress_ New router address
    function setUniswapRouterAddress(
        address uniswapRouterAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(uniswapRouterAddress_, "uniswapRouterAddress_");

        emit AddressUpdated("uniswapRouterAddress", uniswapRouterAddress_);

        uniswapV3Router = uniswapRouterAddress_;
    }

    /// @notice Updates the address of the Uniswap V3 Quoter
    /// @param uniswapQuoter_ New quoter address
    function setUniswapQuoterAddress(address uniswapQuoter_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(uniswapQuoter_, "uniswapQuoter_");

        emit AddressUpdated("uniswapQuoter", uniswapQuoter_);

        uniswapQuoter = uniswapQuoter_;
    }

    /// @notice Withdraws tokens by swapping them on Uniswap V3
    /// @param caller_ Strategy address
    /// @param receiver_ Address that will receive the swapped tokens
    /// @param asset_ Token address to be received
    /// @param assetsAmount_ Amount of asset tokens to be received
    /// @param liquidTokenAddress_ Address of the liquid token to be swapped
    /// @param amountInMaximum_ Maximum amount of liquid tokens to be used for the swap
    /// @param path_ Swap path for uniswap
    /// @return address asset address and the amount of assets transferred
    /// @return uint256 asset address and the amount of assets transferred
    function withdraw(
        address caller_, // strategy
        address receiver_, // vault
        address asset_, // weth
        uint256 assetsAmount_,
        address liquidTokenAddress_,
        uint256 amountInMaximum_,
        bytes memory path_
    ) external whenNotPaused nonReentrant onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        _checkZeroAddress(caller_, "caller_");
        _checkZeroAddress(receiver_, "receiver_");
        _checkZeroAddress(asset_, "asset_");
        _checkZeroAddress(liquidTokenAddress_, "liquidTokenAddress_");
        _checkZeroAmount(assetsAmount_, "assetsAmount_");
        _checkZeroAmount(amountInMaximum_, "amountInMaximum_");

        // bring liquid tokens from strategy
        IERC20(liquidTokenAddress_).safeTransferFrom(caller_, address(this), amountInMaximum_);

        // approve protocol to do the swap and take the tokens
        IERC20(liquidTokenAddress_).approve(address(uniswapV3Router), amountInMaximum_);

        // prepare the swap
        // the path is already built
        IUniswapV3Protocol.ExactOutputParams memory params = IUniswapV3Protocol.ExactOutputParams({
            path: path_,
            recipient: receiver_,
            amountOut: assetsAmount_,
            amountInMaximum: amountInMaximum_
        });

        // make the swap
        uint256 amountSpent = IUniswapV3Protocol(uniswapV3Router).exactOutput(params);

        // emit when withdraw was done
        emit WithdrawFromProtocol(
            caller_,
            receiver_,
            liquidTokenAddress_,
            amountSpent,
            asset_,
            assetsAmount_
        );

        // if there are leftovers, return it to strategy
        uint256 leftovers = amountInMaximum_ > amountSpent ? amountInMaximum_ - amountSpent : 0;

        if (leftovers > 0) {
            IERC20(liquidTokenAddress_).safeTransfer(caller_, leftovers);
        }

        return (asset_, assetsAmount_);
    }

    /// @notice Returns the amount in required for a given exact output swap without executing the swap
    /// @param path_ The path of the swap, i.e. each token pair and the pool fee. Path must be provided in reverse order
    /// @param amountOut_ The amount of the last token to receive
    /// @return amountIn The amount of first token required to be paid
    /// @return amountInMaximum The amount of first token required to be paid with slippage
    function getAmountInForexactOutput(
        bytes memory path_,
        uint256 amountOut_
    ) external returns (uint256 amountIn, uint256 amountInMaximum) {
        (amountIn, , , ) = IUniswapV3Protocol(uniswapQuoter).quoteExactOutput(path_, amountOut_);

        // [TokenOut,OutFee0,TokenMid,InFee1,TokenIn]

        /// @TODO try catch four values (100 / 500 / 3000 / 10000)
        /// 0.01% is   100
        /// 0.05% is   500
        /// 0.30% is  3000
        /// 1.00% is 10000

        // Calculate maximum input amount including slippage
        amountInMaximum = amountIn + ((amountIn * slippage) / 1e18);

        emit Quoted(amountIn, amountInMaximum, amountOut_);

        return (amountIn, amountInMaximum);
    }

    /// @notice Retrieves the protocol address being used (Uniswap V3 Router)
    /// @return address The address of the Uniswap V3 Router
    function getProtocol() external view returns (address) {
        return uniswapV3Router;
    }

    /// @notice Retrieves the current token price using the configured pool
    /// @return tokenPrice The price of the token derived from the pool's slot0 information
    function getTokenPrice(address token_) external view virtual returns (uint256) {
        /// @TODO we should use TWAP here. Need some research

        address pool = poolsPerTokenForPrice[token_];
        require(pool != address(0), "No pool defined for token");

        // check if pool gives price in WETH or not
        bool backward;
        if (IUniswapV3Protocol(pool).token0() != token_) backward = true;

        (uint160 sqrtPriceX96, , , , , , ) = IUniswapV3Protocol(pool).slot0();

        // represents the amount of token1 you get for ONE token0
        uint256 tokenPrice = (uint256(sqrtPriceX96) * uint256(sqrtPriceX96) * 1e18) >> (96 * 2);

        return backward ? (1e18 * 1e18) / tokenPrice : tokenPrice;
    }

    /// @notice Unimplemented deposit function to fulfill IAdapter interface
    function deposit(
        address,
        address,
        address,
        uint256,
        bool
    ) external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Unimplemented claim earnings function to fulfill IAdapter interface
    function claimEarnings(address, address) external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }
}
