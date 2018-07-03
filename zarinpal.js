var config = require(__dirname + '/modules/config');
const request = require('request-promise')

var options = {
    method: 'POST',
    uri: config.ZARINPAL_REQUEST,
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    },
    body: {
        MerchantID : config.ZARINPALTOKEN,
        Amount : 1000,
        Description : 'Some description',
        CallbackURL : 'http://google.com'
    },
    json: true 
  };

  request(options)
  .then(function (data) {

    var Status = data.status;
    var Authority = data.Authority;
    console.log(config.ZARINPAL_GATEWAY + Authority + '/' + config.BANKS.ASAN);


})
  .catch(function (err) {
    console.log(err);
  });