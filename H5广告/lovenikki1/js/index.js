



(function(root, factory) {
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
        'image/startbg.jpg',
        'image/img.png',
        'image/lifu.png',
        'image/center.png',
        'image/hzbj.jpg',
        'image/e-img.png',
        'image/f-img.png',
        'image/bling.png',
        'image/smallbling.png',
        'image/cpbg.jpg',
        'image/NIKKI.png',
        'image/person.png',
    ],
    onStart: function(total) {
        console.log('start:' + total);

        // fr  en-US  fr-FR  fr-CA
        var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
        if (currentLang === 'fr' || currentLang === 'fr-FR' || currentLang === 'fr-CA') {
            adData.data.languageType = 'france';
            adData.changeLanguage();
        }

    },
    onProgress: function(current, total) {
        console.log(current + '/' + total);

        adData.loadingMethod(current, total);
    },
    onComplete: function(total) {
        adData.loadingFinish();
        adData.addClick();
        adData.sec2Method();
    }
});



$(function() {
    console.log('文件加载完成');
    loader.start();
    // window.onresize = function () {
    //     var wh = document.documentElement.clientWidth;
    //     if (wh >= 640) {
    //         wh = 640;
    //     }
    //     var ww = wh * 480 / 320;
    //     document.documentElement.style.fontSize = wh / 16 + "px";
    //     $('.sec').css({
    //         'height': ww + 'px',
    //         'width': wh + 'px'
    //     });
    // }
});

