class Loading extends Laya.Sprite{
    /**
     * 加载类
     */
    constructor(){
        super();        
        this.init();
    }
     
    init(){
        //黑色背景
        this.bg = new Sprite();
        this.bg.graphics.drawRect(0,0,stageWidth,stageHeight,"#000000");
        this.addChild(this.bg);
         
        //loading文本
        this.txt = new Text();
        this.txt.color = "#ffffff";
        this.txt.fontSize = 30;
        this.txt.text = "Loading";
        this.txt.width = stageWidth;
        this.txt.align = "center";
        this.txt.y = (stageHeight) * 0.5;
        this.addChild(this.txt);
         
    }
    progress(value){
        this.txt.text = "Loading " + parseInt(value * 100) + "%";
    }
}
     