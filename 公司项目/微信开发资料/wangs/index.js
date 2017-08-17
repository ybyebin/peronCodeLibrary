$('#btn').click(function() {

    var qsData = {
        province: '123',
        city: '123',
        county: '123',
        station_no: '123',
        station_name: '123',
        sn_type: '123',
        sn_no: '123',
        sample_num: '123',
        sample_name: '123',
        member_no: '123',
        member_name: '123',
        member_occupation: '123',
        channel_name: '123',
        channel_num: '123',
        listen_rate: '123',
        begin_time: '123',
        end_time: '123',
        member_age: '123',
        member_sex: '123',
        member_income: '123',

    };
    $.ajax({
        url: 'http://back.ctcgsw.com/index.php?s=Home/Listenrate/submit',
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: qsData,
        timeout: 5000,
        success: function(json) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数

        },

        error: function(xhr) {
            alert(JSON.stringify(xhr));
        }
    });
})