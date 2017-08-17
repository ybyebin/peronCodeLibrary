<?php
$ACCESS_TOKEN = "etVpE8OwF0cH5Y5V_Zm4YXPussogWKFByA-YerC1P4SfoqQaLgxZsyJoeARZgENzwyYi0k7k2MH4DGwxx6W3Y-FayyxzJtnUMFZ4vQYzJ-k3mwUk5I2d82ilz2V5ts7oNKLjAAACZA";  
  
/* 这里是视图类型的自定义菜单反馈条目 
    { 
        "type": "view", 
        "name": "关于我们", 
        "url": "http://blog.csdn.net/rk2900" 
    } 
 
*/  
  
  
$data = '{  
    "button":  
    [  
        {     
            "type": "view", 
            "name": "wifi配置",  
            "url": "http://demo.bayax.cn/airkiss.php",
            "sub_button":  
            [  
                // {  
                //     "type": "click",  
                //     "name": "绑定账号",  
                //     "key": "BIND_DEVICE"  
                // },  
                // {  
                //     "type": "click",  
                //     "name": "绑定状态",  
                //     "key": "BIND_INFO"  
                // },  
                // {  
                //     "type": "click",  
                //     "name": "解除绑定",  
                //     "key": "BIND_CANCEL"  
                // }  
            ]  
        },  
        {
            "type": "view", 
            "name": "个人信息",  
            "url": "http://demo.bayax.cn/code.php",
            "sub_button":  
            [  
                // {  
                //     "type": "click",  
                //     "name": "删除上一张",  
                //     "key": "DELETE_LAST"  
                // },  
                // {  
                //     "type": "click",  
                //     "name": "浏览相册",  
                //     "key": "BROWSE"  
                // }  
            ]  
        },  
        {  
            "type": "view", 
            "name": "关于柏谊",  
            "url": "http://www.bayax.cn",
            "sub_button":   
            [  
                // {  
                //     "type": "click",  
                //     "name": "客服电话",  
                //     "key": "PHONE"  
                // },  
                // {  
                //     "type": "click",  
                //     "name": "购买方式",  
                //     "key": "BUY"  
                // }  
            ]  
        } 
        // { 
        //     "type": "view", 
        //     "name": "wifi配置", 
        //     "url": "http://demo.bayax.cn/airkiss.php",
        //     "sub_button": [ ]
        // },
        // { 
        //     "type": "view", 
        //     "name": "个人信息", 
        //     "url": "http://demo.bayax.cn/code.php",
        //     "sub_button": [ ]
        // },
        // { 
        //     "type": "view", 
        //     "name": "关于柏谊", 
        //     "url": "http://www.bayax.cn",
        //     "sub_button": [ ]
        // }
    ]  
 }';  
 echo $data;  
   //var_dump($data);
 $ch = curl_init();   
 curl_setopt($ch, CURLOPT_URL, "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={$ACCESS_TOKEN}");   
 curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");  
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);   
 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);  
 curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');  
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);  
 curl_setopt($ch, CURLOPT_AUTOREFERER, 1);   
 curl_setopt($ch, CURLOPT_POSTFIELDS, $data);  
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);   
 echo $ch;  
 $tmpInfo = curl_exec($ch);   
 if (curl_errno($ch))   
 {    
    echo 'Errno'.curl_error($ch);  
 }  
   //var_dump($tmpInfo);
 curl_close($ch);   
 echo $tmpInfo;  


 ?> 