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
var MatchingView = (function (_super) {
    __extends(MatchingView, _super);
    function MatchingView() {
        var _this = _super.call(this, MatchingView.NAME) || this;
        _this.loopReqMatchInfoIndex = -1;
        _this.loopReqTime = 3;
        return _this;
    }
    MatchingView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        SoundManager.getInstance().PlayBgm("kaishipipei_mp3");
        self.initView();
        self.sendMatch();
    };
    MatchingView.prototype.initView = function () {
        var self = this;
        self.loopReqMatchInfoIndex = -1;
        self.timeCounter = 0;
        self.updateTimeShow();
        self.startRotate();
        self.startTimer();
        self.setHintTextField();
    };
    MatchingView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.stopRotate();
        self.stopTimer();
        if (self.timer != null) {
            self.timer.removeEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
            self.timer = null;
        }
        if (self.hintTextField != null) {
            self.hintTextField.parent.removeChild(self.hintTextField);
            self.hintTextField = null;
        }
    };
    MatchingView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnStop) {
                // self.hiden();
                self.sendDisMatch();
            }
        }
    };
    //开始旋转
    MatchingView.prototype.startRotate = function () {
        var self = this;
        self.stopRotate();
        self.imgRotate.rotation = 0;
        egret.Tween.get(self.imgRotate, { loop: true }).to({ rotation: 360 }, 2500);
    };
    MatchingView.prototype.stopRotate = function () {
        egret.Tween.removeTweens(this.imgRotate);
    };
    MatchingView.prototype.startTimer = function () {
        var self = this;
        if (self.timer == null) {
            self.timer = new egret.Timer(1000, 0);
            self.timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
            self.timeCounter = 0;
        }
        self.timer.start();
    };
    MatchingView.prototype.stopTimer = function () {
        var self = this;
        if (self.timer != null) {
            self.timer.stop();
        }
    };
    MatchingView.prototype.timerFunc = function () {
        var self = this;
        self.timeCounter++;
        self.updateTimeShow();
        if (self.loopReqMatchInfoIndex != -1) {
            self.loopReqMatchInfoIndex--;
            if (self.loopReqMatchInfoIndex == 0) {
                self.sendGetMatchInfo();
            }
        }
    };
    MatchingView.prototype.updateTimeShow = function () {
        var self = this;
        self.lblTime.text = self.parseTime(self.timeCounter);
    };
    MatchingView.prototype.parseTime = function (counter) {
        if (counter < 0)
            counter = 0;
        var second = counter % 60;
        var minute = Math.floor(counter / 60);
        var secondStr = second < 10 ? "0" + second : "" + second;
        var minuteStr = minute < 10 ? "0" + minute : "" + minute;
        return minuteStr + ":" + secondStr;
    };
    //设置提示文本
    MatchingView.prototype.setHintTextField = function () {
        var self = this;
        var labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var txt = new egret.TextField();
        txt.textColor = 0xffffff;
        txt.size = 36;
        self.groupHint.addChild(txt);
        txt.fontFamily = "SimHei";
        txt.textFlow = [
            //   {text: "温馨提示:", style: {"size": 36,textColor:0xffe399}},
            //   {text:'点击下面按钮可关闭界面',style:{"size":30,textColor:0x80d5fc}}
            { text: labelObj["lbl_0"], style: { "size": 36, textColor: 0xffe399 } },
            { text: labelObj["lbl_1"], style: { "size": 30, textColor: 0x80d5fc } }
        ];
        self.hintTextField = txt;
        // txt.textAlign = egret.HorizontalAlign.CENTER;
        self.groupHint.width = txt.width; //设置层级宽度可以自适应居中
    };
    MatchingView.prototype.sendMatch = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_MATCH_PVP, { gcid: 0 }, false);
    };
    MatchingView.prototype.sendDisMatch = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_DISMATCH_PVP, {});
    };
    MatchingView.prototype.sendGetMatchInfo = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_MATCH_PVP_INFO, {}, false);
    };
    //接收数据
    MatchingView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_MATCH_PVP://匹敌
                self.onGetMatchPvp(data);
                break;
            case HallCmdDef.CMD_DISMATCH_PVP://取消匹敌
                SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                self.hiden();
                break;
            case HallCmdDef.CMD_GET_MATCH_PVP_INFO://获取匹敌信息
                self.onGetMatchInfo(data);
                break;
        }
    };
    MatchingView.prototype.onGetMatchPvp = function (data) {
        if (data == null)
            return;
        var self = this;
        var msg = data.msg;
        if (data.result != null && data.result != GlobalDef.REQUEST_SUCCESS) {
            self.stopTimer();
            var handler = null;
            if (msg == -108) {
                handler = Handler.create(self, function () {
                    SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                    self.hiden();
                    UIManager.getInstance().showUI(CardGroupView);
                });
            }
            else {
                handler = Handler.create(self, function () {
                    SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                    self.hiden();
                });
            }
            if (ErrorMananger.getInstance().checkReqResult(data, true, handler))
                return;
        }
        if (msg != null && msg.ruuid != null) {
            self.openWebSocket(msg);
        }
        else {
            self.sendGetMatchInfo();
        }
    };
    MatchingView.prototype.onGetMatchInfo = function (data) {
        if (data == null)
            return;
        var self = this;
        var msg = data.msg;
        if (data.result != null && data.result != GlobalDef.REQUEST_SUCCESS) {
            self.stopTimer();
            var handler = Handler.create(self, function () {
                SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                self.hiden();
            });
            if (ErrorMananger.getInstance().checkReqResult(data, true, handler))
                return;
        }
        if (msg == null || msg == 0) {
            self.loopSendGetMatchInfo();
            return;
        }
        self.openWebSocket(msg);
        // console.log(data);
    };
    MatchingView.prototype.openWebSocket = function (data) {
        if (data == null)
            return;
        SoundManager.getInstance().PlaySound("pipeichenggong_mp3");
        var ruuid = data.ruuid;
        GlobalDataManager.getInstance().setRUUID(ruuid);
        var room = data.room;
        GlobalDataManager.getInstance().setRoom(room);
        GlobalDataManager.getInstance().setThredID(0);
        var scode = data.scode;
        GlobalDataManager.getInstance().setGameServerName(scode);
        GlobalDataManager.getInstance().setGameOver(false);
        SoundManager.getInstance().canPlayCombatBGM = true;
        var surl = data.surl;
        var server = new ServerData();
        server.setSname(scode);
        server.setSurl(surl);
        server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        WebSocketManager.getInstance().registerServer(server);
        WebSocketManager.getInstance().connectServer(scode, true);
    };
    MatchingView.prototype.loopSendGetMatchInfo = function () {
        var self = this;
        self.loopReqMatchInfoIndex = self.loopReqTime;
    };
    MatchingView.NAME = "MatchingSkin";
    return MatchingView;
}(BaseView));
__reflect(MatchingView.prototype, "MatchingView");
//# sourceMappingURL=MatchingView.js.map