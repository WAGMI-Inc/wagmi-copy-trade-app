const config = require("../config/auth.config");
const db = require("../models");
var ethers = require('ethers');
var crypto = require('crypto');
const Auth = db.auth;
const Wallet = db.wallet;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getAllUsers = (req, res) => {
    Auth.find({}).exec(function (err, result) {
        if (err) {
            res.status(404).send({ message: err });
        } else {
            res.send(JSON.stringify(result));
        }
    })
}

exports.signUp = (req, res) => {
    const user = new Auth({
        username: req.body.username,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        wallet_address: '',
        role: 'USER',
        image: '',
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(404).send({ message: err });
            return;
        }
        var id = crypto.randomBytes(32).toString('hex');
        var privateKey = "0x" + id;
        var address = new ethers.Wallet(privateKey);

        const wallet = new Wallet({
            user_id: user.id,
            address: address.address,
            key: privateKey
        });

        wallet.save((err) => {
            if (err) {
                res.status(400).send({ message: err });
                return;
            }
        });
    });

    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 * 300 // 24 hours
    });

    res.status(200).send({
        accessToken: token,
        user_data: user
    });
};

exports.deleteUser = (req, res) => {
    Auth.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.status(404).send({ message: err });
            return;
        }
    });

    res.status(200).send({
        message: 'success'
    });
};


exports.editUser = (req, res) => {
    Auth.findOne({
        $and: [{ username: req.body.username }, { _id: { $ne: req.body._id } }]
    }).exec((err, user) => {
        if (user) {
            res.status(400).send({ message: "Failed! email is already in use!" });
            return;
        }
    });

    if (req.body.hasOwnProperty('password'))
        req.body.password = bcrypt.hashSync(req.body.password, 8)
    Auth.findByIdAndUpdate({
        "_id": req.body._id
    }, req.body, { new: true }, function (err, model) {
        if (err) {
            res.status(404).send({ message: err });
            return;
        }

        res.status(200).send({
            user: model
        });
    });
};

exports.signin = (req, res) => {
    Auth.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(404).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found with email." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 * 300 // 24 hours
        });

        res.status(200).send({
            accessToken: token,
            user_data: user
        });
    });
};
