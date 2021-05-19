// TypeScript file
class CRCardItemView extends IBaseView implements ExpFromImpl{

    public static NAME:string = "CRCardItemSkin";

     public constructor(){
        super(CRCardItemView.NAME);
    }

    private groupBack:eui.Group;            //后面层
    private groupCard:eui.Group;            //卡牌层
    private groupBuffIcon:eui.Group;        //BUFF图标层
    private groupFront:eui.Group;           //前面层

    private cardView:CardRectangleView;   //长方形卡牌视图
    private cardData:Object;

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

        var view:CardRectangleView = new CardRectangleView();
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

    //设置伤害
    public setDamage(num:number):void{
        if(num==0)
            return;
        var self = this;
        if(self.cardView==null)
            return;
        self.cardView.setDamage(num);
    }

    //修改生命上限
    public modifyLimitHp(num:number):void{
        if(num==0)
            return;
        var self = this;
        if(self.cardView==null)
            return;
        self.cardView.modifyLimitHp(num);
    }

    //修改攻击力
    public modifyAtk(num:number):void{
        if(num==0)
            return;
        var self = this;
        if(self.cardView==null)
            return;
        self.cardView.modifyAtk(num);
    }

    //更新卡牌数据
    public updateCardData(data:any):void{
        var self = this;
        var scaleX:number = self.cardView==null?1:self.cardView.scaleX;
        var scaleY:number = self.cardView ==null?1:self.cardView.scaleY;
        self.setCardItem(data,scaleX,scaleY);
    }


    public forceUpdateAtk(num:number):void{
        this.cardView.setAtk(num);
    }

    public forceUpdateHp(num:number):void{
        this.cardView.setHp(num);
    }
    // //修改血量
    // public modifyHp(num:number):void{
    //     var self = this;
    //     if(self.cardView==null)
    //         return;
    //     var origHp:number = self.cardView.getHp();
    //     self.cardView.setHp(self.cardView.getHp()+num);
    // }

    // //返回血量
    // public getHp():number{
    //     var self = this;
    //     if(self.cardView==null)
    //         return 0;
    //     return self.cardView.getHp();
    // }

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
            case 2:
            group = self.groupBuffIcon;
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