var setComponentOptions = {
    // 图片地址(自定义控件/safeComponent 图片地址)
    imageBaseUrl: 'images/icon/icon/',
    // public method
    basePublicSet: function (component) {
        var vueRoutine = canvasVue.routine;
        var vueDatas = canvasVue.datas;
        var data = component.getUserData();

        this.checkPreviousComponentTag(component);

        //该属性用于 判断当前闪烁需要的标志 
        component.userData.custom.editSatus = 'defaults';
        // 组件名称   name(用户输入)
        vueRoutine.name = data.routine.name;

        //组件描述   Description
        vueRoutine.description = data.routine.description;

        //隐藏组件 Visible
        console.log('隐藏组件:' + data.routine.visible)
        if (data.routine.visible) {
            vueRoutine.visible = true;
        } else {
            vueRoutine.visible = false;
        }

        //是否不可用 Enable 
        if (data.routine.enable) {
            vueRoutine.enable = true;
        } else {
            vueRoutine.enable = false;
        }

        //访问等级  AccessLevel 
        vueRoutine.accessLevel.level = data.routine.accessLevel;

        //是否显示hover  ShowHint
        if (data.routine.hint.flag) {
            vueRoutine.hover = true;
            vueRoutine.hoverdata.text = data.routine.hint.hintText;
            vueRoutine.hoverdata.disabled = false;
        } else {
            vueRoutine.hover = false;
            vueRoutine.hoverdata.disabled = true;

        }

        //Tag内容  tag 
        vueDatas.tag.tagname = data.tag.tag_name;

        //是否只读  Readonly 
        if (data.routine.readOnly) {
            vueDatas.readonly = true;
        } else {
            vueDatas.readonly = false;
        }

    },
    // 基本属性
    basicSet: function (component) {

        // var vueRoutine = canvasVue.routine;
        var vueDatas = canvasVue.datas;
        var vueDefaults = canvasVue.defaults;

        var vueOnTrue = canvasVue.ontrue;
        var vueOnFalse = canvasVue.onfalse;
        var vueOnAlarm = canvasVue.onalarm;
        var vueOnDisc = canvasVue.ondisc;

        var data = component.getUserData();

        /************************style--begin************************************ */

        //边框宽度  borderWidth
        vueDefaults.borderWidth = component.getStroke();
        console.log('查看边框宽度：'+component.getStroke())
        //边框样式 borderStyle
        // var s_border_style = component.getDashArray();
        // if (s_border_style === null) {
        //     vueDefaults.borderStyle = '默认';
        // } else {
        //     vueDefaults.borderStyle = s_border_style;
        // }

        // 边框颜色
        var s_border_color = component.getColor().hash();
        var s_flag = true;
        vueDefaults.borderColor.color = s_border_color;
        vueDefaults.borderColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === s_border_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (s_flag) {
            vueDefaults.borderColor.colorData.shift();
            vueDefaults.borderColor.colorData.push({
                color: s_border_color,
                colorstyle: 'background-color:' + s_border_color,
                active: true
            })
        }

        //style 闪烁  blinking
        if (data.defaults.blinking) {
            vueDefaults.flashing = true;
        } else {
            vueDefaults.flashing = false;
        }




        console.log('边框宽度:' + component.getStroke());
        console.log('边框颜色:' + component.getColor().hash());
        console.log('边框样式:' + component.getDashArray());
        // console.log('填充颜色:' + component.().hash());
        console.log('透明度:' + component.getAlpha());






        /************************style--end************************************** */
        /************************onTrue--begin************************************** */

        //边框宽度  borderWidth
        vueOnTrue.borderWidth = data.onTrue.lineWidth;

        //边框样式 borderStyle
        // var ot_border_style = data.onTrue.lineStyle;
        // if (ot_border_style === null) {
        //     vueOnTrue.borderStyle = '默认';
        // } else {
        //     vueOnTrue.borderStyle = ot_border_style;
        // }

        // 边框颜色
        var ot_border_color = data.onTrue.lineColor;
        var ot_flag = true;
        vueOnTrue.borderColor.color = ot_border_color;
        vueOnTrue.borderColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === ot_border_color) {
                ele.active = true;
                ot_flag = false;
            }
        });
        if (ot_flag) {
            vueOnTrue.borderColor.colorData.shift();
            vueOnTrue.borderColor.colorData.push({
                color: ot_border_color,
                colorstyle: 'background-color:' + ot_border_color,
                active: true
            })
        }

        //ontrue 闪烁  blinking
        if (data.onTrue.blinking) {
            vueOnTrue.flashing = true;
        } else {
            vueOnTrue.flashing = false;
        }


        /************************onTrue--end************************************** */

        /************************onFalse-- begin********************************** */
        //边框宽度  borderWidth
        vueOnFalse.borderWidth = data.onFalse.lineWidth;

        //边框样式 borderStyle
        // var of_border_style = data.onFalse.lineStyle;
        // if (of_border_style === null) {
        //     vueOnFalse.borderStyle = '默认';
        // } else {
        //     vueOnFalse.borderStyle = of_border_style;
        // }

        // 边框颜色
        var of_border_color = data.onFalse.lineColor;
        var of_flag = true;
        vueOnFalse.borderColor.color = of_border_color;
        vueOnFalse.borderColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === of_border_color) {
                ele.active = true;
                of_flag = false;
            }
        });
        if (of_flag) {
            vueOnFalse.borderColor.colorData.shift();
            vueOnFalse.borderColor.colorData.push({
                color: of_border_color,
                colorstyle: 'background-color:' + of_border_color,
                active: true
            })
        }

        //ontrue 闪烁  blinking
        if (data.onFalse.blinking) {
            vueOnFalse.flashing = true;
        } else {
            vueOnFalse.flashing = false;
        }

        /************************onFalse-- end************************************ */

        /************************onAlarm-- begin********************************** */
        //边框宽度  borderWidth
        vueOnAlarm.borderWidth = data.onAlarm.lineWidth;

        //边框样式 borderStyle
        // var oa_border_style = data.onAlarm.lineStyle;
        // if (oa_border_style === null) {
        //     vueOnAlarm.borderStyle = '默认';
        // } else {
        //     vueOnAlarm.borderStyle = oa_border_style;
        // }

        // 边框颜色
        var oa_border_color = data.onAlarm.lineColor;
        var oa_flag = true;
        vueOnAlarm.borderColor.color = oa_border_color;
        vueOnAlarm.borderColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === oa_border_color) {
                ele.active = true;
                oa_flag = false;
            }
        });
        if (oa_flag) {
            vueOnAlarm.borderColor.colorData.shift();
            vueOnAlarm.borderColor.colorData.push({
                color: oa_border_color,
                colorstyle: 'background-color:' + oa_border_color,
                active: true
            })
        }

        //ontrue 闪烁  blinking
        if (data.onAlarm.blinking) {
            vueOnAlarm.flashing = true;
        } else {
            vueOnAlarm.flashing = false;
        }

        /************************onAlarm-- end************************************ */

        /************************onDisc-- begin********************************** */

        //边框宽度  borderWidth
        vueOnDisc.borderWidth = data.onDisconnected.lineWidth;

        //边框样式 borderStyle
        // var od_border_style = data.onDisconnected.lineStyle;
        // if (od_border_style === null) {
        //     vueOnDisc.borderStyle = '默认';
        // } else {
        //     vueOnDisc.borderStyle = od_border_style;
        // }

        // 边框颜色
        var od_border_color = data.onDisconnected.lineColor;
        var od_flag = true;
        vueOnDisc.borderColor.color = od_border_color;
        vueOnDisc.borderColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === od_border_color) {
                ele.active = true;
                od_flag = false;
            }
        });
        if (od_flag) {
            vueOnDisc.borderColor.colorData.shift();
            vueOnDisc.borderColor.colorData.push({
                color: od_border_color,
                colorstyle: 'background-color:' + od_border_color,
                active: true
            })
        }

        //ontrue 闪烁  blinking
        if (data.onDisconnected.blinking) {
            vueOnDisc.flashing = true;
        } else {
            vueOnDisc.flashing = false;
        }
        /************************onDisc-- end************************************ */
    },

    //(属性设置) 宽高
    componentSize: function (component) {
        var vueRoutine = canvasVue.routine;
        // var data = component.getUserData();
        vueRoutine.width = component.getWidth();
        vueRoutine.height = component.getHeight();

    },

    //(属性设置) 位置 旋转角度
    componentOffsetAndAngle: function (component) {
        var vueRoutine = canvasVue.routine;
        //组件位置 X轴位置 
        vueRoutine.offx = component.getAbsoluteX().toFixed(0);
        //组件位置 Y轴位置
        vueRoutine.offy = component.getAbsoluteY();
        vueRoutine.rotationAngle = component.getRotationAngle();
    },

    // (属性设置) 显示标题
    componentCaption: function (component) {
        var vueRoutine = canvasVue.routine;
        var data = component.getUserData().routine.caption; //captions={show:true,text:'标题'}

        if (data.flag) {
            vueRoutine.title = true;
            vueRoutine.titledata.text = data.capText;
            vueRoutine.titledata.disabled = false;
        } else {
            vueRoutine.title = false;
            vueRoutine.titledata.disabled = true;

        }
    },


    // 基本图形
    rectangleSet: function (component) {

        var vueRoutine = canvasVue.routine;
        var vueDatas = canvasVue.datas;
        var vueDefaults = canvasVue.defaults;

        var vueOnTrue = canvasVue.ontrue;
        var vueOnFalse = canvasVue.onfalse;
        var vueOnAlarm = canvasVue.onalarm;
        var vueOnDisc = canvasVue.ondisc;
        var data = component.getUserData();
        // =============================style===================================
        //填充(背景)颜色  fillColor
        var s_fill_color = component.getBackgroundColor().hash();
        var s_flag = true;
        vueDefaults.fillColor.color = s_fill_color;
        vueDefaults.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === s_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (s_flag) {
            vueDefaults.fillColor.colorData.shift();
            vueDefaults.fillColor.colorData.push({
                color: s_fill_color,
                colorstyle: 'background-color:' + s_fill_color,
                active: true
            })
        }
        // 透明度
        vueDefaults.alpha = component.getAlpha();

        // =============================onTrue===================================
        //填充(背景)颜色  fillColor
        var ot_fill_color = data.onTrue.fillColor;
        var ot_flag = true;
        vueOnTrue.fillColor.color = ot_fill_color;
        vueOnTrue.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === ot_fill_color) {
                ele.active = true;
                ot_flag = false;
            }

        });
        if (ot_flag) {
            vueOnTrue.fillColor.colorData.shift();
            vueOnTrue.fillColor.colorData.push({
                color: ot_fill_color,
                colorstyle: 'background-color:' + ot_fill_color,
                active: true
            })
        }
        // 透明度
        vueOnTrue.alpha = data.onTrue.alpha;



        // =============================onFalse===================================
        // 填充(背景)颜色  fillColor
        var of_fill_color = data.onFalse.fillColor;
        var of_flag = true;
        vueOnFalse.fillColor.color = of_fill_color;
        vueOnFalse.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === of_fill_color) {
                ele.active = true;
                of_flag = false;
            }
        });
        if (of_flag) {
            vueOnFalse.fillColor.colorData.shift();
            vueOnFalse.fillColor.colorData.push({
                color: of_fill_color,
                colorstyle: 'background-color:' + of_fill_color,
                active: true
            })
        }
        // 透明度
        vueOnFalse.alpha = data.onFalse.alpha;

        // =============================onAlarm===================================
        // 填充(背景)颜色  fillColor
        var oa_fill_color = data.onAlarm.fillColor;
        var oa_flag = true;
        vueOnAlarm.fillColor.color = oa_fill_color;
        vueOnAlarm.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === oa_fill_color) {
                ele.active = true;
                oa_flag = false;
            }
        });
        if (oa_flag) {
            vueOnAlarm.fillColor.colorData.shift();
            vueOnAlarm.fillColor.colorData.push({
                color: oa_fill_color,
                colorstyle: 'background-color:' + oa_fill_color,
                active: true
            })
        }
        // 透明度
        vueOnAlarm.alpha = data.onAlarm.alpha;


        // =============================onDisconnected===================================
        // 填充(背景)颜色  fillColor
        var od_fill_color = data.onDisconnected.fillColor;
        var od_flag = true;
        vueOnDisc.fillColor.color = od_fill_color;
        vueOnDisc.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === od_fill_color) {
                ele.active = true;
                od_flag = false;
            }
        });
        if (od_flag) {
            vueOnDisc.fillColor.colorData.shift();
            vueOnDisc.fillColor.colorData.push({
                color: od_fill_color,
                colorstyle: 'background-color:' + od_fill_color,
                active: true
            })
        }
        // 透明度
        vueOnDisc.alpha = data.onDisconnected.alpha;



    },
    // 直线
    lineSet: function (component) {

    },
    // label
    labelSet: function (component) {

        var vueDefaults = canvasVue.defaults;

        var vueOnTrue = canvasVue.ontrue;
        var vueOnFalse = canvasVue.onfalse;
        var vueOnAlarm = canvasVue.onalarm;
        var vueOnDisc = canvasVue.ondisc;

        var data = component.getUserData();

        /************************style--begin************************************ */

        //边框宽度  borderWidth
        vueDefaults.borderWidth = component.getStroke();

        //边框样式 borderStyle
        // var s_border_style = component.getDashArray();
        // if (s_border_style === null) {
        //     vueDefaults.borderStyle = '默认';
        // } else {
        //     vueDefaults.borderStyle = s_border_style;
        // }

        // 边框颜色
        var s_border_color = component.getColor().hash();
        var s_flag = true;
        vueDefaults.borderColor.color = s_border_color;
        vueDefaults.borderColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === s_border_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (s_flag) {
            vueDefaults.borderColor.colorData.shift();
            vueDefaults.borderColor.colorData.push({
                color: s_border_color,
                colorstyle: 'background-color:' + s_border_color,
                active: true
            })
        }


        //填充(背景)颜色  fillColor
        var s_fill_color = component.getBackgroundColor().hash();
        var s_flag = true;
        vueDefaults.fillColor.color = s_fill_color;
        vueDefaults.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === s_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (s_flag) {
            vueDefaults.fillColor.colorData.shift();
            vueDefaults.fillColor.colorData.push({
                color: s_fill_color,
                colorstyle: 'background-color:' + s_fill_color,
                active: true
            })
        }

        //style 闪烁  blinking
        if (data.blinking.flag) {
            vueDefaults.flashing = true;
        } else {
            vueDefaults.flashing = false;
        }


        // 文本内容   




        // 文本颜色









        /************************style--end************************************** */
    },
    // text
    textSet: function (component) {

        // =============================style=================================== 
        //填充(背景)颜色  fillColor
        var s_fill_color = component.getBackgroundColor().hash();
        var s_flag = true;
        vueDefaults.fillColor.color = s_fill_color;
        vueDefaults.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === s_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (s_flag) {
            vueDefaults.fillColor.colorData.shift();
            vueDefaults.fillColor.colorData.push({
                color: s_fill_color,
                colorstyle: 'background-color:' + s_fill_color,
                active: true
            })
        }

        // 文本内容  Text
        // 字体大小
        // 文本颜色

        // =============================onTrue===================================
        //填充(背景)颜色  fillColor
        var ot_fill_color = data.onTrue.fillColor;
        var ot_flag = true;
        vueOnTrue.fillColor.color = ot_fill_color;
        vueOnTrue.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === ot_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (ot_flag) {
            vueOnTrue.fillColor.colorData.shift();
            vueOnTrue.fillColor.colorData.push({
                color: ot_fill_color,
                colorstyle: 'background-color:' + ot_fill_color,
                active: true
            })
        }

        // 文本内容  Text
        // 文本颜色


        // =============================onFalse===================================
        // 填充(背景)颜色  fillColor
        var of_fill_color = data.onFlase.fillColor;
        var of_flag = true;
        vueOnFalse.fillColor.color = of_fill_color;
        vueOnFalse.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === of_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (of_flag) {
            vueOnFalse.fillColor.colorData.shift();
            vueOnFalse.fillColor.colorData.push({
                color: of_fill_color,
                colorstyle: 'background-color:' + of_fill_color,
                active: true
            })
        }


        // 文本内容  Text
        // 文本颜色


        // =============================onAlarm===================================
        // 填充(背景)颜色  fillColor
        var oa_fill_color = data.onAlarm.fillColor;
        var oa_flag = true;
        vueOnAlarm.fillColor.color = oa_fill_color;
        vueOnAlarm.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === oa_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (oa_flag) {
            vueOnAlarm.fillColor.colorData.shift();
            vueOnAlarm.fillColor.colorData.push({
                color: of_fill_color,
                colorstyle: 'background-color:' + oa_fill_color,
                active: true
            })
        }

        // 文本内容  Text
        // 文本颜色


        // =============================onDisconnected===================================
        // 填充(背景)颜色  fillColor
        var od_fill_color = data.ononDisconnected.fillColor;
        var od_flag = true;
        vueOnDisc.fillColor.color = od_fill_color;
        vueOnDisc.fillColor.colorData.forEach(function (ele) {
            ele.active = false;
            if (ele.color === od_fill_color) {
                ele.active = true;
                s_flag = false;
            }
        });
        if (od_flag) {
            vueOnDisc.fillColor.colorData.shift();
            vueOnDisc.fillColor.colorData.push({
                color: od_fill_color,
                colorstyle: 'background-color:' + od_fill_color,
                active: true
            })
        }

        // 文本内容  Text
        // 文本颜色

    },
    // 自定义图像
    imageSet: function (component) {
        var data = component.getUserData();
        canvasVue.defaults.picture = data.defaults.picture;
        canvasVue.ontrue.picture = data.onTrue.picture;
        canvasVue.onfalse.picture = data.onFalse.picture;
        canvasVue.onalarm.picture = data.onAlarm.picture;
        canvasVue.ondisc.picture = data.onDisconnected.picture;
    },
    // 建筑设备、安全防范
    safeSet: function () {

    },



    /**
     * 编辑控件前
     * 
     * 当前样式切换到 default状态样式
     */
    checkPreviousComponentTag: function (component) {
        console.log("ID:" + component.id)
        var id = canvasVue.componentData.id;
        var node = canvasSet.getNodeFromCanvas(id);
        if (node) {
            // if (node.userData.tag.bingding_status == 2) {
            //     layer.msg("上个控件Tag值绑定无效,请重新绑定!")
            // }

            var defaults =  node.userData.defaults;
            node.userData.custom.editSatus = 'defaults';

            node.setStroke(defaults.lineWidth);
            node.setColor(defaults.lineColor);


            switch(node.userData.type){
                case 'basicComponent':
                node.setBackgroundColor(defaults.fillColor);
                node.setAlpha(defaults.alpha);
                break;
                case 'customImageComponent':
                node.setBackgroundColor(defaults.fillColor);
                node.setAlpha(defaults.alpha);
                node.image.setPath(defaults.picture);
                break;
                case 'labelComponent':
                node.setBackgroundColor(defaults.fillColor);
                break;
                case 'lineComponent':
                // 
                break;
                case 'defaultComponent':
                break;
                case 'textComponent':
                node.setBackgroundColor(defaults.fillColor);
                node.setAlpha(defaults.alpha);

                // 文本
                // 文本颜色
                break;
            }

        }

        canvasVue.componentData.id = component.id;
        
        this.checkThisComponentTag(component);
    },
    //  [检查 当前控件 TagID 是否绑定正确]
    checkThisComponentTag: function (component) {
        var tagspan = $('.tag-status');
        var datas = canvasVue.datas.tag.isrighttag;
        switch (Number(component.userData.tag.bingding_status)) {
            case 0:
                tagspan.hide();
                break;
            case 1:
                tagspan.show();
                datas = false;
                break;
            case 2:
                tagspan.show();
                datas = true;
                break;
        }
    },
    /**
     * 将 组件监控值标志 改为  false
     * 意味着  当属性改变时会   不会改变 当前选中 组件的属性
     */
    setComponentFlagFalse: function () {
        canvasVue.componentData.flag = false;
    },
    /**
     * 将 组件监控值标志 改为  true
     * 意味着  当属性改变时会 相应改变 当前选中 组件的属性
     */
    setComponentFlagTrue: function () {
        setTimeout(function () {
            canvasVue.componentData.flag = true;
        }, 300);

    },
    // 闪烁方法
    flashMethod:function(component){
        component.setColor("#03A3FC");
        component.setStroke(1);
        component.setGlow(true);
        setTimeout(function () {
            component.setGlow(false);
            var userdata = component.getUserData();
            var type = '';
            switch(userdata.custom.editSatus){
                case 'defaults':
                type = 'defaults';
                break;
                case 'onTrue':
                type = 'onTrue';
                break;
                case 'onFalse':
                type = 'onFalse';
                break;
                case 'onAlarm':
                type = 'onAlarm';
                break;
                case 'onDisconnected':
                type = 'onDisconnected';
                break;
            }
            component.setColor(userdata[type].lineColor);
            component.setStroke(userdata[type].lineWidth);
        }, 500);
    },
    // 组件缩放时 方法
    componentOnResizeMethod:function(component){
        var w = component.getWidth();
        var h = component.getHeight();
        canvasVue.routine.width = w;
        canvasVue.routine.height = h;
        if(component.image){
            component.image.setWidth(w);
            component.image.setHeight(h);
        }
    },
    // 组件移动时  方法
    componentOnMoveMethod: function (component) {
        if (!component.userData.custom.newCreat) {
            this.hideTooltips();

            switch (component.userData.type) {
                case 'basicComponent':
                    rectangle.clickMethod(component);
                    break;
                case 'customImageComponent':
                    imgBasic.clickMethod(component);
                case 'defaultComponent':
                    // imgBasic.clickMethod(component);
                    break;
                case 'labelComponent':
                    // labelBasic.clickMethod(component);
                    break;
                case 'lineComponent':
                    // lineBasic.clickMethod(component);
                    break;
                case 'textComponent':
                break;
            }

        }

    },

    // 组件属性框切换触发
    statusChangeMethod:function(type){
        var node = canvasSet.getNodeFromCanvas();
        if (node) {
            var userdata =  node.userData;
            userdata.custom.editSatus = type;
            console.log(type)
            node.stopTimer();
            if(userdata[type].blinking){
             node.startTimer(canvasVue.componentData.flashTime);
            }

            node.setStroke(userdata[type].lineWidth);
            node.setColor(userdata[type].lineColor);


            
            switch(userdata.type){
                case 'basicComponent':
                node.setBackgroundColor(userdata[type].fillColor);
                node.setAlpha(userdata[type].alpha);
                break;
                case 'customImageComponent':
                node.setBackgroundColor(userdata[type].fillColor);
                node.setAlpha(userdata[type].alpha);
                node.image.setPath(userdata[type].picture);
                break;
                case 'labelComponent':
                node.setBackgroundColor(userdata[type].fillColor);
                break;
                case 'lineComponent':
                // 
                break;
                case 'defaultComponent':
                break;
                case 'textComponent':
                node.setBackgroundColor(userdata[type].fillColor);
                node.setAlpha(userdata[type].alpha);

                // 文本
                // 文本颜色
                break;
            }


        }
    },


    // 显示悬浮说明
    showTooltips: function (component) {
        var hint = component.userData.routine.hint;
        if (hint.flag) {
            if (hint.hintText != '') {
                var pos = this.getMousePos(event);
                $('#tooltips').show().text(hint.hintText).css({ 'top': pos.y, 'left': pos.x });
            }
        }
    },
    // 隐藏悬浮说明
    hideTooltips: function (component) {
        $('#tooltips').hide();
    },
    // 获取鼠标位置
    getMousePos: function (event) {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        y -= 195;
        x -= 50
        console.log('x: ' + x + '\ny: ' + y)
        // alert('x: ' + x + '\ny: ' + y);
        return { 'x': x, 'y': y };
        // console.log('x: ' + x + '\ny: ' + y)
    }

}







