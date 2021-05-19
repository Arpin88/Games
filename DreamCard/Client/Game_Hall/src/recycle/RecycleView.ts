// TypeScript file
class RecycleView extends BaseView{
    public static NAME:string = "RecycleSkin";
     public constructor(){
        super(RecycleView.NAME);
    }


    private groupRecycle:eui.Group;

    private btnBack:eui.Button;
    private comStar:eui.Component;      //星星

    private scrOptionBtn:eui.Scroller;  //选项按钮下拉滚动区域
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层
    
    private scrCardItem:eui.Scroller;   //卡牌滚动区域
    private groupCardItem:eui.Group;    //卡牌区域层

    private lblContent:eui.Label;       //内容文本
    private lblXWGPrice:eui.Label;      //xwg价格文本
    private btnReset:eui.Button;        //重置按钮
    private btnRecycle:eui.Button;      //回收按钮

    // private arrSort1:Array<string> = ["战力由高到低","战力由低到高","攻击由高到低","攻击由低到高","生命由高到低","生命由低到高","费用由低到高","费用由高到低"];
    // private arrSort2:Array<string> = ["全品质","普通","稀有","史诗","传说","神话"];
    // private arrSort3:Array<string> = ["全五行","金","木","水","火","土"];
    private arrSort1:Array<string> = [];
    private arrSort2:Array<string> = [];
    private arrSort3:Array<string> = [];

    private sortText:Array<Array<string>>=[["zhanligdd","zhanliddg","gongjigdd","gongjiddg","shengminggdd","shengmingddg","feiyonggdd","feiyongddg"],
                                           ["quanpinzhi","putong","xiyou","shishi","chuanqi","shenghua"],
                                           ["quanwuxing","jin","mu","shui","huo","tu"] ];
                                           
    private sortFactor:Object = {sort:0,rarity:0,element:0};
    private pageNum:number = 1;     //当前页数 
    private pageSize:number = 20;   //一页的数量

    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();      //选项按钮容器
    private arrCardItem:Array<CardSquareView>= new Array<CardSquareView>();     //卡牌容器
    private arrChooseCard:Array<CardSquareView> = new Array<CardSquareView>();  //选中卡牌
    private teamCardCodeArr:Array<string> = new Array<string>();    //卡组卡牌编号集合

    private movingState:boolean = false;   //移动状态
    private canReqCardList:boolean;         //可以请求卡牌列表
    // private curXWGExchangeRate:number = 0;  //当前XWG换率
    private curXWGPrice:number = 0;         //当前XWG价格

    private timeCounter:number;     //时间计数器
    private countDown:number = 5;  //5秒计时 
    private timer:egret.Timer;      //定时器

    private labelObj:any;   //语言包

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.scrCardItem.addEventListener(eui.UIEvent.CHANGE_END,self.onChangeEndHandler,self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        self.initView();
        self.sendGetCardList();
        self.sendUpdateXWGPrice();
    }

