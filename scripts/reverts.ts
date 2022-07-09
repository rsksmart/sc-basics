import { ethers } from 'hardhat'
import { BigNumber, ContractTransaction } from 'ethers'

async function main() {
  const RevertsFactory = await ethers.getContractFactory('Reverts')

  const [owner, friend, mallory] = await ethers.getSigners()

  const reverts = await RevertsFactory.connect(owner).deploy(friend.address)
  await reverts.deployTransaction.wait()

  console.log('deployer restriction')
  console.log('====================')

  console.log('before sending with friend', await reverts.x())

  await reverts.connect(friend).superRestricted().catch((e: Error) => console.log('error', e.message))
  console.log('after sending with friend', await reverts.x())

  await reverts.connect(owner).superRestricted().then((tx: ContractTransaction) => tx.wait())
  console.log('after sending with owner', await reverts.x())

  console.log()

  console.log('owner or friend restriction')
  console.log('===========================')

  console.log('before sending with mallory', await reverts.x())

  await reverts.connect(mallory).notSoRestricted().catch((e: Error) => console.log('error', e.message))
  console.log('after sending with mallory', await reverts.x())

  await reverts.connect(friend).notSoRestricted().then((tx: ContractTransaction) => tx.wait())
  console.log('after sending with friend', await reverts.x())

  await reverts.connect(owner).notSoRestricted().then((tx: ContractTransaction) => tx.wait())
  console.log('after sending with owner', await reverts.x())


  console.log('always reverted')
  console.log('===============')

  console.log('before sending', await reverts.x())

  await reverts.connect(owner).neverWorks().catch((e: Error) => console.log('error', e.message))
  console.log('after sending', await reverts.x())
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
