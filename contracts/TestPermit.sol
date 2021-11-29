// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./ERC20Permit.sol";

contract TestPermit is ERC20Permit {
    constructor (uint256 supply) ERC20Permit("TestERC", "TER") {
    }
    function TestERC20Permit(address owner, address spender, uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public returns (string memory) {
        permit(owner, spender, amount, deadline, v, r, s);
        return "OK";
    }
}