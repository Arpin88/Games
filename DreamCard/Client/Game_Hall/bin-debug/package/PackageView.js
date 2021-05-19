var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var PackageView = (function (_super) {
    __extends(PackageView, _super);
    function PackageView() {
        var _this = _super.call(this, PackageView.NAME) || this;
        // private mallName:Object = [];
        // private kindList:number[] = [0,2,8,7,-1] // kindList
        // private curBtnIdx:number = 0;
        // private curItemIdx:number = 0;
        // private tempList:Object = [];
        _this.arrPropTypeData = new Array(); //道具类型数据
        _this.arrOptionBtn = new Array(); //选项按钮容器
        _this.arrPropItem = new Array(); //道具容器
        _this.needUp = false;
        _this.pageNum = 1; //当前页数 下标从1开始
        _this.pageSize = 10; //一页的数量
        _this.receiveNum = 0;
        _this.cuihuiTxt = "被摧毁物品将无法找回！是否确定摧毁？";
        _this.weijiesuoTxt = "使用暂未解锁";
        return _this;
    }
    PackageView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self); // 拉到底再增加暂时不需要
        GameEventManager.getInstance().addEventListener(HallEvent.onGetProptypeComplete, self, self.onGetProptypeComplete);
        GameEventManager.getInstance().addEventListener(HallEvent.updateProp, self, self.updateProp);
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
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
    };
    PackageView.prototype.updateGold = function () {
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
        // this.comStar["txt0"].text = account.getXWGCoin();
    };
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
    PackageView.prototype.sleep = function () {
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
        GameEventManager.getInstance().removeEventListener(HallEvent.onGetProptypeComplete, self, self.onGetProptypeComplete);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateProp, self, self.updateProp);
    };
    PackageView.prototype.cleanArray = function (arr) {
        if (arr == null || arr.length <= 0)
            return;
        for (var i = arr.length - 1; i >= 0; i--) {
            var item = arr[i];
            if (item != null) {
                var parent = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i, 1);
        }
    };
    PackageView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_GET_BAG_PROP_LIST:
                self.onGetBagPropList(data);
                break;
            case HallCmdDef.CMD_GET_BAG_PROP_INFO:
                self.onGetShopPropInfo(data);
                break;
            case HallCmdDef.CMD_DESTORY_BAG_PROP:
                self.onDestoryBagProp(data);
                break;
        }
    };
    PackageView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            if (btn.name.substr(0, 10) == "btnOption_") {
                var strArr = btn.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex);
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
            else if (btn == self.btnUse) {
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
                if (self.curSelPropData == null || self.curSelPropData.propCode == null)
                    return;
                var propCode = self.curSelPropData.propCode;
                if (propCode == "1" || propCode == "2" || propCode == "3" || propCode == "4")
                    UIManager.getInstance().showUI(CardView);
                else {
                    PopManager.getInstance().showPromptBox(this.weijiesuoTxt, 2, Handler.create(self, function (confirm) {
                        console.log("\u56DE\u8C03\u51FD\u6570\u88AB\u8C03\u7528");
                    }));
                }
            }
            else if (btn == self.btnDestory) {
                var sum = function () {
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
                    var propCode = self.curSelPropData.propCode;
                    var count = 1;
                    var obj = { propCode: propCode, count: count };
                    var centerServer = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_DESTORY_BAG_PROP, obj, true);
                };
                var data = { name: this.cuihuiTxt, fun: sum };
                UIManager.getInstance().showUI(DailogView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data); // 测试通用提示框
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name.substr(0, 8) == "groupPI_") {
                SoundManager.getInstance().PlayClickSound();
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
                if (propType == null)
                    return;
                var arrPropData = self.propData[propType.code];
                var propData = arrPropData[cIndex];
                if (propData == null)
                    return;
                self.curSelPropData = propData;
                var propCode = propData.propCode;
                self.updatePropInfoShow(propCode);
                // var detailView:PPropExplainView = new PPropExplainView();
                // this.curItemIdx = cIndex;
                // this.setItemInfo(this.curItemIdx);
            }
        }
    };
    PackageView.prototype.setLight = function (propCode) {
        // var namestring:string = "groupPI_" + cIndex;
        var self = this;
        if (self.arrPropItem.length <= 0)
            return;
        for (var i = self.arrPropItem.length - 1; i >= 0; i--) {
            var item = this.arrPropItem[i];
            if (item == null)
                continue;
            item.setBeenSelect(item.getPropCode() == propCode);
        }
    };
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
    PackageView.prototype.moveHandler = function (evt) {
        if (this.scrPropItem.viewport.scrollV > (this.scrPropItem.viewport.contentHeight - this.scrPropItem.viewport.height) - 40) {
            this.needUp = true;
        }
    };
    //如果拉到底就再增加一些，这个暂时不需要
    PackageView.prototype.outHandler = function (evt) {
        if (this.receiveNum < this.pageSize) {
            this.needUp = false;
        }
        if (this.needUp) {
            this.needUp = false;
            this.addNewData();
        }
    };
    PackageView.prototype.addNewData = function () {
        //    this.pageNum = this.pageNum + 1;
        //    this.sendGetBagList();
        var self = this;
        // 2 申请下一页的数据
        self.pageNum = self.pageNum + 1;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        // var arrPropData:Array<any> = self.propData[propType.code];
        // if(arrPropData.length<=(self.pageNum-1)*self.pageSize)   //如果本地没有数据则去请求数据
        //     this.reqGetShopPropList();
        // else
        //     this.updatePropShow();
    };
    PackageView.prototype.setOptionBtn = function () {
        var self = this;
        if (self.arrPropTypeData.length <= 0) {
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_PROP_TYPE_LIST, {}, true);
            return;
        }
        self.updateOptionBtn();
        self.setCurChooseOptionBtnByIndex(0);
    };
    PackageView.prototype.onGetProptypeComplete = function (data) {
        if (data == null || data[HallEvent.Data] == null)
            return;
        var objData = data[HallEvent.Data];
        var self = this;
        self.arrPropTypeData = objData;
        self.updateOptionBtn();
        self.setCurChooseOptionBtnByIndex(0);
    };
    PackageView.prototype.updateOptionBtn = function () {
        var self = this;
        for (var i = 0, lengthI = self.arrPropTypeData.length; i < lengthI; i++) {
            var item = self.arrPropTypeData[i];
            if (item == null)
                continue;
            // code:"3"
            // name:"牌背"
            // res_url:"bag_paibei"
            var resUrl = item.resUrl;
            var btnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            //btnView.setBtnContent(typeName[i]);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    };
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
    PackageView.prototype.setCurChooseOptionBtnByIndex = function (index) {
        var self = this;
        var btnView = null;
        if (self.curChooseOptionBtnIndex != null) {
            if (self.curChooseOptionBtnIndex == index) {
                return;
            }
            btnView = self.getOptionBtnViewByIndex(self.curChooseOptionBtnIndex);
            if (btnView == null)
                return;
            btnView.setCurChoose(0, true);
        }
        self.curChooseOptionBtnIndex = index;
        btnView = self.getOptionBtnViewByIndex(index);
        if (btnView == null)
            return;
        btnView.setCurChoose(1, true);
        self.updateOptionBtnPos();
        self.curSelPropData = null;
        self.scrPropItem.viewport.scrollV = 0;
        self.pageNum = 1;
        self.cleanArray(self.arrPropItem);
        self.updatePropShow();
    };
    //返回选项按钮视图根据下标
    PackageView.prototype.getOptionBtnViewByIndex = function (index) {
        var retView = null;
        var self = this;
        for (var i = 0, lengthI = self.arrOptionBtn.length; i < lengthI; i++) {
            var btnView = self.arrOptionBtn[i];
            if (btnView == null)
                continue;
            var btnName = btnView.getBtnName();
            var strArr = btnName.split("_");
            if (strArr.length != 2) {
                continue;
            }
            var cIndex = Number(strArr[1]);
            if (index == cIndex) {
                retView = btnView;
                break;
            }
        }
        return retView;
    };
    //更新选项按钮坐标信息
    PackageView.prototype.updateOptionBtnPos = function () {
        var self = this;
        var posY = 0;
        for (var i = 0, lengthI = self.arrOptionBtn.length; i < lengthI; i++) {
            var item = self.arrOptionBtn[i];
            if (item == null)
                continue;
            item.y = posY;
            posY += item.getViewHeight() + 20;
        }
        self.scrOptionBtn.height = posY;
    };
    //请求获取背包道具列表
    PackageView.prototype.reqGetBagPropList = function () {
        var self = this;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var obj = { pageNum: self.pageNum, pageSize: self.pageSize, ptypeCode: propType.code };
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_BAG_PROP_LIST, obj, true);
    };
    //当获取背包道具列表完成
    PackageView.prototype.onGetBagPropList = function (data) {
        if (data == null)
            return;
        var self = this;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        if (self.propData == null)
            self.propData = new Object();
        var arr = self.propData[propType.code];
        if (arr == null)
            arr = new Array();
        var arrData = data;
        for (var i = 0, lengthI = arrData.length; i < lengthI; i++) {
            var item = arrData[i];
            if (item == null)
                continue;
            arr.push(item);
        }
        self.propData[propType.code] = arr;
        self.setPropShow(data);
    };
    //更新道具显示
    PackageView.prototype.updatePropShow = function () {
        var self = this;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        if (self.propData == null || self.propData[propType.code] == null) {
            self.reqGetBagPropList();
            return;
        }
        var arrPropData = self.propData[propType.code];
        var arrPropShowData = new Array();
        for (var i = (self.pageNum - 1) * self.pageSize, lengthI = arrPropData.length; i < lengthI; i++) {
            var item = arrPropData[i];
            if (item == null)
                continue;
            arrPropShowData.push(item);
        }
        self.setPropShow(arrPropShowData);
    };
    PackageView.prototype.setPropShow = function (arrPropData) {
        if (arrPropData == null)
            return;
        var self = this;
        if (arrPropData.length <= 0) {
            if (self.curSelPropData == null)
                self.setPropInfoShow(null);
            return;
        }
        var hMaxCount = 4;
        var hIndex = self.arrPropItem.length % hMaxCount;
        var width = self.scrPropItem.width / hMaxCount;
        var vIndex = Math.floor(self.arrPropItem.length / hMaxCount);
        var size = self.pageSize;
        for (var i = 0, lengthI = arrPropData.length; i < lengthI; i++) {
            var item = arrPropData[i];
            if (item == null)
                continue;
            if (size <= 0)
                break;
            size--;
            if (item.count <= 0)
                continue;
            var view = new PPropItemView2();
            var data = { icon: item.resUrl, name: item.name, count: item.count, propCode: item.propCode };
            view.initData(data);
            self.groupPropItem.addChild(view);
            view.x = hIndex * (width * 0.95 - 2) + 28;
            view.y = vIndex * (view.getViewHeight() + 20) + 28;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.setGroupName("groupPI_" + i);
            // view.scaleX = view.scaleY = 1.1;
            self.arrPropItem.push(view);
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
        self.receiveNum = arrPropData.length;
        //默认显示第一个道具信息
        if (self.curSelPropData == null) {
            var propData = arrPropData[0];
            var propCode = propData.propCode;
            self.curSelPropData = propData;
            self.updatePropInfoShow(propCode);
        }
    };
    //更新道具信息显示
    PackageView.prototype.updatePropInfoShow = function (propCode) {
        var self = this;
        if (self.propInfoData == null || !self.propInfoData.hasOwnProperty(propCode)) {
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_BAG_PROP_INFO, { propCode: propCode }, true);
            return;
        }
        self.setPropInfoShow(self.propInfoData[propCode]);
    };
    //设置道具信息显示
    PackageView.prototype.setPropInfoShow = function (data) {
        var self = this;
        if (data == null) {
            self.infogroup.visible = false;
            return;
        }
        self.iconname.text = data.name; //data["shopName"];
        self.num.text = data.count; //data["shopNum"];  
        self.disc.text = data.desc; //data["shopDesc"]; 
        self.price.text = data.price; //data["price"]; 
        self.imgItem.source = "propSheet_json." + data.resUrl; //"propSheet_json." + data["resUrl"];
        self.infogroup.visible = true;
        self.setLight(data.propCode);
    };
    //当获取到道具信息完成
    PackageView.prototype.onGetShopPropInfo = function (data) {
        if (data == null)
            return;
        var self = this;
        if (self.propInfoData == null)
            self.propInfoData = new Object();
        var propCode = data.propCode;
        var info = data;
        info.name = self.curSelPropData.name;
        info.resUrl = self.curSelPropData.resUrl;
        info.propCode = self.curSelPropData.propCode;
        info.count = self.curSelPropData.count;
        info.price = self.curSelPropData.price;
        self.propInfoData[propCode] = info;
        self.setPropInfoShow(info);
    };
    //当销毁背包道具
    PackageView.prototype.onDestoryBagProp = function (data) {
        if (data == null)
            return;
        var obj = new Object();
        obj[HallEvent.Data] = data;
        this.updateProp(obj);
    };
    PackageView.prototype.updateProp = function (dataObj) {
        if (dataObj == null || dataObj[HallEvent.Data] == null)
            return;
        var data = dataObj[HallEvent.Data];
        //更新本地数据跟本地显示
        var propCode = data.propCode;
        var count = data.count;
        var self = this;
        for (var i = 0, lengthI = self.arrPropTypeData.length; i < lengthI; i++) {
            var propType = self.arrPropTypeData[i];
            if (propType == null)
                continue;
            var arrPropData = self.propData[propType.code];
            if (arrPropData == null || arrPropData.length <= 0)
                continue;
            for (var j = 0, lengthJ = arrPropData.length; j < lengthJ; j++) {
                var item = arrPropData[j];
                if (item != null && item.propCode == propCode) {
                    self.propData[propType.code][j].count = count;
                    break;
                }
            }
        }
        if (count > 0) {
            if (self.propInfoData[propCode] != null)
                self.propInfoData[propCode].count = count;
            if (self.curSelPropData != null && self.curSelPropData.propCode == propCode) {
                self.curSelPropData.count = count;
                this.updatePropInfoShow(propCode);
            }
            for (var i = 0, lengthI = self.arrPropItem.length; i < lengthI; i++) {
                var view = self.arrPropItem[i];
                if (view == null)
                    continue;
                if (view.getPropCode() == propCode) {
                    view.updateCountShow(count);
                    break;
                }
            }
        }
        else {
            if (self.propInfoData[propCode] != null)
                self.propInfoData[propCode] = null;
            if (self.curSelPropData != null && self.curSelPropData.propCode == propCode) {
                self.curSelPropData = null;
                this.updatePropInfoShow(propCode);
            }
            self.cleanArray(self.arrPropItem);
            self.updatePropShow();
        }
    };
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
    PackageView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupPackage == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupPackage.scaleX =
                self.groupPackage.scaleY = 1;
            return;
        }
        self.groupPackage.scaleX =
            self.groupPackage.scaleY = gapNum;
    };
    PackageView.NAME = "PackageSkin";
    return PackageView;
}(BaseView));
__reflect(PackageView.prototype, "PackageView");
//# sourceMappingURL=PackageView.js.map