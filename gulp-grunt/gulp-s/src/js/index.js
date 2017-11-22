$(function() {

    var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
    // adGame.changeLanguage(currentLang, languageType);

    adGame.changeLanguage('en-US', languageType);
    // DefaultLanguage = ''
    var ws = document.documentElement.clientHeight;

    var ww = ws * 750 / 1334;
    document.documentElement.style.fontSize = ww / 15 + "px";
    $('.sec').css('width', ww + 'px');
    $('.progress-bar').addClass('animal');

    setTimeout(function() {
        adGame.changeSec(function() {
            $('.sec-2').show();
            adGame.sec1BodyClick();

        });

    }, 2000)

});


window.onresize = function() {
    var ws = document.documentElement.clientHeight;

    var ww = ws * 750 / 1334;
    document.documentElement.style.fontSize = ww / 15 + "px";
    $('.sec').css('width', ww + 'px');
}

var DefaultLanguage = 'enUS';

var languageType = {
    // 汉语
    'zhCN': {

    },
    // 繁体
    'zhTW': {

    },
    // 韩语
    'ko': {

    },
    // 日语
    'ja': {

    },
    // 英语
    'enUS': {
        'sec1': {
            'p1': 'Look',
            'p2': 'Enemy undead army!',
            'p3': 'Soldiers, ready to play?'
        },
        'typeQB': {
            'sec3P1': 'Knights can destroy enemy',
            'sec3P2': 'formation. Better put',
            'sec3P3': 'them in the front line.'
        },
        'typeBUB': {
            'sec3P1': 'Footmen have high DEF',
            'sec3P2': 'rating. Better put them in',
            'sec3P3': 'the middle of the array.'
        },
        'typeGJS': {
            'sec3P1': 'Archers have high ATK but',
            'sec3P2': 'low DEF rating. Better put',
            'sec3P3': 'them in the rear line.'
        },
        // 引导
        'sec3YinDaoP1': {
            'sec3P1': 'Now put Knights in the',
            'sec3P2': 'array.',
            'sec3P3': ''
        },
        'sec3YinDaoP2': {
            'sec3P1': 'Good! Then footmen.',
            'sec3P2': '',
            'sec3P3': ''
        },
        'sec3YinDaoP3': {
            'sec3P1': 'Finally, Archers!',
            'sec3P2': '',
            'sec3P3': ''
        },
        'sec3YinDaoP4': {
            'sec3P1': 'Now let us crush them!',
            'sec3P2': '',
            'sec3P3': ''
        },

        // 攻击
        'fight': 'Attack',
        // 胜利失败
        'result': {
            'win': 'WIN',
            'fail': 'LOSE'
        },
        'sec4': {
            'win': {
                'p1': 'Congratulations on winning!',
                'p2': 'More challenges await.',
                'p3': 'Play now for free!'
            },
            'lose': {
                'p1': 'Want to get revenge',
                'p2': 'in the game? ',
                'p3': 'Play now for free!'
            }

        },
        // 按钮
        btnlangeage: {
            'playAgain': 'Try Again',
            'download': 'Download'
        }

    }
}
var img = {
    'qb': {
        'color': 'images/qb-color.png',
        'noColor': 'images/qb.png'
    },
    'bub': {
        'color': 'images/bub-color.png',
        'noColor': 'images/bub.png'
    },
    'gjs': {
        'color': 'images/gjs-color.png',
        'noColor': 'images/gjs.png'
    }
}

