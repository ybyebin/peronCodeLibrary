 	var window_width = document.documentElement.clientWidth;
    var window_height = document.documentElement.clientHeight;
    window.onresize= function(){
        var window_width = document.documentElement.clientWidth;
        var window_height = document.documentElement.clientHeight;
    };
    (function () {
        function o() {
            document.documentElement.style.fontSize = (document.documentElement.clientWidth > 640 ? 640 : document.documentElement.clientWidth) / 16 + "px"
        }
        var e = null;
        window.addEventListener("resize", function () {
            clearTimeout(e), e = setTimeout(o, 300)
        }, !1), o()
    })(window);
