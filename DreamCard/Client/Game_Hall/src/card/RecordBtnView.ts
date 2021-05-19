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



    public getViewWidth():number{
        return this.groupOB.width;
    }


    public getViewHeight():number{
        var self = this;
        var height:number = self.groupOB.height;
        return height;
    }


    public setBtnTmContent(str:string):void{
        this.labTm.text = str;
    }


    public setBtnTmContent1(str:string):void{
        this.labTm0.text = str;
    }


    public getBtnTmContent():string{
        return this.labTm.text;
    }


    public setBtnScoreContent(str:string):void{
        this.labScore.text = str;
    }


    public getBtnScoreContent():string{
        return this.labScore.text;
    }

 
    public setBtnRewardImg(index:number):void{
        if(index == 1)
            this.imgReward.source = "hallImg0Sheet_json.a36x36";
        else
            this.imgReward.source = "combatRecordSheet_json.exp";
    }


    public setBtnName(name:string):void{
        this.btnRecord.name = name;
    }

    public getBtnName():string{
        return this.btnRecord.name;
    }


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


    public getCurChooseState():number{
        return this.curChooseState;
    }

}