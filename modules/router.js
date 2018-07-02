
var unirest = require('unirest');
var config = require('./config');
var constants = require('./constants');
var keyboard = require('./keyboard');

function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Get message 
    var message = req.body.message;    
    
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
        case 'خرید ووچر پرفکت مانی':
        sendMessage(message.chat.id, 'Please select :',keyboard.voucher_menu);
        break;

        default:
        return;
    }
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
                sendMessage(message.chat.id, 'Registered ' + message.from.first_name, keyboard.welcome_menu);
            });

        } else {

            // Welcome message
            sendMessage(message.chat.id, 'Logined ' + message.from.first_name, keyboard.welcome_menu);

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
    return;
    });
}
module.exports = router;