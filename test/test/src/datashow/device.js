(function($) {
  $(window).load(function() {
    $("#div-wraplist").mCustomScrollbar({
      autoHideScrollbar: true
    });
    $(".scrollFullBtn").mCustomScrollbar();
    $(".qu-scroll").mCustomScrollbar()
  });
})(jQuery);

$('#foot').load('public.html');
$(function() {
  publicHeadfun();
  days();

  $("#selectTime").val($('.threeday').attr('value'));
  $("#endTime").val(compareDate(1, 0));
  loadAllDeviceData();



  var checkin = $('#selectTime').datepicker({
    format: 'yyyy-mm-dd'
  }).on('changeDate', function(ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
      var newDate = new Date(ev.date)
      newDate.setDate(newDate.getDate() + 1);
      checkout.setValue(newDate);
    }
    checkin.hide();
    $('#endTime')[0].focus();

    $("#slectFen button .txt").html("自定义");

  }).data('datepicker');

  var checkout = $('#endTime').datepicker({
    format: 'yyyy-mm-dd'

  }).on('changeDate', function(ev) {
    $("#slectFen button .txt").html("自定义");
    var timeyes = true;
    var isYes = checkEndTime("selectTime", "endTime", 1);
    if (!isYes) {
      $("#endTime").val("");
      timeyes = false;
      layer.msg("结束时间需晚于开始时间");
    }
    if (compareYear(checkin.date, 10) <= ev.date.toLocaleDateString()) {

      layer.msg("超过统计时间限制");
      timeyes = false;
      $("#endTime").val("");
    }
    checkout.hide();

    if (timeyes) {
      starts_time = $('#selectTime').val();
      ends_time = $("#endTime").val();
      createStockChart(tagsidforlist, starts_time, ends_time);
      layer.msg("选择的时间:" + starts_time + ends_time);
    }

  }).data('datepicker');

  $("#every").click(function() {
    if (!$("#quChart").is(":visible")) {
      $("#quChart").show();
      $("#quChart1").hide();
      $("#every").html("实时趋势");
      $(".choosetime").css("visibility", "visible");
    } else {
      $("#quChart").hide();
      $("#quChart1").show();
      $("#every").html("历史趋势");
      $(".choosetime").css("visibility", "hidden");
    }
  })


});



// =====================================================================
$(function() {
  var data = {
      "success": true,
      "data": [{
          "groupId": "42",
          "groupName": "哼哼哈哼哈哼哈哼哈哼哈哈",
          "view": [{
            "viewId": "4",
            "viewName": "一号仓库成品区"
          }, {
            "viewId": "6",
            "viewName": "123"
          }, {
            "viewId": "7",
            "viewName": "测试"
          }, {
            "viewId": "8",
            "viewName": "多大点多大点多大点多大点"
          }, {
            "viewId": "9",
            "viewName": "321"
          }, {
            "viewId": "10",
            "viewName": "新建测试"
          }, {
            "viewId": "11",
            "viewName": "2017测试"
          }, {
            "viewId": "13",
            "viewName": "32123"
          }]
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        }, {
          "groupId": "45",
          "groupName": "空调机组",
          "view": []
        },



        {

          "groupId": "57",
          "groupName": "视频监控",
          "view": [{
            "viewId": "12",
            "viewName": "视频测试"
          }]
        }
      ]
    }
    // showAllDeviceData(data.data)
})




/**
 * [ 获取全部设备信息]
 * @return {[type]} [description]
 */
function loadAllDeviceData() {
  $.ajax({
    url: apiurl + "r=api/entity/subsys/tree",
    type: 'post',
    dataType: 'json',
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      $(".loading").hide();
    },
    success: function(data) {
      // console.log('菜单数据：' + JSON.stringify(data, null, 2));

      $(".loading").hide();
      if (data.success) {
        if (data.data == null) {
          return;
        }
        AllGroupData = data.data;
        showAllDeviceData(data.data);
        
        if (sessionStorage.getItem("device_viewid") == null) {
          if (data.data[0].view.length !== 0) {
            console.log("第一组有画面");
            $('#wraplist li:first-child a').click();
            console.log('查看:' + $('#demo-li0 li:first-child a').data('viewid'))
            $('#demo-li0 li:first-child a').click();
          }
        } else {
           var num =Number(sessionStorage.getItem("device_viewid"));
            $('#wraplist li:nth-child('+num+') a').click();
             $('#demo-li'+(num-1)+' li:first-child a').click();
            sessionStorage.removeItem("device_viewid");
        }
       

       

       
        
         
      } else {
        layer.msg(data.error_message);
        returnLogIn(data.error_message);
        console.log("请求子系统失败原因:" + JSON.stringify(data, null, 2))
      }
    },
    error: function(data) {
      $(".loading").hide();
      layer.msg("请求失败啦!" + data.error_message);
      console.log("请求子系统失败原因:" + JSON.stringify(data, null, 2))
    }
  });
}



/**
 * [展示数据 ]
 * @param  {[array]} datagroups [数据]
 * @return {[type]}            [description]
 */
function showAllDeviceData(datagroups) {
  var thisUl = $("#main-menu-wrapper .wraplist");
  if (datagroups.length !== 0) {
    var firstViewIsNull = true; //标志  第一组 画面是否为空   
    var imageclass;
    var thisli;
    var thispa;

    if (datagroups[0].view.length == 0) {
      firstViewIsNull = false;
    }

    for (var i in datagroups) {
      switch (datagroups[i].groupName) {
        case "空调机组":
          addSlide(datagroups, i, 'kongtiao');
          break;
        case "视频监控":
          addSlide(datagroups, i, 'vedio');
          break;
        case "照明":
          addSlide(datagroups, i, 'zhaoming');
          break;
        case "停车场":
          addSlide(datagroups, i, 'tingche');
          break;
        case "风机末端":
          addSlide(datagroups, i, 'fengji');
          break;
        case "视频监控系统":
          addSlide(datagroups, i, 'vedio');
          break;
        case "入侵报警系统":
          addSlide(datagroups, i, 'ruqin');
          break;
        case "环境监测系统":
          addSlide(datagroups, i, 'huanjing');
          break;
        case "风机盘管":
          addSlide(datagroups, i, 'fengji');
          break;
        case "电梯系统":
          addSlide(datagroups, i, 'dianti');
          break;
        case "照明控制系统":
          addSlide(datagroups, i, 'zhaoming');
          break;
        case "给排水系统":
          addSlide(datagroups, i, 'jishui');
          break;
        default:
          addSlide(datagroups, i, 'custom');
          break;
      }
    }
  }
}
// 添加侧边栏
function addSlide(datagroups, i, str) {
  var ul_son = $('<ul id="demo-li' + i + '" class="sub-views" ></ul>');
  if (datagroups[i].view.length == 0) {
    ul_son.append('<li><p class="p-no-subviews">尚未添加监控画面</p></li>')
  }
  for (var key in datagroups[i].view) {
    ul_son.append('<li><a data-viewid="' + datagroups[i].view[key].viewId + '">' + datagroups[i].view[key].viewName + '</a></li>')
      // ul_son += '<li><a data-viewid="' + datagroups[i].view[key].viewId + '">' + datagroups[i].view[key].viewName + '</a></li>'
  }
  var li = '<li class="device-li">' + '<a class="list-a-click" data-target="#demo-li' + i + '" data-status="close"><i class="' + str + '"></i><span>' + datagroups[i].groupName + '</span></a></li>';
  $('#wraplist').append(li);
  $('#main-menu-wrapper').append(ul_son);
  // $('#wraplist li:first-child a').click();
  // $("#div-wraplist").mCustomScrollbar('scrollTo', 1.2,{ moveDragger:true });
}


$('#wraplist').on('click', 'li a', function() {
  console.log($(this).data('status'))
  if ($(this).data('status') == 'close') {
    $('.list-a-click').removeClass('active');
    $(this).addClass('active');
    $('.list-a-click').data('status', 'close');
    $(this).data('status', 'open');
    $('.sub-views').hide(100);
    $($(this).data('target')).show(100);
  }

});


$('#main-menu-wrapper').on('click', 'ul.sub-views li a', function(e) {

  // if (e && e.stopPropagation) {
  //   e.stopPropagation();
  // }
  $('#main-menu-wrapper ul.sub-views li a').removeClass('active');
  $(this).addClass('active');
  var stringId = $(this).data('viewid');
  $('#EquipmentMonitoring a').tab('show');

  view_id = String(stringId);
  if (restart) {
    // timeout  = true;
    // clearInterval(setIntvals);
    mqtt.disconnect();
    restart = false;
  }
    console.log('查看view_id：'+view_id);
    MQTTconnect();
  // webScoketjson.viewid = Number(view_id);
  setTimeout(function() {
    showCanvas(Number(stringId), imageCanvas);
  }, 100);

});


