var orm = require("orm");
var Models = {};




orm.connect("mysql://root:root@127.0.0.1:3306/snow-reader", function (err, db) {
    //  ORM object relation mapping
    // category_name
    Models.categorys = db.define("category", {
        id: Number,
        categoryName: {type: 'text', mapsTo: "category_name"}
    });

    Models.accounts = db.define("account", {
        id: Number,
        username: String,
        password: String
    },{
    });

    Models.subscribeItems = db.define("subscribe_item", {
        id: Number,
        categoryId: {type:'number',mapsTo:"category_id"},
        subscribeName: {type: 'text', mapsTo: "subscribe_name"},
        subscribeInstruction: {type: 'text', mapsTo: "subscribe_instruction"}
    });

    Models.userSubscribe = db.define("user_subscribe",{
        id:Number,
        userId:{type:'number',mapsTo:"user_id"},
        itemId:{type:'number',mapsTo:"item_id"}
    })

});

module.exports = Models;