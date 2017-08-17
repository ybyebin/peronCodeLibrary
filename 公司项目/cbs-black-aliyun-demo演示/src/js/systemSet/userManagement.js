(function($) {
	$(window).load(function() {
		$(".user-message-div").mCustomScrollbar();
		$(".display-user-ul").mCustomScrollbar();
		$(".edit-user-ul").mCustomScrollbar();
		$(".add-user-ul").mCustomScrollbar();
	});
})(jQuery);

$('#foot').load('public.html');
var dicGroup = {}; //所有的组
$(function() {
	// publicHeadfun();
	projectInfo();
	graphicImageGetData();
});


// 获取全部用户信息
function getUserMessage() {
	$.ajax({
		url: apiurl + 'usermanage',
		type: 'get',
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
				console.log("用户数据:" + JSON.stringify(data, null, 2));
				addUserMessageToTable(data.data.items);
			} else {
				layer.msg(data.error_message);
			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	})
}

// 将用户信息展示到列表
function addUserMessageToTable(data) {
	if (data == null) {
		data = [{
			"id": "",
		}]
	} else {
		for (var arr in data) {
			// data[arr].system_role_id = "管理员";
			switch(Number(data[arr].system_role_id)){
				case 1:
				data[arr].system_role_id = "管理员";
				break;
				case 2:
				data[arr].system_role_id = "普通";
				break;
			}
		}
	}

	if (data.length < 14) {
		var num = 14 - data.length
		for (var i = 0; i < num; i++) {
			var dic = {
				"id": "",
			};
			data.push(dic);
		}
	}

	$("#user-message-tbody").html("");
	var tableHtml = $("#user-Message-tbody").html();
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == "") {
			var trHtml = '<tr data-id=""><td></td><td></td><td></td><td></td><td></td></tr>';
		} else {
			var trHtml = '<tr data-id = "' + data[i].id + '" >' + '<td>' + data[i].username + '</td>' + '<td>' + data[i].system_role_id + '</td>' + '<td>' + data[i].full_name + '</td>' + '<td>' + data[i].employee_id + '</td>' + '<td>' + data[i].last_login_time + '</td>' + '</tr>';
		}

		tableHtml += trHtml;
	}
	$("#user-message-tbody").html(tableHtml);
	$("#user-message-tbody").children("tr").first().click();
}


// 获得 子系统列表
function graphicImageGetData() {
	$.ajax({
		url: apiurl + 'subsystem',
		type: 'get',
		dataType: 'json',
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			// console.log(JSON.stringify(data,null,2));
			if (data.success) {
				var data = data.data.items;
				for (var key in data) {
					dicGroup[data[key].id] = data[key].id;
					var edit_li = '<li><input id="edit' + data[key].id + '" data-id="' + data[key].id + '" class="ckss" type="checkbox" name="user-edit-ckss">' + '<label>' + data[key].name + '</label></li>';
					var add_li = '<li><input id="add' + data[key].id + '" data-id="' + data[key].id + '" class="ckss" type="checkbox" name="user-add-ckss">' + '<label>' + data[key].name + '</label></li>';
					$('.edit-user-ul ul').append(edit_li);
					$('.add-user-ul ul').append(add_li);
				}

				$(".ckss").iCheck({
					checkboxClass: 'icheckbox_square-green',
					radioClass: 'iradio_square-green',
					increaseArea: '20%'
				});
				getUserMessage();
			} else {
				layer.msg(data.error_message);
			}
		},
		error: function(data) {
			publicAjaxError(data);

		}
	});
}


/**
 * [获取用户详细的用户信息]
 * @param  {[int]} id [用户id]
 * @return {[type]}    [description]
 */
