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
var MPropExplainView = (function (_super) {
    __extends(MPropExplainView, _super);
    function MPropExplainView() {
        var _this = _super.call(this, MPropExplainView.NAME) || this;
        _this.oldString = "";
        _this.huafeiTxt = "（花费：";
        _this.yiyouTxt = "(已有 ";
        _this.geTxt = " 个)";
        _this.tishiTxt = "请输入正确数字";
        _this.expPotionsCode = "3"; //经验药水编号 用于新手引导购买经验药水
        return _this;
    }
    MPropExplainView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.huafeiTxt = "（cost：";
            self.yiyouTxt = "(";
            self.geTxt = " Owned)";
            self.tishiTxt = "Please enter quantity";
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        // var type = data.type;
        // this.selectNum = 1;
        // this.maxNum = type.shopNum;
        // this.totalnum.text = self.huafeiTxt + this.selectNum*type.price +" XWG)"
        // this.editCount.text = this.selectNum + "";
        // this.nameandnum.text = type.shopNum + self.geTxt;
        // this.namstring.text = type.name + self.yiyouTxt + type.shopNum + self.geTxt;
        // this.descstring.text = type.shopDesc;
        // this.price.text = type.price + " XWG";
        // this.itemPrice = type.price;
        // this.shopOrder = type.shopOrder;
        // this.shopKind = type.shopKind;
        // this.itemIdx = data.idx
        // self.setIcon(type.resUrl);
        this.selectNum = 1;
        var info = data.info;
        this.totalnum.text = self.huafeiTxt + this.selectNum * info.price + " XWG)";
        //  this.editCount.text = this.selectNum + "";
        this.editCount.text = "1";
        this.nameandnum.text = info.ownCount + self.geTxt;
        this.namstring.text = info.name + self.yiyouTxt + info.ownCount + self.geTxt;
        this.descstring.text = info.desc;
        this.price.text = info.price + " XWG";
        this.itemPrice = info.price;
        // this.shopOrder = info.shopOrder;
        // this.shopKind = info.shopKind;
        // this.itemIdx = data.idx
        self.setIcon(info.resUrl);
        var shopCode = info.shopCode;
        if (shopCode == self.expPotionsCode) {
            if (UIManager.getInstance().checkHasViewByName(GuideView))
                GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
        }
        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
    };
    MPropExplainView.prototype.setIcon = function (str) {
        if (str == "")
            return;
        this.imgItem.source = "propSheet_json." + str;
    };
    MPropExplainView.prototype.sleep = function () {
    };
    MPropExplainView.prototype.isNumber = function (val) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        }
        else {
            return false;
        }
    };
    MPropExplainView.prototype.moveHandler = function (evt) {
        var self = this;
        if (this.editCount.text.length > 7) {
            this.editCount.text = self.oldString;
        }
        if (this.editCount.text != "") {
            if (self.isNumber(this.editCount.text) == true)
                self.oldString = this.editCount.text;
            else
                this.editCount.text = self.oldString;
        }
        var num = parseInt(this.editCount.text);
        if (self.isNumber(this.editCount.text) == true) {
            this.totalnum.text = self.huafeiTxt + num * this.itemPrice + " XWG)";
        }
    };
    MPropExplainView.prototype.outHandler = function (evt) {
        var self = this;
        var num = parseInt(this.editCount.text);
        if (self.isNumber(this.editCount.text) == true) {
            this.totalnum.text = self.huafeiTxt + num * this.itemPrice + " XWG)";
        }
    };
    MPropExplainView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnConfirm) {
                self.hiden();
                var data = _super.prototype.getData.call(this);
                if (data == null)
                    return;
                var info = data.info;
                if (info.shopCode == self.expPotionsCode) {
                    if (UIManager.getInstance().checkHasViewByName(GuideView))
                        GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                }
                var num = parseInt(this.editCount.text);
                if (self.isNumber(this.editCount.text) == false) {
                    PopManager.getInstance().showPromptBox(self.tishiTxt, 2, Handler.create(self, function (confirm) {
                        console.log("\u56DE\u8C03\u51FD\u6570\u88AB\u8C03\u7528");
                    }));
                    return;
                }
                var floornum = Math.floor(num);
                num = parseInt(this.editCount.text);
                if (num > floornum || num <= 0 || num >= 100000) {
                    PopManager.getInstance().showPromptBox(self.tishiTxt, 2, Handler.create(self, function (confirm) {
                        console.log("\u56DE\u8C03\u51FD\u6570\u88AB\u8C03\u7528");
                    }));
                    return;
                }
                // 购买请求
                // let obj = new Object();
                // obj["shopOrder"] = "" + this.shopOrder;
                // obj["shopKind"] = "" + this.shopKind;
                // obj["price"] = "" + this.itemPrice;
                // obj["buyNum"] = "" + num ;
                // obj["itemIdx"] = "" + this.itemIdx;
                var obj = { shopCode: info.shopCode, count: num };
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_CREATE_SHOP_PROP_TRADE, obj, true);
            }
            else if (tar == self.btnCancel) {
                self.hiden();
            }
            else if (tar == self.btnReduce) {
                if (this.selectNum > 1) {
                    this.selectNum = this.selectNum - 1;
                }
                this.editCount.text = this.selectNum + "";
                this.totalnum.text = self.huafeiTxt + this.selectNum * this.itemPrice + " XWG)";
            }
            else if (tar == self.btnAdd) {
                if (this.selectNum < this.maxNum) {
                    this.selectNum = this.selectNum + 1;
                }
                this.editCount.text = this.selectNum + "";
                this.totalnum.text = self.huafeiTxt + this.selectNum * this.itemPrice + " XWG)";
            }
            else if (tar == self.btnMax) {
                this.selectNum = this.maxNum;
                this.editCount.text = this.selectNum + "";
                this.totalnum.text = self.huafeiTxt + this.selectNum * this.itemPrice + " XWG)";
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
    };
    MPropExplainView.prototype.getMPropExplainGroup = function () {
        return this.groupMPropExplain;
    };
    MPropExplainView.prototype.getConfirmBtn = function () {
        return this.btnConfirm;
    };
    MPropExplainView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupMPropExplain == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupMPropExplain.scaleX =
                self.groupMPropExplain.scaleY = 1;
            return;
        }
        self.groupMPropExplain.scaleX =
            self.groupMPropExplain.scaleY = gapNum;
    };
    MPropExplainView.NAME = "MPropExplainSkin";
    return MPropExplainView;
}(BaseView));
__reflect(MPropExplainView.prototype, "MPropExplainView");
//# sourceMappingURL=MPropExplainView.js.map