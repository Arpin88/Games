// TypeScript file
class DailogView extends BaseView{
    public static NAME:string = "DailogSkin";

    public constructor(){
        super(DailogView.NAME);
    }

    private rectBG:eui.Rect;
    private btnConfirm:eui.Button;
    private btnCancel:eui.Button;
    private showTxt:eui.Label;
    private func:any = null;


    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        var data = super.getData();
        if(data==null)
            return;
        var type = data.name;
        this.func = data.fun;

        self.showTxt.text = type;
    }

    protected sleep():void{
        
    }

    public SetTxt(txt:string):void
    {
        this.showTxt.text = txt;
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnConfirm){
                self.hiden();
              //  console.log(`确定被按下`);
                if(this.func != null)
                {
                    this.func();
                }
                
            }else if(tar==self.btnCancel){
                self.hiden();
                console.log(`取消被按下`);
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
    }
}