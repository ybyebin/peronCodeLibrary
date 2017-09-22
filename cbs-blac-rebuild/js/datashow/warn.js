$('#foot').load('public.html');

var Initialization = true;
$(function() {
	publicHeadfun();
	days();
	//时间选择改变
	$("#slectFen ul li a").click(function() {
		var loaddata = true;
		$('span.txt').text($(this).text())
		var value = $(this).attr("rel");
		if (value == 1 || value == 2) {
			$("#startTime").val($(this).attr('value'));
			$("#endTime").val($(this).attr('value'));
		} else if (value == 3 || value == 4 || value == 5) {
			$("#startTime").val($(this).attr('value'));
			$("#endTime").val(compareDate(1, 0));
		} else if (value == 6 || value == 7 || value == 8) {
			$("#startTime").val($(this).attr('value'));
			if (value == 6) {
				counts = 1;
			} else if (value == 7) {
				counts = 2;
			} else if (value == 8) {
				counts = 3;
			}
			// var aa = compareDate(2, counts);
			$("#endTime").val(getCurrentMonthLastForSelect($(this).attr('value')));
		} else if (value == 9) {
			loaddata = false;
			$("#startTime").val("");
			$("#endTime").val("");
		}

		if (loaddata) {
			warnLogLoadData(1);
		}
	});
	warnLoadData(1);
});

$('#startTime').datepicker({
	format: "yyyy-mm-dd",
	autoclose: true,
	todayBtn: false,
	pickerPosition: "bottom-right",
	minView: 2
}).on('changeDate', function(ev) {
	$("#slectFen button .txt").html("自定义").attr('rel', 9);
	$('#endTime')[0].focus();
});
$('#endTime').datepicker({
	format: "yyyy-mm-dd",
	autoclose: true,
	todayBtn: false,
	pickerPosition: "bottom-right",
	minView: 2
}).on('changeDate', function(ev) {
	$("#slectFen button .txt").html("自定义").attr('rel', 9);
	timebeginisTrue = true;
	var isYes = checkEndTime("startTime", "endTime", 1);
	if (!isYes) {
		$("#endTime").val("");
		layer.msg("结束时间需晚于开始时间");
		timebeginisTrue = false;
	}
	if (compareYear(new Date($('#startTime').val()), 10) <= ev.date.toLocaleDateString()) {
		layer.msg("超过统计时间限制");
		$("#endTime").val("");
		timebeginisTrue = false;
	}
	if (timebeginisTrue) {
		// 请求数据
		warnLogLoadData(1);
	}

});



/**
 * [warnLoadData description]
 * @param  {[type]} page [description]
 * @return {[type]}      [description]
 */



function warnLoadData(page) {
	var dataUp = ['page=' + page, 'page_item_count=14'].join("&");
	console.log(dataUp);
	$.ajax({
		url: apiurl + 'alarmvalue/0?' + dataUp,
		type: 'GET',
		beforeSend: function() {
			$(".loading").show();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {

				console.log("报警数据:" + JSON.stringify(data, null, 2));
				warnAddtable(data.data.items);
				if (data.data.pageCount === 0) {
					layer.msg('无数据');
					$('.tcdPageCode-warn').html('');
					if (Initialization) {

						// $("#slectFen ul li:nth-child(4) a").click();		
						// $('#ri_a').data('click','0');
						// $('#ri_a').click();
					}
				} else {

					$('.tcdPageCode-warn').createPage({
						pageCount: data.data.pageCount,
						current: page,
						backFn: function(p) {
							console.log("这是第" + p + "页");
							warnLoadData(p);
						}
					});
				}
				Initialization = false;
			} else {
				layer.msg(data.error_message);
				console.log("错误原因" + JSON.stringify(data, null, 2));
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			returnLogIn(data);
		}
	});

};

//报警列表-添加数据
function warnAddtable(data) {
	if (data == null) {
		data = [];
	}
	for (var key in data) {
		switch (data[key].alarm_level) {
			case 0:
				data[key].alarm_level = "无";
				break;
			case 1:
				data[key].alarm_level = "低";
				break;
			case 2:
				data[key].alarm_level = "中";
				break;
			case 3:
				data[key].alarm_level = "高";
				break;
		}

		if (data[key].description === null) {
			data[key].description = '无';
		}

		switch (data[key].alarm_value) {
			case 'True':
				data[key].actual_value = "True";
				break;
			case 'False':
				data[key].actual_value = "False";
				break;

		}


	}
	console.log('查看数据:' + JSON.stringify(data, null, 2))
	$('#tbodys tr td').html('');
	$('#tbodys tr').each(function(i, element) {
		if (i < data.length) {
			var tds = '<td>' + data[i].alarm_level +
				'</td><td>' + data[i].alarm_time +
				'</td><td title="' + data[i].description + '">' + data[i].description +
				'</td><td >' + data[i].tag_name +
				'</td><td >' + data[i].alarm_value +
				'</td><td >' + data[i].actual_value +
				'</td><td>' + '<button data-id = "' + data[i].id + '" data-status="' + data[i].alarm_status + '" class="btn-sure">确认</button></td>';
			$(element).html(tds);
			console.log('index:' + i);
		}
	});

}
// 确认报警
$('#tbodys').on('click', 'button', function() {
	var $this = $(this);
	var btn_status = '';
	var change = true;
	switch (Number($(this).data('status'))) {
		case 1:
			btn_status = 3;
			break;
		case 2:
			btn_status = 4;
			break;
		default:
			layer.msg('报警状态错误');
			change = false;
			break;
	}
	if (change) {
		$.ajax({
			url: apiurl + 'alarmvalue?' + ['id=' + $(this).data('id'), 'status=' + btn_status].join("&"),
			type: 'PUT',
			beforeSend: function() {
				$(".loading").show();
			},
			complete: function() {
				$(".loading").hide();
			},
			success: function(data) {
				$(".loading").hide();
				if (data.success) {
					console.log("数据:" + JSON.stringify(data, null, 2));

					switch (data.data) {
						case false:
							// $(obj).parent().html()
							break;
						case true:
							$this.parent().html("已确认");
							break;
					}
				} else {
					layer.msg(data.error_message);
					console.log("失败原因:" + JSON.stringify(data))
				}
			},
			error: function(data) {
				$(".loading").hide();
				layer.msg(data.error_message);
				returnLogIn(data);
			}
		});
	}


});



/**
 * [报警日志 获取数据]
 * @return {[type]} [description]
 */
function warnLogLoadData(page) {

	$.ajax({
		url: apiurl + 'alarmlog?' + ['page=' + page, 'page_item_count=12', 'from_time=' + $('#startTime').val(), 'end_time=' + $('#endTime').val() + ' 23:59:59'].join("&"),
		type: 'GET',
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
				console.log("报警日志数据====:" + JSON.stringify(data, null, 2))
				var pagecount = data.data.pageCount;
				warnLogAddtable(data.data.items);

				if (pagecount === 0) {
					layer.msg('无数据');
					$('.tcdPageCode-log').html('');
				} else {
					$('.tcdPageCode-log').createPage({
						pageCount: pagecount,
						current: page,
						backFn: function(p) {
							console.log(p);
							warnLogLoadData(p);
						}
					});
				}


			} else {
				layer.msg(data.error_message);
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			returnLogIn(data);
		}
	});
}

