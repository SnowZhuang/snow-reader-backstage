$("#login-btn").click(function() {
    var name = $("#user-name").val(),
        password = $("#user-password").val();

    var ajax = $.ajax({
        "url": "/users/login",
        // ?userName=" + name,
        "method": "post",
        "data": {
            "username": name,
            "password":password
        }
    });


    ajax.done(function (result) {
        if (result.success){
            alert("登录成功");
            window.location.href="/index.html";
        }else{
            alert(result.errorMessage);
        }
    });
});
    /* Act on the event */

