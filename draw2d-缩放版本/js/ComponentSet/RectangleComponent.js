var rectangle = 0,
	RoundedRectangle = 0,
	Ellipse = 0,
	polygon = 0,
	BothArrowH = 0,
	BothArrowV = 0,
	forRight = 0,
	forLeft = 0,
	forUp = 0,
	conduitnum = 0,
	forDown = 0;

/** 
 * 矩形
 * @author
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
	NAME: "rectangleComponent",
	init: function(attr) {
		this._super(attr);
		this.stroke = 0;
		// this.setColor("#D8D8D8"); //边框颜色
		// this.setBackgroundColor("#35C99D"); //背景颜色
		// this.setAlpha(0.5);
		// this.setBackgroundColor( "#D8D8D8") ;//背景颜色
		 
		
		var thiss = this;
		var data = {
			havepoint: "",
			name: "矩形",
			types: "basicComponent", //类型			
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#D8D8D8",
			DashArray: null,
			BlinkingType: "style",
			onTrue: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				FillColor: "#35C99D",
				alpha:1,
				Blinking: false,
			},
			onFalse: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onAlarm: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onDisconnected: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			}
		}
		this.attr({
			userData: data
		});
		// 选中
		this.on("click", function() {
			basicdisplayDiv(thiss);
		});

		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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
	},



});



/** 
 * RoundedRectangle Component  圆角矩形
 * @author 
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
	NAME: "RoundedRectangleComponent",
	init: function(attr) {
		this._super(attr);
		this.setRadius(10);
		this.stroke = 0;
		// this.setColor("#D8D8D8"); //边框颜色
		this.setBackgroundColor("#35C99D"); //背景颜色
		var thiss = this;
		var data = {
			havepoint: "",
			name: "圆角矩形",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述			
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
			BlinkingStroke: 1,
			BlinkingColor: "#D8D8D8",
			DashArray: null,
			BlinkingType: "style",
			onTrue: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onFalse: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onAlarm: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onDisconnected: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
		}
		this.attr({
			userData: data
		});
		// 选中
		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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

/** 
 * Ellipse Component  椭圆
 * @author yb
 * @extend draw2d.shape.basic.rectangle
 * @Data 2016/5/17 
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
	NAME: "EllipseComponent",
	init: function(attr) {
		this._super(attr);
		this.stroke = 0;
		this.setRadius(25);
		// this.setColor("#D8D8D8"); //边框颜色
		this.setBackgroundColor("#35C99D"); //背景颜色
		// this.createPort("input");
		// this.createPort("output");

		// 这里设置hover事件
		var thiss = this;
		this.setHeight(30);
		var data = {
			havepoint: "",
			name: "椭圆",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#D8D8D8",
			DashArray: null,
			BlinkingType: "style",
			onTrue: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			}, //状态 
			onFalse: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			}, //状态 onFalse
			onAlarm: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			}, //状态 onAlarm
			onDisconnected: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			}, //状态 onDisconnected
		}
		this.attr({
			userData: data
		});

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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
		}, 400);
	}
});


/** 
 * Polygon Component 多边形
 * @author yb
 * @extend draw2d.shape.basic.Polygon
 * @Data 2016/5/25 
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
	NAME: "polygonComponent",
	init: function(attr) {
		this._super(attr);
		this.stroke = 0;
		// this.setColor("#D8D8D8"); //边框颜色
		this.setBackgroundColor("#35C99D"); //背景颜色
		var w = this.width;
		var h = this.height;
		var thiss = this;
		var data = {
			name: "多边形",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
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
			BlinkingStroke: 1,
			BlinkingColor: "#D8D8D8",
			DashArray: null,
			BlinkingType: "style",
			onTrue: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onFalse: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onAlarm: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
			onDisconnected: {
				LineWidth: 1,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false,
			},
		}
		this.attr({
			userData: data
		});
		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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
 * BothArrow Component  [左右方向]
 * @author
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({
	NAME: "BothArrowHComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 50,
			height: 30
		}, attr), setter, getter);

		this.setBackgroundColor("#35C99D"); //背景颜色		
		var thiss = this;
		var data = {
			name: "水平双向箭头",
			types: "basicComponent", //类型			
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#D8D8D8",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: null,
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
		this.attr({
			userData: data
		});

		this.onDoubleClick = function() {
			console.log(123)
		};

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
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
 * BothArrow Component  [上下方向]
 * @author
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({
	NAME: "BothArrowVComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 50
		}, attr), setter, getter);
		this.setBackgroundColor("#35C99D"); //背景颜色
		var thiss = this;
		var data = {
			name: "垂直双向箭头",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#D8D8D8",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
		this.attr({
			userData: data
		});

		this.onDoubleClick = function() {
			// console.log(123)
			// console.log("颜色为:"+thiss.getColor().hash())
		};

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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

	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
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
 * forRightComponent 向右
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forRightComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setBackgroundColor("#35C99D"); //背景颜色
		var thiss = this;
		var data = {
			name: "右箭头",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
		this.attr({
			userData: data
		});

		this.onDoubleClick = function() {
			console.log(123)
		};
		// 

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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

	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");
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
 * forLeftComponent 向左
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({
	NAME: "forLeftComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setBackgroundColor("#35C99D"); //背景颜色
		var thiss = this;
		var data = {
			name: "左箭头",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
		this.attr({
			userData: data
		});



		this.onDoubleClick = function() {
			console.log(123)
		};
		// 

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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

	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M30,20H20V30L0,15L20,0V10H30V20z");
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
 * forUpComponent  向上
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forUpComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setBackgroundColor("#35C99D"); //背景颜色
		var thiss = this;
		var data = {
			name: "上箭头",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
		this.attr({
			userData: data
		});


		this.onDoubleClick = function() {
			console.log(123)
		};
		// 

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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

	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M10,30V20H0L15,0L30,20H20V30H10z");
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
 * forDownComponent  向下
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forDownComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);

		this.setBackgroundColor("#35C99D"); //背景颜色
		var thiss = this;		
		var data = {
			name: "下箭头",
			types: "basicComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 8, //访问等级 0~15
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
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			}, //状态 
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
		this.attr({
			userData: data
		});



		this.onDoubleClick = function() {
			console.log(123)
		};
		// 

		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M10,0V10H0L15,30L30,10H20V0H10z");
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
 *  conduitCompontent  自定义管道
 */
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
	NAME: "conduitCompontent",
	init: function(attr) {
		this._super(attr);
		this.width = 100;
		this.height = 30;
		this.stroke = 0;
		// this.setColor('black');
		// this.alpha = 0;


		
		var thiss = this;
		var data = {
			// havepoint: "",
			name: "管道",
			types: "conduitCompontent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
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
			BlinkingStroke: 0,
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			}, //状态 
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		
		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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
 *  conduitCompontent  自定义管道
 */
var conduitCompontentV = draw2d.shape.node.VerticalBus.extend({
	NAME: "conduitCompontentV",
	init: function(attr) {
		this._super(attr);
		this.width = 30;
		this.height = 100;
		this.stroke = 0;
		// this.alpha = 0;

		// this.setConnectionDirStrategy(10);	
		var thiss = this;
		var data = {
			// havepoint: "",
			name: "管道",
			types: "conduitCompontent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
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
			BlinkingStroke: 0,
			BlinkingColor: "#35C99D",
			DashArray: "",
			BlinkingType: "style",
			onTrue: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			}, //状态 
			onFalse: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onAlarm: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
			onDisconnected: {
				LineWidth: 0,
				LineColor: "#35C99D",
				LineStyle: "",
				alpha:1,
				FillColor: "#35C99D",
				Blinking: false
			},
		}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		
		this.on("click", function() {
			basicdisplayDiv(thiss);
		});
		// 缩放
		this.on("resize", function() {
			componentResize(thiss);
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



function basicdisplayDiv(obj) {
	//重置属性框
	resetAttributeMenu();
	// 隐藏该控件没有的属性
	$('.div-basic-hide').hide();
	$('.div-fill').show();
	$('.div-alpha').show();


	componentSizeAndoffset(obj);
	componentInitData(obj);
	setBasicComponentStyleInEditFiled(obj);
}
/**
 * [读取并在 属性栏显示 控件属性]
 * @param {[type]} thiss [description]
 */
function setBasicComponentStyleInEditFiled(com) {
	// =============================style===================================
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
	// 透明度
	$canvas.styleAlpha.val(com.getAlpha());

	// =============================onTrue===================================
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

	// 透明度
	$canvas.onTrueAlpha.val(com.getAlpha());

	// =============================onFalse===================================
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
		})

	// 透明度
	$canvas.onFalseAlpha.val(com.getAlpha());
	
	// =============================onAlarm===================================
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

	// 透明度
	$canvas.onAlarmAlpha.val(com.getAlpha());	
	// =============================onDisconnected===================================
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
	// 透明度
	$canvas.onDiscAlpha.val(com.getAlpha());
}