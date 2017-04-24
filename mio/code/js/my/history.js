$(function () {
    $('#container').highcharts({
        chart: {
            // zoomType: 'xy'
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        title: {
            text: '体征监测'
        },
        xAxis: [{
            categories: ['13:39:16', '13:39:17', '13:39:18', ' 13:39:19', ' 13:39:20', '13:39:21',
                         '13:39:22', '13:39:23', ' 13:39:24', '13:39:25', ' 13:39:26', '13:39:27',' 13:39:28',' 13:39:29',' 13:39:30'],
            crosshair: true,
            tickmarkPlacement: 'on'
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: '单位bpm',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                enabled: false,
                format: '{value} ',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '单位mg(μl)/(h·g)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} ',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            borderColor: '#7cb5ec',
            formatter: function () {
                var s = '<b>' + this.x + '</b>';
                // if(this.points[0].y > 60){
                //     s = '<b>' + this.x + '</b>'+ '<br/>'+this.points[0].series.name+ ': ' +'睡觉';
                // }else{
                //     s = '<b>' + this.x + '</b>'+ '<br/>'+this.points[0].series.name+ ': ' +'起床';
                // }
                var s = '<b>' + this.x + '</b>';
                console.log(this.points.length);
                if(this.points.length === 3){
                    s += '<br/>'+'<span style="color:#7cb5ec" >是否起床</span>'+ ': ' +'未起床';
                    s+= '<br/>' +'<span style="color:'+this.points[1].series.color+'" >'+this.points[1].series.name+ '</span>' + ': ' +  this.y + 'mg(μl)/(h·g)';
                    s+= '<br/>' +'<span style="color:'+this.points[2].series.color+'" >'+this.points[2].series.name+ '</span>' + ': ' +  this.y + 'bpm';
                }else{
                    s += '<br/>'+'<span style="color:#7cb5ec" >是否起床</span>'+ ': ' +'起床';
                    s+= '<br/>' +'<span style="color:'+this.points[0].series.color+'" >'+this.points[0].series.name+ '</span>' + ': ' +  this.y + 'mg(μl)/(h·g)';
                    s+= '<br/>' +'<span style="color:'+this.points[1].series.color+'" >'+this.points[1].series.name+ '</span>' + ': ' +  this.y + 'bpm';
                }
                // for(var i in this.points)
                return s;
            },
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            // x: 80,
            verticalAlign: 'top',
            // y: 0,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '是否起床',
            type: 'area',
            lineWidth: 0,
            marker: {
                enabled: false
            },
            yAxis: 1,
            data: [71.5, 71.5,  71.5, 71.5,71.5,71.5, 71.5,71.5, 71.5, null,  71.5,  71.5,  71.5,null, 71.5],
        }, {
            name: '呼吸',
            type: 'spline',
            yAxis: 2,
            data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
            marker: {
                enabled: true
            },
            dashStyle: 'shortdot',
        }, {
            name: '心跳',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
});
Date.prototype.format = function(format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
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
