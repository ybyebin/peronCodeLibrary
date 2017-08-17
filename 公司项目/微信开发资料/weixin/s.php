<?php
 date_default_timezone_set('PRC');
 // require_once "jssdk.php";
// $jssdk = new JSSDK("wx7d0869d5eea0847b", "4a3b45782b98a793c5c0655f0cd2b979");
// $access_token = 'kKDqLuaAG9H2bN5K06Grj0Z_TtGN8f_iQOQdAJFbwwETaCZeGeKBPEsMH3KiyKGQWTe5cKI_qCtYWpwlFUFW5BZv4rYkrUZtOsZVPKnoPfyYpVyFF4b2eWJ6XRXFaP8-FNYcAEANVG';
$access_token ='1iikRbE1LmCmApH4gMFrhD3AC-_uvT-5RLE2QADRYmi50Q7-JgqWA5AlQ3nLanXi_0p74ejJmrIibSPtZKyYUrusQnK0l3keVUCLHU3HhZkCFIWpZOErKTvX0fbCiNsYBEDhACAORQ';

// 申请设备ID device_id
$url = "https://api.weixin.qq.com/device/getqrcode?access_token=$access_token&product_id=29322";
$res = json_decode(curlGet($url),true);
if ($res['base_resp']['errcode'] == 0) {
	// echo $res['deviceid'];
	/*$data['device_num'] = 1;
	$arr = array(
	        'id' => $res['deviceid'],
	        'mac' => 'ACCF23E1D6E1',
	        'connect_protocol' => "4",
	        'auth_key' => '',
	        'close_strategy' => '2',
	        'conn_strategy' => '4',
	        'crypt_method' => '0',
	        'auth_ver' => '0',
	        'manu_mac_pos' => '-1',
	        'ser_mac_pos' => '-1',
	        'ble_simple_protocol' => '0',
	    );
	$data['device_list'][] = $arr;
	$data['op_type'] = '0';
	$data['product_id'] = 29322;*/
	$data['device_num'] = 1;
    $arr = array(
            'id' => $res['deviceid'],
            'mac' => 'ACCF23E1D6E1',
            'connect_protocol' => 3,
            'auth_key' => '',
            'close_strategy' => '1',
            'conn_strategy' => '1',
            'crypt_method' => '0',
            'auth_ver' => '0',
            'manu_mac_pos' => '-1',
            'ser_mac_pos' => '-2',
            'ble_simple_protocol' => '0',
        );
    $data['device_list'][] = $arr;
    $data['op_type'] = '1';
    $data['product_id'] = 29322;
	$data = json_encode($data,true);

	$url = "https://api.weixin.qq.com/device/authorize_device?access_token=$access_token";
	$res = curlPost($url,$data);
	var_dump($res);
}else{
	echo 'getqrcode error';die;
}

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

function curlGet($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$temp = curl_exec($ch);
	return $temp;
}