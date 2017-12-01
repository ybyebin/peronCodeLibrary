/** 
 * 工具栏
 * @author yb
 * @extend Class
 * @Data 
 */

// 全局画布
var imageCanvas = '';


// 声明命名空间
var example = {};

example.Application = Class.extend({
    NAME: "example.Application",

    init: function() {
        this.view = new example.View("canvas");
        this.toolbar = new example.Toolbar("toolbar", this.view);

    }
});

example.View = draw2d.Canvas.extend({
    init: function(id) {
        this._super(id);

        this.setScrollArea("#" + id);

        this.currentDropConnection = null;
    },
    onDrag: function(droppedDomNode, x, y) {

    },
    onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey) {


       
        var type = $(droppedDomNode).data("shape");
        console.log("这里是:::" + type);
        var figure = eval("new " + type + "();");
        console.log(figure.getId());
        console.log(figure.getUserData())
        var _this = figure;
        // create a command for the undo/redo support
        if (type == "LineComponent") {
            var thisx = x;
            figure.setStartPoint(x, y);
            figure.setEndPoint(x - 70, y + 70);
            var command = new draw2d.command.CommandAdd(this, figure, x, y);
            this.getCommandStack().execute(command);
           
        } else {
            var command = new draw2d.command.CommandAdd(this, figure, x, y);
            this.getCommandStack().execute(command);
        }

        setTimeout(function(){
            _this.userData.custom.newCreat =false;
        },500);

    }
});

/** 
 * 工具栏
 * @author yb
 * @extend draw2d.Canvas
 * @Data 
 */
example.Toolbar = Class.extend({

    init: function(elementId, view) {
        this.html = $("#" + elementId);
        this.view = view;
        view.getCommandStack().addEventListener(this);

        // 为删除按钮的选中状态注册一个选中监听
        view.on("select", $.proxy(this.onSelectionChanged, this));
        // 保存按钮
        this.saveButton = $(' <li><span class="baocun"></span><p>保存</p></li>');
        // this.saveButton = $('<label class = "toolbar-save"><img class=" baocun-img " src="images/img/baocun.png"><br>保存</label>');
        this.html.append(this.saveButton);
        this.saveButton.button().click($.proxy(function() {
            var subdataArray = []; //全局按钮
            var writer = new draw2d.io.json.Writer();
            writer.marshal(this.view, function(json) {
                console.log(JSON.stringify(json, null, 2))
                if (json.length == 0) {
                    layer.msg("未绑定任何控件");
                } else {

                    $('.have-btn button').each(function(index, element) {
                        console.log("ID为:" + $(element).attr('id'));
                        console.log("ID为:" + $(element).data('name'));

                        var dic = {
                            id: Number($(element).attr('id')),
                            name: $(element).data('name'),
                            tag_id: Number($(element).data('tag-id')),
                            tag_type: Number($(element).data('tag-type')),
                            tag_name: $(element).data('tag-name'),
                            bingding_status: Number($(element).data('bingding-status')),
                            readonly: $(element).data('readonly'),
                        }
                        subdataArray.push(dic);
                    });
                    console.log("全局按钮数据:" + JSON.stringify(subdataArray, null, 2))
                    var canvasData = {
                        canvas: json,
                        subCanvas: subdataArray,
                    }
                    var data = {
                        view_data: JSON.stringify(canvasData),
                        id: sessionStorage.getItem("view_id"),
                        background_img_url: $("#myBgimage").data("url"),
                        background_color: rgb2hex($("#canvas").css("background-color")),
                    }

                    console.log("上传数据为================:" + JSON.stringify(data, null, 2))


                    // 此处上传用户设置好的数据
                    $.ajax({
                        url: '/api/view/1',
                        type: 'PUT',
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
                            if (data.success == true) {
                                layer.msg("数据保存成功");
                            } else {
                                layer.msg("数据保存失败原因:" + data.error_message);
                                console.log("保存失败原因:" + JSON.stringify(data, null, 2))
                            }
                        },
                        error: function(data) {
                            $(".loading").hide();
                            returnLogIn(data);
                            layer.msg("数据保存失败原因:" + data.error_message);
                            console.log("保存失败原因:" + JSON.stringify(data, null, 2))
                        }
                    });
                }

            });


        }, this)).button("option", "disabled", false);


        // 添加删除按钮
        // 
        // 
        this.deleteButton = $(' <li><span class="delete"></span><p>删除</p></li>');
        // this.deleteButton = $('<label class = "toolbar-delete"><img class=" delete-img " src="images/img/delete.png"><br>删除</label>');
        this.html.append(this.deleteButton);
        this.deleteButton.button().click($.proxy(function() {


            var node = this.view.getPrimarySelection();
            if (node !== null) {
                var command = new draw2d.command.CommandDelete(node);
                this.view.getCommandStack().execute(command);

            }

        }, this)).button("option", "disabled", true);

        // 清除画布
        this.clearButtons = $(' <li><span class="clear"></span><p>全部清除</p></li>');
        // this.clearButtons = $('<label class = "toolbar-wangge"><img class=" wangge-img " src="images/img/clear.png"><br>全部清除</label>');
        this.html.append(this.clearButtons);
        this.clearButtons.button().click($.proxy(function() {
            var thisbtn = this;
            layer.open({
                title: ['清除画面', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
                type: 1,
                skin: 'layui-primary', //加上边框
                area: ['900px', '200px'], //宽高
                content: $("#deleteAllcomAndcanvas"), //捕获的元素,
                shift: 2,
                move: false,
                btn: ['确定', '放弃'],
                yes: function(index) {
                    thisbtn.view.clear(); //清除主画布
                    $("#myBgimage").attr("src", "images/logo-text.png"); //清除用户上传的图片
                    $("#canvas").css("background-color", "");
                    $('#canvas-img').val('');
                    $('#myBgimage').data("url", '');
                    $('.canvas-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
                    layer.close(index);
                },
                btn2: function(index) {
                    layer.close(index);
                },
            });

        }, this)).button("option", "disabled", false);



        // 添加撤销按钮及回调
        //	
        this.undoButton = $(' <li><span class="chexiao"></span><p>撤销</p></li>');
        // this.undoButton = $('<label class = "toolbar-undo"><img class=" chexiao-img " src="images/img/chexiao.png"><br>撤销</label>');
        this.html.append(this.undoButton);
        this.undoButton.button().click($.proxy(function() {
            this.view.getCommandStack().undo();
        }, this)).button("option", "disabled", true);

        // 添加重做按钮及回调
        //
        this.redoButton = $(' <li><span class="huifu"></span><p>恢复</p></li>');
        // this.redoButton = $('<label class = "toolbar-redo"><img class=" fanhui-img " src="images/img/fanhui.png"><br>恢复</label>');
        this.html.append(this.redoButton);
        this.redoButton.button().click($.proxy(function() {
            this.view.getCommandStack().redo();
        }, this)).button("option", "disabled", true);


    },

    /**
     * @method
     * Called if the selection in the cnavas has been changed. You must register this
     * class on the canvas to receive this event.
     * 
     * @param {draw2d.Figure} figure
     */
    onSelectionChanged: function(emitter, figure) {
        this.deleteButton.button("option", "disabled", figure === null);
    },

    /**
     * @method
     * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
     * can be used to identify the type of event which has occurred.
     * 
     * @template
     * 
     * @param {draw2d.command.CommandStackEvent} event
     **/
    stackChanged: function(event) {
        this.undoButton.button("option", "disabled", !event.getStack().canUndo());
        this.redoButton.button("option", "disabled", !event.getStack().canRedo());
    }
});



/**
 * [复制控件]
 * @param  {[type]} )     
 * @param  {[type]} 
 * @return {[type]}                       
 */
var CopyInterceptorPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({
    NAME: "CopyInterceptorPolicy",

    init: function() {
        this._super();

        this.cloneOnDrag = false;
    },

    /**
     * @method
     * 
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown: function(canvas, x, y, shiftKey, ctrlKey) {
        this.cloneOnDrag = shiftKey;
        this._super(canvas, x, y, shiftKey, ctrlKey);
    },

    /**
     * Copy the selected figure if the user start dragging the selection.
     * 
     */
    onMouseDrag: function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
        if (!((this.mouseDraggingElement instanceof draw2d.ResizeHandle) || (this.mouseDraggingElement instanceof draw2d.Port))) {
            if (this.cloneOnDrag === true && this.mouseDraggingElement !== null) {
                // get the current position of the selected shape
                var pos = this.mouseDraggingElement.getPosition();

                // cancel the current drag&drop operation
                this.mouseDraggingElement.onDragEnd(pos.x, pos.y, false, false);

                // clone the selection
                this.mouseDraggingElement = this.mouseDraggingElement.clone();
                // add the clone to the canvas and start dragging of the clone
                canvas.add(this.mouseDraggingElement, pos);
                if (this.mouseDraggingElement.userData.types === 'conduitCompontent') {
                    this.mouseDraggingElement.resetPorts();
                }
                // select the cloned shape
                this.select(canvas, this.mouseDraggingElement);

                // start dragging if the clone accept this operation
                this.mouseDraggingElement.onDragStart(pos.x, pos.y, false, false);
            }
        }

        this.cloneOnDrag = false;

        this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey);
    }
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
            // source: sourcePort,
            // target: targetPort,
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