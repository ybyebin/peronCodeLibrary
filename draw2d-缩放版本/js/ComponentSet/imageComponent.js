var imagenum = 0;
/** 
 * image 标签
 * @author
 * @extend draw2d.shape.basic.Image
 */
var imageComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "imageComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		// this.setAlpha(0.001);
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path:"images/icon/icon/zidingyi.png",
			// path:"../img/img.png",
			// path: '../images/icon/icon/zidingyi12.svg',
			
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
			name: "自定义图片控件",
			types: "imageComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Caption: "自定义图片控件", //组件标题 组态时/指定引用Tag的Name属性
			ShowCaption: false, // 是否显示组件标题  (待定)
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 0, //访问等级 0~15
			ShowHint: false, //是否显示Hover说明(待定)
			Hint: "", //Hover说明的内容 (待定)
			Tag: {
				tag_id: -1,
				tag_type: -1,
				tag_name: "",
				bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
			},
			value: "",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke: 1,
			BlinkingColor: "#DDDDDD",
			DashArray: "",
			picture: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 1,
				LineColor: "#DDDDDD",
				LineStyle: null,
				Blinking: false,
				picture: "images/icon/icon/zidingyi.png"
			},
			onFalse: {
				LineWidth: 1,
				LineColor: "#DDDDDD",
				LineStyle: null,
				Blinking: false,
				picture: "images/icon/icon/zidingyi.png"
			},
			onAlarm: {
				LineWidth: 1,
				LineColor: "#DDDDDD",
				LineStyle: null,
				Blinking: false,
				picture: "images/icon/icon/zidingyi.png"
			},
			onDisconnected: {
				LineWidth: 1,
				LineColor: "#DDDDDD",
				LineStyle: null,
				Blinking: false,
				picture: "images/icon/icon/zidingyi.png"
			},
		}
		this.attr({
			userData: data
		});


		this.on("click", function() {
			imageDisplayDiv(thiss);

			console.log("图片控件类型")
		});
		this.image.on("click", function() {
			imageDisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			thiss.image.setHeight(thiss.getHeight());
			thiss.image.setWidth(thiss.getWidth());
			$('#comp-width').val(thiss.getWidth());
			$('#comp-height').val(thiss.getHeight());
		});
		// 移动
		this.on("move", function() {
			$('#comp-offsetx').val(thiss.getAbsoluteX());
			$('#comp-offsety').val(thiss.getAbsoluteY());
			$('#tooltips').hide();
		});
		// 悬浮窗
		this.image.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.image.onMouseLeave =  function() {
			$('#tooltips').hide();
		};




		/**
		 *	双击方法----forexample--选择图片
		 */
		this.on("dblclick", function() {
		});
	},

	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;
		setTimeout(function() {
			thiss.setGlow(false);
			thiss.setColor(thiss.getUserData().BlinkingColor);
			thiss.setStroke(thiss.getUserData().BlinkingStroke);
			thiss.setDashArray(thiss.getUserData().DashArray);
		}, 500);
	}

})


function imageDisplayDiv(obj) {
	//重置属性框
	resetAttributeMenu();
	// 隐藏该控件没有的属性
	$('.div-basic-hide').hide();
	$('.div-title').show();
	$('.div-image').show();
	$('.div-fill').hide();
	setCustomImageComponentStyleInEditFiled(obj) 
}

