var imagenum = 0;
/** 
 * image 标签
 * @author
 * @extend draw2d.shape.basic.Image
 */
var imageComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "imageComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        // this.setAlpha(0.001);
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/zidingyi.png",
            // path:"../img/img.png",
            // path: '../images/icon/icon/zidingyi12.svg',

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
        var data = {
            type: "imageComponent", //类型			
            proportion: { //自定义属性
                havepoint: "",
                value: "",
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
                name: '',
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
                    capText: '自定义图片控件' //内容
                },
                readOnly: false, //组件是否为只读
                picture: ''
            },
            onTrue: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                lineStyle: null,
                blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
            onFalse: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                lineStyle: null,
                blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
            onAlarm: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                lineStyle: null,
                blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
            onDisconnected: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                lineStyle: null,
                blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            }
        };
        this.attr({
            userData: data
        });


        this.on("click", function() {
            imageDisplayDiv(thiss);

            console.log("图片控件类型")
        });
        this.image.on("click", function() {
            imageDisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            thiss.image.setHeight(thiss.getHeight());
            thiss.image.setWidth(thiss.getWidth());
            componentResize(thiss);
        });
        // 移动
        this.on("move", function() {
            componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function() {
            if (thiss.userData.ShowHint) {
                showTooltips(thiss);
            }
        };
        this.image.onMouseLeave = function() {
            $canvas.comTooltips.hide();
        };




        /**
         *	双击方法----forexample--选择图片
         */
        this.on("dblclick", function() {});
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


function imageDisplayDiv(component) {
    // 基本
    setComponentOptions.basePublicSet(component);
    setComponentOptions.basicSet(component);
    // 大小
    setComponentOptions.componentSize(component);
    // 位置 旋转角度
    setComponentOptions.componentOffsetAndAngle(component);
    // 标题
    setComponentOptions.componentCaption(component);
    // 图片url
    setComponentOptions.imageSet(component);

}