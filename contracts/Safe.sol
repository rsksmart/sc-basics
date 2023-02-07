// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./BasicStructure.sol";

contract Safe {
    event Deposit(address indexed sender, uint indexed time, uint amount);
    event Withdraw(address indexed receiver, uint indexed time, uint amount);

    mapping (address => bool) public isFamilyMember;

    modifier onlyFamilyMember {
        require(isFamilyMember[msg.sender], "Only family members");
        _;
    }

    constructor (address[] memory members) {
        for (uint256 i = 0; i < members.length; i++) {
            isFamilyMember[members[i]] = true;
        }
    }

    receive() external payable {
        emit Deposit(msg.sender, block.timestamp, msg.value);
    }

    function withdraw(address payable receiver, uint amount) external {
        receiver.transfer(amount);
        emit Withdraw(receiver, block.timestamp, amount);
    }
}
