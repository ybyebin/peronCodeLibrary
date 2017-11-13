layui.use(['layer', 'element'], function() {
    var layer = layui.layer;
    var element = layui.element;

    var warnVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            showSecondDiv: false, //设备 子设备切换
            allEquipment: [], //所有设备


        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                element.init();
                this.getAllEquipmentData();
            });

        },
        methods: {
            getAllEquipmentData: function() {
                var _this = this;
                var data = {
                    "success": true,
                    "data": {
                        "pageCount": 0,
                        "items": [{
                                "name": "333",
                                "ip": "333333333333",
                                "status": 2,
                                "id": 20,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "99",
                                "ip": "999999999999",
                                "status": 2,
                                "id": 24,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "能耗01",
                                "ip": "f01fafd74162",
                                "status": 2,
                                "id": 3,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "电梯01",
                                "ip": "001122334455",
                                "status": 2,
                                "id": 6,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "test",
                                "ip": "222222222222",
                                "status": 2,
                                "id": 7,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "能耗02",
                                "ip": "123456789000",
                                "status": 2,
                                "id": 4,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "给排水02",
                                "ip": "14cf92f95d01",
                                "status": 2,
                                "id": 2,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "给排水01",
                                "ip": "123456789011~",
                                "status": 1,
                                "id": 15,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "测试点453452345234",
                                "ip": "097654563456345",
                                "status": 2,
                                "id": 19,
                                "create_time": "2017-11-01 15:10:27"
                            },
                            {
                                "name": "报警01",
                                "ip": "14cf92f96e46",
                                "status": 1,
                                "id": 5,
                                "create_time": "2017-11-01 14:12:06"
                            },
                            {
                                "name": null,
                                "ip": null,
                                "status": 1,
                                "id": 1,
                                "create_time": "2017-09-29 16:04:04"
                            }
                        ]
                    },
                    "error_message": null
                }

                if (data.success) {

                    var datas = data.data.items;
                    var arr = [];
                    var length = 14;
                    var nullData = {
                        ip: '',
                        name: '',
                        status: '',
                        create_time: '',
                        iswarn: false,
                        ishide: true
                    }
                    if (data.data == null || !Array.isArray(datas)) {
                        layer.msg("无通讯状态信息");
                        _this.allEquipment = [];
                        for (var i = 0; i < length; i++) {
                            _this.allEquipment.push(nullData);
                        }
                    } else {
                        var equDatas = datas.map(function(item) {
                            switch (Number(item.status)) {
                                case 1:
                                    item.status = "正常";
                                    item.iswarn = false;
                                    break;
                                case 2:
                                    item.status = "异常";
                                    item.iswarn = true;
                                    break;
                                default:
                                    break;
                            }
                            item.ishide = false;
                            return item;
                        });

                        if (equDatas.length < length) {
                            var num = length - equDatas.length;
                            for (var i = 0; i < num; i++) {
                                equDatas.push(nullData);
                            }
                        }
                        _this.allEquipment = equDatas;
                    }
                } else {
                    layer.msg(data.error_message)
                }

            }


        }
    });

});