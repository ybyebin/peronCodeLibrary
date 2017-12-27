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
			
		})			
	},
	onTimer:function(){
		monitoringVue.flashMethod(this);
    }
});