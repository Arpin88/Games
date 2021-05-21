// TypeScript file
class ComingSoonView extends BaseView{
    public static NAME:string = "ComingSoonSkin";
    public constructor(){
        super(ComingSoonView.NAME);
    }

    private groupComingSoon:eui.Group;

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupComingSoon==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupComingSoon.scaleX = 
            self.groupComingSoon.scaleY = 1;
            return;
        }
        self.groupComingSoon.scaleX = 
        self.groupComingSoon.scaleY = gapNum;
    }
}