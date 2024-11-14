// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IExternalProtocol {
    function depositOnProtocol(address, address, address, uint256) external returns (bool, address, uint256);

    function withdrawAssets(address, address, address, uint256) external returns (bool, address, uint256);

    function claim(address, address) external returns (bool, address, uint256);

    function getAccountValuation(address, address, uint256) external returns (uint256);

    function getTokenPrice(address) external view returns(uint256);
}
