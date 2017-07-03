var textnum = 0;
var buttons = 0;
/** 
 * text 标签
 * @author
 * @extend draw2d.shape.basic.Text
 */ 
var textComponent = draw2d.shape.basic.Text.extend({
	NAME: "textComponent",
	init: function(attr) {
		this._super(attr);
		this.text = "0";
		this.fontFamily = "微软雅黑";
		this.setStroke(0);
		this.setFontColor("#FFFFFF")
		this.setFontSize(15);
		this.setResizeable(false);	
		// this.setAlpha(0.3);
		// this.setBackgroundColor('#4F5D77');	
		this.attr({
   			padding: {left:15, right:15}
 		});
		
		var thiss = this;
		// 添加标题
		this.label = new draw2d.shape.basic.Label({
			text: "",
			fontFamily:"微软雅黑"
			// color: "#0d0d0d",
			// fontColor: "#0d0d0d"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);	
		var data = {
			name:"文本",
			types: "buttonComponent", //类型
			valueType:"textValueComponent",
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Caption: "文本", //组件标题 组态时/指定引用Tag的Name属性
			ShowCaption: false, // 是否显示组件标题  (待定)
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 7, //访问等级 0~15
			ShowHint: false, //是否显示Hover说明(待定)
			Hint: "", //Hover说明的内容 (待定)
			Tag: { 
				tag_id: -1,
				tag_type:-1,
				tag_name:"",
				bingding_status:0    //0 默认状态,1 已经绑定,2 绑定错误
			},
			value:"",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke:0,
			BlinkingColor:"#FFFFFF",
			styleFillColor:'none',
			DashArray:"",
			BlinkingType:"style",
			unit:'',
			onTrue: {
				LineWidth:0,
				LineColor:"#35C99D",
				LineStyle:"",
				FillColor:"none",
				Text:"",
				unit:'', //单位
				TextColor:"#FFFFFF",
				Blinking:false
			},
			onFalse: {
				LineWidth:0,
				LineColor:"#35C99D",
				LineStyle:"",
				FillColor:"none",
				Text:"",
				unit:'',
				TextColor:"#FFFFFF",
				Blinking:false
			},
			onAlarm: {
				LineWidth:0,
				LineColor:"#35C99D",
				LineStyle:"",
				FillColor:"none",
				Text:"",
				unit:'',
				TextColor:"#FFFFFF",
				Blinking:false
			},
			onDisconnected: {
				LineWidth:0,
				LineColor:"#35C99D",
				LineStyle:"",
				FillColor:"none",
				Text:"",
				unit:'',
				TextColor:"#FFFFFF",
				Blinking:false
			}
		};

		this.attr({ //将自定义的数据加载到控件
			userData: data
		});
	
		this.on("click", function() {
			textdisplayDiv(thiss);
			$('.div-unit').show();
			$('.div-text-alpha').show();

			$('#comp-unit-style').val(thiss.getUserData().unit);
			$('#comp-unit-ontrue').val(thiss.getUserData().onTrue.unit);
			$('#comp-unit-onfalse').val(thiss.getUserData().onFalse.unit);
			$('#comp-unit-onalarm').val(thiss.getUserData().onAlarm.unit);
			$('#comp-unit-ondis').val(thiss.getUserData().onDisconnected.unit);
			
			if (thiss.getBackgroundColor().hash() === 'none') {				
				$('#text-alpha-style').iCheck('check');
				$('#text-alpha-style').iCheck('disable');
			}else{
				$('#text-alpha-style').iCheck('enable');
				$('#text-alpha-style').iCheck('uncheck');

			}

			if (thiss.getUserData().onTrue.FillColor ==='none') {
				$('#text-alpha-ontrue').iCheck('check');
				$('#text-alpha-ontrue').iCheck('disable');
			}else{
				$('#text-alpha-ontrue').iCheck('enable');
				$('#text-alpha-ontrue').iCheck('uncheck');

			}
			if (thiss.getUserData().onFalse.FillColor ==='none') {
				$('#text-alpha-onfalse').iCheck('check');
				$('#text-alpha-onfalse').iCheck('disable');
			}else{
				$('#text-alpha-onfalse').iCheck('enable');
				$('#text-alpha-onfalse').iCheck('uncheck');
			}
			if (thiss.getUserData().onAlarm.FillColor ==='none') {
				$('#text-alpha-onalarm').iCheck('check');
				$('#text-alpha-onalarm').iCheck('disable');
			}else{
				$('#text-alpha-onalarm').iCheck('enable');
				$('#text-alpha-onalarm').iCheck('uncheck');
			}

			if (thiss.getUserData().onDisconnected.FillColor ==='none') {
				$('#text-alpha-ondisc').iCheck('check');
				$('#text-alpha-ondisc').iCheck('disable');
			}else{
				$('#text-alpha-ondisc').iCheck('enable');
				$('#text-alpha-ondisc').iCheck('uncheck');
			}



			
		});
		// 移动
		this.on("move", function() {
			componentMove(thiss);
		});
		// 悬浮窗
		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		// =========更改文本===================
		// this.installEditor(new draw2d.ui.LabelInplaceEditor());

		
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
});

/** 
 * button 标签
 * @author
 * @extend draw2d.shape.note.PostIt
 */
var buttonComponent = draw2d.shape.note.PostIt.extend({
	NAME: "buttonComponent",
	init: function(attr) {
		this._super(attr);
		this.text = "按钮";
		this.fontFamily = "微软雅黑";
		this.setBackgroundColor("#FFFFFF");
		this.setColor("#35C99D");
		this.height = 25;
		this.width = 60;
		this.setFontColor("#35C99D"); 
		this.setRadius(2);
		this.setFontSize(14);	
		var thiss = this;
		thiss.attr({
   			padding: {left:20, top:3,right:20}
 		});
		var data = {
			name: "按钮",
			types: "buttonComponent", //类型
			text: "", //文本
			textColor: "", //字体颜色;
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Caption: "按钮", //组件标题 组态时/指定引用Tag的Name属性
			ShowCaption: false, // 是否显示组件标题  (待定)
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 2, //访问等级 0~15
			ShowHint: false, //是否显示Hover说明(待定)
			Hint: "", //Hover说明的内容 (待定)
			Tag: { 
				tag_id: -1,
				tag_type:-1,
				tag_name:"",
				bingding_status:0    //0 默认状态,1 已经绑定,2 绑定错误
			},
			value:"",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke:1,
			BlinkingColor:"#35C99D",
			DashArray:"",
			BlinkingType:"style",
			onTrue: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "#FFFFFF",
				Text: "",
				TextColor: "#35C99D",
				Blinking: false
			},
			onFalse: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "#FFFFFF",
				Text: "",
				TextColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "#FFFFFF",
				Text: "",
				TextColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "#FFFFFF",
				Text: "",
				TextColor: "#35C99D",
				Blinking: false
			}
		}
		this.attr({
			userData: data
		});

		this.label = new draw2d.shape.basic.Label({
			text: "",
			fontFamily:"微软雅黑"
			// color: "#0d0d0d",
			// fontColor: "#0d0d0d"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.on("click", function() {
			textdisplayDiv(thiss);
		});

		// 移动
		this.on("move", function() {
			componentMove(thiss);
		});
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};


		// =========更改文本===================
		this.installEditor(new draw2d.ui.LabelInplaceEditor({
			onCommit: $.proxy(function(value) {

				data.text = value;
				console.log(">>>>>>>>>>>" + JSON.stringify(data, null, 2));
				// this.label.getParent().setUserData(data);
				this.attr({
					userData: data
				});

				console.log(">>>>>>>>>>>" + JSON.stringify(this.userData, null, 2));
				if (typeof(Storage) !== "undefined") {
					console.log("支持保存设置");
					// localStorage.setItem(this.label.getParent().getId(), value);//存储图标
				}

				// alert("new value set to:"+value + "父元素ID:" + this.getId());
			}, this),
			onCancel: function() {}
		}));

		
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
});


// 属性框
function textdisplayDiv(obj) {
	//重置属性框
	resetAttributeMenu();
	// 隐藏该控件没有的属性
	$('.div-basic-hide').hide();
	$('.div-fill').show();
	$('.div-title').show();
	$('.div-text-val').show();
	$('.div-text-color').show();
	$('.div-font-size').show();

	componentCaption(obj);
	componentSizeAndoffset(obj);
	componentInitData(obj);

	setCustomTextComponentStyleInEditFiled(obj);
}


function setCustomTextComponentStyleInEditFiled(thiss) {
	

	


	// =============================Data====================================
	

	// =============================style===================================
	

	// 文本内容  Text
	$canvas.styleText.val(com.getText());
	$canvas.styleFontSize.val(com.getFontSize());

	// 文本颜色  TextColor
	$canvas.styleFontColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.styleFontColor.each(function(index, element) {
		if (com.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	})


	//填充(背景)颜色  fillColor
	$canvas.styleFillColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.styleFillColor.each(function(index, element) {
		if (com.getBackgroundColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	



	// =============================onTrue===================================
	


	// 文本内容  Text
	$('#ontrue-text').val(thiss.getUserData().onTrue.Text)

	// 文本颜色  TextColor
	$('.ontrue-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.ontrue-text-color ul li').each(function(index, element) {
		if (thiss.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	//填充(背景)颜色  fillColor
	$('.ontrue-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.ontrue-fill-color ul li').each(function(index, element) {
			if (thiss.getUserData().onTrue.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
				if (rgb2hex($(element).css("background-color")) == "#ffffff") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
			}
		})



	// =============================onFalse===================================
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

	// 文本内容  Text
	$('#onfalse-text').val(thiss.getUserData().onFalse.Text)

	// 文本颜色  TextColor
	$('.onfalse-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onfalse-text-color ul li').each(function(index, element) {
		if (thiss.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});


	// 填充(背景)颜色  fillColor
	$('.onfalse-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onfalse-fill-color ul li').each(function(index, element) {
		if (thiss.getUserData().onFalse.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	})
	// 闪烁  blinking 
	switch (thiss.getUserData().onFalse.Blinking) {
		case true:
			$('#onfalse-flashing').iCheck('check');
			break;
		case false:
			$('#onfalse-flashing').iCheck('uncheck');
	}

	// =============================onAlarm===================================
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

	// 文本内容  Text
	$('#onalarm-text').val(thiss.getUserData().onAlarm.Text)

	// 文本颜色  TextColor
	$('.onalarm-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onalarm-text-color ul li').each(function(index, element) {
		if (thiss.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});


	// 填充(背景)颜色  fillColor
	$('.onalarm-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onalarm-fill-color ul li').each(function(index, element) {
		if (thiss.getUserData().onAlarm.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	// 闪烁  blinking 
	switch (thiss.getUserData().onAlarm.Blinking) {
		case true:
			$('#onalarm-flashing').iCheck('check');
			break;
		case false:
			$('#onalarm-flashing').iCheck('uncheck');
	}

	// =============================onDisconnected===================================
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

	// 文本内容  Text
	$('#onDisc-text').val(thiss.getUserData().onDisconnected.Text)

	// 文本颜色  TextColor
	$('.onDisc-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onDisc-text-color ul li').each(function(index, element) {
		if (thiss.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});


	// 填充(背景)颜色  fillColor
	$('.onDisc-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.onDisc-fill-color ul li').each(function(index, element) {
		if (thiss.getUserData().onDisconnected.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	})
	// 闪烁  blinking 
	switch (thiss.getUserData().onDisconnected.Blinking) {
		case true:
			$('#onDisc-flashing').iCheck('check');
			break;
		case false:
			$('#onDisc-flashing').iCheck('uncheck');
	}

}