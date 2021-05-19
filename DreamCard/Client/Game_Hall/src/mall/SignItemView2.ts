// TypeScript file
class SignItemView2 extends BaseView{
    public static NAME:string = "SignItemSkin2";

  private  showName:string;
     public constructor(){
        super(SignItemView2.NAME);

    }

    private groupPI:eui.Group;
    private imgIcon:eui.Image;
    private imgIcon1:eui.Image;
    private imgAdd:eui.Image;
    private imgTxt:eui.Image;
    private imgBg:eui.Image;
    private imgGet:eui.Image;
    private lightFrame:eui.Image;
    private labelNum:eui.Label;
    private labelNum1:eui.Label;
    private labelDays:eui.Label;
    private tittleAry = ["第一天","第二天","第三天","第四天","第五天","第六天","第七天"];


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
        var tittleidx = obj["tittle"];
        var txt:string = this.tittleAry[tittleidx];
        this.labelDays.text = txt;

        var num = obj["num"];
        this.labelNum.text = "XWG*" + num;
        this.labelNum1.text = "XWG*" + num;

        var isget = obj["isget"];
        if(isget == 0){
            this.imgGet.$setVisible(false);
        }else{
            this.imgGet.$setVisible(true);
        }

        var islight = obj["islight"];
        if(islight == 0){
            this.lightFrame.$setVisible(false);
        }else{
            this.lightFrame.$setVisible(true);
        }

        var isloss = obj["isloss"];
        if(isloss == 1){
             ExternalFun.prototype.setImgGray(this.imgIcon); 
             ExternalFun.prototype.setImgGray(this.imgIcon1); 
             ExternalFun.prototype.setImgGray(this.imgAdd);
             ExternalFun.prototype.setImgGray(this.imgBg);
             ExternalFun.prototype.setImgGray(this.imgTxt);
        }
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