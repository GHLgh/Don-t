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

// variable to define groups will collide with
var playerGroup = 1;
var playerCategory = 0x0001;
// this is actually the default value which means will collide with anything in the scene
var playerMask = 0xffff;


class Player{
    constructor(initX, initY){   
        this.hp = 1;
        this.jumpCount = 0;
        this.maxJump = 1;
        this.preForce = {x:0, y:0};

        // use to construct hitting box with this.x and this.y
        this.width = 40 * pixelRatio;
        this.height = 40 * pixelRatio;

        this.body = Browser.window.Matter.Bodies.polygon(initX+this.width/2, initY+this.height/2, 8, 20 * pixelRatio, {
                collisionFilter:
                {
                    group: playerGroup,
                    category: playerCategory,
                    mask: playerMask,
                },
				render:
				{
					sprite:
					{
						texture: 'res/15.png',
                        xScale: pixelRatio,
                        yScale: pixelRatio,
                        xOffset: this.width/2,
                        yOffset: this.height/2,
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
     * The following handler function will be called by the controller when it receives actions from player
     * and determines the actions are valid
     */

    //jump
    jump(){
       //this.playAction(Player.JUMP);
       if(this.jumpCount < this.maxJump){
            this.jumpCount += 1;       
            this.preForce.y = -50;
            useTheForce(this.body, this.body.position, this.preForce);
            this.preForce.y = 0;
       }
    }
    //interact
    interact(){
        this.pause = true;
    }

    interactEnd(){
        this.pause = false;
    }

    //right
    right(){
       //this.playAction(Player.RUN);
	    this.preForce.x = 1;
    }
    //left
    left(){
       //this.playAction(Player.RUN);
       this.preForce.x = -1;
    }

    horizontalEnd(){
        this.preForce.x = 0;
    }

    verticalEnd(){
        this.preForce.y = 0;
    }

//================================== future possible features due to unfit to current design ======================
    /**
     * note: this two functions will be different from right / left
     * because these two should only be called when certain conditions are met
     * (ex. player overlaps with a rope - can climb up) which is actually similar to interact function
     */
    //up
    up(){
         // such that (vy += ay) < 0
    }
    //down
    down(){
        // hack such that the player will pass through the collision detection
        // for object with small height of hitting box
        // Although a better way will be preferred
        // For instance, having two layers of objects and pressing "down" will switch the layer where player is
    }
//=============================================================================================================

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
    collision(collidedBody, activeTrigger){
        //player.body.position.y < enemy.body.position.y - 20
        //player is on the collidedBody and it is not event block
        if(toYGrid(this.body.position.y) < toYGrid(collidedBody.position.y) 
                && collidedBody.collisionFilter.category != eventCategory){
            this.jumpCount = 0;
        }
        //player is under the collidedBody and it is enemy
        else if(collidedBody.collisionFilter.category == enemyCategory){
            console.log("subtract hp");
            this.hp -= 1;
        }
    }
    
}