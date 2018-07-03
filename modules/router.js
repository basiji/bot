
var unirest = require('unirest');
var config = require('./config');
var constants = require('./constants');
var keyboard = require('./keyboard');
var validator = require('email-validator');
var CryptoJS = require('crypto-js');
var request = require('request-promise')


function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Get message 
    var message = req.body.message;    
    
    // * Log message
    console.log(message);

    handleMessage(message, connection);

    return res.sendStatus(200);
}


function handleMessage(message, connection){
    switch(message.text){
        
        // Start -> register / login -> main menu
        case '/start':
        registerUser(message, connection);
        break;

        // voucher -> voucher list -> select
        case constants.BUY_VOUCHER:
        sendMessage(message.chat.id, constants.SELECT_VOUCHER,keyboard.voucher_menu);
        break;

        default:
            if(message.text.includes('$')){
                // Voucher Selected -> create transaction record
                var usdprice = message.text.split(' ')[0];
                var irrprice = usdprice * config.USDPRICE * 10;

                connection.query("INSERT INTO bot_transactions SET ?",
                {
                    userid:message.from.id,
                    price:irrprice
                }, function(error, result){
                    
                    if(error)
                    //return sendMessage(message.chat.id, constants.SERVER_ERROR, keyboard.voucher_menu);
                    console.log(error);

                    // Generate encrypted token
                    var payment_id = result.insertId;
                    var userid = message.from.id;
                    var token = CryptoJS.AES.encrypt(payment_id + "#" + userid, config.SECRET_KEY);
                    

                    var response = constants.INVOICE
                    .replace('%usdprice%',usdprice)
                    .replace('%irrprice%',irrprice.toLocaleString())
                    .replace('%vouchercode%',Math.floor((Math.random() * 9999999999) + 1));


                    // Prepare payment gateway
                    var options = {
                    method: 'POST',
                    uri: config.ZARINPAL_REQUEST,
                    headers: {
                    'cache-control': 'no-cache',
                    'content-type': 'application/json'
                    },
                    body: {
                    MerchantID : config.ZARINPALTOKEN,
                    Amount : irrprice / 10,
                    Description : 'Some description',
                    CallbackURL : 'http://google.com'
                    },
                    json: true 
                    };

                    request(options)
                    .then(function (data) {
                    var Status = data.status;
                    
                    // If requets failed
                    if(Status !== 200)
                    //return sendMessage(message.chat.id, constants.SERVER_ERROR, keyboard.voucher_menu);
                    console.log(data);

                    var Authority = data.Authority;
                    // Send Message with payment button
                    sendMessage(
                        message.chat.id,
                        response,
                        JSON.stringify({
                        inline_keyboard:[
                            [{
                                text:'ورود به درگاه پرداخت',
                                url: config.ZARINPAL_GATEWAY + Authority + '/' + config.BANKS.ASAN
                            }]]
                        }));
                    })
                    
                    // if request failed
                    .catch(function (err) {
                        return sendMessage(message.chat.id, constants.SERVER_ERROR, keyboard.voucher_menu);
                        console.log(err);
                    });
                });
    
            } else if (!isNaN(message.text)){
                // Custom price
                var price = message.text;
                if(parseInt(price) %5 !== 0)
                return sendMessage(message.chat.id, 'Invalid input.');
                return sendMessage(message.chat.id, 'You entered : ' + price + 'USD');
            } else if (message.text.includes('@')) {
                // Email verification
                var email = message.text;
                if(validator.validate(email)){
                    updateUserEmail(message, email, connection);
                } else {
                    sendMessage(message.chat.id, 'Email incorrect.');
                }
            } else {
                return;
            }
        
    }
}

function updateUserEmail(message, email, connection){
    connection.query("UPDATE bot_users WHERE userid = '" + message.from.id + "' SET email = '" + email + "'",function(error){
        if(error)
        sendMessage(message.chat.id, constants.SERVER_ERROR);
        else 
        sendMessage(message.chat.id, constants.EMAIL_UPDATE_SUCCESS);
        
    });
}

function registerUser(message, connection){
    
    // Check for userID
    connection.query("SELECT * FROM bot_users WHERE userid = '" + message.from.id + "'", function (error, result){

        if(error)
        return console.log(error);

        // Register new user
        if(result.length === 0){

            connection.query("INSERT INTO bot_users SET ?",
            {
                userid:message.from.id,
                name:message.from.first_name,
            },
            function(error){
                
                if(error)
                return console.log(error);
                
                // Welcome message
                sendMessage(message.chat.id, constants.WELCOME_MESSAGE, keyboard.welcome_menu);
            });

        } else {

            // Welcome message
            sendMessage(message.chat.id, constants.WELCOME_MESSAGE, keyboard.welcome_menu);
        }


    });
}

function sendMessage(chat_id, text, keyboard = []){
    unirest
    .post(config.BOTURL + 'sendMessage')
    .send({
        'chat_id':chat_id,
        'text':text,
        'reply_markup':keyboard
    })
    .end(function(response){
    console.log(response);
    });
}
module.exports = router;