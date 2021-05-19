// TypeScript file

class TextView extends BaseView{
    public static NAME:string = "TextSkin";

    private text:eui.Label;

    public constructor(){
        super(TextView.NAME);
    }

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.Event.ENTER_FRAME)){
            self.addEventListener(egret.Event.ENTER_FRAME,self.onEnterFrame,self);
        }
        self.text.anchorOffsetX = self.text.width/2;
        self.text.anchorOffsetY = self.text.height/2;
        self.text.x = GameConfig.curWidth()/2;
        self.text.y = GameConfig.curHeight()/2;
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.Event.ENTER_FRAME)){
            self.removeEventListener(egret.Event.ENTER_FRAME,self.onEnterFrame,self);
        }
    }

    private onEnterFrame(e:egret.Event):void{
        var self = this;
        if(self.text){
            self.text.rotation+=20;
        }
    }

}