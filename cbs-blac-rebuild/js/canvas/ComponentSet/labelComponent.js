var labelnum = 0;
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
        this.fontFamily = "微软雅黑";
        this.setWidth(100);
        this.minWidth = 200;
        // this.setBackgroundColor("#999999");
        // this.setBackgroundColor('#515F7B')
        this.setColor("#FFFFFF");
        this.setRadius(2);
        // this.attr({
        //  			padding: {left:15, right:15}
        // 	});
        var thiss = this;

        // 这里设置hover事件
        this.titles = "这里是lable控件"; //设置鼠标指示标题
        this.ShowHint = false;
        var data = {
            type: "LabelComponent", //类型			
            proportion: { //自定义属性
                valueType: 'valueComponent', //显示控件绑定的 tag 的值
                havepoint: "", //(待定)
                value: "", //(待定)
            },
            tag: {
                tag_id: -1,
                tag_type: -1,
                tag_name: "",
                bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
            },
            blinking: { //闪烁
                flag: false, //是否闪烁
                lineWidth: 1,
                lineColor: "#D8D8D8",
                lineStyle: null,
                type: 'style' //备用(忘了干嘛的)
            },
            routine: {
                name: 'lable',
                description: '', //组件描述
                visible: false, //是否显示组件(setAlpha(0))
                enable: false, //组件是否可用
                accessLevel: 8, //访问等级 0~15
                hint: { //hover 说明
                    flag: false, //是否显示
                    hintText: '' //text
                },
                caption: { //组件标题
                    flag: false, //是否显示
                    capText: 'label' //内容
                },
                readOnly: false, //组件是否为只读
            },
        };
        this.attr({
            userData: data
        });

        this.label = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 选中
        this.on("click", function() {
            labeldisplayDiv(thiss);
        });

        // 移动
        this.on("move", function() {
            componentMove(thiss)

        });
        // 悬浮窗
        this.onMouseEnter = function() {
            if (thiss.userData.ShowHint) {
                showTooltips(thiss);
            }
        };
        this.onMouseLeave = function() {
            $canvas.comTooltips.hide();
        };

        // =========更改文本===================
        // this.installEditor(new draw2d.ui.LabelInplaceEditor({
        // 	onCommit: $.proxy(function(value) {

        // 		data.text = value;
        // 		console.log(">>>>>>>>>>>" + JSON.stringify(data, null, 2));
        // 		// this.label.getParent().setUserData(data);
        // 		this.attr({
        // 			userData: data
        // 		});

        // 		console.log(">>>>>>>>>>>" + JSON.stringify(this.userData, null, 2));
        // 		if (typeof(Storage) !== "undefined") {
        // 			console.log("支持保存设置");
        // 			// localStorage.setItem(this.label.getParent().getId(), value);//存储图标
        // 		}

        // 		// alert("new value set to:"+value + "父元素ID:" + this.getId());
        // 	}, this),
        // 	onCancel: function() {}
        // }));


    },
    onTimer: function() {
        this.setColor("#03A3FC");
        this.setStroke(1);
        this.setGlow(true);
        this.setDashArray("");
        var thiss = this;
        setTimeout(function() {
            thiss.setGlow(false);
            thiss.setColor(thiss.getUserData().BlinkingColor);
            thiss.setStroke(thiss.getUserData().BlinkingStroke);
            thiss.setDashArray(thiss.getUserData().DashArray);
        }, 500);
    }
})

// 属性框
function labeldisplayDiv(component) {
    // 基本(公共)
    setComponentOptions.basePublicSet(component);
    // 位置 旋转角度
    setComponentOptions.componentOffsetAndAngle(component);

    setComponentOptions.labelSet(component);


}

// 设置 自定义图片控件在编辑框的属性值
function setCustomLabelComponentStyleInEditFiled(com) {
    checkComponentTagidIsNull(); //判断前一个控件是否正确绑定Tag

    /*
     * 暂存该控件的id
     * 用于刷新控件的属性
     */
    $canvas.compID.html(com.id);
    checkThisComponentIsTrue(com); //检查本控件的Tag是否正确(如果已经绑定)









}