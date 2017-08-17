<?php
 date_default_timezone_set('PRC');
require_once "jssdk.php";
$jssdk = new JSSDK("wx7d0869d5eea0847b", "4a3b45782b98a793c5c0655f0cd2b979");

$signPackage = $jssdk->
GetSignPackage();
?>
<!DOCTYPE html>
<html style="background: #EFEFF4;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="UTF-8">
  <title>站长登录</title>
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link rel="stylesheet" type="text/css" href="css_js/weui.min.css">
  <link rel="stylesheet" type="text/css" href="css_js/regists.css">
  <script type="text/javascript" src="css_js/zepto.min.js"></script>
  <style type="text/css">
  body{
    background: #EFEFF4;
  }
    .page{
        background: #EFEFF4;padding-top: 2.57647059em;
    }
    .page .page__hd{
        padding: 0 15px;
    }
    .page__bd_spacing{
        padding: 0 30px;margin-top: 2.2em;
    }
    .weui-btn-cancle {
     margin-top: 15px;
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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        overflow: hidden;
        background: #E4E4E4;
        outline: none;
        display: inline-block;
        border: 1px solid #E4E4E4;
        width: 48%;color: #666;
        margin-left: 5px;
    }      
    </style>
</head>
<body>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title" style="text-align: center;">
        <img src="image/customer.png"></h1>

    </div>
    <div class="weui-cells weui-cells_form" style="margin-top: 2.57647059em;">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label" style="padding-left: 15px;color: #030303;">用户名</label>
        </div>
        <div class="weui-cell__bd">
          <input id="user-name" class="weui-input" type="text"/>
        </div>
      </div>

    </div>

    <div class="weui-cells weui-cells_form" style="margin-top:0.5em;">

      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label" style="padding-left: 15px;color: #030303;">密码</label>
        </div>
        <div class="weui-cell__bd">
          <input id="user-pwd" class="weui-input" type="password"/>
        </div>
      </div>

    </div>
    <div class="page__bd page__bd_spacing">
      <a  onclick="zzlogin()" href="javascript:;" class="weui-btn weui-btn_primary" style="display: inline-block;width: 48%;color:#fff; border: none;">登录</a>
      <a  onclick="zzcancel()" href="javascript:;" class="weui-btn-cancle" style="">取消</a>
    </div>


     <div id="loadingToast" style="display:none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast"> <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">登录中...</p>
            </div>
      </div>



  </div>

  <script type="text/javascript" src="css_js/jweixin-1.0.0.js"></script>
  <!--  <script src="https://res.wx.qq.com/open/libs/weuijs/1.0.0/weui.min.js"></script>
-->
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

  // wx.ready(function(){
    // 登录
     function zzlogin(){
        var $loadingToast = $('#loadingToast');

          var data = {
            name:$('#user-name').val(),
            password:$('#user-pwd').val()
          }


           $.ajax({
              url: "",
              type: "post",
              data: data,
              beforeSend:function(){
                $loadingToast.fadeIn(100);
              },
              success: function(data) {
                $loadingToast.fadeOut(100);
              },
              error: function() {
                $loadingToast.fadeOut(100);
                alert("登录失败!");
              }
            })
     }


     // 取消
     function zzcancel(){
         window.location.href="userManagement.php";

     }
       
  // });
    
</script>


