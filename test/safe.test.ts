import { ethers } from 'hardhat'
import { expect } from 'chai'

async function deploySafe() {
    const members = await ethers.getSigners().then(s => s.slice(0, 3))

    const safeFactory = await ethers.getContractFactory('Safe')
    const safe = await safeFactory.deploy(members.map(m => m.address))

    return { safe, members }
}

describe('Safe', function () {
    it('adds initial family members', async function () {
        const { safe, members } = await deploySafe()

        for (const member of members) {
            expect(await safe.isFamilyMember(member.address)).to.be.true
        }
    })

    it('receives deposits and emits event', async function () {
        const { safe } = await deploySafe()

        const sender = await ethers.getSigners().then(signers => signers[4])
        const amount = ethers.utils.parseEther('0.1')

        const tx = await sender.sendTransaction({
            to: safe.address,
            value: amount
        })

        const receipt = await tx.wait()

        const event = receipt.logs[0]

        const decodedEvent = safe.interface.decodeEventLog('Deposit', event.data, event.topics)

        expect(decodedEvent['sender']).eq(sender.address)
        expect(decodedEvent['time']).lte(await ethers.provider.getBlock('latest').then(b => b.timestamp))
        expect(decodedEvent['amount']).eq(amount)
    })

    it('allows family members to withdraw', async function () {
        const { safe, members } = await deploySafe()

        const sender = await ethers.getSigners().then(signers => signers[4])

        await sender.sendTransaction({
            to: safe.address,
            value: ethers.utils.parseEther('0.1')
        }).then(tx => tx.wait())

        const receiver = members[1]
        const amount = ethers.utils.parseEther('0.05')

        const tx = await safe.connect(receiver).withdraw(receiver.address, amount)
        const receipt = await tx.wait()
        const event = receipt.events![0]

        expect(event.args!['receiver']).eq(receiver.address)
        expect(event.args!['time']).lte(await ethers.provider.getBlock('latest').then(b => b.timestamp))
        expect(event.args!['amount']).eq(amount)
        expect(await ethers.provider.getBalance(safe.address)).to.eq(ethers.utils.parseEther('0.05'))
    })

    it('doesn\'t allow others to withdraw', async function() {
        const { safe } = await deploySafe()

        const sender = await ethers.getSigners().then(signers => signers[4])

        await sender.sendTransaction({
            to: safe.address,
            value: ethers.utils.parseEther('0.1')
        }).then(tx => tx.wait())

        const receiver = await ethers.getSigners().then(signers => signers[7])
        const amount = ethers.utils.parseEther('0.05')

        expect(safe.connect(receiver).withdraw(receiver.address, amount)).revertedWith('Only family members')
        expect(await ethers.provider.getBalance(safe.address)).to.eq(ethers.utils.parseEther('0.1'))
    })
})
