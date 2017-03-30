
// =============================能耗展示=================================
/**
 * [能耗统计  获得数据--左侧菜单栏]
 * @return {[type]} [description]
 */
function energyConsumptionDisplayLoadData(string){	
	$.ajax({
		url:apiurl + "r=api/entity/tree/list",
		type:'post',
		dataType:'json',
		beforeSend:function(){
			$(".loading").show();
		},
		complete:function(){
			$(".loading").hide();
		},
		success:function(data){
			$(".loading").hide();
			console.log('查看:'+JSON.stringify(data.data,null,2))			
			if (data.success) {
				if (string === 'display') {
					energyDisplayleftAddli(data.data);
				} else {
					energyEditleftAddli(data.data);
				}

			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}
		},
		error:function(data){
			$(".loading").hide();
			layer.msg(data.error_message)
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
			var lis = '<li data-id="' + data[i].id + '">' + data[i].name + '</li>';
			html += lis;
		}		
		html +='</ul>';
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
	energyConsumptionDisplayRequestTableList($(this).data('id'));
	setTimeout(function(){
		$(".div-have-tables").mCustomScrollbar('scrollTo','top');
	},300);
	
});
/**
 * [ 能源-展示-组详细数据  ]
 * @param  {[number]} ids [组ID]
 * @return {[type]}     [该组全部数据]
 */
function energyConsumptionDisplayRequestTableList(ids) {
	$.ajax({
		url: apiurl + "r=api/entity/tree/get",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				id: ids
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
				$('.right-head-p').text(data.data.name);
				$('#display-table tbody').html('');


				var arr = data.data.tags;

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
				for (var key in arr) {
					var trs = '<tr><td>' + arr[key].name + '</td><td>' + arr[key].oprate + '</td><td>' + arr[key].node_name + '</td><td>' + arr[key].point_id + '</td></tr>'
					$('#display-table tbody').append(trs);
				}


			} else {
				layer.msg(data.error_message)
				returnLogIn(data.error_message);
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg("请求失败:" + data.error_message)
		}
	})
}
/**
 * [编辑]
 * @param  {String}
 */
$('#statistical-btn-edit').on('click',function(){
	window.location.href = '../../h5/energyconsumptionStatisticEdit.html';
});


// =============================能耗编辑=================================
var rename = true; //只允许一个重命名状态
var addgroup=  true;// 只允许存在一个添加状态
var leftTreeLiDatalabelGroup; //每个组的数据
var layerCheckedDatalabelGroup;//弹窗选择的数据标签数据


$('#statistical-btn-cancle').on('click',function(){
	window.location.href = '../../h5/energyconsumptionStatisticDis.html';
})

