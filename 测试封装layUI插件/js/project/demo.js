//config的设置是全局的
layui.config({
    base: 'js/basic/' //假设这是你存放拓展模块的根目录
  });



layui.use(['bayax','jquery','base'], function () {

     
    // var layer = layui.layer;
    // var element = layui.element;
    // var laydate = layui.laydate;
    var $ = layui.jquery;
    var bayax = layui.bayax;
    var base = layui.base;
    // var a = new loadimg()
    var loadimg  = base.imgLoader;
    // console.log(JSON.stringify(new resLoader(),null,2))

    var loader = new loadimg({
        resources: [
            // 新增
            './image/bgnew.jpg',
            './image/clothes.png'
        ],
        onStart: function(total) {
            console.log('start:' + total);
        },
        onProgress: function(current, total) {
            console.log(current + '/' + total);
        },
        onComplete: function(total) {
           console.log('加载完成。。。。。。。。');
        }
    });


    loader.start();










    var time = bayax.format(new Date(),'yyyy-MM-dd');
    // console.log('查看时间:'+time);
    // console.log(JSON.stringify(bayax.dateData(),null,2))
    $('#btn').on('click',function(){
        base.goTop();
    })

    bayax.bayaxInit();

 


});