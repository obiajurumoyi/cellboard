// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IColorHack {
    function getColor(uint x, uint y) external view returns (uint);
}