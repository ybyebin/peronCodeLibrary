(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });


  });
})(jQuery);

$('.changes').click(function(){
  var a_slide = $('.admin-sidebar');
   if (a_slide.hasClass('admin-sidebar-small')) {
    a_slide.removeClass('admin-sidebar-small');
  }else{
    a_slide.addClass('admin-sidebar-small');
  }
  $('.admin-offcanvas-bar-big , .admin-offcanvas-bar-small').toggle();
})

function opens(){
  $('.admin-sidebar').removeClass('admin-sidebar-small');
  $('.admin-offcanvas-bar-big').show();
  $('.admin-offcanvas-bar-small').hide();
  // $('#admin-offcanvas').offCanvas();
}