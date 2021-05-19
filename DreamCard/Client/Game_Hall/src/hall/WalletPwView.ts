// TypeScript file
class WalletPwView extends BaseView{
    public static NAME:string = "PWSkin";

    public constructor(){
        super(WalletPwView.NAME);
    }
//
    private rectBG:eui.Rect;
    private btnConfirm11:eui.Button;
    private btnBack:eui.Button;
    private showTxt:eui.Label;
    private func:any = null;
    private editCount:eui.EditableText;
    private oldString:string = "";
    private cashNum:number = 0;
    private cashOil:number = 0;

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);

        var data = super.getData();
        if(data==null)
            return;
        var type = data.name;
        this.func = data.fun;
        this.cashNum = data.num;
        this.cashOil = data.oil;

        self.showTxt.text = type;
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
        if(this.editCount.text.length > 6) {
            this.editCount.text = self.oldString;
        }
        if(this.editCount.text != ""){
            if(self.isNumber(this.editCount.text) == true) self.oldString = this.editCount.text
            else this.editCount.text = self.oldString;
        }
        
    }

    private outHandler(evt:eui.UIEvent):void{
        var self = this;
        var num = parseInt(this.editCount.text);
    }

    protected sleep():void{
        
    }

    public SetTxt(txt:string):void
    {
        this.showTxt.text = txt;
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            if(tar==self.btnConfirm11){
                self.hiden();
              //  console.log(`确定被按下`);
                if(this.func != null)
                {
                    this.func(self.editCount.text,this.cashNum,this.cashOil);
                }
                
            }else if(tar==self.btnBack){
                self.hiden();
                console.log(`取消被按下`);
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
    }
}