/**
 * 全局常量配置
 */
define(function () {
    var basePath = "";
    return {
        WX_MYDEVICE_APPID: "wxf6dd794bce9261b5", //“我的设备”公众号appid
        // 页面链接
        GET_JS_TICKET             : basePath + "/getjsticket", // 获取jssdk授权相关参数
        GET_DEVICE_LIST: basePath + "/getmydevicelist", // 获取设备列表
        
        // 灯
        GET_LAMP_STATUS: 'lamp.php',
        SET_LAMP_STATUS: "lamp.php",
       
    }
});