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
var CardFetterItemView = (function (_super) {
    __extends(CardFetterItemView, _super);
    function CardFetterItemView() {
        var _this = _super.call(this, CardFetterItemView.NAME) || this;
        _this.zcTxt = "组成: ";
        _this.xgTxt = "效果: ";
        _this.errorTxt = "暂无数据";
        return _this;
    }
    CardFetterItemView.prototype.week = function () {
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.zcTxt = "Formation: ";
            self.xgTxt = "Effects: ";
            self.errorTxt = "Temporarily no data";
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var name = data.name;
        self.setFetterName(name);
        var desc = data.desc;
        self.setFetterTip1(desc);
        var zc = data.zc;
        self.setFetterTip2(zc, data.hero);
        var icon = data.icon;
        self.setFetterIcon(icon, data.color);
    };
    CardFetterItemView.prototype.sleep = function () {
    };
    CardFetterItemView.prototype.setFetterTip1 = function (str) {
        this.labFetterTip1.textFlow = [
            { text: this.xgTxt, style: { "size": 20, textColor: 0x8bc2d5 } },
            { text: str, style: { "size": 20, textColor: 0xFFFFFF } },
        ];
    };
    CardFetterItemView.prototype.setFetterTip2 = function (str, substring) {
        var a = str.split(substring);
        if (a["length"] > 1) {
            this.labFetterTip2.textFlow = [
                { text: this.zcTxt, style: { "size": 20, textColor: 0x8bc2d5 } },
                { text: a[0], style: { "size": 20, textColor: 0xFFFFFF } },
                { text: substring, style: { "size": 20, textColor: 0xfced63 } },
                { text: a[1] + "\n", style: { "size": 20, textColor: 0xFFFFFF } },
            ];
        }
        else {
            this.labFetterTip2.textFlow = [
                { text: this.zcTxt, style: { "size": 20, textColor: 0x8bc2d5 } },
                { text: str + "\n", style: { "size": 20, textColor: 0xFFFFFF } },
            ];
        }
    };
    CardFetterItemView.prototype.setFetterName = function (str) {
        this.labFetterName.text = str;
    };
    CardFetterItemView.prototype.setFetterIcon = function (icon, color) {
        var view = new CardFetterView();
        var data = { icon: icon, color: color, canTouch: false };
        view.initData(data);
        this.groupFetterIcon.addChild(view);
        view.scaleX = view.scaleY = this.groupFetterIcon.width / view.width;
    };
    //返回视图宽度
    CardFetterItemView.prototype.getViewWidth = function () {
        return this.groupFetterItem.width;
    };
    //返回视图高度
    CardFetterItemView.prototype.getViewHeight = function () {
        return this.groupFetterItem.height;
    };
    CardFetterItemView.NAME = "CardFetterItemSkin";
    return CardFetterItemView;
}(BaseView));
__reflect(CardFetterItemView.prototype, "CardFetterItemView");
//# sourceMappingURL=CardFetterItemView.js.map