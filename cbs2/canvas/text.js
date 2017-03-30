var widths;
$(function() {
	widths = Number($('#canvas').width());
	// // var svg = document.getElementById('canvas');
	// $('#canvas').css('width','1144px');
	$('#canvas').css('height', widths * 9 / 16 + 'px');
	// // canvaswidth =Number($('#canvas').width());
	$('#myBgimage').css('width', widths + 'px');
	$('#myBgimage').css('height', widths * 9 / 16 + 'px');
	// 	// $('#canvas').css('width',canvaswidth+'px');
	// 	// $('#canvas').css('height',canvaswidth*9/16 + 'px');
	// 	// $('#canvas').css('min-width',canvaswidth);
	// 	// $('#canvas').css('min-width',canvaswidth);
	// 	var winW =Number($(window).width());
	// if (winW > 1200) {
	// 	$('.head').css('min-width',winW+'px');
	// 	$('.head-tool').css('min-width',winW+'px');
	// 	$('.content-canvas').css('min-width',winW+'px');
	// 	$('#canvas').css('width',canvaswidth);

	// }
	// setTimeout(function(){

	// 	$('#canvas').css('width',widths+'px');
	// 	$('#canvas').css('height',widths*9/16 + 'px');
	// 	$('#myBgimage').css('width',widths+'px');
	// 	$('#myBgimage').css('height',widths*9/16 + 'px');
	// 	var svgTags = document.querySelectorAll('svg');
	// 	for (var i = 0; i < svgTags.length; i++) {
	// 		var svgTag = svgTags[i];
	// 		var wid = $('#canvas').width();
	// 		var hei = $('#canvas').height();
	// 		console.log('高度:' + hei)
	// 		$(svgTag).css('width',widths+'px');
	// 		$(svgTag).css('height',widths*9/16 + 'px');
	// 		// $(svgTag).css('background-color','yellow');
	// 		imageCanvas.setZoom(imageCanvas.getZoom()*Number(widths/1144),true);
	// 		// console.log('svg:'+$(svgTag).width())
	// 	}
	// },2000)
	// console.log()
	// setTimeout(function(){
	// 	var svgTags = document.querySelectorAll('svg');
	// 	for (var i = 0; i < svgTags.length; i++) {
	// 	var svgTag = svgTags[i];
	// 	console.log('查看:' + svgTag.clientWidth)
	// 	;
	// 	$(svgTag).css('width','200px');
	// 	console.log('呵呵'+$(svgTag).width())
	// 		// var c = document.createElement('canvas');
	// 		// c.width = svgTag.clientWidth;
	// 		// c.height = svgTag.clientHeight;
	// }
	// },100)

	// }
	// console.log('查看:' + svg.getAttribute('height'));
	// console.log('查看:'+JSON.stringify($('svg'),null,2) );
	// $('#canvas').css('width',Number($('#canvas').width()) + 'px');
	// $('#canvas').css('min-width',Number($('#canvas').width()) + 'px');
	// $('#canvas').css('height',Number($('#canvas').width())*9/16 + 'px')
	// var ad = 'img/';
	// setTimeout(function(){
	// 	$('#canvas img').attr('src','img/1.jpg')
	// 	// $('#canvas').css('background-image','url('+ad+'1.jpg)')
	// },2000);
	// 
	// 
	// 
	// 
	// 
	
});
var canvaswidth;


// window.onresize = resizeBannerImage; //当窗口改变宽度时执行此函数
function resizeBannerImage() {
	// var winW = $(window).width();
	// console.log('查看:'+winW)

	var width_r = $('#canvas').width();

	$('#canvas').css('height', width_r * 9 / 16 + 'px');
	var height_r = width_r * 9 / 16
	$('#myBgimage').css('width', $('#canvas').width() + 'px');
	$('#myBgimage').css('height', height_r + 'px');

	var svgTags = document.querySelectorAll('svg');
		for (var i = 0; i < svgTags.length; i++) {
			var svgTag = svgTags[i];
			$(svgTag).css('width', width_r);
			$(svgTag).css('height', height_r);
		}
		imageCanvas.setZoom(1)
		imageCanvas.setZoom(imageCanvas.getZoom()*Number(0.99),true);

		 // app = new example.Application();
	 // canvas = app.view; //主画布
	var writer = new draw2d.io.json.Writer();
	writer.marshal(imageCanvas, function(json) {
		for (var i in json) {
			if (json[i].userData.types === "LineComponent") {
				console.log(json[i].vertex);
				var localtionArray = json[i].vertex;
				for (var j = 0; j < localtionArray.length; j++) {
					json[i].vertex[j].x = localtionArray[j].x * width_r/widths;
					json[i].vertex[j].y = localtionArray[j].y * height_r/(widths * 9 / 16);
				}
			} else {
				json[i].x = json[i].x * width_r / widths;
				json[i].y = json[i].y * height_r / (widths * 9 / 16);
				json[i].width = json[i].width * width_r / widths;
				json[i].height = json[i].height * height_r / (widths * 9 / 16);
				console.log("第" + i + "个数据" + JSON.stringify(json[i], null, 2))

			};
		}

		// var svgTags = document.querySelectorAll('svg');
		// for (var i = 0; i < svgTags.length; i++) {
		// 	var svgTag = svgTags[i];
		// 	$(svgTag).css('width', width_r);
		// 	$(svgTag).css('height', height_r);
		// 	// svgTag.setAttribute("viewBox", "0 0 800 800");
		// }
		imageCanvas.clear();
		var reader = new draw2d.io.json.Reader();
		reader.unmarshal(imageCanvas, json);
		widths = width_r;

	});

	var writer = new draw2d.io.json.Writer();
	writer.marshal(imageCanvas, function(json) {
		for (var key in json) {
			//获得ID对应的节点对象
			var node = getCanvasNode(json[key].id)
			if (node.userData.ShowCaption) {
				//标题	
				node.label.setVisible(true);
				node.label.setText(node.userData.Caption);
				node.label.repaint();
			}
			// 节点闪烁
			if (node.userData.Blinking) {
				node.startTimer(1000);
			}

			if (node.userData.types === 'imageComponent') {
				// node.image.setPath(node.userData.picture);
				node.image.setHeight(node.getHeight());
				node.image.setWidth(node.getWidth());
			}
			switch (node.alpha) {
				case 0:
					node.setAlpha(0);
					if (node.image) {
						node.image.setAlpha(0);
					}
					if (node.label) {
						node.label.setAlpha(0);
					}
					break;
			}
			node.repaint();
		}
	});

}


//在画布中获取要被更改样式的控件
function getCanvasNode(id) { //   id  是控件的唯一ID
	var node = imageCanvas.getFigure(id);
	var nodeLine = imageCanvas.getLine(id);
	if (node !== null) {
		return node;
	} else if (nodeLine !== null) {
		return nodeLine;
	}
}