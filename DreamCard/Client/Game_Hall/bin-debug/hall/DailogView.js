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
var DailogView = (function (_super) {
    __extends(DailogView, _super);
    function DailogView() {
        var _this = _super.call(this, DailogView.NAME) || this;
        _this.func = null;
        return _this;
    }
    DailogView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var type = data.name;
        this.func = data.fun;
        self.showTxt.text = type;
    };
    DailogView.prototype.sleep = function () {
    };
    DailogView.prototype.SetTxt = function (txt) {
        this.showTxt.text = txt;
    };
    DailogView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnConfirm) {
                self.hiden();
                //  console.log(`确定被按下`);
                if (this.func != null) {
                    this.func();
                }
            }
            else if (tar == self.btnCancel) {
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
    DailogView.NAME = "DailogSkin";
    return DailogView;
}(BaseView));
__reflect(DailogView.prototype, "DailogView");
//# sourceMappingURL=DailogView.js.map