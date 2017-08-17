$(function() {
	$login.username.val('');
	$login.password.val('');
	loginFun.init();
});

window.$login = {
	username:$("#username"),
	password:$("#password"),
	username_input:$('.username-nofocus'),
	pasword_input:$('.userpas-nofocus'),
	loading:$('.loading')

}

var loginFun = {
	// 初始化
	init: function() {
		$login.username.bind("keypress", function(event) {
			if (event.keyCode == "13") {
				$login.password.focus();
			}
		});
		$login.password.bind("keypress", function(event) {
			if (event.keyCode == "13") {
				if ($login.username.val() == "") {
					$login.username.focus();
				} else {
					loginFun.logIn();
				}
			}
		});

	},
	namefocus: function() {
		$login.username_input.addClass('username-onfocus');
	},
	nameblue: function() {
		$login.username_input.removeClass('username-onfocus');
	},
	pasfocus: function() {
		$login.pasword_input.addClass('userpas-onfocus');
	},
	pasblue: function() {
		$login.pasword_input.removeClass('userpas-onfocus');
	},
	// 登录
	logIn: function() {
		if ($login.username.val() === '') {
			layer.msg('用户名不能为空')
		} else if ($login.password.val() === '') {
			layer.msg('密码不能为空')
		} else {
			$login.loading.show();
			var login_user = {
				username: $login.username.val(),
				password: $login.password.val()
			}
			$.ajax({
				url: apiurl + 'login',
				type: 'put',
				dataType: 'json',
				data: login_user,
				success: function(data) {
					$login.loading.hide();
					if (data.success) {
						// location.href = "homepage.html";
						location.href = "deviceControlCanvas.html";
					} else {
						layer.msg(data.error_message);
					}
				},
				error: function(data) {
					$login.loading.hide();
					layer.msg(data.error_message);
				}
			});
		}
	},
	// 忘记密码
	forgetpas: function() {
		layer.open({
			title: ['提示', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
			type: 1,
			skin: 'layui-primary', //加上边框
			area: ['540px', '225px'], //宽高
			content: $("#forget-pas"), //捕获的元素,
			shift: 2,
			move: false,
		});
	}
};
