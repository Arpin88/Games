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
var SelectHeadView = (function (_super) {
    __extends(SelectHeadView, _super);
    function SelectHeadView() {
        var _this = _super.call(this, SelectHeadView.NAME) || this;
        _this.func = null;
        _this.hIndex = 0;
        _this.vIndex = 0;
        _this.arrPropItem = new Array();
        _this.selectHeadStr = "";
        return _this;
    }
    SelectHeadView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var type = data.name;
        this.func = data.fun;
        this.selectHeadStr = data.iconUrl;
        this.initView();
    };
    SelectHeadView.prototype.cleanArray = function (arr) {
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
    SelectHeadView.prototype.setLight = function (cIndex) {
        var namestring = "groupPI_" + cIndex;
        for (var i = this.arrPropItem.length; i >= 0; i--) {
            var item = this.arrPropItem[i - 1];
            if (item != null) {
                if (i == cIndex) {
                    item.setBeenSelect(true);
                }
                else {
                    item.setBeenSelect(false);
                }
            }
        }
    };
    //设置道具
    SelectHeadView.prototype.initView = function () {
        var self = this;
        var hMaxCount = 5;
        var width = self.scrPropItem.width / hMaxCount;
        var lenght = 46;
        var hIndex = 0;
        var vIndex = 0;
        for (var i = 1; i < lenght; i++) {
            var view = new HeadItemView();
            var headStr = "headicon_json.head_" + ExternalFun.prototype.add0(i, 2);
            var data = { "icon": headStr, "name": "a", "num": 0 };
            view.initData(data);
            self.groupPropItem.addChild(view);
            view.x = hIndex * (width - 6) + 20;
            view.y = vIndex * (view.getViewHeight() + 12);
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.setGroupName("groupPI_" + i);
            self.arrPropItem.push(view);
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
    };
    SelectHeadView.prototype.sleep = function () {
        this.cleanArray(this.arrPropItem);
        this.scrPropItem.viewport.scrollV = 0;
        this.scrPropItem.viewport.scrollH = 0;
    };
    SelectHeadView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnConfirm) {
                self.hiden();
                //  console.log(`确定被按下`);
                if (this.func != null) {
                    this.func(this.selectHeadStr);
                }
            }
            else if (tar == self.btnCancel) {
                self.hiden();
                console.log("\u53D6\u6D88\u88AB\u6309\u4E0B");
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                self.hiden();
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name.substr(0, 8) == "groupPI_") {
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                this.selectHeadStr = "headicon_json.head_" + ExternalFun.prototype.add0(cIndex, 2);
                this.setLight(cIndex);
            }
        }
    };
    SelectHeadView.NAME = "SelectHeadSkin";
    return SelectHeadView;
}(BaseView));
__reflect(SelectHeadView.prototype, "SelectHeadView");
//# sourceMappingURL=SelectHeadView.js.map