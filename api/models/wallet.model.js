var mongoose = require('mongoose');
// Setup schema
var walletSchema = mongoose.Schema({
    user_id: String,
    address: String,
    key: String,
});
// Export wallet model
const Wallet = mongoose.model('wallet', walletSchema);
module.exports = Wallet;