/**
 * @description [获取并还原画布控件数据初始化]
 * @param  {[view_id]}
 * @param  {[canvas]}
 */
var allComponent = {};

function showCanvas(id, canvas) {
  $.ajax({
    url: apiurl + "r=api/entity/view/get",
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        view_id: id
      })
    },
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      $(".loading").hide();
    },
    success: function(data) {
      $(".loading").hide();
      console.log(data.data)
      if (data.success) {
        imageCanvas.clear();
        var canvasJson = [];
        var subCanvas = [];
        if (data.data.view_data === null) {} else {
          canvasJson = JSON.parse(data.data.view_data).canvas;
          subCanvas = JSON.parse(data.data.view_data).subCanvas;
        }
        // console.log('画布数据:' + JSON.stringify(canvasJson, null, 2));
        allComponent = {};
        for (var key in canvasJson) {
          if (canvasJson[key].type !== 'draw2d.Connection') {
            allComponent[canvasJson[key].id] = canvasJson[key].userData.Tag.tag_id;
          }
        }

        // 全局按钮
        $('#SecCanvasFullBtn').html('');
        for (var i in subCanvas) {
          allComponent[subCanvas[i].id] = subCanvas[i].tag_id;
          var obj = '<p><button class="btn boolean-true '+subCanvas[i].id+'" data-id="'+subCanvas[i].id+'"  data-tag-id="' + subCanvas[i].tag_id + '" data-tag-name="' + subCanvas[i].tag_name + '" data-tag-type="' + subCanvas[i].tag_type + '" data-bingding-status="' + subCanvas[i].bingding_status + '" data-readonly="' + subCanvas[i].readonly + '"  data-value=""  >' + subCanvas[i].name + '</button></p>';
          $('#SecCanvasFullBtn').append(obj);
        }
        // console.log('全部控件信息:' + JSON.stringify(allComponent, null, 2))
          // 画布
        $("#myBgimage").attr("src", 'images/text/logo-text.png');
        $("#canvas").css("background-color", '#fff');
        if (data.data.background_color !== '') {
          $("#canvas").css("background-color", data.data.background_color);
        }
        if (data.data.background_img_url !== '') {
          $("#myBgimage").attr("src", data.data.background_img_url);
        }

        var reader = new draw2d.io.json.Reader();
        reader.unmarshal(canvas, canvasJson);

        var writer = new draw2d.io.json.Writer();
        writer.marshal(canvas, function(json) {
          // console.log(JSON.stringify(json, null, 2))
          for (var i in json) {
            //获得ID对应的节点对象
            var node = getCanvasNode(canvas, json[i].id);
            // 隐藏 控件的 输入输出节点
            if (node.userData.havepoint == "") {
              // console.log("有输入输出点")
              node.getOutputPort(0).setVisible(false);
              node.getInputPort(0).setVisible(false);
            }
            // 获取并更改节点标题 
            if (node.userData.ShowCaption) {
              switch (json[i].userData.ShowCaption) {
                case true:
                  node.label.setVisible(true);
                  break;
                case false:
                  node.label.setVisible(false);
                  break;
              }
              node.label.setText(json[i].userData.Caption);
              node.label.repaint();
            }

            // 节点闪烁
            if (node.userData.Blinking == true) {
              node.startTimer(1000);
            }

            // 自定义图片
            if (node.image) {
              node.image.setHeight(node.getHeight());
              node.image.setWidth(node.getWidth());
            }

            if (node.userData.picture) {
              node.image.setPath(node.userData.picture);
              node.image.setHeight(node.getHeight());
              node.image.setWidth(node.getWidth());
              node.setAlpha(0.001);
            }

            switch (node.alpha) {
              case 0:
                node.setAlpha(0);
                if (node.image) {
                  node.image.setAlpha(0);
                }
                if (node.label) {
                  node.label.setAlpha(0);
                }
                break;
            }
            // 管道链接点
            if (node.userData.types === 'conduitCompontent') {
              node.resetPorts();
            }
          }
        });
        //获取列表与趋势图组件
        getComponentlist(id);

      } else {
        layer.msg("请求画面失败:" + data.error_message);
        console.log("请求画面失败:" + JSON.stringify(data, null, 2))
      }
    },
    error: function(data) {
      $(".loading").hide();
      layer.msg("请求画面失败:" + data.error_message);
      console.log("请求画面失败:" + JSON.stringify(data, null, 2))
    }
  });
}
// 全局按钮 点击
$('#SecCanvasFullBtn').on('click', 'button', function() {
  console.log('按钮');
  console.log('查看按钮tagID:' + $(this).data('tag-id'));
  console.log('查看按钮value:' + $(this).data('value'));
  if ($(this).data("tag-id") !== "") {
    console.log('123')
      // changeGlobalBtnState($(this).attr("id"));
    if (Number($(this).data('value')) === 0) {
      var datas = {
        tag_id: componentIsReadonly[$(this).data("id")].tag_id,
        value: 1,
      }
      var dataUp = {
        data: JSON.stringify(datas)
      }
      changeTagValue("global_btn", dataUp, componentIsReadonly[$(this).data("id")].tag_id, componentIsReadonly[$(this).data("id")].id);
    } else if (Number($(this).data('value')) === 1) {
      var data = {
        tag_id: componentIsReadonly[$(this).data("id")].tag_id,
        value: 0,
      }
      var dataUp = {
        data: JSON.stringify(data)
      }
      changeTagValue("global_btn", dataUp, componentIsReadonly[$(this).data("id")].tag_id, componentIsReadonly[$(this).data("id")].id);
    }
  } else {
    layer.msg("未绑定任何数据标签")
  }
});

/**
 * [修改 全局按钮的 状态]
 * @param  {[type]} btnId [按钮ID]
 * @return {[type]}       [description]
 */
