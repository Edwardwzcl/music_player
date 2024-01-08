// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');
    cache = require('./config/cache');
    session = require('express-session');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

// Connect to a MongoDB --> Uncomment this once you have a connection string!!
mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true });

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};


app.use(allowCrossDomain);

const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'AKIAT6MIC35AZ5RV4FN5',
    secretAccessKey:'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',
    region:'us-east-2'});

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(
    session({
        secret : 'record login status',
        resave : true,
        saveUninitialized : true,
        cookie: {
            expires : 60000,
            secure: false
        }
    })
)
;
// Use routes as a module (see index.js)
require('./routes')(app, router);


app.get('/exit',(req,res) => {
    req.session = null;
    res.status(200).send('successfully exits');
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
