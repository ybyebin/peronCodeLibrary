<?php
$url = 'http://back.ctcgsw.com/index.php?s=Home/Listenrate/submit';
/*$data['province'] = '1';
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
$data['member_income'] = '1';*/

$data = array('province'=>'1','city'=>'1','county'=>'1','station_no'=>'1','station_name'=>'1','sn_type'=>'1','sn_no'=>'1','sample_num'=>'1','sample_name'=>'1','member_no'=>'1','member_name'=>'1','member_occupation'=>'1','channel_name'=>'1','channel_num'=>'1','listen_rate'=>'1','begin_time'=>'2017-3-20','end_time'=>'2017-3-28','member_age'=>'1','member_sex'=>'1','member_income'=>'1');


// $re = http_post($url,$data);
$re = $jssdk->httpGetAuthorize($url,$data);
var_dump($re);