function changeGlobalBtnState(btnId) {
  if (componentIsReadonly[btnId]) {
    if (Number(componentIsReadonly[btnId].readonly) == 0) {
      if (componentIsReadonly[btnId].com_readonly == false) {
        switch (componentIsReadonly[btnId].tag_type) {
          case 'boolean':



            layerType = layer.open({
              title: ['指定数据标签值', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
              type: 1,
              skin: 'layui-primary', //加上边框
              area: ['1018px', '275px'], //宽高
              content: $("#action1"), //捕获的元素,
              shift: 2,
              move: false,
              btn: ['确定', '取消'],
              success: function() {
                switch (Number(componentIsReadonly[btnId].value)) {
                  case 0:
                    console.log("进入关");
                    $('#close').iCheck('check');
                    $('#open').iCheck('uncheck');
                    break;
                  case 1:
                    console.log("进入开");
                    $('#close').iCheck('uncheck');
                    $('#open').iCheck('check');
                    break;

                }
              },
              yes: function(index) {
                $("#action1").find("input").each(function(index, element) {
                  var id = $(element).attr("id");
                  // console.log("ID 为:"+id);
                  if ($("#" + id).prop("checked") == true) {
                    console.log("ID 为:" + id);
                    switch (id) {
                      case "open":
                        var datas = {
                          tag_id: componentIsReadonly[btnId].tag_id,
                          value: 1,
                        }
                        var dataUp = {
                          data: JSON.stringify(datas)
                        }
                        changeTagValue("global_btn", dataUp, componentIsReadonly[btnId].tag_id, componentIsReadonly[btnId].id);
                        break;
                      case "close":
                        var data = {
                          tag_id: componentIsReadonly[btnId].tag_id,
                          value: 0,
                        }
                        var dataUp = {
                          data: JSON.stringify(data)
                        }
                        changeTagValue("global_btn", dataUp, componentIsReadonly[btnId].tag_id, componentIsReadonly[btnId].id);
                        break;
                    }
                  }

                });
                layer.close(layerType);
              },
              btn2: function(index) {
                layer.close(layerType);

              }
            });
            break;
            // case 'integer':
            //   $("#action").find("input").val(componentIsReadonly[btnId].value);
            //   layerForother("global_btn", componentIsReadonly[btnId].tag_id, componentIsReadonly[btnId].id, "integer");
            //   break;
            // case 'float':
            //   $("#action").find("input").val(componentIsReadonly[btnId].value);
            //   layerForother("global_btn", componentIsReadonly[btnId].tag_id, componentIsReadonly[btnId].id, "realnumber");
            //   break;
            // case 'string':
            //   $("#action_str").find("input").val(componentIsReadonly[btnId].value);
            //   layerType = layer.open({
            //     title: ['制定数据标签值', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
            //     type: 1,
            //     skin: 'layui-primary', //加上边框
            //     area: ['1018px', '275px'], //宽高
            //     content: $("#action_str"), //捕获的元素,
            //     shift: 2,
            //     move: false,
            //     btn: ['确定', '取消'],
            //     yes: function(index) {
            //       // $("#action_str").find("input").val();
            //       console.log($("#action_str").find("input").val());
            //       var data = {
            //         tag_id: componentIsReadonly[btnId].tag_id,
            //         value: $("#action_str").find("input").val(),
            //       }
            //       var dataUp = {
            //         data: JSON.stringify(data)
            //       }
            //       changeTagValue("global_btn", dataUp, componentIsReadonly[btnId].tag_id, componentIsReadonly[btnId].id);
            //       $("#action_str").find("input").val("");
            //       layer.close(layerType);
            //     },
            //     btn2: function(index) {
            //       layer.close(layerType);

            //     }
            //   });
            //   break;
        }
      }

    }
  }

}



/**
 * [获得画布上所有控件的表格展示信息]
 * @return {[type]} [description]
 */
var componentIsReadonly = {}; //为当前画面生成一个JSON用于存储该控件自带的是否只读的属性
var componentTagValue = [];

function getComponentlist(ids) {
  console.log("画面的ID:" + ids)
  $.ajax({
    url: apiurl + "r=api/view/list/init",
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        view_id: ids
      })
    },
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      // $(".loading").hide();
    },
    success: function(data) {
      $(".loading").hide();
      if (data.success) {
        console.log("画面控件的数据数据==================:" + JSON.stringify(data, null, 2))
          // 处理数据 componentIsReadonly 为控件是否可点击 做准备

        componentIsReadonly = {};
        for (var arr in data.data) {
          var arrs = data.data[arr];
          componentIsReadonly[data.data[arr].id] = arrs;
          // switch()
          // $('#'+arrs.id);
        }
        // console.log("处理过的数据为:" + JSON.stringify(componentIsReadonly, null, 2))

        addComponentMessage(componentIsReadonly);
        // componentTagValue = componentIsReadonly;
        // 初始化 label 的数值
        // labelComponentValueInitialize(componentIsReadonly);
        // 初始化 控件的状态
        // if ($('#qu').hasClass('in') && $('#qu').hasClass('active')) {
        //   $('#EquipmentMonitoring a').click();
        //   setTimeout(function() {
        //     reloadCanvas(componentIsReadonly);
        //     $('#EquipmentList a').click();
        //   }, 300);
        // } else {
          reloadCanvas(componentIsReadonly);
        // }

      } else {
        layer.msg("错误:" + data.error_message)
        console.log("画面控件的数据数据错误原因----------" + JSON.stringify(data, null, 2));
      }
    },
    error: function(data) {
      $(".loading").hide();
      layer.msg("失败:" + data.error_message)
      console.log("画面控件的数据数据错误原因==================" + JSON.stringify(data, null, 2));
    }
  })
}


/**
 * [label控件的值做初始化=======带label的控件的初始化]
 * @return {[type]} [description]
 */
// function labelComponentValueInitialize(data){
//   // var dataDic = {};
//   // for(var i in data){
//   //   var key  = data[i].tag_id;
//   //   dataDic[key] = data[i];
//   // }

//   console.log('初始化label数据:'+JSON.stringify(dataDic,null,2))
//   var writer = new draw2d.io.json.Writer();
//   writer.marshal(imageCanvas, function(json) {

//     for(var key in json){
//       if (json[key].userData.Tag.tag_id !== '') {
//         var ids = json[key].userData.Tag.tag_id;
//         var node = getCanvasNode(imageCanvas,dataDic[ids].id);
//         console.log(JSON.stringify(dataDic,null,2))
//         if (node.userData.valueType) {
//           if (Number(dataDic[ids].status) === 0) {
//             switch (node.userData.valueType) {
//               case "textValueComponent":
//                 node.setText('hahahaha')
//                 node.setText(dataDic[ids].value);
//                 node.repaint();
//                 break;
//               case "valueComponent":
//                 if (node.userData.types === 'LabelComponent') {
//                   node.setText(dataDic[ids].value);
//                   node.repaint();
//                 } else {
//                   node.label.setText(dataDic[ids].value);
//                   node.label.repaint();
//                 }
//                 break;
//             }
//           }

//         }
//       }
//     }

//   });
// }


/**
 * [获得view上所有控件信息后 更新一次 canvas 画面]
 */
