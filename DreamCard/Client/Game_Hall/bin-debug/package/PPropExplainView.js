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
var PPropExplainView = (function (_super) {
    __extends(PPropExplainView, _super);
    function PPropExplainView() {
        var _this = _super.call(this, PPropExplainView.NAME) || this;
        _this.bagid = 0;
        _this.yyTxt = " (拥有";
        _this.xgTxt = "（花费: ";
        _this.jianTxt = "件)";
        return _this;
    }
    PPropExplainView.prototype.week = function () {
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.yyTxt = "(Owen: ";
            self.xgTxt = "(Cost: ";
            self.jianTxt = ")";
        }
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var type = data.type;
        var icon = "";
        self.setIcon(icon);
        var name = type.shopName;
        var num = type.shopNum;
        self.setItemName(name, num);
        var tipstr = type.shop_desc;
        self.setItemTips(tipstr);
        var cost = type.price;
        self.setItemCost(cost);
        self.bagid = type.bagId;
        this.itemIdx = data.idx;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
    };
    PPropExplainView.prototype.sleep = function () {
    };
    PPropExplainView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnUse) {
                self.hiden();
                // UIManager.getInstance().showUI(CardView); // 这是测试面板
                // let obj = new Object();
                // obj["bagId"] = self.bagid;
                // obj["itemIdx"] = self.itemIdx ;
                // let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                // HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Baguse,obj,true);
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                self.hiden();
            }
        }
    };
    PPropExplainView.prototype.setIcon = function (str) {
        if (str != null || str != "undefine") {
            return;
        }
        this.imgItem.source = str;
    };
    PPropExplainView.prototype.setItemName = function (name, num) {
        this.labItemName.text = name + this.yyTxt + num + this.jianTxt;
    };
    PPropExplainView.prototype.setItemTips = function (str) {
        this.labTips.text = str;
    };
    PPropExplainView.prototype.setItemCost = function (cost) {
        this.labCost.text = this.xgTxt + cost + "XWG)";
    };
    PPropExplainView.NAME = "PPropExplainSkin";
    return PPropExplainView;
}(BaseView));
__reflect(PPropExplainView.prototype, "PPropExplainView");
//# sourceMappingURL=PPropExplainView.js.map