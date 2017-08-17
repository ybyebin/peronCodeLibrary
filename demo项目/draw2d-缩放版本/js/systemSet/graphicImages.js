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
	$.ajax({
		url: apiurl+'subsystem',
		type: 'get',
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
				console.log("获取数据成功" + JSON.stringify(data.data, null, 2))
				subsysListAddRow(data.data.items);
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
 * [ 图形画面管理 table处理函数]
 * @param  {[json]} data [全部图形画面组 数据]
 */
function subsysListAddRow(data) {
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
	$("#graphicImages-tab tbody").html("");
	for(var key in data){
		var rowTemplate;
		if (data[key].id === "") {
			rowTemplate = '<tr id=""><td></td><td></td><td></td></tr>';
		} else {
			rowTemplate = '<tr id="'+data[key].id+'"  data-name="'+data[key].name+'">' + '<td  id="subsys'+data[key].id+'">' + data[key].name + '</td>' + '<td class="view-cont">' + data[key].view_count + '</td>' + '<td><a data-id="'+data[key].id+'" data-name="#subsys'+data[key].id+'" class ="subsys-rename">重命名</a><a data-id="'+data[key].id+'"  data-name="#subsys'+data[key].id+'" class="subsys-delete">删除</a></td></tr>'
		}
		$("#graphicImages-tab tbody").append(rowTemplate);
	}	
}
//跳转图形画面详细
$("#graphicImages-tab tbody").on("click", 'tr', function() {	
	console.log('查看ID:'+$(this).prop('id'));
	if($(this).prop('id') ===""){
	}else{
		sessionStorage.setItem("viewGroupeId",$(this).prop('id'));
		sessionStorage.setItem("viewGroupeName",$(this).data('name'));
		// var ids =escape($(this).prop('id'));
		// var name =escape($(this).data('name'));
		window.location.href = "graphicImagesView.html";	
	}	
});

//重命名
$("#graphicImages-tab tbody").on('click', 'a.subsys-rename', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var $this = $(this);
	layer.open({
		title: ['系统重命名', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
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
						url:apiurl+'subsystem',
						type: 'put',
						dataType: 'json',
						data: {
							project_id:$('#logo').data('proid'),
							id:$this.data('id'),
							name:$('.subsys-input').val()
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
								layer.msg('更改成功');
								$('.subsys-input').val('');
							}else{
								layer.msg(data.error_message);
								console.log('更改失败原因:'+JSON.stringify(data,null,2))
							}
						},
						error: function(data) {
							publicAjaxError(data);				
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
				$.ajax({
					url: apiurl+'subsystem/'+$this.data('id'),
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
							layer.close(index);
							graphicImageGetData($this.data('page'));
							layer.msg('删除成功');
						} else {
							layer.msg(data.error_message);
							
						}
					},
					error: function(data) {
						publicAjaxError(data);
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
		title: ['新建子系统', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
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
		url:  apiurl+'subsystem',
		type: 'post',
		dataType: 'json',
		data: {
			project_id:$('#logo').data('proid'),
			name:str
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
				layer.msg(data.error_message);				
			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	})
}

