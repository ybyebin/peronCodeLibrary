layui.use(['layer', 'element', 'laydate'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;

    // vue 组件  点名称(代用)
    Vue.component('td-name', {
        render: function(createElement) {
            var _this = this;
            return createElement('span',{
            },  _this.show.name
        );
        },
        props: {
            show: {}
        }
    });
       // vue 组件  点状态
    Vue.component('td-status', {
        render: function(createElement) {
            var _this = this;
            switch(this.show.status){
                case null:
                case -1:
                return createElement('span',"tag无效");
                break;
                case 0:
                    switch (this.show.alarm) {
                        case false:
                            return createElement('span', "正常");
                            break;
                        case true:
                            return createElement('label', [
                                createElement('span', { 
                                    class: ['mark', 'warn']
                                }),
                                createElement('span', {
                                    style: {
                                        color: '#fd5656',
                                    },
                                }, '报警'),
                            ]);
                            break;
                        case null:
                            return createElement('span', "正常");
                            break;
                    }
                break;
                default:
                return createElement('label',[
                    createElement('span',{
                       
                        class:['mark','error']
                    }),
                    createElement('span',{
                        style: {
                            color: '#f5a623',
                        },
                    },'通信异常'),
                ]);
                break;
            }
            
        },
        props: {
            show: {}
        }
    });

    Vue.component('td-value', {
        render: function(createElement) {
            var _this = this;
            switch (this.show.status) {
                case 0:
                    return createElement('span', this.show.value);
                    break;
                default:
                    return createElement('span', "-");
                    break;
            }
        },
        props: {
            show: {}
        }
    });

    Vue.component('td-watch', {
        render: function(createElement) {
            var _this = this;
            var id = _this.show.tag_id;


            switch (Number(this.show.trends)) {
                case 0:
                    return createElement('span', '-');
                    break;
                case 1:
                    return createElement('a', {
                        class:['bayax-a'],
                        attrs: {
                            href: 'javascript:;'  
                          },
                        on: {
                            'click': function () {
                                console.log('查看:'+id)
                            }
                        }
                    }, '查看');
                    break;
                default:
                    break;
            } 
        },
        props: {
            show: {}
        }
    });
    Vue.component('td-operation', {
        render: function (createElement) {
            var _this = this;
            var id = _this.show.tag_id;
 
            if (this.show.status == 0) {
                if (this.show.readonly) {
                    return createElement('span', '-');
                } else {
                    return createElement('a', {
                        class: ['bayax-a'],
                        attrs: {
                            href: 'javascript:;'
                        },
                        on: {
                            'click': function () {
                                console.log('查看:' + id)
                            }
                        }
                    }, '操作');
                }
            } else {
                return createElement('span', '-');
            }
        },
        props: {
            show: {}
        }
    });
    var monitoringVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            loadingShow: false,
            canvas: '',
            monitoringGroup: [],//群组画面
            globalBtnData: [],//全局按钮
            tableTrend:{
                    '1':{
                        'tag_id':1,
                        "name":'组件1',
                        "trends": false,// 是否有趋势数据
                        "tag_type": 1,
                        "readonly": false,
                        "alarm": null,
                        "status": null,
                        "value": 100,
                        "component":[
                            {
                                id:"e4dd000a-ec98-67b9-8416-26119692beb3",
                            },
                            {
                                id:"4ccfbf00-31f0-6254-17f0-6dbfdeab6097",
                            }
                        ]
                    },
                    '2':{
                        'tag_id':2,
                        "name":'组件2',
                        "trends": true,// 是否有趋势数据
                        "tag_type": 1,
                        "readonly": false,
                        "alarm": true,
                        "status": 0,
                        "value": 100,
                        "component":[
                            {
                                id:"e4dd000a-ec98-67b9-8416-26119692beb3",
                            },
                            {
                                id:"4ccfbf00-31f0-6254-17f0-6dbfdeab6097",
                            }
                        ]
                    },
                    '3':{
                        'tag_id':3,
                        "name":'组件3',
                        "trends": false,// 是否有趋势数据
                        "tag_type": 1,
                        "readonly": false,
                        "alarm": null,
                        "status": 1,
                        "value": null,
                        "component":[
                            {
                                id:"e4dd000a-ec98-67b9-8416-26119692beb3",
                            },
                            {
                                id:"4ccfbf00-31f0-6254-17f0-6dbfdeab6097",
                            }
                        ]
                    },
                    '4':{
                        'tag_id':4,
                        "name":'组件4',
                        "trends": 1,// 是否有趋势数据
                        "tag_type": 1,
                        "readonly": true,
                        "alarm": false,
                        "status": 0,
                        "value": 200,
                        "component":[
                            {
                                id:"e4dd000a-ec98-67b9-8416-26119692beb3",
                            },
                            {
                                id:"4ccfbf00-31f0-6254-17f0-6dbfdeab6097",
                            }
                        ]
                    } 
            },//列表与趋势图
        },
        mounted: function() {
            // var _this = this;


            this.$nextTick(function() {

                element.init();

                this.canvasInit();
                this.loadMonitoringGroups();

                this.getTableTrend();

            });

        },
        methods: {
            // 获取 监控群组 信息
            loadMonitoringGroups: function() {
                var _this = this;
                // $.ajax({
                //     url: apiurl + 'subsystem',
                //     type: 'get',
                //     dataType: 'json',
                //     beforeSend: function() {
                //         $(".loading").show();
                //     },
                //     complete: function() {
                //         $(".loading").hide();
                //     },
                //     success: function(data) {
                //         // console.log('菜单数据：' + JSON.stringify(data, null, 2));

                //         $(".loading").hide();
                //         if (data.success) {
                //             if (data.data.items === null || data.data.items === 0) {
                //                 layer.msg('未配置监控系统')
                //                 return;
                //             }
                //             AllGroupData = data.data.items;
                //             showAllDeviceData(data.data.items);

                //             // if (sessionStorage.getItem("device_viewid") == null) {
                //             if (data.data.items[0].view !== null) {
                //                 console.log("第一组有画面");
                //                 $('#wraplist li:first-child a').click();
                //                 console.log('查看:' + $('#demo-li0 li:first-child a').data('viewid'))
                //                 $('#demo-li0 li:first-child a').click();
                //             }


                //         } else {

                //         }
                //     },
                //     error: function(data) {
                //         publicAjaxError(data);
                //     }
                // });



                var data = {
                    "success": true,
                    "data": {
                        "pageCount": 0,
                        "items": [{
                                "project_id": 1,
                                "name": "2好嘞",
                                "view_count": 6,
                                "view": [{
                                        "project_id": 1,
                                        "name": "a",
                                        "external_link": null,
                                        "view_group_id": 117,
                                        "background_img_url": null,
                                        "background_color": null,
                                        "view_data": null,
                                        "id": 172,
                                        "create_time": "0001-01-01 00:00:00"
                                    },
                                    {
                                        "project_id": 1,
                                        "name": "测试新建画面",
                                        "external_link": null,
                                        "view_group_id": 117,
                                        "background_img_url": null,
                                        "background_color": null,
                                        "view_data": null,
                                        "id": 173,
                                        "create_time": "0001-01-01 00:00:00"
                                    },
                                    {
                                        "project_id": 1,
                                        "name": "呵呵",
                                        "external_link": "234",
                                        "view_group_id": 117,
                                        "background_img_url": null,
                                        "background_color": null,
                                        "view_data": null,
                                        "id": 175,
                                        "create_time": "0001-01-01 00:00:00"
                                    },
                                    {
                                        "project_id": 1,
                                        "name": "hehna",
                                        "external_link": null,
                                        "view_group_id": 117,
                                        "background_img_url": null,
                                        "background_color": null,
                                        "view_data": null,
                                        "id": 176,
                                        "create_time": "0001-01-01 00:00:00"
                                    },
                                    {
                                        "project_id": 1,
                                        "name": "123",
                                        "external_link": null,
                                        "view_group_id": 117,
                                        "background_img_url": null,
                                        "background_color": null,
                                        "view_data": null,
                                        "id": 178,
                                        "create_time": "0001-01-01 00:00:00"
                                    },
                                    {
                                        "project_id": 1,
                                        "name": "adacc",
                                        "external_link": null,
                                        "view_group_id": 117,
                                        "background_img_url": null,
                                        "background_color": null,
                                        "view_data": "{\"canvas\":[{\"type\":\"rectangleComponent\",\"id\":\"34f4e8dd-bd98-96ea-33e6-dae24c964fbc\",\"x\":113,\"y\":66,\"width\":50,\"height\":50,\"alpha\":1,\"angle\":0,\"userData\":{\"type\":\"basicComponent\",\"custom\":{\"newCreat\":false,\"editSatus\":\"defaults\",\"havepoint\":true},\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"bingding_status\":0,\"status\":\"default\"},\"routine\":{\"name\":\"矩形\",\"description\":\"\",\"visible\":false,\"enable\":false,\"accessLevel\":8,\"hint\":{\"flag\":false,\"hintText\":\"\"},\"readOnly\":false},\"defaults\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onTrue\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onFalse\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onAlarm\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onDisconnected\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false}},\"cssClass\":\"rectangleComponent\",\"ports\":[{\"type\":\"draw2d.InputPort\",\"id\":\"0746c494-398b-f9d5-b93b-9c0f6b4e4eeb\",\"width\":10,\"height\":10,\"alpha\":1,\"angle\":0,\"userData\":{},\"cssClass\":\"draw2d_InputPort\",\"bgColor\":\"#4F6870\",\"color\":\"#1B1B1B\",\"stroke\":1,\"dasharray\":null,\"maxFanOut\":9007199254740991,\"name\":\"input0\",\"port\":\"draw2d.InputPort\",\"locator\":\"draw2d.layout.locator.InputPortLocator\"},{\"type\":\"draw2d.OutputPort\",\"id\":\"b5082b4e-531d-9564-2d16-8789c2f2b128\",\"width\":10,\"height\":10,\"alpha\":1,\"angle\":0,\"userData\":{},\"cssClass\":\"draw2d_OutputPort\",\"bgColor\":\"#4F6870\",\"color\":\"#1B1B1B\",\"stroke\":1,\"dasharray\":null,\"maxFanOut\":9007199254740991,\"name\":\"output0\",\"port\":\"draw2d.OutputPort\",\"locator\":\"draw2d.layout.locator.OutputPortLocator\"}],\"bgColor\":\"#35C99D\",\"color\":\"#000000\",\"stroke\":0,\"radius\":0,\"dasharray\":null}],\"subCanvas\":[{\"id\":\"fvrhowv8x1s0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"brdx1zd6bpk0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8pstndm5j0c0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"k9d1cdrr3rk000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"3dia0fkanj80000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8zjrr99u8zs0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"c4qy6kc67wo0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"5opz3pwpzyc0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"52dykgdyfwk0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"50dw7cuaaig0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"2ku5if25hk60000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"art1gkcofco0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"1d54zm2lp90g000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"wlvydacbnbk000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"bg37fd4kzps0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"fvlmt11uqts0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"6689z527w7k0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"d9gmuyx0vl40000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"148o0ak924m8000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8k2yacstd6w0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}}],\"bg_color\":\"#2B2F4C\"}",
                                        "id": 180,
                                        "create_time": "0001-01-01 00:00:00"
                                    }
                                ],
                                "id": 117,
                                "create_time": "2017-11-01 18:09:27"
                            },
                            {
                                "project_id": 1,
                                "name": "2号楼",
                                "view_count": 1,
                                "view": [{
                                    "project_id": 1,
                                    "name": "12",
                                    "external_link": null,
                                    "view_group_id": 118,
                                    "background_img_url": null,
                                    "background_color": null,
                                    "view_data": null,
                                    "id": 177,
                                    "create_time": "0001-01-01 00:00:00"
                                }],
                                "id": 118,
                                "create_time": "2017-09-20 11:10:11"
                            },
                            {
                                "project_id": 1,
                                "name": "空调机组",
                                "view_count": 0,
                                "view": null,
                                "id": 140,
                                "create_time": "2017-11-01 16:12:54"
                            },
                            {
                                "project_id": 1,
                                "name": "照明哥哥哥",
                                "view_count": 0,
                                "view": null,
                                "id": 141,
                                "create_time": "2017-11-01 18:17:10"
                            },
                            {
                                "project_id": 1,
                                "name": "照明",
                                "view_count": 0,
                                "view": null,
                                "id": 152,
                                "create_time": "2017-11-07 15:00:26"
                            },
                            {
                                "project_id": 1,
                                "name": "照明",
                                "view_count": 0,
                                "view": null,
                                "id": 153,
                                "create_time": "2017-11-09 15:22:23"
                            }
                        ]
                    },
                    "error_message": null
                }


                if (data.success) {
                    if (data.data.items === null) {
                        layer.msg('未配置监控系统')
                    } else {
                        var arr = data.data.items;

                        arr.forEach(function(ele, index) {
                            if (index === 0) {
                                ele.itemed = true;
                            } else {
                                ele.itemed = false;
                            }
                            var group_name = ele.name;
                            console.log(group_name)
                            console.log(group_name.indexOf("空调"))
                            if (group_name.indexOf("空调") >= 0) {
                                ele.i_type = 'kongtiao';
                            } else if (group_name.indexOf("视频") >= 0) {
                                ele.i_type = 'vedio';
                            } else if (group_name.indexOf("照明") >= 0) {
                                ele.i_type = 'zhaoming';
                            } else if (group_name.indexOf("停车场") >= 0) {
                                ele.i_type = 'tingche';
                            } else if (group_name.indexOf("风机末端") >= 0) {
                                ele.i_type = 'fengji';
                            } else if (group_name.indexOf("入侵报警") >= 0) {
                                ele.i_type = 'ruqin';
                            } else if (group_name.indexOf("环境监测") >= 0) {
                                ele.i_type = 'huanjing';
                            } else if (group_name.indexOf("风机盘管") >= 0) {
                                ele.i_type = 'fengji';
                            } else if (group_name.indexOf("电梯") >= 0) {
                                ele.i_type = 'dianti';
                            } else if (group_name.indexOf("照明") >= 0) {
                                ele.i_type = 'zhaoming';
                            } else if (group_name.indexOf("给水") >= 0) {
                                ele.i_type = 'jishui';
                            } else if (group_name.indexOf("排水") >= 0) {
                                ele.i_type = 'paishui';
                            } else {
                                ele.i_type = 'custom';
                            }

                        });



                        _this.monitoringGroup = arr;

                        this.$nextTick(function() {
                            element.init();




                        });

                    }
                }


            },
            // 获取 设备监控 画面数据
            getCanvasData: function(item) {

                var _this = this;
                if (item.view_data === null) {
                    layer.msg('画面无数据');
                    _this.canvas.clear(); //清空画布
                    _this.globalBtnData = []; //清空全局按钮
                } else {
                    var canvasArr = JSON.parse(item.view_data).canvas;
                    var globalArr = JSON.parse(item.view_data).subCanvas;

                    // 还原 全局按钮 数据
                    _this.globalBtnData = globalArr;

                    // 还原 canvas 数据
                    var reader = new draw2d.io.json.Reader();
                    reader.unmarshal(this.canvas, canvasArr);
                    // 初始化 canvas 组件
                    var writer = new draw2d.io.json.Writer();
                    writer.marshal(this.canvas, function(json) {
                        // console.log(JSON.stringify(json, null, 2))
                        for (var i in json) {
                            //获得ID对应的节点对象
                            var node = _this.getCanvasNode(json[i].id);
                            //  控件的 输入输出节点(隐藏)
                            if (node) {
                                var userData = node.userData;
                                if (userData.type === 'basicComponent') {
                                    // 隐藏输入输出点
                                    if (userData.hasOwnProperty("onlytype")) {
                                        // 管道链接点(去掉)
                                        node.resetPorts();
                                    } else if (userData.custom.hasOwnProperty("havepoint")) {
                                        node.getOutputPort(0).setVisible(false);
                                        node.getInputPort(0).setVisible(false);
                                    }
                                }

                                // 隐藏组件
                                if (userData.routine.visible) {
                                     node.setAlpha(0);
                                    if (node.image) {
                                        node.image.setAlpha(0);
                                    }
                                    if (node.label) {
                                        node.label.setAlpha(0);
                                    }
                                    if (userData.hasOwnProperty("onlytype")) {
                                        node.setVisible(false);
                                    }

                                }

                                 // 更改标题	
                                 if (userData.routine.hasOwnProperty("caption")) {
                                    var caption = userData.routine.caption;
                                    if (caption.flag) {
                                        node.label.setVisible(true);
                                    }
                                    node.label.setText(caption.capText);
                                }


                                // 节点闪烁
                                if (userData.defaults.blinking) {
                                    // 待完成
                                }

                                // 图片
                                if (node.image) {
                                    node.image.setHeight(node.getHeight());
                                    node.image.setWidth(node.getWidth());
                                }
                                if (userData.defaults.hasOwnProperty("picture")) {
                                    node.image.setPath(userData.defaults.picture);
                                    node.image.setHeight(node.getHeight());
                                    node.image.setWidth(node.getWidth());
                                }
                            }

                        }
                    });



                }
            },
            // 获取 列表与趋势图 数据
            getTableTrend:function(id){

                var _this = this;
                var data = {
                    "success": true,
                    "data": [
                      {
                        "id": "e4dd000a-ec98-67b9-8416-26119692beb3",
                        "com_readonly": false,
                        "name": "泵0",
                        "tag_id": 193,
                        "trends": false,// 是否有趋势数据
                        "tag_type": 1,
                        "readonly": false,
                        "alarm": null,
                        "status": null,
                        "value": null,
                        "create_time": "0001-01-01 00:00:00"
                      },
                      {
                        "id": "123123123123123",
                        "com_readonly": false,
                        "name": "泵0",
                        "tag_id": 193,
                        "trends": false,// 是否有趋势数据
                        "tag_type": 1,
                        "readonly": false,
                        "alarm": null,
                        "status": null,
                        "value": null,
                        "create_time": "0001-01-01 00:00:00"
                      },
                      {
                        "id": "4ccfbf00-31f0-6254-17f0-6dbfdeab6097",
                        "com_readonly": false,
                        "name": "文本19",
                        "tag_id": 224,
                        "trends": true,
                        "tag_type": 3,
                        "readonly": false,
                        "alarm": null,
                        "status": null,
                        "value": null,
                        "create_time": "0001-01-01 00:00:00"
                      }
                    ],
                    "error_message": null
                  }

                  var tableTrend = {};
                  data.data.forEach(function(ele){
                    if(_this.tableTrend.hasOwnProperty(String(ele.tag_id))){
                        _this.tableTrend[ele.tag_id].component.push({id:ele.id});
                    }else{
                        var dicEmpty = {
                            name:ele.name,
                            tag_id:ele.tag_id,
                            trends:ele.trends,
                            tag_type:ele.tag_type,
                            readonly:ele.readonly,
                            alarm:ele.alarm,
                            status:ele.status,
                            value:ele.value,
                            component:[
                                {id:ele.id}
                            ]
                        };

                        _this.tableTrend[String(ele.tag_id)] = dicEmpty;                   
                    }
                  });
                  console.log(JSON.stringify(this.tableTrend,null,2))








            },
            // 更新canvas 画面
            reloadCanvas:function(result){
                var data = result.data
                switch(result){
                    case 'table':
                    for(var key in data){
                        if(data[key].status == 0){
                            data[key].component.forEach(function(ele){
                                var node = getCanvasNode(ele.id);
                                if (node) {
                                    switch (node.userData.type) {
                                        case 'labelComponent':
                                            node.setText(String(data[key].value));
                                            node.repaint();
                                            break;
                                        case 'textComponent':
                                            node.setText(String(data[key].value + node.userData.routine.unit));
                                            node.repaint();
                                            break;
                                        case 'defaultComponent':
                                            if (node.userData.custom.showValue.flag) {
                                                node.labelValue.setText(String(data[key].value));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                    // 是否是报警
                                    switch (data[key].alarm) {
                                        case true:
                                            // deviceComAlarm(node, data[dic].value);
                                            break;
                                        case false:
                                        default:
                                            if (data[key].tag_type === 1) {
                                                switch (Number(data[key].value)) {
                                                    case 0:
                                                        // deviceComFalse(node, data[dic].value);
                                                        break;
                                                    case 1:
                                                        // deviceComTrue(node, data[dic].value);
                                                        break;
                                                }
                                            } else {
                                                // deviceComTrue(node, data[dic].value);
                                            }
                                            break;
                                    }


                                }
                            });
                        }else{
                            // deviceComDiscon(node, "通讯异常");
                        }
                       
                    }
                    break;
                    case 'mqtt':
                    break;
                }
            },

            
            /**
             * [初始化 画布控件显示数据-------onTrue]
             * @param  {node}  [组件]
             * @return {values}  [值]
             */
            deviceComTrue: function (node, values) {
                var data = node.userData.onTrue;
                var value = String(values);

                node.stopTimer();
                node.userData.custom.blinkingType = "onTrue";

               

                if(data.type ==='labelComponent'){
                    node.setText(value);
                }else{
                    if (data.blinking == true) {
                        node.startTimer(1000);
                    }
                  // 边框宽度
                  node.setStroke(Number(data.LineWidth));
                  node.setColor(data.LineColor);
                }
                 
                
                  switch (node.userData.type) {
                    // case 'labelComponent':
                    // break;
                    case 'lineComponent':
                    break;
                    case 'basicComponent':
                    break;
                    case 'textComponent':
                    break;
                    case 'defaultComponent':
                        node.setBackgroundColor(data.fillColor);
                        if(!node.userData.routine.visible){
                            node.setAlpha(data.alpha);
                        }
                    break;
                    case 'customImageComponent':
                        node.image.setPath(data.picture);

                    break;
                }
            },
            /**
             * [初始化 画布控件显示数据-------onfalse]
             * @param  {[type]} node [description]
             * @return {[type]}      [description]
             */
            deviceComFalse: function (node, values) {
                node.stopTimer();
                node.userData.custom.blinkingType = "onFalse";

            },
            /**
             * [画布控件显示数据-------onAlarm]
             * @param  {[type]} node [description]
             * @return {[type]}      [description]
             */
            deviceComAlarm: function (node, values) {
                node.stopTimer();
                node.userData.custom.blinkingType = "onAlarm";

            },
            /**
             * [画布控件显示数据-------ondiscon]
             * @param  {[type]} node [description]
             * @return {[type]}      [description]
             */
            deviceComDiscon: function (node, values) {
                node.stopTimer();
                node.userData.custom.blinkingType = "onDisc";

            },


            // canvas 初始化
            canvasInit: function() {
                var _this = this;
                draw2d.Configuration.factory.createConnection = function(sourcePort, targetPort, callback, dropTarget) {
                    return new HoverConnection(sourcePort, targetPort);
                };

                var canvas = new draw2d.Canvas("canvas"); //主画布
                aaaa = canvas;
                this.canvas = canvas;
                // 边框阴影
                var filter = canvas.paper.createFilter();
                filter.createShadow(0, 0, 3, 0.3, "#000000");
                filter.element.setAttribute("x", "-35%");
                filter.element.setAttribute("y", "-35%");

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

                _this.setCanvasWH();
                setTimeout(function() {
                    _this.setCanvasWH();
                }, 80)

                // 画布自适应缩放
                window.onresize = function() {
                    _this.setCanvasWH();
                    console.log('缩放')
                    setTimeout(function() {
                        _this.setCanvasWH();
                    }, 80)
                }


            },
            // 在 画布中找到 node
            getCanvasNode: function(id) {
                if (id != '') {
                    var node = monitoringVue.canvas.getFigure(id);
                    var nodeLine = monitoringVue.canvas.getLine(id);
                    if (node !== null) {
                        return node;
                    } else if (nodeLine !== null) {
                        return nodeLine;
                    }
                } else {
                    return false;
                }
            },
            // 设置画布 宽高
            setCanvasWH: function() {
                var _this = this;
                var w = Number($('.canvas-div').width());
                console.log($('.canvas-div').width())

                var s = 1300 / w;
                $('#canvas').css({
                    width: w + 'px',
                    height: w * 9 / 16 + 'px'
                });

                $('.content-main-mon').css({
                    // width: w + 'px',
                    height: w * 9 / 16 + 20 + 'px'
                });

                this.canvas.setZoom(s);

            },

           
        }
    });

});

/** 
 * 默认的连线样式
 * @extend draw2d.Connection
 */
var HoverConnection = draw2d.Connection.extend({
    init: function(sourcePort, targetPort) {
        var self = this;
        this._super({
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            radius: 5,
            stroke: 1.35,
            color: "#68C9FF"
        });

        this.on("dragEnter", function(emitter, event) {
            console.log('drag enter');
            self.attr({
                outlineColor: "#68C9FF",
                outlineStroke: 2,
                color: "#68C9FF"
            });
        });
        this.on("dragLeave", function(emitter, event) {
            console.log('drag leave');
            self.attr({
                outlineColor: "#68C9FF",
                outlineStroke: 0,
                color: "#68C9FF"
            });
        });
    },

    onDragEnter: function(draggedFigure) {
        return this;
    }
});