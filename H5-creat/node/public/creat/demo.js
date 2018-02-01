var stage = new createjs.Stage("canvas");
// var image = new createjs.Bitmap("imagePath.png");
var container = new createjs.Container();


// var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 200, 200);
// var shape = new createjs.Shape(graphics);

//  stage.addChild(shape);
stage.addChild(container);
//  createjs.Ticker.addEventListener("tick", handleTick);
//  function handleTick(event) {
//      image.x += 10;
//      stage.update();
//  }


var queue = new createjs.LoadQueue();

queue.on("fileload", handleFileLoad, this);
queue.on("complete", handleComplete, this);
queue.on("progress", handleFileProgress, this);

queue.loadManifest([
    { src: "image/Icon-1024.png", id: "a" },
    { src: "image/startbg.jpg", id: "b" },
    { src: "image/cpbg.jpg", id: "c" },
    { src: "image/hzbj.jpg", id: "d" }

]);

function handleFileLoad(event) {
    console.log("完成:========" + event)

    var item = event.item; // A reference to the item that was passed in to the LoadQueue
    var type = item.type;

    // Add any images to the page body.
    if (type == createjs.LoadQueue.IMAGE) {
        // document.body.appendChild(event.result);
    }
}

function handleFileProgress(e) {
    // console.log('查看e.loaded:'+e.loaded)
    // console.log('查看e.total:'+e.total)
    console.log('查看e.progress:' + e.progress)
}

function handleComplete(e) {
    console.log('完成')

    var a = queue.getResult('a'),
        b = queue.getResult('b'),
        c = queue.getResult('c'),
        d = queue.getResult('d');

    console.log("宽度:" + a.width)
    console.log("高度:" + a.height)
        //    document.body.appendChild(a);
    var bitmap = new createjs.Bitmap(a);
    var bitmap2 = new createjs.Bitmap(b);
    container.addChild(bitmap);
    // container.addChild(bitmap2);
    bitmap.x = 10;
    bitmap.y = 10;
    // bitmap.scaleX = 2;
    // bitmap.scaleY = .5;
    // console.log(bitmap.getBounds())   
    // bitmap.scaleY = .2;


    stage.update();




    setTimeout(function() {
            // var can = document.getElementById('canvas');
            console.log(1)
                // can.style.width = 500;
                // can.setAttribute("width",500)
                // canvas.setAttribute("height",height)

            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", handleTick);
            circle = new createjs.Shape();
            circle.graphics.f("red").dc(0, 0, 50);
            circle.x = 0;
            circle.y = 100;
            stage.addChild(circle);
            // createjs.Tween.get(circle,{loop:true}).to({x:1000},1000); 

            createjs.Tween.get(circle, { loop: true }).to({ x: 300 }, 2000)
                .to({ y: 400, alpha: 0.2 }, 2000)
                .to({ x: 100, alpha: 1, scaleX: 1.5, scaleY: 1.5 }, 2000)
                .to({ y: 100, scaleX: 1, scaleY: 1 }, 2000);

            createjs.Tween.get(bitmap, { loop: true }).to({ x: 500 }, 1000);
            // createjs.Tween.get(bitmap).to({x:100}, 500, createjs.Ease.linear);
            stage.update();
        }, 3000)
        // con
}


function handleTick(event) {
    stage.update();
}

queue.load();