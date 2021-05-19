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
var FilterView = (function (_super) {
    __extends(FilterView, _super);
    function FilterView() {
        var _this = _super.call(this, FilterView.NAME) || this;
        _this.arrFetterItem = new Array(); //长方形卡牌容器
        _this.arrSIPosY = new Array(); //长方形卡牌坐标
        // private isTouchMove:boolean = false;
        _this.movingState = false; //移动状态
        return _this;
    }
    FilterView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrFilterItem.addEventListener(eui.UIEvent.CHANGE_START, self.onChangeStartHandler, self);
        self.scrFilterItem.addEventListener(egret.Event.CHANGE, self.onChangeHanlder, self);
        self.scrFilterItem.addEventListener(eui.UIEvent.CHANGE_END, self.onChangeEndHandler, self);
        self.scrFilterItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrFilterItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        // self.arrTeamList = data.teamList;
        // self.setSortItem(self.arrTeamList);
        var desArr = data.desArr;
        self.setSortItem(desArr);
        var selIndex = data.selIndex;
        var selStr = data.selStr;
        //如果选择下标为null则判断是否有选择文字;
        if (desArr != null && selIndex == null && selStr != null) {
            for (var i = 0, lengthI = desArr.length; i < lengthI; i++) {
                var item = desArr[i];
                if (item == null)
                    continue;
                if (item == selStr) {
                    selIndex = i;
                    break;
                }
            }
        }
        selIndex = (selIndex == null || selIndex == undefined) ? -1 : selIndex;
        self.scrollToItem(selIndex, false);
        //点击选项层移动
        var clickMove = data.clickMove;
        clickMove = clickMove == null ? true : clickMove;
        self.clickMove = clickMove;
        self.callBackHandler = data.cbHandler;
    };
    FilterView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrFilterItem.removeEventListener(eui.UIEvent.CHANGE_START, self.onChangeStartHandler, self);
        self.scrFilterItem.removeEventListener(egret.Event.CHANGE, self.onChangeHanlder, self);
        self.scrFilterItem.removeEventListener(eui.UIEvent.CHANGE_END, self.onChangeEndHandler, self);
        self.scrFilterItem.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrFilterItem.removeEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        if (self.sortItemScrViewGroup0 != null) {
            self.sortItemScrViewGroup0.parent.removeChild(self.sortItemScrViewGroup0);
            self.sortItemScrViewGroup0 = null;
        }
        if (self.sortItemScrViewGroup1 != null) {
            self.sortItemScrViewGroup1.parent.removeChild(self.sortItemScrViewGroup1);
            self.sortItemScrViewGroup1 = null;
        }
        self.cleanArray(self.arrFetterItem);
        while (self.arrSIPosY.length) {
            self.arrSIPosY.pop();
        }
    };
    FilterView.prototype.cleanArray = function (arr) {
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
    FilterView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    FilterView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    FilterView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = tar;
            if (group.name.substr(0, 16) == "groupFetterItem_") {
                if (self.movingState)
                    return;
                SoundManager.getInstance().PlayClickSound();
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.onClickFetterItem(cIndex);
            }
        }
    };
    FilterView.prototype.onClickFetterItem = function (index) {
        var self = this;
        if (self.curChooseSIIndex == index) {
            if (self.callBackHandler != null)
                self.callBackHandler.runWith([index]);
        }
        else {
            if (self.clickMove)
                self.scrollToItem(index);
        }
    };
    FilterView.prototype.setSortItem = function (data) {
        if (data == null)
            return;
        var self = this;
        self.filterItemViewHeight = 0;
        var gapHeight = 0;
        var count = data.length;
        var selIndex = 0;
        for (var i = 0; i < count; i++) {
            var view = new FilterItemView();
            view.initData({ des: data[i], gName: "groupFetterItem_" + i });
            ;
            self.groupFilterItem.addChild(view);
            if (self.filterItemViewHeight == 0)
                self.filterItemViewHeight = view.height;
            if (gapHeight == 0)
                gapHeight = self.scrFilterItem.height / 2 - self.filterItemViewHeight / 2;
            view.horizontalCenter = "0";
            var posY = i * view.height + gapHeight;
            view.y = posY;
            self.arrFetterItem.push(view);
            self.arrSIPosY.push(posY);
        }
        var group0 = new eui.Group();
        group0.x = 0;
        group0.y = 0;
        group0.width = 0;
        group0.height = self.scrFilterItem.height / 2 - self.filterItemViewHeight / 2;
        self.groupFilterItem.addChild(group0);
        self.sortItemScrViewGroup0 = group0;
        var group1 = new eui.Group();
        group1.x = 0;
        group1.y = self.filterItemViewHeight * count + gapHeight;
        group1.width = 0;
        group1.height = self.scrFilterItem.height / 2 - self.filterItemViewHeight / 2;
        self.groupFilterItem.addChild(group1);
        self.sortItemScrViewGroup1 = group1;
        self.constChooseSIIndex = selIndex;
        self.scrollToItem(selIndex, false);
    };
    /**拖动开始*/
    FilterView.prototype.onChangeStartHandler = function () {
        this.onChangeStart = true;
    };
    FilterView.prototype.onChangeHanlder = function (e) {
        this.checkScale();
    };
    FilterView.prototype.onChangeEndHandler = function () {
        var self = this;
        if (self.onChangeStart) {
            self.onChangeStart = false;
            this.autoScrollToItem();
        }
    };
    /*** 自动选择*/
    FilterView.prototype.autoScrollToItem = function () {
        var self = this;
        self.scrollToItem(self.curChooseSIIndex);
    };
    FilterView.prototype.scrollToItem = function (index, playAni) {
        if (playAni === void 0) { playAni = true; }
        var self = this;
        if (index == -1) {
            return;
        }
        self.curChooseSIIndex = index;
        var scrollV = self.arrSIPosY[index] - self.scrFilterItem.height / 2 + self.filterItemViewHeight / 2;
        egret.Tween.removeTweens(self.scrFilterItem.viewport);
        if (playAni) {
            SoundManager.getInstance().PlaySound("shaixuan_mp3");
            egret.Tween.get(self.scrFilterItem.viewport).to({ scrollV: scrollV }, 100).call(self.checkScale, self);
        }
        else {
            self.scrFilterItem.viewport.scrollV = scrollV;
            self.checkScale();
        }
    };
    FilterView.prototype.checkScale = function () {
        var self = this;
        var sc = self.scrFilterItem;
        // var 
        for (var i = 0, lengthI = self.arrFetterItem.length; i < lengthI; i++) {
            var item = self.arrFetterItem[i];
            // let chaz = item.y-sc.viewport.scrollV-sc.height/2 + self.filterItemViewHeight/2;
            var chaz = self.arrSIPosY[i] - sc.viewport.scrollV - sc.height / 2 + self.filterItemViewHeight / 2;
            var scale = 1;
            var alpha = 1;
            var gapHeight = 0;
            if (Math.abs(chaz) <= self.filterItemViewHeight / 2 && Math.abs(chaz) >= 0) {
                if (chaz < 0) {
                    scale = 1 + chaz / 1000;
                }
                else if (chaz > 0) {
                    scale = 1 - chaz / 1000;
                }
                else if (Math.abs(chaz) == 0) {
                    scale = 1;
                }
                alpha = 1 - (Math.abs(chaz) / 1000);
                if (self.curChooseSIIndex != i)
                    SoundManager.getInstance().PlaySound("shaixuan_mp3");
                self.curChooseSIIndex = i;
            }
            else if (Math.abs(chaz) <= (self.filterItemViewHeight * 1.5)) {
                scale = Number((1 - ((1 - 0.88) * (Math.abs(chaz) / (self.filterItemViewHeight)))).toFixed(2));
                alpha = Number((1 - ((1 - 0.64) * (Math.abs(chaz) / (self.filterItemViewHeight)))).toFixed(2));
            }
            else {
                scale = Number((1 - ((1 - 0.76) * (Math.abs(chaz) / (self.filterItemViewHeight * 2)))).toFixed(2));
                alpha = Number((1 - ((1 - 0.26) * (Math.abs(chaz) / (self.filterItemViewHeight * 2)))).toFixed(2));
            }
            item.scaleX =
                item.scaleY = scale;
            item.alpha = alpha;
            item.y = self.arrSIPosY[i] + (1 - scale) * self.filterItemViewHeight / 2;
        }
    };
    FilterView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupCGPSort == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupCGPSort.scaleX =
                self.groupCGPSort.scaleY = 1;
            return;
        }
        self.groupCGPSort.scaleX =
            self.groupCGPSort.scaleY = gapNum;
    };
    FilterView.NAME = "FilterSkin";
    return FilterView;
}(BaseView));
__reflect(FilterView.prototype, "FilterView");
//# sourceMappingURL=FilterView.js.map