var config = require(__dirname + '/modules/config.js');
var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();
var mysql = require('mysql');

// Read SSL Certificates
var private_key = fs.readFileSync(__dirname + '/private/key.pem');
var certificate = fs.readFileSync(__dirname + '/private/cert.pem');

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
app.get('/',function(req, res){

    console.log(req);
    res.sendStatus(200);

});

app.get('/ssl',function(req, res){
    res.sendFile(__dirname + '/private/key.pem');
});