// 设置 自定义图片控件在编辑框的属性值
function setCustomImageComponentStyleInEditFiled(thiss) {
	checkComponentTagidIsNull(); //判断前一个控件是否正确绑定Tag

	/*
	 * 暂存该控件的id
	 * 用于刷新控件的属性
	 */
	$("#spanid").html(thiss.id);
	checkThisComponentIsTrue(thiss); //检查本控件的Tag是否正确(如果已经绑定)
	// =================================基本======================
	console.log("ID:" + thiss.id)

	// 组件名称   name(用户输入)
	$('#comp-name').val(thiss.getUserData().name);


	//组件描述   Description
	$('#comp-desc').val(thiss.getUserData().Description);


	//组件宽度   width
	$('#comp-width').val(thiss.getWidth());


	// 组件高度   height
	$('#comp-height').val(thiss.getHeight());


	//组件位置 X轴位置   x
	$('#comp-offsetx').val(thiss.getAbsoluteX());


	//组件位置 Y轴位置   y
	$('#comp-offsety').val(thiss.getAbsoluteY());

	//组件旋转角度 Rotation  
	$('#comp-rotation').val(thiss.getRotationAngle());
	// console.log('旋转角度:'+thiss.getRotationAngle())

	// 是否显示标题 ShowCaption 
	switch (thiss.getUserData().ShowCaption) {
		case true:
			$('#comp-title').iCheck('check');
			$('#comp-title-val').removeAttr("readonly");
			break;
		case false:
			$('#comp-title').iCheck('uncheck');
			$('#comp-title-val').attr("readonly", "readonly");
			break;
	}

	// 标题内容 Caption  			 
	$('#comp-title-val').val(thiss.getUserData().Caption);

	//隐藏组件 Visible  
	console.log('隐藏组件:' + thiss.getUserData().Visible)
	switch (thiss.getUserData().Visible) {
		case true:
			$('#comp-hides').iCheck('uncheck');
			break;
		case false:
			$('#comp-hides').iCheck('check');
			break;
	}
	//是否不可用 Enable  
	switch (thiss.getUserData().Enable) {
		case true:
			$('#comp-unabel').iCheck('check');
			break;
		case false:
			$('#comp-unabel').iCheck('uncheck');
	}
	//访问等级  AccessLevel 
	$('#comp-level').text(thiss.getUserData().AccessLevel);

	//是否显示hover  ShowHint 
	switch (thiss.getUserData().ShowHint) {
		case true:
			$('#comp-hover').iCheck('check');
			$('#comp-hover-val').removeAttr("readonly");
			break;
		case false:
			$('#comp-hover').iCheck('uncheck');
			$('#comp-hover-val').attr("readonly", "readonly");
			break;
	}

	//hover内容  Hint 
	$('#comp-hover-val').val(thiss.getUserData().Hint);

	// =============================Data=============================

	//Tag内容  tag 
	$('#comp-tagaddress').val(thiss.getUserData().Tag.tag_name);

	//是否只读  Readonly 
	switch (thiss.getUserData().Readonly) {
		case true:
			$('#comp-readonly').iCheck('check');
			break;
		case false:
			$('#comp-readonly').iCheck('uncheck');
			break;
	}

	// =============================style=========================

	//边框宽度  LineWidth
	$('#style-width').text(thiss.getStroke());

	//边框颜色  LineColor
	$('.style-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.style-border-color ul li').each(function(index, element) {
		if (thiss.getColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	//边框样式  LineStyle
	if (thiss.getDashArray() === null) {
		$('#style-style').text("默认")
	} else {
		$('#style-style').text(thiss.getDashArray())
	}


	//style 闪烁  blinking  
	switch (thiss.getUserData().Blinking) {
		case true:
			$('#style-flashing').iCheck('check');
			break;
		case false:
			$('#style-flashing').iCheck('uncheck');
	}

	// 图片地址  picture 
	$('#style-image').val(thiss.getUserData().picture);



	// =============================onTrue========================

	//边框宽度  LineWidth
	$('#ontrue-width').text(thiss.getUserData().onTrue.LineWidth);

	//边框颜色  LineColor
	$('.ontrue-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.ontrue-border-color ul li').each(function(index, element) {
		if (thiss.getUserData().onTrue.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});


	//边框样式  LineStyle
	if (thiss.getUserData().onTrue.LineStyle === null) {
		$('#ontrue-style').text("默认")
	} else {
		$('#ontrue-style').text(thiss.getUserData().onTrue.LineStyle)
	}

	//style 闪烁  blinking  	
	switch (thiss.getUserData().onTrue.Blinking) {
		case true:
			$('#ontrue-flashing').iCheck('check');
			break;
		case false:
			$('#ontrue-flashing').iCheck('uncheck');
	}

	//图片地址  picture 
	$('#ontrue-image').val(thiss.getUserData().onTrue.picture);


	// =============================onFalse=======================

	//边框宽度  LineWidth
	$('#onfalse-width').text(thiss.getUserData().onFalse.LineWidth);

	// 边框颜色  LineColor
	$('.onfalse-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onfalse-border-color ul li').each(function(index, element) {
		if (thiss.getUserData().onFalse.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	})

	// 边框样式  LineStyle
	if (thiss.getUserData().onFalse.LineStyle === null) {
		$('#onfalse-style').text("默认")
	} else {
		$('#onfalse-style').text(thiss.getUserData().onFalse.LineStyle)
	}

	// 闪烁  blinking 
	switch (thiss.getUserData().onFalse.Blinking) {
		case true:
			$('#onfalse-flashing').iCheck('check');
			break;
		case false:
			$('#onfalse-flashing').iCheck('uncheck');
	}

	// 图片地址  picture  
	$('#onfalse-image').val(thiss.getUserData().onFalse.picture);

	// =============================onAlarm========================

	// 边框宽度  LineWidth
	$('#onalarm-width').text(thiss.getUserData().onAlarm.LineWidth);

	// 边框颜色  LineColor
	$('.onalarm-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onalarm-border-color ul li').each(function(index, element) {
		if (thiss.getUserData().onAlarm.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	// 边框样式  LineStyle	
	if (thiss.getUserData().onAlarm.LineStyle === null) {
		$('#onalarm-style').text("默认")
	} else {
		$('#onalarm-style').text(thiss.getUserData().onAlarm.LineStyle)
	}


	// 闪烁  blinking 
	switch (thiss.getUserData().onAlarm.Blinking) {
		case true:
			$('#onalarm-flashing').iCheck('check');
			break;
		case false:
			$('#onalarm-flashing').iCheck('uncheck');
	}


	// 图片地址  picture 
	$('#onalarm-image').val(thiss.getUserData().onAlarm.picture);

	// =============================onDisconnected=========================

	// 边框宽度  LineWidth
	$('#onDisc-width').text(thiss.getUserData().onDisconnected.LineWidth);

	// 边框颜色  LineColor
	$('.onDisc-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onDisc-border-color ul li').each(function(index, element) {
		if (thiss.getUserData().onDisconnected.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	//边框样式  LineStyle 
	if (thiss.getUserData().onDisconnected.LineStyle === null) {
		$('#onDisc-style').text("默认")
	} else {
		$('#onDisc-style').text(thiss.getUserData().onDisconnected.LineStyle)
	}

	// 闪烁  blinking 
	switch (thiss.getUserData().onDisconnected.Blinking) {
		case true:
			$('#onDisc-flashing').iCheck('check');
			break;
		case false:
			$('#onDisc-flashing').iCheck('uncheck');
	}

	// 图片地址  picture 
	$('#onDisc-image').val(thiss.getUserData().onDisconnected.picture);

}



// /** 
//  * image 标签
//  * @author yb
//  * @extend draw2d.shape.basic.Image
//  * @Data 2016/5/16 
//  */
// var imageComponents = draw2d.shape.basic.Image.extend({
// 	NAME: "imageComponents",
// 	init: function(attr) {
// 		this._super(attr);
// 		// this.set
// 		// this.path = "img/Desert.jpg";
// 		this.path = "img/icon/tance1.png";

// 		 // this.attr({
//   	// 	 boundingBox: {x:100, y:100, width:30, height:30}
//  		// });

// 		this.setRotationAngle(45);
// 		// 这里设置hover事件
// 		this.titles = "带图片"; //设置鼠标指示标题
// 		this.ShowHint = true;
// 		this.onMouseEnter = function() {
// 			if (this.ShowHint !== false) {
// 				var mm = $(this.getCanvas().getHtmlContainer()).attr("id");
// 				if (mm === "canvas") {
// 					$("#mainCanvasTooltip").html(this.titles);
// 					// console.log("悬浮框宽度为:"+$("#tooltips").width());
// 					var tPosX = this.getAbsoluteX() + this.getWidth() / 2 - ($("#mainCanvasTooltip").width()) / 2 ;
// 					var tPosY = this.getAbsoluteY() + this.getHeight() + 30;
// 					$("#mainCanvasTooltip").css({
// 						"display": "block",
// 						"top": tPosY,
// 						"left": tPosX
// 					});
// 				} else {
// 					// Sectooltips
// 					$("#viceCanvasTooltip").html(this.titles);
// 					// console.log("悬浮框宽度为:"+$("#tooltips").width());
// 					var tPosX = this.getAbsoluteX() + this.getWidth() / 2 - ($("#viceCanvasTooltip").width()) / 2 - 9;
// 					var tPosY = this.getAbsoluteY() + this.getHeight() + 10;
// 					$("#viceCanvasTooltip").css({
// 						"display": "block",
// 						"top": tPosY,
// 						"left": tPosX
// 					});
// 				}
// 			};

// 		};
// 		this.onMouseLeave = function() {
// 			// console.log("鼠标移除!!!!!!!!!!");
// 			$("#mainCanvasTooltip").css("display", "none");
// 			$("#viceCanvasTooltip").css("display", "none");

// 		};

// 		var data = {
// 			"types": "imageComponent", //类型
// 			"proportion": null, //自定义属性,存储宽高比例等
// 			//  ID "name":"",           //组件名称，每个画面上唯一
// 			"Description": "这里image组件描述", //组件描述
// 			// angle "Rotation":0 , 	//组件旋转角度(setRotationAngle(30);)
// 			"Caption": "双击修改组件标题", //组件标题 组态时/指定引用Tag的Name属性
// 			"ShowCaption": true, // 是否显示组件标题  (待定)
// 			"Visible": true, //是否显示组件(setAlpha(0))
// 			"Enable": true, //组件是否可用
// 			"AccessLevel": 3, //访问等级 0~15
// 			"ShowHint": true, //是否显示Hover说明
// 			"Hint": "带图片", //Hover说明的内容 
// 			"Tag": { //Tag的地址
// 				"userInput": "ImageTag", //用户输入Tag的值
// 				"name": "", //后台获取
// 				"value": "" //后台获取
// 			},
// 			"Readonly": false, //组件是否为只读
// 			"Blinking": false, //组件闪烁

// 			"onTrue": true, //状态 onTrue
// 			"onfalse": false, //状态 onFalse
// 			"onAlarm": false, //状态 onAlarm
// 			"onDisconnected": false, //状态 onDisconnected
// 		}
// 		this.attr({
// 			userData: data
// 		});

// 		// this.label = new draw2d.shape.basic.Label({
// 		// 	text: "双击修改组件标题",
// 		// 	// color: "#0d0d0d",
// 		// 	// fontColor: "#0d0d0d"
// 		// });
// 		// this.add(this.label, new draw2d.layout.locator.TopLocator(this));

// 		var thisss = this;

// 		this.on("click", function() {


// 		});

// 		/**
// 		 *	双击方法----forexample--选择图片
// 		 */
// 		this.on("dblclick", function() {
// 			// alert("1");

// 			localStorage.setItem("imageCompontentData", thisss.id);

// 			$("#imageFileField").click();

// 		});

// 		// // =========更改标题文本===================
// 		// this.label.installEditor(new draw2d.ui.LabelInplaceEditor({
// 		// 	onCommit: $.proxy(function(value) {
// 		// 		data.Caption = value;
// 		// 		console.log(">>>>>>>>>>>" + JSON.stringify(data, null, 2));
// 		// 		// this.label.getParent().setUserData(data);
// 		// 		this.attr({
// 		// 			userData: data
// 		// 		});

// 		// 		if (typeof(Storage) !== "undefined") {
// 		// 			console.log("支持保存设置");
// 		// 			// localStorage.setItem(this.label.getParent().getId(), value);//存储图标
// 		// 		}

// 		// 		// alert("new value set to:"+value + "父元素ID:" + this.getId());
// 		// 	}, this),
// 		// 	onCancel: function() {}
// 		// }));

// 	}

// })