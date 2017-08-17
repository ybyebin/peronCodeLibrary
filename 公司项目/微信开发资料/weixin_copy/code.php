<!DOCTYPE html>
<html>
<head>
<title>个人信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="keywords" content="makerwater">
<meta name="description" content="makerwifi">
<link rel="shortcut icon" href="resources/images/favicon.ico" />
<link href="resources/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="resources/js/jquery.js"></script>
<script type="text/javascript" src="resources/js/jquery.i18n.properties-1.0.9.js" ></script>
<script type="text/javascript" src="resources/js/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="resources/js/jquery.validate.js"></script>
<script type="text/javascript" src="resources/js/md5.js"></script>
<script type="text/javascript" src="resources/js/page_regist.js?lang=zh"></script>
<!--[if IE]>
  <script src="resources/js/html5.js"></script>
<![endif]-->
<!--[if lte IE 6]>
	<script src="resources/js/DD_belatedPNG_0.0.8a-min.js" language="javascript"></script>
	<script>
	  DD_belatedPNG.fix('div,li,a,h3,span,img,.png_bg,ul,input,dd,dt');
	</script>
<![endif]-->

</head>
<body class="loginbody">
<div class="dataEye">
<form name="form1" action="" method="post" onsubmit="return toVaild()">
	<div class="loginbox registbox">
		<div class="logo-a">
			<a href="login.jsp" title="科佳智能创新_设备绑定">
				<img src="resources/images/logo.png">
			</a>
		</div>
		<div class="login-content reg-content">
			<div class="loginbox-title">
				<h3>注册</h3>.
			</div>
			<form id="signupForm">
			<div class="login-error"></div>
			<div class="row">
				<label class="field" for="email">设备码</label>
				<input type="text" value="" class="input-text-user noPic input-click" name="mechineid" id="email">
			</div>
	
			<div class="row" >
				<label class="field" for="password">手机</label>
				<input type="text" value="" class="input-text-password noPic input-click" name="phone" id="phone">
			</div>
				<div class="row">
				<label class="field" for="email">验证码</label>
                <input type="text" style="width:160px; float:left;" value="" class="input-text-password noPic input-click" name="passwordAgain" id="passwordAgain">
                <input name="yzm" id="yzm" type="button"value="获取验证码"/>
			</div>
			    <Br/>            				
			<div class="row">
				<label class="field" for="mex">年龄</label>
				<input type="text" value="" class="input-text-user noPic input-click" name="mex" id="mex">
			</div>
			<div class="row">
				<label class="field" for="city">城市</label>
				<input type="text" value="" class="input-text-user noPic input-click" name="province" id="province">
			</div>
			<div class="row">
				<label class="field" for="openid">openid</label>
				<input type="text" value="<?php
error_reporting(E_ALL^E_NOTICE);
date_default_timezone_set("PRC");
$code = $_GET['code'];//获取code
$weixin =  file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx1e9a89abda38241c&secret=16ac592f16cf007cece9eaea53177d24&code=".$code."&grant_type=authorization_code");// 

//通过code换取网页授权access_token
$jsondecode = json_decode($weixin); //对JSON格式的字符串进行编码
$array = get_object_vars($jsondecode);//转换成数组
$openid = $array['openid'];//输出openid
echo $openid;
?>" class="input-text-user noPic input-click" name="openid" id="openid">
			</div>
			<div class="row tips">
				<input type="checkbox" id="checkBox">
				<label>
				我已阅读并同意
				<a href="#" target="_blank">隐私政策、服务条款</a>
				</label>
			</div>
			<div class="row btnArea">
	            <input id="submit" name="submit" type="submit" onclick="btnck();" value="绑定"/>
			</div>
			</form>
		</div>
		<div class="go-regist">
		</div>
	</div>
	<script type="text/javascript">
	$('#yzm').attr("disabled",false);
$("#yzm").click(
function(){  
 get_phone();
 countdown=60; 
 settime();
 }
 );
 function get_phone(){

	 txt=$("#phone").val();
	 $.post("smsapi.php",{phone:txt}); 
 }
 var countdown=60; 
function settime() { 
if (countdown == 0) { 

$('#yzm').attr("disabled",false);
  
$("#yzm").val("获取验证码"); 
} else { 
$('#yzm').attr("disabled",true);
$('#yzm').val("重新发送(" + countdown + ")"); 
countdown--; 
} 
var tt=setTimeout(function() { 
settime() 
},1000) 
}
 function mechineid(){
                 var val = document.getElementById("email").value;
                if(val == ""){
                    alert("请填写设备码后点击提交");
                    return false;
                }
                else{
                    alert("校验成功，正在提交");
                    return true;
               }
            }
 function phone(){
                 var val = document.getElementById("phone").value;
                if(val == ""){
                    alert("请填写手机号码后点击提交");
                    return false;
                }
                else{
                    alert("校验成功，正在提交");
                    return true;
               }
            }			
 function passwordAgain(){
                 var val = document.getElementById("passwordAgain").value;
                if(val == ""){
                    alert("请填写验证码后点击提交");
                    return false;
                }
                else{
                    alert("校验成功，正在提交");
                    return true;
               }
            }
function mex(){
                 var val = document.getElementById("mex").value;
                if(val == ""){
                    alert("请填写年龄后点击提交");
                    return false;
                }
                else{
                    alert("校验成功，正在提交");
                    return true;
               }
            }
function province(){
                 var val = document.getElementById("province").value;
                if(val == ""){
                    alert("请填写所在城市后点击提交");
                    return false;
                }
                else{
                    alert("校验成功，正在提交");
                    return true;
               }
            }
</script>
	
<div id="footer">
	<div class="dblock">
		<div class="inline-block"><img src="resources/images/logo.png"></div>
		<div class="inline-block copyright">
			<!-- <p><a href="http://www.makerwifi.com/about.html">关于我们</a> | <a href="http://www.makerwifi.com/about.html">微博</a> | <a href="http://www.makerwifi.com/about.html">隐私政策</a></p>
			<p> Copyright © 2016 科佳智能创新</p>
				<p>粤ICP备13010341号-2</P> -->
		</div>
	</div>
</div>
</div>
<div class="loading">
	<div class="mask">
		<div class="loading-img">
		<img src="resources/images/loading.gif" width="31" height="31">
		</div>
	</div>
</div>
</body>
</html>
<?php
error_reporting(E_ALL^E_NOTICE);
date_default_timezone_set("PRC");
srand((double)microtime()*1000000); 
$random =rand(0,1000);
$phone=$_POST["phone"];
$passwordAgain=$_POST["passwordAgain"];
if($_POST["submit"]=="绑定"){
	$smsapi= file_get_contents("http://v.juhe.cn/sms/send?mobile=".$phone."&tpl_id=10579&tpl_value=".$random."&key=4a9850f124a1add359a2d88d2dcaf347");
	srand((double)microtime()*1000000); 
$conn = mysql_connect("localhost","root","360");
mysql_select_db('openid'); //打开数据库
	$sql = "insert into tbl_user values('".$_POST["openid"]."','".$_POST["mechineid"]."','".$_POST["phone"]."','".$_POST["sex"]."','".$_POST["province"]."')";//写入数据库
mysql_query($sql); //把数据写到数据库
}
echo $sql;
echo $_POST["value"];
?>
</body>
</html>
