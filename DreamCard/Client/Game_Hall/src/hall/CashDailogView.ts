// TypeScript file
class CashDailogView extends BaseView{
    public static NAME:string = "CashSkin";

    public constructor(){
        super(CashDailogView.NAME);
    }

    private rectBG:eui.Rect;
    private btnConfirm11:eui.Button;
    private btnBack:eui.Button;
    private walletnumlb:eui.Label;
    private addrlb:eui.Label;
    private numlb:eui.Label;
    private func:any = null;
    private editCount:eui.EditableText;
    private oldString:string = "";
    private walletObj:Object;

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
        this.walletObj = data.walletObj;

        self.setViewByData();
    }

    private setViewByData(): void
    {
        this.addrlb.text = this.walletObj["chain_address"];

        var num = parseInt(this.walletObj["available"])/100000000;
        var aaa = num.toFixed(2);
        this.walletnumlb.text = aaa;
        this.numlb.text = this.editCount.text;
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

   private isRealNum(val){
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
    　　if(val === "" || val ==null){
            return false;
    　　}
        if(!isNaN(val)){　　　　
        　　//对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    　　　 return true; 
    　　}

    　else{ 
    　　　　return false; 
    　　} 
    }

    private moveHandler(evt: eui.UIEvent): void {
        var self = this;
        if(this.editCount.text.length > 20) {
            this.editCount.text = self.oldString;
        }
        if(this.editCount.text != ""){
            if(self.isRealNum(this.editCount.text) == true) {
                let x = String(this.editCount.text).indexOf('.') + 1;
                if(x == 0) x = this.editCount.text.length;
                let y = String(this.editCount.text).length - x;
                if(y > 2) this.editCount.text = self.oldString;
                else self.oldString = this.editCount.text
            }
            else this.editCount.text = self.oldString;
        }
        
        this.numlb.text = this.editCount.text;
    }

    private outHandler(evt:eui.UIEvent):void{
        var self = this;
        var num = parseInt(this.editCount.text);
    }

    protected sleep():void{
        
    }

    public SetTxt(txt:string):void
    {

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
                    this.func(self.editCount.text);
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