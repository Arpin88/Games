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
var WalletPwView = (function (_super) {
    __extends(WalletPwView, _super);
    function WalletPwView() {
        var _this = _super.call(this, WalletPwView.NAME) || this;
        _this.func = null;
        _this.oldString = "";
        _this.cashNum = 0;
        _this.cashOil = 0;
        return _this;
    }
    WalletPwView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var type = data.name;
        this.func = data.fun;
        this.cashNum = data.num;
        this.cashOil = data.oil;
        self.showTxt.text = type;
    };
    WalletPwView.prototype.isNumber = function (val) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        }
        else {
            return false;
        }
    };
    WalletPwView.prototype.moveHandler = function (evt) {
        var self = this;
        if (this.editCount.text.length > 6) {
            this.editCount.text = self.oldString;
        }
        if (this.editCount.text != "") {
            if (self.isNumber(this.editCount.text) == true)
                self.oldString = this.editCount.text;
            else
                this.editCount.text = self.oldString;
        }
    };
    WalletPwView.prototype.outHandler = function (evt) {
        var self = this;
        var num = parseInt(this.editCount.text);
    };
    WalletPwView.prototype.sleep = function () {
    };
    WalletPwView.prototype.SetTxt = function (txt) {
        this.showTxt.text = txt;
    };
    WalletPwView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            if (tar == self.btnConfirm11) {
                self.hiden();
                //  console.log(`确定被按下`);
                if (this.func != null) {
                    this.func(self.editCount.text, this.cashNum, this.cashOil);
                }
            }
            else if (tar == self.btnBack) {
                self.hiden();
                console.log("\u53D6\u6D88\u88AB\u6309\u4E0B");
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                self.hiden();
            }
        }
    };
    WalletPwView.NAME = "PWSkin";
    return WalletPwView;
}(BaseView));
__reflect(WalletPwView.prototype, "WalletPwView");
//# sourceMappingURL=WalletPwView.js.map