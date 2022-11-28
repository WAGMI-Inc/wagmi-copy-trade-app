const db = require("../models");
const Token = db.token;

exports.getAllTokens = (req, res) => {
    Token.find({}).exec(function (err, result) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send(JSON.stringify(result));
        }
    })
}

exports.getTokenById = (req, res) => {
    Token.findOne({ token_id: req.body.token_id }).exec(function (err, result) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send(JSON.stringify(result));
        }
    })
}