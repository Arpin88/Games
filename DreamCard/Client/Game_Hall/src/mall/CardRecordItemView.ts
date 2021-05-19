// TypeScript file
class CardRecordItemView extends BaseView{
    public static NAME:string = "CardRecordItemSkin";

  private  showName:string;
     public constructor(){
        super(CardRecordItemView.NAME);

    }

    private groupPI:eui.Group;

    
    private imgItem:eui.Image;
    private idlb:eui.Label;
    private ordoridlb:eui.Label;
    private typelb:eui.Label;
    private cardnamelb:eui.Label;
    private qualitylb:eui.Label;
    private wuxinglb:eui.Label;
    private starlb:eui.Label;
    private attacklb:eui.Label;
    private healthlb:eui.Label;
    private ratelb:eui.Label;
    private timelb:eui.Label;
    private statelb:eui.Label;


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
     this.idlb.text = obj.ordorId;
     this.ordoridlb.text = obj.orderNo;
     
     if(obj.turntype == 1) this.typelb.text = "转出";
     else this.typelb.text = "转入";
     
     if(obj.status == "true"){
         this.statelb.text = "成功";
         this.statelb.textColor = 0x6AEF51;
     }else{
         this.statelb.text = "失败";
         this.statelb.textColor = 0xF92549;
     }
     this.cardnamelb.text = obj.cardname;
     this.qualitylb.text = obj.grade;
     this.wuxinglb.text = obj.five;
     this.starlb.text = obj.generations;
     this.attacklb.text = obj.attack;
     this.healthlb.text = obj.blood;
     this.ratelb.text = obj.oil;
     var dateString = obj.createtime;
     var dateStart:Date = new Date(dateString);
     var secondStr = ExternalFun.prototype.add0(dateStart.getSeconds().toString(),2);
     var miniStr = ExternalFun.prototype.add0(dateStart.getMinutes().toString(),2);
     var hourStr = ExternalFun.prototype.add0(dateStart.getHours().toString(),2);
     var monthStr = ExternalFun.prototype.add0((dateStart.getMonth() + 1),2)
     var dayStr = ExternalFun.prototype.add0(dateStart.getDate(),2)
     this.timelb.text = monthStr + "-" + dayStr + " " + hourStr + ":" + miniStr + ":" + secondStr;
 /*    if(obj.type == "TRANS"){
         this.typelb.text = "转出";
     }else{
         this.typelb.text = "转入";
     }
     
     
     

     this.numlb.text = (obj.payableAmount/100000000).toFixed(2);
     this.ranyoulb.text = obj.feeAmount;
     this.shouxulb.text = (obj.rate/100000000).toFixed(2);*/
    }

    public setisBagShow(isShow:number):void{
        if(isShow == 1){
            this.imgItem.$setVisible(true);
        }else{
            this.imgItem.$setVisible(false);
        }
        
    }

    //返回视图宽度
    public getViewWidth():number{
        return 1186;//this.groupPI.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return 53;//this.groupPI.height;
    }

    //设置层级name
    public setBtnName(str:string):void{
      //  this.btnBuy.name = str;
    }
}