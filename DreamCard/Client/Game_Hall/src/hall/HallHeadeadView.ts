// TypeScript file
class HallHeadView extends BaseView{
    public static NAME:string = "HeadSkin";

    public constructor(){
        super(LoadingView.NAME);
    }

   // private rectBG:eui.Rect;
    /*private btnConfirm:eui.Button;
    private btnCancel:eui.Button;

    private btnReduce:eui.Button;
    private btnAdd:eui.Button;
    private btnMax:eui.Button;*/
    private nickname1:eui.Label;
   // private timer: egret.Timer;
 //   private loadNum:number;

    protected week():void{
        var self = this;

   /*     if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }*/
    self.nickname1.text = "123"
    }

    public setNickName(str:string):void
    {
      //  self.nickname1.text = str;
    }


    protected sleep():void{
        
    }


    
}