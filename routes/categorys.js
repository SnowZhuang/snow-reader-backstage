var express = require('express');
var router = express.Router();
var Models = require('../models/model');



router.get('/', function(req, res, next) {
    Models.categorys.find({},function(err,categorys){
        res.json(categorys);
	});
});


router.post('/', function(req, res, next) {
	lastIndex++;
	req.body.id = lastIndex;
    categorys.push(req.body);
    res.json({
    	"success":true
    })
});

router.put('/:id',function(req,res){
	var id = req.params.id;
	for(var i = 0 ; i < categorys.length;i++){
		if (id == categorys[i].id) {
			categorys[i] = req.body;
			break;
		}
	}
	res.json({
		"success":true
	})
});

module.exports = router;
