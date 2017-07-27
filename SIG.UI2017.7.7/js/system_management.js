$(function() {
	$('#treeview1 .list-group li:nth-child(7)').addClass('list-group-active');
})


/**
 * [确认时间]
 * @return {[type]} [description]
 */
function time() {
	$('#time_set').text($('#time_input').val());
}



function sys_manage_alert(str) {
	var content = str == 1 ? "确定重启?" : "确定初始化?";
	layer.open({
		title: ['提示', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:30px'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['300px', '225px'], //宽高
		content: $("#restart"), //捕获的元素,
		shift: 2,
		move: true,
		btn: ['确定', '取消'],
		success: function(layero, index) {
			$('#restart span').text(content);
		},
		yes: function(index) {
			if (str == 1) {
				layer.msg('重启');
			} else {
				layer.msg('初始化')
			}

		},
		btn2: function(index) {
			layer.close(index);

		},
	});
}

function changeTime() {
	layer.open({
		title: ['修改时间', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['520px', '225px'], //宽高
		content: $("#change-time-layer"), //捕获的元素,
		shift: 2,
		// move: true,
		btn: ['确定', '取消'],
		success: function(layero, index) {
			var datas = new Date();
			$('.input-year').val(datas.getFullYear());
			$('.input-month').val((Number(datas.getMonth()) + 1));
			$('.input-day').val(datas.format("dd"));
			$('.input-hour').val(datas.format("hh"));
			$('.input-minutes').val(datas.format("mm"));
			$('.input-seconds').val(datas.format("ss"));
		},
		yes: function(index) {
			var is_leap_year;
			var year = Number($('.input-year').val());
			var month = Number($('.input-month').val());
			var day = Number($('.input-day').val());
			var hour = Number($('.input-hour').val());
			var minutes = Number($('.input-minutes').val());
			var seconds = Number($('.input-seconds').val());

			var is_null = false;

			$('#change-time-layer input').each(function(index,ele){
				if ($(ele).val() === '') {
					is_null = true;
					return false;
				}
			});

			if (is_null) {
				layer.msg('时间不能为空');
			} else {
				if (year < 1970 || year > 9999) {
					layer.msg('请检查时间输入是否准确');
					return false;
				}
				if (month > 12 || month <= 0) {
					layer.msg('请检查时间输入是否准确');
					return false;
				}
				is_leap_year = isLeapYear(year);
				if (is_leap_year) {
					if (month === 2) {
						if (day > 29 || day <= 0) {
							layer.msg('请检查时间输入是否准确');
							return false;
						}
					} else if (month === 4 || month === 6 || month === 9 || month === 11) {
						if (day > 30 || day <= 0) {
							layer.msg('请检查时间输入是否准确');
							return false;
						}
					} else {
						if (day > 31 || day <= 0) {
							layer.msg('请检查时间输入是否准确');
							return false;
						}
					}

				} else {
					if (month === 2) {
						if (day > 28 || day <= 0) {
							layer.msg('请检查时间输入是否准确');
							return false;
						}
					} else if (month === 4 || month === 6 || month === 9 || month === 11) {
						if (day > 30 || day <= 0) {
							layer.msg('请检查时间输入是否准确');
							return false;
						}
					} else {
						if (day > 31 || day <= 0) {
							layer.msg('请检查时间输入是否准确');
							return false;
						}
					}
				}

				if (hour > 23 || hour < 0) {
					layer.msg('请检查时间输入是否准确');
					return false;
				}
				if (minutes > 59 || hour < 0) {
					layer.msg('请检查时间输入是否准确');
					return false;
				}
				if (seconds > 59 || seconds < 0) {
					layer.msg('请检查时间输入是否准确');
					return false;
				}

				var times = year +'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds; 
				$('#time_set').text(times);
				layer.close(index);
			}

		},
		btn2: function(index) {
			layer.close(index);

		},
	});
}

function isLeapYear(year) {
	return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

function save(){
	layer.msg('保存成功');
}






/**
 * [时间格式化函数]
 * @param  {[type]} format [data]
 * @return {[type]}        [description]
 */
Date.prototype.format = function(format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
};