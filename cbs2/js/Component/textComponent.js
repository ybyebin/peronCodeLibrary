
/** 
 * text 标签
 * @author yb
 * @extend draw2d.shape.basic.Text
 * @Data 2016/5/16
 */ 

var textComponent = draw2d.shape.basic.Text.extend({
	NAME: "textComponent",
	init: function(attr) {
		this._super(attr);
		this.text = "输入文本";
		
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		this.setFontSize(14);	
		this.attr({
   			padding: {left:20, right:20}
 		});

		var thiss = this;
		// 添加标题
		this.label = new draw2d.shape.basic.Label({
			text: ""
			// color: "#0d0d0d",
			// fontColor: "#0d0d0d"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);
		
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
			console.log("绑定的id:"+thiss.getUserData().Tag.tag_id);
			if (thiss.getUserData().Tag.tag_id === "") {
				layer.msg('未绑定任何数据标签')
			} else {
				if (thiss.getUserData().Readonly == false) {
					console.log('查看:'+thiss.getUserData().Readonly)
					changeComponentState(thiss.id);
				}else{
					layer.msg('本控件为只读控件');
				}
			}
		});
		


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
 * @description [按钮]
 * @extend draw2d.shape.note.PostIt
 */
var buttonComponent = draw2d.shape.note.PostIt.extend({
	NAME: "buttonComponent",
	init: function(attr) {
		this._super(attr);

		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		var thiss = this;
		thiss.attr({
			padding: {
				left: 20,
				top: 3,
				right: 20
			}
		});

		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {
				showTooltips(thiss);
			}
		};
		this.onMouseLeave = function() {
			$('#tooltips').hide();
		};
		this.label = new draw2d.shape.basic.Label({
			text: "标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


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

