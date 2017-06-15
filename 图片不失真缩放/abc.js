function alertWin(title, msg, w, h) {
	var titleheight = "22px"; // 提示窗口标题高度 
	var bordercolor = "#666699"; // 提示窗口的边框颜色 
	var titlecolor = "#FFFFFF"; // 提示窗口的标题颜色 
	var titlebgcolor = "#666699"; // 提示窗口的标题背景色 
	var bgcolor = "#FFFFFF"; // 提示内容的背景色 

	var iWidth = document.documentElement.clientWidth;
	var iHeight = document.documentElement.clientHeight;
	var bgObj = document.createElement("div");
	bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:100%;height:100%;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;";
	document.body.appendChild(bgObj);

	var msgObj = document.createElement("div");
	msgObj.style.cssText = "position:absolute;font:11px '宋体';top:" + (iHeight - h) / 2 + "px;left:" + (iWidth - w) / 2 + "px;width:6rem;height:10rem;text-align:center;border:1px solid " + bordercolor + ";background-color:" + bgcolor + ";padding:1px;line-height:22px;z-index:102;";
	msgObj.id = 'touch';
	document.body.appendChild(msgObj);

	var table = document.createElement("table");
	msgObj.appendChild(table);
	table.style.cssText = "margin:0px;border:0px;padding:0px;";
	table.cellSpacing = 0;
	var tr = table.insertRow(-1);
	var titleBar = tr.insertCell(-1);
	titleBar.style.cssText = "width:100%;height:" + titleheight + "px;text-align:left;padding:3px;margin:0px;font:bold 13px '宋体';color:" + titlecolor + ";border:1px solid " + bordercolor + ";cursor:move;background-color:" + titlebgcolor;
	titleBar.style.paddingLeft = "10px";
	titleBar.innerHTML = title;
	var moveX = 0;
	var moveY = 0;
	var moveTop = 0;
	var moveLeft = 0;
	var moveable = false;
	var docMouseMoveEvent = document.onmousemove; //www.w3cschool.cn w3cschool
	var docMouseUpEvent = document.onmouseup;


	var objs = msgObj;
	touchFunc(objs, 'start', function() {
	var dd = event.touches[0];
	moveLeft = parseInt(objs.getBoundingClientRect().left);
	moveTop = parseInt(objs.getBoundingClientRect().top);

	touleft = dd.pageX;
	touchtop = dd.pageY;
	console.log(moveTop)
	console.log(moveLeft)
	 console.log(dd.pageX )
	console.log(dd.pageY )

});

	touchFunc(objs, 'move', function() {
	var dd = event.touches[0];
	// console.log(dd.pageX )
	// console.log(dd.pageY )
	var x = moveLeft + dd.pageX - touleft;
	var y = moveTop + dd.pageY - touchtop;



	if (x > 0 && y > 0 && x < (document.documentElement.clientWidth - parseInt(objs.style.width)) && y < (document.documentElement.clientHeight - parseInt(objs.style.height))) {
		objs.style.left = x + "px";
		objs.style.top = y + "px";
	}


});
touchFunc(objs, 'end', function() {

})



	titleBar.onmousedown = function() {
		var evt = getEvent();
		moveable = true;
		moveX = evt.clientX;
		moveY = evt.clientY;
		moveTop = parseInt(msgObj.style.top);
		moveLeft = parseInt(msgObj.style.left);

		document.onmousemove = function() {
			if (moveable) {
				var evt = getEvent();
				var x = moveLeft + evt.clientX - moveX; //www.w3cschool.cn w3cschool
				var y = moveTop + evt.clientY - moveY;
				if (x > 0 && (x + w < iWidth) && y > 0 && (y + h < iHeight)) {
					msgObj.style.left = x + "px";
					msgObj.style.top = y + "px";
				}
			}
		};
		document.onmouseup = function() {
			if (moveable) {
				document.onmousemove = docMouseMoveEvent; //www.w3cschool.cn w3cschool
				document.onmouseup = docMouseUpEvent;
				moveable = false;
				moveX = 0;
				moveY = 0;
				moveTop = 0;
				moveLeft = 0;
			}
		};
	}

	var closeBtn = tr.insertCell(-1);
	closeBtn.style.cssText = "cursor:pointer; padding:2px;background-color:" + titlebgcolor;
	closeBtn.innerHTML = "<span style='font-size:15pt; color:" + titlecolor + ";'>×</span>";
	closeBtn.onclick = function() {
		document.body.removeChild(bgObj);
		document.body.removeChild(msgObj);
	}
	var msgBox = table.insertRow(-1).insertCell(-1);
	msgBox.style.cssText = "font:10pt '宋体';";
	msgBox.colSpan = 2;
	msgBox.innerHTML = msg;

	// 获得事件Event对象，用于兼容IE和FireFox 
	function getEvent() {
		return window.event || arguments.callee.caller.arguments[0];
	}
}



