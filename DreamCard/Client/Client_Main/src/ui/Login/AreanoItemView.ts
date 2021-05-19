// TypeScript file
class AreanoItemView extends BaseView{
    public static NAME:string = "AreanoItemSkin";
    public constructor(){
        super(AreanoItemView.NAME);
    }

    private rectBG:eui.Rect;
    private lblContent:eui.Label;
    private imgChoose:eui.Image;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        
        var content:any = data.content;
        self.lblContent.text = "+"+content.code+" "+content.name+"("+content.short+")";
        self.rectBG.name = "ano_"+data.index;
    }

    protected sleep():void{

    }

    public setChooseState(choose:boolean){
        var self = this;

        self.imgChoose.visible = choose;
        self.rectBG.fillColor = choose?0x98b1c0:0x000000;
        self.lblContent.textColor = choose?0xffffff:0x85A1BC;
    }

    public get
}