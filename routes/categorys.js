var express = require('express');
var router = express.Router();
var Models = require('../models/model');



router.get('/', function(req, res, next) {
    Models.categorys.find({},function(err,categorys){
        res.json(categorys);
	});
});


router.post('/', function(req, res, next) {

});

router.put('/:id',function(req,res){

});

module.exports = router;
