var express = require('express');
var router = express.Router();
var Models = require('../models/model');



router.get('/', function(req, res, next) {
    Models.subscribeItems.find(req.query,function(err,subscribeItems){
        res.json(subscribeItems);
    });
});


module.exports = router;
