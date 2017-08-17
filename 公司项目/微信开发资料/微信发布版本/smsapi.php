<?php
error_reporting(E_ALL^E_NOTICE);
date_default_timezone_set("PRC");
srand((double)microtime()*1000000); 
$random =rand(0,1000);
$phone=$_POST["phone"];
$passwordAgain=$_POST["passwordAgain"];
$smsapi= file_get_contents("http://v.juhe.cn/sms/send?mobile=".$phone."&tpl_id=10578&tpl_value=%23code%23%3d".$random."&key=4a9850f124a1add359a2d88d2dcaf347");
?>