    protected sleep():void{
        var self = this;

        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        while(self.arrChooseCard.length){
            self.arrChooseCard.pop();
        }

        while(self.arrSort1.length!=0)
            self.arrSort1.pop();
        while(self.arrSort2.length!=0)
            self.arrSort2.pop();
        while(self.arrSort3.length!=0)
            self.arrSort3.pop();

        self.labelObj = null;

        self.cleanArray(self.arrOptionBtn);
        self.removeCardItem();
        self.stopTimer();
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

            }else if(btn==self.btnRecycle){
                if(self.arrChooseCard.length<=0){
                    // PopManager.getInstance().showPromptBox("请先选择需要回收卡牌!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_28"],2);
                    return;
                }

                // PopManager.getInstance().showPromptBox("回收后，卡牌将移除，不能被找回。\n是否确定回收当前所选卡牌",1,Handler.create(self,function(confirm:boolean){
                //     if(confirm){
                //         self.sendRecycleCard();
                //     }
                // }),["确定","取消"]);
                PopManager.getInstance().showPromptBox(self.labelObj["lbl_29"],1,Handler.create(self,function(confirm:boolean){
                    if(confirm){
                        self.sendRecycleCard();
                    }
                }),[self.labelObj["lbl_30"],self.labelObj["lbl_31"]]);

            }else if(btn==self.btnReset){
                self.onResetChoose();
            }else if(btn==self.btnBack){
                self.hiden();
            }
        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,8)=="groupCS_"){
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                if(self.movingState)
                    return;

                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2)
                    return;
                var cIndex:number = Number(strArr[1]);
                self.onClickCardItem(cIndex);
            }
        }

    }

    private onChangeEndHandler():void{
        var self = this;
        if(this.scrCardItem.viewport.scrollV > (this.scrCardItem.viewport.contentHeight - this.scrCardItem.viewport.height)-40&&self.canReqCardList){
            self.pageNum++;
            self.sendGetCardList();
        }
    }

    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }

    

    private initView():void{
        var  self = this;
        self.pageNum = 1;
        // self.curXWGExchangeRate = 0;
        self.curXWGPrice = 0;
        self.canReqCardList = true;
        self.sortFactor = {sort:0,rarity:0,element:0};

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        for(var i:number=0;i<20;i++){
            if(i<8)
                self.arrSort1.push(self.labelObj["lbl_"+i]);
            else if(i<14)
                self.arrSort2.push(self.labelObj["lbl_"+i]);
            else if(i<20)
                self.arrSort3.push(self.labelObj["lbl_"+i]);
        }

        self.updateGold();
        self.setOptionBtn();
        self.updateContent();
        self.startTimer();
    }


    private setOptionBtn():void{
        var self = this;

        for(var i:number=0;i<self.sortText.length;i++){
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(self.sortText[i][0]);
            btnView.setBtnName("btnOption_"+i);
            btnView.x = 20;
            btnView.y = btnView.getViewHeight()*i + 30*(i);            
            self.arrOptionBtn.push(btnView);

            var posY:number = 0;
            for(var j:number=0;j<self.sortText[i].length;j++){
                var btnItemView:OptionBtnItemView = new OptionBtnItemView();
                btnItemView.init();
                btnView.addItem(btnItemView);
                btnItemView.setBtnContent(self.sortText[i][j]);
                btnItemView.x = 0;
                btnItemView.y = posY;
                btnItemView.width = btnItemView.getViewWidth();
                btnItemView.height = btnItemView.getViewHeight();
                btnItemView.setBtnName("btnOptionItem_"+ i + "_" + j);
                posY += btnItemView.getViewHeight();
            }
            btnView.setItemGroupHeight(posY);
            btnView.hiddenGroupItem();
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    }
    

    private updateGold():void{
        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
        // this.comStar["txt0"].text = account.getXWGCoin();
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

        // // 选中二级菜单后设置一级按钮 text
        // this.arrOptionBtn[type-1].setBtnContent(this.sortText[type-1][index]);
        // 选中二级菜单后设置一级按钮 text
        self.arrOptionBtn[type-1].setBtnImgContent(this.sortText[type-1][index]);
        self.arrOptionBtn[type-1].setChooseState();

        if(sendData){
            self.canReqCardList = true;
            self.sortFactor[param] = index;
            self.pageNum = 1; // 切换搜索条件需要重新初始一下
            self.sendGetCardList();
        }else{
            UIManager.getInstance().hideUI(FilterView);
        }

    }

    //发送请求卡牌列表
    private sendGetCardList():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        let obj:Object = {rarity:self.sortFactor["rarity"],element:self.sortFactor["element"],sort:self.sortFactor["sort"],pageNum:self.pageNum,pageSize:self.pageSize,detail:0,screenTeam:1};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_CARD_LIST_RECYCLE,obj);
    }

    //发送请求回收卡牌
    private sendRecycleCard():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        var codeArr:Array<string> = new Array<string>();
        for(var i:number=0,lengthI:number = self.arrChooseCard.length;i<lengthI;i++){
            var item:CardSquareView = self.arrChooseCard[i];
            if(item==null)
                continue;
            var cdata:any = item.getData();
            if(cdata==null||cdata.code==null)
                continue;
            codeArr.push(cdata.code);
        }
        let obj:Object = {codeArr:codeArr};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_RECYCLE_CARD,obj);
    }

    private sendUpdateXWGPrice():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let obj:Object = {};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_CUR_XWG_PRICE,obj,false);
    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_CARD_LIST_RECYCLE:  //获取队伍列表
                if(data.teamList!=null)
                    self.teamCardCodeArr = data.teamList;
                self.setCardItem(data.cardList);
                UIManager.getInstance().hideUI(FilterView);
            break;
            case HallCmdDef.CMD_RECYCLE_CARD:           //回收卡牌
                self.onRecycleCard(data);
            break;
            case HallCmdDef.CMD_GET_CUR_XWG_PRICE:      //获取当前XWG价格
                self.onGetXWGPrice(data);
            break;  
        }

    }

    //设置卡牌显示;
    private setCardItem(data:any):void{
        var self = this;
        if(self.pageNum <=1){
            self.removeCardItem();
        }
       
        var hMaxCount:number = 4;
        var width:number = self.scrCardItem.width/hMaxCount;
        var sCount:number = self.arrCardItem.length;
        var hIndex:number = sCount%hMaxCount;
        var vIndex:number = Math.floor(sCount/hMaxCount);
        var count:number = data.length;
        var scale:number = 0.7;
        var gapX:number = -1;
        for(var i:number = 0; i < count; i++){
            var item:any = data[i];
            if(item==null)
                continue;

            var view:CardSquareView = new CardSquareView();
            var obj:any = item;
            obj.groupName = "groupCS_"+(i+sCount);
            view.initData(obj);
            view.scaleX = view.scaleY = scale;
            self.groupCardItem.addChild(view);
            if(gapX==-1)
                gapX = width-(view.getViewWidth()*scale)>0?Math.floor((width-(view.getViewWidth()*scale))/(hMaxCount-1)):0;
            var posX = width*hIndex+gapX;
            view.x = posX;
            view.y = vIndex * (view.height*scale + 15);
            self.arrCardItem.push(view);

            hIndex++;
            if(hIndex>=hMaxCount){
                hIndex=0;
                vIndex++;
            }     

            for(var z:number=0,lengthZ=self.arrChooseCard.length;z<lengthZ;z++){
                var viewItem:CardSquareView = self.arrChooseCard[z];
                if(viewItem==null)
                    continue;
                var cdata0:any = viewItem.getData();
                if(cdata0.code==item.code){
                    self.arrChooseCard[z] = view;
                    view.setChoose(true);
                    break;
                }
            }

            if(item.code!=null&&self.checkInTeamList(item.code))
                view.changeViewColor(true);
            
        }

        if(count<self.pageSize){
            self.canReqCardList = false;
        }
    }

    private checkInTeamList(cardCode:string):boolean{
        var self = this;
        if(self.teamCardCodeArr==null||self.teamCardCodeArr.length<=0)
            return false;
        for(var i=0,lengthI=self.teamCardCodeArr.length;i<lengthI;i++){
            var code:string = self.teamCardCodeArr[i];
            if(code==null||code=="")
                continue;
            if(cardCode==code){
                return true;
            }
        }
        return false;
    }

    private removeCardItem():void{
        var self = this;
        self.cleanArray(self.arrCardItem);
        self.scrCardItem.viewport.scrollV = 0;
    }

    private onClickCardItem(index:number):void{
        var self = this;
        var view:CardSquareView = self.arrCardItem[index];
        if(view==null)
            return;
        var cdata:any = view.getData();
        if(cdata!=null&&cdata.code!=null){
            var code:string = cdata.code;
            if(self.checkInTeamList(code))
                return;
            var cindex:number = -1;
            for(var i:number=0,lengthI=self.arrChooseCard.length;i<lengthI;i++){
                var item:CardSquareView = self.arrChooseCard[i];
                if(item==null)
                    continue;
                var cdata0:any = item.getData();
                if(cdata0.code==code){
                    cindex = i;
                    break;
                }
            }
            if(cindex==-1){
                self.arrChooseCard.push(view);
                view.setChoose(true);
            }else{
                self.arrChooseCard.splice(cindex,1);
                view.setChoose(false);
            }
            self.updateContent();
        }
        
    }

    private updateContent():void{
        var self = this;

        var count:number = self.arrChooseCard.length;
        var commonCount:number = 0;
        var rareCount:number = 0;
        var epicCount:number = 0;
        var legendaryCount:number = 0;
        var mythicalCount:number = 0;
        var goldPrice:number = 0;
        

        if(count!=0){
            for(var i:number=0,lengthI=self.arrChooseCard.length;i<lengthI;i++){
                var item:CardSquareView = self.arrChooseCard[i];
                if(item==null)
                    continue;
                var cdata:any = item.getData();
                if(cdata==null)
                    continue;
                var rarity:string = cdata.rarity;
                if(rarity==null||rarity=="")
                    continue;
                if(rarity=="common"){
                    commonCount++;
                }else if(rarity=="rare"){
                    rareCount++;
                }else if(rarity=="epic"){
                    epicCount++;
                }else if(rarity=="legendary"){
                    legendaryCount++;
                }else if(rarity=="mythical"){
                    mythicalCount++;
                }
                // var val0:number = cdata.val_reference;  //参考价
                var val1:number = cdata.val_initial;    //初始价
                var val2:number = cdata.val_growing;    //成长价
                goldPrice+=(val1+val2);
            }
        }

        var xwgPrice:number = goldPrice;//goldPrice==0?0:Math.floor(goldPrice*0.95*100)/100;
        // self.lblContent.textFlow = [
        //       {text: "当前选择了", style: {textColor:0x89c0d3}},
        //       {text: count+"", style: {textColor:0xffe474}},
        //       {text: "张卡牌，其中\n", style: {textColor:0x89c0d3}},
        //       {text: "普通品质："+commonCount+"张\n", style: {textColor:0xffffff}},
        //       {text: "稀有品质："+rareCount+"张\n", style: {textColor:0x09cd74}},
        //       {text: "史诗品质："+epicCount+"张\n", style: {textColor:0x2eb4f2}},
        //       {text: "传奇品质："+legendaryCount+"张\n", style: {textColor:0xec5afd}},
        //       {text: "神话品质："+mythicalCount+"张\n", style: {textColor:0xff9231}},
        //       {text: "总价值：",style:{textColor:0xabb6c1}},
        //       {text: xwgPrice+"XWG\n",style:{textColor:0xFFFFFF}},
        //     //   {text: "注：回收将收取5%总价值的手续费",style:{textColor:0Xff390b,size:20}},
        // ]
        // 

        var arr:Array<any> = new Array<any>();

        var str:string = self.labelObj["lbl_20"];
        var strArr:Array<string> = str.split('%s');
        if(strArr.length==2){
            arr.push({text: strArr[0], style: {textColor:0x89c0d3}});
            arr.push({text: count+"", style: {textColor:0xffe474}});
            arr.push({text: strArr[1], style: {textColor:0x89c0d3}});
        }
        
        var str0:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_21"],[commonCount+""]);
        arr.push({text: str0, style: {textColor:0xffffff}});
        var str1:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_22"],[rareCount+""]);
        arr.push({text: str1, style: {textColor:0x09cd74}});
        var str2:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_23"],[epicCount+""]);
        arr.push({text: str2, style: {textColor:0x2eb4f2}});
        var str3:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_24"],[legendaryCount+""]);
        arr.push({text: str3, style: {textColor:0xec5afd}});
        var str4:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_25"],[mythicalCount+""]);
        arr.push({text: str4, style: {textColor:0xff9231}});
        var str5:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_26"],[rareCount+""]);
        arr.push({text: self.labelObj["lbl_26"],style:{textColor:0xabb6c1}});
        arr.push({text: xwgPrice+"XWG\n",style:{textColor:0xFFFFFF}});

        self.lblContent.textFlow = arr;
    }

    private startTimer():void{
        var self = this;
        self.timeCounter = self.countDown;
        if(self.timer==null){
            self.timer = new egret.Timer(1000,0);
            self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
        }
        self.timer.start();  
    }

    private stopTimer():void{
        var self = this;
        if(self.timer!=null){
            self.timer.stop();
        }
    }
    
    private timerFunc(){
        var self = this;
         self.timeCounter--;
        if (self.timeCounter == 0) {
            self.stopTimer();
            self.timeCounter = self.countDown;
            self.sendUpdateXWGPrice();
        }
    }

    private onResetChoose():void{
        var self =this;
        if(self.arrChooseCard.length<=0)
            return;
        for(var i:number=self.arrChooseCard.length-1;i>=0;i--){
            var item:CardSquareView = self.arrChooseCard[i];
            if(item!=null)
                item.setChoose(false);
            self.arrChooseCard.splice(i,1);
        }
        self.updateContent();
    }

    private onRecycleCard(data:any):void{
        
        if(data==null)
            return;
        var self = this;
        // var accountXWGCoin:number = data.accountXWGCoin;
        // GlobalDataManager.getInstance().getAccountData().setXWGCoin(accountXWGCoin);
        
        var gold:number = data.gold;
        GlobalDataManager.getInstance().getAccountData().setGold(gold);

        // var showStr:string = data.recyclePrice!=null?"回收成功!\n回收价格："+data.recyclePrice:"回收失败!";
        var showStr:string = data.recyclePrice!=null?self.labelObj["lbl_32"]+data.recyclePrice:self.labelObj["lbl_33"];
        PopManager.getInstance().showPromptBox(showStr,2,Handler.create(self,function(confirm:boolean){
            // self.removeCardItem();
            self.updateGold();
            self.onResetChoose();
            self.pageNum = 1;
            self.canReqCardList = true;
            self.sendGetCardList();
            GameEventManager.getInstance().dispatchEvent(HallEvent.updateGold);
        }));
    }

    private onGetXWGPrice(data:any):void{
        if(data==null)
            return;
        var self = this;
        // self.curXWGExchangeRate = data.rate;
        var showStr:string = "0.00";
        var color:number = 0XFFFFFF;
        if(self.curXWGPrice!=0){
            var gap:number = Number((data.xwgPrice-self.curXWGPrice).toFixed(2));
            showStr = gap>0?"+"+gap:""+gap;
            color = gap>0?0X30e100:0Xff390b;
        }
        self.curXWGPrice = data.xwgPrice.toFixed(2);
        // self.lblXWGPrice.text = "XWG实时价格："+self.curXWGPrice+"（"+showStr+"）";

        self.lblXWGPrice.textFlow = [
            //   {text: "XWG实时价格：", style: {textColor:0x89bfd2}},
              {text: self.labelObj["lbl_27"], style: {textColor:0x89bfd2}},
              {text: self.curXWGPrice+"", style: {textColor:0xffe474}},
              {text: "（"+showStr+"）", style: {textColor:color}},
        ]
        self.startTimer();
    }


    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupRecycle==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupRecycle.scaleX = 
            self.groupRecycle.scaleY = 1;
            return;
        }
        self.groupRecycle.scaleX = 
        self.groupRecycle.scaleY = gapNum;
    }
}   
