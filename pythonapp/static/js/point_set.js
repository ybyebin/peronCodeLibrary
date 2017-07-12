$(function() {
	$('#treeview1 .list-group li:nth-child(2)').addClass('list-group-active');

})

var app = angular.module('bayaxPointSet', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.mainShow = true;
	$scope.init = function() {
		$scope.p_name = "";
		$scope.p_ip = '';
		$scope.p_port = '';
		$scope.p_equipment_id = '';
		$scope.p_address = '';
		$scope.p_datatype = '1';
		$scope.p_conversion_factor = '';
		$scope.p_id = '';
		$scope.p_timing = false;
		$scope.p_zhouqi = "1";
		$scope.p_cov = false;
		$scope.p_cov_num = '';
		$scope.covReadonly = true;
		$scope.selectZq = true;


		// 验证初始化
		$scope.isRightName = false;
		$scope.isRightEIp = false;
		$scope.isRightPort = false;
		$scope.isRightEId = false;
		$scope.isRightAddress = false;
		$scope.isRightCF = false;
		$scope.isRightCovNum = false;

		$scope.mainShow = false;
		$scope.creatShow = true;

	}


	$scope.cancle = function() {
		$scope.mainShow = true;
		$scope.creatShow = false;
	}
	$scope.save = function() {
		console.log($scope.p_name);
		console.log('查看：' + $scope.p_datatype);

		layer.msg('123')
	};
	// 验证 点名称
	$scope.validationName = function() {
		console.log($scope.p_name)
		var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
		var flag = pattern.test($scope.p_name)
		console.log('查看：' + flag)

		if (flag) {
			$scope.isRightName = true;
		}
	};
	// 验证设备IP
	$scope.validationEIp = function() {
		var val = $scope.p_ip;
		console.log(val)
		if (val === undefined || val === '') {
			layer.msg('不能为空');
			$scope.isRightEIp = true;
		}
	};
	// 验证端口
	$scope.validationPort = function() {

		if ($scope.p_port === '') {
			$scope.p_port = 9094;
		} else {
			var val = Number($scope.p_port);
			var la = function() {
				layer.msg('请输入0-65535之间的正整数');
			};
			if (!isNaN(val)) {
				if (Math.floor(val) === val) {
					if (val < 0 || val > 65535) {
						la();
						$scope.isRightPort = true;
					}
				} else {
					la();
					$scope.isRightPort = true;
				}
			} else {
				la();
				$scope.isRightPort = true;
			}
		}

	};
	// 验证设备ID
	$scope.validationEId = function() {

		var vals = $scope.p_equipment_id;

		if (vals === '') {
			layer.msg('不能为空');
			$scope.isRightEId = true;
		} else {
			var val = Number($scope.p_equipment_id);
			console.log(val)
			var la = function() {
				layer.msg('请输入0-99之间的正整数');
			};
			if (!isNaN(val)) {
				if (Math.floor(val) === val) {
					if (val < 0 || val > 99) {
						la();
						$scope.isRightEId = true;
					}
				} else {
					la();
					$scope.isRightEId = true;
				}
			} else {
				la();
				$scope.isRightEId = true;
			}
		}



	};
	// 地址
	$scope.validationAddress = function() {
		var vals = $scope.p_address;
		if (vals === undefined || vals === '') {
			layer.msg('不能为空');
			$scope.isRightAddress = true;
		} else {
			var val = Number($scope.p_address);
			var la = function() {
				layer.msg('请输入0-99999之间的正整数');
			};
			if (!isNaN(val)) {
				if (Math.floor(val) === val) {
					if (val < 0 || val > 99) {
						la();
						$scope.isRightAddress = true;
					}
				} else {
					la();
					$scope.isRightAddress = true;
				}
			} else {
				la();
				$scope.isRightAddress = true;
			}
		}

	};
	// 换算系数
	$scope.validationCF = function() {
		var vals = $scope.p_conversion_factor;
		console.log(vals)
		if (vals === '') {
			$scope.p_conversion_factor = 1;
		} else {

			var val = Number($scope.p_conversion_factor);
			console.log(val)
			var la = function() {
				layer.msg('输入范围0.0001-100');
			};
			if (!isNaN(val)) {


				var str = String(val);
				var len = str.length - (str.indexOf('.') + 1);

				if (len > 4) {
					layer.msg('小数点后最多4位');
					$scope.isRightCF = true;
				} else {
					if (val < 0.0001 || val > 100) {
						la();
						$scope.isRightCF = true;
					}
				}
			} else {
				la();
				$scope.isRightCF = true;
			}
		}
	};
	// cov比例
	$scope.validationCovNum = function() {
		var vals = $scope.p_cov_num;

		if (vals === '') {

		} else {

			var val = Number($scope.p_cov_num);
			console.log(val)
			var la = function() {
				layer.msg('输入范围0.0001-100');
			};
			if (!isNaN(val)) {

				var str = String(val);
				var len = str.length - (str.indexOf('.') + 1);
				console.log('查看' + len)
				if (len > 4) {
					layer.msg('小数点后最多4位');
					$scope.isRightCovNum = true;
				} else {
					if (val < 0.0001 || val > 100) {
						la();
						$scope.isRightCovNum = true;
					}
				}
			} else {
				la();
				$scope.isRightCovNum = true;
			}
		}
	};

	// 数据类型变化
	$scope.datatypeChange = function() {
			if ($scope.p_datatype === '5') {
				$scope.covReadonly = true;
				$scope.p_cov_num = '';
			} else if ($scope.p_cov) {
				$scope.covReadonly = false;
			}
		}
		// cov发布 选择框改变
	$scope.covChange = function() {
		console.log($scope.p_cov);
		console.log($scope.p_datatype);
		if ($scope.p_cov === true && $scope.p_datatype !== '5') {
			$scope.covReadonly = false;
		} else {
			$scope.covReadonly = true;
		}
	};
	// 定时发布选择框变化
	$scope.covTimeChange = function() {
		if ($scope.p_timing) {
			$scope.selectZq = false;
		} else {
			$scope.selectZq = true;
		}
	};

	$scope.deletePoint = function() {
		layer.open({
			title: ['提示', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:10px'],
			type: 1,
			skin: 'layui-primary', //加上边框
			area: ['300px', '180px'], //宽高
			content: $("#delete_point"), //捕获的元素,
			shift: 2,
			move: false,
			btn: ['确定', '取消'],
			yes: function(index) {
				var arr = $scope.selectData;
				// $('[name="pointBox"]:checked').each(function(index, ele) {
				// 	arr.push($(ele).attr('id'));
				// });
				console.log(JSON.stringify(arr, null, 2))
				layer.close(index);

			},
			btn2: function(index) {
				layer.close(index);

			},
		});
	}



	// $scope.datas = [{
	// 	id: 1,
	// 	name: 'admin1',
	// 	rem: '备注'
	// }, {
	// 	id: 2,
	// 	name: 'admin2',
	// 	rem: '备注'
	// }, {
	// 	id: 3,
	// 	name: 'admin3',
	// 	rem: '备注'
	// }];
	// 
	// 
	$scope.datas = [];

	$http.get("/pointdata")
		.then(function(result) {
			// $scope.names = result.data.records;
			// var data = JSON.parse(result);
			// console.log(JSON.stringify(data,null,2))
			$scope.datas = result.data.data.data;
			console.log(JSON.stringify(result.data.data.data, null, 2));

			// $("#pointStatusPage").createPage({
			// 	pageCount: 10,
			// 	current: 2,
			// 	backFn: function(p) {
			// 		console.log(p);


			// 	}
			// });

		});



	// $.ajax({
	// 	url: '/pointdata',
	// 	type: 'GET',
	// 	success: function(result) {

	// 		// console.log(JSON.stringify(data,null,2))
	// 	},
	// 	error: function(result) {
	// 		// alert(result.responseText + result.status);
	// 	}
	// });


	$scope.count = 0; //已选择数量 
	$scope.selectData = []; //已选对象
	//选择单个（取消选择单个
	$scope.changeCurrent = function(current, $event) {

		// //计算已选数量 true加， false减
		// $scope.count += current.checked ? 1 : -1;
		// //判断是否全选，选数量等于数据长度为true
		// $scope.selectAll = $scope.count === $scope.datas.length;
		//统计已选对象
		$scope.selectData = [];
		angular.forEach($scope.datas, function(item) {
			if (item.checked) {
				$scope.selectData[$scope.selectData.length] = item.id;
			}
		});


		// $event.stopPropagation(); //阻止冒泡

	};

	//单击行选中
	$scope.changeCurrents = function(current, $event) {

		if (current.checked == undefined) {
			current.checked = true;
		} else {
			current.checked = !current.checked;
		}
		$scope.changeCurrent(current, $event);
	};

	//全选（取消全选
	// $scope.changeAll = function() {
	// 	//console.log(scope.selectAll);
	// 	angular.forEach($scope.datas, function(item) {
	// 		item.checked = $scope.selectAll;
	// 	});
	// 	$scope.count = $scope.selectAll ? $scope.datas.length : 0;
	// 	if ($scope.selectAll) {

	// 		$scope.selectData = $scope.datas;
	// 	} else {
	// 		$scope.selectData = [];

	// 	}

	// };
	//编辑事件
	$scope.zdTableEdit = function(item, $event) {
		console.log(item);
		$event.stopPropagation(); //阻止冒泡
	};
	// //删除事件
	// scope.zdTableRemove = function(item, $event) {
	// 	console.log(item);
	// 	$event.stopPropagation(); //阻止冒泡
	// };


});