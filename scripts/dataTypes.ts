import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'

async function main() {
  const [signer] = await ethers.getSigners()

  const DataTypesFactory = await ethers.getContractFactory('DataTypes');

  const dataTypes = await DataTypesFactory.deploy()
  await dataTypes.deployTransaction.wait()

  console.log('use bool', await dataTypes.useBool())

  console.log('sum unit', await dataTypes.sumUint())

  console.log('cast', await dataTypes.castWithInt())

  console.log('balance of address', await dataTypes.balanceOfAlice())

  await signer.sendTransaction({
    to: dataTypes.address,
    value: BigNumber.from('10000000000')
  }).then(tx => tx.wait())

  const bob = '0xD6a4BE579821fc6737360f0f921BAdFcFea55ACc'
  await dataTypes.transferToBob().then(tx => tx.wait())
  console.log('transfer to address', await ethers.provider.getBalance(bob))

  const BasicStructureFactory = await ethers.getContractFactory('BasicStructure')
  const getterSetter = await BasicStructureFactory.deploy()
  await getterSetter.deployTransaction.wait()

  console.log('call a contract', await dataTypes.getMessageOfGetterSetter(getterSetter.address))

  console.log('arrays', await dataTypes.getElement(BigNumber.from(0)))
  console.log('arrays', await dataTypes.getElement(BigNumber.from(1)))

  const a = '0x1111122222333334444455555666667777788888'
  await dataTypes.saveApples(a, BigNumber.from(10)).then(tx => tx.wait())
  console.log('get from map', await dataTypes.getApples(a))
  console.log('get from map default value', await dataTypes.getApples(signer.address))

  console.log('struct', await dataTypes.getState())
  await dataTypes.nextState().then(tx => tx.wait())
  console.log('updated struct', await dataTypes.getState())

  console.log('struct', await dataTypes.getStructVal())
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
