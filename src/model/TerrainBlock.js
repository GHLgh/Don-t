/**
 * A TerrainBlock class is the game object that will be the base of the map for dynamic object to move on
 * 
 * /// cite: 简单跑酷--JS版, author: callback
 * /// <reference path="http://ask.layabox.com/question/601" />
 */
    
(function() {
    function TerrainBlock(providedX){
        TerrainBlock.__super.call(this);        
        
        // hp may be used later for creating hidden path
        // but for now the reduce of hp will not be implemented and disable function for TerrainBlock
        // will only be called when a new stage is generating
        this.hp = 50;

        this.body = null;

        // use to construct hitting box with this.x and this.y
        this.width = 36;
        this.height = 36;
 
        // TODO: hard coded x, y location, will change later
        this.x = providedX;
        this.y = 100;

        this.init();
    }

    Laya.class(TerrainBlock, "TerrainBlock", laya.display.Sprite);

    var _proto = TerrainBlock.prototype;
 
    _proto.init = function(){
        if(this.body == null){
            // simply mapping texture for now because animation does not work
            var texture = Laya.loader.getRes('res/floor.png');
            this.graphics.drawTexture(laya.resource.Texture.createFromTexture(texture,0,0,96,96), 0, 0, 96, 96);
        }

        //创建一个帧循环处理函数
        Laya.timer.frameLoop(6, this, this.onLoop)
        console.log("TerrainBlock set");
    }

    _proto.onLoop = function(){
    }

    /**
     * disable when the scene is clear
     */
    _proto.disabled = function(){
        this.removeSelf();
    }
    
})();