// (c) 2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: Ecosystem

pragma solidity ^0.8.0;

contract TokenTransfer {
  // Define data structure for accounts
  struct Account {
    uint256 tokenA;
    uint256 tokenB;
  }

  // Mapping to store account data
  mapping(address => Account) public accounts;

  // Event to signal token transfer
  event Transferred(address indexed to, uint256 amount);

  uint256 initial_value = 100;

  constructor() public {
    // Initialize accounts with 0 tokens (optional, adjust as needed)
    accounts[msg.sender] = Account(100, 100);
  }

  // Function to transfer tokens
  function transfer(uint256 amount) public {


    // Ensure sufficient balance in tokenA
    //require(accounts[msg.sender].tokenA >= amount, "Insufficient tokenA balance");
    accounts[msg.sender].tokenB = initial_value;
    accounts[msg.sender].tokenA = initial_value;
    // Update account balances
    accounts[msg.sender].tokenA -= amount;
    accounts[msg.sender].tokenB += amount;

    // Emit transfer event
    emit Transferred(msg.sender, amount);
  }
}

