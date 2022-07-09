// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

abstract contract VisibilityAbstract {
  function sumXAndOneAndTwo(uint v) internal view virtual returns(uint);
  function sumXAndOneAndTwoPublic(uint v) public view virtual returns(uint);

  function sumUsingChild(uint v) internal view returns(uint) {
    return sumXAndOneAndTwo(v);
  }
}

// https://docs.soliditylang.org/en/v0.8.12/contracts.html#visibility-and-getters
contract VisibilityParent is VisibilityAbstract{
  uint private x = 10;
  uint internal y = 20;
  uint public p = 1000;

  // pure because it doesnt read the storage
  function sumOne(uint v) private pure returns(uint) {
    return v + 1;
  }

  // view because it reads it but doesnt modify it
  function sumXAndOne(uint v) internal view returns(uint) {
    return sumOne(v) + x;
  }

  // overrides to fulfill VisibilityAbstract
  function sumXAndOneAndTwo(uint v) internal view override returns(uint) {
    return sumOne(v) + x + 2;
  }

  // has public, it is accessible from the children
  function sumXAndOneAndTwoPublic(uint v) public view override returns(uint) {
    return sumXAndOneAndTwo(v);
  }

  function sumXAndOneAndTwoExternal(uint v) external view returns(uint) {
    return sumUsingChild(v);
  }
}

contract Visibility is VisibilityParent {
  uint public z = 20; // will be accessible via contract.z()

  function getFinal(uint v) external view returns(uint) {
    // cannot read private of parent
    // uint r = x;
    // uint r = sumOne(v);

    // can read internal and public of parent
    uint r = y + sumXAndOne(v) + sumXAndOneAndTwo(v) + sumXAndOneAndTwoPublic(v);

    // cannot use external
    // uint r = sumXAndOneAndTwoExternal(v);

    return r;
  }
}

contract VisibilityConsumer {
  function useVisibitly(VisibilityAbstract visibility) public view returns(uint) {
    // cannot use visibility.sumXAndOneAndTwo(10)
    return visibility.sumXAndOneAndTwoPublic(10);
  }
}
