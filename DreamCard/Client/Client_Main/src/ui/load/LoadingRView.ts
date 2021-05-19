// TypeScript file

class LoadingRView extends BaseView{
    public static NAME:string = "LoadingRSkin";

    private imgZQ:eui.Image;

    public constructor(){
        super(LoadingRView.NAME);
    }

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.Event.ENTER_FRAME)){
            self.addEventListener(egret.Event.ENTER_FRAME,self.onEnterFrame,self);
        }
        self.imgZQ.anchorOffsetX = self.imgZQ.width/2;
        self.imgZQ.anchorOffsetY = self.imgZQ.height/2;
        self.imgZQ.x = GameConfig.curWidth()/2;
        self.imgZQ.y = GameConfig.curHeight()/2;
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.Event.ENTER_FRAME)){
            self.removeEventListener(egret.Event.ENTER_FRAME,self.onEnterFrame,self);
        }
    }

    private onEnterFrame(e:egret.Event):void{
        var self = this;
        if(self.imgZQ){
            self.imgZQ.rotation+=10;
        }
    }

}