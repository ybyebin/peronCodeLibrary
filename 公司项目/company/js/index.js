$(function() {
  $('#myCarousel').flexslider({
    animation: "slide",
    direction: "horizontal",
    easing: "swing"

  });
  getOs();
})

// 判断浏览器
function getOs() {
  var OsObject = "";
  if (navigator.userAgent.indexOf("MSIE") > 0) {
    // $('#container').addClass('head-container');
    // $('#myCarousel').addClass('myCarousel');
    $('.product-div i').addClass('arrow-downs');
    // $('.second-div').addClass('second-divie');
    // $('.five-div').addClass('five-divie');
    // $('.five-div .row4').addClass('row4-divie');
    // $('#foot').addClass('foot');



  } else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
    return "Firefox";
  } else if (isMozilla = navigator.userAgent.indexOf("Opera") > 0) { //这个也被判断为chrome
    return "Opera";
  } else if (isFirefox = navigator.userAgent.indexOf("Chrome") > 0) {
    return "Chrome";
  } else if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
    return "Safari";
  } else if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
    return "Camino";
  } else if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
    return "Gecko";
  }

}


$(".panasonic").hover(function() {
  // $(".panasonic img").attr('src','images/caseLogoPanasonic2.png');
  // $(".panasonic").css('padding-top','45px');
  // $(".panasonic p").css('margin-top','35px');
}, function() {
  // $(".panasonic img").attr('src','images/caseLogoPanasonic1.png');
  // $(".panasonic").css('padding-top','20px');
  // $(".panasonic p").css('margin-top','15px');
});