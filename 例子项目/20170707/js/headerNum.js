'use strict';
var nav = func_elesByClass('nav_li', document),
   ipt_text = func_elesByClass('ipt_text', document)[0],
   icon_close = func_elesByClass('icon_close', document)[0],
   _search = func_elesByClass('_search', document)[0],
   _search_box = func_elesByClass('_search_box', document)[0],
   icon_search = func_elesByClass('icon_search', document)[0];

// 是否拥有 class
function func_hasClass(tar, cls) {

   var _re = new RegExp("(^|\\s)" + cls + "(\\s|$)");

   return _re.test(tar.className);
};

// 事件绑定函数
function func_bind(node, type, func) {

   if (typeof addEventListener !== "undefined") {

      node.addEventListener(type, func, false);

   } else if (typeof attachEvent !== "undefined") {

      node.attachEvent("on" + type, func);

   } else {

      node["on" + type] = func;
   }
};

// 设置元素的多个样式
function setStyle(obj, css) {
   for (var atr in css) {
      obj.style[atr] = css[atr];
   }
}

// 可配置的头部，num代表是tab-container a的下标
function setHeaderNum(num) {
   // nav[num].style.borderBottom='';
   setStyle(nav[num], {
      'border-bottom': '2px #BE0B0D solid',
      'color': '#BE0B0D'
   });
};

// 通过 class 获取元素，返回列表
// @need {function} func_hasClass
function func_elesByClass(cls, root) {
   var root = root || node_html,
      list = root.getElementsByTagName("*"),
      i = 0,
      len = list.length,
      nodes = [],
      fn_cls = func_hasClass;
   for (; i < len; i++) {
      fn_cls(list[i], cls) && nodes.push(list[i]);
   }
   return nodes;
};

// 文本框-刷新时清除文本框的值（非IE，IE的促发时机不同）
function clear_value() {
   ipt_text.value = "";
};
clear_value();

// 当前处于的页面
(function() {
   var curIndex = 0;

   if (typeof Header_v1_config !== "undefined") {

      !isNaN(Header_v1_config.curNavIndex) && (curIndex = Header_v1_config.curNavIndex);

   } else {

      (function() {

         var list = document.getElementsByTagName("script"),
            i = 0,
            len = list.length;

         for (; i < len; i++) {

            if (list[i].getAttribute("data-header-v1-cur")) {
               curIndex = +list[i].getAttribute("data-header-v1-cur");
            }
         }

      })();
   }

   // 元素存在才调用
   nav[curIndex] && setHeaderNum(curIndex);
})();

var timer,
   timer1;
var game_fold = document.getElementById('quotes_center');
var recommend_games_popup = document.getElementById('drop_down');
var _avatar = func_elesByClass('_avatar', document)[0],
   avatar_pop = func_elesByClass('avatar_pop', document)[0],
   news_pop = func_elesByClass('news_pop', document)[0],
   no_news = func_elesByClass('no_news', document)[0],
   has_news = func_elesByClass('has_news', document)[0];
// mouseover
function headerFoldOver(pop) {
   clearTimeout(timer1);
   timer = setTimeout(function() {
      pop.style.display = 'block';
      // setStyle(game_fold,{background: 'url('+COMMON.URL.STATIC+'/website/v1/images/list-ico-h.png) no-repeat top center'});
   }, 100);
};
// mouseout
function headerFoldOut(pop) {
   clearTimeout(timer);
   timer1 = setTimeout(function() {
      pop.style.display = 'none';
      // setStyle(game_fold,{background: 'url('+COMMON.URL.STATIC+'/website/v1/images/list-ico.png) no-repeat top center'});
   }, 100);
};

(function() {
   // 文本框-按下 enter 提交数据
   func_bind(ipt_text, "keyup", function(event) {
      if (event.keyCode === 13) {
         var kw = ipt_text.value;
         if (kw.replace(/\s/g, '') == '')
            return;
         kw = /\(.*\)/.test(kw)
            ? ""
            : encodeURI(kw);
         window.location.href = "http://gamecenter.17kx.com/web/17kx/search.html?kw=" + kw;
      }
   });

   // 提交按钮-点击提交数据
   func_bind(icon_search, "click", function(event) {
      var kw = ipt_text.value;
      if (kw.replace(/\s/g, '') == '')
         return;
      kw = /\(.*\)/.test(kw)
         ? ""
         : encodeURIComponent(kw);
      window.location.href = "http://gamecenter.17kx.com/web/17kx/search.html?kw=" + kw;
   });
   // 点击搜索图标出现搜索框
   func_bind(_search, 'click', function() {
      _search_box.style.display = "block";
   });
   // 关闭输入框
   func_bind(icon_close, 'click', function() {
      _search_box.style.display = "none";
   });

   // 头像的移入移出
   func_bind(_avatar, 'mouseenter', function () {
      headerFoldOver(avatar_pop);
   });
   func_bind(avatar_pop, 'mouseenter', function () {
      headerFoldOver(avatar_pop);
   });
   func_bind(_avatar, 'mouseleave', function () {
      headerFoldOut(avatar_pop);
   });
   func_bind(avatar_pop, 'mouseleave', function () {
      headerFoldOut(avatar_pop);
   });
   // 移动到无新的消息出现弹框
   func_bind(no_news, 'mouseenter', function () {
      headerFoldOver(news_pop);
   });
   func_bind(news_pop, 'mouseenter', function () {
      headerFoldOver(news_pop);
   });
   func_bind(no_news, 'mouseleave', function () {
      headerFoldOut(news_pop);
   });
   func_bind(news_pop, 'mouseleave', function () {
      headerFoldOut(news_pop);
   });

   // 移动到有新的消息出现弹框
   func_bind(has_news, 'mouseenter', function () {
      headerFoldOver(news_pop);
   });
   func_bind(news_pop, 'mouseenter', function () {
      headerFoldOver(news_pop);
   });
   func_bind(has_news, 'mouseleave', function () {
      headerFoldOut(news_pop);
   });
   func_bind(news_pop, 'mouseleave', function () {
      headerFoldOut(news_pop);
   });
})()
