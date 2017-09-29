$(function() {

	var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
	// adGame.changeLanguage(currentLang, languageType);
	adGame.changeLanguage('en-US', languageType);
	// DefaultLanguage = ''
	var ws = document.documentElement.clientHeight;

	var ww = ws * 750 / 1334;
	document.documentElement.style.fontSize = ww / 15 + "px";
	$('.sec').css('width', ww + 'px');
	$('.progress-bar').addClass('animal');

	setTimeout(function() {
		adGame.changeSec(function() {
			$('.sec-2').show();
			adGame.sec1BodyClick();

		});

	}, 2000)

});


window.onresize = function() {
	var ws = document.documentElement.clientHeight;

	var ww = ws * 750 / 1334;
	document.documentElement.style.fontSize = ww / 15 + "px";
}

var DefaultLanguage = 'enUS';

var languageType = {
	// 汉语
	'zhCN': {

	},
	// 繁体
	'zhTW': {

	},
	// 韩语
	'ko': {

	},
	// 日语
	'ja': {

	},
	// 英语
	'enUS': {
		'sec1': {
			'p1': 'Look',
			'p2': 'Enemy undead army!',
			'p3': 'Soldiers, ready to fight!'
		},
		'typeQB': {
			'sec3P1': 'Knights can destroy enemy',
			'sec3P2': 'formation. Better put',
			'sec3P3': 'them in the front line.'
		},
		'typeBUB': {
			'sec3P1': 'Footmen have high DEF',
			'sec3P2': 'rating. Better put them in',
			'sec3P3': 'the middle of the array.'
		},
		'typeGJS': {
			'sec3P1': 'Archers have high ATK but',
			'sec3P2': 'low DEF rating. Better put',
			'sec3P3': 'them in the rear line.'
		},
		// 引导
		'sec3YinDaoP1': {
			'sec3P1': 'Now put Knights in the',
			'sec3P2': 'array.',
			'sec3P3': ''
		},
		'sec3YinDaoP2': {
			'sec3P1': 'Good! Then footmen.',
			'sec3P2': '',
			'sec3P3': ''
		},
		'sec3YinDaoP3': {
			'sec3P1': 'Finally, Archers!',
			'sec3P2': '',
			'sec3P3': ''
		},
		'sec3YinDaoP4': {
			'sec3P1': 'Now let us crush them!',
			'sec3P2': '',
			'sec3P3': ''
		},
		// 胜利失败
		'result': {
			'win': 'win',
			'fail': 'lose'
		},
		'sec4': {
			'p1': 'The more you conquer,',
			'p2': 'the more you will discover!',
			'p3': 'Are you ready?'
		},
		// 按钮
		btnlangeage: {
			'playAgain': 'Try Again',
			'download': 'Download'
		}

	}
}
var img = {
	'qb': {
		'color': 'images/qb-color.png',
		'noColor': 'images/qb.png'
	},
	'bub': {
		'color': 'images/bub-color.png',
		'noColor': 'images/bub.png'
	},
	'gjs': {
		'color': 'images/gjs-color.png',
		'noColor': 'images/gjs.png'
	}
}

