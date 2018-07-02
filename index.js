var config = require(__dirname + '/modules/config.js');
var express = require('express');
var fs = require('fs');
var https = require('https');
var mysql = require('mysql');
var bodyParser = require('body-parser')
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

    console.log(req.body.message);
    res.sendStatus(200);

});

app.get('/ssl',function(req, res){
    res.sendFile(__dirname + '/private/public.pem');
});






