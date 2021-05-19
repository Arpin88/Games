// TypeScript file
class CSCardItemView extends IBaseView implements ExpFromImpl{

    public static NAME:string = "CSCardItemSkin";

     public constructor(){
        super(CSCardItemView.NAME);
    }

    private groupBack:eui.Group;            //后面层
    private groupCard:eui.Group;            //卡牌层
    private groupFront:eui.Group;           //前面层

    private cardView:CardSquareView;   //正方形卡牌视图
    private cardData:Object;

    private cardState:number = CombatConstants.CARD_STATE_NOR;       //卡牌状态 0无状态 1可点击状态 2已点击状态 

    protected week():void{
        var self = this;

        var data = super.getData();
        if(data==null)
            return;
        
        self.anchorOffsetX = self.width/2;
        self.anchorOffsetY = self.height/2;
        
        var scaleX:number = data.cscaleX==null?1:data.cscaleX;
        var scaleY:number = data.cscaleY==null?1:data.cscaleY;
        var cdata:Object = data.cdata;
        self.setCardItem(cdata,scaleX,scaleY);
    }

    protected sleep():void{
        var self = this;
        self.removeCard();
    }

    private setCardItem(data:Object,scaleX:number,scaleY:number):void{
        var self = this; 

        self.removeCard();
        self.cardData = data;

        if(LanguageManager.getInstance().getCurLanguageType()==1&&data.hasOwnProperty("name_en"))
            self.cardData["name"] = data["name_en"];

        var view:CardSquareView = new CardSquareView();
        view.initData(data);
        view.x = 0;
        view.y = 0;
        view.scaleX = scaleX;
        view.scaleY = scaleY;
        self.groupCard.addChild(view);
        self.cardView = view;
    }

    private removeCard():void{
        var self = this;
        if(self.cardView!=null){
            self.cardView.parent.removeChild(self.cardView);
            self.cardView = null;
        }
        self.cardData = null;
    }





    public getCardData():Object{
        return this.cardData;
    }

    //返回卡牌状态
    public getCardState():number{
        return this.cardState;
    }
    //设置卡牌状态
    public setCardState(state:number):void{
        this.cardState = state;
    }

    //改变卡牌视图颜色
    public changeCardViewColor(grey:boolean):void{
        this.cardView.changeViewColor(grey);
    }

    //减少回合
    public reduceRound(canTouch:boolean = false):void{
        var self = this;
        var curRound:number = self.cardView.reduceRound();
        if(curRound<=0){
            self.setTouchState(canTouch);
        }
    }

    //设置点击状态
    public setTouchState(canTouch:boolean = false):void{
        var self = this;
        var curRound:number = self.cardView.getCurRound();
        if(curRound<=0&&canTouch){
            self.playClickableEffect();
            //当回合为0的时候则设置成可点击出牌状态
            if(self.cardState==CombatConstants.CARD_STATE_NOR||self.cardState==CombatConstants.CARD_STATE_NON_CLICKABLE)
                self.cardState = CombatConstants.CARD_STATE_CLICKABLE;
            
            return;
        }
        self.setNonClickable();
    }

    //设置成不可点击状态
    public setNonClickable():void{
        var self = this;
        self.cancelClickableEffect();
        self.cardState = CombatConstants.CARD_STATE_NON_CLICKABLE;
    }

    //播放光圈特效
    private playClickableEffect():void{
        this.getFightExpForm().addSCContinueSkill(CombatConstants.EFF_CLICKABLE,CombatConstants.SKILL_RES_ATTR);
    }

    //取消光圈特效
    public cancelClickableEffect():void{
        this.getFightExpForm().removeContinueSkill(CombatConstants.EFF_CLICKABLE);
    }


    public fightExpForm:FightExpForm;
    //返回父类根据深度
    public getParentByZIndex(zIndex:number):egret.DisplayObjectContainer{
        return zIndex!=-1?this.groupFront:this.groupBack;
    }
    //返回父类根据类型
    public getParentByType(type:number):egret.DisplayObjectContainer{
        var self = this;
        var group:eui.Group = self.groupFront;
        switch(type){
            case 0:
            group = self.groupBack;
            break;
            case 1:
            group = self.groupFront;
            break;
            default:
            group = self.groupFront;
            break;
        }
        return group;
    }
    //返回战斗表现
    public getFightExpForm():FightExpForm{
        var self = this;
        if(self.fightExpForm==null)
            self.fightExpForm = new FightExpForm(self);
        return self.fightExpForm;
    }
}