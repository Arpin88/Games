// TypeScript file
class CGSCardItemView extends IBaseView{
    public static NAME:string = "CGSCardItemSkin";

     public constructor(){
        super(CGSCardItemView.NAME);
    }


    private groupCGSCI:eui.Group;
    private groupAdd:eui.Group;
    private groupUnlock:eui.Group;
    private lblUnlock:eui.Label;
    private groupCard:eui.Group;

    private cardView:CardSquareView;
    private type:number;
    private cardData:Object;

    private labelObj:any;   //语言包
    
    protected week():void{
        var self =this;
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var data = super.getData();
        if(data==null)
            return;
        self.updateShow(data);
        var groupName:string = data.gname;
        self.groupCGSCI.name = groupName;
    }

    protected sleep():void{
        var self = this;
        self.removeCard();
        self.labelObj = null;
    }

    private setSCard(data:Object):void{
        var self = this;

        self.removeCard();
        self.cardData = data;

        var view:CardSquareView = new CardSquareView();
        view.initData(data);
        view.scaleX = Number((self.groupCard.width/view.width).toFixed(2));
        view.scaleY = Number((self.groupCard.height/view.height).toFixed(2));
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

    private setLockLabel(lv:number):void{
        var self = this;
        self.lblUnlock.text ="LV"+lv+self.labelObj["lbl_0"];//"解锁";
    }

    //返回视图宽度
    public getViewWidth():number{
        return this.groupCGSCI.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupCGSCI.height;
    }

    public getType():number{
        return this.type;
    }

    public getCardData():Object{
        return this.cardData;
    }

    public updateShow(data:any):void{
        var self = this;
        var type = data.type;
        var sdata = data.sdata;
        self.groupCard.visible = type==0;
        self.groupAdd.visible = type==1;
        self.groupUnlock.visible = type==2;
        self.removeCard();
        if(type==0){
            self.setSCard(sdata);
        }else if(type==2){
            self.setLockLabel(Number(sdata));
        }

        self.type = type;
    }
}