function reloadCanvas(data) {
  for (var dic in data) {
    if (!isNaN(data[dic].id)) {
      console.log('全局按钮id：'+data[dic].id)
       console.log('全局按钮class：'+'.'+data[dic].id)
      console.log('全局按钮value：'+data[dic].value)
      switch (Number(data[dic].value)) {
        case 0:
        
          $('.' + data[dic].id).data('value', '0').removeClass('boolean-false boolean-true').addClass('boolean-true');
          console.log('查看类名：'+$('.' + data[dic].id).data('value'))
          break;
        case 1:
        
          $('.' + data[dic].id).data('value', '1').removeClass('boolean-false boolean-true').addClass('boolean-false');
          console.log('查看类名：'+$('.' + data[dic].id).data('value'))
          break;
      }

    } else {
      var node = getCanvasNode(imageCanvas, data[dic].id);
      if (node.userData.valueType) {
        if (Number(data[dic].status) === 0) {
          switch (node.userData.valueType) {
            case "textValueComponent":
              node.setText(String(data[dic].value + node.userData.unit));
              node.repaint();
              break;
            case "valueComponent":
              if (node.userData.types === 'LabelComponent') {
                node.setText(data[dic].value);
                node.repaint();
              } else {
                node.label.setText(data[dic].value);
                node.label.repaint();
              }
              break;
          }
        }

      }

      switch (Number(data[dic].status)) {
        case 0:
          switch (data[dic].alarm) {
            case false:
              if (node.userData.Tag.tag_type == 'boolean') {
                switch (data[dic].value) {
                  case "0":
                    switch (node.userData.types) {
                      case "imageComponent":
                        console.log("测试灯关")
                          //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onFalse";
                        if (node.userData.onFalse.Blinking == true) {
                          node.startTimer(1000);
                        }

                        node.setStroke(Number(node.userData.onFalse.LineWidth));
                        node.setDashArray(node.userData.onFalse.LineStyle);
                        node.setColor(node.userData.onFalse.LineColor);
                        node.image.setPath(node.userData.onFalse.picture);
                        node.repaint();
                        // 表格数据
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        break;
                      case "buttonComponent":

                        //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onFalse";
                        if (node.userData.onFalse.Blinking == true) {
                          node.startTimer(1000);
                        }

                        node.setStroke(Number(node.userData.onFalse.LineWidth));
                        node.setDashArray(node.userData.onFalse.LineStyle);
                        node.setColor(node.userData.onFalse.LineColor);
                        node.setBackgroundColor(node.userData.onFalse.FillColor);

                        if (node.userData.onFalse.Text == "") {
                          node.setText("关闭");
                        } else {
                          node.setText(node.userData.onFalse.Text);
                        }
                        node.setFontColor(node.userData.onFalse.TextColor);
                        node.repaint();

                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);

                        break;
                      case "basicComponent":
                        // console.log("矩形");
                        //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onFalse";
                        if (node.userData.onFalse.Blinking == true) {
                          node.startTimer(1000);
                        }

                        // 修改样式
                        node.setStroke(Number(node.userData.onFalse.LineWidth));
                        node.setDashArray(node.userData.onFalse.LineStyle);
                        node.setColor(node.userData.onFalse.LineColor);
                        node.setBackgroundColor(node.userData.onFalse.FillColor);
                        if (node.userData.onFalse.alpha) {
                          node.setAlpha(Number(node.userData.onFalse.alpha));
                        }


                        node.repaint();
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        break;
                      case "LineComponent":
                        //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onFalse";
                        if (node.userData.onFalse.Blinking == true) {
                          node.startTimer(1000);
                        }

                        // 修改样式
                        node.setStroke(Number(node.userData.onFalse.LineWidth));
                        node.setDashArray(node.userData.onFalse.LineStyle);
                        node.setColor(node.userData.onFalse.LineColor);
                        node.repaint();
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        break;
                    }

                    break;
                  case "1":
                    switch (node.userData.types) {
                      case "imageComponent":
                        console.log("测试灯开")
                          //view
                        node.stopTimer();
                        node.userData.BlinkingType = "onTrue";
                        if (node.userData.onTrue.Blinking == true) {
                          node.startTimer(1000);
                        }

                        node.setStroke(Number(node.userData.onTrue.LineWidth));
                        node.setDashArray(node.userData.onTrue.LineStyle);
                        node.setColor(node.userData.onTrue.LineColor);
                        node.image.setPath(node.userData.onTrue.picture);
                        node.repaint();
                        // 表格数据
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        break;
                      case "buttonComponent":
                        //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onTrue";
                        if (node.userData.onTrue.Blinking == true) {
                          node.startTimer(1000);
                        }


                        node.setStroke(Number(node.userData.onTrue.LineWidth));
                        node.setDashArray(node.userData.onTrue.LineStyle);
                        node.setColor(node.userData.onTrue.LineColor);
                        node.setBackgroundColor(node.userData.onTrue.FillColor);
                        if (node.userData.onTrue.Text == "") {
                          node.setText("打开");
                        } else {
                          node.setText(node.userData.onTrue.Text);
                        }
                        node.setFontColor(node.userData.onTrue.TextColor);
                        node.repaint();
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        // 表格数据
                        // websocketChangetable(jsonData.tagid, "OK");
                        break;
                      case "basicComponent":
                        console.log("矩形");
                        //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onTrue";
                        if (node.userData.onTrue.Blinking == true) {
                          node.startTimer(1000);
                        }

                        // 修改样式
                        node.setStroke(Number(node.userData.onTrue.LineWidth));
                        node.setDashArray(node.userData.onTrue.LineStyle);
                        node.setColor(node.userData.onTrue.LineColor);
                        node.setBackgroundColor(node.userData.onTrue.FillColor);
                        if (node.userData.onTrue.alpha) {
                          node.setAlpha(Number(node.userData.onTrue.alpha));
                        }

                        node.repaint();
                        // 表格数据
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        break;
                      case "LineComponent":

                        //闪烁
                        node.stopTimer();
                        node.userData.BlinkingType = "onTrue";
                        if (node.userData.onTrue.Blinking == true) {
                          node.startTimer(1000);
                        }
                        node.setStroke(Number(node.userData.onTrue.LineWidth));
                        node.setDashArray(node.userData.onTrue.LineStyle);
                        node.setColor(node.userData.onTrue.LineColor);

                        node.repaint();
                        // 表格数据
                        // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                        break;
                    }


                    break;
                }
              } else {
                switch (node.userData.types) {
                  case "imageComponent":
                    //view
                    node.stopTimer();
                    node.userData.BlinkingType = "onTrue";
                    if (node.userData.onTrue.Blinking == true) {
                      node.startTimer(1000);
                    }

                    node.setStroke(Number(node.userData.onTrue.LineWidth));
                    node.setDashArray(node.userData.onTrue.LineStyle);
                    node.setColor(node.userData.onTrue.LineColor);
                    node.image.setPath(node.userData.onTrue.picture);
                    node.repaint();
                    // 表格数据
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                  case "buttonComponent":
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onTrue";
                    if (node.userData.onTrue.Blinking == true) {
                      node.startTimer(1000);
                    }


                    node.setStroke(Number(node.userData.onTrue.LineWidth));
                    node.setDashArray(node.userData.onTrue.LineStyle);
                    node.setColor(node.userData.onTrue.LineColor);
                    node.setBackgroundColor(node.userData.onTrue.FillColor);
                    if (node.userData.onTrue.Text == "") {
                      node.setText(String(data[dic].value + node.userData.onTrue.unit));
                    } else {
                      node.setText(node.userData.onTrue.Text);
                    }
                    node.setFontColor(node.userData.onTrue.TextColor);
                    node.repaint();

                    // 表格数据
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                  case "basicComponent":
                    console.log("矩形");
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onTrue";
                    if (node.userData.onTrue.Blinking == true) {
                      node.startTimer(1000);
                    }

                    // 修改样式
                    node.setStroke(Number(node.userData.onTrue.LineWidth));
                    node.setDashArray(node.userData.onTrue.LineStyle);
                    node.setColor(node.userData.onTrue.LineColor);
                    node.setBackgroundColor(node.userData.onTrue.FillColor);
                    if (node.userData.onTrue.alpha) {
                      node.setAlpha(Number(node.userData.onTrue.alpha));
                    }
                    node.repaint();
                    // 表格数据
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                  case "LineComponent":

                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onTrue";
                    if (node.userData.onTrue.Blinking == true) {
                      node.startTimer(1000);
                    }
                    node.setStroke(Number(node.userData.onTrue.LineWidth));
                    node.setDashArray(node.userData.onTrue.LineStyle);
                    node.setColor(node.userData.onTrue.LineColor);

                    node.repaint();
                    // 表格数据
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                }
                // 显示值待定
              }
              break;
            case true:
              console.log("进入True")
              if (node.userData.Tag.tag_type == 'boolean') {
                switch (node.userData.types) {
                  case "imageComponent":
                    // console.log("这个是图片控件")
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }

                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.image.setPath(node.userData.onAlarm.picture);
                    // console.log("图片的地址"+node.userData.onAlarm.picture)
                    node.repaint();
                    // console.log("这个是图片控件================================")
                    break;
                  case "buttonComponent":
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }
                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.setBackgroundColor(node.userData.onAlarm.FillColor);
                    if (node.userData.onAlarm.Text == "") {
                      node.setText("报警");
                    } else {
                      node.setText(node.userData.onAlarm.Text);
                    }
                    node.setFontColor(node.userData.onAlarm.TextColor);
                    node.repaint();
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);

                    break;
                  case "basicComponent":
                    // console.log("矩形");
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }

                    // 修改样式
                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.setBackgroundColor(node.userData.onAlarm.FillColor);
                    if (node.userData.onAlarm.alpha) {
                      node.setAlpha(Number(node.userData.onAlarm.alpha));
                    }
                    node.repaint();
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                  case "LineComponent":

                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }
                    // 修改样式
                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.repaint();
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                }
              } else {
                switch (node.userData.types) {
                  case "imageComponent":
                    // console.log("这个是图片控件")
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }

                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.image.setPath(node.userData.onAlarm.picture);
                    // console.log("图片的地址"+node.userData.onAlarm.picture)
                    node.repaint();
                    // console.log("这个是图片控件================================")
                    break;
                  case "buttonComponent":
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }
                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.setBackgroundColor(node.userData.onAlarm.FillColor);
                    if (node.userData.onAlarm.Text == "") {
                      node.setText(String(data[dic].value + node.userData.onAlarm.unit));

                    } else {
                      node.setText(node.userData.onAlarm.Text);
                    }
                    node.setFontColor(node.userData.onAlarm.TextColor);
                    node.repaint();
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);

                    break;
                  case "basicComponent":
                    // console.log("矩形");
                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }

                    // 修改样式
                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.setBackgroundColor(node.userData.onAlarm.FillColor);
                    if (node.userData.onAlarm.alpha) {
                      node.setAlpha(Number(node.userData.onAlarm.alpha));
                    }
                    node.repaint();
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                  case "LineComponent":

                    //闪烁
                    node.stopTimer();
                    node.userData.BlinkingType = "onAlarm";
                    if (node.userData.onAlarm.Blinking == true) {
                      node.startTimer(1000);
                    }
                    // 修改样式
                    node.setStroke(Number(node.userData.onAlarm.LineWidth));
                    node.setDashArray(node.userData.onAlarm.LineStyle);
                    node.setColor(node.userData.onAlarm.LineColor);
                    node.repaint();
                    // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
                    break;
                }
              }
              break;
          }
          break;
        case 1:
          switch (node.userData.types) {
            case "imageComponent":
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.image.setPath(node.userData.onDisconnected.picture);

              node.repaint();
              // websocketChangetable(jsonData.tagid, "Refused");
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
            case "buttonComponent":
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.setBackgroundColor(node.userData.onDisconnected.FillColor);


              if (node.userData.onDisconnected.Text == "") {
                // node.setText(data[dic].value);
              } else {
                node.setText(node.userData.onDisconnected.Text);
              }
              node.setFontColor(node.userData.onDisconnected.TextColor);
              node.repaint();
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
            case "basicComponent":
              console.log("矩形");
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }

              // 修改样式
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.setBackgroundColor(node.userData.onDisconnected.FillColor);
              if (node.userData.onDisconnected.alpha) {
                node.setAlpha(Number(node.userData.onDisconnected.alpha));
              }
              node.repaint();
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
            case "LineComponent":
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }

              // 修改样式
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.repaint();
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
          }
          break;
        case 2:
          switch (node.userData.types) {
            case "imageComponent":
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.image.setPath(node.userData.onDisconnected.picture);

              node.repaint();
              // websocketChangetable(jsonData.tagid, "Refused");
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
            case "buttonComponent":
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.setBackgroundColor(node.userData.onDisconnected.FillColor);
              if (node.userData.onDisconnected.Text == "") {
                // node.setText(data[dic].value);
              } else {
                node.setText(node.userData.onDisconnected.Text);
              }
              node.setFontColor(node.userData.onDisconnected.TextColor);
              node.repaint();
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
            case "basicComponent":
              // console.log("矩形");
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }

              // 修改样式
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.setBackgroundColor(node.userData.onDisconnected.FillColor);
              if (node.userData.onDisconnected.alpha) {
                node.setAlpha(Number(node.userData.onDisconnected.alpha));
              }
              node.repaint();
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
            case "LineComponent":
              //闪烁
              node.stopTimer();
              node.userData.BlinkingType = "onDisconnected";
              if (node.userData.onDisconnected.Blinking == true) {
                node.startTimer(1000);
              }

              // 修改样式
              node.setStroke(Number(node.userData.onDisconnected.LineWidth));
              node.setDashArray(node.userData.onDisconnected.LineStyle);
              node.setColor(node.userData.onDisconnected.LineColor);
              node.repaint();
              // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
              break;
          }
          break;
      }
    }

  }
}

