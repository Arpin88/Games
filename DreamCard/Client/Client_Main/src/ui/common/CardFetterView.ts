// TypeScript file
class CardFetterView extends IBaseView{
    public static NAME:string = "CardFetterSkin";

     public constructor(){
        super(CardFetterView.NAME);
    }

    private groupCF:eui.Group;      //卡牌羁绊层
    private imgIcon:eui.Image;      //羁绊图标
    private btnFetter:eui.Button;   //羁绊背景按钮


    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        
        var icon:string = data.icon;
        self.setIcon(icon);
        self.setColor(data.color);

        var canTouch:boolean = data.canTouch;
        canTouch= (canTouch==null||canTouch==undefined)?true:canTouch;
        self.btnFetter.touchEnabled = canTouch;

        var visible:boolean = data.visible;
        visible= (visible==null||visible==undefined)?true:visible;
        self.btnFetter.visible = visible;

        var name:string = data.name;
        self.setBtnName(name);
    }

    protected sleep():void{

    }

    private setIcon(data:string):void{
        this.imgIcon.source =  "fetterSheet_json." + data ;
    }

    private setColor(data:string):void{
        var self = this;
        var source:string = "fetterCommonImg0Sheet_json.jb";
        var btnNor_Image:eui.Image = <eui.Image>self.btnFetter.getChildAt(0);
        btnNor_Image.source = source + data + "_0";
        var arr2States = self.btnFetter.skin.states;
        var property2Down:eui.SetProperty = <eui.SetProperty>arr2States[1].overrides[0];
        property2Down.value = source + data + "_1";
    }

    //设置按钮名称;
    private setBtnName(name:string):void{
        var str:string = (name==null||name==undefined)?"":name;
        this.btnFetter.name = str;
    }
}