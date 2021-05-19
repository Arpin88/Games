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
var CGAwardView = (function (_super) {
    __extends(CGAwardView, _super);
    function CGAwardView() {
        var _this = _super.call(this, CGAwardView.NAME) || this;
        _this.curTypeIndex = 0; //当前类型下标 0属性 1技能 2羁绊
        _this.arrFetterItemView = new Array(); //羁绊选项视图集合
        _this.arrSkillItemView = new Array(); //技能选项视图集合
        return _this;
    }
    CGAwardView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.setCard(data);
        self.setFetter(data.txt, data.name);
    };
    CGAwardView.prototype.initView = function () {
        var self = this;
        // self.curTypeIndex = 0;
        self.btnUnload.visible = true;
        self.callBackRemove = null;
        self.cardCode = "";
    };
    CGAwardView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        if (self.attributeTextField != null) {
            self.attributeTextField.parent.removeChild(self.attributeTextField);
            self.attributeTextField = null;
        }
        self.cleanArray(self.arrFetterItemView);
        self.cleanArray(self.arrSkillItemView);
    };
    CGAwardView.prototype.cleanArray = function (arr) {
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
    CGAwardView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = tar;
            if (btn == self.btnClose) {
                self.hiden();
            }
            else if (btn == self.btnUnload) {
                if (self.callBackRemove != null) {
                    self.callBackRemove.run();
                }
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                self.hiden();
            }
        }
    };
    //显示卡牌
    CGAwardView.prototype.setCard = function (data) {
        var self = this;
        var view = new CardintroduceView();
        view.initData(data);
        view.horizontalCenter = "0";
        view.verticalCenter = "0";
        self.groupCard.addChild(view);
    };
    //设置羁绊
    CGAwardView.prototype.setFetter = function (txt, namestr) {
        var self = this;
        self.groupFetterItem.removeChildren();
        txt = txt.replace("/r/", "\r");
        var view = new eui.Label("\r" + txt);
        view.$setWidth(484);
        view.lineSpacing = 26;
        view.fontFamily = "SimHei";
        view.size = 20;
        view.y = 20;
        self.groupFetterItem.addChild(view);
        self.groupFetterItem.scrollV = 0;
        /*     var a = txt.split(namestr)
              if(a["length"] > 1){
                 view.textFlow = [
                     {text: a[0], style: {textColor:0xFFFFFF}},
                     {text:namestr,style:{textColor:0xfced63}},
                     {text:a[1],style:{textColor:0xFFFFFF}},
                 ];
              }else{
                 view.textFlow = [
                     {text: txt, style: {textColor:0x8bc2d5}},
                 ];
             }*/
    };
    CGAwardView.NAME = "CGAwardSkin";
    return CGAwardView;
}(BaseView));
__reflect(CGAwardView.prototype, "CGAwardView");
//# sourceMappingURL=CGAwardView.js.map