/** 
 * image 标签
 * @author
 * @extend draw2d.shape.basic.Image
 */
var imageComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "imageComponent",
    init: function (attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setAlpha(0.001);
        // this.setBackgroundColor("transparent"); //背景颜色
        var _this = this;
        var imgBaseUrl = setComponentOptions.imageBaseUrl +"zidingyi.png";
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl,
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
            status:'default',//该组件绑定tag 的状态				
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
           
            routine: {
                name: '',
                description: '', //组件描述
                visible: false, //隐藏组件(setAlpha(0))
                enable: false, //不可用
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


            defaults:{//该属性用于存储 控件初始化时的状态
                lineWidth: 1,
                lineColor: "#DDDDDD",
                // lineStyle: null,
                blinking: false,
                picture:imgBaseUrl
            },
            onTrue: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                // lineStyle: null,
                blinking: false,
                picture:imgBaseUrl
            },
            onFalse: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                // lineStyle: null,
                blinking: false,
                picture: imgBaseUrl
            },
            onAlarm: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                // lineStyle: null,
                blinking: false,
                picture: imgBaseUrl
            },
            onDisconnected: {
                lineWidth: 1,
                lineColor: "#DDDDDD",
                // lineStyle: null,
                blinking: false,
                picture: imgBaseUrl
            }
        };
        this.attr({
            userData: data
        });


        this.on("click", function () {
            imgBasic.clickMethod(_this);
            // console.log("图片控件类型")
        });
        this.image.on("click", function () {
            imgBasic.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // thiss.image.setHeight(thiss.getHeight());
            // thiss.image.setWidth(thiss.getWidth());
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };




        /**
         *	双击方法----forexample--选择图片
         */
        this.on("dblclick", function () { });
    },

    onTimer: function () {
        this.setColor("#03A3FC");
        this.setStroke(1);
        this.setGlow(true);
        this.setDashArray("");
        var thiss = this;
        setTimeout(function () {
            thiss.setGlow(false);
            thiss.setColor(thiss.getUserData().BlinkingColor);
            thiss.setStroke(thiss.getUserData().BlinkingStroke);
            thiss.setDashArray(thiss.getUserData().DashArray);
        }, 500);
    }

})




var imgBasic = {
    // 自定义控件属性
    imgData: '',//img是特殊控件只有一个  该属性直接写进组件
    clickMethod: function (component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.imgHideDiv = true;
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
}