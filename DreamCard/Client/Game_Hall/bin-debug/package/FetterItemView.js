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
var FetterItemView = (function (_super) {
    __extends(FetterItemView, _super);
    function FetterItemView() {
        return _super.call(this, FetterItemView.NAME) || this;
    }
    FetterItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.setName(data["name"]);
        //  self.setItemNum(data["num"]);
        self.setIcon(data["icon"]);
        self.setBgClr(data["color"]);
        //  self.selcetLight.$setVisible(false);
    };
    FetterItemView.prototype.sleep = function () {
    };
    FetterItemView.prototype.setName = function (str) {
        this.labItemName.text = str;
    };
    FetterItemView.prototype.setIcon = function (str) {
        if (str == "")
            return;
        this.imgItem.source = str;
    };
    FetterItemView.prototype.setBgClr = function (str) {
        if (str == "")
            return;
        var url = "fetterCommonImg0Sheet_json.jb" + str + "_0";
        this.bgClr.source = url;
    };
    FetterItemView.prototype.setItemNum = function (index) {
    };
    //返回视图宽度
    FetterItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    FetterItemView.prototype.setBeenSelect = function (isSelect) {
        //this.selcetLight.$setVisible(isSelect);
    };
    //返回视图高度
    FetterItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    FetterItemView.prototype.setGroupName = function (str) {
        this.groupPI.name = str;
    };
    FetterItemView.NAME = "FetterItemSkin";
    return FetterItemView;
}(BaseView));
__reflect(FetterItemView.prototype, "FetterItemView");
//# sourceMappingURL=FetterItemView.js.map