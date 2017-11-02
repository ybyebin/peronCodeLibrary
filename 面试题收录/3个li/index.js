window.onload = function(argument) {
	var lis = document.getElementsByTagName('li');
	for (var i = 0; i < lis.length; i++) {
		// 1
		// lis[i].onclick = function(invokedi) {
		// 	return function uniqEventHandlerFori(event) {
		// 		console.log(
		// 			'invokedi是在建立event handler时传入的，它的值是' +
		// 			invokedi);
		// 		console.log('你点击了 ' + invokedi);
		// 	}
		// }(i)
		// 
		// 
		// 2
		// lis[i].onclick = function cilsd(str){
		// 	  console.log('你点击了 ' + this);
		// }.bind(i);
		// 
		// 3
		// 
		
	}

	for (let i = 0; i < lis.length; i++) {
		lis[i].onclick = function(){
			console.log(i);
		}
	}
}

// setTimeout(function(){}())
// for (var i = 0; i <= 2; i++) {
// 	(function(i) {
// 		setTimeout(function() {
// 			console.log(i)
// 		}, (3 - i) * 1000);
// 	})(i);
// }