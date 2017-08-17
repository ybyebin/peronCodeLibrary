$(document).ready(function () {
	$(".xiaobai").addClass("xiaobaimove");
	var numberten = 0;
	var numberone = 0;
	var timeone = setInterval(function () {
		numberone++
		if (numberten > 9 && numberone > 6) {
			clearInterval(timeone);
			return;
		}
		numberone = numberone + 3;
		numberone = numberone % 10;
		$(".num_digit").attr("src", "./image/num_" + numberone + ".png");
	}, 100)

	var timeten = setInterval(function () {
		numberten++
		if (numberten < 10) {
			$(".num_ten").attr("src", "./image/num_" + numberten + ".png");
		} else {
			clearInterval(timeten)
		}
	}, 400)
	//监听加载状态改变
	document.onreadystatechange = completeLoading;
	//加载状态为complete时移除loading效果
	function completeLoading() {
		if (document.readyState == "complete") {
			$(".section").find("img").addClass('animated');
			$(".section").find("img").css('opacity', '0');
			//设置fullpage页面布局
			setTimeout(function () {
				$('#fullpage').fullpage({
					// 设置背景色
					// sectionsColor: ['#ffffff', '#2AB561', '#DE8910', '#16BA9D', '#ffffff'],
					afterLoad: function (anchorLink, index) {
						$('.section').removeClass('current');
						// 延时100毫秒执行
						setTimeout(function () {
							$('.section').eq(index - 1).addClass('current');
							// indexs = index + 1;
							$(".section").eq(index).find('img').eq(0).attr("src", "./image/" + index + ".gif");
						}, 100);
					},
					onLeave: function (index, nextIndex, direction) {
						// $("#bgagain")[0].play();
					}
				});

				$(".num_digit").attr("src", "./image/num_0.png");
				$(".num_ten").attr("src", "./image/num_0.png");
				$(".num_hundreds").removeClass("num_hundreds");
				setTimeout(function () {
					$('#loading').hide();
				}, 100)
			}, 4000)
		}
	}

	$.ajax({
		type: "get",
		async: true,
		url: "http://partner.qianlong.com/chart/api/cshare",
		dataType: "jsonp",
		data: {
			"weburl": location.href.split("#")[0]
		},
		success: function (json) {
			wx.config({
				debug: false,
				appId: json.appId,
				timestamp: json.timestamp,
				nonceStr: json.nonceStr,
				signature: json.signature,
				jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
			});
		},
		error: function () {
			console.log("share error");
		}
	});
	wx.ready(function () {
		var obj_co = {
			title: "俺们留不住青春，还留不住童心嘛？",
			link: window.location.href,
			imgUrl: "http://comic.qianlong.com/zt/liuyi201706/image/share.jpg",
			success: function () {
			},
			cancel: function () { }
		},
			obj_co_desc = {
				desc: "如果你不开心，不妨调侃一下生活中的疲惫，儿童节快乐！"
			},
			obj_timeline = $.extend({}, obj_co),
			obj_appmsg = $.extend({}, obj_co_desc, obj_co),
			obj_qq = $.extend({}, obj_co_desc, obj_co),
			obj_wb = $.extend({}, obj_co_desc, obj_co),
			obj_qzone = $.extend({}, obj_co_desc, obj_co);

		wx.onMenuShareTimeline(obj_timeline);
		wx.onMenuShareAppMessage(obj_appmsg);
		wx.onMenuShareQQ(obj_qq);
		wx.onMenuShareWeibo(obj_wb);
		wx.onMenuShareQZone(obj_qzone);


	});

	wx.error(function (res) {
		alert(res.errMsg);
	});
})

$(function () {
	var obj = {};
	obj.index = 0;
	obj.audio = function () {
		if (obj.index == 0) {
			$("audio")[1].pause();
			obj.index = 1;
			$("#audio_btn").removeClass('_Animate');
		} else {
			$("audio")[1].play();
			obj.index = 0;
			$("#audio_btn").addClass('_Animate');
		};
	};
	$('#audio_btn').on('click', function () {
		obj.audio();
	});
});


$(function () {
	function load (){
		var _beforeY = 0,
			_afterY = 0,
			_chaY = 0;
			$('.section').on('touchstart',function () {
				touch();
			});
			$('.section').on('touchend',function () {
				touch();
			});
	   function touch (event){
	      var event = event || window.event;
	      switch(event.type){
            case "touchstart":
					_beforeY = event.touches[0].clientY ;
                break;
            case "touchend":
					_afterY = event.changedTouches[0].clientY;
					_chaY =Math.abs(_afterY-_beforeY);
					if (_chaY>30) {
						$("#bgagain")[0].play();
					}
               break;
            case "touchmove":
                event.preventDefault();
                break;
	      }
    	}
	};
	load ();
	$('body').one('touchstart',function () {
		$('#_bgMusic')[0].play();
	});
})
