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
var HallEvent = (function (_super) {
    __extends(HallEvent, _super);
    function HallEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    HallEvent.Data = "dispData";
    //更新金币
    HallEvent.updateGold = "updateGold";
    //更新用户信息
    HallEvent.updateUserInfo = "updateUserInfo";
    //更新道具
    HallEvent.updateProp = "updateProp";
    //当获取到道具类型
    HallEvent.onGetProptypeComplete = "onGetProptypeComplete";
    //更新新手引导下一步操作
    HallEvent.updateGuideNextStep = "updateGuideNextStep";
    return HallEvent;
}(egret.Event));
__reflect(HallEvent.prototype, "HallEvent");
//# sourceMappingURL=HallEvent.js.map