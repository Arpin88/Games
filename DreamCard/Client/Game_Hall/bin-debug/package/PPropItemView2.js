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
var PPropItemView2 = (function (_super) {
    __extends(PPropItemView2, _super);
    function PPropItemView2() {
        var _this = _super.call(this, PPropItemView2.NAME) || this;
        _this.propCode = "";
        return _this;
    }
    PPropItemView2.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.setName(data["name"]);
        self.setItemNum(data["count"]);
        self.setIcon(data["icon"]);
        self.selcetLight.$setVisible(false);
        self.propCode = data.propCode;
    };
    PPropItemView2.prototype.sleep = function () {
        var self = this;
        self.propCode = "";
    };
    PPropItemView2.prototype.setName = function (str) {
        // this.labItemName.text = str;
    };
    PPropItemView2.prototype.setIcon = function (str) {
        if (str == "")
            return;
        this.imgItem.source = "propSheet_json." + str;
    };
    PPropItemView2.prototype.setItemNum = function (index) {
        this.labItemNum.text = "" + index;
    };
    //返回视图宽度
    PPropItemView2.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    PPropItemView2.prototype.setBeenSelect = function (isSelect) {
        this.selcetLight.$setVisible(isSelect);
    };
    //返回视图高度
    PPropItemView2.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    PPropItemView2.prototype.setGroupName = function (str) {
        this.groupPI.name = str;
    };
    PPropItemView2.prototype.getPropCode = function () {
        return this.propCode;
    };
    PPropItemView2.prototype.updateCountShow = function (count) {
        this.setItemNum(count);
    };
    PPropItemView2.NAME = "PPropItemSkin2";
    return PPropItemView2;
}(BaseView));
__reflect(PPropItemView2.prototype, "PPropItemView2");
//# sourceMappingURL=PPropItemView2.js.map