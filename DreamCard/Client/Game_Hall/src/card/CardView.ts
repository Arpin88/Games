// TypeScript file
class CardView extends BaseView{

    public static NAME:string = "CardSkin";

     public constructor(){
        super(CardView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层
    private imgRBG:eui.Image;   //右边背景
    private scrCardItem:eui.Scroller;   //卡牌滚动区域
    private groupCardItem:eui.Group;    //卡牌区域层
    private cardskingroup:eui.Group;

    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();  //选项按钮容器
    private arrCardItem:Array<CardSquareView>= new Array<CardSquareView>();  //卡牌容器
    private arrCardInfo:Array<Object> = new Array<Object>(); //卡牌信息容器
    private arrRCardPosX:Array<number> = new Array<number>();   //长方形卡牌坐标
    private sortImgText:Array<Array<string>>=[["zhanligdd","zhanliddg","gongjigdd","gongjiddg","shengminggdd","shengmingddg","feiyonggdd","feiyongddg"],
                                           ["quanpinzhi","putong","xiyou","shishi","chuanqi","shenghua"],
                                           ["quanwuxing","jin","mu","shui","huo","tu"] ];
    // private arrSort1:Array<string> = ["战力由高到低","战力由低到高","攻击由高到低","攻击由低到高","生命由高到低","生命由低到高","费用由低到高","费用由高到低"];
    // private arrSort2:Array<string> = ["全品质","普通","稀有","史诗","传奇","神话"];
    // private arrSort3:Array<string> = ["全五行","金","木","水","火","土"];
    private arrSort1:Array<string> = [];
    private arrSort2:Array<string> = [];
    private arrSort3:Array<string> = [];

    private sortFactor:Object = {sort:0,rarity:0,element:0};
    private pageNum:number = 1;     //当前页数 
    private pageSize:number = 20;   //一页的数量
    private receiveNum:number = 0;
    private needUp:boolean = false;
    private hIndex:number = 0;
    private vIndex:number = 0;
    private cardListData:Object = []; // card list
    private movingState:boolean = false;   //移动状态
    private curCardView:Object;

    private labelObj:any;   //语言包

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.scrCardItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrCardItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        self.initView();
        self.requestCardList();
    }
    
    private initView():void{
        var self = this;
        this.pageNum = 1;
        this.needUp = false;
        this.receiveNum = 0;
        self.sortFactor["sort"] = 0;
        self.sortFactor["rarity"] = 0;
        self.sortFactor["element"] = 0;
        this.cardListData = [];

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        for(var i:number=0;i<20;i++){
            if(i<8)
                self.arrSort1.push(self.labelObj["lbl_"+i]);
            else if(i<14)
                self.arrSort2.push(self.labelObj["lbl_"+i]);
            else if(i<20)
                self.arrSort3.push(self.labelObj["lbl_"+i]);
        }

        self.setOptionBtn();
    }

    //发送请求卡牌列表
    private requestCardList():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        let obj:Object = {rarity:self.sortFactor["rarity"],element:self.sortFactor["element"],sort:self.sortFactor["sort"],pageNum:self.pageNum,pageSize:self.pageSize};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CardViewLists,obj);
    }

    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrCardItem);
        self.hIndex = 0;
        self.vIndex = 0;
        self.scrCardItem.viewport.scrollH = 0;
        self.scrCardItem.viewport.scrollV = 0;

        while(self.arrSort1.length!=0)
            self.arrSort1.pop();
        while(self.arrSort2.length!=0)
            self.arrSort2.pop();
        while(self.arrSort3.length!=0)
            self.arrSort3.pop();

        self.labelObj = null;

        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        if(account.getGuide_Step()!=null&&account.getGuide_Step()!="")
            UIManager.getInstance().showUI(GuideView,GameScene.EFFECT_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{step:account.getGuide_Step()});
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

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){

            case HallCmdDef.CMD_CardViewLists:  //获取队伍配置
               var shopDesc = data
               var num = data["length"]
               this.receiveNum = num;
               
               for(var i:number = 0; i < num; i++)
               {
                    var obj = data[i];
                    var curIdx:number = (this.pageNum - 1) * this.pageSize + i;
                    self.cardListData[curIdx] = obj;
               }
               self.setCardItemListByData(self.cardListData);
               if(num > 0){ this.pageNum = this.pageNum + 1;} 
               UIManager.getInstance().hideUI(FilterView); // 这时候关掉二级菜单
               
               if(num > 0){
                   if(UIManager.getInstance().checkHasViewByName(GuideView))
                        GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
               }
            break;
            case HallCmdDef.CMD_GET_CARD_DETAIL:
                self.showCardDetailViewByData(data);
            break;
        }
    }

    private showCardDetailViewByData(data:any):void{
        var self = this;
        
        var cardData:Object = data;
        cardData["viewhandle"] = this.curCardView;
        UIManager.getInstance().showUI(CardOperationView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
            if(btn.name.substr(0,10)=="btnOption_"){
                var strArr:Array<string> = btn.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                if(cIndex == 0){
                    var data:Object = {desArr:self.arrSort1,cbHandler:Handler.create(self,self.onChooseCardSort1),selIndex:self.sortFactor["sort"]}
                    UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
                }else if(cIndex == 1){
                    var data:Object = {desArr:self.arrSort2,cbHandler:Handler.create(self,self.onChooseCardSort2),selIndex:self.sortFactor["rarity"]};
                    UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
                }else if(cIndex == 2){
                    var data:Object = {desArr:self.arrSort3,cbHandler:Handler.create(self,self.onChooseCardSort3),selIndex:self.sortFactor["element"]};
                    UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
                }
            }else if(btn==self.btnBack){
                self.hiden();
            }
        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,8) == "groupCR_")
            {
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                if(self.movingState) return;

                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2)
                {
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.onClickSCardItem(cIndex);
            }
        }
    }
    
    //当点击卡牌
    private onClickSCardItem(index:number):void{

        var cardData:Object = this.arrCardInfo[index];
        this.curCardView = this.arrCardItem[index];
        var code:string = cardData["code"];
        this.requestCardDetaiData(code);
    }

    private requestCardDetaiData(code:String):void{
        if(code==null||code=="")
            return;

        var self = this;
        //请求服务器
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let reqObj:Object = {code:code};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_CARD_DETAIL,reqObj);
    }

    private onChooseCardSort1(index:number):void{
        this.onChangeCardSort(1,index);
    }

    private onChooseCardSort2(index:number):void{
        this.onChangeCardSort(2,index);
    }

    private onChooseCardSort3(index:number):void{
        this.onChangeCardSort(3,index);
    }

    private onChangeCardSort(type:number,index:number):void{
        var self = this;
        if(self.sortFactor==null)
            return;
        var param:string = "";
        if(type==1){
            param = "sort";
        }else if(type==2){
            param = "rarity";
        }else{
            param = "element";
        }
        var val:number = self.sortFactor[param];
        var sendData:boolean = true;
        if(val==null||val==index){
            sendData = false;
        }

        // 选中二级菜单后设置一级按钮 text
        var contentString = this.sortImgText[type-1][index];
        this.arrOptionBtn[type-1].setBtnImgContent(contentString);

        if(sendData){
            self.sortFactor[param] = index;
            self.pageNum = 1; // 切换搜索条件需要重新初始一下
            self.cardListData = [];
            self.requestCardList();
        }else{
            UIManager.getInstance().hideUI(FilterView);
        }
    }

    private moveHandler(evt: eui.UIEvent): void {
        if(this.scrCardItem.viewport.scrollV > (this.scrCardItem.viewport.contentHeight - this.scrCardItem.viewport.height)-40){
			this.needUp = true;
		}
    }

    private outHandler(evt:eui.UIEvent):void{
        if(this.receiveNum < this.pageSize){
            this.needUp = false;
        }

        if(this.needUp){
			this.needUp = false;
			this.requestCardList(); // 申请新数据
		}
    }

    private setOptionBtn():void{
        var self = this;
        for(var i:number=0;i<self.sortImgText.length;i++){
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(self.sortImgText[i][0]);
            btnView.setBtnName("btnOption_"+i);            
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
        }
        
        //没有默认选中按钮 更新选项坐标即可
        self.updateOptionBtnPos();
    }

    //更新选项按钮坐标信息
    private updateOptionBtnPos():void{
        var self = this;
        var posY:number = 0;
        for(var i:number=0,lengthI:number = self.arrOptionBtn.length;i<lengthI;i++){
            var item:OptionBtnView = self.arrOptionBtn[i];
            if(item==null)
                continue;
            item.y = posY;
            item.height = item.getViewHeight();
            posY += item.getViewHeight() + 20;
        }
    }

    private removeRCardItem():void{
        var self = this;
        while(self.arrRCardPosX.length){
            self.arrRCardPosX.pop();
        }
        while(self.arrCardInfo.length){
            self.arrCardInfo.pop();
        }
        self.cleanArray(self.arrCardItem);
        self.groupCardItem.removeChildren();
        self.groupCardItem.scrollV = 0;

        self.hIndex = 0;
        self.vIndex = 0;
    }

    //设置卡牌显示;
    private setCardItemListByData(data:any):void{
        var self = this;
        if(self.pageNum <=1){
            self.removeRCardItem();
        }
       
        var hMaxCount:number = 5;
        var width:number = self.scrCardItem.width/hMaxCount;
        var maxImgIndex:number = 7;
        var imgIndex:number = 1;
        var sCount:number = self.arrCardItem.length;
        var count:number = data.length - sCount;
        for(var i:number = 0; i < count; i++){
            var index:number = sCount + i;
            var item:any = data[index];
            if(item==null)
                continue;

            var view:CardSquareView = new CardSquareView();
            var obj:Object = this.toFormatObject(item,index);
            view.initData(obj);
            view.scaleX = view.scaleY = 0.9;
            self.groupCardItem.addChild(view);
            var posX = (width + 2)*self.hIndex;
            view.x = posX;
            view.y = self.vIndex * (view.height);
            self.arrCardInfo.push(obj);  //给属性面板传值
            self.arrCardItem.push(view);
            self.arrRCardPosX.push(posX);

            self.hIndex++;
            if(self.hIndex>=hMaxCount)
            {
                self.hIndex=0;
                self.vIndex++;
            }
            imgIndex = imgIndex>=maxImgIndex?1:++imgIndex;            
        }
    }

    private toFormatObject(obj:any,i:number):Object{
        var data1:Object = {
            "icon":obj.iconUrl,
            "rarity":obj.rarity,
            "element":obj.ele,
            "round":obj.round,
            "generation":obj.gen,
            "name":obj.name,
            "cost":obj.cst,
            "level":((obj.level-1)%5 + 1),
            "atk":obj.atk,
            "hp":obj.hp,
            "agl":obj.agl,
            "hit":obj.hit,
            "att":obj.att,
            "code":obj.code,
            "cri_chance":1,  // 这两个值是从card_config来的
            "cri_multiplier":1,
            "rgn":obj.rgn,
            "jblist":1,
            "groupName":"groupCR_" + i,
            "canTouch":true};

        return data1;
    }

    public getCardGroup():eui.Group{
        return this.cardskingroup;
    }

    public getCardSquareViewItem():CardSquareView{
        var self = this;
        if(self.arrCardItem==null||self.arrCardItem.length<=0)
            return null;
        return this.arrCardItem[0];
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.cardskingroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.cardskingroup.scaleX = 
            self.cardskingroup.scaleY = 1;
            return;
        }
        self.cardskingroup.scaleX = 
        self.cardskingroup.scaleY = gapNum;
    }
}