var touchFunc = function(obj, type, func) {
	//滑动范围在5x5内则做点击处理，s是开始，e是结束
	var init = {
		x: 5,
		y: 5,
		sx: 0,
		sy: 0,
		ex: 0,
		ey: 0
	};
	var sTime = 0,
		eTime = 0;
	type = type.toLowerCase();

	obj.addEventListener("touchstart", function() {
		sTime = new Date().getTime();
		init.sx = event.targetTouches[0].pageX;
		init.sy = event.targetTouches[0].pageY;
		init.ex = init.sx;
		init.ey = init.sy;
		if (type.indexOf("start") != -1) func();
	}, false);

	obj.addEventListener("touchmove", function() {
		event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动
		init.ex = event.targetTouches[0].pageX;
		init.ey = event.targetTouches[0].pageY;
		if (type.indexOf("move") != -1) func();
	}, false);

	obj.addEventListener("touchend", function() {
		var changeX = init.sx - init.ex;
		var changeY = init.sy - init.ey;
		if (Math.abs(changeX) > Math.abs(changeY) && Math.abs(changeY) > init.y) {
			//左右事件
			if (changeX > 0) {
				if (type.indexOf("left") != -1) func();
			} else {
				if (type.indexOf("right") != -1) func();
			}
		} else if (Math.abs(changeY) > Math.abs(changeX) && Math.abs(changeX) > init.x) {
			//上下事件
			if (changeY > 0) {
				if (type.indexOf("top") != -1) func();
			} else {
				if (type.indexOf("down") != -1) func();
			}
		} else if (Math.abs(changeX) < init.x && Math.abs(changeY) < init.y) {
			eTime = new Date().getTime();
			//点击事件，此处根据时间差细分下
			if ((eTime - sTime) > 300) {
				if (type.indexOf("long") != -1) func(); //长按
			} else {
				if (type.indexOf("click") != -1) func(); //当点击处理
			}
		}
		if (type.indexOf("end") != -1) func();
	}, false);
};

var objs = document.getElementById('touch');
// touchFunc(objs, 'start', function() {
// 	var dd = event.touches[0];
// 	moveLeft = parseInt(objs.getBoundingClientRect().left);
// 	moveTop = parseInt(objs.getBoundingClientRect().top);

// 	touleft = dd.pageX;
// 	touchtop = dd.pageY;
// 	// console.log(moveTop)
// 	// console.log(moveLeft)
// 	//  console.log(dd.pageX )
// 	// console.log(dd.pageY )

// });

// touchFunc(objs, 'move', function() {
// 	var dd = event.touches[0];
// 	// console.log(dd.pageX )
// 	// console.log(dd.pageY )
// 	var x = moveLeft + dd.pageX - touleft;
// 	var y = moveTop + dd.pageY - touchtop;



// 	if (x > 0 && y > 0 && x < (document.documentElement.clientWidth - parseInt(objs.style.width)) && y < (document.documentElement.clientHeight - parseInt(objs.style.height))) {
// 		objs.style.left = x + "px";
// 		objs.style.top = y + "px";
// 	}


// });
// touchFunc(objs, 'end', function() {

// })