// 基础功能设置
var basicSet = {
    //初始化 
    init: function () {
        var _this = this;
        // 组件滚动功能
        this.comscroll.picrun_ini("scroll_ul_2", 'scroll_div', "scroll_ul_1");
        // 做滚动按钮
        $('#LeftBotton').mousedown(function () {
            _this.comscroll.GoUp();
        }).mouseup(function () {
            _this.comscroll.StopUp()
        });
        // 右滚动按钮
        $('#RightBotton').mousedown(function () {
            _this.comscroll.GoDown()
        }).mouseup(function () {
            _this.comscroll.StopDown()
        });

        // 滚动条美化
        $(".layui-tabscroll-item,.global-btn-body,.comp-level-ul").mCustomScrollbar({
            autoHideScrollbar: true
        });

        // 基础属性框打开关闭操作
        $('.attr-toggle-default').click(function () {
            var _this = $(this);
            var clas = 'collapsed';
            var divs = '.' + _this.data('for');

            if (_this.hasClass(clas)) {
                _this.removeClass(clas);
            } else {
                _this.addClass(clas);
            }
            $(divs).stop().slideToggle(300);

        });


        // 状态属性框打开关闭操作
        $('.attr-toggle-status').click(function () {
            var _this = $(this);
            var clas = 'collapsed';
            var divs = '.' + _this.data('for');

            var flag = false;
            if (_this.hasClass(clas)) {
                flag = true;
            }

            $('.status-div').stop().hide();
            $('.attr-toggle-status').removeClass(clas);

            if (!flag) {
                _this.addClass(clas);
                $(divs).slideDown(300);
                setComponentOptions.statusChangeMethod(_this.data('status'));  
            }



            



        });



        // 画布自适应缩放
        window.onresize = function () {
            canvasSet.setCanvasWH();
        }


        // 颜色
        this.watchColorClick();
    },





    watchColorClick: function () {
        //default 边框颜色设置
        $('.default-border-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.defaults.borderColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var borderColor = canvasVue.defaults.borderColor;
                // if (color !== borderColor.color) {
                borderColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    borderColor.colorData.shift();
                    borderColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                borderColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });
        //default 填充颜色设置
        $('.default-fill-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.defaults.fillColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {

                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fillColor = canvasVue.defaults.fillColor;
                fillColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fillColor.colorData.shift();
                    fillColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fillColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });


        //default 字体颜色设置
        $('.default-font-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.defaults.fontColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fontColor = canvasVue.defaults.fontColor;
                // if (color !== borderColor.color) {
                fontColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fontColor.colorData.shift();
                    fontColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fontColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });



        //ontrue 边框颜色设置
        $('.ontrue-border-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.ontrue.borderColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }
            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var borderColor = canvasVue.ontrue.borderColor;
                // if (color !== borderColor.color) {
                borderColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    borderColor.colorData.shift();
                    borderColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                borderColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        //ontrue 填充颜色设置
        $('.ontrue-fill-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.ontrue.fillColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fillColor = canvasVue.ontrue.fillColor;
                // if (color !== borderColor.color) {
                fillColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fillColor.colorData.shift();
                    fillColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fillColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        // ontrue 字体颜色设置
        $('.ontrue-font-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.ontrue.fontColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fontColor = canvasVue.ontrue.fontColor;
                // if (color !== borderColor.color) {
                fontColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fontColor.colorData.shift();
                    fontColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fontColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });




        //onfalse 边框颜色设置
        $('.onfalse-border-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.onfalse.borderColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }
            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var borderColor = canvasVue.onfalse.borderColor;
                // if (color !== borderColor.color) {
                borderColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    borderColor.colorData.shift();
                    borderColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                borderColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });



        //onfalse 填充颜色设置
        $('.onfalse-fill-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.onfalse.fillColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fillColor = canvasVue.onfalse.fillColor;
                // if (color !== borderColor.color) {
                fillColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fillColor.colorData.shift();
                    fillColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fillColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });


        // onfalse 字体颜色设置
        $('.onfalse-font-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.onfalse.fontColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fontColor = canvasVue.onfalse.fontColor;
                // if (color !== borderColor.color) {
                fontColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fontColor.colorData.shift();
                    fontColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fontColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        //onalarm 边框颜色设置
        $('.onalarm-border-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.onalarm.borderColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }
            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var borderColor = canvasVue.onalarm.borderColor;
                // if (color !== borderColor.color) {
                borderColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    borderColor.colorData.shift();
                    borderColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                borderColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        //onalarm 填充颜色设置
        $('.onalarm-fill-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.onalarm.fillColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fillColor = canvasVue.onalarm.fillColor;
                // if (color !== borderColor.color) {
                fillColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fillColor.colorData.shift();
                    fillColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fillColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        // onalarm 字体颜色设置
        $('.onalarm-font-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.onalarm.fontColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fontColor = canvasVue.onalarm.fontColor;
                // if (color !== borderColor.color) {
                fontColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fontColor.colorData.shift();
                    fontColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fontColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        //ondisc 边框颜色设置
        $('.ondisc-border-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.ondisc.borderColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }
            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var borderColor = canvasVue.ondisc.borderColor;
                // if (color !== borderColor.color) {
                borderColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    borderColor.colorData.shift();
                    borderColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                borderColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        //ondisc 填充颜色设置
        $('.ondisc-fill-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.ondisc.fillColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fillColor = canvasVue.ondisc.fillColor;
                // if (color !== borderColor.color) {
                fillColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fillColor.colorData.shift();
                    fillColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fillColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });

        // ondisc 字体颜色设置
        $('.ondisc-font-color').colpick({
            layout: 'hex',
            submitText: '确定',
            onShow: function () {
                var color = canvasVue.ondisc.fontColor.color;
                if (color != '') {
                    $(this).colpickSetColor(color.substring(1));
                }

            },
            onSubmit: function (hsb, hex, rgb, el) {
                // var node = getNode();
                // node.userData.BlinkingColor = '#' + hex;
                // node.setColor("#" + hex);
                // node.repaint();
                var color = ('#' + hex).toUpperCase();
                var flag = true;
                var fontColor = canvasVue.ondisc.fontColor;
                // if (color !== borderColor.color) {
                fontColor.colorData.forEach(function (ele) {
                    ele.active = false;
                    if (ele.color === color) {
                        ele.active = true;
                        flag = false;
                    }
                });
                if (flag) {
                    fontColor.colorData.shift();
                    fontColor.colorData.push({
                        color: color,
                        colorstyle: 'background-color:' + color,
                        active: true
                    })
                }

                fontColor.color = color;
                console.log(color)
                $(el).colpickHide();
            }
        });


    },
    // 控件滚动操作
    comscroll: {
        Speed_1: 10,
        Space_1: 10,
        PageWidth_1: 50 * 10,
        interval_1: 5000,
        fill_1: 0,
        MoveLock_1: false,
        MoveTimeObj_1: '',
        MoveWay_1: "right",
        Comp_1: 0,
        scroll_ul_2: '',
        scroll_div: '',
        scroll_ul_1: '',
        GetObj: function (objName) {
            if (document.getElementById) {
                return eval('document.getElementById("' + objName + '")')
            } else {
                return eval('document.all.' + objName)
            }
        },
        GoUp: function (string) {
            var _this = this;
            if (this.MoveLock_1) return;
            console.log('查看2：' + string)
            this.MoveLock_1 = true;
            this.MoveWay_1 = "left";
            this.MoveTimeObj_1 = setInterval(function () {
                _this.ScrUp(_this.scroll_div)
            }, this.Speed_1);
        },
        StopUp: function (string) {
            if (this.MoveWay_1 == "right") {
                return
            };
            clearInterval(this.MoveTimeObj_1);
            if ((this.scroll_div.scrollLeft - this.fill_1) % this.PageWidth_1 != 0) {
                this.Comp_1 = this.fill_1 - (this.scroll_div.scrollLeft % this.PageWidth_1);
                this.CompScr_1(this.scroll_div)
            } else {
                this.MoveLock_1 = false
            }
        },
        ScrUp: function (obj) {
            if (obj.scrollLeft <= 0) {
                obj.scrollLeft = obj.scrollLeft + obj.offsetWidth
            }
            obj.scrollLeft -= this.Space_1;
        },
        GoDown: function (string, string2, string3) {
            var _this = this;
            clearInterval(this.MoveTimeObj_1);
            if (this.MoveLock_1) return;
            this.MoveLock_1 = true;
            this.MoveWay_1 = "right";
            this.ScrDown(this.scroll_div, this.scroll_ul_1);
            this.MoveTimeObj_1 = setInterval(function () {
                _this.ScrDown(_this.scroll_div, _this.scroll_ul_1);
            }, this.Speed_1)
        },
        StopDown: function (string) {
            var scrollDiv = this.scroll_div;
            var fill_1 = this.fill_1;
            var PageWidth_1 = this.PageWidth_1;
            if (this.MoveWay_1 == "left") {
                return
            };
            clearInterval(this.MoveTimeObj_1);
            if (scrollDiv.scrollLeft % PageWidth_1 - (fill_1 >= 0 ? fill_1 : fill_1 + 1) != 0) {
                this.Comp_1 = PageWidth_1 - scrollDiv.scrollLeft % PageWidth_1 + fill_1;
                this.CompScr_1(this.scroll_div);
            } else {
                this.MoveLock_1 = false
            }
        },
        ScrDown: function (obj1, obj2) {
            console.log(123)
            if (obj1.scrollLeft >= obj2.scrollWidth) {
                obj1.scrollLeft = obj1.scrollLeft - obj2.scrollWidth - 40
            }
            obj1.scrollLeft += this.Space_1;
        },
        CompScr_1: function (obj) {

            if (this.Comp_1 == 0) {
                this.MoveLock_1 = false;
                return
            }
            var num, TempSpeed = this.Speed_1,
                TempSpace = this.Space_1;
            if (Math.abs(this.Comp_1) < this.PageWidth_1 / 2) {
                TempSpace = Math.round(Math.abs(this.Comp_1 / this.Space_1));
                if (TempSpace < 1) {
                    TempSpace = 1
                }
            }
            if (this.Comp_1 < 0) {
                if (this.Comp_1 < -TempSpace) {
                    this.Comp_1 += TempSpace;
                    num = TempSpace
                } else {
                    num = -this.Comp_1;
                    this.Comp_1 = 0
                }
                obj.scrollLeft -= num;
                setTimeout(this.CompScr_1(obj), TempSpeed)
            } else {
                if (this.Comp_1 > TempSpace) {
                    this.Comp_1 -= TempSpace;
                    num = TempSpace
                } else {
                    num = this.Comp_1;
                    this.Comp_1 = 0
                }
                obj.scrollLeft += num;
                setTimeout(this.CompScr_1(obj), TempSpeed)
            }
        },
        picrun_ini: function (string, string2, string3) {
            this.scroll_ul_2 = this.GetObj(string);
            this.scroll_ul_1 = this.GetObj(string3);
            this.scroll_div = this.GetObj(string2);
            this.scroll_ul_2.innerHTML = this.scroll_ul_1.innerHTML;
            this.scroll_div.scrollLeft = this.fill_1 >= 0 ? this.fill_1 : this.scroll_ul_1.scrollWidth - Math.abs(this.fill_1);
        }

    },

};



// canvas 基础设置
var canvasSet = {
    basicData: {
        // 画布基础宽高
        basicWidth: 1300,
        scale: 9 / 16,
        s: ''
    },
    setCanvasWH: function () {
        var w = Number($('.canvas-div').width());
        var s = this.basicData.basicWidth / w;
        this.basicData.s = s;
        $('#canvas').css({
            width: w + 'px',
            height: w * this.basicData.scale + 'px'
        });

        imageCanvas.setZoom(s);
    },
    /**
     *  在画布中捕获控件 用于处理组件
     * @param  {[type]} id [description]
     * @return {[type]}    [控件对象]
     */
    getNodeFromCanvas: function () {
        var id = canvasVue.componentData.id;
        if (id != '') {
            var node = imageCanvas.getFigure(id);
            var nodeLine = imageCanvas.getLine(id);
            if (node !== null) {
                return node;
            } else if (nodeLine !== null) {
                return nodeLine;
            }
        } else {
            return false;
        }

    },
    /**
     * [打印 控件数据 ----------调试用]
     * @param  {[type]} canvas [description]
     */
    displayJSON: function (canvas) {
        var writer = new draw2d.io.json.Writer();
        writer.marshal(canvas, function (json) {
            console.log('画布数据:' + JSON.stringify(json, null, 2));
        });
    },
    /**
     * [canvas 初始化]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    allCanvasinit: function (type) {
        //选择框  样式
        draw2d.Configuration.factory.createResizeHandle = function (forShape, type) {
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

        var app = new example.Application();


        var canvas = app.view; //主画布
        // 边框阴影
        var filter = canvas.paper.createFilter();
        filter.createShadow(0, 0, 3, 0.3, "#000000");
        filter.element.setAttribute("x", "-35%");
        filter.element.setAttribute("y", "-35%");

        app.view.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function () {
                return new HoverConnection();
            }
        }));


        canvas.on("figure:add", function (emitter, event) {
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

        canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
        // canvas.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
        imageCanvas = canvas;

        canvas.installEditPolicy(new CopyInterceptorPolicy());
        canvas.getCommandStack().addEventListener(function (e) {
            if (e.isPostChangeEvent()) {
                canvasSet.displayJSON(canvas);
            }
        });
        // getGroupNameAndViewData(sessionStorage.getItem("view_id"), canvas, type);



        // var reader = new draw2d.io.json.Reader();
        // reader.unmarshal(canvas, canvasJson);

        // console.log('缩放比例' + canvas.getZoom())
        // console.log('宽度：' + canvas.getWidth());
        // console.log('宽度：' + canvas.getHeight());


    },




}










































































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

$('#canvas').on('click', function () {
    $canvas.menuFirAttr.show();
    $canvas.menuSecAttr.hide();
});
$('.have-btn').on('click', 'button', function () {
    $canvas.menuFirAttr.hide();
    $canvas.menuSecAttr.show();
});


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
}