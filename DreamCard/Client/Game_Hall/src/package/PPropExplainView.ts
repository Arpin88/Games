// TypeScript file
class PPropExplainView extends BaseView{
    public static NAME:string = "PPropExplainSkin";

    public constructor(){
        super(PPropExplainView.NAME);
    }

    private rectBG:eui.Rect;
    // private btnDestroy:eui.Button;
    private btnUse:eui.Button;

    private labItemName:eui.Label;
    private imgItem:eui.Image;
    private labTips:eui.Label;
    private labCost:eui.Label;
    private bagid:number = 0;
    private itemIdx:number;

    private yyTxt:string = " (拥有";
    private xgTxt:string = "（花费: ";
    private jianTxt:string = "件)";
    protected week():void{
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.yyTxt = "(Owen: ";
            self.xgTxt = "(Cost: ";
            self.jianTxt = ")";
        }

        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        var type = data.type;
        var icon:string = "";
        self.setIcon(icon);
        var name:string = type.shopName;
        var num:number = type.shopNum;
        self.setItemName(name,num);
        var tipstr:string = type.shop_desc;
        self.setItemTips(tipstr);
        var cost:number = type.price;
        self.setItemCost(cost);
        self.bagid = type.bagId;
        this.itemIdx = data.idx

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
    }

    protected sleep():void{
        
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnUse){
                self.hiden();
               // UIManager.getInstance().showUI(CardView); // 这是测试面板

                // let obj = new Object();
                // obj["bagId"] = self.bagid;
                // obj["itemIdx"] = self.itemIdx ;
                // let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                // HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Baguse,obj,true);
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
    }

    private setIcon(str:string):void{
        if(str != null || str != "undefine")
        {
            return;
        }
        this.imgItem.source = str;
    }

    private setItemName(name:string,num:number):void{
        this.labItemName.text = name+this.yyTxt+num+this.jianTxt;
    }

    private setItemTips(str:string):void{
        this.labTips.text = str;
    }

    private setItemCost(cost:number):void{
        this.labCost.text = this.xgTxt + cost + "XWG)";
    }

    
}