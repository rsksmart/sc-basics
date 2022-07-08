import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'

async function main() {
  const [signer] = await ethers.getSigners()

  console.log("Deploy contract")
  console.log("===============")

  const BasicStructureFactory = await ethers.getContractFactory("BasicStructure");

  const basicStructure = await BasicStructureFactory.deploy()
  console.log('deployTransaction', basicStructure.deployTransaction)

  const deployReceipt = await basicStructure.deployTransaction.wait()
  console.log('deployReceipt', deployReceipt)

  console.log("Read storage")
  console.log("============")

  console.log(await basicStructure.readStorage())

  console.log("Modify storage")
  console.log("==============")

  const modifySotrageTx = await basicStructure.writeStorage(BigNumber.from('200'))
  await modifySotrageTx.wait()

  console.log(await basicStructure.readStorage())

  console.log("Fallback functions")
  console.log("==================")

  console.log('With value')
  await signer.sendTransaction({
    to: basicStructure.address,
    value: ethers.utils.parseEther('0.0005')
  }).then(tx => tx.wait())

  console.log('With data')
  await signer.sendTransaction({
    to: basicStructure.address,
    data: '0x0011223344'
  }).then(tx => tx.wait())

  console.log("Guards")
  console.log("======")

  const error = await basicStructure.writeStorage(BigNumber.from('100')).catch(e => e)
  console.log('error', error)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
