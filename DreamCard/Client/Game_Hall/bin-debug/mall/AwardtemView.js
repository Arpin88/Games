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
var AwardtemView = (function (_super) {
    __extends(AwardtemView, _super);
    function AwardtemView() {
        return _super.call(this, AwardtemView.NAME) || this;
    }
    AwardtemView.prototype.week = function () {
        var self = this;
        //    this.thename.text = this.showName;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        /*    var name = data.name;
    
            this.thename.text  = name;
            this.price.text  = data.price + " XWG";
            this.btnBuy.label = "购买:" + data.price;
            self.setIcon(data["icon"]);*/
    };
    AwardtemView.prototype.sleep = function () {
    };
    AwardtemView.prototype.setData = function (obj) {
        var txt = obj["tittle"];
        this.labelName.text = txt;
        var desc = obj["desc"];
        this.labelDsc.text = desc;
        var awardnum = obj["awardnum"];
        this.labelNum.text = "X " + awardnum;
    };
    AwardtemView.prototype.setisBagShow = function (isShow) {
    };
    //返回视图宽度
    AwardtemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    AwardtemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    AwardtemView.prototype.setBtnName = function (str) {
        //  this.btnBuy.name = str;
    };
    AwardtemView.NAME = "AwardItemSkin";
    return AwardtemView;
}(BaseView));
__reflect(AwardtemView.prototype, "AwardtemView");
//# sourceMappingURL=AwardtemView.js.map