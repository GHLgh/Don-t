    class StartMenu extends Laya.Sprite{
        constructor(){
            super();
            this.bg = null;
            this.txt = null;
            this.init();
        }
    //GameOver
     
    init(){
        this.width = stageWidth;
        this.height = stageHeight;
        //黑色背景
        this.bg = new Sprite();
        this.bg.alpha = 0.8;
        this.bg.graphics.drawRect(0,0,stageWidth,stageHeight,"#000000");
        this.addChild(this.bg);
         
        //loading文本
        this.txt = new Text();
        this.txt.color = "#ffffff";
        this.txt.fontSize = 30;
        this.txt.text = "Title";
        this.txt.width = stageWidth;
        this.txt.align = "center";
        this.txt.y = stageHeight / 4;
        this.addChild(this.txt);
         
        this.startBtn = new Button("res/simpleBtn.png", "start");
        this.startBtn.size(80, 40);
        this.startBtn.pos(0.5 * (stageWidth - this.startBtn.width), 0.5 *(stageHeight - this.startBtn.height));
        this.addChild(this.startBtn);
    }
}