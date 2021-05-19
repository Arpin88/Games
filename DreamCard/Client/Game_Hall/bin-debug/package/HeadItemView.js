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
var HeadItemView = (function (_super) {
    __extends(HeadItemView, _super);
    function HeadItemView() {
        return _super.call(this, HeadItemView.NAME) || this;
    }
    HeadItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.setName(data["name"]);
        self.setItemNum(data["num"]);
        self.setIcon(data["icon"]);
        self.selcetLight.$setVisible(false);
    };
    HeadItemView.prototype.sleep = function () {
    };
    HeadItemView.prototype.setName = function (str) {
        // this.labItemName.text = str;
    };
    HeadItemView.prototype.setIcon = function (str) {
        if (str == "")
            return;
        this.imgItem.source = str;
    };
    HeadItemView.prototype.setItemNum = function (index) {
    };
    //返回视图宽度
    HeadItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    HeadItemView.prototype.setBeenSelect = function (isSelect) {
        this.selcetLight.$setVisible(isSelect);
    };
    //返回视图高度
    HeadItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    HeadItemView.prototype.setGroupName = function (str) {
        this.groupPI.name = str;
    };
    HeadItemView.NAME = "HeadItemSkin";
    return HeadItemView;
}(BaseView));
__reflect(HeadItemView.prototype, "HeadItemView");
//# sourceMappingURL=HeadItemView.js.map