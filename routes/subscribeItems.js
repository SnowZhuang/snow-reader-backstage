var express = require('express');
var router = express.Router();
var Models = require('../models/model');


router.get('/', function (req, res, next) {
    Models.subscribeItems.find(req.query, function (err, subscribeItems) {

        var subscribeVos = subscribeItems.map(function (item) {
            //计算该item下有多少个订阅
            var itemVO = item.__opts.data;
            Models.userSubscribe.sync(function(data){
                Models.userSubscribe.count({"itemId": item.id},function(err,count){
                    itemVO.suscribeItemCount = count;
                })
            });
            return itemVO;
        });
        res.json(subscribeVos);
    });
});

/**
 * 保存订阅关系
 */
 router.post("/subscribing", function (req, res, next) {
//     /**
//      * req.session.user
//      *
//      */
//
     if (req.session && req.session.user) {
         //先查询当前用户是否有订阅该项
         Models.userSubscribe.find({"userId": req.session.user.userId, "itemId": req.body.id},function(err,subscribeUsers){
             if (subscribeUsers && subscribeUsers.length > 0) {
                 res.json({"success": fasle, "errorMessage": "该用户已经订阅"})
             } else {
                 Models.userSubscribe.save({
                    "userId": req.session.user.userId,
                     "itemId": req.body.id
                 }, function (err, result) {
                     if (!err) {
                         res.json({"success": true})
                     }
                 });

             }
         });

     } else {
         res.json({"success": fasle, "errorMessage": "用户未登陆，请登陆后进行操作"})
     }
 });


module.exports = router;
