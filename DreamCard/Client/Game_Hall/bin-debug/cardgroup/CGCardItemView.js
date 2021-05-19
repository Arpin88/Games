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
var CGCardItemView = (function (_super) {
    __extends(CGCardItemView, _super);
    function CGCardItemView() {
        return _super.call(this, CGCardItemView.NAME) || this;
    }
    CGCardItemView.prototype.week = function () {
        var self = this;
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.updateShow(data);
        var groupName = data.gname;
        self.groupCGCI.name = groupName;
    };
    CGCardItemView.prototype.sleep = function () {
        var self = this;
        self.labelObj = null;
    };
    CGCardItemView.prototype.setSCard = function (data) {
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
    CGCardItemView.prototype.removeCard = function () {
        var self = this;
        if (self.cardView != null) {
            self.cardView.parent.removeChild(self.cardView);
            self.cardView = null;
        }
        self.cardData = null;
    };
    CGCardItemView.prototype.setLockLabel = function (lv) {
        var self = this;
        if (self.labelObj == null)
            self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.lblUnlock.text = "LV" + lv + self.labelObj["lbl_0"]; //"解锁";
    };
    //返回视图宽度
    CGCardItemView.prototype.getViewWidth = function () {
        return this.groupCGCI.width;
    };
    //返回视图高度
    CGCardItemView.prototype.getViewHeight = function () {
        return this.groupCGCI.height;
    };
    CGCardItemView.prototype.getType = function () {
        return this.type;
    };
    CGCardItemView.prototype.getCardData = function () {
        return this.cardData;
    };
    CGCardItemView.prototype.updateShow = function (data) {
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
    CGCardItemView.NAME = "CGCardItemSkin";
    return CGCardItemView;
}(IBaseView));
__reflect(CGCardItemView.prototype, "CGCardItemView");
//# sourceMappingURL=CGCardItemView.js.map