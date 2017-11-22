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
			padding: {
				left: 15,
				right: 15
			}
		});

		var thiss = this;
		// 添加标题
		this.label = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
				// color: "#0d0d0d",
				// fontColor: "#0d0d0d"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
			name: "文本",
			types: "buttonComponent", //类型
			valueType: "textValueComponent",
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
				tag_type: -1,
				tag_name: "",
				bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
			},
			value: "",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke: 0,
			BlinkingColor: "#FFFFFF",
			styleFillColor: 'none',
			DashArray: "",
			BlinkingType: "style",
			unit: '',
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "none",
				Text: "",
				unit: '', //单位
				TextColor: "#FFFFFF",
				Blinking: false
			},
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "none",
				Text: "",
				unit: '',
				TextColor: "#FFFFFF",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "none",
				Text: "",
				unit: '',
				TextColor: "#FFFFFF",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				FillColor: "none",
				Text: "",
				unit: '',
				TextColor: "#FFFFFF",
				Blinking: false
			}
		};

		this.attr({ //将自定义的数据加载到控件
			userData: data
		});

		this.on("click", function() {
			textdisplayDiv(thiss);
			$canvas.menuDivUnit.show();
			$canvas.menuDivTextAlpha.show();

			$canvas.styleTextUnit.val(thiss.getUserData().unit);
			$canvas.onTrueTextUnit.val(thiss.getUserData().onTrue.unit);
			$canvas.onFalseTextUnit.val(thiss.getUserData().onFalse.unit);
			$canvas.onAlarmTextUnit.val(thiss.getUserData().onAlarm.unit);
			$canvas.onDiscTextUnit.val(thiss.getUserData().onDisconnected.unit);

			if (thiss.getBackgroundColor().hash() === 'none') {
				$canvas.styleBgAlpha.iCheck('check').iCheck('disable');
			} else {
				$canvas.styleBgAlpha.iCheck('uncheck').iCheck('enable');

			}

			if (thiss.getUserData().onTrue.FillColor === 'none') {
				$canvas.onTrueBgAlpha.iCheck('check').iCheck('disable');
			} else {
				$canvas.onTrueBgAlpha.iCheck('uncheck').iCheck('enable');

			}
			if (thiss.getUserData().onFalse.FillColor === 'none') {
				$canvas.onFalseBgAlpha.iCheck('check').iCheck('disable');
			} else {
				$canvas.onFalseBgAlpha.iCheck('uncheck').iCheck('enable');
			}
			if (thiss.getUserData().onAlarm.FillColor === 'none') {
				$canvas.onAlarmBgAlpha.iCheck('check').iCheck('disable');
			} else {
				$canvas.onAlarmBgAlpha.iCheck('uncheck').iCheck('enable');
			}

			if (thiss.getUserData().onDisconnected.FillColor === 'none') {
				$canvas.onDiscBgAlpha.iCheck('check').iCheck('disable');
			} else {
				$canvas.onDiscBgAlpha.iCheck('uncheck').iCheck('enable');
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
		this.onMouseLeave = function() {
			$canvas.comTooltips.hide();
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
			padding: {
				left: 20,
				top: 3,
				right: 20
			}
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
				tag_type: -1,
				tag_name: "",
				bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
			},
			value: "",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke: 1,
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
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
			fontFamily: "微软雅黑"
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
		this.onMouseLeave = function() {
			$canvas.comTooltips.hide();
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
	$canvas.menuDivBasicHide.hide();
	$canvas.menuDivFill.show();
	$canvas.menuDivTitle.show();
	$canvas.menuDivTextVal.show();
	$canvas.menuDivTextColor.show();
	$canvas.menuDivFontSize.show();

	componentCaption(obj);
	componentSizeAndoffset(obj);
	componentInitData(obj);

	setCustomTextComponentStyleInEditFiled(obj);
}


function setCustomTextComponentStyleInEditFiled(com) {

	// =============================style===================================
	// 文本内容  Text
	$canvas.styleText.val(com.getText());
	$canvas.styleFontSize.val(com.getFontSize());
	console.log('字体大小：'+com.getFontSize())

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
	});

	//填充(背景)颜色  fillColor
	console.log('查看背景颜色：'+com.getBackgroundColor().hash())

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
	$canvas.onTrueText.val(com.getUserData().onTrue.Text)
	// 文本颜色  TextColor
	$canvas.onTrueFontColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onTrueFontColor.each(function(index, element) {
		if (com.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});
	//填充(背景)颜色  fillColor
	$canvas.onTrueFillColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onTrueFillColor.each(function(index, element) {
		if (com.getUserData().onTrue.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	})
	// =============================onFalse===================================
	// 文本内容  Text
	$canvas.onFalseText.val(com.getUserData().onFalse.Text);
	// 文本颜色  TextColor
	$canvas.onFalseFontColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onFalseFontColor.each(function(index, element) {
		if (com.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});
	// 填充(背景)颜色  fillColor
	$canvas.onFalseFillColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onFalseFillColor.each(function(index, element) {
		if (com.getUserData().onFalse.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});
	// =============================onAlarm===================================
	// 文本内容  Text
	$canvas.onAlarmText.val(com.getUserData().onAlarm.Text);
	// 文本颜色  TextColor
	$canvas.onAlarmFontColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onAlarmFontColor.each(function(index, element) {
		if (com.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});
	// 填充(背景)颜色  fillColor
	$canvas.onAlarmFillColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onAlarmFillColor.each(function(index, element) {
		if (com.getUserData().onAlarm.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});
	// =============================onDisconnected===================================
	// 文本内容  Text
	$canvas.onDiscText.val(com.getUserData().onDisconnected.Text);
	// 文本颜色  TextColor
	$canvas.onDiscFontColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onDiscFontColor.each(function(index, element) {
		if (com.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});
	// 填充(背景)颜色  fillColor
	$canvas.onDiscFillColor.removeClass("colorWhiteBorder colorBlackBorder");
	$canvas.onDiscFillColor.each(function(index, element) {
		if (com.getUserData().onDisconnected.FillColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

}