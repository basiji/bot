function router(req, res, connection){
    console.log(req.body.message);
    return res.json('hello world');
}

module.exports = router;