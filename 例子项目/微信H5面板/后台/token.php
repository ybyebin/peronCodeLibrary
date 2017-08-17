<?php
/**
  * wechat php test
  */
//define your token
error_reporting(E_ALL^E_NOTICE);
date_default_timezone_set("PRC");
define("TOKEN", "bayaxdemo");
$wechatObj = new wechatCallbackapiTest();
$wechatObj->
valid();
class wechatCallbackapiTest
{
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        //valid signature , option
        if($this->checkSignature()){
            echo $echoStr;
            exit;
        }
    }
    public function responseMsg()
    {
        //get post data, May be due to the different environments
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        //extract post data
        if (!empty($postStr)){
                
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $postObj->FromUserName;
            $toUsername = $postObj->ToUserName;
            $keyword = trim($postObj->Content);
            $time = time();
            $textTpl = "
                            <xml>
                                <ToUserName>
                                    <![CDATA[%s]]> </ToUserName>
                                <FromUserName>
                                    <![CDATA[%s]]> </FromUserName>
                                <CreateTime>%s</CreateTime>
                                <MsgType>
                                    <![CDATA[%s]]> </MsgType>
                                <Content>
                                    <![CDATA[%s]]> </Content>
                                <FuncFlag>0</FuncFlag>
                            </xml>
                            ";             
            if(!empty( $keyword )){
                $msgType = "text";
                $contentStr = "Welcome to wechat world!";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else{
                echo "Input something...";
            }
        }else {
            echo "";
            exit;
        }
    }
    
    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
       
        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );
        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }
}

//接入时验证接口
$echostr = $_GET ['echostr'];
if($echostr) {
    echo $echostr;
    exit(0);
}
 
//获取POST数据
function getPostData() {
    $data = $GLOBALS['HTTP_RAW_POST_DATA'];
    return        $data;
}
$PostData = getPostData();
 
//验错
if(!$PostData){
    echo_server_log("wrong input! PostData is NULL");
    echo "wrong input!";
    exit(0);
}
 
//装入XML
$xmlObj = simplexml_load_string($PostData, 'SimpleXMLElement', LIBXML_NOCDATA);
 
//验错
if(!$xmlObj) {
    echo_server_log("wrong input! xmlObj is NULL\n");
    echo "wrong input!";
    exit(0);
}
 
//准备XML
$fromUserName = $xmlObj->FromUserName;
$toUserName = $xmlObj->ToUserName;
$msgType = $xmlObj->MsgType;
 
 
if($msgType == 'voice') {//判断是否为语音
    $content = $xmlObj->Recognition;
}elseif($msgType == 'text'){
    $content = $xmlObj->Content;
}else{
    $retMsg = '只支持文本和语音消息';
}
 
if (strstr($content, "温度")) {
    $con = mysql_connect("localhost","root","360");
    mysql_select_db("openid", $con);//修改数据库名
    $result =mysql_query("select mechineid from tbl_user where openid='".$fromUserName."'"); 
    $row = mysql_fetch_array($result);
    $mechineid = $row['mechineid'];
    if(empty($mechineid)){
        $retMsg = "您好,您尚未绑定makerwater设备，请您点击下方设备绑定后进行查询，谢谢您支持科佳智能创新！";
    }else{
        $result =mysql_query("select data from tbl_info where mechineid='".$mechineid."'"); 
        $row = mysql_fetch_array($result);
        $data = $row['data'];
        $retMsg = "您好："."\n"."您水杯的温度为".$row['data']."℃";
    }
}else if (strstr($content, "开灯")) {
        $con = mysql_connect("localhost","root","360");
 
 
        $dati = date("h:i:sa");
        mysql_select_db("openid", $con);//修改数据库名
 
        $sql ="UPDATE switch SET timestamp='$dati',state = '1'
        WHERE ID = '1'";//修改开关状态值
 
        if(!mysql_query($sql,$con)){
            die('Error: ' . mysql_error());
        }else{
                mysql_close($con);
                $retMsg = "好的主人";
        }
}else if (strstr($content, "关灯")) {
        $con = mysql_connect("localhost","root","360");
 
 
        $dati = date("h:i:sa");
        mysql_select_db("openid", $con);//修改数据库名
 
        $sql ="UPDATE switch SET timestamp='$dati',state = '0'
        WHERE ID = '1'";//修改开关状态值
 
        if(!mysql_query($sql,$con)){
            die('Error: ' . mysql_error());
        }else{
                mysql_close($con);
                $retMsg = "好的主人";
        }        
}else if (strstr($content,"朱艳丽")){
    $retMsg = "是猪";
}else{
        $retMsg = "暂时不支持该命令";
}
 
//装备XML
$retTmp = "
<xml>
    <ToUserName>
        <![CDATA[%s]]> </ToUserName>
    <FromUserName>
        <![CDATA[%s]]> </FromUserName>
    <CreateTime>%s</CreateTime>
    <MsgType>
        <![CDATA[text]]> </MsgType>
    <Content>
        <![CDATA[%s]]> </Content>
    <FuncFlag>0</FuncFlag>
</xml>
";
$resultStr = sprintf($retTmp, $fromUserName, $toUserName, time(), $retMsg);
 
//反馈到微信服务器
echo $resultStr;
?>