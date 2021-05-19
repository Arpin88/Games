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
var LobbyTestView = (function (_super) {
    __extends(LobbyTestView, _super);
    //  public static NAME:string = "LobbySkin";
    function LobbyTestView() {
        return _super.call(this, LobbyTestView.NAME) || this;
    }
    LobbyTestView.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        Hall.onGameShow();
    };
    LobbyTestView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        LobbyTestView.arrMsg = new Array();
        var obj = { nna: "标题:", nde: "内容内容内容内容内容内容内容内容66" };
        LobbyTestView.arrMsg.push(obj);
    };
    LobbyTestView.prototype.sleep = function () {
    };
    LobbyTestView.prototype.recvData = function (data) {
        //  var self = this;
        // switch(data.cmd){
        // }
    };
    LobbyTestView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.BtnZhuXiao) {
                UIManager.getInstance().showUI(LobbyTestView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, {});
            }
        }
    };
    LobbyTestView.NAME = "SetSkin";
    return LobbyTestView;
}(BaseView));
__reflect(LobbyTestView.prototype, "LobbyTestView");
//# sourceMappingURL=LobbyTestView.js.map