// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CellBoard{

 mapping (uint => mapping (uint => uint)) cellB;

 uint randNonce = 0;

 constructor(){
    uint seed = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce)));
     for(uint row = 1; row < 6; row++){
         for(uint col = 1; col < 8; col++){
             randNonce++;
             cellB[row][col] = seed % 4;
             seed = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce)));
         }  
     }
 }

 function getColor(uint row, uint col) public view returns (uint){
    require((row != 0) && (col != 0),"Zero numbers not allowed");
     require((row < 6) && (col < 8),"row or col out of bound");
     return cellB[row][col];
 }
}