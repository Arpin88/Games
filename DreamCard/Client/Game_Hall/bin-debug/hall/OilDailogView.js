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
var OilDailogView = (function (_super) {
    __extends(OilDailogView, _super);
    function OilDailogView() {
        var _this = _super.call(this, OilDailogView.NAME) || this;
        _this.func = null;
        _this.oldString = "";
        _this.cashNum = 0;
        return _this;
    }
    OilDailogView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var type = data.name;
        this.func = data.fun;
        this.cashNum = data.num;
        this.walletObj = data.walletObj;
        /* self.setViewByData();*/
    };
    OilDailogView.prototype.setViewByData = function () {
        this.addrlb.text = this.walletObj["chain_address"];
        var num = parseInt(this.walletObj["available"]) / 100000000;
        var aaa = num.toFixed(2);
        this.walletnumlb.text = aaa;
        this.numlb.text = this.editCount.text;
    };
    OilDailogView.prototype.isNumber = function (val) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
        if (val === "" || val == null) {
            return false;
        }
        if (!isNaN(val)) {
            //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
            //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
            return true;
        }
        else {
            return false;
        }
    };
    OilDailogView.prototype.moveHandler = function (evt) {
        var self = this;
        if (this.editCount.text.length > 20) {
            this.editCount.text = self.oldString;
        }
        if (this.editCount.text != "") {
            if (self.isNumber(this.editCount.text) == true) {
                var x = String(this.editCount.text).indexOf('.') + 1;
                if (x == 0)
                    x = this.editCount.text.length;
                var y = String(this.editCount.text).length - x;
                if (y > 2)
                    this.editCount.text = self.oldString;
                else
                    self.oldString = this.editCount.text;
            }
            else
                this.editCount.text = self.oldString;
        }
        this.numlb.text = this.editCount.text;
    };
    OilDailogView.prototype.outHandler = function (evt) {
        var self = this;
        var num = parseInt(this.editCount.text);
    };
    OilDailogView.prototype.sleep = function () {
    };
    OilDailogView.prototype.SetTxt = function (txt) {
    };
    OilDailogView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            if (tar == self.btnConfirm11) {
                self.hiden();
                //  console.log(`确定被按下`);
                if (this.func != null) {
                    this.func(self.editCount.text, this.cashNum, this.walletObj["chain_address"]);
                }
            }
            else if (tar == self.btnBack) {
                self.hiden();
                console.log("\u53D6\u6D88\u88AB\u6309\u4E0B");
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                self.hiden();
            }
        }
    };
    OilDailogView.NAME = "OilSkin";
    return OilDailogView;
}(BaseView));
__reflect(OilDailogView.prototype, "OilDailogView");
//# sourceMappingURL=OilDailogView.js.map