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

// variable to define groups will collide with (change to default value 0
// such that the engine will check collision any time)
var enemyGroup = 0;
// default value
var enemyCategory = 0x0010;
// will not collide with category 0x1000 (event block) and 0x0010 (other enemy)
var enemyMask = 0xefef;

class Enemy{
        constructor(initX, initY){   
        this.hp = 1;
        this.preForce = {x:1, y:0};

        // use to construct hitting box with this.x and this.y
        this.width = 40 * pixelRatio;
        this.height = 40 * pixelRatio;

        this.body = Browser.window.Matter.Bodies.polygon(initX+this.width/2, initY+this.height/2, 8, 20 * pixelRatio, {
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
						texture: 'res/-15.png',
                        xScale: pixelRatio,
                        yScale: pixelRatio,
                        xOffset: (this.width/2)/pixelRatio,
                        yOffset: (this.height/2)/pixelRatio,
                        objectWidth: 40,
                        objectHeight: 40,
					}
				}
			});
        this.body.frictionAir = this.body.friction * 0.8;

        // use as an entry to itself when collsion happened
        this.body.gameObject = this;

        Browser.window.Matter.Body.setInertia(this.body, Infinity);
        Browser.window.Matter.Body.setMass(this.body, defaultMass);


        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    /* Player.DEFAULT = "defaultStatus"; */

    onLoop(){
        useTheForce(this.body, this.body.position, this.preForce);
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
    collision(collidedBody, activeTrigger){
        //player.body.position.y < enemy.body.position.y - 20
        //enemy is under the collidedBody and it is player
        if(toYGrid(this.body.position.y) > toYGrid(collidedBody.position.y) 
                && collidedBody.collisionFilter.category == playerCategory){
            this.hp -= 1;
            if(this.hp == 0)
                removeObject(this);
        }
        else if(toYGrid(collidedBody.position.y) == toYGrid(this.body.position.y)){
            this.preForce.x = -1 * this.preForce.x;
        }
    }
}