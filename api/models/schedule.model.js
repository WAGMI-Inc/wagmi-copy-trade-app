var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// Setup schema
var scheduleSchema = mongoose.Schema({
    user_id: String,
    amount: SchemaTypes.Double,
});
// Export auth model
const Schedule = mongoose.model('schedule', scheduleSchema);
module.exports = Schedule;