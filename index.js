// Configs 
var config = require(__dirname + '/modules/config.js');

// HTTPS & Express & Body-parser module
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser')

// Router module
var router = require(__dirname + '/modules/router.js');

// File module (used for SSL Certificates)
var fs = require('fs');

// MySQL module
var mysql = require('mysql');

// Server & Middlewares
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
    })); 

// Read SSL Certificates
var private_key = fs.readFileSync(__dirname + '/private/YOURPRIVATE.key');
var certificate = fs.readFileSync(__dirname + '/private/YOURPUBLIC.pem');

// Setup MySQL Connection
var connection = mysql.createConnection(config.MYSQL);

// Connect MySQL
connection.connect(function(error){
    if(error)
    console.log(error);
    else
    console.log('MySQL successfully connected.');
});

// Create Server
https.createServer({
    key:private_key,
    cert:certificate,
    passphrase:config.SSLPASSPHRASE
}, app).listen(config.PORT, function(error){
    if(error)
    console.log(error);
    else
    console.log('Listening on port ' + config.PORT);
});

// Routing
app.post('/',function(req, res){

    router(req, res, connection);

});

// Download SSL
app.get('/ssl',function(req, res){
    res.sendFile(__dirname + '/private/public.pem');
});






