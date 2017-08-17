/** 
 * safe 控件
 * @author yb
 * @Data 2016/7/13
 */
var switchs = 0,
	piping = 0,
	Warninglamp = 0,
	blowerfan = 0,
	exhaustfan = 0,
	beng = 0,
	ElectricTwoWayValve = 0,
	SolenoidValve = 0,
	ElectricButterflyValves = 0,
	AirFiltration = 0,
	AirHeating = 0,
	AirCooler = 0,
	Humidifier = 0,
	controlPanel = 0,
	FluorescentLamp = 0,
	LED = 0,
	Incandescent = 0,
	MetalHalide = 0,
	temperature = 0,
	humidity = 0,
	pressure = 0,
	differentialPressure = 0,
	liquid = 0,
	electric = 0,
	Voltage = 0,
	frequency = 0,
	activePower = 0,
	ElectricityConsumption = 0,
	level = 0,
	Gas = 0,
	Broadcast = 0,
	monitoring = 0,
	qiuji = 0,
	highqiuji = 0,
	EntranceGuard = 0,
	detector = 0;



/** 
 *  switchComponent  开关
 */
var switchComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "switchComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/switch1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "开关",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		this.label.attr({
   			padding: {left:0, right:0,top:0,bottom:0}
 		});
 		this.label.setFontSize(2);		
		var data = {
				color: "#DDDDDD",
				stroke: 1,
				name: "Switch",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "Switch", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1, 
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/switch1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/switch2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/switch3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/switch4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  pipingComponent  管道
 */
var pipingComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "pipingComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/piping1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "管道",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "管道",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "管道", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1, 
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/piping1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/piping2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/piping3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/piping4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  WarninglampComponent  报警提示灯
 */
var WarninglampComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "WarninglampComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Warninglamp1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "报警提示灯",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "报警提示灯",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "报警提示灯", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Warninglamp1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Warninglamp2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Warninglamp3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Warninglamp4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  blowerfanComponent  送风机
 */
var blowerfanComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "blowerfanComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Blowerfan1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "送风机标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "送风机",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "送风机", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Blowerfan1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Blowerfan2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Blowerfan3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Blowerfan4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  exhaustfanComponent  排风机
 */
var exhaustfanComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "exhaustfanComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Exhaustfan1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "排风机标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "排风机",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "排风机", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Exhaustfan1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Exhaustfan2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Exhaustfan3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Exhaustfan4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  bengComponent  泵
 */
var bengComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "bengComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/beng1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "泵标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "泵",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "泵", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/beng1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/beng2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/beng3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/beng4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  ElectricTwoWayValveComponent  电动两通阀
 */
var ElectricTwoWayValveComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricTwoWayValveComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve1-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电动两通阀标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "电动两通阀",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "电动两通阀", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve1-1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve1-2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve1-3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve1-4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  SolenoidValveComponent  电磁阀
 */
var SolenoidValveComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "SolenoidValveComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve2-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电磁阀标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "电磁阀",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "电磁阀", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve2-1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve2-2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve2-3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve2-4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  ElectricButterflyValvesComponent  电动蝶阀
 */
var ElectricButterflyValvesComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricButterflyValvesComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve3-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电动蝶阀标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "电动蝶阀",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "电动蝶阀", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1, 
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve3-1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve3-2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve3-3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/valve3-4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  AirFiltrationComponent  空气过滤器
 */
var AirFiltrationComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirFiltrationComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Airfiltration1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气过滤器标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "空气过滤器",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "空气过滤器", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误

				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airfiltration1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airfiltration2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airfiltration3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airfiltration4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  AirHeatingComponent  空气加热器
 */
var AirHeatingComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirHeatingComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Airheating1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气加热器标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "空气加热器",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "空气加热器", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airheating1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airheatin2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airheating3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Airheating4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  AirCoolerComponent  空气冷却器
 */
var AirCoolerComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirCoolerComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Aircooler1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气冷却器标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "空气冷却器",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "空气冷却器", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Aircooler1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Aircooler2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Aircooler3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Aircooler4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  HumidifierComponent  加湿器
 */
var HumidifierComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "HumidifierComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/humidifier1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "加湿器标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "加湿器",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "加湿器", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidifier1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidifier2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidifier3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidifier4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  controlPanelComponent  温控面板
 */
var controlPanelComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "controlPanelComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/controlpanel1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "温控面板标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "温控面板",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "温控面板", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/controlpanel1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/controlpanel2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/controlpanel3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/controlpanel4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  FluorescentLampComponent  荧光灯
 */
var FluorescentLampComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "FluorescentLampComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Fluorescentlamp1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "荧光灯标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "荧光灯",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "荧光灯", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Fluorescentlamp1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Fluorescentlamp2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Fluorescentlamp3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Fluorescentlamp4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  LEDComponent  LED灯
 */
var LEDComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "LEDComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/LED1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "LED灯标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "LED灯",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "LED灯", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1, 
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/LED1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/LED2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/LED3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/LED4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  IncandescentComponent  白炽灯
 */
var IncandescentComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "IncandescentComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Incandescent1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "白炽灯标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "白炽灯",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "白炽灯", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Incandescent1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Incandescent2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Incandescent3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Incandescent4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  MetalHalideComponent  金卤灯
 */
var MetalHalideComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "MetalHalideComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色

		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Metalhalide1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "金卤灯标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "金卤灯",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "金卤灯", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: {
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Metalhalide1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Metalhalide2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Metalhalide3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Metalhalide4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  temperatureComponent  温度
 */
var temperatureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "temperatureComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/temperature1.png",
			// path: "images/test.svg",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "温度标题",
			fontFamily: "微软雅黑"
		});

		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 13;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("gray");

		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);	
		var data = {
				name: " 温度",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: " 温度", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/temperature1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/temperature2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/temperature3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/temperature4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  humidityComponent  湿度
 */
var humidityComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "humidityComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/humidity1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "湿度标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 3;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#000000");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom());
		var data = {
				name: "湿度",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "湿度", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: {
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidity1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidity2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidity3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/humidity4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  pressureComponent  压力
 */
var pressureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "pressureComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/pressure1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "压力标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");

		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "压力",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "压力", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/pressure1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/pressure2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/pressure3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/pressure4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  differentialPressureComponent  压差
 */
var differentialPressureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "differentialPressureComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/differentialpressure1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "压差标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");

		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "压差",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "压差", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/differentialpressure1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/differentialpressure2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/differentialpressure3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/differentialpressure4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  liquidComponent  液位
 */
var liquidComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "liquidComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/liquid1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "液位标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "液位",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "液位", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/liquid1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/liquid2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/liquid3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/liquid4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  electricComponent  电流
 */
var electricComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "electricComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/electric1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电流标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "电流",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "电流", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/electric1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/electric2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/electric3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/electric4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  VoltageComponent  电压
 */
var VoltageComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "VoltageComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Voltage1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
		this.label = new draw2d.shape.basic.Label({
			text: "电压组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "电压",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "电压", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, //是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Voltage1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Voltage2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Voltage3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Voltage4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  frequencyComponent  频率
 */
var frequencyComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "frequencyComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/frequency1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "频率组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "频率",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "频率", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, //是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/frequency1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/frequency2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/frequency3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/frequency4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  activePowerComponent  有功功率
 */
var activePowerComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "activePowerComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/activepower1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "有功功率组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "有功功率",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "有功功率", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, //是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/activepower1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/activepower2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/activepower3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/activepower4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  ElectricityConsumptionComponent  用电量
 */
var ElectricityConsumptionComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricityConsumptionComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Electricityconsumption1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "用电量组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "用电量",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "用电量", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, //是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Electricityconsumption1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Electricityconsumption2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Electricityconsumption3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Electricityconsumption4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});
		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  levelComponent  液体流量
 */
var levelComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "levelComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/level1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "液体流量组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "液体流量",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "液体流量", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/level1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/level2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/level3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/level4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  GasComponent  气体流量
 */
var GasComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "GasComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Gas1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "气体流量组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.labelValue.fontSize = 6;
		this.labelValue.setStroke(0);
		this.labelValue.setFontColor("#FFFFFF");
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
		var data = {
				name: "气体流量",
				types: "imageComponent", //类型
				valueType: "valueComponent", //显示控件绑定的 tag 的值
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "气体流量", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, //是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Gas1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Gas2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Gas3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Gas4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  BroadcastComponent  广播
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "BroadcastComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Broadcast1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "广播组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "广播",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "广播", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Broadcast1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Broadcast2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Broadcast3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/Broadcast4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  monitoringComponent  枪机
 */
var monitoringComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "monitoringComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/monitoring1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "枪机组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "枪机",
				vlcurl:"",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "枪机", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { //Tag的地址
					tag_id: -1, //用户输入Tag的值
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/monitoring1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/monitoring2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/monitoring3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/monitoring4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
			vlcvalue(thiss);
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
 *  qiujiComponent  球机
 */

var qiujiComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "qiujiComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/qiuji1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "球机组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);		
		var data = {
				name: "球机",
				vlcurl:"",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "球机", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 4, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/qiuji1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/qiuji2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/qiuji3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/qiuji4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
			vlcvalue(thiss);
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
 *  highqiujiComponent  高球机
 */
var highqiujiComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "highqiujiComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/highqiuji1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "高球机组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);		
		var data = {
				name: "高球机",
				vlcurl:"",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "高球机", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: {
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/highqiuji1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/highqiuji2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/highqiuji3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/highqiuji4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
			vlcvalue(thiss);
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
 *  EntranceGuardComponent  门禁
 */
var EntranceGuardComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "EntranceGuardComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/menjin1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "门禁组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);	
		var data = {
				name: "门禁",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "门禁", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: { 
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/menjin1.png"
				},
				onFalse: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/menjin2.png"
				},
				onAlarm: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/menjin3.png"
				},
				onDisconnected: {
					LineWidth: 1,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/menjin4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
 *  detectorComponent  探测器
 */
var detectorComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "detectorComponent",
	init: function(attr) {
		this._super(attr);
		this.width = 36;
		this.height = 36;
		this.setResizeable(false);
		this.stroke = 1;
		this.setColor("#DDDDDD"); //边框颜色
		this.setBackgroundColor("#FFFFFF"); //背景颜色
		var thiss = this;



		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/tance1.png",
			width: 36,
			height: 36,

		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
		this.image.setRotationAngle(90);
		this.label = new draw2d.shape.basic.Label({
			text: "探测器组价组件标题",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		var data = {
				name: "探测器",
				types: "imageComponent", //类型
				proportion: null, //自定义属性,存储宽高比例等
				Description: "", //组件描述
				Caption: "探测器", //组件标题 组态时/指定引用Tag的Name属性
				ShowCaption: false, // 是否显示组件标题  (待定)
				Visible: true, //是否显示组件(setAlpha(0))
				Enable: false, //组件是否可用
				AccessLevel: 0, //访问等级 0~15
				ShowHint: false, //是否显示Hover说明(待定)
				Hint: "", //Hover说明的内容 (待定)
				Tag: {
					tag_id: -1,
					tag_type:-1,
					tag_name: "",
					bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
				},
				value: "",
				Readonly: false, //组件是否为只读
				Blinking: false, //组件闪烁
				BlinkingStroke: 1,
				BlinkingColor: "#DDDDDD",
				DashArray: "",
				BlinkingType: "style",
				onTrue: {
					LineWidth: 2,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/tance1.png"
				},
				onFalse: {
					LineWidth: 3,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/tance2.png"
				},
				onAlarm: {
					LineWidth: 4,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/tance3.png"
				},
				onDisconnected: {
					LineWidth: 5,
					LineColor: "#DDDDDD",
					LineStyle: null,
					Blinking: false,
					picture: "images/icon/icon/tance4.png"
				},
			}
			// 初始化 控件属性
		this.attr({
			userData: data
		});

		this.image.on("click", function() {
			displayDiv(thiss);
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
function displayDiv(obj) {
	//重置属性框
	resetAttributeMenu();
	$('.div-basic-hide').hide();
	$('.div-title').show();
	setFixedComponentStyleInEditFiled(obj)
}


//视频地址
function vlcvalue(thiss){
	$('.div-vlcurl').show();  //视频地址
	$('#comp-vlc-val').val(thiss.getUserData().vlcurl)		
}

// 设置 控件在编辑框的属性值
function setFixedComponentStyleInEditFiled(thiss) {

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
    console.log('隐藏组件:'+ thiss.getUserData().Visible)
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
}