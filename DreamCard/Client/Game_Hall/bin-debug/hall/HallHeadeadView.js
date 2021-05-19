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
var HallHeadView = (function (_super) {
    __extends(HallHeadView, _super);
    function HallHeadView() {
        return _super.call(this, LoadingView.NAME) || this;
    }
    // private timer: egret.Timer;
    //   private loadNum:number;
    HallHeadView.prototype.week = function () {
        var self = this;
        /*     if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
                 self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
             }*/
        self.nickname1.text = "123";
    };
    HallHeadView.prototype.setNickName = function (str) {
        //  self.nickname1.text = str;
    };
    HallHeadView.prototype.sleep = function () {
    };
    HallHeadView.NAME = "HeadSkin";
    return HallHeadView;
}(BaseView));
__reflect(HallHeadView.prototype, "HallHeadView");
//# sourceMappingURL=HallHeadeadView.js.map