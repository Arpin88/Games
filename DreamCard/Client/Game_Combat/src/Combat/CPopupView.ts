// TypeScript file
class CPopupView extends BaseView{
    public static NAME:string = "CPopupSkin";
    public constructor(){
        super(CPopupView.NAME);
    }

    private groupCPopup:eui.Group;

    private group0:eui.Group;
    private group1:eui.Group;
    private group2:eui.Group;

    private lbl0:eui.Label;
    private lbl2:eui.Label;

    private btnCance:eui.Button;
    private btnConfirm:eui.Button;
    private btnRefuse:eui.Button;
    private btnAgree:eui.Button;
    private btnConfirmCenter:eui.Button;

    private callbackHandler:Handler;

    private labelObj:any;   //语言包

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);

        var data:any = super.getData();
        self.updateShow(data);
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.labelObj = null;
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnCance){
                self.hiden();
            }else if(tar==self.btnConfirm){
                if(self.callbackHandler!=null)
                    self.callbackHandler.run();
                self.hiden();
            }else if(tar==self.btnRefuse){
                if(self.callbackHandler!=null)
                    self.callbackHandler.runWith(false);
                self.hiden();
            }else if(tar==self.btnAgree){
                if(self.callbackHandler!=null)
                    self.callbackHandler.runWith(true);
                self.hiden();
            }else if(tar==self.btnConfirmCenter){
                self.hiden();
            }
        }
    }


    private updateShow(data:any):void{
        if(data==null)
            return;
        
        var self = this;
        self.group0.visible = 
        self.group1.visible = 
        self.group2.visible = false;

        var type = data.type;
        if(type==0){
            self.group0.visible = true;
            self.lbl0.textFlow = [
                {text:self.labelObj["lbl_0"],style:{textColor:0xFFFFFF}},
                {text:data.countStr+"\n",style:{textColor:0x38c0ff}},
                {text:self.labelObj["lbl_1"],style:{textColor:0xFFFFFF}},
                {text:self.labelObj["lbl_2"],style:{textColor:0xff0606}},
            ]
            self.callbackHandler = data.callbackHandler;
        }else if(type==1){
            self.group1.visible = true;
            self.callbackHandler = data.callbackHandler;
        }else if(type==2){
            self.group2.visible = true;
            var lblStr:string = data.state==0?self.labelObj["lbl_5"]:self.labelObj["lbl_4"];
            self.lbl2.text = lblStr;
        }
    }


    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupCPopup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupCPopup.scaleX = 
            self.groupCPopup.scaleY = 1;
            return;
        }
        self.groupCPopup.scaleX = 
        self.groupCPopup.scaleY = gapNum;
    }

}