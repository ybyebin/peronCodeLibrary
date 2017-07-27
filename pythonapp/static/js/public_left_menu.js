function addClass(ele, cls) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
}

var defaultData = [{
    text: '数据监控',
    href: 'data_monitoring.html',
    ids:'datablue'
}, {
    text: '点设定',
    href: 'point_set.html',
    ids:'pointblue'
}, {
    text: 'Mewtocol通信设定',
    href: 'mewtocol_communication_set.html',
    ids:'mewtocolblue'
}, {
    text: '服务器设定',
    href: 'server_set.html',
    ids:'serverblue'
}, {
    text: '网络设定',
    href: 'network_set.html',
    ids:'networkblue'
}, {
    text: '系统日志',
    href: 'system_log.html',
    ids:'systemlogblue'
}, {
    text: '系统管理',
    href: 'system_management.html',
    ids:'systemblue'
}];


var lis = '';
for (var key in defaultData) {
    lis += '<li id="'+defaultData[key].ids+'" class="list-group-item" style="text-align:center"><a href="' + defaultData[key].href + '">' + defaultData[key].text + '</a></li>'   
}
document.getElementById('list-group').insertAdjacentHTML('afterbegin', lis);


