/**
 * 全局常量配置
 */
define(function () {
    var basePath = "https://api.weixin.qq.com/device";
    return {
     //   WX_MYDEVICE_APPID: "wx497ac33efb0862c3", //“我的设备”公众号appid
        WX_MYDEVICE_APPID: "wxf6dd794bce9261b5", //“我的设备”公众号appid
        // 页面链接
        // cgi
        GET_JS_TICKET             : basePath + "/getjsticket", // 获取jssdk授权相关参数

        GET_DEVICE_LIST: basePath + "/getmydevicelist", // 获取设备列表
        // 空调
        GET_AC_STATUS: basePath + "/getairconstatus",
        SET_AC_STATUS: basePath + "/setairconstatus",
        // 灯
        GET_LAMP_STATUS: basePath + "/getlampstatus",
        SET_LAMP_STATUS: basePath + "/setlampstatus",
        // 插座
        GET_SOCKET_STATUS: basePath + "/getsocketstatus",
        SET_SOCKET_STATUS: basePath + "/setsocketstatus"
    }
});/*  |xGv00|0e89a95a82a3305d03b98efa59ba0a26 */