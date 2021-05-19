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
var OptionBtnItemView = (function (_super) {
    __extends(OptionBtnItemView, _super);
    function OptionBtnItemView() {
        var _this = _super.call(this, OptionBtnItemView.NAME) || this;
        _this.curChooseState = 0;
        return _this;
    }
    OptionBtnItemView.prototype.week = function () {
        var self = this;
        self.lblDesNColor = 0x9c6f43;
        self.lblDesStrokeNColor = 0x13131b;
        self.lblDesCColor = 0xe9fcff;
        self.lblDesStrokeCColor = 0xb8f7ff;
        self.setCurChoose();
    };
    OptionBtnItemView.prototype.sleep = function () {
    };
    //返回视图宽度
    OptionBtnItemView.prototype.getViewWidth = function () {
        return this.groupOIB.width;
    };
    //返回视图高度
    OptionBtnItemView.prototype.getViewHeight = function () {
        return this.groupOIB.height;
    };
    //设置按钮内容;
    OptionBtnItemView.prototype.setBtnContent = function (str) {
        this.lblDes.text = str;
    };
    //返回按钮内容;
    OptionBtnItemView.prototype.getBtnContent = function () {
        return this.lblDes.text;
    };
    //设置按钮name
    OptionBtnItemView.prototype.setBtnName = function (name) {
        this.btnOptionItem.name = name;
    };
    //返回按钮name
    OptionBtnItemView.prototype.getBtnName = function () {
        return this.btnOptionItem.name;
    };
    //设置当前是否为选择状态;0为正常状态,1为选中状态 按钮是否可以点击
    OptionBtnItemView.prototype.setCurChoose = function (state, btnTouchEnabled) {
        if (state === void 0) { state = 0; }
        if (btnTouchEnabled === void 0) { btnTouchEnabled = false; }
        var self = this;
        if (self.curChooseState == state)
            return;
        self.curChooseState = state;
        if (btnTouchEnabled)
            self.btnOptionItem.touchEnabled = state == 0;
        self.imgChooseState.visible = state == 1;
        self.lblDes.textColor = state == 0 ? self.lblDesNColor : self.lblDesCColor;
        self.lblDes.strokeColor = state == 0 ? self.lblDesStrokeNColor : self.lblDesStrokeCColor;
    };
    OptionBtnItemView.prototype.getCurChooseState = function () {
        return this.curChooseState;
    };
    OptionBtnItemView.NAME = "OptionBtnItemSkin";
    return OptionBtnItemView;
}(BaseView));
__reflect(OptionBtnItemView.prototype, "OptionBtnItemView");
//# sourceMappingURL=OptionBtnItemView.js.map