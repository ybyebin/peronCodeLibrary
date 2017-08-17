define(function (require) {
    var $ = require("common/zepto");
    var keyConfig = require("common/keyConfig");
    var reqData = require("common/reqData");
    var util = require("util/util");
    var ProcessBar = require("ui/process-bar");

    var pageParam = {
        device_id: util.getQuery("device_id"),
        device_type: util.getQuery("device_type"),
        appid: util.getQuery("appid")
    };
    var lastModTime = 0;

    var powerBtn = $("#powerBtn"), // 开关按钮
        lightBar;
    var device_status= {
        services: {
            lightbulb: {alpha:0},
            operation_status:{status:0}
        }
    }; // 数据对象

    (function () {
        if(!pageParam.device_id || !pageParam.device_type){
            alert("页面缺少参数");
            return;
        }
        log("appid:" + pageParam.appid);
        log("device_id:" + pageParam.device_id);
        log("device_type:" + pageParam.device_type);
        powerBtn.on("tap", togglePower); // 开关按钮事件
        initBar();
        initInterval();

        // todo : for test, delete before submit
//        renderPage({});
    })();

    /**
     * 初始化进度条
     */
    function initBar() {
        log("初始化lightBar");
        lightBar = new ProcessBar({
            $id: "lightBar",
            min: 0,
            stepCount: 100,
            step: 1,
            touchEnd: function (val) {
                device_status.services.lightbulb.alpha = val;
                log("亮度值为："+val);
                setData();
            }
        });
    }
    /**
     * 请求数据
     */
    function getData() {
        reqData.ajaxReq({
            //url: keyConfig.GET_LAMP_STATUS,
            url:'https://api.weixin.qq.com/device/getlampstatus',
            data: pageParam,
            onSuccess: renderPage,
            onError:function(msg) {
                log("获取数据失败:" + JSON.stringify(msg));
            }
        });
    }
    /**
     * 设置数据
     */
    function setData() {
        console.log("setUrl", keyConfig.SET_LAMP_STATUS);
        lastModTime = new Date().getTime(); // 更新最后一次操作时间
        reqData.ajaxReq({
           // url: keyConfig.SET_LAMP_STATUS,
            url: 'https://api.weixin.qq.com/device/setlampstatus',
            type: "POST",
            data: JSON.stringify(device_status)
        });
        log("setData:" + JSON.stringify(device_status));

    }

    /**
     * 开关按钮事件
     */
    function togglePower() {
        $("#switchBtn").toggleClass("on").toggleClass("off");
        log("灯的状态status:"+device_status.services.operation_status.status);
        if(device_status.services.operation_status.status==0){
            device_status.services.operation_status.status = 1;
            log("灯的状态:1");

        } else {
            device_status.services.operation_status.status = 0;
            log("灯的状态:0");
        }
        setData();
    }

    /**
     * 轮询
     */
    function initInterval() {
        getData();
        setInterval(function () {
            if((new Date().getTime() - lastModTime) > 2000){ // 当有设置操作时，停止1s轮询，2秒后继续轮询
                getData();
            }
        }, 1000);
    }

    /**
     * 渲染页面
     */
    function renderPage(json) {
        // todo : for test, delete before submit
//        json = {
//            device_status: {
//                services: {
//                    operation_status: {
//                        status: 0
//                    },
//                    lightbulb: {
//                        alpha: 0
//                    }
//                }
//            }
//        };
        log("renderPage:"+json);
        if(!json.device_status){
            return;
        }
        console.log("json", json);
        device_status = json.device_status;
        log(device_status);
        if(device_status.services.operation_status.status==0){
            $("#switchBtn").addClass("on").removeClass("off");
        } else {
            $("#switchBtn").addClass("off").removeClass("on");
        }
        lightBar.setVal(device_status.services.lightbulb.alpha);
    }
});/*  |xGv00|4199711a9ade00e2807e7ea576d92f55 */