/**
 * [列表与趋势图 添加列表]
 * @param {[type]} data [description]
 */
function addComponentMessage(data) {
  $("#table-stripeds tbody").html('');
  var thishtml = $("#table-stripeds tbody").html();
  var state = '<td></td>'; //状态
  var watch; //查看
  var value = '<td></td>'; //值
  var operation; //操作
  for (var dic in data) {
    switch (data[dic].status) {
      case 0:
        switch (data[dic].alarm) {
          case false:
            if (data[dic].tag_type == "boolean") {
              switch (Number(data[dic].value)) {
                case 0:
                  state = '<td class = "tagState">' + '正常' + '</td>';
                  value = '<td class = "tagsValue">' + '关' + '</td>';
                  break;
                case 1:
                  state = '<td class = "tagState">' + '正常' + '</td>';
                  value = '<td class = "tagsValue" >' + '开' + '</td>';
                  break;
              }
            } else {

              state = '<td class = "tagState"></td>';
              value = '<td class = "tagsValue" >' + data[dic].value + '</td>';
            }
            break;
          case true:
            if (data[dic].tag_type == "boolean") {
              state = '<td class = "tagState">' + '<span class="warn"></span><span class="size_red">报警</span>' + '</td>';
              // value = '<td class = "tagsValue">'+'--'+'</td>';
              switch (Number(data[dic].value)) {
                case 0:
                  value = '<td class = "tagsValue">' + '关' + '</td>';
                  break;
                case 1:
                  value = '<td class = "tagsValue" >' + '开' + '</td>';
                  break;
              }
            } else {
              state = '<td class = "tagState">' + '<span class="warn"></span><span class="size_red">报警</span>' + '</td>';
              value = '<td class = "tagsValue">' + data[dic].value + '</td>';
              // state = '<td class = "tagState">'+data[i].value+'</td>';
            }
            break;
        }
        break;
      case 1:
        state = '<td class = "tagState">' + '<span class="catch"></span><span class="size_yellow">通信异常</span>' + '</td>';
        value = '<td class = "tagsValue">' + '--' + '</td>';
        break;
      case 2:
        state = '<td class = "tagState">' + '<span class="catch"></span><span class="size_yellow">通信异常</span>' + '</td>';
        value = '<td class = "tagsValue">' + '--' + '</td>';
        break;
    }
    switch (Number(data[dic].trends)) {
      case 0:
        watch = '<td >' + '--' + '</td>';
        break;
      case 1:
        watch = '<td >' + '<a data-id = "' + data[dic].tag_id + '" data-name="' + data[dic].name + '" class = "watch" href="#">查看</a>' + '</td>'
        break;
    }
    switch (Number(data[dic].readonly)) {
      case 0:
        switch (data[dic].com_readonly) {
          case false:
         
            operation = '<td>' + '<a class = "doIt" href="#" data-id = "' + data[dic].id + '"  data-type="' + data[dic].tag_type + '"  data-readonly="' + data[dic].readonly + '">操作</a>' + '</td>';
            break;
          case true:
            operation = '<td >' + '--' + '</td>';
            break;
        }

        break;
      case 1:
        operation = '<td >' + '--' + '</td>';
        break;
    }
    var trs = '<tr id = "' + data[dic].id + '">' + '<td class = "componentName" title="' + data[dic].name + '">' + data[dic].name + '</td>' + state + value + watch + operation + '<td style="display:none " class = "havetagid">' + data[dic].tag_id + '</td>' + '<td style="display:none " class = "havetagtype">' + data[dic].tag_type + '</td>' + '</tr>';
    thishtml += trs;

  }
  $("#qu table tbody").html(thishtml);
}

// 查看
var starts_time = "";
var ends_time = "";
$("#qu table tbody").on("click", "tr td a.watch", function() {

  tagsidforlist = $(this).data('id');
  detail($(this).data('name'));
  $("#quChart").show();
  $("#quChart1").hide();
  $("#every").html("实时趋势");
  $(".choosetime").css("visibility", "visible");

  TagRealTimevalue.tag_id = tagsidforlist;

  var date = new Date();
  starts_time = new Date((+date) - 2 * 24 * 3600 * 1000).format("yyyy-MM-dd");
  ends_time = date.format("yyyy-MM-dd");

  $('#selectTime').val(starts_time);
  $("#endTime").val(ends_time);
  $("#slectFen button .txt").html("最近三天");
  createStockChart($(this).data('id'), starts_time, ends_time);
  getTagRealTimevalue($(this).data('id'));
  tagIdForHighChar = Number($(this).data("id")); //控件绑定的TagID 与webSocket做比较


});
//操作
$("#qu table tbody").on("click", "tr td a.doIt", function() {
  changeComponentState($(this).data("id"));
});


function detail(title) {
  layer.open({
    title: [title, 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
    type: 1,
    area: ['1200px', '600px'], //宽高
    content: $("#detail"), //捕获的元素,
    shift: 2
  });
}



var tagsidforlist; //要查看的 tag  ID



// 获取highcharts 数据    历史趋势
function createStockChart(tagsid, start_time, end_time) {

  var datatime = {
    tag_id: tagsid,
    start_time: start_time,
    end_time: end_time
  }
  var dataUp = {
    data: JSON.stringify(datatime)
  }
  console.log("获取历史趋势图上传的数据:" + JSON.stringify(dataUp, null, 2))

  $.ajax({
    type: "POST",
    url: apiurl + "r=api/view/trends/init",
    dataType: 'json',
    data: {
      data: JSON.stringify({
        tag_id: tagsid,
        start_time: start_time,
        end_time: end_time
      })
    },
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      $(".loading").hide();
    },
    success: function(data) {
      $(".loading").hide();

      if (data.success) {

        console.log("获得的历史数据:" + JSON.stringify(data, null, 2));

        var stockCharArr = data.data;
        var stockChartArrayHighChrat = [];

        stockCharArr.reverse();

        for (var i = 0; i < stockCharArr.length; i++) {

          var date = stockCharArr[i].time;
          date = date.substring(0, 19);
          date = date.replace(/-/g, '/');
          var timestamp = new Date(date).getTime();
          stockCharArr[i].time = timestamp;
          var stockChartArrayHighChrats = [];
          stockChartArrayHighChrats.push(stockCharArr[i].time);
          stockChartArrayHighChrats.push(Number(stockCharArr[i].value));

          stockChartArrayHighChrat.push(stockChartArrayHighChrats);


        }
        console.log("历史数据:" + JSON.stringify(stockChartArrayHighChrat, null, 2))
        $('#quChart').highcharts('StockChart', {
          chart: {
            backgroundColor: '#2B2E4B',
            alignTicks: false,
            type: 'spline'
          },
          tooltip: {
              xDateFormat: '%Y-%m-%d %H:%M:%S',
              shared: true
            },
          rangeSelector: {
            allButtonsEnabled: true,
            enabled: false,
            buttonTheme: {
              width: 60
            },
            selected: 2
          },
          title: {
            text: '历史趋势',
            style: {
              color: '#fff',
              fontWeight: 'normal',
              fontFamily: "微软雅黑",
              fontSize: "16px"
            }
          },
          navigator: {
            enabled: true,
            xAxis: {
              lineColor: '#555769',
              dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H点',
                day: '%Y年%m月%d日',
                week: '%e. %b',
                month: '%Y年%m月',
                year: '%Y年'
              }
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            enabled: false
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              second: '%Y-%m-%d<br/>%H:%M:%S',
              minute: '%Y-%m-%d<br/>%H:%M',
              hour: '%Y-%m-%d<br/>%H:00',
              day: '%Y-%m-%d',
              week: '%Y-%m-%d',
              month: '%Y-%m',
              year: '%Y'
            }
          },
          yAxis: {
            gridLineColor: '#555769',
          },
          credits: {
            enabled: false
          },
          series: [{
            type: 'spline',
            name: '值为',
            data: stockChartArrayHighChrat,
          }]
        });
      } else {
        layer.msg("错误原因:" + data.error_message);
        console.log("错误原因:" + JSON.stringify(data, null, 2))
      }
    },
    error: function(data) {
      $(".loading").hide();
      layer.msg(data.error_message);
      console.log("失败原因:" + JSON.stringify(data, null, 2))
    }
  });
}

