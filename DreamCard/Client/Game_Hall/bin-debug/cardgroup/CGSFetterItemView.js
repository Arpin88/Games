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
var CGSFetterItemView = (function (_super) {
    __extends(CGSFetterItemView, _super);
    function CGSFetterItemView() {
        return _super.call(this, CGSFetterItemView.NAME) || this;
    }
    CGSFetterItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var type = data.type;
        if (type == 0) {
            self.removeFetter();
        }
        else {
            self.setFetter(data.fdata);
        }
    };
    CGSFetterItemView.prototype.sleep = function () {
        var self = this;
        self.removeFetter();
    };
    CGSFetterItemView.prototype.setFetter = function (data) {
        var self = this;
        self.removeFetter();
        self.imgBG.visible = false;
        var view = new CardFetterView();
        view.initData(data);
        view.scaleX = Number((self.groupFetter.width / view.width).toFixed(2));
        view.scaleY = Number((self.groupFetter.height / view.height).toFixed(2));
        self.groupFetter.addChild(view);
        self.fetterView = view;
    };
    CGSFetterItemView.prototype.removeFetter = function () {
        var self = this;
        if (self.fetterView != null) {
            self.fetterView.parent.removeChild(self.fetterView);
            self.fetterView = null;
        }
        self.imgBG.visible = true;
    };
    CGSFetterItemView.NAME = "CGSFetterItemSkin";
    return CGSFetterItemView;
}(IBaseView));
__reflect(CGSFetterItemView.prototype, "CGSFetterItemView");
//# sourceMappingURL=CGSFetterItemView.js.map