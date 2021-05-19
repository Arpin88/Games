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
var CardItemView = (function (_super) {
    __extends(CardItemView, _super);
    function CardItemView() {
        var _this = _super.call(this, CardItemView.NAME) || this;
        _this.arrLetter = ["a", "b", "c", "d", "e", "f", "g"];
        return _this;
    }
    CardItemView.prototype.week = function () {
    };
    CardItemView.prototype.sleep = function () {
    };
    CardItemView.prototype.setImgBG = function (index) {
        var self = this;
        self.imgBG.source = "lobbyImg1Sheet_json." + self.arrLetter[index - 1] + "196x194";
    };
    //返回视图宽度
    CardItemView.prototype.getViewWidth = function () {
        return this.groupCI.width;
    };
    //返回视图高度
    CardItemView.prototype.getViewHeight = function () {
        return this.groupCI.height;
    };
    CardItemView.NAME = "CardItemSkin";
    return CardItemView;
}(IBaseView));
__reflect(CardItemView.prototype, "CardItemView");
//# sourceMappingURL=CardItemView.js.map