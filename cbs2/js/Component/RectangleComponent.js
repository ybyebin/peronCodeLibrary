/** 
 * @description [矩形]
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
	NAME: "rectangleComponent",
	init: function(attr) {
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		// 悬浮窗
		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		this.getOutputPort(0).setVisible(false);
		this.getInputPort(0).setVisible(false);

		this.onDoubleClick = function() {

		};
		// 单击事件
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id)
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

	},

	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}


})



/** 
 * @description [圆角矩形]  
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
	NAME: "RoundedRectangleComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		// 悬浮窗
		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};
		this.onDoubleClick = function() {

		};

		this.getOutputPort(0).setVisible(false);
		this.getInputPort(0).setVisible(false);
		// 选中
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

	},


	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;


		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}

})

/** 
 * @description [椭圆]  
 * @extend draw2d.shape.basic.Rectangle 
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
	NAME: "EllipseComponent",
	init: function(attr) {
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		this.setRadius(25);
		this.setHeight(30);

		// 悬浮窗
		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		this.onDoubleClick = function() {

		};

		this.getOutputPort(0).setVisible(false);
		this.getInputPort(0).setVisible(false);
		
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});



	},

	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}

});


/** 
 * @description [多边形]  
 * @extend draw2d.shape.basic.Polygon
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
	NAME: "polygonComponent",
	init: function(attr) {
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		this.onDoubleClick = function() {

		};

		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

	},
	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}

});


/** 
 * @description [右箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forRightComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);

		this.setSelectable(false);
		this.setDraggable(false);


		var thiss = this;

		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};


		this.onDoubleClick = function() {
			// console.log(123)
		};
		// 

		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		})



	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		// return this.canvas.paper.path("M21.786,12.876l7.556-4.363l-7.556-4.363v2.598H2.813v3.5h18.973V12.876z");
		return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");

	},
	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}
});



/** 
 * @description [左箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forLeftComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		var thiss = this;
		this.setSelectable(false);
		this.setDraggable(false);

		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};
		this.onDoubleClick = function() {
			console.log(123)
		};
		// 

		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		})


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
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}
});


/** 
 * @description [上箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forUpComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);


		var thiss = this;
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		this.onDoubleClick = function() {
			// console.log(123)
		};
		// 

		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		})



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
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}
});


/** 
 * @description [下箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({

	NAME: "forDownComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;

		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		this.onDoubleClick = function() {

		};
		// 

		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});
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
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}
});



/** 
 * @description [水平双箭头]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({

	NAME: "BothArrowHComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 50,
			height: 30
		}, attr), setter, getter);	
		this.setSelectable(false);
		this.setDraggable(false);
		
		var thiss = this;
		
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};	
		this.onDoubleClick = function(){
			
		};
		
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

		

	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
	},
	onTimer:function(){
        this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function(){
			switch(thiss.getUserData().BlinkingType){
				case "style":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);
				break;
				case "onTrue":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onTrue.LineColor);
				thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
				thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
				break;
				case "onFalse":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onFalse.LineColor);
				thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
				thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
				break;
				case "onAlarm":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onAlarm.LineColor);
				thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
				thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
				break;
				case "onDisconnected":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onAlarm.LineColor);
				thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
				thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
				break;
			}
		}, 500);
    }
});

/** 
 * @description [竖直双箭头]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({

	NAME: "BothArrowVComponent",
	init: function(attr, setter, getter) {
		this._super($.extend({
			width: 30,
			height: 50
		}, attr), setter, getter);
		
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		console.log("边框宽度" + this.getStroke( ));
		
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};		
		this.onDoubleClick = function(){
			// alert("123")
		};
		
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

		

	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function() {
		return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
	},
	onTimer:function(){
        this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function(){
			switch(thiss.getUserData().BlinkingType){
				case "style":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);
				break;
				case "onTrue":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onTrue.LineColor);
				thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
				thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
				break;
				case "onFalse":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onFalse.LineColor);
				thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
				thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
				break;
				case "onAlarm":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onAlarm.LineColor);
				thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
				thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
				break;
				case "onDisconnected":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().onAlarm.LineColor);
				thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
				thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
				break;
			}
		}, 500);
    }
});


// 管道
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
	NAME: "conduitCompontent",
	init: function(attr) {
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};

		// this.getOutputPort(0).setVisible(false);
		// this.getInputPort(0).setVisible(false);

		this.onDoubleClick = function() {

		};
		// 单击事件
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

	},

	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}
})

var conduitCompontentV = draw2d.shape.node.HorizontalBus.extend({
	NAME: "conduitCompontentV",
	init: function(attr) {
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		var thiss = this;
		// 悬浮窗
		this.onMouseEnter = function() {
			if (this.userData.ShowHint) {
				showTooltips(this);
			}
		};
		this.onMouseLeave =  function() {
			$('#tooltips').hide();
		};
		
		this.onDoubleClick = function() {

		};
		// 单击事件
		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});

	},

	onTimer: function() {
		this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;

		setTimeout(function() {
			switch (thiss.getUserData().BlinkingType) {
				case "style":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().BlinkingColor);
					thiss.setStroke(thiss.getUserData().BlinkingStroke);
					thiss.setDashArray(thiss.getUserData().DashArray);
					break;
				case "onTrue":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onTrue.LineColor);
					thiss.setStroke(thiss.getUserData().onTrue.LineWidth);
					thiss.setDashArray(thiss.getUserData().onTrue.LineStyle);
					break;
				case "onFalse":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onFalse.LineColor);
					thiss.setStroke(thiss.getUserData().onFalse.LineWidth);
					thiss.setDashArray(thiss.getUserData().onFalse.LineStyle);
					break;
				case "onAlarm":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
				case "onDisconnected":
					thiss.setGlow(false);
					thiss.setColor(thiss.getUserData().onAlarm.LineColor);
					thiss.setStroke(thiss.getUserData().onAlarm.LineWidth);
					thiss.setDashArray(thiss.getUserData().onAlarm.LineStyle);
					break;
			}
		}, 500);
	}
})