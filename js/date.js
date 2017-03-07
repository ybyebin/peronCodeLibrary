//假如要兼容 IE6+，通常会这么写。
var dt = new Date();
var date = [
  [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')
].join(' ').replace(/(?=\b\d\b)/g, '0'); // 正则补零 (略微改动)

console.log(date); // => 2016-03-25 11:01:01

//时间日期格式化函数+调用
//new Date().format("yyyy-MM-dd hh:mm:ss")
Date.prototype.format = function(format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
};





//时间个性化输出
/* 1、< 60s, 显示为“刚刚”
    2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
    3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
    4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
    5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
    */
function timeFormat(time) {
  var date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 10,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;
  if (year < curYear) {
    timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
  } else {
    var pastTime = curDate - date,
      pastH = pastTime / 3600000;
    if (pastH > curHour) {
      timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
    } else if (pastH >= 1) {
      timeStr = '今天 ' + hour + ':' + minute + '分';
    } else {
      var pastM = curDate.getMinutes() - minute;
      if (pastM > 1) {
        timeStr = pastM + '分钟前';
      } else {
        timeStr = '刚刚';
      }
    }
  }
  return timeStr;
}



//假如是 IE9+ 或现代浏览器，那就方便多了。
var dt = new Date();
dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
// 修正时区偏移var date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
console.log(date); // => 2016-03-25 11:01:01