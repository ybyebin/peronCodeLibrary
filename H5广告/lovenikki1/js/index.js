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
        'image/mrrs.jpg',
        'image/hzbj.jpg',
        'image/textimg.png',
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
        console.log('图片加载完成');
        adData.sec2Method();
        // adData.sec8Method();
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
            install: 'Installer',
            claim: "Réclamer",
            sec2p1: 'Mon meilleur ami va se marier le mois',
            sec2p2: 'prochain! Je devrais lui faire une surprise.',
            sec3p1: "C'est l'heure du tirage au sort!",
            sec5proName: 'Mariage rêveur',
            mature: 'Maturité',
            gorgeous: 'Splendeur',
            elegance: 'Élégance',
            pure: 'Pureté',
            cute: 'Tendresse',
            sec4proName: 'Poetic Tomorrow',
            sec6strp1: 'Bon! Je vais lui faire une belle mariée  avec ceux-ci !',
            sec7strp1: 'Objectif: Aider Nikki à concevoir une  tenue de mariage pendant',
            start: 'Commencer',
            sec8strp1: 'Aidez Nikki à finir son design !',
            time: 'Temps',
            sec9sucp1: 'Vous avez gagné un cadeau secret.',
            sec9sucp2: 'Venez rejoindre le voyage de Nikki et',
            sec9sucp3: 'découvrez le monde élégant',
            sec9sucp32: 'MAINTENANT!',
            sec9sucp4: 'Il faut plus de vêtements satisfaisants.',
            sec9sucp5: ' Venez rejoindre le monde de Nikki pour',
            sec9sucp52: 'en trouver plus!',
            replay: 'Rejouer',
        },
        sec: $('.sec'),
        sec2: $('.sec2'),
        sec3: $('.sec3'),
        sec4: $('.sec4'),
        sec5: $('.sec5'),
        sec6: $('.sec6'),
        sec7: $('.sec7'),
        sec8: $('.sec8'),
        sec9: $('.sec9'),
        bounceInLeft: 'bounceInLeft',
        bounceOutLeft: 'bounceOutLeft',


    },
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
    },
    sec2Method: function() {
        $('.loading').hide();
        var sec2dialog = $('.sec2-dialog');
        var sec2dialog_ripple = $('.sec2-dialog-ripple');
        adData.data.sec2.show();
        sec2dialog.show().addClass(adData.data.bounceInLeft);
        setTimeout(function() {
            sec2dialog_ripple.show();
            adData.data.sec2.on('click', function() {
                sec2dialog_ripple.hide();
                sec2dialog.removeClass(adData.data.bounceInLeft).addClass(adData.data.bounceOutLeft);
                setTimeout(function() {
                    adData.sec3Method();
                }, 400);
            });
        }, 300)
    },
    sec3Method: function() {
        adData.data.sec2.unbind();
        adData.data.sec.hide();
        $('.sec3').show();
        var sec3dialog = $('.sec3-dialog');
        sec3dialog.addClass(adData.data.bounceInLeft);
        setTimeout(function() {
            $('.sec3-dialog-claim').show().on('click', function() {
                $(this).hide();
                sec3dialog.removeClass(adData.data.bounceInLeft).addClass(adData.data.bounceOutLeft);
                setTimeout(function() {
                    // 先5后4
                    adData.sec5Method();
                }, 400);
            });

        }, 500)
    },
    sec5Method: function() {
        $('.sec3-dialog-claim').unbind();
        adData.data.sec.hide();
        adData.data.sec5.show();

        // 放大出现
        var zoomin = 'zoomIn';
        var zoomoutDown = 'zoomOutDown';

        $('.sec5-poetic-name').show().addClass(zoomin);

        setTimeout(function() {
            $('.heart-level').show().addClass(zoomin);
            setTimeout(function() {
                $('.sec5-label').show().addClass(zoomin);
                setTimeout(function() {
                    $('.sec5-spirit-left1').show().addClass(zoomin);
                    setTimeout(function() {
                        $('.sec5-spirit-right1').show().addClass(zoomin);
                        setTimeout(function() {
                            $('.sec5-spirit-left2').show().addClass(zoomin);
                            setTimeout(function() {
                                $('.sec5-spirit-right2').show().addClass(zoomin);
                                setTimeout(function() {
                                    $('.sec5-claim').show().on('click', function() {
                                        $('.heart-level,.sec5-label').hide().removeClass(zoomin);
                                        $(this).hide();
                                        $('.sec5-spirit-left1').addClass('zoomOutDownleft1');
                                        $('.sec5-spirit-right1').addClass('zoomOutDownright1');
                                        $('.sec5-spirit-left2').addClass('zoomOutDownleft2');
                                        $('.sec5-spirit-right2').addClass('zoomOutDownright2');
                                        setTimeout(function() {
                                            adData.sec4Method();
                                        }, 500)
                                    });
                                }, 400)
                            }, 400)
                        }, 400)
                    }, 400)
                }, 400)
            }, 400)
        }, 400);




    },
    sec4Method: function() {

        $('.sec5-claim').unbind();

        adData.data.sec.hide();
        $('.sec4').show();


        // 测试放大出现
        var zoomin = 'zoomIn';
        var zoomoutDown = 'zoomOutDown';

        $('.sec4-poetic-name').show().addClass(zoomin);
        setTimeout(function() {
            $('.heart-level4').show().addClass(zoomin);
            setTimeout(function() {
                $('.sec4-label').show().addClass(zoomin);
                setTimeout(function() {
                    $('.sec4-spirit-left1').show().addClass(zoomin);
                    setTimeout(function() {
                        $('.sec4-spirit-right1').show().addClass(zoomin);
                        setTimeout(function() {
                            $('.sec4-spirit-left2').show().addClass(zoomin);
                            setTimeout(function() {
                                $('.sec4-spirit-right2').show().addClass(zoomin);
                                setTimeout(function() {
                                    $('.sec4-claim').show().on('click', function() {
                                        $('.heart-level4,.sec4-label').hide().removeClass(zoomin);
                                        $(this).hide();
                                        $('.sec4-spirit-left1').addClass('zoomOutDownleft1');
                                        $('.sec4-spirit-right1').addClass('zoomOutDownright1');
                                        $('.sec4-spirit-left2').addClass('zoomOutDownleft2');
                                        $('.sec4-spirit-right2').addClass('zoomOutDownright2');
                                        setTimeout(function() {
                                            adData.sec6Method();
                                        }, 500)
                                    });
                                }, 400)
                            }, 400)
                        }, 400)
                    }, 400)
                }, 400)
            }, 400);
        }, 400);
    },
    sec6Method: function() {
        $('.sec4-claim').unbind();

        adData.data.sec.hide();
        $('.sec6').show();
        $('.sec6-dialog').show().addClass(adData.data.bounceInLeft);
        setTimeout(function() {
            $('.sec6-dialog-ripple').show();
            $('.sec6').on('click', function() {
                $('.sec6-dialog-ripple').hide();
                $('.sec6-dialog').removeClass(adData.data.bounceInLeft).addClass(adData.data.bounceOutLeft);
                setTimeout(function() {
                    adData.sec7Method();
                }, 400);
            });
        }, 300)
    },
    sec7Method: function() {

        $('.sec6').unbind();
        $('.sec').hide();
        $('.sec7').show();
        $('.sec7-dialog').show().addClass(adData.data.bounceInLeft);

        setTimeout(function() {
            $('.sec7-claim').show().on('click', function() {
                $(this).hide();
                $('.sec7-dialog').removeClass(adData.data.bounceInLeft).addClass(adData.data.bounceOutLeft);
                setTimeout(function() {
                    adData.sec8Method();
                }, 400);
            });
        }, 300);
    },
    sec8Method: function() {
        $('.sec7-claim').unbind();
        $('.sec').hide();
        $('.sec8').show();
        $('.slide-menu').show().addClass('bounceInRight');
        // $('.slide-menu').show();
        setTimeout(function() {
            $('.press-btn').on('click', function() {
                if (adData.data.getDressed) {
                    clearInterval(adData.data.interval);
                    adData.sec9Method();
                    console.log('跳转=======================')
                }
            });

            $('.slide-menu-ripple').show().on('click', function() {
                $(this).hide();
                setTimeout(function() {
                    $('.slide-menu-ripple').unbind();
                    $('.slide-menu').removeClass('bounceInRight').addClass('bounceOutRight').hide();
                    // $('.slide-menu').removeClass('bounceInRight').hide();

                    $('.slide-hair').show().addClass('bounceInRight');
                    // $('.slide-hair').show();
                    setTimeout(function() {
                        $('.slide-hair-rippledream,.slide-hair-rippletomo').show().on('click', function() {

                            console.log($(this).data('for'));
                            var type = $(this).data('for');
                            adData.data.resoult.hair.flag = true;
                            switch (type) {
                                case 'dream':
                                    adData.data.resoult.hair.type = '.res-dream-hair';
                                    $('.hair-dream.move').show().addClass('movedream');
                                    setTimeout(function() {
                                        $('.hair-dream.move').hide().removeClass('movedream');
                                        $('.person-hair').hide();
                                        $('.sec8-dream-hair').show();
                                    }, 300);
                                    break;
                                case 'tomo':
                                    adData.data.resoult.hair.type = '.res-tomorrow-hair';
                                    $('.hair-tomorrow.move').show().addClass('movetomorrow');
                                    setTimeout(function() {
                                        $('.hair-tomorrow.move').hide().removeClass('movetomorrow');
                                        $('.person-hair').hide();
                                        $('.sec8-tomorrow-hair').show();
                                    }, 300)
                                    break;
                                default:
                                    break;
                            }
                            $('.slide-hair-ripple').hide();
                            $('.slide-hair-rippleback').show().on('click', function() {
                                $(this).hide();
                                $('.slide-hair').hide().removeClass('bounceInRight');
                                $('.slide-menu').show().removeClass('bounceOutRight').addClass('bounceInRight');
                                // $('.slide-menu').show().removeClass('bounceOutRight');
                                $('.sec8-dialog').css('visibility', 'visible').addClass('sec8-bounceInLeft').on('click', function() {
                                    $(this).css('visibility', 'hidden');

                                    $('.click-div').show().on('click', function() {

                                        if ($('.slide-menu').css('display') == 'none') {
                                            $('.slide-div').hide().removeClass('bounceInRight');
                                            $('.slide-menu').removeClass('bounceOutRight').show().addClass('bounceInRight');　
                                        }
                                    });
                                    clearInterval(adData.data.interval);
                                    $('.timebar').css('width', '100%');
                                    adData.countDownMethod();


                                    // slide-menu  p方法
                                    $('.slide-menu>p').on('click', function() {
                                        console.log($(this).data('for'));
                                        var type = $(this).data('for');
                                        $('.slide-menu').removeClass('bounceInRight').addClass('bounceOutRight').hide();
                                        $(type).show().removeClass('bounceOutRight').addClass('bounceInRight');


                                        // $('.slide-menu').removeClass('bounceInRight').hide();
                                        // $(type).show().removeClass('bounceOutRight');
                                    });

                                    //具体 配件方法
                                    $('.menu-p-public').on('click', function() {
                                        console.log($(this).data('for'));
                                        var type = $(this).data('for');
                                        switch (type) {
                                            // 发型
                                            case '.hair-dream.move':
                                                adData.data.resoult.hair.type = '.res-dream-hair';
                                                $(type).show().addClass('movedream');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movedream');
                                                    $('.person-hair').hide();
                                                    $('.sec8-dream-hair').show();
                                                }, 300);
                                                break;
                                            case '.hair-tomorrow.move':
                                                adData.data.resoult.hair.type = '.res-tomorrow-hair';
                                                $(type).show().addClass('movetomorrow');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movetomorrow');
                                                    $('.person-hair').hide();
                                                    $('.sec8-tomorrow-hair').show();
                                                }, 300)
                                                break;
                                            case '.clothes-dream.move':
                                                adData.data.resoult.dress.flag = true;
                                                adData.data.resoult.dress.type = '.res-dream-clothes';
                                                $(type).show().addClass('movedream');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movedream');
                                                    $('.person-clothes').hide();
                                                    $('.sec8-dream-clothes').show();
                                                }, 300);
                                                break;
                                            case '.clothes-tomorrow.move':
                                                adData.data.resoult.dress.flag = true;
                                                adData.data.resoult.dress.type = '.res-tomorrow-clothes';
                                                $(type).show().addClass('movetomorrow');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movetomorrow');
                                                    $('.person-clothes').hide();
                                                    $('.sec8-tomorrow-clothes').show();
                                                }, 300);
                                                break;
                                            case '.accessory-dream.move':
                                                adData.data.resoult.accessory.flag = true;
                                                adData.data.resoult.accessory.type = '.res-dream-tou,.res-dream-xl';
                                                $(type).show().addClass('movedream');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movedream');
                                                    $('.person-tou').hide();
                                                    $('.sec8-dream-tou,.sec8-dream-xl').show();
                                                }, 300);
                                                break;
                                            case '.accessory-tomorrow.move':
                                                adData.data.resoult.accessory.flag = true;
                                                adData.data.resoult.accessory.type = '.res-tomorrow-tou';
                                                $(type).show().addClass('movetomorrow');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movetomorrow');
                                                    $('.person-tou').hide();
                                                    $('.sec8-tomorrow-tou').show();
                                                }, 300);
                                                break;
                                            case '.face-dream.move':
                                                adData.data.resoult.face.flag = true;
                                                adData.data.resoult.face.type = '.res-dream-face';
                                                $(type).show().addClass('movedream');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movedream');
                                                    $('.person-face').hide();
                                                    $('.sec8-dream-face').show();
                                                }, 300);
                                                break;
                                            case '.face-tomorrow.move':
                                                adData.data.resoult.face.flag = true;
                                                adData.data.resoult.face.type = '.res-tomorrow-face';
                                                $(type).show().addClass('movetomorrow');
                                                setTimeout(function() {
                                                    $(type).hide().removeClass('movetomorrow');
                                                    $('.person-face').hide();
                                                    $('.sec8-tomorrow-face').show();
                                                }, 300);
                                                break;
                                        }
                                    });
                                    // 返回 按钮
                                    $('.slide-back').on('click', function() {
                                        var type = $(this).data('for');
                                        $(type).hide().removeClass('bounceInRight');
                                        $('.slide-menu').removeClass('bounceOutRight').show().addClass('bounceInRight');
                                        // $('.slide-menu').removeClass('bounceOutRight').show();
                                    });
                                });
                                setTimeout(function() {
                                    $('.sec8-dialog .ripple').show();

                                }, 500);

                            });
                        });
                        // $('.slide-hair-rippledream').on('click',function(){

                        // });
                    }, 500)

                }, 100)

            })
        }, 300);
    },

    sec9Method: function() {
        $('.sec').hide();
        $('.sec9').show();
        if (adData.data.num === 3) {
            $('.replay').hide();
            $('.install-last').css('margin-left', '0')
        }
        if (adData.data.getDressed) {
            // 选完
            $('.perfect').show().addClass('pulse');
            $('.sec9-dialog-success').show().addClass(adData.data.bounceInLeft);
            setTimeout(function() {
                $('.operation-div').show();
            }, 600);

        } else {
            // 未选完
            $('.perfect').hide().removeClass('pulse');
            $('.sec9-dialog-fail').show().addClass(adData.data.bounceInLeft);
            setTimeout(function() {
                $('.operation-div').show();
            }, 600);
        }



        var src = adData.data.resoult;
        $('.res-model').show().addClass('fadeIn');
        $(src.hair.type).show().addClass('fadeIn');
        $(src.dress.type).show().addClass('fadeIn');
        $(src.accessory.type).show().addClass('fadeIn');
        $(src.face.type).show().addClass('fadeIn');

    },

    countDownMethod: function() {
        var _this = this;
        // this.data.timePLemgth = $('.time-content').width();
        this.data.interval = setInterval(function() {
            console.log(_this.data.time)
            var widths = _this.data.time / 60 * 100 + '%';
            // console.log('时间：' + _this.data.time + '宽度：' + widths)
            $('.timebar').css('width', widths);
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
        var clas = 'fayu';
        var language = adData.data.language;
        // 右上 下载
        $('.install a').text(language.install);
        $('.install-last').text(language.install);
        // 按钮
        $('.clarm').text(language.claim);
        $('.sec45-claim').addClass(clas);
        // sec2
        $('.sec2-p1').text(language.sec2p1);
        $('.sec2-p2').text(language.sec2p2);

        // sec3
        $('.sec3-p1 ').text(language.sec3p1);

        // sec5
        $('.title span.spirit').addClass(clas);
        $('.sec5-poetic-name').text(language.sec5proName);
        $('.mature').text(language.mature);
        $('.gorgeous').text(language.gorgeous);
        $('.elegance').text(language.elegance);
        $('.pure').text(language.pure);


        // sec4
        $('.sec4-poetic-name').text(language.sec4proName)
        $('.cute').text(language.cute);

        // sec6
        $('.sec6-strp1').text(language.sec6strp1);

        // sec7
        $('.sec7-strp1').text(language.sec7strp1);
        $('.sec7-start').addClass(clas);

        // sec8
        $('.sec8-strp1').text(language.sec8strp1);
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

        $('.sec9suc-p1').text(language.sec9sucp1).css('margin-top', '.4rem');
        $('.sec9suc-p2').text(language.sec9sucp2);
        $('.sec9suc-p3').text(language.sec9sucp3);
        $('.sec9suc-p32').text(language.sec9sucp32);
        $('.sec9suc-p4').text(language.sec9sucp4).css('margin-top', '.8rem!important');;
        $('.sec9suc-p5').text(language.sec9sucp5);

        $('.sec9suc-p52').text(language.sec9sucp52);

        $('.replay').text(language.replay);





    },
    // 重置
    reset: function() {

        $('.sec2-dialog').removeClass('bounceInLeft bounceOutLeft');
        $('.sec3-dialog').removeClass('bounceInLeft bounceOutLeft');

        $('.sec5-poetic-name,.sec5-spirit-left1,.sec5-spirit-right1,.sec5-spirit-left2,sec5-spirit-right2').hide().removeClass('zoomIn');
        $('.sec5-spirit-left1').removeClass('zoomOutDownleft1').hide();
        $('.sec5-spirit-right1').removeClass('zoomOutDownright1').hide();
        $('.sec5-spirit-left2').removeClass('zoomOutDownleft2').hide();
        $('.sec5-spirit-right2').removeClass('zoomOutDownright2').hide();


        $('.sec4-poetic-name,.sec4-spirit-left1,.sec4-spirit-right1,.sec4-spirit-left2,sec4-spirit-right2').hide().removeClass('zoomIn');
        $('.sec4-spirit-left1').removeClass('zoomOutDownleft1').hide();
        $('.sec4-spirit-right1').removeClass('zoomOutDownright1').hide();
        $('.sec4-spirit-left2').removeClass('zoomOutDownleft2').hide();
        $('.sec4-spirit-right2').removeClass('zoomOutDownright2').hide();

        $('.sec6-dialog').removeClass('bounceInLeft bounceOutLeft');
        $('.sec7-dialog').removeClass('bounceInLeft bounceOutLeft');
        clearInterval(adData.data.interval);
        $('.timebar').css('width', '100%');
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

        $('.sec7-dialog').removeClass('bounceInLeft bounceOutLeft');
        if (adData.data.languageType === 'english') {
            $('.press-btn').addClass('unable-e').removeClass('enable-e').unbind();

        } else {
            $('.press-btn').addClass('unable-f').removeClass('enable-e').unbind();

        }


        $('.sec9-dialog-success').hide().removeClass('bounceInLeft');
        $('.sec9-dialog-fail').hide().removeClass('bounceInLeft');

        $('.perfect').hide().removeClass('pulse');
        $('.operation-div').hide();
        $('.res-model').hide();
        $('.res-person').hide();
        $('.click-div').hide().unbind();
        $('.slide-hair-rippledream,.slide-hair-rippletomo').unbind();
        $('.slide-hair-rippleback').unbind();
        $('.slide-menu>p').unbind();
        $('.menu-p-public').unbind();
        $('.slide-back').unbind();
        adData.data.num += 1;
        $('.sec').hide();
        adData.sec2Method();


    }

}