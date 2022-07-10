// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Events {
  event MyEvent(address indexed sender, uint n);

  function emitEvent() external {
    emit MyEvent(msg.sender, 1000);
  }
}
