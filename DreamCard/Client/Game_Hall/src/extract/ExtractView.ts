// TypeScript file
class ExtractView extends BaseView{

    public static NAME:string = "ExtractSkin";

     public constructor(){
        super(ExtractView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮

    private btnBuy:eui.Button;  //购买按钮
    private btnInfo:eui.Button; 

    private imgRBG:eui.Image;   //右边背景
    private scrCardItem:eui.Scroller;   //卡牌下拉滚动区域
    private groupCardItem:eui.Group;    //卡牌下拉区域层
    private comStar:eui.Group;  
    private extractskingroup:eui.Group; 
    
    private mallName:Object = []
    private tittleObj:Object;
    private rarityConfigList:Object = [];
    private tittle1:eui.Label;
    private tittle2:eui.Label;
    private priceTxt:eui.Label;
    private groupIcon0:eui.Group;      //头像
    private groupCardItem0:eui.Group;

    private arrCardItem:Array<ECardItemView> = new Array<ECardItemView>();    //卡牌容器
    private movingState:boolean = false;   //移动状态

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        self.updateGold();  
        self.sendGetAwardList(); // 初始申请数据
    }

    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }


    //发送请求卡牌列表
    private sendGetAwardList():void{
        let obj = new Object();
        obj["param"] = "抽奖";
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Award,obj,true);
    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_Award: 
               var shopDesc = data["msg"] 
               var num = data["msg"]["length"]
               for(var i:number = 0; i < num; i++)
               {
                    var obj = data["msg"][i];
                    var idx = obj["awardId"];
                    self.mallName[idx-1] = obj;
               }

               var  temp = {};
               for(var i:number = 0; i < data["tittleconfig"]["length"]; i++)
               {
                    var obj = data["tittleconfig"][i];
                    temp[obj["tittleId"]] = obj;
               }

               self.tittleObj =  temp["1"];
               var tp = LanguageManager.getInstance().getCurLanguageType();
                if(tp == 1){
                    self.tittleObj =  temp["2"];
                }
               self.rarityConfigList["length"] = data["rarityConfigList"]["length"];
               for(var n:number = 0;n < data["rarityConfigList"]["length"]; n++){
                   var raritystr = data["rarityConfigList"][n]["code"]
                   self.rarityConfigList[raritystr] = data["rarityConfigList"][n]["rate"];
               }
               this.priceTxt.text = "X" + self.tittleObj["cost"];
               if(num > 0){
                    // 重置界面
                    self.setTittle();
                    self.setCardItem();
               }

            break;
            case HallCmdDef.CMD_MyCardList:
                var gold  = data["curGold"]
                var account123 = GlobalDataManager.getInstance().getAccountData();
                account123.setGold(gold);
                this.updateGold();
            break;
        }
    }

    private updateGold():void{
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
        // this.comStar["txt0"].text = account.getXWGCoin();
    }

    private setTittle():void{
        this.tittle1.text = this.tittleObj["tittle1"];
        this.tittle2.text = this.tittleObj["tittle2"];
    }

    //当load网络图片完成事件
    private onLoadImgCompleteHandler(evt: egret.Event): void {
        var self = this;
        if (evt.currentTarget.data) 
        {
            let texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            let bitmap = new egret.Bitmap(texture);
            bitmap.x = 0;
            bitmap.y = 0;
            
            bitmap.width = this.groupCardItem0.width;
            bitmap.height = this.groupCardItem0.height;
            this.groupCardItem0.addChild(bitmap);
        }
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrCardItem);

        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        if(account.getGuide_Step()!=null&&account.getGuide_Step()!="")
            UIManager.getInstance().showUI(GuideView,GameScene.EFFECT_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{step:account.getGuide_Step()});
    }

    private cleanArray(arr:Array<BaseView>):void{
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

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        var cardName:string  = event.target.name;
        if(cardName.substr(0,8)=="groupCR_")
        {
            SoundManager.getInstance().PlayClickSound();
            if(self.movingState) return;
                    
            var a:string = cardName.substr(8,3);
            UIManager.getInstance().showUI(CGAwardView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,self.mallName[a]);
        }

        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
            if(btn==self.btnBuy){
                var account123 = GlobalDataManager.getInstance().getAccountData();
                if(account123["gold"] < 100){

                    PopManager.getInstance().showPromptBox("金币不够",2,Handler.create(self,function(confirm:boolean){
                        console.log(`回调函数被调用`);
                    }));

                }else{
                    // 呼出抽奖界面
                    UIManager.getInstance().showUI(ChouCardView);

                    var isCreatePool = 0;
                    if(isCreatePool == 1){
                        let obj = new Object();
                        obj["poolNum"] = "100";
                        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CreateCardPool,obj,true);  // 测试奖池接口
                    }else{
                        let obj = new Object();
                        obj["param"] = "十连抽抽奖按钮";
                        obj["pageid"] = "1";
                        obj["pageSize"] = "10";
                        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                       HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_MyCardList,obj,false);
                    }
                }

                if(UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);

            }else if(btn==self.btnBack){
                self.hiden();
            }else if(btn == self.btnInfo){
                if(self.rarityConfigList["length"] >= 5){
                    UIManager.getInstance().showUI(ExtrackInfoView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,self.rarityConfigList);
                }
            }
        }
    }
    

    private setCardItem():void{
        var self = this;
        var hMaxCount:number = 5;
        var hIndex:number = 0;
        var width:number = self.scrCardItem.width/hMaxCount;
        var vIndex:number = 0;
        var num:number = self.mallName["length"];
        for(var i:number=0; i < num; i++)
        {
            var view:ECardItemView = new ECardItemView();
            var data1:Object = self.mallName[i];
            view.initData({own:i%2==0?1:0,index:i,obj:data1});
            view.name = i.toString();
            view.scaleX = view.scaleY = 1;
            self.groupCardItem.addChild(view);
            view.x = hIndex*(width) + 4;
            view.y = vIndex*(view.getViewHeight() + 20);
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();

            self.arrCardItem.push(view);
            hIndex++;
            if(hIndex >= hMaxCount)
            {
                hIndex=0;
                vIndex++;
            }
        }
    }

    public getExtractGroup():eui.Group{
        return this.extractskingroup;
    }

    public getBuyBtn():eui.Button{
        return this.btnBuy;
    }
    
    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.extractskingroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.extractskingroup.scaleX = 
            self.extractskingroup.scaleY = 1;
            return;
        }
        self.extractskingroup.scaleX = 
        self.extractskingroup.scaleY = gapNum;
    }
}