var adData = {

    loadingMethod: function(current, total) {
        var percent = current / total * 100;
        $('.progressbar').css('width', percent + '%');
    },
    loadingFinish: function() {
        $('.sec-start').addClass('sec-start-add');
        $('.spirit').addClass('spirit-add');
        $('.pumping-cell').addClass('pumping-cell-add');
        $('.sec-public').addClass('sec-public-add');
        $('.sec8').addClass('sec8-add');
        $('.text-spirit').addClass('text-spirit-add');
        $('.sec9').addClass('sec9-add');

        $('.div-center').addClass('div-center-add');
        $('.bling').addClass('bling-add');
        $('.s-bling').addClass('s-bling-add');

        if (adData.data.languageType === 'english') {
            $('.spirit-flag').addClass('spirit-flag-e');
        } else {
            $('.spirit-flag').addClass('spirit-flag-f');
        }


    },
    data: {
        interval: '',
        time: 60,
        num: 1,
        resoult: {
            hair: {
                flag: false,
                type: '.res-default-hair'
            },
            dress: {
                flag: false,
                type: '.res-default-clothes'
            },
            accessory: {
                flag: false,
                type: ''
            },
            face: {
                flag: false,
                type: '',
            }

        },
        getDressed: false,
        languageType: 'english',
        language: {
            sec2p1: 'Mon meilleur ami va se marier le mois prochain! Je devrais lui faire une surprise.',
            sec3p1: "C'est l'heure du tirage au sort!",
            mature: 'Maturité',
            gorgeous: 'Splendeur',
            elegance: 'Élégance',
            pure: 'Pureté',
            cute: 'Tendresse',
            poeticText1: 'Poétique demain',
            poeticText6: 'Mariage rêveur',
            sec6strp1: 'Bon! Je vais lui faire une belle mariée avec ceux-ci !',
            sec7strp1: 'Objectif: Aider Nikki à concevoir une tenue de mariage pendant 60s',
            sec8strp1: 'Aidez Nikki à finir son design !',
            time: 'Temps',
            sec9sucp1: 'Vous avez gagné un cadeau secret. Venez rejoindre le voyage de Nikki et découvrez le monde élégant MAINTENANT!',
            sec9failp1: 'Il faut plus de vêtements satisfaisants.  Venez rejoindre le monde de Nikki pour en trouver plus!',
        },
    },
    time300: 300,
    time400: 400,
    time500: 500,
    sec: $('.sec'),
    sec2: $('.sec2'),
    sec3: $('.sec3'),
    sec4: $('.sec4'),
    sec5: $('.sec5'),
    sec6: $('.sec6'),
    sec7: $('.sec7'),
    sec8: $('.sec8'),
    sec9: $('.sec9'),
    bounceInLeft: 'bounceInLeft', //动画 左侧进入
    bounceOutLeft: 'bounceOutLeft', //动画 左侧移除
    bounceIn: 'bounceIn', //动画 缩放显示
    bounceOut: 'bounceOut', //动画 缩放隐藏
    bounceInRight: 'bounceInRight', //动画 右侧进入
    bounceOutRight: 'bounceOutRight', //动画 右侧移除
    fadeIn: 'fadeIn', //动画 渐隐
    movedream: 'movedream', //动画 上排移动
    movetomorrow: 'movetomorrow', //动画 下排移动
    sec2Dialog: $('.sec2-dialog'), //sec2 弹窗
    secDialogRipple: $('.sec2-dialog-ripple'), //sec2 点击区域
    sec3Dialog: $('.sec3-dialog'), //sec3 弹窗
    sec3DialogClaim: $('.sec3-dialog-claim'), //sec3 claim
    sec4DivCenter1: $('.div-center-1'), //sec4 div-center-1
    sec4DivCenter6: $('.div-center-6'),
    sec6Dialog: $('.sec6-dialog'), //sec6 弹窗
    sec6DialogRipple: $('.sec6-dialog-ripple'), //sec6 点击区域
    sec7Dialog: $('.sec7-dialog'), //sec7弹窗
    sec7Claim: $('.sec7-claim'), // sec7 start按钮
    sec8SlideMenu: $('.slide-menu'), //sec8 slidemenu
    sec8SlideMenuRipple: $('.slide-menu-ripple'), //sec8 第一步  指引手指
    sec8HairRipple: $('.slide-hair-rippledream,.slide-hair-rippletomo'), //指引，发型指引手指
    sec8TimeBar: $('.timebar'), //时间轴
    sec8ClickDiv: $('.click-div'), //sec8 左侧非slide区域
    sec8SlideHair: $('.slide-hair'), //发型 slidemenu
    sec8PersonHair: $('.person-hair'), //模特 发型
    sec8PersonClothes: $('.person-clothes'), //模特  服装
    sec8PersonTou: $('.person-tou'), //模特 头饰
    secPersonFace: $('.person-face'), //模特 妆容
    sec9Perfect: $('.perfect'), //perfect 标志
    sec9OPeration: $('.operation-div'), // 操作  replay/install


    sec2Method: function() {
        $('.loading').hide();
        adData.sec2.show();
        adData.sec2Dialog.show().addClass(adData.bounceInLeft);
        setTimeout(function() {
            adData.secDialogRipple.show();
        }, adData.time300)
    },
    sec3Method: function() {
        adData.sec.hide();
        adData.sec3.show();
        adData.sec3Dialog.addClass(adData.bounceInLeft);
        setTimeout(function() {
            adData.sec3DialogClaim.show();
        }, adData.time300)
    },

    sec4Method: function() {
        adData.sec.hide();
        $('.sec-public-1').show();
        adData.sec4DivCenter1.show().addClass(adData.bounceIn);
    },
    sec6Method: function() {
        adData.sec.hide();
        adData.sec6.show();
        adData.sec6Dialog.addClass(adData.bounceInLeft);
        setTimeout(function() {
            adData.sec6DialogRipple.show();
        }, adData.time300)
    },
    sec7Method: function() {
        adData.sec.hide();
        adData.sec7.show();
        adData.sec7Dialog.addClass(adData.bounceInLeft);
        setTimeout(function() {
            adData.sec7Claim.show();
        }, adData.time300);
    },
    sec8Method: function() {
        adData.sec.hide();
        adData.sec8.show();
        adData.sec8SlideMenu.show().addClass(adData.bounceInRight);
        setTimeout(function() {
            adData.sec8SlideMenuRipple.show();
        }, adData.time300);
    },

    sec9Method: function() {
        adData.sec.hide();
        adData.sec9.show();
        if (adData.data.num === 3) {
            $('.replay').hide();
            $('.install-last').css('margin-left', '0')
        }
        var res = adData.data.resoult;
        if (res.hair.flag && res.dress.flag && res.accessory.flag && res.face.flag) {
            // 四种装饰全选
            adData.sec9Perfect.show().addClass('pulse');
            $('.sec9-dialog-success').css('visibility', 'visible').addClass(adData.bounceInLeft);
            setTimeout(function() {
                adData.sec9OPeration.show();
            }, 600);

        } else {
            // 未全选
            adData.sec9Perfect.hide().removeClass('pulse');
            $('.sec9-dialog-fail').css('visibility', 'visible').addClass(adData.bounceInLeft);
            setTimeout(function() {
                adData.sec9OPeration.show();
            }, 600);
        }



        var src = adData.data.resoult;
        $('.res-model').show().addClass(adData.fadeIn);
        $(src.hair.type).show().addClass(adData.fadeIn);
        $(src.dress.type).show().addClass(adData.fadeIn);
        $(src.accessory.type).show().addClass(adData.fadeIn);
        $(src.face.type).show().addClass(adData.fadeIn);

    },

    countDownMethod: function() {
        var _this = this;
        this.data.interval = setInterval(function() {
            console.log(_this.data.time)
            var widths = _this.data.time / 60 * 100 + '%';
            adData.sec8TimeBar.css('width', widths);
            _this.data.time -= 1;

            var res = adData.data.resoult;
            if (res.dress.flag) {
                adData.data.getDressed = true;
                if (adData.data.languageType === 'english') {
                    $('.press-btn').removeClass('unable-e').addClass('enable-e');
                } else {
                    $('.press-btn').removeClass('unable-f').addClass('enable-f');
                }
            }

            if (_this.data.time === 0) {
                clearInterval(_this.data.interval);
                console.log(JSON.stringify(adData.data.resoult, null, 2));
                adData.sec9Method();
            }
        }, 1000)
    },
    // 修改语言
    changeLanguage: function() {

        var language = adData.data.language;

        // sec2
        $('.sec2-p1').text(language.sec2p1);

        // sec3
        $('.sec3-p1 ').text(language.sec3p1).css('font-size','.65rem');

        // sec4
        $('.mature').text(language.mature);
        $('.gorgeous').text(language.gorgeous);
        $('.elegance').text(language.elegance);
        $('.pure').text(language.pure);
        $('.cute').text(language.cute);

        $('.poetic-name-1').text(language.poeticText1);
        $('.poetic-name-6').text(language.poeticText6);

        // sec6
        $('.sec6-strp1').text(language.sec6strp1).css('font-size','.7rem');

        // sec7   
        $('.sec7-strp1').text(language.sec7strp1).css({
            'font-size':'.7rem',
            'padding-left':'.7rem'
        });;


        // sec8
        $('.sec8-strp1').text(language.sec8strp1).css({
            'font-size':'.62rem',
            'padding-left':'.2rem'
        });;
        $('.sec8-time').text(language.time);

        $('.category-hair-e').addClass('category-hair-f');
        $('.category-dress-e').addClass('category-dress-f');
        $('.category-accessory-e').addClass('category-accessory-f');
        $('.category-makeup-e').addClass('category-makeup-f');

        $('.category-tops-e').addClass('category-tops-f');
        $('.category-bottoms-e').addClass('category-bottoms-f');
        $('.category-handheld-e').addClass('category-handheld-f');
        $('.category-special-e').addClass('category-special-f');

        $('.press-btn').addClass('unable-f');

        // sec9
        $('.sec9sucp1').text(language.sec9sucp1).css({
            'font-size':'.7rem',
            'padding-left':'.6rem'
        });;;
        $('.sec9failp1').text(language.sec9failp1).css('font-size','.7rem');;

    },
    // 重置
    reset: function() {

        adData.sec2Dialog.removeClass('bounceInLeft bounceOutLeft');
        adData.sec3Dialog.removeClass('bounceInLeft bounceOutLeft');

        $('.sec-public .div-center').removeClass('bounceOut')

        adData.sec6Dialog.removeClass('bounceInLeft bounceOutLeft');
        adData.sec7Dialog.removeClass('bounceInLeft bounceOutLeft');
        clearInterval(adData.data.interval);
        adData.sec8TimeBar.css('width', '100%');
        adData.data.resoult = {
            hair: {
                flag: false,
                type: '.res-default-hair'
            },
            dress: {
                flag: false,
                type: '.res-default-clothes'
            },
            accessory: {
                flag: false,
                type: ''
            },
            face: {
                flag: false,
                type: '',
            }

        };
        adData.data.time = 60;
        adData.data.getDressed = false;

        $('.slide-all').hide().removeClass('bounceInRight bounceOutRight');
        $('.sec8person-tomo,.sec8person-dream').hide();
        $('.default-hair,.default-clothes').show();


        if (adData.data.languageType === 'english') {
            $('.press-btn').addClass('unable-e').removeClass('enable-e');

        } else {
            $('.press-btn').addClass('unable-f').removeClass('enable-f');

        }

        $('.sec9-dialog-success').css('visibility', 'hidden')
        $('.sec9-dialog-fail').css('visibility', 'hidden')
        // $('.sec9-dialog-success').hide().removeClass('bounceInLeft');
        // $('.sec9-dialog-fail').hide().removeClass('bounceInLeft');

        adData.sec9Perfect.hide().removeClass('pulse');
        adData.sec9OPeration.hide();

        $('.res-model').hide();
        $('.res-person').hide();
        adData.sec8ClickDiv.hide();
        $('.slide-hair-rippleback').unbind();
        $('.slide-menu>p').unbind();
        $('.menu-p-public').unbind();
        $('.slide-back').unbind();
        adData.data.num += 1;
        $('.sec').hide();
        adData.sec2Method();


    },

    addClick: function() {

        // sec2
        adData.sec2.on('click', function() {
            adData.secDialogRipple.hide();
            adData.sec2Dialog.removeClass(adData.bounceInLeft).addClass(adData.bounceOutLeft);
            setTimeout(function() {
                adData.sec3Method();
            }, adData.time400);
        });

        // sec3
        adData.sec3DialogClaim.on('click', function() {
            $(this).hide();
            adData.sec3Dialog.removeClass(adData.bounceInLeft).addClass(adData.bounceOutLeft);

            setTimeout(function() {
                adData.sec.hide();
                $('.bling-sec').show();
                setTimeout(function() {
                    adData.sec4Method();
                }, 1200)

            }, adData.time400);
        });

        // sec4
        $('.public-claim-1').on('click', function() {
            adData.sec4DivCenter1.removeClass(adData.bounceIn).addClass(adData.bounceOut);
            setTimeout(function() {
                $('.s-bling-1').show();
                setTimeout(function() {
                    $('.s-bling-1').hide();
                    adData.sec.hide();
                    $('.sec-public-6').show();
                    adData.sec4DivCenter6.show().addClass(adData.bounceIn);
                }, 100);
            }, 400)

        });

        $('.public-claim-6').on('click', function() {
            adData.sec4DivCenter6.removeClass(adData.bounceIn).addClass(adData.bounceOut);
            setTimeout(function() {
                $('.s-bling-6').show();
                setTimeout(function() {
                    $('.s-bling-6').hide();
                    adData.sec6Method();
                }, 100);

            }, 400);
        });
       
        // sec6
        $('.sec6').on('click', function() {
            adData.sec6DialogRipple.hide();
            adData.sec6Dialog.removeClass(adData.bounceInLeft).addClass(adData.bounceOutLeft);
            setTimeout(function() {
                adData.sec7Method();
            }, adData.time400);
        });
        // sec7
        adData.sec7Claim.on('click', function() {
            $(this).hide();
            adData.sec7Dialog.removeClass(adData.bounceInLeft).addClass(adData.bounceOutLeft);
            setTimeout(function() {
                adData.sec8Method();
            }, adData.time400);
        });

        // sec8

        // getpress btn
        $('.press-btn').on('click', function() {
            if (adData.data.getDressed) {
                clearInterval(adData.data.interval);
                adData.sec9Method();
                console.log('跳转=======================')
            }
        });

        // 第一步  手指指引
        adData.sec8SlideMenuRipple.on('click', function() {
            $(this).hide();
            adData.sec8SlideMenu.removeClass(adData.bounceInRight).addClass(adData.bounceOutRight).hide();
            adData.sec8SlideHair.show().addClass(adData.bounceInRight);
            setTimeout(function() {
                adData.sec8HairRipple.show();
            }, adData.time300)
        });

        // 发型栏   手指指引
        adData.sec8HairRipple.on('click', function() {
            adData.sec8HairRipple.hide();
            var type = $(this).data('for');
            adData.data.resoult.hair.flag = true;
            switch (type) {
                case 'dream':
                    adData.data.resoult.hair.type = '.res-dream-hair';
                    $('.hair-dream.move').show().addClass(adData.movedream);
                    setTimeout(function() {
                        $('.hair-dream.move').hide().removeClass(adData.movedream);
                        adData.sec8PersonHair.hide();
                        $('.sec8-dream-hair').show();
                    }, adData.time300);
                    break;
                case 'tomo':
                    adData.data.resoult.hair.type = '.res-tomorrow-hair';
                    $('.hair-tomorrow.move').show().addClass(adData.movetomorrow);
                    setTimeout(function() {
                        $('.hair-tomorrow.move').hide().removeClass(adData.movetomorrow);
                        adData.sec8PersonHair.hide();
                        $('.sec8-tomorrow-hair').show();
                    }, adData.time300)
                    break;
                default:
                    break;
            }

            // 发型栏 返回指引  
            $('.slide-hair-rippleback').show().on('click', function() {
                $(this).hide();
                adData.sec8SlideHair.hide().removeClass(adData.bounceInRight);
                adData.sec8SlideMenu.show().removeClass(adData.bounceOutRight).addClass(adData.bounceInRight);
                $('.sec8-dialog').css('visibility', 'visible').addClass('sec8-bounceInLeft');
                setTimeout(function() {
                    $('.sec8-dialog .ripple').show();
                }, 500);

            });; // 第一幕返回指引
        });




        // 开始自由操作  指引
        $('.sec8-dialog').on('click', function() {
            $(this).css('visibility', 'hidden').removeClass('sec8-bounceInLeft');
            $('.sec8-dialog .ripple').hide();
            adData.sec8ClickDiv.show();
            clearInterval(adData.data.interval);
            adData.sec8TimeBar.css('width', '100%');
            adData.countDownMethod();


            // slide-menu  p方法
            $('.slide-menu>p').on('click', function() {
                console.log($(this).data('for'));
                var type = $(this).data('for');
                adData.sec8SlideMenu.removeClass(adData.bounceInRight).addClass(adData.bounceOutRight).hide();
                $(type).show().removeClass(adData.bounceOutRight).addClass(adData.bounceInRight);
            });

            //具体 配件方法
            $('.menu-p-public').on('click', function() {
                console.log($(this).data('for'));
                var type = $(this).data('for');
                switch (type) {
                    // 发型
                    case '.hair-dream.move':
                        adData.data.resoult.hair.type = '.res-dream-hair';
                        $(type).show().addClass(adData.movedream);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movedream);
                            adData.sec8PersonHair.hide();
                            $('.sec8-dream-hair').show();
                        }, adData.time300);
                        break;
                    case '.hair-tomorrow.move':
                        adData.data.resoult.hair.type = '.res-tomorrow-hair';
                        $(type).show().addClass(adData.movetomorrow);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movetomorrow);
                            adData.sec8PersonHair.hide();
                            $('.sec8-tomorrow-hair').show();
                        }, adData.time300)
                        break;
                    case '.clothes-dream.move':
                        adData.data.resoult.dress.flag = true;
                        adData.data.resoult.dress.type = '.res-dream-clothes';
                        $(type).show().addClass(adData.movedream);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movedream);
                            adData.sec8PersonClothes.hide();
                            $('.sec8-dream-clothes').show();
                        }, adData.time300);
                        break;
                    case '.clothes-tomorrow.move':
                        adData.data.resoult.dress.flag = true;
                        adData.data.resoult.dress.type = '.res-tomorrow-clothes';
                        $(type).show().addClass(adData.movetomorrow);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movetomorrow);
                            adData.sec8PersonClothes.hide();
                            $('.sec8-tomorrow-clothes').show();
                        }, adData.time300);
                        break;
                    case '.accessory-dream.move':
                        adData.data.resoult.accessory.flag = true;
                        adData.data.resoult.accessory.type = '.res-dream-tou,.res-dream-xl';
                        $(type).show().addClass(adData.movedream);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movedream);
                            adData.sec8PersonTou.hide();
                            $('.sec8-dream-tou,.sec8-dream-xl').show();
                        }, adData.time300);
                        break;
                    case '.accessory-tomorrow.move':
                        adData.data.resoult.accessory.flag = true;
                        adData.data.resoult.accessory.type = '.res-tomorrow-tou';
                        $(type).show().addClass(adData.movetomorrow);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movetomorrow);
                            adData.sec8PersonTou.hide();
                            $('.sec8-tomorrow-tou').show();
                        }, adData.time300);
                        break;
                    case '.face-dream.move':
                        adData.data.resoult.face.flag = true;
                        adData.data.resoult.face.type = '.res-dream-face';
                        $(type).show().addClass(adData.movedream);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movedream);
                            adData.secPersonFace.hide();
                            $('.sec8-dream-face').show();
                        }, adData.time300);
                        break;
                    case '.face-tomorrow.move':
                        adData.data.resoult.face.flag = true;
                        adData.data.resoult.face.type = '.res-tomorrow-face';
                        $(type).show().addClass(adData.movetomorrow);
                        setTimeout(function() {
                            $(type).hide().removeClass(adData.movetomorrow);
                            adData.secPersonFace.hide();
                            $('.sec8-tomorrow-face').show();
                        }, adData.time300);
                        break;
                }
            });
            // 返回 按钮
            $('.slide-back').on('click', function() {
                var type = $(this).data('for');
                $(type).hide().removeClass(adData.bounceInRight);
                adData.sec8SlideMenu.removeClass(adData.bounceOutRight).show().addClass(adData.bounceInRight);
            });
        });

        // 左边 非slide 区域点击方法
        adData.sec8ClickDiv.on('click', function() {
            if (adData.sec8SlideMenu.css('display') == 'none') {
                $('.slide-div').hide().removeClass(adData.bounceInRight);
                adData.sec8SlideMenu.removeClass(adData.bounceOutRight).show().addClass(adData.bounceInRight);　
            }
        });
    }


}