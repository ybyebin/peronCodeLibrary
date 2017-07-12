/** 
 * 工具栏
 * @author yb
 * @extend Class
 * @Data 
 */

// 画布
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
		console.log("哈哈:" + figure.getId());
		switch (type) {
			case "rectangleComponent":
				figure.getUserData().name = figure.getUserData().name + rectangle;
				rectangle += 1;
				break;
			case "RoundedRectangleComponent":
				figure.getUserData().name = figure.getUserData().name + RoundedRectangle;
				RoundedRectangle += 1;
				break;
			case "EllipseComponent":
				figure.getUserData().name = figure.getUserData().name + Ellipse;
				Ellipse += 1;
				break;
			case "polygonComponent":
				figure.getUserData().name = figure.getUserData().name + polygon;
				polygon += 1;
				break;
			case "LineComponent":
				figure.getUserData().name = figure.getUserData().name + linenum;
				linenum += 1;
				break;
			case "conduitCompontent":
				figure.getUserData().name = figure.getUserData().name + conduitnum;
				linenum += 1;
				break;
			case "forRightComponent":
				figure.getUserData().name = figure.getUserData().name + forRight;
				forRight += 1;
				break;
			case "forLeftComponent":
				figure.getUserData().name = figure.getUserData().name + forLeft;
				forLeft += 1;
				break;
			case "forUpComponent":
				figure.getUserData().name = figure.getUserData().name + forUp;
				forUp += 1;
				break;
			case "forDownComponent":
				figure.getUserData().name = figure.getUserData().name + forDown;
				forDown += 1;
				break;
			case "BothArrowHComponent":
				figure.getUserData().name = figure.getUserData().name + BothArrowH;
				BothArrowH += 1;
				break;
			case "BothArrowVComponent":
				figure.getUserData().name = figure.getUserData().name + BothArrowV;
				BothArrowV += 1;
				break;
			case "LabelComponent":
				figure.getUserData().name = figure.getUserData().name + labelnum;
				figure.getUserData().Caption = figure.getUserData().Caption + labelnum;
				figure.label.setText(figure.getUserData().Caption);
				labelnum += 1;
				break;
			case "buttonComponent":
				figure.getUserData().name = figure.getUserData().name + buttons;
				figure.getUserData().Caption = figure.getUserData().Caption + buttons;
				figure.label.setText(figure.getUserData().Caption);
				buttons += 1;
				break;
			case "textComponent":
				figure.getUserData().name = figure.getUserData().name + textnum;
				figure.getUserData().Caption = figure.getUserData().Caption + textnum;
				figure.label.setText(figure.getUserData().Caption);
				textnum += 1;
				break;
			case "imageComponent":
				figure.getUserData().name = figure.getUserData().name + imagenum;
				figure.getUserData().Caption = figure.getUserData().Caption + imagenum;
				figure.label.setText(figure.getUserData().Caption);
				imagenum += 1;
				break;
			case "switchComponent":
				figure.getUserData().name = figure.getUserData().name + switchs;
				figure.getUserData().Caption = figure.getUserData().Caption + switchs;
				figure.label.setText(figure.getUserData().Caption);
				switchs += 1;
				break;
			case "pipingComponent":
				figure.getUserData().name = figure.getUserData().name + piping;
				figure.getUserData().Caption = figure.getUserData().Caption + piping;
				figure.label.setText(figure.getUserData().Caption);
				piping += 1;
				break;
			case "WarninglampComponent":
				figure.getUserData().name = figure.getUserData().name + Warninglamp;
				figure.getUserData().Caption = figure.getUserData().Caption + Warninglamp;
				figure.label.setText(figure.getUserData().Caption);
				Warninglamp += 1;
				break;
			case "blowerfanComponent":
				figure.getUserData().name = figure.getUserData().name + blowerfan;
				figure.getUserData().Caption = figure.getUserData().Caption + blowerfan;
				figure.label.setText(figure.getUserData().Caption);
				blowerfan += 1;
				break;
			case "exhaustfanComponent":
				figure.getUserData().name = figure.getUserData().name + exhaustfan;
				figure.getUserData().Caption = figure.getUserData().Caption + exhaustfan;
				figure.label.setText(figure.getUserData().Caption);
				exhaustfan += 1;
				break;
			case "bengComponent":
				figure.getUserData().name = figure.getUserData().name + beng;
				figure.getUserData().Caption = figure.getUserData().Caption + beng;
				figure.label.setText(figure.getUserData().Caption);
				beng += 1;
				break;
			case "ElectricTwoWayValveComponent":
				figure.getUserData().name = figure.getUserData().name + ElectricTwoWayValve;
				figure.getUserData().Caption = figure.getUserData().Caption + ElectricTwoWayValve;
				figure.label.setText(figure.getUserData().Caption);
				ElectricTwoWayValve += 1;
				break;
			case "SolenoidValveComponent":
				figure.getUserData().name = figure.getUserData().name + SolenoidValve;
				figure.getUserData().Caption = figure.getUserData().Caption + SolenoidValve;
				figure.label.setText(figure.getUserData().Caption);
				SolenoidValve += 1;
				break;
			case "ElectricButterflyValvesComponent":
				figure.getUserData().name = figure.getUserData().name + ElectricButterflyValves;
				figure.getUserData().Caption = figure.getUserData().Caption + ElectricButterflyValves;
				figure.label.setText(figure.getUserData().Caption);
				ElectricButterflyValves += 1;
				break;
			case "AirFiltrationComponent":
				figure.getUserData().name = figure.getUserData().name + AirFiltration;
				figure.getUserData().Caption = figure.getUserData().Caption + AirFiltration;
				figure.label.setText(figure.getUserData().Caption);
				AirFiltration += 1;
				break;
			case "AirHeatingComponent":
				figure.getUserData().name = figure.getUserData().name + AirHeating;
				figure.getUserData().Caption = figure.getUserData().Caption + AirHeating;
				figure.label.setText(figure.getUserData().Caption);
				AirHeating += 1;
				break;
			case "AirCoolerComponent":
				figure.getUserData().name = figure.getUserData().name + AirCooler;
				figure.getUserData().Caption = figure.getUserData().Caption + AirCooler;
				figure.label.setText(figure.getUserData().Caption);
				AirCooler += 1;
				break;
			case "HumidifierComponent":
				figure.getUserData().name = figure.getUserData().name + Humidifier;
				figure.getUserData().Caption = figure.getUserData().Caption + Humidifier;
				figure.label.setText(figure.getUserData().Caption);
				Humidifier += 1;
				break;
			case "controlPanelComponent":
				figure.getUserData().name = figure.getUserData().name + controlPanel;
				figure.getUserData().Caption = figure.getUserData().Caption + controlPanel;
				figure.label.setText(figure.getUserData().Caption);
				controlPanel += 1;
				break;
			case "FluorescentLampComponent":
				figure.getUserData().name = figure.getUserData().name + FluorescentLamp;
				figure.getUserData().Caption = figure.getUserData().Caption + FluorescentLamp;
				figure.label.setText(figure.getUserData().Caption);
				FluorescentLamp += 1;
				break;
			case "LEDComponent":
				figure.getUserData().name = figure.getUserData().name + LED;
				figure.getUserData().Caption = figure.getUserData().Caption + LED;
				figure.label.setText(figure.getUserData().Caption);
				LED += 1;
				break;
			case "IncandescentComponent":
				figure.getUserData().name = figure.getUserData().name + Incandescent;
				figure.getUserData().Caption = figure.getUserData().Caption + Incandescent;
				figure.label.setText(figure.getUserData().Caption);
				Incandescent += 1;
				break;
			case "MetalHalideComponent":
				figure.getUserData().name = figure.getUserData().name + MetalHalide;
				figure.getUserData().Caption = figure.getUserData().Caption + MetalHalide;
				figure.label.setText(figure.getUserData().Caption);
				MetalHalide += 1;
				break;
			case "temperatureComponent":
				figure.getUserData().name = figure.getUserData().name + temperature;
				figure.getUserData().Caption = figure.getUserData().Caption + temperature;
				figure.label.setText(figure.getUserData().Caption);
				temperature += 1;
				break;
			case "humidityComponent":
				figure.getUserData().name = figure.getUserData().name + humidity;
				figure.getUserData().Caption = figure.getUserData().Caption + humidity;
				figure.label.setText(figure.getUserData().Caption);
				humidity += 1;
				break;
			case "pressureComponent":
				figure.getUserData().name = figure.getUserData().name + pressure;
				figure.getUserData().Caption = figure.getUserData().Caption + pressure;
				figure.label.setText(figure.getUserData().Caption);
				pressure += 1;
				break;
			case "differentialPressureComponent":
				figure.getUserData().name = figure.getUserData().name + differentialPressure;
				figure.getUserData().Caption = figure.getUserData().Caption + differentialPressure;
				figure.label.setText(figure.getUserData().Caption);
				differentialPressure += 1;
				break;
			case "liquidComponent":
				figure.getUserData().name = figure.getUserData().name + liquid;
				figure.getUserData().Caption = figure.getUserData().Caption + liquid;
				figure.label.setText(figure.getUserData().Caption);
				liquid += 1;
				break;
			case "electricComponent":
				figure.getUserData().name = figure.getUserData().name + electric;
				figure.getUserData().Caption = figure.getUserData().Caption + electric;
				figure.label.setText(figure.getUserData().Caption);
				electric += 1;
				break;
			case "VoltageComponent":
				figure.getUserData().name = figure.getUserData().name + Voltage;
				figure.getUserData().Caption = figure.getUserData().Caption + Voltage;
				figure.label.setText(figure.getUserData().Caption);
				Voltage += 1;
				break;
			case "frequencyComponent":
				figure.getUserData().name = figure.getUserData().name + frequency;
				figure.getUserData().Caption = figure.getUserData().Caption + frequency;
				figure.label.setText(figure.getUserData().Caption);
				frequency += 1;
				break;
			case "activePowerComponent":
				figure.getUserData().name = figure.getUserData().name + activePower;
				figure.getUserData().Caption = figure.getUserData().Caption + activePower;
				figure.label.setText(figure.getUserData().Caption);
				activePower += 1;
				break;
			case "ElectricityConsumptionComponent":
				figure.getUserData().name = figure.getUserData().name + ElectricityConsumption;
				figure.getUserData().Caption = figure.getUserData().Caption + ElectricityConsumption;
				figure.label.setText(figure.getUserData().Caption);
				ElectricityConsumption += 1;
				break;
			case "levelComponent":
				figure.getUserData().name = figure.getUserData().name + level;
				figure.getUserData().Caption = figure.getUserData().Caption + level;
				figure.label.setText(figure.getUserData().Caption);
				level += 1;
				break;
			case "GasComponent":
				figure.getUserData().name = figure.getUserData().name + Gas;
				figure.getUserData().Caption = figure.getUserData().Caption + Gas;
				figure.label.setText(figure.getUserData().Caption);
				Gas += 1;
				break;
			case "BroadcastComponent":
				figure.getUserData().name = figure.getUserData().name + Broadcast;
				figure.getUserData().Caption = figure.getUserData().Caption + Broadcast;
				figure.label.setText(figure.getUserData().Caption);
				Broadcast += 1;
				break;
			case "monitoringComponent":
				figure.getUserData().name = figure.getUserData().name + monitoring;
				figure.getUserData().Caption = figure.getUserData().Caption + monitoring;
				figure.label.setText(figure.getUserData().Caption);
				monitoring += 1;
				break;
			case "qiujiComponent":
				figure.getUserData().name = figure.getUserData().name + qiuji;
				figure.getUserData().Caption = figure.getUserData().Caption + qiuji;
				figure.label.setText(figure.getUserData().Caption);
				qiuji += 1;
				break;
			case "highqiujiComponent":
				figure.getUserData().name = figure.getUserData().name + highqiuji;
				figure.getUserData().Caption = figure.getUserData().Caption + highqiuji;
				figure.label.setText(figure.getUserData().Caption);
				highqiuji += 1;
				break;
			case "EntranceGuardComponent":
				figure.getUserData().name = figure.getUserData().name + EntranceGuard;
				figure.getUserData().Caption = figure.getUserData().Caption + EntranceGuard;
				figure.label.setText(figure.getUserData().Caption);
				EntranceGuard += 1;
				break;
			case "detectorComponent":
				figure.getUserData().name = figure.getUserData().name + detector;
				figure.getUserData().Caption = figure.getUserData().Caption + detector;
				figure.label.setText(figure.getUserData().Caption);
				detector += 1;
				break;
			default:

		}

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
		this.saveButton = $('<label class = "toolbar-save"><img class=" baocun-img " src="images/img/baocun.png"><br>保存</label>');
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
		this.deleteButton = $('<label class = "toolbar-delete"><img class=" delete-img " src="images/img/delete.png"><br>删除</label>');
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function() {


			var node = this.view.getPrimarySelection();
			if (node !== null) {
				var command = new draw2d.command.CommandDelete(node);
				this.view.getCommandStack().execute(command);

			}

		}, this)).button("option", "disabled", true);

		// 清除画布
		this.clearButtons = $('<label class = "toolbar-wangge"><img class=" wangge-img " src="images/img/clear.png"><br>全部清除</label>');
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
		this.undoButton = $('<label class = "toolbar-undo"><img class=" chexiao-img " src="images/img/chexiao.png"><br>撤销</label>');
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function() {
			this.view.getCommandStack().undo();
		}, this)).button("option", "disabled", true);

		// 添加重做按钮及回调
		//
		this.redoButton = $('<label class = "toolbar-redo"><img class=" fanhui-img " src="images/img/fanhui.png"><br>恢复</label>');
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



