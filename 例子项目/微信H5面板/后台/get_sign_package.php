<?php
    date_default_timezone_set('PRC');
    require_once "jssdk.php";
    //$jssdk = new JSSDK("yourAppID", "yourAppSecret");
    $jssdk = new JSSDK("wx7d0869d5eea0847b", "cac600bc8c4404063bff67606e631971");
    //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1e9a89abda38241c&secret=16ac592f16cf007cece9eaea53177d24
    $signPackage = $jssdk->GetSignPackage();

    echo json_decode($signPackage);
?>