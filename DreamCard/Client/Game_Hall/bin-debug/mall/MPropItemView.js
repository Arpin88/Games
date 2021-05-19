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
var MPropItemView = (function (_super) {
    __extends(MPropItemView, _super);
    function MPropItemView() {
        return _super.call(this, MPropItemView.NAME) || this;
    }
    MPropItemView.prototype.week = function () {
        var self = this;
        //    this.thename.text = this.showName;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var name = data.name;
        this.thename.text = name;
        this.price.text = data.price + " XWG";
        this.btnBuy.label = "购买:" + data.price;
        self.setIcon(data["icon"]);
    };
    MPropItemView.prototype.sleep = function () {
    };
    MPropItemView.prototype.setIcon = function (str) {
        if (str == "")
            return;
        this.imgItem.source = "propSheet_json." + str;
    };
    //返回视图宽度
    MPropItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    MPropItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    MPropItemView.prototype.setBtnName = function (str) {
        this.btnBuy.name = str;
    };
    MPropItemView.NAME = "MPropItemSkin";
    return MPropItemView;
}(BaseView));
__reflect(MPropItemView.prototype, "MPropItemView");
//# sourceMappingURL=MPropItemView.js.map