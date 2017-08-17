var lis = document.getElementById('systemlogblue');
addClass(lis,'list-group-active');

var app = angular.module('bayaxSystemLog', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.page_item_count = 27;
	$scope.logDatas = [];
	/**
	 * [获取日志信息]
	 * @param  {[type]} page [description]
	 * @return {[type]}      [description]
	 */
	$scope.getLogData = function(page) {
		$http.post("/equmentdata", JSON.stringify({
				'page': page,
				'page_item_count': $scope.page_item_count
			}))
			.then(function(result) {
				$scope.logDatas = result.data;
				console.log(JSON.stringify(result.data, null, 2));

				$("#systemLogPage").createPage({
					pageCount: 10,
					current: page,
					backFn: function(p) {
						console.log(p);
						$scope.getLogData(p);
					}
				});
			});
	};
	/**
	 * [下载当前日志]
	 * @return {[type]} [description]
	 */
	$scope.logDownload = function(){

		console.log('下载日志');
		// $http.post("/equmentdata", JSON.stringify({
		// 		'page': page,
		// 		'page_item_count': $scope.page_item_count
		// 	}))
		// 	.then(function(result) {
		// 		$scope.logDatas = result.data;
		// 		console.log(JSON.stringify(result.data, null, 2));

		// 		$("#systemLogPage").createPage({
		// 			pageCount: 10,
		// 			current: page,
		// 			backFn: function(p) {
		// 				console.log(p);
		// 				$scope.getLogData(p);
		// 			}
		// 		});
		// 	});
	}


	$scope.getLogData(1)

});