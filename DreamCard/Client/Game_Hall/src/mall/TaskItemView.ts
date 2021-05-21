// TypeScript file
class TaskItemView extends BaseView{
    public static NAME:string = "TaskItemSkin";

  private  showName:string;
     public constructor(){
        super(TaskItemView.NAME);

    }

    private groupPI:eui.Group;

    
    private imgHead:eui.Image;
    private iconImg:eui.Image;
    private labelLv:eui.Label;
    private labelDsc:eui.Label;
    private labelNum:eui.Label;
    private btnconfirm:eui.Button;
    private taskid:string = "";
    private completed:boolean = false;
    private icon:string = "";
    private turnview:string = "";
    private towardStr:string = "";
    private getStr:string = "";
    private unGetstr:string = "";
    private registwardstr:string = "";
    protected week():void{
        var self = this;
    //    this.thename.text = this.showName;

        var data = super.getData();
        if(data==null)
            return;
        var name = data.name;

        

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
     //   self.setIcon(data["icon"]);
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
             if(btn==self.btnconfirm){
                if(this.icon == "yaoqing"){
                    this.btnconfirm.label = this.getStr;
                    this.btnconfirm.$setEnabled(false);
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_REGISTER_GIFT_PACK,{},false);
                }else{
                    this.gotoView(this.turnview);
                    GameEventManager.getInstance().dispatchEvent(HallEvent.taskitemclick, null);
                }
            }
        }
    }

    private gotoView(view:string):void{
        switch(view){
            
            case "Change":
                UIManager.getInstance().showUI(ExchangeView); 
                break;
            case "MatchingView": 
                UIManager.getInstance().showUI(MatchingView); 
                break; 
            case "RoleUpgradeView":
                UIManager.getInstance().showUI(RoleUpgradeView);  
                break;
        }
    }

    protected sleep():void{
         this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);
    }

    public setData(obj:any){
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            this.towardStr = "Go To";
            this.getStr = "Completed";
            this.unGetstr = "Get";
            this.registwardstr = "Card *1 EXP book *1";
        }

        var tittle = obj["tittle"];
        this.labelLv.text = tittle;

        var desc = obj["desc"];
        this.labelDsc.text = desc;

        var awardnum = obj["awardnum"];
        this.labelNum.text = "   * " + awardnum;
        this.taskid = obj["id"];
        this.turnview = obj["turnview"];

        var icon = obj["icon"];
        this.icon = icon;
        if(icon != null){
            this.imgHead.source = "tasksheet_json." + icon;
        }        
        
        var completed = obj["completed"];
        this.completed = completed;
        if(icon == "yaoqing"){  
            this.iconImg.$setVisible(false);
            this.labelNum.text = this.registwardstr;
            this.labelNum.size = 22;
            this.labelNum.x = 250;
            if(completed == true){
                this.btnconfirm.label = this.getStr;
                this.btnconfirm.$setEnabled(false);
            }else{
                this.btnconfirm.label = this.unGetstr;
                this.btnconfirm.$setEnabled(true);
            }
        }else{
            if(completed == true){
                this.btnconfirm.label = this.getStr;
                this.btnconfirm.$setEnabled(false);
            }else{
                this.btnconfirm.label = this.towardStr;
            }
        }
        


        if(!this.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);
        }
    }

    public setisBagShow(isShow:number):void{
       /* if(isShow == 1){
            this.imgItem.$setVisible(true);
        }else{
            this.imgItem.$setVisible(false);
        }*/
        
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

 
    public getConfirmBtn():eui.Button{
        return this.btnconfirm;
    }
}