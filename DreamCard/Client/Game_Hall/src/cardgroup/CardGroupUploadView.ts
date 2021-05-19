// TypeScript file
class CardGroupUploadView extends BaseView{
    public static NAME:string = "CardGroupUploadSkin";

    public constructor(){
        super(CardGroupUploadView.NAME);
    }

    private groupCardGroupSet:eui.Group;    //设置卡牌层

    private btnBack:eui.Button;     //返回按钮
    private btnRecord:eui.Button;     
    private btnProgress:eui.Button;  
    private btnConfirm:eui.Button;     

    private arrPropTypeData:Array<Object> = new Array<Object>();    //道具类型数据
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层
    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();  //选项按钮容器
    private curChooseOptionBtnIndex:number; //当前选中选项按钮下标
    private curBtnIdx:number = 0;
    

    private sortFactor:Object = {actor:0,sort:1,rarity:0,element:0,lvl:0,gen:0};
    private pageNum:number = 1;     //当前页数
    private pageSize:number = 10;   //一页的数量

    private arrRCardPosX:Array<number> = new Array<number>();   //长方形卡牌坐标
    private arrSCardItem:Array<CGSCardItemView> = new Array<CGSCardItemView>();          //小卡牌容器
    private selectCardData:Object = [];
    private arrRCardItem:Array<CardRectangleView> = new Array<CardRectangleView>();  
    private cCardScrViewGroup:eui.Group;    //中图长方形卡牌层缩放顶用层
    private curChooseRCardIndex:number = -1;        //当前选择的长方形卡牌下标
    private scrCCardItem:eui.Scroller;      //卡牌中图滚动区域
    private groupCCardItem:eui.Group;       //卡牌中图区域层
    private bRCardScale:number = 0.5;      //大图长方形卡牌缩放比例
    private cRCardScale:number = 0.35;      //中图长方形卡牌缩放比例

    private onChangeStart:boolean = false;    //当开始长方形卡牌切换
    private btnDetails:eui.Button;          //查看详情按钮
    private movingState:boolean = false;   //移动状态
    private groupSCardItem:eui.Group;       //卡牌小图区域层
    private arrTeamConfig:Array<Object>;    //组队配置
    private scrSCardItem:eui.Scroller;      //卡牌小图滚动区域
    private walletObj:Object;
    private recordpageId:number = 1; 
    private recordpageSize:number = 15;
    private selectIndex:number = 0;
    private arrSort0:Array<string> = ["角色","曹操","程普","典韦","貂蝉","董卓","甘宁","关羽","郭嘉","黄盖","黄忠","华佗","姜维","乐进","廖化","凌统","刘备"
                                        ,"陆逊","吕布","吕蒙","马超","马谡","庞德","司马懿","孙策","孙权","太史慈","魏延","许褚","徐晃","荀彧","徐盛","袁绍"
                                         ,"于禁","张飞","张郃","张辽","赵云","周泰","周瑜","诸葛亮"];
    private arrSort1:Array<string> = ["战力由高到低","战力由低到高","攻击由高到低","攻击由低到高","生命由高到低","生命由低到高","费用由低到高","费用由高到低"];
    private arrSort2:Array<string> = ["全五行","金","木","水","火","土"];
    private arrSort3:Array<string> = ["全品质","普通","稀有","史诗","传奇","神话"];
    private arrSort4:Array<string> = ["代数","1代","2代","3代"];
    private arrSort5:Array<string> = ["星级","1星","2星","3星","4星","5星"];
    private sortImgText:Array<Array<string>>=[
        ["juse","caocao","chengpu","dianwei","diaochan","dongzhuo","ganning","guanyu","guojia","huanggai","huangzhong","huatuo","jiangwei","lejin","liaohua","lingtong","liubei"
        ,"luxun","lvbu","lvmeng","machao","masu","pangde","simayi","sunce","sunquan","taishici","weiyan","xuchu"
        ,"xuhuang","xunyu","xusheng","yuanshao","yujin","zhangfei","zhanghe","zhangliao","zhaoyun","zhoutai","zhouyu","zhugeliang"],
        ["zhanligdd","zhanliddg","gongjigdd","gongjiddg","shengminggdd","shengmingddg","feiyonggdd","feiyongddg"],
        ["quanwuxing","jin","mu","shui","huo","tu"],
        ["quanpinzhi","putong","xiyou","shishi","chuanqi","shenghua"],
        ["daishu","1d","2d","3d"],
        ["xingji","1s","2s","3s","4s","5s"]];

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        self.scrCCardItem.addEventListener(eui.UIEvent.CHANGE_START,self.onChangeStartHandler,self);
        self.scrCCardItem.addEventListener(egret.Event.CHANGE,self.onChangeHanlder,self);
        self.scrCCardItem.addEventListener(eui.UIEvent.CHANGE_END,self.onChangeEndHandler,self);
        self.scrCCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrCCardItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        self.initView();
        self.setOptionBtn();
        self.sendGetCardList();

