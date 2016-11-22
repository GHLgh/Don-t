// variable to define groups will collide with
var eventGroup = 4;
// default value
var eventCategory = 0x1000;
// will only collide with category 0x001 (player)
var eventMask = 0x0001;
    
    class EventTrigger{
    constructor(initX, initY, linkObject, type){
        // hp may be used later for creating hidden path
        // but for now the reduce of hp will not be implemented and disable function for eventBlock
        // will only be called when a new stage is generating
        // use to construct hitting box with this.x and this.y
        this.width = 40;
        this.height = 40;

        this.linkObject = linkObject;
        this.eventType = type;
 
        // TODO: hard coded x, y location, will change later
        this.body = Browser.window.Matter.Bodies.rectangle(initX, initY, 40, 40, {
				    isStatic: true,
                    isSensor: true,
                    collisionFilter:
                {
                    group: eventGroup,
                    category: eventCategory,
                    mask: eventMask,
                },
				    render:
				    {
                        visible: true,
					    sprite:
                        {
                            texture: "./res/terrainBlockTemp.png"
                        }
				    }
			    });
                console.log("event created");
    }

    trigger(){
        if(this.eventType == "terrain"){
            Browser.window.Matter.Body.setDensity(this.linkObject.body, 1)
            Browser.window.Matter.Body.setStatic(this.linkObject.body, false);
        }
    }
}