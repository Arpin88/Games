// TypeScript file
class RecordItemView extends BaseView{
    public static NAME:string = "RecordItemSkin";

  private  showName:string;
     public constructor(){
        super(RecordItemView.NAME);

    }

    private groupPI:eui.Group;

    
    private imgItem:eui.Image;
    private idlb:eui.Label;
    private ordoridlb:eui.Label;
    private typelb:eui.Label;
    private numlb:eui.Label;
    private ranyoulb:eui.Label;
    private shouxulb:eui.Label;
    private starlb:eui.Label;
    private attacklb:eui.Label;
    private healthlb:eui.Label;
    private ratelb:eui.Label;
    private timelb:eui.Label;
    private statelb:eui.Label;



    protected week():void{
        var self = this;

        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           this.turnStr1 = "In";
           this.turnStr2 = "Out";
           this.statuStr1 = "Success";
           this.statuStr2 = "Fail";
           this.cashStr = "Cash";
           this.changeStr = "Charge";
        }

        var data = super.getData();
        if(data==null)
            return;
    }

    protected sleep():void{
        
    }

    public setData(obj:any){
     this.idlb.text = obj.ordorId;
     this.ordoridlb.text = obj.orderNo;
     
     if(obj.type == "TRANS"){
         this.typelb.text = this.turnStr1;
     }else if(obj.type == "CASHOUT"){
         this.typelb.text = this.cashStr;
    }else if(obj.type == "CHARGE"){
         this.typelb.text = this.changeStr;
     }else{
         this.typelb.text = this.turnStr2;
     }
     
     if(obj.status == "SUCCESS"){
         this.statelb.text = this.statuStr1;
         this.statelb.textColor = 0x6AEF51;
     }else{
         this.statelb.text = this.statuStr2;
         this.statelb.textColor = 0xF92549;
     }
     
     var dateString = obj.createdAt;

         
        var dateStart:Date = new Date(dateString);
        
        var secondStr = ExternalFun.prototype.add0(dateStart.getSeconds().toString(),2);
        var miniStr = ExternalFun.prototype.add0(dateStart.getMinutes().toString(),2);
        var hourStr = ExternalFun.prototype.add0(dateStart.getHours().toString(),2);
        var monthStr = ExternalFun.prototype.add0((dateStart.getMonth() + 1),2)
        var dayStr = ExternalFun.prototype.add0(dateStart.getDate(),2)
       /* if(monthStr == null) monthStr = " ";
        if(dayStr == null) dayStr = " ";
        if(hourStr == null) hourStr = " ";
        if(miniStr == null) miniStr = " ";
        if(secondStr == null) secondStr = " ";*/
        this.timelb.text = monthStr + "-" + dayStr + " " + hourStr + ":" + miniStr + ":" + secondStr;


     

     this.numlb.text = (obj.payableAmount/100000000).toFixed(2);
     this.ranyoulb.text = (obj.feeAmount/100000000).toFixed(2);
     this.shouxulb.text = (obj.rate/100000000).toFixed(2);
    }

    public setisBagShow(isShow:number):void{
        if(isShow == 1){
            this.imgItem.$setVisible(true);
        }else{
            this.imgItem.$setVisible(false);
        }
        
    }


    public getViewWidth():number{
        return this.groupPI.width;
    }


    public getViewHeight():number{
        return this.groupPI.height;
    }


    public setBtnName(str:string):void{
      //  this.btnBuy.name = str;
    }
}