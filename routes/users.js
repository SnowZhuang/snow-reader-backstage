var express = require('express');
var Models = require('../models/model.js');
var session = require('express-session');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/login', function (req, res, next) {
    var loginInfo = req.body;
    Models.accounts.find(loginInfo,function(err,users){
        if (users.length === 0){
            res.json({
                "success":false,
                "errorMessage":"用户或密码错误"
            });
        }else{
            req.session.user = users[0];
            res.json({
                "success":true
            });
        }
    })

});
router.get('/currentUserInfos',function(req,res,next){
     if (req.session.user){
         res.json(req.session.user);
     }else{
         res.json({});
         //跳转回登录页面
     }
});
module.exports = router;
