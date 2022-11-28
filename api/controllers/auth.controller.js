const config = require("../config/auth.config");
const db = require("../models");
const Auth = db.auth;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getAllUsers = (req, res) => {
    Auth.find({}).exec(function (err, result) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send(JSON.stringify(result));
        }
    })
}

exports.signUp = (req, res) => {
    const user = new Auth({
        email: req.body.email,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        wallet_address: '',
        role: 'USER',
        image: '',
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
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
            res.status(500).send({ message: err });
            return;
        }
    });

    res.status(200).send({
        message: 'success'
    });
};


exports.editUser = (req, res) => {
    Auth.findOne({
        $and: [{ email: req.body.email }, { _id: { $ne: req.body._id } }]
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
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({
            user: model
        });
    });
};

exports.signin = (req, res) => {
    Auth.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
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