var adGame = {
	clickType: 'qb', //点击顺序   ['骑兵 qb','步兵bub','弓箭兵gjs']  ,
	clickNum: 1,
	alrearyHaveBing: ['sec3-army1-finger', 'sec3-army2-finger', 'sec3-army3-finger'],
	sec3P1: $('.sec3-p1'),
	sec3P2: $('.sec3-p2'),
	sec3P3: $('.sec3-p3'),
	changeSec: function(fun) {
		$('.sec').hide();
		fun();
	},

	// 修改语言-具体
	publicChange: function(language) {

		$('.sec-2-p1').text(language.sec1.p1);
		$('.sec-2-p2').text(language.sec1.p2);
		$('.sec-2-p3').text(language.sec1.p3);

		$('.sec4-p1').text(language.sec4.p1);
		$('.sec4-p2').text(language.sec4.p2);
		$('.sec4-p3').text(language.sec4.p3);

		$('.p-again').text(language.btnlangeage.playAgain);
		$('.p-down').text(language.btnlangeage.download);
		$('.textdownload').text(language.btnlangeage.download);

	},
	// 判断语言
	changeLanguage: function(type, language) {
		switch(type) {
			case 'zh-CN':
				DefaultLanguage = 'zhCN';
				var languages = language.zhCN;
				adGame.publicChange(languages);
				break;
			case 'zh-TW':
				DefaultLanguage = 'zhTW';
				var languages = language.zhTW;
				adGame.publicChange(languages);

				break;
			case 'ko':
				break;
			case 'ko-KR':
				break;
			case 'ja':
				break;
			case 'ja-JP':
				break;
			case 'en-US':
				DefaultLanguage = 'enUS'
				var languages = language.enUS;
				adGame.publicChange(languages);
				break;
			default:
				break;
		}

	},

	// sec1 全局点击
	sec1BodyClick: function() {
		$('.sec-2').on('click', function() {
			adGame.stepMethod1();
		});
	},

	// sec2 全局点击
	sec2BodyClick: function() {

		adGame.sec3P1.text(languageType[DefaultLanguage].typeQB.sec3P1);
		adGame.sec3P2.text(languageType[DefaultLanguage].typeQB.sec3P2);
		adGame.sec3P3.text(languageType[DefaultLanguage].typeQB.sec3P3);
		$('.sec-3').on('click', function() {
			adGame.stepMethod2();
		});

	},

	// step1
	stepOne: function() {
		$('.sec-3').unbind();
		$('.qb-bing').attr('src', img.qb.color);
		$('.bub-bing').attr('src', img.bub.noColor);
		$('.gjs-bing').attr('src', img.gjs.noColor);
		adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P1);
		adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P2);
		adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P3);
		$('.sec3-Bing-finger').show();
		$('.sec3-layer-finger').hide();
		$('.qb-bing').on('click', function() {
			$('.sec3-Bing-finger, .sec-3-layer').hide();
			$('.army3-finger').show();
			$('.qb-bing').unbind();
			$('.set-bing-click1').on('click', function() {
				var _this = $(this);
				_this.data('value', '1');
				_this.data('type', 'sec4-qb-animation');
				_this.data('spantype', 'sec4-qb');
				var ids = '#' + _this.data('id');
				// $(ids).attr('src', 'images/qb-army.png');
				$(ids + ' span').addClass('sec3-qb');

				var arr = adGame.alrearyHaveBing;
				arr.splice(arr.indexOf(_this.data('finger')), 1);
				adGame.stepTwo();
			});
		});
	},
	// step 2
	stepTwo: function() {
		$('.set-bing-click1').unbind();
		$('.army3-finger').hide();

		// 引导  layer
		$('.sec-3-layer').show();
		adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P1);
		adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P2);
		adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P3);

		$('.sec3-Bing-finger').show().addClass('sec3-Bing-finger-step2');

		$('.qb-bing').attr('src', img.qb.noColor);
		$('.bub-bing').attr('src', img.bub.color);
		$('.bub-bing').on('click', function() {
			$('.sec3-Bing-finger, .sec-3-layer').hide();

			adGame.alrearyHaveBing.forEach(function(element) {
				$('.' + element).show();
			});

			$('.bub-bing').unbind();
			$('.set-bing-click1').on('click', function() {
				var _this = $(this);
				console.log(_this.data('value'))
				if(_this.data('value') == '0') {
					_this.data('value', '1');
					_this.data('type', 'sec4-bub-animation');
				    _this.data('spantype', 'sec4-bub');
					var ids = '#' + _this.data('id');
					$(ids + ' span').addClass('sec3-bub');
					// $(ids).attr('src', 'images/bub-army.png');
					var arr = adGame.alrearyHaveBing;
					arr.splice(arr.indexOf(_this.data('finger')), 1);
					adGame.stepThree();
				}

			});
		});

	},
	// step 3
	stepThree: function() {
		$('.set-bing-click1').unbind();
		$('.army3-finger').hide();

		// 引导  layer
		$('.sec-3-layer').show();
		adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P1);
		adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P2);
		adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P3);

		$('.sec3-Bing-finger').show().addClass('sec3-Bing-finger-step3');

		$('.bub-bing').attr('src', img.bub.noColor);
		$('.gjs-bing').attr('src', img.gjs.color);
		$('.gjs-bing').on('click', function() {
			$('.sec3-Bing-finger, .sec-3-layer').hide();

			var clas = adGame.alrearyHaveBing[0];
			console.log(clas)
			switch(clas) {
				case 'sec3-army1-finger':
					$('#div1').data('spantype', 'sec4-gjs');
					$('#div1').data('type', 'sec4-gjs-animation');
					break;
				case 'sec3-army2-finger':
					$('#div2').data('spantype', 'sec4-gjs');
					$('#div2').data('type', 'sec4-gjs-animation');
					break;
				case 'sec3-army3-finger':
					$('#div3').data('spantype', 'sec4-gjs');
					$('#div3').data('type', 'sec4-gjs-animation');
					break;
				default:
					break;
			}
			var ids = '#' + $('.' + clas).data('id');
			console.log('查看：'+ids)
			// $(id).attr('src', 'images/gjs-army.png');
			$(ids + ' span').addClass('sec3-gjs');
			$('.gjs-bing').unbind();
			adGame.stepfour();
		});

	},
	stepfour: function() {
		$('.sec-3-layer, .sec3-layer-finger').show();
		adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P1);
		adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P2);
		adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P3);

		$('.sec-3-layer').on('click', function() {
			adGame.stepMethod3();
		});
	},
	stepFive: function() {
		$('.sec').hide();
		$('.sec-4').show();
		$('.sec-4-yup').addClass('y-up-hide');
		$('.sec-4-ydown').addClass('y-dowm-hide');

		var span_arr = [];
		var arr_anima = [];
		$('.set-bing-click1').each(function(index, ele) {
			console.log($(ele).data('type'));
			span_arr.push($(ele).data('spantype'));
			arr_anima.push($(ele).data('type'));
		});
		$('.sec4-bing-army-div1 span').addClass(span_arr[0]);
		$('.sec4-bing-army-div2 span').addClass(span_arr[1]);
		$('.sec4-bing-army-div3 span').addClass(span_arr[2]);
		

		setTimeout(function() {
			$('.fight-btn').show().on('click', function() {
				$('.sec4-bing-army-div1 span').addClass(arr_anima[0]);
				$('.sec4-bing-army-div2 span').addClass(arr_anima[1]);
				$('.sec4-bing-army-div3 span').addClass(arr_anima[2]);

				$('.sec4-bing-army-div1 ').addClass('invasions-div1');
				$('.sec4-bing-army-div2 ').addClass('invasions-div2');
				$('.sec4-bing-army-div3 ').addClass('invasions-div3');


				$(this).hide();
				setTimeout(function(){
					$('.bg-model,.result-text').show();
				if(span_arr[0] === 'sec4-qb' && span_arr[1] === 'sec4-bub' && span_arr[2] === 'sec4-gjs') {
					$('.rusult-img').attr('src', 'images/win.png').show();
					$('.result-span').text(languageType[DefaultLanguage].result.win).removeClass('result-span-gray');
				} else {
					$('.rusult-img').attr('src', 'images/fail.png').show();
					$('.result-span').text(languageType[DefaultLanguage].result.fail).addClass('result-span-gray');;
				}

					setTimeout(function() {
						$('.sec-4').on('click', function() {
							adGame.stepMethod4();
						});

					}, 1500)
				},1000)

				

			});

		}, 1000)
	},

	stepMethod1: function() {
		$('.yun-up').addClass('y-up-appear');
		$('.yun-down').addClass('y-dowm-appear');

		setTimeout(function() {
			adGame.changeSec(function() {
				$('.sec-3').show();
				$('.sec-3-yup').addClass('y-up-hide');
				$('.sec-3-ydown').addClass('y-dowm-hide');
				$(".sec-2").unbind();
				adGame.sec2BodyClick();
			});
		}, 2000)
	},
	stepMethod2: function() {
		if(adGame.clickType === 'qb') {
			adGame.sec3P1.text(languageType[DefaultLanguage].typeBUB.sec3P1);
			adGame.sec3P2.text(languageType[DefaultLanguage].typeBUB.sec3P2);
			adGame.sec3P3.text(languageType[DefaultLanguage].typeBUB.sec3P3);

			$('.qb-bing').attr('src', 'images/qb.png');
			$('.bub-bing').attr('src', 'images/bub-color.png');

			adGame.clickType = 'bub';
		} else if(adGame.clickType === 'bub') {
			adGame.sec3P1.text(languageType[DefaultLanguage].typeGJS.sec3P1);
			adGame.sec3P2.text(languageType[DefaultLanguage].typeGJS.sec3P2);
			adGame.sec3P3.text(languageType[DefaultLanguage].typeGJS.sec3P3);
			$('.bub-bing').attr('src', 'images/bub.png');
			$('.gjs-bing').attr('src', 'images/gjs-color.png');
			adGame.clickType = 'gjs';
		} else if(adGame.clickType === 'gjs') {
			adGame.stepOne();

		}
	},
	stepMethod3: function() {

		$('.yun-up-3').addClass('y-up-appear');
		$('.yun-down-3').addClass('y-dowm-appear');
		// $('.yun-up-3').addClass('y-up-hide');
		// $('.yun-down-3').addClass('y-dowm-hide');
		$('.sec-3-layer').unbind();
		setTimeout(function() {
			adGame.stepFive();
		}, 2000)
	},
	stepMethod4: function() {
		$('.fight-btn').unbind();
		$('.rusult-img,.result-text').hide();
		$('.sec-tips').show();
		if(adGame.clickNum === 3) {
			$('.sec-tips-1').hide();
			$('.sec-tips-3').show();
		} else {
			$('.sec-tips-1').show();
		}

		$('.sec-4').unbind();
	}
}

