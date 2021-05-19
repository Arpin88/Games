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
var ChouCardView = (function (_super) {
    __extends(ChouCardView, _super);
    function ChouCardView() {
        var _this = _super.call(this, ChouCardView.NAME) || this;
        _this.arrCardFetters = new Array();
        _this.mallName = [];
        _this.movieIdx = 0;
        _this.movieStateType = 0;
        return _this;
    }
    ChouCardView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        this.btnConfirm.$setVisible(false);
        this.btnCancel.$setVisible(false);
        self.tittle1.$setVisible(false);
        self.movieStartTimer();
    };
    ChouCardView.prototype.createImage = function () {
        var scale = 1;
        this.movieImg = new eui.Image();
        this.movieImg.source = "res-Hall/res/animation/00001.png";
        this.movieImg.x = this.width / 2 - 300 * scale;
        this.movieImg.y = 0;
        this.movieImg.scaleX = this.movieImg.scaleY = scale;
        this.addChild(this.movieImg);
    };
    ChouCardView.prototype.clearAni = function () {
        this.movieTimer.stop();
        if (this.movieTimer != null) {
            this.movieImg.$setVisible(false);
        }
        if (this.movieImg != null) {
            this.removeChild(this.movieImg);
            //   this.movieImg = null;
        }
    };
    ChouCardView.prototype.movieStartTimer = function () {
        this.createImage();
        this.movieStateType = 0;
        var self = this;
        if (self.movieTimer == null) {
            self.movieTimer = new egret.Timer(100, 0);
            self.movieTimer.addEventListener(egret.TimerEvent.TIMER, self.movieTimerFunc, self);
        }
        //十连抽音效
        SoundManager.getInstance().PlaySound("shilianchou_mp3");
        this.movieImg.y = -500;
        egret.Tween.get(this.movieImg, { loop: false }).to({ y: 150 }, 600, egret.Ease.quadOut).call(function () {
            self.movieTimer.start();
        });
    };
    ChouCardView.prototype.movieTimerFunc = function () {
        this.movieIdx = this.movieIdx + 1;
        if (this.movieStateType == 0) {
            if (this.movieIdx >= 26) {
                this.movieIdx = 8;
            }
        }
        else {
            if (this.movieIdx == 27) {
                this.movieImg.x = this.width / 2 - 250;
                this.movieImg.y = 150 + 50;
            }
            if (this.movieIdx >= 41) {
                this.movieIdx = 0;
                this.movieStopTimer();
            }
        }
        this.movieImg.source = "res-Hall/res/animation/" + ExternalFun.prototype.add0(this.movieIdx, 5) + ".png";
    };
    ChouCardView.prototype.movieStopTimer = function () {
        this.clearAni();
        this.btnConfirm.$setVisible(true);
        this.btnCancel.$setVisible(true);
        this.setCardItem();
    };
    ChouCardView.prototype.sleep = function () {
        this.cleanArray(this.arrCardFetters);
    };
    ChouCardView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_Award10: //获取队伍配置
            case HallCmdDef.CMD_MyCardList:
                var shopDesc = data["msg"];
                var num = data["msg"]["length"];
                for (var i = 0; i < num; i++) {
                    var obj = data["msg"][i];
                    self.mallName[i] = obj;
                }
                if (num <= 0) {
                    self.tittle1.$setVisible(true);
                    this.clearAni();
                }
                else {
                    this.movieStateType = 1;
                }
                break;
        }
    };
    ChouCardView.prototype.setCardItem = function () {
        var defx = this.panel.width / 5;
        var defy = 40;
        var count = this.mallName["length"];
        var width = 0;
        var scale = 0.4;
        for (var i = 0; i < count; i++) {
            var view = new CardRectangleView();
            var obj = this.mallName[i];
            var xx = 0;
            var yy = 0;
            var data = {
                "icon": obj.iconUrl,
                "rarity": obj.rarity,
                "element": obj.ele,
                "round": obj.round,
                "generation": obj.generation,
                "name": obj.name,
                "cost": obj.cost,
                "level": obj.level,
                "atk": obj.atk,
                "hp": obj.hp,
                "groupName": obj.groupname,
                "canTouch": true
            };
            view.initData(data);
            view.scaleX = scale;
            view.scaleY = scale;
            var mid = count / 2;
            if (i < mid) {
                xx = defx * 0.2 + defx * i;
                yy = defy;
            }
            else {
                xx = defx * 0.2 + defx * (i - mid);
                yy = defy + view.height * scale + 30;
            }
            view.alpha = 0.2;
            view.x = this.width / 2 - 100;
            view.y = this.height / 2 - 100;
            this.panel.addChild(view);
            this.arrCardFetters.push(view);
            egret.Tween.get(view, { loop: false }).wait(10 + 50 * i).to({ alpha: 1, x: xx, y: yy }, 500);
            if (obj.rarity == "common") {
                var image = new eui.Image();
                image.scaleX = 5;
                image.scaleY = 5;
                image.x = -450;
                image.y = -350;
                image.source = "ani00008_png";
                image.alpha = 0.5;
                egret.Tween.get(image, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0.5 }, 1000);
                view.addChild(image);
            }
            else {
                var movieClip = new UIMovieClip();
                movieClip.scaleX = 5;
                movieClip.scaleY = 5;
                movieClip.x = 190;
                movieClip.y = 290;
                if (obj.rarity == "rare") {
                    movieClip.source = "greenanimation.animation";
                }
                else if (obj.rarity == "epic") {
                    movieClip.source = "blueanimation.animation";
                }
                else if (obj.rarity == "legendary") {
                    movieClip.source = "purpleanimation.animation";
                }
                else if (obj.rarity == "mythical") {
                    movieClip.source = "orangeanimation.animation";
                }
                else {
                    movieClip.source = "purpleanimation.animation";
                }
                movieClip.gotoAndPlay("play1", -1);
                view.addChild(movieClip);
            }
        }
    };
    ChouCardView.prototype.cleanArray = function (arr) {
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
    ChouCardView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnConfirm) {
                self.hiden();
                console.log("\u786E\u5B9A\u88AB\u6309\u4E0B");
                // 这个按钮点击了之后关闭，刷新一下主界面
                var obj = new Object();
                obj["param"] = "抽奖";
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Award, obj, false);
            }
            else if (tar == self.btnCancel) {
                // self.hiden();
                this.cleanArray(this.arrCardFetters);
                var obj = new Object();
                obj["param"] = "十连抽抽奖按钮";
                obj["pageid"] = "1";
                obj["pageSize"] = "9";
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_MyCardList, obj, false);
                this.btnConfirm.$setVisible(false);
                this.btnCancel.$setVisible(false);
                self.movieStartTimer();
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                // self.hiden();
            }
        }
    };
    ChouCardView.NAME = "ChouCardSkin";
    return ChouCardView;
}(BaseView));
__reflect(ChouCardView.prototype, "ChouCardView");
//# sourceMappingURL=ChouCardView.js.map