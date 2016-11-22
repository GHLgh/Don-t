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

        //hack
        this.preY = 0;
        this.pre2Y = 1;

        // use to construct hitting box with this.x and this.y
        this.width = 40;
        this.height = 40;

        this.body = Browser.window.Matter.Bodies.polygon(initX, initY, 8, 20, {
				density: 1,
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
						texture: './res/15.png',
					}
				}
			});
        this.body.frictionAir = this.body.friction * 0.8;
// use as an entry to itself when collsion happened
        this.body.gameObject = this;

        Browser.window.Matter.Body.setInertia(this.body, Infinity);

        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    /* Player.DEFAULT = "defaultStatus"; */

    onLoop(){
        Browser.window.Matter.Body.applyForce(this.body, this.body.position, this.preForce);
        if(this.jumpCount == this.maxJump && this.body.position.y == this.preY && this.body.position.y == this.pre2Y)
            this.jumpCount = 0;
        else if(this.jumpCount == this.maxJump){
            this.pre2Y = this.preY;
            this.preY = this.body.position.y;
        }
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
            this.preY = 0;
            this.pre2Y = 1;        
            this.preForce.y = -50;
            Matter.Body.applyForce(this.body, this.body.position, this.preForce);
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