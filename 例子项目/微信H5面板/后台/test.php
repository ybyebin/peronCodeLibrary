<!DOCTYPE html>
<html>

<?php
 date_default_timezone_set('PRC');
 require_once "jssdk.php";
//$jssdk = new JSSDK("yourAppID", "yourAppSecret");
$jssdk = new JSSDK("wx7d0869d5eea0847b", "cac600bc8c4404063bff67606e631971");
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1e9a89abda38241c&secret=16ac592f16cf007cece9eaea53177d24
$signPackage = $jssdk->GetSignPackage();

$access_token = $jssdk->getAccessToken();

// 申请设备ID device_id
// $url = "https://api.weixin.qq.com/device/getqrcode?access_token=$access_token&product_id=29322";
// $res = $jssdk->httpGet1($url);
// echo $res;
$da =  array("id"=>"gh_3d5d96a43b97_c5f506a05c46d9c2","mac"=>"ACCF23E1D6E1","connect_protocol"=>"4","auth_key"=>"","close_strategy"=>"2","conn_strategy"=>"4","crypt_method"=>"0","auth_ver"=>"0","manu_mac_pos"=>"-1","ser_mac_pos"=>"-1");
$data = array(
    "device_num"=>1,    
    "op_type"=>"0",
    "product_id"=>29322,
);
$data['device_list'][] = $da;

$data_string = json_encode($data);
$url = "https://api.weixin.qq.com/device/authorize_device?access_token=$access_token";
$res =$jssdk->curlPost($url, $data_string);
echo $res;

?>


</html>

<?php




?>