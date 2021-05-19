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
var ECardItemView = (function (_super) {
    __extends(ECardItemView, _super);
    function ECardItemView() {
        var _this = _super.call(this, ECardItemView.NAME) || this;
        _this.arrLetter = ["a", "b", "c", "d", "e", "f", "g"];
        return _this;
    }
    ECardItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var own = data.own;
        var idx = data.index;
        var obj = data.obj;
        var data1 = {
            "icon": obj.icon,
            "rarity": obj.rarity,
            "element": obj.element,
            "round": obj.round,
            "generation": obj.generation,
            "name": obj.name,
            "cost": obj.cost,
            "level": obj.level,
            "atk": obj.atk,
            "hp": obj.hp,
            "groupName": "groupCR_" + idx,
            "canTouch": true
        };
        this.setSCard(data1);
        if (obj.cantouch == 1)
            self.groupNotOwn.visible = false;
        else
            self.groupNotOwn.visible = true;
    };
    ECardItemView.prototype.setSCard = function (data) {
        var self = this;
        var view = new CardSquareView();
        view.initData(data);
        view.scaleX = Number((self.groupCard.width / view.width).toFixed(2));
        view.scaleY = Number((self.groupCard.height / view.height).toFixed(2));
        view.showSimple();
        self.groupCard.addChild(view);
    };
    ECardItemView.prototype.sleep = function () {
    };
    ECardItemView.prototype.setImgBG = function (index) {
        var self = this;
        self.imgBG.source = "lobbyImg1Sheet_json." + self.arrLetter[index - 1] + "196x194";
    };
    //返回视图宽度
    ECardItemView.prototype.getViewWidth = function () {
        return this.groupCI.width;
    };
    //返回视图高度
    ECardItemView.prototype.getViewHeight = function () {
        return this.groupCI.height;
    };
    ECardItemView.prototype.showSimple = function () {
    };
    ECardItemView.NAME = "ECardItemSkin";
    return ECardItemView;
}(BaseView));
__reflect(ECardItemView.prototype, "ECardItemView");
//# sourceMappingURL=ECardItemView.js.map