var setComponentOptions = {
    // 基本属性
    basicSet: function(component) {

        var vueRoutine = canvasVue.routine;
        var vueDatas = canvasVue.datas;
        var vueStyle = canvasVue.styles;
        var data = component.getUserData();
        // 组件名称   name(用户输入)
        vueRoutine.name = data.name;

        //组件描述   Description
        vueRoutine.description = data.Description;

        //隐藏组件 Visible  
        console.log('隐藏组件:' + data.Visible)
        if (data.Visible) {
            vueRoutine.visible = true;
        } else {
            vueRoutine.visible = false;
        }

        //是否不可用 Enable  
        if (data.Enable) {
            vueRoutine.enable = true;
        } else {
            vueRoutine.enable = false;
        }

        //访问等级  AccessLevel 
        vueRoutine.accessLevel = data.AccessLevel;


        //是否显示hover  ShowHint 

        if (data.ShowHint) {
            vueRoutine.hover = true;
            vueRoutine.hoverdata.text = data.Hint;
            vueRoutine.hoverdata.disabled = false;
        } else {
            vueRoutine.hover = false;
            vueRoutine.hoverdata.disabled = true;

        }

        //Tag内容  tag 
        vueDatas.tag.tagname = data.Tag.tag_name;

        //是否只读  Readonly 

        if (data.Readonly) {
            vueDatas.readonly = true;
        } else {
            vueDatas.readonly = false;
        }
        /************************style--begin************************************ */

        //边框宽度  borderWidth
        vueStyle.borderWidth = component.getStroke();

        //边框样式 borderStyle
        var border_style = component.getDashArray();
        if (border_style === null) {
            vueStyle.borderStyle = '默认';
        } else {
            vueStyle.borderStyle = border_style;
        }


        // 边框颜色

        /************************style--end************************************** */






    },
    // 宽高位置旋转角度
    sizeAndOffset: function(component) {
        var routine = canvasVue.routine;
        // var data = component.getUserData();
        routine.width = component.getWidth();
        routine.height = component.getHeight();
        routine.offx = component.getAbsoluteX().toFixed(0);
        routine.offy = component.getAbsoluteY();
        routine.rotationAngle = component.getRotationAngle();

    },
    // 基本图形
    rectangleSet: function() {

    },
    // 直线
    lineSet: function() {

    },
    // label
    labelSet: function() {

    },
    // text
    textSet: function() {

    },
    // 自定义图像
    imageSet: function() {

    },
    // 建筑设备、安全防范
    safeSet: function() {

    },
    // [编辑控件前 检查前一个控件 TagID 是否绑定上]
    checkComponentTagidIsNull: function() {

    },
    //  [检查 本控件 TagID 是否绑定正确]
    checkThisComponentIsTrue: function() {

    }

}



/**
 * [在画布中捕获控件 用于处理选中的组件]
 * @return {[控件]} 
 */
function getNode() {
    if ($("#spanid").text() !== "") {
        var node = imageCanvas.getFigure($("#spanid").text());
        var nodeLine = imageCanvas.getLine($("#spanid").text());
        if (node !== null) {
            return node;
        } else if (nodeLine !== null) {
            return nodeLine;
        }

    }

}

/** 
 * @description [修改控件属性样式]  
 */











































































/****************颜色代码转换**rgb-->十六进制********/
function zero_fill_hex(num, digits) {
    var s = num.toString(16);
    while (s.length < digits)
        s = "0" + s;
    return s;
}

function rgb2hex(rgb) {
    if (rgb.charAt(0) == '#')
        return rgb;
    var ds = rgb.split(/\D+/);
    var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
    return "#" + zero_fill_hex(decimal, 6);
}
/****************颜色代码转换************************/




