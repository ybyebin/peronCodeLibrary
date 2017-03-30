
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

		
		this.label = new draw2d.shape.basic.Label({
			text: "Label",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 选中
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
		})			
	},
	onTimer:function(){
        this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;
		console.log("123");

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
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);
				break;
				case "onFalse":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);
				break;
				case "onAlarm":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);
				break;
				case "onDisconnected":
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);
				break;
			}
		}, 500);
    }
});