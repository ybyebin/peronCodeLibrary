var dta = {
	"total": "1",
	"page": "1",
	"records": "3",
	"rows": [{
		"groupname": "美食图片",
		"mid": 4766,
		"sid": 517,
		"medianame": "Tulips",
		"mgid": 549,
		"mediatype": "image",
		"mediaid": "",
		"timestamp": "",
		"localfile": "/UploadFile/image/201409/14/0x6dvf.jpg",
		"picurl": "",
		"thumbid": "",
		"voiceformat": "",
		"state": 1,
		"createtime": "\/Date(1410673220000+0800)\/",
		"uploadtime": "\/Date(1410673220000+0800)\/",
		"width": 480,
		"height": 360,
		"seizespace": 17.41
	}, {
		"groupname": "美食图片",
		"mid": 4765,
		"sid": 517,
		"medianame": "Penguins",
		"mgid": 549,
		"mediatype": "image",
		"mediaid": "",
		"timestamp": "",
		"localfile": "/UploadFile/image/201409/14/6iluw6.jpg",
		"picurl": "",
		"thumbid": "",
		"voiceformat": "",
		"state": 1,
		"createtime": "\/Date(1410673215000+0800)\/",
		"uploadtime": "\/Date(1410673215000+0800)\/",
		"width": 480,
		"height": 360,
		"seizespace": 15.62
	}, {
		"groupname": "美食图片",
		"mid": 4764,
		"sid": 517,
		"medianame": "Lighthouse",
		"mgid": 549,
		"mediatype": "image",
		"mediaid": "",
		"timestamp": "",
		"localfile": "/UploadFile/image/201409/14/fx0kzp.jpg",
		"picurl": "",
		"thumbid": "",
		"voiceformat": "",
		"state": 1,
		"createtime": "\/Date(1410673209000+0800)\/",
		"uploadtime": "\/Date(1410673209000+0800)\/",
		"width": 480,
		"height": 360,
		"seizespace": 14.2
	}]
}


//获取模板上的HTML  
var html = $('#template1').html();
//定义一个数组，用来接收格式化合的数据  
var arr = [];
//对数据进行遍历  
$.each(dta.rows, function(i, o) {
	//这里取到o就是上面rows数组中的值, formatTemplate是最开始定义的方法.  
	arr.push(formatTemplate(o, html));
});
//好了，最后把数组化成字符串，并添加到table中去。  
$('#tableData').append(arr.join(''));


function formatTemplate(dta, tmpl) {
	var format = {
		name: function(x) {
			return x
		}
	};
	return tmpl.replace(/{(\w+)}/g, function(m1, m2) {
		if (!m2)
			return "";
		return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
	});
}