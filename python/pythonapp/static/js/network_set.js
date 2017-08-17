var lis = document.getElementById('networkblue');
addClass(lis,'list-group-active');

var app = angular.module('bayaxNetworkSet', []);
app.controller('myCtrl', function($scope, $http) {

	$scope.cip = '1';

	$scope.ipaddress='';
	$scope.zwym='';
	$scope.gateway='';
	$scope.dns='';

	$scope.macAddress='';


	// 保存设定
	$scope.saveSet = function(){
		console.log('查看：'+$scope.cip)
	};
});