/**
 * [canvas 初始化]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function allCanvasinit(type) {
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

	var app = new example.Application();


	var canvas = app.view; //主画布
	// 边框阴影
	var filter = canvas.paper.createFilter();
	filter.createShadow(0, 0, 3, 0.3, "#000000");
	filter.element.setAttribute("x", "-35%");
	filter.element.setAttribute("y", "-35%");

	app.view.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
		createConnection: function() {
			return new HoverConnection();
		}
	}));


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

	canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
	// canvas.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
	imageCanvas = canvas;

	canvas.installEditPolicy(new CopyInterceptorPolicy());
	canvas.getCommandStack().addEventListener(function(e) {
		if (e.isPostChangeEvent()) {
			displayJSON(canvas);
		}
	});
	getGroupNameAndViewData(sessionStorage.getItem("view_id"), canvas, type);
}


/**
 * [获取画面名称 和 画面所在组 edit]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getGroupNameAndViewData(id, canvas, type) {
	var loading = $(".loading");
	var viewName = $('.view-name');

	// 系统名
	$('.go-subsys span').text(sessionStorage.getItem("viewGroupeName"));
	$.ajax({
		url: '/api/view/' + id,
		type: 'GET',
		beforeSend: function() {
			loading.show();
		},
		complete: function() {
			loading.hide();
		},
		success: function(data) {
			loading.hide();
			if (data.success) {
				console.log("请求到的数据:" + JSON.stringify(data, null, 2))
				switch (type) {
					case 'new':
						if (data.data !== null) {
							// 画面名字
							viewName.text(data.data.name);
						}
						break;
					case 'edit':
						if (data.data !== null) {
							// 画面名字							
							viewName.text(data.data.name);
							var bg_img_url = data.data.background_img_url;
							if (bg_img_url === null || bg_img_url === '') {
								layer.msg('无数据');
							} else {
								$('#myBgimage').css('background-image', 'url(' + e.target.result + ')').data("url", bg_img_url);
							}
							if (data.data.background_color !== null) {
								$("#canvas").css("background-color", data.data.background_color);
							}

							if (data.data.view_data !== null) {
								var canvasJson = JSON.parse(data.data.view_data).canvas;
								var subCanvas = JSON.parse(data.data.view_data).subCanvas;
								console.log(JSON.stringify(subCanvas, null, 2))
								for (var i in subCanvas) {

									$('.no-glo-btn').hide();
									var obj = '<p><button id="' + subCanvas[i].id + '" data-tag-id="' + subCanvas[i].tag_id + '" data-tag-name="' + subCanvas[i].tag_name + '" data-tag-type="' + subCanvas[i].tag_type + '" data-bingding-status="' + subCanvas[i].bingding_status + '" data-readonly="' + subCanvas[i].readonly + '" data-name="' + subCanvas[i].name + '">' + subCanvas[i].name + '</button><img src="img/delete.png"></p>';
									$('.have-btn #mCSB_2_container').append(obj);
								}

								var reader = new draw2d.io.json.Reader();
								reader.unmarshal(canvas, canvasJson);
								// 插件问题清空数据
								$canvas.comOffsetX.val('');
								$canvas.comOffsetY.val('');

								var writer = new draw2d.io.json.Writer();
								writer.marshal(canvas, function(json) {

									for (var i in json) {
										var node = getCanvasNode(json[i].id);
										if (node.userData.ShowCaption) {
											// 获取节点并更改标题    
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
										if (node.userData.types === 'conduitCompontent') {
											node.resetPorts();
										}

										if (node.image) {
											node.image.setHeight(node.getHeight());
											node.image.setWidth(node.getWidth());
										}
										if (node.userData.picture) {
											node.image.setPath(node.userData.picture);
											node.image.setHeight(node.getHeight());
											node.image.setWidth(node.getWidth());
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
										node.repaint();
									}

								});
							}

						} else {
							layer.msg('获取数据失败')
						}
						break;
					default:
						layer.msg('类型错误');
						break
				}


			} else {
				layer.msg(data.error_message);
				console.log("获取画面数据失败" + JSON.stringify(data, null, 2))
			}

		},
		error: function(data) {
			publicAjaxError(data);
		}
	});
}




/**
 * [打印 控件数据 ----------调试用]
 * @param  {[type]} canvas [description]
 * @return {[type]}        [description]
 */
function displayJSON(canvas) {
	var writer = new draw2d.io.json.Writer();
	writer.marshal(canvas, function(json) {
		console.log('画布数据:' + JSON.stringify(json, null, 2));
	});
}


/**
 *  还原数据时,在画布找到 控件]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getCanvasNode(id) {
	var node = imageCanvas.getFigure(id);
	var nodeLine = imageCanvas.getLine(id);
	if (node !== null) {
		return node;
	} else if (nodeLine !== null) {
		return nodeLine;
	}
}