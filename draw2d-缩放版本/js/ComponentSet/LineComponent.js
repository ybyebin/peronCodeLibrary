
var linenum = 0;


/** 
 * Line Component
 * @author 
 * @extend draw2d.shape.basic.Line
 */
var LineComponent = draw2d.shape.basic.Line.extend({
	NAME: "LineComponent",
	init: function(attr) {
		this._super(attr);
		this.setColor("#35C99D");
		this.setStroke(2);
		var thiss = this;		
		//基础数据
		var data = {
			name:"直线",
			types: "LineComponent", //类型
			proportion: null, //自定义属性,存储宽高比例等
			Description: "", //组件描述
			Visible: true, //是否显示组件(setAlpha(0))
			Enable: false, //组件是否可用
			AccessLevel: 0, //访问等级 0~15
			ShowHint: false, //是否显示Hover说明(待定)
			Hint: "", //Hover说明的内容 (待定)
			Tag: { 
				tag_id: -1,
				tag_type:-1,
				tag_name:"",
				bingding_status:0    //0 默认状态,1 已经绑定,2 绑定错误
			},
			value:"",
			Readonly: false, //组件是否为只读
			Blinking: false, //组件闪烁
			BlinkingStroke:1,
			BlinkingColor:"#35C99D",
			DashArray:"",
			BlinkingType:"style",
			onTrue: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
			onFalse: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
			onAlarm: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
			onDisconnected: {
				LineWidth:1,
				LineColor:"#35C99D",
				LineStyle:"",
				Blinking:false
			},
		};

		this.attr({
			userData: data
		});
			
		this.on("click", function() {
			LineDisplayDiv(thiss);
		});
		this.on("change", function() {
			console.log('===============')
			var arr = thiss.getVertices();

			if (arr.data[0].y !== arr.data[1].y) {
				console.log('不水平!')
				$('#horizontal').iCheck('uncheck');
			}else{
				$('#horizontal').iCheck('check');
			}
			if (arr.data[0].x !== arr.data[1].x) {
				console.log('不垂直!')
				$('#vertical').iCheck('uncheck');
			}else{
				$('#vertical').iCheck('check');
			}
		});
		
		// 缩放
		this.on("resize", function() {
			// $('#comp-width').val(thiss.getWidth());
			// $('#comp-height').val(thiss.getHeight());
		});
		// 移动
		this.on("move", function() {
			$canvas.comOffsetX.val(thiss.getVertices().data[0].x);
			$canvas.comOffsetY.val(thiss.getVertices().data[0].y);
			$canvas.comTooltips.hide();
		});

		// 悬浮窗
		this.onMouseEnter = function() {
			if (thiss.userData.ShowHint) {				
				var tooltips = $canvas.comTooltips;
				if (thiss.userData.Hint !== '') {
					tooltips.show().html(thiss.userData.Hint);
					var tPosX = thiss.getVertices().data[0].x - tooltips.width() / 2 - 10;
					var tPosY = thiss.getVertices().data[0].y + 13;
					tooltips.css({
						'top': tPosY + 'px',
						'left': tPosX + 'px'
					});
				}
			}
		};
		this.onMouseLeave =  function() {
			$canvas.comTooltips.hide();
		};
	},
	onTimer:function(){
        this.setColor("#03A3FC");
		this.setStroke(1);
		this.setGlow(true);
		this.setDashArray("");
		var thiss = this;		
		setTimeout(function(){
				thiss.setGlow(false);
				thiss.setColor(thiss.getUserData().BlinkingColor);
				thiss.setStroke(thiss.getUserData().BlinkingStroke);
				thiss.setDashArray(thiss.getUserData().DashArray);			
		}, 500);
    }
});

// 直线
function LineDisplayDiv(obj){
	//重置属性框
	resetAttributeMenu();
	// 隐藏该控件没有的属性
	$('.div-basic-hide').hide();
	$('.div-fill').hide();
	$('.div-line-only').hide();
	$('.div-line-check').show();
	$('.div-normal-width').hide();
	$('.div-line-conduit').show();
	componentInitData(obj);
}

//直线方法
function LineComponentStyleInEditFiled(thiss) {
	
}
