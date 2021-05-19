// TypeScript file
class LoadingView extends BaseView{
    public static NAME:string = "LoadingSkin";

    public constructor(){
        super(LoadingView.NAME);
    }

    private rectBG:eui.Rect;
    /*private btnConfirm:eui.Button;
    private btnCancel:eui.Button;

    private btnReduce:eui.Button;
    private btnAdd:eui.Button;
    private btnMax:eui.Button;*/
    private loadtxt:eui.Label;
    private timer: egret.Timer;
    private loadNum:number;

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        //    self.hiden();
        this.timer = new egret.Timer(200, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
        this.loadNum = 0;
    }

    protected sleep():void{
        
    }

    private timerFunc():void
    {
        this.loadNum = this.loadNum + 1
     //   this.loadtxt.text = "载入中...." + this.loadNum + "%"

        if(this.loadNum >= 100)
        {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.hiden();
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button)
        {
           SoundManager.getInstance().PlayClickSound();
           self.hiden();
        }
    }
    
}