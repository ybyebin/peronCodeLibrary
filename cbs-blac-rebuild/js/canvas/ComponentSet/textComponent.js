// 自定义控件属性
var textComponentData = JSON.stringify({
    type: "buttonComponent", //类型			
    proportion: { //自定义属性
        valueType: 'textValueComponent',
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
        lineColor: "#DDDDDD",
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
            capText: 'label' //内容
        },
        readOnly: false, //组件是否为只读
        unit: '' //单位
    },
    onTrue: {
        lineWidth: 0,
        lineColor: "#DDDDDD",
        lineStyle: null,
        fillColor: "none",
        text: '',
        alpha: '',
        textColor: '#FFFFFF',
        // unit:
        blinking: false,
    },
    onFalse: {
        lineWidth: 0,
        lineColor: "#DDDDDD",
        lineStyle: null,
        fillColor: "none",
        text: '',
        alpha: '',
        textColor: '#FFFFFF',
        // unit:
        blinking: false,
    },
    onAlarm: {
        lineWidth: 0,
        lineColor: "#DDDDDD",
        lineStyle: null,
        fillColor: "none",
        text: '',
        alpha: '',
        textColor: '#FFFFFF',
        // unit:
        blinking: false,
    },
    onDisconnected: {
        lineWidth: 0,
        lineColor: "#DDDDDD",
        lineStyle: null,
        fillColor: "none",
        text: '',
        alpha: '',
        textColor: '#FFFFFF',
        // unit:
        blinking: false,
    }
})


/** 
 * text 标签
 * @author
 * @extend draw2d.shape.basic.Text
 */
var textComponent = draw2d.shape.basic.Text.extend({
    NAME: "textComponent",
    init: function(attr) {
        this._super(attr);
        this.text = "0";
        this.fontFamily = "微软雅黑";
        this.setStroke(0);
        this.setFontColor("#FFFFFF")
        this.setFontSize(15);
        this.setResizeable(false);
        // this.setAlpha(0.3);
        // this.setBackgroundColor('#4F5D77');	
        this.attr({
            padding: {
                left: 15,
                right: 15
            }
        });

        var thiss = this;
        // 添加标题
        this.label = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
                // color: "#0d0d0d",
                // fontColor: "#0d0d0d"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);
        var data = JSON.parse(textComponentData);
        data.routine.name = '标签';
        this.attr({
            userData: data
        });

        this.on("click", function() {
            textdisplayDiv(thiss);
            $canvas.menuDivUnit.show();
            $canvas.menuDivTextAlpha.show();

            $canvas.styleTextUnit.val(thiss.getUserData().unit);
            $canvas.onTrueTextUnit.val(thiss.getUserData().onTrue.unit);
            $canvas.onFalseTextUnit.val(thiss.getUserData().onFalse.unit);
            $canvas.onAlarmTextUnit.val(thiss.getUserData().onAlarm.unit);
            $canvas.onDiscTextUnit.val(thiss.getUserData().onDisconnected.unit);

            if (thiss.getBackgroundColor().hash() === 'none') {
                $canvas.styleBgAlpha.iCheck('check').iCheck('disable');
            } else {
                $canvas.styleBgAlpha.iCheck('uncheck').iCheck('enable');

            }

            if (thiss.getUserData().onTrue.FillColor === 'none') {
                $canvas.onTrueBgAlpha.iCheck('check').iCheck('disable');
            } else {
                $canvas.onTrueBgAlpha.iCheck('uncheck').iCheck('enable');

            }
            if (thiss.getUserData().onFalse.FillColor === 'none') {
                $canvas.onFalseBgAlpha.iCheck('check').iCheck('disable');
            } else {
                $canvas.onFalseBgAlpha.iCheck('uncheck').iCheck('enable');
            }
            if (thiss.getUserData().onAlarm.FillColor === 'none') {
                $canvas.onAlarmBgAlpha.iCheck('check').iCheck('disable');
            } else {
                $canvas.onAlarmBgAlpha.iCheck('uncheck').iCheck('enable');
            }

            if (thiss.getUserData().onDisconnected.FillColor === 'none') {
                $canvas.onDiscBgAlpha.iCheck('check').iCheck('disable');
            } else {
                $canvas.onDiscBgAlpha.iCheck('uncheck').iCheck('enable');
            }



        });
        // 移动
        this.on("move", function() {
            componentMove(thiss);
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
        // this.installEditor(new draw2d.ui.LabelInplaceEditor());


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

/** 
 * button 标签
 * @author
 * @extend draw2d.shape.note.PostIt
 */
var buttonComponent = draw2d.shape.note.PostIt.extend({
    NAME: "buttonComponent",
    init: function(attr) {
        this._super(attr);
        this.text = "按钮";
        this.fontFamily = "微软雅黑";
        this.setBackgroundColor("#FFFFFF");
        this.setColor("#35C99D");
        this.height = 25;
        this.width = 60;
        this.setFontColor("#35C99D");
        this.setRadius(2);
        this.setFontSize(14);
        var thiss = this;
        thiss.attr({
            padding: {
                left: 20,
                top: 3,
                right: 20
            }
        });
        var data = JSON.parse(textComponentData);
        data.routine.name = 'button标签';
        this.attr({
            userData: data
        });
        this.label = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
                // color: "#0d0d0d",
                // fontColor: "#0d0d0d"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        this.on("click", function() {
            textdisplayDiv(thiss);
        });

        // 移动
        this.on("move", function() {
            componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function() {
            if (this.userData.ShowHint) {
                showTooltips(this);
            }
        };
        this.onMouseLeave = function() {
            $canvas.comTooltips.hide();
        };


        // =========更改文本===================
        this.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: $.proxy(function(value) {

                data.text = value;
                console.log(">>>>>>>>>>>" + JSON.stringify(data, null, 2));
                // this.label.getParent().setUserData(data);
                this.attr({
                    userData: data
                });

            }, this),
            onCancel: function() {}
        }));


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


// 属性框
function textdisplayDiv(obj) {
    // 基本
    setComponentOptions.basePublicSet(component);
    setComponentOptions.basicSet(component);

    // 位置 旋转角度
    setComponentOptions.componentOffsetAndAngle(component);

    // 标题
    setComponentOptions.componentCaption(component);
}