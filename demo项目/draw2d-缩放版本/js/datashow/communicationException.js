$('#foot').load('public.html');

(function($) {
	$(window).load(function() {
		$(".commexc-div").mCustomScrollbar();
	});
})(jQuery);



$(function() {
	publicHeadfun();



	getCommunicationError(true);

	// 此处效率存在问题需要联调


	setInterval(function() {
		var btn = $('#commexc-btn');
		var btn_status = btn.data('status');
		switch (btn_status) {
			case 'show':
				commexcSonGetData(btn.data('id'));
				break;
			case 'hide':
				getCommunicationError(false)
				break;
			default:
				break;
		}
	}, 10000);
});

/**
 * [获取通信状态数据]
 * @return {[type]}            [json]
 */
function getCommunicationError(flag) {
	$.ajax({
		url: apiurl + 'nodelog/0',
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
				if (flag) {
					comErrorjqaddRow($('#commexc-tbody'), data.data.items);
				} else {
					comErrorjqaddRowRefresh($('#commexc-tbody'), data.data.items);
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

// 初始化
function comErrorjqaddRow(obj, obj2) {
	console.log(JSON.stringify(obj2, null, 2))

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
			case 1:
				obj2[i].status = "正常";
				break;
			case 2:
				obj2[i].status = "异常";
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


	console.log(JSON.stringify(obj2, null, 2))
	var rowTemplate = '';
	for (var key in obj2) {
		if (obj2[key].commec) {
			rowTemplate += '<tr"><td></td><td></td><td></td><td></td><td></td></tr>';
		} else {
			var stats = '';
			if (obj2[key].status === '异常') {
				stats = '</td><td class="commec-status"><span style="color:red">' + obj2[key].status + '</span>';
			} else {
				stats = '</td><td class="commec-status">' + obj2[key].status
			}
			rowTemplate += '<tr id="tr' + obj2[key].id + '">' +
				'<td>' + obj2[key].name +
				'</td><td >' + obj2[key].ip + stats +
				'</td><td class="commec-time">' + obj2[key].create_time + '</td>' +
				'</td><td><a style="color:#428bca;cursor: pointer;" data-id="' + obj2[key].id + '" class="check-soncmmmec">查看子设备</a></td>' +
				'</tr>';
		}
	}
	obj.append(rowTemplate);

};
// 刷新
function comErrorjqaddRowRefresh(obj, obj2) {
	if (obj2 == null) {
		layer.msg("无通讯状态信息");
		return false;
	} else if (obj2.length == 0) {
		layer.msg("无通讯状态信息");
		return false;
	}
	var obj2Length = obj2.length;

	for (var i in obj2) {
		switch (Number(obj2[i].status)) {
			case 1:
				obj2[i].status = "正常";
				$('#tr' + obj2[i].id).find('td.commec-status').each(function(index, ele) {
					$(ele).html(obj2[i].status)
				});
				break;
			case 2:
				obj2[i].status = "异常";
				var spans = '<span style="color:red">' + obj2[i].status + '</span>'
				$('#tr' + obj2[i].id).find('td.commec-status').each(function(index, ele) {
					$(ele).html(spans)
				});
				break;
			default:
				break;
		}
		$('#tr' + obj2[i].id).find('td.commec-time').each(function(index, ele) {
			$(ele).html(obj2[i].create_time)
		});
	}


};

$('#commexc-tbody').on('click', 'a.check-soncmmmec', function() {
	$('.commexc-father').hide();
	$('.commexc-son').show();
	var elem = $('#commexc-btn');　　
	var ids = $(this).data('id');
	$.data(elem[0], 'id', ids);
	$.data(elem[0], 'status', 'show');
	commexcSonGetData(ids);

});
// 子设备通信状态获取
function commexcSonGetData(id) {
	// var special = 0;
	// if (Number(id) > 60000) {
	// 	special = 1;
	// }
	$.ajax({
		url: apiurl + 'taglog/1' + '?node_id=' + Number(id),
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
				var result = data.data;

				if (result == null) {
					result = [{
						"commectag": "commectag",
					}]
					layer.msg("无通讯状态信息")
				} else if (result.length == 0) {
					layer.msg("无通讯状态信息");
				}
				var obj2Length = result.length;

				for (var i in result) {
					switch (result[i].status) {
						case 1:
							result[i].status = "异常";
							break;
						case 0:
							result[i].status = "正常";
							break;
						case true:
							result[i].status = "异常";
							break;
						case false:
							result[i].status = "正常";
							break;
						default:
							result[i].status = "--";
							break;
					}

				}

				if (Number(obj2Length) < 14) {
					var num = 14 - obj2Length;
					var falseData = {
						"commectag": "commectag",
					};
					for (var i = 0; i < num; i++) {
						result.push(falseData);
					}
				}
				var obj = $('#commexc-tbody-second');
				obj.html('');
				var rowTemplate = '';
				for (var key in result) {

					if (result[key].commectag) {
						rowTemplate += '<tr"><td></td><td></td><td></td></tr>';
					} else {
						var stats = '';
						if (result[key].status === '异常') {
							stats = '</td><td class="commec-status"><span style="color:red">' + result[key].status + '</span>';
						} else {
							stats = '</td><td class="commec-status">' + result[key].status
						}
						rowTemplate += '<tr id="tr' + result[key].id + '">' +
							'<td>' + result[key].name + stats +
							'</td><td class="commec-time">' + result[key].create_time + '</td>' +
							'</tr>';
					}
				}
				obj.append(rowTemplate);

			} else {
				layer.msg(data.error_message);
			}

		},
		error: function(data) {
			publicAjaxError(data);
		}
	});
}



$('#commexc-btn').click(function() {
	$('.commexc-father').show();
	$('.commexc-son').hide();
	var elem = $('#commexc-btn');　　
	$.data(elem[0], 'id', '');
	$.data(elem[0], 'status', 'hide');
});