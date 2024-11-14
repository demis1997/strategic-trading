// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


// This contracts serves two purposes
// 1- for tests it is a multi token oracle where you can define in the mapping the token and price
//    and before calling the oracle, just set the currentTokenAddress to the expected one
//
// 2- for testnet the mapping is not used and currentTokenAddress is the reported token
// 
contract OracleMock is AccessControl {
    string public oracleTokens;

    struct Token {
        string tokenName;
        int256 tokenPrice;
    }

    address public currentTokenAddress;

    mapping(address inputToken => Token tokenInfo) public tokenPrices;

    constructor(
        string memory oracleTokens_,
        address tokenAddress_,
        string memory tokenName_,
        int256 tokenPrice_
    ) {
        // grant admin role to defined admin
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        tokenPrices[tokenAddress_].tokenName = tokenName_;
        tokenPrices[tokenAddress_].tokenPrice = tokenPrice_;

        currentTokenAddress = tokenAddress_;
        oracleTokens = oracleTokens_;
    }

    function setOracleTokens(string memory tokens_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        oracleTokens = tokens_;
    }

    function setCurrentTokenAddress(
        address currentTokenAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        currentTokenAddress = currentTokenAddress_;
    }

    function addToken(
        address tokenAddress_,
        string memory tokenName_,
        int256 tokenPrice_
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        tokenPrices[tokenAddress_].tokenName = tokenName_;
        tokenPrices[tokenAddress_].tokenPrice = tokenPrice_;
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, tokenPrices[currentTokenAddress].tokenPrice, 0, 0, 0);
    }
}
