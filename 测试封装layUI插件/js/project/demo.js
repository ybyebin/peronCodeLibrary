//config的设置是全局的
layui.config({
    base: 'js/basic/' //假设这是你存放拓展模块的根目录
  });



layui.use(['bayax','jquery'], function () {
    // var layer = layui.layer;
    // var element = layui.element;
    // var laydate = layui.laydate;
    var $ = layui.jquery;
    var bayax = layui.bayax;
    var time = bayax.format(new Date(),'yyyy-MM-dd');
    console.log('查看时间:'+time);
    // console.log(JSON.stringify(bayax.dateData(),null,2))
    $('#btn').on('click',function(){
        bayax.goTop();
    })

 


});