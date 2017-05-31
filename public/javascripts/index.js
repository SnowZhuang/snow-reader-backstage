

//先获取登录用户信息，若获取不到，直接跳转回登录页面

$.ajax({"url":"/users/currentUserInfos","method":"get"})
    .done(function(user){
       if (user.username){
           $("#userinfo-username").html(user.username);
           $("#userinfo-username").removeClass("dispear");
           $("#exit").removeClass("dispear");
           $("#login").addClass("dispear");
           $("#register").addClass("dispear");
       }else{
           $("#userinfo-username").addClass("dispear");
           $("#exit").addClass("dispear");
       }
    });

function logout(){
    $.ajax({"url":"/users/logout","method":"delete"})
        .done(function(){
            $("#userinfo-username").addClass("dispear");
            $("#exit").addClass("dispear");
            $("#login").removeClass("dispear");
            $("#register").removeClass("dispear");
        });
}



$.ajax({
    "url": "/categorys",
    "method": "get"
}).done(function(categorys) {
    $.each(categorys, function(index, category) {
        $("#categoryList")
            .append('<li role="presentation"><a href="#" onClick="loadSubcribeItems(' + category.id + ')">' + category.categoryName + '</a></li>')
    })
});
/*var loadAll = function() {
    $.ajax({
        "url": "/snow-reader/subscribeItems",
        "method": "get"
    }).done(function(subscribeItems) {
        $.each(subscribeItems, function(index, subscribeItem) {
            var panel = $('<div class="bookContain">');
            panel.append('<div class="book-name pull-left "><img src="images/1.jpg" width="20px" height="20px"><a >' + subscribeItem.subscribeName + '</a> </div>')
                .append('<div  class="pull-right">  <button class="btn btn-default  " >订阅</button></div>')
                .append('<div class="book-instruction " > ' + subscribeItem.subscribeInstruction + '</div>')
                .append('<div class="book-subscribeMessage" style="text-align: right;">时间.订阅人数</div> ')
            $("#rbight-column").append(panel);
        })
    });

};

loadAll();*/




var loadSubcribeItems = function(categoryId){
	var data = {};
	if (categoryId!==undefined) {
		data.categoryId = categoryId;
	}

	$.ajax({
            "url": "/subscribeItems",
            "method": "get",
            "data":data
        }).done(function(subscribeItems) {
            $("#rbight-column").children().remove();
            $.each(subscribeItems, function(index, subscribeItem) {
                var panel = $('<div class="bookContain">');
                panel.append('<div class="book-name pull-left "><img src="images/1.jpg" width="20px" height="20px"><a >' + subscribeItem.subscribeName + '</a> </div>')
                    .append('<div  class="pull-right">  <button class="btn btn-default  " onClick="subscribe()" data="'+subscribeItem.id+'"  >订阅</button></div>')
                    .append('<div class="book-instruction " > ' + subscribeItem.subscribeInstruction + '</div>')
                    .append('<div class="book-subscribeMessage" style="text-align: right;"><span>time</span><span>'+subscribeItem.subscribeCount+'</span></div> ')
                $("#rbight-column").append(panel);
            })
        });
};

loadSubcribeItems();

function changestyle(event){
    alert("ssss");

   $("#aa").color="red";
}

// var subscribe = function (event) {
//     $.ajax({
//         url: '/subscribeItems/subscribing',
//         method: "post",
//         data: {
//
//
//         }
//
//     }).done(function (result) {
//         if(result.success){
//             alert("订阅成功");
//
//         }else {
//             alert(result.errorMessage);
//         }
//
//     });
//     //找到订阅的数据
//     //+1
//
// };