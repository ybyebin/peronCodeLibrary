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