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
var ExtrackInfoView = (function (_super) {
    __extends(ExtrackInfoView, _super);
    function ExtrackInfoView() {
        var _this = _super.call(this, ExtrackInfoView.NAME) || this;
        _this.bagid = 0;
        return _this;
    }
    ExtrackInfoView.prototype.week = function () {
        var self = this;
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.puotngstring.text = data["common"] + "%";
        self.xiyoustring.text = data["rare"] + "%";
        self.shishistring.text = data["epic"] + "%";
        self.chuanqistring.text = data["legendary"] + "%";
        self.shenhuagstring.text = data["mythical"] + "%";
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
    };
    ExtrackInfoView.prototype.sleep = function () {
    };
    ExtrackInfoView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnCancel) {
                self.hiden();
            }
        }
    };
    ExtrackInfoView.NAME = "ExtrackInfoSkin";
    return ExtrackInfoView;
}(BaseView));
__reflect(ExtrackInfoView.prototype, "ExtrackInfoView");
//# sourceMappingURL=ExtrackInfoView.js.map