var config = require(__dirname + '/modules/config.js');
var unirest = require('unirest');

// Set Webhook
unirest.post(config.BOTURL + 'setWebHook')
.headers({'Content-Type': 'multipart/form-data'})
.field('url', 'https://78.46.119.98:443') // Form field
.attach('certificate', __dirname + '/private/public.pem') // Attachment
.end(function(response){
    console.log(response);
});
