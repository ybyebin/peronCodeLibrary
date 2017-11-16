/** 
 * @description [直线] 
 * @extend draw2d.shape.basic.Line
 */
var LineComponent = draw2d.shape.basic.Line.extend({
	NAME: "LineComponent",
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

		this.on("click", function() {
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id)
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