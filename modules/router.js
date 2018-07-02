function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Log message
    console.log(req.body.message);

    // Get message type
    var message = parseMessage(req.body.message);    
    console.log(message);

    console.log(type);
    res.sendStatus(200);

}

function parseMessage(message){
    // Command message
    if(message.entities)
        return {
            type:'command',
            text:message.entities[0].text
        };
    // User input message
    else return {
        type:'text',
        text:message.text
    }
}


module.exports = router;