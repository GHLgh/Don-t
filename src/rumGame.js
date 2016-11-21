var isGameOver = false;

var map = [
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
        "0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0020000000000000000000000",
		"1000000000000000000000000",
		"1111111111111111111111111",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000",
		"0000000000000000000000000"
	];

var terrainMap = [];

var activeTrigger = false;

var enemyList = [];
var initiativeEventList = [];
var passiveEventList = [];

var player = null;
var gameWorld = null;
var cameraTrackingBlock = null;

var preX = 200;
var preY = 360;

function setup()
	{
        
		initMatter();

        readTextFile("./res/levelInfo.json", function(text){
                var data = JSON.parse(text);
                for(i = 0; i < 25; i++){
                    map[i] = data["map"][i];
                    console.log(map[i]);
                }
        		initWorld();        
            });

		Matter.Engine.run(engine);

        Laya.timer.frameLoop(1, this, this.onLoop);
	}

	function initMatter()
	{
        if(gameWorld == null){
		gameWorld = new Sprite();
        gameWorld.size(1000,1000);
        cameraTrackingBlock = new Sprite();
        cameraTrackingBlock.size(1000 - stageWidth, 1000 - stageHeight *3 / 4);
        gameWorld.addChild(cameraTrackingBlock);
        console.log(gameWorld.x);
        console.log(gameWorld.y);
        console.log(gameWorld.width);
        console.log(gameWorld.height);
                
        
        cameraTrackingBlock.pos(stageWidth / 2, stageHeight / 2);
        console.log(cameraTrackingBlock.x);
        console.log(cameraTrackingBlock.y);
        console.log(cameraTrackingBlock.width);
        console.log(cameraTrackingBlock.height);

		Laya.stage.addChild(gameWorld);
        }

		// 初始化物理引擎
		engine = Matter.Engine.create(
		{
			enableSleeping: true,
			render:
			{
				container: gameWorld,
				controller: LayaRender,
				options:
				{
					width: 1000,
					height: 1000,
					//background: './res/background.png',
					hasBounds: true
				}
			}
		});
	}

	function initWorld()
	{
        for(i = 0; i < 25; i++){
            terrainMap.push(new Array(25));
            for(j = 0; j < 25; j++)
              if(map[i][j] == '1'){
                var terrainBlock = new TerrainBlock(j*40, i*40);
                Matter.World.add(engine.world, terrainBlock.body);
                terrainMap[i][j] = terrainBlock;
              }
              else{ 
                  if(map[i][j] == '2'){
                    player = new Player(40*j, 40*i);
                    console.log("player created");
                  }
                  else if(map[i][j] == '3'){
                    enemyList.push(new Enemy(40*j, 40*i));
		            Matter.World.add(engine.world, enemyList[enemyList.length - 1].body);                    
                    console.log("enemy created");
                  }
                  terrainMap[i][j] = null;
              }
        }
        
        var exampleEvent = new EventTrigger(40*5, 40*5, terrainMap[6][6], "terrain");
        initiativeEventList.push(exampleEvent);
        Matter.World.add(engine.world, exampleEvent.body);

        var exampleEvent = new EventTrigger(40*3, 40*5, terrainMap[6][2], "terrain");
        passiveEventList.push(exampleEvent);
        Matter.World.add(engine.world, exampleEvent.body);

        if(player != null)
		    Matter.World.add(engine.world, player.body);
        for(i = 0; i < enemyList.length; i++){
            enemyList[i].updateConstraint(terrainMap);
        }        

		var renderOptions = engine.render.options;
		renderOptions.wireframes = false;
	}

    function resetWorld(){
        terrainMap = [];
        activeTrigger = false;
        enemyList = [];
        initiativeEventList = [];
        passiveEventList = [];
        player = null;
        preX = 200;
        preY = 360;
        gameWorld.pos(0, 0);
        isGameOver = false;

        Matter.Engine.clear(engine);
        initMatter();
        initWorld();
        Matter.Engine.run(engine);
        
    }

    function onLoop(){
        if(isGameOver == false){
            cameraTracking();
            collisionDetection();
            checkPlayer();
        }
    }

    

    function cameraTracking(){
        var worldTranslationX = gameWorld.x + (preX - player.body.position.x);
        var worldTranslationY = gameWorld.y + (preY - player.body.position.y);
        if(worldTranslationX > 0)
            worldTranslationX = 0;
        else if(worldTranslationX + gameWorld.width < stageWidth)
            worldTranslationX = stageWidth - gameWorld.width;
            
        if(worldTranslationY > 0)
            worldTranslationY = 0;
        else if(worldTranslationY + gameWorld.height < stageHeight - 300)
            worldTranslationY = (stageHeight-300) - gameWorld.height;

        /*if((player.body.position.x >= cameraTrackingBlock.x 
            && player.body.position.x < cameraTrackingBlock.x + cameraTrackingBlock.width)
            || (player.body.position.y >= cameraTrackingBlock.y 
            && player.body.position.y < cameraTrackingBlock.y + cameraTrackingBlock.height))*/{
            gameWorld.pos(worldTranslationX, worldTranslationY);                
            preX = player.body.position.x;
            preY = player.body.position.y;
        }
    }

    function collisionDetection(){
        if(activeTrigger){
            for(i = 0; i < passiveEventList.length; i++){
                var eventTrigger = passiveEventList[i];
                if(Matter.Detector.collisions([[eventTrigger.body, player.body]], engine).length > 0){
                    eventTrigger.trigger();
                }
            }
        }

        for(i = 0; i < initiativeEventList.length; i++){
            var eventTrigger = initiativeEventList[i];
            if(Matter.Detector.collisions([[eventTrigger.body, player.body]], engine).length > 0){
                eventTrigger.trigger();
            }
        }
        for(i = 0; i < enemyList.length; i++){
            var enemy = enemyList[i];
            if(enemy.hp == 0){
                Matter.Composite.remove(engine.world, enemy.body);
                continue;
            }
            if(enemy.yGrid != Math.floor((enemy.body.position.y+2)/40))
                enemy.updateConstraint(terrainMap);

            //check if collide the wall
            if(Matter.Detector.collisions([[enemy.body, enemy.walls[0].body],[enemy.body, enemy.walls[1].body]], engine).length > 0){
                enemy.collision(1, 0);
            }
            
            //check if collide to player
            if(Matter.Detector.collisions([[enemy.body, player.body]], engine).length > 0){
                if(player.body.position.y < enemy.body.position.y - 20){
                    enemy.collision(1, 2);
                    if(enemy.hp == 0){
                        removeObject(enemy);
                    }
                }
                else{
                    player.collision(0, 2);
                }
            }
        }
    }

    function removeObject(object){
        object.body.visible = false;
    }

    function checkPlayer(){
        if(player.hp == 0 || player.body.position.y > gameWorld.height){
            this.gameOver.visible = true;
            isGameOver = true;
        }
    }

    /* cite: http://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript */
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }