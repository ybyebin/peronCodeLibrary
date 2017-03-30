var groups;//组信息

$(function() {
  Initialize(true);
  
});
/**
 * [初始化数据]
 * @param {Boolean} isInitialize       [请求树数据]
 * @param {Boolean} isInitializescroll [是否初始化滚动条]
 */
function Initialize(isInitialize) {
  var dataurl = apiurl + "r=api/project/info";
  var gettreeurl = apiurl + "r=api/entity/tree/tree";
  $.ajax({
    url: dataurl,
    type: 'post',
    dataType: 'json',
    beforeSend: function() {
      $(".loading").show();
    },
    success: function(results) {
      if (results.success) {
        $('#logo').attr('src', results.data.logo_path);
        //请求树      
        $.ajax({
          url: gettreeurl,
          type: 'post',
          dataType: 'json',
          beforeSend: function() {
            // $(".loading").show();
          },
          success: function(result) {
            if (result.success) {
              if (isInitialize) {
                classificationTree('tree', results, result, icheckInitialize);
              }
              classificationTree('trees', results, result, icheckInitializeDisplay);
            }else{
              layer.msg(data.error_message);
              returnLogIn(data.error_message);
            }
           
          },
          error: function(data) {
            layer.msg(data.error_message);
            console.log('错误原因:' + JSON.stringify(data, null, 2))
          }
        });
      }else{
        layer.msg(results.error_message);
        returnLogIn(data.error_message);
      }

    },
    error: function(data) {
      layer.msg(data.error_message);
      console.log('错误原因:' + JSON.stringify(data, null, 2))
    }
  });
}


//编辑
$('#btn-edit').on('click', function() {
  $('#classification-main-form').hide();
  $('#classification-edit-form').show();
});
//取消编辑
$('#btn-cancle').on('click', function() {
  $('#classification-main-form').show();
  $('#classification-edit-form').hide();
  $('loading').hide();
});
//保存编辑
$('#btn-save').on('click', function() {

  var array = [];
  for(var key in groups){
    array.push(groups[key]);
  }

  // console.log('查看树状结构上传的数据:' + JSON.stringify(array, null, 2));
  var dataurl = apiurl + "r=api/entity/level/save";
  $.ajax({
    url: dataurl,
    type: 'post',
    dataType: 'json',
    data: {data: JSON.stringify({level_result: array})},
    beforeSend: function() {
      $(".loading").show();
    },
    success: function(data) {
      $(".loading").hide();
      if (data.success) {
        Initialize(false);
         $('#classification-main-form').show();
        $('#classification-edit-form').hide();
      } else {
        layer.msg(data.error_message);
        returnLogIn(data.error_message);
      }
    },
    error: function(data) {
      $(".loading").hide();
      layer.msg(data.error_message);
    }
  });

});



/**
 * [选择框初始化-编辑]
 * @return {[type]} [description]
 */
function icheckInitialize() {
  $('.tree-ckss').iCheck('destroy');
  $(".tree-ckss").iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
    // radioClass: 'icheckbox_square-green',
    increaseArea: '20%'
  });
  $(".tree-ckss-son").iCheck('disable');

  $('.loading').hide();

}
/**
 * [选择框初始化-展示]
 * @return {[type]} [description]
 */
function icheckInitializeDisplay() {
  $('.trees-ckss').iCheck('destroy');
  $(".trees-ckss").iCheck({
    checkboxClass: 'icheckbox_square-green',
    // radioClass: 'iradio_square-green',
    radioClass: 'icheckbox_square-green',
    increaseArea: '20%'
  });
  $(".trees-ckss").iCheck('disable');
  $('.loading').hide();

  groups = checkGroups();

}

/**
 * [选择框初始化-弹窗]
 * @return {[type]} [description]
 */
function icheckInitializeAlert() {
  $('.alert-ckss').iCheck('destroy');
  $(".alert-ckss").iCheck({
    checkboxClass: 'icheckbox_square-green',
    // radioClass: 'iradio_square-green',
    // radioClass: 'icheckbox_square-green',
    increaseArea: '20%'
  });
}


