/** 
 * safe 控件
 * @author yb
 * @Data 2016/7/13
 */

var safeimgulr = 'images/icon/icon/';
// 自定义控件属性
var safeComponentData = JSON.stringify({
    type: "imageComponent", //类型			
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
    },
    onTrue: {
        lineWidth: 1,
        lineColor: "#DDDDDD",
        lineStyle: null,
        blinking: false,
        picture: ''
    },
    onFalse: {
        lineWidth: 1,
        lineColor: "#DDDDDD",
        lineStyle: null,
        blinking: false,
        picture: ''
    },
    onAlarm: {
        lineWidth: 1,
        lineColor: "#DDDDDD",
        lineStyle: null,
        blinking: false,
        picture: ''
    },
    onDisconnected: {
        lineWidth: 1,
        lineColor: "#DDDDDD",
        lineStyle: null,
        blinking: false,
        picture: ''
    }
})

/** 
 *  switchComponent  开关
 */
var switchComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "switchComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/switch1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "开关",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);
        this.label.attr({
            padding: { left: 0, right: 0, top: 0, bottom: 0 }
        });
        this.label.setFontSize(2);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = 'Switch';
        data.onTrue.picture = safeimgulr + 'switch1.png';
        data.onFalse.picture = safeimgulr + 'switch2.png';
        data.onAlarm.picture = safeimgulr + 'switch3.png';
        data.onDisconnected.picture = safeimgulr + 'switch4.png';


        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            thiss.image.setHeight(thiss.getHeight());
            thiss.image.setWidth(thiss.getWidth());
            $('#comp-width').val(thiss.getWidth());
            $('#comp-height').val(thiss.getHeight());
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
 *  pipingComponent  管道
 */
var pipingComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "pipingComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/piping1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "管道",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = 'piping';
        data.onTrue.picture = safeimgulr + 'piping1.png';
        data.onFalse.picture = safeimgulr + 'piping2.png';
        data.onAlarm.picture = safeimgulr + 'piping3.png';
        data.onDisconnected.picture = safeimgulr + 'piping4.png';

        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  WarninglampComponent  报警提示灯
 */
var WarninglampComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "WarninglampComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Warninglamp1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "报警提示灯",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '报警提示灯';
        data.onTrue.picture = safeimgulr + 'Warninglamp1.png';
        data.onFalse.picture = safeimgulr + 'Warninglamp2.png';
        data.onAlarm.picture = safeimgulr + 'Warninglamp3.png';
        data.onDisconnected.picture = safeimgulr + 'Warninglamp4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  blowerfanComponent  送风机
 */
var blowerfanComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "blowerfanComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Blowerfan1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "送风机标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性


        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '送风机';
        data.onTrue.picture = safeimgulr + 'Blowerfan1.png';
        data.onFalse.picture = safeimgulr + 'Blowerfan2.png';
        data.onAlarm.picture = safeimgulr + 'Blowerfan3.png';
        data.onDisconnected.picture = safeimgulr + 'Blowerfan4.png';


        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  exhaustfanComponent  排风机
 */
var exhaustfanComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "exhaustfanComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Exhaustfan1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "排风机标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '排风机';
        data.onTrue.picture = safeimgulr + 'Exhaustfan1.png';
        data.onFalse.picture = safeimgulr + 'Exhaustfan2.png';
        data.onAlarm.picture = safeimgulr + 'Exhaustfan3.png';
        data.onDisconnected.picture = safeimgulr + 'Exhaustfan4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  bengComponent  泵
 */
var bengComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "bengComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/beng1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "泵标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '泵';
        data.onTrue.picture = safeimgulr + 'beng1.png';
        data.onFalse.picture = safeimgulr + 'beng2.png';
        data.onAlarm.picture = safeimgulr + 'beng3.png';
        data.onDisconnected.picture = safeimgulr + 'beng4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  ElectricTwoWayValveComponent  电动两通阀
 */
var ElectricTwoWayValveComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricTwoWayValveComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/valve1-1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "电动两通阀标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '电动两通阀';
        data.onTrue.picture = safeimgulr + 'valve1-1.png';
        data.onFalse.picture = safeimgulr + 'valve1-2.png';
        data.onAlarm.picture = safeimgulr + 'valve1-3.png';
        data.onDisconnected.picture = safeimgulr + 'valve1-4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  SolenoidValveComponent  电磁阀
 */
var SolenoidValveComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "SolenoidValveComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/valve2-1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "电磁阀标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);
        var data = {
                name: "电磁阀",
                types: "imageComponent", //类型
                proportion: null, //自定义属性,存储宽高比例等
                Description: "", //组件描述
                Caption: "电磁阀", //组件标题 组态时/指定引用Tag的Name属性
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
                BlinkingType: "style",
                onTrue: {
                    LineWidth: 1,
                    LineColor: "#DDDDDD",
                    LineStyle: null,
                    Blinking: false,
                    picture: "images/icon/icon/valve2-1.png"
                },
                onFalse: {
                    LineWidth: 1,
                    LineColor: "#DDDDDD",
                    LineStyle: null,
                    Blinking: false,
                    picture: "images/icon/icon/valve2-2.png"
                },
                onAlarm: {
                    LineWidth: 1,
                    LineColor: "#DDDDDD",
                    LineStyle: null,
                    Blinking: false,
                    picture: "images/icon/icon/valve2-3.png"
                },
                onDisconnected: {
                    LineWidth: 1,
                    LineColor: "#DDDDDD",
                    LineStyle: null,
                    Blinking: false,
                    picture: "images/icon/icon/valve2-4.png"
                },
            }
            // 初始化 控件属性


        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '电磁阀';
        data.onTrue.picture = safeimgulr + 'valve2-1.png';
        data.onFalse.picture = safeimgulr + 'valve2-2.png';
        data.onAlarm.picture = safeimgulr + 'valve2-3.png';
        data.onDisconnected.picture = safeimgulr + 'valve2-4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  ElectricButterflyValvesComponent  电动蝶阀
 */
var ElectricButterflyValvesComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricButterflyValvesComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/valve3-1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "电动蝶阀标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '电动蝶阀';
        data.onTrue.picture = safeimgulr + 'valve3-1.png';
        data.onFalse.picture = safeimgulr + 'valve3-2.png';
        data.onAlarm.picture = safeimgulr + 'valve3-3.png';
        data.onDisconnected.picture = safeimgulr + 'valve3-4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  AirFiltrationComponent  空气过滤器
 */
var AirFiltrationComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirFiltrationComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Airfiltration1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "空气过滤器标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '空气过滤器';
        data.onTrue.picture = safeimgulr + 'Airfiltration1.png';
        data.onFalse.picture = safeimgulr + 'Airfiltration2.png';
        data.onAlarm.picture = safeimgulr + 'Airfiltration3.png';
        data.onDisconnected.picture = safeimgulr + 'Airfiltration4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  AirHeatingComponent  空气加热器
 */
var AirHeatingComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirHeatingComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Airheating1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "空气加热器标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '空气加热器';
        data.onTrue.picture = safeimgulr + 'Airheating1.png';
        data.onFalse.picture = safeimgulr + 'Airheating2.png';
        data.onAlarm.picture = safeimgulr + 'Airheating3.png';
        data.onDisconnected.picture = safeimgulr + 'Airheating4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  AirCoolerComponent  空气冷却器
 */
var AirCoolerComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirCoolerComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Aircooler1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "空气冷却器标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '空气冷却器';
        data.onTrue.picture = safeimgulr + 'Aircooler1.png';
        data.onFalse.picture = safeimgulr + 'Aircooler2.png';
        data.onAlarm.picture = safeimgulr + 'Aircooler3.png';
        data.onDisconnected.picture = safeimgulr + 'Aircooler4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  HumidifierComponent  加湿器
 */
var HumidifierComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "HumidifierComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/humidifier1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "加湿器标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '加湿器';
        data.onTrue.picture = safeimgulr + 'humidifier1.png';
        data.onFalse.picture = safeimgulr + 'humidifier2.png';
        data.onAlarm.picture = safeimgulr + 'humidifier3.png';
        data.onDisconnected.picture = safeimgulr + 'humidifier4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  controlPanelComponent  温控面板
 */
var controlPanelComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "controlPanelComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/controlpanel1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "温控面板标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '温控面板';
        data.onTrue.picture = safeimgulr + 'controlpanel1.png';
        data.onFalse.picture = safeimgulr + 'controlpanel2.png';
        data.onAlarm.picture = safeimgulr + 'controlpanel3.png';
        data.onDisconnected.picture = safeimgulr + 'controlpanel4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  FluorescentLampComponent  荧光灯
 */
var FluorescentLampComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "FluorescentLampComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Fluorescentlamp1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "荧光灯标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '荧光灯';
        data.onTrue.picture = safeimgulr + 'Fluorescentlamp1.png';
        data.onFalse.picture = safeimgulr + 'Fluorescentlamp2.png';
        data.onAlarm.picture = safeimgulr + 'Fluorescentlamp3.png';
        data.onDisconnected.picture = safeimgulr + 'Fluorescentlamp4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  LEDComponent  LED灯
 */
var LEDComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "LEDComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/LED1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "LED灯标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = 'LED灯';
        data.onTrue.picture = safeimgulr + 'LED1.png';
        data.onFalse.picture = safeimgulr + 'LED2.png';
        data.onAlarm.picture = safeimgulr + 'LED3.png';
        data.onDisconnected.picture = safeimgulr + 'LED4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  IncandescentComponent  白炽灯
 */
var IncandescentComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "IncandescentComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Incandescent1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "白炽灯标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);
        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '白炽灯';
        data.onTrue.picture = safeimgulr + 'Incandescent1.png';
        data.onFalse.picture = safeimgulr + 'Incandescent2.png';
        data.onAlarm.picture = safeimgulr + 'Incandescent3.png';
        data.onDisconnected.picture = safeimgulr + 'Incandescent4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  MetalHalideComponent  金卤灯
 */
var MetalHalideComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "MetalHalideComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色

        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Metalhalide1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "金卤灯标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '金卤灯';
        data.onTrue.picture = safeimgulr + 'Metalhalide1.png';
        data.onFalse.picture = safeimgulr + 'Metalhalide2.png';
        data.onAlarm.picture = safeimgulr + 'Metalhalide3.png';
        data.onDisconnected.picture = safeimgulr + 'Metalhalide4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  temperatureComponent  温度
 */
var temperatureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "temperatureComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/temperature1.png",
            // path: "images/test.svg",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "温度标题",
            fontFamily: "微软雅黑"
        });

        this.labelValue = new draw2d.shape.basic.Label({
            text: "123123",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 13;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("gray");

        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '温度';
        data.onTrue.picture = safeimgulr + 'temperature1.png';
        data.onFalse.picture = safeimgulr + 'temperature2.png';
        data.onAlarm.picture = safeimgulr + 'temperature3.png';
        data.onDisconnected.picture = safeimgulr + 'temperature4.png';

        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
        });

        // 缩放
        this.on("resize", function() {
            thiss.image.setHeight(thiss.getHeight());
            thiss.image.setWidth(thiss.getWidth());
            $('#comp-width').val(thiss.getWidth());
            $('#comp-height').val(thiss.getHeight());
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
 *  humidityComponent  湿度
 */
var humidityComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "humidityComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/humidity1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "湿度标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 3;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#000000");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom());

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '湿度';
        data.onTrue.picture = safeimgulr + 'humidity1.png';
        data.onFalse.picture = safeimgulr + 'humidity2.png';
        data.onAlarm.picture = safeimgulr + 'humidity3.png';
        data.onDisconnected.picture = safeimgulr + 'humidity4.png';

        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  pressureComponent  压力
 */
var pressureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "pressureComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/pressure1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "压力标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");

        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '压力';
        data.onTrue.picture = safeimgulr + 'pressure1.png';
        data.onFalse.picture = safeimgulr + 'pressure2.png';
        data.onAlarm.picture = safeimgulr + 'pressure3.png';
        data.onDisconnected.picture = safeimgulr + 'pressure4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  differentialPressureComponent  压差
 */
var differentialPressureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "differentialPressureComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/differentialpressure1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "压差标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");

        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '压差';
        data.onTrue.picture = safeimgulr + 'differentialpressure1.png';
        data.onFalse.picture = safeimgulr + 'differentialpressure2.png';
        data.onAlarm.picture = safeimgulr + 'differentialpressure3.png';
        data.onDisconnected.picture = safeimgulr + 'differentialpressure4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  liquidComponent  液位
 */
var liquidComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "liquidComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/liquid1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "液位标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '液位';
        data.onTrue.picture = safeimgulr + 'liquid1.png';
        data.onFalse.picture = safeimgulr + 'liquid2.png';
        data.onAlarm.picture = safeimgulr + 'liquid3.png';
        data.onDisconnected.picture = safeimgulr + 'liquid4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  electricComponent  电流
 */
var electricComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "electricComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/electric1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "电流标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '电流';
        data.onTrue.picture = safeimgulr + 'electric1.png';
        data.onFalse.picture = safeimgulr + 'electric2.png';
        data.onAlarm.picture = safeimgulr + 'electric3.png';
        data.onDisconnected.picture = safeimgulr + 'electric4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  VoltageComponent  电压
 */
var VoltageComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "VoltageComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Voltage1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
        this.label = new draw2d.shape.basic.Label({
            text: "电压组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '电压';
        data.onTrue.picture = safeimgulr + 'Voltage1.png';
        data.onFalse.picture = safeimgulr + 'Voltage2.png';
        data.onAlarm.picture = safeimgulr + 'Voltage3.png';
        data.onDisconnected.picture = safeimgulr + 'Voltage4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  frequencyComponent  频率
 */
var frequencyComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "frequencyComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/frequency1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "频率组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '频率';
        data.onTrue.picture = safeimgulr + 'frequency1.png';
        data.onFalse.picture = safeimgulr + 'frequency2.png';
        data.onAlarm.picture = safeimgulr + 'frequency3.png';
        data.onDisconnected.picture = safeimgulr + 'frequency4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  activePowerComponent  有功功率
 */
var activePowerComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "activePowerComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/activepower1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "有功功率组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '有功功率';
        data.onTrue.picture = safeimgulr + 'activepower1.png';
        data.onFalse.picture = safeimgulr + 'activepower2.png';
        data.onAlarm.picture = safeimgulr + 'activepower3.png';
        data.onDisconnected.picture = safeimgulr + 'activepower4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  ElectricityConsumptionComponent  用电量
 */
var ElectricityConsumptionComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricityConsumptionComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Electricityconsumption1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "用电量组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '用电量';
        data.onTrue.picture = safeimgulr + 'Electricityconsumption1.png';
        data.onFalse.picture = safeimgulr + 'Electricityconsumption2.png';
        data.onAlarm.picture = safeimgulr + 'Electricityconsumption3.png';
        data.onDisconnected.picture = safeimgulr + 'Electricityconsumption4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  levelComponent  液体流量
 */
var levelComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "levelComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/level1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "液体流量组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);
        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '液体流量';
        data.onTrue.picture = safeimgulr + 'level1.png';
        data.onFalse.picture = safeimgulr + 'level2.png';
        data.onAlarm.picture = safeimgulr + 'level3.png';
        data.onDisconnected.picture = safeimgulr + 'level4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  GasComponent  气体流量
 */
var GasComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "GasComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Gas1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "气体流量组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '气体流量';
        data.onTrue.picture = safeimgulr + 'Gas1.png';
        data.onFalse.picture = safeimgulr + 'Gas2.png';
        data.onAlarm.picture = safeimgulr + 'Gas3.png';
        data.onDisconnected.picture = safeimgulr + 'Gas4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  BroadcastComponent  广播
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "BroadcastComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Broadcast1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "广播组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '广播';
        data.onTrue.picture = safeimgulr + 'Broadcast1.png';
        data.onFalse.picture = safeimgulr + 'Broadcast2.png';
        data.onAlarm.picture = safeimgulr + 'Broadcast3.png';
        data.onDisconnected.picture = safeimgulr + 'Broadcast4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  BroadcastComponent  广播
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "BroadcastComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Broadcast1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "广播组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '广播';
        data.onTrue.picture = safeimgulr + 'Broadcast1.png';
        data.onFalse.picture = safeimgulr + 'Broadcast2.png';
        data.onAlarm.picture = safeimgulr + 'Broadcast3.png';
        data.onDisconnected.picture = safeimgulr + 'Broadcast4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  monitoringComponent  枪机
 */
var monitoringComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "monitoringComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;


        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/monitoring1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "枪机组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);
        data.routine.vlcurl = '';
        data.routine.name = '枪机';
        data.onTrue.picture = safeimgulr + 'monitoring1.png';
        data.onFalse.picture = safeimgulr + 'monitoring2.png';
        data.onAlarm.picture = safeimgulr + 'monitoring3.png';
        data.onDisconnected.picture = safeimgulr + 'monitoring4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
            vlcvalue(thiss);
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
 *  qiujiComponent  球机
 */

var qiujiComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "qiujiComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/qiuji1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "球机组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.vlcurl = '';
        data.routine.name = '球机';
        data.onTrue.picture = safeimgulr + 'qiuji1.png';
        data.onFalse.picture = safeimgulr + 'qiuji2.png';
        data.onAlarm.picture = safeimgulr + 'qiuji3.png';
        data.onDisconnected.picture = safeimgulr + 'qiuji4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
            vlcvalue(thiss);
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
 *  highqiujiComponent  高球机
 */
var highqiujiComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "highqiujiComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/highqiuji1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "高球机组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.vlcurl = '';
        data.routine.name = '高球机';
        data.onTrue.picture = safeimgulr + 'highqiuji1.png';
        data.onFalse.picture = safeimgulr + 'highqiuji2.png';
        data.onAlarm.picture = safeimgulr + 'highqiuji3.png';
        data.onDisconnected.picture = safeimgulr + 'highqiuji4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
            vlcvalue(thiss);
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
 *  EntranceGuardComponent  门禁
 */
var EntranceGuardComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "EntranceGuardComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;

        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/menjin1.png",
            width: 36,
            height: 36
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "门禁组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '门禁';
        data.onTrue.picture = safeimgulr + 'menjin1.png';
        data.onFalse.picture = safeimgulr + 'menjin2.png';
        data.onAlarm.picture = safeimgulr + 'menjin3.png';
        data.onDisconnected.picture = safeimgulr + 'menjin4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
 *  detectorComponent  探测器
 */
var detectorComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "detectorComponent",
    init: function(attr) {
        this._super(attr);
        this.width = 36;
        this.height = 36;
        this.setResizeable(false);
        this.stroke = 1;
        this.setColor("#DDDDDD"); //边框颜色
        this.setBackgroundColor("#FFFFFF"); //背景颜色
        var thiss = this;



        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/tance1.png",
            width: 36,
            height: 36,

        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
        this.image.setRotationAngle(90);
        this.label = new draw2d.shape.basic.Label({
            text: "探测器组价组件标题",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);

        // 初始化 控件属性
        var data = JSON.parse(safeComponentData);

        data.routine.name = '探测器';
        data.onTrue.picture = safeimgulr + 'tance1.png';
        data.onFalse.picture = safeimgulr + 'tance2.png';
        data.onAlarm.picture = safeimgulr + 'tance3.png';
        data.onDisconnected.picture = safeimgulr + 'tance4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function() {
            displayDiv(thiss);
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
function displayDiv(component) {
    // 基本
    setComponentOptions.basePublicSet(component);

    setComponentOptions.basicSet(component);
    // 大小
    setComponentOptions.componentSize(component);
    // 位置 旋转角度
    setComponentOptions.componentOffsetAndAngle(component);

    // 标题
    setComponentOptions.componentCaption(component);

}


//视频地址
function vlcvalue(com) {
    $canvas.menuVlcUrl.show(); //视频地址
    $canvas.comVlcUrlVal.val(com.getUserData().vlcurl)
}