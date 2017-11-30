/** 
 *  switchComponent  开关
 */
var switchComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "switchComponent",
    init: function (attr) {
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));
       
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path: imgBaseUrl+ "switch1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        
      

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = 'Switch';
        data.onTrue.picture = imgBaseUrl + 'switch1.png';
        data.onFalse.picture = imgBaseUrl + 'switch2.png';
        data.onAlarm.picture = imgBaseUrl + 'switch3.png';
        data.onDisconnected.picture = imgBaseUrl + 'switch4.png';


        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            // displayDiv(thiss);
            safeBasic.clickMethod(_this);
        });
        // 缩放
        this.on("resize", function () {
            // thiss.image.setHeight(thiss.getHeight());
            // thiss.image.setWidth(thiss.getWidth());
            // $('#comp-width').val(thiss.getWidth());
            // $('#comp-height').val(thiss.getHeight());
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }

});

/** 
 *  pipingComponent  管道
 */
var pipingComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "pipingComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
       
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "piping1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        var _this = this;
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = 'piping';
        data.onTrue.picture = imgBaseUrl + 'piping1.png';
        data.onFalse.picture = imgBaseUrl + 'piping2.png';
        data.onAlarm.picture = imgBaseUrl + 'piping3.png';
        data.onDisconnected.picture = imgBaseUrl + 'piping4.png';

        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  WarninglampComponent  报警提示灯
 */
var WarninglampComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "WarninglampComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Warninglamp1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '报警提示灯';
        data.onTrue.picture = imgBaseUrl + 'Warninglamp1.png';
        data.onFalse.picture = imgBaseUrl + 'Warninglamp2.png';
        data.onAlarm.picture = imgBaseUrl + 'Warninglamp3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Warninglamp4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  blowerfanComponent  送风机
 */
var blowerfanComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "blowerfanComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Blowerfan1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性


        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);


        data.routine.name = '送风机';
        data.onTrue.picture = imgBaseUrl + 'Blowerfan1.png';
        data.onFalse.picture = imgBaseUrl + 'Blowerfan2.png';
        data.onAlarm.picture = imgBaseUrl + 'Blowerfan3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Blowerfan4.png';


        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  exhaustfanComponent  排风机
 */
var exhaustfanComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "exhaustfanComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Exhaustfan1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '排风机';
        data.onTrue.picture = imgBaseUrl + 'Exhaustfan1.png';
        data.onFalse.picture = imgBaseUrl + 'Exhaustfan2.png';
        data.onAlarm.picture = imgBaseUrl + 'Exhaustfan3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Exhaustfan4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            if (thiss.userData.ShowHint) {
                // showTooltips(thiss);
            }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  bengComponent  泵
 */
var bengComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "bengComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "beng1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '泵';
        data.onTrue.picture = imgBaseUrl + 'beng1.png';
        data.onFalse.picture = imgBaseUrl + 'beng2.png';
        data.onAlarm.picture = imgBaseUrl + 'beng3.png';
        data.onDisconnected.picture = imgBaseUrl + 'beng4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  ElectricTwoWayValveComponent  电动两通阀
 */
var ElectricTwoWayValveComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricTwoWayValveComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "valve1-1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '电动两通阀';
        data.onTrue.picture = imgBaseUrl + 'valve1-1.png';
        data.onFalse.picture = imgBaseUrl + 'valve1-2.png';
        data.onAlarm.picture = imgBaseUrl + 'valve1-3.png';
        data.onDisconnected.picture = imgBaseUrl + 'valve1-4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  SolenoidValveComponent  电磁阀
 */
var SolenoidValveComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "SolenoidValveComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;

        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "valve2-1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
       
        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.name = '电磁阀';
        data.onTrue.picture = imgBaseUrl + 'valve2-1.png';
        data.onFalse.picture = imgBaseUrl + 'valve2-2.png';
        data.onAlarm.picture = imgBaseUrl + 'valve2-3.png';
        data.onDisconnected.picture = imgBaseUrl + 'valve2-4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });

        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  ElectricButterflyValvesComponent  电动蝶阀
 */
var ElectricButterflyValvesComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricButterflyValvesComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path: imgBaseUrl+"valve3-1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '电动蝶阀';
        data.onTrue.picture = imgBaseUrl + 'valve3-1.png';
        data.onFalse.picture = imgBaseUrl + 'valve3-2.png';
        data.onAlarm.picture = imgBaseUrl + 'valve3-3.png';
        data.onDisconnected.picture = imgBaseUrl + 'valve3-4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
                // showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  AirFiltrationComponent  空气过滤器
 */
var AirFiltrationComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirFiltrationComponent",
    init: function (attr) {

        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));


        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path: "images/icon/icon/Airfiltration1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '空气过滤器';
        data.onTrue.picture = imgBaseUrl + 'Airfiltration1.png';
        data.onFalse.picture = imgBaseUrl + 'Airfiltration2.png';
        data.onAlarm.picture = imgBaseUrl + 'Airfiltration3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Airfiltration4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  AirHeatingComponent  空气加热器
 */
var AirHeatingComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirHeatingComponent",
    init: function (attr) {
       this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Airheating1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '空气加热器';
        data.onTrue.picture = imgBaseUrl + 'Airheating1.png';
        data.onFalse.picture = imgBaseUrl + 'Airheating2.png';
        data.onAlarm.picture = imgBaseUrl + 'Airheating3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Airheating4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
                // showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  AirCoolerComponent  空气冷却器
 */
var AirCoolerComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirCoolerComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl + "Aircooler1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '空气冷却器';
        data.onTrue.picture = imgBaseUrl + 'Aircooler1.png';
        data.onFalse.picture = imgBaseUrl + 'Aircooler2.png';
        data.onAlarm.picture = imgBaseUrl + 'Aircooler3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Aircooler4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  HumidifierComponent  加湿器
 */
var HumidifierComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "HumidifierComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "humidifier1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '加湿器';
        data.onTrue.picture = imgBaseUrl + 'humidifier1.png';
        data.onFalse.picture = imgBaseUrl + 'humidifier2.png';
        data.onAlarm.picture = imgBaseUrl + 'humidifier3.png';
        data.onDisconnected.picture = imgBaseUrl + 'humidifier4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  controlPanelComponent  温控面板
 */
var controlPanelComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "controlPanelComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "controlpanel1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '温控面板';
        data.onTrue.picture = imgBaseUrl + 'controlpanel1.png';
        data.onFalse.picture = imgBaseUrl + 'controlpanel2.png';
        data.onAlarm.picture = imgBaseUrl + 'controlpanel3.png';
        data.onDisconnected.picture = imgBaseUrl + 'controlpanel4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
                // showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  FluorescentLampComponent  荧光灯
 */
var FluorescentLampComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "FluorescentLampComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Fluorescentlamp1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        var _this = this;
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '荧光灯';
        data.onTrue.picture = imgBaseUrl + 'Fluorescentlamp1.png';
        data.onFalse.picture = imgBaseUrl + 'Fluorescentlamp2.png';
        data.onAlarm.picture = imgBaseUrl + 'Fluorescentlamp3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Fluorescentlamp4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  LEDComponent  LED灯
 */
var LEDComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "LEDComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "LED1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = 'LED灯';
        data.onTrue.picture = imgBaseUrl + 'LED1.png';
        data.onFalse.picture = imgBaseUrl + 'LED2.png';
        data.onAlarm.picture = imgBaseUrl + 'LED3.png';
        data.onDisconnected.picture = imgBaseUrl + 'LED4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  IncandescentComponent  白炽灯
 */
var IncandescentComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "IncandescentComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Incandescent1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        
        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.name = '白炽灯';
        data.onTrue.picture = imgBaseUrl + 'Incandescent1.png';
        data.onFalse.picture = imgBaseUrl + 'Incandescent2.png';
        data.onAlarm.picture = imgBaseUrl + 'Incandescent3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Incandescent4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  MetalHalideComponent  金卤灯
 */
var MetalHalideComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "MetalHalideComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Metalhalide1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        
        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '金卤灯';
        data.onTrue.picture = imgBaseUrl + 'Metalhalide1.png';
        data.onFalse.picture = imgBaseUrl + 'Metalhalide2.png';
        data.onAlarm.picture = imgBaseUrl + 'Metalhalide3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Metalhalide4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
                // showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  temperatureComponent  温度
 */
var temperatureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "temperatureComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;  
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "temperature1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        this.labelValue = new draw2d.shape.basic.Label({
            text: "123123",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 13;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("gray");

        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
       

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.name = '温度';
        data.onTrue.picture = imgBaseUrl + 'temperature1.png';
        data.onFalse.picture = imgBaseUrl + 'temperature2.png';
        data.onAlarm.picture = imgBaseUrl + 'temperature3.png';
        data.onDisconnected.picture = imgBaseUrl + 'temperature4.png';

        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });

        // 缩放
        // this.on("resize", function () {
        //     thiss.image.setHeight(thiss.getHeight());
        //     thiss.image.setWidth(thiss.getWidth());
        //     $('#comp-width').val(thiss.getWidth());
        //     $('#comp-height').val(thiss.getHeight());
        // });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});
