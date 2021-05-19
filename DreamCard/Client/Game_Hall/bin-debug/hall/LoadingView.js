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
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        return _super.call(this, LoadingView.NAME) || this;
    }
    LoadingView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        //    self.hiden();
        this.timer = new egret.Timer(200, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
        this.loadNum = 0;
    };
    LoadingView.prototype.sleep = function () {
    };
    LoadingView.prototype.timerFunc = function () {
        this.loadNum = this.loadNum + 1;
        //   this.loadtxt.text = "载入中...." + this.loadNum + "%"
        if (this.loadNum >= 100) {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.hiden();
        }
    };
    LoadingView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            self.hiden();
        }
    };
    LoadingView.NAME = "LoadingSkin";
    return LoadingView;
}(BaseView));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingView.js.map