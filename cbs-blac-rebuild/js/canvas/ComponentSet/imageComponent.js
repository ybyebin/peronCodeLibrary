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
			componentResize(thiss);
		});
		// 移动
		this.on("move", function() {			
			componentMove(thiss);
		});
		// 悬浮窗
		this.image.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.image.onMouseLeave =  function() {
			$canvas.comTooltips.hide();
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
	$canvas.menuDivBasicHide.hide();
	$canvas.menuDivTitle.show();
	$canvas.menuDivImage.show();
	$canvas.menuDivFill.hide();
	componentCaption(obj);//标题
	componentSizeAndoffset(obj);
	componentInitData(obj);
	setCustomImageComponentStyleInEditFiled(obj) 
}

// 设置 自定义图片控件在编辑框的属性值
function setCustomImageComponentStyleInEditFiled(com) {
	// style
	// 图片地址  picture 
	$canvas.stylePicture.val(com.getUserData().picture);

	//onTrue
	//图片地址  picture 
	$canvas.onTruePicture.val(com.getUserData().onTrue.picture);

	// onFalse
	// 图片地址  picture  
	$canvas.onFalsePicture.val(com.getUserData().onFalse.picture);

	//onAlarm
	// 图片地址  picture 
	$canvas.onAlarmPicture.val(com.getUserData().onAlarm.picture);

	//onDisconnected
	// 图片地址  picture 
	$canvas.onDiscPicture.val(com.getUserData().onDisconnected.picture);

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