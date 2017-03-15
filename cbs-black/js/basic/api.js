var apiurl = "/index.php?";
var wsSocket = "ws://192.168.2.4:1234";

/**
 * [公共方法-获取工程信息]
 * @return {[type]} [description]
 */
function projectInfo() {
	var dataurl = apiurl + 'r=api/project/info';
	$.ajax({
		url: dataurl,
		type: 'post',
		dataType: 'json',
		success: function(data) {
			if (data.success) {
				$('#logo').attr('src', data.data.logo_path);
				$('#logo-name').text(data.data.name);

				$('#navbar-brandImg').attr('src', data.data.logo_path);
				$('.projectName').text(data.data.name);

			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}
		},
		error: function(data) {
			$('.loading').hide();
			layer.msg(data.error_message);
		}
	});
}

/**
 * [判断字符串是否合法 -提示]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatch(thiss, warnspans, instructions) {
	var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
	if (thiss.val() != '' && thiss != null) {
		if (pattern.test(thiss.val())) {
			instructions.hide();
			warnspans.show().text('输入不合法');
			return false;
		}
	}
}

/**
 * [判断字符串是否合法 -不提示]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatchTwo(thiss, warnspans) {
	var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
	if (thiss.val() != '' && thiss != null) {
		if (pattern.test(thiss.val())) {
			warnspans.text('输入不合法');
			return false;
		}
	}
}


// 判断字符长度    汉字算2个字符
function chEnWordCount(str) {
	var count = str.replace(/[^\x00-\xff]/g, "**").length;
	return count;
}


function icheckInte() {
	$('input').iCheck('destroy');
	$(".ckss").iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	});
}

//服务器当前日期
function ServerCurrentTime(type) {
	var time = new Date().format("MM月dd日 hh:mm:ss")
	$("#CurrentTime a").text(time);
	var timer = setTimeout("ServerCurrentTime()", 1000);
}


/**
 * [时间格式化函数]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 * new Date().format("yyyy-MM-dd hh:mm:ss")
 */
Date.prototype.format = function(format) {
	var args = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var i in args) {
		var n = args[i];
		if (new RegExp("(" + i + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
	}
	return format;
};


// 修改密码
$('.user-changePassword').on('click', function() {
	layer.open({
		title: ['修改密码', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '330px'], //宽高
		content: $("#changePassword-layer"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function() {
			$('.old-pas').val('');
			$('.new-pas').val('');
			$('.renew-pas').val('');
		},
		yes: function(indexs) {
			var num = 3;
			$('#changePassword-layer input').each(function(index, element) {
				if ($(element).val() == "") {
					num = index;
					return false;
				}
			})
			switch (num) {
				case 0:
					layer.msg("原密码不能为空");
					break;
				case 1:
					layer.msg("新密码不能为空");
					break;
				case 2:
					layer.msg("确认密码不能为空");
					break;
				case 3:

					var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
					var length_enough = true;
					var str_format = true;
					$('.pas').each(function(index, ele) {
						if ($(ele).val().length < 8) {
							$(ele).val('');
							layer.msg('密码长度过短(最小8个字符)');
							length_enough = false;
							return false;
						}
					});

					if (length_enough) {
						$('.pas').each(function(index, ele) {
							if (pattern.test($(ele).val())) {
								$(ele).val('');
								layer.msg('密码格式错误(可以是数字、字母及组合)');
								str_format = false;
								return false;
							}
						});
						if (str_format) {

							if ($('.new-pas').val() === $('.renew-pas').val()) {
								layer.msg('可以提交');

								$.ajax({
									url: apiurl + "r=api/system/user/password",
									type: 'post',
									dataType: 'json',
									data: {
										data: JSON.stringify({
											old_password: $('.old-pas').val(),
											new_password: $('.new-pas').val(),
											confirm_password: $('.renew-pas').val()
										})
									},
									beforeSend: function() {
										$(".loading").show();
									},
									complete: function() {
										$(".loading").hide();
									},
									success: function(data) {
										$(".loading").hide();
										if (data.success) {
											layer.msg("密码修改成功");
											layer.close(indexs);

										} else {
											layer.msg("密码修改失败原因:" + data.error_message);
										}
									},
									error: function(data) {
										$(".loading").hide();
										layer.msg("密码修改失败原因:" + data.error_message);
									}

								});
							} else {
								layer.msg('新密码与重复密码不一致')
							}
						}
					}
					break;
			}
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});
//退出登录
$('.user-logout').on('click', function() {
	layer.open({
		title: ['退出登录', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '200px'], //宽高
		content: $("#logout"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function() {},
		yes: function(index) {
			$.ajax({
				url: apiurl + "r=api/auth/logout",
				type: 'post',
				dataType: 'json',
				beforeSend: function() {
					$(".loading").show();
				},
				complete: function() {
					$(".loading").hide();
				},
				success: function(data) {
					$(".loading").hide();
					if (data.success) {
						window.location.href = "login.html";
					} else {
						layer.msg("退出失败原因:" + data.error_message);
					}
				},
				error: function(data) {
					$(".loading").hide();
					layer.msg("退出失败原因:" + data.error_message);
				}
			})
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});

// 用户登录超时 返回登录页面
function returnLogIn(str) {
	if (Number(str.substr(0, 4)) === 6001) {
		window.location.href = 'login.html';
	}
}


/**
 * [报警数量-指示点]
 * @return {[type]} [description]
 */
function update_alarm_label() {
	$.post(apiurl + "r=api/alarm/list/count", {
		data: null
	}).done(function(data) {
		// console.log('报警数量：' + JSON.stringify(data, null, 2));
		var num = Number(data.data)
		if (num > 0) {
			$('#header_alarm_count').css('display', 'inline-block');
			$('.head-warn img').attr('src', 'images/cbsnew/baojing.gif');
			if (num < 99) {
				$('#header_alarm_count').text(num);
			} else {
				$('#header_alarm_count').text('99+');
			}
		} else {
			$('#header_alarm_count').hide();
			$('.head-warn img').attr('src', 'images/cbsnew/报警状态按钮-无报警.png');
		}
	})
}

/**
 * [头部获取数据]
 * @return {[type]} [description]
 */
function publicHeadfun(){
	projectInfo();
	ServerCurrentTime();
	update_alarm_label();
	setInterval(update_alarm_label, 3000);
}