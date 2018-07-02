
var unirest = require('unirest');
var config = require('./config');
var keyboard = require('./keyboard');

function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Get message 
    var message = req.body.message;    
    
    // * Log Message
    console.log(message);
    
    // Check for commands
    if(getMessageType(message) === 'bot_command')
        handleCommands(message, connection);
    
    // Check for user inputs
    else 
        handleInputs(message, connection);

    return res.sendStatus(200);
}


function handleCommands(message, connection){
    switch(message.text){
        case '/start':
        // Register user info (if not exists)
        registerUser(message, connection);

        case '/test':
        // Test message
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
                sendMessage(message.chat.id, 'Registered ' + message.from.first_name);
            });

        } else {

            // Welcome message
            sendMessage(message.chat.id, 'Logined ' + message.from.first_name, keyboard.welcome_keyboard);

        }


    });
}


function sendMessage(chat_id, text, keyboard = []){
    unirest
    .post(config.BOTURL + 'sendMessage')
    .send(
        {'chat_id':chat_id,
        'text':text,
        'reply_markup':JSON.stringify({
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [['yes'],['no']],
        })
    })
    .end(function(response){
    console.log(response);
});

}

function getMessageType(message){
    if(message.entities)
        return message.entities[0].type;    
    else 
        return 'user_input';
}

module.exports = router;