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
						// $("#myBgimage").attr("src", bg_img_url);
						$('#myBgimage').css('background-image','url('+bg_img_url+')');
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
							var obj = '<p><button id="' + subCanvas[i].id + '" data-tag-id="' + subCanvas[i].tag_id + '" data-tag-name="' + subCanvas[i].tag_name + '" data-tag-type="' + subCanvas[i].tag_type + '" data-bingding-status="' + subCanvas[i].bingding_status + '" data-readonly="' + subCanvas[i].readonly + '" data-name="' + subCanvas[i].name + '">' + subCanvas[i].name + '</button><img src="images/delete.png"></p>';
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