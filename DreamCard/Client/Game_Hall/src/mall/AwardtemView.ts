// TypeScript file
class AwardtemView extends BaseView{
    public static NAME:string = "AwardItemSkin";

  private  showName:string;
     public constructor(){
        super(AwardtemView.NAME);

    }

    private groupPI:eui.Group;

    
    private imgHead:eui.Image;
    private labelName:eui.Label;
    private labelDsc:eui.Label;
    private labelNum:eui.Label;
    private btnconfirm:eui.Button;


    protected week():void{
        var self = this;
    //    this.thename.text = this.showName;

        var data = super.getData();
        if(data==null)
            return;
    /*    var name = data.name;

        this.thename.text  = name;
        this.price.text  = data.price + " XWG";
        this.btnBuy.label = "购买:" + data.price;
        self.setIcon(data["icon"]);*/
    }

    protected sleep():void{
        
    }

    public setData(obj:any){
        var txt = obj["tittle"];
        this.labelName.text = txt;

        var desc = obj["desc"];
        this.labelDsc.text = desc;

        var awardnum = obj["awardnum"];
        this.labelNum.text = "X " + awardnum;
        
    }

    public setisBagShow(isShow:number):void{
        
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
      //  this.btnBuy.name = str;
    }
}