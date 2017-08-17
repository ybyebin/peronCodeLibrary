<?php


// $allcity=$_POST['allcity'];
// echo $allcity['name'];
//首先是获取到了数据
// $username=$_POST['name'];
// $password=$_POST['location'];
// echo  $username;



// header('Content-Type:text/json;charset=utf-8');
$data['province'] = $_POST['province'];
$data['city'] = $_POST['city'];
$data['county'] = $_POST['county'];
$data['station_no'] = $_POST['station_no'];
$data['station_name'] = $_POST['station_name'];
$data['sn_type'] = $_POST['sn_type'];
$data['sn_no'] = $_POST['sn_no'];
$data['sample_num'] = $_POST['sample_num'];
$data['sample_name'] = $_POST['sample_name'];
$data['member_no'] = $_POST['member_no'];
$data['member_name'] = $_POST['member_name'];
$data['member_occupation'] = $_POST['member_occupation'];
$data['channel_name'] = $_POST['channel_name'];
$data['channel_num'] = $_POST['channel_num'];
$data['listen_rate'] = $_POST['listen_rate'];
$data['begin_time'] = $_POST['begin_time'];
$data['end_time'] = $_POST['end_time'];
$data['member_age'] = $_POST['member_age'];
$data['member_sex'] = $_POST['member_sex'];
$data['member_income'] = $_POST['member_income'];


$url = "http://back.ctcgsw.com/index.php?s=Home/Listenrate/submit";

$res = http_post($url,$data);
$retu = json_decode($res, true)['status'];
$arrtrue = array('success' => true, 'msg' =>json_decode($res, true)['msg'] );
$arrfalse = array('success' => false, 'data' => json_decode($res, true)['msg']);

if ($retu == 'success') {
   echo json_encode($arrtrue);
}else{
   echo json_encode($arrfalse);
}

function http_post($url, $data){
  $ch = curl_init();
  $header = "Accept-Charset: utf-8";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  // curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpInfo = curl_exec($ch);
  $errorno=curl_errno($ch);
  return $tmpInfo;
}


?>