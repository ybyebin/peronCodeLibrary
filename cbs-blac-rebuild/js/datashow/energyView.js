layui.use(['layer', 'element', 'laydate'], function () {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;
    // var $ = layui.jquery;


    var startime = laydate.render({
        elem: '#startime',
        theme: 'balck',
        showBottom: false,
        done: function (value, date, endDate) {

            energyVue.analysisTimeSet({
                name:'自定义',
                type:false,
                time:{
                    type:'start',
                    value:value
                }
            },'set');


            $('#endtime').focus();
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

            var st = energyVue.energyAnalysis.timeOption.startime;
            var ed =  value;

            energyVue.analysisTimeSet({
                name:'自定义',
                type:false,
                time:{
                    type:'end',
                    value:value
                }
            },'set');




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
            energyAnalysis:{ //能耗分析
                customList:[ //自定义图表列表
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
                ],// 自定义图表 列表
                timeOption:{ //时间操作
                    flag:false, //初始化使用
                    btnSelectTitle: '',//当前时间类型
                    btnSelectdata: [], //时间下拉框数据
                    startime: '',      //开始时间
                    endtime: '',       //结束时间
                },
                comparisonOfHistoricalData:{ //对比历史数据
                    flag:false, //是否可以对比历史数据(有且只有一个 被选中 为true)
                    relative:true,     //true(相对时间)/false(绝对时间)
                    relativeData:{     //相对时间 数据
                        comparisonTitle:'',//时间头部
                        timeUnit:'',//时间跨度,
                        data:[]
                    },
                    absolutelyData:{   //绝对时间 数据
                        data:[]
                    }
                },
               
                customOptionBtn:{  //自定义按钮操作
                    btn: {
                        name: '保存',
                        type: '1'
                    },
                    data: [
                        {
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
                analysisCharts:{//能耗分析  图表数据
                    chartType:'',//图表类型   column/spline/pie/area
                    timeType:'', //图表数据时间类型  hour/day/month/year
    
                },
            },
            tagTree:{ 
                atag:{ // 能耗分析 被选中的tag  
                    energy_group_ids:[],
                    tag_ids:[]
                },  
                aTreeData:[],//能耗分析  树  数据

                ttag:{ // 能耗报表 被选中的tag  
                    energy_group_ids:[],
                    tag_ids:[]
                },//被选中的tag  
                tTreeData:[],//能耗报表  树   数据
            },
    
        },
        mounted: function () {
            var _this = this;

            this.$nextTick(function () {

                element.init();
                this.vueInit();
                this.drawAnalysis();


                this.getTagTreeData();
            });
        },
        methods: {
            // 获取 能耗分析 自定义图表数据
            getCustomAnalysisData:function(item){
                console.log('自定义图表:'+JSON.stringify(item,null,2));
            },
            // 能耗图表 时间选择
            choiceAnalysisTime: function (item) {
                this.analysisTimeSet(item,'choice');
                
                var time_option =this.energyAnalysis.timeOption;
                // var com_His_Data = this.energyAnalysis.comparisonOfHistoricalData;
                if(time_option.flag){
                    if (item.type) {
                        // 查询历史数据
                        // this.searchTagValueHistoryTrend();
                    }else{
                        // $('#startime').focus();
                    }
                }else{
                    time_option.flag = true;
                }
               
                console.log(JSON.stringify(item, null, 2))
            },
            /**
             * 能耗 时间处理---->时间数据设置
             * [item] 
             * [type]  choice选择时间  / set自定义时间
             */
            analysisTimeSet:function(item,type){
                var time_option =this.energyAnalysis.timeOption;
                var com_his_data = this.energyAnalysis.comparisonOfHistoricalData;

                time_option.btnSelectTitle = item.name;


                com_his_data.relativeData.data.length = 0;
                com_his_data.absolutelyData.data.length = 0;
                com_his_data.relativeData.comparisonTitle = '';
                com_his_data.relativeData.timeUnit = '';

                if (item.type) {
                    com_his_data.relative = true;
                    com_his_data.relativeData.comparisonTitle = item.name;
                    com_his_data.relativeData.timeUnit = item.unit;
                   
                }else{
                    com_his_data.relative = false;
                }

                switch(type){
                    case 'choice':
                    time_option.startime = item.startime;
                    time_option.endtime = item.endtime;
                    break;
                    case 'set':
                        if (item.time.type ==='start') {
                            time_option.startime = item.time.value;
                        }else{
                            time_option.endtime = item.time.value;
                        }
                    break;
                    default:
                    break;
                }
               
               

               console.log(JSON.stringify(com_his_data,null,2))
                







            },
            // 能耗图表 自定义图表操作  保存/另存为/删除
            analysisOptionClick: function (item) {
                var btn = this.energyAnalysis.customOptionBtn.btn;
                btn.name = item.name;
                btn.type = item.type;

            },

            // 能耗图表生成
            drawAnalysis: function (data) {

                $('#lineCharts').highcharts('StockChart', {
                    chart: {
                        backgroundColor: '#1C203F',
                        alignTicks: true,
                        type: '' + charname + ''
                    },
                    tooltip: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            second: '%Y-%m-%d<br/>%H:%M:%S',
                            minute: '%Y-%m-%d<br/>%H:%M',
                            hour: '%Y-%m-%d %H:00',
                            day: '%Y-%m-%d',
                            week: '%Y-%m-%d',
                            month: '%Y-%m',
                            year: '%Y-'
                        },
                        shared: true
                    },
                    rangeSelector: {
                        allButtonsEnabled: true,
                        enabled: false,
                        buttonTheme: {
                            width: 60
                        },
                        selected: 2
                    },
                    navigator: {
                        enabled: true,
                        xAxis: {
                            labels: {
                                style: {
                                    color: '#fff'
                                }
                            },
                            dateTimeLabelFormats: {
                                millisecond: '%H:%M:%S.%L',
                                second: '%H:%M:%S',
                                minute: '%H:%M',
                                hour: '%H点',
                                day: '%Y年%m月%d日',
                                week: '%e. %b',
                                month: '%Y年%m月',
                                year: '%Y年'
                            }
                        }
                    },
                    title: {
                        text: ''
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
                    exporting: {
                        // enabled: false
                        width: 800
                    },
                    credits: {
                        enabled: false
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

                    series: [{
                        name: '东京',
                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }, {
                        name: '纽约',
                        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                    }, {
                        name: '伦敦',
                        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                    }, {
                        name: '柏林',
                        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                    }]
                })


























                var data = [{ name: '机组A', marker: { enabled: true, radius: 3 }, color: '#A4CD52', data: [[1512086400000, 0], [1512172800000, 10], [1512259200000, 11], [1512345600000, 100], [1512432000000, 0], [1512518400000, 0], [1512604800000, 0], [1512691200000, 0], [1512777600000, 0], [1512864000000, 0], [1512950400000, 70], [1513036800000, 30], [1513123200000, 0], [1513209600000, 4], [1513296000000, 0], [1513382400000, 0], [1513468800000, 0], [1513555200000, 0], [1513641600000, 0], [1513728000000, 0], [1513814400000, 0], [1513900800000, 0], [1513987200000, 0], [1514073600000, 0], [1514160000000, 0], [1514246400000, 0], [1514332800000, 0], [1514419200000, 0], [1514505600000, 0], [1514592000000, 0], [1514678400000, 0]] },
                { name: '机', marker: { enabled: true, radius: 3 }, color: '#E7706F', data: [[1512086400000, 0], [1512172800000, 20], [1512259200000, 100], [1512345600000, 80], [1512432000000, 0], [1512518400000, 0], [1512604800000, 0], [1512691200000, 0], [1512777600000, 0], [1512864000000, 0], [1512950400000, 0], [1513036800000, 0], [1513123200000, 0], [1513209600000, 0], [1513296000000, 100], [1513382400000, 0], [1513468800000, 0], [1513555200000, 0], [1513641600000, 0], [1513728000000, 0], [1513814400000, 0], [1513900800000, 0], [1513987200000, 0], [1514073600000, 0], [1514160000000, 0], [1514246400000, 0], [1514332800000, 0], [1514419200000, 0], [1514505600000, 0], [1514592000000, 0], [1514678400000, 0]] }]



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

            // 获取统计对象 并生成树状图
            getTagTreeData:function(){
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
                      "items": [
                        {
                          "next_level": [
                            {
                              "next_level": [
                                {
                                  "next_level": [],
                                  "project_id": 1,
                                  "name": "能耗06",
                                  "tag_id_tree": null,
                                  "hide_tag": 1,
                                  "level": 3,
                                  "higher_level": 47,
                                  "sort": 0,
                                  "tag_list": [
                                    {
                                      "tag_id": 1435,
                                      "oprate": 1,
                                      "name": '终端空调',
                                      "node_name": null,
                                      "point_id": 0,
                                      "group_id": 50,
                                      "id": 1391,
                                      "create_time": "2017-06-15 16:49:10"
                                    }
                                  ],
                                  "id": 50,
                                  "create_time": "0001-01-01 00:00:00"
                                }
                              ],
                              "project_id": 1,
                              "name": "能耗03",
                              "tag_id_tree": null,
                              "hide_tag": 1,
                              "level": 2,
                              "higher_level": 46,
                              "sort": 0,
                              "tag_list": [                              
                                {
                                  "tag_id": 1135,
                                  "oprate": 1,
                                  "name": null,
                                  "node_name": null,
                                  "point_id": 0,
                                  "group_id": 47,
                                  "id": 1090,
                                  "create_time": "2017-06-15 15:34:26"
                                }
                              ],
                              "id": 47,
                              "create_time": "0001-01-01 00:00:00"
                            },
                            {
                              "next_level": [
                                {
                                  "next_level": [],
                                  "project_id": 1,
                                  "name": "能耗08",
                                  "tag_id_tree": null,
                                  "hide_tag": 0,
                                  "level": 2,
                                  "higher_level": 55,
                                  "sort": 0,
                                  "tag_list": [                                 
                                    {
                                      "tag_id": 1635,
                                      "oprate": 1,
                                      "name": null,
                                      "node_name": null,
                                      "point_id": 0,
                                      "group_id": 52,
                                      "id": 1591,
                                      "create_time": "2017-06-15 16:53:28"
                                    }
                                  ],
                                  "id": 52,
                                  "create_time": "0001-01-01 00:00:00"
                                }
                              ],
                              "project_id": 1,
                              "name": "能耗能耗1111111",
                              "tag_id_tree": null,
                              "hide_tag": 1,
                              "level": 2,
                              "higher_level": 46,
                              "sort": 0,
                              "tag_list": [                              
                                {
                                  "tag_id": 1935,
                                  "oprate": 1,
                                  "name": null,
                                  "node_name": null,
                                  "point_id": 0,
                                  "group_id": 55,
                                  "id": 2891,
                                  "create_time": "2017-06-15 18:38:28"
                                }
                              ],
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
                          "tag_list": [
                            {
                              "tag_id": 699,
                              "oprate": 1,
                              "name": null,
                              "node_name": null,
                              "point_id": 0,
                              "group_id": 46,
                              "id": 593,
                              "create_time": "2017-06-15 15:28:23"
                            }
                          ],
                          "id": 46,
                          "create_time": "0001-01-01 00:00:00"
                        },
                        {
                          "next_level": [
                            {
                              "next_level": [
                                {
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
                                      "name": 123123123123,
                                      "node_name": null,
                                      "point_id": 0,
                                      "group_id": 56,
                                      "id": 2991,
                                      "create_time": "2017-06-15 18:38:37"
                                    }
                                  ],
                                  "id": 56,
                                  "create_time": "0001-01-01 00:00:00"
                                }
                              ],
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
                            }
                          ],
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
                          "tag_list": [                         
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
                            }, {
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

                  console.log('查看数据:'+JSON.stringify( _this.tagTree.aTreeData,null,2));
                 $.fn.zTree.init($("#analysis-tree"), tagTree.aTreeSetting, _this.tagTree.aTreeData);



                },
                // 处理 tag数据
            handleAllTagData: function (item) {
                var arr = [];
                item.forEach(function (ele) {
                    var dic = {};
                    dic.id ='g'+ele.id;
                    dic.rel_id = ele.id;
                    dic.name = ele.name;
                    dic.higher_level = ele.higher_level;
                    dic.open = true;
                    dic.isgroup = true;
                    dic.children = [];
                    if (ele.next_level.length > 0) {
                        ele.next_level.forEach(function (eletwo) {
                            var dictwo = {};
                            dictwo.id ='g'+ eletwo.id;
                            dictwo.rel_id = eletwo.id;
                            dictwo.name = eletwo.name;
                            dictwo.higher_level = eletwo.higher_level;
                            dictwo.open = true;
                            dictwo.isgroup = true;
                            dictwo.children = [];
                            if (eletwo.next_level.length > 0) {
                                eletwo.next_level.forEach(function (elethree) {
                                    var dicthree = {};
                                    dicthree.id ='g'+ elethree.id;
                                    dicthree.rel_id = elethree.id;
                                    dicthree.name = elethree.name;
                                    console.log(dicthree.name)
                                    dicthree.higher_level = elethree.higher_level;
                                    dicthree.open = true;
                                    dicthree.isgroup = true;
                                    dicthree.children = [];

                                    if(Boolean(elethree.hide_tag)){ //1  显示   0  代表隐藏
                                        elethree.tag_list.forEach(function(item){
                                            dicthree.children.push({
                                                id:item.tag_id,
                                                name :item.name,
                                                isgroup:false
                                            });
                                        });


                                    }


                                    dictwo.children.push(dicthree);

                                })
                            }else{
                                if(Boolean(eletwo.hide_tag)){ //1  显示   0  代表隐藏

                                    eletwo.tag_list.forEach(function(item){
                                        dictwo.children.push({
                                            id:item.tag_id,
                                            name :item.name,
                                            isgroup:false
                                        });
                                    });

                                }
                            }
                            dic.children.push(dictwo);
                        })
                    }else{
                        if(Boolean(ele.hide_tag)){ //1  显示   0  代表隐藏
                            ele.tag_list.forEach(function(item){
                                dic.children.push({
                                    id:item.tag_id,
                                    name :item.name,
                                    isgroup:false
                                });
                            });
                        }
                        
                    }
                    arr.push(dic);
                }, this);

                return arr;
            },
            // 初始化
            vueInit:function(){
                // 下拉框初始化
                bayaxInit();

                // 下拉框时间数据初始化 (默认显示最近三天)
                var time_option =  this.energyAnalysis.timeOption;
                time_option.btnSelectdata= dateData();
                this.choiceAnalysisTime(time_option.btnSelectdata[2]);
                // time_data[2].click();

               
                // 滚动条初始化
                $('.menu, .bayaxTree').mCustomScrollbar({
                    autoHideScrollbar: true
                });

                // 选择统计对象
                $('body').on('click', function() {
                    $('.tag-tree').slideUp(100);
                });
                $('.choice-tag-btn').on('click',function(e){
                    var oEvent = e || event;
                    oEvent.stopPropagation(); //阻止事件冒泡
                    $('#'+ $(this).data('id')).slideToggle(200);
                });
                $('.tag-tree').on('click',function(e){
                    var oEvent = e || event;
                    oEvent.stopPropagation(); //阻止事件冒泡
                });
                $('.tree-panel-title').on('click',function(){
                    $('#'+ $(this).data('id')).slideToggle(200);
                });


            }
        }
    });

});

var tagTree = {
    aTreeSetting:{//能耗分析  树  配置
        check: {
            enable: true,
            chkboxType: { "Y": "", "N": "" }
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
            onClick: function(e, treeId, treeNode){
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                zTree.expandNode(treeNode);
            },
            onCheck: function(event, treeId, treeNode){
                var tag =  energyVue.tagTree.atag;
                if(treeNode.checked){
                    // 选中
                    if(treeNode.isgroup){
                        tag.energy_group_ids.push(treeNode.rel_id);
                    }else{
                        tag.tag_ids.push(treeNode.id);
                    }
                   
                }else{
                    // 未选中

                    if(treeNode.isgroup){
                        tag.energy_group_ids.push(treeNode.rel_id);
                    }else{
                        tag.tag_ids.push(treeNode.id);
                    }
                    var indexs = arr.indexOf(item);
                    console.log(JSON.stringify(item, null, 2))
                    arr.splice(indexs, 1);
                }

                var dic = {};
                if(treeNode.isgroup){
                    dic = {
                        id:treeNode.rel_id,
                        name:treeNode.name,
                        isgroup:treeNode.isgroup,
                        rel_id:treeNode.rel_id
                    }
                }else{
                    dic = {
                        id:treeNode.id,
                        name:treeNode.name,
                        isgroup:treeNode.isgroup,
                        // rel_id:treeNode.relative
                    }
                }
                console.log(JSON.stringify(dic,null,2));
                console.log(treeNode.checked)
            }
    
        }
    },

    tTreeSetting:{//能耗报表  树  配置
        view: {
            showLine: false,
            showIcon: false,
            dblClickExpand: false
        },
        // callback: {
        //     onClick: showTreeOnClick,
    
        // }
    },
    tTreeData:[],//能耗报表  树   数据
};

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


