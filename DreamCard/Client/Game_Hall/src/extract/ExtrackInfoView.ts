// TypeScript file
class ExtrackInfoView extends BaseView{
    public static NAME:string = "ExtrackInfoSkin";

    public constructor(){
        super(ExtrackInfoView.NAME);
    }

    private rectBG:eui.Rect;
    // private btnDestroy:eui.Button;
    private btnCancel:eui.Button;

    private puotngstring:eui.Label;
    private xiyoustring:eui.Label;
    private shishistring:eui.Label;
    private chuanqistring:eui.Label;
    private shenhuagstring:eui.Label;

    private bagid:number = 0;
    private itemIdx:number;

    protected week():void{
        var self = this;

        var self = this;
        var data = super.getData();
        if(data==null)
            return;

        self.puotngstring.text = data["common"] + "%";
        self.xiyoustring.text = data["rare"] + "%";
        self.shishistring.text = data["epic"] + "%";
        self.chuanqistring.text = data["legendary"] + "%";
        self.shenhuagstring.text = data["mythical"] + "%";

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
    }

    protected sleep():void{
        
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnCancel){
                self.hiden();
               
            }
        }
    }

}