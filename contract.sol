// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Test{
    
    uint a;
    uint b;

    function setNumbers(uint _a, uint _b) public{
        a = _a;
        b = _b;
    }

    function multiply() public view returns (uint){
        return a*b;
    }

    function power() public view returns (uint){
        return a**b;
    }


}