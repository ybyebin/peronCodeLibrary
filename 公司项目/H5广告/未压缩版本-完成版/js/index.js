$(function() {

	var loading = $('.progress');
	var huang = $('#huang-load');
	var hongs = $('#hongs-load');
	var zi = $('#zi-load');
	for (var i = 0; i <= 2; i++) {
		(function(i) {
			setTimeout(function() {
				var widths = 3.1 * (i+1+Math.random()) + 'rem';
				loading.css('width', widths)
				if (i === 2) {
					$('.section').hide();
					$('.first').show();
				}

			}, i * 1000);
		})(i);
	}

	for (var k = 1; k < hong.length; k++) {
		(function(k) {
			setTimeout(function() {
				huang.prop('src', 'images/huang/' + hong[k - 1] + '.png');
				hongs.prop('src', 'images/hong/' + hong[k - 1] + '.png');
				zi.prop('src', 'images/zi/' + hong[k - 1] + '.png');

			}, k * 300);
		})(k);
	}

});


// 获取对象
function getDom(str) {
	return document.getElementById(str);
}

var data = [
	'ws01.png',
	// 'ws02.png',
	// 'ws03.png',
	'ws04.png',
	// 'ws05.png',
	'ws06.png',
	// 'ws07.png',
	'ws08.png',
	// 'ws09.png',
	// 'ws10.png',
	// 'ws11.png',
	// 'ws12.png',
	'ws13.png',
	// 'ws14.png',
	'ws15.png',
	// 'ws16.png',
	// 'ws17.png',
	'ws18.png',
	// 'ws19.png',
	// 'ws20.png',
	'ws21.png',
	// 'ws22.png',
	// 'ws23.png',
	// 'ws24.png',
	// 'ws25.png',
	// 'ws26.png',
	// 'ws27.png',
	// 'ws28.png',
	// 'ws29.png',
	// 'ws30.png',
	// 'ws31.png',
	// 'ws32.png',
	// 'ws33.png',
	// 'ws34.png',
	// 'ws35.png',
	// 'ws36.png',
	// 'ws37.png',
	// 'ws38.png',
	'ws39.png',
];



var hong = [
	'0',
	// '1',
	'2',
	// '3',
	'4',
	// '5',
	// '6',
	'7',
	// '8',
	'9',
	// '10',
	// '11',
	// '12',
	// '13',
	// '14',
	// '15',
	// '16',
	// '17',
];
var AD = {
	clickNum : 0,
	img_url: 'images/wash01/',
	delayTime:700,//动画开始延时时间
	showTime: 200,//切换图片时间单位
	nextPageTime:700,//动画完胜切换页面延时
	loadAllImage: function() {

	},
	changePage: function() {
		$('.section').hide();
		$('.second').show();
	},
}

// 首页开始点击
getDom('first').addEventListener("touchend", function(e){
	AD.changePage();
},false);

// 再玩一次

getDom('play-again').addEventListener("touchend", function(e){
	$('.section').hide();
	$('.first').show();
	$('.pulse').show();
	$('.f-flash').prop('src', 'images/hong/16.png');
	$('.f-flash3').prop('src', 'images/zi/17.png');
	$('.f-flash7').prop('src', 'images/huang/17.png');
	$('.f-flash7-h').prop('src', 'images/hong/16.png');
	$('#hm-wash-seven').prop('src', 'images/shower/0.png');
	$('.fruit-div').hide();
	$('.btn-div-t').hide();
	$('.mengban-div').hide();
	$('#mengban-img').removeClass('bounceInDown');
	$('.btn-div-t').removeClass('bounceInDown');
	AD.clickNum += 1;
	// e.peventDefault();
}, false);

//下载游戏
getDom('down-game1').addEventListener("touchend", function(e){

},false);
getDom('down-game2').addEventListener("touchend", function(e){
	
},false);

