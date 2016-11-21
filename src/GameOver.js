
     
    /**
     * 游戏结束
     */
    class GameOver extends Laya.Sprite{
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
        this.txt.text = "GameOver\n\nMay death never stop you";
        this.txt.width = stageWidth;
        this.txt.align = "center";
        this.txt.y = 20;
        this.addChild(this.txt);
         
        this.restartBtn = new Button("res/simpleBtn.png", "restart");
        this.restartBtn.size(80, 40);
        this.restartBtn.pos(0.5 * (stageWidth - this.restartBtn.width), 0.5 *(stageHeight - this.restartBtn.height));
        this.addChild(this.restartBtn);

        this.exitBtn = new Button("res/simpleBtn.png", "exit");
        this.exitBtn.size(80, 40);
        this.exitBtn.pos(this.restartBtn.x, this.restartBtn.y + 60);
        this.addChild(this.exitBtn);
    }
}