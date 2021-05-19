// TypeScript file
// TypeScript file
class CardintroduceView extends BaseView{
    public static NAME:string = "CardintroduceSkin";

     public constructor(){
        super(CardintroduceView.NAME);
    }

    private imgIcon:eui.Image;  //头像
    private imgElement:eui.Image;   //头像框

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        var icon:string = data.icon;
        self.setCardHead(icon);
        var code:string = data.code;
        self.setCardName(code);

    }

    protected sleep():void{

    }

    //设置头像
    private setCardHead(str:string):void{
        if(str == null || str == undefined)
            return;
        this.imgIcon.source = str + "_json.r";
    }

    //设置名称
    private setCardName(str:string):void{
        this.imgElement.source = "introducehero_json." + str;
    }


}