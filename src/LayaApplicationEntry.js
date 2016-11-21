/**
 * This is not a controller, having some codes for testing purpose
 */

//laya初始化
Laya.init(480, 852);
//FPS
Laya.Stat.show(0,0);
//设置适配模式
Laya.stage.scaleMode = "exactfit";
//设置剧中对齐
Laya.stage.alignH = "center";
//设置横屏
Laya.stage.screenMode = "vertical";

//加载图片
Laya.loader.load(["res/15.png", "res/-15.png","res/background.png","res/floor.png"], laya.utils.Handler.create(this, onLoaded), laya.utils.Handler.create(this, onLoading, null, false));
 
//加载进度
function onLoading(progress){
    console.log("onLoading: " + progress);
}

var player = null;
var enemy = null;

//加载完毕
function onLoaded(){
    //从资源来表中获取加载好的background图片纹理
    var texture = Laya.loader.getRes('res/background.png');
    //创建一个bg显示对象
    var bg = new laya.display.Sprite();
    //将上面的texture纹理绘制到bg图像里面
    bg.graphics.drawTexture(texture, 0, 0);
    //将bg添加到舞台
    Laya.stage.addChild(bg);
    for(i = 0; i < 8; i++){
        Laya.stage.addChild(new TerrainBlock(i * 96));
    }
    player = new Player();
    enemy = new Enemy();
    
    Laya.stage.addChild(player);
    Laya.stage.addChild(enemy);

    Laya.stage.on(laya.events.Event.KEY_DOWN, this, this.onKeyDown);
    Laya.stage.on(laya.events.Event.KEY_UP, this, this.onKeyUp);
}

function onKeyDown(e)
	{
        if(e["keyCode"] == 37)
            this.player.left();
        if(e["keyCode"] == 38)
            this.player.up();
        if(e["keyCode"] == 39)
            this.player.right();
        if(e["keyCode"] == 40)
            this.player.down();
        if(e["keyCode"] == 32)
            this.player.jump();
        if(e["keyCode"] == 83)
            this.player.collision(1,0);
        if(e["keyCode"] == 87)
            this.player.collision(2,2);
        if(e["keyCode"] == 69)
            this.enemy.collision(0);
        if(e["keyCode"] == 81)
            this.enemy.collision(1);
	}

    function onKeyUp(e)
	{
        if(e["keyCode"] == 37 || e["keyCode"] == 39)
            this.player.horizontalEnd();
	}
