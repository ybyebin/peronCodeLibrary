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
            var energyAnalysis = energyVue.energyAnalysis.comparisonOfHistoricalData;
            var ed = energyVue.energyAnalysis.timeOption.endtime;
            var st = value;
            energyAnalysis.relativeData.data.length = 0;
            energyAnalysis.absolutelyData.data.length = 0;

            energyVue.analysisTimeSet({
                name: '自定义',
                type: false,
                num:8,
                time: {
                    type: 'start',
                    value: value
                }
            }, 'set');

            if (ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {

                    // 这里要重新计算比较方法
                    if (compareYear(new Date(st), 10) <= value) {
                        layer.msg("超过统计时间限制");
                    } else {
                        $('#endtime').focus();
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
            var energyAnalysis = energyVue.energyAnalysis.comparisonOfHistoricalData;
            var st = energyVue.energyAnalysis.timeOption.startime;
            var ed = value;

            energyAnalysis.relativeData.data.length = 0;
            energyAnalysis.absolutelyData.data.length = 0;
            energyVue.analysisTimeSet({
                name: '自定义',
                type: false,
                num:8,
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
                        var analysis_charts_time = energyVue.energyAnalysis.analysisCharts.time;

                        var starts = new Date(st.replace(/\-/g, "/"));
                        var ends = new Date(ed.replace(/\-/g, "/"));
                        var cha = ends - starts;
                        cha = cha / (60 * 60 * 24 * 1000) +1;
                        // console.log('查看cha:'+cha)
                        if(cha === 1){
                            // hour
                            analysis_charts_time.timeData.forEach(function (item) {
                                if (item.type === 'hour') {
                                    item.show = true;
                                    item.isActive = true;
                                    analysis_charts_time.timeType = 'hour';
                                } else {
                                    item.show = false;
                                }
    
                            });
                        }else if(cha>1 && cha<=7){
                            // hour day

                            analysis_charts_time.timeData.forEach(function (item) {
                                var type = item.type;
                                if (type === 'hour' || type === 'day') {
                                    item.show = true;
                                    item.isActive = false;
                                    if (type === 'hour') {
                                        item.isActive = true;
                                        analysis_charts_time.timeType = 'hour';
                                    }
                                } else {
                                    item.show = false;
                                }
    
                            });
                        }else if(cha>7 && cha <=30 ){
                            // day
                            analysis_charts_time.timeData.forEach(function (item) {
                                if (item.type === 'day') {
                                    item.show = true;
                                    item.isActive = true;
                                    analysis_charts_time.timeType = 'day';
                                } else {
                                    item.show = false;
                                }
    
                            });
                        }else if(cha > 30 && cha <= 180){
                            // day month
                            analysis_charts_time.timeData.forEach(function (item) {
                                var type = item.type;
                                if (type === 'day' || type === 'month') {
                                    item.show = true;
                                    item.isActive = false;
                                    if (type === 'day') {
                                        item.isActive = true;
                                        analysis_charts_time.timeType = 'day';
                                    }
                                } else {
                                    item.show = false;
                                }
    
                            });
                        }else if(cha > 180 && cha <= 365){
                            // month
                            analysis_charts_time.timeData.forEach(function (item) {
                                if (item.type === 'month') {
                                    item.show = true;
                                    item.isActive = true;
                                    analysis_charts_time.timeType = 'month';
                                } else {
                                    item.show = false;
                                }
    
                            });
                        }else{
                            // month year
                             analysis_charts_time.timeData.forEach(function (item) {
                                var type = item.type;
                                if (type === 'month' || type === 'year') {
                                    item.show = true;
                                    item.isActive = false;
                                    if (type === 'month') {
                                        item.isActive = true;
                                        analysis_charts_time.timeType = 'month';
                                    }
                                } else {
                                    item.show = false;
                                }
    
                            });
                        }
                        
                        energyVue.getAnalysisHighcharData(1,false,false);
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
                customList:{
                    isNull:true,
                    inputName:'sdsdsd',//保存/另存为 输入名称
                    item:{},//当前正在选中的自定义图表
                    data: [], //自定义图表列表
                },

                timeOption: { //时间操作
                    flag: false, //初始化使用
                    item:'',
                    btnSelectTitle: '', //当前时间类型
                    btnSelectdata: [], //时间下拉框数据
                    startime: '', //开始时间
                    endtime: '', //结束时间
                },
                comparisonOfHistoricalData: { //对比历史数据
                    flag: false, //是否可以对比历史数据(true可对比/false不可对比)
                    relative: true, //true(相对时间)/false(绝对时间)
                    relativeData: { //相对时间 数据
                        comparisonTitle: '', //时间头部
                        timeUnit: '', //时间跨度,
                        timeType: '', //时间类型 (用于计算 对比时间)
                        data: []
                    },
                    absolutelyData: { //绝对时间 数据
                        timeDifference: 0, //绝对时间差值,
                        item: {
                            type: '',
                            value: ''
                        }, //当前编辑的时间
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
                    time: {
                        timeType: 'hour', //图表数据时间类型  hour/day/month/year
                        timeData: [{
                                name: '时',
                                type: 'hour',
                                isActive: true,
                                show: true,
                            },
                            {
                                name: '天',
                                type: 'day',
                                isActive: false,
                                show: true,
                            },
                            {
                                name: '月',
                                type: 'month',
                                isActive: false,
                                show: true,
                            },
                            {
                                name: '年',
                                type: 'year',
                                isActive: false,
                                show: true,
                            }
                        ],

                    },
                    chart: {
                        chartType: 'column', //图表类型   column/spline/pie/area
                        chartData: [{
                                name: '柱状图',
                                type: 'column',
                                isActive: true,
                            },
                            {
                                name: '折线图',
                                type: 'spline',
                                isActive: false,
                            },
                            {
                                name: '饼图',
                                type: 'pie',
                                isActive: false,
                            },
                            {
                                name: '堆积图',
                                type: 'area',
                                isActive: false,
                            },
                        ]
                    },
                    color:["#A4CD52", "#E7706F", "#9B77B3", "#4CB3E3", "#9B77B3", "#477B36", "#EABE43", "#135083", "#8B6527", "#B3CE59", "#E8767B", "#9980AF", "#5CB1E1", "#A977AB", "#427A46", "#D7AA5E", "#3B507B", "#3B507B", "#996725", "#C0D060", "#EA7D86", "#9789AA", "#67AEDE", "#B576A2", "#3C7856", "#C2956F", "#594F73", "#A66922", "#CDD065", "#EC8392", "#9491A3", "#71ABDB", "#C07698", "#347667", "#AF817C", "#714F6A", "#B46B1F", "#D9D06D", "#ED8A9F", "#91989A", "#7AA7D7", "#CA758E", "#2D7477", "#9C6D84", "#864E61", "#C06C1C", "#E4CF73", "#EE91AB", "#8D9E90", "#83A4D4", "#D57484", "#237286", "#895989", "#9A4C59", "#CC6E19", "#EECE79", "#F098B7", "#89A584", "#8BA0D1", "#DE717A", "#1D7095", "#75468E", "#AC494F", "#D86F14", "#F7CC7F", "#FFA2CB", "#85AB77", "#919BCD", "#E7706F", "#E7706F", "#1A6DA3", "#62328F", "#62328F", "#BC4746", "#E47113"]



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
                                // console.log(treeNode.checked)
                                
                                var custom_list = energyVue.energyAnalysis.customList;
                                var com_his_data = energyVue.energyAnalysis.comparisonOfHistoricalData;
                                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                                var nodes = zTree.getCheckedNodes(true);
                                var length = nodes.length;

                                custom_list.item = {};
                                custom_list.data.forEach(function(item){
                                    item.isActive = false;
                                });
                                com_his_data.relativeData.data = [];
                                com_his_data.relativeData.absolutelyData = [];
                                

                                if (length > 1 || length === 0) {
                                    com_his_data.flag = false;
                                } else {
                                    com_his_data.flag = true;
                                }
                                if(length > 16){
                                    layer.msg('请选择不超过16条统计对象进行对比');
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
                // this.drawAnalysisHighChart();

                this.getTagTreeData();

                this.getCustomAnalysisList();

            });
        },
        methods: {
             // 获取 能耗分析 自定义图表列表
            getCustomAnalysisList:function(){
                var custom_list = this.energyAnalysis.customList;

                var result = {
                    "success": true,
                    "data": {
                        "pageCount": 0,
                        "items": [
                            {   
                                'name':'123123',
                                'id':1,
                                "data_type": 1,
                                "length_unit": "day",
                                "lengths": -7,
                                "start_time": "2018-01-06",
                                "end_time": "2018-01-12",
                                "relative_history": "[]",
                                "absolute_history": "[]",
                                "tag_id_tree": "{\"energy_group_ids\":[46,47],\"tag_ids\":[]}"
                              
                            },
                            {
                                'name':'呵呵',
                                'id':2,
                                "data_type": 1,
                                "length_unit": "day",
                                "lengths": -7,
                                "start_time": "2018-01-06",
                                "end_time": "2018-01-12",
                                "relative_history": "[{\"unit\":1},{\"unit\":4}]",
                                "absolute_history": "[]",
                                "tag_id_tree": "{\"energy_group_ids\":[46],\"tag_ids\":[]}"
                            }
                        ]
                    },
                    "error_message": null
                }




                if (result.success) {
                    var item = result.data.items;
                    if (Array.isArray(item)) {
                        if (item.length > 0) {
                            // 有数据
                            custom_list.isNull = false;
                            item.forEach(function(ele){
                                ele.isActive = false;
                            });
                            custom_list.data = item;
                        } else {
                            custom_list.isNull = true;
                        }
                    } else {
                        custom_list.isNull = true;
                    }
                }





                // $.ajax({
                //     type: "GET",
                //     url: apiurl + 'EnergyGraphConfig',
                //     success: function(result) {
                //         if (result.success) {
                //             var item = result.data.items;
                //            
                                // if (result.success) {
                                //     var item = result.data.items;
                                //     if (Array.isArray(item)) {
                                //         if (item.length > 0) {
                                //             // 有数据
                                //             custom_list.isNull = false;
                                //             item.forEach(function(ele){
                                //                 ele.isActive = false;
                                //             });
                                //             custom_list.data = item;
                                //         } else {
                                //             custom_list.isNull = true;
                                //         }
                                //     } else {
                                //         custom_list.isNull = true;
                                //     }
                                // }
                //         }
                //     },
                //     error:function(){

                //     }
                // });

            },
            // 获取 能耗分析 单个自定义图表数据
            getCustomAnalysisData: function (item) {
                console.log('自定义图表:' + JSON.stringify(item, null, 2));

                var custom_list = this.energyAnalysis.customList;
                // 暂存当前选中的自定义图表
                custom_list.item = item;
                // 标记当前选中的自定义图表
                custom_list.data.forEach(function(ele){
                    ele.isActive = false;
                });
                item.isActive = true;

                // 还原数据 并请求数据
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                var tag_id_tree =JSON.parse(item.tag_id_tree);
                var com_his_data = this.energyAnalysis.comparisonOfHistoricalData;

                // 清空 tag_tree
                zTree.checkAllNodes(false);

                // 还原 tag_tree
                tag_id_tree.energy_group_ids.forEach(function(item){
                    var nodes = zTree.getNodesByParam("id", "g"+item, null);
                    if (nodes.length > 0) {
                        zTree.checkNode(nodes[0], true, false);
                    }
                });
                tag_id_tree.tag_ids.forEach(function(item){
                    var nodes = zTree.getNodesByParam("id", item, null);
                    if (nodes.length > 0) {
                        zTree.checkNode(nodes[0], true, false);
                    }
                });
                var nodes = zTree.getCheckedNodes(true);
                var length = nodes.length;
                if (length > 1 || length === 0) {
                    com_his_data.flag = false;
                } else {
                    com_his_data.flag = true;
                }


                // "name": "123123",
                // "id": 1,
                // "data_type": 1,
                // "length_unit": "day",
                // "lengths": -7,
                // "start_time": "2018-01-06",
                // "end_time": "2018-01-12",
                // "relative_history": "[]",
                // "absolute_history": "[]",
                // "tag_id_tree": "{\"energy_group_ids\":[46,47],\"tag_ids\":[]}",
                // "isActive": false
                
                // if(item.data_type){

                // }







              
               
                
            },
             // 能耗图表 自定义图表操作  保存/另存为/删除
            analysisOptionClick: function (item) {
                var _this = this;
                var btn = this.energyAnalysis.customOptionBtn.btn;
                var custom_list = this.energyAnalysis.customList;
                btn.name = item.name;
                btn.type = item.type;



                switch (item.type) {
                    case 1:
                        // 可以保存
                        layer.open({
                            title: ['保存'],
                            type: 1,
                            skin: 'bayax-layer-skin',
                            area: ['400px', '200px'],
                            content: $('#save-othersave'),
                            shift: 2,
                            resize: false,
                            btn: ['保存', '取消'],
                            success: function () {
                                custom_list.inputName = '';
                            },
                            yes: function (index) {
                                var data =  _this.analysisOptionMethod(true);
                                console.log('查看提交的自定义数据:'+JSON.stringify(data,null,2))
                                if(data === false){

                                }else{
                                    // 网络请求
                                    layer.close(index);
                                }
                               
                            },
                            btn2: function (index) { },
                        });
                        break;
                    case 2:
                        // 另存为
                        if (custom_list.item.hasOwnProperty('name')) {
                            layer.open({
                                title: ['另存为'],
                                type: 1,
                                skin: 'bayax-layer-skin',
                                area: ['400px', '200px'],
                                content: $('#save-othersave'),
                                shift: 2,
                                resize: false,
                                btn: ['保存', '取消'],
                                success: function () {
                                    custom_list.inputName = '';
                                },
                                yes: function (index) {
                                    var data =  _this.analysisOptionMethod(false);
                                    console.log('查看提交的自定义数据:'+JSON.stringify(data,null,2))
                                    layer.close(index);
                                },
                                btn2: function (index) { },
                            });
                        } else {
                            layer.msg('未选中自定义图表');
                        }

                        break;
                    case 3:
                        // 删除 
                        if (custom_list.item.hasOwnProperty('name')) {
                            layer.confirm('确认删除当前选中自定义图表？', {
                                title: '删除',
                                skin: 'bayax-layer-skin',
                                success: function () {
                                    $('.layui-layer-btn a').addClass('confirm');
                                    $('.layui-layer.layui-layer-dialog.bayax-layer-skin .layui-layer-content').css('text-align', 'center');
                                },
                                btn: ['确定', '取消']
                            }, function () {
                                $.ajax({
                                    url: apiurl,
                                    type: "DELETE",
                                    beforeSend: function () {
                                        _this.loadingShow = true;
                                    },
                                    success: function (data) {


                                    },
                                    error: function (data) {
                                    }
                                });
                            }, function () {

                            });
                        } else {
                            layer.msg('未选中自定义图表');
                        }

                        break;
                }

            },
            /**
             * 能耗图表 自定义图表操作  保存/另存为 数据处理方法
             * true 保存   false 另存为
             */
            analysisOptionMethod: function (flag) {
                var _this = this;
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                var nodes = zTree.getCheckedNodes(true);
                var com_his_data = energyVue.energyAnalysis.comparisonOfHistoricalData;
                var tag = this.tagTree.aTree.tag;
                var custom_list = this.energyAnalysis.customList;
                // 清空被选tag及tag组(为下面重新计算)
                tag.energy_group_ids.length = 0;
                tag.tag_ids.length = 0;

                // 统计被选tag及tag组
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

                // 被选tag组的长度
                var length = tag.energy_group_ids.length + tag.tag_ids.length;
                console.log('被选数组长度:' + length);
                if (length == 0) {
                    layer.msg('统计对象为空');
                    return false;
                } else if (length > 16) {
                    layer.msg('请选择不超过16条统计对象进行对比');
                    return false;
                } else {
                    // 起止时间段
                    var time_option = this.energyAnalysis.timeOption;

                    if (time_option.startime == '' || time_option.endtime == '') {
                        layer.msg('时间区间不能为空');
                        return false;
                    } else {
                        var status = _this.nameRegeMatch(custom_list.inputName)
                        switch (status) {
                            case 1:
                                layer.msg('名称不能为空');
                                return false;
                                break;
                            case 2:
                                layer.msg('输入不合法');
                                return false;
                                break;
                            case 3:
                                var name = custom_list.inputName;
                                var data_type = com_his_data.relative === true ? 1 : 2; //1:相对时间，2:绝对时间
                                var length_unit = '';//相对时间的计算单位：day,month,year
                                var lengths = 0;//相对时间计算基数
                                var start_time = time_option.startime;//绝对时间类型的开始时间
                                var end_time = time_option.endtime;//绝对时间类型的结束时间
                                var relative_history = [];//历史数据对比，相对时间集合，JSON格式
                                var absolute_history = [];//历史数据对比，绝对时间集合，JSON格式
                                var tag_id_tree = JSON.stringify(tag);//能耗统计被选中的tag
                                
                                switch (time_option.item.num) {
                                    case 0:
                                        length_unit = "day";
                                        lengths = 0;
                                        break;
                                    case 1:
                                        length_unit = "day";
                                        lengths = -1;
                                        break;
                                    case 2:
                                        length_unit = "day";
                                        lengths = -3;
                                        break;
                                    case 3:
                                        length_unit = "day";
                                        lengths = -7;
                                        break;
                                    case 4:
                                        length_unit = "day";
                                        lengths = -30;
                                        break;
                                    case 5:
                                        length_unit = "month";
                                        lengths = -1;
                                        break;
                                    case 6:
                                        length_unit = "month";
                                        lengths = -2;
                                        break;
                                    case 7:
                                        length_unit = "month";
                                        lengths = -3;
                                        break;
                                    case 8:
                                        break;
                                    default:
                                        break;
                                }

                                if (com_his_data.flag) {//存在对比历史数据
                                    if (com_his_data.relative) {
                                        // 相对
                                        var arr = _this.energyAnalysis.comparisonOfHistoricalData.relativeData.data;
                                        var temp = {};
                                        var temp_arr = [];

                                        arr.forEach(function (item) {
                                            console.log(item.num)
                                            temp[item.num] = item;
                                        });
                                        for (const key in temp) {
                                            temp_arr.push(temp[key]);
                                        }

                                        if (arr.length === temp_arr.length) {
                                            arr.forEach(function (ele) {
                                                relative_history.push({
                                                    unit: ele.num
                                                })
                                            });
                                        } else {
                                            layer.msg('对比时间重复');
                                            return false;
                                        }
                                    } else {
                                        //绝对
                                        var arr_1 = _this.energyAnalysis.comparisonOfHistoricalData.absolutelyData.data
                                        var arr = deepClone(arr_1);

                                        var flag = true;
                                        arr.push({ //把对比时间 加入到去重行列
                                            "isnull": false,
                                            "start": {
                                                "value": time_option.startime,
                                                "type": "start"
                                            },
                                            "end": {
                                                "value": time_option.endtime,
                                                "type": "end"
                                            }
                                        });


                                        console.log(JSON.stringify(arr, null, 2));
                                        arr.forEach(function (item) {
                                            if (item.isnull) {
                                                flag = false;
                                            }

                                        });
                                        if (flag) {

                                            var temp = {};
                                            var temp_arr = [];
                                            arr.forEach(function (item) {
                                                temp[item.start.value] = item.end.value;
                                            });
                                            for (const key in temp) {
                                                temp_arr.push(temp[key]);
                                            }
                                            if (arr.length === temp_arr.length) {
                                                arr_1.forEach(function (ele) {
                                                    absolute_history.push({
                                                        start_time: ele.start.value,
                                                        end_time: ele.end.value
                                                    })
                                                });
                                            } else {
                                                layer.msg('对比时间重复');
                                                return false;
                                            }

                                        } else {
                                            layer.msg('对比时间不能为空');
                                            return false;
                                        }
                                    }
                                }

                                 // 保存
                                 var return_data = {
                                    name:name,
                                    data_type:data_type,
                                    length_unit:length_unit,
                                    lengths:lengths,
                                    start_time:start_time,
                                    end_time:end_time,
                                    relative_history:JSON.stringify(relative_history),
                                    absolute_history:JSON.stringify(absolute_history),
                                    tag_id_tree:tag_id_tree
                                }
                                if(!flag){
                                    return_data.id = _this.energyAnalysis.customList.item.id
                                }
                                return return_data;
                                break;
                        }
                    }
                }




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

                // console.log(JSON.stringify(item, null, 2))
            },
            /**
             * 能耗 时间处理---->时间数据设置
             * [item] 
             * [type]  choice选择时间  / set自定义时间
             * [isCustom]  是否是通过自定义图表触发
             */
            analysisTimeSet: function (item, type, isCustom) {
                var _this = this;
                var time_option = this.energyAnalysis.timeOption;
                var com_his_data = this.energyAnalysis.comparisonOfHistoricalData;
                var analysis_charts_time = this.energyAnalysis.analysisCharts.time;
                time_option.item = item;
                time_option.btnSelectTitle = item.name;
                if(!isCustom){
                    com_his_data.relativeData.data.length = 0;
                    com_his_data.absolutelyData.data.length = 0;
                    com_his_data.relativeData.comparisonTitle = '';
                    com_his_data.relativeData.timeUnit = '';
                    com_his_data.relativeData.timeType = '';
                }
               

                if (item.type) {
                    com_his_data.relative = true;
                    com_his_data.relativeData.comparisonTitle = item.name;
                    com_his_data.relativeData.timeUnit = item.unit;
                    com_his_data.relativeData.timeType = item.num;

                }else {
                    com_his_data.relative = false;
                }

                switch (type) {
                    case 'choice':
                        time_option.startime = item.start_time;
                        time_option.endtime = item.end_time;
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

                // 显示相应的 时间类型选择
                switch (item.chart_time) {
                    case 0:
                        analysis_charts_time.timeData.forEach(function (item) {
                            if (item.type === 'hour') {
                                item.show = true;
                                item.isActive = true;
                                analysis_charts_time.timeType = 'hour';
                            } else {
                                item.show = false;
                            }

                        });

                        break;
                    case 1:
                        analysis_charts_time.timeData.forEach(function (item) {
                            var type = item.type;
                            if (type === 'hour' || type === 'day') {
                                item.show = true;
                                item.isActive = false;
                                if (type === 'hour') {
                                    item.isActive = true;
                                    analysis_charts_time.timeType = 'hour';
                                }
                            } else {
                                item.show = false;
                            }

                        });
                        break;
                    case 2:
                        analysis_charts_time.timeData.forEach(function (item) {
                            if (item.type === 'day') {
                                item.show = true;
                                item.isActive = true;
                                analysis_charts_time.timeType = 'day';
                            } else {
                                item.show = false;
                            }

                        });
                        break;
                    case 3:
                        analysis_charts_time.timeData.forEach(function (item) {
                            var type = item.type;
                            if (type === 'day' || type === 'month') {
                                item.show = true;
                                item.isActive = false;
                                if (type === 'day') {
                                    item.isActive = true;
                                    analysis_charts_time.timeType = 'day';
                                }
                            } else {
                                item.show = false;
                            }

                        });
                        break;
                }


                if (item.type) { //如果是 非自定义
                    if(time_option.flag){ //是否是初始化(默认进入页面不请求)
                        if(!isCustom){
                            this.getAnalysisHighcharData(1,false,false);

                        }else{
                            // _this.getAnalysisHighcharData(2,true,false);

                        }
                    }
                    
                }





                console.log(JSON.stringify(com_his_data, null, 2))

            },

            // 对比历史数据 弹窗
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
                            var arr = _this.energyAnalysis.comparisonOfHistoricalData.relativeData.data;
                            var temp = {};
                            var temp_arr = [];

                            arr.forEach(function(item){
                                console.log(item.num)
                                temp[item.num] = item;
                            });
                            for (const key in temp) {
                                temp_arr.push(temp[key]);
                            }

                            if (arr.length ===temp_arr.length) {
                                _this.getAnalysisHighcharData(2,true,false);
                                    
                            }else{
                                layer.msg('时间重复');
                            }

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
                                var start = new Date(energyAnalysis.timeOption.startime.replace(/\-/g, "/"));
                                var end = new Date(energyAnalysis.timeOption.endtime.replace(/\-/g, "/"));
                                // var time_difference = end - start;
                                energyAnalysis.comparisonOfHistoricalData.absolutelyData.timeDifference = end - start;
                                console.log(start);
                                console.log(end);

                                console.log('时间差:' + (end - start));
                            },
                            yes: function (index) {
                            

                                var arr =deepClone(_this.energyAnalysis.comparisonOfHistoricalData.absolutelyData.data);
                                var flag = true;
                                arr.push({ //把对比时间 加入到去重行列
                                    "isnull": false,
                                    "start": {
                                      "value": time_option.startime,
                                      "type": "start"
                                    },
                                    "end": {
                                      "value": time_option.endtime,
                                      "type": "end"
                                    }
                                  });
                                
                              
                                console.log(JSON.stringify(arr,null,2));
                                arr.forEach(function(item){
                                    if(item.isnull){
                                        flag = false;
                                    }
                                    
                                });
                                if (flag) {
                                    var temp = {};
                                    var temp_arr = [];
                                    arr.forEach(function(item){
                                        temp[item.start.value] = item.end.value;
                                    });
                                    for (const key in temp) {
                                        temp_arr.push(temp[key]);
                                    }
                                    if (arr.length === temp_arr.length) {
                                            _this.getAnalysisHighcharData(2,false,false);
                                    }else{
                                        layer.msg('时间重复')
                                    }

                                }else{
                                    layer.msg('对比时间不能为空');
                                }



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
            deleteRelativeTime: function (item) {
                var _this = this;
                var relativeData = this.energyAnalysis.comparisonOfHistoricalData.relativeData;
                var index = relativeData.data.indexOf(item);
                if (index > -1) {
                    relativeData.data.splice(index, 1);
                }
            },

            /**
             * 对比历史数据   选择【相对时间】
             * [item] 一条对比时间
             *[items] 被选第几个对比时间
             */
            choiceRelativeTime: function (item, items) {
                console.log(JSON.stringify(this.energyAnalysis.comparisonOfHistoricalData.relativeData.data,null,2))



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
                if (absolutelyData.data.length < 9) {
                    absolutelyData.data.push({
                        isnull: true,
                        start: {
                            value: '',
                            type: 'start'
                        },
                        end: {
                            value: '',
                            type: 'end'
                        },

                    });
                    this.$nextTick(function () {
                        lay('.absolute-time').each(function () {
                            laydate.render({
                                elem: this,
                                theme: 'balck',
                                showBottom: false,
                                done: function (value, date, endDate) {
                                    console.log(JSON.stringify(energyVue.energyAnalysis.comparisonOfHistoricalData.absolutelyData,null,2) );
                                    var item = energyVue.energyAnalysis.comparisonOfHistoricalData.absolutelyData.item;
                                    var time_difference = energyVue.energyAnalysis.comparisonOfHistoricalData.absolutelyData.timeDifference;
                                    item.value.isnull = false;
                                    switch (item.type) {
                                        case 'start':
                                            item.value.start.value = value;
                                            var times = Date.parse(new Date(value.replace(/\-/g, "/"))) + time_difference;
                                            console.log(times);
                                            item.value.end.value = new Date(times).format('yyyy-MM-dd');
                                            console.log(new Date(times).format('yyyy-MM-dd'));
                                            break;
                                        case 'end':
                                            item.value.end.value = value;
                                            var times = Date.parse(new Date(value.replace(/\-/g, "/"))) - time_difference;
                                            item.value.start.value = new Date(times).format('yyyy-MM-dd');
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            });
                        });

                    });
                } else {
                    layer.msg('最多添加9条对比数据');
                }

                // var dic =
            },
            // 对比历史数据  设置绝对时间选择标志
            setAbsoluteTimeFlag: function (item, type) {
                var absolutelyData = this.energyAnalysis.comparisonOfHistoricalData.absolutelyData;
                absolutelyData.item.value = item;
                absolutelyData.item.type = type;
                console.log(JSON.stringify(item, null, 2));
                console.log('类型:' + type)
            },
            // 对比历史数据 删除【绝对时间】
            deleteAbsoluteTime: function (item) {
                var _this = this;
                var absolutelyData = this.energyAnalysis.comparisonOfHistoricalData.absolutelyData;
                var index = absolutelyData.data.indexOf(item);
                if (index > -1) {
                    absolutelyData.data.splice(index, 1);
                }
            },

            // 能耗图表 时间类型选择
            setChartsTimeType: function (item) {
                var time = this.energyAnalysis.analysisCharts.time;
                time.timeType = item.type;
                time.timeData.forEach(function(ele){
                    ele.isActive = false;
                });
                item.isActive = true;
                this.getAnalysisHighcharData(1,false,false);
                
                console.log(JSON.stringify(item, null, 2));
            },
            // 能耗图表  图表类型选择
            setChartsType: function (item) {
                var chart =  this.energyAnalysis.analysisCharts.chart;
                chart.chartType = item.type;
                chart.chartData.forEach(function(ele){
                    ele.isActive = false;
                });
                item.isActive = true;
                this.getAnalysisHighcharData(1,false,true);
            },

           
            drawAnalysisHighChart: function (data) {


                //    数据测试
                switch (data.type) {
                    case 'pie':
                        data.data = {
                            "能耗02": 30,
                            "能耗03": 80,
                            "能耗能耗1111111": 100
                        };
                        break;
                    case 'area':
                    case 'column':
                    case 'spline':
                        data.data = [
                            {
                                "name": "能耗02",
                                "values": {
                                    "2018011200": 10,
                                    "2018011201": 20,
                                    "2018011202": 30,
                                    "2018011203": 40,
                                    "2018011204": 40,
                                    "2018011205": 40,
                                    "2018011206": 40,
                                    "2018011207": 90,
                                    "2018011208": 50,
                                    "2018011209": 50,
                                    "2018011210": 60,
                                    "2018011211": 70,
                                    "2018011212": 30,
                                    "2018011213": 30,
                                    "2018011214": 30,
                                    "2018011215": 40,
                                    "2018011216": 40,
                                    "2018011217": 50,
                                    "2018011218": 60,
                                    "2018011219": 70,
                                    "2018011220": 40,
                                    "2018011221": 30,
                                    "2018011222": 20,
                                    "2018011223": 10
                                }
                            },
                            {
                                "name": "能耗03",
                                "values": {
                                    "2018011200": 10,
                                    "2018011201": 20,
                                    "2018011202": 30,
                                    "2018011203": 40,
                                    "2018011204": 40,
                                    "2018011205": 40,
                                    "2018011206": 40,
                                    "2018011207": 50,
                                    "2018011208": 50,
                                    "2018011209": 50,
                                    "2018011210": 50,
                                    "2018011211": 20,
                                    "2018011212": 30,
                                    "2018011213": 70,
                                    "2018011214": 30,
                                    "2018011215": 40,
                                    "2018011216": 70,
                                    "2018011217": 50,
                                    "2018011218": 60,
                                    "2018011219": 70,
                                    "2018011220": 40,
                                    "2018011221": 30,
                                    "2018011222": 20,
                                    "2018011223": 10
                                }
                            },
                            {
                                "name": "能耗能耗11",
                                "values": {
                                    "2018011200": 10,
                                    "2018011201": 20,
                                    "2018011202": 30,
                                    "2018011203": 40,
                                    "2018011204": 40,
                                    "2018011205": 40,
                                    "2018011206": 40,
                                    "2018011207": 50,
                                    "2018011208": 50,
                                    "2018011209": 50,
                                    "2018011210": 99,
                                    "2018011211": 30,
                                    "2018011212": 89,
                                    "2018011213": 30,
                                    "2018011214": 80,
                                    "2018011215": 40,
                                    "2018011216": 20,
                                    "2018011217": 50,
                                    "2018011218": 60,
                                    "2018011219": 70,
                                    "2018011220": 40,
                                    "2018011221": 30,
                                    "2018011222": 20,
                                    "2018011223": 10
                                }
                            }
                        ]
                        break;
                }


                console.log('查看获取到的数据:' + JSON.stringify(data, null, 2))

                //同一个时间段多个tag组或者多个tag对比 HistoryDataTagsContrast
                //多个时间段同一个tag或能耗组对比 HistoryDataTimesContrast
                var color = this.energyAnalysis.analysisCharts.color; //HighChart备选颜色
                var time_type = this.energyAnalysis.analysisCharts.time.timeType //时间类型
                var chart_type = data.type;
                var series_data = [];//处理后图表数据
                switch (chart_type) { //判断当前选择的 Highchart类型 根据类型处理数据
                    case 'pie':
                        var pie_data = data.data;
                        var j = 0;
                        for (var key in pie_data) {
                            series_data.push({
                                name: key,
                                y: pie_data[key],
                                color: color[j]
                            });
                            j++;
                        }
                        break;
                    case 'area':
                        var area_data = data.data;
                        var count = 0;
                        area_data.forEach(function (item) {
                            var dic = {
                                name: item.name,
                                color: color[count],
                                data: []
                            };
                            count++;
                            for (var key in item.values) {
                                var time = '';
                                switch (time_type) {
                                    case 'hour':
                                        time = new Date(key.substring(0, 4) + "/" + key.substring(4, 6) + "/" + key.substring(6, 8) + " " + key.substring(8, 10) + ":00:00").getTime();
                                        break;
                                    case 'day':
                                        time = new Date(key.substring(0, 4) + "/" + key.substring(4, 6) + "/" + key.substring(6, 8) + " 00:00:00").getTime();
                                        break;
                                    case 'month':
                                        time = new Date(key.substring(0, 4) + "/" + key.substring(4, 6) + "/01 00:00:00").getTime();
                                        break;
                                    case 'year':
                                        time = new Date(key.substring(0, 4) + "/01/01 00:00:00").getTime();
                                        break;
                                    default:
                                        break;
                                }
                                dic.data.push([
                                    time, item.values[key]
                                ])
                            }
                            series_data.push(dic);
                        });
                        break;
                    case 'column':
                    case 'spline':
                        var column_data = data.data;
                        var count = 0;
                        column_data.forEach(function (item) {
                            var dic = {
                                name: item.name,
                                marker: {
                                    enabled: true,
                                    radius: 3
                                },
                                color: color[count],
                                data: []
                            };
                            count++;
                            for (var key in item.values) {
                                var time = '';
                                switch (time_type) {
                                    case 'hour':
                                        time = new Date(key.substring(0, 4) + "/" + key.substring(4, 6) + "/" + key.substring(6, 8) + " " + key.substring(8, 10) + ":00:00").getTime();
                                        break;
                                    case 'day':
                                        time = new Date(key.substring(0, 4) + "/" + key.substring(4, 6) + "/" + key.substring(6, 8) + " 00:00:00").getTime();
                                        break;
                                    case 'month':
                                        time = new Date(key.substring(0, 4) + "/" + key.substring(4, 6) + "/01 00:00:00").getTime();
                                        break;
                                    case 'year':
                                        time = new Date(key.substring(0, 4) + "/01/01 00:00:00").getTime();
                                        break;
                                    default:
                                        break;
                                }
                                dic.data.push([
                                    time, item.values[key]
                                ])
                            }
                            series_data.push(dic);
                        });
                        break;
                }

                console.log('处理过的数据:' + JSON.stringify(series_data, null, 2));



                if (chart_type === 'column' || chart_type === 'spline') {
                    $('#analysisContent').highcharts('StockChart', {
                        chart: {
                            backgroundColor: '#1C203F',
                            alignTicks: true,
                            type: '' + chart_type + ''
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
                                    content += '<br /><span style="color:' + this.points[i].series.color + '">\u25CF</span><span style="color: ' + this.points[i].series.color + ';">' + this.points[i].series.name + '</span>: ' + this.points[i].y;
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


                        series: series_data
                    });
                } else if (chart_type == 'pie') {
                    $('#analysisContent').highcharts({
                        chart: {
                            backgroundColor: '#1C203F',
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: ''
                        },
                        tooltip: {
                            pointFormat: '{series.name} : <b>{point.percentage:.1f}% ({point.y})</b>'
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            // enabled: false
                            width: 800
                        },
                        plotOptions: {
                            pie: {
                                borderWidth: 0,
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#fff',
                                        "fontWeight": "bold",
                                        "textOutline": "none"
                                    }
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: '占比',
                            data: series_data

                        }]
                    });

                } else if (chart_type == 'area') {
                    $('#analysisContent').highcharts('StockChart', {
                        chart: {
                            backgroundColor: '#1C203F',
                            type: 'column'
                        },
                        tooltip: {
                            xDateFormat: '%Y-%m-%d %H:%M:%S',
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
                        plotOptions: {
                            column: {
                                stacking: 'normal'
                            }
                        },
                        series: series_data
                    })
                }

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
            /**
             * 能耗分析 树  btn-筛选    获取highchar图  数据 
             * 
             * type   1:按钮触发(其他非对比历史触发都走这个类型)  2对比历史数据触发
             * isrelative (type== 2时：true相对 false绝对)
             * ischarclick 是否是通过 点击highchart类型触发该方法
             */
            getAnalysisHighcharData: function (type,isrelative,ischarclick) {
                var _this = this;
                var zTree = $.fn.zTree.getZTreeObj("analysis-tree");
                var nodes = zTree.getCheckedNodes(true);
                var tag = this.tagTree.aTree.tag;

                // 清空被选tag及tag组(为下面重新计算)
                tag.energy_group_ids.length = 0;
                tag.tag_ids.length = 0;

                // 统计被选tag及tag组
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

                // 被选tag组的长度
                var length = tag.energy_group_ids.length + tag.tag_ids.length;
                console.log('被选数组长度:' + length);
                if (length == 0) {
                    layer.msg('统计对象为空');
                } else if (length > 16) {
                    layer.msg('请选择不超过16条统计对象进行对比');
                } else {
                    if(type == 1)
                    $('body').click();
                    console.log('操作完成查看：' + JSON.stringify(tag, null, 2))

                    // 起止时间段
                    var time_option = this.energyAnalysis.timeOption;

                    if(time_option.startime == '' || time_option.endtime == ''){
                        layer.msg('时间区间不能为空');
                    }else{
                        layer.msg('可以请求');
                       
                        if(!ischarclick){ //非图表点击类型 所有图表类型重置到 column
                            var chart =  this.energyAnalysis.analysisCharts.chart;
                            chart.chartType = 'column';
                            chart.chartData.forEach(function(ele){
                                ele.isActive = false;
                                if(ele.type === 'column'){
                                    ele.isActive = true;
                                }
                            });

                        }
                        var energyAnalysis = this.energyAnalysis;
                        var chart_type = energyAnalysis.analysisCharts.chart.chartType; //当前选中的图表类型
                        var url = '';
                        var data = {
                            statistics_type:energyAnalysis.analysisCharts.time.timeType //时间类型
                        };

                        data.graph_type = chart_type === 'pie'?2:1; //2:饼图,1:其他类型

                        switch (type) {
                            case 1: //按钮触发
                                url = 'HistoryDataTagsContrast'; //同一个时间段多个tag组或者多个tag对比
                                data.start_time = time_option.startime;
                                data.end_time = time_option.endtime + ' 23:59:59';
                                data.energy_group_ids = tag.energy_group_ids;
                                data.tag_ids = tag.tag_ids;
                                break;
                            case 2: //对比历史数据触发
                                var length = tag.energy_group_ids.length;
                                var history = [];
                                var time_data = [];
                                if (isrelative) {
                                    time_data = this.energyAnalysis.comparisonOfHistoricalData.relativeData.data;
                                    history.push({
                                        'start_time': time_option.startime,
                                        'end_time': time_option.endtime + ' 23:59:59'
                                    });
                                    time_data.forEach(function (item) {
                                        history.push({
                                            'start_time': item.start_time,
                                            'end_time': item.end_time + ' 23:59:59'
                                        });
                                    });
                                } else {
                                    time_data = this.energyAnalysis.comparisonOfHistoricalData.absolutelyData.data;

                                    history.push({
                                        'start_time': time_option.startime,
                                        'end_time': time_option.endtime + ' 23:59:59'
                                    });
                                    time_data.forEach(function (item) {
                                        history.push({
                                            'start_time': item.start.value,
                                            'end_time': item.end.value + ' 23:59:59'
                                        });
                                    });
                                }

                                data.history = history;
                                data.id_type = length > 0 ? 2 : 1; //1:tag_id  2:tag_group_id
                                data.id = length > 0 ? tag.energy_group_ids[0] : tag.tag_ids[0];
                                url = 'HistoryDataTimesContrast'; //多个时间段同一个tag或能耗组对比
                                break;
                        }
                     
            
                        console.log('data：'+JSON.stringify(data,null,2))




                        _this.drawAnalysisHighChart({
                            type:chart_type,
                            data:''
                        });

                        // $.ajax({
                        //     type: "put",
                        //     url: apiurl + url,
                        //     dataType: 'json',
                        //     data: data,
                        //     beforeSend: function () {
                        //     },
                        //     success: function (result) {
                        //         if(result.success){
                        //             _this.drawAnalysisHighChart({
                        //                 type:chart_type,
                        //                 data:result.data
                        //             });
                        //         }else{
                        //             // 无能耗数据
                        //         }
                        //     },
                        //     error: function () {
                        //     }
                        // });
                    }
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
            
            /**
             * [判断输入否合法]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 
             */
            nameRegeMatch: function(val) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
                if (val == '') {
                    return 1;
                } else if (pattern.test(val)) {
                    return 2;
                } else {
                    return 3;
                }
            },
            // 初始化
            vueInit: function () {
                // 下拉框初始化
                bayaxInit();

                // 下拉框时间数据初始化 (默认显示最近三天)
                var time_option = this.energyAnalysis.timeOption;
                time_option.btnSelectdata = dateData();
                this.choiceAnalysisTime(time_option.btnSelectdata[3]);
                setTimeout(() => {
                    time_option.flag = true;
                }, 300);

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
