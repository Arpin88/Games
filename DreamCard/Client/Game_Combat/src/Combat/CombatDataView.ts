// TypeScript file

class CombatDataView extends BaseView{
    public static NAME:string = "CombatDataSkin";

     public constructor(){
        super(CombatDataView.NAME);
    }

    private groupCombatData:eui.Group;

    private groupLeft:eui.Group;
    private groupRight:eui.Group;
    private LeftBGSource:string="combatImg1Sheet_json.a220x24";
    private RightBGSource:string="combatImg1Sheet_json.b220x24";

    private arrCardHeadList:Array<CSSHeadView> = new Array<CSSHeadView>();

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        var data = super.getData();
        if(data==null)
            return;

        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        var users:Array<Object> = data.users;
        for(var i:number = 0,lengthI=users.length;i<lengthI;i++){
            var user:any = users[i];
            if(user==null)
                continue;
            
            var cards:string = user.cards;
            var maxCumDamage:number = user.mcd;
            var state:number = user.state;
            if(account.getTicket()==user.tk)
                self.setLeftData(cards,maxCumDamage);
            else
                self.setRightData(cards,maxCumDamage);
            
        }


        
        // self.setRightData([]);
    }

    protected sleep():void{
        this.cleanArray(this.arrCardHeadList);
    }

    private cleanArray(arr:Array<IBaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i=arr.length-1;i>=0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    public recvData(data:any):void{

    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        self.hiden();
        // if(event.target instanceof eui.Button){
        //     var btn:eui.Button = <eui.Button>event.target;
        //     // if(btn==self.btnData){
                
        //     // }else if(btn==self.btnLeave){
                
        //     // }

        // }
    }

    private setLeftData(cards:string,maxDamage:number):void{
        var cumDamageArr:Array<number> = new Array<number>();
        var cardsArr:Array<string> = cards.split("|");
        for(var i:number=0,lengthI:number = cardsArr.length;i<lengthI;i++){
            var item:string = cardsArr[i];
            if(item==null||item=="")
                continue;

            var cardData:Array<String> = item.split(",");
            if(cardData.length<8)
                continue;
            
            var data:any = {};//{"icon":"caocao",name:"我知道","rarity":"common","element":"metal","generation":2,"level":5,expPercent:0.5,expChange:-550,lvlChange:2};
            data.icon = cardData[0];
            data.rarity = cardData[2];
            data.element = cardData[3];
            data.generation = cardData[4];
            data.level = cardData[5];

            var curDamage:number = Number(cardData[7]);
            if(curDamage>maxDamage)
                maxDamage = curDamage;
            cumDamageArr.push(curDamage);

            var headView:CSSHeadView = new CSSHeadView();
            headView.initData(data);
            this.groupLeft.addChild(headView);
            headView.x=0;
            headView.y=i*50;
            this.arrCardHeadList.push(headView);
        }

        for(var i:number=0,lengthI:number = cumDamageArr.length;i<lengthI;i++){
            var cumDamage:number = cumDamageArr[i];
            var leftBG:eui.Image = new eui.Image(this.LeftBGSource);
            this.groupLeft.addChild(leftBG);
            leftBG.height = 26;
            leftBG.y = 8+50*i;
            leftBG.x=50;
            var lwidth:number = maxDamage==0?0:Math.floor(250*cumDamage/maxDamage);
            leftBG.width = lwidth;

            var dmglab:eui.Label = new eui.Label();
            this.groupLeft.addChild(dmglab);
            dmglab.text = cumDamage+"";
            dmglab.fontFamily = "SimHei";
            dmglab.size = 20;
            dmglab.verticalAlign = "middle";
            dmglab.textAlign = "right";
            dmglab.stroke = 1;
            dmglab.strokeColor = 0x000000;
            dmglab.x=leftBG.x+leftBG.width-70;
            if(leftBG.width <= 64)
                dmglab.x=64;
            dmglab.y=leftBG.y;
            dmglab.height=leftBG.height;
            dmglab.width=64;

        }
    }

    private setRightData(cards:string,maxDamage:number):void{
        var cumDamageArr:Array<number> = new Array<number>();
        var cardsArr:Array<string> = cards.split("|");
        for(var i:number=0,lengthI:number = cardsArr.length;i<lengthI;i++){
            var item:string = cardsArr[i];
            if(item==null||item=="")
                continue;

            var cardData:Array<String> = item.split(",");
            if(cardData.length<8)
                continue;
            
            var data:any = {};//{"icon":"caocao",name:"我知道","rarity":"common","element":"metal","generation":2,"level":5,expPercent:0.5,expChange:-550,lvlChange:2};
            data.icon = cardData[0];
            data.rarity = cardData[2];
            data.element = cardData[3];
            data.generation = cardData[4];
            data.level = cardData[5];

            var curDamage:number = Number(cardData[7]);
            if(curDamage>maxDamage)
                maxDamage = curDamage;
            cumDamageArr.push(curDamage);

            var headView:CSSHeadView = new CSSHeadView();
            headView.initData(data);
            this.groupRight.addChild(headView);
            headView.x=260;
            headView.y=i*50;
            this.arrCardHeadList.push(headView);
        }

        for(var i:number=0,lengthI:number = cumDamageArr.length;i<lengthI;i++){
            var cumDamage:number = cumDamageArr[i];
            var rightBG:eui.Image = new eui.Image(this.RightBGSource);
            this.groupRight.addChild(rightBG);
            rightBG.height = 26;
            rightBG.y = 8+50*i;
            var widthR:number = maxDamage==0?0:Math.floor(250*cumDamage/maxDamage);
            rightBG.width = widthR
            rightBG.x=250-widthR;

            var dmglab:eui.Label = new eui.Label();
            this.groupRight.addChild(dmglab);
            dmglab.text = cumDamage+"";
            dmglab.fontFamily = "SimHei";
            dmglab.size = 20;
            dmglab.verticalAlign = "middle";
            dmglab.textAlign = "left";
            dmglab.stroke = 1;
            dmglab.strokeColor = 0x000000;
            dmglab.x=rightBG.x+6;
            dmglab.y=rightBG.y;
            dmglab.height=rightBG.height;
            dmglab.width=64;
            if(dmglab.x>186)
                dmglab.x=186;

        }
    }

    // private setLeftData(arr:Array<string>):void{
    //     for(var i:number=0;i<10;i++){
    //         var data:Object = {"icon":"caocao","rarity":"common","element":"metal","generation":2,"level":5};
    //         var headView:CSSHeadView = new CSSHeadView();
    //         headView.initData(data);
    //         this.groupLeft.addChild(headView);
    //         headView.x=0;
    //         headView.y=i*50;
    //         this.arrCardHeadList.push(headView);

    //         var leftBG:eui.Image = new eui.Image(this.LeftBGSource);
    //         this.groupLeft.addChild(leftBG);
    //         leftBG.height = 26;
    //         leftBG.y = 8+50*i;
    //         leftBG.x=50;
    //         leftBG.width = 250;

    //         var dmglab:eui.Label = new eui.Label();
    //         this.groupLeft.addChild(dmglab);
    //         dmglab.text = "2500";
    //         dmglab.fontFamily = "Microsoft YaHei";
    //         dmglab.size = 20;
    //         dmglab.verticalAlign = "middle";
    //         dmglab.textAlign = "right";
    //         dmglab.x=leftBG.x+leftBG.width-70;
    //         if(dmglab.x < 0)
    //             dmglab.x=0;
    //         dmglab.y=leftBG.y;
    //         dmglab.height=leftBG.height;
    //         dmglab.width=64;
    //     }
    // }

    // private setRightData(arr:Array<string>):void{
    //     for(var i:number=0;i<10;i++){
    //         var data:Object = {"icon":"caocao","rarity":"common","element":"metal","generation":2,"level":5};
    //         var headView:CSSHeadView = new CSSHeadView();
    //         headView.initData(data);
    //         this.groupRight.addChild(headView);
    //         headView.x=260;
    //         headView.y=i*50;
    //         this.arrCardHeadList.push(headView);

    //         var rightBG:eui.Image = new eui.Image(this.RightBGSource);
    //         this.groupRight.addChild(rightBG);
    //         rightBG.height = 26;
    //         rightBG.y = 8+50*i;
    //         rightBG.x=0;
    //         rightBG.width = 250;

    //         var dmglab:eui.Label = new eui.Label();
    //         this.groupRight.addChild(dmglab);
    //         dmglab.text = "2500";
    //         dmglab.fontFamily = "Microsoft YaHei";
    //         dmglab.size = 20;
    //         dmglab.verticalAlign = "middle";
    //         dmglab.textAlign = "left";
    //         dmglab.x=rightBG.x+6;
    //         dmglab.y=rightBG.y;
    //         dmglab.height=rightBG.height;
    //         dmglab.width=64;
    //         if(dmglab.x>186)
    //             dmglab.x=186;
    //     }
    // }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupCombatData==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupCombatData.scaleX = 
            self.groupCombatData.scaleY = 1;
            return;
        }
        self.groupCombatData.scaleX = 
        self.groupCombatData.scaleY = gapNum;
    }
}