(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(root 即 window)
        root.resLoader = factory(root);
    }
}(this, function () {
    var isFunc = function(f){
        return typeof f === 'function';
    }
    //构造器函数
    function resLoader(config){
        this.option = {
            resourceType : 'image', //资源类型，默认为图片
            baseUrl : './', //基准url
            resources : [], //资源路径数组
            onStart : null, //加载开始回调函数，传入参数total
            onProgress : null, //正在加载回调函数，传入参数currentIndex, total
            onComplete : null //加载完毕回调函数，传入参数total
        }
        if(config){
            for(i in config){
                this.option[i] = config[i];
            }
        }
        else{
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    };

    resLoader.prototype.start = function(){
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for(var i=0,l=this.option.resources.length; i<l; i++){
            var r = this.option.resources[i], url = '';
            if(r.indexOf('http://')===0 || r.indexOf('https://')===0){
                url = r;
            }
            else{
                url = baseUrl + r;
            }

            var image = new Image();
            image.onload = function(){_this.loaded();};
            image.onerror = function(){_this.loaded();};
            image.src = url;
        }
        if(isFunc(this.option.onStart)){
            this.option.onStart(this.total);
        }
    }

    resLoader.prototype.loaded = function(){
        if(isFunc(this.option.onProgress)){
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if(this.currentIndex===this.total){
            if(isFunc(this.option.onComplete)){
                this.option.onComplete(this.total);
            }
        }
    }

    //暴露公共方法
    return resLoader;
}));



var loader = new resLoader({
	resources : [
		'image/startbg.jpg',
		'image/img.png',
		'image/lifu.png',
		'image/mrrs.png',
		'image/hzbj.jpg',
		'image/textimg.png',
        'image/cpbg.jpg',   
        'image/NIKKI.png',
        'image/person.png',
	],
	onStart : function(total){
		console.log('start:'+total);
	},
	onProgress : function(current, total){
		console.log(current+'/'+total);
		var percent = current/total*100;
		$('.progressbar').css('width', percent+'%');
		// $('.progresstext .current').text(current);
		// $('.progresstext .total').text(total);
	},
	onComplete : function(total){
        $('.sec-start').addClass('sec-start-add');
        $('.spirit').addClass('spirit-add');
        $('.pumping-cell').addClass('pumping-cell-add');
        $('.sec-public').addClass('sec-public-add');
        $('.sec8').addClass('sec8-add');
        $('.text-spirit').addClass('text-spirit-add');
        $('.sec9').addClass('sec9-add');
	}
});

loader.start();

$(function() {
    
        var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
       
        var wh = document.documentElement.clientWidth;
        if(wh>=640){
            wh = 640;
        }
        var ww = wh * 480 / 320;
        document.documentElement.style.fontSize = wh / 16 + "px";
        $('.sec').css({
            'height': ww + 'px',
            'width':wh +'px'
        });

        window.onresize = function() {
            var wh = document.documentElement.clientWidth;
            if(wh>=640){
                wh = 640;
            }
            var ww = wh * 480 / 320;
            document.documentElement.style.fontSize = wh / 16 + "px";
            $('.sec').css({
                'height': ww + 'px',
                'width':wh +'px'
            });
        }

        $('.sec-start').on('click',function(){
            $('.dialog-box').addClass('bounceOutLeft');
        })  
        setTimeout(function(){
            $('.spirit-left1').addClass('zoomOutDownleft1');
            $('.spirit-right1').addClass('zoomOutDownright1');
            $('.spirit-left2').addClass('zoomOutDownleft2');
            $('.spirit-right2').addClass('zoomOutDownright2');
        },2000)
        
        // 

        // 测试放大出现
        // var  zoomin = 'zoomIn';
        // var zoomoutDown = 'zoomOutDown';
        // $('.poetic-name').show().addClass(zoomin);
        // setTimeout(function(){
        //     $('.spirit-left1').show().addClass(zoomin);
        //     setTimeout(function(){
        //         $('.spirit-right1').show().addClass(zoomin);
        //         setTimeout(function(){
        //             $('.spirit-left2').show().addClass(zoomin);
        //             setTimeout(function(){
        //                 $('.spirit-right2').show().addClass(zoomin);
        //                 setTimeout(function(){
        //                     $('.sec4-claim').show();
                          

        //                 },700)
        //             },700)
        //         },700)
        //     },700)
        // },700)



        // 法文  菜单文字替换
        // $('.category-hair-e').addClass('category-hair-f');
        // $('.category-dress-e').addClass('category-dress-f');
        // $('.category-accessory-e').addClass('category-accessory-f');
        // $('.category-makeup-e').addClass('category-makeup-f');
        // $('.category-tops-e').addClass('category-tops-f');
        // $('.category-bottoms-e').addClass('category-bottoms-f');
        // $('.category-handheld-e').addClass('category-handheld-f');
        // $('.category-special-e').addClass('category-special-f');       
});


