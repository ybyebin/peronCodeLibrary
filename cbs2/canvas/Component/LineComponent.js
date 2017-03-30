
var linenum = 0;


/** 
 * Line Component
 * @author 
 * @extend draw2d.shape.basic.Line
 */
var LineComponent = draw2d.shape.basic.Line.extend({
	NAME: "LineComponent",
	init: function(attr) {
		this._super(attr);
		this.setColor("#35C99D");
		this.setStroke(2);
		var thiss = this;		
		//基础数据
		var data = {
			name:"直线",
			types: "LineComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 0, //访问等级 0~15
			ShowHint: false, //是否显示Hover说明(待定)
			Hint: "", //Hover说明的内容 (待定)
			Tag: { 
				tag_id: "",
				tag_type:"",
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
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
			onFalse: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
			onAlarm: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
			onDisconnected: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
		};

		this.attr({
			userData: data
		});
			
		this.on("click", function() {
			LineDisplayDiv(thiss);
		});
		this.on("change", function() {
			console.log('===============')
			// $('#Horizontal').iCheck('uncheck');
			// 
			// 
			

			var arr = thiss.getVertices();

			if (arr.data[0].y !== arr.data[1].y) {
				console.log('不水平!')
				$('#horizontal').iCheck('uncheck');
			}else{
				$('#horizontal').iCheck('check');
			}
			if (arr.data[0].x !== arr.data[1].x) {
				console.log('不垂直!')
				$('#vertical').iCheck('uncheck');
			}else{
				$('#vertical').iCheck('check');
			}
		});
		
		// 缩放
		this.on("resize", function() {
			$('#comp-width').val(thiss.getWidth());
			$('#comp-height').val(thiss.getHeight());


		});
		// 移动
		this.on("move", function() {
			$('#comp-offsetx').val(thiss.getVertices().data[0].x);
			$('#comp-offsety').val(thiss.getVertices().data[0].y);
			$('#tooltips').hide();
		});

		// 悬浮窗
		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {				
				var tooltips = $('#tooltips');
				if (thiss.userData.Hint !== '') {
					tooltips.show().html(thiss.userData.Hint);
					var tPosX = thiss.getVertices().data[0].x - tooltips.width() / 2 - 10;
					var tPosY = thiss.getVertices().data[0].y + 13;
					tooltips.css({
						'top': tPosY + 'px',
						'left': tPosX + 'px'
					});
				}
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};
	},
	onTimer:function(){
        this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;		
		setTimeout(function(){
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);			
		}, 500);
    }
});

// 直线
function LineDisplayDiv(obj){
	//重置属性框
	resetAttributeMenu();
	// 隐藏该控件没有的属性
	$('.div-basic-hide').hide();
	$('.div-fill').hide();
	$('.div-line-only').hide();
	$('.div-line-check').show();
	$('.div-normal-width').hide();
	$('.div-line-conduit').show();
	LineComponentStyleInEditFiled(obj);
}

//直线方法
function LineComponentStyleInEditFiled(thiss) {
	checkComponentTagidIsNull(); //判断前一个控件是否正确绑定Tag
	
	/*
	 * 暂存该控件的id
	 * 用于刷新控件的属性
	 */
	$("#spanid").html(thiss.id);
	checkThisComponentIsTrue(thiss); //检查本控件的Tag是否正确(如果已经绑定)
	// =================================基本======================
	// console.log("ID:" + thiss.id)

	// 组件名称   name(用户输入)
	$('#comp-name').val(thiss.getUserData().name);

	
	//组件描述   Description
	$('#comp-desc').val(thiss.getUserData().Description);

	//隐藏组件 Visible  
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
	// =============================Data====================================
	
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

	// =============================style===================================
	//边框宽度  LineWidth
	$('#comp-conline-width').val(thiss.getStroke());

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


	// =============================onTrue===================================
	//边框宽度  LineWidth
	$('#ontrue-conline-width').val(thiss.getUserData().onTrue.LineWidth)
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


	// =============================onFalse===================================
	//边框宽度  LineWidth
	$('#onfalse-conline-width').val(thiss.getUserData().onFalse.LineWidth);
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

	// =============================onAlarm===================================
	// 边框宽度  LineWidth
	$('#onalarm-conline-width').val(thiss.getUserData().onAlarm.LineWidth);

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

	// =============================onDisconnected===================================
	// 边框宽度  LineWidth
	$('#ondis-conline-width').val(thiss.getUserData().onDisconnected.LineWidth);

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
}