/**
 * [能源-编辑-添加左侧树]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function energyEditleftAddli(data) {
	$('.collapse-left-edit').html('');
	var html = '<ul>';
	if (data.length !== 0) {
		for (var key in data) {
			var lis = '<li data-id="' + data[key].id + '" data-sel="sel_no">'
					+'<div class="li-display"><label class="col-sm-7 control-label">'+data[key].name+'</label>'								
					+'<label class="col-sm-4 control-label">'
					+'<a href="#" class="a-rename">重命名</a><a href="#" class="a-delete" data-id="'+data[key].id+'">删除</a>'
					+'</label></div>'
					+'<div class="li-rename" style="display:none"><label class="col-sm-7 control-label">'
					+'<input type="text" class="form-control" style="margin-top: 5px;"></label>'									
					+'<label class="col-sm-4 control-label">'
					+'<a href="#" class="a-rename-sure" data-id="'+data[key].id+'">确定</a><a href="#" class="a-rename-cancle">取消</a>'
					+'</label></div></li>';																							
				html += lis;
		}

		html += '</ul>'
		$('.collapse-left-edit').html(html);
		$('.collapse-left-edit ul').find('li')[0].click();
		
	}
}
//点击列表获取详细数据
$('.collapse-left-edit').on('click','ul li',function(){

	if (rename == true && addgroup == true) {
		$('.collapse-left-edit ul li').removeClass('active');
		$(this).addClass('active');
		$('.collapse-left-edit ul li').data('sel', 'sel_no');		
		$(this).data('sel', 'sel');
		energyConsumptionEditRequestTableList($(this).data('id'));
		$('#edit-btn-savedatalabel').data('id',$(this).data('id'));
		console.log($('#edit-btn-savedatalabel').data('id'))
	}
});

//重命名
$('.collapse-left-edit').on('click','a.a-rename',function(e){
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	if (rename === true && addgroup === true) {
		rename = false;
		$(this).parent().parent().hide();
		$(this).parent().parent().parent().find('div.li-rename').show();
		if ($(this).parent().parent().parent().data('sel') == 'sel') {
			$(this).parent().parent().parent().removeClass('active');
		}
	}
	
	
});

//删除组
$('.collapse-left-edit').on('click','a.a-delete',function(e){
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	var ids = $(this).data('id');
	layer.open({
		title: ['删除能耗组', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '200px'], //宽高
		content: $("#edit_delete_tree_li"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定','放弃'],
		success: function(layero, index){
    		
  		},
		yes: function(index) {			
			$.ajax({
				url: apiurl + "r=api/entity/tree/delete",
				type: 'post',
				dataType: 'json',
				data: {data: JSON.stringify({id: ids})},
				beforeSend: function() {
					$(".loading").show();
				},
				complete: function() {
					$(".loading").hide();
				},
				success: function(data) {
					$(".loading").hide();
					if (data.success) {

						energyConsumptionDisplayLoadData('edit');
						layer.msg("删除成功");
						layer.close(index);
					} else {
						layer.msg(data.error_message);
						returnLogIn(data.error_message);
					}
				},
				error: function(data) {
					$(".loading").hide();
					layer.msg(data.error_message);
				}
			})
		},
		btn2: function(index) {
			layer.close(index);

		},
	});

});

//取消重命名 
$('.collapse-left-edit').on('click','a.a-rename-cancle',function(e){
	// 阻止冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	rename = true;
	$(this).parent().parent().hide();
	$(this).parent().parent().parent().find('div.li-display').show();	
	if ($(this).parent().parent().parent().data('sel') == 'sel') {
		$(this).parent().parent().parent().addClass('active');
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
				url: apiurl + "r=api/entity/tree/rename",
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify({
						id: $(this).data('id'),
						name: inputs.val()
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
						// energyConsumptionDisplayLoadData('edit');
						 
						$this.parent().parent().hide();
						$this.parent().parent().parent().find('div.li-display').show();
						$this.parent().parent().parent().find('div.li-display label:first-child').text(inputs.val())
						layer.msg('更改成功');
						rename = true;
					} else {
						layer.msg(data.error_message);
						returnLogIn(data.error_message);
					}
				},
				error: function(data) {
					layer.msg(data.error_message);
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
$('#a-add-groups').on('click',function(){
	if (addgroup ==true && rename == true) {
		$('.collapse-left-div').mCustomScrollbar('scrollTo','top');
		addgroup = false;		
		var lis = '<li id="add_group_li">'
				+'<div><label class="col-sm-7 control-label">'
				+'<input type="text" class="form-control add_groupname_input" style="margin-top: 5px;"></label>'
				+'<label class="col-sm-4 control-label">'
				+'<a href="#" class="a-add-sure">确定</a><a href="#" class="a-add-cancel">取消</a></label></div></li>';																																			
		$('.collapse-left-edit ul').prepend(lis);
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
				title: ['搜索数据标签', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
				type: 1,
				skin: 'layui-primary', //加上边框
				area: ['1080px', '625px'], //宽高
				content: $("#search-datalabel"), //捕获的元素,
				shift: 2,
				move: false,
				btn: ['确定', '放弃'],
				success: function(layero, index) {
					$('#content-search-input').val('');
					$('#search_datalabel_tab tbody').html('');
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

					$('#edit_right_div_tab tbody').html('');
					if (layerCheckedDatalabelGroup.length < 13) {
						var da = {
							name: "",
							oprate: "x",
							node_name: "",
							point_id: ""

						}
						var num = 13 - layerCheckedDatalabelGroup.length;
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
								'<td>' + '<select style="width:70px;" class="form-control oprate' + key + '"><option>加</option><option>减</option></select>' + '</td>' +
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
$('.collapse-left-edit').on('click','a.a-add-cancel',function(e){
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
function energyConsumptionEditRequestTableList(ids){
	$.ajax({
		url:apiurl + "r=api/entity/tree/get",
		type:'post',
		dataType:'json',
		data:{data: JSON.stringify({id:ids})},
		beforeSend:function(){
			$(".loading").show();
		},
		complete:function(){
			$(".loading").hide();
		},
		success:function(data){
			$(".loading").hide();
			if (data.success)
			 {	

			 	if (data.data.hide_tag) {
			 		$('#hide_tag').iCheck('uncheck');
			 	}else{
			 		$('#hide_tag').iCheck('check');
			 	}
				
			 	$('#edit_right_div_tab tbody').html('');
			 	var arr = data.data.tags; 

			 	 	for(var key in arr)
			 	 	{
			 	 		if (Number(arr[key].oprate) == 1) {
			 	 			arr[key].oprate = "加";
			 	 		}else{
			 	 			arr[key].oprate = "减";
			 	 		}			 	 		
			 	 	}

			 	 	leftTreeLiDatalabelGroup = arr; //保存获取到的全部数据标签
			 	 	

			 	 	if (arr.length < 12 ) {
			 	 		var da = {
			 	 			name:"",
			 	 			oprate:"x",
			 	 			node_name:"",
			 	 			point_id:""

			 	 		}
			 	 		var num = 12-arr.length;
			 	 		for(var i = 0;i<num;i++){
			 	 			arr.push(da);
			 	 		}
			 	 	}
			 	 	for(var key in arr){
			 	 		if (arr[key].oprate =='x')
			 	 		 {
			 	 		 	var trs = '<tr><td class="tag_name"></td><td></td><td></td></tr>';
			 	 			$('#edit_right_div_tab tbody').append(trs);
			 	 		 }else{
			 	 		 	var trs = '<tr id="'+arr[key].tag_id+'">'+
			 	 				  '<td class="tag_name">'+arr[key].name+'</td>'+
			 	 				  '<td>'+'<select style="width: 70px;" class="form-control oprate'+key+'"><option>加</option><option>减</option></select>'+'</td>'+
			 	 				  '<td><a href="#" data-id="'+arr[key].tag_id+'">删除</a></td>'+
			 	 				  '</tr>'
			 	 			$('#edit_right_div_tab tbody').append(trs);
			 	 			$('.oprate'+key).val(arr[key].oprate);
			 	 		 }
			 	 		
			 	 	}	
					

			 }
			 else
			 {
			 	layer.msg(data.error_message);
			 	returnLogIn(data.error_message);
			 }
		},
		error:function(data){
			$(".loading").hide();
			layer.msg(data.error_message)
		}
	})
}




//添加数据标签
$('#edit-btn-adddatalabel').on('click',function(){
	// switchInterface();
	layer.open({
		title: ['搜索数据标签', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['1080px', '625px'], //宽高
		content: $("#search-datalabel"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function(layero, index){

			$('#content-search-input').val('');
    		$('#search_datalabel_tab tbody').html('');   		
    		$('#search_datalabel_tabright tbody').html('');
    		var tagsgroup = [];


			$('#edit_right_div_tab tbody').find('tr').each(function(index, element) {


				if ($(element).find('td.tag_name').text() != '') {
					// console.log("这是第" + index + "行")
					

					var tags = {
						tag_id: $(element).attr('id'),
						oprate: $(element).find('select').val(),
						name:$(element).find('td.tag_name').text()
					};
					tagsgroup.push(tags);

				}
			});
							
			for (var key in tagsgroup) {
				var trs = '<tr data-id="' + tagsgroup[key].tag_id + '"><td class="td_tagname">' + tagsgroup[key].name + '</td><td class="td_operat"><select style="width:70px;" class="form-control layer_select' + key + '"><option>加</option><option>减</option></select></td><td><a class="layer_a_delete" data-id="' + tagsgroup[key].tag_id + '" href="#">删除</a></td></tr>'
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

			$('#edit_right_div_tab tbody').html('');
			if (layerCheckedDatalabelGroup.length < 13) {
				var da = {
					name: "",
					oprate: "x",
					node_name: "",
					point_id: ""

				}
				var num = 13 - layerCheckedDatalabelGroup.length;
				for (var i = 0; i < num; i++) {
					layerCheckedDatalabelGroup.push(da);
				}
			}
			for (var key in layerCheckedDatalabelGroup) {
				if (layerCheckedDatalabelGroup[key].oprate == 'x') {
					var trs = '<tr><td class="tag_name"></td><td></td><td></td></tr>';
					$('#edit_right_div_tab tbody').append(trs);
				} else {
					var trs = '<tr id="'+layerCheckedDatalabelGroup[key].tag_id+'">' +
						'<td class="tag_name">' + layerCheckedDatalabelGroup[key].name + '</td>' +
						'<td>' + '<select style="width:70px;" class="form-control oprate' + key + '"><option>加</option><option>减</option></select>' + '</td>' +
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
$('#edit_right_div_tab tbody').on('click','a',function(){
	$(this).parent().parent().remove();
});
//搜索数据标签
$('#content-search-input').on('input', function() {
	$.ajax({
		url: apiurl + "r=api/entity/tag/search",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				is_energy: true,
				name: $("#content-search-input").val()
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

				if (JSON.stringify(data.data) == "[]") {
					$('.search_no_datalabel').show();
					$('#search_datalabel_tab').hide();
				} else {
					$('.search_no_datalabel').hide();
					$('#search_datalabel_tab').show();

					$("#search_datalabel_tab tbody").html("");
					var arr = data.data;
					var datalabel_dic = {}; //保存请求来的数据
					for (var key in arr) {
						datalabel_dic[String(arr[key].id)] = arr[key].id;


						switch (arr[key].tag_type) {
							case 'boolean':
								arr[key].tag_type = '报警数据';
								break;
							case 'integer':
								arr[key].tag_type = '能耗数据';
								break;

						}
					}

					if (arr.length < 7) {
						var dat = {
							id: 'x'
						};
						var num = 7 - arr.length;
						for (var i = 0; i < num; i++) {
							arr.push(dat);
						}
					}
					var trs_list;

					for (var key in arr) {

						if (arr[key].id == 'x') {
							var trs = '<tr>' +
								'<td style="height:45px;"></td>' +
								'<td></td>' +
								'<td></td>' +
								'<td></td>' +

								'</tr>';
							trs_list += trs;
						} else {
							var trs = '<tr>' +
								'<td>' + arr[key].name + '</td>' +
								'<td>' + arr[key].tag_type + '</td>' +
								// '<td>' + arr[key].description + '</td>' +
								// '<td>' + arr[key].node_name + '</td>' +
								'<td>' + arr[key].point_id + '</td>' +
								'<td><input data-id="' + arr[key].id + '" data-name="' + arr[key].name + '" type="checkbox" class="ckss search_ckss' + arr[key].id + '"></td>' +
								'</tr>';
							trs_list += trs;

						}

					}



					$("#search_datalabel_tab  tbody").html(trs_list);

					switchInterface();
					//选择数据标签并添加到左侧列表
					$('.ckss').on('ifChanged', function(event) {
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
									'<td class="td_operat">' + '<select style="width:70px;" class="form-control"><option>加</option><option>减</option></select>' + '</td>' +
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
			}else{
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
		}
	});
});

//弹窗--删除选中的标签
$('#search_datalabel_right').on('click','#search_datalabel_tabright a.layer_a_delete',function(){
 	var ids =  $(this).data('id');
	$("#search_datalabel_tab tbody").find('input.ckss').each(function(index,element){
		if ($(element).data('id') == ids) {
			$(element).iCheck('uncheck'); 
			return false;
		}
	});

	$(this).parent().parent().remove();
});


//保存操作的数据
$('#edit-btn-savedatalabel').on('click',function(){

	var thisUrls_updata = apiurl + "r=api/entity/tree/update";
	var thisUrls_creat = apiurl + "r=api/entity/tree/create"; 
	var urls;
	var tagsgroup = [];
	var datas;
	var sure= false;//请求
	$('#edit_right_div_tab tbody').find('tr').each(function(index,element){
		
		
		if ($(element).find('td.tag_name').text() != '' ) {
			var select_val;
			if ($(element).find('select').val() == '加') {
				select_val = 1;
			}else{
				select_val = 0;
			}
			
			var tags = {
			id:$(element).attr('id'),
			oprate:select_val
			};
			tagsgroup.push(tags);

		}
	});

	var hide_tags;
	if ($('#hide_tag').is(':checked')) {
		hide_tags = false;
	}else{
		hide_tags = true;
	}

	if (addgroup) {
		datas = {
			id:$('#edit-btn-savedatalabel').data('id'),
			hide_tag:hide_tags,
			tags:tagsgroup
		}

		var Data = {
		data:JSON.stringify(datas)
		};
		urls = thisUrls_updata;
		saveOrCreatgroup(urls,Data)


	}else{
		if ($('.add_groupname_input').val() != '') {
			datas = {
			name:$('.add_groupname_input').val(),
			hide_tag:hide_tags,
			tags:tagsgroup
		};
		var Data = {
		data:JSON.stringify(datas)
		};
		urls = thisUrls_creat;
		saveOrCreatgroup(urls,Data)
		}else{
			layer.msg('新建组名不能为空');
		}
	}	
});

function saveOrCreatgroup(urls,Data){
	$.ajax({
		url:urls,
		type:'post',
		dataType:'json',
		data:Data,
		beforeSend:function(){
			$(".loading").show();
		},
		complete:function(){
				$(".loading").hide();
		},
		success:function(data){
			if (data.success)
			 {
		 		if(addgroup){
		 			layer.msg('数据更新成功');

		 		}else{
		 			layer.msg('创建成功')
		 			addgroup = true;
		 		}

		 		energyConsumptionDisplayLoadData('edit');
			 	
			 }else{
			 		layer.msg(data.error_message);
			 		returnLogIn(data.error_message);
			 }
		},
		error:function(data){
			layer.msg(data.error_message);
		}
	});

}







$('#clearImage').on('click', function() {
	$('#content-search-input').val('');
	$('#search_datalabel_tab tbody').html('');
	
})



/**
 * [判断字符串是否合法]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatch(thiss){
       var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);	
       if(thiss.val() != "" && thiss != null){  
        if(pattern.test(thiss.val())){          
            return false;  
        }else{
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
/**
 * [切换页面]
 * @return {[type]} [description]
 */
function switchInterface(){
    $('input').iCheck('destroy');
    icheckInitialize(); 
}


function projectEnergyconsumption() {
	$.ajax({
		url: apiurl + 'r=api/project/info',
		type: 'post',
		dataType: 'json',
		success: function(data) {
			if (data.success) {
				$('#logo').attr('src', data.data.logo_path);
				// 工程名称
				$('.left-div-head span').text(data.data.name);

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