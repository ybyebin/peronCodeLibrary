 $(document).ready(function() {
 	$("#city").citySelect({
 		prov: "北京",
 		city: "北京",
 		nodata: "东城区"
 	});
 });

 function regist() {
 	var allUnivList = {
 		province: $('.prov').val(),
 		city: $('.city').val(),
 		county: $('.dist').val(),
 		station_no: $('#station_no').val(),
 		station_name: $('#station_name').val(),
 		sn_type: $('#sn_type').val(),
 		sn_no: $('#sn_no').val(),
 		sample_num: $('#sample_num').val(),
 		sample_name: $('#sample_name').val(),
 		member_no: $('#member_no').val(),
 		member_name: $('#member_name').val(),
 		member_occupation: $('#member_occupation').val(),
 		channel_name: $('#channel_name').val(),
 		channel_num: $('#channel_num').val(),
 		listen_rate: $('#listen_rate').val(),
 		begin_time: $('#begin_time').val(),
 		end_time: $('#end_time').val(),
 		member_age: $('#member_age').val(),
 		member_sex: $('input[name="member_sex"]:checked').val(),
 		member_income: $('#member_income').val()

 	};

 	console.log(JSON.stringify(allUnivList,null,2))
 	$.ajax({
 		url: "registss.php",
 		type: "post",
 		data: allUnivList,
 		success: function(data) {
 			// console.log(data);
 			var result = JSON.parse(data);
 			if (result.success) {
 				alert(result.msg)
 			}			
 		},
 		error: function() {
 			alert("系统异常!");
 		}
 	})
 }