const defaultMass = 1000;

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
//For now cameraTracking is using variables to store the boundary


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
                    //console.log(map[i]);
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
            gameWorld.size(1000 * pixelRatio,1000 * pixelRatio);
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
					width: 1000 * pixelRatio,
					height: 1000 * pixelRatio,
					//background: './res/background.png',
					hasBounds: true
				}
			}
		});

        Matter.Events.on(engine, 'collisionStart', function(event){collisionDetection(event);});
        //TODO: better way??
        Matter.Events.on(engine, 'collisionActive', function(event){eventTrigger(event);})

	}

	function initWorld()
	{
        // initialize camera tracking
        iniCameraTracking();                    
        for(i = 0; i < 25; i++){
            terrainMap.push(new Array(25));
            for(j = 0; j < 25; j++)
              if(map[i][j] == '1'){
                var terrainBlock = new TerrainBlock(j*40 * pixelRatio, i*40 * pixelRatio);
                Matter.World.add(engine.world, terrainBlock.body);
                terrainMap[i][j] = terrainBlock;
              }
              else{ 
                  if(map[i][j] == '2'){
                    player = new Player(40*j * pixelRatio, 40*i * pixelRatio);
                    //console.log("player created");
                  }
                  else if(map[i][j] == '3'){
                    enemyList.push(new Enemy(40*j * pixelRatio, 40*i * pixelRatio));
		            Matter.World.add(engine.world, enemyList[enemyList.length - 1].body);                    
                    //console.log("enemy created");
                  }
                  terrainMap[i][j] = null;
              }
        }
        
        var exampleEvent = new EventTrigger(40*5 * pixelRatio, 40*5 * pixelRatio, 40 * pixelRatio, 40 * pixelRatio, terrainMap[6][6], "terrain", false);
        initiativeEventList.push(exampleEvent);
        Matter.World.add(engine.world, exampleEvent.body);

        var exampleEvent = new EventTrigger(40*3 * pixelRatio, 40*5 * pixelRatio, 40 * pixelRatio, 40 * pixelRatio, terrainMap[6][2], "terrain", true);
        passiveEventList.push(exampleEvent);
        Matter.World.add(engine.world, exampleEvent.body);

        if(player != null)
		    Matter.World.add(engine.world, player.body);      

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
        if(player != null){
            cameraTracking();
            //collisionDetection();
            checkPlayer();
        }
    }

    function iniCameraTracking(){
        if(cameraTrackingBlock != null)
            gameWorld.removeChild(cameraTrackingBlock);
        cameraTrackingBlock = new Sprite();
        cameraTrackingBlock.size(gameWorld.width - stageWidth, gameWorld.height - stageHeight *3 / 4);
        gameWorld.addChild(cameraTrackingBlock);
        cameraTrackingBlock.pos(stageWidth/2, stageHeight/2);
        preX = stageWidth/2;
        preY = stageHeight/2;
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
        else if(worldTranslationY + gameWorld.height < stageHeight * 4 /5)
            worldTranslationY = (stageHeight *4 /5) - gameWorld.height;
          
        if((player.body.position.x + player.width >= cameraTrackingBlock.x 
            && player.body.position.x  < cameraTrackingBlock.x + cameraTrackingBlock.width))
            preX = player.body.position.x;
        if((player.body.position.y + player.height>= cameraTrackingBlock.y 
            && player.body.position.y  < cameraTrackingBlock.y + cameraTrackingBlock.height)){
            preY = player.body.position.y;
        }
        gameWorld.pos(worldTranslationX, worldTranslationY);                
    }

    function eventTrigger(event){
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            // if EventTrigger is involved
            if(pair.bodyA.collisionFilter.category == eventCategory 
                    || pair.bodyB.collisionFilter.category == eventCategory){
                pair.bodyA.gameObject.collision(pair.bodyB, activeTrigger);
                pair.bodyB.gameObject.collision(pair.bodyA, activeTrigger);
            }
        }
    }

    function collisionDetection(event){
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            pair.bodyA.gameObject.collision(pair.bodyB, activeTrigger);
            pair.bodyB.gameObject.collision(pair.bodyA, activeTrigger);
        }
    }

    function removeObject(object){
        Matter.Composite.remove(engine.world, object.body);
        object.body.sprite.visible = false;
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

    function toYGrid(yPosition){
        return Math.floor((yPosition+2)/(40 * pixelRatio));
    }

    function useTheForce(body, position, preForce){
        var force = {x:preForce.x * pixelRatio, y:preForce.y * pixelRatio};
        Browser.window.Matter.Body.applyForce(body, position, preForce);
    }