//控件悬浮提示框
function showTooltips(obj) {
    var tooltips = $canvas.comTooltips;
    if (obj.userData.Hint !== '') {
        tooltips.show().html(obj.userData.Hint);
        var tPosX = obj.getAbsoluteX() + obj.getWidth() / 2 - tooltips.width() / 2 - 10
        var tPosY = obj.getAbsoluteY() + obj.getHeight() + 10;
        tooltips.css({
            'top': tPosY + 'px',
            'left': tPosX + 'px'
        });
    }
}
// 控件缩放  备用
function componentResize(com) {
    $canvas.comWidth.val(com.getWidth());
    $canvas.comHeight.val(com.getHeight());
}
// 控件移动
function componentMove(com) {
    $canvas.comOffsetX.val(com.getAbsoluteX().toFixed(0));
    $canvas.comOffsetY.val(com.getAbsoluteY().toFixed(0));
    $canvas.comTooltips.hide();
}

$('#canvas').on('click', function() {
    $canvas.menuFirAttr.show();
    $canvas.menuSecAttr.hide();
});
$('.have-btn').on('click', 'button', function() {
    $canvas.menuFirAttr.hide();
    $canvas.menuSecAttr.show();
});



/**
 * [点击控件时-重置属性菜单]
 * @return {[type]} [description]
 */
function resetAttributeMenu() {
    $canvas.menuFirAttr.show();
    $canvas.menuSecAttr.hide();
    $canvas.menuDivAlpha.hide();
    $canvas.menuDivUnit.hide();
    $canvas.menuDivFontSize.hide();
    $canvas.menuDivTextAlpha.hide();
    $('#a-tocom').click();
    $('p.p-show').each(function(index, element) {
        if ($(element).hasClass('collapsed')) {
            $(element).click();
        }
    });
    $('p.p-hide').each(function(index, element) {
        if ($(element).hasClass('collapsed')) {} else {
            $(element).click();
        }
    });
    $canvas.menuDivBasicHide.show();
    $canvas.menuJustForLabel.show();
    $canvas.menuDivLineOnly.show();
    $canvas.menuDivFill.hide();
    $canvas.menuVlcUrl.hide();
    $canvas.menuDivLineCheck.hide();

    // 边框宽度
    $canvas.menuDivNormalWidth.show();
    $canvas.menuDIvLineConduit.hide();
    $canvas.menuDivLabel.show();

    setTimeout(function() {
        $(".component-attr").mCustomScrollbar('scrollTo', 'top');
    }, 300);

}



/**
 * [编辑控件前 检查前一个控件 TagID 是否绑定上]
 * @return {[type]} [description]
 */
function checkComponentTagidIsNull() {
    if (getNode()) {
        var node = getNode();
        switch (node.userData.Tag.bingding_status) {
            case 2:
                console.log("上个控件的ID为:======" + $("#spanid").text())
                layer.msg("上个控件Tag值绑定无效,请重新绑定!")
                break;
        }
    }
}

/**
 * [检查 本控件 TagID 是否绑定正确]
 */
function checkThisComponentIsTrue(com) {
    var tagWrong = $("#tagWrongImg");
    switch (com.userData.Tag.bingding_status) {
        case 0:
            tagWrong.hide();
            break;
        case 1:
            tagWrong.show();
            tagWrong.attr("src", "images/img/rights.png");
            break;
        case 2:
            tagWrong.show();
            tagWrong.attr("src", "images/img/worry.png");
            break;
    }
}

/**
 * [ 获得style 边框颜色 ]
 * @param  {[type]} string [属性类型名]
 * @return {[type]}        [description]
 */
function getColor(string) {
    if (getNode()) {
        var node = getNode();
        var col;

        switch (string) {
            case "sty_border_color":
                col = node.getColor().hash().substring(1);
                break;
            case "sty_text_color":
                col = node.getFontColor().hash().substring(1);
                break;
            case "sty_fill_color":
                col = node.getBackgroundColor().hash().substring(1);
                break;
            case "true_border_color":
                col = node.getUserData().onTrue.LineColor.substring(1);
                break;
            case "true_text_color":
                col = node.getUserData().onTrue.TextColor.substring(1);
                break;
            case "true_fill_color":
                col = node.getUserData().onTrue.FillColor.substring(1);
                break;
            case "false_border_color":
                col = node.getUserData().onFalse.LineColor.substring(1);
                break;
            case "false_text_color":
                col = node.getUserData().onFalse.TextColor.substring(1);
                break;
            case "false_fill_color":
                col = node.getUserData().onFalse.FillColor.substring(1);
                break;
            case "alarm_border_color":
                col = node.getUserData().onAlarm.LineColor.substring(1);
                break;
            case "alarm_text_color":
                col = node.getUserData().onAlarm.TextColor.substring(1);
                break;
            case "alarm_fill_color":
                col = node.getUserData().onAlarm.FillColor.substring(1);
                break;
            case "dis_border_color":
                col = node.getUserData().onDisconnected.LineColor.substring(1);
                break;
            case "dis_text_color":
                col = node.getUserData().onDisconnected.TextColor.substring(1);
                break;
            case "dis_fill_color":
                col = node.getUserData().onDisconnected.FillColor.substring(1);
                break;

        }
        return col;

    }
}



window.$canvas = {
        loadings: $('.loading'), //加载等待
        // 菜单
        menuFirAttr: $('.first-attr'),
        menuSecAttr: $('.second-attr'),
        menuDivAlpha: $('.div-alpha'),
        menuDivUnit: $('.div-unit'),
        menuDivTitle: $('.div-title'),
        menuDivImage: $('.div-image'),
        menuDivFontSize: $('.div-font-size'),
        menuDivTextAlpha: $('.div-text-alpha'),
        menuDivTextVal: $('.div-text-val'),
        menuDivTextColor: $('.div-text-color'),
        menuDivFontSize: $('.div-font-size'),
        menuDivBasicHide: $('.div-basic-hide'),
        menuJustForLabel: $('.just-for-label'),
        menuDivLineOnly: $('.div-line-only'),
        menuDivFill: $('.div-fill'),
        menuVlcUrl: $('.div-vlcurl'), //摄像地址div
        menuDivLineCheck: $('.div-line-check'),
        menuDivNormalWidth: $('.div-normal-width'),
        menuDIvLineConduit: $('.div-line-conduit'),
        menuDivLabel: $('.div-label'),

        comTooltips: $('#tooltips'), //控件提示框
        compID: $("#spanid"), //ID
        compName: $('#comp-name'), //名称
        compDesc: $('#comp-desc'), //描述
        comWidth: $('#comp-width'), //宽
        comHeight: $('#comp-height'), //高
        comOffsetX: $('#comp-offsetx'), //位置 x
        comOffsetY: $('#comp-offsety'), //位置 y
        comRotation: $('#comp-rotation'), //旋转角度
        comCaption: $('#comp-title'), //显示标题
        comCaptionVal: $('#comp-title-val'), //标题内容
        comHides: $('#comp-hides'), //隐藏控件
        comEnable: $('#comp-unabel'), //是否可用
        comLevel: $('#comp-level'), //访问等级
        comHover: $('#comp-hover'), //hover
        comHoverVal: $('#comp-hover-val'), //hover内容
        comTagadd: $('#comp-tagaddress'), //tag
        comReadonly: $('#comp-readonly'), //只读
        comVlcUrlVal: $('#comp-vlc-val'), //摄像地址

        styleWidth: $('#style-width'), //style 宽度
        styleBorderColor: $('.style-border-color ul li'), // style 边框颜色
        styleFillColor: $('.style-fill-color ul li'), // style 填充颜色
        styleStyle: $('#style-style'), //style style
        styleAlpha: $('#comp-alpha-style'), //style 透明度
        styleFlash: $('#style-flashing'), // style 闪烁
        stylePicture: $('#style-image'), //style 图片地址
        styleText: $('#style-text'), //style 文本内容
        styleFontSize: $('#text-font-size'), //style 字体大小
        styleFontColor: $('.style-text-color ul li'), //style 字体颜色
        styleTextUnit: $('#comp-unit-style'), //style 文本单位
        styleBgAlpha: $('#text-alpha-style'), //style text背景透明

        onTrueWidth: $('#ontrue-width'), // ontrue 宽度
        onTrueBorderColor: $('.ontrue-border-color ul li'), //ontrue 边框颜色
        onTrueFillColor: $('.ontrue-fill-color ul li'), // ontrue 填充颜色
        onTrueStyle: $('#ontrue-style'), //ontrue style
        onTrueAlpha: $('#comp-alpha-ontrue'), //ontrue 透明度
        onTrueFlash: $('#ontrue-flashing'), // ontrue 闪烁
        onTruePicture: $('#ontrue-image'), //ontrue 图片地址
        onTrueText: $('#ontrue-text'), //onTrue 文本内容
        onTrueFontColor: $('.ontrue-text-color ul li'), //onTrue 字体颜色
        onTrueTextUnit: $('#comp-unit-ontrue'), //ontrue 文本单位
        onTrueBgAlpha: $('#text-alpha-ontrue'), //ontrue text背景透明


        onFalseWidth: $('#onfalse-width'), // onfalse 宽度
        onFalseBorderColor: $('.onfalse-border-color ul li'), // onfalse 边框颜色
        onFalseFillColor: $('.onfalse-fill-color ul li'), //onfalse 填充颜色
        onFalseStyle: $('#onfalse-style'), //onfalse style
        onFalseAlpha: $('#comp-alpha-onfalse'), //onfalse 透明度
        onFalseFlash: $('#onfalse-flashing'), //onfalse 闪烁
        onFalsePicture: $('#onfalse-image'), //onfalse 图片地址
        onFalseText: $('#onfalse-text'), //onfalse 文本内容
        onFalseFontColor: $('.onfalse-text-color ul li'), //onfalse  字体颜色
        onFalseTextUnit: $('#comp-unit-onfalse'), //onfalse 文本单位
        onFalseBgAlpha: $('#text-alpha-onfalse'), //onfalse text背景透明

        onAlarmWidth: $('#onalarm-width'), //onalarm 宽度
        onAlarmBorderColor: $('.onalarm-border-color ul li'), //onalarm 边框颜色
        onAlarmFillColor: $('.onalarm-fill-color ul li'), //onalarm 填充颜色
        onAlarmStyle: $('#onalarm-style'), //onalarm style
        onAlarmAlpha: $('#comp-alpha-onalarm'), //onalarm 透明度
        onAlarmFlash: $('#onalarm-flashing'), //onalarm 闪烁
        onAlarmPicture: $('#onalarm-image'), //onalarm 图片地址
        onAlarmText: $('#onalarm-text'), //onalarm 文本内容
        onAlarmFontColor: $('.onalarm-text-color ul li'), //onalarm 字体颜色
        onAlarmTextUnit: $('#comp-unit-onalarm'), //onalarm 文本单位
        onAlarmBgAlpha: $('#text-alpha-onalarm'), //onalarm text背景透明

        onDiscWidth: $('#onDisc-width'), //ondisc 宽度
        onDiscBorderColor: $('.onDisc-border-color ul li'), //ondisc 边框颜色
        onDiscFillColor: $('.onDisc-fill-color ul li'), //ondisc 填充颜色
        onDiscStyle: $('#onDisc-style'), //ondisc style
        onDiscAlpha: $('#comp-alpha-ondisc'), //ondisc 透明度
        onDiscFlash: $('#onDisc-flashing'), //ondisc 闪烁
        onDiscPicture: $('#onDisc-image'), //ondisc 图片地址
        onDiscText: $('#onDisc-text'), //ondisc 文本内容
        onDiscFontColor: $('.onDisc-text-color ul li'), //ondisc 字体颜色
        onDiscTextUnit: $('#comp-unit-ondis'), //ondisc 文本单位
        onDiscBgAlpha: $('#text-alpha-ondisc'), //ondisc text背景透明
    }
    // 补充 组件大小和位置 旋转角度