/**
 * [classificationTree description]
 * @param  {[type]} type    [tree编辑/trees展示]
 * @param  {[type]} results [工程信息]
 * @param  {[type]} result  [树信息]
 * @param  {[type]} iChecks [选择框]
 * @param  {[type]} initialize [初始化(滚动条)]
 * @return {[type]}         [description]
 */
function classificationTree(type,results,result,iChecks) {
  $("#" + type).html('');
  var html = "";
  html += '<div class="panel panel-default" style="margin-right: 0;text-align:left"><div class="panel-heading"><h4 class="panel-title"><a href="#' + type + '-' + results.data.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle" aria-expanded="true  pointGroups-name">' + results.data.name + '</a></h4></div>';
  html += '<div class="panel-collapse collapse in" id="' + type + '-' + results.data.id + '" aria-expanded="false" ><div class="panel-body ' + type + 'classification-main-body">';
  $.each(result.data, function(index, item) {

    var a, tag, level;
    if (item.hide_tag) {
      tag = false;
    } else {
      tag = true;
    }
    if (item.next_level) {
      level = true;
    } else {
      level = false;
    }

    if (level === false && tag === false) {
      a = '';
    } else {
      a = 'add'
    };

    if (type === 'tree') {
      a = '';
    }

    html += '<div class="first panel panel-default ' + type + '-' + item.id + '"><div class="panel-heading fang" style="padding-left:0;padding-right:0px;" ><h4 class="panel-title">';
    // if (a === '') {
    // html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion"  class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="true">';
    // }
    // else {
    html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="one-step accordion-toggle ' + a + ' pointGroups-a" aria-expanded="true">';
    // }


    html += '<input name="tree-ckss" data-parid="' + type + '-' + item.id + '" data-step="' + type + '-first" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss"  data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '<span data-step="'+type+'-first" data-id="' + type + '-' + item.id + '" data-groupid="' + item.id + '"   class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
    html += '<div class="first-body panel-collapse collapse in " id="' + type + '-' + item.id + '" aria-expanded="true">';

    if (item.next_level) {
      // console.log('进入第二层');
      $.each(item.next_level, function(index, item) {
        var a, tag, level;
        if (item.hide_tag) {
          tag = false;
        } else {
          tag = true;
        }
        if (item.next_level) {
          level = true;
        } else {
          level = false;
        }

        if (level === false && tag === false) {
          a = '';
        } else {
          a = 'add'
        };

        if (type === 'tree') {
          a = '';
        }
        html += '<div class="second panel panel-default ' + type + '-' + item.id + '" ><div class="panel-heading fang" style="margin-left: 15px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
        // if (a === '') {
        // html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
        // } else {
        html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
        // }
        html += '<input name="tree-ckss" data-parid="' + type + '-' + item.id + '" data-step="' + type + '-second" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss" data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '<span data-step="'+type+'-second" data-id="' + type + '-' + item.id + '"  data-groupid="' + item.id + '"   class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
        html += '<div class="second-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false" style="height: 0px;">';


        if (item.next_level) {
          // console.log('进入第三层');
          $.each(item.next_level, function(index, item) {
            var a, tag, level;
            if (item.hide_tag) {
              tag = false;
            } else {
              tag = true;
            }
            if (item.next_level) {
              level = true;
            } else {
              level = false;
            }

            if (level === false && tag === false) {
              a = '';
            } else {
              a = 'add'
            };


            if (type === 'tree') {
              a = '';
            }
            html += '<div class="third panel panel-default ' + type + '-' + item.id + '" style="padding-left:15px;"><div class="panel-heading fang" style="padding-left:45px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
            // if (a === '') {
            // html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
            // } else {
            html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
            // }
            html += '<input name="tree-ckss" data-parid="' + type + '-' + item.id + '" data-step="' + type + '-third" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss" data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '<span data-step="'+type+'-third" data-id="' + type + '-' + item.id + '" data-groupid="' + item.id + '"    class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
            html += '<div class="thrid-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false" style="height: 0px;padding-left:45px;">';

            if (item.hide_tag) {} else if (item.tag_id_tree) {
              // console.log('第三层子元素展示');
              var tags = item.tag_id_tree;
              $.each(tags, function(indexs, items) {
                html += '<div class="panel-body tree-msg" style="padding-left:20px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
              })
            }
            html += '</div>';

          });
        }

        if (item.hide_tag) {} else if (item.tag_id_tree) {
          // console.log('第二层子元素展示');
          var tags = item.tag_id_tree;
          $.each(tags, function(indexs, items) {
            html += '<div class="panel-body tree-msg" style="padding-left:36px;;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
          })
        }
        html += '</div>';
      });
    }

    if (item.hide_tag) {} else if (item.tag_id_tree) {
      // console.log('第一层子元素展示');
      var tags = item.tag_id_tree;
      $.each(tags, function(indexs, items) {
        html += '<div class="panel-body tree-msg" style=";margin-left: 15px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
      })


    }

    html += '</div>';

  });
  html += '</div></div>';
    $("#" + type).append(html);
  if (type === 'tree') {  
    $("#" + type).mCustomScrollbar();
  }

  iChecks();
}