//报警日志列表-添加数据
function warnLogAddtable(data) {
	if (data == null) {
		data = [];
	}
	for (var key in data) {
		switch (data[key].alarm_level) {
			case 0:
				data[key].alarm_level = "无";
				break;
			case 1:
				data[key].alarm_level = "低";
				break;
			case 2:
				data[key].alarm_level = "中";
				break;
			case 3:
				data[key].alarm_level = "高";
				break;
		}

		switch (data[key].alarm_status) {
			case 1:
				data[key].alarm_status = "未确认且未恢复";
				break;
			case 2:
				data[key].alarm_status = "未确认但已恢复";
				break;
			case 3:
				data[key].alarm_status = "已确认但未恢复";
				break;
			case 4:
				data[key].alarm_status = "已确认且已恢复";
				break;
		}

		switch (data[key].actual_value) {
			case 'True':
				data[key].alarm_value = "True";
				break;
			case 'False':
				data[key].alarm_value = "False";
				break;

		}

		if (data[key].confirm_time === null) {
			data[key].confirm_time = '无';
		}
		if (data[key].description === null) {
			data[key].description = '无';
		}
	}
	console.log('查看数据:' + JSON.stringify(data, null, 2))
	$('#logtbody tr td').html('');
	$('#logtbody tr').each(function(i, element) {
		if (i < data.length) {
			var tds = '<td>' + data[i].alarm_level +
				'</td><td>' + data[i].alarm_time +
				'</td><td title="' + data[i].description + '">' + data[i].description +
				'</td><td >' + data[i].tag_name +
				'</td><td >' + data[i].alarm_value +
				'</td><td >' + data[i].actual_value +
				'</td><td>' + data[i].alarm_status +
				'</td><td>' + data[i].confirm_time + '</td>';
			$(element).html(tds);
		}
	});

}



/**
 * [导出报警日志]
 * @return {[type]} [description]
 */
function exportWarnLog() {
	var start = $('#startTime').val();
	var end = $("#endTime").val();
	if (start !== '' && end !== '') {
		if (start > end) {
			layer.msg('开始时间大于结束时间');
		} else if (compareYear(new Date(start), 10) <= end) {
			layer.msg("超过统计时间限制");
		} else {
			$.ajax({
				url: apiurl + 'alarmlog?' + ['from_time=' + $('#startTime').val(), 'end_time=' + $('#endTime').val() + ' 23:59:59', 'report_name="报警日志"'].join("&"),
				type: 'PUT',
				success: function(data) {
					if (data.success) {
						window.location.href = '../' + data.data;
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
	} else {
		layer.msg('时间区间不能为空');
	}
}

$('#ri_a').on('click', function() {
	if (Number($(this).data('click')) === 1) {
		$("#slectFen ul li:nth-child(4) a").click();
		$(this).data('click', '0');
	}
});