/**
 * [获取tag到现在为止的所有数据]
 * @param  {[type]} tagid [description]
 * @return {[type]}       [description]
 */

var tagValueForHighChar; //实时监控 的  y值
var tagIdForHighChar; //实时监控 控件TagID
var tagValueSetInterval;

setInterval(function() {
  tagValue = Math.random();
}, 100)


var TagRealTimevalue = {
  tag_id: "",
  tag_value: ""
}

function getTagRealTimevalue(tagid) {
  console.log('上传的数据:' + JSON.stringify({
    tag_id: tagid
  }, null, 2))
  $.ajax({
    url: apiurl + "r=api/view/trends/constant",
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        tag_id: tagid
      })
    },
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      $(".loading").hide();
    },
    success: function(data) {
      if (data.success) {
        var length = data.data.length;
        var arrayData = data.data;
        arrayData.reverse();
        var higgcharArray = [];
        for (var i = 0; i < arrayData.length; i++) {

          var xy = {
            x: arrayData[i].time,
            y: Number(arrayData[i].value)
          }
          higgcharArray.push(xy);

          var date = higgcharArray[i].x;
          date = date.substring(0, 19);
          date = date.replace(/-/g, '/');
          var timestamp = new Date(date).getTime();
          higgcharArray[i].x = timestamp;
        }
        tagValueForHighChar = higgcharArray[higgcharArray.length - 1].y;
        clearInterval(tagValueSetInterval);

        Highcharts.setOptions({
          global: {
            useUTC: false
          }
        });
        $('#quChart1').highcharts({
          chart: {
            backgroundColor: '#2B2E4B',
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
              load: function() {
                var series = this.series[0];
                tagValueSetInterval = setInterval(function() {

                  var x = (new Date()).getTime(),
                    y = tagValueForHighChar;
                  series.addPoint([x, y], true, true);
                }, 5000);
              }
            }
          },
          title: {
            text: '实时趋势',
            style: {
              color: '#fff',
              fontWeight: 'normal',
              fontFamily: "微软雅黑",
              fontSize: "16px"
            }
          },
          xAxis: {
            lineColor: '#555769',
            type: 'datetime',
            tickPixelInterval: null,
            labels: {
              formatter: function() {
                return Highcharts.dateFormat('%H:%M:%S', this.value);
              }
            }

          },
          yAxis: {
            title: {
              text: 'Value'
            },
            gridLineColor: '#555769',
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            formatter: function() {
              return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
            }
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [{
            color: '#f5a623',
            name: 'Random data',
            data: higgcharArray
          }]
        });

      } else {
        layer.msg("实时数据:" + data.error_message)
        console.log("实时数据：" + JSON.stringify(data, null, 2))
      }
    },
    error: function(data) {
      layer.msg("实时数据：" + data.error_message)
      console.log("实时数据：" + JSON.stringify(data, null, 2))
    }

  });
}



var layerType;
/**
 *  [点击修改 canvas组件状态]
 * @param  {[string]} id    [组件 id]
 * @param  {[number]} type  [组件绑定的tag 类型]
 * @param  {[string]} tagid [组件绑定的tag id]
 */
