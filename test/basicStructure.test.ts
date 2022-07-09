import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'
import { expect } from 'chai'

describe('BasicStructure', function () {
  it('pure returns 100+100', async function () {
    const BasicStructureFactory = await ethers.getContractFactory('BasicStructure')

    const basicStructure = await BasicStructureFactory.deploy()
    await basicStructure.deployTransaction.wait()

    expect(await basicStructure.twoHundred()).eq(BigNumber.from(200))
  })

  it('has initial value', async function () {
    const BasicStructureFactory = await ethers.getContractFactory('BasicStructure')

    const basicStructure = await BasicStructureFactory.deploy()
    await basicStructure.deployTransaction.wait()

    expect(await basicStructure.readStorage()).eq(BigNumber.from(10))
  })

  it('writes 200 in storage', async function () {
    const BasicStructureFactory = await ethers.getContractFactory('BasicStructure')

    const basicStructure = await BasicStructureFactory.deploy()
    await basicStructure.deployTransaction.wait()

    const newValue = BigNumber.from(200)
    const tx = await basicStructure.writeStorage(newValue)
    await tx.wait()

    expect(await basicStructure.readStorage()).eq(newValue)
  })

  it('cannot write another value', async function () {
    const BasicStructureFactory = await ethers.getContractFactory('BasicStructure')

    const basicStructure = await BasicStructureFactory.deploy()
    await basicStructure.deployTransaction.wait()

    const newValue = BigNumber.from(100)
    await expect(basicStructure.writeStorage(newValue)).revertedWith('Error message!')
  })
})

