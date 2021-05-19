// TypeScript file
class TaskItemView extends BaseView{
    public static NAME:string = "TaskItemSkin";

  private  showName:string;
     public constructor(){
        super(TaskItemView.NAME);

    }

    private groupPI:eui.Group;

    
    private imgHead:eui.Image;
    private labelLv:eui.Label;
    private labelDsc:eui.Label;
    private labelNum:eui.Label;
    private btnconfirm:eui.Button;

    protected week():void{
        var self = this;
    //    this.thename.text = this.showName;

        var data = super.getData();
        if(data==null)
            return;
        var name = data.name;


     //   self.setIcon(data["icon"]);
    }

    protected sleep():void{
        
    }

    public setData(obj:any){
        var Lv = obj["Lv"];
        this.labelLv.text = Lv;

        var desc = obj["desc"];
        this.labelDsc.text = desc;

        var awardnum = obj["awardnum"];
        this.labelNum.text = "X " + awardnum;
    }

    public setisBagShow(isShow:number):void{
       /* if(isShow == 1){
            this.imgItem.$setVisible(true);
        }else{
            this.imgItem.$setVisible(false);
        }*/
        
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