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
var RecordItemView = (function (_super) {
    __extends(RecordItemView, _super);
    function RecordItemView() {
        return _super.call(this, RecordItemView.NAME) || this;
    }
    RecordItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
    };
    RecordItemView.prototype.sleep = function () {
    };
    RecordItemView.prototype.setData = function (obj) {
        this.idlb.text = obj.ordorId;
        this.ordoridlb.text = obj.orderNo;
        if (obj.type == "TRANS") {
            this.typelb.text = "转出";
        }
        else if (obj.type == "CASHOUT") {
            this.typelb.text = "提现";
        }
        else if (obj.type == "CHARGE") {
            this.typelb.text = "充值";
        }
        else {
            this.typelb.text = "转入";
        }
        if (obj.status == "SUCCESS") {
            this.statelb.text = "成功";
            this.statelb.textColor = 0x6AEF51;
        }
        else {
            this.statelb.text = "失败";
            this.statelb.textColor = 0xF92549;
        }
        var dateString = obj.createdAt;
        var dateStart = new Date(dateString);
        var secondStr = ExternalFun.prototype.add0(dateStart.getSeconds().toString(), 2);
        var miniStr = ExternalFun.prototype.add0(dateStart.getMinutes().toString(), 2);
        var hourStr = ExternalFun.prototype.add0(dateStart.getHours().toString(), 2);
        var monthStr = ExternalFun.prototype.add0((dateStart.getMonth() + 1), 2);
        var dayStr = ExternalFun.prototype.add0(dateStart.getDate(), 2);
        this.timelb.text = monthStr + "-" + dayStr + " " + hourStr + ":" + miniStr + ":" + secondStr;
        this.numlb.text = (obj.payableAmount / 100000000).toFixed(2);
        this.ranyoulb.text = obj.feeAmount;
        this.shouxulb.text = (obj.rate / 100000000).toFixed(2);
    };
    RecordItemView.prototype.setisBagShow = function (isShow) {
        if (isShow == 1) {
            this.imgItem.$setVisible(true);
        }
        else {
            this.imgItem.$setVisible(false);
        }
    };
    //返回视图宽度
    RecordItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    RecordItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    RecordItemView.prototype.setBtnName = function (str) {
        //  this.btnBuy.name = str;
    };
    RecordItemView.NAME = "RecordItemSkin";
    return RecordItemView;
}(BaseView));
__reflect(RecordItemView.prototype, "RecordItemView");
//# sourceMappingURL=RecordItemView.js.map