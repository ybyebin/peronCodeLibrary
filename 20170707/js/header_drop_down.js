'use strict';
(function() {
   func_bind(game_fold, 'mouseenter', function () {
      headerFoldOver(recommend_games_popup);
   });
   func_bind(recommend_games_popup, 'mouseenter', function () {
      headerFoldOver(recommend_games_popup);
   });
   func_bind(game_fold, 'mouseleave', function () {
      headerFoldOut(recommend_games_popup);
   });
   func_bind(recommend_games_popup, 'mouseleave', function () {
      headerFoldOut(recommend_games_popup);
   });

})()
