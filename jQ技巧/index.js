// 1.返回顶部按钮
// 你可以利用 animate 和 scrollTop 来实现返回顶部的动画，而不需要使用其他插件。
// Back to top
$('a.top').click(function () {
  $(document.body).animate({scrollTop: 0}, 800);
  return false;
});

// - 返回顶部的通用方法
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            }, 10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
    }
};
backTop('goTop');













// <a class="top" href="#">Back to top</a>
// // 改变 scrollTop 的值可以调整返回距离顶部的距离，而 animate 的第二个参数是执行返回动作需要的时间(单位：毫秒)。
// // 2.预加载图片
// 如果你的页面中使用了很多不可见的图片（如：hover 显示），你可能需要预加载它们：
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover1.png', 'img/hover2.png');
// 3.检查图片是否加载完成
// 有时候你需要确保图片完成加载完成以便执行后面的操作：
$('img').load(function () {
  console.log('image load successful');
});
// 你可以把 img 替换为其他的 ID 或者 class 来检查指定图片是否加载完成。

