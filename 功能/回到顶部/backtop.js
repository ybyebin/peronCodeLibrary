 goTop: function(duration) {
     var durations = duration || 300;
     var y1 = 0;
     var y2 = 0;
     var y3 = 0;
     if (document.documentElement) {
         y1 = document.documentElement.scrollTop || 0;
     }
     if (document.body) {
         y2 = document.body.scrollTop || 0;
     }
     var y3 = window.scrollY || 0;
     // 滚动条到页面顶部的垂直距离 
     var y = Math.max(y1, Math.max(y2, y3));
     for (var i = 60; i >= 0; i--) {
         setTimeout(function(i) {
             return function() {
                 window.scrollTo(0, y * i / 60);
             };
         }(i), durations * (1 - i / 60));
     }

 }