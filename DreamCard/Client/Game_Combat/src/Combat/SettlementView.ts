// TypeScript file
class SettlementView extends BaseView{
    public static NAME:string = "SettlementSkin";

     public constructor(){
        super(SettlementView.NAME);
    }

    private imgLightOfVictory:eui.Image;  //胜利背景图
    private imgResult:eui.Image;  //背景图
    private btnData:eui.Button;
    private btnLeave:eui.Button;
    // private labReward:eui.Label;
    private groupCardHeads:eui.Group;
    private groupSettlement:eui.Group;
    // private imgReward:eui.Image;

    private groupExp:eui.Group;
    private groupCardExp:eui.Group;
    private groupRoleExp:eui.Group;

    private imgType0:eui.Image;
    private imgType1:eui.Image;
    private lblSymbol0:eui.Label;
    private lblSymbol1:eui.Label;
    private lblContent0:eui.Label;
    private lblContent1:eui.Label;

    private imgBox:eui.Image;
    private lblBoxCount:eui.Label;

    private arrCardHead:Array<CSHeadView> = new Array<CSHeadView>();

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        var data = super.getData();
        if(data==null)
            return;
        
        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        var combatResult:number = 0;
        var cards:string = "";
        var users:Array<Object> = data.users;
        for(var i:number = 0,lengthI=users.length;i<lengthI;i++){
            var user:any = users[i];
            if(user==null)
                continue;
            
            var state:number = user.state;
            if(account.getTicket()==user.tk){
                combatResult = state;
                cards = user.cards;
                break;
            }
        }

        var spoils:any = data.spoils;
        var commanderExp:number = spoils!=null&&spoils.commanderExp!=null?spoils.commanderExp:0;
        var cardExp:number = spoils!=null&&spoils.cardExp!=null?spoils.cardExp:0;
        var bootyBox:number = spoils!=null&&spoils.bootyBox!=null?spoils.bootyBox:0;
        // var commanderXWG:number = spoils!=null&&spoils.commanderXWG!=null?spoils.commanderXWG:0;
        var scards:any = spoils!=null&&spoils.scards!=null?spoils.scards:null;

        self.setCombatResult(combatResult);
        self.setlabReward(combatResult,cardExp,commanderExp,bootyBox);
        self.setCardResult(cards);
        self.updateCardResult(scards);


