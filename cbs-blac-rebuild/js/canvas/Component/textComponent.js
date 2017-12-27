
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
   			padding: {left:15, right:15}
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
			
		};
		this.onMouseLeave =  function() {
		};
		
		this.on("click", function() {
			
		});
		


	},
	onTimer:function(){
		monitoringVue.flashMethod(this);
    }
});




