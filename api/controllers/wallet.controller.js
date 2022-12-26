const db = require("../models");
const Pusher = require("pusher")

var ethers = require('ethers');
var crypto = require('crypto');
const Web3 = require('web3');
const Wallet = db.wallet;
const Transaction = db.transaction;
const Schedule = db.schedule;

exports.getDepositWallet = (req, res) => {
    Wallet.findOne({ user_id: req.userId }).exec(function (err, result) {
        if (err) {
            var id = crypto.randomBytes(32).toString('hex');
            var privateKey = "0x" + id;
            var address = new ethers.Wallet(privateKey);

            const wallet = new Wallet({
                user_id: user._id,
                address: address.address,
                key: privateKey
            });

            wallet.save((err, wallet) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            });
            res.send(JSON.stringify(address.address));
        } else {
            res.send(JSON.stringify(result.address));
        }
    })
}

exports.listenETHTransactions = () => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_WS_URL))

    var subscription = web3.eth.subscribe('pendingTransactions', function (error, result) {
    }).on('data', async (txHash) => {
        handleTransaction(txHash);
    })
}

exports.getUserTransactions = (req, res) => {
    Transaction.find({ user_id: req.userId }).exec(function (err, result) {
        if (err) {
            res.status(404).send({ message: err });
        } else {
            res.send(JSON.stringify(result));
        }
    })
}

exports.setAutoSchedule = (req, res) => {
    Schedule.deleteMany({ user_id: req.userId }).exec();
    const schedule = new Schedule({
        user_id: req.userId,
        amount: req.body.amount
    });

    schedule.save((err, result) => {
        if (err) {
            res.status(404).send({ message: err });
            return;
        }
        res.send(JSON.stringify(result.amount));
    });

}

exports.getUserAutoSchedule = (req, res) => {
    Schedule.findOne({ user_id: req.userId }).exec(function (err, result) {
        if (err) {
            res.status(404).send({ message: err });
        } else {
            if (result)
                res.send(JSON.stringify(result.amount));
            else
                res.send(JSON.stringify(0));
        }
    })
}

exports.removeAutoSchedule = (req, res) => {
    Schedule.deleteMany({ user_id: req.userId }).exec(function (err, result) {
        if (err) {
            res.status(404).send({ message: err });
        } else {
            res.send(JSON.stringify("success"));
        }
    });
}

handleTransaction = async (txHash) => {
    try {
        // Instantiate web3 with HttpProvider
        const web3Http = new Web3(process.env.INFURA_URL)

        // Get transaction details
        let trx = await web3Http.eth.getTransaction(txHash)
        if (!trx)
            return;
        Wallet.findOne({ address: trx.to }).exec(async function (err, result) {
            if (err) {
            } else {
                if (result) {
                    while (1) {
                        if (trx.blockNumber)
                            break;
                        trx = await web3Http.eth.getTransaction(txHash)
                    }

                    const transaction = new Transaction({
                        user_id: result.user_id,
                        hash: txHash,
                        from: trx.from,
                        to: trx.to,
                        type: 'Deposit',
                        date: new Date(),
                        value: Web3.utils.fromWei(trx.value, 'ether')
                    });

                    transaction.save();

                    const pusher = new Pusher({
                        appId: "1209134",
                        key: "b4cbc7e522ed1708473d",
                        secret: "512805ddbf316592a3a8",
                        cluster: "eu",
                        useTLS: true
                    });

                    pusher.trigger("wagmi-channel", "deposit", {
                        transaction: transaction
                    }).then().catch(e => console.log(e));
                }
            }
        })
    }
    catch (error) {
        console.log(error)
    }
}