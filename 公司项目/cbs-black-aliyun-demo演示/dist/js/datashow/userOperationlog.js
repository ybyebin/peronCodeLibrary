function userOperationLoadData(t){$("#startTime").val(),$("#endTime").val();$.ajax({url:apiurl+"",type:"post",dataType:"json",data:{data:JSON.stringify({page:t,page_item_count:13,start_time:$("#startTime").val(),end_time:$("#endTime").val()})},beforeSend:function(){$(".loading").show()},complete:function(){$(".loading").hide()},success:function(e){if($(".loading").hide(),e.success){var a=e.data;null==a&&(a=[]),$("#userOpera-tbody tr td").html(""),$("#userOpera-tbody tr").each(function(t,e){if(t<a.length){var i="<td>"+a[t].time+"</td><td>"+a[t].name+"</td><td >"+a[t].datalabel+"</td><td >"+a[t].content+"</td><td >"+a[t].caozuo+"</td>";$(e).html(i)}}),0===e.pageCount?(layer.msg("无数据"),$(".tcdPageCode").html("")):$(".tcdPageCode").createPage({pageCount:a.data.pageCount,current:t,backFn:function(t){commExcLoadData(t)}})}else layer.msg("获取数据失败原因:"+e.error_message)},error:function(t){$(".loading").hide(),layer.msg("获取数据失败:"+t.error_message)}})}function exportUserOperationLog(){var t=$("#startTime").val(),e=$("#endTime").val();""!==t&&""!==e?t>e?layer.msg("开始时间大于结束时间"):compareYear(new Date(t),10)<=e?layer.msg("超过统计时间限制"):$.ajax({url:apiurl+"",type:"post",dataType:"json",data:{data:JSON.stringify({start_time:t,end_time:e})},success:function(t){t.success?window.location.href=t.data:layer.msg("导出数据失败原因:"+t.error_message)},error:function(t){layer.msg("导出数据失败原因:"+t.error_message)}}):layer.msg("时间区间不能为空")}$("#foot").load("public.html"),$(function(){publicHeadfun(),days(),$("#slectFen ul li a").click(function(){var t=!0;$("span.txt").text($(this).text());var e=$(this).attr("rel");1==e||2==e?($("#startTime").val($(this).attr("value")),$("#endTime").val($(this).attr("value"))):3==e||4==e||5==e?($("#startTime").val($(this).attr("value")),$("#endTime").val(compareDate(1,0))):6==e||7==e||8==e?($("#startTime").val($(this).attr("value")),6==e?counts=1:7==e?counts=2:8==e&&(counts=3),$("#endTime").val(getCurrentMonthLastForSelect($(this).attr("value")))):9==e&&(t=!1,$("#startTime").val(""),$("#endTime").val("")),t&&userOperationLoadData(1)}),$("#slectFen ul li:nth-child(4) a").click()}),$("#startTime").datepicker({format:"yyyy-mm-dd ",autoclose:!0,todayBtn:!1,pickerPosition:"bottom-right",minView:2}).on("changeDate",function(t){$("#slectFen button .txt").html("自定义").attr("rel",9),$("#endTime")[0].focus()}),$("#endTime").datepicker({format:"yyyy-mm-dd ",autoclose:!0,todayBtn:!1,pickerPosition:"bottom-right",minView:2}).on("changeDate",function(t){$("#slectFen button .txt").html("自定义").attr("rel",9),timebeginisTrue=!0,checkEndTime("startTime","endTime",1)||($("#endTime").val(""),layer.msg("结束时间需晚于开始时间"),timebeginisTrue=!1),compareYear(new Date($("#startTime").val()),10)<=t.date.toLocaleDateString()&&(layer.msg("超过统计时间限制"),$("#endTime").val(""),timebeginisTrue=!1),timebeginisTrue&&userOperationLoadData(1)}),$(function(){$(".tcdPageCode").createPage({pageCount:10,current:5,backFn:function(t){}})});