        self.initTeamConfig({});
    }

    private initTeamConfig(data:any):void{
        var self = this;
        self.arrTeamConfig = data;
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        var hMaxCount:number = 5;
        var hIndex:number = 0;
        var widthGap:number = self.scrSCardItem.width/hMaxCount;
        var vIndex:number = 0;
        for(var i:number=0,lengthI = 10;i<lengthI;i++){
            var unlocklvl:number = 0;
            var type:number = 2;
            if(accountData!=null&&accountData.getLvl()>=unlocklvl){
                type = 1;
            }
            var groupName:string = "groupCGSCI_"+i;
            var obj:Object = {type:type,sdata:unlocklvl,gname:groupName};
            var view:CGSCardItemView = new CGSCardItemView();
            view.initData(obj);
            self.groupSCardItem.addChild(view);
            view.x = hIndex*widthGap;
            var height:number = view.getViewHeight();
            view.y = vIndex*(height+10);
            self.arrSCardItem.push(view);
            hIndex++;
            if(hIndex>=hMaxCount){
                hIndex=0;
                vIndex++;
            }
        }
    }

    /**拖动开始*/
    private onChangeStartHandler() {
        var self = this;
        self.onChangeStart = true;
        if(self.btnDetails.visible)
            self.btnDetails.visible = false;
    }

    private onChangeHanlder(e:eui.UIEvent):void{
        var self = this;
        self.checkScale();
    }

    private onChangeEndHandler():void{
        var self = this;
        if(self.onChangeStart){
            self.onChangeStart = false;
            self.autoScrollToItem();
        }
        if(self.cCardScrViewGroup==null&&(self.scrCCardItem.viewport.scrollH + self.scrCCardItem.width) >= self.scrCCardItem.viewport.contentWidth){
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

    /**
     * 自动选择
     */
    private autoScrollToItem(): void {
        var self = this;
        self.scrollToItem(self.curChooseRCardIndex);
    }

    private scrollToItem(index:number){
        var self = this;
        if(index==-1){
            return;
        }
        self.curChooseRCardIndex = index;
        let scrollH = self.arrRCardPosX[index];
        egret.Tween.removeTweens(self.scrCCardItem.viewport);
        SoundManager.getInstance().PlaySound("kapaihuadong_mp3");
        egret.Tween.get(self.scrCCardItem.viewport).to({ scrollH: scrollH },100).call(self.checkScale,self);
        
        self.updateBCardSelShow();
    }

    //发送请求卡牌列表
    private sendGetCardList():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        let obj:Object = {rarity:self.sortFactor["rarity"],element:self.sortFactor["element"],sort:self.sortFactor["sort"],pageNum:self.pageNum,pageSize:self.pageSize,detail:0};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_CARD_LIST_TEAMSET,obj);
    }

    //接收数据
    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_CARD_LIST_TEAMSET:  //获取队伍配置
                self.setRCardItem(data);
                UIManager.getInstance().hideUI(FilterView);
            break;
            case HallCmdDef.CMD_TurnCard:
                var obj = data["msg"]["_tranStatus"];
                var code = data["code"];

                var cIndex:number =self.getSCardItemIndex(code);
                if(cIndex!=-1){ //如果是已经上去的卡牌则下来
                    // 小卡牌撤下
                    self.onRemoveSCardItem2(cIndex); 
                    self.pageNum = 1;
                    self.sendGetCardList();
                    var data1:Object = {name:"转卡成功!",fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                }
            break;
            case HallCmdDef.CMD_CardRecord:
                var obj = data["data"]
            break;
            case HallCmdDef.CMD_CardProgress:
                var obj = data
 
                var a = 0;
            break;
           /* case HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET:
                self.addCardDetail(data);
            break;*/
        }
    }

    private removeRCardItem():void{
        var self = this;
        while(self.arrRCardPosX.length){
            self.arrRCardPosX.pop();
        }
        self.cleanArray(self.arrRCardItem);
        if(self.cCardScrViewGroup!=null){
            self.cCardScrViewGroup.parent.removeChild(self.cCardScrViewGroup);
            self.cCardScrViewGroup = null;
        }
        self.curChooseRCardIndex = -1;
        self.scrCCardItem.viewport.scrollH = 0;
    }

    //设置长方形卡牌
    private setRCardItem(data:any):void{
        var self = this;
        if(self.pageNum==1){
            self.removeRCardItem();
        }
        var hIndex:number = 0;
        var gapWidth:number = 10;
        var width:number = 0;
        var sCount:number = self.arrRCardItem.length;
        var count:number = data==null?sCount:sCount+data.length;
        for(var i:number=sCount;i<count;i++){
            var index:number = i - sCount;
            var item:any = data[index];
            if(item==null)
                continue;

            var view:CardRectangleView = new CardRectangleView();
            var obj:any = item;
            obj.groupName = "groupCR_"+i;
            view.initData(obj);
            self.groupCCardItem.addChild(view);
            if(width==0)
                width = view.getViewWidth();
            var posX = i*(width*self.cRCardScale+gapWidth);
            view.x = posX;
            view.y = 0;
            view.scaleX = view.scaleY = self.cRCardScale;
            self.arrRCardItem.push(view);
            self.arrRCardPosX.push(posX);
        }

        if(count-sCount<self.pageSize&&self.cCardScrViewGroup==null){
            var group:eui.Group = new eui.Group();
            if(width==0&&self.arrRCardItem.length>0){
                width = self.arrRCardItem[0].getViewWidth();
            }
            group.x = width*self.cRCardScale*(count+1);
            group.y = 0;
            group.width = self.scrCCardItem.width;
            group.height = 0;
            self.groupCCardItem.addChild( group );
            self.cCardScrViewGroup = group;
        }

        self.checkScale();
        self.updateBCardSelShow();
    }

    private getSCardItemIndex(code:string):number{
        var self = this;
        for(var i:number=0,lengthI:number = self.arrSCardItem.length;i<lengthI;i++){
            var item:CGSCardItemView = self.arrSCardItem[i];
            if(item==null||item.getType()!=0)
                continue;
            if(item.getCardData()!=null&&code==item.getCardData()["code"]){
                return i;
            }
        }
        return -1;
    }

    private updateBCardSelShow():void{
        var self = this;
        self.btnDetails.visible = self.curChooseRCardIndex!=-1;

        for(var i:number=0,lengthI=self.arrRCardItem.length;i<lengthI;i++){
            var item:CardRectangleView = self.arrRCardItem[i];
            if(item==null)
                continue;
            var vdata:any = item.getData();
            if(vdata==null)
                return;
            var code:string = vdata.code;
            if(code==null)
                return;
            item.setChoose(self.getSCardItemIndex(code)!=-1);
        }

    }

    private updateBCardSelShow2():void{
        var self = this;
        self.btnDetails.visible = self.curChooseRCardIndex!=-1;

        for(var i:number=0,lengthI=self.arrRCardItem.length;i<lengthI;i++){
            var item:CardRectangleView = self.arrRCardItem[i];
            if(item==null)
                continue;
            var vdata:any = item.getData();
            if(vdata==null)
                return;
            var code:string = vdata.code;
            if(code==null)
                return;
            item.$setVisible(self.getSCardItemIndex(code)==-1)
            self.removeChild(item);
        }

    }

    private checkScale():void{
        var self = this;
        let sc = self.scrCCardItem;
        let gapX:number = 22;
        let gapWidth:number = 100-gapX;
        for(var i:number=0,lengthI=self.arrRCardItem.length;i<lengthI;i++){
            let item = self.arrRCardItem[i];
            item.x =self.arrRCardPosX[i]+gapX;
            let chaz = (item.x-sc.viewport.scrollH);
            if(Math.abs(chaz)<gapWidth && Math.abs(chaz)>=0){
                if(chaz<0){
                    item.scaleX = 
                    item.scaleY = self.bRCardScale+chaz/1000;
                }else if(chaz>0){
                    item.scaleX = 
                    item.scaleY = self.bRCardScale-chaz/1000;
                }else if(Math.abs(chaz)==0){
                    item.scaleX = 
                    item.scaleY = self.bRCardScale;
                }
                // console.log(chaz);
                // item.scaleX = 
                // item.scaleY = self.bRCardScale+chaz/1000;
                item.y = 0;
                gapX = item.width*(self.bRCardScale-self.cRCardScale)+40;
                if(self.curChooseRCardIndex!=i)
                    SoundManager.getInstance().PlaySound("kapaihuadong_mp3");
                self.curChooseRCardIndex = i;
                if(i!=0){
                    let item1 = self.arrRCardItem[i-1];
                    item1.x =self.arrRCardPosX[i-1]-25;
                }
            }else{
                item.scaleX =
                item.scaleY = self.cRCardScale;
                item.y = 40;
            }
        }
    }
    
    private setOptionBtn():void{
        var self = this;
        var imgName = ["juese","shengmingddg","quanwuxing","quanpinzhi","daishu","xingji"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           imgName = ["e_zrdyx","e_zcdqb","jilu"];
        }

        for(var i:number=0; i < 6; i++){
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(imgName[i]);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }

        self.updateOptionBtnPos();
        self.setCurChooseOptionBtnByIndex(0); 
    }

    //设置当前选中选项按钮下标
    private setCurChooseOptionBtnByIndex(index:number):void{
        var self = this;
        var btnView:OptionBtnView = null;
        self.updateOptionBtnPos();
        self.curBtnIdx = index

        // 跳出二级界面
        if(index == 0){ // 角色
            var data:Object = {desArr:self.arrSort0,cbHandler:Handler.create(self,self.onChooseCardSort0),selIndex:self.sortFactor["actor"]}
            UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }else if(index == 1){  // 排序
            var data:Object = {desArr:self.arrSort1,cbHandler:Handler.create(self,self.onChooseCardSort1),selIndex:self.sortFactor["sort"]};
            UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }else if(index == 2){  // 五行
            var data:Object = {desArr:self.arrSort2,cbHandler:Handler.create(self,self.onChooseCardSort2),selIndex:self.sortFactor["element"]};
            UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }else if(index == 3){  // 品质
            var data:Object = {desArr:self.arrSort3,cbHandler:Handler.create(self,self.onChooseCardSort3),selIndex:self.sortFactor["rarity"]};
            UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }else if(index == 4){  // 代数
            var data:Object = {desArr:self.arrSort4,cbHandler:Handler.create(self,self.onChooseCardSort4),selIndex:self.sortFactor["lvl"]};
            UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }else if(index == 5){  // 星级
            var data:Object = {desArr:self.arrSort5,cbHandler:Handler.create(self,self.onChooseCardSort5),selIndex:self.sortFactor["gen"]};
            UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }
      
    }

    // 角色
    private onChooseCardSort0(index:number):void{
        this.onChangeCardSort(0,index);
    }
    // 排序
    private onChooseCardSort1(index:number):void{
        this.onChangeCardSort(1,index);
    }
    // 五行
    private onChooseCardSort2(index:number):void{
        this.onChangeCardSort(2,index);
    }
    // 品质
    private onChooseCardSort3(index:number):void{
        this.onChangeCardSort(3,index);
    }
    // 代数
    private onChooseCardSort4(index:number):void{
        this.onChangeCardSort(4,index);
    }
    // 星级
    private onChooseCardSort5(index:number):void{
        this.onChangeCardSort(5,index);
    }

    private onChangeCardSort(type:number,index:number):void{
        var self = this;
        if(self.sortFactor==null)
            return;
        var param:string = "";
        if(type==0){
            param = "actor";
        }else if(type==1){
            param = "sort";
        }else if(type==2){
            param = "rarity";
        }else if(type==3){
            param = "element";
        }else if(type==4){
            param = "lvl";
        }else if(type==5){
            param = "gen";
        }
        var val:number = self.sortFactor[param];
        var sendData:boolean = true;
        if(val==null||val==index){
            sendData = false;
        }

        // 选中二级菜单后设置一级按钮 text
        var contentString = this.sortImgText[type][index];
        this.arrOptionBtn[type].setBtnImgContent(contentString);

        if(sendData){
            self.sortFactor[param] = index;
            self.pageNum = 1; // 切换搜索条件需要重新初始一下

            self.requestCardList();
        }else{
            UIManager.getInstance().hideUI(FilterView);
        }
    }

    //发送请求卡牌列表
    private requestCardList():void{
    /*    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        let obj:Object = {rarity:self.sortFactor["rarity"],element:self.sortFactor["element"],sort:self.sortFactor["sort"],pageNum:self.pageNum,pageSize:self.pageSize};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CardViewLists,obj);
*/
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        var actorname = self.sortImgText[0][self.sortFactor["actor"]]
        if(self.sortFactor["actor"] == 0){
            actorname = "";
        }
        let obj:Object = {lvl:self.sortFactor["lvl"],gen:self.sortFactor["gen"],actor:actorname,rarity:self.sortFactor["rarity"],element:self.sortFactor["element"],sort:self.sortFactor["sort"],pageNum:self.pageNum,pageSize:self.pageSize,detail:0,searchtype:1};
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_CARD_LIST_TEAMSET,obj);
    
}

    //返回选项按钮视图根据下标
    private getOptionBtnViewByIndex(index:number):OptionBtnView{
        var retView:OptionBtnView = null;
        var self = this;
        for(var i:number=0,lengthI = self.arrOptionBtn.length;i<lengthI;i++){
            var btnView:OptionBtnView = self.arrOptionBtn[i];
            if(btnView==null)
                continue;
            var btnName:string = btnView.getBtnName();
            var strArr:Array<string> = btnName.split("_");
            if(strArr.length!=2){
                continue;
            }
            var cIndex:number = Number(strArr[1]);
            if(index==cIndex){
                retView = btnView;
                break;
            }
        }

        return retView;
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
            posY += item.getViewHeight() + 10;
        }
       // self.scrOptionBtn.height = posY;
    }

    private initView():void{
        var self = this;
        self.pageNum = 1;


    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.curChooseOptionBtnIndex = null;

        self.cleanArray(self.arrSCardItem);
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
                self.setCurChooseOptionBtnByIndex(cIndex);  // 按钮被按下

            }else if(btn==self.btnBack){
                self.hiden();
            }else if(btn==self.btnRecord){  // 记录

                UIManager.getInstance().showUI(CardRecordView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,null);

            }else if(btn==self.btnProgress){  // 进度

              /*  let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                let reqObj:Object = {code:1};
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CardProgress,reqObj);*/
                UIManager.getInstance().showUI(CardRecordView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,null);

            }else if(btn==self.btnConfirm){  // 确定

                var binaddr:string =  GlobalDataManager.getInstance().getBindAddress();  // 网关给的钱包地址
                if(binaddr == ""){
                    var data1:Object = {name:"钱包地址为空",fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                    return;
                }
                
                var selectid = 0;
                for(var i:number = 0; i < this.selectCardData["length"]; i++){
                    if(this.selectCardData[i] != null){
                        selectid = i;
                        break;
                    } 
                }

                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                let reqObj:Object = {code:1};
                reqObj["code"] = this.selectCardData[selectid]["code"]; 
                reqObj["name"] = this.selectCardData[selectid]["icon"];
                reqObj["binaddr"] = binaddr;
                reqObj["index"] = this.selectIndex;
               /* var cardlist:Object = [];
                for(var i:number = 0; i <  this.selectCardData["length"]; i++){
                    cardlist[i] = this.selectCardData[i]["code"];
                }
                reqObj["cardlist"] = cardlist;*/

                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_TurnCard,reqObj);
            }
        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,8)=="groupCR_"){
                if(self.movingState)
                    return;
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2)
                    return;
                var cIndex:number = Number(strArr[1]);
                this.selectIndex = cIndex;
                self.onClickRCardItem(cIndex);
            }else if(group.name.substr(0,11)=="groupCGSCI_"){
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2)
                    return;
                var cIndex:number = Number(strArr[1]);
                self.onClickSCardItem(cIndex);
            }
        }
    }

    //当点击卡牌
    private onClickSCardItem(index:number):void{
        var self = this;
        if(self.arrSCardItem==null)
            return;
        
        var view:CGSCardItemView = self.arrSCardItem[index];
        if(view==null||view.getType()==null||view.getType()!=0)
            return;
        
        // UIManager.getInstance().showUI(CardGroupSetView);
        var cardData:Object = view.getCardData();
        if(cardData==null)
            return;

            self.onRemoveSCardItem(index);
       // var code:string = cardData["code"];
      //  self.showCardDetailView(code);
    } 

    private onClickRCardItem(index:number):void{
        var self = this;
        
        if(self.curChooseRCardIndex!=index){
            self.scrollToItem(index);
            return;
        }
        var view:CardRectangleView = self.arrRCardItem[index];
        if(view==null)
            return;
        var cdata:any = view.getData();
        if(cdata!=null&&cdata.code!=null){
            var code:string = cdata.code;
            var cIndex:number =self.getSCardItemIndex(code);
            if(cIndex!=-1){ //如果是已经上去的卡牌则下来
                self.onRemoveSCardItem(cIndex);
            }else{//否则就找到位置 能上就上
                var objData:Object = null;
                for(var i:number=0,lengthI:number = self.arrSCardItem.length;i<lengthI;i++){
                    var item:CGSCardItemView = self.arrSCardItem[i];
                    if(item==null)
                        continue;
                    if(item.getType()==1){
                        cIndex = i;
                        break;
                    }
                }
                if(cIndex!=-1){
                    self.setSCardItem(cIndex,cdata);
                    self.updateBCardSelShow();
                  //  self.updateCardGroupAttribute();
                }                    
            }
        }
    }

     //当卸下正方形卡牌回调
    private onRemoveSCardItem(index:number):void{
        if(index==null||index<0)
            return;

        var self = this;
        var view:CGSCardItemView = self.arrSCardItem[index];
        if(view==null)
            return;
        

        view.updateShow({type:1});
        self.updateBCardSelShow();
         this.selectCardData[index] = null;
        UIManager.getInstance().hideUI(CGDetailView);
        //self.updateCardGroupAttribute();
    }

     //当卸下正方形卡牌回调
    private onRemoveSCardItem2(index:number):void{
        if(index==null||index<0)
            return;

        var self = this;
        var view:CGSCardItemView = self.arrSCardItem[index];
        if(view==null)
            return;
        
 //       self.updateBCardSelShow2();
        view.updateShow({type:1});
      //  self.updateBCardSelShow();
         this.selectCardData[index] = null;

    }

    //设置正方形卡牌
    private setSCardItem(index:number,data:any):void{
        var self = this;
        if(self.arrSCardItem==null)
            return;
        
        var cardItem:CGSCardItemView = self.arrSCardItem[index];
        if(cardItem==null)
            return;
        
        var obj:Object = {type:0,sdata:data};
        this.selectCardData[index] = data;
        cardItem.updateShow(obj);
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
}