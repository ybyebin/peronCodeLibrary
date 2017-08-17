$(function() {
	node.getProjectId();
});
// $node.desc_instructions
window.$node = {
	btn_creat : $('#node-creat'),//新建
  	btn_delete : $('#node-delete'),//删除
  	btn_save :$('#node-save'),//保存(隐藏)
  	search_input :$("#content-search-input"),//搜索框
	node_name :$('#node-name'),//节点名称
  	node_mac:$('#node-mac'),//mac地址
  	node_timeout:$('#node-timeout'),//超时时间
  	node_desc:$('#node-desc'),//描述
  	loading:$(".loading"),//加载等待 
  	name_warn:$('#name-warn'),//名称警告
  	name_instructions:$('#name-instructions'),//名称提示
  	mac_warn:$('#mac-warn'),//mac警告
  	mac_instructions:$('#mac-instructions'),//mac提示
  	timeout_warn:$('#timeout-warn'),//超时警告
  	timeout_instructions:$('#timeout-instructions'),//超时提示
  	desc_warn:$('#desc-warn'),//描述警告
  	desc_instructions:$('#desc-instructions'),//描述提示
}



var node = {};　
node = (function(_node) {　
	var projectId; //工程ID
	// var savePage; //当前第几页
	_node.savePage = 0;
	_node.projectId = 0;
	// 获取工程信息-节点管理
	_node.getProjectId = function() {
		$.ajax({
			url: apiurl+'project',
			type: 'get',
			success: function(data) {
				if (data.success) {
					console.log("工程信息:" + JSON.stringify(data, null, 2))
					$('#logo').attr('src', data.data.logo_path);
					_node.projectId  = data.data.id;
					projectId = data.data.id;						
					_node.jiedianguanliLoadData(false, 1);

				} else {
					layer.msg(data.error_message);
				}
			},
			error: function(data) {
				layer.msg(data.error_message);
				returnLogIn(data);
			}
		})
	};
	//获取所有节点
	_node.jiedianguanliLoadData = function(Issearch, page) {
			var dataUp;
			// savePage = page;
			_node.savePage = page;
			if (Issearch) {
				dataUp = {
					name: $node.search_input.val(),
					project_id: projectId,
					page: page,
					page_item_count: 13,
				}
			} else {
				dataUp = {
					project_id: projectId,
					page: page,
					page_item_count: 13,
				}
			};
			$.ajax({
				url: apiurl+'node',
				type: 'get',
				dataType: 'json',
				data: dataUp,
				beforeSend: function() {
					$node.loading.show();
				},
				complete: function() {
					$node.loading.hide();
				},
				success: function(data) {
					$node.loading.hide();
					if (data.success) {
						console.log(JSON.stringify(data,null,2));
						_node.jqaddRow(data.data.items);

						if (data.data == null || Number(data.data.length) === 0) {
							$(".tcdPageCode").hide();
							layer.msg('无数据');
						} else {
							$(".tcdPageCode").createPage({
								pageCount: data.data.pageCount,
								current: page,
								backFn: function(p) {
									console.log(p);
									_node.savePage = p;
									if ($node.search_input.val() === "") {
										_node.jiedianguanliLoadData(false, p);
									} else {
										_node.jiedianguanliLoadData(true, p);
									}
								}
							});
						}


					} else {
						layer.msg(data.data);
					}
				},
				error: function(data) {
					publicAjaxError(data);
				}
			});
		}
		//节点管理 table处理函数
	_node.jqaddRow = function(data) {
		if (data == null) {
			data = [];
		}
		$('#node-tabody tr td').html('');
		$('#node-tabody tr').each(function(i, element) {
			if (i < data.length) {
				var tds = '<td><input  type="checkbox"  class="ckss" data-id = "' + data[i].id + '"  name="ckss"/></td><td>' + data[i].name +
					'</td><td>' + data[i].address +
					'</td><td>' + data[i].timeout +
					'</td><td>' + data[i].description +
					'</td><td><a href="#" data-id="' + data[i].id + '" class="edit-node">编辑</a><a href="#" data-id="' + data[i].id + '" class="delete-node">删除</a></td>';
				$(element).html(tds);
			}
		});
		_node.icheckInte();

	};
	//删除节点
	_node.deleteNode = function(nodegroup, layers) {	
			$.ajax({
				url: apiurl+'node/?ids='+ nodegroup.join(','),
				type: "DELETE",				
				beforeSend: function() {
					$node.loading.show();
				},
				complete: function() {
					$node.loading.hide();
				},
				success: function(data) {
					$node.loading.hide();
					if (data.success) {
						// layer.close(layers);
						layer.msg("删除成功");
						if ($('#content-search-input').val() === '') {
							_node.jiedianguanliLoadData(false, _node.savePage);
						} else {
							_node.jiedianguanliLoadData(true, _node.savePage);
						}
					} else {
						layer.msg(data.error_message)
					}
				},
				error: function(data) {
					publicAjaxError(data);
				}
			});
		}
		//清除数据;
	_node.clearData = function() {
		$('.node-form-edit input').val('');
		$('.node-form-edit .warn-span').text('').hide();
		$('.node-form-edit .instructions').show();
		$('textarea').val('');

	};
	// 选择框
	_node.icheckInte = function() {
		$('input').iCheck('destroy');
		$(".ckss").iCheck({
			checkboxClass: 'icheckbox_square-green',
			radioClass: 'iradio_square-green',
			increaseArea: '20%'
		});
	};
	// 检查正整数
	_node.checkInt = function(thiss, warnspans, instructions) {
		var pattern = new RegExp(/[^0-9]/g);
		if (thiss.val() != '' && thiss != null) {
			if (pattern.test(thiss.val())) {
				instructions.hide();
				warnspans.show().text('输入不合法');
				return false;
			}
		}
	};

	_node.checkmac = function(thiss, warnspans, instructions) {
		var pattern = new RegExp(/[^\a-\z\A-\Z0-9]/g);
		if (thiss.val() != '' && thiss != null) {
			if (pattern.test(thiss.val())) {
				instructions.hide();
				warnspans.show().text('输入不合法');
				return false;
			}
		}
	}
	return _node;　　
})(node);　


