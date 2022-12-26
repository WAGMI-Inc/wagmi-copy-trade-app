const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.auth = require("./auth.model");
db.token = require("./token.model");
db.wallet = require("./wallet.model");
db.transaction = require('./transaction.model');
db.schedule = require('./schedule.model')
db.ROLES = ["User"];

module.exports = db;