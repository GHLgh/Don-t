// TODO: same kind of refactor as Player object
// TODO: consider if enemy will fall off the edge of the terrain

/**
 * A Enemy class is the game object that will be moving by itself and often being a challenge for player
 * it will contain function that:
 *      moving and bouncing back if wall is hit
 *      simulating gravity
 *      collision ditection (can be done in game.js - the controller)
 * 
 * /// cite: 简单跑酷--JS版, author: callback
 * /// <reference path="http://ask.layabox.com/question/601" />
 */
    
(function() {
    function Enemy(){
        Enemy.__super.call(this);        
        
        //hp will become an parameter if more types of enemies are included
        this.hp = 1;

        // action should always be the same (when animation is working)
        this.action = null;
        this.body = null;

        // a boolean designed to pause changes on Player object
        // ex. the x and y location should not change when an interaction is happening
        this.pause = false;

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
        this.vx = 6;

        // TODO: hard coded x, y location, will change later
        this.x = 100;
        this.y = 0;

        this.init();
    }

    Laya.class(Enemy, "Enemy", laya.display.Sprite);

    var _proto = Enemy.prototype;
 
    _proto.init = function(){
        if(this.body == null){
            // simply mapping texture for now because animation does not work
            var texture = Laya.loader.getRes('res/-15.png');
            this.graphics.drawTexture(texture, 0, 0, 36, 36);
        }

        //创建一个帧循环处理函数
        Laya.timer.frameLoop(6, this, this.onLoop)
        console.log("enemy set");
    }

    _proto.onLoop = function(){
        if(!this.pause)
            this.changePosition();

        //TODO: should change into detecting if there is object underneath
        //      keep it here for testing purpose
        if( this.y > 100){
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

        //make sure it will not go out of bound
        if(this.x + this.width >= 480 || this.x <= 0){
            this.vx = -1 * this.vx;
        }
    }

    /**
     * 0:hit wall
     * 1:being hit
     */
    _proto.collision = function(collisionType){
        this.vx = -1 * this.vx;        
        if(collisionType == 1){
            this.hp -= 1;
            if(this.hp <= 0)
                this.disabled();
        }
    }

    /**
     * disable the enemy when the player collide on the top
     */
    _proto.disabled = function(){
        this.removeSelf();
    }
    
})();