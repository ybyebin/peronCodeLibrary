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



  getGroupNameAndViewData(sessionStorage.getItem("view_id"), canvas,'edit');

});