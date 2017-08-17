'use strict';
(function() {
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
