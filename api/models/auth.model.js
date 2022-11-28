var mongoose = require('mongoose');
// Setup schema
var authSchema = mongoose.Schema({
    username: { type: String, unique: true },
    firstname: String,
    lastname: String,
    wallet_address: String,
    role: String,
    image: String,
    password: String,
});
// Export auth model
const Auth = mongoose.model('user', authSchema);
module.exports = Auth;