function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Log message
    console.log(req.body.message);

    // Get message type
    var type = req.body.message.entities[0].type || 'null';

    console.log(type);
    res.sendStatus(200);

}

module.exports = router;