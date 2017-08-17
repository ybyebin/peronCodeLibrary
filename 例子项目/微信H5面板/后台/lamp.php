<?php
 date_default_timezone_set('PRC');
 require_once "jssdk.php";
$jssdk = new JSSDK("wx7d0869d5eea0847b", "4a3b45782b98a793c5c0655f0cd2b979");
//$jssdk = new JSSDK("yourAppID", "yourAppSecret");

$signPackage = $jssdk->
GetSignPackage();
$access_token = $jssdk->getAccessToken();





if(isGet()){

	 $device_type = $_POST['device_type'];
     $device_id = $_POST['device_id'];  


	"https://api.weixin.qq.com/device/get_openid?access_token=$access_token&device_type=$device_type&device_id=$device_id"
	$res =$jssdk->curlGet($url);
		echo $res;


}else{
	echo '测试测试';
}













/**
 * 是否是GET提交的
 */
function isGet(){
    return $_SERVER['REQUEST_METHOD'] == 'GET' ? true : false;
}

/**
 * 是否是POST提交
 *
 */
function isPost() {
    return ($_SERVER['REQUEST_METHOD'] == 'POST' && checkurlHash($GLOBALS['verify']) && (empty($_SERVER['HTTP_REFERER']) || preg_replace("~https?:\/\/([^\:\/]+).*~i", "\\1", $_SERVER['HTTP_REFERER']) == preg_replace("~([^\:]+).*~", "\\1", $_SERVER['HTTP_HOST']))) ? 1 : 0;
}