var unirest = require('unirest');
var config = require(__dirname + '/config.js');

// Making a Post Request
unirest.post(config.BOTURL + 'setWebHook')
.send({'url':'https://78.46.119.98:3000'})
.end(function(response){
    console.log(response);
});
