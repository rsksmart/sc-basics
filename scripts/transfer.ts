import { ethers } from 'hardhat'
import { BigNumberish } from 'ethers'

const formatBalance = (bn: BigNumberish) => ethers.utils.formatEther(bn) + ' RBTC'

async function main() {
  const [signer] = await ethers.getSigners()

  const alice = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

  const balanceOfSigner = await signer.getBalance()
  console.log('balanceOfSigner', formatBalance(balanceOfSigner))

  const tx = await signer.sendTransaction({
    to: alice,
    value: ethers.utils.parseEther('0.0005')
  })
  console.log('tx', tx)

  const receipt = await tx.wait()
  console.log('receipt', receipt)

  const balanceOfAlice = await ethers.provider.getBalance(alice)
  console.log('balanceOfAlice', formatBalance(balanceOfAlice))

  const newBalanceOfSigner = await signer.getBalance()
  console.log('balanceOfSigner', formatBalance(newBalanceOfSigner))

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
