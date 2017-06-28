var pageOne = "页面1";
var imageCanvas;
$(window).load(function() {

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

	 app.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: function(){
            return new HoverConnection();
        }
      }));

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
	canvas.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
	imageCanvas = canvas;
	
	 canvas.installEditPolicy(new CopyInterceptorPolicy());


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
		console.log('画布数据:'+JSON.stringify(json, null, 2));	
	});
}
/**
 * [获取画面名称 和 画面所在组]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function getGroupNameAndViewName(id) {
	var loading = $(".loading");
	$.ajax({
		url: '/api/view/'+id,
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
				$('.go-subsys span').text(sessionStorage.getItem("viewGroupeName"));				
				if (data.data!== null) {
					$('.group-name').text(data.data.name);	
				}		
			} else {
				layer.msg("获取画面数据失败:" + data.error_message);
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