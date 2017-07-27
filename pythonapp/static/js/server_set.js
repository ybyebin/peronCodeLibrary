
 
var lis = document.getElementById('serverblue');
addClass(lis,'list-group-active');

var app = angular.module('bayaxServrSet', []);
app.controller('myCtrl', function($scope, $http) {

	$scope.serve_address = '';
	$scope.serve_ports = '';

	// 保存
	$scope.save = function(){

	};

	// 获取服务器状态
	$scope.getServerStatus =function(){
		// 已连接 未连接
		$scope.severstatus = '';
	};
});