$('#startTime').datepicker({
	format: "yyyy-mm-dd",
	autoclose: true,
	todayBtn: false,
	pickerPosition: "bottom-right",
	minView: 2
}).on('changeDate', function(ev) {
	// $("#slectFen button .txt").html("自定义").attr('rel', 9);
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
		// timebeginisTrue = false;
	}
	if (compareYear(new Date($('#startTime').val()), 10) <= ev.date.toLocaleDateString()) {
		layer.msg("超过统计时间限制");
		$("#endTime").val("");
		// timebeginisTrue = false;
	}
	if (timebeginisTrue) {
		// 请求数据
		// warnLogLoadData(1);
	}

});