var defaultData = [{
    text: '数据监控',
    href: 'data_monitoring.html',
}, {
    text: '点设定',
    href: 'point_set.html',
}, {
    text: 'Mewtocol通信设定',
    href: 'mewtocol_communication_set.html',
}, {
    text: '服务器设定',
    href: 'server_set.html',
}, {
    text: '网络设定',
    href: 'network_set.html',
}, {
    text: '系统日志',
    href: 'system_log.html',
}, {
    text: '系统管理',
    href: 'system_management.html',
}];


// $(function() {
    for (var key in defaultData) {
        var li = '<li class="list-group-item" style="text-align:center"><a href="' + defaultData[key].href + '">' + defaultData[key].text + '</a></li>'
        $('.list-group').append(li);
    }
// })


/**
 * [选择框初始化]
 * @return {[type]} [description]
 */
function icheckInitialize() {
    $(".ckss").iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%'
    });
}