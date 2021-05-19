// TypeScript file
class MPropExplainView extends BaseView{
    public static NAME:string = "MPropExplainSkin";

    public constructor(){
        super(MPropExplainView.NAME);
    }

    private groupMPropExplain:eui.Group;

    private rectBG:eui.Rect;
    private btnConfirm:eui.Button;
    private btnCancel:eui.Button;

    private btnReduce:eui.Button;
    private btnAdd:eui.Button;
    private btnMax:eui.Button;
    private editCount:eui.EditableText;
    private oldString:string = "";

    private price:eui.Label;
    private nameandnum:eui.Label;  
    private namstring:eui.Label;    
    private totalnum:eui.Label;
    private descstring:eui.Label;    
    private selectNum:number;
    private  maxNum:number;
    private itemPrice:number;
    // private shopOrder:number;
    // private shopKind:number;
    // private itemIdx:number;
    private imgItem:eui.Image;

    private huafeiTxt = "（花费：";
    private yiyouTxt = "(已有 ";
    private geTxt = " 个)";
    private tishiTxt = "请输入正确数字";

    private expPotionsCode:string = "3";    //经验药水编号 用于新手引导购买经验药水

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        } 

        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.huafeiTxt = "（cost：";
            self.yiyouTxt = "(";
            self.geTxt = " Owned)";
            self.tishiTxt = "Please enter quantity";
        }   

        var data = super.getData();
        if(data==null)
            return;
        // var type = data.type;
        // this.selectNum = 1;
        // this.maxNum = type.shopNum;
        // this.totalnum.text = self.huafeiTxt + this.selectNum*type.price +" XWG)"
        // this.editCount.text = this.selectNum + "";
        // this.nameandnum.text = type.shopNum + self.geTxt;
        // this.namstring.text = type.name + self.yiyouTxt + type.shopNum + self.geTxt;
        // this.descstring.text = type.shopDesc;
        // this.price.text = type.price + " XWG";
        // this.itemPrice = type.price;
        // this.shopOrder = type.shopOrder;
        // this.shopKind = type.shopKind;
        // this.itemIdx = data.idx
        // self.setIcon(type.resUrl);

        this.selectNum = 1;
        var info:any = data.info;
        this.totalnum.text = self.huafeiTxt + this.selectNum*info.price +" XWG)";
        //  this.editCount.text = this.selectNum + "";
        this.editCount.text = "1";
        this.nameandnum.text = info.ownCount + self.geTxt;
        this.namstring.text = info.name + self.yiyouTxt + info.ownCount + self.geTxt;
        this.descstring.text = info.desc;
        this.price.text = info.price + " XWG";
        this.itemPrice = info.price;
        // this.shopOrder = info.shopOrder;
        // this.shopKind = info.shopKind;
        // this.itemIdx = data.idx
        self.setIcon(info.resUrl);

        var shopCode:string = info.shopCode;
        if(shopCode==self.expPotionsCode){
            if(UIManager.getInstance().checkHasViewByName(GuideView))
                GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
        }

        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
    }

    private setIcon(str:string):void{
        if(str == "")
            return;
        this.imgItem.source = "propSheet_json." + str;
    }

    protected sleep():void{
        
    }

   private  isNumber(val) {
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	if(regPos.test(val) || regNeg.test(val)) {
		return true;
		} else {
		return false;
		}
	}

    private moveHandler(evt: eui.UIEvent): void {
        var self = this;
        if(this.editCount.text.length > 7) {
            this.editCount.text = self.oldString;
        }
        if(this.editCount.text != ""){
            if(self.isNumber(this.editCount.text) == true) self.oldString = this.editCount.text
            else this.editCount.text = self.oldString;
        }
        
        
        var num = parseInt(this.editCount.text);
        if(self.isNumber(this.editCount.text) == true)
        {
            this.totalnum.text = self.huafeiTxt + num * this.itemPrice +" XWG)"
        }
    }

    private outHandler(evt:eui.UIEvent):void{
        var self = this;
        var num = parseInt(this.editCount.text);
        if(self.isNumber(this.editCount.text) == true)
        {
            this.totalnum.text =  self.huafeiTxt + num * this.itemPrice +" XWG)"
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnConfirm){
                self.hiden();

                var data = super.getData();
                if(data==null)
                    return;
                var info:any = data.info;
                if(info.shopCode==self.expPotionsCode){
                    if(UIManager.getInstance().checkHasViewByName(GuideView))
                        GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                }

                var num:number = parseInt(this.editCount.text) ;
                if(self.isNumber(this.editCount.text) == false)
                {
                    
                    PopManager.getInstance().showPromptBox(self.tishiTxt,2,Handler.create(self,function(confirm:boolean){
                        console.log(`回调函数被调用`);
                    }));
                    return;
                }

                var floornum:number = Math.floor(num);
                num = parseInt(this.editCount.text);
                if(num > floornum || num <= 0 || num >= 100000){
                    PopManager.getInstance().showPromptBox(self.tishiTxt,2,Handler.create(self,function(confirm:boolean){
                        console.log(`回调函数被调用`);
                    }));
                    return;
                }
                // 购买请求
                // let obj = new Object();
                // obj["shopOrder"] = "" + this.shopOrder;
                // obj["shopKind"] = "" + this.shopKind;
                // obj["price"] = "" + this.itemPrice;
                // obj["buyNum"] = "" + num ;
                // obj["itemIdx"] = "" + this.itemIdx;

                let obj ={shopCode:info.shopCode,count:num};
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CREATE_SHOP_PROP_TRADE,obj,true);
            }else if(tar==self.btnCancel){
                self.hiden();
            }else if(tar==self.btnReduce){
                if(this.selectNum > 1){this.selectNum = this.selectNum - 1;} 
                this.editCount.text = this.selectNum + "";
                this.totalnum.text =  self.huafeiTxt + this.selectNum*this.itemPrice +" XWG)"
            }else if(tar==self.btnAdd){
                if(this.selectNum < this.maxNum){this.selectNum = this.selectNum + 1;} 
                this.editCount.text = this.selectNum + "";
                this.totalnum.text =  self.huafeiTxt + this.selectNum*this.itemPrice +" XWG)"
            }else if(tar==self.btnMax){
                this.selectNum = this.maxNum;
                this.editCount.text = this.selectNum + "";
                this.totalnum.text =  self.huafeiTxt + this.selectNum*this.itemPrice +" XWG)"
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
    }


    public getMPropExplainGroup():eui.Group{
        return this.groupMPropExplain;
    }

    public getConfirmBtn():eui.Button{
        return this.btnConfirm;
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupMPropExplain==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupMPropExplain.scaleX = 
            self.groupMPropExplain.scaleY = 1;
            return;
        }
        self.groupMPropExplain.scaleX = 
        self.groupMPropExplain.scaleY = gapNum;
    }
    
}