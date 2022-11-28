var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Setup schema
var tokenSchema = mongoose.Schema({
    token_id: String,
    contract_address: String,
    name: String,
    symbol: String,
    image: String,
    price: SchemaTypes.Double,
    marketcap: String,
    diluted_marketcap: String,
    dh_score: SchemaTypes.Double,
    release_date: Date,
    ath_change_percentage: SchemaTypes.Double,
    price_change_24h: SchemaTypes.Double,
    liquidity: SchemaTypes.Double,
    supply: SchemaTypes.Double,
    website: String
});
// Export auth model
const Token = mongoose.model('token', tokenSchema);
module.exports = Token;