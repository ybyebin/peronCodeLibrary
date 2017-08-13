$(function() {
	var loading = $('.progress');
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
});
var srcs = 'data:image/png;base64,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'
var hand1 = '<img class="pulse pulse2" src="'+srcs+'">';
var hand2 = '<img class="pulse pulse2" src="'+srcs+'">';
var hand3 = ' <img class="pulse pulse3" src="'+srcs+'">';
$('#second').append(hand1);
$('#fourth').append(hand2);
$('#six').append(hand3);

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
	// 'ws06.png',
	// 'ws07.png',
	'ws08.png',
	// 'ws09.png',
	// 'ws10.png',
	// 'ws11.png',
	// 'ws12.png',
	'ws13.png',
	// 'ws14.png',
	'ws39.png',
	// 'ws15.png',
	// 'ws16.png',
	// 'ws17.png',
	// 'ws18.png',
	// 'ws19.png',
	// 'ws20.png',
	// 'ws21.png',
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
	nextPageTime:400,//动画完胜切换页面延时,
	moveMax:35, //最大移动距离
	changePage: function() {
		$('.section').hide();
		$('.second').show();
	},
	downGame:function(){

	}
	
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
	$('.f-flash .f-flash3 .f-flash7 .f-flash7-h').prop('src', 'images/zi/17.png');

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
	AD.downGame();
},false);
getDom('down-game2').addEventListener("touchend", function(e){
	AD.downGame();
},false);

// 红色
function moveHong(obj) {
	var startX, endX, left;
	var objs = $('#'+obj);
	function touchStart(event) {
		$('.pulse1').hide();
		var touch = event.touches[0];
		startX = touch.pageX;
		left = $('#' + obj).offset().left;
		objs.css('z-index',String(20+AD.clickNum+1));
	}
	function touchMove(event) {
		var touch = event.touches[0];
		endX = touch.pageX;
		var chaX = endX - Number(startX);
		var m = parseInt(chaX / 3);
		var lefts = 10 - m;
		if (chaX > 0 && chaX < AD.moveMax) {
			objs.css({
				'margin-left': '-' + lefts + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaX = endX - Number(startX);
		if (chaX > 5 && chaX < 90) {
			pageTwoOperation();
			objs.css({
				'margin-left': '-10%'
			});
		} else {
			objs.css({
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
	var objs = $('#'+obj);
	function touchStart(event) {
		$('.pulse1').hide();
		var touch = event.touches[0];
		// startY = touch.pageY;
		startX = touch.pageX;
		// top = $('#' + obj).offset().top;
		left = $('#' + obj).offset().left;

		objs.css('z-index',String(20+AD.clickNum+1));
	}
	function touchMove(event) {
		var touch = event.touches[0];
		endX = touch.pageX;
		// endY = touch.pageY;
		var chaX = Number(startX) - endX;
		console.log('chaX:' + chaX);
		var m = parseInt(chaX / 3);
		var lefts = 1 - m;
		if (chaX > 0 && chaX < AD.moveMax) {
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
	var objs = $('#'+obj);

	function touchStart(event) {
		$('.pulse2').hide();
		var touch = event.touches[0];
		startY = touch.pageY;

		top = $('#' + obj).offset().top;

		objs.css('z-index',String(20+AD.clickNum+1));
	}
	function touchMove(event) {
		var touch = event.touches[0];
		
		endY = touch.pageY;
	
		var chaY = endY - Number(startY);
		var m = parseInt(chaY / 3);
		var tops = 114 + m;
		if (chaY > 0 && chaY < AD.moveMax) {
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
	var objs = $('#'+obj);

	function touchStart(event) {
		$('.pulse2').hide();
		var touch = event.touches[0];
		startY = touch.pageY;
		startX = touch.pageX;

		top = $('#' + obj).offset().top;
		left = $('#' + obj).offset().left;
		objs.css('z-index',String(20+AD.clickNum+1));
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
		if (chaY > 0 && chaY < AD.moveMax) {
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
	var objs = $('#'+obj);

	function touchStart(event) {
		$('.pulse3').hide();
		var touch = event.touches[0];
		startY = touch.pageY;
		top = $('#' + obj).offset().top;

		objs.css('z-index',String(20+AD.clickNum+1));
	}

	function touchMove(event) {
		var touch = event.touches[0];

		endY = touch.pageY;
		var chaY = Number(startY) - endY;
		var m = parseInt(chaY / 3);
		var tops = 124.5 - m;
		if (chaY > 0 && chaY < AD.moveMax) {
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
	var objs = $('#'+obj);

	function touchStart(event) {
		$('.pulse3').hide();
		var touch = event.touches[0];
		startY = touch.pageY;
		top = $('#' + obj).offset().top;

		objs.css('z-index',String(20+AD.clickNum+1));
	}

	function touchMove(event) {
		var touch = event.touches[0];
		endY = touch.pageY;
		var chaY = endY - Number(startY);
		var m = parseInt(chaY / 3);
		var tops = 114 + m;
		if (chaY > 0 && chaY < AD.moveMax) {
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
		hong_img.addClass('red-ani');
		for (var i = 1; i < hong.length; i++) {
			(function(i) {
				setTimeout(function() {
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
		zi_img.addClass('purple-ani');
		for (var i = 1; i < hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					
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
	// var img_urls_huang = 'images/huang/';
	var hong_img = $('.f-flash7-h');
	// var img_urls_hong = 'images/hong/';
	setTimeout(function() {
		hong_img.addClass('red-ani');
		huang_img.addClass('yellow-ani');
		
		for (var i = 1; i <= hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					$('#hm-wash-seven').prop('src', 'images/shower/' + hong[i - 1] + '.png');
					if (i === hong.length) {
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
