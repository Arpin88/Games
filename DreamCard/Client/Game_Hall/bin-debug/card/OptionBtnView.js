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
var OptionBtnView = (function (_super) {
    __extends(OptionBtnView, _super);
    function OptionBtnView() {
        var _this = _super.call(this, OptionBtnView.NAME) || this;
        _this.imgLabelStr = "";
        _this.curChooseState = 0;
        _this.arrOptionBtnItem = new Array(); //选项子按钮容器
        _this.ItemGroupHeight = 0;
        return _this;
    }
    OptionBtnView.prototype.week = function () {
        var self = this;
        self.lblDesNColor = 0xbbafb9;
        self.lblDesStrokeNColor = 0x13131b;
        self.lblDesCColor = 0xfffce1;
        self.lblDesStrokeCColor = 0xffc926;
        self.setCurChoose();
    };
    OptionBtnView.prototype.sleep = function () {
        var self = this;
        self.cleanArray(self.arrOptionBtnItem);
    };
    OptionBtnView.prototype.cleanArray = function (arr) {
        if (arr == null || arr.length <= 0)
            return;
        for (var i = arr.length - 1; i >= 0; i--) {
            var item = arr[i];
            if (item != null) {
                var parent = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i, 1);
        }
    };
    //返回视图%
    OptionBtnView.prototype.getViewWidth = function () {
        return this.groupOB.width;
    };
    //返回视图高度
    OptionBtnView.prototype.getViewHeight = function () {
        var self = this;
        var height = self.groupOB.height;
        return height;
    };
    // //设置按钮内容;
    // public setBtnContent(str:string):void{
    //     this.lblDes.text = str;
    // }
    OptionBtnView.prototype.setBtnImgContent = function (str) {
        this.lblDes.$setVisible(false);
        this.imgLabel.$setVisible(true);
        this.imgLabelStr = str;
        this.imgLabel.source = "hallText0Sheet_json." + this.imgLabelStr + "00";
    };
    //设置选中状态 换图片
    OptionBtnView.prototype.setChooseState = function () {
        var btnNor_Image = this.btnOption.getChildAt(0);
        var arr2States = this.btnOption.skin.states;
        var property2Down = arr2States[1].overrides[0];
        btnNor_Image.source = property2Down.value;
    };
    //返回按钮内容;
    OptionBtnView.prototype.getBtnContent = function () {
        return this.lblDes.text;
    };
    //设置按钮name
    OptionBtnView.prototype.setBtnName = function (name) {
        this.btnOption.name = name;
    };
    //返回按钮name
    OptionBtnView.prototype.getBtnName = function () {
        return this.btnOption.name;
    };
    OptionBtnView.prototype.setItemGroupHeight = function (num) {
        this.ItemGroupHeight = num;
    };
    //设置当前是否为选择状态;0为正常状态,1为选中状态 按钮是否可以点击 
    OptionBtnView.prototype.setCurChoose = function (state, btnTouchEnabled) {
        if (state === void 0) { state = 0; }
        if (btnTouchEnabled === void 0) { btnTouchEnabled = false; }
        var self = this;
        if (self.curChooseState == state)
            return;
        self.curChooseState = state;
        self.lblDes.textColor = state == 0 ? self.lblDesNColor : self.lblDesCColor;
        self.lblDes.strokeColor = state == 0 ? self.lblDesStrokeNColor : self.lblDesStrokeCColor;
        if (this.imgLabelStr != "") {
            var str = "";
            str = state == 0 ? this.imgLabelStr + "00" : this.imgLabelStr + "01";
            this.imgLabel.source = "hallText0Sheet_json." + str;
        }
        if (btnTouchEnabled)
            self.btnOption.touchEnabled = state == 0;
        self.imgChooseState.visible = state == 1;
        // self.groupItem.visible = state==1;
        if (state == 0 && self.curChooseOptionBtnItemIndex != null) {
            var btnView = self.getOptionBtnItemViewByIndex(self.curChooseOptionBtnItemIndex);
            if (btnView == null)
                return;
            btnView.setCurChoose();
            self.curChooseOptionBtnItemIndex = -1;
        }
    };
    //返回当前选择状态
    OptionBtnView.prototype.getCurChooseState = function () {
        return this.curChooseState;
    };
    //返回选择的子按钮下标
    OptionBtnView.prototype.getCurChooseOptionBtnItemIndex = function () {
        return this.curChooseOptionBtnItemIndex;
    };
    //添加子选项
    OptionBtnView.prototype.addItem = function (optionBtnItemView) {
        var self = this;
        self.arrOptionBtnItem.push(optionBtnItemView);
        self.groupItem.addChild(optionBtnItemView);
    };
    //设置子选项选中状态
    OptionBtnView.prototype.setItemChooseState = function (index, btnTouchEnabled) {
        if (btnTouchEnabled === void 0) { btnTouchEnabled = false; }
        var self = this;
        var btnView = null;
        if (self.curChooseOptionBtnItemIndex != null && self.curChooseOptionBtnItemIndex != -1) {
            btnView = self.getOptionBtnItemViewByIndex(self.curChooseOptionBtnItemIndex);
            if (btnView == null)
                return;
            btnView.setCurChoose(0, btnTouchEnabled);
            if (self.curChooseOptionBtnItemIndex == index) {
                self.curChooseOptionBtnItemIndex = -1;
                return;
            }
        }
        self.curChooseOptionBtnItemIndex = index;
        btnView = self.getOptionBtnItemViewByIndex(index);
        if (btnView == null)
            return;
        btnView.setCurChoose(1, btnTouchEnabled);
    };
    //返回选项子按钮视图根据下标
    OptionBtnView.prototype.getOptionBtnItemViewByIndex = function (index) {
        var self = this;
        if (index < 0 || index >= self.arrOptionBtnItem.length)
            return null;
        var retView = null;
        for (var i = 0, lengthI = self.arrOptionBtnItem.length; i < lengthI; i++) {
            var btnView = self.arrOptionBtnItem[i];
            if (btnView == null)
                continue;
            var btnName = btnView.getBtnName();
            var strArr = btnName.split("_");
            if (strArr.length != 3) {
                continue;
            }
            var cIndex = Number(strArr[2]);
            if (index == cIndex) {
                retView = btnView;
                break;
            }
        }
        return retView;
    };
    OptionBtnView.prototype.hiddenGroupItem = function () {
        this.groupItem.height = 0;
        this.groupItem.visible = false;
    };
    OptionBtnView.prototype.showGroupItem = function () {
        this.groupItem.height = this.ItemGroupHeight;
        this.groupItem.visible = true;
    };
    OptionBtnView.prototype.setBtnOptionEnable = function (state) {
        this.btnOption.enabled = state;
    };
    OptionBtnView.NAME = "OptionBtnSkin";
    return OptionBtnView;
}(BaseView));
__reflect(OptionBtnView.prototype, "OptionBtnView");
//# sourceMappingURL=OptionBtnView.js.map