// 编辑节点
$("#node-tabody").on('click', 'a.edit-node', function(e) {
	$node.btn_save.data('type', 'edit');
	$node.btn_save.data('id', $(this).data('id'));
	node.clearData();
	console.log($node.btn_save.data('type'))
	var $this = $(this);
	layer_open = layer.open({
		title: ['编辑节点', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['60%', '500px'], //宽高
		content: $("#layer-node-new"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['保存', '放弃'],
		success: function() {
			console.log('查看:' + $this.parent().parent().find('td:nth-child(2)').text())
			var par = $this.parent().parent();

			$node.node_name.val(par.find('td:nth-child(2)').text());
			$node.node_mac.val(par.find('td:nth-child(3)').text());
			$node.node_timeout.val(par.find('td:nth-child(4)').text());
			$node.node_desc.val(par.find('td:nth-child(5)').text());
		},
		yes: function(index) {
			$node.btn_save.click();
		},
		btn2: function(index) {
			layer.close(index);
		}
	});

	if (e && e.stopPropagation) {
		e.stopPropagation();
	}



});
// 删除节点
$("#node-tabody").on('click', 'a.delete-node', function(e) {
	$this = $(this);
	var layers = layer.open({
		title: ['删除节点', 'font-size:18px;color:#fff;background:#3E4687;border:none;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '200px'], //宽高
		content: $("#layer-delete-node"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function() {
			$('#layer-delete-node p').text('确认删除该节点吗');
		},
		yes: function(index) {
			var group = [$this.data('id')];
			node.deleteNode(group, layers);
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});
//批量删除
$('#node-delete').on('click', function() {
	var ischeck = false;
	$("input[name='ckss']:checkbox").each(function(index, element) {
		if ($(element).is(':checked')) {
			ischeck = true;
			return false;
		}
	});
	if (ischeck) {
		$this = $(this);
		var layers = layer.open({
			title: ['删除节点', 'font-size:18px;color:#fff;background:#3E4687;border:none;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
			type: 1,
			skin: 'layui-primary', //加上边框
			area: ['600px', '200px'], //宽高
			content: $("#layer-delete-node"), //捕获的元素,
			shift: 2,
			move: false,
			btn: ['确定', '放弃'],
			success: function() {
				$('#layer-delete-node p').text('确认删除所有选中的节点吗');
			},
			yes: function(index) {
				var group = [];

				$("input[name='ckss']:checkbox").each(function(index, element) {
					if ($(element).is(':checked')) {
						group.push($(element).data('id'));
					}
				})
				console.log('查看选中的:' + JSON.stringify(group, null, 2))
				node.deleteNode(group, layers);
				layer.close(index);
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	} else {
		layer.msg('请至少选择一个节点')
	}
});

// 新建
var layer_open;
$('#node-creat').on('click', function() {
	$node.btn_save.data('type', 'creat');
	layer_open = layer.open({
		title: ['新建节点', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		closeBtn:1,
		skin: 'layui-primary', //加上边框
		area: ['60%', '500px'], //宽高
		content: $("#layer-node-new"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['保存', '放弃'],
		success: function() {
			node.clearData();
		},
		yes: function(index) {
			$node.btn_save.click();
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});

// 取消
// $('#node-cancle').on('click', function() {
// 	$('.node-form-edit').hide();
// 	$('.node-form-display').show();
// });

//保存
$node.btn_save.on('click', function() {
	console.log('工程ID:' + node.projectId)
	console.log('查看按钮数据====type:' + $(this).data('type'))
	console.log('查看按钮数据====id:' + $(this).data('id'))

	var span_nowrong = true;
	var input_nowrong = true;
	$('.node-form-edit span.warn-span').each(function(index, element) {
		if ($(element).text() !== '') {
			span_nowrong = false;
			return false;
		}
	});
	$('.node-form-edit input').each(function(index, element) {
		if ($(element).val() === '') {
			input_nowrong = false;
			return false;
		}
	});
	if (input_nowrong === true && span_nowrong === true) {
		if ($(this).data('type') === 'creat') {
			layer.msg('可以新建');
			var subData = {
				project_id:node.projectId,
				name: $node.node_name.val(),
				address: $node.node_mac.val(),
				timeout: Number($node.node_timeout.val()),
				description: $node.node_desc.val()
			}
			console.log("新建上传数据:" + JSON.stringify(subData, null, 2));
			$.ajax({
				url: apiurl+'node',
				type: 'post',
				dataType: 'json',
				data: {
					project_id:node.projectId,
					name: $node.node_name.val(),
					address: $node.node_mac.val(),
					timeout: Number($node.node_timeout.val()),
					description: $node.node_desc.val()
				},
				beforeSend: function() {
					$node.loading.show();
				},
				complete: function() {
					$node.loading.hide();
				},
				success: function(data) {
					$node.loading.hide();
					if (data.success) {
						if ($node.search_input.val() === '') {
							node.jiedianguanliLoadData(false, node.savePage);
						} else {
							node.jiedianguanliLoadData(true, node.savePage);
						}
						layer.close(layer_open);
						layer.msg("创建成功");

					} else {
						console.log("创建失败" + JSON.stringify(data, null, 2));
						layer.msg(data.error_message);
						
					}
				},
				error: function(data) {
					publicAjaxError(data);
				}
			});
		} else {
			// layer.msg('可以编辑');
			var subData = {
				project_id:node.projectId,
				id: $(this).data('id'),
				name: $node.node_name.val(),
				address: $node.node_mac.val(),
				timeout: Number($node.node_timeout.val()),
				description: $node.node_desc.val()
			}
			$.ajax({
				url: apiurl+'node',
				type: 'PUT',
				dataType: 'json',
				data: {
					project_id: node.projectId,
					id: $(this).data('id'),
					name: $node.node_name.val(),
					address: $node.node_mac.val(),
					timeout: Number($node.node_timeout.val()),
					description: $node.node_desc.val()
				},
				beforeSend: function() {
					$node.loading.show();
				},
				complete: function() {
					$node.loading.hide();
				},
				success: function(data) {
					$node.loading.hide();
					if (data.success) {
						if ($node.search_input.val() === '') {
							node.jiedianguanliLoadData(false, node.savePage);
						} else {
							node.jiedianguanliLoadData(true, node.savePage);
						}
						// node.jiedianguanliLoadData(false, node.savePage);
						layer.close(layer_open);
						layer.msg('修改成功');

					} else {
						layer.msg(data.error_message);						
					}

				},
				error: function(data) {
					publicAjaxError(data);
				}
			});
		}
	} else {
		if (input_nowrong === false && span_nowrong === true) {
			layer.msg('输入框不能为空');
		}
		if (span_nowrong === false && input_nowrong === true) {
			layer.msg('请检查输入是否准确');
		}
		if (span_nowrong === false && input_nowrong === false) {
			layer.msg('请检查输入是否准确');
		}
	}
});


// 搜索
//清除按钮
$("#clearImage").on("click", function() {
	$node.search_input.val("");
	node.jiedianguanliLoadData(false, 1);
});


// 实时 更新 搜索的数据
$node.search_input.on("input", function() {
	if ($node.search_input.val() === "") {
		node.jiedianguanliLoadData(false, 1);
	} else {
		node.jiedianguanliLoadData(true, 1);
	}
})


/************输入检查**************/


//节点名称
$node.node_name.on('input', function() {
	$node.name_instructions.show();
	$node.name_warn.hide().text("");
	RegeMatch($node.node_name, $node.name_warn, $node.name_instructions);
	if ($node.node_name.val() == '' && $node.name_warn.text() == '') {
		$node.name_instructions.hide();
		$node.name_warn.show().text("不能为空")
	}
	if ($node.name_warn.text() == '') {
		var num = chEnWordCount($node.node_name.val());
		if (num > 60) {
			$node.name_instructions.hide();
			$node.name_warn.show().text("字符超出限制");
		}
	}
});
$node.node_name.blur(function() {
	if ($node.name_warn.text() == '') {
		if ($node.node_name.val() == '') {
			$node.name_instructions.hide();
			$node.name_warn.show().text("不能为空")
		} else {
			var num = chEnWordCount($node.node_name.val());
			if (num > 60) {
				$node.name_instructions.hide();
				$node.name_warn.show().text("字符超出限制");
			}
		}
	}
});

// mac地址
$node.node_mac.on('input', function() {
	$node.mac_instructions.show();
	$node.mac_warn.hide().text("");
	
});
$node.node_mac.blur(function() {
	if ($node.mac_warn.text() == '') {
		if ($node.node_mac.val() == '') {
			$node.mac_instructions.hide();
			$node.mac_warn.show().text("不能为空")
		} else {
			// var num = chEnWordCount();
			var temp = /[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}/;
			if (!temp.test($node.node_mac.val())) {
				$node.mac_instructions.hide();
				$node.mac_warn.show().text("地址格式不正确");
			}
		}
	}
});

// 超时时间
$node.node_timeout.on('input', function() {
	$node.timeout_instructions.show();
	$node.timeout_warn.hide().text("");
	node.checkInt($node.node_timeout, $node.timeout_warn, $node.timeout_instructions);
	if ($node.node_timeout.val() == '' && $node.timeout_warn.text() == '') {
		$node.timeout_instructions.hide();
		$node.timeout_warn.show().text("不能为空")
	}
	if ($node.timeout_warn.text() == '') {
		var num = Number($node.node_timeout.val());
		if (num < 0 || num > 3600) {
			$node.timeout_instructions.hide();
			$node.timeout_warn.show().text("超出限制");
		}
	}
});

$node.node_timeout.blur(function() {
	if ($node.timeout_warn.text() == '') {
		if ($node.node_timeout.val() == '') {
			$node.timeout_instructions.hide();
			$node.timeout_warn.show().text("不能为空")
		} else {
			var num = Number($node.node_timeout.val());
			if (num < 0 || num > 3600) {
				$node.timeout_instructions.hide();
				$node.timeout_warn.show().text("超出限制");
			}
		}
	}
});

// 描述
$node.node_desc.on('input', function() {
	$node.desc_instructions.show();
	$node.desc_warn.hide().text("");
	RegeMatch($(this), $node.desc_warn, $node.desc_instructions);

	if ($node.desc_warn.text() == '') {
		var num = chEnWordCount($node.node_desc.val());
		if (num > 60) {
			$node.desc_instructions.hide();
			$node.desc_warn.show().text("字符超出限制");
		}
	}
});


