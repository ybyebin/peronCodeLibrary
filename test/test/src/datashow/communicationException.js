$('#foot').load('public.html');

(function($) {
	$(window).load(function() {
		$(".commexc-div").mCustomScrollbar();		
	});
})(jQuery);



$(function() {	
	publicHeadfun();
	getCommunicationError();
	setInterval(function() {
		getCommunicationError();
	}, 3000);
});

/**
 * [获取通信状态数据]
 * @return {[type]}            [json]
 */
function getCommunicationError() {
	$.ajax({
		url: apiurl + "r=api/system/connect/list",
		type: 'post',
		dataType: 'json',
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				comErrorjqaddRow($('#commexc-tbody'), data.data)
			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}

		},
		error: function(data) {
			layer.msg(data.error_message);
		}
	});
}


function comErrorjqaddRow(obj, obj2) {
	if (obj2 == null) {
		obj2 = [{
			"commec": "commec",
		}]
		layer.msg("无通讯状态信息")
	} else if (obj2.length == 0) {
		layer.msg("无通讯状态信息");
	}
	var obj2Length = obj2.length;

	for (var i in obj2) {
		switch (Number(obj2[i].status)) {
			case 0:
				obj2[i].status = "异常";
				break;
			case 1:
				obj2[i].status = "正常";
				break;
		}
	}

	if (Number(obj2Length) < 14) {
		var num = 14 - obj2Length;
		var falseData = {
			"commec": "commec",
		};
		for (var i = 0; i < num; i++) {
			obj2.push(falseData);
		}
	}

	obj.html('');
	
	for (var key in obj2) {
		var rowTemplate = '';
		if (obj2[key].commec) {
			rowTemplate = '<tr"><td></td><td></td><td></td><td></td></tr>';
		} else {
			if (obj2[key].status === '异常') {
				rowTemplate = '<tr">' +
					'<td>' + obj2[key].name +
					'</td><td >' + obj2[key].ip +
					'</td><td style="color:red;">' + obj2[key].status +
					'</td><td>' + obj2[key].time + '</td>' +
					'</tr>';
			} else {
				rowTemplate = '<tr">' +
					'<td>' + obj2[key].name +
					'</td><td >' + obj2[key].ip +
					'</td><td>' + obj2[key].status +
					'</td><td>' + obj2[key].time + '</td>' +
					'</tr>';
			}		
		}
		obj.append(rowTemplate)
	}
};