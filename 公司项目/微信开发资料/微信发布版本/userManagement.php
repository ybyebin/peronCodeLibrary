<?php
 date_default_timezone_set('PRC');
require_once "jssdk.php";
$jssdk = new JSSDK("wx7d0869d5eea0847b", "4a3b45782b98a793c5c0655f0cd2b979");

$signPackage = $jssdk->GetSignPackage();

?>
<!DOCTYPE html>
<html style="background:background: #EFEFF4;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="UTF-8">
  <title>样本户管理</title>
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link rel="stylesheet" type="text/css" href="css_js/weui.min.css">
  <!-- <link rel="stylesheet" type="text/css" href="css_js/regists.css"> -->
  <script type="text/javascript" src="css_js/zepto.min.js"></script>
  <style type="text/css">
    body{
    background: #EFEFF4;
}
.page{
    background: #EFEFF4;
    padding-top: 0.1em;
}

.page__bd_spacing{
    padding: 0 30px;margin-top: 2.2em;
}
.weui-btn_primarys {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
    padding-top: 7px;
    padding-bottom: 7px;
    background: #F8F8F8;
    border: 1px solid #DDDDDD;
    border-radius: 2px;
    color: #030303;
    letter-spacing: -0.41px;
}
.weui-btn_primarys img{
    position: relative;
    top: 5px;
    display: inline-block;
    margin-right: 10px;
}
    </style>
</head>
<body>
 <div class="page" >
        <div class="page__bd page__bd_spacing" style="">
            <a href="javascript:;" class="weui-btn_primarys">
            <img src="image/user-3.png"> 添加样本户</a>
            <a href="javascript:;" class="weui-btn_primarys" style="margin-top: 0.6em"><img src="image/user-6.png">查询样本户</a>

        </div>
     <div id="loadingToast" style="display:none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast"> <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">登录中...</p>
            </div>
      </div>



  </div>

  <script type="text/javascript" src="css_js/jweixin-1.0.0.js"></script>

</body>

<script>

  wx.config({
    beta : true,// 开启内测接口调用，注入wx.invoke方法
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList : ['closeWindow'] // 需要使用的jsapi列表
  });


   
       

    
</script>
