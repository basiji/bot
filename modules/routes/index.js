var router = require('express').Router();
module.exports = function(connection){
    router.get('/index',function(){
        console.log(connection);
    });
}