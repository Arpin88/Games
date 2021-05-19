// TypeScript file
class CRBuffItemView extends IBaseView{
    public static NAME:string = "CRBuffItemSkin";

     public constructor(){
        super(CRBuffItemView.NAME);
    }

    private groupBufftem:eui.Group;

    private imgIcon:eui.Image;
    private lblName:eui.Label;

    private buffKey:string;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        
        self.buffKey = data.skillKey;
        var buffRound:number = data.buffRound;
        var iconRes:string = data.iconRes;
        self.updateShow(buffRound,iconRes);
    }

    protected sleep():void{
        var self = this;

    }

    public updateShow(buffRound:number,iconRes:string=""){
        var self = this;
        self.lblName.text = buffRound+"";
        if(iconRes!=""){
            self.imgIcon.source = iconRes;
        }
    }

    public getCurBuffKey():string{
        return this.buffKey;
    }


    public getViewWidth():number{
        return this.groupBufftem.width;
    }
}