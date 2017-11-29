/** 
 * 矩形
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "rectangleComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: 0,
        }, attr));
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '矩形';
        this.attr({
            userData: data
        });
        // 选中
        this.on("click", function () {
            // basicdisplayDiv(thiss);
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }

            setComponentOptions.showTooltips(_this);

            // this.showTooltip();
        };
        this.onMouseLeave = function () {
            setComponentOptions.hideTooltips();

            // this.hideTooltip();
        };
    },


   
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    },

});



/** 
 * RoundedRectangle Component  圆角矩形
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "RoundedRectangleComponent",
    init: function (attr) {
        this._super(attr);
        this.setRadius(10);
        this.stroke = 0;
        // this.setColor("#D8D8D8"); //边框颜色
        this.setBackgroundColor("#35C99D"); //背景颜色

        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '圆角矩形';
        this.attr({
            userData: data
        });
        // 选中
        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
})

/** 
 * Ellipse Component  椭圆
 * @extend draw2d.shape.basic.rectangle
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
    NAME: "EllipseComponent",
    init: function (attr) {
        this._super(attr);
        this.stroke = 0;
        this.setRadius(25);
        // this.setColor("#D8D8D8"); //边框颜色
        this.setBackgroundColor("#35C99D"); //背景颜色
        // this.createPort("input");
        // this.createPort("output");

        // 这里设置hover事件

        this.setHeight(30);

        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '椭圆';
        this.attr({
            userData: data
        });

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 * Polygon Component 多边形
 * @extend draw2d.shape.basic.Polygon
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
    NAME: "polygonComponent",
    init: function (attr) {
        this._super(attr);
        this.stroke = 0;
        // this.setColor("#D8D8D8"); //边框颜色
        this.setBackgroundColor("#35C99D"); //背景颜色
        var w = this.width;
        var h = this.height;

        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '多边形';
        this.attr({
            userData: data
        });
        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }

});


/** 
 * BothArrow Component  [左右方向]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({
    NAME: "BothArrowHComponent",
    init: function (attr, setter, getter) {
        this._super($.extend({
            width: 50,
            height: 30
        }, attr), setter, getter);

        this.setBackgroundColor("#35C99D"); //背景颜色	


        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '水平双箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function () {
            console.log(123)
        };

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            if (this.userData.ShowHint) {
                // showTooltips(this);
            }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },

    /**
     * @private
     * @returns
     */
    createSet: function () {
        return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }

});



/** 
 * BothArrow Component  [上下方向]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({
    NAME: "BothArrowVComponent",
    init: function (attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 50
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '垂直双箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function () {
            // console.log(123)
            // console.log("颜色为:"+thiss.getColor().hash())
        };

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            // showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },

    /**
     * @private
     * @returns
     */
    createSet: function () {
        return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
    },

    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 * forRightComponent 向右
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forRightComponent",
    init: function (attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '右箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function () {
            // console.log(123)
        };
        // 

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },

    /**
     * @private
     * @returns
     */
    createSet: function () {
        return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 * forLeftComponent 向左
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({
    NAME: "forLeftComponent",
    init: function (attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '左箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function () {
            // console.log(123)
        };
        // 

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            // showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },

    /**
     * @private
     * @returns
     */
    createSet: function () {
        return this.canvas.paper.path("M30,20H20V30L0,15L20,0V10H30V20z");
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/**  
 * forUpComponent  向上
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forUpComponent",
    init: function (attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor("#35C99D"); //背景颜色
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '上箭头';
        this.attr({
            userData: data
        });


        this.onDoubleClick = function () {
            console.log(123)
        };
        // 

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },

    /**
     * @private
     * @returns
     */
    createSet: function () {
        return this.canvas.paper.path("M10,30V20H0L15,0L30,20H20V30H10z");
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 * forDownComponent  向下
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forDownComponent",
    init: function (attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);

        this.setBackgroundColor("#35C99D"); //背景颜色
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '下箭头';
        this.attr({
            userData: data
        });



        this.onDoubleClick = function () {
            console.log(123)
        };
        // 

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },

    /**
     * @private
     * @returns
     */
    createSet: function () {
        return this.canvas.paper.path("M10,0V10H0L15,30L30,10H20V0H10z");
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  conduitCompontent  自定义管道
 */
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
    NAME: "conduitCompontent",
    init: function (attr) {
        this._super(attr);
        this.width = 100;
        this.height = 30;
        this.stroke = 0;
        // this.setColor('black');
        // this.alpha = 0;



        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '管道';
        data.onlytype = 'conduitCompontent';//本控件单独属性(区分自己单独标志)
        // 初始化 控件属性
        this.attr({
            userData: data
        });

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});
/** 
 *  conduitCompontent  自定义管道
 */
var conduitCompontentV = draw2d.shape.node.VerticalBus.extend({
    NAME: "conduitCompontentV",
    init: function (attr) {
        this._super(attr);
        this.width = 30;
        this.height = 100;
        this.stroke = 0;
        // this.alpha = 0;

        // this.setConnectionDirStrategy(10);	
        var _this = this;
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '管道';
        data.onlytype = 'conduitCompontent';//本控件单独属性(区分自己单独标志)
        // 初始化 控件属性
        this.attr({
            userData: data
        });

        this.on("click", function () {
            rectangle.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // componentResize(thiss);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.onMouseEnter = function () {
            // if (this.userData.ShowHint) {
            //     showTooltips(this);
            // }
        };
        this.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

var rectangle = {
    // 自定义控件属性
    rectangleData: JSON.stringify({
        type: "basicComponent", //类型
        status:'default',//该组件绑定tag 的状态
        editSatus:'defaults',//组件正在编辑的属性(default/ontrue/onfalse/onalarm/ondisc)
        proportion: { //预留自定义属性
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
            name: '',
            description: '', //组件描述
            visible: false, //隐藏组件(setAlpha(0))
            enable: false, //不可用
            accessLevel: 8, //访问等级 0~15
            hint: { //hover 说明
                flag: false, //是否显示
                hintText: '' //text
            },
            readOnly: false, //组件是否为只读
        },
        defaults:{//该属性用于存储 控件初始化时的状态
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            fillColor: "#4D90FE",
            alpha: 1,
            blinking: false,
        },
        onTrue: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            fillColor: "#4D90FE",
            alpha: 1,
            blinking: false,
        },
        onFalse: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            fillColor: "#4D90FE",
            alpha: 1,
            blinking: false,
        },
        onAlarm: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            fillColor: "#4D90FE",
            alpha: 1,
            blinking: false,
        },
        onDisconnected: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            fillColor: "#4D90FE",
            alpha: 1,
            blinking: false,
        }
    }),
    // 点击方法
    clickMethod: function (component) {
        setComponentOptions.setComponentFlagFalse();

        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.basicHideDiv = true;

        // 基本(公共)
        setComponentOptions.basePublicSet(component);
        // 基本
        setComponentOptions.basicSet(component);
        // 大小
        setComponentOptions.componentSize(component);
        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);
        // 基本图形  专属方法
        setComponentOptions.rectangleSet(component);

        setComponentOptions.setComponentFlagTrue();
    },
   
}





