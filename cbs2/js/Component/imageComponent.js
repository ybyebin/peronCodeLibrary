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

		this.onMouseEnter = function() {
			if (this.ShowHint !== false) {
				hoverShow(thiss);
			};
		};
		this.onMouseLeave = function() {
			$("#mainCanvasTooltip").css("display", "none");
		};

		//此处 两个都添加点击方法
		this.on("click", function() {
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
		this.image.on("click", function() {
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



		/**
		 *	双击方法
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