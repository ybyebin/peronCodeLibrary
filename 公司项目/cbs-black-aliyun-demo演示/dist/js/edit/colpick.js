!function(t){var a=function(){var a={showEvent:"click",onShow:function(){},onBeforeShow:function(){},onHide:function(){},onChange:function(){},onSubmit:function(){},colorScheme:"light",color:"3289c7",livePreview:!0,flat:!1,layout:"full",submit:1,submitText:"OK",height:156},i=function(a,i){var e=c(a);t(i).data("colpick").fields.eq(1).val(e.r).end().eq(2).val(e.g).end().eq(3).val(e.b).end()},l=function(a,i){t(i).data("colpick").fields.eq(4).val(Math.round(a.h)).end().eq(5).val(Math.round(a.s)).end().eq(6).val(Math.round(a.b)).end()},r=function(a,i){t(i).data("colpick").fields.eq(0).val(d(a))},n=function(a,i){t(i).data("colpick").selector.css("backgroundColor","#"+d({h:a.h,s:100,b:100})),t(i).data("colpick").selectorIndic.css({left:parseInt(t(i).data("colpick").height*a.s/100,10),top:parseInt(t(i).data("colpick").height*(100-a.b)/100,10)})},s=function(a,i){t(i).data("colpick").hue.css("top",parseInt(t(i).data("colpick").height-t(i).data("colpick").height*a.h/360,10))},p=function(a,i){t(i).data("colpick").currentColor.css("backgroundColor","#"+d(a))},h=function(a,i){t(i).data("colpick").newColor.css("backgroundColor","#"+d(a))},u=function(a){var p,u=t(this).parent().parent();this.parentNode.className.indexOf("_hex")>0?(u.data("colpick").color=p=e(E(this.value)),i(p,u.get(0)),l(p,u.get(0))):this.parentNode.className.indexOf("_hsb")>0?(u.data("colpick").color=p=S({h:parseInt(u.data("colpick").fields.eq(4).val(),10),s:parseInt(u.data("colpick").fields.eq(5).val(),10),b:parseInt(u.data("colpick").fields.eq(6).val(),10)}),i(p,u.get(0)),r(p,u.get(0))):(u.data("colpick").color=p=o(X({r:parseInt(u.data("colpick").fields.eq(1).val(),10),g:parseInt(u.data("colpick").fields.eq(2).val(),10),b:parseInt(u.data("colpick").fields.eq(3).val(),10)})),r(p,u.get(0)),l(p,u.get(0))),n(p,u.get(0)),s(p,u.get(0)),h(p,u.get(0)),u.data("colpick").onChange.apply(u.parent(),[p,d(p),c(p),u.data("colpick").el,0])},f=function(a){t(this).parent().removeClass("colpick_focus")},v=function(){t(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus"),t(this).parent().addClass("colpick_focus")},g=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;var i=t(this).parent().find("input").focus(),e={el:t(this).parent().addClass("colpick_slider"),max:this.parentNode.className.indexOf("_hsb_h")>0?360:this.parentNode.className.indexOf("_hsb")>0?100:255,y:a.pageY,field:i,val:parseInt(i.val(),10),preview:t(this).parent().parent().data("colpick").livePreview};t(document).mouseup(e,_),t(document).mousemove(e,k)},k=function(t){return t.data.field.val(Math.max(0,Math.min(t.data.max,parseInt(t.data.val-t.pageY+t.data.y,10)))),t.data.preview&&u.apply(t.data.field.get(0),[!0]),!1},_=function(a){return u.apply(a.data.field.get(0),[!0]),a.data.el.removeClass("colpick_slider").find("input").focus(),t(document).off("mouseup",_),t(document).off("mousemove",k),!1},m=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;var i={cal:t(this).parent(),y:t(this).offset().top};t(document).on("mouseup touchend",i,x),t(document).on("mousemove touchmove",i,b);var e="touchstart"==a.type?a.originalEvent.changedTouches[0].pageY:a.pageY;return u.apply(i.cal.data("colpick").fields.eq(4).val(parseInt(360*(i.cal.data("colpick").height-(e-i.y))/i.cal.data("colpick").height,10)).get(0),[i.cal.data("colpick").livePreview]),!1},b=function(t){var a="touchmove"==t.type?t.originalEvent.changedTouches[0].pageY:t.pageY;return u.apply(t.data.cal.data("colpick").fields.eq(4).val(parseInt(360*(t.data.cal.data("colpick").height-Math.max(0,Math.min(t.data.cal.data("colpick").height,a-t.data.y)))/t.data.cal.data("colpick").height,10)).get(0),[t.data.preview]),!1},x=function(a){return i(a.data.cal.data("colpick").color,a.data.cal.get(0)),r(a.data.cal.data("colpick").color,a.data.cal.get(0)),t(document).off("mouseup touchend",x),t(document).off("mousemove touchmove",b),!1},y=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;var i={cal:t(this).parent(),pos:t(this).offset()};i.preview=i.cal.data("colpick").livePreview,t(document).on("mouseup touchend",i,M),t(document).on("mousemove touchmove",i,w);var e;return"touchstart"==a.type?(pageX=a.originalEvent.changedTouches[0].pageX,e=a.originalEvent.changedTouches[0].pageY):(pageX=a.pageX,e=a.pageY),u.apply(i.cal.data("colpick").fields.eq(6).val(parseInt(100*(i.cal.data("colpick").height-(e-i.pos.top))/i.cal.data("colpick").height,10)).end().eq(5).val(parseInt(100*(pageX-i.pos.left)/i.cal.data("colpick").height,10)).get(0),[i.preview]),!1},w=function(t){var a;return"touchmove"==t.type?(pageX=t.originalEvent.changedTouches[0].pageX,a=t.originalEvent.changedTouches[0].pageY):(pageX=t.pageX,a=t.pageY),u.apply(t.data.cal.data("colpick").fields.eq(6).val(parseInt(100*(t.data.cal.data("colpick").height-Math.max(0,Math.min(t.data.cal.data("colpick").height,a-t.data.pos.top)))/t.data.cal.data("colpick").height,10)).end().eq(5).val(parseInt(100*Math.max(0,Math.min(t.data.cal.data("colpick").height,pageX-t.data.pos.left))/t.data.cal.data("colpick").height,10)).get(0),[t.data.preview]),!1},M=function(a){return i(a.data.cal.data("colpick").color,a.data.cal.get(0)),r(a.data.cal.data("colpick").color,a.data.cal.get(0)),t(document).off("mouseup touchend",M),t(document).off("mousemove touchmove",w),!1},I=function(a){var i=t(this).parent(),e=i.data("colpick").color;i.data("colpick").origColor=e,p(e,i.get(0)),i.data("colpick").onSubmit(e,d(e),c(e),i.data("colpick").el)},C=function(a){a.stopPropagation();var i=t("#"+t(this).data("colpickId"));i.data("colpick").onBeforeShow.apply(this,[i.get(0)]);var e=t(this).offset(),o=e.top+this.offsetHeight,c=e.left,l=q(),d=i.width();c+d>l.l+l.w&&(c-=d),i.css({left:c+"px",top:o+"px"}),0!=i.data("colpick").onShow.apply(this,[i.get(0)])&&i.show(),t("html").mousedown({cal:i},T),i.mousedown(function(t){t.stopPropagation()})},T=function(a){0!=a.data.cal.data("colpick").onHide.apply(this,[a.data.cal.get(0)])&&a.data.cal.hide(),t("html").off("mousedown",T)},q=function(){var t="CSS1Compat"==document.compatMode;return{l:window.pageXOffset||(t?document.documentElement.scrollLeft:document.body.scrollLeft),w:window.innerWidth||(t?document.documentElement.clientWidth:document.body.clientWidth)}},S=function(t){return{h:Math.min(360,Math.max(0,t.h)),s:Math.min(100,Math.max(0,t.s)),b:Math.min(100,Math.max(0,t.b))}},X=function(t){return{r:Math.min(255,Math.max(0,t.r)),g:Math.min(255,Math.max(0,t.g)),b:Math.min(255,Math.max(0,t.b))}},E=function(t){var a=6-t.length;if(a>0){for(var i=[],e=0;e<a;e++)i.push("0");i.push(t),t=i.join("")}return t},L=function(){var a=t(this).parent(),e=a.data("colpick").origColor;a.data("colpick").color=e,i(e,a.get(0)),r(e,a.get(0)),l(e,a.get(0)),n(e,a.get(0)),s(e,a.get(0)),h(e,a.get(0))};return{init:function(c){if(c=t.extend({},a,c||{}),"string"==typeof c.color)c.color=e(c.color);else if(void 0!=c.color.r&&void 0!=c.color.g&&void 0!=c.color.b)c.color=o(c.color);else{if(void 0==c.color.h||void 0==c.color.s||void 0==c.color.b)return this;c.color=S(c.color)}return this.each(function(){if(!t(this).data("colpickId")){var a=t.extend({},c);a.origColor=c.color;var e="collorpicker_"+parseInt(1e3*Math.random());t(this).data("colpickId",e);var o=t('<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>').attr("id",e);o.addClass("colpick_"+a.layout+(a.submit?"":" colpick_"+a.layout+"_ns")),"light"!=a.colorScheme&&o.addClass("colpick_"+a.colorScheme),o.find("div.colpick_submit").html(a.submitText).click(I),a.fields=o.find("input").change(u).blur(f).focus(v),o.find("div.colpick_field_arrs").mousedown(g).end().find("div.colpick_current_color").click(L),a.selector=o.find("div.colpick_color").on("mousedown touchstart",y),a.selectorIndic=a.selector.find("div.colpick_selector_outer"),a.el=this,a.hue=o.find("div.colpick_hue_arrs"),huebar=a.hue.parent();var d=navigator.userAgent.toLowerCase(),k="Microsoft Internet Explorer"===navigator.appName,_=k?parseFloat(d.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]):0,b=k&&_<10,x=["#ff0000","#ff0080","#ff00ff","#8000ff","#0000ff","#0080ff","#00ffff","#00ff80","#00ff00","#80ff00","#ffff00","#ff8000","#ff0000"];if(b){var w,M;for(w=0;w<=11;w++)M=t("<div></div>").attr("style","height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr="+x[w]+", endColorstr="+x[w+1]+'); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='+x[w]+", endColorstr="+x[w+1]+')";'),huebar.append(M)}else stopList=x.join(","),huebar.attr("style","background:-webkit-linear-gradient(top,"+stopList+"); background: -o-linear-gradient(top,"+stopList+"); background: -ms-linear-gradient(top,"+stopList+"); background:-moz-linear-gradient(top,"+stopList+"); -webkit-linear-gradient(top,"+stopList+"); background:linear-gradient(to bottom,"+stopList+"); ");o.find("div.colpick_hue").on("mousedown touchstart",m),a.newColor=o.find("div.colpick_new_color"),a.currentColor=o.find("div.colpick_current_color"),o.data("colpick",a),i(a.color,o.get(0)),l(a.color,o.get(0)),r(a.color,o.get(0)),s(a.color,o.get(0)),n(a.color,o.get(0)),p(a.color,o.get(0)),h(a.color,o.get(0)),a.flat?(o.appendTo(this).show(),o.css({position:"relative",display:"block"})):(o.appendTo(document.body),t(this).on(a.showEvent,C),o.css({position:"absolute"}))}})},showPicker:function(){return this.each(function(){t(this).data("colpickId")&&C.apply(this)})},hidePicker:function(){return this.each(function(){t(this).data("colpickId")&&t("#"+t(this).data("colpickId")).hide()})},setColor:function(a,u){if(u=void 0===u?1:u,"string"==typeof a)a=e(a);else if(void 0!=a.r&&void 0!=a.g&&void 0!=a.b)a=o(a);else{if(void 0==a.h||void 0==a.s||void 0==a.b)return this;a=S(a)}return this.each(function(){if(t(this).data("colpickId")){var e=t("#"+t(this).data("colpickId"));e.data("colpick").color=a,e.data("colpick").origColor=a,i(a,e.get(0)),l(a,e.get(0)),r(a,e.get(0)),s(a,e.get(0)),n(a,e.get(0)),h(a,e.get(0)),e.data("colpick").onChange.apply(e.parent(),[a,d(a),c(a),e.data("colpick").el,1]),u&&p(a,e.get(0))}})}}}(),i=function(t){var t=parseInt(t.indexOf("#")>-1?t.substring(1):t,16);return{r:t>>16,g:(65280&t)>>8,b:255&t}},e=function(t){return o(i(t))},o=function(t){var a={h:0,s:0,b:0},i=Math.min(t.r,t.g,t.b),e=Math.max(t.r,t.g,t.b),o=e-i;return a.b=e,a.s=0!=e?255*o/e:0,0!=a.s?t.r==e?a.h=(t.g-t.b)/o:t.g==e?a.h=2+(t.b-t.r)/o:a.h=4+(t.r-t.g)/o:a.h=-1,a.h*=60,a.h<0&&(a.h+=360),a.s*=100/255,a.b*=100/255,a},c=function(t){var a={},i=t.h,e=255*t.s/100,o=255*t.b/100;if(0==e)a.r=a.g=a.b=o;else{var c=o,l=(255-e)*o/255,d=i%60*(c-l)/60;360==i&&(i=0),i<60?(a.r=c,a.b=l,a.g=l+d):i<120?(a.g=c,a.b=l,a.r=c-d):i<180?(a.g=c,a.r=l,a.b=l+d):i<240?(a.b=c,a.r=l,a.g=c-d):i<300?(a.b=c,a.g=l,a.r=l+d):i<360?(a.r=c,a.g=l,a.b=c-d):(a.r=0,a.g=0,a.b=0)}return{r:Math.round(a.r),g:Math.round(a.g),b:Math.round(a.b)}},l=function(a){var i=[a.r.toString(16),a.g.toString(16),a.b.toString(16)];return t.each(i,function(t,a){1==a.length&&(i[t]="0"+a)}),i.join("")},d=function(t){return l(c(t))};t.fn.extend({colpick:a.init,colpickHide:a.hidePicker,colpickShow:a.showPicker,colpickSetColor:a.setColor}),t.extend({colpick:{rgbToHex:l,rgbToHsb:o,hsbToHex:d,hsbToRgb:c,hexToHsb:e,hexToRgb:i}})}(jQuery);