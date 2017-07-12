$(function() {
	$('#treeview1 .list-group li:nth-child(7)').addClass('list-group-active');
})

function isLeapYear(year) {
	return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

var app = angular.module('bayaxSysManage', []);
app.controller('myCtrl', function($scope, $http, $timeout) {

	$scope.pasword = '';
	$scope.MSpasword = '';
	$scope.validationName = '';

	// 校验规则
	$scope.pattern = new RegExp(/[^\a-\z\A-\Z0-9]/g);
	// 提示信息
	$scope.warn = '密码为5-10位字母数字';
	//时间
	$scope.timer = function() {
		$scope.times = new Date().format("yyyy-MM-dd hh:mm:ss")
		$timeout(function() {
			$scope.timer();
		}, 1000);
	}
	$scope.timer();



	// 校验 工程标识
	$scope.validationName = function() {
		var flag = $scope.pattern.test($scope.ProIentification)
		if (flag) {
			$scope.isRightName = true;
			layer.msg('20位以内字母数字');
		}
	}

	// 校验 密码
	$scope.validationPas = function() {
		var val = $scope.pasword;
		if (val === '') {
			console.log('查看：' + val)
			$scope.paswarns();
		} else {
			var flag = $scope.pattern.test(val)
			console.log('查看：' + flag)

			if (flag) {
				$scope.paswarns();
			} else if (val.length < 5) {
				$scope.paswarns();
			} else if ($scope.MSpasword !== '' && val !== $scope.MSpasword) {
				$scope.isRightPas = true;
				layer.msg('两次密码输入不一致');
			}
		}
	};
	$scope.paswarns = function() {
		$scope.isRightPas = true;
		layer.msg($scope.warn);
	};

	// 校验 确认密码
	$scope.validationMSPas = function() {
		var val = $scope.MSpasword;
		if (val === '') {
			console.log('查看：' + val)
			$scope.msPaswarns();
		} else {
			var flag = $scope.pattern.test(val)
			console.log('查看：' + flag)
			if (flag) {
				$scope.msPaswarns();
			} else if (val.length < 5) {
				$scope.msPaswarns();
			} else if ($scope.pasword !== val) {
				$scope.isRightMSPas = true;
				layer.msg('两次密码输入不一致');
			}
		}
	};
	$scope.msPaswarns = function() {
		$scope.isRightMSPas = true;
		layer.msg($scope.warn);
	};

	// 重启
	$scope.btnClick = function(str) {
		var content = str === 'reset' ? "确定重启?" : "确定初始化?";
		layer.open({
			title: ['提示', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
			type: 1,
			skin: 'layui-primary', //加上边框
			area: ['300px', '150px'], //宽高
			content: $("#restart"), //捕获的元素,
			shift: 2,
			move: true,
			btn: ['确定', '取消'],
			success: function(layero, index) {
				$scope.warnContent = content;
			},
			yes: function(index) {
				if (content === 'reset') {
					// 重启
				} else {
					// 初始化
				}

			},
			btn2: function(index) {
				layer.close(index);

			},
		});
	};

	// 时间输入错误 提示
	$scope.changTimeWrong = function(){
		layer.msg('请检查时间输入是否准确');
		return false;
	}

	$scope.changeTime = function() {
		layer.open({
			title: ['修改时间', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
			type: 1,
			skin: 'layui-primary', //加上边框
			area: ['520px', '165px'], //宽高
			content: $("#change-time-layer"), //捕获的元素,
			shift: 2,
			move: true,
			btn: ['确定', '取消'],
			success: function(layero, index) {
				var datas = new Date();			
				$scope.t_year = datas.getFullYear();
				$scope.t_month=Number(datas.getMonth()) + 1;
				$scope.t_day=datas.format("dd");
				$scope.t_hour=datas.format("hh");
				$scope.t_min=datas.format("mm");
				$scope.t_second=datas.format("ss");
			},
			yes: function(index) {
				var is_leap_year;
				var year = Number($scope.t_year);
				var month = Number($scope.t_month);
				var day = Number($scope.t_day);
				var hour = Number($scope.t_hour);
				var minutes = Number($scope.t_min);
				var seconds = Number($scope.t_second);

				var is_null = false;

				$('#change-time-layer input').each(function(index, ele) {
					if ($(ele).val() === '') {
						is_null = true;
						return false;
					}
				});

				if (is_null) {
					layer.msg('时间不能为空');
				} else {
					if ($scope.t_year < 1970 || year > 9999) {
						$scope.changTimeWrong();
					}
					if (month > 12 || month <= 0) {
						$scope.changTimeWrong();
					}
					is_leap_year = isLeapYear(year);
					if (is_leap_year) {
						if (month === 2) {
							if (day > 29 || day <= 0) {
								$scope.changTimeWrong();
							}
						} else if (month === 4 || month === 6 || month === 9 || month === 11) {
							if (day > 30 || day <= 0) {
								$scope.changTimeWrong();
							}
						} else {
							if (day > 31 || day <= 0) {
								$scope.changTimeWrong();
							}
						}

					} else {
						if (month === 2) {
							if (day > 28 || day <= 0) {
								$scope.changTimeWrong();
							}
						} else if (month === 4 || month === 6 || month === 9 || month === 11) {
							if (day > 30 || day <= 0) {
								$scope.changTimeWrong();
							}
						} else {
							if (day > 31 || day <= 0) {
								$scope.changTimeWrong();
							}
						}
					}

					if (hour > 23 || hour < 0) {
						$scope.changTimeWrong();
					}
					if (minutes > 59 || hour < 0) {
						$scope.changTimeWrong();
					}
					if (seconds > 59 || seconds < 0) {
						$scope.changTimeWrong();
					}

					var times = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
					$scope.times = times;
					// layer.close(index);

					// 更改系统时间
					$scope.changeSystem(times);
				}

			},
			btn2: function(index) {
				layer.close(index);

			},
		});
	};
	// 更改系统时间接口
	$scope.changeSystem = function(time){

	};
	// 保存设定
	$scope.save = function(){
		
	}
});



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