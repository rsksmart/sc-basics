// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./BasicStructure.sol";

// https://docs.soliditylang.org/en/v0.8.14/types.html
contract DataTypes {
  receive() external payable {}

  // basic types
  uint n = 1000;
  int x = -200;

  function sumUint() public view returns (uint) {
    return n + 300;
  }

  // casting
  function castWithInt() public view returns (int) {
    return int(n) + x;
  }

  address alice = 0xD6a4BE579821fc6737360f0f921BAdFcFea55ACc;
  address payable bob = payable(0xD6a4BE579821fc6737360f0f921BAdFcFea55ACc);

  function balanceOfAlice() public view returns (uint) {
    return alice.balance;
  }

  // allow transfers
  function transferToBob() public {
    bob.transfer(1000);
  }

  // mutability
  string constant text = "La Rioja 2022!!";
  bool immutable flag;

  constructor() {
    flag = true;
  }

  // control structures
  function useBool() public view returns (string memory) {
    if (flag) {
      return text;
    }

    return ":(";
  }

  // arrays
  bytes4[] arr = [ bytes4(0x01234567), bytes4(0x89abcdef) ];

  function getElement(uint i) public view returns (bytes4) {
    return arr[i];
  }

  // maps
  mapping(address => uint) apples;

  function saveApples(address a, uint amount) public {
    apples[a] = amount;
  }

  function getApples(address a) public view returns(uint) {
    return apples[a];
  }

  // composing
  mapping(address => mapping(address => uint[])) superStructure;

  // enums
  enum State { State1, State2, State3 }

  State currentState = State.State1;

  function nextState () public {
    if (currentState == State.State1) currentState = State.State2;
    else if (currentState == State.State2) currentState = State.State3;
    else currentState = State.State1;
  }

  function getState() public view returns(State) {
    return currentState;
  }

  // structs
  struct Person {
    string name;
    uint age;
  }

  function getStructVal() public pure returns(uint) {
    Person memory p;
    p.name = "Charly";
    p.age = 27;

    return p.age;
  }

  function getMessageOfGetterSetter(BasicStructure getterSetter) public view returns (uint) {
    return getterSetter.readStorage();
  }
}
