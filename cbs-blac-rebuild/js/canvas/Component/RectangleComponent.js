/** 
 * @description [矩形]
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "rectangleComponent",
    init: function(attr) {
        this._super(attr);
        this.setResizeable(false);
        this.setSelectable(false);
        this.setDraggable(false);
        var thiss = this;
        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };

        this.getOutputPort(0).setVisible(false);
        this.getInputPort(0).setVisible(false);

        this.onDoubleClick = function() {

        };
        // 单击事件
        this.on("click", function() {

        });

    },

    onTimer: function() {
        monitoringVue.flashMethod(this);
    }


})


/** 
 * @description [圆角矩形]  
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "RoundedRectangleComponent",
    init: function(attr) {
        this._super(attr);

        this.setResizeable(false);
        this.setSelectable(false);
        this.setDraggable(false);
        var thiss = this;
        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };
        this.onDoubleClick = function() {};

        this.getOutputPort(0).setVisible(false);
        this.getInputPort(0).setVisible(false);
        // 选中
        this.on("click", function() {
           
        });

    },


    onTimer: function() {
        monitoringVue.flashMethod(this);
    }

})

/** 
 * @description [椭圆]  
 * @extend draw2d.shape.basic.Rectangle 
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
    NAME: "EllipseComponent",
    init: function(attr) {
        this._super(attr);
        this.setResizeable(false);
        this.setSelectable(false);
        this.setDraggable(false);
        var thiss = this;
        this.setRadius(25);
        this.setHeight(30);

        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };

        this.onDoubleClick = function() {};

        this.getOutputPort(0).setVisible(false);
        this.getInputPort(0).setVisible(false);

        this.on("click", function() {
        });
    },

    onTimer: function() {
        monitoringVue.flashMethod(this);
    }

});


/** 
 * @description [多边形]  
 * @extend draw2d.shape.basic.Polygon
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
    NAME: "polygonComponent",
    init: function(attr) {
        this._super(attr);
        this.setResizeable(false);
        this.setSelectable(false);
        this.setDraggable(false);

        var thiss = this;
        // 悬浮窗
        this.onMouseEnter = function() {
          
        };
        this.onMouseLeave = function() {
        };

        this.onDoubleClick = function() {};

        this.on("click", function() {
           
        });

    },
    onTimer: function() {
        monitoringVue.flashMethod(this);
    }

});


/** 
 * @description [右箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forRightComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);

        this.setSelectable(false);
        this.setDraggable(false);


        var thiss = this;

        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };


        this.onDoubleClick = function() {};

        this.on("click", function() {
            
        })

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");

    },
    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
});



/** 
 * @description [左箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forLeftComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        var thiss = this;
        this.setSelectable(false);
        this.setDraggable(false);

        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };
        this.onDoubleClick = function() {};

        this.on("click", function() {
           
        });


    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M30,20H20V30L0,15L20,0V10H30V20z");

    },
    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
});


/** 
 * @description [上箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forUpComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setSelectable(false);
        this.setDraggable(false);


        var thiss = this;
        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };

        this.onDoubleClick = function() {};

        this.on("click", function() {
           
        });
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M10,30V20H0L15,0L30,20H20V30H10z");
    },
    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
});


/** 
 * @description [下箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({

    NAME: "forDownComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setSelectable(false);
        this.setDraggable(false);

        var thiss = this;

        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };

        this.onDoubleClick = function() {

        };

        this.on("click", function() {

        });
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M10,0V10H0L15,30L30,10H20V0H10z");
    },
    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
});



/** 
 * @description [水平双箭头]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({

    NAME: "BothArrowHComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 50,
            height: 30
        }, attr), setter, getter);
        this.setSelectable(false);
        this.setDraggable(false);

        var thiss = this;

        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };
        this.onDoubleClick = function() {

        };

        this.on("click", function() {
           
        });



    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
    },
    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
});

/** 
 * @description [竖直双箭头]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({

    NAME: "BothArrowVComponent",
    init: function(attr, setter, getter) {
        this._super($.extend({
            width: 30,
            height: 50
        }, attr), setter, getter);

        this.setSelectable(false);
        this.setDraggable(false);
        var thiss = this;
        console.log("边框宽度" + this.getStroke());

        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };
        this.onDoubleClick = function() {
        };

        this.on("click", function() {
          
        });
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
    },
    onTimer: function() {

    }
});


// 管道
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
    NAME: "conduitCompontent",
    init: function(attr) {
        this._super(attr);
        this.setResizeable(false);
        this.setSelectable(false);
        this.setDraggable(false);
        var thiss = this;
        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };

    

        this.onDoubleClick = function() {

        };
        // 单击事件
        this.on("click", function() {
          
        });

    },

    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
})

var conduitCompontentV = draw2d.shape.node.HorizontalBus.extend({
    NAME: "conduitCompontentV",
    init: function(attr) {
        this._super(attr);
        this.setResizeable(false);
        this.setSelectable(false);
        this.setDraggable(false);
        var thiss = this;
        // 悬浮窗
        this.onMouseEnter = function() {
           
        };
        this.onMouseLeave = function() {
        };

        this.onDoubleClick = function() {

        };
        // 单击事件
        this.on("click", function() {
           
        });

    },

    onTimer: function() {
        monitoringVue.flashMethod(this);
    }
})