var view_groupId = sessionStorage.getItem("viewGroupeId");
// var dic = GetRequest();
// var view_groupId =unescape(dic.id);
$(function() {
	projectInfo();
	systemImageLoadImageData(view_groupId);
	icheckInte();
});

//返回图形画面管理
$('.go-subsys').on('click', function() {
	window.location.href = 'graphicImages.html';
});


/**
 * [一组 画面 请求数据]
 * @param  {} ids [画面组ID]
 */
function systemImageLoadImageData(subsysid) {
	$.ajax({
		url: apiurl + 'view',
		type: 'get',
		dataType: 'json',
		data: {
			view_group_id: subsysid
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
				// console.log("获取到的一组画面数据:"+JSON.stringify(data,null,2));			
				$(".subsystem-head .group-name").text(sessionStorage.getItem("viewGroupeName"));
				// $(".subsystem-head .group-name").text(unescape(dic.name));
				systemImageAddRow(data.data.items);
			} else {
				layer.msg(data.error_message);
				console.log("请求失败原因:" + JSON.stringify(data, null, 2))
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			returnLogIn(data);
			console.log("请求失败原因===========:" + JSON.stringify(data, null, 2));

		}
	});

}

/**
 * [子系统画面 table处理函数]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function systemImageAddRow(data) {
	if (data == null) {
		data = [{
			"id": "",
		}]
	}

	var datalength = data.length;

	if (datalength < 13) {
		var GInum = 13 - datalength;
		var falseData = {
			id: "",
		};
		for (var i = 0; i < GInum; i++) {
			data.push(falseData);
		}
	}
	var tables = $("#sub-graphicImages-tab tbody");
	tables.html('');
	for (var key in data) {
		var rowTemplate;
		if (data[key].id === "") {
			rowTemplate = '<tr><td></td><td></td></tr>';
		} else {
			rowTemplate = '<tr id="' + data[key].id + '">' + '<td  id="images' + data[key].id + '">' + data[key].name + '</td>' + '<td><a data-id="' + data[key].id + '" data-name="#images' + data[key].id + '" class ="image-rename">重命名</a><a data-id="' + data[key].id + '" data-name="#images' + data[key].id + '" class="image-delete">删除</a><a data-id="' + data[key].id + '" class="edit-image">编辑画面</a></td></tr>'
		}
		tables.append(rowTemplate);
	}
}



// 画面-重命名
$("#sub-graphicImages-tab tbody").on('click', 'a.image-rename', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var $this = $(this);
	// 此处复用 系统重命名 弹窗
	layer.open({
		title: ['画面重命名', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['900px', '220px'], //宽高
		content: $("#change-subsys-name"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['保存', '取消', ],
		success: function(layero) {
			$('.subsys-warn').text('');
			$('.subsys-input').val('');
			// layer.msg($this.data('id')+'======='+$this.data('name'));
		},
		yes: function(index) {

			if ($('.subsys-warn').text() === '') {
				if ($('.subsys-input').val() === '') {
					layer.msg('名称不能为空');
				} else {
					$.ajax({
						url: apiurl + 'view/0',
						type: 'PUT',
						dataType: 'json',
						data: {
							id: $this.data('id'),
							name: $('.subsys-input').val(),
							external_link: ''
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
								layer.msg('更改成功');
								var inputs = $('.subsys-input');
								$($this.data('name')).text(inputs.val());
								layer.close(index);
								inputs.val('');
							} else {
								layer.msg(data.error_message);
								console.log('更改失败原因:' + JSON.stringify(data, null, 2))
							}
						},
						error: function(data) {
							$(".loading").hide();
							layer.msg(data.error_message);
							returnLogIn(data);
							console.log('更改失败原因:' + JSON.stringify(data, null, 2))

						}
					});

				}
			} else {
				layer.msg('请检查输入是否准确')
			}
		},
		btn2: function(index) {
			layer.close(index);
		}

	});

});

// 画面-删除
$("#sub-graphicImages-tab tbody").on('click', 'a.image-delete', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	$this = $(this);
	// 此处复用 删除子系统弹窗
	layer.open({
		title: ['确认删除', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['900px', '220px'], //宽高
		content: $("#delete-subsys"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确认', '取消'],
		success: function(layero) {
			$("#delete-subsys span strong").text($this.parent().parent().find($this.data('name')).text());
		},
		yes: function(index) {
			layer.close(index);
			$.ajax({
				url: apiurl + 'view/' + $this.data('id'),
				type: 'DELETE',
				beforeSend: function() {
					$(".loading").show();
				},
				complete: function() {
					$(".loading").hide();
				},
				success: function(data) {
					$(".loading").hide();
					if (data.success) {
						systemImageLoadImageData(view_groupId)
						layer.msg('删除成功');
					} else {
						layer.msg(data.error_message);
						returnLogIn(data.error_message);
						console.log('更改失败原因:' + JSON.stringify(data, null, 2))
					}
				},
				error: function(data) {
					$(".loading").hide();
					layer.msg(data.error_message);
					console.log('更改失败原因:' + JSON.stringify(data, null, 2))

				}
			});

		},
		btn2: function(index) {
			layer.close(index);
		}
	});


});

// 编辑画面
$("#sub-graphicImages-tab tbody").on("click", 'a.edit-image', function(e) {

	if (typeof(Storage) !== "undefined") {
		sessionStorage.setItem("view_id", $(this).data('id'));
		window.location.href = "editCanvas.html";
	}

});

// 新建画面
$('.graphic-main-btn').on('click', function() {
	layer.open({
		title: ['新建画面', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['900px', '270px'], //宽高
		content: $("#creat-subsystem-image"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['保存', '取消', ],
		success: function(layero) {
			$('.scadaimages-name').val('');
			$('.image-warn').text('');
			$('.href-other').val('');
			$('.href-other').attr('disabled', 'disabled');
			$('.ckss').iCheck('uncheck');
		},
		yes: function(index) {
			if ($('.image-warn').text() === '') {
				if ($('.scadaimages-name').val() === '') {
					layer.msg('名称不能为空');
				} else {
					// layer.msg('更改成功');
					var dataup;
					if ($('.ckss').is(':checked')) {
						dataup = {
							project_id: 1,
							view_group_id: view_groupId,
							name: $('.scadaimages-name').val(),
							external_link: $('.href-other').val()
						}
					} else {
						dataup = {
							project_id: 1,
							view_group_id: view_groupId,
							name: $('.scadaimages-name').val()
						}
					}

					console.log('数据:' + JSON.stringify(dataup, null, 2));
					$.ajax({
						url: apiurl + 'view',
						type: 'post',
						dataType: 'json',
						data: dataup,
						beforeSend: function() {
							$(".loading").show();
						},
						complete: function() {
							$(".loading").hide();
						},
						success: function(data) {
							$(".loading").hide();
							if (data.success) {
								layer.close(index);
								if ($('.ckss').is(':checked')) {
									layer.close(index);
									systemImageLoadImageData(view_groupId)
								} else {
									if (typeof(Storage) !== "undefined") {
										console.log("新建画面的ID:" + data.data.id);
										sessionStorage.setItem("view_id", data.data.id);
										sessionStorage.setItem("view_name", $('.scadaimages-name').val());
										window.location.href = "canvas.html";
									}
								}
							} else {
								layer.msg(data.error_message);
								console.log("创建画面失败" + JSON.stringify(data, null, 2));
							}
						},
						error: function(data) {
							$(".loading").hide();
							layer.msg(data.error_message);
							returnLogIn(data);
							console.log("创建画面失败" + JSON.stringify(data, null, 2));
						}
					});
				}
			} else {
				layer.msg('请检查输入是否准确')
			}

		},
		btn2: function(index) {
			layer.close(index);
		}
	});

});



$('.ckss').on('ifChanged', function() {
	if ($('.ckss').is(':checked')) {
		$('.href-other').removeAttr('disabled');
	} else {
		$('.href-other').attr('disabled', 'disabled');
	}
});


//新建画面输入检查
$('.scadaimages-name').on('input', function() {
	$('.image-warn').text('');
	RegeMatchTwo($(this), $('.image-warn'));
	if ($('.scadaimages-name').val() == '' && $('.image-warn').text() == '') {
		$('.image-warn').text('不能为空')
	}
	if ($('.image-warn').text() == '') {
		var num = chEnWordCount($('.scadaimages-name').val());
		if (num > 20) {
			$('.image-warn').show().text('字符超出限制');
		}
	}

});


//重命名时输入检查
$('.subsys-input').on('input', function() {
	$('.subsys-warn').text('');
	RegeMatchTwo($(this), $('.subsys-warn'));
	if ($('.subsys-input').val() == '' && $('.subsys-warn').text() == '') {
		$('.subsys-warn').text('不能为空')
	}
	if ($('.subsys-warn').text() == '') {
		var num = chEnWordCount($('.subsys-input').val());
		if (num > 20) {
			$('.subsys-warn').show().text('字符超出限制');
		}
	}

});