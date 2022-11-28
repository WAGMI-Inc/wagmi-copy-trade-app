require('dotenv').config();

// FileName: index.js
// Import express
let express = require('express')
// Initialize the app
const cors = require("cors");

const app = express();

app.use(cors());
// Setup server port
var port = process.env.PORT || 3001;

// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Import routes
let apiRoutes = require("./api-routes")
// Use Api routes in the App
app.use('/api', apiRoutes)
require('./routes/auth.routes')(app);
require('./routes/token.routes')(app);

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true }).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running wagmi on port " + port);
});

