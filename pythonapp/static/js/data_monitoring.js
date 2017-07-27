var lis = document.getElementById('datablue');
addClass(lis,'list-group-active');
var app = angular.module('bayaxDataMonitoring', []);
app.controller('myCtrl', function($scope, $http) {

	$scope.page_item_count = 18;
	$scope.type = 'point'; //刷新标志
	$scope.refreshType = function(str) {
		console.log(str)
		$scope.type = str;
	}

	$scope.pointDatas = []; //点状态
	$scope.equipmentDatas = []; //设备状态



	/**
	 * [获取点状态数据]
	 * @param  {[type]} page [当前页数]
	 * @return {[type]}      [description]
	 */
	$scope.getPointData = function(page) {
		$http.post("/pointdata", JSON.stringify({
				'page': page,
				'page_item_count': $scope.page_item_count
			}))
			.then(function(result) {
				$scope.pointDatas = result.data;
				console.log(JSON.stringify(result.data, null, 2));
				$("#pointStatusPage").createPage({
					pageCount: 10,
					current: page,
					backFn: function(p) {
						console.log(p);
						$scope.getPointData(p)
					}
				});
			});
	};
	/**
	 * [获取设备状态数据]
	 * @param  {[type]} page [description]
	 * @return {[type]}      [description]
	 */
	$scope.getEquipmentData = function(page) {
		$http.post("/equmentdata", JSON.stringify({
				'page': page,
				'page_item_count': $scope.page_item_count
			}))
			.then(function(result) {
				$scope.equipmentDatas = result.data;
				console.log(JSON.stringify(result.data, null, 2));

				$("#equipmentStatusPage").createPage({
					pageCount: 10,
					current: page,
					backFn: function(p) {
						console.log(p);
						$scope.getEquipmentData(p);
					}
				});
			});
	};


	// 刷新数据
	$scope.refresh = function() {
		switch ($scope.type) {
			case 'point':
				$scope.getPointData(1);
				break;
			case 'equipment':
				$scope.getEquipmentData(1);
				break;
			default:
				break;
		}
	};


	$scope.getPointData(1);
	$scope.getEquipmentData(1);

})