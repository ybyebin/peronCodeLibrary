$(function() {
	projectInfo();
	graphicImageGetData();
	icheckInte();
})



/**
 * [查询子系统]
 * @return {[type]} [description]
 */
function graphicImageGetData() {
	var thisUrls = apiurl + "r=api/entity/subsys/list";
	$.ajax({
		url: thisUrls,
		type: 'post',
		dataType: 'json',
		beforeSend:function(){
			$(".loading").show();
		},
		complete:function(){
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				console.log("数据长度:"+data.data);
				console.log("获取数据成功" + JSON.stringify(data.data, null, 2))
				subsysListAddRow(data.data);

			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);			
		}
	});
}


/**
 * [ 图形画面管理 table处理函数]
 * @param  {[json]} data [全部图形画面组 数据]
 */
function subsysListAddRow(data) {
	// console.log("数据为"+JSON.stringify(data,null,2));
	console.log("返回的系统数据"+JSON.stringify(data,null,2));
	if (data == null) {
		data = [{
			"id": "",						
		}]
	}

	var datalength = data.length;
	console.log("返回的数组的长度为====================" + datalength);

	if (datalength < 13) {
		var GInum = 13 - datalength;
		console.log("差值为:" + GInum)
		var falseData = {
			id: "",
		};
		for (var i = 0; i < GInum; i++) {
			data.push(falseData);
		}
	}
	$("#graphicImages-tab tbody").html("");
	for(var key in data){
		var rowTemplate;
		if (data[key].id === "") {
			rowTemplate = '<tr id=""><td></td><td></td><td></td></tr>';
		} else {
			rowTemplate = '<tr id="'+data[key].id+'">' + '<td  id="subsys'+data[key].id+'">' + data[key].name + '</td>' + '<td class="view-cont">' + data[key].view_count + '</td>' + '<td><a data-id="'+data[key].id+'" data-name="#subsys'+data[key].id+'" class ="subsys-rename">重命名</a><a data-id="'+data[key].id+'"  data-name="#subsys'+data[key].id+'" class="subsys-delete">删除</a></td></tr>'
		}
		$("#graphicImages-tab tbody").append(rowTemplate);
	}	
}
//跳转图形画面详细
$("#graphicImages-tab tbody").on("click", 'tr', function() {	
	console.log('查看ID:'+$(this).prop('id'));
	if($(this).prop('id') ===""){
	}else{
		// sessionStorage.setItem("viewGroupeId",$(this).prop('id'));
		// window.location.href = "graphicImagesSubsystem.html";
		view_groupId = $(this).prop('id');
		systemImageLoadImageData(view_groupId)
		
	}	
});
//返回图形画面管理
$('.go-subsys').on('click', function() {
	$('.subsys-main').show();
	$('.graphic-main').hide();
	$('.subsystem-head').hide();
});
//重命名
$("#graphicImages-tab tbody").on('click', 'a.subsys-rename', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var $this = $(this);
	layer.open({
		title: ['系统重命名', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
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
					layer.msg('更改成功');

					$.ajax({
						url:apiurl + "r=api/entity/subsys/update",
						type: 'post',
						dataType: 'json',
						data: {
							data: JSON.stringify({
								id:$this.data('id'),
								name:$('.subsys-input').val()
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
								$($this.data('name')).text($('.subsys-input').val());
								layer.close(index);
								$('.subsys-input').val('');
							}else{
								layer.msg(data.error_message);
								returnLogIn(data.error_message);
								console.log('更改失败原因:'+JSON.stringify(data,null,2))
							}
						},
						error: function(data) {
							$(".loading").hide();
							layer.msg(data.error_message);
							console.log('更改失败原因:'+JSON.stringify(data,null,2))
							
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

//删除
$("#graphicImages-tab tbody").on('click', 'a.subsys-delete', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	$this = $(this);
	if (Number($this.parent().parent().find('td.view-cont').text()) > 0) {
		layer.msg("系统画面不为零 不能删除")
	} else {
		layer.open({
			title: ['确认删除', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
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
				$.ajax({
					url: apiurl + "r=api/entity/subsys/delete",
					type: 'post',
					dataType: 'json',
					data: {
						data: JSON.stringify({
							id: $this.data('id')
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
							layer.close(index);
							graphicImageGetData($this.data('page'));
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
	}

});

// 选择-新建子系统
$('.div-creatsys ul li:not(:last-child) a').on('click',function(){
	creatSubsys($(this).text());
});
// 自定义-新建子系统
$('.div-creatsys ul li:last-child').on('click',function(){
	// 此处复用 更改系统名称 弹窗
	layer.open({
		title: ['新建子系统', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
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
		},
		yes: function(index) {
			if ($('.subsys-warn').text() === '') {
				if ($('.subsys-input').val() === '') {
					layer.msg('名称不能为空');
				} else {
					layer.msg('更改成功');
					creatSubsys($('.subsys-input').val());
					layer.close(index);			
				}
			} else {
				layer.msg('请检查输入是否准确')
			}

		},
		btn2:function(index){
			layer.close(index);
		}
	});

});

/**
 * [新建子系统]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function creatSubsys(str){
	$.ajax({
		url: apiurl + "r=api/entity/subsys/create",
		type: 'post',
		dataType: 'json',
		data: {
			data:JSON.stringify({name:str})
		},
		beforeSend:function(){
			$(".loading").show();
		},
		complete:function(){
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				graphicImageGetData();
				layer.msg("新建成功");				
			} else {
				console.log("新建画面失败原因:" + JSON.stringify(data))
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			console.log("新建画面失败原因:" + JSON.stringify(data));

		}
	})
}




// =============================子系统详细===================
// 
// 
var view_groupId;
/**
 * [一组 画面 请求数据]
 * @param  {} ids [画面组ID]
 */
function systemImageLoadImageData(subsysid) {
	$.ajax({
		url: apiurl + "r=api/entity/view/list",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				view_group_id: subsysid
			})
		},
		beforeSend:function(){
			$(".loading").show();
		},
		complete:function(){
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();			
			if (data.success) {
				console.log("获取到的一组画面数据:"+JSON.stringify(data,null,2));

				$('.subsys-main').hide();
				$('.graphic-main').show();
				$('.subsystem-head').show();				
				$(".subsystem-head .group-name").text(data.data.view_group_name);
				systemImageAddRow(data.data.views);
			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
				console.log("请求失败原因:"+ JSON.stringify(data,null,2))				
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			console.log("请求失败原因===========:"+ JSON.stringify(data,null,2));
			
		}
	});

}

/**
 * [子系统画面 table处理函数]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function systemImageAddRow(data) {
	console.log("返回的系统数据"+JSON.stringify(data,null,2));
	if (data == null) {
		data = [{
			"id": "",						
		}]
	}	
	
	var datalength = data.length;
	console.log("返回的数组的长度为====================" + datalength);

	if (datalength < 13) {
		var GInum = 13 - datalength;
		console.log("差值为:" + GInum)
		var falseData = {
			id: "",
		};
		for (var i = 0; i < GInum; i++) {
			data.push(falseData);
		}
	}
	$("#sub-graphicImages-tab tbody").html('');
	for(var key in data){
		var rowTemplate;
		if (data[key].id === "") {
			rowTemplate = '<tr><td></td><td></td></tr>';
		} else {
			rowTemplate = '<tr id="'+data[key].id+'">' + '<td  id="images'+data[key].id+'">' + data[key].name + '</td>' + '<td><a data-id="'+data[key].id+'" data-name="#images'+data[key].id+'" class ="image-rename">重命名</a><a data-id="'+data[key].id+'" data-name="#images'+data[key].id+'" class="image-delete">删除</a><a data-id="'+data[key].id+'" class="edit-image">编辑画面</a></td></tr>'
		}
		$("#sub-graphicImages-tab tbody").append(rowTemplate);
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
		title: ['画面重命名', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
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
					layer.msg('更改成功');

					$.ajax({
						url:apiurl + "r=api/entity/view/update",
						type: 'post',
						dataType: 'json',
						data: {
							data: JSON.stringify({
								view_id: $this.data('id'),
								name:$('.subsys-input').val()
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
								$($this.data('name')).text($('.subsys-input').val());
								layer.close(index);
								$('.subsys-input').val('');
							}else{
								layer.msg(data.error_message);
								returnLogIn(data.error_message);
								console.log('更改失败原因:'+JSON.stringify(data,null,2))
							}
						},
						error: function(data) {
							$(".loading").hide();
							layer.msg(data.error_message);
							console.log('更改失败原因:'+JSON.stringify(data,null,2))
							
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
		title: ['确认删除', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
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
				url: apiurl + "r=api/entity/view/delete",
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify({
						id: $this.data('id')
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
$("#sub-graphicImages-tab tbody").on("click",'a.edit-image', function(e) {

	$this = $(this);
	$.ajax({
		url: apiurl + "r=api/entity/view/get",
		type: 'post',
		dataType: 'json',
		data: {
			data:JSON.stringify({view_id:$this.data('id')})
		},
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			console.log('查看数据:'+JSON.stringify(data,null,2))
			if (data.success) {
				if (data.data.external_link !== null) {

				} else {
					if (typeof(Storage) !== "undefined") {
						sessionStorage.setItem("view_id", data.data.id);
						window.location.href = "canvas/editCanvas.html";
					}
				}
			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
				console.log("跳转失败原因:" + JSON.stringify(data, null, 2))
				
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			console.log("跳转失败原因:" + JSON.stringify(data, null, 2))
			
		}
	});

});

// 新建画面
$('.graphic-main-btn').on('click',function(){
	layer.open({
		title: ['新建画面', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
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
			$('.href-other').attr('disabled','disabled');
			$('.ckss').iCheck('uncheck');
		},
		yes: function(index) {			
			if ($('.image-warn').text() === '') {
				if ($('.scadaimages-name').val() === '') {
					layer.msg('名称不能为空');
				} else {
					// layer.msg('更改成功');
					var dataup;
					if ($('.ckss').is(':checked')){
						dataup = {
							view_group_id: view_groupId,
							name: $('.scadaimages-name').val(),
							external_link: $('.href-other').val()
						}
					}else{
						dataup = {
							view_group_id: view_groupId,
							name: $('.scadaimages-name').val()							
						}
					}

					console.log('数据:'+JSON.stringify(dataup,null,2));
					$.ajax({
						url: apiurl + "r=api/entity/view/create",
						type: 'post',
						dataType: 'json',
						data: {
							data:JSON.stringify(dataup)
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
								layer.close(index);
								if ($('.ckss').is(':checked')){
									layer.close(index);
									systemImageLoadImageData(view_groupId)
								} else {
									if (typeof(Storage) !== "undefined") {
										console.log("新建画面的ID:" + data.data.id);
										sessionStorage.setItem("view_id", data.data.id);
										sessionStorage.setItem("view_name", $('.scadaimages-name').val());
										window.location.href = "canvas/text.html";									}
								}
							} else {
								layer.msg(data.error_message);
								returnLogIn(data.error_message);
								console.log("创建画面失败" + JSON.stringify(data, null, 2));
							}
						},
						error: function(data) {
							$(".loading").hide();
							layer.msg(data.error_message)
							console.log("创建画面失败" + JSON.stringify(data, null, 2));
						}
					});			
				}
			} else {
				layer.msg('请检查输入是否准确')
			}

		},
		btn2:function(index){
			layer.close(index);
		}
	});

});



$('.ckss').on('ifChanged', function() {
	if ($('.ckss').is(':checked')) {
		$('.href-other').removeAttr('disabled');
	}else{
		$('.href-other').attr('disabled','disabled');
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