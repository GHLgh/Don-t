// TODO: figure out how to perform animation
// TODO: subclass from other class other than Sprite
// TODO: change hard-coded number into define-ish format for easier alteration

/**
 * A Player class is the game object that will be controlled by the player
 * it will contain function that:
 *      corresponding to specific player action (up/left/right/down)
 *      simulating gravity
 *      collision reaction
 * 
 * /// cite: 简单跑酷--JS版, author: callback
 * /// <reference path="http://ask.layabox.com/question/601" />
 */
    
(function() {
    function Player(){
        Player.__super.call(this);        
        
        this.hp = 1;
        this.action = null;
        this.body = null;
        this.jumpCount = 0;
        this.maxJump = 1;

        // a boolean designed to pause changes on Player object
        // ex. the x and y location should not change when an interaction is happening

        // use to construct hitting box with this.x and this.y
        this.width = 36;
        this.height = 36;
 
        //Gravity (vertical movement)
        //velocity on y direction
        this.vy = 0;
        //acceleration on y direction
        this.ay = 3;
        //maximum velocity on y direction
        this.maxVy = 9;

        //Horizontal movement (usually non-zero for dynamic objects)
        //TODO: add friction
        this.vx = 0;
        this.ax = 0;
        this.maxVx = 9;

        // TODO: hard coded x, y location, will change later
        this.x = 0;
        this.y = 0;

        this.init();
    }

    /* Player.DEFAULT = "defaultStatus"; */

    Laya.class(Player, "Player", laya.display.Sprite);

    var _proto = Player.prototype;
 
    //TODO
    //是否缓存了
    Player.cached = false;
     
    _proto.init = function(){
        //动画缓存起来
        if(!Player.cached){
            /*Player.cached = true;
            //根据不同的动画 来创建动画模板
            //laya.display.Animation.createFrames(["res/15.png","res/-15.png"], Player.DEFAULT);*/            
        }
         
        if(this.body == null){
            // simply mapping texture for now because animation does not work
            var texture = Laya.loader.getRes('res/15.png');
            this.graphics.drawTexture(texture, 0, 0, 36, 36);

            /*
            this.body = new laya.display.Animation();
            this.body.pivot(48,60);
            this.body.interval = 100;
            this.addChild(this.body);
             */
        }

        /*
        //播放动作对应的动画
        this.playAction(Player.DEFAULT);
        */

        //创建一个帧循环处理函数
        Laya.timer.frameLoop(6, this, this.onLoop);
        console.log("player set");
    }

    // DOES NOT WORK RIGHT NOW
    /**
     * 播放动作对应的动画
     * action String 动作名称
     */
    _proto.playAction = function(action){
        //如果是重复的动作 不执行
        if(this.action == action)return;
        this.action = action;
        this.body.play(0, true, this.action);
        console.log(this.action);
    }

    _proto.onLoop = function(){
        if(!this.pause)
            this.changePosition();

        //TODO: should change into detecting if there is object underneath
        //      keep it here for testing purpose
        if( this.y > 100){
            //this.collision(2, 0);
            this.y = 100;
            this.vy = 0; // reset vertical velocity
            return;
        }
    }

    _proto.changePosition = function(){
        //falling down
        this.y += this.vy;
        this.vy += this.ay;
 
        //limit to the maximun velocity
        if(this.vy > this.maxVy){
            this.vy = this.maxVy;
        }
         
        this.x += this.vx;
        this.vx += this.ax;

        if(this.vx > this.maxVx)
            this.vx = this.maxVx;
        else if(Math.abs(this.vx) > this.maxVx)
            this.vx = -1 * this.maxVx;

        //make sure it will not go out of bound
        if(this.x >= 852-1 || this.x <= 0){
            this.vx = 0;
            if(this.x <= 0)
                this.x = 1;
            else
                this.x = 852-2;
        }
    }

    /**
     * The following handler function will be called by the controller when it receives actions from player
     * and determines the actions are valid
     */

    //jump
    _proto.jump = function(){
       //this.playAction(Player.JUMP);
       if(this.jumpCount < this.maxJump){
            this.vy = -15;
            this.jumpCount += 1;
       }
    }
    //interact
    _proto.interact = function(){
        this.pause = true;
    }

    _proto.interactEnd = function(){
        this.pause = false;
    }

    //right
    _proto.right = function(){
       //this.playAction(Player.RUN);
       this.ax = 3;
    }
    //left
    _proto.left = function(){
       //this.playAction(Player.RUN);
       this.ax = -3;
    }

    _proto.horizontalEnd = function(){
        this.vx = 0;
        this.ax = 0;
    }

    /**
     * note: this two functions will be different from right / left
     * because these two should only be called when certain conditions are met
     * (ex. player overlaps with a rope - can climb up) which is actually similar to interact function
     */
    //up
    _proto.up = function(){
        this.vy = -4; // such that (vy += ay) < 0
    }
    //down
    _proto.down = function(){
        // hack such that the player will pass through the collision detection
        // for object with small height of hitting box
        // Although a better way will be preferred
        // For instance, having two layers of objects and pressing "down" will switch the layer where player is
        this.y += 6;
    }

    /**
     * collision
     * different type of collision will result into different behavior
     * (horizontalCollisionType, verticalCollisionType, 0:no collision, 1:on terrain, 2:on monster)
     * h == 1, v != 1: hit the ground: reset jump count and vertical velocity
     * h == 0, v == 1: hit the wall: bound back if player is in the air
     * h == 1, v == 1: hit the wall: stop horizontal movement if player is not
     * h == 2: hit enemy on the top: bound up as if the player jumps with resetting jump count
     * h != 2, v == 2: hit enemy on the side: player takes damage and possibily dies
     */
    _proto.collision = function(horizontalCollisionType, verticalCollisionType){
        if(horizontalCollisionType != 0){
            this.jumpCount = 0;
            if(horizontalCollisionType == 2){
                this.vy = -15;
                //(do not need trigger to disable the monster, controller will do the work)
            }
            else
                this.vy = 0;
        }
        if(verticalCollisionType != 0){
            if(horizontalCollisionType != 1)
                this.vx = -1 * this.vx;
            else
                this.vx = 0;
            if(verticalCollisionType == 2 && horizontalCollisionType != 2)
                this.hp -= 1;
        }
    }
    
})();