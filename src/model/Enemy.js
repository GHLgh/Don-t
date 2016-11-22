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

// variable to define groups will collide with
var enemyGroup = 2;
// default value
var enemyCategory = 0x0010;
// will not collide with category 0x1000 (event block)
var enemyMask = 0xefff;

class Enemy{
        constructor(initX, initY){   
        this.hp = 1;
        this.preForce = {x:1, y:0};

        // use to construct hitting box with this.x and this.y
        this.width = 40;
        this.height = 40;

        // use for updating walls
        // +2 for making sure Math.floor will produce desired value
        this.yGrid = Math.floor(initY+2/40);
        this.walls = [null, null];

        this.body = Browser.window.Matter.Bodies.polygon(initX, initY, 8, 20, {
				density: 1,
                collisionFilter:
                {
                    group: enemyGroup,
                    category: enemyCategory,
                    mask: enemyMask,
                },
				render:
				{
					sprite:
					{
						texture: './res/-15.png',
					}
				}
			});
        this.body.frictionAir = this.body.friction * 0.8;
        Browser.window.Matter.Body.setInertia(this.body, Infinity);

        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    /* Player.DEFAULT = "defaultStatus"; */

    onLoop(){
        Browser.window.Matter.Body.applyForce(this.body, this.body.position, this.preForce);
    }

    updateConstraint(map){
        this.yGrid = Math.floor((this.body.position.y+2)/40);
        var level = map[this.yGrid];
        var xGrid = Math.floor((this.body.position.x+2)/40);
        
        for(i = xGrid; i >= 0; i--){
            if(level[i] != null){
                this.walls[0] = level[i];
                break;
            }
        }
        for(i = xGrid; i < 25; i++){
            if(level[i] != null){
                this.walls[1] = level[i];
                console.log(level[i].body.position);
                break;
            }
        }
    }

    /**
     * collision
     * different type of collision will result into different behavior
     * (horizontalCollisionType, verticalCollisionType, 0:no collision, 1:on terrain, 2:on dynamic object)
     * h == 1, v != 1: hit the ground: reset jump count and vertical velocity
     * h == 0, v == 1: hit the wall: bound back if player is in the air
     * h == 1, v == 1: hit the wall: stop horizontal movement if player is not
     * h == 2: hit enemy on the top: bound up as if the player jumps with resetting jump count
     * h != 2, v == 2: hit enemy on the side: player takes damage and possibily dies
     */
    collision(horizontalCollisionType, verticalCollisionType){
        if(horizontalCollisionType == 1){
            this.preForce.x = -1 * this.preForce.x;
        }
        if(verticalCollisionType == 2){
                this.hp -= 1;
        }
    }
}