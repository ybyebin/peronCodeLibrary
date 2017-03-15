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
	$("#slectFen ul li:nth-child(4) a").click();
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
	var dataUp = {
		page: page,
		page_item_count: 14,
	}
	console.log(JSON.stringify(dataUp, null, 2));

	$.ajax({
		url: apiurl + "r=api/alarm/list/init",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				page: page,
				page_item_count: 14,
			})
		},
		beforeSend: function() {
			$(".loading").show();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {

				console.log("报警数据:" + JSON.stringify(data, null, 2));
				warnAddtable(data.data.data);
				if (data.data.pageCount === 0) {
					layer.msg('无数据');
					$('.tcdPageCode-warn').html('');
					if (Initialization) {
						$('#ri_a').click();
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
				returnLogIn(data.error_message);
				console.log("错误原因" + JSON.stringify(data, null, 2));
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message)
			console.log("错误原因" + JSON.stringify(data, null, 2));
		}
	});

};

//报警列表-添加数据
function warnAddtable(data) {
	if (data == null) {
		data = [];
	}
	for (var key in data) {
		switch (data[key].level) {
			case 1:
				data[key].level = "低";
				break;
			case 2:
				data[key].level = "中";
				break;
			case 3:
				data[key].level = "高";
				break;
		}
	}
	console.log('查看数据:' + JSON.stringify(data, null, 2))
	$('#tbodys tr td').html('');
	$('#tbodys tr').each(function(i, element) {
		if (i < data.length) {
			var tds = '<td>' + data[i].level +
				'</td><td>' + data[i].alarmTime +
				'</td><td title="' + data[i].message + '">' + data[i].message +
				'</td><td >' + data[i].tagName +
				'</td><td >' + data[i].alarmValue +
				'</td><td >' + data[i].curValue +
				'</td><td>' + '<button data-id = "' + data[i].id + '" class="btn-sure">确认</button></td>';
			$(element).html(tds);
			console.log('index:' + i);
		}
	});

}

$('#tbodys').on('click', 'button', function() {
	var $this = $(this);
	$.ajax({
		url: apiurl + "r=api/alarm/list/confirm",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				id: $(this).data('id'),
			})
		},
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			// $(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				console.log("数据:" + JSON.stringify(data, null, 2));
				switch (data.success) {
					case false:
						// $(obj).parent().html()
						break;
					case true:
						$this.parent().html("已确认");
						break;
				}
			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
				console.log("失败原因:" + JSON.stringify(data))
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message);
			console.log("数据得得得:" + JSON.stringify(data))
		}
	});
});



/**
 * [报警日志 获取数据]
 * @return {[type]} [description]
 */
function warnLogLoadData(page) {

	var dataUp = {
		page: 1,
		page_item_count: 12,
		start_time: $('#startTime').val(),
		end_time: $('#endTime').val()

	}
	console.log("查询报警日志:" + JSON.stringify(dataUp, null, 2));

	$.ajax({
		url: apiurl + "r=api/alarm/list/history",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				page: page,
				page_item_count: 12,
				start_time: $('#startTime').val(),
				end_time: $('#endTime').val()
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
				console.log("报警日志数据====:" + JSON.stringify(data, null, 2))
				var pagecount = data.data.pageCount;
				warnLogAddtable(data.data.data);

				if (data.data.pageCount === 0) {
					layer.msg('无数据');
					$('.tcdPageCode-log').html('');
				} else {
					$('.tcdPageCode-log').createPage({
						pageCount: data.data.pageCount,
						current: page,
						backFn: function(p) {
							console.log(p);
							warnLogLoadData(p);							
						}
					});
				}


			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
				console.log("报警日志错误原因" + JSON.stringify(data, null, 2));

			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message)
			console.log("报警日志错误原因" + JSON.stringify(data, null, 2));
		}
	});
}

//报警日志列表-添加数据
function warnLogAddtable(data) {
	if (data == null) {
		data = [];
	}
	for (var key in data) {
		switch (data[key].level) {
			case 1:
				data[key].level = "低";
				break;
			case 2:
				data[key].level = "中";
				break;
			case 3:
				data[key].level = "高";
				break;
		}

		switch (data[key].action) {
			case 0:
				data[key].action = "已发生";
				break;
			case 1:
				data[key].action = "已确认";
				break;
			case 2:
				data[key].action = "已恢复";
				break;
			

		}
	}
	console.log('查看数据:' + JSON.stringify(data, null, 2))
	$('#logtbody tr td').html('');
	$('#logtbody tr').each(function(i, element) {
		if (i < data.length) {
			var tds = '<td>' + data[i].level +
				'</td><td>' + data[i].alarmTime +
				'</td><td title="' + data[i].message + '">' + data[i].message +
				'</td><td >' + data[i].tagName +
				'</td><td >' + data[i].alarmValue +
				'</td><td >' + data[i].curValue +
				'</td><td>' + data[i].action +
				'</td><td>' + data[i].actionTime
				 + '</td>';
			$(element).html(tds);
			console.log('index:' + i);
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
	console.log('时间区间:' + start + '--' + end)
	if (start !== '' && end !== '') {
		if (start > end) {
			layer.msg('开始时间大于结束时间');
		} else if (compareYear(new Date(start), 10) <= end) {
			layer.msg("超过统计时间限制");
		} else {
			$.ajax({
				url: apiurl + 'r=api/alarm/list/exe',
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify({
						start_time: start,
						end_time: end
					})
				},
				success: function(data) {
					if (data.success) {
						window.location.href = data.data;
					} else {
						layer.msg(data.error_message);
						returnLogIn(data.error_message);
					}
				},
				error: function(data) {
					layer.msg(data.error_message)
					console.log("报警日志错误原因" + JSON.stringify(data, null, 2));
				}
			});
		}
	} else {
		layer.msg('时间区间不能为空');
	}
}