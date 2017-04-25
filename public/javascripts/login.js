$("#login-btn").click(function() {
    var name = $("#user-name").val(),
        password = $("#user-password").val();

    var ajax=$.ajax({
        "url": "/snow-reader/users/login",
        // ?userName=" + name,
        "method": "get",
        "date":{"userName":+name}
    });

    
    ajax.done(function(userInfos) {
        var userInfo = userInfos[0];
        if (userInfo.password == password) {
            alert("登录成功");
        }else{
        	alert("密码错误");
        }
    });

    ajax.fail(function() {
        
       
        	alert("用户不存在");
        
    });
    /* Act on the event */

