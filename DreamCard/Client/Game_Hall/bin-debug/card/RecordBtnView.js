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
var RecordBtnView = (function (_super) {
    __extends(RecordBtnView, _super);
    function RecordBtnView() {
        var _this = _super.call(this, RecordBtnView.NAME) || this;
        _this.curChooseState = 0;
        return _this;
    }
    RecordBtnView.prototype.week = function () {
        var self = this;
        self.labTmNColor = 0xFFFFFF;
        self.labTmCColor = 0xFFFFFF;
        self.labScoreNColor = 0xFFFFFF;
        self.labScoreCColor = 0xFFE468;
        self.setCurChoose();
    };
    RecordBtnView.prototype.sleep = function () {
    };
    //返回视图%
    RecordBtnView.prototype.getViewWidth = function () {
        return this.groupOB.width;
    };
    //返回视图高度
    RecordBtnView.prototype.getViewHeight = function () {
        var self = this;
        var height = self.groupOB.height;
        return height;
    };
    //设置按钮时间内容;
    RecordBtnView.prototype.setBtnTmContent = function (str) {
        this.labTm.text = str;
    };
    //设置按钮时间内容;
    RecordBtnView.prototype.setBtnTmContent1 = function (str) {
        this.labTm0.text = str;
    };
    //返回按钮时间内容;
    RecordBtnView.prototype.getBtnTmContent = function () {
        return this.labTm.text;
    };
    //设置按钮得分内容;
    RecordBtnView.prototype.setBtnScoreContent = function (str) {
        this.labScore.text = str;
    };
    //返回按钮得分内容;
    RecordBtnView.prototype.getBtnScoreContent = function () {
        return this.labScore.text;
    };
    //设置奖励图片;
    RecordBtnView.prototype.setBtnRewardImg = function (index) {
        if (index == 1)
            this.imgReward.source = "hallImg0Sheet_json.a36x36";
        else
            this.imgReward.source = "combatRecordSheet_json.exp";
    };
    //设置按钮name
    RecordBtnView.prototype.setBtnName = function (name) {
        this.btnRecord.name = name;
    };
    //返回按钮name
    RecordBtnView.prototype.getBtnName = function () {
        return this.btnRecord.name;
    };
    //设置当前是否为选择状态;0为正常状态,1为选中状态 按钮是否可以点击 
    RecordBtnView.prototype.setCurChoose = function (state, btnTouchEnabled) {
        if (state === void 0) { state = 0; }
        if (btnTouchEnabled === void 0) { btnTouchEnabled = false; }
        var self = this;
        if (self.curChooseState == state)
            return;
        self.curChooseState = state;
        self.labTm.textColor = state == 0 ? self.labTmNColor : self.labTmCColor;
        self.labScore.textColor = state == 0 ? self.labScoreNColor : self.labScoreCColor;
        if (btnTouchEnabled)
            self.btnRecord.touchEnabled = state == 0;
        self.imgChooseState.visible = state == 1;
        // self.groupItem.visible = state==1;
    };
    //返回当前选择状态
    RecordBtnView.prototype.getCurChooseState = function () {
        return this.curChooseState;
    };
    RecordBtnView.NAME = "RecordBtnViewSkin";
    return RecordBtnView;
}(BaseView));
__reflect(RecordBtnView.prototype, "RecordBtnView");
//# sourceMappingURL=RecordBtnView.js.map