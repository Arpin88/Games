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
var CGSCardItemView = (function (_super) {
    __extends(CGSCardItemView, _super);
    function CGSCardItemView() {
        return _super.call(this, CGSCardItemView.NAME) || this;
    }
    CGSCardItemView.prototype.week = function () {
        var self = this;
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.updateShow(data);
        var groupName = data.gname;
        self.groupCGSCI.name = groupName;
    };
    CGSCardItemView.prototype.sleep = function () {
        var self = this;
        self.removeCard();
        self.labelObj = null;
    };
    CGSCardItemView.prototype.setSCard = function (data) {
        var self = this;
        self.removeCard();
        self.cardData = data;
        var view = new CardSquareView();
        view.initData(data);
        view.scaleX = Number((self.groupCard.width / view.width).toFixed(2));
        view.scaleY = Number((self.groupCard.height / view.height).toFixed(2));
        self.groupCard.addChild(view);
        self.cardView = view;
    };
    CGSCardItemView.prototype.removeCard = function () {
        var self = this;
        if (self.cardView != null) {
            self.cardView.parent.removeChild(self.cardView);
            self.cardView = null;
        }
        self.cardData = null;
    };
    CGSCardItemView.prototype.setLockLabel = function (lv) {
        var self = this;
        self.lblUnlock.text = "LV" + lv + self.labelObj["lbl_0"]; //"解锁";
    };
    //返回视图宽度
    CGSCardItemView.prototype.getViewWidth = function () {
        return this.groupCGSCI.width;
    };
    //返回视图高度
    CGSCardItemView.prototype.getViewHeight = function () {
        return this.groupCGSCI.height;
    };
    CGSCardItemView.prototype.getType = function () {
        return this.type;
    };
    CGSCardItemView.prototype.getCardData = function () {
        return this.cardData;
    };
    CGSCardItemView.prototype.updateShow = function (data) {
        var self = this;
        var type = data.type;
        var sdata = data.sdata;
        self.groupCard.visible = type == 0;
        self.groupAdd.visible = type == 1;
        self.groupUnlock.visible = type == 2;
        self.removeCard();
        if (type == 0) {
            self.setSCard(sdata);
        }
        else if (type == 2) {
            self.setLockLabel(Number(sdata));
        }
        self.type = type;
    };
    CGSCardItemView.NAME = "CGSCardItemSkin";
    return CGSCardItemView;
}(IBaseView));
__reflect(CGSCardItemView.prototype, "CGSCardItemView");
//# sourceMappingURL=CGSCardItemView.js.map