/** 
 *  humidityComponent  湿度
 */
var humidityComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "humidityComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "humidity1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 3;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#000000");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom());

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '湿度';
        data.onTrue.picture = imgBaseUrl + 'humidity1.png';
        data.onFalse.picture = imgBaseUrl + 'humidity2.png';
        data.onAlarm.picture = imgBaseUrl + 'humidity3.png';
        data.onDisconnected.picture = imgBaseUrl + 'humidity4.png';

        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  pressureComponent  压力
 */
var pressureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "pressureComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "pressure1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");

        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '压力';
        data.onTrue.picture = imgBaseUrl + 'pressure1.png';
        data.onFalse.picture = imgBaseUrl + 'pressure2.png';
        data.onAlarm.picture = imgBaseUrl + 'pressure3.png';
        data.onDisconnected.picture = imgBaseUrl + 'pressure4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  differentialPressureComponent  压差
 */
var differentialPressureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "differentialPressureComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
       
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "differentialpressure1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");

        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '压差';
        data.onTrue.picture = imgBaseUrl + 'differentialpressure1.png';
        data.onFalse.picture = imgBaseUrl + 'differentialpressure2.png';
        data.onAlarm.picture = imgBaseUrl + 'differentialpressure3.png';
        data.onDisconnected.picture = imgBaseUrl + 'differentialpressure4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });

        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  liquidComponent  液位
 */
var liquidComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "liquidComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "liquid1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '液位';
        data.onTrue.picture = imgBaseUrl + 'liquid1.png';
        data.onFalse.picture = imgBaseUrl + 'liquid2.png';
        data.onAlarm.picture = imgBaseUrl + 'liquid3.png';
        data.onDisconnected.picture = imgBaseUrl + 'liquid4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  electricComponent  电流
 */
var electricComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "electricComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "electric1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '电流';
        data.onTrue.picture = imgBaseUrl + 'electric1.png';
        data.onFalse.picture = imgBaseUrl + 'electric2.png';
        data.onAlarm.picture = imgBaseUrl + 'electric3.png';
        data.onDisconnected.picture = imgBaseUrl + 'electric4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  VoltageComponent  电压
 */
var VoltageComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "VoltageComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Voltage1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
       
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));
        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.name = '电压';
        data.onTrue.picture = imgBaseUrl + 'Voltage1.png';
        data.onFalse.picture = imgBaseUrl + 'Voltage2.png';
        data.onAlarm.picture = imgBaseUrl + 'Voltage3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Voltage4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  frequencyComponent  频率
 */
var frequencyComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "frequencyComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "frequency1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '频率';
        data.onTrue.picture = imgBaseUrl + 'frequency1.png';
        data.onFalse.picture = imgBaseUrl + 'frequency2.png';
        data.onAlarm.picture = imgBaseUrl + 'frequency3.png';
        data.onDisconnected.picture = imgBaseUrl + 'frequency4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  activePowerComponent  有功功率
 */
var activePowerComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "activePowerComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "activepower1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '有功功率';
        data.onTrue.picture = imgBaseUrl + 'activepower1.png';
        data.onFalse.picture = imgBaseUrl + 'activepower2.png';
        data.onAlarm.picture = imgBaseUrl + 'activepower3.png';
        data.onDisconnected.picture = imgBaseUrl + 'activepower4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  ElectricityConsumptionComponent  用电量
 */
var ElectricityConsumptionComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricityConsumptionComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Electricityconsumption1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '用电量';
        data.onTrue.picture = imgBaseUrl + 'Electricityconsumption1.png';
        data.onFalse.picture = imgBaseUrl + 'Electricityconsumption2.png';
        data.onAlarm.picture = imgBaseUrl + 'Electricityconsumption3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Electricityconsumption4.png';
        this.attr({
            userData: data
        });
        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  levelComponent  液体流量
 */
var levelComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "levelComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "level1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '液体流量';
        data.onTrue.picture = imgBaseUrl + 'level1.png';
        data.onFalse.picture = imgBaseUrl + 'level2.png';
        data.onAlarm.picture = imgBaseUrl + 'level3.png';
        data.onDisconnected.picture = imgBaseUrl + 'level4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  GasComponent  气体流量
 */
var GasComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "GasComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Gas1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 控件显示的数值
        this.labelValue = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.labelValue.fontSize = 6;
        this.labelValue.setStroke(0);
        this.labelValue.setFontColor("#FFFFFF");
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '气体流量';
        data.onTrue.picture = imgBaseUrl + 'Gas1.png';
        data.onFalse.picture = imgBaseUrl + 'Gas2.png';
        data.onAlarm.picture = imgBaseUrl + 'Gas3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Gas4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  BroadcastComponent  广播
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "BroadcastComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "Broadcast1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '广播';
        data.onTrue.picture = imgBaseUrl + 'Broadcast1.png';
        data.onFalse.picture = imgBaseUrl + 'Broadcast2.png';
        data.onAlarm.picture = imgBaseUrl + 'Broadcast3.png';
        data.onDisconnected.picture = imgBaseUrl + 'Broadcast4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  monitoringComponent  枪机
 */
var monitoringComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "monitoringComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));

        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "monitoring1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.vlcurl = '';
        data.routine.name = '枪机';
        data.onTrue.picture = imgBaseUrl + 'monitoring1.png';
        data.onFalse.picture = imgBaseUrl + 'monitoring2.png';
        data.onAlarm.picture = imgBaseUrl + 'monitoring3.png';
        data.onDisconnected.picture = imgBaseUrl + 'monitoring4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            safeBasic.vlcValue(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  qiujiComponent  球机
 */

var qiujiComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "qiujiComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "qiuji1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.vlcurl = '';
        data.routine.name = '球机';
        data.onTrue.picture = imgBaseUrl + 'qiuji1.png';
        data.onFalse.picture = imgBaseUrl + 'qiuji2.png';
        data.onAlarm.picture = imgBaseUrl + 'qiuji3.png';
        data.onDisconnected.picture = imgBaseUrl + 'qiuji4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            safeBasic.vlcValue(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };
    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  highqiujiComponent  高球机
 */
var highqiujiComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "highqiujiComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "highqiuji1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);


        data.routine.vlcurl = '';
        data.routine.name = '高球机';
        data.onTrue.picture = imgBaseUrl + 'highqiuji1.png';
        data.onFalse.picture = imgBaseUrl + 'highqiuji2.png';
        data.onAlarm.picture = imgBaseUrl + 'highqiuji3.png';
        data.onDisconnected.picture = imgBaseUrl + 'highqiuji4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
            safeBasic.vlcValue(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  EntranceGuardComponent  门禁
 */
var EntranceGuardComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "EntranceGuardComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "menjin1.png",
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);

        data.routine.name = '门禁';
        data.onTrue.picture = imgBaseUrl + 'menjin1.png';
        data.onFalse.picture = imgBaseUrl + 'menjin2.png';
        data.onAlarm.picture = imgBaseUrl + 'menjin3.png';
        data.onDisconnected.picture = imgBaseUrl + 'menjin4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };

    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  detectorComponent  探测器
 */
var detectorComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "detectorComponent",
    init: function (attr) {
        this._super($.extend({
            stroke: safeBasic.stroke,
            width:safeBasic.width,
            height:safeBasic.height,
            resizeable:safeBasic.resizeable,
            bgColor:safeBasic.fillColor
        }, attr));


        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        this.image = new draw2d.shape.basic.Image({
            path:imgBaseUrl+ "tance1.png",
            width: safeBasic.width,
            height: safeBasic.height

        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
        this.image.setRotationAngle(90);


         this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var _this = this;
        
        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.name = '探测器';
        data.onTrue.picture = imgBaseUrl + 'tance1.png';
        data.onFalse.picture = imgBaseUrl + 'tance2.png';
        data.onAlarm.picture = imgBaseUrl + 'tance3.png';
        data.onDisconnected.picture = imgBaseUrl + 'tance4.png';
        this.attr({
            userData: data
        });

        this.image.on("click", function () {
            safeBasic.clickMethod(_this);
        });
        // 移动
        this.on("move", function () {
            // componentMove(thiss);
        });
        // 悬浮窗
        this.image.onMouseEnter = function () {
            // if (thiss.userData.ShowHint) {
            //     showTooltips(thiss);
            // }
        };
        this.image.onMouseLeave = function () {
            // $canvas.comTooltips.hide();
        };


    },
    onTimer: function () {
        setComponentOptions.flashMethod(this);
    }
});



// 默认组件(系统默认提供)
var safeBasic = {
    // 自定义控件属性
   width:36,
   height:36,
    defaultset:JSON.stringify({
        bgColor:'#FFFFFF',
        resizeable:false,
        width:36,
        height:36,
        stroke:0,
    }),

    labelset:JSON.stringify({
        text:'呵呵',
        fontFamily: '微软雅黑',
        padding:{ left: 0, right: 0, top: 0, bottom: 0 },
        visible:true,
    }),
  
    safeData: JSON.stringify({
        type: "defaultComponent", //类型
        custom: { 
            newCreat:true,//  用于在拖拽组件时判断(是否新拖拽的控件)            
            editSatus:'defaults',//组件正在编辑的属性(default/ontrue/onfalse/onalarm/ondisc)  
        },
        tag: {
            tag_id: -1,
            tag_type: -1,
            tag_name: "",
            bingding_status: 0, //0 默认状态,1 已经绑定,2 绑定错误
            status:'default',//该组件绑定tag 的状态(用于监控画面)    
        },
       
        routine: {
            name: '',
            description: '', //组件描述
            visible: false, //隐藏组件(setAlpha(0))
            enable: false, //不可用
            accessLevel: 8, //访问等级 0~15
            hint: { //hover 说明
                flag: false, //是否显示
                hintText: '' //text
            },
            caption: { //组件标题
                flag: false, //是否显示
                capText: 'label' //内容
            },
            readOnly: false, //组件是否为只读
        },
        defaults:{//该属性用于存储 控件初始化时的状态
            lineWidth: 1,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onTrue: {
            lineWidth: 1,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onFalse: {
            lineWidth: 1,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onAlarm: {
            lineWidth: 1,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onDisconnected: {
            lineWidth: 1,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            blinking: false,
            picture: ''
        }
    }),
    clickMethod: function (component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.safeHideDiv = true;
        // 基本
        setComponentOptions.basePublicSet(component);

        setComponentOptions.basicSet(component);
        // 大小
        setComponentOptions.componentSize(component);
        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);

        // 标题
        setComponentOptions.componentCaption(component);

        setComponentOptions.setComponentFlagTrue();
    },
    // 设置视频地址
    vlcValue:function(component){

    }
}