function changeComponentState(componentID) {
  var isReadOnly = 1;


  // 这里添加判断 是否只读
  if (componentIsReadonly[componentID]) {
    console.log('readonly:' + componentIsReadonly[componentID].readonly)
    console.log('com_readonly:' + componentIsReadonly[componentID].com_readonly)
    if (Number(componentIsReadonly[componentID].readonly) === 0) {
      if (componentIsReadonly[componentID].com_readonly == false) {
        isReadOnly = 0;
      }
    }
  }
  console.log('isReadOnly:' + isReadOnly)
  console.log('componentIsReadonly[componentID].tag_type' + componentIsReadonly[componentID].tag_type)
  if (isReadOnly == 0) {
    switch (componentIsReadonly[componentID].tag_type) {
      case 'boolean':
        layerType = layer.open({
          title: ['指定数据标签值', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
          type: 1,
          skin: 'layui-primary', //加上边框
          area: ['1018px', '275px'], //宽高
          content: $("#action1"), //捕获的元素,
          shift: 2,
          move: false,
          btn: ['确定', '取消'],
          success: function() {
            switch (Number(componentIsReadonly[componentID].value)) {
              case 0:
                console.log("进入关");
                $('#close').iCheck('check');
                $('#open').iCheck('uncheck');
                break;
              case 1:
                console.log("进入开");
                $('#close').iCheck('uncheck');
                $('#open').iCheck('check');
                break;

            }
          },
          yes: function(index) {

            var id = $('#action1 input[name="status"]:checked').attr('id');

            console.log("ID 为:" + id);
            switch (id) {
              case "open":
                var datas = {
                  tag_id: componentIsReadonly[componentID].tag_id,
                  value: 1,
                }
                var dataUp = {
                  data: JSON.stringify(datas)
                }
                changeTagValue("canvas_com", dataUp, componentIsReadonly[componentID].tag_id, componentIsReadonly[componentID].id);
                break;
              case "close":
                var data = {
                  tag_id: componentIsReadonly[componentID].tag_id,
                  value: 0,
                }
                var dataUp = {
                  data: JSON.stringify(data)
                }
                changeTagValue("canvas_com", dataUp, componentIsReadonly[componentID].tag_id, componentIsReadonly[componentID].id);
                break;
            }
            layer.close(layerType);
          },
          btn2: function(index) {
            layer.close(layerType);

          }
        });
        break;
      case 'integer':
        console.log('进入integer')
        $("#action").find("input").val(componentIsReadonly[componentID].value);
        layerForother('canvas_com', componentIsReadonly[componentID].tag_id, componentIsReadonly[componentID].id, "integer");
        break;
      case 'float':
        $("#action").find("input").val(componentIsReadonly[componentID].value);
        layerForother('canvas_com', componentIsReadonly[componentID].tag_id, componentIsReadonly[componentID].id, "realnumber");
        break;
      case 'string':
        $("#action_str").find("input").val(componentIsReadonly[componentID].value);
        layerType = layer.open({
          title: ['指定数据标签值', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
          type: 1,
          skin: 'layui-primary', //加上边框
          area: ['1018px', '275px'], //宽高
          content: $("#action_str"), //捕获的元素,
          shift: 2,
          move: false,
          btn: ['确定', '取消'],
          yes: function(index) {
            $("#action_str").find("input").val();
            console.log($("#action_str").find("input").val());
            var data = {
              tag_id: componentIsReadonly[componentID].tag_id,
              value: $("#action_str").find("input").val(),
            }
            var dataUp = {
              data: JSON.stringify(data)
            }
            changeTagValue("canvas_com", dataUp, componentIsReadonly[componentID].tag_id, componentIsReadonly[componentID].id);
            $("#action_str").find("input").val("");
            layer.close(layerType);
          },
          btn2: function(index) {
            layer.close(layerType);

          }
        });
        break;
    }
  } else {
    // layer.msg('本控件为只读控件');
  }
}



/**
 * [整型/实数型 控件操作]
 * @param  {[type]} type        [canvas_com/Global_btn]
 * @param  {[type]} tagid       [标签ID]
 * @param  {[type]} componentid [组件ID]
 * @param  {[type]} tag_type    [标签类型]
 * @return {[type]}             [description]
 */
function layerForother(type, tagid, componentid, tag_type) {
  layer.open({
    title: ['指定数据标签值', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
    type: 1,
    skin: 'layui-primary', //加上边框
    area: ['1018px', '275px'], //宽高
    content: $("#action"), //捕获的元素,
    shift: 2,
    move: false,
    btn: ['确定', '取消'],
    yes: function(index) {
      console.log('tag_type:' + tag_type);
      switch (tag_type) {
        case "integer":
          console.log('=========')
          if (checkInputNumber($("#dataValue").val())) {
            console.log('=====adfgdg====')
            var data = {
              tag_id: tagid,
              value: Number($("#dataValue").val()),
            }
            var dataUp = {
              data: JSON.stringify(data)
            }
            switch (type) {
              case "canvas_com":
                changeTagValue("canvas_com", dataUp, tagid, componentid);
                break;
              case "global_btn":
                changeTagValue("global_btn", dataUp, tagid, componentid);
                break;
            }
            $("#action").find("input").val("");
            layer.close(index);
          } else {
            layer.msg("请输入正确的整数");
          }

          break;
        case "realnumber":
          if (!isNaN($("#action").find("input").val())) {
            var data = {
              tag_id: tagid,
              value: Number($("#action").find("input").val()),
            }
            var dataUp = {
              data: JSON.stringify(data)
            }
            switch (type) {
              case "canvas_com":
                changeTagValue("canvas_com", dataUp, tagid, componentid);
                break;
              case "global_btn":
                changeTagValue("global_btn", dataUp, tagid, componentid);
                break;
            }
            $("#action").find("input").val("");
            layer.close(index);
          } else {
            layer.msg("请输入正确的实数");
          }
          break;
      }

      console.log($("#action").find("input").val());

    },
    btn2: function(index) {
      layer.close(index);

    }
  });
}

/**
 * [检查是否为整数]
 * @param  {[type]} nums [description]
 * @return {[type]}      [description]
 */
function checkInputNumber(nums) {
  if (!isNaN(nums)) {
    var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    if (!r.test(nums)) {
      return true;
    } else {
      return false;
    }

  } else {
    return false;
  }
}



/**
 * @description [更新数据标签的值]
 * @param  {[url]}
 * @param  {[上传的数据]}
 */
function changeTagValue(type, data, tagid, componentid) {
  console.log("上传的数据:", JSON.stringify(data))
  $.ajax({
    url: apiurl + "r=api/entity/tag/value",
    type: 'post',
    dataType: 'json',
    data: data,
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      $(".loading").hide();
    },
    success: function(data) {
      $(".loading").hide();
      if (data.success) {
        console.log("返回的数据为:" + JSON.stringify(data, null, 2));
        var value = data.data;
        switch (type) {
          case "canvas_com":
            findComponentByComponentid(value, componentid);
            break;
          case "global_btn":
            console.log("查看tag的类型:" + $("#" + componentid).find(".havetagtype").text())
             console.log('按钮类名:'+componentid);
             switch (Number(value)) {
                case 0:
                  $("#" + componentid).find(".tagsValue").text("关");
                  $('.' + componentid).data('value', '0').removeClass('boolean-false boolean-true').addClass('boolean-true');

                  // console.log('查看修改之后的值：' +$('.' + componentid).data('value'))

                  break;
                case 1:
                  $("#" + componentid).find(".tagsValue").text("开");
                  $('.' + componentid).data('value', '1').removeClass('boolean-false boolean-true').addClass('boolean-false');;
                   // console.log('查看修改之后的值：' +$('.' + componentid).data('value'))
                  break;
              }
            // if (Number($("#" + componentid).find(".havetagtype").text()) == 1) {
             
            // } else {
            //   $("#" + componentid).find(".tagsValue").text(value);
            // }
            break;
        }
        componentIsReadonly[componentid].value = data.data;
        layer.msg("修改成功");

      } else {
        layer.msg("修改失败:" + data.error_message)
        console.log("修改失败==========!" + JSON.stringify(data, null, 2))
      }
    },
    error: function(data) {
      $(".loading").hide();
      console.log("修改失败!" + JSON.stringify(data, null, 2))
      layer.msg("修改失败:" + data.error_message)
    }
  });
}

/**
 * [更改监控画面控件控件的 value]
 * @param  {[type]} tagid [控件绑定的tag的ID]
 * @param  {[type]} value [更改后的值]
 * @return {[type]} componentid  [画面控件的ID]
 */
function findComponentByComponentid(value, componentid) {

  var node = getCanvasNode(imageCanvas, componentid)
  console.log("该控件的类型:" + node.userData.Tag.tag_type);
  console.log("要更改的值:" + value)

  if (node.userData.Tag.tag_type == 'boolean') {
    layer.msg('开关型');
    switch (Number(value)) {
      case 0:
        switch (node.userData.types) {
          case "imageComponent":
            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onFalse";
            if (node.userData.onFalse.Blinking == true) {
              node.startTimer(1000);
            }

            node.setStroke(Number(node.userData.onFalse.LineWidth));
            node.setDashArray(node.userData.onFalse.LineStyle);
            node.setColor(node.userData.onFalse.LineColor);
            node.image.setPath(node.userData.onFalse.picture);
            node.repaint();
            // 表格数据
            // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isAlarm, jsonData.value);
            break;
          case "buttonComponent":

            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onFalse";
            if (node.userData.onFalse.Blinking == true) {
              node.startTimer(1000);
            }

            node.setStroke(Number(node.userData.onFalse.LineWidth));
            node.setDashArray(node.userData.onFalse.LineStyle);
            node.setColor(node.userData.onFalse.LineColor);
            node.setBackgroundColor(node.userData.onFalse.FillColor);
            node.setText(node.userData.onFalse.Text);
            node.setFontColor(node.userData.onFalse.TextColor);
            node.repaint();

            // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isAlarm, jsonData.value);

            break;
          case "basicComponent":
            // console.log("矩形");
            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onFalse";
            if (node.userData.onFalse.Blinking == true) {
              node.startTimer(1000);
            }

            // 修改样式
            node.setStroke(Number(node.userData.onFalse.LineWidth));
            node.setDashArray(node.userData.onFalse.LineStyle);
            node.setColor(node.userData.onFalse.LineColor);
            node.setBackgroundColor(node.userData.onFalse.FillColor);
            if (node.userData.onFalse.alpha) {
              node.setAlpha(Number(node.userData.onFalse.alpha));
            }
            node.repaint();
            // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isAlarm, jsonData.value);
            break;
          case "LineComponent":
            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onFalse";
            if (node.userData.onFalse.Blinking == true) {
              node.startTimer(1000);
            }

            // 修改样式
            node.setStroke(Number(node.userData.onFalse.LineWidth));
            node.setDashArray(node.userData.onFalse.LineStyle);
            node.setColor(node.userData.onFalse.LineColor);
            node.repaint();
            // websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isAlarm, jsonData.value);
            break;
        }
        break;
      case 1:
        switch (node.userData.types) {
          case "imageComponent":
            node.stopTimer();
            node.userData.BlinkingType = "onTrue";
            if (node.userData.onTrue.Blinking == true) {
              node.startTimer(1000);
            }
            node.setStroke(Number(node.userData.onTrue.LineWidth));
            node.setDashArray(node.userData.onTrue.LineStyle);
            node.setColor(node.userData.onTrue.LineColor);
            node.image.setPath(node.userData.onTrue.picture);
            node.repaint();
            break;
          case "buttonComponent":
            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onTrue";
            if (node.userData.onTrue.Blinking == true) {
              node.startTimer(1000);
            }

            node.setStroke(Number(node.userData.onTrue.LineWidth));
            node.setDashArray(node.userData.onTrue.LineStyle);
            node.setColor(node.userData.onTrue.LineColor);
            node.setBackgroundColor(node.userData.onTrue.FillColor);
            node.setText(node.userData.onTrue.Text);
            node.setFontColor(node.userData.onTrue.TextColor);
            node.repaint();

            break;
          case "basicComponent":
            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onTrue";
            if (node.userData.onTrue.Blinking == true) {
              node.startTimer(1000);
            }

            // 修改样式
            node.setStroke(Number(node.userData.onTrue.LineWidth));
            node.setDashArray(node.userData.onTrue.LineStyle);
            node.setColor(node.userData.onTrue.LineColor);
            node.setBackgroundColor(node.userData.onTrue.FillColor);
            if (node.userData.onTrue.alpha) {
              node.setAlpha(Number(node.userData.onTrue.alpha));
            }
            node.repaint();
            break;
          case "LineComponent":

            //闪烁
            node.stopTimer();
            node.userData.BlinkingType = "onTrue";
            if (node.userData.onTrue.Blinking == true) {
              node.startTimer(1000);
            }
            node.setStroke(Number(node.userData.onTrue.LineWidth));
            node.setDashArray(node.userData.onTrue.LineStyle);
            node.setColor(node.userData.onTrue.LineColor);

            node.repaint();
            break;
        }
        break;
    }
  } else if (node.userData.valueType) {

    console.log('非开关型')
    switch (node.userData.valueType) {
      case "textValueComponent":
        node.setText(value);
        node.repaint();
        break;
      case "valueComponent":
        if (node.userData.types === 'LabelComponent') {
          node.setText(value);
          node.repaint();
        } else {
          node.label.setText(value);
          node.label.repaint();
        }
        break;
    }
  }


  console.log("查看tag的类型:" + $("#" + componentid).find(".havetagtype").text())
  if (Number($("#" + componentid).find(".havetagtype").text()) == 1) {
    switch (Number(value)) {
      case 0:
        $("#" + componentid).find(".tagsValue").text("关");
        break;
      case 1:
        $("#" + componentid).find(".tagsValue").text("开");
        break;
    }
  } else {
    $("#" + componentid).find(".tagsValue").text(value);
  }

}



// ========================================================================
// 初始化监控画面
var imageCanvas;
$(window).load(function() {
  draw2d.Configuration.factory.createConnection = function(sourcePort, targetPort, callback, dropTarget) {
    return new HoverConnection(sourcePort, targetPort);
  };
  //选择框  样式
  draw2d.Configuration.factory.createResizeHandle = function(forShape, type) {
    var handle = new draw2d.ResizeHandle(forShape, type);
    handle.attr({
      width: 10,
      height: 10,
      radius: 0,
      color: "#35C99D",
      stroke: 1,
      bgColor: "#35C99D"
    });
    return handle;
  }

  var canvas = new draw2d.Canvas("canvas"); //主画布
  imageCanvas = canvas;
  // 边框阴影
  var filter = canvas.paper.createFilter();
  filter.createShadow(0, 0, 3, 0.3, "#000000");
  filter.element.setAttribute("x", "-35%");
  filter.element.setAttribute("y", "-35%");

  canvas.on("figure:add", function(emitter, event) {
    if (!(event.figure instanceof draw2d.Connection)) {
      event.figure.shape.filter(filter);
    }
  });


  canvas.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy({
    lineColor: "#35c99d"
  }));
  canvas.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy({
    lineColor: "#35c99d"
  }));
  canvas.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy({
    lineColor: "#35c99d"
  }));
});