// 再玩一次
function playAgain() {
	adGame.clickNum += 1;
	$('body').unbind();

	$('.yun-up').removeClass('y-up-appear');
	$('.yun-down').removeClass('y-dowm-appear');
	$('.sec-3-yup').removeClass('y-up-hide');
	$('.sec-3-ydown').removeClass('y-dowm-hide');
	$('.yun-up-3').removeClass('y-up-appear');
	$('.yun-down-3').removeClass('y-dowm-appear');

	$('.qb-bing').attr('src', 'images/qb-color.png');
	$('.bub-bing').attr('src', 'images/bub.png');
	$('.gjs-bing').attr('src', 'images/gjs.png');
	$('.bing-army-img').attr('src', 'images/17.png');

	$('.sec3-Bing-finger').hide().removeClass('sec3-Bing-finger-step2 sec3-Bing-finger-step3');

	$('.set-bing-click1').each(function(index, ele) {
		$(ele).data('value', '0');
		$(ele).data('type', '');
		$(ele).data('spantype', '');
	});

	$('.sec4-bing-army-div span').removeClass('sec4-qb sec4-bub sec4-gjs sec4-qb-animation sec4-bub-animation sec4-gjs-animation');
	$('.set-bing-click1 span').removeClass('sec3-qb sec3-bub sec3-gjs');
	$('.sec4-bing-army-div1 ').removeClass('invasions-div1');
	$('.sec4-bing-army-div2 ').removeClass('invasions-div2');
	$('.sec4-bing-army-div3 ').removeClass('invasions-div3');
	$('.sec-4-hide').hide();
	adGame.clickType = 'qb';
	adGame.alrearyHaveBing = ['sec3-army1-finger', 'sec3-army2-finger', 'sec3-army3-finger'];
	adGame.changeSec(function() {
		$('.sec-2').show();
		setTimeout(function() {
			adGame.sec1BodyClick();
		}, 1000)
	});
}