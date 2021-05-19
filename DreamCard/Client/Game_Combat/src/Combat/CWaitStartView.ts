// TypeScript file
class CWaitStartView extends BaseView{
    public static NAME:string = "CWaitStartSkin";

     public constructor(){
        super(CWaitStartView.NAME);
    }

    
    private groupStartCutDown:eui.Group;    //开始倒计时层
    private bitCutdown:eui.BitmapLabel;     //倒计时富文本

    private groupWaitPlayer:eui.Group;      //等待玩家
    // private imgPoint0:eui.Image;            //等待玩家点图片
    // private imgPoint1:eui.Image;
    // private imgPoint2:eui.Image;

    // private constTimeCounter:number = 5;    //时间计数器
    private timeCounter:number;             //时间计数器
    // private timer:egret.Timer;              //定时器


    protected week():void{
        var self = this;

        var data = super.getData();
        if(data==null)
            return;
        
        self.updateShow(data);
    }

    protected sleep():void{
        var self = this;
        // self.timeCounter = self.constTimeCounter;
        // if(self.timer!=null){
        //     self.timer.removeEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
        //     self.timer = null;
        // }
    }

    //开始等待文字点跳动
    public startJump():void{
        var self = this;
        self.groupWaitPlayer.visible = true;
        self.groupStartCutDown.visible = false;
        
        var prePosY:number = self["imgPoint0"].y;//60;
        prePosY = prePosY<=60?60:180;
        for(var i:number = 0; i < 3; i++) {
            var img = self["imgPoint"+i];
            img.y = prePosY;
            egret.Tween.removeTweens(img);
            egret.Tween.get(img,{loop:true})
                    .wait(100 * i)
                    .to({y: prePosY-30}, 180, egret.Ease.quartIn)
                    .wait(100)
                    .to({y: prePosY}, 200, egret.Ease.quartOut)
                    .wait(1000 - 100 * i);
        }
    }

    //开始倒计时
    public startCutDown(cutdown:number):void{
        var self = this;
        self.groupWaitPlayer.visible = false;
        self.groupStartCutDown.visible = true;
        self.timeCounter = cutdown;
        SoundManager.getInstance().PlaySound("daojishi_mp3");
        self.updateTimeShow();
        // self.startTimer();
        if(cutdown==0){
            // if(self.timer==null){
            //     self.timer = new egret.Timer(1000,1);
            //     self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
            // }
            // self.timer.start();
            self.hiden();
        }
    }

    // private startTimer():void{
    //     var self = this;
    //     if(self.timer==null){
    //         self.timer = new egret.Timer(1000,self.timeCounter);
    //         self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
    //     }
    //     self.timer.start();  
    // }

    // private stopTimer():void{
    //     var self = this;
    //     if(self.timer!=null){
    //         self.timer.stop();
    //     }
    // }
    
    // private timerFunc(){
    //     var self = this;
    //     // self.timeCounter--;
    //     // if(self.timeCounter==0){
    //     //     self.hiden();
    //     //     return;
    //     // }
    //     // self.updateTimeShow();
    //     self.hiden();
    // }

    private updateTimeShow():void{
        var self = this;
        self.bitCutdown.text = self.timeCounter+"";
    }

    public updateShow(data:any):void{
        var self = this;
        var type:number = data.type;
        if(type!=0){
            var cutdown:number = data.cutdown;
            self.startCutDown(cutdown);
        }else{
            self.startJump();
        }
    }
}