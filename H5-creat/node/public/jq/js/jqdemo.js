(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.resLoader = factory(root);
    }
}(this, function() {
    var isFunc = function(f) {
            return typeof f === 'function';
        }
        //构造器函数
    function resLoader(config) {
        this.option = {
            resourceType: 'image', //资源类型，默认为图片
            baseUrl: './', //基准url
            resources: [], //资源路径数组
            onStart: null, //加载开始回调函数，传入参数total
            onProgress: null, //正在加载回调函数，传入参数currentIndex, total
            onComplete: null //加载完毕回调函数，传入参数total
        }
        if (config) {
            for (i in config) {
                this.option[i] = config[i];
            }
        } else {
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    };

    resLoader.prototype.start = function() {
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for (var i = 0, l = this.option.resources.length; i < l; i++) {
            var r = this.option.resources[i],
                url = '';
            if (r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
                url = r;
            } else {
                url = baseUrl + r;
            }

            var image = new Image();
            image.onload = function() { _this.loaded(); };
            image.onerror = function() { _this.loaded(); };
            image.src = url;
        }
        if (isFunc(this.option.onStart)) {
            this.option.onStart(this.total);
        }
    }

    resLoader.prototype.loaded = function() {
            if (isFunc(this.option.onProgress)) {
                this.option.onProgress(++this.currentIndex, this.total);
            }
            //加载完毕
            if (this.currentIndex === this.total) {
                if (isFunc(this.option.onComplete)) {
                    this.option.onComplete(this.total);
                }
            }
        }
        //暴露公共方法
    return resLoader;
}));



var loader = new resLoader({
    resources: [
        'image/center.png',
        'image/person.png'
    ],
    onStart: function(total) {

    },
    onProgress: function(current, total) {
        console.log(current + '/' + total);

    },
    onComplete: function(total) {

        game.step_one();
        // game.step_demo();


    }
});



$(function() {
    console.log('文件加载完成');
    loader.start();
    window.onresize = function() {
        var wh = document.documentElement.clientHeight;
        console.log(wh)
            // if (wh >= 640) {
            //     wh = 640;
            // }
        var ww = wh * 375 / 667;
        // document.documentElement.style.fontSize = wh / 16 + "px";

        var secs = document.getElementsByClassName("sec");
        for (var i = 0; i < secs.length; i++) {
            secs[i].style.width = ww + 'px';
            secs[i].style.height = wh + 'px';
        }
    }

});

var data = {
    animation_start: "webkitAnimationStart AnimationStart",
    animation_end: "webkitAnimationEnd AnimationEnd"
}
var game = {
    // 场一
    step_one: function() {

        $('.sec-1').show();

        $('.monster').addClass('slideInRight')
            .one(data.animation_end, function() {
                console.log('结束')
                $(this).removeClass('slideInRight');
                $('.imgs')
                    .addClass('zoomIn')
                    .one(data.animation_start, function() {
                        $(this).css('opacity', '1');
                    })
                    .one(data.animation_end, function() {
                        $(this).addClass('shake').one(data.animation_end, function() {
                            game.step_two();
                        });;
                    });
            });




    },
    step_two: function() {
        $('.imgs-2')
            .addClass('zoomIn')
            .one(data.animation_start, function() {
                $(this).css('opacity', '1');
            })
            .one(data.animation_end, function() {
                $(this).addClass('shake').one(data.animation_end, function() {
                    console.log('==============================')
                    setTimeout(function() {
                        $('.sec1-content-1').addClass('slideOutRights').one(data.animation_start, function() {
                            console.log('=====开始======')
                        }).one(data.animation_end, function() {
                            console.log('=====结束======');
                            setTimeout(function() {
                                game.step_three();
                            }, 500)

                        });
                    }, 900);



                })
            });
    },

    step_three: function() {
        $('.sec1-content-2').addClass('fadein');
        $('.tips-1').css('opacity', '1').addClass('slideInLeft')
            .one(data.animation_end, function() {
                var _this = $(this);
                setTimeout(function() {
                    _this.addClass('slideOutRights-2');
                    setTimeout(function() {
                        $('.tips-2').css('opacity', '1').addClass('slideInLeft').one(data.animation_end, function() {
                            // setTimeout(function() {
                            $(this).addClass('slideOutRights-2');

                            $('.monster').addClass('slideOutLeft')
                                .one(data.animation_end, function() {
                                    console.log('场景切换')
                                });
                            // }, 1000)

                        });
                    }, 500)


                }, 600)
            });
    },




    // demo

    step_demo: function() {
        $('.sec-demo').show();
        // $('.finger').addClass('finger-anima');
        $('.finger').addClass('pulse');
    }
}