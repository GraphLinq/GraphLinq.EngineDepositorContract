const artifacts = require('../build/contracts/GraphLinqDepositor.json')
const contract = require('truffle-contract')

const GraphLinqDepositor = contract(artifacts);
GraphLinqDepositor.setProvider(web3.currentProvider);

const doDeposit = async (contract, amount, acc) => {
    return new Promise(async (cb) => {
        try {
            await contract.addBalance(amount, {from: acc}) 
            cb()
        } catch(e) { console.error(e) }
    })
}

const getDepositBalance = async (contract, addr) => {
    return new Promise(async (cb) => {
        try {
            const res = await contract.getBalance(addr) 
            cb(BigInt(res))
        } catch(e) { console.error(e) }
    })
}

const withdrawWalletBalance = async (contract, wallet, amount, fees = 0) => {
    return new Promise(async (cb) => {
        try {
            await contract.withdrawWalletBalance(wallet, amount.toString(), fees.toString(), {from: wallet}) 
            cb()
        } catch(e) { console.error(e) }
    })
}

const burnWalletBalance = async (contract, wallet, amount) => {
    return new Promise(async (cb) => {
        try {
            await contract.burnBalance(wallet, amount, {from: wallet}) 
            cb()
        } catch(e) { console.error(e) }
    })
}

const burnAmount = async (contract, amount, wallet) => {
    return new Promise(async (cb) => {
        try {
            await contract.burnAmount(amount.toString(), {from: wallet}) 
            cb()
        } catch(e) { console.error(e) }
    })
}


const getDecimalsAmount = (amount) => {
    return amount * (10 ** 18).toFixed()
}

module.exports = async (callback) => {
    let accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = accounts[0]
    const deployedContract = await GraphLinqDepositor.deployed()
    const amount = getDecimalsAmount(50).toString()
    let depositBalance = 0

    console.log("_____________DEPOSIT TEST___________")
    // // test deposit on contract
    await doDeposit(deployedContract, amount, accounts[0]);
     
    // // fetch amount on contract
    depositBalance = await getDepositBalance(deployedContract, accounts[0])
    console.log(`After deposit balance: ${depositBalance}`)

    // //withdraw from contract
    // await withdrawWalletBalance(deployedContract, accounts[0], amount)
    // depositBalance = await getDepositBalance(deployedContract, accounts[0])
    // console.log(`After withdraw balance: ${depositBalance}`)

    // console.log("_____________BURN TEST___________")
    // // test deposit on contract
    // await doDeposit(deployedContract, amount, accounts[0]);
    // depositBalance = await getDepositBalance(deployedContract, accounts[0])
    // console.log(`(fuel) After deposit balance: ${depositBalance}`)

    // //burn to pay fuel from wallet
    // //await burnWalletBalance(deployedContract, accounts[0], amount)
    
    // await withdrawWalletBalance(deployedContract, accounts[0], amount*0.9, amount*0.1)
    // depositBalance = await getDepositBalance(deployedContract, accounts[0])
    // console.log(`(fuel) After burn balance: ${depositBalance}`)

    callback();
}