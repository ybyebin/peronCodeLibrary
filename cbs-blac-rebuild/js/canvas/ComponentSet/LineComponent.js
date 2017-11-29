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
        var _this = this;
        //基础数据
        var data = {
            type: "lineComponent", //类型	
            status:'default',//该组件绑定tag 的状态			
            proportion: { //自定义属性
                havepoint: "", //(待定)
                value: "", //(待定)
            },
            tag: {
                tag_id: -1,
                tag_type: -1,
                tag_name: "",
                bingding_status: 0 //0 默认状态,1 已经绑定,2 绑定错误
            },
           
            routine: {
                name: '直线',
                description: '', //组件描述
                visible: false, //是否显示组件(setAlpha(0))
                enable: false, //组件是否可用
                accessLevel: 8, //访问等级 0~15
                hint: { //hover 说明
                    flag: false, //是否显示
                    hintText: '' //text
                },
                readOnly: false, //组件是否为只读
            },
            defaults:{//该属性用于存储 控件初始化时的状态
                lineWidth: 1,
                lineColor: "#35C99D",
                // lineStyle: null,
                blinking: false,
            },
            onTrue: {
                lineWidth: 1,
                lineColor: "#35C99D",
                // lineStyle: null,
                blinking: false,
            },
            onFalse: {
                lineWidth: 1,
                lineColor: "#35C99D",
                // lineStyle: null,
                blinking: false,
            },
            onAlarm: {
                lineWidth: 1,
                lineColor: "#35C99D",
                // lineStyle: null,
                blinking: false,
            },
            onDisconnected: {
                lineWidth: 1,
                lineColor: "#35C99D",
                // lineStyle: null,
                blinking: false,
            }


        };

        this.attr({
            userData: data
        });

        this.on("click", function() {
            lineBasic.clickMethod(_this);
        });
        this.on("change", function() {
            // console.log('===============')
            // var arr = thiss.getVertices();

            // if (arr.data[0].y !== arr.data[1].y) {
            //     console.log('不水平!')
            //     $('#horizontal').iCheck('uncheck');
            // } else {
            //     $('#horizontal').iCheck('check');
            // }
            // if (arr.data[0].x !== arr.data[1].x) {
            //     console.log('不垂直!')
            //     $('#vertical').iCheck('uncheck');
            // } else {
            //     $('#vertical').iCheck('check');
            // }
        });

        // 缩放
        this.on("resize", function() {
            // $('#comp-width').val(thiss.getWidth());
            // $('#comp-height').val(thiss.getHeight());
        });
        // 移动
        this.on("move", function() {
            // $canvas.comOffsetX.val(thiss.getVertices().data[0].x);
            // $canvas.comOffsetY.val(thiss.getVertices().data[0].y);
            // $canvas.comTooltips.hide();
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            // if (thiss.userData.ShowHint) {
            //     var tooltips = $canvas.comTooltips;
            //     if (thiss.userData.Hint !== '') {
            //         tooltips.show().html(thiss.userData.Hint);
            //         var tPosX = thiss.getVertices().data[0].x - tooltips.width() / 2 - 10;
            //         var tPosY = thiss.getVertices().data[0].y + 13;
            //         tooltips.css({
            //             'top': tPosY + 'px',
            //             'left': tPosX + 'px'
            //         });
            //     }
            // }
        };
        this.onMouseLeave = function() {
            // $canvas.comTooltips.hide();
        };
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
});


var lineBasic = {
    // 自定义控件属性
    lineData: '',//line是特殊控件只有一个  该属性直接写进组件
    clickMethod: function (component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.lineHideDiv = true;
        // 基本(公共)
        setComponentOptions.basePublicSet(component);
        // 基本
        setComponentOptions.basicSet(component);

        setComponentOptions.setComponentFlagTrue();
    }
}