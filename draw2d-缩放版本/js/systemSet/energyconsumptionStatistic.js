// =============================能耗展示=================================
/**
 * [能耗统计  获得数据--左侧菜单栏]
 * @return {[type]} [description]
 */
function energyConsumptionDisplayLoadData(string) {
	$.ajax({
		url: apiurl + 'energyconfig',
		type: 'GET',
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			console.log('查看:' + JSON.stringify(data.data, null, 2))
			if (data.success) {
				if (data.data.items !== null) {
					if (string === 'display') {
						energyDisplayleftAddli(data.data.items);
					} else {
						energyEditleftAddli(data.data.items);
					}
				} else {
					layer.msg('未配置能耗统计');
					$('#collapse-left ul').html(''); //删除最后一条数据清空列表
					$('#edit_right_div_tab tr td').html('');
					$('#hide_tag').iCheck('uncheck');
				}

			} else {
				layer.msg(data.error_message);
			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	})
}
/**
 * [能源-展示-添加左侧树]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function energyDisplayleftAddli(data) {
	if (data.length !== 0) {
		$('.collapse-left').html('');
		var html = '<ul>';
		for (var i = 0; i < data.length; i++) {
			var lis = '<li data-id="' + data[i].id + '" data-name="' + data[i].name + '">' + data[i].name + '</li>';
			html += lis;
		}
		html += '</ul>';
		$('.collapse-left').html(html);
		$('.collapse-left ul').find('li')[0].click();
	}
}
/**
 * [ 请求 右侧 数据列表  ]
 * @return {[type]}     [该组全部数据]
 */
$('#collapse-lefts').on('click', 'ul li', function() {
	$('#collapse-lefts ul li').removeClass('active');
	$(this).addClass('active');
	energyConsumptionDisplayRequestTableList($(this).data('id'), $(this).data('name'));
	setTimeout(function() {
		$(".div-have-tables").mCustomScrollbar('scrollTo', 'top');
	}, 300);

});
/**
 * [ 能源-展示-组详细数据  ]
 * @param  {[number]} ids [组ID]
 * @return {[type]}     [该组全部数据]
 */
function energyConsumptionDisplayRequestTableList(ids, name) {
	$.ajax({
		url: apiurl + 'energytag/' + ids,
		type: 'GET',
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				$('.right-head-p').text(name);
				$('#display-table tbody').html('');
				var arr = [];
				if (data.data.items !== null) {
					arr = data.data.items;
				}
				for (var key in arr) {
					if (arr[key].oprate == "1") {
						arr[key].oprate = "加";
					} else {
						arr[key].oprate = "减";
					}
				}

				if (arr.length < 13) {
					var da = {
						name: "",
						oprate: "",
						node_name: "",
						point_id: ""

					}
					var num = 13 - arr.length;
					for (var i = 0; i < num; i++) {
						arr.push(da);
					}
				}
				var trs;
				for (var key in arr) {
					trs += '<tr><td>' + arr[key].name + '</td><td>' + arr[key].oprate + '</td><td>' + arr[key].node_name + '</td><td>' + arr[key].point_id + '</td></tr>';
				}
				$('#display-table tbody').append(trs);
			} else {
				layer.msg(data.error_message)

			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	})
}
/**
 * [编辑]
 * @param  {String}
 */
$('#statistical-btn-edit').on('click', function() {
	window.location.href = 'energyconsumptionStatisticEdit.html';
});



// =============================能耗编辑=================================
var rename = true; //只允许一个重命名状态
var addgroup = true; // 只允许存在一个添加状态
var leftTreeLiDatalabelGroup; //每个组的数据
var layerCheckedDatalabelGroup; //弹窗选择的数据标签数据


$('#statistical-btn-cancle').on('click', function() {
	window.location.href = 'energyconsumptionStatisticDis.html';
});

/**
 * [能源-编辑-添加左侧树]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function energyEditleftAddli(data) {
	$('.collapse-left-edit ul').html('');
	var html = '';
	if (data.length !== 0) {
		for (var key in data) {
			var lis = '<li class="groups' + data[key].id + '" data-id="' + data[key].id + '" data-hidetag="' + data[key].hide_tag + '" data-sel="sel_no">' + '<div class="li-display"><label class="col-sm-7 control-label">' + data[key].name + '</label>' + '<label class="col-sm-4 control-label">' + '<a href="#" class="a-rename">重命名</a><a href="#" class="a-delete" data-id="' + data[key].id + '">删除</a>' + '</label></div>' + '<div class="li-rename" style="display:none"><label class="col-sm-7 control-label">' + '<input type="text" maxlength="20" class="form-control" style="margin-top: 5px;"></label>' + '<label class="col-sm-4 control-label">' + '<a href="#" class="a-rename-sure" data-id="' + data[key].id + '">确定</a><a href="#" class="a-rename-cancle">取消</a>' + '</label></div></li>';
			html += lis;
		}
		$('#collapse-left ul').html(html);
		// $('#collapse-left ul').find('li')[0].click();
		var gid = sessionStorage.getItem("TagGroup");
		if (gid !== '') {
			$('.groups' + gid).click();
		}

	}
}
//点击列表获取详细数据
$('.collapse-left-edit').on('click', 'ul li', function() {

	if (rename == true && addgroup == true) {
		$('.collapse-left-edit ul li').removeClass('active');
		$(this).addClass('active');
		$('.collapse-left-edit ul li').data('sel', 'sel_no');
		$(this).data('sel', 'sel');
		energyConsumptionEditRequestTableList($(this).data('id'), $(this).data('hidetag'));
		$('#edit-btn-savedatalabel').data('id', $(this).data('id'));
		sessionStorage.setItem("TagGroup", $(this).data('id'));
		console.log($('#edit-btn-savedatalabel').data('id'))
	}
});

//重命名
$('.collapse-left-edit').on('click', 'a.a-rename', function(e) {
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	if (rename === true && addgroup === true) {
		rename = false;
		$(this).parent().parent().hide();
		var parents = $(this).parent().parent().parent();
		parents.find('div.li-rename').show();
		// if (parents.data('sel') == 'sel') {
		// 	parents.removeClass('active');
		// }
	}


});

//删除组
$('.collapse-left-edit').on('click', 'a.a-delete', function(e) {
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var ids = $(this).data('id');
	layer.open({
		title: ['删除能耗组', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '200px'], //宽高
		content: $("#edit_delete_tree_li"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function(layero, index) {

		},
		yes: function(index) {
			$.ajax({
				url: apiurl + 'energyconfig/' + ids,
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

						$('#edit_right_div_tab tbody tr td').each(function(index, ele) {
							$(ele).html('');
						});
						sessionStorage.removeItem("TagGroup");
						energyConsumptionDisplayLoadData('edit');
						layer.msg("删除成功");
						layer.close(index);
					} else {
						layer.msg(data.error_message);
					}
				},
				error: function(data) {
					publicAjaxError(data);
				}
			})
		},
		btn2: function(index) {
			layer.close(index);

		},
	});

});

//取消重命名 
$('.collapse-left-edit').on('click', 'a.a-rename-cancle', function(e) {
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	rename = true;
	$(this).parent().parent().hide();
	var parents = $(this).parent().parent().parent()
	parents.find('div.li-display').show();
	if (parents.data('sel') == 'sel') {
		parents.addClass('active');
	}
});

//确认重命名 
$('.collapse-left-edit').on('click', 'a.a-rename-sure', function(e) {
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var $this = $(this);
	var inputs = $(this).parent().parent().find('input');
	if (inputs.val() != '') {
		if (RegeMatch(inputs)) {
			$.ajax({
				url: apiurl + 'energyconfig/0',
				type: 'PUT',
				dataType: 'json',
				data: {
					id: $(this).data('id'),
					name: inputs.val()
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
						// energyConsumptionDisplayLoadData('edit');
						var parents = $this.parent().parent();
						parents.hide();
						parents.parent().find('div.li-display').show();
						parents.parent().find('div.li-display label:first-child').text(inputs.val())
						layer.msg('更改成功');
						rename = true;
					} else {
						layer.msg(data.error_message);
					}
				},
				error: function(data) {
					publicAjaxError(data);
				}
			});
		} else {
			layer.msg('指定的组名称格式错误');
		}
	} else {
		layer.msg('名称不能为空');
	}
});


//添加组
$('#a-add-groups').on('click', function() {
	if (addgroup == true && rename == true) {
		sessionStorage.removeItem("TagGroup");
		$('.collapse-left-edit ul li').removeClass('active');
		$('.collapse-left-div').mCustomScrollbar('scrollTo', 'top');
		addgroup = false;
		var lis = '<li id="add_group_li">' + '<div><label class="col-sm-7 control-label">' + '<input type="text"  maxlength="20"  class="form-control add_groupname_input" style="margin-top: 5px;"></label>' + '<label class="col-sm-4 control-label">' + '<a href="#" class="a-add-sure">确定</a><a href="#" class="a-add-cancel">取消</a></label></div></li>';
		$('.collapse-left-edit ul').prepend(lis);


		$('#edit_right_div_tab tbody tr td').each(function(index, ele) {
			$(ele).html('');
		});
	}

});

//确认添加组
$('.collapse-left-edit').on('click', 'a.a-add-sure', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var name = $(this).parent().parent().find('input');

	if (name.val() != "") {

		if (RegeMatch(name)) {
			layer.open({
				title: ['搜索数据标签', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
				type: 1,
				skin: 'layui-primary', //加上边框
				area: ['1080px', '625px'], //宽高
				content: $("#search-datalabel"), //捕获的元素,
				shift: 2,
				move: false,
				btn: ['确定', '放弃'],
				success: function(layero, index) {
					$('.search_no_datalabel').show();
					$('#search_datalabel_tab').hide();
					$(".tcdPageCode").hide();
					$('#content-search-input').val('');
					$('#search_datalabel_tab tbody tr td').html('');
					$('#search_datalabel_tabright tbody').html('');
				},
				yes: function(index) {
					layerCheckedDatalabelGroup = [];
			$('#search_datalabel_tabright tbody').find('tr').each(function(index, element) {
				var datalabel = {
					tag_id: $(element).data('id'),
					name: $(element).find('td.td_tagname').text(),
					oprate: $(element).find('td.td_operat select').val()
				}
				layerCheckedDatalabelGroup.push(datalabel);
			});
			console.log(JSON.stringify(layerCheckedDatalabelGroup, null, 2))
			$('#edit_right_div_tab tbody').html('');
			if (layerCheckedDatalabelGroup.length < 12) {
				var da = {
					name: "",
					oprate: "x",
					node_name: "",
					point_id: ""

				}
				var num = 12 - layerCheckedDatalabelGroup.length;
				for (var i = 0; i < num; i++) {
					layerCheckedDatalabelGroup.push(da);
				}
			}
			for (var key in layerCheckedDatalabelGroup) {
				if (layerCheckedDatalabelGroup[key].oprate == 'x') {
					var trs = '<tr><td class="tag_name"></td><td></td><td></td></tr>';
					$('#edit_right_div_tab tbody').append(trs);
				} else {
					var trs = '<tr id="' + layerCheckedDatalabelGroup[key].tag_id + '">' +
						'<td class="tag_name">' + layerCheckedDatalabelGroup[key].name + '</td>' +
						'<td>' + '<select style="width:70px;" class="form-control oprate' + key + '"><option value="1">加</option><option value="0">减</option></select>' + '</td>' +
						'<td><a  href="#" data-id="' + layerCheckedDatalabelGroup[key].tag_id + '">删除</a></td>' +
						'</tr>'
					$('#edit_right_div_tab tbody').append(trs);
					$('.oprate' + key).val(layerCheckedDatalabelGroup[key].oprate);
				}

			}

			layer.close(index);
				},
				btn2: function(index) {
					layer.close(index);

				},
			});
		} else {
			layer.msg('指定的组名称格式错误')
		}
	} else {
		layer.msg('名称不能为空')
	}
});
//取消添加组
$('.collapse-left-edit').on('click', 'a.a-add-cancel', function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	$(this).parent().parent().parent('#add_group_li').remove();
	addgroup = true;
});


/**
 * [ 请求 右侧 数据列表  ]
 * @param  {[number]} ids [组ID]
 * @return {[type]}     [该组全部数据]
 */
function energyConsumptionEditRequestTableList(ids, hide_tags) {
	$.ajax({
		url: apiurl + 'energytag/' + ids,
		type: 'GET',
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				if (Number(hide_tags) === 1) {
					$('#hide_tag').iCheck('check');
				} else {
					$('#hide_tag').iCheck('uncheck');
				}

				var edit_right_tbody = $('#edit_right_div_tab tbody')
				edit_right_tbody.html('');
				var arr = [];
				if (data.data.items !== null) {
					arr = data.data.items;
				}
				// for (var key in arr) {
				// 	if (Number(arr[key].oprate) == 1) {
				// 		arr[key].oprate = "加";
				// 	} else {
				// 		arr[key].oprate = "减";
				// 	}
				// }

				leftTreeLiDatalabelGroup = arr; //保存获取到的全部数据标签


				if (arr.length < 12) {
					var da = {
						name: "",
						oprate: "x",
						node_name: "",
						point_id: ""

					}
					var num = 12 - arr.length;
					for (var i = 0; i < num; i++) {
						arr.push(da);
					}
				}
				// var trs = '';
				for (var key in arr) {
					if (arr[key].oprate == 'x') {
						var trs = '<tr><td class="tag_name"></td><td></td><td></td></tr>';
						edit_right_tbody.append(trs);
					} else {
						var trs = '<tr id="' + arr[key].tag_id + '">' +
							'<td class="tag_name">' + arr[key].name + '</td>' +
							'<td>' + '<select style="width: 70px;" class="form-control oprate' + key + '"><option value="1">加</option><option value = "0">减</option></select>' + '</td>' +
							'<td><a href="#" data-id="' + arr[key].tag_id + '">删除</a></td>' +
							'</tr>';
						edit_right_tbody.append(trs);
						$('.oprate' + key).val(arr[key].oprate);
					}
				}


			} else {
				layer.msg(data.error_message);

			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	})
}



//添加数据标签
$('#edit-btn-adddatalabel').on('click', function() {
	// switchInterface();
	layer.open({
		title: ['搜索数据标签', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['1080px', '645px'], //宽高
		content: $("#search-datalabel"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function(layero, index) {
			$('.search_no_datalabel').show();
			$('#search_datalabel_tab').hide();
			$(".tcdPageCode").hide();
			$('#search_datalabel_tab tbody tr td').html('');
			$('#search_datalabel_tabright tbody').html('');
			var tagsgroup = [];


			$('#edit_right_div_tab tbody').find('tr').each(function(index, element) {


				if ($(element).find('td.tag_name').text() != '') {
					// console.log("这是第" + index + "行")


					var tags = {
						tag_id: $(element).attr('id'),
						oprate: $(element).find('select').val(),
						name: $(element).find('td.tag_name').text()
					};
					tagsgroup.push(tags);

				}
			});

			for (var key in tagsgroup) {
				var trs = '<tr data-id="' + tagsgroup[key].tag_id + '"><td class="td_tagname">' + tagsgroup[key].name + '</td><td class="td_operat"><select style="width:70px;" class="form-control layer_select' + key + '"><option value="1">加</option><option value="0">减</option></select></td><td><a class="layer_a_delete" data-id="' + tagsgroup[key].tag_id + '" href="#">删除</a></td></tr>'
				$('#search_datalabel_tabright tbody').append(trs);

				$('#search_datalabel_tabright tbody').find('.layer_select' + key).val(tagsgroup[key].oprate)
			}

		},
		yes: function(index) {
			layerCheckedDatalabelGroup = [];
			$('#search_datalabel_tabright tbody').find('tr').each(function(index, element) {
				var datalabel = {
					tag_id: $(element).data('id'),
					name: $(element).find('td.td_tagname').text(),
					oprate: $(element).find('td.td_operat select').val()
				}
				layerCheckedDatalabelGroup.push(datalabel);
			});
			console.log(JSON.stringify(layerCheckedDatalabelGroup, null, 2))
			$('#edit_right_div_tab tbody').html('');
			if (layerCheckedDatalabelGroup.length < 12) {
				var da = {
					name: "",
					oprate: "x",
					node_name: "",
					point_id: ""

				}
				var num = 12 - layerCheckedDatalabelGroup.length;
				for (var i = 0; i < num; i++) {
					layerCheckedDatalabelGroup.push(da);
				}
			}
			for (var key in layerCheckedDatalabelGroup) {
				if (layerCheckedDatalabelGroup[key].oprate == 'x') {
					var trs = '<tr><td class="tag_name"></td><td></td><td></td></tr>';
					$('#edit_right_div_tab tbody').append(trs);
				} else {
					var trs = '<tr id="' + layerCheckedDatalabelGroup[key].tag_id + '">' +
						'<td class="tag_name">' + layerCheckedDatalabelGroup[key].name + '</td>' +
						'<td>' + '<select style="width:70px;" class="form-control oprate' + key + '"><option value="1">加</option><option value="0">减</option></select>' + '</td>' +
						'<td><a  href="#" data-id="' + layerCheckedDatalabelGroup[key].tag_id + '">删除</a></td>' +
						'</tr>'
					$('#edit_right_div_tab tbody').append(trs);
					$('.oprate' + key).val(layerCheckedDatalabelGroup[key].oprate);
				}

			}

			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);

		},
	});
})

//删除 数据标签
$('#edit_right_div_tab tbody').on('click', 'a', function() {
	$(this).parent().parent().remove();
});
/**
 * [搜索能耗数据标签方法]
 * @param {[type]} page [分页页数]
 */
function Contentsearch(page){
	var updatas = ['name='+$("#content-search-input").val(),'page='+page,'page_item_count=8'];
	$.ajax({
			url: apiurl + 'energytag?'+updatas.join('&'),
			type: 'GET',
			success: function(data) {
				console.log(JSON.stringify(data,null,2))
				if (data.success) {
					console.log(JSON.stringify(data, null, 2));
					if (data.data.items.length === 0 || data.data.items === null) {
						$('.search_no_datalabel').show();
						$('#search_datalabel_tab').hide();
						$(".tcdPageCode").hide();
					}
					 else {
						$('.search_no_datalabel').hide();
						$('#search_datalabel_tab').show();
						$(".tcdPageCode").show();
						$(".tcdPageCode").createPage({
							pageCount: data.data.pageCount,
							current: page,
							backFn: function(p) {
								Contentsearch(p);
							}
						});

						var arr = data.data.items;
						var datalabel_dic = {}; //保存请求来的数据
						for (var key in arr) {
							datalabel_dic[String(arr[key].tag_id)] = arr[key].tag_id;
							arr[key].tag_type = '能耗数据';
						}

					
						$('#search_datalabel_tab tbody tr td').text('');
						$('#search_datalabel_tab tbody tr').each(function(i, element) {
							console.log(i)
							if (i < arr.length) {
								var tds = '<td>' + arr[i].name + '</td>' +
									'<td>' + arr[i].tag_type + '</td>' +
									'<td>' + arr[i].point_id + '</td>' +
									'<td><input data-id="' + arr[i].tag_id + '" data-name="' + arr[i].name + '" type="checkbox" class="search_cksschec  search_ckss' + arr[i].tag_id + '"></td>';
								$(element).html(tds);
							}
						});
						

						icheckInitialize1();

						//选择数据标签并添加到左侧列表
						$('.search_cksschec').on('ifChanged', function(event) {
							if ($(this).is(':checked')) {
								var thiss = $(this);
								var live = true; //true 代表左侧列表无该条数据 false 有该条数据
								$('#search_datalabel_tabright tbody').find('tr').each(function(index, element) {
									if ($(element).data('id') == thiss.data('id')) {
										live = false;
										return false;
									}
								});
								if (live) {
									var trs = '<tr data-id="' + $(this).data("id") + '">' +
										'<td class="td_tagname">' + $(this).data("name") + '</td>' +
										'<td class="td_operat">' + '<select style="width:70px;" class="form-control"><option value="1">加</option><option value="0">减</option></select>' + '</td>' +
										'<td><a class="layer_a_delete" href="#"  data-id="' + $(this).data("id") + '">删除</a></td>' +
										'</tr>';
									$('#search_datalabel_tabright tbody').append(trs);
								}

							} else {
								var thiss = $(this);
								$('#search_datalabel_tabright tbody').find('tr').each(function(index, element) {
									if ($(element).data('id') == thiss.data('id')) {
										$(element).remove();
										return false;
									}
								});

							}

						});


						var tag_id_group = [];
						$('#search_datalabel_tabright tbody').find('tr').each(function(index, element) {
							var datalabel = {
								tag_id: String($(element).data('id')),
							}
							tag_id_group.push(datalabel);
						});


						// 如果已经选择了标注出来
						for (var key in tag_id_group) {
							if (datalabel_dic[tag_id_group[key].tag_id]) {
								$('.search_ckss' + tag_id_group[key].tag_id).iCheck('check');
							}
						}

					}
				} else {
					layer.msg(data.error_message);
				}
			},
			error: function(data) {
				publicAjaxError(data);
			}
		});
}

var test = true;
//搜索数据标签
$('#content-search-input').on('input', function() {
	if ($('#content-search-input').val() === '') {

	} else {
		Contentsearch(1)
	}

});

//弹窗--删除选中的标签
$('#search_datalabel_right').on('click', '#search_datalabel_tabright a.layer_a_delete', function() {
	var ids = $(this).data('id');
	$("#search_datalabel_tab tbody").find('input.search_cksschec').each(function(index, element) {
		if ($(element).data('id') == ids) {
			$(element).iCheck('uncheck');
			return false;
		}
	});
	$(this).parent().parent().remove();
});


//保存操作的数据
$('#edit-btn-savedatalabel').on('click', function() {

	var thisUrls_updata = apiurl + 'energyconfig/1';
	var thisUrls_creat = apiurl + 'energyconfig';
	var urls;
	var tagsgroup = [];
	var datas;
	var sure = false; //请求
	$('#edit_right_div_tab tbody').find('tr').each(function(index, element) {
		if ($(element).find('td.tag_name').text() != '') {
			// var select_val;
			// if ($(element).find('select').val() == '加') {
			// 	select_val = 1;
			// } else {
			// 	select_val = 0;
			// }

			var tags = {
				tag_id: Number($(element).attr('id')),
				oprate: $(element).find('select').val()
			};
			tagsgroup.push(tags);
		}
	});

	var hide_tags;
	if ($('#hide_tag').is(':checked')) {
		hide_tags = 1; //显示tag
	} else {
		hide_tags = 0; //隐藏tag
	}

	if (addgroup) {
		datas = {
			id: $('#edit-btn-savedatalabel').data('id'),
			hide_tag: hide_tags,
			tag_list: tagsgroup
		}

		urls = thisUrls_updata;

		saveOrCreatgroup(urls, 'PUT', datas)


	} else {
		if ($('.add_groupname_input').val() != '') {
			datas = {
				name: $('.add_groupname_input').val(),
				hide_tag: hide_tags,
				tag_list: tagsgroup
			};

			urls = thisUrls_creat;

			saveOrCreatgroup(urls, 'post', datas)
		} else {
			layer.msg('新建组名不能为空');
		}
	}
});

function saveOrCreatgroup(urls, type, Data) {

	console.log(JSON.stringify(Data, null, 2));

	$.ajax({
		url: urls,
		type: type,
		dataType: 'json',
		data: Data,
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			if (data.success) {
				if (addgroup) {
					layer.msg('数据更新成功');

				} else {
					layer.msg('创建成功')
					addgroup = true;
				}
				energyConsumptionDisplayLoadData('edit');


			} else {
				layer.msg(data.error_message);

			}
		},
		error: function(data) {
			publicAjaxError(data);
		}
	});

}


$('#clearImage').on('click', function() {
	$('#content-search-input').val('');
	$('#search_datalabel_tab tbody tr td').html('');
	$(".tcdPageCode").hide();

})



/**
 * [判断字符串是否合法]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatch(thiss) {
	var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
	if (thiss.val() != "" && thiss != null) {
		if (pattern.test(thiss.val())) {
			return false;
		} else {
			return true;
		}
	}
}
/*
 * [选择框初始化]
 * @return {[type]} [description]
 */
function icheckInitialize() {
	$(".ckss").iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	});
}

function icheckInitialize1() {
	$('.search_cksschec').iCheck('destroy');
	$(".search_cksschec").iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	});
}

/**
 * [切换页面]
 * @return {[type]} [description]
 */
function switchInterface() {
	$('input.ckss').iCheck('destroy');
	icheckInitialize();
}


function projectEnergyconsumption() {
	$.ajax({
		url: apiurl + 'project',
		type: 'get',
		success: function(data) {
			if (data.success) {
				$('#logo').attr('src', data.data.logo_path);
				// 工程名称
				$('.left-div-head span').text(data.data.name);

			} else {
				layer.msg(data.error_message);

			}
		},
		error: function(data) {
			layer.msg(data.error_message);
			returnLogIn(data);
		}
	});
}