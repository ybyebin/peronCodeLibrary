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




// - 时间日期格式转换

Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
}
