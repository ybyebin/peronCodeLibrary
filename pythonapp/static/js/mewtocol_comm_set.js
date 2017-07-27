var lis = document.getElementById('mewtocolblue');
addClass(lis,'list-group-active');


var app = angular.module('bayaxMewtocolSet', []);
app.controller('myCtrl', function($scope, $http) {

	$scope.timeout = 500;
	// 保存设定
	$scope.saveSet = function(){

	};
});