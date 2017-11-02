var minheight = 20;
var maxheight = 3000;
var time = 100;
var timer = null;
var toggled = false;
 
window.onload = function() {
  var controler = document.getElementById('slide');
  var slider = document.getElementById('slider');
  slider.style.height = minheight + 'px';
  controler.onclick = function() {  
    clearInterval(timer);
    var instanceheight = parseInt(slider.style.height);
    var init = (new Date()).getTime();
    var height = (toggled = !toggled) ? maxheight: minheight; 
     
    var disp = height - parseInt(slider.style.height);
    timer = setInterval(function() {
      var instance = (new Date()).getTime() - init;
      if(instance < time ) {
        var pos = Math.floor(disp * instance / time);
        result = instanceheight + pos;
        slider.style.height =  result + 'px';
        // document.getElementById('log').innerHTML = 'Current Height : <b>' + result + '</b><br /> Current Time : <b>' + instance + '</b>';
      }else {
        slider.style.height = height + 'px'; //safety side ^^
        clearInterval(timer);
        controler.value = toggled ? ' Slide Up ' :' Slide Down ';
        // document.getElementById('log').innerHTML = 'Current Height : <b>' + height + '</b><br /> Current Time : <b>' + time + '</b>';
      }
    },1);
  };
};