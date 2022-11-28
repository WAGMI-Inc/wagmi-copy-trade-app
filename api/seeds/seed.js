require('dotenv').config();
var mongoose = require('mongoose');
const db = require("../models");
const Auth = db.auth;
var bcrypt = require("bcryptjs");

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true }).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

const user = new Auth({
    username: 'admin@gmail.com',
    firstname: 'A',
    lastname: 'A',
    wallet_address: '0xCa99d757b7eC25362FeD03801065E99505309Cb5',
    role: 'User',
    image: '',
    password: bcrypt.hashSync('asdasdasd', 8)
});
user.save(user);