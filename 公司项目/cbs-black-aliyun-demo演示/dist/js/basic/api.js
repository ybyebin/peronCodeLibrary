function projectInfo(){$.ajax({url:apiurl+"project",type:"get",dataType:"json",success:function(e){if(e.success){var e=e.data;$("#logo").attr("src",e.logo_path).data("proid",e.id),$("#logo-name").text(e.name),$("#navbar-brandImg").attr("src",e.logo_path).data("proid",e.id),$(".projectName").text(e.name)}else layer.msg(e.error_message)},error:function(e){layer.msg(e.error_message),returnLogIn(e)}})}function RegeMatch(e,n,t){var a=new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);if(""!=e.val()&&null!=e&&a.test(e.val()))return t.hide(),n.show().text("输入不合法"),!1}function RegeMatchTwo(e,n){var t=new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);if(""!=e.val()&&null!=e&&t.test(e.val()))return n.text("输入不合法"),!1}function chEnWordCount(e){return e.replace(/[^\x00-\xff]/g,"**").length}function icheckInte(){$("input").iCheck("destroy"),$(".ckss").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green",increaseArea:"20%"})}function ServerCurrentTime(e){var n=(new Date).format("MM月dd日 hh:mm:ss");$("#CurrentTime a").text(n);setTimeout("ServerCurrentTime()",1e3)}function GetRequest(e){var n=location.search,t={};if(-1!=n.indexOf("?"))for(var a=n.substr(1),r=a.split("&"),o=0;o<r.length;o++)t[r[o].split("=")[0]]=r[o].split("=")[1];return t}function returnLogIn(e){401===Number(e.status)&&(window.location.href="login.html")}function publicAjaxError(e){$(".loading").hide(),layer.msg(e.error_message),401===Number(e.status)&&(window.location.href="login.html")}function update_alarm_label(){var e=$("#header_alarm_count"),n=$(".head-warn img");$.ajax({url:apiurl+"alarmvalue/1",type:"GET",success:function(t){var a=Number(t.data);a>0?(e.css("display","inline-block"),n.attr("src","images/baojing.gif"),a<99?e.text(a):e.text("99+")):(e.hide(),n.attr("src","images/warn.png"))},error:function(e){}})}function publicHeadfun(){isManagerLogin(),projectInfo(),ServerCurrentTime(),update_alarm_label(),setInterval(update_alarm_label,5e3)}function CalculationJsonLength(e){if("object"==typeof e&&"[object object]"==Object.prototype.toString.call(e).toLowerCase()&&!e.length){var n=0;for(var t in e)n+=1;return n}return!1}function isManagerLogin(){"1"===sessionStorage.getItem("isadmin")&&$(".tosystemSet").css("visibility","visible")}var apiurl="/api/";Date.prototype.format=function(e){var n={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var t in n){var a=n[t];new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a:("00"+a).substr((""+a).length)))}return e},$(".user-changePassword").on("click",function(){layer.open({title:["修改密码","font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;"],type:1,skin:"layui-primary",area:["600px","330px"],content:$("#changePassword-layer"),shift:2,move:!1,btn:["确定","放弃"],success:function(){$(".old-pas").val(""),$(".new-pas").val(""),$(".renew-pas").val("")},yes:function(e){var n=3;switch($("#changePassword-layer input").each(function(e,t){if(""==$(t).val())return n=e,!1}),n){case 0:layer.msg("原密码不能为空");break;case 1:layer.msg("新密码不能为空");break;case 2:layer.msg("确认密码不能为空");break;case 3:var t=new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\\]/g),a=!0;$(".pas").each(function(e,n){if(t.test($(n).val()))return $(n).val(""),layer.msg("密码格式错误(可以是数字、字母及组合)"),a=!1,!1}),a&&($(".new-pas").val()===$(".renew-pas").val()?(layer.msg("可以提交"),$.ajax({url:apiurl+"usermanage/1",type:"PUT",dataType:"json",data:{old_password:$(".old-pas").val(),new_password:$(".new-pas").val()},beforeSend:function(){$(".loading").show()},complete:function(){$(".loading").hide()},success:function(n){$(".loading").hide(),n.success?(layer.msg("密码修改成功"),layer.close(e)):layer.msg(n.error_message)},error:function(e){$(".loading").hide(),layer.msg(e.error_message),returnLogIn(e)}})):layer.msg("新密码与重复密码不一致"))}},btn2:function(e){layer.close(e)}})}),$(".user-logout").on("click",function(){var e=$(".loading");layer.open({title:["退出登录","font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;"],type:1,skin:"layui-primary",area:["600px","200px"],content:$("#logout"),shift:2,move:!1,btn:["确定","放弃"],success:function(){},yes:function(n){$.ajax({url:apiurl+"login",type:"DELETE",beforeSend:function(){e.show()},complete:function(){e.hide()},success:function(n){e.hide(),n.success?window.location.href="login.html":layer.msg(n.error_message)},error:function(n){e.hide(),layer.msg(n.error_message),returnLogIn(n)}})},btn2:function(e){layer.close(e)}})}),function(e){var n={init:function(e,t){return function(){n.fillHtml(e,t),n.bindEvent(e,t)}()},fillHtml:function(e,n){return function(){if(e.empty(),0===n.pageCount)return!1;n.current>1?e.append('<a href="javascript:;" class="prevPage"></a>'):(e.remove(".prevPage"),e.append('<span class="disabled disabled-prve"></span>')),1!=n.current&&n.current>=4&&4!=n.pageCount&&e.append('<a href="javascript:;" class="tcdNumber">1</a>'),n.current-2>2&&n.current<=n.pageCount&&n.pageCount>5&&e.append('<a class="page-omit"><span>...</span></a>');var t=n.current-2,a=n.current+2;for((t>1&&n.current<4||1==n.current)&&a++,n.current>n.pageCount-4&&n.current>=n.pageCount&&t--;t<=a;t++)t<=n.pageCount&&t>=1&&(t!=n.current?e.append('<a href="javascript:;" class="tcdNumber">'+t+"</a>"):e.append('<span class="current">'+t+"</span>"));n.current+2<n.pageCount-1&&n.current>=1&&n.pageCount>5&&e.append('<a class="page-omit"><span>...</span></a>'),n.current!=n.pageCount&&n.current<n.pageCount-2&&4!=n.pageCount&&e.append('<a href="javascript:;" class="tcdNumber">'+n.pageCount+"</a>"),n.current<n.pageCount?e.append('<a href="javascript:;" class="nextPage"></a>'):(e.remove(".nextPage"),e.append('<span class="disabled disabled-next"></span>'))}()},bindEvent:function(t,a){return function(){if(t.off("click","a.tcdNumber"),t.off("click","a.prevPage"),t.off("click","a.nextPage"),0===a.pageCount)return!1;t.on("click","a.tcdNumber",function(){var r=parseInt(e(this).text());n.fillHtml(t,{current:r,pageCount:a.pageCount}),"function"==typeof a.backFn&&a.backFn(r)}),t.on("click","a.prevPage",function(){var e=parseInt(t.children("span.current").text());n.fillHtml(t,{current:e-1,pageCount:a.pageCount}),"function"==typeof a.backFn&&a.backFn(e-1)}),t.on("click","a.nextPage",function(){var e=parseInt(t.children("span.current").text());n.fillHtml(t,{current:e+1,pageCount:a.pageCount}),"function"==typeof a.backFn&&a.backFn(e+1)})}()}};e.fn.createPage=function(t){var a=e.extend({pageCount:10,current:1,backFn:function(){}},t);n.init(this,a)}}(jQuery);