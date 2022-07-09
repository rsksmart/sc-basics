import { ethers } from 'hardhat'

async function main() {
  const LibrariesFactory = await ethers.getContractFactory('Libraries')

  const [owner, mallory] = await ethers.getSigners()

  const libraries = await LibrariesFactory.connect(owner).deploy()
  await libraries.deployTransaction.wait()

  console.log('ownership')
  console.log('=========')

  console.log('owner', libraries.owner())

  console.log()

  console.log('guard')
  console.log('=====')

  console.log('before inc with owner', await libraries.c())

  const inc = async () => {
    await libraries.connect(owner).ownerInc().then(tx => tx.wait())
    console.log('after inc with owner', await libraries.c())
  }

  await inc()
  await inc()
  await inc()

  await libraries.connect(owner).ownerReset().then(tx => tx.wait())
  console.log('after reset with owner', await libraries.c())

  console.log('before inc with mallory', await libraries.c())
  await libraries.connect(mallory).ownerInc().catch((e: Error) => console.log('error', e.message))
  console.log('before inc with mallory', await libraries.c())
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
