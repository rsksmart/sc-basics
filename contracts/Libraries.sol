// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Libraries is Ownable {
  using Counters for Counters.Counter;

  Counters.Counter public c;

  function ownerInc() external onlyOwner {
    c.increment();
  }

  function ownerReset() external onlyOwner {
    c.reset();
  }
}
