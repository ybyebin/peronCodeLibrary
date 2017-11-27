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
            type: "lineComponent", //类型			
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
            blinking: { //闪烁
                flag: false, //是否闪烁
                lineWidth: 1,
                lineColor: "#35C99D",
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
                readOnly: false, //组件是否为只读
            },
            onTrue: {
                lineWidth: 1,
                lineColor: "#35C99D",
                lineStyle: null,
                blinking: false,
            },
            onFalse: {
                lineWidth: 1,
                lineColor: "#35C99D",
                lineStyle: null,
                blinking: false,
            },
            onAlarm: {
                lineWidth: 1,
                lineColor: "#35C99D",
                lineStyle: null,
                blinking: false,
            },
            onDisconnected: {
                lineWidth: 1,
                lineColor: "#35C99D",
                lineStyle: null,
                blinking: false,
            }


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
            } else {
                $('#horizontal').iCheck('check');
            }
            if (arr.data[0].x !== arr.data[1].x) {
                console.log('不垂直!')
                $('#vertical').iCheck('uncheck');
            } else {
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
        this.onMouseLeave = function() {
            $canvas.comTooltips.hide();
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

// 直线
function LineDisplayDiv(obj) {
    // 基本(公共)
    setComponentOptions.basePublicSet(component);
    // 基本
    setComponentOptions.basicSet(component);
}