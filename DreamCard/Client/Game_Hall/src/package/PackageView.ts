// TypeScript file
class PackageView extends BaseView{

    public static NAME:string = "PackageSkin";

     public constructor(){
        super(PackageView.NAME);
    }

    private groupPackage:eui.Group;
    private btnBack:eui.Button;     //返回按钮

    private scrOptionBtn:eui.Scroller;  //选项按钮下拉滚动区域
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层
    private infogroup:eui.Group; // 道具详情面板
    
    private imgRBG:eui.Image;   //右边背景
    private scrPropItem:eui.Scroller;   //道具下拉滚动区域 
    private groupPropItem:eui.Group;    //道具下拉区域层

    // private mallName:Object = [];
    // private kindList:number[] = [0,2,8,7,-1] // kindList
    // private curBtnIdx:number = 0;
    // private curItemIdx:number = 0;
    // private tempList:Object = [];

    private arrPropTypeData:Array<Object> = new Array<Object>();    //道具类型数据
    private propData:any;        //道具数据(根据道具类型获取的道具信息本地存储容器)
    private propInfoData:any;    //道具信息数据(根据道具标识获取的道具详情信息本地存储容器)

    private curSelPropData:any; //当前选择的道具数据

    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();  //选项按钮容器
    private curChooseOptionBtnIndex:number; //当前选中选项按钮下标

    private arrPropItem:Array<PPropItemView2> = new Array<PPropItemView2>();    //道具容器
    private needUp:boolean = false;
    // private hIndex:number = 0;
    // private vIndex:number = 0;

    private iconname:eui.Label;
    private num:eui.Label;  // 数量
    private disc:eui.Label; 
    private price:eui.Label; 
    private imgItem:eui.Image;
    private btnDestory:eui.Button;
    private btnUse:eui.Button;

    private pageNum:number = 1;     //当前页数 下标从1开始
    private pageSize:number = 10;   //一页的数量
    private receiveNum:number = 0;
    private comStar:eui.Component;  //星星