var adGame = {
    clickType: 'qb', //点击顺序   ['骑兵 qb','步兵bub','弓箭兵gjs']  ,
    clickNum: 1,
    alrearyHaveBing: ['sec3-army1-finger', 'sec3-army2-finger', 'sec3-army3-finger'],
    sec3P1: $('.sec3-p1'),
    sec3P2: $('.sec3-p2'),
    sec3P3: $('.sec3-p3'),
    changeSec: function(fun) {
        $('.sec').hide();
        fun();
    },

    // 修改语言-具体
    publicChange: function(language) {

        $('.sec-2-p1').text(language.sec1.p1);
        $('.sec-2-p2').text(language.sec1.p2);
        $('.sec-2-p3').text(language.sec1.p3);



        $('.fight-btn-span').text(language.fight);

        $('.p-again').text(language.btnlangeage.playAgain);
        $('.p-down').text(language.btnlangeage.download);
        $('.textdownload').text(language.btnlangeage.download);

    },
    // 判断语言
    changeLanguage: function(type, language) {
        var languages = '';
        switch (type) {
            case 'zh-CN':
                DefaultLanguage = 'zhCN';
                languages = language.zhCN;

                break;
            case 'zh-TW':
                DefaultLanguage = 'zhTW';
                languages = language.zhTW;
                break;
            case 'ko':
                break;
            case 'ko-KR':
                break;
            case 'ja':
                break;
            case 'ja-JP':
                break;
            case 'en-US':
                DefaultLanguage = 'enUS'
                languages = language.enUS;
                break;
            default:
                break;
        }

        adGame.publicChange(languages);

    },

    // sec1 全局点击
    sec1BodyClick: function() {
        $('.sec-2').on('click', function() {
            adGame.stepMethod1();
        });
    },

    // sec2 全局点击
    sec2BodyClick: function() {

        adGame.sec3P1.text(languageType[DefaultLanguage].typeQB.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].typeQB.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].typeQB.sec3P3);
        $('.sec-3').on('click', function() {
            adGame.stepMethod2();
        });

    },

    // step1
    stepOne: function() {
        $('.sec-3').unbind();
        $('.qb-bing').attr('src', img.qb.color);
        $('.bub-bing').attr('src', img.bub.noColor);
        $('.gjs-bing').attr('src', img.gjs.noColor);
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P3);
        $('.sec3-Bing-finger').show();
        $('.sec3-layer-finger').hide();
        $('.qb-bing').on('click', function() {
            $('.sec3-Bing-finger, .sec-3-layer').hide();
            $('.army3-finger').show();
            $('.qb-bing').unbind();
            $('.set-bing-click1').on('click', function() {
                var _this = $(this);
                _this.data('value', '1');
                _this.data('type', 'sec4-qb-animation');
                _this.data('spantype', 'sec4-qb');
                var ids = '#' + _this.data('id');
                // $(ids).attr('src', 'images/qb-army.png');
                $(ids + ' span').addClass('sec3-qb');

                var arr = adGame.alrearyHaveBing;
                arr.splice(arr.indexOf(_this.data('finger')), 1);
                adGame.stepTwo();
            });
        });
    },
    // step 2
    stepTwo: function() {
        $('.set-bing-click1').unbind();
        $('.army3-finger').hide();

        // 引导  layer
        $('.sec-3-layer').show();
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P3);

        $('.sec3-Bing-finger').show().addClass('sec3-Bing-finger-step2');

        $('.qb-bing').attr('src', img.qb.noColor);
        $('.bub-bing').attr('src', img.bub.color);
        $('.bub-bing').on('click', function() {
            $('.sec3-Bing-finger, .sec-3-layer').hide();

            adGame.alrearyHaveBing.forEach(function(element) {
                $('.' + element).show();
            });

            $('.bub-bing').unbind();
            $('.set-bing-click1').on('click', function() {
                var _this = $(this);
                console.log(_this.data('value'))
                if (_this.data('value') == '0') {
                    _this.data('value', '1');
                    _this.data('type', 'sec4-bub-animation');
                    _this.data('spantype', 'sec4-bub');
                    var ids = '#' + _this.data('id');
                    $(ids + ' span').addClass('sec3-bub');
                    // $(ids).attr('src', 'images/bub-army.png');
                    var arr = adGame.alrearyHaveBing;
                    arr.splice(arr.indexOf(_this.data('finger')), 1);
                    adGame.stepThree();
                }

            });
        });

    },
    // step 3
    stepThree: function() {
        $('.set-bing-click1').unbind();
        $('.army3-finger').hide();

        // 引导  layer
        $('.sec-3-layer').show();
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P3);

        $('.sec3-Bing-finger').show().addClass('sec3-Bing-finger-step3');

        $('.bub-bing').attr('src', img.bub.noColor);
        $('.gjs-bing').attr('src', img.gjs.color);
        $('.gjs-bing').on('click', function() {
            $('.sec3-Bing-finger, .sec-3-layer').hide();

            var clas = adGame.alrearyHaveBing[0];
            console.log(clas)
            switch (clas) {
                case 'sec3-army1-finger':
                    $('#div1').data('spantype', 'sec4-gjs');
                    $('#div1').data('type', 'sec4-gjs-animation');
                    break;
                case 'sec3-army2-finger':
                    $('#div2').data('spantype', 'sec4-gjs');
                    $('#div2').data('type', 'sec4-gjs-animation');
                    break;
                case 'sec3-army3-finger':
                    $('#div3').data('spantype', 'sec4-gjs');
                    $('#div3').data('type', 'sec4-gjs-animation');
                    break;
                default:
                    break;
            }
            var ids = '#' + $('.' + clas).data('id');
            console.log('查看：' + ids)
                // $(id).attr('src', 'images/gjs-army.png');
            $(ids + ' span').addClass('sec3-gjs');
            $('.gjs-bing').unbind();
            adGame.stepfour();
        });

    },
    stepfour: function() {
        $('.sec-3-layer, .sec3-layer-finger').show();
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P3);

        $('.sec-3-layer').on('click', function() {
            adGame.stepMethod3();
        });
    },
    stepFive: function() {
        $('.sec').hide();
        $('.sec-4').show();
        $('.sec-4-yup').addClass('y-up-hide');
        $('.sec-4-ydown').addClass('y-dowm-hide');


        var sec4BADiv1 = $('.sec4-bing-army-div1'); //第一排
        var sec4BADiv2 = $('.sec4-bing-army-div2'); //第二排
        var sec4BADiv3 = $('.sec4-bing-army-div3'); //第三排

        var sec4BADiv1Span = $('.sec4-bing-army-div1 span'); //第一排 兵
        var sec4BADiv2Span = $('.sec4-bing-army-div2 span'); //第二排 兵
        var sec4BADiv3Span = $('.sec4-bing-army-div3 span'); //第三排 兵

        var sec4BADiv1SodierFirst = $('.sec4-bing-army-div1 .soldier-li-first'); //第一排 第一个兵血量
        var sec4BADiv1SodierSecond = $('.sec4-bing-army-div1 .soldier-li-second'); //第一排 第二个兵血量
        var sec4BADiv1SodierThird = $('.sec4-bing-army-div1 .soldier-li-third'); // 第一排 第三个兵血量


        var sec4BADiv2SodierFirst = $('.sec4-bing-army-div2 .soldier-li-first'); //第二排 第一个兵血量
        var sec4BADiv2SodierSecond = $('.sec4-bing-army-div2 .soldier-li-second'); //第二排 第二个兵血量
        var sec4BADiv2SodierThird = $('.sec4-bing-army-div2 .soldier-li-third'); // 第二排 第三个兵血量



        var sec4BADiv3SodierFirst = $('.sec4-bing-army-div3 .soldier-li-first'); //第三排 第一个兵血量
        var sec4BADiv3SodierSecond = $('.sec4-bing-army-div3 .soldier-li-second'); //第三排 第二个兵血量
        var sec4BADiv3SodierThird = $('.sec4-bing-army-div3 .soldier-li-third'); // 第三排 第三个兵血量


        // 兵种判断条件
        var qb = 'sec4-qb';
        var bub = 'sec4-bub';
        var gjs = 'sec4-gjs';


        var span_arr = [];
        var arr_anima = [];
        $('.set-bing-click1').each(function(index, ele) {
            console.log($(ele).data('type'));
            span_arr.push($(ele).data('spantype'));
            arr_anima.push($(ele).data('type'));
        });
        console.log(JSON.stringify(span_arr, null, 2))
        console.log(JSON.stringify(arr_anima, null, 2))


        sec4BADiv1Span.addClass(span_arr[0]);
        sec4BADiv2Span.addClass(span_arr[1]);
        sec4BADiv3Span.addClass(span_arr[2]);





        setTimeout(function() {
            // $('.fight-btn-div').show();
            $('.fight-btn-div').show().on('click', function() {


                sec4BADiv1.addClass('invasions-div1');
                sec4BADiv2.addClass('invasions-div2');
                sec4BADiv3.addClass('invasions-div3');

                sec4BADiv1Span.addClass(arr_anima[0]);
                sec4BADiv2Span.addClass(arr_anima[1]);
                sec4BADiv3Span.addClass(arr_anima[2]);

                $(this).hide();
                var type = 0;


                if (span_arr[0] === qb && span_arr[1] === bub && span_arr[2] === gjs) {
                    type = 1;
                }
                if (span_arr[0] === qb && span_arr[1] === gjs && span_arr[2] === bub) {
                    type = 2;
                }

                if (span_arr[0] === bub && span_arr[1] === gjs && span_arr[2] === qb) {
                    type = 3;
                }
                if (span_arr[0] === bub && span_arr[1] === qb && span_arr[2] === gjs) {
                    type = 4
                }

                if (span_arr[0] === gjs && span_arr[1] === bub && span_arr[2] === qb) {
                    type = 5;
                }

                if (span_arr[0] === gjs && span_arr[1] === qb && span_arr[2] === bub) {
                    type = 6;
                }

                switch (type) {
                    case 1:
                        console.log('骑兵-步兵-弓箭兵');

                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood8');
                            sec4BADiv1SodierSecond.addClass('blood6');
                            sec4BADiv1SodierThird.addClass('blood8');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {
                                // 第二阶段 血量状态
                                $('.monster-div1').hide(); //怪一 消失

                                sec4BADiv1.addClass('invasions-div11');
                                sec4BADiv2.addClass('invasions-div22');
                                sec4BADiv3.addClass('invasions-div32');




                                setTimeout(function() {
                                    setTimeout(function() {
                                        sec4BADiv1SodierSecond.css('visibility', 'hidden');
                                    }, 300);

                                    setTimeout(function() {

                                        // 第一排血量 
                                        sec4BADiv1SodierFirst.addClass('blood4');
                                        sec4BADiv1SodierThird.addClass('blood4');

                                        // 第二排兵
                                        sec4BADiv2SodierFirst.addClass('blood6');
                                        sec4BADiv2SodierSecond.addClass('blood6');
                                        sec4BADiv2SodierThird.addClass('blood6');

                                        $('.monster-div2,.monster-div3').addClass('blood8'); //怪二 怪三 血量


                                        setTimeout(function() {

                                            sec4BADiv2.addClass('invasions-div23');
                                            sec4BADiv3.addClass('invasions-div33');
                                            sec4BADiv1.hide();

                                            // 第二排兵血量
                                            sec4BADiv2SodierFirst.addClass('blood4');
                                            sec4BADiv2SodierSecond.addClass('blood4');
                                            sec4BADiv2SodierThird.addClass('blood4');
                                            $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量

                                            setTimeout(function() {
                                                // 第二排血量
                                                sec4BADiv2SodierFirst.addClass('blood2');
                                                sec4BADiv2SodierSecond.addClass('blood2');
                                                sec4BADiv2SodierThird.addClass('blood2');
                                                $('.monster-div2,.monster-div3').hide(); //怪二 怪三 血量


                                                setTimeout(function() {
                                                    adGame.resultWin();
                                                    setTimeout(function() {
                                                        adGame.stepMethod4();
                                                    }, 1500)
                                                }, 1000)
                                            }, 1200)

                                        }, 1000);
                                    }, 500);

                                }, 800)

                            }, 400);
                        }, 1300);

                        break;
                    case 2:


                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood8');
                            sec4BADiv1SodierSecond.addClass('blood6');
                            sec4BADiv1SodierThird.addClass('blood8');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood6');
                            sec4BADiv2SodierSecond.addClass('blood6');
                            sec4BADiv2SodierThird.addClass('blood6');

                            setTimeout(function() {
                                // 第二阶段 血量状态
                                $('.monster-div1').hide(); //怪一 消失

                                sec4BADiv1.addClass('invasions-div11');
                                sec4BADiv2.addClass('invasions-div22');
                                sec4BADiv3.addClass('invasions-div32');




                                setTimeout(function() {
                                    setTimeout(function() {
                                        sec4BADiv1SodierSecond.css('visibility', 'hidden');
                                    }, 300);

                                    setTimeout(function() {

                                        // 第一排血量 
                                        sec4BADiv1SodierFirst.addClass('blood4');
                                        sec4BADiv1SodierThird.addClass('blood4');

                                        $('.monster-div2,.monster-div3').addClass('blood8'); //怪二 怪三 血量


                                        setTimeout(function() {

                                            sec4BADiv2.addClass('invasions-div23');
                                            sec4BADiv3.addClass('invasions-div33');
                                            sec4BADiv1.hide();

                                            // 第二排兵血量
                                            sec4BADiv2SodierFirst.addClass('blood4');
                                            sec4BADiv2SodierSecond.addClass('blood4');
                                            sec4BADiv2SodierThird.addClass('blood4');
                                            $('.monster-div2,.monster-div3').addClass('blood4'); //怪二 怪三 血量

                                            setTimeout(function() {
                                                // 第二排血量
                                                sec4BADiv2SodierFirst.addClass('blood2');
                                                sec4BADiv2SodierSecond.addClass('blood2');
                                                sec4BADiv2SodierThird.addClass('blood2');


                                                // 第三排血量
                                                sec4BADiv3SodierFirst.addClass('blood6');
                                                sec4BADiv3SodierSecond.addClass('blood6');
                                                sec4BADiv3SodierThird.addClass('blood6');


                                                setTimeout(function() {
                                                    sec4BADiv2.hide();
                                                    sec4BADiv3.addClass('invasions-div34');
                                                    setTimeout(function() {
                                                        sec4BADiv3SodierFirst.addClass('blood2');
                                                        sec4BADiv3SodierSecond.addClass('blood2');
                                                        sec4BADiv3SodierThird.addClass('blood2');

                                                        $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量

                                                        setTimeout(function() {
                                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三 
                                                            sec4BADiv3SodierFirst.css('visibility', 'hidden');
                                                            sec4BADiv3SodierThird.css('visibility', 'hidden');

                                                            setTimeout(function() {
                                                                adGame.resultWin();
                                                                setTimeout(function() {
                                                                    adGame.stepMethod4();
                                                                }, 1500)
                                                            }, 1000);
                                                        }, 1000)


                                                    }, 1000)
                                                }, 1000);
                                            }, 1200)

                                        }, 1000);
                                    }, 500);

                                }, 800)

                            }, 400);
                        }, 1300);


                        break;
                    case 3:
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态
                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵


                            sec4BADiv1SodierSecond.css('visibility', 'hidden');
                            sec4BADiv1SodierFirst.addClass('blood8');
                            sec4BADiv1SodierThird.addClass('blood8');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood6');
                            sec4BADiv2SodierSecond.addClass('blood6');
                            sec4BADiv2SodierThird.addClass('blood6');

                            setTimeout(function() {

                                sec4BADiv1.hide();

                                sec4BADiv2.addClass('invasions-div24');
                                sec4BADiv3.addClass('invasions-div35');

                                setTimeout(function() {
                                    // 第二排兵
                                    // 怪
                                    $('.monster-div1').addClass('blood2');
                                    sec4BADiv2SodierFirst.addClass('blood2');
                                    sec4BADiv2SodierSecond.addClass('blood2');
                                    sec4BADiv2SodierThird.addClass('blood2');

                                    sec4BADiv3SodierFirst.addClass('blood6');
                                    sec4BADiv3SodierSecond.addClass('blood6');
                                    sec4BADiv3SodierThird.addClass('blood6');

                                    setTimeout(function() {
                                        $('.monster-div1').hide();
                                        sec4BADiv2.hide();
                                        sec4BADiv3.addClass('invasions-div36');
                                        setTimeout(function() {
                                            sec4BADiv3SodierFirst.addClass('blood4');
                                            sec4BADiv3SodierSecond.addClass('blood4');
                                            sec4BADiv3SodierThird.addClass('blood4');

                                            setTimeout(function() {
                                                $('.monster-div2,.monster-div3').addClass('blood6'); //怪二 怪三 血量
                                                setTimeout(function() {
                                                    sec4BADiv3.hide();
                                                    $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量
                                                    adGame.resultLose();
                                                    setTimeout(function() {
                                                        adGame.stepMethod4();
                                                    }, 2000)

                                                }, 800)
                                            }, 2000)
                                        }, 700)
                                    }, 500);
                                }, 1000)

                            }, 1000);
                        }, 1300);

                        break;
                    case 4:
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood6');
                            // 第一排兵


                            sec4BADiv1SodierSecond.css('visibility', 'hidden');
                            sec4BADiv1SodierFirst.addClass('blood2');
                            sec4BADiv1SodierThird.addClass('blood2');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {

                                sec4BADiv1.hide();

                                sec4BADiv2.addClass('invasions-div24');
                                sec4BADiv3.addClass('invasions-div35');

                                setTimeout(function() {
                                    // 第二排兵
                                    // 怪
                                    $('.monster-div1').addClass('blood4');
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood4');
                                    sec4BADiv2SodierThird.addClass('blood6');


                                    setTimeout(function() {
                                        $('.monster-div1').hide();
                                        sec4BADiv2.hide();
                                        sec4BADiv3.addClass('invasions-div36');
                                        setTimeout(function() {
                                            $('.monster-div2,.monster-div3').addClass('blood6');

                                            setTimeout(function() {
                                                sec4BADiv3.hide();
                                                $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量

                                                adGame.resultLose();
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 2000)
                                            }, 2000)
                                        }, 700)
                                    }, 500);
                                }, 1000)

                            }, 1000);
                        }, 1300);
                        break;
                    case 5:
                        console.log("弓箭手-步兵-骑兵")
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood8');
                            // 第一排兵


                            sec4BADiv1SodierSecond.css('visibility', 'hidden');
                            sec4BADiv1SodierFirst.addClass('blood2');
                            sec4BADiv1SodierThird.addClass('blood2');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {

                                sec4BADiv1.hide();

                                sec4BADiv2.addClass('invasions-div24');
                                sec4BADiv3.addClass('invasions-div35');

                                setTimeout(function() {
                                    // 第二排兵
                                    // 怪
                                    $('.monster-div1').addClass('blood4');
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood4');
                                    sec4BADiv2SodierThird.addClass('blood6');

                                    sec4BADiv3SodierFirst.addClass('blood8');
                                    sec4BADiv3SodierSecond.addClass('blood8');
                                    sec4BADiv3SodierThird.addClass('blood8');


                                    setTimeout(function() {
                                        $('.monster-div1').hide();
                                        sec4BADiv2.hide();
                                        sec4BADiv3.addClass('invasions-div36');
                                        setTimeout(function() {
                                            $('.monster-div2,.monster-div3').addClass('blood8');
                                            sec4BADiv3SodierFirst.addClass('blood6');
                                            sec4BADiv3SodierSecond.addClass('blood6');
                                            sec4BADiv3SodierThird.addClass('blood6');
                                            setTimeout(function() {
                                                sec4BADiv3.hide();
                                                $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量

                                                adGame.resultLose();
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 2000)
                                            }, 2000)
                                        }, 700)
                                    }, 500);
                                }, 1000)

                            }, 1000);
                        }, 1300);
                        break;
                    case 6:
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood8');
                            // 第一排兵


                            sec4BADiv1SodierSecond.css('visibility', 'hidden');
                            sec4BADiv1SodierFirst.addClass('blood2');
                            sec4BADiv1SodierThird.addClass('blood2');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {

                                sec4BADiv1.hide();

                                sec4BADiv2.addClass('invasions-div24');
                                sec4BADiv3.addClass('invasions-div35');

                                setTimeout(function() {
                                    // 第二排兵
                                    // 怪
                                    $('.monster-div1').addClass('blood4');
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood4');
                                    sec4BADiv2SodierThird.addClass('blood6');

                                    sec4BADiv3SodierFirst.addClass('blood8');
                                    sec4BADiv3SodierSecond.addClass('blood8');
                                    sec4BADiv3SodierThird.addClass('blood8');


                                    setTimeout(function() {
                                        $('.monster-div1').hide();
                                        sec4BADiv2.hide();
                                        sec4BADiv3.addClass('invasions-div36');
                                        setTimeout(function() {
                                            $('.monster-div2,.monster-div3').addClass('blood8');
                                            sec4BADiv3SodierFirst.addClass('blood4');
                                            sec4BADiv3SodierSecond.addClass('blood4');
                                            sec4BADiv3SodierThird.addClass('blood4');
                                            setTimeout(function() {
                                                sec4BADiv3.hide();
                                                $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量

                                                adGame.resultLose();
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 2000)
                                            }, 2000)
                                        }, 700)
                                    }, 500);
                                }, 1000)

                            }, 1000);
                        }, 1300);
                        break;
                    default:
                        break;
                }
            });

        }, 1000)
    },

    stepMethod1: function() {
        $('.yun-up').addClass('y-up-appear');
        $('.yun-down').addClass('y-dowm-appear');

        setTimeout(function() {
            adGame.changeSec(function() {
                $('.sec-3').show();
                $('.sec-3-yup').addClass('y-up-hide');
                $('.sec-3-ydown').addClass('y-dowm-hide');
                $(".sec-2").unbind();
                adGame.sec2BodyClick();
            });
        }, 2000)
    },
    stepMethod2: function() {
        if (adGame.clickType === 'qb') {
            adGame.sec3P1.text(languageType[DefaultLanguage].typeBUB.sec3P1);
            adGame.sec3P2.text(languageType[DefaultLanguage].typeBUB.sec3P2);
            adGame.sec3P3.text(languageType[DefaultLanguage].typeBUB.sec3P3);

            $('.qb-bing').attr('src', 'images/qb.png');
            $('.bub-bing').attr('src', 'images/bub-color.png');

            adGame.clickType = 'bub';
        } else if (adGame.clickType === 'bub') {
            adGame.sec3P1.text(languageType[DefaultLanguage].typeGJS.sec3P1);
            adGame.sec3P2.text(languageType[DefaultLanguage].typeGJS.sec3P2);
            adGame.sec3P3.text(languageType[DefaultLanguage].typeGJS.sec3P3);
            $('.bub-bing').attr('src', 'images/bub.png');
            $('.gjs-bing').attr('src', 'images/gjs-color.png');
            adGame.clickType = 'gjs';
        } else if (adGame.clickType === 'gjs') {
            adGame.stepOne();

        }
    },
    stepMethod3: function() {

        $('.yun-up-3').addClass('y-up-appear');
        $('.yun-down-3').addClass('y-dowm-appear');
        $('.sec-3-layer').unbind();
        setTimeout(function() {
            adGame.stepFive();
        }, 2000)
    },

    setResultText: function(res) {
        var dic = '';
        if (res) {
            dic = languageType[DefaultLanguage].sec4.win;
        } else {
            dic = languageType[DefaultLanguage].sec4.lose;
        }

        $('.sec4-p1').text(dic.p1);
        $('.sec4-p2').text(dic.p2);
        $('.sec4-p3').text(dic.p3);

    },
    // 胜利
    resultWin: function() {
        $('.bg-model,.result-text').show();
        $('.rusult-img').attr('src', 'images/win.png').show();
        $('.result-span').text(languageType[DefaultLanguage].result.win).removeClass('result-span-gray');

        adGame.setResultText(true);



    },
    // 失败
    resultLose: function() {
        $('.bg-model,.result-text').show();
        $('.rusult-img').attr('src', 'images/fail.png').show();
        $('.result-span').text(languageType[DefaultLanguage].result.fail).addClass('result-span-gray');
        adGame.setResultText(false);
    },


    stepMethod4: function() {
        $('.fight-btn-div').unbind();
        $('.rusult-img,.result-text').hide();
        $('.sec-tips').show();
        if (adGame.clickNum === 3) {
            $('.sec-tips-1').hide();
            $('.sec-tips-3').show();
        } else {
            $('.sec-tips-1').show();
        }

        $('.sec-4').unbind();
    }
}

