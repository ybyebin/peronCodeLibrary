<!DOCTYPE html>
<html>
  <script type="text/javascript" script   language=javascript   runat="server">
  function ale(a){
    alert(a);
  }
</script>

<body>
  <button id="btn">按钮</button>
</body>

  <?php




function testst(){
  $data['province'] = '1';
$data['city'] = '1';
$data['county'] = '1';
$data['station_no'] = '1';
$data['station_name'] = '1';
$data['sn_type'] = '1';
$data['sn_no'] = '1';
$data['sample_num'] = '1';
$data['sample_name'] = '1';
$data['member_no'] = '1';
$data['member_name'] = '1';
$data['member_occupation'] = '1';
$data['channel_name'] = '1';
$data['channel_num'] = '1';
$data['listen_rate'] = '1';
$data['begin_time'] = '2017-03-20 14:52:02';
$data['end_time'] = '2017-03-20 14:52:02';
$data['member_age'] = '1';
$data['member_sex'] = '1';
$data['member_income'] = '1';

// $data_string = json_encode($data);
// echo $data_string;
$url = "http://back.ctcgsw.com/index.php?s=Home/Listenrate/submit";
// $res = $jssdk->
  // httpGetAuthorize($url,$data);
$res = http_post($url,$data);
echo $res;
// echo  ;
// 
$retu = json_decode($res, true)['status'];
$suc = 'success';
if ($retu == $suc) {
  // echo '相等';
  echo '
  <script>ale("相等");</script>
  ';
}else{
  echo "不相等";
}
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
</html>