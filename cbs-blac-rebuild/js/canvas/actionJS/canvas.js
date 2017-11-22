var layer,
    canvasVue;

window.onresize = function() {
    canvasSet.setCanvasWH();
    imageCanvas.setZoom('1.2');

    var w = Number($('#canvas').width());
    var s = canvasSet.BasicData.width / w;
    // imageCanvas.setZoom('1');
    imageCanvas.setZoom(s);

}
layui.use(['layer', 'element'], function() {
    var layer = layui.layer;
    layer = layui.layer;
    var element = layui.element;

    // 设置 画布宽高
    canvasSet.setCanvasWH();





    canvasVue = new Vue({
        el: '#app',
        data: {
            componentData: {
                flag: true, //vue watch内容是否执行标志
                id: ''
            },
            basicHideDiv: {
                "basic-hide": false
            },
            // 边框下拉框数据
            borderData: {
                borderWidth: [0, 1, 2, 3, 4, 5],
                borderStyle: [{
                        name: '默认',
                        data: ''
                    },
                    {
                        name: '-',
                        data: '-'
                    },
                    {
                        name: '.',
                        data: '.'
                    },
                    {
                        name: '-.',
                        data: '-.'
                    },
                    {
                        name: '-..',
                        data: '-..'
                    },

                ]

            },
            routine: {
                name: '',
                description: '',
                width: '',
                height: '',
                offx: '',
                offy: '',
                rotationAngle: '',

                horizontal: true, //水平(直线属性)
                vertical: true, //垂直(直线属性)

                title: false, //显示标题
                titledata: {
                    text: '', //标题内容
                    disabled: true // 不可输入
                },

                hover: false, //显示说明
                hoverdata: {
                    text: '', //说明内容
                    disabled: true // 不可输入
                },
                visible: false, //隐藏组件
                enable: false, //不可用
                accessLevel: { //访问等级(备用)
                    level: '0',
                    LevelData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                }

            },
            datas: {
                tag: {
                    tagname: '',
                    isrighttag: {
                        // rights: true,
                        worry: false
                    },
                },
                readonly: false,

            },
            styles: {
                borderWidth: '0',
                borderStyle: '默认',
                borderColor: [{
                    color: '',
                    active: false
                }]
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                // canvas 初始化
                canvasSet.allCanvasinit('new');
                // 自定义下拉群组 初始化
                bayaxInit();

                // 组件滚动
                Comscroll.picrun_ini("scroll_ul_2", 'scroll_div', "scroll_ul_1");
                $(".layui-tabscroll-item,.global-btn-body,.comp-level-ul").mCustomScrollbar({
                    autoHideScrollbar: true
                });
                // 属性框打开关闭操作
                $('.attr-content-title').click(function() {
                    var _this = $(this);
                    var clas = 'collapsed';
                    var divs = '.' + _this.data('for');

                    if (_this.hasClass(clas)) {
                        _this.removeClass(clas);
                    } else {
                        _this.addClass(clas);
                    }
                    $(divs).stop().slideToggle(300);

                });

            });

        },
        methods: {
            // 访问等级选择
            setAccessLevel: function(item) {
                this.routine.accessLevel.level = item;
            },
            // style    边框宽度
            setStyleBorderWidth: function(item) {
                this.styles.borderWidth = item;
            },
            setStyleBorderStyle: function(item) {
                this.styles.borderStyle = item.name;
            },
            // 重置属性框
            resetAttr: function() {
                var clas = 'collapsed';
                $('.attr-content-title').removeClass(clas);
                $('.reset-title').addClass(clas);
                $('.reset-content').hide();
                $('.routine,.data-div').show();

                setTimeout(function() {
                    $(".layui-tabscroll-item").mCustomScrollbar('scrollTo', 'top');
                }, 100);

                var routine = this.routine;
                routine.name = '';
                routine.description = '';
                routine.width = '';
                routine.height = '';
                routine.offx = '';
                routine.offy = '';

            }
        }
    })

    // 键路径
    canvasVue.$watch('routine.name', function(newVal, oldVal) {
        // 做点什么
        if (this.componentData.flag) {
            console.log('旧值:' + oldVal);
            console.log('新值:' + newVal);
        }
    });
    // 直线水平监控
    canvasVue.$watch('routine.horizontal', function(newVal, oldVal) {
        // 做点什么
        if (this.componentData.flag) {
            console.log('旧值:' + oldVal);
            console.log('新值:' + newVal);
        }
    });
    // hover监控
    canvasVue.$watch('routine.hover', function(newVal, oldVal) {

        if (this.componentData.flag) {
            // console.log('旧值:' + oldVal);
            console.log(newVal);
            if (newVal) {
                console.log('选中')
                this.routine.hoverdata.text = '选中';
                this.routine.hoverdata.disabled = false;
            } else {
                console.log('未选中')
                this.routine.hoverdata.text = '未选中';
                this.routine.hoverdata.disabled = true;
            }
        }
    });
    // 标题监控
    canvasVue.$watch('routine.title', function(newVal, oldVal) {

        if (this.componentData.flag) {
            // console.log('旧值:' + oldVal);
            console.log(newVal);
            if (newVal) {
                console.log('选中')
                this.routine.titledata.text = '选中';
                this.routine.titledata.disabled = false;
            } else {
                console.log('未选中')
                this.routine.titledata.text = '未选中';
                this.routine.titledata.disabled = true;
            }
        }
    });

    // 访问等级
    canvasVue.$watch('routine.accessLevel.level', function(newVal, oldVal) {

        // if (this.componentData.flag) {
        console.log('旧值:' + oldVal);
        console.log(newVal);

        // }
    });


    // data  只读
    canvasVue.$watch('datas.readonly', function(newVal, oldVal) {

        if (this.componentData.flag) {
            console.log('旧值:' + oldVal);
            console.log(newVal);

        }
    });



});
















