var express = require('express');
var Models = require('../models/model.js');
var session = require('express-session');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/',function(req,res,next){
    var userInfo = Object.setPrototypeOf(req.body,{});
    //userInfo.username = req.body.username;
    //userInfo.password = req.body.password;
    // controller  model
    Models.accounts.find({"username":userInfo.username},function(err,users){
       if (users.length >0){
           res.json({"success":false,"errorMessage":"用户信息已存在"});
       }else{
           // userInfos = [];
           // userInfos[0] = userInfo;
           req.session.user = userInfo;
           Models.accounts.create(userInfo,function(err,result){

               if (err){
                   res.json({"success":false,"errorMessage":"数据库操作失败"});
               }else{

                   res.json({"success":true});
               }
           });
       }
    });

});


router.post('/login', function (req, res, next) {
    var loginInfo = req.body;
    Models.accounts.find(loginInfo, function (err, users) {
        if (users.length === 0) {
            res.json({
                "success": false,
                "errorMessage": "用户或密码错误"
            });
        } else {
            req.session.user = users[0];
            res.json({
                "success": true
            });
        }
    })
});

router.delete('/logout', function (req, res, next) {
    req.session.user = null;
    res.json({"success":true});
});
router.get('/currentUserInfos', function (req, res, next) {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.json({});
        //跳转回登录页面
    }
});
module.exports = router;
