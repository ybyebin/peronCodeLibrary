$(function() {

	var loading = $('.progress');
	var huang = $('#huang-load');
	var hongs = $('#hongs-load');
	var zi = $('#zi-load');
	for (var i = 2; i <= 9; i++) {
		(function(i) {
			setTimeout(function() {
				var widths = 1.1625*i + 'rem';
				loading.css('width',widths)
				// loading.text(20 * i + Math.floor(Math.random() * 10) + '%');
				if (i === 9) {
					$('.section').hide();
					$('.first').show();
				}
				console.log(i);
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
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
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
	img_url: 'images/wash01/',
	pageflag: 'first',
	showTime:200,
	loadAllImage: function() {

	},
	changePage: function() {
		switch (AD.pageflag) {
			case 'first':
				$('.section').hide();
				$('.second').show();
				break;
		}
	},
}

$('.first').on('click', function(e) {
	AD.changePage();
});

document.getElementById("hand-click").addEventListener("touchend", function(e){

 	$('.section').hide();
	$('.third').show();

	$('#change-f-2').addClass('slideInLeft');
	$('#change-f-1').addClass('slideInLeft2');
	var hong_img = $('.f-flash');
	var img_urls = 'images/hong/';
	var xz = $('#hm-wash');
	setTimeout(function() {
		for (var i = 1; i < hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					hong_img.prop('src', img_urls + hong[i - 1] + '.png');
					xz.prop('src', AD.img_url + data[i - 1]);
					if (i === 9) {
						$('.section').hide();
						$('.fourth').show();
					}
				}, i * AD.showTime);
			})(i);
		}
	}, 700)
 }, false);
// document.getElementById("hand-click").addEventListener("touchstart", function(e){
// 	e.preventDefault();
// 	},false);

document.getElementById("four-hand-click").addEventListener("touchend", function(e){
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
					if (i === 9) {
						$('.section').hide();
						$('.six').show();
					}
				}, i * AD.showTime);
			})(i);
		}
	}, 700)
},false);

document.getElementById("six-hand-click").addEventListener("touchend", function(e){
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
					if (i === 9) {
						setTimeout(function() {
							$('.fruit-div').show();
							$('.mengban-div').show();
							$('#mengban-img').addClass('bounceInDown');
						}, 600)
					}
				}, i * AD.showTime);
			})(i);
		}
	}, 700)
},false);


// 再玩一次
$('.play-again').click(function() {
	$('.section').hide();
	$('.first').show();
	$('.f-flash').prop('src', 'images/hong/16.png');
	$('.f-flash3').prop('src', 'images/zi/17.png');
	$('.f-flash7').prop('src', 'images/huang/17.png');
	$('.f-flash7-h').prop('src', 'images/hong/16.png');
	$('#hm-wash-seven').prop('src', 'images/shower/0.png');
	$('.fruit-div').hide();
	$('.mengban-div').hide();
	$('#mengban-img').removeClass('bounceInDown');

});
//下载游戏
$('.download-game').click(function() {

});


// $('body').on('touchmove', function (event) {event.preventDefault();});

// document.addEventListener('touchmove', function(e){e.preventDefault()}, false);


function stopPrevent(str){
	document.getElementById(str).addEventListener("touchstart", function(e){
	e.preventDefault();
	},false);
}

stopPrevent('hand-click');
stopPrevent('four-hand-click');
stopPrevent('six-hand-click');
