/**
 
 @Name : layui.laypage 分页组件
 @Author：贤心
 @License：MIT
 
 */

layui.define(['jquery'],function (exports) {
    "use strict";
    var $ = layui.jquery;
    // var doc = document;
    // var id = 'getElementById';
    // var tag = 'getElementsByTagName';

    var MOD_NAME = 'bayax';


   
    //比较现在时间 和指定时间 并返回天数
    function compareDate(type, counts) {
        var mydate;
        var nowdate = new Date();

        if (type == 1) {
            //现在时间减去天数
            mydate = CutDays(parseDates(FormatDate(nowdate, "yyyy-MM-dd")), counts);
            return FormatDate(mydate, "yyyy-MM-dd");

        } else if (type == 2) {
            //现在时间减去月数   
            mydate = CutMOnth(parseDates(FormatDate(nowdate, "yyyy-MM-dd")), counts);
            return FormatDate(mydate, "MM");

        } else { //现在时间减去月数
            mydate = CutMOnth(parseDates(FormatDate(nowdate, "yyyy-MM-dd")), counts);
            return FormatDate(mydate, "yyyy-MM-dd");
        }

    }

    //替换字符串  
    function Replace(str, from, to) {
        return str.split(from).join(to);
    }


    // 日期类型格式成指定的字符串
    function FormatDate(date, format) {
        format = Replace(format, "yyyy", date.getFullYear());
        format = Replace(format, "MM", GetFullMonth(date));
        format = Replace(format, "dd", GetFullDate(date));
        format = Replace(format, "hh", GetFullHours(date));
        return format;
    }

    //返回月份(两位数)  
    function GetFullMonth(date) {
        var v = date.getMonth() + 1;
        if (v > 9) return v.toString();
        return "0" + v;
    }

    //返回日(两位数)  
    function GetFullDate(date) {
        var v = date.getDate();
        if (v > 9) return v.toString();
        return "0" + v;
    }

    //返回月份(两位数)  
    function GetFullHours(date) {
        var v = date.getHours();
        if (v > 9) return v.toString();
        return "0" + v;
    }

    //加减天  
    function CutDays(date, value, type) {
        if (type) {
            date.setDate(date.getDate() + value);
        } else {
            date.setDate(date.getDate() - value);
        }

        return date;
    }

    //减月
    function CutMOnth(date, value) {
        date.setMonth((date.getMonth() - value + 1), 1);
        return date;
    }

    // 获取指定月的最后一天(时间选择框)
    function getCurrentMonthLastForSelect(dates) {
        var date = new Date(dates);
        // var currentMonth = month - 1;
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return FormatDate(new Date(nextMonthFirstDay - oneDay), "yyyy-MM-dd");
    }

    //js日期字符串转换成日期类型
    function parseDates(dateStr) {
        return new Date(Replace(dateStr, "-", "/"));
    }



    var bayax = {

        /************************本项目使用**********************************/

        base_api_url: "/api/",
        ws_socket: '', //mqtt 地址


        bayaxInit:function(){
            $('body').on('click', function() {
                $('.bayax-select-click').removeClass('bayax-select-clicked');
            });
            $('body').on('click','.bayax-select-title', function(e) {
                var oEvent = e || event;
                oEvent.stopPropagation(); //阻止事件冒泡
                var flag = true;
                var parents = $(this).parent();
               
                if (!parents.hasClass('bayax-select-clicked')) {
                    flag = false;
                } 
                $('.bayax-select-click').removeClass('bayax-select-clicked');
        
                if (!flag) {
                    parents.addClass('bayax-select-clicked');
                } 
            });
        
            $('.bayax-division-icon').on('click', function(e) {
                var oEvent = e || event;
                oEvent.stopPropagation(); //阻止事件冒泡
                $('.bayax-select-ul').hide();
                var str = '.' + $(this).data('for');
                $(str).toggle();
        
            });
        },

        // 判断输入字符串是否合法
        strRegeMatch: function (str) {
            var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
            if (pattern.test(val)) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * 日期选择 (生成数据)
         * 
         * dic.name 时间名称 参数：【'今天','昨天','最近3天','最近7天','最近30天','?月','自定义'】;
         * dic.type 时间对比类型 参数：【'true相对时间','false绝对时间'】;  作用：用于历史数据对比 
         * dic.unit 时间对比单位  参数：【'天','个3天','个7天','个30天','个月',''】; 作用：用于历史数据对比 
         * dic.num  时间名称数字标志 ；作用：用于历史数据对比,计算时间
         * dic.chart_time 能耗图表可选日期类型 参数：【'0(hour)','1(hour,day)','2(day)','3(day,month)','4(自定义day)'】 作用:用于设置图表可选日期类型
         * dic.start_time 开始时间值;
         * dic.end_time 结束时间值;
         * @returns 
        */
        dateData: function () {
            var dateArr = [],
                lengths = 9;

            var nowdate = new Date();
            var nowMonth = Number(nowdate.getMonth() + 1);
            for (var i = 0; i < lengths; i++) {


                var dic = { type: true }; //true(相对时间) fasle(绝对时间)
                switch (i) {
                    case 0:
                        var time = FormatDate(nowdate, "yyyy-MM-dd");
                        dic.name = '今天';
                        dic.unit = '天';
                        dic.num = 0;
                        dic.chart_time = 0;
                        dic.start_time = time;
                        dic.end_time = time;

                        break;
                    case 1:
                        var time = compareDate(1, 1);
                        dic.name = '昨天';
                        dic.unit = '天';
                        dic.num = 1;
                        dic.chart_time = 0;
                        dic.start_time = time;
                        dic.end_time = time;
                        break;
                    case 2:
                        dic.name = '最近3天';
                        dic.unit = '个3天';
                        dic.num = 2;
                        dic.chart_time = 1;
                        dic.start_time = compareDate(1, 2);
                        dic.end_time = FormatDate(nowdate, "yyyy-MM-dd");
                        break;
                    case 3:
                        dic.name = '最近7天';
                        dic.unit = '个7天';
                        dic.num = 3;
                        dic.chart_time = 1;
                        dic.start_time = compareDate(1, 6);
                        dic.end_time = FormatDate(nowdate, "yyyy-MM-dd");
                        break;
                    case 4:
                        dic.name = '最近30天';
                        dic.unit = '个30天';
                        dic.num = 4;
                        dic.chart_time = 2;
                        dic.start_time = compareDate(1, 29);
                        dic.end_time = FormatDate(nowdate, "yyyy-MM-dd");
                        break;
                    case 5:
                        dic.name = compareDate(2, 2) + "月";
                        dic.unit = '个月';
                        dic.num = 5;
                        dic.chart_time = 3;
                        if (nowMonth === 1) {
                            dic.start_time = (nowdate.getFullYear() - 1) + '-' + compareDate(2, 2) + '-01';
                            dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                        } else {
                            dic.start_time = nowdate.getFullYear() + '-' + compareDate(2, 2) + '-01';
                            dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                        }
                        break;
                    case 6:
                        dic.name = compareDate(2, 3) + "月";
                        dic.unit = '个月';
                        dic.num = 6;
                        dic.chart_time = 3;
                        if (nowMonth === 1 || nowMonth === 2) {

                            dic.start_time = (nowdate.getFullYear() - 1) + '-' + compareDate(2, 3) + '-01';
                            dic.end_time = getCurrentMonthLastForSelect(dic.start_time);

                        } else {
                            dic.start_time = nowdate.getFullYear() + '-' + compareDate(2, 3) + '-01';
                            dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                        }
                        break;
                    case 7:
                        dic.name = compareDate(2, 4) + "月";
                        dic.unit = '个月';
                        dic.num = 7;
                        dic.chart_time = 3;
                        if (nowMonth === 1 || nowMonth === 2 || nowMonth === 3) {

                            dic.start_time = (nowdate.getFullYear() - 1) + '-' + compareDate(2, 4) + '-01';
                            dic.end_time = getCurrentMonthLastForSelect(dic.start_time);

                        } else {
                            dic.start_time = nowdate.getFullYear() + '-' + compareDate(2, 4) + '-01';
                            dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                        }
                        break;
                    default:
                        dic.name = '自定义';
                        dic.unit = '';
                        dic.num = 8;
                        dic.chart_time = 2;
                        dic.start_time = '';
                        dic.end_time = '';
                        dic.type = false;
                        break;
                }
                dateArr.push(dic);

            }
            return dateArr;
        },

        publicAjaxError:function(data){
            layer.msg(data.error_message);
            if (Number(data.status) === 401) {
                window.location.href = 'login.html';
            }
        },







        /**********************************公共******************************************/

        /**
        * [时间格式化函数]
        * @param  {[obj]} date [日期对象]
        * @param  {[string]} format ["yyyy-MM-dd hh:mm:ss"]
        * @return {[string]}        [返回格式化后的字符串]
        * 
        */
        format: function (date, format) {
            var args = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var i in args) {
                var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
            }
            return format;
        },

        // 深拷贝
        deepClone: function (obj) {
            if (obj == null || typeof obj !== 'object') {
                return obj;
            }
            switch (Object.prototype.toString.call(obj)) {
                case '[object Array]': {
                    const result = new Array(obj.length);
                    for (let i = 0; i < result.length; ++i) {
                        result[i] = deepClone(obj[i]);
                    }
                    return result;
                }

                case '[object Error]': {
                    const result = new obj.constructor(obj.message);
                    result.stack = obj.stack; // hack...
                    return result;
                }

                case '[object Date]':
                case '[object RegExp]':
                case '[object Int8Array]':
                case '[object Uint8Array]':
                case '[object Uint8ClampedArray]':
                case '[object Int16Array]':
                case '[object Uint16Array]':
                case '[object Int32Array]':
                case '[object Uint32Array]':
                case '[object Float32Array]':
                case '[object Float64Array]':
                case '[object Map]':
                case '[object Set]':
                    return new obj.constructor(obj);

                case '[object Object]': {
                    const keys = Object.keys(obj);
                    const result = {};
                    for (let i = 0; i < keys.length; ++i) {
                        const key = keys[i];
                        result[key] = deepClone(obj[key]);
                    }
                    return result;
                }

                default: {
                    throw new Error("Unable to copy obj! Its type isn't supported.");
                }
            }
        },

        // 回到顶部
        goTop: function (duration) {
            var durations = duration || 300;
            var y1 = 0;
            var y2 = 0;
            var y3 = 0;
            if (document.documentElement) {
                y1 = document.documentElement.scrollTop || 0;
            }
            if (document.body) {
                y2 = document.body.scrollTop || 0;
            }
            var y3 = window.scrollY || 0;
            // 滚动条到页面顶部的垂直距离 
            var y = Math.max(y1, Math.max(y2, y3));
            for (var i = 60; i >= 0; i--) {
                setTimeout(function (i) {
                    return function () {
                        window.scrollTo(0, y * i / 60);
                    };
                }(i), durations * (1 - i / 60));
            }
        },

        /**
        * [时间格式化函数]
        * @param  {[obj]} elem [要添加的 js对象]
        * @param  {[string]} even ['click','input'。。。。。。]
        * @param  {[]} fn [执行的方法]
        * 
        */
        on: function (elem, even, fn) {
            elem.attachEvent ? elem.attachEvent('on' + even, function (e) { //for ie
                e.target = e.srcElement;
                fn.call(elem, e);
            }) : elem.addEventListener(even, fn, false);
            return this;
        }

    }





    exports(MOD_NAME, bayax);
});