// 红色
function moveHong(obj) {
	var startX, endX, left;
	function touchStart(event) {
		$('.pulse1').hide();
		var touch = event.touches[0];
		startX = touch.pageX;
		left = $('#' + obj).offset().left;
	}
	function touchMove(event) {
		var touch = event.touches[0];
		endX = touch.pageX;
		var chaX = endX - Number(startX);
		var m = parseInt(chaX / 3);
		var lefts = 10 - m;
		if (chaX > 0 && chaX < 18) {
			$('#' + obj).css({
				'margin-left': '-' + lefts + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaX = endX - Number(startX);
		if (chaX > 5 && chaX < 90) {
			pageTwoOperation();
			$('#' + obj).css({
				'margin-left': '-10%'
			});
		} else {
			$('#' + obj).css({
				'margin-left': '-10%'
			})
		}
		startX = endX =left = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}


function moveGreen(obj) {
	var startX,  endX, left;
	function touchStart(event) {
		$('.pulse1').hide();
		var touch = event.touches[0];
		// startY = touch.pageY;
		startX = touch.pageX;
		// top = $('#' + obj).offset().top;
		left = $('#' + obj).offset().left;
	}
	function touchMove(event) {
		var touch = event.touches[0];
		endX = touch.pageX;
		// endY = touch.pageY;
		var chaX = Number(startX) - endX;
		console.log('chaX:' + chaX);
		var m = parseInt(chaX / 3);
		var lefts = 1 - m;
		if (chaX > 0 && chaX < 18) {
			$('#' + obj).css({
				'margin-left': lefts + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaX = Number(startX) - endX;
		if (chaX > 5 && chaX < 90) {
			pageTwoOperation();
			$('#' + obj).css({
				'margin-left': '1%'
			})
		} else {
			$('#' + obj).css({
				'margin-left': '1%'
			})
		}
		startX =  endX = left = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}

function moveGreenTwo(obj) {
	var  startY, endY, top;
	function touchStart(event) {
		$('.pulse2').hide();
		var touch = event.touches[0];
		startY = touch.pageY;

		top = $('#' + obj).offset().top;

	}
	function touchMove(event) {
		var touch = event.touches[0];
		
		endY = touch.pageY;
	
		var chaY = endY - Number(startY);
		var m = parseInt(chaY / 3);
		var tops = 114 + m;
		if (chaY > 0 && chaY < 18) {
			$('#' + obj).css({
				'margin-top': tops + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaY = endY - Number(startY);
		console.log('=====' + chaY)
		if (chaY > 5 && chaY < 90) {
			pageFourOperation();
			$('#' + obj).css({
				'margin-top': '114%'
			});
			
		} else {
			$('#' + obj).css({
				'margin-top': '114%'
			})
		}
		startY = endY = top = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}


function movezi(obj) {
	var startX, startY, endX, endY, top, left;

	function touchStart(event) {
		$('.pulse2').hide();
		var touch = event.touches[0];
		startY = touch.pageY;
		startX = touch.pageX;

		top = $('#' + obj).offset().top;
		left = $('#' + obj).offset().left;
		console.log('top:' + top);
		console.log('left:' + left);
	}

	function touchMove(event) {
		var touch = event.touches[0];
		endX = touch.pageX;
		endY = touch.pageY;

		var chaY = Number(startY) - endY;
		var m = parseInt(chaY / 3);
		var tops = 124.6 - m;
		if (chaY > 0 && chaY < 18) {
			$('#' + obj).css({
				'margin-top': tops + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaY = Number(startY) - endY;
		console.log('=====' + chaY)
		if (chaY > 3 && chaY < 90) {
			pageFourOperation();
			$('#' + obj).css({
				'margin-top': '124.6%'
			});
		} else {
			$('#' + obj).css({
				'margin-top': '124.6%'
			})
		}
		startX = startY = endX = endY = top = left = 0;
	}
	document.getElementById(obj).addEventListener("touchstart", touchStart, false);
	document.getElementById(obj).addEventListener("touchmove", touchMove, false);
	document.getElementById(obj).addEventListener("touchend", touchEnd, false);
}


// 橙色
function moveCheng(obj) {
	var  startY,endY,top;

	function touchStart(event) {
		$('.pulse3').hide();
		var touch = event.touches[0];
		startY = touch.pageY;
		top = $('#' + obj).offset().top;
	}

	function touchMove(event) {
		var touch = event.touches[0];

		endY = touch.pageY;
		var chaY = Number(startY) - endY;
		var m = parseInt(chaY / 3);
		var tops = 124.5 - m;
		if (chaY > 0 && chaY < 18) {
			$('#' + obj).css({
				'margin-top': tops + "%",
			})
		}
	}
	function touchEnd(event) {
		var chaY = Number(startY) - endY;
		if (chaY > 5 && chaY < 90) {
			pageSixOpertion();
			$('#' + obj).css({
				'margin-top': '124.5%'
			})

		} else {
			$('#' + obj).css({
				'margin-top': '124.5%'
			})
		}
		 startY = endY = top = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}

// 彩虹
function moveCai(obj) {
	var startY, endY, top;
	function touchStart(event) {
		$('.pulse3').hide();
		var touch = event.touches[0];
		startY = touch.pageY;
		top = $('#' + obj).offset().top;
	}

	function touchMove(event) {
		var touch = event.touches[0];
		endY = touch.pageY;
		var chaY = endY - Number(startY);
		var m = parseInt(chaY / 3);
		var tops = 114 + m;
		if (chaY > 0 && chaY < 18) {
			$('#' + obj).css({
				'margin-top': tops + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaY = endY - Number(startY);
		if (chaY > 5 && chaY < 90) {
			pageSixOpertion()
			$('#' + obj).css({
				'margin-top': '114%'
			})

		} else {
			$('#' + obj).css({
				'margin-top': '114%'
			})
		}
		 startY  = endY = top  = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}



moveHong('f-move-1');
moveGreen('f-move-3');
moveGreenTwo('ff-move-1');
movezi('ff-move-2');
moveCheng('fs-move-1');
moveCai('fs-move-2');


// 阻止默认事件(水果切换)
function stopMove(id) {
	document.getElementById(id).addEventListener("touchstart", function(e) {
		e.preventDefault();
	}, false);
}
stopMove("second");
stopMove("fourth");
stopMove("six");




// 页面2 水果切换 触发操作
function pageTwoOperation() {
	$('.section').hide();
	$('.third').show();
	$('#change-f-2').addClass('slideInLeft');
	$('#change-f-1').addClass('slideInLeft2');
	var hong_img = $('.f-flash');
	var img_urls = 'images/hong/';
	var xz = $('#hm-wash');
	setTimeout(function() {
		console.log(hong.length)
		for (var i = 1; i < hong.length; i++) {

			(function(i) {
				setTimeout(function() {
					hong_img.prop('src', img_urls + hong[i - 1] + '.png');
					xz.prop('src', AD.img_url + data[i - 1]);
					if (i === hong.length-1) {
						setTimeout(function(){
							$('.section').hide();
							$('.fourth').show();
						},AD.nextPageTime)
						
					}
				}, i * AD.showTime);
			})(i);
		}
	}, AD.amiStartTime)
}
// 页面4 水果切换 触发操作
function pageFourOperation() {
	$('.section').hide();
	$('.five').show();
	$('#change-five-2').addClass('slideInUp');
	$('#change-five-1').addClass(' slideInUps');
	var zi_img = $('.f-flash3');
	var img_urls_zi = 'images/zi/';
	var xz = $('#hm-wash-five');
	// 此处 复用 hong
	setTimeout(function() {
		for (var i = 1; i < hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					zi_img.prop('src', img_urls_zi + hong[i - 1] + '.png');
					xz.prop('src', AD.img_url + data[i - 1]);
					if (i === hong.length-1) {
						setTimeout(function(){
								$('.section').hide();
							$('.six').show();
						},AD.nextPageTime)
						
					
					}
				}, i * AD.showTime);
			})(i);
		}
	}, AD.amiStartTime)
}
// 页面6 水果切换 触发操作
function pageSixOpertion(){
	$('.section').hide();
	$('.seven').show();
	var huang_img = $('.f-flash7');
	var img_urls_huang = 'images/huang/';
	var hong_img = $('.f-flash7-h');
	var img_urls_hong = 'images/hong/';
	setTimeout(function() {
		for (var i = 1; i <= hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					huang_img.prop('src', img_urls_huang + hong[i - 1] + '.png');
					hong_img.prop('src', img_urls_hong + hong[i - 1] + '.png');
					$('#hm-wash-seven').prop('src', 'images/shower/' + hong[i - 1] + '.png');
					if (i === hong.length-1) {
						setTimeout(function() {
							$('.fruit-div').show();
							$('.mengban-div').show();
							$('#mengban-img').addClass('bounceInDown');
							
							if (AD.clickNum === 3) {
								$('.btn-div-t').hide();
								$('.download-game-only').show().addClass('bounceInDown');
							}else{
								$('.btn-div-t').show();
								$('.btn-div-t').addClass('bounceInDown');
							}
						}, AD.nextPageTime)
					}
				}, i * AD.showTime);
			})(i);
		}
	}, AD.amiStartTime)
}


							