function getUseDetailedInformation(id) {
	$.ajax({
		url: apiurl + 'usermanage/id',
		type: 'get',
		dataType: 'json',
		data: {
			id: id
		},
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(result) {
			$(".loading").hide();
			if (result.success) {
				console.log('用户详细信息:' + JSON.stringify(result, null, 2));
				var data = result.data;
				var system_role;
				switch (Number(data.system_role_id)) {
					case 1:
						system_role = "管理员";
						break;
					case 2:
						system_role = "普通";
						break;
				}

				// 在删除按钮上 保存 用户ID 用于删除该用户
				$(".display-cancel-user").data("id", data.id);
				$(".edit-save-user").data("id", data.id);

				//展示
				$('.display-user-name').text(data.username);
				$('.display-role').text(system_role);
				$('.display-name').text(data.full_name);
				$('.display-staff-number').text(data.employee_id);
				$('.display-user-ul ul').html('');

				$('.edit-user-ul input[name="user-edit-ckss"]').iCheck('uncheck');
				// console.log('全部check:'+JSON.stringify(dicGroup,null,2))
				for (var key in data.user_view_group) {
					var li = '<li><input class="dis-ckss" type="checkbox" disabled="true" checked="checked">' + '<label>' + data.user_view_group[key].name + '</label></li>';
					$('.display-user-ul ul').append(li);
					$('.dis-ckss').iCheck('destroy');
					$(".dis-ckss").iCheck({
						checkboxClass: 'icheckbox_square-green',
						radioClass: 'iradio_square-green',
						increaseArea: '20%'
					});
					if (dicGroup[data.user_view_group[key].id]) {
						$('#edit' + data.user_view_group[key].id).iCheck('check');
					}
				}

				//编辑	
				$(".edit-save-user").data("id", data.id)
				$(".edit-name").val(data.username);
				$(".edit-psw").val("");
				$(".eidt-surepsw").val("");
				$(".edit-fullname").val(data.full_name);
				$(".edit-ygnumber").val(data.employee_id);
				$(".edituserjaose").val(data.system_role_id);
			} else {
				layer.msg(result.error_message);

			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	});


}



//点击用户信息表 获得单条信息并展示
$("#user-message-tbody").on("click", "tr", function() {
	if ($(this).data("id") !== "") {
		$(".message-div-detailed").hide();
		$(".message-div-display").show();
		$("#user-message-tbody tr").removeClass("actives");
		$(this).addClass("actives");
		getUseDetailedInformation($(this).data("id"));
	}
});


//添加用户
$('#btn-adduser').on('click', function() {
	$('.message-div-detailed').hide();
	$('.message-div-add').show();
	$('.message-div-add input').val('');
	$(".adduserjaose").val(2);
	$('.add-user-ul input[name="add-user-ckss"]').iCheck('unckeck');
});

//添加-保存
$('.add-save-user').on('click', function() {
	var name = $(".add-name").val(); //用户名
	var pas = $(".add-psw").val(); //密码
	var surepas = $(".add-surepsw").val(); //确认密码
	// var jiaose =  //角色
	var fullname = $(".add-fullname").val(); //姓名
	var ygnumber = $(".add-ygnumber").val(); //员工号
	var view_group_ids = [];
	$('.add-user-ul input[name="user-add-ckss"]:checked').each(function(index, ele) {
		view_group_ids.push({
			id: $(ele).data('id')
		});
		// console.log($(ele).data('id'))
	});
	if (name !== '' && pas != '' && surepas !== '') {
		if (pas === surepas) {

			if (RegeMatchTwo(name) && RegeMatchTwo(pas) && RegeMatchTwo(surepas) && RegeMatchTwo(fullname) && RegeMatchTwo(ygnumber)) {
				var updata = {
					project_id: $('#logo').data('proid'),
					username: name,
					password: pas,
					system_role_id: $(".adduserjaose").val(),
					full_name: fullname,
					employee_id: ygnumber,
					user_view_group: view_group_ids,
				}

				console.log(JSON.stringify(updata, null, 2));
				$.ajax({
					url: apiurl + 'usermanage',
					type: 'post',
					dataType: 'json',
					data: updata,
					beforeSend: function() {
						$(".loading").show();
					},
					complete: function() {
						$(".loading").hide();
					},
					success: function(data) {
						$(".loading").hide();
						if (data.success) {
							layer.msg("创建成功");
							getUserMessage();
							$('.message-div-detailed').hide();
							$('.message-div-display').show();
						} else {
							layer.msg(data.error_message);
							returnLogIn(data.error_message);
						}
					},
					error: function(data) {
						publicAjaxError(data);
					}
				});
			} else {
				layer.msg('输入信息不能包含特殊字符')
			}

		} else {
			layer.msg("两次输入的密码不一致,请重新输入");
		}
	} else {
		layer.msg("请确认信息填写完整")
	}

});
// 添加-取消
$('.add-save-cancel').on('click', function() {
	$('.message-div-detailed').hide();
	$('.message-div-display').show();
});
// 展示用户-编辑
$('.display-edit-user').on('click', function() {
	$('.message-div-detailed').hide();
	$('.message-div-edit').show();
});
// 展示用户-删除
$('.display-cancel-user').on('click', function() {
	// layer.msg('删除');
	if ($(this).data("id") !== "") {
		console.log(JSON.stringify({
			id: $(this).data("id")
		}, null, 2))
		$.ajax({
			url: apiurl + 'usermanage/' + $(this).data("id"),
			type: 'DELETE',
			// dataType: 'json',
			beforeSend: function() {
				$(".loading").show();
			},
			complete: function() {
				$(".loading").hide();
			},
			success: function(data) {
				$(".loading").hide();
				if (data.success) {
					$('.message-div-display .center div label:nth-child(2)').text('');
					$('.display-user-ul ul').html('');
					// 刷新列表
					layer.msg("删除成功");
					getUserMessage();
				} else {
					layer.msg(data.error_message);
				}
			},
			error: function(data) {
				publicAjaxError(data);
			}
		});
	} else {
		layer.msg("请选中一条用户信息");
	}

});

// 编辑用户-保存
$('.edit-save-user').on('click', function() {


	var name = $(".edit-name").val(); //用户名
	var pas = $(".edit-psw").val(); //密码
	var surepas = $(".eidt-surepsw").val(); //确认密码
	// var jiaose = $(".edituserjaose").val(); //角色
	var fullname = $(".edit-fullname").val(); //姓名
	var ygnumber = $(".edit-ygnumber").val(); //员工号
	var view_group_ids = [];
	$('.edit-user-ul input[name="user-edit-ckss"]:checked').each(function(index, ele) {

		view_group_ids.push({
			id: $(ele).data('id')
		});
		// console.log($(ele).data('id'))
	});
	if (name !== "" && pas != "" && surepas !== "") {
		if (pas === surepas) {

			if (RegeMatchTwo(name) && RegeMatchTwo(pas) && RegeMatchTwo(surepas)&& RegeMatchTwo(fullname)&& RegeMatchTwo(ygnumber) ) {
				var updata = {
					project_id: $('#logo').data('proid'),
					id: Number($(this).data("id")),
					username: name,
					password: pas,
					system_role_id: $(".edituserjaose").val(),
					full_name: fullname,
					employee_id: ygnumber,
					user_view_group: view_group_ids
				};
				console.log("编辑用户信息上传的数据:" + JSON.stringify(updata, null, 2));
				$.ajax({
					url: apiurl + 'usermanage/0',
					type: 'PUT',
					dataType: 'json',
					data: updata,
					beforeSend: function() {
						$(".loading").show();
					},
					complete: function() {
						$(".loading").hide();
					},
					success: function(data) {
						$(".loading").hide();
						if (data.success) {
							layer.msg("修改成功");
							$('.message-div-detailed').hide();
							$('.message-div-display').show();
							getUserMessage();
						} else {
							layer.msg(data.error_message);
						}
					},
					error: function(data) {
						publicAjaxError(data)
					}
				})
			} else {
				layer.msg('输入信息不能包含特殊字符')
			}



		} else {
			layer.msg("两次输入的密码不一致,请重新输入");
		}
	} else {
		layer.msg("请确认信息填写完整")
	}
});
// 编辑用户-取消
$('.edit-save-cancel').on("click", function() {
	$('.message-div-detailed').hide();
	$('.message-div-display').show();
});



/**
 * [判断字符串是否合法]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatchTwo(str) {
	var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\\]/g);
	if (pattern.test(str)) {
		return false;
	} else {
		return true;
	}
}