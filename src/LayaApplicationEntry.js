//TODO: terrainBlock sprite?


 /**
 * This is not a controller, having some codes for testing purpose
 */
var Sprite  = Laya.Sprite;
var Stage   = Laya.Stage;
var Browser = Laya.Browser;
var Button  = Laya.Button;
var Handler = Laya.Handler;
var Event   = Laya.Event;
var Text    = laya.display.Text;

var stageWidth = Browser.width;
var stageHeight = Browser.height;

var Matter  = Browser.window.Matter;
var LayaRender = Browser.window.LayaRender;

var engine;

//laya初始化
Laya.init(1000, 1000, Laya.WebGL);
//FPS
//Laya.Stat.show(0,0);
//设置适配模式
Laya.stage.scaleMode = "noscale";
//设置剧中对齐
Laya.stage.alignH = "center";
//设置横屏
Laya.stage.screenMode = "none";
Laya.stage.bgColor = "#232628";

var gameOver = null;
var startMenu = null;
var controlBackground = null;

var loading = new Loading();
Laya.stage.addChild(loading);

//加载图片
Laya.loader.load(["res/upBtn.png", "res/rightBtn.png", "res/leftBtn.png",
			"res/downBtn.png", "res/simpleBtn.png",
            "res/15.png", "res/-15.png","res/background.png","res/floor.png"], 
            laya.utils.Handler.create(this, onLoaded), laya.utils.Handler.create(this, onLoading, null, false));
 
//加载进度
function onLoading(progress){
    loading.progress(progress);
    //console.log("onLoading: " + progress);
}

//加载完毕
function onLoaded(){
    Laya.stage.removeChild(loading);
    Laya.stage.on(Event.RESIZE,this,onResize);
    setStartMenu();
}

function onResize(){
    //横屏显示调整
    
        stageWidth=Browser.width;
        stageHeight=Browser.height;
        //Laya.stage.width = stageWidth;
        //Laya.stage.height = stageHeight;
        if(gameOver != null){
            setGameOverScreen();
        }
        if(startMenu != null){
            setStartMenu();
        }
        if(controlBackground != null){
            onUIAssetsLoaded();
        }
        if(cameraTrackingBlock != null){
            iniCameraTracking();
        }
        console.log("resize");
        console.log({width:Browser.window.innerWidth,height:Browser.window.innerHeight});
        console.log({width:Browser.width,height:Browser.height});
}

function setStartMenu(){
    if(this.startMenu != null)
        Laya.stage.removeChild(this.startMenu);
    this.startMenu = new StartMenu();
	Laya.stage.addChild(this.startMenu);
            console.log({width:Browser.window.innerWidth,height:Browser.window.innerHeight});
            console.log({width:Browser.width,height:Browser.height});

    this.startMenu.startBtn.on(laya.events.Event.MOUSE_DOWN, this, this.gameStart);
}

function gameStart(){
    // run the setup function in runGame.js
    Laya.stage.removeChild(this.startMenu);
    this.startMenu = null;

    setup();

    onUIAssetsLoaded();

    setGameOverScreen();    
}

function setGameOverScreen(){
    if(this.gameOver != null)
        Laya.stage.removeChild(this.gameOver);
    this.gameOver = new GameOver();
	this.gameOver.visible = false;
	Laya.stage.addChild(this.gameOver);

    this.gameOver.restartBtn.on(laya.events.Event.MOUSE_DOWN, this, this.levelReset);
    this.gameOver.exitBtn.on(laya.events.Event.MOUSE_DOWN, this, this.gameReset);
}	

function levelReset(){
    resetWorld();
    this.gameOver.visible = false;
}

function gameReset(){
    location.reload();
}

function onUIAssetsLoaded(){
    if(controlBackground != null)
        Laya.stage.removeChild(controlBackground);
    controlBackground = new Sprite();
    controlBackground.graphics.drawRect(0,0,stageWidth, stageHeight / 5,"#000000");
    Laya.stage.addChild(controlBackground);
    controlBackground.pos(0, stageHeight *4 / 5);    
    dPadCenterXLeft = stageWidth / 4;
    dPadCenterXRight = stageWidth / 4 * 3;
    var btnSize = 60;
    
	dPadCenterY = stageHeight / 10 - btnSize / 2;

    var skins = ["res/upBtn.png", "res/leftBtn.png", "res/downBtn.png",
			    "res/rightBtn.png"];
    var btnLocation = [{x:dPadCenterXRight - btnSize, y: dPadCenterY},
                        {x:dPadCenterXLeft - btnSize, y:  dPadCenterY},
                        {x:dPadCenterXRight, y: dPadCenterY},
                        {x:dPadCenterXLeft, y:  dPadCenterY}];

    for (var i = 0, len = skins.length; i < len; i++)
	{
		var btn = createButton(skins[i],i, btnSize);
        controlBackground.addChild(btn);
		var x = btnLocation[i].x;
		var y = btnLocation[i].y;
        //console.log(x);
        //console.log(y);
                        
		btn.pos(x, y);
	}
        
	 Laya.stage.addChild(controlBackground);
        
}

function createButton(skin, type, btnSize){
    var btn = new Button(skin);
	btn.size(btnSize, btnSize);
    btn.stateNum = 1;
    switch(type){
        case 0:
            btn.on(Event.MOUSE_DOWN, this, upBtnHandler);
            btn.on(Event.MOUSE_UP, this, upBtnHandler);                
            break;
        case 1:
            btn.on(Event.MOUSE_DOWN, this, leftBtnHandler);
            btn.on(Event.MOUSE_UP, this, leftBtnHandler);                
            break;
        case 2:
            btn.on(Event.MOUSE_DOWN, this, downBtnHandler);
            btn.on(Event.MOUSE_UP, this, downBtnHandler);
            break;
        case 3:
            btn.on(Event.MOUSE_DOWN, this, rightBtnHandler);
            btn.on(Event.MOUSE_UP, this, rightBtnHandler);                                            
    }
	return btn;
}

function upBtnHandler(e)
{
	switch (e.type)
	{
		case Event.MOUSE_DOWN:
			player.jump();
			break;
		case Event.MOUSE_UP:
            player.verticalEnd();
    }
}

function leftBtnHandler(e)
{
	switch (e.type)
	{
		case Event.MOUSE_DOWN:
            player.left();
			break;
		case Event.MOUSE_UP:
            player.horizontalEnd();
    }
}

function downBtnHandler(e)
{
	switch (e.type)
	{
		case Event.MOUSE_DOWN:
            activeTrigger = true;
            //console.log({playerX:player.body.position.x,playerY:player.body.position.y});
            //console.log({worldX:gameWorld.x,worldY:gameWorld.y});                          
			break;
		case Event.MOUSE_UP:
             activeTrigger = false;
    }
}

function rightBtnHandler(e)
{
	switch (e.type)
	{
		case Event.MOUSE_DOWN:
			player.right();
			break;
		case Event.MOUSE_UP:
            player.horizontalEnd();
    }
}

