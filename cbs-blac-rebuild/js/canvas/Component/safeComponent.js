/** 
 * @description [控件库]
 */










/****************************************自定义图片*******************************************/ 
 /** 
 * image 标签
 * @author
 * @extend draw2d.shape.basic.Image
 */
var imageComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "imageComponent",
	init: function(attr) {
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/zidingyi.png",
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

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			alert('123')
		});

		/**
		 *	双击方法
		 */
		this.on("dblclick", function() {});
	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

})





/****************************************默认组件********************************************/ 

/** 
 * @description [开关]
 * @extend draw2d.shape.basic.Rectangle
 */
var switchComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "switchComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/switch1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "开关",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

});

/** 
 * @description [管道]
 * @extend draw2d.shape.basic.Rectangle
 */
var pipingComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "pipingComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/piping1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "管道",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

});

/** 
 * @description [报警提示灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var WarninglampComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "WarninglampComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Warninglamp1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "报警提示灯",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

});

/** 
 * @description [送风机]
 * @extend draw2d.shape.basic.Rectangle
 */
var blowerfanComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "blowerfanComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Blowerfan1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "送风机标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

});


/** 
 * @description [排风机]
 * @extend draw2d.shape.basic.Rectangle
 */
var exhaustfanComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "exhaustfanComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Exhaustfan1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "排风机标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});



	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

});


/** 
 * @description [泵]
 * @extend draw2d.shape.basic.Rectangle
 */
var bengComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "bengComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/beng1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "泵标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}

});



/** 
 * @description [电动两通阀]
 * @extend draw2d.shape.basic.Rectangle
 */
var ElectricTwoWayValveComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricTwoWayValveComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve1-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电动两通阀标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [电磁阀]
 * @extend draw2d.shape.basic.Rectangle
 */
var SolenoidValveComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "SolenoidValveComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve2-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电磁阀标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [电动碟阀]
 * @extend draw2d.shape.basic.Rectangle
 */
var ElectricButterflyValvesComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricButterflyValvesComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve3-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电动蝶阀标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});
	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [空气过滤器]
 * @extend draw2d.shape.basic.Rectangle
 */
var AirFiltrationComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirFiltrationComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Airfiltration1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气过滤器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});
	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [空气加热器]
 * @extend draw2d.shape.basic.Rectangle
 */
var AirHeatingComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirHeatingComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Airheating1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气加热器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.image.onMouseLeave = function() {
			$('#tooltips').hide();
		};


		this.image.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === -1) {
				// layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					// layer.msg('本控件为只读控件');
				}
			}
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [空气冷却器]
 * @extend draw2d.shape.basic.Rectangle
 */
var AirCoolerComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirCoolerComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Aircooler1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气冷却器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
		
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [加湿器]
 * @extend draw2d.shape.basic.Rectangle
 */
var HumidifierComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "HumidifierComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/humidifier1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "加湿器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [温控面板]
 * @extend draw2d.shape.basic.Rectangle
 */
var controlPanelComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "controlPanelComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/controlpanel1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "温控面板标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [荧光灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var FluorescentLampComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "FluorescentLampComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Fluorescentlamp1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "荧光灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});



	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [LED灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var LEDComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "LEDComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/LED1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "LED灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [白炽灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var IncandescentComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "IncandescentComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Incandescent1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "白炽灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
				
		});
	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [金卤灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var MetalHalideComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "MetalHalideComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);


		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Metalhalide1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "金卤灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [温度]
 * @extend draw2d.shape.basic.Rectangle
 */
var temperatureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "temperatureComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/temperature1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "温度标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "温度",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));


		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});
/** 
 * @description [湿度]
 * @extend draw2d.shape.basic.Rectangle
 */
var humidityComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "humidityComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/humidity1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "湿度标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "湿度",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom());

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [压力]
 * @extend draw2d.shape.basic.Rectangle
 */
var pressureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "pressureComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/pressure1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "压力标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "压力",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});
	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [压差]
 * @extend draw2d.shape.basic.Rectangle
 */
var differentialPressureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "differentialPressureComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/differentialpressure1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "压差标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "压差",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [液位]
 * @extend draw2d.shape.basic.Rectangle
 */
var liquidComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "liquidComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/liquid1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "液位标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "液位",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
		
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [电流]
 * @extend draw2d.shape.basic.Rectangle
 */
var electricComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "electricComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/electric1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电流标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "电流",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
		
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [电压]
 * @extend draw2d.shape.basic.Rectangle
 */
var VoltageComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "VoltageComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Voltage1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电压组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "电压",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
		
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [频率]
 * @extend draw2d.shape.basic.Rectangle
 */
var frequencyComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "frequencyComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/frequency1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "频率组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "频率",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [有功功率]
 * @extend draw2d.shape.basic.Rectangle
 */
var activePowerComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "activePowerComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/activepower1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "有功功率组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "有功功率",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
		
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [用电量]
 * @extend draw2d.shape.basic.Rectangle
 */
var ElectricityConsumptionComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricityConsumptionComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Electricityconsumption1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "用电量组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "用电量",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [液体流量]
 * @extend draw2d.shape.basic.Rectangle
 */
var levelComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "levelComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/level1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "液体流量组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "液体流量",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});
	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [气体流量]
 * @extend draw2d.shape.basic.Rectangle
 */
var GasComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "GasComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Gas1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "气体流量组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "气体流量",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);	
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [广播]
 * @extend draw2d.shape.basic.Rectangle
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "BroadcastComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Broadcast1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "广播组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
		
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [枪机]
 * @extend draw2d.shape.basic.Rectangle
 */
var monitoringComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "monitoringComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/monitoring1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "枪机组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [球机]
 * @extend draw2d.shape.basic.Rectangle
 */

var qiujiComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "qiujiComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/qiuji1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "球机组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [高球机]
 * @extend draw2d.shape.basic.Rectangle
 */
var highqiujiComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "highqiujiComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/highqiuji1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "高球机组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};


		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [门禁]
 * @extend draw2d.shape.basic.Rectangle
 */
var EntranceGuardComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "EntranceGuardComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;


		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/menjin1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "门禁组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};

		this.image.on("click", function() {
		
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [探测器]
 * @extend draw2d.shape.basic.Rectangle
 */
var detectorComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "detectorComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

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
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		this.image.onMouseEnter = function() {
			
		};
		this.image.onMouseLeave = function() {
		};
		this.image.on("click", function() {
			
		});

	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
});


