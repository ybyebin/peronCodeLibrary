function login() {
	layer.msg('登陆成功');
	layer.msg('登陆失败,用户名或密码错误');
	setTimeout(function(){
		window.location.href = 'data_monitoring.html';
	},1000)	;
		
}