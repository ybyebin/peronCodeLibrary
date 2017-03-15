$(function() {
	$('#formbackground').height($(window).height());
	$('#formbackground').width($(window).width());

	$(window).resize(function() {
		$('#formbackground').height($(window).height());
		$('#formbackground').width($(window).width());
	})
});

$("#username").bind("keypress", function(event) {
	if (event.keyCode == "13") {
		$("#password").focus();
	}
});
$("#password").bind("keypress", function(event) {
	if (event.keyCode == "13") {
		if ($("#username").val() == "") {
			$("#username").focus();
		} else {
			logIn()
		}
	}
});

$(".forgetpas").on('click', function() {
	layer.open({
		title: ['提示', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['540px', '225px'], //宽高
		content: $("#forget-pas"), //捕获的元素,
		shift: 2,
		move: false,
	});
})

$("#login").click(function() {
	logIn();
});

function logIn() {
	if ($('#username').val() === '') {
		layer.msg('用户名不能为空')
	} else if ($('#password').val() === '') {
		layer.msg('密码不能为空')
	} else {
		var login_user = new Object();
		login_user.username = $('#username').val();
		login_user.password = $('#password').val();
		$.ajax({
			url: apiurl + "r=api/auth/login",
			type: 'post',
			dataType: 'json',
			data: {
				data: JSON.stringify(login_user)
			},
			success: function(data) {
				if (data.success) {
					location.href = "homepage.html";
				} else {
					layer.msg(data.error_message);
				}
			},
			error: function(data) {
				layer.msg(data.error_message);
				console.log('返回:' + JSON.stringify(data, null, 2))
			}
		});
	}

}

$('#username').focus(function(){
	$('.login_box form div:first-child span').css('background-image','url(images/login/user0.png)')
});
$('#username').blur(function(){
	$('.login_box form div:first-child span').css('background-image','url(images/login/user.png)')
});

$('#password').focus(function(){
	$('.login_box form div:nth-child(2) span').css('background-image','url(images/login/Shape0.png)')
});
$('#password').blur(function(){
	$('.login_box form div:nth-child(2) span').css('background-image','url(images/login/Shape.png)')
});