function componentSizeAndoffset(com) {
    $canvas.comWidth.val(com.getWidth());
    $canvas.comHeight.val(com.getHeight());
    $canvas.comOffsetX.val(com.getAbsoluteX().toFixed(0));
    $canvas.comOffsetY.val(com.getAbsoluteY());
    $canvas.comRotation.val(com.getRotationAngle());
}
// 是否显示标题 ShowCaption 
function componentCaption(com) {

    switch (com.getUserData().ShowCaption) {
        case true:
            $canvas.comCaption.iCheck('check');
            $canvas.comCaptionVal.removeAttr("readonly").val(com.getUserData().Caption);
            break;
        case false:
            $canvas.comCaption.iCheck('uncheck');
            $canvas.comCaptionVal.attr("readonly", "readonly").val(com.getUserData().Caption);
            break;
        default:
            break;
    }

}


/**
 * [组件点击显示数据]
 * @return {[type]} [description]
 */
function componentInitData(com) {
    checkComponentTagidIsNull(); //判断前一个控件是否正确绑定Tag

    checkThisComponentIsTrue(com); //检查本控件的Tag是否正确(如果已经绑定)
    // =================================基本-开始======================
    // 暂存该控件的id,用于刷新控件的属性
    $canvas.compID.html(com.id);

    // 组件名称   name(用户输入)
    $canvas.compName.val(com.getUserData().name);

    //组件描述   Description
    $canvas.compDesc.val(com.getUserData().Description);


    //隐藏组件 Visible  
    console.log('隐藏组件:' + com.getUserData().Visible)
    switch (com.getUserData().Visible) {
        case true:
            $canvas.comHides.iCheck('uncheck');
            break;
        case false:
            $canvas.comHides.iCheck('check');
            break;
        default:
            break;
    }

    //是否不可用 Enable  
    switch (com.getUserData().Enable) {
        case true:
            $canvas.comEnable.iCheck('check');
            break;
        case false:
            $canvas.comEnable.iCheck('uncheck');
        default:
            break;
    }

    //访问等级  AccessLevel 
    $canvas.comLevel.text(com.getUserData().AccessLevel);

    //是否显示hover  ShowHint 
    switch (com.getUserData().ShowHint) {
        case true:
            $canvas.comHover.iCheck('check');
            //hover内容  Hint 
            $canvas.comHoverVal.removeAttr("readonly").val(com.getUserData().Hint);
            break;
        case false:
            $canvas.comHover.iCheck('uncheck');
            //hover内容  Hint 
            $canvas.comHoverVal.attr("readonly", "readonly").val(com.getUserData().Hint);
            break;
    }


    //Tag内容  tag 
    $canvas.comTagadd.val(com.getUserData().Tag.tag_name);

    //是否只读  Readonly 
    switch (com.getUserData().Readonly) {
        case true:
            $canvas.comReadonly.iCheck('check');
            break;
        case false:
            $canvas.comReadonly.iCheck('uncheck');
            break;
    }

    // =================================基本-结束======================

    // =============================style-开始==============================
    //边框宽度  LineWidth
    console.log('查看组件边框宽度：' + com.getStroke())
    $canvas.styleWidth.text(com.getStroke());

    //边框颜色  LineColor
    $canvas.styleBorderColor.removeClass("colorWhiteBorder colorBlackBorder");
    $canvas.styleBorderColor.each(function(index, element) {
        if (com.getColor().hash() == rgb2hex($(element).css("background-color")).toUpperCase()) {
            if (rgb2hex($(element).css("background-color")) == "#ffffff") {
                $(element).addClass("colorBlackBorder");
            } else {
                $(element).addClass("colorWhiteBorder");
            }
        }
    });

    //边框样式  LineStyle
    if (com.getDashArray() === null) {
        $canvas.styleStyle.text("默认")
    } else {
        $canvas.styleStyle.text(com.getDashArray())
    }

    //style 闪烁  blinking  
    switch (com.getUserData().Blinking) {
        case true:
            $canvas.styleFlash.iCheck('check');
            break;
        case false:
            $canvas.styleFlash.iCheck('uncheck');
    }

    // =============================style-结束==============================

    // =============================onTrue-开始=============================
    //边框宽度  LineWidth
    $canvas.onTrueWidth.text(com.getUserData().onTrue.LineWidth);

    //边框颜色  LineColor
    $canvas.onTrueBorderColor.removeClass("colorWhiteBorder colorBlackBorder");
    $canvas.onTrueBorderColor.each(function(index, element) {
        if (com.getUserData().onTrue.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
            if (rgb2hex($(element).css("background-color")) == "#ffffff") {
                $(element).addClass("colorBlackBorder");
            } else {
                $(element).addClass("colorWhiteBorder");
            }
        }
    });


    //边框样式  LineStyle
    if (com.getUserData().onTrue.LineStyle === null) {
        $canvas.onTrueStyle.text("默认")
    } else {
        $canvas.onTrueStyle.text(com.getUserData().onTrue.LineStyle)
    }

    //style 闪烁  blinking  	
    switch (com.getUserData().onTrue.Blinking) {
        case true:
            $canvas.onTrueFlash.iCheck('check');
            break;
        case false:
            $canvas.onTrueFlash.iCheck('uncheck');
    }
    // =============================onTrue-结束=============================
    // 
    // =============================onFalse-开始===================================
    //边框宽度  LineWidth
    $canvas.onFalseWidth.text(com.getUserData().onFalse.LineWidth);

    // 边框颜色  LineColor
    $canvas.onFalseBorderColor.removeClass("colorWhiteBorder colorBlackBorder");
    $canvas.onFalseBorderColor.each(function(index, element) {
        if (com.getUserData().onFalse.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
            if (rgb2hex($(element).css("background-color")) == "#ffffff") {
                $(element).addClass("colorBlackBorder");
            } else {
                $(element).addClass("colorWhiteBorder");
            }
        }
    })

    // 边框样式  LineStyle
    if (com.getUserData().onFalse.LineStyle === null) {
        $canvas.onFalseStyle.text("默认")
    } else {
        $canvas.onFalseStyle.text(com.getUserData().onFalse.LineStyle)
    }

    // 闪烁  blinking 
    switch (com.getUserData().onFalse.Blinking) {
        case true:
            $canvas.onFalseFlash.iCheck('check');
            break;
        case false:
            $canvas.onFalseFlash.iCheck('uncheck');
    }

    // =============================onFalse-结束===================================
    // =============================onAlarm-开始===================================
    // 边框宽度  LineWidth
    $canvas.onAlarmWidth.text(com.getUserData().onAlarm.LineWidth);

    // 边框颜色  LineColor
    $canvas.onAlarmBorderColor.removeClass("colorWhiteBorder colorBlackBorder");
    $canvas.onAlarmBorderColor.each(function(index, element) {
        if (com.getUserData().onAlarm.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
            if (rgb2hex($(element).css("background-color")) == "#ffffff") {
                $(element).addClass("colorBlackBorder");
            } else {
                $(element).addClass("colorWhiteBorder");
            }
        }
    });

    // 边框样式  LineStyle	
    if (com.getUserData().onAlarm.LineStyle === null) {
        $canvas.onAlarmStyle.text("默认")
    } else {
        $canvas.onAlarmStyle.text(com.getUserData().onAlarm.LineStyle)
    }

    // 闪烁  blinking 
    switch (com.getUserData().onAlarm.Blinking) {
        case true:
            $canvas.onAlarmFlash.iCheck('check');
            break;
        case false:
            $canvas.onAlarmFlash.iCheck('uncheck');
    }

    // =============================onAlarm-结束===================================
    // 
    // =============================onDisconnected-开始===================================

    // 边框宽度  LineWidth
    $canvas.onDiscWidth.text(com.getUserData().onDisconnected.LineWidth);

    // 边框颜色  LineColor
    $canvas.onDiscBorderColor.removeClass("colorWhiteBorder colorBlackBorder");
    $canvas.onDiscBorderColor.each(function(index, element) {
        if (com.getUserData().onDisconnected.LineColor.toUpperCase() == rgb2hex($(element).css("background-color")).toUpperCase()) {
            if (rgb2hex($(element).css("background-color")) == "#ffffff") {
                $(element).addClass("colorBlackBorder");
            } else {
                $(element).addClass("colorWhiteBorder");
            }
        }
    });

    //边框样式  LineStyle 
    if (com.getUserData().onDisconnected.LineStyle === null) {
        $canvas.onDiscStyle.text("默认")
    } else {
        $canvas.onDiscStyle.text(com.getUserData().onDisconnected.LineStyle)
    }

    switch (com.getUserData().onDisconnected.Blinking) {
        case true:
            $canvas.onDiscFlash.iCheck('check');
            break;
        case false:
            $canvas.onDiscFlash.iCheck('uncheck');
    }
    // =============================onDisconnected-结束===================================


}