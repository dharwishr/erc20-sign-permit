// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./ERC20Permit.sol";

contract TestPermit is ERC20Permit {
    string public greeting;
    constructor (string memory _name, string memory _symbol) ERC20Permit(_name, _symbol)
    {
        greeting = "False Permit";
    }
    function TestERC20Permit(address owner, address spender, uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public {
        permit(owner, spender, amount, deadline, v, r, s);

        greeting = "True Permit";

    
    }
    function outValue() public view returns (string memory) {
        return greeting;
    }

}