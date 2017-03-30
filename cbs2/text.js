 
 $('#wraplist').on('click','li a',function(){
  console.log($(this).data('status'))
  if ($(this).data('status') == 'close') {
    $('.list-a-click').data('status','close');
    $(this).data('status','open');
    $('.sub-views').hide(100);
    $($(this).data('target')).show(100);
  }
  
})



 /**
  * [展示数据 ]
  * @param  {[array]} datagroups [数据]
  * @return {[type]}            [description]
  */
 function showAllDeviceData(datagroups) {
   var thisUl = $("#main-menu-wrapper .wraplist");
   if (datagroups.length !== 0) {
     var firstViewIsNull = true; //标志  第一组 画面是否为空   
     var imageclass;
     var thisli;
     var thispa;

     if (datagroups[0].view.length == 0) {
       firstViewIsNull = false;
     }

     for (var i in datagroups) {
       switch (datagroups[i].groupName) {
         case "空调机组":
           addSlide(datagroups, i, 'kongtiao');
           break;
         case "视频监控":
           addSlide(datagroups, i, 'vedio');
           break;
         case "照明":
           addSlide(datagroups, i, 'zhaoming');
           break;
         case "停车场":
           addSlide(datagroups, i, 'tingche');
           break;
         case "风机末端":
           addSlide(datagroups, i, 'fengji');
           break;
         default:
           addSlide(datagroups, i, 'custom');
           break;
       }
     }
   }
 }
 // 添加侧边栏
 function addSlide(datagroups, i, str) {
   var ul_son = $('<ul id="demo-li'+i+'" class="sub-views" ></ul>');
   for (var key in datagroups[i].view) {
    ul_son.append('<li><a data-viewid="' + datagroups[i].view[key].viewId + '">' + datagroups[i].view[key].viewName + '</a></li>')
     // ul_son += '<li><a data-viewid="' + datagroups[i].view[key].viewId + '">' + datagroups[i].view[key].viewName + '</a></li>'
   }
   var li = '<li class="device-li">' + '<a class="list-a-click" data-target="#demo-li' + i + '" data-status="close"><i class="' + str + '"></i><span>' + datagroups[i].groupName + '</span></a></li>';
   $('#wraplist').append(li);
   $('#main-menu-wrapper').append(ul_son);
 }

 $(function(){
  var data = {
     "success": true,
     "data": [{
       "groupId": "42",
       "groupName": "哼哈",
       "view": [{
         "viewId": "4",
         "viewName": "哼哈"
       }, {
         "viewId": "6",
         "viewName": "123"
       }, {
         "viewId": "7",
         "viewName": "测试"
       }, {
         "viewId": "8",
         "viewName": "多大点"
       }, {
         "viewId": "9",
         "viewName": "321"
       }, {
         "viewId": "10",
         "viewName": "新建测试"
       }, {
         "viewId": "11",
         "viewName": "2017测试"
       }, {
         "viewId": "13",
         "viewName": "32123"
       }]
     }, {
       "groupId": "45",
       "groupName": "空调机组",
       "view": [
       {
         "viewId": "10",
         "viewName": "新建测试"
       }, {
         "viewId": "11",
         "viewName": "2017测试"
       }, {
         "viewId": "13",
         "viewName": "32123"
       }]
     }, {
       "groupId": "45",
       "groupName": "空调机组",
       "view": []
     }, {
       "groupId": "49",
       "groupName": "停车场",
       "view": []
     }, {
       "groupId": "57",
       "groupName": "视频监控",
       "view": [{
         "viewId": "12",
         "viewName": "视频测试"
       }]
     }]
   }
    // showAllDeviceData(data.data)
 })
 
  

$('#btn').on('click',function(){
  if ($('#slider').hasClass('closed')) {
    $('#slider').removeClass('closed')
  }else{
    $('#slider').addClass('closed')
  }
});


