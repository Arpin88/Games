// TypeScript file
class OptionBtnItemView extends BaseView{
    public static NAME:string = "OptionBtnItemSkin";

     public constructor(){
        super(OptionBtnItemView.NAME);
    }

    private groupOIB:eui.Group;
    private btnOptionItem:eui.Button;
    private lblDes:eui.Label;
    private imgChooseState:eui.Image;

    private curChooseState:number = 0;
    private lblDesNColor:number;
    private lblDesStrokeNColor:number;
    private lblDesCColor:number;
    private lblDesStrokeCColor:number;

    protected week():void{
        var self = this;
        self.lblDesNColor = 0x9c6f43;
        self.lblDesStrokeNColor = 0x13131b;
        self.lblDesCColor = 0xe9fcff;
        self.lblDesStrokeCColor = 0xb8f7ff;

        self.setCurChoose();
    }

    protected sleep():void{
        
    }

    //返回视图宽度
    public getViewWidth():number{
        return this.groupOIB.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupOIB.height;
    }

    //设置按钮内容;
    public setBtnContent(str:string):void{
        this.lblDes.text = str;
    }

    //返回按钮内容;
    public getBtnContent():string{
        return this.lblDes.text;
    }

    //设置按钮name
    public setBtnName(name:string):void{
        this.btnOptionItem.name = name;
    }

    //返回按钮name
    public getBtnName():string{
        return this.btnOptionItem.name;
    }

    //设置当前是否为选择状态;0为正常状态,1为选中状态 按钮是否可以点击
    public setCurChoose(state:number = 0,btnTouchEnabled:boolean = false):void{
        var self = this;
        if(self.curChooseState==state)
            return;
        self.curChooseState = state;
        if(btnTouchEnabled)
            self.btnOptionItem.touchEnabled = state==0;
        self.imgChooseState.visible = state==1;
        self.lblDes.textColor = state==0?self.lblDesNColor:self.lblDesCColor;
        self.lblDes.strokeColor = state==0?self.lblDesStrokeNColor:self.lblDesStrokeCColor;
    }

    public getCurChooseState():number{
        return this.curChooseState;
    }
}