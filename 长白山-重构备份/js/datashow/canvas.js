layui.use(['layer', 'element'], function() {
    var layer = layui.layer;
    layer = layui.layer;
    var element = layui.element;

    var warnVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            loadingShow: false,



        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {

                setCanvasWH();
                // 组件滚动
                Comscroll.picrun_ini("scroll_ul_2", 'scroll_div', "scroll_ul_1");
                $(".layui-tabscroll-item,.global-btn-body").mCustomScrollbar({
                    autoHideScrollbar: true
                });
                // 属性框打开关闭操作
                $('.attr-content-title').click(function() {
                    var _this = $(this);
                    var clas = 'collapsed';
                    var divs = '.' + _this.data('for');

                    if (_this.hasClass(clas)) {
                        _this.removeClass(clas);
                    } else {
                        _this.addClass(clas);
                    }
                    $(divs).stop().slideToggle(200);

                });

                // 自定义下拉群组 初始化
                bayaxInit();
                allCanvasinit('new');
            });

        },
        methods: {

        }
    });





});


var layer;

window.onresize = function() {
    setCanvasWH();
    imageCanvas.setZoom('1.2');

    var w = Number($('#canvas').width());
    var s = canvasData.width / w;
    // imageCanvas.setZoom('1');
    imageCanvas.setZoom(s);

}



var canvasData = {
    width: 0,
    init: true
}
var width = 0;
// 设置画布宽高
function setCanvasWH() {
    var canvas = $('#canvas');

    var w = Number(canvas.width());
    if (canvasData.init) {
        canvasData.width = w;
        canvasData.init = false;
    }
    // width = w;
    console.log(w)
    canvas.css('height', w * 9 / 16 + 'px');

}



var Comscroll = {
    Speed_1: 10,
    Space_1: 10,
    PageWidth_1: 50 * 10,
    interval_1: 5000,
    fill_1: 0,
    MoveLock_1: false,
    MoveTimeObj_1: '',
    MoveWay_1: "right",
    Comp_1: 0,
    scroll_ul_2: '',
    scroll_div: '',
    scroll_ul_1: '',
    GetObj: function(objName) {
        if (document.getElementById) {
            return eval('document.getElementById("' + objName + '")')
        } else {
            return eval('document.all.' + objName)
        }
    },
    GoUp: function(string) {
        var _this = this;
        if (this.MoveLock_1) return;
        console.log('查看2：' + string)
        this.MoveLock_1 = true;
        this.MoveWay_1 = "left";
        this.MoveTimeObj_1 = setInterval(function() {
            _this.ScrUp(_this.scroll_div)
        }, this.Speed_1);
    },
    StopUp: function(string) {
        if (this.MoveWay_1 == "right") {
            return
        };
        clearInterval(this.MoveTimeObj_1);
        if ((this.scroll_div.scrollLeft - this.fill_1) % this.PageWidth_1 != 0) {
            this.Comp_1 = this.fill_1 - (this.scroll_div.scrollLeft % this.PageWidth_1);
            this.CompScr_1(this.scroll_div)
        } else {
            this.MoveLock_1 = false
        }
    },
    ScrUp: function(obj) {
        if (obj.scrollLeft <= 0) {
            obj.scrollLeft = obj.scrollLeft + obj.offsetWidth
        }
        obj.scrollLeft -= this.Space_1;
    },
    GoDown: function(string, string2, string3) {
        var _this = this;
        clearInterval(this.MoveTimeObj_1);
        if (this.MoveLock_1) return;
        this.MoveLock_1 = true;
        this.MoveWay_1 = "right";
        this.ScrDown(this.scroll_div, this.scroll_ul_1);
        this.MoveTimeObj_1 = setInterval(function() {
            _this.ScrDown(_this.scroll_div, _this.scroll_ul_1);
        }, this.Speed_1)
    },
    StopDown: function(string) {
        var scrollDiv = this.scroll_div;
        var fill_1 = this.fill_1;
        var PageWidth_1 = this.PageWidth_1;
        if (this.MoveWay_1 == "left") {
            return
        };
        clearInterval(this.MoveTimeObj_1);
        if (scrollDiv.scrollLeft % PageWidth_1 - (fill_1 >= 0 ? fill_1 : fill_1 + 1) != 0) {
            this.Comp_1 = PageWidth_1 - scrollDiv.scrollLeft % PageWidth_1 + fill_1;
            this.CompScr_1(this.scroll_div);
        } else {
            this.MoveLock_1 = false
        }
    },
    ScrDown: function(obj1, obj2) {
        console.log(123)
        if (obj1.scrollLeft >= obj2.scrollWidth) {
            obj1.scrollLeft = obj1.scrollLeft - obj2.scrollWidth - 40
        }
        obj1.scrollLeft += this.Space_1;
    },
    CompScr_1: function(obj) {

        if (this.Comp_1 == 0) {
            this.MoveLock_1 = false;
            return
        }
        var num, TempSpeed = this.Speed_1,
            TempSpace = this.Space_1;
        if (Math.abs(this.Comp_1) < this.PageWidth_1 / 2) {
            TempSpace = Math.round(Math.abs(this.Comp_1 / this.Space_1));
            if (TempSpace < 1) {
                TempSpace = 1
            }
        }
        if (this.Comp_1 < 0) {
            if (this.Comp_1 < -TempSpace) {
                this.Comp_1 += TempSpace;
                num = TempSpace
            } else {
                num = -this.Comp_1;
                this.Comp_1 = 0
            }
            obj.scrollLeft -= num;
            setTimeout(this.CompScr_1(obj), TempSpeed)
        } else {
            if (this.Comp_1 > TempSpace) {
                this.Comp_1 -= TempSpace;
                num = TempSpace
            } else {
                num = this.Comp_1;
                this.Comp_1 = 0
            }
            obj.scrollLeft += num;
            setTimeout(this.CompScr_1(obj), TempSpeed)
        }
    },
    picrun_ini: function(string, string2, string3) {
        this.scroll_ul_2 = this.GetObj(string);
        this.scroll_ul_1 = this.GetObj(string3);
        this.scroll_div = this.GetObj(string2);


        this.scroll_ul_2.innerHTML = this.scroll_ul_1.innerHTML;
        this.scroll_div.scrollLeft = this.fill_1 >= 0 ? this.fill_1 : this.scroll_ul_1.scrollWidth - Math.abs(this.fill_1);
    }

}