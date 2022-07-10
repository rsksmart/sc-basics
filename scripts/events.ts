import { ethers } from 'hardhat'

async function main() {
  const EventsFactory = await ethers.getContractFactory('Events')

  const events = await EventsFactory.deploy()
  await events.deployTransaction.wait()

  const tx = await events.emitEvent()
  const receipt = await tx.wait()

  console.log('events', receipt.events)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
