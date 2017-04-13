$('#foot').load('public.html');
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
			$("#endTime").val(getCurrentMonthLastForSelect($(this).attr('value')));
		} else if (value == 9) {
			loaddata = false;
			$("#startTime").val("");
			$("#endTime").val("");
		}
		if (loaddata) {
			commExcLoadData(1);
		}
	});
	$("#slectFen ul li:nth-child(4) a").click();
});

$('#startTime').datepicker({
	format: "yyyy-mm-dd ",
	autoclose: true,
	todayBtn: false,
	pickerPosition: "bottom-right",
	minView: 2
}).on('changeDate', function(ev) {
	$("#slectFen button .txt").html("自定义").attr('rel', 9);
	$('#endTime')[0].focus();
});
$('#endTime').datepicker({
	format: "yyyy-mm-dd ",
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
		commExcLoadData(1);
	}

});

/**
 * [异常列表 数据请求]
 * @return {[type]} [description]
 */
function commExcLoadData(page) {
	var dataUp = {
		page: page,
		page_item_count: 13,
		start_time: $('#startTime').val(),
		end_time: $('#endTime').val()
	}
	console.log('上传的数据'+JSON.stringify(dataUp, null, 2));
	$.ajax({
		url: apiurl + 'r=api/system/log/list',
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				page: page,
				page_item_count: 13,
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
		success: function(result) {
			$(".loading").hide();
			if (result.success) {
				console.log("报警数据:" + JSON.stringify(result, null, 2));

				var data = result.data.data;
				if (data == null) {
					data = [];
				}
				for (var i in data) {
					switch (data[i].status) {
						case 'False':
							data[i].status = "异常";
							break;
						case 'True':
							data[i].status = "恢复";
							break;
					}
				}
				

				
				$('#commExclog-tbody tr td').html('');
				$('#commExclog-tbody tr').each(function(i, element) {
					if (i < data.length) {
						var tds = '<td>' + data[i].name +
							'</td><td>' + data[i].ip +
							'</td><td >' + data[i].status +					
							'</td><td >' + data[i].time +							
							'</td>';
						$(element).html(tds);
						console.log('index:' + i);
					}
				});

				if (result.data.pageCount === 0) {
					layer.msg('无数据');
					$('.tcdPageCode').html('')
				} else {
					$('.tcdPageCode').createPage({
						pageCount: result.data.pageCount,
						current: page,
						backFn: function(p) {
							console.log("这是第" + p + "页");
							commExcLoadData(p);
						}
					});
				}

			} else {
				layer.msg(result.error_message);
				returnLogIn(result.error_message);
				console.log("错误原因" + JSON.stringify(result, null, 2));
			}
		},
		error: function(result) {
			$(".loading").hide();
			layer.msg(result.error_message)
			console.log("错误原因" + JSON.stringify(result, null, 2));
		}
	});

};

/**
 * [导出用户操作日志]
 * @return {[type]} [description]
 */
function exportUserOperationLog() {
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
				url: apiurl + 'r=api/system/log/exe',
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