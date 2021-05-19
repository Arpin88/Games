// TypeScript file
class PromptBoxView extends BaseView{
    public static NAME:string = "PromptBoxSkin";
    public constructor(){
        super(PromptBoxView.NAME);
    }

    private groupPromptBox:eui.Group;
    private lblContent:eui.Label;
    private btnConfirm:eui.Button;
    private btnCancel:eui.Button;
    private btnConfirmCenter:eui.Button;
    

    private callbackHandler:Handler;
    private btnLbls:any;
    private contextColor:number;

    private content:string;

    private labelObj:any;   //语言包

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }
        self.labelObj = null;
    }

    private TouchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnConfirm){
                if(self.callbackHandler!=null){
                    self.callbackHandler.runWith(true);
                }
            }else if(tar==self.btnCancel){
                if(self.callbackHandler!=null){
                    self.callbackHandler.runWith(false);
                }
            }else if(tar==self.btnConfirmCenter){
                if(self.callbackHandler!=null){
                    self.callbackHandler.runWith(true);
                }
            }
            self.hiden();
        }
    }

    public setContent(content:string,callbackHandler:Handler,btnLbls:any = null,conColor?:number):void{
        var self = this;
        self.content = content;
        self.callbackHandler = callbackHandler;
        self.btnLbls = btnLbls;
        self.contextColor = conColor;

        self.updateUI();
    }

    private updateUI():void{
        var self = this;
        if(self.lblContent==null)   
            return;
        
        self.lblContent.text = self.content;
        var confirm_state:number = super.getData() as number;

        self.btnConfirm.visible = false;
        self.btnCancel.visible = false;
        self.btnConfirmCenter.visible =false;

        if(confirm_state==1){
            self.btnConfirm.visible = true;
            self.btnCancel.visible = true;
            if(self.btnLbls&&self.btnLbls.length==2){
            self.btnConfirm.label = self.btnLbls[0];
            self.btnCancel.label = self.btnLbls[1];
            }else{
                self.btnConfirm.label = self.labelObj["lbl_0"];//"确定";
                self.btnCancel.label = self.labelObj["lbl_1"];//"取消"
            }
        }else if(confirm_state==2){
            self.btnConfirmCenter.visible = true;
            if(self.btnLbls&&self.btnLbls.length>0){
                self.btnConfirmCenter.label = self.btnLbls[0];
            }else{
                self.btnConfirmCenter.label = self.labelObj["lbl_0"];//"确定";
            }
        }

        if(self.contextColor!=null){
            self.lblContent.textColor = self.contextColor;
        }else{
            self.lblContent.textColor = 0xFFFFFF;
        }
    }

}