var labelnum = 0;
/** 
 * lable 标签 只用于展示无触发动作
 * @author yb
 * @extend draw2d.shape.note.PostIt
 * @Data 2016/5/13 
 */ 
var LabelComponent = draw2d.shape.note.PostIt.extend({
	NAME: "LabelComponent",
	init: function(attr) {
		this._super(attr);
		this.text = "标签";
		this.fontFamily = "微软雅黑";
		this.setWidth(100);
		this.minWidth = 200;
		// this.setBackgroundColor("#999999");
		// this.setBackgroundColor('#515F7B')
		this.setColor("#FFFFFF");
		this.setRadius(2);
		// this.attr({
  //  			padding: {left:15, right:15}
 	// 	});
		var thiss = this;

		// 这里设置hover事件
		this.titles = "这里是lable控件"; //设置鼠标指示标题
		this.ShowHint = false;
		var data = {
			name:"lable",
			types: "LabelComponent", //类型
			valueType:"valueComponent", //显示控件绑定的 tag 的值
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Caption: "Label", //组件标题 组态时/指定引用Tag的Name属性
			ShowCaption: false, // 是否显示组件标题  (待定)
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 2, //访问等级 0~15
			ShowHint: false, //是否显示Hover说明(待定)
			Hint: "", //Hover说明的内容 (待定)
			Tag: { 
				tag_id: "", //用户输入Tag的值
				tag_type:"",
				tag_name:"",
				bingding_status:0    //0 默认状态,1 已经绑定,2 绑定错误
			},
			value:"",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke:0,
			BlinkingColor:"#FFFFFF",
			DashArray:"",
			BlinkingType:"style",
		};
		this.attr({
			userData: data
		});

		this.label = new draw2d.shape.basic.Label({
			text: "",
			fontFamily:"微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 选中
		this.on("click", function() {
			labeldisplayDiv(thiss);
		});
			
		// 移动
		this.on("move",function(){
			$('#comp-offsetx').val(thiss.getAbsoluteX());
			$('#comp-offsety').val(thiss.getAbsoluteY());
			$('#tooltips').hide();
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
		// this.installEditor(new draw2d.ui.LabelInplaceEditor({
		// 	onCommit: $.proxy(function(value) {

		// 		data.text = value;
		// 		console.log(">>>>>>>>>>>" + JSON.stringify(data, null, 2));
		// 		// this.label.getParent().setUserData(data);
		// 		this.attr({
		// 			userData: data
		// 		});

		// 		console.log(">>>>>>>>>>>" + JSON.stringify(this.userData, null, 2));
		// 		if (typeof(Storage) !== "undefined") {
		// 			console.log("支持保存设置");
		// 			// localStorage.setItem(this.label.getParent().getId(), value);//存储图标
		// 		}

		// 		// alert("new value set to:"+value + "父元素ID:" + this.getId());
		// 	}, this),
		// 	onCancel: function() {}
		// }));


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

// 属性框
function labeldisplayDiv(obj) {
	//重置属性框
	resetAttributeMenu();
	// 隐藏该控件没有的属性
	$('.div-basic-hide').hide();
	$('.div-text-val').show();
	$('.div-text-color').show();
	$('.just-for-label').hide();

	$('.div-fill').show();
	$('.div-font-size').show();
	setCustomLabelComponentStyleInEditFiled(obj)
}

// 设置 自定义图片控件在编辑框的属性值
function setCustomLabelComponentStyleInEditFiled(thiss) {

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
	console.log('旋转角度:'+thiss.getRotationAngle())

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


	// 文本内容  Text
	$('#style-text').val(thiss.getText());
	$('#text-font-size').val(thiss.getFontSize());

	// 文本颜色  TextColor
	$('.style-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.style-text-color ul li').each(function(index, element) {
		if (thiss.getFontColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	})


	//填充(背景)颜色  fillColor
	$('.style-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	$('.style-fill-color ul li').each(function(index, element) {
		if (thiss.getBackgroundColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
			if (rgb2hex($(element).css("background-color")) == "#ffffff") {
				$(element).addClass("colorBlackBorder");
			} else {
				$(element).addClass("colorWhiteBorder");
			}
		}
	});

	//style 闪烁  blinking  
	switch (thiss.getUserData().Blinking) {
		case true:
			$('#style-flashing').iCheck('check');
			break;
		case false:
			$('#style-flashing').iCheck('uncheck');
	}

}