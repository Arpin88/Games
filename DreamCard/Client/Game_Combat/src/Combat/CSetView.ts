// TypeScript file
class CSetView extends BaseView{
    public static NAME:string = "CSetSkin";

     public constructor(){
        super(CSetView.NAME);
    }

    private rectBG:eui.Rect;            //背景遮罩
    private btnClose:eui.Button;        //关闭按钮
    private btnSurrender:eui.Button;    //投降按钮
    private btnHelp:eui.Button;         //帮助按钮
    
    private surrenderGameHandler:Handler;   //认输按钮回调

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        var data:any = super.getData();
        if(data==null)
            return;
        
        self.surrenderGameHandler = data.surrenderGameHandler;
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnClose){
                self.hiden();
            }else if(tar==self.btnSurrender){
                if(self.surrenderGameHandler!=null)
                    self.surrenderGameHandler.run();
                self.hiden();
            }else if(tar==self.btnHelp){
                self.hiden();
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
    }
}