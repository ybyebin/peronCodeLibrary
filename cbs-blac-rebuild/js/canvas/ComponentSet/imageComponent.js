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
            name: "自定义图片控件",
            types: "imageComponent", //类型
            proportion: null, //自定义属性,存储宽高比例等
            Description: "", //组件描述
            Caption: "自定义图片控件", //组件标题 组态时/指定引用Tag的Name属性
            ShowCaption: false, // 是否显示组件标题  (待定)
            Visible: true, //是否显示组件(setAlpha(0))
            Enable: false, //组件是否可用
            AccessLevel: 0, //访问等级 0~15
            ShowHint: false, //是否显示Hover说明(待定)
            Hint: "", //Hover说明的内容 (待定)
            Tag: {
                tag_id: -1,
                tag_type: -1,
                tag_name: "",
                bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
            },
            value: "",
            Readonly: false, //组件是否为只读
            Blinking: false, //组件闪烁
            BlinkingStroke: 1,
            BlinkingColor: "#DDDDDD",
            DashArray: "",
            picture: "",
            BlinkingType: "style",
            onTrue: {
                LineWidth: 1,
                LineColor: "#DDDDDD",
                LineStyle: null,
                Blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
            onFalse: {
                LineWidth: 1,
                LineColor: "#DDDDDD",
                LineStyle: null,
                Blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
            onAlarm: {
                LineWidth: 1,
                LineColor: "#DDDDDD",
                LineStyle: null,
                Blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
            onDisconnected: {
                LineWidth: 1,
                LineColor: "#DDDDDD",
                LineStyle: null,
                Blinking: false,
                picture: "images/icon/icon/zidingyi.png"
            },
        }
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


function imageDisplayDiv(obj) {

    // 基本
    setComponentOptions.basicSet(component);
    // 位置大小
    setComponentOptions.sizeAndOffset(component);
    // 标题
    setComponentOptions.componentCaption(component);
    setCustomImageComponentStyleInEditFiled(obj)
}

// 设置 自定义图片控件在编辑框的属性值
function setCustomImageComponentStyleInEditFiled(com) {
    // style
    // 图片地址  picture 
    $canvas.stylePicture.val(com.getUserData().picture);

    //onTrue
    //图片地址  picture 
    $canvas.onTruePicture.val(com.getUserData().onTrue.picture);

    // onFalse
    // 图片地址  picture  
    $canvas.onFalsePicture.val(com.getUserData().onFalse.picture);

    //onAlarm
    // 图片地址  picture 
    $canvas.onAlarmPicture.val(com.getUserData().onAlarm.picture);

    //onDisconnected
    // 图片地址  picture 
    $canvas.onDiscPicture.val(com.getUserData().onDisconnected.picture);

}