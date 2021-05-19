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
var FilterItemView = (function (_super) {
    __extends(FilterItemView, _super);
    function FilterItemView() {
        return _super.call(this, FilterItemView.NAME) || this;
    }
    FilterItemView.prototype.week = function () {
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var self = this;
        var des = data.des;
        self.setDes(des);
        var gName = data.gName;
        self.setGroupName(gName);
    };
    FilterItemView.prototype.sleep = function () {
    };
    //设置描述
    FilterItemView.prototype.setDes = function (data) {
        var str = (data == null || data == undefined) ? "" : data;
        this.lblDes.text = str;
    };
    //设置层级名称
    FilterItemView.prototype.setGroupName = function (data) {
        var str = (data == null || data == undefined) ? "" : data;
        this.groupFilterItem.name = str;
    };
    FilterItemView.prototype.setImgBG = function () {
    };
    FilterItemView.NAME = "FilterItemSkin";
    return FilterItemView;
}(IBaseView));
__reflect(FilterItemView.prototype, "FilterItemView");
//# sourceMappingURL=FilterItemView.js.map