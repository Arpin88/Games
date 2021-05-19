// TypeScript file
class MallView extends BaseView{

    public static NAME:string = "MallSkin";

     public constructor(){
        super(MallView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮

    private scrOptionBtn:eui.Scroller;  //选项按钮下拉滚动区域
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层

    private imgRBG:eui.Image;   //右边背景
    private scrPropItem:eui.Scroller;   //道具下拉滚动区域
    private groupPropItem:eui.Group;    //道具下拉区域层
    private mallskingroup:eui.Group;
    private comStar:eui.Component;      //星星


    private arrPropTypeData:Array<Object> = new Array<Object>();    //道具类型数据
    private propData:any;        //道具数据(根据道具类型获取的道具信息本地存储容器)
    private shopInfoData:any;    //商品信息数据(根据商品标识获取的道具详情信息本地存储容器)

    private curSelPropData:any; //当前选择的道具数据

    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();  //选项按钮容器
    private curChooseOptionBtnIndex:number; //当前选中选项按钮下标

    private arrPropItem:Array<MPropItemView> = new Array<MPropItemView>();    //道具容器
    
    

    // private mallName:Object = []
    // private kindList:number[] = [0,2,8,7,-1] // kindList
    // private curBtnIdx:number = 0;
    // private tempList:Object = [];

    private pageNum:number = 1;     //当前页数 下标从1开始
    private pageSize:number = 10;   //一页的数量
    private receiveNum:number = 0;
    private needUp:boolean = false;

    private movingState:boolean = false;   //移动状态

    private expPotionsCode:string = "3";    //经验药水编号 用于新手引导购买经验药水
    private expPotionsIndex:number = -1;    //经验药水下标

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        self.scrPropItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrPropItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        GameEventManager.getInstance().addEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
        GameEventManager.getInstance().addEventListener(HallEvent.updateGold,self,self.updateGold);
        GameEventManager.getInstance().addEventListener(HallEvent.updateProp,self,self.updateProp);

        this.pageNum = 1;
        this.needUp = false;
        this.receiveNum = 0;
        self.updateGold();
        self.setOptionBtn();
        // self.sendGetShopList(); // 初始申请数据
        
    }

    // //发送请求卡牌列表
    // private sendGetShopList():void{
    //     let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
    //     // shop数据服务器到了
    //     let obj = new Object();
    //     obj["param"] = "商城";
    //     HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Shop,obj,true); // ok
    // }

    private moveHandler(evt: eui.UIEvent): void {
        if(this.scrPropItem.viewport.scrollV > (this.scrPropItem.viewport.contentHeight - this.scrPropItem.viewport.height)-40){
			this.needUp = true;
		}
    }

    private outHandler(evt:eui.UIEvent):void{
        if(this.receiveNum < this.pageSize){
            this.needUp = false;
        }
        
        if(this.needUp){
			this.needUp = false;
			this.addNewData();
		}
    }

    private addNewData():void{
        var self = this;
       // 2 申请下一页的数据
       self.pageNum = self.pageNum + 1;
       
       var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        var arrPropData:Array<any> = self.propData[propType.code];
        if(arrPropData.length<=(self.pageNum-1)*self.pageSize)   //如果本地没有数据则去请求数据
            this.reqGetShopPropList();
        else
            this.updatePropShow();

       
    }

    private updateGold():void{
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrPropItem);
        self.curChooseOptionBtnIndex = null;
        this.pageNum = 1;
        // self.mallName = [];
        self.propData = null;
        self.shopInfoData = null;
        self.curSelPropData = null;

        GameEventManager.getInstance().removeEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateGold,self,self.updateGold);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateProp,self,self.updateProp);

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


    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_SHOP_PROP_LIST:
                self.onGetShowPropList(data);
            break;
            case HallCmdDef.CMD_GET_SHOP_PROP_INFO:
                self.onGetShopPropInfo(data);
            break;
            // case HallCmdDef.CMD_GET_MOLL_CONFIG:
            //     var shopDesc = data["shopDesc"]  
            //     var shopName = data["shopName"] 
            //     var num = data["length"]
            //     this.receiveNum = num;
            //     for(var k:number = 0; k < num; k++)
            //     {
            //         var obj = data[k];
            //         var tp = LanguageManager.getInstance().getCurLanguageType();
            //         if(tp == 1){
            //             obj["shopName"]  =  obj["shopEnName"];
            //             obj["shopDesc"]  =  obj["shopEnDesc"];
            //         }
            //         var curIdx:number = (this.pageNum - 1) * this.pageSize + k;
            //         self.mallName[obj.shopOrder-1] = obj;
            //     }
            //   //  if(num > 0){
            //         self.setCurChooseOptionBtnByIndex(0); // 刷新一下
            //    // }
                
            // break;
            // case HallCmdDef.CMD_GET_MOLLBY_CONFIG:
            //     var aaa = data["msg"]
            //     var idx = data["itemIdx"]
            //     var num = data["buyNum"]
            //     var gold  = data["curGold"]
            //     var shopOrder = data["shopOrder"]
            //     var msg = data["msg"]
            //     var errorString = data["errorString"]
            //     if(msg == false){
            //         PopManager.getInstance().showPromptBox(errorString,2,Handler.create(self,function(confirm:boolean){
            //             console.log(`回调函数被调用`);
            //         }));
            //     }else{
            //         for(var i:number = 0; i < self.mallName["length"]; i++)
            //         {
            //             if(self.mallName[i].shopOrder == shopOrder)
            //             {
            //                 self.mallName[i].shopNum = self.mallName[i].shopNum + parseInt(num);
            //             }
            //         }
            //         var account123 = GlobalDataManager.getInstance().getAccountData();
            //         account123.setGold(gold);
            //         self.updateGold();
            //         self.setPropItem(self.kindList[self.curBtnIdx]); 
            //     }
                
            // break;
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Button){
            var btn:eui.Button = <eui.Button>event.target;
            if(btn.name.substr(0,10)=="btnOption_"){
                SoundManager.getInstance().PlayClickSound();
                var strArr:Array<string> = btn.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex);  // 按钮被按下
                // console.log(`选择按钮被按下：${cIndex}`);
            }else if(btn.name.substr(0,7)=="btnBuy_"){
                if(self.movingState)
                    return;
                SoundManager.getInstance().PlayClickSound();
                var strArr:Array<string> = btn.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
                if(propType==null)
                    return;
                var arrPropData:Array<any> = self.propData[propType.code];
                var propData:any = arrPropData[cIndex];
                if(propData==null)
                    return;
                self.curSelPropData = propData;
                var shopCode:string = propData.shopCode;
                if(self.shopInfoData==null||self.shopInfoData[shopCode]==null){
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_SHOP_PROP_INFO,{shopCode:shopCode},true);    
                    return;
                }
                    
                // UIManager.getInstance().showUI(MPropExplainView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{type:arrPropData[cIndex],idx:cIndex});
                UIManager.getInstance().showUI(MPropExplainView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{info:self.shopInfoData[shopCode]});

            }else if(btn==self.btnBack){
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
    }

    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }

    private setOptionBtn():void{
        var self = this;

        if(self.arrPropTypeData.length<=0){ //如果道具类型为空则去请求服务器道具类型
            let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_PROP_TYPE_LIST,{},true);
            return;
        }

        self.updateOptionBtn();
        self.setCurChooseOptionBtnByIndex(0);
    }


    private onGetProptypeComplete(data:any):void{
        if(data==null||data[HallEvent.Data]==null)
            return;
        
        var objData:any = data[HallEvent.Data];
        var self = this;
        self.arrPropTypeData = objData;
        
        self.updateOptionBtn();
        self.setCurChooseOptionBtnByIndex(0);
    }


    private updateOptionBtn():void{
        var self = this;
        for(var i:number=0,lengthI=self.arrPropTypeData.length;i<lengthI;i++){
            var item:any = self.arrPropTypeData[i];
            if(item==null)
                continue;
            // code:"3"
            // name:"牌背"
            // res_url:"bag_paibei"
            var resUrl:string = item.resUrl;
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            //btnView.setBtnContent(self.typeName[i]);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            // btnView.y = btnView.getViewHeight()*i + 10*(i+1);
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    }

    //设置当前选中选项按钮下标
    private setCurChooseOptionBtnByIndex(index:number):void{
        var self = this;
        var btnView:OptionBtnView = null;
        if(self.curChooseOptionBtnIndex!=null){
            if(self.curChooseOptionBtnIndex==index){
                return;
            }
            btnView = self.getOptionBtnViewByIndex(self.curChooseOptionBtnIndex);
            if(btnView==null)
                return;
            btnView.setCurChoose(0,true);
        }
        self.curChooseOptionBtnIndex = index;
        self.expPotionsIndex = -1;
        btnView = self.getOptionBtnViewByIndex(index);
        if(btnView==null)
            return;
        btnView.setCurChoose(1,true);

        self.updateOptionBtnPos();

        self.scrPropItem.viewport.scrollV = 0;
        self.pageNum = 1;
        self.cleanArray(self.arrPropItem);
        self.updatePropShow();

        // // 设置选项对应的道具
        // self.cleanArray(self.arrPropItem);
        // self.curBtnIdx = index
        // self.setPropItem(self.kindList[index]);  // 传kind
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
            posY += item.getViewHeight() + 20;
        }
        self.scrOptionBtn.height = posY;
    }


    //请求获取商城道具列表
    private reqGetShopPropList():void{
        var self = this;

        var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let obj = {pageNum:self.pageNum,pageSize:self.pageSize,ptypeCode:propType.code}
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_SHOP_PROP_LIST,obj,true);
    }

    //当获取商城道具列表完成
    private onGetShowPropList(data:any):void{
        if(data==null)
            return;
        
        var self =this;

        var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        if(self.propData==null)
            self.propData = new Object();
        
        var arr:Array<any> = self.propData[propType.code];
        if(arr==null)
            arr = new Array<any>();
        
        var arrData:Array<any> = data;
        for(var i:number=0,lengthI:number = arrData.length;i<lengthI;i++){
            var item:any = arrData[i];
            if(item==null)
                continue;
            
            arr.push(item);
        }
        self.propData[propType.code] = arr;

        self.setPropShow(data);
    }


    //更新道具显示
    private updatePropShow():void{
        var self = this;

        var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        if(self.propData==null||self.propData[propType.code]==null){
            self.reqGetShopPropList();
            return;
        }

        var arrPropData:Array<any> = self.propData[propType.code];
        var arrPropShowData:Array<any> = new Array<any>();
        for(var i:number= (self.pageNum-1)*self.pageSize,lengthI:number=arrPropData.length;i<lengthI;i++){
            var item:any = arrPropData[i];
            if(item==null)
                continue;
            arrPropShowData.push(item);
        }
        self.setPropShow(arrPropShowData);
    }

    private setPropShow(arrPropData:Array<any>):void{
        if(arrPropData==null||arrPropData.length<=0)
            return;

        var self =this;
        var hMaxCount:number = 2;
        var hIndex:number = self.arrPropItem.length%hMaxCount;
        var width:number = self.scrPropItem.width/hMaxCount - 21;
        var vIndex:number = Math.floor(self.arrPropItem.length/hMaxCount);

        var size:number = self.pageSize;
        for(var i:number = 0,lengthI:number = arrPropData.length; i < lengthI; i++){
            var item:any = arrPropData[i];
            if(item==null)
                continue;
            if(size<=0)
                break;
            size--;
            var view:MPropItemView = new MPropItemView();
            var data1 = {name:item.name,idx:i,price:item.price,icon:item.resUrl};  
            view.setData(data1)
            view.init();
            self.groupPropItem.addChild(view);
            view.x = hIndex*(width) + 30;
            view.y = vIndex*(view.getViewHeight() + 20) + 10;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.setBtnName("btnBuy_" + i);
            self.arrPropItem.push(view);
            hIndex = hIndex + 1;
            if(hIndex>=hMaxCount){
                hIndex=0;
                vIndex++;
            }

            if(self.expPotionsIndex==-1&&item.shopCode==self.expPotionsCode){ //经验药水
                self.expPotionsIndex = i;
            }
        }

        if(self.expPotionsIndex!=-1){
            if(UIManager.getInstance().checkHasViewByName(GuideView))
                GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
        }

        self.receiveNum = arrPropData.length;
    }

    //当获取商城道具信息完成
    private onGetShopPropInfo(data:any):void{
        if(data==null)
            return;
        var self = this;
        if(self.shopInfoData==null)
            self.shopInfoData = new Object();
        
        var shopCode:string = self.curSelPropData.shopCode;
        var info:any = data;
        info.price = self.curSelPropData.price;
        info.name = self.curSelPropData.name;
        info.resUrl = self.curSelPropData.resUrl;
        info.shopCode = shopCode;
        self.shopInfoData[shopCode] = info;
        UIManager.getInstance().showUI(MPropExplainView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{info:info});
    }


    //购买成功触发 更新道具数据
    private updateProp(dataObj:any):void{
        if(dataObj==null||dataObj[HallEvent.Data]==null)
            return;
        
        var data:any = dataObj[HallEvent.Data];

        if(data.hasOwnProperty("shopCode")){
            var count:number = data.count;
            var shopCode:string = data.shopCode;

            var self = this;
            if(self.shopInfoData.hasOwnProperty(shopCode)){
                self.shopInfoData[shopCode].ownCount = count;
            }
        }

    }

    // //设置道具
    // private setPropItem(kind:number):void{
    //     var self = this;
    //     var hMaxCount:number = 2;
    //     var hIndex:number = 0;
    //     var width:number = self.scrPropItem.width/hMaxCount - 21 
    //     var vIndex:number = 0;
    //     self.tempList = []
    //     var idx:number = 0;
    //     for(var i:number = 0; i < self.mallName["length"]; i++)
    //     {
    //         if(kind != 0)
    //         {
    //             if(self.mallName[i].pcode == kind)
    //             {
    //                 self.tempList[idx] = self.mallName[i];
    //                 idx = idx + 1;
    //             }
    //         }
    //         else
    //         {
    //             self.tempList[idx] = self.mallName[i];
    //             idx = idx + 1;
    //         }
    //     }

    //     var num:number = self.tempList["length"];
    //     for(var i:number = 0; i < num; i++){
            
    //         var view:MPropItemView = new MPropItemView();
    //         var data1 = {name:self.tempList[i].shopName,idx:i,price:self.tempList[i].price,icon:self.tempList[i].resUrl};  
    //         view.setData(data1)
    //         view.init();
    //         self.groupPropItem.addChild(view);
    //         view.x = hIndex*(width) + 30;
    //         view.y = vIndex*(view.getViewHeight() + 19) + 28;
    //         view.width = view.getViewWidth();
    //         view.height = view.getViewHeight();
    //         view.setBtnName("btnBuy_" + i);
    //         self.arrPropItem.push(view);
    //         hIndex = hIndex + 1;
    //         if(hIndex>=hMaxCount){
    //             hIndex=0;
    //             vIndex++;
    //         }
    //     }
    // }

    public getMallGroup():eui.Group{
        return this.mallskingroup;
    }

    public getExpPotionsItem():MPropItemView{
        var self = this;
        if(self.expPotionsIndex==-1)
            return null;
        return self.arrPropItem[self.expPotionsIndex];
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.mallskingroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.mallskingroup.scaleX = 
            self.mallskingroup.scaleY = 1;
            return;
        }
        self.mallskingroup.scaleX = 
        self.mallskingroup.scaleY = gapNum;
    }
}