/** 
 * 默认的连线样式
 * @extend draw2d.Connection
 */
var HoverConnection = draw2d.Connection.extend({
  init: function(sourcePort, targetPort) {
    var self = this;
    this._super({
      router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
      radius: 5,
      stroke: 1.35,
      color: "#68C9FF"
    });

    this.on("dragEnter", function(emitter, event) {
      console.log('drag enter');
      self.attr({
        outlineColor: "#68C9FF",
        outlineStroke: 2,
        color: "#68C9FF"
      });
    });
    this.on("dragLeave", function(emitter, event) {
      console.log('drag leave');
      self.attr({
        outlineColor: "#68C9FF",
        outlineStroke: 0,
        color: "#68C9FF"
      });
    });
  },

  onDragEnter: function(draggedFigure) {
    return this;
  }
});

// 还原数据时,在画布找到 控件
function getCanvasNode(canvas, id) {

  var node = canvas.getFigure(id);
  var nodeLine = canvas.getLine(id);
  if (node === null && nodeLine === null) {
    return 'underfined';
  }
  if (node !== null) {
    return node;
  } else if (nodeLine !== null) {
    return nodeLine;
  }

}

// ========================================================================



//控件悬浮提示框
function showTooltips(obj) {
  var tooltips = $('#tooltips');
  if (obj.userData.Hint !== '') {
    tooltips.show().html(obj.userData.Hint);
    var tPosX = obj.getAbsoluteX() + obj.getWidth() / 2 - tooltips.width() / 2 + 8;
    var tPosY = obj.getAbsoluteY() + obj.getHeight() + 10;
    tooltips.css({
      'top': tPosY + 'px',
      'left': tPosX + 'px'
    });
  }
}



/**
 * [使用vlc 播放rtsp视频]
 * @param  {[type]} title   [标题]
 * @param  {[type]} rtspurl [URL地址]
 * @return {[type]}         [description]
 */
function vlc(title, rtspurl) {
  $("#vlc_bg").css({
    display: "block",
    height: $(document).height()
  });
  var $box = $('.vlc_box');
  $("#vlc").find(".rtt").val(rtspurl);
  $box.css({
    //设置弹出层距离左边的位置
    left: ($("body").width() - $box.width()) / 2 - 20 + "px",
    //设置弹出层距离上面的位置
    top: ($(window).height() - $box.height()) / 2 + $(window).scrollTop() + "px",
    display: "block"
  });
  $(".vlc_box h2").find("span.title").text(title);
  $(".vlc_box").on('click', '.vlc_close', function() {
    $("#vlc_bg,.vlc_box").css("display", "none");
  });
}


//时间选择改变
$("#slectFen ul li a").click(function() {
  var txt = $(this).text();
  var value = $(this).attr("rel");
  if (value == 1 || value == 2) {
    $("#selectTime").val($(this).attr('value'));
    $("#endTime").val($(this).attr('value'));
  } else if (value == 3 || value == 4 || value == 5) {
    $("#selectTime").val($(this).attr('value'));
    $("#endTime").val(compareDate(1, 0));
  }

  $("#slectFen button .txt").html(txt).attr('rel', value);
  starts_time = $('#selectTime').val();
  ends_time = $("#endTime").val();
  createStockChart(tagsidforlist, starts_time, ends_time);

});

$(function() {
  showOrHideGlobalbtn();
})

function showOrHideGlobalbtn() {
  var num = Number($(window).width());
  if ($('#SecCanvas').css('left') == '950px') {
    if ($('#SecCanvasFullBtn').hasClass('in')) {
      $('#SecCanvas div.title').click();
    }
  } else {
    if ($('#SecCanvasFullBtn').hasClass('in')) {} else {
      $('#SecCanvas div.title').click();
    }
  }
}

$(window).resize(function() {
  var num = Number($(window).width());
  if (num < 1835) {
    $('#main-menu-wrapper').css('left', '-380px');
    $('.handle').removeClass('open');
  }
  if (num > 1835) {
    $('#main-menu-wrapper').css('left', '0px');
    $('.handle').addClass('open');
  }
  showOrHideGlobalbtn();
});
$('.handle').on('click', function() {
  var odiv = document.getElementById('main-menu-wrapper');
  var aa = $('#main-menu-wrapper')
  console.log(aa.offset().left)
  if (aa.offset().left == 0) {
    startmove(1,-380, -20);
  } else {
    startmove(0,0, 20);
  }
})

var timer = null;

function startmove(status,target, speed) {
  var odiv = document.getElementById('main-menu-wrapper');

  clearInterval(timer);
  timer = setInterval(function() {
    if (odiv.offsetLeft == target) {
      clearInterval(timer);
    } else {
      if (status === 0) {
        $('.handle').addClass('open');
      }else{
        
        $('.handle').removeClass('open');
      }
      odiv.style.left = odiv.offsetLeft + speed + 'px';
    }
  }, 10);

}



// 修复后台推送数据 画面闪烁
$('#EquipmentMonitoring a').on('click', function() {
  setTimeout(function(){
    var writer = new draw2d.io.json.Writer();
  writer.marshal(imageCanvas, function(json) {

    for(var i in json){
       var node = getCanvasNode(imageCanvas, json[i].id);
       if (node.userData.valueType) {
      switch (node.userData.valueType) {
        case "textValueComponent":
          node.setText(String(node.getText()));
          // node.repaint();
          break;
        case "valueComponent":
          if (node.userData.types === 'LabelComponent') {
            node.setText(String(node.getText()));
            // node.repaint();
          } else {
            node.label.setText(String(node.label.getText()));
            // node.label.repaint();
          }
          break;
      }
    }
    }
    

  });
  },300)
  
})