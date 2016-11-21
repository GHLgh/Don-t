/**
 * An abstract class of all the objects in the game including but not limiting to player / monster / terrain / interacting item
 * This class will be a subclass of Laya.display.Sprite (which can be considered as an element in the scene)
 * such that it has x, y location record already
 * 
 */
class GameObject extends Laya.Sprite{
    constructor(size, xLocation, yLocation){
        this.x = xLocation;
        this.y = yLocation;
        this.width = size;
        this.height = size;
 
        //attributes for movements
        //Gravity (vertical movement)
        //velocity on y direction
        this.vy = 0;
        //acceleration on y direction
        this.ay = 0;
        //maximum velocity on y direction
        this.maxVy = 0;

        //Horizontal movement (usually non-zero for dynamic objects)
        this.vx = 0;
        this.ax = 0;
        this.maxVx = 0;

        this.hp = -1;
        this.body = null;
        this.pause = false;


        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop(){
        if(!this.pause)
            this.changePosition();
    }

    changePosition(){
        //falling down
        this.y += this.vy;
        this.vy += this.ay;
 
        //limit to the maximun velocity
        if(this.vy > this.maxVy)
            this.vy = this.maxVy;
        else if(Math.abs(this.vy) > this.maxVy)
            this.vy = -1 * this.maxVy;
         
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
}