var canvas = document.getElementById('canvas'),
    stage = new createjs.Stage(canvas);

var stageWidth = canvas.width;
var stageHeight = canvas.height;

var characterWidth = 75;
var characterHeight = 96;

var spritesheet;
var charactor;

window.onload = function() {

    spritesheet = new createjs.SpriteSheet({
        'images': ['http://cdn.gbtags.com/gblibraryassets/libid108/charactor.png'],
        'frames': { "height": 96, "count": 10, "width": 75 }
    });

    charactor = new createjs.Sprite(spritesheet);
    charactor.x = (stageWidth - characterWidth) / 2;
    charactor.y = (stageHeight - characterHeight) / 2;

    stage.addChild(charactor);

    charactor.play();

    /*
     *  以下代码生成了tween动画人物相关效果
     */

    // 生成上下移动人物效果（一次性）
    createjs.Tween.get(charactor, { loop: false })
        .to({ y: 150 }, 500, createjs.Ease.quadInOut)
        .to({ y: 50 }, 500, createjs.Ease.quadInOut)
        .call(a);

    // 生成人物左右移动效果（无限循环）
    //createjs.Tween.get(charactor, {loop:true})
    //  .wait(3000)
    // .call(charactor.gotoAndStop, [5], charactor) 
    //.wait(300)
    // .to({x:450}, 1200, createjs.Ease.backInOut) 
    //.call(charactor.gotoAndStop, [0], charactor)
    //.wait(2000)
    //.call(charactor.gotoAndStop, [5], charactor)
    // .wait(300)
    // .to({x:(stageWidth - characterWidth)/2}, 500, createjs.Ease.backInOut)
    //  .call(charactor.gotoAndStop, [0], charactor);


    createjs.Ticker.setFPS(35);
    createjs.Ticker.addEventListener("tick", tick);

    function tick() {
        stage.update();
    }


    function a() {
        circle = new createjs.Shape();
        circle.graphics.f("red").dc(0, 0, 50);
        circle.x = 0;
        circle.y = 100;
        stage.addChild(circle);
        // createjs.Tween.get(circle,{loop:true}).to({x:1000},1000); 

        createjs.Tween.get(circle, { loop: false }).to({ x: 300 }, 2000)
            .to({ y: 400, alpha: 0.2 }, 2000)
            .to({ x: 100, alpha: 1, scaleX: 1.5, scaleY: 1.5 }, 2000)
            .to({ y: 300, scaleX: 1, scaleY: 1 }, 2000)
            .call(function() {
                stage.removeChild(circle);
            });


        // stage.update();
    }
};