// 再玩一次
function playAgain() {
    adGame.clickNum += 1;
    $('body').unbind();

    $('.yun-up').removeClass('y-up-appear');
    $('.yun-down').removeClass('y-dowm-appear');
    $('.sec-3-yup').removeClass('y-up-hide');
    $('.sec-3-ydown').removeClass('y-dowm-hide');
    $('.yun-up-3').removeClass('y-up-appear');
    $('.yun-down-3').removeClass('y-dowm-appear');

    $('.qb-bing').attr('src', 'images/qb-color.png');
    $('.bub-bing').attr('src', 'images/bub.png');
    $('.gjs-bing').attr('src', 'images/gjs.png');
    $('.bing-army-img').attr('src', 'images/17.png');

    $('.sec3-Bing-finger').hide().removeClass('sec3-Bing-finger-step2 sec3-Bing-finger-step3');

    $('.set-bing-click1').each(function(index, ele) {
        $(ele).data('value', '0');
        $(ele).data('type', '');
        $(ele).data('spantype', '');
    });

    $('.sec4-bing-army-div span').removeClass('sec4-qb sec4-bub sec4-gjs sec4-qb-animation sec4-bub-animation sec4-gjs-animation');
    $('.set-bing-click1 span').removeClass('sec3-qb sec3-bub sec3-gjs');
    $('.sec4-bing-army-div1').removeClass('invasions-div1 invasions-div11');
    $('.sec4-bing-army-div2').removeClass('invasions-div2 invasions-div22 invasions-div23 invasions-div24');
    $('.sec4-bing-army-div3').removeClass('invasions-div3 invasions-div32 invasions-div33 invasions-div34 invasions-div35 invasions-div36');



    $('.sec4-bing-army-div1, .sec4-bing-army-div2, .sec4-bing-army-div3, .monster-div1, .monster-div2, .monster-div3').show();
    $('.sec4-bing-army-div1 .soldier-li , .sec4-bing-army-div2 .soldier-li, .sec4-bing-army-div3 .soldier-li').css('visibility', 'visible');
    $('.monster-div1,.monster-div2,.monster-div3').removeClass('blood2 blood4 blood6 blood8');

    $('.sec4-bing-army-div1 .soldier-li').removeClass('blood2 blood4 blood6 blood8'); //第一排 兵血量
    $('.sec4-bing-army-div2 .soldier-li').removeClass('blood2 blood4 blood6 blood8');; //第二排 兵血量
    $('.sec4-bing-army-div3 .soldier-li').removeClass('blood2 blood4 blood6 blood8');; //第三排 兵血量






    $('.sec-4-hide').hide();
    adGame.clickType = 'qb';
    adGame.alrearyHaveBing = ['sec3-army1-finger', 'sec3-army2-finger', 'sec3-army3-finger'];
    adGame.changeSec(function() {
        $('.sec-2').show();
        setTimeout(function() {
            adGame.sec1BodyClick();
        }, 1000)
    });
}