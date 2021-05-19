// TypeScript file
class RecordBtnView extends BaseView{
    public static NAME:string = "RecordBtnViewSkin";

     public constructor(){
        super(RecordBtnView.NAME);
    }

    private groupOB:eui.Group;
    private btnRecord:eui.Button;
    private imgChooseState:eui.Image;
    private imgReward:eui.Image;  
    private imgJinYan:eui.Image;
    private labTm:eui.Label;
    private labTm0:eui.Label;
    private labScore:eui.Label;

    private curChooseState:number = 0;
    private labTmNColor:number;
    private labTmCColor:number;
    private labScoreNColor:number;
    private labScoreCColor:number;

    protected week():void{
        var self = this;
        self.labTmNColor = 0xFFFFFF;
        self.labTmCColor = 0xFFFFFF;
        self.labScoreNColor = 0xFFFFFF;
        self.labScoreCColor = 0xFFE468;

        self.setCurChoose();
    }

    protected sleep():void{

    }


    //返回视图%
    public getViewWidth():number{
        return this.groupOB.width;
    }

    //返回视图高度
    public getViewHeight():number{
        var self = this;
        var height:number = self.groupOB.height;
        return height;
    }

    //设置按钮时间内容;
    public setBtnTmContent(str:string):void{
        this.labTm.text = str;
    }

    //设置按钮时间内容;
    public setBtnTmContent1(str:string):void{
        this.labTm0.text = str;
    }

    //返回按钮时间内容;
    public getBtnTmContent():string{
        return this.labTm.text;
    }

    //设置按钮得分内容;
    public setBtnScoreContent(str:string):void{
        this.labScore.text = str;
    }

    //返回按钮得分内容;
    public getBtnScoreContent():string{
        return this.labScore.text;
    }

    //设置奖励图片;
    public setBtnRewardImg(index:number):void{
        if(index == 1)
            this.imgReward.source = "hallImg0Sheet_json.a36x36";
        else
            this.imgReward.source = "combatRecordSheet_json.exp";
    }

    //设置按钮name
    public setBtnName(name:string):void{
        this.btnRecord.name = name;
    }

    //返回按钮name
    public getBtnName():string{
        return this.btnRecord.name;
    }

    //设置当前是否为选择状态;0为正常状态,1为选中状态 按钮是否可以点击 
    public setCurChoose(state:number = 0,btnTouchEnabled:boolean = false):void{
        var self = this;
        if(self.curChooseState==state)
            return;
        self.curChooseState = state;
        self.labTm.textColor = state==0?self.labTmNColor:self.labTmCColor;
        self.labScore.textColor = state==0?self.labScoreNColor:self.labScoreCColor;
        if(btnTouchEnabled)
            self.btnRecord.touchEnabled = state==0;

        self.imgChooseState.visible = state == 1;
        // self.groupItem.visible = state==1;
    }

    //返回当前选择状态
    public getCurChooseState():number{
        return this.curChooseState;
    }

}