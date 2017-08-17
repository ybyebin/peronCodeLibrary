<?php
 date_default_timezone_set('PRC');
 require_once "jssdk.php";
$jssdk = new JSSDK("wx7d0869d5eea0847b", "4a3b45782b98a793c5c0655f0cd2b979");
//$jssdk = new JSSDK("yourAppID", "yourAppSecret");

$signPackage = $jssdk->GetSignPackage();
$access_token = $jssdk->getAccessToken();
// 设备授权
$data['device_num'] = 1;
    $arr = array(
            'id' => 'gh_3d5d96a43b97_5f9ce43128a77234',
            'mac' => 'ACCF23E1DF75',
            'connect_protocol' => 4,
            'auth_key' => '',
            'close_strategy' => '1',
            'conn_strategy' => '1',
            'crypt_method' => '0',
            'auth_ver' => '0',
            'manu_mac_pos' => '-1',
            'ser_mac_pos' => '-2',
            // 'ble_simple_protocol' => '0'
        );
    $data['device_list'][] = $arr;
    // $data['op_type'] = '1';
    $data['product_id'] = 34572;
	$data = json_encode($data,true);

$url = "https://api.weixin.qq.com/device/authorize_device?access_token=$access_token";
$res = curlPost($url, $data);
echo $res;

function curlPost($url, $data){
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
  curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpInfo = curl_exec($ch);
  $errorno=curl_errno($ch);
  return $tmpInfo;
}