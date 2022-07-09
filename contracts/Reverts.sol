// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Reverts {
  address owner = msg.sender; // is who deploys the contract
  address friend;

  uint public x = 0;

  constructor(address _friend) {
    friend = _friend;
  }

  function superRestricted() external {
    require(msg.sender == owner, "Not the owner");
    x += 1000;
  }

  modifier onlyOwnerOrFriend() {
    require(msg.sender == owner || msg.sender == friend, "Not the owner");
    _;
  }

  function notSoRestricted() external onlyOwnerOrFriend {
    x++;
  }


  function neverWorks() external {
    x += 1000000;
    revert("Sorry not sorry");
  }
}
