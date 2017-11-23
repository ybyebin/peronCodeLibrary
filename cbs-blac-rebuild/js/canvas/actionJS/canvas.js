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

                ],
                colorData: [{
                        color: '#F5A623',
                        colorstyle: 'background-color:#F5A623',
                        active: false
                    },
                    {
                        color: '#7ED321',
                        colorstyle: 'background-color:#7ED321',
                        active: false
                    },
                    {
                        color: '#F57373',
                        colorstyle: 'background-color:#F57373',
                        active: false
                    },

                    {
                        color: '#35C99D',
                        colorstyle: 'background-color:#35C99D',
                        active: false
                    },
                    {
                        color: '#000000',
                        colorstyle: 'background-color:#000000',
                        active: false
                    },
                    {
                        color: '#999999',
                        colorstyle: 'background-color:#999999',
                        active: false
                    },
                    {
                        color: '#FFFFFF',
                        colorstyle: 'background-color:#FFFFFF',
                        active: false
                    },
                    {
                        color: '#4A4A4A',
                        colorstyle: 'background-color:#4A4A4A',
                        active: false
                    },
                    {
                        color: '#03A3FC',
                        colorstyle: 'background-color:#03A3FC',
                        active: false
                    },
                    {
                        color: '#DDDDDD',
                        colorstyle: 'background-color:#DDDDDD',
                        active: false
                    }



                ],


            },

            // 基本属性
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
            // Data
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
            // styles
            styles: {
                borderWidth: '0',
                borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                picture: '', //图片地址
                flashing: false, //闪烁
            },
            ontrue: {
                borderWidth: '0',
                borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                picture: '', //图片地址
                flashing: false, //闪烁
            },
            onfalse: {
                borderWidth: '0',
                borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                picture: '', //图片地址
                flashing: false, //闪烁
            },
            onalarm: {
                borderWidth: '0',
                borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                picture: '', //图片地址
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                flashing: false, //闪烁
            },
            ondisc: {
                borderWidth: '0',
                borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                picture: '', //图片地址
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                flashing: false, //闪烁
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                // 自定义下拉群组 初始化
                bayaxInit();
                basicSet.init();
                this.setColorData();


                // canvas 初始化
                canvasSet.allCanvasinit('new');



            });

        },
        methods: {
            // 访问等级选择
            setAccessLevel: function(item) {
                this.routine.accessLevel.level = item;
            },
            // style 边框宽度
            setStyleBorderWidth: function(item) {
                this.styles.borderWidth = item;
            },
            // style 边框样式
            setStyleBorderStyle: function(item) {
                this.styles.borderStyle = item.name;
            },
            // style 边框颜色
            setStyleBorderColor: function(item) {
                var borderColor = this.styles.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // style 填充颜色
            setStyleFillColor: function(item) {
                var fillColor = this.styles.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
            },
            // ontrue 边框宽度
            setOnTrueBorderWidth: function(item) {
                this.ontrue.borderWidth = item;
            },
            // ontrue 边框样式
            setOnTrueBorderStyle: function(item) {
                this.ontrue.borderStyle = item.name;
            },
            // ontrue 边框颜色
            setOnTrueBorderColor: function(item) {
                var borderColor = this.ontrue.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // ontrue 填充颜色
            setOnTrueFillColor: function(item) {
                var fillColor = this.ontrue.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
            },

            // onfalse 边框宽度
            setOnFalseBorderWidth: function(item) {
                this.onfalse.borderWidth = item;
            },
            // onfalse 边框样式
            setOnFalseBorderStyle: function(item) {
                this.onfalse.borderStyle = item.name;
            },
            // onfalse 边框颜色
            setOnFalseBorderColor: function(item) {
                var borderColor = this.onfalse.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // onfalse 填充颜色
            setOnFalseFillColor: function(item) {
                var fillColor = this.onfalse.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
            },

            // onalarm 边框宽度
            setOnAlarmBorderWidth: function(item) {
                this.onalarm.borderWidth = item;
            },
            // onalarm 边框样式
            setOnAlarmBorderStyle: function(item) {
                this.onalarm.borderStyle = item.name;
            },
            // onalarm 边框颜色
            setOnAlarmBorderColor: function(item) {
                var borderColor = this.onalarm.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // onalarm 填充颜色
            setOnAlarmFillColor: function(item) {
                var fillColor = this.onalarm.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
            },


            // ondisc 边框宽度
            setOnDiscBorderWidth: function(item) {
                this.ondisc.borderWidth = item;
            },
            // ondisc 边框样式
            setOnDiscBorderStyle: function(item) {
                this.ondisc.borderStyle = item.name;
            },
            // ondisc 边框颜色
            setOnDiscBorderColor: function(item) {
                var borderColor = this.ondisc.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // ondisc 填充颜色
            setOnDiscFillColor: function(item) {
                var fillColor = this.ondisc.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
            },





            // 处理color 数据
            setColorData: function() {
                var strColor = JSON.stringify(this.borderData.colorData.map(function(item) {
                    return item;
                }));
                this.styles.borderColor.colorData = JSON.parse(strColor);
                this.styles.fillColor.colorData = JSON.parse(strColor);
                this.ontrue.borderColor.colorData = JSON.parse(strColor);
                this.ontrue.fillColor.colorData = JSON.parse(strColor);
                this.onfalse.borderColor.colorData = JSON.parse(strColor);
                this.onfalse.fillColor.colorData = JSON.parse(strColor);

                this.onalarm.borderColor.colorData = JSON.parse(strColor);
                this.onalarm.fillColor.colorData = JSON.parse(strColor);

                this.ondisc.borderColor.colorData = JSON.parse(strColor);
                this.ondisc.fillColor.colorData = JSON.parse(strColor);

                console.log(JSON.stringify(this.styles.borderColor.colorData));
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

            },
        }
    })

    // 名称
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