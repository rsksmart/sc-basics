<p align="middle">
    <img src="https://iovlabs.org/img/logos/logo.png" alt="logo" height="100" >
</p>
<h3 align="middle">Smart contracts basics</h3>
<p align="middle">
    Some basic examples to learn Solidity + scripts to see results
</p>

First install dependencies:

```sh
npm i
```

Start learning! Try running the scripts to see how the contracts work.

## Transfer script

A simple script that shows how to transfer RBTC from an account to another account.

```sh
npx hardhat run scripts/transfer.ts
```

## Basic structure and function modifiers

Understand the basic structure of a smart contract. See `contracts/BasicStructure.sol`

```sh
npx hardhat run scripts/basicStructure.ts
```

Try testing with

```sh
npx hardhat test
```

> Read more at https://docs.soliditylang.org/en/latest/structure-of-a-contract.html, https://docs.soliditylang.org/en/latest/contracts.html#state-mutability and https://docs.soliditylang.org/en/latest/contracts.html#special-functions

## Data Types

Data types available in smart contracts. See `contracts/DataTypes.sol`

```
npx hardhat run scripts/dataTypes.ts
```

> Read more at https://docs.soliditylang.org/en/latest/types.html

## Inheritance, state mutability and visibility

A little bit about inheritance and function visibility. See `contracts/Visibility.sol`

```
npx hardhat run scripts/visibility.ts
```

> Read more at https://docs.soliditylang.org/en/latest/contracts.html#functions and https://docs.soliditylang.org/en/latest/contracts.html#inheritance

## Require, revert and modifiers

How to validate and revert transactions. See `contracts/Reverts.sol`

```
npx hardhat run scripts/reverts.ts
```

> Read more at https://docs.soliditylang.org/en/latest/contracts.html#errors-and-the-revert-statement and https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers

## Libraries and imports

See how to use libraries and how to import third-party contracts

```
npx hardhat run scripts/libraries.ts
```

> Read more at https://docs.soliditylang.org/en/latest/contracts.html#libraries and https://docs.soliditylang.org/en/latest/path-resolution.html?highlight=import#imports