//添加同级菜单
$('#add-samelevemenu-btn').on('click', function() {

  if ($('.treeclassification-main-body').children().length) {
    var arr = [];
    if ($('input[name="tree-ckss"]:checked').hasClass('fu')) {
      // console.log('查看:' + $('input[name="tree-ckss"]:checked').parent().parent().attr('href'))
        // arr.push($('input[name="tree-ckss"]:checked').attr('id'));
      var inpu = $('input[name="tree-ckss"]:checked');
      var input_data = {
        id: inpu.parent().parent().attr('href'),
        type: inpu.data('step'),
       
      };
      switch (inpu.data('step')) {
        case 'tree-first':
          console.log('查看:' + $('.treeclassification-main-body').find('div.first').length);
          input_data.brother = Number($('.treeclassification-main-body').find('div.first').length);
          input_data.groupid = 0;
          break;
        case 'tree-second':
          // if ($('div.second').length) {
          console.log('查看:' + inpu.parent().parent().parent().parent().parent().parent().find('div.second').length);
          input_data.brother = Number(inpu.parent().parent().parent().parent().parent().parent().find('div.second').length);
          input_data.groupid = inpu.parent().parent().parent().parent().parent().parent().attr('id').substring(5);
          // }
          break;
        case 'tree-third':

          console.log('查看:' + inpu.parent().parent().parent().parent().parent().parent().find('div.third').length);
          if (inpu.parent().parent().parent().parent().parent().parent().find('div.third').length) {
            input_data.brother = Number(inpu.parent().parent().parent().parent().parent().parent().find('div.third').length);
          }

          input_data.groupid = inpu.parent().parent().parent().parent().parent().parent().attr('id').substring(5);
          break;
      }

      arr.push(input_data);
    }

    if (arr.length === 0) {
      layer.msg('请选择一个组');
    } else {
      console.log("查看数据:" + JSON.stringify(arr, null, 2));

      layer.open({
        title: ['选择添加组', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:20px'],
        type: 1,
        skin: 'layui-primary', //加上边框
        area: ['700px', '625px'], //宽高
        content: $("#classification-groups"), //捕获的元素,
        shift: 2,
        move: false,
        btn: ['确定', '放弃'],
        success: function() {
          $('.alert-body').html('');
          $('#content-search-input').val('');
        },
        yes: function(layerindex) {

          var alertdic = checkGroups();

          var arrs = [];
          $('input[name="alert-ckss"]:checked').each(function(index, element) {
            var dic = {
              id: Number($(element).attr('id'))
            }
            arrs.push(dic);
          });
          console.log('被选中的组:' + JSON.stringify(arrs, null, 2));
          var have = false;
          if (Number(arrs.length) !== 0) {
            for (var key in arrs) {
              if (alertdic[arrs[key].id]) {
                have = true;
                console.log('存在')
                break;
              }
            }


          if (have) {
            layer.msg('不能选择已添加的群组');
          } else {
            var urls = apiurl + "r=api/entity/tree/tags";
            $.ajax({
              url: urls,
              type: 'post',
              dataType: 'json',
              data: {
                data: JSON.stringify({
                  tag_groups: arrs
                })
              },
              beforeSend: function() {
                $(".loading").show();
              },
              success: function(result) {

                console.log('查看请求的组数据:'+JSON.stringify(result.data,null,2))
                if (result.success) {
                  layer.close(layerindex);
                  switch (arr[0].type) {
                    case 'tree-first':
                      // layer.msg('一级菜单无同级菜单');


                      var html = '';
                      var type = 'tree';
                      var a = '';
                      console.log('查看已有的数组1111:'+JSON.stringify(groups,null,2))
                      $.each(result.data, function(indexnum, item) {
                        console.log('查看一级菜单添加的数据'+JSON.stringify(item,null,2))
                         groups[item.id] = {
                          id: item.id,
                          level: 1,
                          higher_level:0 
                        }
                         console.log('查看已有的数组222:'+JSON.stringify(groups,null,2))

                        var index = arr[0].brother + 1 + indexnum;

                        html += '<div class="first panel panel-default ' + type + '-' + item.id + '"><div class="panel-heading fang" style="padding-left:0;padding-right:0px;" ><h4 class="panel-title">';
                        html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="one-step accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';

                        html += '<input name="tree-ckss" data-parid="' + type + '-' + item.id + '" data-step="tree-first" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss"  data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.group_name + '<span data-step="tree-first" data-groupid="'+ item.id + '" data-id="' + type + '-' + item.id + '"    class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
                        html += '<div class="first-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false">';
                        if (Number(item.hide_tag) === 1) {
                          // if (item.tags) {
                            console.log('第一层子元素展示');
                            var tags = item.tags;
                            $.each(tags, function(indexs,items) {
                              html += '<div class="panel-body tree-msg" style=";margin-left: 15px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.tag_id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.tag_name + '</label></a></div>';
                            })
                          // }
                        }else{

                        }

                        html += '</div>';


                      });

                      // console.log('新添加组:' + html)
                      $(html).insertAfter($(arr[0].id));
                      icheckInitialize();

                      break;
                    case 'tree-second':
                      console.log('这是第二级');



                      var html = '';
                      var type = 'tree';
                      var a = '';
                      $.each(result.data, function(indexnum, item) {


                         groups[item.id] = {
                          id: item.id,
                          level: 2,
                          higher_level:input_data.groupid 
                        }

                        var index = arr[0].brother + 1 + indexnum;

                        html += '<div class="second panel panel-default ' + type + '-' + item.id + '" ><div class="panel-heading fang" style="margin-left: 15px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                        // if (a === '') {
                        // html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                        // } else {
                        html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                        // }
                        html += '<input name="tree-ckss" data-step="tree-second" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss" data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.group_name + ' <span data-step="tree-second" data-groupid="'+ item.id + '" data-id="' + type + '-' + item.id + '"   class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
                        html += '<div class="second-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false" style="height: 0px;">';

                        if (Number(item.hide_tag) === 0) {
                          // if (item.tags) {
                            console.log('第二层子元素展示');
                            var tags = item.tags;
                            $.each(tags, function(indexs, items) {
                              html += '<div class="panel-body tree-msg" style="padding-left:36px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.tag_id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.tag_name + '</label></a></div>';
                            })
                          // }
                        }
                        html += '</div>';

                      });
                      // console.log('新添加组:' + html)
                      $(html).insertAfter($(arr[0].id));
                      icheckInitialize();



                      break;
                    case 'tree-third':
                      console.log('这是第三级,只能添加同级菜单不能添加子菜单');

                      var html = '';
                      var type = 'tree';
                      var a = '';
                      $.each(result.data, function(indexnum, item) {

                         groups[item.id] = {
                          id: item.id,
                          level: 3,
                          higher_level:input_data.groupid 
                        }

                        var index = arr[0].brother + 1 + indexnum;

                        html += '<div class="third panel panel-default ' + type + '-' + item.id + '" style="padding-left:15px;"><div class="panel-heading fang" style="padding-left:45px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                        // if (a === '') {
                        // html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                        // } else {
                        html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                        // }
                        html += '<input name="tree-ckss" data-step="tree-third" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss" data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.group_name + ' <span data-step="tree-third" data-groupid="'+ item.id + '" data-id="' + type + '-' + item.id + '"   class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
                        html += '<div class="thrid-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false" style="height: 0px;padding-left:45px;">';

                        if (Number(item.hide_tag) === 0) {
                          // if (item.tags) {
                          console.log('第三层子元素展示');
                          var tags = item.tag_id_tree;
                          $.each(tags, function(indexs, items) {
                            html += '<div class="panel-body tree-msg" style="padding-left:20px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.tag_id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.tag_name + '</label></a></div>';
                          })
                        // }
                        } 
                        html += '</div>';


                        // console.log('新添加组:' + html)

                      });
                      $(html).insertAfter($(arr[0].id));
                      icheckInitialize();
                      break;
                  }
                }else{
                  layer.msg(result.error_message);
                  returnLogIn(result.error_message);
                }
              },
              error: function(result) {
                layer.msg(result.error_message);
              }
            });
          }





          }else{
            layer.msg('未选择任何数据');
          }

        },
        btn2: function(index) {
          layer.close(index);
        }
      })



    }


  } else {
    layer.msg('无任何组,请点击添加子菜单添加')
  }


});

//添加子菜单
$('#add-sonlevemenu-btn').on('click', function() {
  if ($('.treeclassification-main-body').children().length) {

    if ($('input[name="tree-ckss"]:checked').hasClass('fu')) {
      console.log('查看:' + $('input[name="tree-ckss"]:checked').parent().parent().attr('href'))
      var inpu = $('input[name="tree-ckss"]:checked');
      var input_data = {
        id: inpu.parent().parent().attr('href'),
        type: inpu.data('step'),
        groupid:inpu.data('id')
      };
      console.log('数据:' + JSON.stringify(input_data, null, 2))
      if (inpu.data('step') === 'tree-third') {
        layer.msg('三级菜单无子菜单');
      }else{
        
        layer.open({
        title: ['选择添加组', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:20px'],
        type: 1,
        skin: 'layui-primary', //加上边框
        area: ['700px', '625px'], //宽高
        content: $("#classification-groups"), //捕获的元素,
        shift: 2,
        move: false,
        btn: ['确定', '放弃'],
        success: function() {
          $('.alert-body').html('');
          $('#content-search-input').val('');
        },
        yes: function(layerindex) {
          var arrs = [];
          $('input[name="alert-ckss"]:checked').each(function(index, element) {
            var dic = {
              id: Number($(element).attr('id'))
            }
            arrs.push(dic);
          });

          console.log('查看上传的数据:'+JSON.stringify(arrs,null,2));
          var alertdic = checkGroups();

           var have = false;

            if (Number(arrs.length) !== 0) {
              for (var key in arrs) {
                if (alertdic[arrs[key].id]) {
                  have = true;
                  console.log('存在')
                  break;
                }
              }

              
          if (have) {
            layer.msg('不能选择已添加的群组');
          } else {

          var urls = apiurl + "r=api/entity/tree/tags";
          $.ajax({
            url: urls,
            type: 'post',
            dataType: 'json',
            data: {
              data: JSON.stringify({tag_groups:arrs})
            },
            beforeSend: function() {
              $(".loading").show();
            },
            success: function(result) {
              if (result.success) {
                console.log('查看请求回来的组数据:'+JSON.stringify(result,null,2))
                layer.close(layerindex);
                switch (inpu.data('step')) {
                  case 'tree-first':
                    input_data.brother = Number($('#tree ' + input_data.id + ' div.second').length);

                    if (input_data.brother === 0) {
                      input_data.lastson_id = input_data.id;
                    } else {
                      input_data.lastson_id = $($('#tree ' + input_data.id + ' div.second')[input_data.brother - 1]).attr('class').split(' ').pop();
                    }



                    console.log('查看:' + JSON.stringify(input_data, null, 2))
                    var type = 'tree';
                    var html = '';
                    var a ='';
                    var index_num = input_data.brother + 1;
                    $.each(result.data, function(index, item) {                       
                        groups[item.id] = {
                          id: item.id,
                          level: 2,
                          higher_level:input_data.groupid 
                        }

                      index_num = input_data.brother + index;
                      html += '<div class="second panel panel-default ' + type + '-' + item.id + '" ><div class="panel-heading fang" style="margin-left: 15px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                      html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                      html += '<input name="tree-ckss" data-step="tree-second" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index_num + '"  class="skin-square-green fu ' + type + '-ckss" data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.group_name + ' <span data-groupid="' + item.id + '" data-step="tree-second" data-id="' + type + '-' + item.id + '"   class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
                      html += '<div class="second-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false">';

                      if (Number(item.hide_tag) === 0) {
                        console.log("==========================")
                        if (item.tags) {
                          console.log('第二层子元素展示');
                          var tags = item.tags;
                          $.each(tags, function(indexs, items) {
                            html += '<div class="panel-body tree-msg" style="padding-left:53px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.tag_id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.tag_id + '-' + index_num + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.tag_name + '</label></a></div>';
                          })
                        }
                      }
                      html += '</div>';
                    });
                    console.log('新添加组:' + html)

                    if (input_data.brother === 0) {
                      $(input_data.lastson_id).prepend(html);
                    } else {
                      $('#' + input_data.lastson_id).after(html);
                    }

                    icheckInitialize();

                    break;
                  case 'tree-second':
                    input_data.brother = Number($('#tree ' + input_data.id + ' div.third').length);

                    if (input_data.brother === 0) {
                      input_data.lastson_id = input_data.id;
                    } else {
                      input_data.lastson_id = $($('#tree ' + input_data.id + ' div.third')[input_data.brother - 1]).attr('class').split(' ').pop();

                    }
                    console.log('查看:' + JSON.stringify(input_data, null, 2));
                    var type = 'tree';
                    var html = '';
                    var index_num = input_data.brother + 1
                    $.each(result.data, function(index, item) {

                      groups[item.id] = {
                          id: item.id,
                          level: 3,
                          higher_level:input_data.groupid 
                        }

                      index_num = input_data.brother + index;
                      html += '<div class="third panel panel-default ' + type + '-' + item.id + '" style="padding-left:30px;"><div class="panel-heading fang" style="padding-left:30px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                      // if (a === '') {
                      // html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                      // } else {
                      html += '<a  href="#' + type + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                      // }
                      html += '<input name="tree-ckss"  data-step="tree-third" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index_num + '"  class="skin-square-green fu ' + type + '-ckss" data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.group_name + ' <span data-groupid="' + item.id + '" data-step="tree-third" data-id="' + type + '-' + item.id + '"   class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
                      html += '<div class="thrid-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false" style="height: 0px;padding-left:45px;">';

                      if (Number(item.hide_tag)) {} else if (item.tags) {
                        console.log('第三层子元素展示');
                        var tags = item.tags;
                        $.each(tags, function(indexs, items) {
                          html += '<div class="panel-body tree-msg" style="padding-left:40px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.tag_id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.tag_id + '-' + index_num + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.tag_name + '</label></a></div>';
                        })
                      }
                      html += '</div>';
                    });
                    if (input_data.brother === 0) {
                      $(input_data.lastson_id).prepend(html);
                    } else {
                      $('#' + input_data.lastson_id).after(html);
                    }

                    icheckInitialize();
                    break;
                  // case 'tree-third':
                  //   layer.msg('三级菜单无子菜单');
                  //   break;
                }

              }else{
                layer.msg(result.error_message);
                returnLogIn(result.error_message);
              }
            },
            error: function(data) {
              layer.msg(data.error_message);
            }
          });
         }


            }else{
              layer.msg('未选择任何群组')
            }
          


        },
        btn2: function(index) {
          layer.close(index);
        }

      })
      }
      



    } else {
      layer.msg('请选择一个组');
    }
  } else {
    // layer.msg('添加一级菜单');

    layer.open({
      title: ['选择添加组', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:20px'],
      type: 1,
      skin: 'layui-primary', //加上边框
      area: ['700px', '625px'], //宽高
      content: $("#classification-groups"), //捕获的元素,
      shift: 2,
      move: false,
      btn: ['确定', '放弃'],
      success: function() {

      },
      yes: function(index) {
        var arr = [];
        $('input[name="alert-ckss"]:checked').each(function(index, element) {
          var dic = {
            id: Number($(element).attr('id'))
          }
          arr.push(dic);
        });
        console.log('上传的数据:'+JSON.stringify(arr,null,2));
        var urls = apiurl + "r=api/entity/tree/tags";
        $.ajax({
          url: urls,
          type: 'post',
          dataType: 'json',
          data: {
              data: JSON.stringify({tag_groups:arr})
            },
          beforeSend: function() {
            $(".loading").show();
          },
          success: function(result) {
            if (result.success) {
              layer.close(index);

              var html = '';
              var type = 'tree';
              var a ='';
              $.each(result.data, function(index, item) {

                groups[item.id] = {
                  id: item.id,
                  level: 1,
                  higher_level: 0
                }

                html += '<div class="first panel panel-default ' + 'tree' + '-' + item.id + '"><div class="panel-heading fang" style="padding-left:0;padding-right:0px;" ><h4 class="panel-title">';
                html += '<a  href="#' + 'tree' + '-' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="one-step accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                html += '<input name="tree-ckss" data-parid="' + 'tree' + '-' + item.id + '" data-step="' + 'tree' + '-first" tabindex="5" type="radio" id="' + type + '-' + item.id + '-' + index + '"  class="skin-square-green fu ' + type + '-ckss"  data-id="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.group_name + '<span data-groupid="0" data-step="tree-first" data-id="' + type + '-' + item.id + '"    class="classification-delete" style="float:right">删除</span></label></a></h4></div></div>';
                html += '<div class="first-body panel-collapse collapse " id="' + type + '-' + item.id + '" aria-expanded="false" style="height: 0px;">';

                if (Number(item.hide_tag) === 0) {
                  if (item.tags) {
                    console.log('第一层子元素展示');
                    var tags = item.tags;
                    $.each(tags, function(indexs, items) {
                      html += '<div class="panel-body tree-msg" style=";margin-left: 15px;padding-top:5px;padding-bottom:5px;"><a href="#' + type + '-' + items.tag_id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input name="tree-ckss" tabindex="5" oprate="' + items.oprate + '" type="radio" id="' + type + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green ' + type + '-ckss ' + type + '-ckss-son" type="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.tag_name + '</label></a></div>';
                    })
                  }
                }

                html += '</div>';

              })
              $('.treeclassification-main-body').append(html);
              icheckInitialize();

            }else{
              layer.msg(result.error_message);
              returnLogIn(result.error_message);
            }
          },
          error: function(result) {
            layer.msg(result.error_message);
          }
        });

        console.log('被选中的组' + JSON.stringify(arr, null, 2));
      },
      btn2: function(index) {
        layer.close(index);
      },
    })


  }



});

// 删除组
$('body').on('click', 'span.classification-delete', function(e) {
  console.log('删除:' + $(this).data('groupid'));
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }

  var $this = $(this);
  var str = '该组带有子菜单,确认要删除吗?';
  var str1 = '确认要删除吗?';
   switch ($(this).data('step')) {
    case 'tree-first':
    if ($('#'+ $(this).data('id')).find('div.second').length > 0) {
      deleteGroupLayer($this,str);
    }else{
       deleteGroupLayer($this,str1);
    }     
      break;
    case 'tree-second':
    if ($('#' + $(this).data('id')).find('div.third').length > 0) {
      deleteGroupLayer($this,str);
    }else{
      deleteGroupLayer($this,str1);
    }
      break;
    case 'tree-third':
      deleteGroupLayer($this,str1);
      break;
  }


  
});
/**
 * [删除组]
 * @param  {[type]} obj [被选对象]
 * @return {[type]}     [description]
 */
function deleteGroups(obj){
  console.log('查看对比数据:'+JSON.stringify(groups,null,2))
  console.log('ID:'+obj.data('groupid'))
  switch (obj.data('step')) {
    case 'tree-first':
      groups[obj.data('groupid')].level = 0;
      groups[obj.data('groupid')].higher_level = 0;
      $('#' + obj.data('id')).find('span.classification-delete').each(function(index,element){        
        groups[$(element).data('groupid')].level = 0;
        groups[$(element).data('groupid')].higher_level = 0;
      });
      break;
    case 'tree-second':
      groups[obj.data('groupid')].level = 0;
      groups[obj.data('groupid')].higher_level = 0;
      $('#' + obj.data('id')).find('span.classification-delete').each(function(index,element){        
        groups[$(element).data('groupid')].level = 0;
        groups[$(element).data('groupid')].higher_level = 0;
      });
      break;
    case 'tree-third':
      groups[obj.data('groupid')].level = 0;
      groups[obj.data('groupid')].higher_level = 0;
      break;
  }

  console.log('查看被删除的数组:'+JSON.stringify(groups,null,2));

  $('.' + obj.data('id')).remove();
  $('#' + obj.data('id')).remove();
}
/**
 * [删除确认弹窗]
 * @param  {[type]} obj    [被点对象]
 * @param  {[type]} string [提示语]
 * @return {[type]}        [description]
 */
function deleteGroupLayer(obj,string){
   layer.open({
        title: ['确认删除', 'font-size:18px;color:#333;background:#fff;height:50px;font-weight:bold;line-height:50px;padding-left:20px'],
        type: 1,
        skin: 'layui-primary', //加上边框
        area: ['600px', '200px'], //宽高
        content: $("#classification-delete-group"), //捕获的元素,
        shift: 2,
        move: false,
        btn: ['确定', '放弃'],
        success: function() {
          $('#classification-delete-group p').text(string);
        },
        yes: function(index) {
          deleteGroups(obj);
          layer.close(index);
        },
        btn2:function(index){
          layer.close(index);
        }
      });
}



//搜索
$('#content-search-input').on('change', function() {
  loadGroups($('#content-search-input').val());
});

$('#search-span').on('click', function() {
  loadGroups($('#content-search-input').val());
});
$('#clearImage').on('click', function() {
  $('#content-search-input').val('');
});


/**
 * [请求组列表]
 * @return {[type]} [description]
 */
function loadGroups(str) {
  var energyConsumptionurls = apiurl + "r=api/entity/tree/search";

  var data = {
    data: JSON.stringify({
      name: str
    })
  };
  $.ajax({
    url: energyConsumptionurls,
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
        console.log('查看请求到的数据:' + JSON.stringify(data, null, 2));
        var dataArray = data.data;
        if (dataArray.length !== 0) {
          $('.alert-body').html('');
          for (var i = 0; i < dataArray.length; i++) {
            var trs = '<tr><td>' + dataArray[i].name + '</td><td><input id="' + dataArray[i].id + '" type="checkbox" class="alert-ckss" name="alert-ckss" /></td></tr>'
            $('.alert-body').append(trs);
          }

          icheckInitializeAlert();
        }
      } else {
        layer.msg(data.error_message);
        returnLogIn(data.error_message);
      }
    },
    error: function(data) {
      $(".loading").hide();
      layer.msg(data.error_message)
    }
  })
}

/**
 * [筛选已存在的组]
 * @return {[type]} [description]
 */
function checkGroups() {
  var dic = {};
  $('input[data-step="tree-first"]').each(function(index, element) {

    console.log('这是第'+index+'个一级菜单')
    dic[$(element).data('id')] ={
      id: $(element).data('id'),
      level: 1,
      higher_level: 0
    }
    
    $('#' + $(element).data('parid') + ' input[data-step="tree-second"]').each(function(indexs, elements) {
      console.log('这是第'+index+'个二级菜单')
      dic[$(elements).data('id')] = {
         id: $(elements).data('id'),
         level: 2,
         higher_level: $(element).data('id')
      }
       
      $('#' + $(elements).data('parid') + ' input[data-step="tree-third"]').each(function(inde, elemen) {

        dic[$(elemen).data('id')] = {
          id: $(elemen).data('id'),
          level: 3,
          higher_level: $(elements).data('id')
        }

      });
    });
  });
  console.log('查看已存在的数据:' + JSON.stringify(dic, null, 2));
  return dic;

}