var config = require(__dirname + '/config.js');
var unirest = require('unirest');

// Set Webhook
unirest.post(config.BOTURL + 'setWebHook')
.send({'url':'https://78.46.119.98:443','certificate':'https://78.46.119.98:443/ssl'})
.end(function(response){
    console.log(response);
});
