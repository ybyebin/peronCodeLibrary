layui.use(['layer', 'element', 'laydate'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;


    var startime = laydate.render({
        elem: '#startime',
        theme: 'balck',
        showBottom: false,
        done: function(value, date, endDate) {
            warnVue.btnSelectTitle = '自定义';
            warnVue.startime = value;
            $('#endtime').focus();
            console.log('查看时间:' + warnVue.startime);

            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });
    var endtime = laydate.render({
        elem: '#endtime',
        showBottom: false,
        done: function(value, date, endDate) {
            var st = warnVue.startime;
            var ed = warnVue.endtime = value;
            warnVue.btnSelectTitle = '自定义';
            console.log('查看时间：' + warnVue.endtime);
            if (st != '' && ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {

                    if (compareYear(new Date(st), 10) <= value) {
                        layer.msg("超过统计时间限制");
                    } else {
                        warnVue.getWarnLog(1);
                    }
                } else {
                    warnVue.endtime = '';
                    layer.msg("结束时间需晚于开始时间");
                }
            }
        }
    });



    var warnVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            loadingShow: false,
        },
        mounted: function() {
            var _this = this;

            this.$nextTick(function() {
                bayaxInit();

            });
        },
        methods: {

        }
    });

});