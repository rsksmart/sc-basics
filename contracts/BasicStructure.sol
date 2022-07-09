// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BasicStructure {
  uint globals = 10;

  constructor(/** ...params... */) {
    console.log(1000);
    // init code
  }

  // This function is called for all messages sent to
  // this contract, except plain Ether transfers
  fallback() external payable {
    console.logBytes(msg.data);
    // fallback, after reciving
  }

  // This function is called for plain Ether transfers, i.e.
  // for every call with empty calldata.
  receive() external payable {
    console.log(msg.value);
    // fallback, after reciving
  }

  modifier guards(uint x) {
    require(x == 200, "Error message!");
    _;
  }

  function twoHundred() public pure returns(uint) {
    return 100 + 100;
  }

  function readStorage() public view returns (uint) {
    // do things...
    return globals;
  }

  function writeStorage(uint x) public guards(x) {
    globals = x;
    // do things...
  }
}