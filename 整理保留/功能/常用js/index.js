// - 得到地理位置
function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(p) {
        callback(p.coords.latitude, p.coords.longitude);
      },
      function(e) {
        var msg = e.code + "\n" + e.message;
      }
    );
  }
}

// - 从全局捕获错误
window.onerror = function (errMsg, scriptURI, lineNumber, columnNumber, errorObj) {
    setTimeout(function () {
        var rst = {
            "错误信息：": errMsg,
            "出错文件：": scriptURI,
            "出错行号：": lineNumber,
            "出错列号：": columnNumber,
            "错误详情：": errorObj
        };
        alert(JSON.stringify(rst, null, 10));
    });
};

// - [如何通过 js 修改微信浏览器的title?](https://www.zhihu.com/question/26228251/answer/32405529)

var $body = $('body');
document.title = 'title'; // hack在微信等webview中无法修改document.title的情况    
var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function(){ 
    setTimeout(function(){ 
        $iframe.off('load').remove() 
    }, 0) 
}).appendTo($body)



// - 字符串长度截取
function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/，
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                   icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
            } else {
            break;
        }
    }
    return strre + "..."
}


// - 清除空格
String.prototype.trim = function() {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1")
}


// - 清除左空格/右空格
function ltrim(s){ return s.replace( /^(\s*|　*)/, ""); } 
function rtrim(s){ return s.replace( /(\s*|　*)$/, ""); }

// - 判断是否以某个字符串开头

String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
}

// - 判断是否以某个字符串结束  
String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
}


// - 判断是否为数字类型 
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}

// - 设置cookie值
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}

// - 获取cookie值
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}


// - 加载样式文件表 
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}



// - 返回脚本内容
function evalscript(s) {
    if(s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while(arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if(arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}

// - 清除脚本内容
function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

// - 动态加载脚本文件
function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if(!reload && in_array(id, evalscripts)) return;
    if(reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
 
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if(src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
             };
             scriptNode.onreadystatechange = function () {
                 if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
             };
        } else if(text){
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch(e) {}
}


// - 检验URL链接是否有效 
function getUrlState(URL){ 
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp"); 
    xmlhttp.Open("GET",URL, false);  
    try{  
            xmlhttp.Send(); 
    }catch(e){
    }finally{ 
        var result = xmlhttp.responseText; 
        if(result){
            if(xmlhttp.Status==200){ 
                return(true); 
             }else{ 
                   return(false); 
             } 
         }else{ 
             return(false); 
         } 
    }
}


// - 获取当前路径
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}else {
    currentPageUrl = this.href.toString().toLowerCase();
}

// - 获取页面高度
function getPageHeight(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
                    ? a
                    : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}

// - 获取页面可视宽度
function getPageViewWidth(){
    var d = document, a = d.compatMode == "BackCompat" ? 
                 d.body: d.documentElement;
    return a.clientWidth;
}

// - 获取页面宽度
function getPageWidth(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"?
                a: g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

// - 随机数时间戳
function uniqueId(){
    var a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}


// - 获得URL中GET参数值
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get(){ 
    querystr = window.location.href.split("?")
    if(querystr[1]){
        GETs = querystr[1].split("&");
        GET = [];
        for(i=0;i<GETs.length;i++){
              tmp_arr = GETs.split("=")
              key=tmp_arr[0]
              GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
}

// - 数组去重
String.prototype.unique=function(){
    var x=this.split(/[\r\n]+/);
    var y='';
    for(var i=0;i<x.length;i++){
        if(!new RegExp("^"+x.replace(/([^\w])/ig,"\\$1")+"$","igm").test(y)){
            y+=x+"\r\n"
        }
    }
    return y;
};
// 数组去重完整版
Array.prototype.unique = function(){
    var json = {}, newArr = [], len = this.length;
    for(var i = 0; i < len; i++){
        var temp = Object.prototype.toString.call(this[i]);
        if(typeof json[this[i]] == "undefined"){
            json[this[i]] = {};
            json[this[i]][temp] = 1;
            newArr.push(this[i]);
        }else if(typeof json[this[i]][temp] == "undefined"){
            json[this[i]][temp] = 1;
            newArr.push(this[i]);
        }else{
            json[this[i]][temp]++;
        }
    }
    console.log(json);
    return newArr;
}


// - 按字典顺序，对每行进行数组排序
function SetSort(){
    var text=K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序
    var test=K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序
    K1.value=K1.value!=text?text:test;
}

// - 字符串反序输出
function IsReverse(text){
    return text.split('').reverse().join('');
}


// - 金额大写转换函数
function transform(tranvalue) {
    try {
        var i = 1;
        var dw2 = new Array("", "万", "亿"); //大单位
        var dw1 = new Array("拾", "佰", "仟"); //小单位
        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
        //以下是小写转换成大写显示在合计大写的文本框中     
        //分离整数与小数
        var source = splits(tranvalue);
        var num = source[0];
        var dig = source[1];
        //转换整数部分
        var k1 = 0; //计小单位
        var k2 = 0; //计大单位
        var sum = 0;
        var str = "";
        var len = source[0].length; //整数的长度
        for (i = 1; i <= len; i++) {
              var n = source[0].charAt(len - i); //取得某个位数上的数字
              var bn = 0;
              if (len - i - 1 >= 0) {
                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
              }
              sum = sum + Number(n);
              if (sum != 0) {
                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
                if (n == '0') sum = 0;
              }
              if (len - i - 1 >= 0) { //在数字范围内
                if (k1 != 3) { //加小单位
                      if (bn != 0) {
                        str = dw1[k1].concat(str);
                      }
                      k1++;
                } else { //不加小单位，加大单位
                      k1 = 0;
                      var temp = str.charAt(0);
                      if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
                      str = str.substr(1, str.length - 1);
                      str = dw2[k2].concat(str);
                      sum = 0;
                }
              }
              if (k1 == 3){ //小单位到千则大单位进一
                k2++;
              }
        }
        //转换小数部分
        var strdig = "";
        if (dig != "") {
              var n = dig.charAt(0);
              if (n != 0) {
                strdig += dw[Number(n)] + "角"; //加数字
              }
              var n = dig.charAt(1);
              if (n != 0) {
                strdig += dw[Number(n)] + "分"; //加数字
              }
        }
        str += "元" + strdig;
    } catch(e) {
        return "0元";
    }
    return str;
}
//拆分整数与小数
function splits(tranvalue) {
    var value = new Array('', '');
    temp = tranvalue.split(".");
    for (var i = 0; i < temp.length; i++) {
        value = temp;
    }
    return value;
}



// ###常用的js正则表达式

//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;   
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
或：
// ^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 

//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
// < (\S*?)[^>]*>.*?|< .*? />;
// 
//sql 语句
^(select|drop|delete|create|update|insert).*$
//提取信息中的网络链接
// (h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?; 
//提取信息中的邮件地址
\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
//提取信息中的图片链接
// (s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的 IP 地址
(\d+)\.(\d+)\.(\d+)\.(\d+)
//取信息中的中国手机号码
(86)*0*13\d{9} 
//提取信息中的中国邮政编码
[1-9]{1}(\d+){5} 
//提取信息中的浮点数（即小数）
(-?\d*)\.?\d+ 
//提取信息中的任何数字
(-?\d*)(\.\d+)?
//电话区号
^0\d{2,3}$
//腾讯 QQ 号
^[1-9]*[1-9][0-9]*$ 
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
//中文、英文、数字及下划线
^[\u4e00-\u9fa5_a-zA-Z0-9]+$
