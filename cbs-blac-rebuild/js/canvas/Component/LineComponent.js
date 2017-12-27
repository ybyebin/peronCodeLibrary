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

		// 悬浮窗
		this.onMouseEnter = function() {
			
		};
		this.onMouseLeave =  function() {
			
		};

		this.on("click", function() {
			
		});


	},
	onTimer: function() {
		monitoringVue.flashMethod(this);
	}
})