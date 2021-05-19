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
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView() {
        var _this = _super.call(this, CardView.NAME) || this;
        _this.arrOptionBtn = new Array(); //选项按钮容器
        _this.arrCardItem = new Array(); //卡牌容器
        _this.arrCardInfo = new Array(); //卡牌信息容器
        _this.arrRCardPosX = new Array(); //长方形卡牌坐标
        _this.sortImgText = [["zhanligdd", "zhanliddg", "gongjigdd", "gongjiddg", "shengminggdd", "shengmingddg", "feiyonggdd", "feiyongddg"],
            ["quanpinzhi", "putong", "xiyou", "shishi", "chuanqi", "shenghua"],
            ["quanwuxing", "jin", "mu", "shui", "huo", "tu"]];
        // private arrSort1:Array<string> = ["战力由高到低","战力由低到高","攻击由高到低","攻击由低到高","生命由高到低","生命由低到高","费用由低到高","费用由高到低"];
        // private arrSort2:Array<string> = ["全品质","普通","稀有","史诗","传奇","神话"];
        // private arrSort3:Array<string> = ["全五行","金","木","水","火","土"];
        _this.arrSort1 = [];
        _this.arrSort2 = [];
        _this.arrSort3 = [];
        _this.sortFactor = { sort: 0, rarity: 0, element: 0 };
        _this.pageNum = 1; //当前页数 
        _this.pageSize = 20; //一页的数量
        _this.receiveNum = 0;
        _this.needUp = false;
        _this.hIndex = 0;
        _this.vIndex = 0;
        _this.cardListData = []; // card list
        _this.movingState = false; //移动状态
        return _this;
    }
    CardView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrCardItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrCardItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        self.initView();
        self.requestCardList();
    };
    CardView.prototype.initView = function () {
        var self = this;
        this.pageNum = 1;
        this.needUp = false;
        this.receiveNum = 0;
        self.sortFactor["sort"] = 0;
        self.sortFactor["rarity"] = 0;
        self.sortFactor["element"] = 0;
        this.cardListData = [];
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        for (var i = 0; i < 20; i++) {
            if (i < 8)
                self.arrSort1.push(self.labelObj["lbl_" + i]);
            else if (i < 14)
                self.arrSort2.push(self.labelObj["lbl_" + i]);
            else if (i < 20)
                self.arrSort3.push(self.labelObj["lbl_" + i]);
        }
        self.setOptionBtn();
    };
    //发送请求卡牌列表
    CardView.prototype.requestCardList = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        var obj = { rarity: self.sortFactor["rarity"], element: self.sortFactor["element"], sort: self.sortFactor["sort"], pageNum: self.pageNum, pageSize: self.pageSize };
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_CardViewLists, obj);
    };
    CardView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    CardView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    CardView.prototype.sleep = function () {
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrCardItem);
        self.hIndex = 0;
        self.vIndex = 0;
        self.scrCardItem.viewport.scrollH = 0;
        self.scrCardItem.viewport.scrollV = 0;
        while (self.arrSort1.length != 0)
            self.arrSort1.pop();
        while (self.arrSort2.length != 0)
            self.arrSort2.pop();
        while (self.arrSort3.length != 0)
            self.arrSort3.pop();
        self.labelObj = null;
        var account = GlobalDataManager.getInstance().getAccountData();
        if (account.getGuide_Step() != null && account.getGuide_Step() != "")
            UIManager.getInstance().showUI(GuideView, GameScene.EFFECT_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { step: account.getGuide_Step() });
    };
    CardView.prototype.cleanArray = function (arr) {
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
    CardView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_CardViewLists://获取队伍配置
                var shopDesc = data;
                var num = data["length"];
                this.receiveNum = num;
                for (var i = 0; i < num; i++) {
                    var obj = data[i];
                    var curIdx = (this.pageNum - 1) * this.pageSize + i;
                    self.cardListData[curIdx] = obj;
                }
                self.setCardItemListByData(self.cardListData);
                if (num > 0) {
                    this.pageNum = this.pageNum + 1;
                }
                UIManager.getInstance().hideUI(FilterView); // 这时候关掉二级菜单
                if (num > 0) {
                    if (UIManager.getInstance().checkHasViewByName(GuideView))
                        GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                }
                break;
            case HallCmdDef.CMD_GET_CARD_DETAIL:
                self.showCardDetailViewByData(data);
                break;
        }
    };
    CardView.prototype.showCardDetailViewByData = function (data) {
        var self = this;
        var cardData = data;
        cardData["viewhandle"] = this.curCardView;
        UIManager.getInstance().showUI(CardOperationView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
    };
    CardView.prototype.touchTap = function (event) {
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
                if (cIndex == 0) {
                    var data = { desArr: self.arrSort1, cbHandler: Handler.create(self, self.onChooseCardSort1), selIndex: self.sortFactor["sort"] };
                    UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
                }
                else if (cIndex == 1) {
                    var data = { desArr: self.arrSort2, cbHandler: Handler.create(self, self.onChooseCardSort2), selIndex: self.sortFactor["rarity"] };
                    UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
                }
                else if (cIndex == 2) {
                    var data = { desArr: self.arrSort3, cbHandler: Handler.create(self, self.onChooseCardSort3), selIndex: self.sortFactor["element"] };
                    UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
                }
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name.substr(0, 8) == "groupCR_") {
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                if (self.movingState)
                    return;
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.onClickSCardItem(cIndex);
            }
        }
    };
    //当点击卡牌
    CardView.prototype.onClickSCardItem = function (index) {
        var cardData = this.arrCardInfo[index];
        this.curCardView = this.arrCardItem[index];
        var code = cardData["code"];
        this.requestCardDetaiData(code);
    };
    CardView.prototype.requestCardDetaiData = function (code) {
        if (code == null || code == "")
            return;
        var self = this;
        //请求服务器
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var reqObj = { code: code };
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_CARD_DETAIL, reqObj);
    };
    CardView.prototype.onChooseCardSort1 = function (index) {
        this.onChangeCardSort(1, index);
    };
    CardView.prototype.onChooseCardSort2 = function (index) {
        this.onChangeCardSort(2, index);
    };
    CardView.prototype.onChooseCardSort3 = function (index) {
        this.onChangeCardSort(3, index);
    };
    CardView.prototype.onChangeCardSort = function (type, index) {
        var self = this;
        if (self.sortFactor == null)
            return;
        var param = "";
        if (type == 1) {
            param = "sort";
        }
        else if (type == 2) {
            param = "rarity";
        }
        else {
            param = "element";
        }
        var val = self.sortFactor[param];
        var sendData = true;
        if (val == null || val == index) {
            sendData = false;
        }
        // 选中二级菜单后设置一级按钮 text
        var contentString = this.sortImgText[type - 1][index];
        this.arrOptionBtn[type - 1].setBtnImgContent(contentString);
        if (sendData) {
            self.sortFactor[param] = index;
            self.pageNum = 1; // 切换搜索条件需要重新初始一下
            self.cardListData = [];
            self.requestCardList();
        }
        else {
            UIManager.getInstance().hideUI(FilterView);
        }
    };
    CardView.prototype.moveHandler = function (evt) {
        if (this.scrCardItem.viewport.scrollV > (this.scrCardItem.viewport.contentHeight - this.scrCardItem.viewport.height) - 40) {
            this.needUp = true;
        }
    };
    CardView.prototype.outHandler = function (evt) {
        if (this.receiveNum < this.pageSize) {
            this.needUp = false;
        }
        if (this.needUp) {
            this.needUp = false;
            this.requestCardList(); // 申请新数据
        }
    };
    CardView.prototype.setOptionBtn = function () {
        var self = this;
        for (var i = 0; i < self.sortImgText.length; i++) {
            var btnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(self.sortImgText[i][0]);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
        }
        //没有默认选中按钮 更新选项坐标即可
        self.updateOptionBtnPos();
    };
    //更新选项按钮坐标信息
    CardView.prototype.updateOptionBtnPos = function () {
        var self = this;
        var posY = 0;
        for (var i = 0, lengthI = self.arrOptionBtn.length; i < lengthI; i++) {
            var item = self.arrOptionBtn[i];
            if (item == null)
                continue;
            item.y = posY;
            item.height = item.getViewHeight();
            posY += item.getViewHeight() + 20;
        }
    };
    CardView.prototype.removeRCardItem = function () {
        var self = this;
        while (self.arrRCardPosX.length) {
            self.arrRCardPosX.pop();
        }
        while (self.arrCardInfo.length) {
            self.arrCardInfo.pop();
        }
        self.cleanArray(self.arrCardItem);
        self.groupCardItem.removeChildren();
        self.groupCardItem.scrollV = 0;
        self.hIndex = 0;
        self.vIndex = 0;
    };
    //设置卡牌显示;
    CardView.prototype.setCardItemListByData = function (data) {
        var self = this;
        if (self.pageNum <= 1) {
            self.removeRCardItem();
        }
        var hMaxCount = 5;
        var width = self.scrCardItem.width / hMaxCount;
        var maxImgIndex = 7;
        var imgIndex = 1;
        var sCount = self.arrCardItem.length;
        var count = data.length - sCount;
        for (var i = 0; i < count; i++) {
            var index = sCount + i;
            var item = data[index];
            if (item == null)
                continue;
            var view = new CardSquareView();
            var obj = this.toFormatObject(item, index);
            view.initData(obj);
            view.scaleX = view.scaleY = 0.9;
            self.groupCardItem.addChild(view);
            var posX = (width + 2) * self.hIndex;
            view.x = posX;
            view.y = self.vIndex * (view.height);
            self.arrCardInfo.push(obj); //给属性面板传值
            self.arrCardItem.push(view);
            self.arrRCardPosX.push(posX);
            self.hIndex++;
            if (self.hIndex >= hMaxCount) {
                self.hIndex = 0;
                self.vIndex++;
            }
            imgIndex = imgIndex >= maxImgIndex ? 1 : ++imgIndex;
        }
    };
    CardView.prototype.toFormatObject = function (obj, i) {
        var data1 = {
            "icon": obj.iconUrl,
            "rarity": obj.rarity,
            "element": obj.ele,
            "round": obj.round,
            "generation": obj.gen,
            "name": obj.name,
            "cost": obj.cst,
            "level": ((obj.level - 1) % 5 + 1),
            "atk": obj.atk,
            "hp": obj.hp,
            "agl": obj.agl,
            "hit": obj.hit,
            "att": obj.att,
            "code": obj.code,
            "cri_chance": 1,
            "cri_multiplier": 1,
            "rgn": obj.rgn,
            "jblist": 1,
            "groupName": "groupCR_" + i,
            "canTouch": true
        };
        return data1;
    };
    CardView.prototype.getCardGroup = function () {
        return this.cardskingroup;
    };
    CardView.prototype.getCardSquareViewItem = function () {
        var self = this;
        if (self.arrCardItem == null || self.arrCardItem.length <= 0)
            return null;
        return this.arrCardItem[0];
    };
    CardView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.cardskingroup == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.cardskingroup.scaleX =
                self.cardskingroup.scaleY = 1;
            return;
        }
        self.cardskingroup.scaleX =
            self.cardskingroup.scaleY = gapNum;
    };
    CardView.NAME = "CardSkin";
    return CardView;
}(BaseView));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map