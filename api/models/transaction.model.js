var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Setup schema
var transactionSchema = mongoose.Schema({
    user_id: String,
    hash: String,
    from: String,
    to: String,
    type: String,
    date: Date,
    value: SchemaTypes.Double,
});
// Export auth model
const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;