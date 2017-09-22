$(function(){

})

$('.cy-changs').on('click',function(){
	  var slide = $('.layui-side');
	  var bodys = $('.layui-body');
   if (slide.hasClass('cy-slide-small')) {
    	slide.removeClass('cy-slide-small');
    	bodys.removeClass('cy-body-small');

  }else{
    slide.addClass('cy-slide-small');
    bodys.addClass('cy-body-small');
  }
  $('.cy-scroll-big , .cy-scroll-small').toggle();
});