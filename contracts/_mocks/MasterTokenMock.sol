// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Mock} from "./tokens/ERC20Mock.sol";
import {IVault} from "../interfaces/IVault.sol";
import {IVaultsRegistry} from "../interfaces/IVaultsRegistry.sol";
import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";

contract MasterTokenMock is AccessControl, ERC20Mock {
    address public vaultsRegistry;
    address public assetAddress;
    mapping(address user => uint256 shares) public usersShares;

    constructor(
        address vaultsRegistryAddress,
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) ERC20Mock(name_, symbol_, decimals_) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        vaultsRegistry = vaultsRegistryAddress;
    }

    receive() external payable {}

    function setAssetAddress(address assetAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        assetAddress = assetAddress_;
    }

    function deposit(
        address vaultAddress_,
        uint256 assetsAmount_,
        address account_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        // needs approve first from user to the vault to take asset from wallet

        isVaultActive(vaultAddress_);
        uint256 shares = IERC4626(vaultAddress_).deposit(assetsAmount_, account_);
        usersShares[account_] += shares;

        return shares;
    }

    function withdraw(
        address vaultAddress_,
        uint256 assetsAmount_,
        address caller_,
        address account_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        isVaultActive(vaultAddress_);

        uint256 shares = IERC4626(vaultAddress_).withdraw(assetsAmount_, caller_, account_);
        usersShares[account_] -= shares;

        return shares;
    }

    function redeem(
        address vaultAddress_,
        uint256 sharesAmount_,
        address caller_,
        address account_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        isVaultActive(vaultAddress_);
        
        // aprove vault to get shares and be burned
        // IERC20(vaultAddress_).approve(vaultAddress_, sharesAmount_);

        uint256 assets = IERC4626(vaultAddress_).redeem(sharesAmount_, caller_, account_);
        usersShares[account_] -= sharesAmount_;
        
        return assets;
    }

    function deployAssets(
        address vaultAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (address, uint256) {
        isVaultActive(vaultAddress_);

        (address liquidToken, uint256 liquidTokenAmount) = IVault(vaultAddress_).deployAssets();
        return (liquidToken, liquidTokenAmount);
    }

    function harvest(
        address vaultAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (address token, uint256 tokenAmount) {
        isVaultActive(vaultAddress_);

        (address liquidToken, uint256 liquidTokenAmount) = IVault(vaultAddress_).harvest();
        return (liquidToken, liquidTokenAmount);
    }

    function getUserSharesBalance(address account_) external view returns (uint256) {
        uint256 userSharesBalance = usersShares[account_];
        return userSharesBalance;
    }

    function getTokensBack(
        address receiver,
        address token,
        uint256 amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20(token).transfer(receiver, amount);
    }

    function isVaultActive(address vaultAddress_) internal view {
        bool isActive = IVaultsRegistry(vaultsRegistry).isVaultActive(vaultAddress_);
        if (!isActive) revert("Vault not Active");
    }
}
