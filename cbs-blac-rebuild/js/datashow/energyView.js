layui.use(['layer', 'element', 'laydate'], function () {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;
    // var $ = layui.jquery;
    var timeoutId; //搜索延时操作标志

    var startime = laydate.render({
        elem: '#startime',
        theme: 'balck',
        showBottom: false,
        done: function (value, date, endDate) {
            var energyAnalysis =energyVue.energyAnalysis.comparisonOfHistoricalData;
            var ed = energyVue.energyAnalysis.timeOption.endtime;
            var st = value;
            energyAnalysis.relativeData.data.length = 0;
            energyAnalysis.absolutelyData.data.length = 0;

            energyVue.analysisTimeSet({
                name: '自定义',
                type: false,
                time: {
                    type: 'start',
                    value: value
                }
            }, 'set');

            if (ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {

                    // 这里要重新计算比较方法
                    if (compareYear(new Date(st), 10) <= value) {
                        // energyVue.energyAnalysis.timeOption.startime = '';
                        layer.msg("超过统计时间限制");

                    } else {
                        // 请求数据
                    }
                } else {
                    energyVue.energyAnalysis.timeOption.startime = '';
                    layer.msg("结束时间需晚于开始时间");
                }
            } else {
                $('#endtime').focus();
            }



            console.log('查看开始时间:' + energyVue.energyAnalysis.timeOption.startime);

            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });
    var endtime = laydate.render({
        elem: '#endtime',
        theme: 'balck',
        showBottom: false,
        done: function (value, date, endDate) {
            var energyAnalysis =energyVue.energyAnalysis.comparisonOfHistoricalData;
            var st = energyVue.energyAnalysis.timeOption.startime;
            var ed = value;

            energyAnalysis.relativeData.data.length = 0;
            energyAnalysis.absolutelyData.data.length = 0;
            energyVue.analysisTimeSet({
                name: '自定义',
                type: false,
                time: {
                    type: 'end',
                    value: value
                }
            }, 'set');




            console.log('查看开始时间：' + energyVue.energyAnalysis.timeOption.startime);
            console.log('查看结束时间：' + energyVue.energyAnalysis.timeOption.endtime);
            if (st != '' && ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {
                    if (compareYear(new Date(st), 10) <= value) {
                        layer.msg("超过统计时间限制");
                    } else {
                        // warnVue.getWarnLog(1);
                    }
                } else {
                    energyVue.energyAnalysis.timeOption.endtime = '';
                    layer.msg("结束时间需晚于开始时间");
                }
            }
        }
    });



    var energyVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            loadingShow: false,
            energyAnalysis: { //能耗分析
                customList: [ //自定义图表列表
                    {
                        "user_id": 29,
                        "project_id": 1,
                        "name": "6月月报6月月报6月月报6月月报6月月报6月月报6月月报6月月报",
                        "start_time": "0001-01-01 00:00:00",
                        "end_time": "0001-01-01 00:00:00",
                        "date_type": 1,
                        "length_unit": "month",
                        "lengths": -2,
                        "relative_history": "[]",
                        "absolute_history": "[]",
                        "tag_id_tree": "[{\"id\":\"65\",\"selected\":1,\"tags\":null},{\"id\":\"66\",\"selected\":1,\"tags\":null},{\"id\":\"67\",\"selected\":1,\"tags\":null},{\"id\":\"68\",\"selected\":1,\"tags\":null}]",
                        "id": 40,
                        "create_time": "2017-07-27 17:10:50"
                    }
                ], 
                timeOption: { //时间操作
                    flag: false, //初始化使用
                    btnSelectTitle: '', //当前时间类型
                    btnSelectdata: [], //时间下拉框数据
                    startime: '', //开始时间
                    endtime: '', //结束时间
                },
                comparisonOfHistoricalData: { //对比历史数据
                    flag: true, //是否可以对比历史数据(true可对比/false不可对比)
                    relative: true, //true(相对时间)/false(绝对时间)
                    relativeData: { //相对时间 数据
                        comparisonTitle: '', //时间头部
                        timeUnit: '', //时间跨度,
                        timeType: '', //时间类型 (用于计算 对比时间)
                        data: []
                    },
                    absolutelyData: { //绝对时间 数据
                        timeDifference:0, //绝对时间差值,
                        item:{
                            type:'',
                            value:''
                        },//当前编辑的时间
                        data: []
                    }
                },

                customOptionBtn: { //自定义按钮操作
                    btn: {
                        name: '保存',
                        type: '1'
                    },
                    data: [{
                            name: '保存',
                            type: 1,
                        },
                        {
                            name: '另存为',
                            type: 2,
                        },
                        {
                            name: '删除',
                            type: 3
                        }
                    ]
                },
                analysisCharts: { //能耗分析  图表数据
                    time:{
                        timeType: '', //图表数据时间类型  hour/day/month/year
                        timeData:[
                            {
                                name:'时',
                                type:'hour',
                                isActive:true,
                            },
                            {
                                name:'天',
                                type:'day',
                                isActive:false,
                            },
                            {
                                name:'月',
                                type:'month',
                                isActive:false,
                            },
                            {
                                name:'年',
                                type:'year',
                                isActive:false,
                            }
                        ],
                       
                    },
                    chart:{
                        chartType: '', //图表类型   column/spline/pie/area
                        chartData:[
                            {
                                name:'柱状图',
                                type:'column',
                                isActive:true,
                            },
                            {
                                name:'折线图',
                                type:'spline',
                                isActive:false,
                            },
                            {
                                name:'饼图',
                                type:'pie',
                                isActive:false,
                            },
                            {
                                name:'堆积图',
                                type:'area',
                                isActive:false,
                            },
                        ]
                    }
                   
                    

                },
            },
            tagTree: {
                aTree: { //能耗分析  树  配置
                    tag: { // 能耗分析 被选中的tag 
                        energy_group_ids: [],
                        tag_ids: []
                    },
                    treeData: [], //能耗分析  生成树  数据
                    search: {
                        value: '',
                        nodeList: []
                    },
                    setting: {
                        check: {
                            enable: true,
                            chkboxType: {
                                "Y": "",
                                "N": ""
                            }
                        },
                        data: {
                            simpleData: {
                                enable: true
                            }
                        },
                        view: {
                            showLine: false,
                            showIcon: false,
                            dblClickExpand: false,
                            fontCss: function (treeId, treeNode) {
                                return (!!treeNode.highlight) ? {
                                    color: "#35c99d"
                                } : {
                                    color: "#ffffff"
                                };
                            }
                        },
                        callback: {
                            onClick: function (e, treeId, treeNode) {
                                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                                zTree.expandNode(treeNode, null, null, false, null);

                            },
                            // 筛选备用方法
                            onCheck: function (event, treeId, treeNode) {
                                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                                var nodes = zTree.getCheckedNodes(true);
                                if (nodes.length > 1) {
                                    energyVue.energyAnalysis.comparisonOfHistoricalData.flag = false;
                                } else {
                                    energyVue.energyAnalysis.comparisonOfHistoricalData.flag = true;
                                }
                                console.log('操作完成查看：' + JSON.stringify(nodes, null, 2))


                            }

                        }
                    },

                },

                tTree: { //能耗报表  树  配置
                    tag: { // 能耗报表 被选中的tag  
                        energy_group_ids: [],
                        tag_ids: []
                    },
                    treeData: [], //能耗报表  生成树   数据
                    setting: {
                        check: {
                            enable: true,
                            chkboxType: {
                                "Y": "",
                                "N": ""
                            }
                        },
                        data: {
                            simpleData: {
                                enable: true
                            }
                        },
                        view: {
                            showLine: false,
                            showIcon: false,
                            dblClickExpand: false
                        },
                        callback: {
                            onClick: function (e, treeId, treeNode) {
                                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                                zTree.expandNode(treeNode);
                            },
                            onCheck: function (event, treeId, treeNode) {}
                        }
                    },
                },
            },

        },
        mounted: function () {
            var _this = this;

            this.$nextTick(function () {

                element.init();
                this.vueInit();
                this.drawAnalysis();

                this.getTagTreeData();


                // 对比历史
                // this.comparisonHistory();
            });
        },
        methods: {
            // 获取 能耗分析 自定义图表数据
            getCustomAnalysisData: function (item) {
                console.log('自定义图表:' + JSON.stringify(item, null, 2));
            },
            // 能耗图表 时间选择
            choiceAnalysisTime: function (item) {
                this.analysisTimeSet(item, 'choice');

                var time_option = this.energyAnalysis.timeOption;
                // var com_His_Data = this.energyAnalysis.comparisonOfHistoricalData;
                if (time_option.flag) {
                    if (item.type) {
                        // 查询历史数据
                        // this.searchTagValueHistoryTrend();
                    } else {
                        // $('#startime').focus();
                    }
                } else {
                    time_option.flag = true;
                }

                console.log(JSON.stringify(item, null, 2))
            },
            /**
             * 能耗 时间处理---->时间数据设置
             * [item] 
             * [type]  choice选择时间  / set自定义时间
             */
            analysisTimeSet: function (item, type) {
                var time_option = this.energyAnalysis.timeOption;
                var com_his_data = this.energyAnalysis.comparisonOfHistoricalData;

                time_option.btnSelectTitle = item.name;


                com_his_data.relativeData.data.length = 0;
                com_his_data.absolutelyData.data.length = 0;
                com_his_data.relativeData.comparisonTitle = '';
                com_his_data.relativeData.timeUnit = '';
                com_his_data.relativeData.timeType = '';

                if (item.type) {
                    com_his_data.relative = true;
                    com_his_data.relativeData.comparisonTitle = item.name;
                    com_his_data.relativeData.timeUnit = item.unit;
                    com_his_data.relativeData.timeType = item.num;


                } else {
                    com_his_data.relative = false;
                }

                switch (type) {
                    case 'choice':
                        time_option.startime = item.startime;
                        time_option.endtime = item.endtime;
                        break;
                    case 'set':
                        if (item.time.type === 'start') {
                            time_option.startime = item.time.value;
                        } else {
                            time_option.endtime = item.time.value;
                        }
                        break;
                    default:
                        break;
                }



                console.log(JSON.stringify(com_his_data, null, 2))

            },


            // 对比历史数据
            comparisonHistory: function () {
                var _this = this;
                var type = this.energyAnalysis.comparisonOfHistoricalData.relative;
                if (type) {
                    // 相对时间
                    layer.open({
                        title: ['对比历史数据'],
                        type: 1,
                        skin: 'bayax-layer-skin',
                        area: '800px',
                        content: $('#relative'),
                        shift: 2,
                        resize: false,
                        btn: ['保存', '取消'],
                        success: function () {

                        },
                        yes: function (index) {

                        },
                        btn2: function (index) {},
                    });
                } else {
                    // 绝对时间
                    var time_option = this.energyAnalysis.timeOption;
                    if (time_option.startime == '' || time_option.endtime == '') {
                        layer.msg('时间区间不能为空');
                    } else {
                        layer.open({
                            title: ['对比历史数据'],
                            type: 1,
                            skin: 'bayax-layer-skin',
                            area: '800px',
                            content: $('#absolute'),
                            shift: 2,
                            resize: false,
                            btn: ['保存', '取消'],
                            success: function () {
                                
                                var energyAnalysis = _this.energyAnalysis;
                                var start =new Date(energyAnalysis.timeOption.startime.replace(/\-/g, "/")) ;
                                var end = new Date(energyAnalysis.timeOption.endtime.replace(/\-/g, "/"));
                                var time_difference = end-start;
                                energyAnalysis.comparisonOfHistoricalData.absolutelyData.time_difference = end-start;
                                console.log(start);
                                console.log(end);

                                console.log('时间差:'+time_difference);
                            },
                            yes: function (index) {

                            },
                            btn2: function (index) {},
                        });
                    }


                }

            },
            // 对比历史数据   添加【相对时间】
            addRelativeTime: function () {
                var _this = this;
                var relativeData = this.energyAnalysis.comparisonOfHistoricalData.relativeData;
                var time = {};
                var time_type = Number(relativeData.timeType);

                time = setRelativeHisTime(time_type, 1, true);


                if (relativeData.data.length < 9) {
                    relativeData.data.push({
                            // name: '1231',
                            num: 1, //第几个
                            start_time: time.start_time, //开始时间
                            end_time: time.end_time, //结束时间
                            numlist: [{
                                name: 1
                            }, {
                                name: 2
                            }, {
                                name: 3
                            }, {
                                name: 4
                            }, {
                                name: 5
                            }, {
                                name: 6
                            }, {
                                name: 7
                            }, {
                                name: 8
                            }, {
                                name: 9
                            }]
                        },

                    );
                } else {
                    layer.msg('最多添加9条对比数据')
                }
            },
            // 对比历史数据  删除【相对时间】
            deleteRelativeTime:function(item){
                var _this = this;
                var relativeData = this.energyAnalysis.comparisonOfHistoricalData.relativeData;
                var index = relativeData.data.indexOf(item);
                if(index >-1){
                    relativeData.data.splice(index,1);
                }
            },

            /**
             * 对比历史数据   选择【相对时间】
             * [item] 一条对比时间
             *[items] 被选第几个对比时间
             */
            choiceRelativeTime: function (item, items) {

                item.num = items.name;
                var time = {};
                var time_type = Number(this.energyAnalysis.comparisonOfHistoricalData.relativeData.timeType);
                // layer.msg(time_type);

                time = setRelativeHisTime(time_type, Number(items.name), true);
                item.start_time = time.start_time;
                item.end_time = time.end_time;
                console.log('计算对比时间：' + JSON.stringify(time, null, 2));


                // console.log('全部时间:'+JSON.stringify(item,null,2));
                // console.log('选择时间:'+JSON.stringify(items,null,2));
            },

            // 对比历史数据   添加【绝对时间】
            addAbsoluteTime: function () {
                var _this = this;
                var absolutelyData = this.energyAnalysis.comparisonOfHistoricalData.absolutelyData;
                if(absolutelyData.data.length < 9){
                    absolutelyData.data.push({
                        name:'1',
                        start:{
                            value:'',
                            type:'start'
                        },
                        end:{
                            value:'',
                            type:'end'
                        },
                        
                    });
                    this.$nextTick(function () {
                        lay('.absolute-time').each(function(){
                            laydate.render({
                              elem: this,
                              theme: 'balck',
                              showBottom: false,
                              done: function (value, date, endDate) {
                                // console.log(energyVue);
                                var item = energyVue.energyAnalysis.comparisonOfHistoricalData.absolutelyData.item;
                                switch (item.type) {
                                    case 'start':
                                        item.value.start.value = value;
                                        var times = Date.parse(new Date(value.replace(/\-/g, "/")))+energyVue.energyAnalysis.comparisonOfHistoricalData.absolutelyData.time_difference;
                                        console.log(times);
                                        item.value.end.value =new Date(times).format('yyyy-MM-dd');
                                        console.log(new Date(times).format('yyyy-MM-dd'));
                                        break;
                                    case 'end':
                                        item.value.end.value = value;
                                        var times = Date.parse(new Date(value.replace(/\-/g, "/"))) - energyVue.energyAnalysis.comparisonOfHistoricalData.absolutelyData.time_difference;
                                        item.value.start.value = new Date(times).format('yyyy-MM-dd');
                                        break;
                                    default:
                                        break;
                                }
                              }
                            });
                          });
                       
                    });
                }else{
                    layer.msg('最多添加9条对比数据');
                }
               
                // var dic =
            },
            // 对比历史数据  设置绝对时间选择标志
            setAbsoluteTimeFlag:function(item,type){
                var absolutelyData = this.energyAnalysis.comparisonOfHistoricalData.absolutelyData;
                absolutelyData.item.value = item;
                absolutelyData.item.type = type;
                console.log(JSON.stringify(item,null,2));
                console.log('类型:'+type)
            },
            // 对比历史数据 删除【绝对时间】
            deleteAbsoluteTime:function(item){
                var _this = this;
                var absolutelyData = this.energyAnalysis.comparisonOfHistoricalData.absolutelyData;
                var index = absolutelyData.data.indexOf(item);
                if(index >-1){
                    absolutelyData.data.splice(index,1);
                }
            },


            // 能耗图表 自定义图表操作  保存/另存为/删除
            analysisOptionClick: function (item) {
                var btn = this.energyAnalysis.customOptionBtn.btn;
                btn.name = item.name;
                btn.type = item.type;

            },

            // 能耗图表 时间类型选择
            setChartsTimeType:function(item){
                console.log(JSON.stringify(item,null,2));
            },
            // 能耗图表  图表类型选择
            setChartsType:function(item){

            },

            // 能耗图表生成
            drawAnalysis: function (data) {

                var data = [{
                        name: '机组A',
                        marker: {
                            enabled: true,
                            radius: 3
                        },
                        color: '#A4CD52',
                        data: [
                            [1512086400000, 0],
                            [1512172800000, 10],
                            [1512259200000, 11],
                            [1512345600000, 100],
                            [1512432000000, 0],
                            [1512518400000, 0],
                            [1512604800000, 0],
                            [1512691200000, 0],
                            [1512777600000, 0],
                            [1512864000000, 0],
                            [1512950400000, 70],
                            [1513036800000, 30],
                            [1513123200000, 0],
                            [1513209600000, 4],
                            [1513296000000, 0],
                            [1513382400000, 0],
                            [1513468800000, 0],
                            [1513555200000, 0],
                            [1513641600000, 0],
                            [1513728000000, 0],
                            [1513814400000, 0],
                            [1513900800000, 0],
                            [1513987200000, 0],
                            [1514073600000, 0],
                            [1514160000000, 0],
                            [1514246400000, 0],
                            [1514332800000, 0],
                            [1514419200000, 0],
                            [1514505600000, 0],
                            [1514592000000, 0],
                            [1514678400000, 0]
                        ]
                    },
                    {
                        name: '机',
                        marker: {
                            enabled: true,
                            radius: 3
                        },
                        color: '#E7706F',
                        data: [
                            [1512086400000, 0],
                            [1512172800000, 20],
                            [1512259200000, 100],
                            [1512345600000, 80],
                            [1512432000000, 0],
                            [1512518400000, 0],
                            [1512604800000, 0],
                            [1512691200000, 0],
                            [1512777600000, 0],
                            [1512864000000, 0],
                            [1512950400000, 0],
                            [1513036800000, 0],
                            [1513123200000, 0],
                            [1513209600000, 0],
                            [1513296000000, 100],
                            [1513382400000, 0],
                            [1513468800000, 0],
                            [1513555200000, 0],
                            [1513641600000, 0],
                            [1513728000000, 0],
                            [1513814400000, 0],
                            [1513900800000, 0],
                            [1513987200000, 0],
                            [1514073600000, 0],
                            [1514160000000, 0],
                            [1514246400000, 0],
                            [1514332800000, 0],
                            [1514419200000, 0],
                            [1514505600000, 0],
                            [1514592000000, 0],
                            [1514678400000, 0]
                        ]
                    }
                ]



                var charname = 'column';
                $('#analysisContent').highcharts('StockChart', {
                    chart: {
                        backgroundColor: '#1C203F',
                        alignTicks: true,
                        type: '' + charname + ''
                    },
                    title: {
                        text: '能耗数据',
                        style: {
                            color: '#fff'
                        }
                    },
                    rangeSelector: {
                        enabled: false,
                    },
                    legend: {
                        symbolHeight: 12,
                        symbolWidth: 18,
                        symbolRadius: 0,
                        itemStyle: {
                            color: '#ffffff'
                        },
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0,
                        enabled: true,
                        labelFormatter: function () { //图例的内容
                            //return this.name;//默认返回的内容
                            var msg;
                            msg = '<a title="' + this.name + '">';
                            if (this.name.length > 14) {
                                msg += (this.name).substring(0, 5);
                                msg += '...';
                                msg += (this.name).substring(this.name.length - 5, this.name.length);
                            } else {
                                msg += this.name;
                            }
                            msg += '</a>';
                            return msg;
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            borderWidth: 0
                        }
                    },

                    navigator: {
                        enabled: true,
                        xAxis: {
                            lineColor: '#555769',
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                second: '%Y-%m-%d<br/>%H:%M:%S',
                                minute: '%Y-%m-%d<br/>%H:%M',
                                hour: '%Y-%m-%d %H:00',
                                day: '%Y-%m-%d',
                                week: '%Y-%m-%d',
                                month: '%Y-%m',
                                year: '%Y-'
                            }
                        }
                    },





                    tooltip: {
                        formatter: function () {
                            var content = "";

                            var date = new Date(this.x);
                            content += '<span>' + date.format("yyyy-MM-dd hh:mm:ss") + '</span><br/>'
                            for (var i = 0; i < this.points.length; i++) {
                                content += '<br /><span style="color: ' + this.points[i].series.color + ';">' + this.points[i].series.name + '</span>: ' + this.points[i].y;
                            };
                            return content;
                        }
                    },
                    xAxis: {
                        labels: {
                            style: {
                                color: '#ffffff' //颜色
                            }
                        },
                        lineColor: '#555769',
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            second: '%Y-%m-%d<br/>%H:%M:%S',
                            minute: '%Y-%m-%d<br/>%H:%M',
                            hour: '%Y-%m-%d %H:00',
                            day: '%Y-%m-%d',
                            week: '%Y-%m-%d',
                            month: '%Y-%m',
                            year: '%Y-'
                        }
                    },
                    yAxis: {
                        labels: {
                            style: {
                                color: '#ffffff' //颜色
                            }
                        },
                        gridLineColor: '#555769',
                        opposite: false,
                        title: {
                            style: {
                                color: '#ffffff'
                            },
                            text: '耗电量(kWh)'
                        }
                    },


                    series: data
                });

            },

            // 获取统计对象 并生成tag树
            getTagTreeData: function () {
                var _this = this;

                // $.ajax({
                //     url: apiurl + 'EnergyConfigClassification/0',
                //     type: 'GET',
                //     beforeSend: function() {
                //         _this.loadingShow = true;
                //     },
                //     complete: function() {
                //         _this.loadingShow = false;
                //     },
                //     success: function(result) {


                //         if (result.success) {
                //             console.log('成功')
                //             $(".loading").hide();
                //             if (isInitialize) {
                //                 // 展示树


                //                 showTreeData = showAllNode(result.data.items);
                //                 // $.fn.zTree.init($("#showtree"), showTreeSetting, showTreeData);
                //                 // $.fn.zTree.init($("#edittree"), editTreeSetting, showTreeData);
                //             }
                //             // classificationTree('trees', results, result);
                //         } else {
                //             layer.msg(data.error_message);
                //         }

                //     },
                //     error: function(data) {
                //         publicAjaxError(data);
                //     }
                // });

                var result = {
                    "success": true,
                    "data": {
                        "pageCount": 0,
                        "items": [{
                                "next_level": [{
                                        "next_level": [{
                                            "next_level": [],
                                            "project_id": 1,
                                            "name": "能耗06",
                                            "tag_id_tree": null,
                                            "hide_tag": 1,
                                            "level": 3,
                                            "higher_level": 47,
                                            "sort": 0,
                                            "tag_list": [{
                                                "tag_id": 1435,
                                                "oprate": 1,
                                                "name": '终端空调',
                                                "node_name": null,
                                                "point_id": 0,
                                                "group_id": 50,
                                                "id": 1391,
                                                "create_time": "2017-06-15 16:49:10"
                                            }],
                                            "id": 50,
                                            "create_time": "0001-01-01 00:00:00"
                                        }],
                                        "project_id": 1,
                                        "name": "能耗03",
                                        "tag_id_tree": null,
                                        "hide_tag": 1,
                                        "level": 2,
                                        "higher_level": 46,
                                        "sort": 0,
                                        "tag_list": [{
                                            "tag_id": 1135,
                                            "oprate": 1,
                                            "name": null,
                                            "node_name": null,
                                            "point_id": 0,
                                            "group_id": 47,
                                            "id": 1090,
                                            "create_time": "2017-06-15 15:34:26"
                                        }],
                                        "id": 47,
                                        "create_time": "0001-01-01 00:00:00"
                                    },
                                    {
                                        "next_level": [{
                                            "next_level": [],
                                            "project_id": 1,
                                            "name": "能耗08",
                                            "tag_id_tree": null,
                                            "hide_tag": 0,
                                            "level": 2,
                                            "higher_level": 55,
                                            "sort": 0,
                                            "tag_list": [{
                                                "tag_id": 1635,
                                                "oprate": 1,
                                                "name": null,
                                                "node_name": null,
                                                "point_id": 0,
                                                "group_id": 52,
                                                "id": 1591,
                                                "create_time": "2017-06-15 16:53:28"
                                            }],
                                            "id": 52,
                                            "create_time": "0001-01-01 00:00:00"
                                        }],
                                        "project_id": 1,
                                        "name": "能耗能耗1111111",
                                        "tag_id_tree": null,
                                        "hide_tag": 1,
                                        "level": 2,
                                        "higher_level": 46,
                                        "sort": 0,
                                        "tag_list": [{
                                            "tag_id": 1935,
                                            "oprate": 1,
                                            "name": null,
                                            "node_name": null,
                                            "point_id": 0,
                                            "group_id": 55,
                                            "id": 2891,
                                            "create_time": "2017-06-15 18:38:28"
                                        }],
                                        "id": 55,
                                        "create_time": "0001-01-01 00:00:00"
                                    }
                                ],
                                "project_id": 1,
                                "name": "能耗02",
                                "tag_id_tree": null,
                                "hide_tag": 1,
                                "level": 1,
                                "higher_level": 54,
                                "sort": 0,
                                "tag_list": [{
                                    "tag_id": 699,
                                    "oprate": 1,
                                    "name": null,
                                    "node_name": null,
                                    "point_id": 0,
                                    "group_id": 46,
                                    "id": 593,
                                    "create_time": "2017-06-15 15:28:23"
                                }],
                                "id": 46,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "next_level": [{
                                    "next_level": [{
                                        "next_level": [],
                                        "project_id": 1,
                                        "name": "能耗12",
                                        "tag_id_tree": null,
                                        "hide_tag": 1,
                                        "level": 3,
                                        "higher_level": 53,
                                        "sort": 0,
                                        "tag_list": [

                                            {
                                                "tag_id": 2035,
                                                "oprate": 1,
                                                "name": '123123123123',
                                                "node_name": null,
                                                "point_id": 0,
                                                "group_id": 56,
                                                "id": 2991,
                                                "create_time": "2017-06-15 18:38:37"
                                            }
                                        ],
                                        "id": 56,
                                        "create_time": "0001-01-01 00:00:00"
                                    }],
                                    "project_id": 1,
                                    "name": "能耗09",
                                    "tag_id_tree": null,
                                    "hide_tag": 0,
                                    "level": 2,
                                    "higher_level": 48,
                                    "sort": 0,
                                    "tag_list": [

                                        {
                                            "tag_id": 1735,
                                            "oprate": 1,
                                            "name": null,
                                            "node_name": null,
                                            "point_id": 0,
                                            "group_id": 53,
                                            "id": 1691,
                                            "create_time": "2017-06-15 16:54:57"
                                        }
                                    ],
                                    "id": 53,
                                    "create_time": "0001-01-01 00:00:00"
                                }],
                                "project_id": 1,
                                "name": "能耗04",
                                "tag_id_tree": null,
                                "hide_tag": 0,
                                "level": 1,
                                "higher_level": 46,
                                "sort": 0,
                                "tag_list": [

                                    {
                                        "tag_id": 1235,
                                        "oprate": 1,
                                        "name": null,
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 48,
                                        "id": 1190,
                                        "create_time": "2017-06-15 16:46:08"
                                    }
                                ],
                                "id": 48,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "next_level": [],
                                "project_id": 1,
                                "name": "能耗05",
                                "tag_id_tree": null,
                                "hide_tag": 1,
                                "level": 1,
                                "higher_level": 0,
                                "sort": 0,
                                "tag_list": [{
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },

                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },
                                    {
                                        "tag_id": 1335,
                                        "oprate": 1,
                                        "name": 'eeeeeeeeee',
                                        "node_name": null,
                                        "point_id": 0,
                                        "group_id": 49,
                                        "id": 1291,
                                        "create_time": "2017-06-15 16:47:41"
                                    },

                                ],
                                "id": 49,
                                "create_time": "0001-01-01 00:00:00"
                            }
                        ]
                    },
                    "error_message": null
                }

                var arr = _this.handleAllTagData(result.data.items);
                _this.tagTree.aTreeData = deepClone(arr);
                _this.tagTree.tTreeData = deepClone(arr);

                console.log('查看数据:' + JSON.stringify(_this.tagTree.aTreeData, null, 2));
                $.fn.zTree.init($("#analysis-tree"), _this.tagTree.aTree.setting, _this.tagTree.aTreeData);



            },

            // 能耗分析 树 搜索
            analysisSearch: function () {
                var _this = this;
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                var search = _this.tagTree.aTree.search;
                console.log(JSON.stringify('上次:' + search.nodeList, null, 2))
                _this.updateNodes(zTree, search.nodeList, false);

                if (search.value === '') {} else {
                    search.nodeList = zTree.getNodesByParamFuzzy('name', search.value);
                    console.log(JSON.stringify('搜索到的内容:' + search.nodeList, null, 2))
                    _this.updateNodes(zTree, search.nodeList, true);
                }
            },
            // 更新搜索
            updateNodes: function (tree, nodelist, highlight) {
                var l = nodelist.length
                for (var i = 0; i < l; i++) {
                    nodelist[i].highlight = highlight;
                    tree.updateNode(nodelist[i]);
                }
            },

            // 能耗分析 树 清空搜索
            analysisCleanSearch: function () {
                this.tagTree.aTree.search.value = '';
                this.analysisSearch();
            },
            analysisCleanAll: function () {
                this.tagTree.aTree.search.value = '';
                this.analysisSearch();
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                zTree.checkAllNodes(false);
            },
            // 能耗分析 树  btn-筛选
            analysisBtnFilter: function () {
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                var nodes = zTree.getCheckedNodes(true);
                console.log('数组长度：' + nodes.length)
                // console.log(JSON.stringify(nodes,null,2));
                var tag = energyVue.tagTree.aTree.tag;
                tag.energy_group_ids.length = 0;
                tag.tag_ids.length = 0;
                nodes.forEach(function (item, index) {
                    console.log(index)
                    if (item.isgroup) {
                        var indexs = tag.energy_group_ids.indexOf(item.rel_id);
                        if (indexs < 0) {
                            tag.energy_group_ids.push(item.rel_id);
                        }
                    } else {
                        var indexs = tag.tag_ids.indexOf(item.id);
                        if (indexs < 0) {
                            tag.tag_ids.push(item.id);
                        }
                    }
                });

                var length = tag.energy_group_ids.length + tag.tag_ids;

                console.log('数组长===:' + length);
                if (length == 0) {
                    layer.msg('统计对象为空');
                } else if (length > 16) {
                    layer.msg('请选择不超过16条统计对象进行对比');
                } else {
                    $('.choice-tag-btn').click();
                    console.log('操作完成查看：' + JSON.stringify(tag, null, 2))
                }


            },

            // 能耗分析 树  btn-清空筛选
            analysisBtnCleanFilter: function () {
                this.tagTree.aTree.search.value = '';
                this.analysisSearch();
            },



            // 处理 tag数据
            handleAllTagData: function (item) {
                var arr = [];
                item.forEach(function (ele) {
                    var dic = {};
                    dic.id = 'g' + ele.id;
                    dic.rel_id = ele.id;
                    dic.name = ele.name;
                    dic.higher_level = ele.higher_level;
                    dic.open = true;
                    dic.isgroup = true;
                    dic.children = [];
                    if (ele.next_level.length > 0) {
                        ele.next_level.forEach(function (eletwo) {
                            var dictwo = {};
                            dictwo.id = 'g' + eletwo.id;
                            dictwo.rel_id = eletwo.id;
                            dictwo.name = eletwo.name;
                            dictwo.higher_level = eletwo.higher_level;
                            dictwo.open = true;
                            dictwo.isgroup = true;
                            dictwo.children = [];
                            if (eletwo.next_level.length > 0) {
                                eletwo.next_level.forEach(function (elethree) {
                                    var dicthree = {};
                                    dicthree.id = 'g' + elethree.id;
                                    dicthree.rel_id = elethree.id;
                                    dicthree.name = elethree.name;
                                    console.log(dicthree.name)
                                    dicthree.higher_level = elethree.higher_level;
                                    dicthree.open = true;
                                    dicthree.isgroup = true;
                                    dicthree.children = [];

                                    if (Boolean(elethree.hide_tag)) { //1  显示   0  代表隐藏
                                        elethree.tag_list.forEach(function (item) {
                                            dicthree.children.push({
                                                id: item.tag_id,
                                                name: item.name,
                                                isgroup: false
                                            });
                                        });


                                    }


                                    dictwo.children.push(dicthree);

                                })
                            } else {
                                if (Boolean(eletwo.hide_tag)) { //1  显示   0  代表隐藏

                                    eletwo.tag_list.forEach(function (item) {
                                        dictwo.children.push({
                                            id: item.tag_id,
                                            name: item.name,
                                            isgroup: false
                                        });
                                    });

                                }
                            }
                            dic.children.push(dictwo);
                        })
                    } else {
                        if (Boolean(ele.hide_tag)) { //1  显示   0  代表隐藏
                            ele.tag_list.forEach(function (item) {
                                dic.children.push({
                                    id: item.tag_id,
                                    name: item.name,
                                    isgroup: false
                                });
                            });
                        }

                    }
                    arr.push(dic);
                }, this);

                return arr;
            },
            // 搜索延时
            debounce: function (fn, delay, options) {

                if (!options) {
                    options = {};
                }
                var leadingExc = false;

                return function () {
                    var that = this,
                        args = arguments;
                    if (!leadingExc && !(options.leading === false)) {
                        fn.apply(that, args);
                    }
                    leadingExc = true;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(function () {
                        if (!(options.trailing === false)) {
                            fn.apply(that, args);
                        }
                        leadingExc = false;
                    }, delay);
                }
            },
            // 初始化
            vueInit: function () {
                // 下拉框初始化
                bayaxInit();

                // 下拉框时间数据初始化 (默认显示最近三天)
                var time_option = this.energyAnalysis.timeOption;
                time_option.btnSelectdata = dateData();
                this.choiceAnalysisTime(time_option.btnSelectdata[2]);
                // time_data[2].click();


                // 滚动条初始化
                $('.menu, .bayax-tree').mCustomScrollbar({
                    // autoHideScrollbar: true
                });

                // 选择统计对象
                $('body').on('click', function () {
                    $('.tag-tree').slideUp(100);
                });
                $('.choice-tag-btn').on('click', function (e) {
                    var oEvent = e || event;
                    oEvent.stopPropagation(); //阻止事件冒泡
                    $('#' + $(this).data('id')).slideToggle(200);
                });
                $('.tag-tree').on('click', function (e) {
                    var oEvent = e || event;
                    oEvent.stopPropagation(); //阻止事件冒泡
                });
                $('.tree-panel-title').on('click', function () {
                    $('#' + $(this).data('id')).slideToggle(200);
                });


            },

        }
    });

});


Highcharts.setOptions({
    global: {
        useUTC: false
    },
    lang: {
        contextButtonTitle: "图表导出菜单",
        decimalPoint: ".",
        downloadJPEG: "下载JPEG图片",
        downloadPDF: "下载PDF文件",
        downloadPNG: "下载PNG文件",
        downloadSVG: "下载SVG文件",
        drillUpText: "返回 {series.name}",
        loading: "加载中",
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        noData: "没有数据",
        numericSymbols: ["千", "兆", "G", "T", "P", "E"],
        printChart: "打印图表",
        resetZoom: "恢复缩放",
        resetZoomTitle: "恢复图表",
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        thousandsSep: ",",
        weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
    }
});
