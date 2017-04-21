$(document).ready(function () {
	// gif图片缓存
	var imgarr = ['../image/gif2.gif'];
	//loading显示进度条
	var i = 0;
	var setinnerNum = setInterval(function () {
		var loaded = document.getElementsByClassName('loaded')[0].offsetWidth;
		var loadall = document.getElementsByClassName('progress_bar')[0].offsetWidth;
		var loadNum = Math.floor(loaded / loadall * 100)
		$('.progress_num').html(loadNum + '%');
		if (loadNum == 100) {
			console.log('加载完成');
			clearInterval(setinnerNum);
		}
		// console.log(i++)
	}, 10);

	//监听加载状态改变
	document.onreadystatechange = completeLoading;
	//加载状态为complete时移除loading效果
	function completeLoading() {
		if (document.readyState == "complete") {
			setTimeout(function () {
				var loadall = document.getElementsByClassName('progress_bar')[0].offsetWidth;
				$(".loaded").animate({ width: loadall + 'px' }, 100, function () { })
				setTimeout(function () {
					//设置fullpage页面布局
					$('#fullpage').fullpage({
						// 设置背景色
						// sectionsColor: ['#ffffff', '#2AB561', '#DE8910', '#16BA9D', '#ffffff'],
						afterLoad: function (anchorLink, index) {
							$('.section').removeClass('current');
							// 延时100毫秒执行
							setTimeout(function () {
								$('.section').eq(index - 1).addClass('current');
								// $('.gif').attr('src', './image/noimage.png');
								$('.gif').css({'opacity':'0'});
								// $('.section').eq(index - 1).find('.gif').attr('src', './image/gif' + index + '.gif?' + Math.random())
								$('.section').eq(index - 1).find('.gif').attr('src', './image/gif' + index + '.gif')
								$('.section').eq(index - 1).find('.gif').css({'opacity':1});
							}, 100);
						}
					});
					$('#loading').hide();
				}, 500);
			}, 2000);
		}
	}
	// 音乐按钮控制
	var obj={
		index:0,
		audio:function(){
			if (obj.index == 0) {
				$("audio")[0].pause();
				obj.index = 1;
				$("#audio_btn").removeClass('Animate');
			}else{
				$("audio")[0].play();
				obj.index = 0;
				$("#audio_btn").addClass('Animate');
			};
		}
	};
	$('#audio_btn').on('click',function(){
		obj.audio();
	});

})
