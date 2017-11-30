/** 
 * Line Component
 * @author 
 * @extend draw2d.shape.basic.Line
 */
var LineComponent = draw2d.shape.basic.Line.extend({
    NAME: "LineComponent",
    init: function(attr) {
        this._super($.extend({
            stroke: 2,
            color:rectangle.fillColor
        }, attr));

        var _this = this;
        //基础数据
        var data = {
            type: "lineComponent", //类型	
            custom: { 
                newCreat:true,//  用于在拖拽组件时判断(是否新拖拽的控件)                
                editSatus:'defaults',//组件正在编辑的属性(default/ontrue/onfalse/onalarm/ondisc)        
                
            },
            tag: {
                tag_id: -1,
                tag_type: -1,
                tag_name: "",
                bingding_status: 0 ,//0 默认状态,1 已经绑定,2 绑定错误
                status:'default',//该组件绑定tag 的状态(用于监控画面)
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
                lineWidth: 2,
                lineColor: "#35C99D",
                blinking: false,
            },
            onTrue: {
                lineWidth: 2,
                lineColor: "#35C99D",
                blinking: false,
            },
            onFalse: {
                lineWidth: 2,
                lineColor: "#35C99D",
                blinking: false,
            },
            onAlarm: {
                lineWidth: 2,
                lineColor: "#35C99D",
                blinking: false,
            },
            onDisconnected: {
                lineWidth: 2,
                lineColor: "#35C99D",
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
            var arr = _this.getVertices();
            var vueRoutine =  canvasVue.routine;
            if (arr.data[0].y !== arr.data[1].y) {
                vueRoutine.horizontal = false;
            } else {
                vueRoutine.horizontal = true;
            }
            if (arr.data[0].x !== arr.data[1].x) {
                vueRoutine.vertical = false;
            } else {
                vueRoutine.vertical = true;
            }
        });

        // 缩放
        this.on("resize", function() {
                //不提供 缩放方法    
        });
        // 移动
        this.on("move", function() {
            //不提供 移动方法  
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

// 直线
var lineBasic = {
    // 自定义控件属性
    fillColor:'#35C99D',
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