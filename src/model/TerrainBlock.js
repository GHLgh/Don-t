/**
 * A TerrainBlock class is the game object that will be the base of the map for dynamic object to move on
 * 
 * /// cite: 简单跑酷--JS版, author: callback
 * /// <reference path="http://ask.layabox.com/question/601" />
 */

// variable to define groups will collide with
var terrainGroup = 3;
// default value
var terrainCategory = 0x0100;
// will not collide with category 0x1000 (event block)
var terrainMask = 0xefff;

class TerrainBlock{
    constructor(initX, initY, continueBlock){
        // hp may be used later for creating hidden path
        // but for now the reduce of hp will not be implemented and disable function for TerrainBlock
        // will only be called when a new stage is generating
        this.hp = 50;

        // use to construct hitting box with this.x and this.y
        this.width = 40 * pixelRatio * continueBlock;
        this.height = 40 * pixelRatio;
 
        console.log({xpos:initX, ypos:initY, width:40 * pixelRatio * continueBlock, height:40 * pixelRatio});
        // TODO: hard coded x, y location, will change later
        this.body = Browser.window.Matter.Bodies.rectangle(initX+this.width/2, initY+this.height/2, this.width, this.height, {
				    isStatic: true,
                    collisionFilter:
                {
                    group: terrainGroup,
                    category: terrainCategory,
                    mask: terrainMask,
                },
				    render:
				    {
					    sprite:
                        {
                            texture: "res/terrainBlockStrip.png",
                            xScale: pixelRatio,
                            yScale: pixelRatio,
                            xOffset: this.width/2,
                            yOffset: this.height/2,
                            objectWidth: 40 * continueBlock,
                            objectHeight: 40,
                        }
				    }
			    });

                // use as an entry to itself when collsion happened
        this.body.gameObject = this;

    }

    // such that the game will not break
    collision(collidedBody, activeTrigger){}
}