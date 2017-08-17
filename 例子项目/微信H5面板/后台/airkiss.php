<?php
 date_default_timezone_set('PRC');
require_once "jssdk.php";
//$jssdk = new JSSDK("yourAppID", "yourAppSecret");
$jssdk = new JSSDK("wx7d0869d5eea0847b", "cac600bc8c4404063bff67606e631971");
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1e9a89abda38241c&secret=16ac592f16cf007cece9eaea53177d24
$signPackage = $jssdk->GetSignPackage();

?>
<!-- saved from url=(0026)http://wx.doit.am/wifi.php -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="UTF-8">
  <title>配置 WiFi</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="css_js/style.css" media="screen" type="text/css">
    <link rel="stylesheet" href="css_js/common.css" media="screen" type="text/css">
    <link rel="stylesheet" href="css_js/wifi-config.css" media="screen" type="text/css"> 
	<script src="css_js/jquery-1.8.2.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="css_js/common.js"></script>
    <style type="text/css"></style></head>
<body>
<div class="page_weixin">
    <div class="wifi-logo"><img src="css_js/wifi.png"/></div>
  <div class="tips">
    <ul>
      <li>1. 确定手机打开WiFi,并连接上要配置的路由</li>
      <li>2. WiFi模块上电LED亮后，请长按配置按钮</li>
      <li>3. 等待设备LED灯快闪后开始配置</li>
    </ul>
  </div>
  <div class="action">
    开始配置(makerwater)
  </div>
</div>
<div class="page_pc" style="text-align:center; display:none; ">
    <div class="wifi-logo"><img src="https://sp0.baidu.com/5aU_bSa9KgQFm2e88IuM_a/micxp1.duapp.com/qr.php?value=http%3A%2F%2Fdemo.bayax.cn%2Fairkiss.php"/></div>
  <div class="tips">
    <ul>
      <li>1. 确定手机打开WiFi,并连接上要配置的路由</li>
      <li>2. WiFi模块上电LED亮后，请长按配置按钮</li>
      <li>3. 等待设备LED灯快闪后开始配置</li>
    </ul>
  </div>
  <div class="action">
    <center>请使用微信扫一扫</center>
  </div>
 </div>
<div class="scan_action" style="display:none">
     扫描配置(makerwater)
</div>

<p id="message">此处显示设备信息</p>

</body>

<script>
function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
} 
 if(is_weixn()){
	 $(".page_weixin").show();
	 $(".page_pc").hide();
 }else{
	 $(".page_weixin").hide();
	 $(".page_pc").show();
 }
  wx.config({
	  beta : true,// 开启内测接口调用，注入wx.invoke方法
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList : ['configWXDeviceWiFi',
    'scanQRCode'] // 需要使用的jsapi列表
  });

  wx.ready(function(){
			$(document).ready(function(){		   
		   $('.action').click(function(){
			     configWiFi();
		   });
		  $('.scan_action').click(function(){
				   alert("scan");
				  scan_device();
			 });
			});
  });

function configWiFi(){
			try{
				
					wx.checkJsApi({
						jsApiList: ['configWXDeviceWiFi'],
						success: function(res1) {
							wx.invoke('configWXDeviceWiFi', {}, function(res){
								alert("res:"+JSON.stringify(res) );
								var err_msg = res.err_msg;
								alert(res.err_msg);
								if(err_msg == 'configWXDeviceWiFi:ok') {
									//$('#message').html("配置 WIFI成功，<span id='second'>5</span>秒后跳转到首页。");
									alert('WiFi配置成功!');

                  scan_device();

                  // wx.invoke('openWXDeviceLib', {'connType':'lan'}, function(res) {
                  // alert('openWXDeviceLib:'+JSON.stringify(res))
                  // });



                  // wx.invoke('startScanWXDevice', {'connType':'lan'}, function(res) {
                  //   alert('startScanWXDevice:'+ JSON.stringify(res));
                  // });
                  // wx.invoke('getWXDeviceInfos', {'connType':'lan'}, function(res) {
                  //  alert('getWXDeviceInfos:'+ JSON.stringify(res));
                  // });

									// wx.closeWindow();
									return;
								} else {
									//$('#message').html("配置 WIFI失败，是否<a href=\"/wechat/scan/airkiss" + window.location.search +  "\">再次扫描</a>。<br>不配置WIFI,<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1867e87a4eeeb16&redirect_uri=http://letux.xyz/wechat/page/main&response_type=code&scope=snsapi_base&state=1#wechat_redirect\">直接进入首页</a>。");
								    //alert(res.err_msg);
									alert('配置失败！请重试');
								}
							});
						}
					});
//				   alert(555);
//					wx.invoke('configWXDeviceWiFi', {}, function(res){
//							  alert(res.err_msg);
//							if(res.err_msg == 'configWXDeviceWiFi:ok'){
//							  alert('WiFi配置成功!');
//							  wx.closeWindow();
//							} else {
//							   alert(res.err_msg);
//							  alert('配置失败！请重试');
//							}
//					  });
			}
			catch(err)
			{
			  alert(err.message);
			} 
}
function scan_device(){
		wx.scanQRCode({
			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function (res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			alert(result);
		}
		});
}

//运行token.php对接
//添加设备功能
//功能设置 添加 JS接口安全域名

//http://mp.weixin.qq.com/wiki/home/index.html
//http://iot.weixin.qq.com/wiki/document-3_3.html

</script>

    
    <div class="ui-blocker" style="display:none">
      <div class="ui-blocker-wrapper">
        <div class="ui-blocker-spinner"></div>
      </div>
    </div>
