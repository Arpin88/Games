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
// TypeScript file
var CardintroduceView = (function (_super) {
    __extends(CardintroduceView, _super);
    function CardintroduceView() {
        return _super.call(this, CardintroduceView.NAME) || this;
    }
    CardintroduceView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var icon = data.icon;
        self.setCardHead(icon);
        var code = data.code;
        self.setCardName(code);
    };
    CardintroduceView.prototype.sleep = function () {
    };
    //设置头像
    CardintroduceView.prototype.setCardHead = function (str) {
        if (str == null || str == undefined)
            return;
        this.imgIcon.source = str + "_json.r";
    };
    //设置名称
    CardintroduceView.prototype.setCardName = function (str) {
        this.imgElement.source = "introducehero_json." + str;
    };
    CardintroduceView.NAME = "CardintroduceSkin";
    return CardintroduceView;
}(BaseView));
__reflect(CardintroduceView.prototype, "CardintroduceView");
//# sourceMappingURL=CardintroduceView.js.map