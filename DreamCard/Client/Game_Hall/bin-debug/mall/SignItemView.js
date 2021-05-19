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
var SignItemView = (function (_super) {
    __extends(SignItemView, _super);
    function SignItemView() {
        var _this = _super.call(this, SignItemView.NAME) || this;
        _this.tittleAry = ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"];
        return _this;
    }
    SignItemView.prototype.week = function () {
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
    SignItemView.prototype.sleep = function () {
    };
    SignItemView.prototype.setData = function (obj) {
        var tittleidx = obj["tittle"];
        var txt = this.tittleAry[tittleidx];
        this.labelDays.text = txt;
        var num = obj["num"];
        this.labelNum.text = "XWG*" + num;
        var isget = obj["isget"];
        if (isget == 0) {
            this.imgGet.$setVisible(false);
        }
        else {
            this.imgGet.$setVisible(true);
        }
        var islight = obj["islight"];
        if (islight == 0) {
            this.lightFrame.$setVisible(false);
        }
        else {
            this.lightFrame.$setVisible(true);
        }
        var isloss = obj["isloss"];
        if (isloss == 1) {
            ExternalFun.prototype.setImgGray(this.imgIcon);
            ExternalFun.prototype.setImgGray(this.imgBg);
        }
    };
    SignItemView.prototype.setisBagShow = function (isShow) {
    };
    //返回视图宽度
    SignItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    SignItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    SignItemView.prototype.setBtnName = function (str) {
        //  this.btnBuy.name = str;
    };
    SignItemView.NAME = "SignItemSkin";
    return SignItemView;
}(BaseView));
__reflect(SignItemView.prototype, "SignItemView");
//# sourceMappingURL=SignItemView.js.map