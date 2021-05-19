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
var SetView = (function (_super) {
    __extends(SetView, _super);
    function SetView() {
        var _this = _super.call(this, SetView.NAME) || this;
        _this.discDataist = new Array();
        _this.iconUrl = "";
        _this.nickTxt = "昵称：";
        return _this;
    }
    SetView.prototype.week = function () {
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.nickTxt = "Name:";
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.InitView(); // 初始化界面
        self.requestInitDataFromSvr(); // 初始申请数据
    };
    SetView.prototype.InitView = function () {
        var self = this;
        // 公共数据设置个人信息
        var account123 = GlobalDataManager.getInstance().getAccountData();
        self.useridtxt.text = "ID: " + account123["uname"];
        self.nicknametxt.text = self.nickTxt + account123["nick"];
        var iconUrl = account123.getHead_Url();
        this.setHeadIcon(iconUrl, false);
        // 本地数据设置按钮
        self.SwitchSound.selected = true;
        if (localStorage.getItem("soundSet") == "off") {
            self.SwitchSound.selected = false;
        }
        self.SwitchMusic.selected = true;
        if (localStorage.getItem("musicSet") == "off") {
            self.SwitchMusic.selected = false;
        }
        self.freshMusicSet();
        self.freshSoundSet();
        self.versiontxt.text = "Version:" + Main.ver;
    };
    SetView.prototype.setHeadIcon = function (iconUrl, isReset) {
        this.iconUrl = iconUrl;
        this.headImg.source = this.iconUrl;
        // 发送到服务器
        if (isReset == true) {
            this.requestSetHeadToSvr(this.headImg.source);
        }
    };
    //发送更改头像请求
    SetView.prototype.requestSetHeadToSvr = function (headStr) {
        if (headStr == "")
            return;
        var obj = new Object();
        obj["headurl"] = headStr;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_SetHead, obj, true);
    };
    //发送请求
    SetView.prototype.requestInitDataFromSvr = function () {
        var obj = new Object();
        obj["param"] = "设置";
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_SetConfig, obj, true);
    };
    SetView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_SetConfig://获取队伍配置
                var num = data["length"];
                for (var k = 0; k < num; k++) {
                    var mydata = data[k];
                    this.discDataist[mydata.position] = mydata;
                }
                this.setViewByData();
                break;
            case HallCmdDef.CMD_SetHead:
                var headurl = data["msg"];
                var account = GlobalDataManager.getInstance().getAccountData();
                account.setHead_Url(headurl);
                this.setHeadIcon(headurl, false);
                break;
        }
    };
    SetView.prototype.setViewByData = function () {
        this.kefuwxLabel.text = this.discDataist[1]["tittle"] + this.discDataist[1]["disc"];
        this.kefuqqLabel.text = this.discDataist[2]["tittle"] + this.discDataist[2]["disc"];
        this.label1.text = this.discDataist[3]["tittle"] + this.discDataist[3]["disc"];
        this.label2.text = this.discDataist[4]["tittle"] + this.discDataist[4]["disc"];
        this.label3.text = this.discDataist[5]["tittle"] + this.discDataist[5]["disc"];
    };
    SetView.prototype.sleep = function () {
    };
    SetView.prototype.freshSoundSet = function () {
        if (this.SwitchSound.selected == true) {
            this.soundtxt.textColor = 0xFFFFFF;
            localStorage.setItem("soundSet", "on");
            this.soundImg.source = "hallText0Sheet_json.sy00";
        }
        else {
            this.soundtxt.textColor = 0x5DFA6B;
            localStorage.setItem("soundSet", "off");
            this.soundImg.source = "hallText0Sheet_json.sy01";
        }
    };
    SetView.prototype.freshMusicSet = function () {
        if (this.SwitchMusic.selected == true) {
            this.musictxt.textColor = 0xFFFFFF;
            localStorage.setItem("musicSet", "on");
            this.musicImg.source = "hallText0Sheet_json.yy00";
        }
        else {
            this.musictxt.textColor = 0x5DFA6B;
            localStorage.setItem("musicSet", "off");
            this.musicImg.source = "hallText0Sheet_json.yy01";
        }
    };
    SetView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnBack) {
                self.hiden();
            }
            else if (tar == self.BtnZhuXiao) {
                //  console.log(`注销退出`);
                PublicMethodManager.getInstance().loginOut();
            }
            else if (tar == self.changeIconBtn) {
                var sum = function (iconUrl) {
                    self.setHeadIcon(iconUrl, true);
                };
                var data = { "iconUrl": this.iconUrl, fun: sum };
                UIManager.getInstance().showUI(SelectHeadView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
            }
            else if (tar == self.SwitchMusic) {
                console.log("\u80CC\u666F\u97F3\u4E50\u5F00\u5173\uFF1A" + self.SwitchMusic.selected);
                this.freshMusicSet();
                SoundManager.getInstance().yinyue = self.SwitchMusic.selected;
                if (self.SwitchMusic.selected)
                    SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                else
                    SoundManager.getInstance().CloseBgm();
            }
            else if (tar == self.SwitchSound) {
                console.log("\u97F3\u6548\u5F00\u5173\uFF1A" + self.SwitchSound.selected);
                this.freshSoundSet();
                SoundManager.getInstance().yinxiao = self.SwitchSound.selected;
            }
            else if (tar == self.SwitchNotify) {
                console.log("\u901A\u77E5\u5F00\u5173\uFF1A" + self.SwitchNotify.selected);
            }
        }
    };
    SetView.NAME = "SetSkin";
    return SetView;
}(BaseView));
__reflect(SetView.prototype, "SetView");
//# sourceMappingURL=SetView.js.map