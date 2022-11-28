const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.auth = require("./auth.model");
db.token = require("./token.model");
db.ROLES = ["User"];

module.exports = db;