
var unirest = require('unirest');
var config = require('./config');

function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Get message 
    var message = parseMessage(req.body.message);    
    
    // * Log Message
    console.log(message);
    
    // Check for commands
    if(message.type === 'bot_command')
        handleCommands(message, connection);
    
    // Check for user inputs
    else 
        handleInputs(message, connection);
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
    connection.query("SELECT * FROM bot_suers WHERE userid = '" + message.from.id + "'", function (error, result){

        if(error)
        return;

        // Register new user
        if(result.length === 0){

            connection.query("INSERT INTO bot_users SET ?",
            {
                userid:message.from.id,
                name:message.form.first_name,
            },
            function(error){
                
                if(error)
                return console.log(error);
                
                // Welcome message
                sendMessage(message.chat.id, 'Registered ' + message.from.first_name);


            });

        } else {

            // Welcome message
            return sendMessage(message.chat.id, 'Logined ' + message.from.first_name);

        }


    });
}


function sendMessage(chat_id, text){
    unirest
    .post(config.BOTURL + 'sendMessage')
    .send({'chat_id':chat_id,'text':text})
    .end(function(response){
    console.log(response);
});

}


function parseMessage(message){
    // Command message
    if(message.entities)
        return {
            type:message.entities[0].type,
            text:message.text
        };
    // User input message
    else return {
        type:'text',
        text:message.text
    }
}


module.exports = router;