    private cuihuiTxt:string = "被摧毁物品将无法找回！是否确定摧毁？";
    private weijiesuoTxt:string = "使用暂未解锁";
    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self); // 拉到底再增加暂时不需要

        GameEventManager.getInstance().addEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
        GameEventManager.getInstance().addEventListener(HallEvent.updateProp,self,self.updateProp);

        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.cuihuiTxt = "Deleted items can't be retrieved! Are you sure to delete it?";
            self.weijiesuoTxt = "Not available yet";
        }

        self.pageNum = 1;
        self.needUp = false;
        self.receiveNum = 0;
        self.infogroup.visible = false;
        self.updateGold();
        self.setOptionBtn();
        // this.setItemInfo(null);
        // self.sendGetBagList(); // 初始申请数据
        
    }

    private updateGold():void{
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
        // this.comStar["txt0"].text = account.getXWGCoin();
    }

    // //发送请求卡牌列表
    // private sendGetBagList():void{
    //     var self = this;
    //     let obj = new Object();
    //     obj["param"] = "背包";
    //     obj["pageid"] = this.pageNum;
    //     obj["pageSize"] = this.pageSize;
    //     let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
    //     HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Bag,obj,true);
    // }

    protected sleep():void{
         var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrPropItem);
        self.curChooseOptionBtnIndex = null;
        // self.hIndex =0;
        // self.vIndex =0;
        self.scrPropItem.viewport.scrollV = 0;
        self.scrPropItem.viewport.scrollH = 0;
        this.pageNum = 1;
        // self.mallName = [];
        self.propData = null;
        self.propInfoData = null;
        self.curSelPropData = null;

        GameEventManager.getInstance().removeEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateProp,self,self.updateProp);
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
            case HallCmdDef.CMD_GET_BAG_PROP_LIST:
                self.onGetBagPropList(data);
            break;
            case HallCmdDef.CMD_GET_BAG_PROP_INFO:
                self.onGetShopPropInfo(data);
            break;
            case HallCmdDef.CMD_DESTORY_BAG_PROP:
                self.onDestoryBagProp(data);
            break;
            // case HallCmdDef.CMD_Bag: 
            //      var num = data["length"]
            //      this.receiveNum = num;
            //     for(var i:number = 0; i < num; i++)
            //     {
            //         var obj = data[i]
            //         var curIdx:number = (this.pageNum - 1) * this.pageSize + i;
            //         self.mallName[curIdx] = obj;
            //     }
            //     if(num > 0){
            //         self.setPropItem(0,0);
            //     }
                
            // break;
            // case HallCmdDef.CMD_Baguse:
            // case HallCmdDef.CMD_BagDestory:
            //     var aaa = data["msg"]
            //     var idx = data["itemIdx"]
            //     var bagId = data["bagId"]
            //     var shopKind = data["shopKind"];
            //     var shop_num = data["shop_num"];
            //     for(var i:number = 0; i < self.mallName["length"]; i++)
            //     {
            //         if(self.mallName[i].shopKind == shopKind)
            //         {
            //             self.mallName[i].shopNum = shop_num;
            //         }
            //     }
            //     self.hIndex =0;
            //     self.vIndex =0;
            //     self.cleanArray(self.arrPropItem);
            //     self.setPropItem(self.kindList[self.curBtnIdx],idx); 
            // break;
            // case HallCmdDef.CMD_BaguseUp:
            //     var idx = data["itemIdx"]
            //     var bagId = data["bagId"]
            //     var shopKind = data["shopKind"];
            //     var shop_num = data["bagNum"];
            //     for(var i:number = 0; i < self.mallName["length"]; i++)
            //     {
            //         if(self.mallName[i].shopKind == shopKind)
            //         {
            //             self.mallName[i].shopNum = shop_num;
            //         }
            //     }
            //     self.hIndex =0;
            //     self.vIndex =0;
            //     self.cleanArray(self.arrPropItem);
            //     self.setPropItem(self.kindList[self.curBtnIdx],idx); 
            // break;
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
                self.setCurChooseOptionBtnByIndex(cIndex);
            }else if(btn==self.btnBack){
                self.hiden();
            }else if(btn == self.btnUse){
                // 根据shop_kind进行跳转 1-4 可以跳转，其余的 现实暂未开放
                // var data:Object = self.tempList[self.curItemIdx]
                // var shopKind:number = data["shopKind"];
                // if(shopKind == 1 || shopKind == 2 || shopKind == 3 ||shopKind == 4){
                //     UIManager.getInstance().showUI(CardView);
                //     let obj = new Object();
                //     obj["param"] = "卡牌";
                // }else{
                //     PopManager.getInstance().showPromptBox(this.weijiesuoTxt,2,Handler.create(self,function(confirm:boolean){
                //         console.log(`回调函数被调用`);
                //     }));
                // }
                if(self.curSelPropData==null||self.curSelPropData.propCode==null)
                    return;
                var propCode:string = self.curSelPropData.propCode;
                if(propCode=="1"||propCode=="2"||propCode=="3"||propCode=="4")
                    UIManager.getInstance().showUI(CardView);
                else{
                    PopManager.getInstance().showPromptBox(this.weijiesuoTxt,2,Handler.create(self,function(confirm:boolean){
                        console.log(`回调函数被调用`);
                    }));
                }

            }else if(btn == self.btnDestory){
                var sum = function(){
                    // console.log(`回调函数被调用,调用id`);
                    // 发送摧毁到服务器
                    // var data:Object = self.tempList[self.curItemIdx]
                    // var bagid:number = data["bagId"];
                    // var a:number = 1;

                    // let obj = new Object();
                    // obj["bagId"] = bagid;
                    // obj["shop_kind"] = data["shopKind"];
                    // obj["itemIdx"] = self.curItemIdx;
                    // obj["usetype"] = false;
                    var propCode:string = self.curSelPropData.propCode;
                    var count:number = 1;
                    let obj = {propCode:propCode,count:count};
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_DESTORY_BAG_PROP,obj,true);
                };
                var data:Object = {name:this.cuihuiTxt,fun:sum};
                UIManager.getInstance().showUI(DailogView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data); // 测试通用提示框
            }

        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,8)=="groupPI_"){
                SoundManager.getInstance().PlayClickSound();
                var strArr:Array<string> = group.name.split("_");
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

                var propCode:string = propData.propCode;
                self.updatePropInfoShow(propCode);

                // var detailView:PPropExplainView = new PPropExplainView();
                // this.curItemIdx = cIndex;
                // this.setItemInfo(this.curItemIdx);
            }
        }
    }

    private setLight(propCode:String):void{
        // var namestring:string = "groupPI_" + cIndex;
        var self = this;
        if(self.arrPropItem.length<=0)
            return;

        for(var i=self.arrPropItem.length-1;i>=0;i--){
            var item:PPropItemView2 = this.arrPropItem[i];
            if(item==null)
                continue;
            item.setBeenSelect(item.getPropCode()==propCode);
        }
    }

    // private setItemInfo(cIndex:number):void{
    //      var data:Object = this.tempList[cIndex];
    //      if(data == null) {
    //          this.infogroup.$setVisible(false)
    //          return;
    //      }
    //      this.infogroup.$setVisible(true)
    //      this.iconname.text =  data["shopName"];
    //      this.num.text = data["shopNum"];  
    //      this.disc.text = data["shopDesc"]; 
    //      this.price.text = data["price"]; 
    //      this.imgItem.source = "propSheet_json." + data["resUrl"];

    //      this.setLight(cIndex);
    // }

    private moveHandler(evt: eui.UIEvent): void {
        if(this.scrPropItem.viewport.scrollV > (this.scrPropItem.viewport.contentHeight - this.scrPropItem.viewport.height)-40){
			this.needUp = true;
		}
    }

    //如果拉到底就再增加一些，这个暂时不需要
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
    //    this.pageNum = this.pageNum + 1;
    //    this.sendGetBagList();
        var self = this;
       // 2 申请下一页的数据
       self.pageNum = self.pageNum + 1;
       
       var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        // var arrPropData:Array<any> = self.propData[propType.code];
        // if(arrPropData.length<=(self.pageNum-1)*self.pageSize)   //如果本地没有数据则去请求数据
        //     this.reqGetShopPropList();
        // else
        //     this.updatePropShow();
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
            //btnView.setBtnContent(typeName[i]);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_"+i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    }

    // private setOptionBtn():void{
    //     var self = this;
    //     var typeName = ["全部","经验书","场景","牌背","其他"];
    //     var imgName = ["bag_quanbu","bag_jingyanshu","bag_changjing","bag_paibei","bag_qita"];
    //     for(var i:number=0;i<5;i++){
    //         var btnView:OptionBtnView = new OptionBtnView();
    //         btnView.init();
    //         self.groupOptionBtn.addChild(btnView);
    //         //btnView.setBtnContent(typeName[i]);
    //         btnView.setBtnImgContent(imgName[i]);
    //         btnView.setBtnName("btnOption_"+i);
    //         btnView.x = 20;
    //         self.arrOptionBtn.push(btnView);
    //         btnView.width = btnView.getViewWidth();
    //         btnView.height = btnView.getViewHeight();

    //     }

    //     //默认选中第一个选项
    //     self.setCurChooseOptionBtnByIndex(0);
    // }

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
        btnView = self.getOptionBtnViewByIndex(index);
        if(btnView==null)
            return;
        btnView.setCurChoose(1,true);

        self.updateOptionBtnPos();

        self.curSelPropData = null;
        self.scrPropItem.viewport.scrollV = 0;
        self.pageNum = 1;
        self.cleanArray(self.arrPropItem);
        self.updatePropShow();

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

    //请求获取背包道具列表
    private reqGetBagPropList():void{
        var self = this;

        var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let obj = {pageNum:self.pageNum,pageSize:self.pageSize,ptypeCode:propType.code}
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_BAG_PROP_LIST,obj,true);
    }

    //当获取背包道具列表完成
    private onGetBagPropList(data:any):void{
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
            self.reqGetBagPropList();
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
        if(arrPropData==null)
            return;
            
        var self =this;
        if(arrPropData.length<=0){
            if(self.curSelPropData==null)      //如果默认没有选择数据且没有道具数据 则不显示道具信息数据
                self.setPropInfoShow(null);
            return;
        }
        
        var hMaxCount:number = 4;
        var hIndex:number = self.arrPropItem.length%hMaxCount;
        var width:number = self.scrPropItem.width/hMaxCount;
        var vIndex:number = Math.floor(self.arrPropItem.length/hMaxCount);

        var size:number = self.pageSize;
        for(var i:number = 0,lengthI:number = arrPropData.length; i < lengthI; i++){
            var item:any = arrPropData[i];
            if(item==null)
                continue;
            if(size<=0)
                break;
            size--;
            if(item.count<=0)
                continue;
            var view:PPropItemView2 = new PPropItemView2();
            var data:Object = {icon:item.resUrl,name:item.name,count:item.count,propCode:item.propCode};
            view.initData(data);
            self.groupPropItem.addChild(view);
            view.x = hIndex*(width*0.95 - 2) + 28;
            view.y = vIndex*(view.getViewHeight() + 20) + 28;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.setGroupName("groupPI_"+i);
           // view.scaleX = view.scaleY = 1.1;
            self.arrPropItem.push(view);
            hIndex++;
            if(hIndex>=hMaxCount){
                hIndex=0;
                vIndex++;
            }
        }

        self.receiveNum = arrPropData.length;

        //默认显示第一个道具信息
        if(self.curSelPropData==null){
            var propData:any = arrPropData[0];
            var propCode:string = propData.propCode;
            self.curSelPropData = propData;
            self.updatePropInfoShow(propCode);
        }
            
        
        
    }

    //更新道具信息显示
    private updatePropInfoShow(propCode:string):void{
        var self = this;
        if(self.propInfoData==null||!self.propInfoData.hasOwnProperty(propCode)){
            let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_BAG_PROP_INFO,{propCode:propCode},true);    
            return;
        }

        self.setPropInfoShow(self.propInfoData[propCode]);
    }

    //设置道具信息显示
    private setPropInfoShow(data:any):void{
        var self = this;
        if(data==null){
            self.infogroup.visible = false;
            return;
        }

        self.iconname.text =  data.name;//data["shopName"];
        self.num.text = data.count;//data["shopNum"];  
        self.disc.text = data.desc;//data["shopDesc"]; 
        self.price.text = data.price;//data["price"]; 
        self.imgItem.source = "propSheet_json." +data.resUrl;//"propSheet_json." + data["resUrl"];
        self.infogroup.visible = true;

        self.setLight(data.propCode);
    }

    //当获取到道具信息完成
    private onGetShopPropInfo(data:any):void{
        if(data==null)
            return;
        var self = this;
        if(self.propInfoData==null)
            self.propInfoData = new Object();
        
        var propCode:string = data.propCode;
        var info:any = data;
        info.name = self.curSelPropData.name;
        info.resUrl = self.curSelPropData.resUrl;
        info.propCode = self.curSelPropData.propCode;
        info.count = self.curSelPropData.count;
        info.price = self.curSelPropData.price;
        self.propInfoData[propCode] = info;
        
        self.setPropInfoShow(info);
    }

    //当销毁背包道具
    private onDestoryBagProp(data:any):void{
        if(data==null)
            return;
        
        let obj:any = new Object();
        obj[HallEvent.Data] = data;
        this.updateProp(obj);
    }

    private updateProp(dataObj:any):void{
        if(dataObj==null||dataObj[HallEvent.Data]==null)
            return;
        
        var data:any = dataObj[HallEvent.Data];

        //更新本地数据跟本地显示

        var propCode:string = data.propCode;
        var count:number = data.count;

        var self = this;

        for(var i:number=0,lengthI=self.arrPropTypeData.length;i<lengthI;i++){
            var propType:any = self.arrPropTypeData[i];
            if(propType==null)
                continue;
            var arrPropData:Array<any> = self.propData[propType.code];
            if(arrPropData==null||arrPropData.length<=0)
                continue;
            for(var j:number=0,lengthJ:number = arrPropData.length;j<lengthJ;j++){
                var item:any = arrPropData[j];
                if(item!=null&&item.propCode==propCode){
                    self.propData[propType.code][j].count = count
                    break;
                }
            }
        }


        if(count>0){   
            if(self.propInfoData[propCode]!=null)
                self.propInfoData[propCode].count = count; 
            if(self.curSelPropData!=null&&self.curSelPropData.propCode==propCode){
                self.curSelPropData.count = count;
                this.updatePropInfoShow(propCode);
            }

            for(var i:number=0,lengthI:number = self.arrPropItem.length;i<lengthI;i++){
                var view:PPropItemView2 = self.arrPropItem[i];
                if(view==null)
                    continue;
                if(view.getPropCode()==propCode){
                    view.updateCountShow(count);
                    break;
                }
            }
        }else{  //如果数量小于0则不显示

            if(self.propInfoData[propCode]!=null)
                self.propInfoData[propCode] = null;

            if(self.curSelPropData!=null&&self.curSelPropData.propCode==propCode){
                self.curSelPropData = null;
                this.updatePropInfoShow(propCode);
            }
            
            self.cleanArray(self.arrPropItem);
            self.updatePropShow();
        }
    }

    // //设置道具
    // private setPropItem(kind:number,selectid:number):void{
    //     var self = this;
    //     var hMaxCount:number = 4;
       
    //     self.tempList = []
    //     var idx:number = 0;
    //     for(var i:number = 0; i < self.mallName["length"]; i++)
    //     {
    //         if(kind != 0)
    //         {
    //             if(self.mallName[i].pcode == kind && self.mallName[i].shopNum > 0)
    //             {
    //                 self.tempList[idx] = self.mallName[i];
    //                 idx = idx + 1;
    //             }
    //         }
    //         else
    //         {
    //             if(self.mallName[i].shopNum > 0){
    //                 self.tempList[idx] = self.mallName[i];
    //                 idx = idx + 1;
    //             }
               
    //         }
    //     }

    //     var width:number = self.scrPropItem.width/hMaxCount;
    //     var lenght:number = self.tempList["length"]
    //     for(var i:number = 0 ;i < lenght; i++){
    //         var view:PPropItemView2 = new PPropItemView2();

    //         var data:Object = {"icon":self.tempList[i].resUrl,"name":self.tempList[i].shopName,"num":self.tempList[i].shopNum};
    //         view.initData(data);
    //         self.groupPropItem.addChild(view);
    //         view.x = self.hIndex*(width*0.95 - 2) + 28;
    //         view.y = self.vIndex*(view.getViewHeight() + 20) + 28;
    //         view.width = view.getViewWidth();
    //         view.height = view.getViewHeight();
    //         view.setGroupName("groupPI_"+i);
    //        // view.scaleX = view.scaleY = 1.1;
    //         self.arrPropItem.push(view);
    //         self.hIndex++;
    //         if(self.hIndex>=hMaxCount){
    //             self.hIndex=0;
    //             self.vIndex++;
    //         }
    //     }

    //     this.curItemIdx = selectid;
    //     this.setItemInfo(this.curItemIdx);
    // }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupPackage==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupPackage.scaleX = 
            self.groupPackage.scaleY = 1;
            return;
        }
        self.groupPackage.scaleX = 
        self.groupPackage.scaleY = gapNum;
    }
}