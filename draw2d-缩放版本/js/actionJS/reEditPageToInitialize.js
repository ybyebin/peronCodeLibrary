var pageOne = "页面1";
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

	var app = new example.Application();
	var canvas = app.view; //主画布
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

	canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
	// canvas.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
	imageCanvas = canvas;

	canvas.getCommandStack().addEventListener(function(e) {
		if (e.isPostChangeEvent()) {
			displayJSON(canvas);
		}
	});




	getGroupNameAndViewName(sessionStorage.getItem("view_id"), canvas);


var data= [
  {
    "type": "rectangleComponent",
    "id": "cc3e9bd5-2500-fe01-a5c5-44cb4b12ae93",
    "x": 284.953125,
    "y": 51,
    "width": 50,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "havepoint": "",
      "name": "矩形0",
      "types": "basicComponent",
      "proportion": null,
      "Description": "",
      "Visible": true,
      "Enable": false,
      "AccessLevel": 8,
      "ShowHint": false,
      "Hint": "",
      "Tag": {
        "tag_id": -1,
        "tag_type": -1,
        "tag_name": "",
        "bingding_status": 0
      },
      "value": "",
      "Readonly": false,
      "Blinking": false,
      "BlinkingStroke": 1,
      "BlinkingColor": "#D8D8D8",
      "DashArray": null,
      "BlinkingType": "style",
      "onTrue": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "FillColor": "#35C99D",
        "alpha": 1,
        "Blinking": false
      },
      "onFalse": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onAlarm": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onDisconnected": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      }
    },
    "cssClass": "rectangleComponent",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "a0018d60-4b5b-4a30-e479-75ebf406d1de",
        "width": 10,
        "height": 10,
        "alpha": 0.25,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_InputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "input0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "e67cc701-8b94-905c-6bd2-2c40e162103f",
        "width": 10,
        "height": 10,
        "alpha": 0.25,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_OutputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "output0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      }
    ],
    "bgColor": "#4D90FE",
    "color": "#000000",
    "stroke": 0,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "RoundedRectangleComponent",
    "id": "d6f9c2f7-3dc0-1d0c-4655-7358fe847fce",
    "x": 423.953125,
    "y": 92,
    "width": 50,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "havepoint": "",
      "name": "圆角矩形0",
      "types": "basicComponent",
      "proportion": null,
      "Description": "",
      "Visible": true,
      "Enable": false,
      "AccessLevel": 7,
      "ShowHint": false,
      "Hint": "",
      "Tag": {
        "tag_id": -1,
        "tag_type": -1,
        "tag_name": "",
        "bingding_status": 0
      },
      "value": "",
      "Readonly": false,
      "Blinking": false,
      "BlinkingStroke": 1,
      "BlinkingColor": "#D8D8D8",
      "DashArray": null,
      "BlinkingType": "style",
      "onTrue": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onFalse": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onAlarm": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onDisconnected": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      }
    },
    "cssClass": "RoundedRectangleComponent",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "84d44116-ca9f-301d-36ec-e7fefa7b08da",
        "width": 10,
        "height": 10,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_InputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "input0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "625afc8d-1eb2-a85e-190b-b8395b238ee3",
        "width": 10,
        "height": 10,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_OutputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "output0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      }
    ],
    "bgColor": "#35C99D",
    "color": "#000000",
    "stroke": 0,
    "radius": 10,
    "dasharray": null
  },
  {
    "type": "rectangleComponent",
    "id": "f5420048-031b-da52-32a0-3a2ba085ac9c",
    "x": 203.953125,
    "y": 152,
    "width": 50,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "havepoint": "",
      "name": "矩形0",
      "types": "basicComponent",
      "proportion": null,
      "Description": "",
      "Visible": true,
      "Enable": false,
      "AccessLevel": 8,
      "ShowHint": false,
      "Hint": "",
      "Tag": {
        "tag_id": -1,
        "tag_type": -1,
        "tag_name": "",
        "bingding_status": 0
      },
      "value": "",
      "Readonly": false,
      "Blinking": false,
      "BlinkingStroke": 1,
      "BlinkingColor": "#D8D8D8",
      "DashArray": null,
      "BlinkingType": "style",
      "onTrue": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "FillColor": "#35C99D",
        "alpha": 1,
        "Blinking": false
      },
      "onFalse": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onAlarm": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      },
      "onDisconnected": {
        "LineWidth": 1,
        "LineColor": "#35C99D",
        "LineStyle": null,
        "alpha": 1,
        "FillColor": "#35C99D",
        "Blinking": false
      }
    },
    "cssClass": "rectangleComponent",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "5e26a0a5-6202-7c60-3803-c7b775d84cf9",
        "width": 10,
        "height": 10,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_InputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "input0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "fe6fc764-df9b-d671-17fe-867df89da918",
        "width": 10,
        "height": 10,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_OutputPort",
        "bgColor": "#4F6870",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "output0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      }
    ],
    "bgColor": "#4D90FE",
    "color": "#000000",
    "stroke": 0,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "draw2d.Connection",
    "id": "e734d2a7-e3dd-39cd-da7c-9b1f2abccc7f",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_Connection",
    "stroke": 1.35,
    "color": "#68C9FF",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 334.953125,
        "y": 76
      },
      {
        "x": 379.453125,
        "y": 76
      },
      {
        "x": 379.453125,
        "y": 117
      },
      {
        "x": 423.953125,
        "y": 117
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 3
    },
    "source": {
      "node": "cc3e9bd5-2500-fe01-a5c5-44cb4b12ae93",
      "port": "output0"
    },
    "target": {
      "node": "d6f9c2f7-3dc0-1d0c-4655-7358fe847fce",
      "port": "input0"
    }
  }
]
	var reader = new draw2d.io.json.Reader();
		reader.unmarshal(canvas, data);

});

/**
 * [打印 控件数据 ----------调试用]
 * @param  {[type]} canvas [description]
 * @return {[type]}        [description]
 */
function displayJSON(canvas) {
	var writer = new draw2d.io.json.Writer();
	writer.marshal(canvas, function(json) {
		console.log('画布数据:' + JSON.stringify(json, null, 2));

		// localStorage.setItem("MainCanvasTemporaryData", JSON.stringify(json, null, 2)); //存储图标

	});
}

/**
 * [获取画面名称 和 画面所在组]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getGroupNameAndViewName(id, canvas) {
	var loading = $(".loading");

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
					// 此处添加  头部的  系统名称和 画面名称
				if (data.data !== null) {
					$('.go-subsys span').text(sessionStorage.getItem("viewGroupeName"));
					// $('.go-subsys span').text(unescape(getRequest.name));
					$('.group-name').text(data.data.name);
					var bg_img_url = data.data.background_img_url;
					if (bg_img_url === null || bg_img_url === '') {} else {
						$("#myBgimage").attr("src", bg_img_url);
						$("#myBgimage").data("url", bg_img_url);
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
						$('#comp-offsetx').val('');
						$('#comp-offsety').val('');

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

// 还原数据时,在画布找到 控件
function getCanvasNode(id) {
	var node = imageCanvas.getFigure(id);
	var nodeLine = imageCanvas.getLine(id);
	if (node !== null) {
		return node;
	} else if (nodeLine !== null) {
		return nodeLine;
	}


}