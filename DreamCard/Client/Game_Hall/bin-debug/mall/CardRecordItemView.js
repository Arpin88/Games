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
var CardRecordItemView = (function (_super) {
    __extends(CardRecordItemView, _super);
    function CardRecordItemView() {
        return _super.call(this, CardRecordItemView.NAME) || this;
    }
    CardRecordItemView.prototype.week = function () {
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
    CardRecordItemView.prototype.sleep = function () {
    };
    CardRecordItemView.prototype.setData = function (obj) {
        this.idlb.text = obj.ordorId;
        this.ordoridlb.text = obj.orderNo;
        if (obj.turntype == 1)
            this.typelb.text = "转出";
        else
            this.typelb.text = "转入";
        if (obj.status == "true") {
            this.statelb.text = "成功";
            this.statelb.textColor = 0x6AEF51;
        }
        else {
            this.statelb.text = "失败";
            this.statelb.textColor = 0xF92549;
        }
        this.cardnamelb.text = obj.cardname;
        this.qualitylb.text = obj.grade;
        this.wuxinglb.text = obj.five;
        this.starlb.text = obj.generations;
        this.attacklb.text = obj.attack;
        this.healthlb.text = obj.blood;
        this.ratelb.text = obj.oil;
        var dateString = obj.createtime;
        var dateStart = new Date(dateString);
        var secondStr = ExternalFun.prototype.add0(dateStart.getSeconds().toString(), 2);
        var miniStr = ExternalFun.prototype.add0(dateStart.getMinutes().toString(), 2);
        var hourStr = ExternalFun.prototype.add0(dateStart.getHours().toString(), 2);
        var monthStr = ExternalFun.prototype.add0((dateStart.getMonth() + 1), 2);
        var dayStr = ExternalFun.prototype.add0(dateStart.getDate(), 2);
        this.timelb.text = monthStr + "-" + dayStr + " " + hourStr + ":" + miniStr + ":" + secondStr;
        /*    if(obj.type == "TRANS"){
                this.typelb.text = "转出";
            }else{
                this.typelb.text = "转入";
            }
            
            
            
       
            this.numlb.text = (obj.payableAmount/100000000).toFixed(2);
            this.ranyoulb.text = obj.feeAmount;
            this.shouxulb.text = (obj.rate/100000000).toFixed(2);*/
    };
    CardRecordItemView.prototype.setisBagShow = function (isShow) {
        if (isShow == 1) {
            this.imgItem.$setVisible(true);
        }
        else {
            this.imgItem.$setVisible(false);
        }
    };
    //返回视图宽度
    CardRecordItemView.prototype.getViewWidth = function () {
        return 1186; //this.groupPI.width;
    };
    //返回视图高度
    CardRecordItemView.prototype.getViewHeight = function () {
        return 53; //this.groupPI.height;
    };
    //设置层级name
    CardRecordItemView.prototype.setBtnName = function (str) {
        //  this.btnBuy.name = str;
    };
    CardRecordItemView.NAME = "CardRecordItemSkin";
    return CardRecordItemView;
}(BaseView));
__reflect(CardRecordItemView.prototype, "CardRecordItemView");
//# sourceMappingURL=CardRecordItemView.js.map