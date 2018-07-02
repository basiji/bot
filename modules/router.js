function router(req, res, connection){
    
    // Get user ID
    var userid = req.body.message.from.id;

    // Get message type
    var type = req.body.message.entities[0].type;

    console.log(type);
    res.sendStatus(200);

}

module.exports = router;