        var accountData:any = spoils.account;
        if(accountData!=null){
            account.setLvl(accountData.lvl);
            account.setExp(accountData.exp);
            account.setUpexp(accountData.upexp);
            account.setHp(accountData.hp);
            account.setGold(accountData.gold);
        }
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrCardHead);
        egret.Tween.removeTweens(self.imgLightOfVictory);
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
        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
            if(btn==self.btnData){
                var data = super.getData();
                if(data==null)
                    return;
                // var combatDataView:CombatDataView = new CombatDataView();
                // combatDataView.initData(data);
                // this.groupSettlement.addChild(combatDataView);
                UIManager.getInstance().showUI(CombatDataView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
            }else if(btn==self.btnLeave){

                var data = super.getData();
                if(data==null)
                    return;
                var server: ServerData = WebSocketManager.getInstance().getServerByName(GlobalDataManager.getInstance().getGameServerName());
                if(server == null)
                    return;
                WebSocketManager.getInstance().close(server.getSname());


                var appConfig:any = data.navigateTo;
                if(appConfig){
                    GMDManager.closeGMD();

                    //跳转信息
                    let id:number = appConfig.id;
                    let name:string= appConfig.name;
                    let ori:number = appConfig.ori;
                    let jsVer:string = appConfig.jsVer;
                    let resVer:string = appConfig.resVer;
                    let attRes:string = appConfig.attRes;
                    let pathStr:string = appConfig.path;
                    //直接进游戏,后面需要合并其他游戏的时候再做处理;
                    GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
                    let obj = new Object();
                    obj["param"] = {};//gameInfo;
                    GMDManager.startGMD(id,obj);

                    self.hiden();
                }else{
                    //这里写不能跳转的错误提示;
                }
            }

        }
    }

    private setCombatResult(index:number):void{
        var self = this;
        if(index == 1){
            SoundManager.getInstance().PlaySound("youxishengli_mp3");
            self.imgResult.source = "combatImg0Sheet_json.a632x490";
            egret.Tween.get(self.imgLightOfVictory,{loop:true}).to({rotation:360},10000);
        }else{
            SoundManager.getInstance().PlaySound("youxishibai_mp3");
            self.imgResult.source = "combatImg0Sheet_json.b632x490";
            self.imgLightOfVictory.visible = false;
        }
    }

    private setlabReward(win:number,cardExp:number,commanderExp:number,bootyBox:number):void{
        var self = this;
        self.lblSymbol0.text = cardExp>=0?"+":"-";
        self.lblSymbol1.text = commanderExp>=0?"+":"-";
        self.lblContent0.text = Math.abs(cardExp)+"";
        self.lblContent1.text = Math.abs(commanderExp)+"";
        self.lblBoxCount.text = bootyBox+"";
        self.imgBox.source = win == 1?"combatImg0Sheet_json.box2":"combatImg0Sheet_json.box1";
        // self.imgType0.source = win == 1?"combatText0Sheet_json.xwgb":"combatText0Sheet_json.kpjy";
        self.imgType0.source = "combatText0Sheet_json.kpjy";
        self.imgType1.source = "combatText0Sheet_json.jsjy";
        self.groupCardExp.visible = win != 1;
        self.groupRoleExp.y = win!=1?self.groupExp.height/2:self.groupExp.height/2-self.groupRoleExp.height/2;
    }

    private setCardResult(cards:string):void{
        var self = this;
        var cardsArr:Array<string> = cards.split("|");
        var itemWidth:number = 100;
        var gapX:number =   self.groupCardHeads.width/2 - (cardsArr.length*(itemWidth/2))
        for(var i:number=0,lengthI:number = cardsArr.length;i<lengthI;i++){
            var item:string = cardsArr[i];
            if(item==null||item=="")
                continue;

            var cardData:Array<String> = item.split(",");
            if(cardData.length<8)
                continue;
            
            var data:any = {};//{"icon":"caocao",name:"我知道","rarity":"common","element":"metal","generation":2,"level":5,expPercent:0.5,expChange:-550,lvlChange:2};
            data.icon = cardData[0];
            data.name = cardData[1];
            data.rarity = cardData[2];
            data.element = cardData[3];
            data.generation = cardData[4];
            data.level = cardData[5];
            data.expChange = 0;//cardData[6];   
            // data.cumDamage = cardData[7];
            data.lvlChange = 0;
            data.expPercent = Number((Number(cardData[8])/Number(cardData[9])).toFixed(2));


            var headView:CSHeadView = new CSHeadView();
            headView.initData(data);
            this.groupCardHeads.addChild(headView);
            headView.x=i*100+gapX;
            headView.y=0;
            headView.width = headView.getViewWidth();
            headView.height = headView.getViewHeight();
            this.arrCardHead.push(headView);


        }
        

        // for(var i:number=0;i<10;i++)
        // {
            // var data:Object = {"icon":"caocao",name:"我知道","rarity":"common","element":"metal","generation":2,"level":5,expPercent:0.5,expChange:-550,lvlChange:2};
            // var headView:CardHeadView = new CardHeadView();
            // headView.initData(data);
            // this.groupCardHeads.addChild(headView);
            // headView.x=i*100;
            // headView.y=0;
            // headView.width = headView.getViewWidth();
            // headView.height = headView.getViewHeight();
            // this.arrCardHead.push(headView);
        // }
    }

    private updateCardResult(scards:any):void{
        if(scards==null||scards.length==0)
            return;
        var self = this;
        var exp:number = 0;
        for(var i:number=0,lengthI=this.arrCardHead.length;i<lengthI;i++){
            if(scards[i]==null)
                continue;
            var scard:any = scards[i];

            var headView:CSHeadView = this.arrCardHead[i];
            if(headView==null)
                continue;
            var data:any = headView.getData();
            data.level = scard.lvl==null?data.level:scard.lvl;
            data.expPercent = scard.exp==null||scard.allExp==null?data.expPercent:Number((Number(scard.exp)/Number(scard.allExp)).toFixed(2));
            if(scard.hasOwnProperty("winExp")){
                exp+=scard.winExp;
                data.expChange = scard.winExp==null?data.expChange:scard.winExp;
            }
            if(scard.hasOwnProperty("winLvl")){
                data.lvlChange = scard.winLvl==null?data.lvlChange:scard.winLvl;
            }
            if(scard.hasOwnProperty("lostExp")){
                exp-=scard.lostExp;
                data.expChange = scard.lostExp==null?data.expChange:-scard.lostExp;
            }
            if(scard.hasOwnProperty("downLvl")){
                data.lvlChange = scard.downLvl==null?data.lvlChange:scard.downLvl;
            }
            headView.updateData(data);
            
        }
        self.lblSymbol0.text = exp>=0?"+":"-";
        self.lblContent0.text = Math.abs(exp)+"";
    }


    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupSettlement==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupSettlement.scaleX = 
            self.groupSettlement.scaleY = 1;
            return;
        }
        self.groupSettlement.scaleX = 
        self.groupSettlement.scaleY = gapNum;
    }
}