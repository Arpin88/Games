// TypeScript file
class CRFetterItemView extends IBaseView{
    public static NAME:string = "CRFetterItemSkin";

     public constructor(){
        super(CRFetterItemView.NAME);
    }

    private imgIcon:eui.Image;

    private fetterKey:string;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        
        self.fetterKey = data.skillKey;
        var iconRes:string = data.iconRes;
        self.updateShow(iconRes);
    }

    protected sleep():void{
        var self = this;

    }

    public updateShow(iconRes:string=""){
        var self = this;
        if(iconRes!=""){
            self.imgIcon.source = iconRes;
            self.imgIcon.scaleX = 1.2;
            self.imgIcon.scaleY = 1.2;
            self.imgIcon.alpha = 0;
            egret.Tween.get(self.imgIcon).to({alpha:1},1000).wait(500).to({scaleX:1,scaleY:1},500);
        }
    }

    public getCurFetterKey():string{
        return this.fetterKey;
    }

}