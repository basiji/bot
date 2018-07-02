var config = require(__dirname + '/modules/config.js');
var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();
var mysql = require('mysql');
var unirest = require('unirest');

// Read SSL Certificates
var private_key = fs.readFile(__dirname + '/ssl/key.pem');
var certificate = fs.readFile(__dirname + '/ssl/cert.pem');

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
app.use('/', require(__dirname + '/modules/routes/index.js')('Hello'));


// Making a Post Request
unirest.post(config.BOTURL + '/setWebHook')
.send({'foo':'bar'})
.end(function(response){
    console.log(response);
});




