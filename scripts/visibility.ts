import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'

async function main() {
  const VisibilityFactory = await ethers.getContractFactory('Visibility')
  const visibility = await VisibilityFactory.deploy()
  await visibility.deployTransaction.wait()

  console.log('Child functions')

  console.log(await visibility.z())
  console.log(await visibility.getFinal(BigNumber.from(1000)))

  console.log('Parent functions')

  console.log(await visibility.sumXAndOneAndTwoPublic(BigNumber.from(1000)))
  console.log(await visibility.sumXAndOneAndTwoExternal(BigNumber.from(1000)))
  console.log(await visibility.p())

  // not available functions
  // console.log(await visibility.x())
  // console.log(await visibility.y())
  // console.log(await visibility.sumOne(BigNumber.from(1000)))
  // console.log(await visibility.sumXAndOne(BigNumber.from(1000)))
  // console.log(await visibility.sumXAndOneAndTwo(BigNumber.from(1000)))
  // console.log(await visibility.sumUsingChild())

  console.log('Abstract interface consumer')

  const VisibilityConsumerFactory = await ethers.getContractFactory('VisibilityConsumer')
  const visibilityConsumer = await VisibilityConsumerFactory.deploy()
  await visibilityConsumer.deployTransaction.wait()

  console.log(await visibilityConsumer.useVisibitly(visibility.address))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
