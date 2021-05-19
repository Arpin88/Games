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
var MallView = (function (_super) {
    __extends(MallView, _super);
    function MallView() {
        var _this = _super.call(this, MallView.NAME) || this;
        _this.arrPropTypeData = new Array(); //道具类型数据
        _this.arrOptionBtn = new Array(); //选项按钮容器
        _this.arrPropItem = new Array(); //道具容器
        // private mallName:Object = []
        // private kindList:number[] = [0,2,8,7,-1] // kindList
        // private curBtnIdx:number = 0;
        // private tempList:Object = [];
        _this.pageNum = 1; //当前页数 下标从1开始
        _this.pageSize = 10; //一页的数量
        _this.receiveNum = 0;
        _this.needUp = false;
        _this.movingState = false; //移动状态
        _this.expPotionsCode = "3"; //经验药水编号 用于新手引导购买经验药水
        _this.expPotionsIndex = -1; //经验药水下标
        return _this;
    }
    MallView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        self.scrPropItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrPropItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        GameEventManager.getInstance().addEventListener(HallEvent.onGetProptypeComplete, self, self.onGetProptypeComplete);
        GameEventManager.getInstance().addEventListener(HallEvent.updateGold, self, self.updateGold);
        GameEventManager.getInstance().addEventListener(HallEvent.updateProp, self, self.updateProp);
        this.pageNum = 1;
        this.needUp = false;
        this.receiveNum = 0;
        self.updateGold();
        self.setOptionBtn();
        // self.sendGetShopList(); // 初始申请数据
    };
    // //发送请求卡牌列表
    // private sendGetShopList():void{
    //     let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
    //     // shop数据服务器到了
    //     let obj = new Object();
    //     obj["param"] = "商城";
    //     HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Shop,obj,true); // ok
    // }
    MallView.prototype.moveHandler = function (evt) {
        if (this.scrPropItem.viewport.scrollV > (this.scrPropItem.viewport.contentHeight - this.scrPropItem.viewport.height) - 40) {
            this.needUp = true;
        }
    };
    MallView.prototype.outHandler = function (evt) {
        if (this.receiveNum < this.pageSize) {
            this.needUp = false;
        }
        if (this.needUp) {
            this.needUp = false;
            this.addNewData();
        }
    };
    MallView.prototype.addNewData = function () {
        var self = this;
        // 2 申请下一页的数据
        self.pageNum = self.pageNum + 1;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        var arrPropData = self.propData[propType.code];
        if (arrPropData.length <= (self.pageNum - 1) * self.pageSize)
            this.reqGetShopPropList();
        else
            this.updatePropShow();
    };
    MallView.prototype.updateGold = function () {
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    };
    MallView.prototype.sleep = function () {
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrPropItem);
        self.curChooseOptionBtnIndex = null;
        this.pageNum = 1;
        // self.mallName = [];
        self.propData = null;
        self.shopInfoData = null;
        self.curSelPropData = null;
        GameEventManager.getInstance().removeEventListener(HallEvent.onGetProptypeComplete, self, self.onGetProptypeComplete);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateGold, self, self.updateGold);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateProp, self, self.updateProp);
        var account = GlobalDataManager.getInstance().getAccountData();
        if (account.getGuide_Step() != null && account.getGuide_Step() != "")
            UIManager.getInstance().showUI(GuideView, GameScene.EFFECT_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { step: account.getGuide_Step() });
    };
    MallView.prototype.cleanArray = function (arr) {
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
    MallView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_GET_SHOP_PROP_LIST:
                self.onGetShowPropList(data);
                break;
            case HallCmdDef.CMD_GET_SHOP_PROP_INFO:
                self.onGetShopPropInfo(data);
                break;
        }
    };
    MallView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            var btn = event.target;
            if (btn.name.substr(0, 10) == "btnOption_") {
                SoundManager.getInstance().PlayClickSound();
                var strArr = btn.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex); // 按钮被按下
                // console.log(`选择按钮被按下：${cIndex}`);
            }
            else if (btn.name.substr(0, 7) == "btnBuy_") {
                if (self.movingState)
                    return;
                SoundManager.getInstance().PlayClickSound();
                var strArr = btn.name.split("_");
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
                var shopCode = propData.shopCode;
                if (self.shopInfoData == null || self.shopInfoData[shopCode] == null) {
                    var centerServer = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_SHOP_PROP_INFO, { shopCode: shopCode }, true);
                    return;
                }
                // UIManager.getInstance().showUI(MPropExplainView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{type:arrPropData[cIndex],idx:cIndex});
                UIManager.getInstance().showUI(MPropExplainView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { info: self.shopInfoData[shopCode] });
            }
            else if (btn == self.btnBack) {
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
    };
    MallView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    MallView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    MallView.prototype.setOptionBtn = function () {
        var self = this;
        if (self.arrPropTypeData.length <= 0) {
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_PROP_TYPE_LIST, {}, true);
            return;
        }
        self.updateOptionBtn();
        self.setCurChooseOptionBtnByIndex(0);
    };
    MallView.prototype.onGetProptypeComplete = function (data) {
        if (data == null || data[HallEvent.Data] == null)
            return;
        var objData = data[HallEvent.Data];
        var self = this;
        self.arrPropTypeData = objData;
        self.updateOptionBtn();
        self.setCurChooseOptionBtnByIndex(0);
    };
    MallView.prototype.updateOptionBtn = function () {
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
            //btnView.setBtnContent(self.typeName[i]);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            // btnView.y = btnView.getViewHeight()*i + 10*(i+1);
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    };
    //设置当前选中选项按钮下标
    MallView.prototype.setCurChooseOptionBtnByIndex = function (index) {
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
        self.expPotionsIndex = -1;
        btnView = self.getOptionBtnViewByIndex(index);
        if (btnView == null)
            return;
        btnView.setCurChoose(1, true);
        self.updateOptionBtnPos();
        self.scrPropItem.viewport.scrollV = 0;
        self.pageNum = 1;
        self.cleanArray(self.arrPropItem);
        self.updatePropShow();
        // // 设置选项对应的道具
        // self.cleanArray(self.arrPropItem);
        // self.curBtnIdx = index
        // self.setPropItem(self.kindList[index]);  // 传kind
    };
    //返回选项按钮视图根据下标
    MallView.prototype.getOptionBtnViewByIndex = function (index) {
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
    MallView.prototype.updateOptionBtnPos = function () {
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
    //请求获取商城道具列表
    MallView.prototype.reqGetShopPropList = function () {
        var self = this;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var obj = { pageNum: self.pageNum, pageSize: self.pageSize, ptypeCode: propType.code };
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_SHOP_PROP_LIST, obj, true);
    };
    //当获取商城道具列表完成
    MallView.prototype.onGetShowPropList = function (data) {
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
    MallView.prototype.updatePropShow = function () {
        var self = this;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        if (self.propData == null || self.propData[propType.code] == null) {
            self.reqGetShopPropList();
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
    MallView.prototype.setPropShow = function (arrPropData) {
        if (arrPropData == null || arrPropData.length <= 0)
            return;
        var self = this;
        var hMaxCount = 2;
        var hIndex = self.arrPropItem.length % hMaxCount;
        var width = self.scrPropItem.width / hMaxCount - 21;
        var vIndex = Math.floor(self.arrPropItem.length / hMaxCount);
        var size = self.pageSize;
        for (var i = 0, lengthI = arrPropData.length; i < lengthI; i++) {
            var item = arrPropData[i];
            if (item == null)
                continue;
            if (size <= 0)
                break;
            size--;
            var view = new MPropItemView();
            var data1 = { name: item.name, idx: i, price: item.price, icon: item.resUrl };
            view.setData(data1);
            view.init();
            self.groupPropItem.addChild(view);
            view.x = hIndex * (width) + 30;
            view.y = vIndex * (view.getViewHeight() + 20) + 10;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.setBtnName("btnBuy_" + i);
            self.arrPropItem.push(view);
            hIndex = hIndex + 1;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
            if (self.expPotionsIndex == -1 && item.shopCode == self.expPotionsCode) {
                self.expPotionsIndex = i;
            }
        }
        if (self.expPotionsIndex != -1) {
            if (UIManager.getInstance().checkHasViewByName(GuideView))
                GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
        }
        self.receiveNum = arrPropData.length;
    };
    //当获取商城道具信息完成
    MallView.prototype.onGetShopPropInfo = function (data) {
        if (data == null)
            return;
        var self = this;
        if (self.shopInfoData == null)
            self.shopInfoData = new Object();
        var shopCode = self.curSelPropData.shopCode;
        var info = data;
        info.price = self.curSelPropData.price;
        info.name = self.curSelPropData.name;
        info.resUrl = self.curSelPropData.resUrl;
        info.shopCode = shopCode;
        self.shopInfoData[shopCode] = info;
        UIManager.getInstance().showUI(MPropExplainView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { info: info });
    };
    //购买成功触发 更新道具数据
    MallView.prototype.updateProp = function (dataObj) {
        if (dataObj == null || dataObj[HallEvent.Data] == null)
            return;
        var data = dataObj[HallEvent.Data];
        if (data.hasOwnProperty("shopCode")) {
            var count = data.count;
            var shopCode = data.shopCode;
            var self = this;
            if (self.shopInfoData.hasOwnProperty(shopCode)) {
                self.shopInfoData[shopCode].ownCount = count;
            }
        }
    };
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
    MallView.prototype.getMallGroup = function () {
        return this.mallskingroup;
    };
    MallView.prototype.getExpPotionsItem = function () {
        var self = this;
        if (self.expPotionsIndex == -1)
            return null;
        return self.arrPropItem[self.expPotionsIndex];
    };
    MallView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.mallskingroup == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.mallskingroup.scaleX =
                self.mallskingroup.scaleY = 1;
            return;
        }
        self.mallskingroup.scaleX =
            self.mallskingroup.scaleY = gapNum;
    };
    MallView.NAME = "MallSkin";
    return MallView;
}(BaseView));
__reflect(MallView.prototype, "MallView");
//# sourceMappingURL=MallView.js.map