/*Validator.bind();
$("[validate]").on("blur", function() {
    if (Validator.isValidAll()) {
        $("#submit-btn").removeAttr('disabled')
    } else {
        $("#submit-btn").attr('disabled', true)

    }
});*/





// var setValid = function(element) {
//     element.removeClass('true false');
//     element.addClass('true');
// }

// var setInvalid = function(element) {
//     element.removeClass('true false');
//     element.addClass('false');
// }

// var reset = function(element) {
//     element.removeClass('true false');

// }
var setValid = function(element) {
     element.parent().removeClass('has-success has-error');
     element.siblings('span').removeClass('glyphicon-ok glyphicon-remove');
     element.parent().addClass('has-success ');
     element.siblings('span').addClass('glyphicon-ok ');
 };
var setInvalid = function(element) {
     element.parent().removeClass('has-success has-error');
     element.siblings('span').removeClass('glyphicon-ok glyphicon-remove');
     element.parent().addClass('has-error ');
     element.siblings('span').addClass('glyphicon-remove');
 };
 var reset=function(element) {
 	element.parent().removeClass('has-success has-error');
     element.siblings('span').removeClass('glyphicon-ok glyphicon-remove');
 };

//用户名输入框获得焦点时，给出提示
$("#exampleInputEmail1").focus(function() {
	var theElement=$("#exampleInputEmail1");
	reset(theElement);
	$("#usernameTip").html("请输入您的用户名，用户名为您的邮箱");
});
//用户名输入框失去焦点时，验证用户名格式和是否已被注册
$("#exampleInputEmail1").blur(function() {
	var theElement=$("#exampleInputEmail1");
	var EmailValue=theElement.val();
	var emailRegExp = /\w+@\w+([-]\w)*(\.\w)+/;
	if(emailRegExp.test(EmailValue)){
		
		setValid(theElement);
		$("#usernameTip").html(" ");			
	}else{
		setInvalid(theElement);
 		$("#usernameTip").html("邮箱格式不正确");
	}


	
});
 
// 密码框获得焦点时，给出密码提示
$("#exampleInputPassword1").focus(function() {
	var theElement=$("#exampleInputPassword1");
	reset(theElement);
	$("#password1Tip").html("密码需同时包含数字和字母，且密码长度为6-18个字符");
});
//密码框失去焦点时验证密码
$("#exampleInputPassword1").blur(function() {
	var passwordRegExp1 = /.{6,18}/;
	var passwordRegExp2 = /[0-9]/;
	var passwordRegExp3 = /[a-zA-Z]/;
	var theElement=$("#exampleInputPassword1");
	var Password1Value=theElement.val()
	//假如符合正则
	if(passwordRegExp1.test(Password1Value)){
		if(passwordRegExp2.test(Password1Value)&&passwordRegExp3.test(Password1Value)){
			$("#password1Tip").html(" ");
			setValid(theElement);
		}else{
			setInvalid(theElement);
 			$("#password1Tip").html("密码需同时包含数字和字母");			
		};
	}else{
		setInvalid(theElement);
		if(Password1Value.length==0){
			$("#password1Tip").html("密码不能为空");
		}else if(Password1Value.length<6){
			$("#password1Tip").html("密码长度小于6个字符");
		}else {
			$("#password1Tip").html("密码长度大于18个字符");
		};
	};	
});
//确认密码框，获得焦点时 提示“输入确认密码”
$("#exampleInputPassword2").focus(function() {
	var theElement=$("#exampleInputPassword2");
	reset(theElement);
	$("#password2Tip").html("请输入确认密码 ");
});
//确认密码框失去焦点时，验证两次密码输入是否一致
$("#exampleInputPassword2").blur(function() {
	theElement=$("#exampleInputPassword2");
	var Password1Value= $("#exampleInputPassword1").val();
	var Password2Value= $("#exampleInputPassword2").val();
	if(Password2Value.length==0){
		$("#password2Tip").html("您还未输入确认密码 ");
	}else if(Password2Value==Password1Value){
		setValid(theElement);
		$("#password2Tip").html(" ");
	}else{
		setInvalid(theElement);
		$("#password2Tip").html("密码不一致，请重新输入");
	};
});

$("#submit-btn").click(function() {  
	if($("#emailForm").hasClass('has-success')&&$("#password1Form").hasClass('has-success')&&$("#password2Form").hasClass('has-success')) {
	     $.ajax({
	     	url: '/snow-reader/userInfos',
	     	method: "POST",
	     	data:{"userName":$("#exampleInputEmail1").val(),
	 		       "password":$("#exampleInputPassword1").val()
	 	    }
	 	})
	 	.done(function() {
	        window.location.href = "index.html";
	 	
	    });
	 }else{
	 	return;
	 };
});


// var validateEmail = function() {
//     var element = $("#exampleInputEmail1");
//     var EmailVal = $(element).val();
//     return emailRegExp.test(EmailVal);
// }

// var validatePassword = function() {
//     var element = $("#exampleInputPassword1");
//     var password1 = element.val();
//     return passwordRegExp.test(password1);
// }
//  var validatePassword2 = function() {
//     var element = $("#exampleInputPassword2");
//     var password1 = $("#exampleInputPassword1").val();
//     var password2 = element.val();
//     return password2 == password1
// }

// var setButtonStatus = function() {
//     if (validateEmail() && validatePassword() && validatePassword2()) {
//         $("#submit-btn").removeAttr('disabled')
//     } else {
//         $("#submit-btn").attr('disabled', true)
//     }
// }

// var emailRegExp = /\w+@\w+([-]\w)*(\.\w)+/;
// $("#exampleInputEmail1").blur(function() {
//     var element = $("#exampleInputEmail1");
//     var EmailVal = $(element).val();
//     var isValidate = validateEmail();
//     EmailVal ? (isValidate ? setValid(element) : setInvalid(element)) : reset(element);

//     setButtonStatus();


// });

// var passwordRegExp = /.{6,}/;
// $("#exampleInputPassword1").blur(function() {
//     var element = $("#exampleInputPassword1");
//     var password1 = element.val();


//     password1 ? (passwordRegExp.test(password1) ? setValid(element) : setInvalid(element)) : reset(element);
//     setButtonStatus();

// });

// $("#exampleInputPassword2").keyup(function() {
//     var element = $("#exampleInputPassword2");
//     var password1 = $("#exampleInputPassword1").val();
//     var password2 = $(element).val();
//     password2 ? ((password2 == password1) ? setValid(element) : setInvalid(element)) : reset(element);
//     setButtonStatus();

// });

// $("#submit-btn").click(function() {
// 	$.ajax({
// 		url: "/snow-reader/userInfos",
// 		method: "POST",
// 		data: {"userName":$("#exampleInputEmail1").val(),
// 		       "password":$("#exampleInputPassword1").val()
// 	}
// 	})
// 	.done(function() {
// 		window.location.href = "index.html";
// 	})
// 	.fail(function() {
// 		console.log("error");
// 	})
// 	.always(function() {
// 		console.log("complete");
// 	});
	
// 	/* Act on the event */
// });






