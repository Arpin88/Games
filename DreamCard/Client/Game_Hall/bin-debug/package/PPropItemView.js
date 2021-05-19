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
var PPropItemView = (function (_super) {
    __extends(PPropItemView, _super);
    function PPropItemView() {
        return _super.call(this, PPropItemView.NAME) || this;
    }
    PPropItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.setName(data["name"]);
        self.setItemNum(data["num"]);
        self.setIcon(data["icon"]);
    };
    PPropItemView.prototype.sleep = function () {
    };
    PPropItemView.prototype.setName = function (str) {
        this.labItemName.text = str;
    };
    PPropItemView.prototype.setIcon = function (str) {
        if (str == "")
            return;
        this.imgItem.source = str;
    };
    PPropItemView.prototype.setItemNum = function (index) {
        this.labItemNum.text = "" + index;
    };
    //返回视图宽度
    PPropItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    PPropItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    PPropItemView.prototype.setGroupName = function (str) {
        this.groupPI.name = str;
    };
    PPropItemView.NAME = "PPropItemSkin";
    return PPropItemView;
}(BaseView));
__reflect(PPropItemView.prototype, "PPropItemView");
//# sourceMappingURL=PPropItemView.js.map