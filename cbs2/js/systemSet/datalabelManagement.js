$(function() {
	$('.ckss-edit').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	})
	datalabel.getProjectId();
	datalabel.loadNode();
	datalabel.initData();
	datalabel.booleans();

})

var datalabel = {};
datalabel = (function(_datalabel) {　
	var projectId; //工程ID	
	_datalabel.savePage = 0;
	// 获取工程信息
	_datalabel.getProjectId = function() {
		$.ajax({
			url: apiurl + "r=api/project/info",
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.success) {
					console.log("工程信息:" + JSON.stringify(data, null, 2))
					$('#logo').attr('src', data.data.logo_path);
					projectId = data.data.project_id;
					_datalabel.shujubiaoqianLoadData(false, 1);
				} else {
					layer.msg(data.error_message);
					console.log("获取工程信息失败原因:" + JSON.stringify(data, null, 2))
					returnLogIn(data.error_message);
				}
			},
			error: function(data) {
				layer.msg(data.error_message);
				console.log("获取工程信息失败原因:" + JSON.stringify(data, null, 2))
			}
		})
	};

	//获取所有数据标签
	_datalabel.shujubiaoqianLoadData = function(Issearch, page) {
		var dataUp;

		_datalabel.savePage = page;
		if (Issearch) {
			dataUp = {
				name: $("#content-search-input").val(),
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
		console.log("请求节点数据上传参数:" + JSON.stringify(dataUp, null, 2));

		$.ajax({
			url: apiurl + "r=api/entity/tag/list",
			type: 'post',
			dataType: 'json',
			data: {
				data: JSON.stringify(dataUp)
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
					console.log('查看数据:' + JSON.stringify(data, null, 2))

					_datalabel.jqaddRow(data.data.items);

					if (data.data == null || Number(data.data.length) === 0) {
						$(".tcdPageCode").hide();
						layer.msg('无数据');
					} else {
						$(".tcdPageCode").createPage({
							pageCount: data.data.pageCount,
							current: page,
							backFn: function(p) {
								console.log(p);
								_datalabel.savePage = p;
								if ($("#content-search-input").val() === "") {
									_datalabel.shujubiaoqianLoadData(false, p);
								} else {
									_datalabel.shujubiaoqianLoadData(true, p);
								}
							}
						});
					}


				} else {
					layer.msg(data.error_message);
					console.log("错误信息" + JSON.stringify(data, null, 2))
					returnLogIn(data.error_message);
				}
			},
			error: function(data) {
				$(".loading").hide();
				layer.msg(data.error_message);
				console.log("错误信息" + JSON.stringify(data, null, 2));
			}
		});
	};
	//table处理函数
	_datalabel.jqaddRow = function(data) {
		if (data == null) {
			data = [];
		}
		for (var i in data) {
			switch (data[i].tag_type) {
				case 'boolean':
					data[i].tag_type = "开关型";
					break;
				case 'integer':
					data[i].tag_type = "整数型";
					break;
				case 'float':
					data[i].tag_type = "实数型";
					break;
				case 'string':
					data[i].tag_type = "字符型";
					break;
			}
		}

		$('#datalabel-tbodys tr td').html('');
		$('#datalabel-tbodys tr').each(function(i, element) {
			if (i < data.length) {
				var tds = '<td><input  type="checkbox"  class="ckss" data-id = "' + data[i].id + '"  name="ckss"/></td><td>' + data[i].name +
					'</td><td>' + data[i].description +
					'</td><td>' + data[i].tag_type +
					'</td><td>' + data[i].node_name +
					'</td><td>' + data[i].point_id +
					'</td><td><a href="#" data-id="' + data[i].id + '" class="edit-datalabel">编辑</a><a href="#" data-id="' + data[i].id + '" class="delete-datalabel">删除</a></td>';
				$(element).html(tds);
			}
		});
		_datalabel.icheckInte();

	};
	// 初始化标签输入框
	_datalabel.initData = function() {
			$('#datalab-warn-val').attr("disabled", "disabled");
			$('#datalab-warn-level').attr("disabled", "disabled");
			$('#datalab-warn-des').attr("disabled", "disabled");
			$('#datalab-his-siquval').attr("disabled", "disabled");
			$('#datalab-fixed-val').attr("disabled", "disabled");
			$('#datalab-sec-min').attr("disabled", "disabled");
			$('#datalab-siqu').iCheck('disable');
			$('#datalab-siquval').attr("disabled","disabled");
		}
		//删除数据标签
	_datalabel.deleteTag = function(taggroup) {
			$.ajax({
				url: apiurl + "r=api/entity/tag/delete",
				type: "post",
				dataType: "json",
				data: {
					data: JSON.stringify({
						tag_id_group: taggroup
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
						layer.msg("删除成功");
						if ($('#content-search-input').val() === '') {
							_datalabel.shujubiaoqianLoadData(false, _datalabel.savePage);
						} else {
							_datalabel.shujubiaoqianLoadData(true, _datalabel.savePage);
						}
					} else {
						layer.msg(data.error_message)
						returnLogIn(data.error_message);
					}
				},
				error: function(data) {
					$(".loading").hide();
					layer.msg(data.error_message)
				}
			});
		}
		//获取单条数据标签信息
	_datalabel.oneTagMessage = function(tagid) {
			$.ajax({
				url: apiurl + "r=api/entity/tag/get",
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify({
						tag_id: tagid
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
						console.log('标签信息:' + JSON.stringify(data, null, 2));
						$('.datalabel-edit').show();
						$('.datalabel-dis').hide();
						_datalabel.disDetailedMessag(data.data);
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
		// 展示标签详细信息
	_datalabel.disDetailedMessag = function(data) {
		$('#datalab-name').val(data.name);
		$('#datalab-des').val(data.description);
		$('#datalab-node').val(data.node_id);
		$('#datalab-register').val(data.point_id);
		//只读 
		switch(Number(data.is_readonly)){
			case 1:
			$('#datalab-readonly').iCheck('check');
			break;
			case 0:
			$('#datalab-readonly').iCheck('uncheck');
			break;
		}		
		// 采集方式
		switch (data.collectMode) {
			case 'messaging':
				$('#datalab-acquisition-style').val('messaging');
				break;
			case 'polling':
				$('#datalab-acquisition-style').val('polling');
				break;
			case 'messagingAndPooling':
				$('#datalab-acquisition-style').val('messagingAndPooling');
				break;
		}
		// 采集频率
		$('#datalab-acquisition-frequency').val(data.collectInterval);

		// 数据类型
		switch (data.tag_type) {
			case 'boolean':
				$('#datalab-type').val("boolean");
				_datalabel.booleans();
				// 默认值
				switch (Number(data.init_value)) {
					case 1:
						$('#datalab-defaultvalue-switch').val("1");
						break;
					case 0:
						$('#datalab-defaultvalue-switch').val("0");
						break;
				}

				$('#datalab-warn').data('id',data.alarm_attributes[0].id);
				// 启用报警
				switch (Number(data.alarm_attributes[0].status)) {
					case 0:
						$('#datalab-warn').iCheck('uncheck');
						break;
					case 1:
						$('#datalab-warn').iCheck('check');
						break;
				}
				// 报警值
				switch (Number(data.alarm_attributes[0].value)) {
					case 0:
						$('#datalab-warn-val').val('0');
						break;
					case 1:
						$('#datalab-warn-val').val('1');
						break;
				}
				// 报警级别
				switch (Number(data.alarm_attributes[0].level)) {
					case 1:
						$('#datalab-warn-level').val('1');
						break;
					case 2:
						$('#datalab-warn-level').val('2');
						break;
					case 3:
						$('#datalab-warn-level').val('3');
						break;
				}

				// 报警描述
				$('#datalab-warn-des').val(data.alarm_attributes[0].message);
				_datalabel.historyMessage(data);

				break;
			case 'integer':
				$('#datalab-type').val("integer");
				_datalabel.integerAndFloat();
				_datalabel.IntergerAndFloatMessage(data);
				_datalabel.historyMessage(data);
				break;
			case 'float':
				$('#datalab-type').val("float");
				_datalabel.integerAndFloat();
				_datalabel.IntergerAndFloatMessage(data);
				_datalabel.historyMessage(data);
				break;
			case 'string':
				$('#datalab-type').val("string");
				_datalabel.strings();
				break;
		}

	};
	// 历史数据展示
	_datalabel.historyMessage = function(data) {
			// 数据改变存储
			switch (Number(data.history_change_save)) {
				case 1:
					$('#datalab-change-storage').iCheck('check');
					break;
				case 0:
					$('#datalab-change-storage').iCheck('uncheck');
					break;
			}

			// 历史数据死区值
			if (data.tag_type === 'boolean') {} else {
				$('#datalab-his-siquval').val(data.history_dead_zone_value);
			}
			console.log('历史死区值:' + data.history_dead_zone_value)
				// 固定时间间隔存储
			switch (Number(data.history_time)) {
				case 1:
					$('#datalab-fixed-storage').iCheck('check');
					break;
				case 0:
					$('#datalab-fixed-storage').iCheck('uncheck');
					break;
			}
			// 存储值		
			$('#datalab-fixed-val').val(data.history_time_value);
			console.log('存储值:' + data.history_time_value);
			// 单位
			switch (data.history_time_unit) {
				case 'second':
					$('#datalab-sec-min').val('second');
					break;
				case 'minute':
					$('#datalab-sec-min').val('minute');
					break;
			}

		}
		// 整数实数数据展示
	_datalabel.IntergerAndFloatMessage = function(data) {
		// 能耗数据
		switch (Number(data.energy_data)) {
			case 1:
				$('#datalab-nenghao').iCheck('check');
				break;
			case 0:
				$('#datalab-nenghao').iCheck('uncheck');
				break;
		}
		// 默认值
		$('#datalab-defaultvalue').val(data.init_value);
		//最大值
		$('#datalab-maxval').val(data.max_value);
		//最小值
		$('#datalab-minval').val(data.min_value);
		// 乘以
		$('#datalab-chengyival').val(data.multiply_by);

		// 报警死区是否有效
		switch (Number(data.alarm_dead_zone)) {
			case 1:
				$('#datalab-siqu').iCheck('check');
				break;
			case 0:
				$('#datalab-siqu').iCheck('uncheck');
				break;
		}
		// 报警死区值
		$('#datalab-siquval').val(data.alarm_dead_zone_value);

		// 报警界限
		var datas = data.alarm_attributes
		for (var i in datas) {		
			var tr = '<tr data-id="' + datas[i].id + '">' + '<td><select style="width:60px;" class ="form-control select-sign"><option value ="GreaterThan">></option><option value ="LessThan"><</option></select></td>' + '<td><input class="form-control select-value" type="text" style="border:none;" value="' + datas[i].value + '"></td>' + '<td><select style="width:65px;" class = "form-control select-level"><option value = "3">高</option><option value = "2">中</option><option value = "1">低</option></select></td>' + '<td><input class="form-control select-desc" type="text" style="border:none;" value="' + datas[i].message + '"></td>' + '<td class="warn-delete">删除</td>' + '</tr>';
			$('#table-warn tbody').append(tr);
			$('#table-warn tbody tr').each(function(index, ele) {
				if (Number(i) === Number(index)) {										
					$(ele).find('select.select-sign').val(datas[i].operator);
					$(ele).find('select.select-level').val(datas[i].level);
				}
			});

			if ($('#table-warn tbody tr').length > 0) {
				$('#datalab-siqu').iCheck('enable');
			}
		}
	}

	// 整数实数型数据保存
	_datalabel.IntergerAndFloatSave = function() {
		var alarm_dead_zone;
		var energy_data;
		var alarm_attributes = [];
		// 报警死区
		if ($('#datalab-siqu').is(':checked')) {
			alarm_dead_zone = true;
		} else {
			alarm_dead_zone = false;
		}

		// 能耗数据
		if ($('#datalab-nenghao').is(':checked')) {
			energy_data = true;
		} else {
			energy_data = false;
		}

		$('#table-warn tbody tr').each(function(index, element) {
			var dic = {};
			var id;
			if ($(this).data('id') === '') {} else {
				dic.id = $(this).data('id');
			}

			dic.operator = $(this).find('select.select-sign').val();
			dic.value = $(this).find('input.select-value').val();
			dic.level = $(this).find('select.select-level').val();
			dic.message = $(this).find('input.select-desc').val();
			alarm_attributes.push(dic);

		});

		var data = {
			energy_data: energy_data,
			max_value:$('#datalab-maxval').val() ,
			min_value:$('#datalab-minval').val(),
			multiply_by:$('#datalab-chengyival').val(),
			alarm_dead_zone: alarm_dead_zone,
			alarm_dead_zone_value: $('#datalab-siquval').val(),
			alarm_attributes: alarm_attributes
		}

		return data;
	}

	// 保存标签数据
	_datalabel.saveDataLabel = function() {

			var is_readonly,
				history_dead_zone_value,
				history_time_unit,
				history_time,
				history_time_value,
				history_change_save;
			// 只读
			if ($('#datalab-readonly').is(':checked')) {
				is_readonly = true;
			} else {
				is_readonly = false;
			}
			// 数据改变存储
			if ($('#datalab-change-storage').is(':checked')) {
				history_change_save = true;
			} else {
				history_change_save = false;
			}
			//固定间隔存储 
			if ($('#datalab-fixed-storage').is(':checked')) {
				history_time = true;
			} else {
				history_time = false;
			}
			// 死区值
			history_dead_zone_value = $('#datalab-his-siquval').val();
			// 时间间隔值
			history_time_value = $('#datalab-fixed-val').val();
			// 时间间隔单位
			history_time_unit = $('#datalab-sec-min').val();

			var data = {
				name: $('#datalab-name').val(),
				tag_type: $('#datalab-type').val(),
				description: $('#datalab-des').val(),
				node_id: $('#datalab-node').val(),
				point_id: $('#datalab-register').val(),
				is_readonly: is_readonly,
				collectMode: $('#datalab-acquisition-style').val(),
				collectInterval: $('#datalab-acquisition-frequency').val()
			};

			switch ($('#datalab-type').val()) {
				case 'boolean':					
					switch(Number($('#datalab-defaultvalue-switch').val()))
					{
						case 1:
						data.init_value = true;
						break;
						case 0:
						data.init_value = false;
						break;
					}
					 
					var alarm_on;
					if ($('#datalab-warn').is(':checked')) {
						alarm_on = true;
					} else {
						alarm_on = false;
					}
					var alarm_attributes = {
						status: alarm_on,
						value: $('#datalab-warn-val').val(),
						level: $('#datalab-warn-level').val(),
						message: $("#datalab-warn-des").val()
					};
					if ($('#datalab-warn').data('id') === '') {}else{
						alarm_attributes.id = $('#datalab-warn').data('id');
					}

					data.alarm_attributes = alarm_attributes;
					data.history_change_save = history_change_save;
					data.history_time = history_time;
					data.history_time_value = history_time_value;
					data.history_time_unit = history_time_unit;

					break;
				case 'integer':
					var dataarr = _datalabel.IntergerAndFloatSave();
					data.energy_data  = dataarr.energy_data ;
					data.init_value = $('#datalab-defaultvalue').val();
					data.max_value = dataarr.max_value;
					data.min_value = dataarr.min_value;
					data.multiply_by = dataarr.multiply_by;
					data.alarm_attributes = dataarr.alarm_attributes;
					data.alarm_dead_zone = dataarr.alarm_dead_zone;
					data.alarm_dead_zone_value = dataarr.alarm_dead_zone_value;
					data.history_change_save = history_change_save;
					data.history_time = history_time;
					data.history_time_value = history_time_value;
					data.history_time_unit = history_time_unit;
					data.history_dead_zone_value = history_dead_zone_value;
					break;
				case 'float':
					var dataarr = _datalabel.IntergerAndFloatSave();
					data.energy_data  = dataarr.energy_data ;
					data.init_value = $('#datalab-defaultvalue').val();
					data.max_value = dataarr.max_value;
					data.min_value = dataarr.min_value;
					data.multiply_by = dataarr.multiply_by;
					data.alarm_attributes = dataarr.alarm_attributes;
					data.alarm_dead_zone = dataarr.alarm_dead_zone;
					data.alarm_dead_zone_value = dataarr.alarm_dead_zone_value;
					data.history_change_save = history_change_save;
					data.history_time = history_time;
					data.history_time_value = history_time_value;
					data.history_time_unit = history_time_unit;
					data.history_dead_zone_value = history_dead_zone_value;
					break;
				case 'string':
					data.init_value = $('#datalab-defaultvalue').val();
					break;
			}
			return data;

		}
		// 请求全部节点
	_datalabel.loadNode = function() {
		$.ajax({
			url: apiurl + "r=api/entity/node/listall",
			type: 'post',
			dataType: 'json',
			success: function(result) {
				if (result.success == true) {
					var data = result.data;
					for (var i in data) {
						$("#datalab-node").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
					}
				} else {
					layer.msg(result.error_message);
					returnLogIn(result.error_message);
					console.log("获取所有的节点失败:" + JSON.stringify(result, null, 2));
				}
			},
			error: function(data) {
				layer.msg(data.error_message)
				console.log("获取所有的节点失败:" + JSON.stringify(data, null, 2));
			}
		});
	}

	//新建标签提交
	_datalabel.creatDatalabel = function(data) {
		$.ajax({
			url: apiurl + "r=api/entity/tag/create",
			type: "post",
			dataType: "json",
			data: {
				data:JSON.stringify(data)
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
					layer.msg('创建成功');
					_datalabel.cleanInput();
				} else {
					layer.msg(data.error_message);
					returnLogIn(data.error_message);
					console.log("创建失败错误信息" + JSON.stringify(data, null, 2));
				}
			},
			error: function(data) {
				$(".loading").hide();
				layer.msg(data.error_message);
				console.log("创建失败错误信息" + JSON.stringify(data, null, 2));
			}
		});
	}
	// 编辑数据标签提交
	_datalabel.editDatalabels = function(data){
		$.ajax({
			url: apiurl + "r=api/entity/tag/update",
			type: "post",
			dataType: "json",
			data: {
				data:JSON.stringify(data)
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
					layer.msg('编辑成功');
					if ($("#content-search-input").val() === "") {
						_datalabel.shujubiaoqianLoadData(false,_datalabel.savePage);
					} else {
						_datalabel.shujubiaoqianLoadData(true,_datalabel.savePage);
					}
					$('.datalabel-edit').hide();
					$('.datalabel-dis').show();
					_datalabel.cleanInput();
				} else {
					layer.msg(data.error_message);
					returnLogIn(data.error_message);
					console.log("编辑失败原因" + JSON.stringify(data, null, 2));
				}
			},
			error: function(data) {
				$(".loading").hide();
				layer.msg(data.error_message);
				console.log("编辑失败原因" + JSON.stringify(data, null, 2));
			}
		});
	}
	// 选择框-列表
	_datalabel.icheckInte = function() {
		$('.ckss').iCheck('destroy');
		$(".ckss").iCheck({
			checkboxClass: 'icheckbox_square-green',
			radioClass: 'iradio_square-green',
			increaseArea: '20%'
		});

	};
	// 清空数据
	_datalabel.cleanInput = function() {
			$('.clean-input').val('');
			$('.ckss-edit').iCheck('uncheck');
			$("select option:first").prop("selected", 'selected');
			$('.datalabel-edit .content > div:not(:nth-child(1))').show();
			$('#table-warn tbody').html('');
			_datalabel.booleans();
		}
		// 开关型 页面展示
	_datalabel.booleans = function() {
			$('.lab-checkbox').hide();
			$('#datalab-defaultvalue').hide();
			$('#datalab-defaultvalue-switch').show();
			$('.div-switch-warn').show();
			$('.div-other-warn').hide();
			$('.datalabel-edit .content > div').show();
		}
		// 字符型 页面展示
	_datalabel.strings = function() {
			$('.lab-checkbox').hide();
			$('#datalab-defaultvalue').show();
			$('#datalab-defaultvalue-switch').hide();
			$('.div-switch-warn').show();
			$('.div-other-warn').hide();
			$('.datalabel-edit .content > div:not(:nth-child(1))').hide();
		}
		// 整数实数型 页面展示
	_datalabel.integerAndFloat = function() {
		$('.lab-checkbox').show();
		$('#datalab-defaultvalue').show();
		$('#datalab-defaultvalue-switch').hide();
		$('.div-switch-warn').hide();
		$('.div-other-warn').show();
		$('.datalabel-edit .content > div').show();
	}



	return _datalabel;　

})(datalabel);


//搜索 清除按钮
$("#clearImage").on("click", function() {
	$("#content-search-input").val("");
	datalabel.shujubiaoqianLoadData(false, 1);
});
// 实时 更新 搜索的数据
$("#content-search-input").on("input", function() {
	if ($("#content-search-input").val() === "") {
		datalabel.shujubiaoqianLoadData(false, 1);
	} else {
		datalabel.shujubiaoqianLoadData(true, 1);
	}
})

// 新建
$("#datalabel_creat").on("click", function() {
	$('.datalabel-edit').show();
	$('.datalabel-dis').hide();
	datalabel.cleanInput();

	$('#btn-save').data('id', '');
	$('#btn-save').data('type', 'add');
	$('#datalab-warn').data('id','');//新建时 清空开关型启用报警的 data-id;

});

// 删除
$('#datalabel-tbodys').on('click', 'a.delete-datalabel', function() {
	$this = $(this);
	// 复用
	layer.open({
		title: ['删除数据标签', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '200px'], //宽高
		content: $("#layer-delete-node"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function() {
			$('#layer-delete-node p').text('确认删除该标签吗');
		},
		yes: function(index) {
			var group = [$this.data('id')];
			datalabel.deleteTag(group)
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});
// 批量删除
$('#datalabel_delete').on('click', function() {
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
			title: ['删除数据标签', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
			type: 1,
			skin: 'layui-primary', //加上边框
			area: ['600px', '200px'], //宽高
			content: $("#layer-delete-node"), //捕获的元素,
			shift: 2,
			move: false,
			btn: ['确定', '放弃'],
			success: function() {
				$('#layer-delete-node p').text('确认删除所有选中的标签吗');
			},
			yes: function(index) {
				var group = [];

				$("input[name='ckss']:checkbox").each(function(index, element) {
					if ($(element).is(':checked')) {
						group.push($(element).data('id'));
					}
				})
				console.log('查看选中的:' + JSON.stringify(group, null, 2))
				datalabel.deleteTag(group)
				layer.close(index);
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	} else {
		layer.msg('请至少选择一个标签')
	}
});

// 编辑
$('#datalabel-tbodys').on('click', 'a.edit-datalabel', function() {
	$('#btn-save').data('id', $(this).data('id'));
	$('#btn-save').data('type', 'edit');
	datalabel.cleanInput();
	datalabel.oneTagMessage($(this).data('id'));
});
// 保存
$('#btn-save').on('click', function() {	
	var input_no_null = true;
	var warn_input_nonull = true;
	var type_warn,
		type_type;
	var updata = datalabel.saveDataLabel();
	$('.input-must-fill').each(function(index,ele){
		console.log('值:'+$(ele).val())
		if ($(ele).val() === '') {
			input_no_null = false;
			return false;
		}
	});

	switch($('#datalab-type').val()){
		case 'boolean':
		type_warn = 'type-one';
		type_type = 'type-select';
		break;
		case 'integer':
		type_warn = 'type-two';
		type_type = 'type-input';
		break;
		case 'float':
		type_warn = 'type-two';
		type_type = 'type-input';
		break;
		case 'string':
		type_warn = 'type-one';
		type_type = 'type-input';
		break;
	}

	if (input_no_null) {
		switch(type_type){
			case 'type-select':
				if ($('#datalab-acquisition-style').val() === 'messaging') {
					checkOne(type_warn,updata);
				}else{
					if($('#datalab-acquisition-frequency').val() === ''){
						layer.msg('采集频率不能为空');
					}else{
						checkOne(type_warn,updata);
					}
				}
			break;
			case 'type-input':
			if ($('#datalab-defaultvalue').val() === '') {
				layer.msg('默认值不能为空');
			}else{
				if ($('#datalab-acquisition-style').val() === 'messaging') {
					checkOne(type_warn,updata);
				}else{
					if($('#datalab-acquisition-frequency').val() === ''){
						layer.msg('采集频率不能为空');
					}else{
						checkOne(type_warn,updata)
					}
				}
			}
			break;
		}

	}else{	
		layer.msg('必填项不能为空')
	}

});



function checkOne(type,updata) {
	var warn_input_nonull = true;
	var saveOrEdit;
	switch($('#btn-save').data('type')){
		case 'add':
		saveOrEdit = 'add';
		break;
		case 'edit':
		saveOrEdit = 'edit';
		break
	}	

	console.log('saveOrEdit:'+saveOrEdit);
	switch (type) {
		case 'type-one':
				// 提交
				if (saveOrEdit === 'add') {
					datalabel.creatDatalabel(updata);
					console.log('数据值:' + JSON.stringify(updata, null, 2));
				} else {
					updata.tag_id = $('#btn-save').data('id');
					datalabel.editDatalabels(updata);
					console.log('数据值:' + JSON.stringify(updata, null, 2));
				}			
			break;
		case 'type-two':
			$('#table-warn input.select-value').each(function(index, ele) {
				if ($(ele).val() === '') {
					warn_input_nonull = false;
					return false;
				}
			});			
			if (warn_input_nonull) {
					// 提交
					if (saveOrEdit === 'add') {
						datalabel.creatDatalabel(updata);
						console.log('数据值:' + JSON.stringify(updata, null, 2));
					} else {
						updata.tag_id = $('#btn-save').data('id');
						datalabel.editDatalabels(updata);
						console.log('数据值:' + JSON.stringify(updata, null, 2));
					}
				} else {
					layer.msg('界限值不能为空');
				}
			break;
	}
}




// 保存并继续
// $('#btn-savegoon').on('click', function() {

// });
// 取消
$('#btn-cancel').on('click', function() {
	$('.datalabel-edit').hide();
	$('.datalabel-dis').show();
	datalabel.cleanInput();
});

// 添加界限值
$('#datalab-addlimit').on('click', function() {
	if ($('#table-warn tbody tr').length < 8) {
		var tr = '<tr data-id="">' + '<td><select style="width:60px;" class ="form-control select-sign"><option value = "GreaterThan" selected = "selected">></option><option value = "LessThan"><</option></select></td>' + '<td><input class="form-control select-value" type="text" style="border:none;"></td>' + '<td><select style="width:65px;" class = "form-control select-level" value = ""><option value = "1">高</option><option value = "2">中</option><option value = "3">低</option></select></td>' + '<td><input class="form-control select-desc" type="text" style="border:none;"></td>' + '<td class="warn-delete">删除</td>' + '</tr>';
		$('#table-warn tbody').append(tr);
		$('#datalab-siqu').iCheck('enable');
	} else {
		layer.msg('最多8条报警')
	}
});
// 删除界限值
$('#table-warn tbody').on('click', 'td.warn-delete', function() {
	$(this).parent().remove();
	if (!$('#table-warn tbody').html()) {
		$('#datalab-siqu').iCheck('uncheck');
		$('#datalab-siqu').iCheck('disable');
	}
});


// 条件限制
$('#datalab-warn').on('ifChanged', function(event) {
	if ($(this).is(':checked')) {
		$('#datalab-warn-val').removeAttr("disabled");
		$('#datalab-warn-level').removeAttr("disabled");
		$('#datalab-warn-des').removeAttr("disabled");
	} else {
		$('#datalab-warn-val').attr("disabled", "disabled");
		$('#datalab-warn-level').attr("disabled", "disabled");
		$('#datalab-warn-des').attr("disabled", "disabled");
	}
});

$('#datalab-siqu').on('ifChanged', function(event) {
	if ($(this).is(':checked')) {
		$('#datalab-siquval').removeAttr("disabled");
	} else {
		$('#datalab-siquval').attr("disabled", "disabled");
	}
});

$('#datalab-change-storage').on('ifChanged', function(event) {
	if ($(this).is(':checked')) {
		$('#datalab-his-siquval').removeAttr("disabled");
	} else {
		$('#datalab-his-siquval').attr("disabled", "disabled");
	}
});

$('#datalab-fixed-storage').on('ifChanged', function(event) {
	if ($(this).is(':checked')) {
		$('#datalab-fixed-val').removeAttr("disabled");
		$('#datalab-sec-min').removeAttr("disabled");
	} else {
		$('#datalab-fixed-val').attr("disabled", "disabled");
		$('#datalab-sec-min').attr("disabled", "disabled");
	}
});

// 数据类型选择
$('#datalab-type').on('change', function() {
	console.log($(this).val())
	switch ($(this).val()) {
		case 'boolean':
			datalabel.booleans();
			break;
		case 'integer':
			datalabel.integerAndFloat();
			break;
		case 'float':
			datalabel.integerAndFloat();
			break;
		case 'string':
			datalabel.strings();
			break;
	}
})
// 采集方式选择
$('#datalab-acquisition-style').on('change', function() {
	switch ($(this).val()) {
		case 'messaging':
		$('#datalab-acquisition-frequency').attr("disabled", "disabled");
		$('#datalab-acquisition-frequency').val('');		
			break;
		case 'polling':
		$('#datalab-acquisition-frequency').removeAttr("disabled");
			break;
		case 'messagingAndPooling':
		$('#datalab-acquisition-frequency').removeAttr("disabled");
			break;
	}
});