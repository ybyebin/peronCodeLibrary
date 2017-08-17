<?php
 date_default_timezone_set('PRC');
require_once "jssdk.php";
$jssdk = new JSSDK("wx7d0869d5eea0847b", "4a3b45782b98a793c5c0655f0cd2b979");

$signPackage = $jssdk->GetSignPackage();

?>
<!-- saved from url=(0026)http://wx.doit.am/wifi.php -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="UTF-8">
  <title>个人信息</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black"> 

    <link rel="stylesheet" type="text/css" href="css_js/regists.css">
    <script type="text/javascript" src="css_js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="css_js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="css_js/city.js"></script> 
	  


<body>
   <div class="wrap">
       
      <form class="regist">
           
             <p id="city">
                <select class="prov"></select>
                <select class="city" disabled="disabled"></select>
                <select class="dist" disabled="disabled"></select>
            </p>
            <p>
                <span>工作站编号:</span>
                <input id="station_no" type="number">
            </p>
            <p>
                <span>工作站名称:</span>
                <input id="station_name" type="text">
            </p>
            <p>
                <span>调查仪类型:</span>
                <input id="sn_type" type="number">
            </p>
            <p>
                <span>调查仪编号:</span>
                <input id="sn_no" type="number">
            </p>
            <p>
                <span>样本户编号:</span>
                <input id="sample_num" type="number">
            </p>
            <p>
                <span>样本户姓名:</span>
                <input id="sample_name" type="number">
            </p>
            <p>
                <span>成员编号:</span>
                <input id="member_no" type="number">
            </p>
            <p>
                <span>成员姓名:</span>
                <input id="member_name" type="text">
            </p>
            <p>
                <span>成员职业:</span>
                <input id="member_occupation" type="text">
            </p>
             <p>
                <span>成员年龄:</span>
                <input id="member_age" type="number">
            </p>
            <p>
                <span>成员收入:</span>
                <input id="member_income" type="number">
            </p>
            <p>
                <span>成员性别:</span>
                <label class="sex_label">
                    <label>
                        <input class="sex" type="radio" name="member_sex" checked="checked" value="1" >男</label>
                    <label>
                        <input class="sex" type="radio" name="member_sex" value="2">女</label>
                </label>         
            </p>    
           
            <p>
                <span>频道名称:</span>
                <input id="channel_name" type="text">
            </p>
            <p>
                <span>频道编码:</span>
                <input id="channel_num" type="text">
            </p>
            <p>
                <span>收听频率:</span>
                <input id="listen_rate" type="text">
            </p>
            <p>
                <span>开始时间:</span>
                <input id="begin_time" type="date">
            </p>
            <p>
                <span>结束时间:</span>
                <input id="end_time" type="date">
            </p>
           
            <p>
                <button type="button" id="btn_submit" onclick="regist()">提交</button>
            </p>
        </form>
    </div>
    <!-- <script type="text/javascript" src="css_js/regist.js"></script> -->

</body>

<script>
  (function () {
        function o() {
            document.documentElement.style.fontSize = (document.documentElement.clientWidth > 640 ? 640 : document.documentElement.clientWidth) / 16 + "px"
        }
        var e = null;
        window.addEventListener("resize", function () {
            clearTimeout(e), e = setTimeout(o, 300)
        }, !1), o()
    })(window);

    $(function(){
      $("#city").citySelect({
    prov: "北京",
    city: "北京",
    nodata: "东城区"
  });
    })

  wx.config({
	  beta : true,// 开启内测接口调用，注入wx.invoke方法
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList : ['closeWindow'] 
    // 需要使用的jsapi列表
  });


 //  
 function regist() {
  var allUnivList = {
    type:'regist',
    province: $('.prov').val(),
    city: $('.city').val(),
    county: $('.dist').val(),
    station_no: $('#station_no').val(),
    station_name: $('#station_name').val(),
    sn_type: $('#sn_type').val(),
    sn_no: $('#sn_no').val(),
    sample_num: $('#sample_num').val(),
    sample_name: $('#sample_name').val(),
    member_no: $('#member_no').val(),
    member_name: $('#member_name').val(),
    member_occupation: $('#member_occupation').val(),
    channel_name: $('#channel_name').val(),
    channel_num: $('#channel_num').val(),
    listen_rate: $('#listen_rate').val(),
    begin_time: $('#begin_time').val(),
    end_time: $('#end_time').val(),
    member_age: $('#member_age').val(),
    member_sex: $('input[name="member_sex"]:checked').val(),
    member_income: $('#member_income').val()

  };

  console.log(JSON.stringify(allUnivList,null,2))
  $.ajax({
    url: "registss.php",
    type: "post",
    data: allUnivList,
    success: function(data) {
      var result = JSON.parse(data);

      if (result.success) {
        alert(result.data)
        // alert('提交成功！')
         wx.closeWindow();
      }     
    },
    error: function() {
      alert("系统异常!");
    }
  })
 }
  // });



</script>

  