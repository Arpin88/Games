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
var ExtractView = (function (_super) {
    __extends(ExtractView, _super);
    function ExtractView() {
        var _this = _super.call(this, ExtractView.NAME) || this;
        _this.mallName = [];
        _this.rarityConfigList = [];
        _this.arrCardItem = new Array(); //卡牌容器
        _this.movingState = false; //移动状态
        return _this;
    }
    ExtractView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        self.updateGold();
        self.sendGetAwardList(); // 初始申请数据
    };
    ExtractView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    ExtractView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    //发送请求卡牌列表
    ExtractView.prototype.sendGetAwardList = function () {
        var obj = new Object();
        obj["param"] = "抽奖";
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Award, obj, true);
    };
    ExtractView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_Award:
                var shopDesc = data["msg"];
                var num = data["msg"]["length"];
                for (var i = 0; i < num; i++) {
                    var obj = data["msg"][i];
                    var idx = obj["awardId"];
                    self.mallName[idx - 1] = obj;
                }
                var temp = {};
                for (var i = 0; i < data["tittleconfig"]["length"]; i++) {
                    var obj = data["tittleconfig"][i];
                    temp[obj["tittleId"]] = obj;
                }
                self.tittleObj = temp["1"];
                var tp = LanguageManager.getInstance().getCurLanguageType();
                if (tp == 1) {
                    self.tittleObj = temp["2"];
                }
                self.rarityConfigList["length"] = data["rarityConfigList"]["length"];
                for (var n = 0; n < data["rarityConfigList"]["length"]; n++) {
                    var raritystr = data["rarityConfigList"][n]["code"];
                    self.rarityConfigList[raritystr] = data["rarityConfigList"][n]["rate"];
                }
                this.priceTxt.text = "X" + self.tittleObj["cost"];
                if (num > 0) {
                    // 重置界面
                    self.setTittle();
                    self.setCardItem();
                }
                break;
            case HallCmdDef.CMD_MyCardList:
                var gold = data["curGold"];
                var account123 = GlobalDataManager.getInstance().getAccountData();
                account123.setGold(gold);
                this.updateGold();
                break;
        }
    };
    ExtractView.prototype.updateGold = function () {
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
        // this.comStar["txt0"].text = account.getXWGCoin();
    };
    ExtractView.prototype.setTittle = function () {
        this.tittle1.text = this.tittleObj["tittle1"];
        this.tittle2.text = this.tittleObj["tittle2"];
    };
    //当load网络图片完成事件
    ExtractView.prototype.onLoadImgCompleteHandler = function (evt) {
        var self = this;
        if (evt.currentTarget.data) {
            var texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            var bitmap = new egret.Bitmap(texture);
            bitmap.x = 0;
            bitmap.y = 0;
            bitmap.width = this.groupCardItem0.width;
            bitmap.height = this.groupCardItem0.height;
            this.groupCardItem0.addChild(bitmap);
        }
    };
    ExtractView.prototype.sleep = function () {
        var self = this;
        self.cleanArray(self.arrCardItem);
        var account = GlobalDataManager.getInstance().getAccountData();
        if (account.getGuide_Step() != null && account.getGuide_Step() != "")
            UIManager.getInstance().showUI(GuideView, GameScene.EFFECT_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { step: account.getGuide_Step() });
    };
    ExtractView.prototype.cleanArray = function (arr) {
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
    ExtractView.prototype.touchTap = function (event) {
        var self = this;
        var cardName = event.target.name;
        if (cardName.substr(0, 8) == "groupCR_") {
            SoundManager.getInstance().PlayClickSound();
            if (self.movingState)
                return;
            var a = cardName.substr(8, 3);
            UIManager.getInstance().showUI(CGAwardView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, self.mallName[a]);
        }
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            if (btn == self.btnBuy) {
                var account123 = GlobalDataManager.getInstance().getAccountData();
                if (account123["gold"] < 100) {
                    PopManager.getInstance().showPromptBox("金币不够", 2, Handler.create(self, function (confirm) {
                        console.log("\u56DE\u8C03\u51FD\u6570\u88AB\u8C03\u7528");
                    }));
                }
                else {
                    // 呼出抽奖界面
                    UIManager.getInstance().showUI(ChouCardView);
                    var isCreatePool = 0;
                    if (isCreatePool == 1) {
                        var obj = new Object();
                        obj["poolNum"] = "100";
                        var centerServer = GlobalDataManager.getInstance().getCenterServer();
                        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_CreateCardPool, obj, true); // 测试奖池接口
                    }
                    else {
                        var obj = new Object();
                        obj["param"] = "十连抽抽奖按钮";
                        obj["pageid"] = "1";
                        obj["pageSize"] = "10";
                        var centerServer = GlobalDataManager.getInstance().getCenterServer();
                        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_MyCardList, obj, false);
                    }
                }
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
            else if (btn == self.btnInfo) {
                if (self.rarityConfigList["length"] >= 5) {
                    UIManager.getInstance().showUI(ExtrackInfoView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, self.rarityConfigList);
                }
            }
        }
    };
    ExtractView.prototype.setCardItem = function () {
        var self = this;
        var hMaxCount = 5;
        var hIndex = 0;
        var width = self.scrCardItem.width / hMaxCount;
        var vIndex = 0;
        var num = self.mallName["length"];
        for (var i = 0; i < num; i++) {
            var view = new ECardItemView();
            var data1 = self.mallName[i];
            view.initData({ own: i % 2 == 0 ? 1 : 0, index: i, obj: data1 });
            view.name = i.toString();
            view.scaleX = view.scaleY = 1;
            self.groupCardItem.addChild(view);
            view.x = hIndex * (width) + 4;
            view.y = vIndex * (view.getViewHeight() + 20);
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            self.arrCardItem.push(view);
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
    };
    ExtractView.prototype.getExtractGroup = function () {
        return this.extractskingroup;
    };
    ExtractView.prototype.getBuyBtn = function () {
        return this.btnBuy;
    };
    ExtractView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.extractskingroup == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.extractskingroup.scaleX =
                self.extractskingroup.scaleY = 1;
            return;
        }
        self.extractskingroup.scaleX =
            self.extractskingroup.scaleY = gapNum;
    };
    ExtractView.NAME = "ExtractSkin";
    return ExtractView;
}(BaseView));
__reflect(ExtractView.prototype, "ExtractView");
//# sourceMappingURL=ExtractView.js.map