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
var FettersView = (function (_super) {
    __extends(FettersView, _super);
    function FettersView() {
        var _this = _super.call(this, FettersView.NAME) || this;
        _this.arrCardFetters = new Array(); //卡牌羁绊容器
        _this.movingState = false; //移动状态
        _this.fettersDataList = new Array();
        _this.zcTxt = "组成: ";
        _this.xgTxt = "效果: ";
        _this.errorTxt = "暂无数据";
        return _this;
    }
    FettersView.prototype.week = function () {
        var self = this;
        this.infoPanel.visible = false;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.zcTxt = "Formation: ";
            self.xgTxt = "Effects: ";
            self.errorTxt = "Temporarily no data";
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBegin, self);
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            self.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEnd, self);
        }
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        self.requestInitDataFromSvr(); //初始申请数据
    };
    // 初始申请数据
    FettersView.prototype.requestInitDataFromSvr = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_FETTERS_CONFIG, {}, true);
    };
    FettersView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_GET_FETTERS_CONFIG://获取队伍配置
                var num = data["length"];
                for (var i = 0; i < num; i++) {
                    var mydata = data[i];
                    var fetId = mydata.fetId;
                    this.fettersDataList[fetId - 1] = mydata;
                }
                self.setFettersViewByData();
                break;
        }
    };
    FettersView.prototype.sleep = function () {
        this.cleanArray(this.arrCardFetters);
    };
    FettersView.prototype.cleanArray = function (arr) {
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
    FettersView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    FettersView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    FettersView.prototype.touchTap = function (event) {
        var self = this;
        var group = event.target;
        if (group.name.substr(0, 8) == "groupPI_") {
            if (self.movingState)
                return;
            SoundManager.getInstance().PlayClickSound();
            var strArr = group.name.split("_");
            var cIndex = Number(strArr[1]);
            this.setFetterInfoPanelByIdx(cIndex);
        }
    };
    FettersView.prototype.setFettersViewByData = function () {
        var self = this;
        var hMaxCount = 6;
        var cellWidth = self.scrCardItem.width / hMaxCount;
        var cellHeight = self.scrCardItem.height / 4;
        var vIndex = 0;
        var hIndex = 0;
        var hIndex = 0;
        var showNum = this.fettersDataList["length"];
        for (var i = 0; i < showNum; i++) {
            var FettersData = this.fettersDataList[i];
            var icontest = "fetterSheet_json.djb" + ExternalFun.prototype.add0(i + 1, 2);
            var data = { icon: FettersData["icon"], color: FettersData["color"], visible: (i < showNum), name: FettersData["name"] };
            var view = new FetterItemView();
            view.initData(data);
            self.groupCardItem.addChild(view);
            var scale = 1.0;
            view.scaleX = view.scaleY = scale;
            view.x = hIndex * (cellWidth - 4) + 32;
            view.y = vIndex * (view.getViewHeight() + 32) + 2;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            self.arrCardFetters.push(view);
            view.setGroupName("groupPI_" + (i + 1));
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
    };
    FettersView.prototype.touchEnd = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            if (tar == self.PanelButton) {
                SoundManager.getInstance().PlayClickSound();
                this.setFetterInfoPanelByIdx(0);
            }
            else {
                SoundManager.getInstance().PlayClickSound();
                var idx = Number(tar.name);
                this.setFetterInfoPanelByIdx(idx);
            }
        }
    };
    /*
        Fun：显示羁绊说明面板
        idx = 0 的时候面板不隐藏
        idx > 0 的时候面板显示
    */
    FettersView.prototype.setFetterInfoPanelByIdx = function (idx) {
        if (idx <= 0) {
            this.infoPanel.visible = false;
            return;
        }
        else {
            this.infoPanel.visible = true;
        }
        var num = this.fettersDataList["length"];
        if (idx <= num) {
            var icontest = "fetterSheet_json.djb" + ExternalFun.prototype.add0(idx, 2);
            this.imgItem.source = this.fettersDataList[idx - 1]["icon"];
            this.labItemName.text = this.fettersDataList[idx - 1]["name"];
            var bgurl = "fetterCommonImg0Sheet_json.jb" + this.fettersDataList[idx - 1]["color"] + "_0";
            this.bgClr.source = bgurl;
            this.xiaoguo1.textFlow = [
                { text: this.xgTxt, style: { "size": 26, textColor: 0x8bc2d5 } },
                { text: this.fettersDataList[idx - 1]["fetDesc"], style: { "size": 26, textColor: 0xe1e1e1 } },
            ];
            this.jiban1.textFlow = [
                { text: this.zcTxt, style: { "size": 26, textColor: 0x8bc2d5 } },
                { text: this.fettersDataList[idx - 1]["fetZc"], style: { "size": 26, textColor: 0xe1e1e1 } },
            ];
        }
        else {
            this.xiaoguo1.text = this.errorTxt;
            this.jiban1.text = this.errorTxt;
        }
    };
    FettersView.prototype.touchBegin = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            if (tar == self.btnBack) {
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
    };
    FettersView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.jibanskingruop == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.jibanskingruop.scaleX =
                self.jibanskingruop.scaleY = 1;
            return;
        }
        self.jibanskingruop.scaleX =
            self.jibanskingruop.scaleY = gapNum;
    };
    FettersView.NAME = "JiBanSkin";
    return FettersView;
}(BaseView));
__reflect(FettersView.prototype, "FettersView");
//# sourceMappingURL=FettersView.js.map