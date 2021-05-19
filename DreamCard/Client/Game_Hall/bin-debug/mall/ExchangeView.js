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
var ExchangeView = (function (_super) {
    __extends(ExchangeView, _super);
    function ExchangeView() {
        var _this = _super.call(this, ExchangeView.NAME) || this;
        _this.arrOptionBtn = new Array(); //选项按钮容器
        _this.curBtnIdx = 0;
        _this.oldString = "";
        _this.oldOutString = "";
        _this.turnRate = 0;
        _this.pageId = 1;
        _this.pageSize = 15;
        _this.recordListData = [];
        _this.recordItemViewList = new Array(); //流水记录item
        return _this;
    }
    ExchangeView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        // 输入框
        self.editCountOut.addEventListener(eui.UIEvent.CHANGE, self.moveHandlerOut, self);
        self.editCountOut.addEventListener(eui.UIEvent.CHANGE_END, self.outHandlerOut, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        // 记录滚动区域
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outRecordHandler, self);
        self.updateGold();
        self.setOptionBtn();
        self.sendGetWalletInfo(); // 初始申请数据        
    };
    ExchangeView.prototype.sendGetWalletInfo = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var obj = new Object();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Change, obj, true); // ok
    };
    ExchangeView.prototype.updateGold = function () {
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    };
    ExchangeView.prototype.sleep = function () {
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.curChooseOptionBtnIndex = null;
        var account = GlobalDataManager.getInstance().getAccountData();
        if (account.getGuide_Step() != null && account.getGuide_Step() != "")
            UIManager.getInstance().showUI(GuideView, GameScene.EFFECT_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { step: account.getGuide_Step() });
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.cleanArray(self.recordItemViewList);
    };
    ExchangeView.prototype.cleanArray = function (arr) {
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
    ExchangeView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_Change:
                if (data["data"] == null) {
                    var sum = function () {
                        self.hiden();
                    };
                    var data1 = { name: data["msg"], fun: sum };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                    return;
                }
                var obj = data["data"][0];
                this.walletObj = obj["balance"];
                this.turnRate = data["turnRate"] / 100;
                self.setViewByData();
                self.moveHandlerOut(null);
                break;
            case HallCmdDef.CMD_InChange:
                var gold = data["gold"];
                var total_amount = data["total_amount"];
                this.walletObj["available"] = this.walletObj["available"] - total_amount;
                self.setViewByData(); // 这里语句位置不能乱
                self.setGoldByData(data);
                break;
            case HallCmdDef.CMD_OutChange:
                var gold = data["gold"];
                var total_amount = data["total_amount"];
                this.walletObj["available"] = this.walletObj["available"] + total_amount;
                self.setViewByData(); // 这里语句位置不能乱
                self.setGoldByData(data);
                break;
            case HallCmdDef.CMD_ChangeCash:
                if (data["result"] == 0) {
                    var total_amount = data["total_amount"];
                    this.walletObj["available"] = this.walletObj["available"] - total_amount;
                    self.setViewByData(); // 这里语句位置不能乱
                    self.setGoldByData(data);
                    var data1 = { name: data["msg"], fun: null };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                }
                else {
                    var data1 = { name: data["msg"], fun: null };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                }
                break;
            case HallCmdDef.CMD_WalletResult:
                if (data["data"] == null) {
                    var sum = function () {
                        self.hiden();
                    };
                    var data1 = { name: data["msg"], fun: sum };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                    return;
                }
                break;
            case HallCmdDef.CMD_ChangeRecord:
                var num = data["msg"]["length"]; // 记录
                for (var k = 0; k < num; k++) {
                    var obj = data["msg"][k];
                    self.recordListData[k + (self.pageId - 1) * this.pageSize] = obj;
                }
                if (num > 0) {
                    this.setRecordBtn();
                }
                break;
        }
    };
    ExchangeView.prototype.setRecordBtn = function () {
        var self = this;
        var num = self.recordListData["length"];
        var curNum = self.recordItemViewList.length;
        for (var i = 0; i < (num - curNum); i++) {
            var btnView = new RecordItemView();
            btnView.init();
            var isshow = (i + 1) % 2 + 1;
            btnView.setisBagShow(isshow);
            var objData = self.recordListData[curNum + i];
            var data = {
                ordorId: objData["ordorId"],
                orderNo: objData["orderNo"],
                symbol: objData["symbol"],
                feeSymbol: objData["feeSymbol"],
                feeAmount: objData["feeAmount"],
                rate: objData["rate"],
                outOrdoerNo: objData["outOrderNo"],
                createdAt: objData["createdAt"],
                payeeId: objData["payeeId"],
                type: objData["type"],
                payableAmount: objData["payableAmount"],
                status: objData["status"],
            };
            btnView.setData(data);
            self.groupPropItem.addChild(btnView);
            btnView.x = 0;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight() + 2;
            btnView.y = btnView.getViewHeight() * i;
            self.recordItemViewList.push(btnView);
        }
    };
    ExchangeView.prototype.setGoldByData = function (data) {
        var gold = data["gold"];
        this.comStar["txt"].text = gold;
        this.InGameNum.text = gold;
        this.OutGameNum.text = gold;
    };
    ExchangeView.prototype.setViewByData = function () {
        GlobalDataManager.getInstance().setWalletAddress(this.walletObj["eth_address"]); // 链上地址
        this.namstring.text = this.walletObj["eth_address"];
        this.namstring2.text = this.walletObj["eth_address"];
        var binaddr = GlobalDataManager.getInstance().getBindAddress(); // 服务端来的地址
        this.lbgamewalletaddr.text = this.walletObj["eth_address"];
        this.lbcashaddr.text = binaddr;
        var num = parseFloat(this.walletObj["available"]) / 100000000;
        var available = num.toFixed(2);
        this.namstring3.text = available;
        this.namstring0.text = available;
        this.lbchargewalletnum.text = available;
        this.lbcashwalletnum.text = available;
        var account = GlobalDataManager.getInstance().getAccountData();
        this.InGameNum.text = account.getGold() + "";
        this.OutGameNum.text = account.getGold() + "";
    };
    ExchangeView.prototype.touchTap = function (event) {
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
                self.setCurChooseOptionBtnByIndex(cIndex); // 按钮被按下
                console.log("\u9009\u62E9\u6309\u94AE\u88AB\u6309\u4E0B\uFF1A" + cIndex);
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
            else if (btn == self.btnInAll) {
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                var num = parseFloat(this.walletObj["available"]) / 100000000;
                var available = num.toFixed(2);
                this.editCount.text = available + "";
            }
            else if (btn == self.btnInConfirm) {
                var sum1 = function (pw) {
                    var centerServer = GlobalDataManager.getInstance().getCenterServer();
                    var obj = new Object();
                    var num = parseFloat(self.editCount.text);
                    obj["num"] = num;
                    obj["password"] = pw;
                    HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_InChange, obj, true);
                };
                var num = parseFloat(self.editCount.text);
                if (num <= 0) {
                    var data1 = { name: "输入数值不对", fun: null };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                }
                else {
                    var data = { "name": "请输入支付密码", fun: sum1 };
                    UIManager.getInstance().showUI(WalletPwView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
                }
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (btn == self.btnOutAll) {
                // 游戏内转出到钱包
                var account = GlobalDataManager.getInstance().getAccountData();
                this.editCountOut.text = (1 - this.turnRate) * account.getGold() + "";
                var num = parseFloat(this.editCountOut.text);
                if (this.isNumber(this.editCountOut.text) == true) {
                    var shownum = account.getGold() * this.turnRate;
                    this.ourRatestring.text = shownum.toFixed(2) + " XWG";
                }
            }
            else if (btn == self.btnOutConfirm) {
                var num = parseFloat(self.editCountOut.text);
                if (num <= 0) {
                    var data1 = { name: "输入数值不对", fun: null };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                }
                else {
                    var centerServer = GlobalDataManager.getInstance().getCenterServer();
                    var obj = new Object();
                    var num = parseFloat(this.editCountOut.text);
                    obj["num"] = num;
                    obj["rate"] = this.turnRate * 100;
                    HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_OutChange, obj, true); // ok
                }
            }
            else if (btn == self.btnInCharge || btn == self.btnCharge) {
                PublicMethodManager.getInstance().openWallet();
            }
            else if (btn == self.btnOutCharge || btn == self.btnCash) {
                var cash_fun = function (txt) {
                    var num = parseFloat(txt);
                    this.CashtObj_num = num;
                    self.showOil(num);
                };
                var data = { "name": "提现金额", walletObj: this.walletObj, fun: cash_fun };
                UIManager.getInstance().showUI(CashDailogView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
            }
        }
    };
    ExchangeView.prototype.showOil = function (num) {
        if (isNaN(num) || num <= 0) {
            var data1 = { name: "输入数值不对", fun: null };
            UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
        }
        else {
            var oil_fun = function (oil, num, addr) {
                var password_fun = function (pw, num, oil) {
                    var centerServer = GlobalDataManager.getInstance().getCenterServer();
                    var obj = new Object();
                    obj["num"] = num;
                    obj["oil"] = oil;
                    obj["password"] = pw;
                    obj["addr"] = addr;
                    HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_ChangeCash, obj, true);
                };
                var oilNum = parseFloat(oil);
                if (isNaN(oilNum) || oilNum <= 0) {
                    var data1 = { name: "输入数值不对", fun: null };
                    UIManager.getInstance().showUI(DailogView2, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data1);
                }
                else {
                    var data = { "num": num, "oil": oil, walletObj: this.walletObj, fun: password_fun };
                    UIManager.getInstance().showUI(WalletPwView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
                }
            };
            var data = { "num": num, walletObj: this.walletObj, fun: oil_fun };
            UIManager.getInstance().showUI(OilDailogView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
        }
    };
    ExchangeView.prototype.isNumber = function (val) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
        if (val === "" || val == null) {
            return false;
        }
        if (!isNaN(val)) {
            //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
            //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
            return true;
        }
        else {
            return false;
        }
    };
    // 己算提出的手续费
    ExchangeView.prototype.calOutRate = function () {
        var num = parseFloat(this.editCountOut.text);
        if (this.isNumber(this.editCountOut.text) == true) {
            var shownum = num * this.turnRate;
            this.ourRatestring.text = shownum.toFixed(2) + " XWG";
        }
    };
    ExchangeView.prototype.moveHandler = function (evt) {
        var self = this;
        if (this.editCount.text.length > 7) {
            this.editCount.text = self.oldString;
        }
        if (this.editCount.text != "") {
            if (self.isNumber(this.editCount.text) == true) {
                var x = String(this.editCount.text).indexOf('.') + 1; // x point的位置
                if (x == 0)
                    x = this.editCount.text.length;
                var pointendnum = String(this.editCount.text).length - x; // 小数点后面的位置
                if (pointendnum > 2) {
                    this.editCount.text = self.oldString;
                }
                else
                    self.oldString = this.editCount.text;
            }
            else
                this.editCount.text = self.oldString;
        }
    };
    ExchangeView.prototype.outHandler = function (evt) {
        var self = this;
        var num = parseFloat(this.editCountOut.text);
        if (self.isNumber(this.editCountOut.text) == true) {
            this.ourRatestring.text = num * this.turnRate + " XWG";
        }
    };
    ExchangeView.prototype.outRecordHandler = function (evt) {
        this.addNewData();
    };
    ExchangeView.prototype.addNewData = function () {
        var self = this;
        // 2 申请下一页的数据
        self.pageId = self.pageId + 1;
        var num = self.recordListData["length"];
        if (num <= (self.pageId - 1) * self.pageSize)
            self.reqGetChangeRecordList();
    };
    ExchangeView.prototype.moveHandlerOut = function (evt) {
        var self = this;
        if (this.editCountOut.text.length > 7) {
            this.editCountOut.text = self.oldOutString;
        }
        if (this.editCountOut.text != "") {
            if (self.isNumber(this.editCount.text) == true) {
                var x = String(this.editCountOut.text).indexOf('.') + 1; // x point的位置
                if (x == 0)
                    x = this.editCountOut.text.length;
                var pointendnum = String(this.editCountOut.text).length - x; // 小数点后面的位置
                if (pointendnum > 2) {
                    this.editCountOut.text = self.oldString;
                }
                else
                    self.oldString = this.editCountOut.text;
            }
            else
                this.editCountOut.text = self.oldOutString;
        }
        this.calOutRate();
    };
    ExchangeView.prototype.outHandlerOut = function (evt) {
        this.calOutRate();
    };
    ExchangeView.prototype.setOptionBtn = function () {
        var self = this;
        var imgName = ["zrdyx", "zcdqb", "chongzhi", "tixian", "jilu"];
        //var imgName = ["zhaunru","zhuanchu","chongzhi","tixian"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            imgName = ["e_zrdyx", "e_zcdqb", "chongzhi", "tixian", "jilu"];
        }
        var num = imgName["length"];
        for (var i = 0; i < num; i++) {
            var btnView = new OptionBtnView();
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
    };
    //设置当前选中选项按钮下标
    ExchangeView.prototype.setCurChooseOptionBtnByIndex = function (index) {
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
        self.curBtnIdx = index;
        self.setPropItem(index); // 传kind
    };
    //返回选项按钮视图根据下标
    ExchangeView.prototype.getOptionBtnViewByIndex = function (index) {
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
    ExchangeView.prototype.updateOptionBtnPos = function () {
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
    //设置道具
    ExchangeView.prototype.setPropItem = function (kind) {
        var self = this;
        self.InGroup.$setVisible(false);
        self.OutGroup.$setVisible(false);
        self.ChargeGroup.$setVisible(false);
        self.CashGroup.$setVisible(false);
        self.RecordGroup.$setVisible(false);
        if (kind == 0) {
            self.InGroup.$setVisible(true);
        }
        else if (kind == 1) {
            self.OutGroup.$setVisible(true);
        }
        else if (kind == 2) {
            self.ChargeGroup.$setVisible(true);
        }
        else if (kind == 3) {
            self.CashGroup.$setVisible(true);
        }
        else {
            self.RecordGroup.$setVisible(true);
            self.reqGetChangeRecordList();
        }
    };
    ExchangeView.prototype.reqGetChangeRecordList = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var obj = new Object();
        obj["pageid"] = this.pageId;
        obj["pageSize"] = this.pageSize;
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_ChangeRecord, obj, true);
    };
    ExchangeView.prototype.getExchangeGroup = function () {
        return this.mallskingroup;
    };
    ExchangeView.prototype.getOutAllBtn = function () {
        return this.btnOutAll;
    };
    ExchangeView.prototype.getOutConfirmBtn = function () {
        return this.btnOutConfirm;
    };
    ExchangeView.prototype.onResize = function (event) {
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
    ExchangeView.NAME = "ExchangeSkin";
    return ExchangeView;
}(BaseView));
__reflect(ExchangeView.prototype, "ExchangeView");
//# sourceMappingURL=ExchangeView.js.map