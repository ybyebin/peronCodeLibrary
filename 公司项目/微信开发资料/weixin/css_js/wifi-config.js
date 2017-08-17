!function(){

  function configWiFi(){
    wx.invoke('configWXDeviceWiFi', {}, function(res){
      if(res.err_msg == 'configWXDeviceWiFi:ok'){
        alert('WiFi配置成功!');
        wx.closeWindow();
      } else {
	alert(res.err_msg);
        alert('配置失败！请重试');
      }
    });
  }


function scan_device(){

wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//	alert(result);
}
});




}

  wx.ready(function(){
    $('.action').click(function(){
      configWiFi();
    });

	$('.scan_action').click(function(){
		alert("scan");
      		scan_device();
 	   });
  });
  
}();
