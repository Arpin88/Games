// TypeScript file
class MPropItemView extends BaseView{
    public static NAME:string = "MPropItemSkin";

  private  showName:string;
     public constructor(){
        super(MPropItemView.NAME);

    }

    private groupPI:eui.Group;
    private btnBuy:eui.Button;
    private thename:eui.Label;
    private price:eui.Label;
    private imgItem:eui.Image;

    protected week():void{
        var self = this;
    //    this.thename.text = this.showName;

        var data = super.getData();
        if(data==null)
            return;
        var name = data.name;

        this.thename.text  = name;
        this.price.text  = data.price + " XWG";
        this.btnBuy.label = "购买:" + data.price;
        self.setIcon(data["icon"]);
    }

    protected sleep():void{
        
    }

    private setIcon(str:string):void{
        if(str == "")
            return;
        this.imgItem.source = "propSheet_json." + str;
    }

    //返回视图宽度
    public getViewWidth():number{
        return this.groupPI.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupPI.height;
    }

    //设置层级name
    public setBtnName(str:string):void{
        this.btnBuy.name = str;
    }
}