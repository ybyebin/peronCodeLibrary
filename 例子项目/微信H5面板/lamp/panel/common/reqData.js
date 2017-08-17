define(function (require, exports) {
    var $ = require("common/zepto"),
        util = require("util/util"),
        keyConfig = require("common/keyConfig");

    var passTicket = util.getQuery("pass_ticket");

    var obj = {
        ajaxReq: function(config, toOauth){
            var option = {
                url: "",
                data: {},
                type: "GET",
                dataType: "json",
                onSuccess: function () {},      // 回调函数
                onError: function (json) {}
            };
            if (!config) {
                return;
            }
            $.extend(option, config);

            if(passTicket){
                option.data.pass_ticket = passTicket;
            }
            if(option.type.toUpperCase() == "GET"){
                option.data.t = new Date().getTime();
            } else {
                option.url += (((option.url.indexOf("?")==-1)? "?" : "&") + "t="+new Date().getTime());
            }

            $.ajax({
                url: option.url,
                type: option.type,
                data: option.data,
                dataType: option.dataType,
                success: function (json) {
                    if(json.BaseResponse.ret == 1005){ // oauth 跳转
                        var oauthUrl = json.oauth_url,
                            url = window.location.href;
                        if(url.indexOf("#") != -1){url = url.substr(0, url.indexOf("#"))};
                        oauthUrl = oauthUrl.replace("REDIRECTURL", encodeURIComponent(encodeURIComponent(url))); // 两次encode，防止oauth回来第二个以后的参数被干掉
                        location.href = oauthUrl;

                    }else if(json.BaseResponse.ret==0){
                        option.onSuccess(json);
                    } else {
                        option.onError(json);
                    }
                },
                error: option.onError
            });
        },
        /**
         * jssdk 初始化
         * @param apiList api接口列表
         * @param readyFunc 初始化成功回调
         * @param errorFunc 初始化失败回调
         */
        configWx: function (apiList, beta, readyFunc) {
            this.ajaxReq({
                url: keyConfig.GET_JS_TICKET,
                data: {
                    appid: keyConfig.WX_MYDEVICE_APPID,
                    url: encodeURIComponent(location.href.split("#")[0])
                },
                onSuccess: doConfig
            });


            function doConfig(json) {
                wx.config({
                    beta: true,
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: keyConfig.WX_MYDEVICE_APPID, // 必填，公众号的唯一标识
                    timestamp: json.timestamp, // 必填，生成签名的时间戳
                    nonceStr: json.noncestr, // 必填，生成签名的随机串
                    signature: json.signature,// 必填，签名，见附录1
                    jsApiList: apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                if(readyFunc){
                    wx.ready(readyFunc);
                }
                wx.error(function(res){
                    console.log(res.err_msg);
                });
            }
        }
    };

    return obj;
});
/*  |xGv00|680f78671c060a0f6684dd408b138ba0 */