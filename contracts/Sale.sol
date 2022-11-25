// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract NFTSale {
    uint256 public price;
    mapping(address => uint16) public owners;

    constructor() {
        price = 0.1 ether;
    }

    function buy(uint8 _amount) external payable returns (bool) {
        require(_amount > 0, "Invalid quantity");
        require(msg.value >= _amount * price, "Invalid amount sent");

        owners[msg.sender] += _amount;

        return true;
    }
}