// canvas 基础设置
var canvasSet = {
    BasicData: {
        width: 0,
        init: true,
        scale: 9 / 16
    },
    setCanvasWH: function() {
        var canvas = $('#canvas');

        var w = Number(canvas.width());
        if (this.BasicData.init) {
            this.BasicData.width = w;
            this.BasicData.init = false;
        }
        console.log(w)
        canvas.css('height', w * this.BasicData.scale + 'px');
    },
    /**
     *  还原数据时,在画布找到 控件]
     * @param  {[type]} id [description]
     * @return {[type]}    [控件对象]
     */
    getCanvasNode: function(id) {
        if (id != '') {
            var node = imageCanvas.getFigure(id);
            var nodeLine = imageCanvas.getLine(id);
            if (node !== null) {
                return node;
            } else if (nodeLine !== null) {
                return nodeLine;
            }
        } else {
            return false;
        }

    },
    /**
     * [打印 控件数据 ----------调试用]
     * @param  {[type]} canvas [description]
     */
    displayJSON: function(canvas) {
        var writer = new draw2d.io.json.Writer();
        writer.marshal(canvas, function(json) {
            console.log('画布数据:' + JSON.stringify(json, null, 2));
        });
    },
    /**
     * [canvas 初始化]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    allCanvasinit: function(type) {
        //选择框  样式
        draw2d.Configuration.factory.createResizeHandle = function(forShape, type) {
            var handle = new draw2d.ResizeHandle(forShape, type);
            handle.attr({
                width: 10,
                height: 10,
                radius: 0,
                color: "#35C99D",
                stroke: 1,
                bgColor: "#35C99D"
            });
            return handle;
        }

        var app = new example.Application();


        var canvas = app.view; //主画布
        // 边框阴影
        var filter = canvas.paper.createFilter();
        filter.createShadow(0, 0, 3, 0.3, "#000000");
        filter.element.setAttribute("x", "-35%");
        filter.element.setAttribute("y", "-35%");

        app.view.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function() {
                return new HoverConnection();
            }
        }));


        canvas.on("figure:add", function(emitter, event) {
            if (!(event.figure instanceof draw2d.Connection)) {
                event.figure.shape.filter(filter);
            }
        });
        canvas.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy({
            lineColor: "#35c99d"
        }));
        canvas.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy({
            lineColor: "#35c99d"
        }));
        canvas.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy({
            lineColor: "#35c99d"
        }));

        canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
        // canvas.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
        imageCanvas = canvas;

        canvas.installEditPolicy(new CopyInterceptorPolicy());
        canvas.getCommandStack().addEventListener(function(e) {
            if (e.isPostChangeEvent()) {
                canvasSet.displayJSON(canvas);
            }
        });
        // getGroupNameAndViewData(sessionStorage.getItem("view_id"), canvas, type);



        // var reader = new draw2d.io.json.Reader();
        // reader.unmarshal(canvas, canvasJson);

        // console.log('缩放比例' + canvas.getZoom())
        // console.log('宽度：' + canvas.getWidth());
        // console.log('宽度：' + canvas.getHeight());


    }


}













// 控件滚动操作
var Comscroll = {
    Speed_1: 10,
    Space_1: 10,
    PageWidth_1: 50 * 10,
    interval_1: 5000,
    fill_1: 0,
    MoveLock_1: false,
    MoveTimeObj_1: '',
    MoveWay_1: "right",
    Comp_1: 0,
    scroll_ul_2: '',
    scroll_div: '',
    scroll_ul_1: '',
    GetObj: function(objName) {
        if (document.getElementById) {
            return eval('document.getElementById("' + objName + '")')
        } else {
            return eval('document.all.' + objName)
        }
    },
    GoUp: function(string) {
        var _this = this;
        if (this.MoveLock_1) return;
        console.log('查看2：' + string)
        this.MoveLock_1 = true;
        this.MoveWay_1 = "left";
        this.MoveTimeObj_1 = setInterval(function() {
            _this.ScrUp(_this.scroll_div)
        }, this.Speed_1);
    },
    StopUp: function(string) {
        if (this.MoveWay_1 == "right") {
            return
        };
        clearInterval(this.MoveTimeObj_1);
        if ((this.scroll_div.scrollLeft - this.fill_1) % this.PageWidth_1 != 0) {
            this.Comp_1 = this.fill_1 - (this.scroll_div.scrollLeft % this.PageWidth_1);
            this.CompScr_1(this.scroll_div)
        } else {
            this.MoveLock_1 = false
        }
    },
    ScrUp: function(obj) {
        if (obj.scrollLeft <= 0) {
            obj.scrollLeft = obj.scrollLeft + obj.offsetWidth
        }
        obj.scrollLeft -= this.Space_1;
    },
    GoDown: function(string, string2, string3) {
        var _this = this;
        clearInterval(this.MoveTimeObj_1);
        if (this.MoveLock_1) return;
        this.MoveLock_1 = true;
        this.MoveWay_1 = "right";
        this.ScrDown(this.scroll_div, this.scroll_ul_1);
        this.MoveTimeObj_1 = setInterval(function() {
            _this.ScrDown(_this.scroll_div, _this.scroll_ul_1);
        }, this.Speed_1)
    },
    StopDown: function(string) {
        var scrollDiv = this.scroll_div;
        var fill_1 = this.fill_1;
        var PageWidth_1 = this.PageWidth_1;
        if (this.MoveWay_1 == "left") {
            return
        };
        clearInterval(this.MoveTimeObj_1);
        if (scrollDiv.scrollLeft % PageWidth_1 - (fill_1 >= 0 ? fill_1 : fill_1 + 1) != 0) {
            this.Comp_1 = PageWidth_1 - scrollDiv.scrollLeft % PageWidth_1 + fill_1;
            this.CompScr_1(this.scroll_div);
        } else {
            this.MoveLock_1 = false
        }
    },
    ScrDown: function(obj1, obj2) {
        console.log(123)
        if (obj1.scrollLeft >= obj2.scrollWidth) {
            obj1.scrollLeft = obj1.scrollLeft - obj2.scrollWidth - 40
        }
        obj1.scrollLeft += this.Space_1;
    },
    CompScr_1: function(obj) {

        if (this.Comp_1 == 0) {
            this.MoveLock_1 = false;
            return
        }
        var num, TempSpeed = this.Speed_1,
            TempSpace = this.Space_1;
        if (Math.abs(this.Comp_1) < this.PageWidth_1 / 2) {
            TempSpace = Math.round(Math.abs(this.Comp_1 / this.Space_1));
            if (TempSpace < 1) {
                TempSpace = 1
            }
        }
        if (this.Comp_1 < 0) {
            if (this.Comp_1 < -TempSpace) {
                this.Comp_1 += TempSpace;
                num = TempSpace
            } else {
                num = -this.Comp_1;
                this.Comp_1 = 0
            }
            obj.scrollLeft -= num;
            setTimeout(this.CompScr_1(obj), TempSpeed)
        } else {
            if (this.Comp_1 > TempSpace) {
                this.Comp_1 -= TempSpace;
                num = TempSpace
            } else {
                num = this.Comp_1;
                this.Comp_1 = 0
            }
            obj.scrollLeft += num;
            setTimeout(this.CompScr_1(obj), TempSpeed)
        }
    },
    picrun_ini: function(string, string2, string3) {
        this.scroll_ul_2 = this.GetObj(string);
        this.scroll_ul_1 = this.GetObj(string3);
        this.scroll_div = this.GetObj(string2);
        this.scroll_ul_2.innerHTML = this.scroll_ul_1.innerHTML;
        this.scroll_div.scrollLeft = this.fill_1 >= 0 ? this.fill_1 : this.scroll_ul_1.scrollWidth - Math.abs(this.fill_1);
    }

}