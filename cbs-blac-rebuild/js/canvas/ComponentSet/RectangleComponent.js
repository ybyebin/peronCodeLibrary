var rectangle = 0,
    RoundedRectangle = 0,
    Ellipse = 0,
    polygon = 0,
    BothArrowH = 0,
    BothArrowV = 0,
    forRight = 0,
    forLeft = 0,
    forUp = 0,
    conduitnum = 0,
    forDown = 0;

// 自定义控件属性
var RectangleData = JSON.stringify({
    type: "basicComponent", //类型			
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
        readOnly: false, //组件是否为只读
    },
    onTrue: {
        lineWidth: 1,
        lineColor: "#35C99D",
        lineStyle: null,
        fillColor: "#35C99D",
        alpha: 1,
        blinking: false,
    },
    onFalse: {
        lineWidth: 1,
        lineColor: "#35C99D",
        lineStyle: null,
        fillColor: "#35C99D",
        alpha: 1,
        blinking: false,
    },
    onAlarm: {
        lineWidth: 1,
        lineColor: "#35C99D",
        lineStyle: null,
        fillColor: "#35C99D",
        alpha: 1,
        blinking: false,
    },
    onDisconnected: {
        lineWidth: 1,
        lineColor: "#35C99D",
        lineStyle: null,
        fillColor: "#35C99D",
        alpha: 1,
        blinking: false,
    }
})


/** 
 * 矩形
 * @author
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "rectangleComponent",
    init: function(attr) {
        this._super(attr);
        this.stroke = 0;
        // this.setColor("#D8D8D8"); //边框颜色
        // this.setBackgroundColor("#35C99D"); //背景颜色
        // this.setAlpha(0.5);
        // this.setBackgroundColor( "#D8D8D8") ;//背景颜色


        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '矩形';
        this.attr({
            userData: data
        });
        // 选中
        this.on("click", function() {
            // basicdisplayDiv(thiss);
        });

        // 缩放
        this.on("resize", function() {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function() {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function() {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
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
    },



});



/** 
 * RoundedRectangle Component  圆角矩形
 * @author 
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "RoundedRectangleComponent",
    init: function(attr) {
        this._super(attr);
        this.setRadius(10);
        this.stroke = 0;
        // this.setColor("#D8D8D8"); //边框颜色
        this.setBackgroundColor("#35C99D"); //背景颜色
        var thiss = this;




        var data = JSON.parse(RectangleData);
        data.routine.name = '圆角矩形';
        this.attr({
            userData: data
        });
        // 选中
        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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

/** 
 * Ellipse Component  椭圆
 * @author yb
 * @extend draw2d.shape.basic.rectangle
 * @Data 2016/5/17 
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
    NAME: "EllipseComponent",
    init: function(attr) {
        this._super(attr);
        this.stroke = 0;
        this.setRadius(25);
        // this.setColor("#D8D8D8"); //边框颜色
        this.setBackgroundColor("#35C99D"); //背景颜色
        // this.createPort("input");
        // this.createPort("output");

        // 这里设置hover事件
        var thiss = this;
        this.setHeight(30);
        var data = JSON.parse(RectangleData);
        data.routine.name = '椭圆';
        this.attr({
            userData: data
        });

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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
        }, 400);
    }
});


/** 
 * Polygon Component 多边形
 * @author yb
 * @extend draw2d.shape.basic.Polygon
 * @Data 2016/5/25 
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
    NAME: "polygonComponent",
    init: function(attr) {
        this._super(attr);
        this.stroke = 0;
        // this.setColor("#D8D8D8"); //边框颜色
        this.setBackgroundColor("#35C99D"); //背景颜色
        var w = this.width;
        var h = this.height;
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '多边形';
        this.attr({
            userData: data
        });
        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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
 * BothArrow Component  [左右方向]
 * @author
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({
    NAME: "BothArrowHComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 50,
            height: 30
        }, attr), setter, getter);

        this.setBackgroundColor("#35C99D"); //背景颜色		
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '水平双箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            console.log(123)
        };

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
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
 * BothArrow Component  [上下方向]
 * @author
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({
    NAME: "BothArrowVComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 50
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '垂直双箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            // console.log(123)
            // console.log("颜色为:"+thiss.getColor().hash())
        };

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
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
 * forRightComponent 向右
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forRightComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '右箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            console.log(123)
        };
        // 

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");
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
 * forLeftComponent 向左
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({
    NAME: "forLeftComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '左箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            console.log(123)
        };
        // 

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M30,20H20V30L0,15L20,0V10H30V20z");
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
 * forUpComponent  向上
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forUpComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '上箭头';
        this.attr({
            userData: data
        });


        this.onDoubleClick = function() {
            console.log(123)
        };
        // 

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M10,30V20H0L15,0L30,20H20V30H10z");
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
 * forDownComponent  向下
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forDownComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);

        this.setBackgroundColor("#35C99D"); //背景颜色
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '下箭头';
        this.attr({
            userData: data
        });



        this.onDoubleClick = function() {
            console.log(123)
        };
        // 

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M10,0V10H0L15,30L30,10H20V0H10z");
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
 *  conduitCompontent  自定义管道
 */
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
    NAME: "conduitCompontent",
    init: function(attr) {
        this._super(attr);
        this.width = 100;
        this.height = 30;
        this.stroke = 0;
        // this.setColor('black');
        // this.alpha = 0;



        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '管道';
        // 初始化 控件属性
        this.attr({
            userData: data
        });

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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
 *  conduitCompontent  自定义管道
 */
var conduitCompontentV = draw2d.shape.node.VerticalBus.extend({
    NAME: "conduitCompontentV",
    init: function(attr) {
        this._super(attr);
        this.width = 30;
        this.height = 100;
        this.stroke = 0;
        // this.alpha = 0;

        // this.setConnectionDirStrategy(10);	
        var thiss = this;
        var data = JSON.parse(RectangleData);
        data.routine.name = '管道';
        // 初始化 控件属性
        this.attr({
            userData: data
        });

        this.on("click", function() {
            basicdisplayDiv(thiss);
        });
        // 缩放
        this.on("resize", function() {
            componentResize(thiss);
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



function basicdisplayDiv(obj) {
    // //重置属性框
    // resetAttributeMenu();
    // 隐藏该控件没有的属性
    // $canvas.menuDivBasicHide.hide();
    // $canvas.menuDivFill.show();
    // $canvas.menuDivAlpha.show();


    //重置属性框
    canvasVue.resetAttr();
    // 隐藏该控件没有的属性
    canvasVue.basicHideDiv = true;

    canvasVue.componentData.flag = false;




    // setTimeout(function() {
    //     canvasVue.componentData.flag = true;
    //     canvasVue.routine.name = '第二次改';
    // }, 200)


    // 基本(公共)
    setComponentOptions.basePublicSet(component);
    // 基本
    setComponentOptions.basicSet(component);
    // 大小
    setComponentOptions.componentSize(component);
    // 位置 旋转角度
    setComponentOptions.componentOffsetAndAngle(component);

    setComponentOptions.rectangleSet(component);




}