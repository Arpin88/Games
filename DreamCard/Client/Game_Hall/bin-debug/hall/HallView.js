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
var HallView = (function (_super) {
    __extends(HallView, _super);
    function HallView() {
        var _this = _super.call(this, HallView.NAME) || this;
        _this.infoAry = [];
        _this.arrInfoItem = new Array();
        _this.movingState = false; //移动状态
        _this.errorTxt = "充值暂未开放";
        _this.playBGM = false;
        return _this;
    }
    HallView.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        Hall.onGameShow();
        // egret.Tween.get(this).wait(1000).call(function(){
        //     this.autoMatch();
        // }.bind(this));
    };
    HallView.prototype.week = function () {
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.errorTxt = "Not available yet";
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrPropItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrPropItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        GameEventManager.getInstance().addEventListener(HallEvent.updateGold, self, self.updateGold);
        GameEventManager.getInstance().addEventListener(HallEvent.updateUserInfo, self, self.onUpdateAccountData);
        HallView.arrMsg = new Array();
        // 填写用户数据
        var account = GlobalDataManager.getInstance().getAccountData();
        self.comHead["nickname"].text = account.getNick().substring(0, 7); //字太长了做截断
        // self.comHead["prbLoading"].value = 0;
        self.onUpdateAccountData();
        self.updateGold();
        /* var iconUrl:string = account.getHead_Url();
         if(iconUrl!=null&&iconUrl!="")
         {
             var imgLoader: egret.ImageLoader = new egret.ImageLoader();
             egret.ImageLoader.crossOrigin = "anonymous";
             imgLoader.load(iconUrl);
             imgLoader.once(egret.Event.COMPLETE, self.onLoadImgCompleteHandler, self);
             imgLoader.once(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent){
                 console.log("加载网络图片:"+iconUrl+" 出现错误!")
             },self);
         }*/
        self.updateHead();
        if (account.getGuide_Step() != null && account.getGuide_Step() != "")
            UIManager.getInstance().showUI(GuideView, GameScene.EFFECT_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { step: account.getGuide_Step() });
        // 跑马灯消息
        var objabc1 = new Object();
        objabc1["param"] = "跑马灯";
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Notice, objabc1, false);
        //加下划线
        self.txturl.textFlow = [
            { text: self.txturl.text, style: { "href": "https://nft.xwg.games/pages/market/market" } }
        ];
        self.txturl.alpha = 0;
        self.startTimer();
        self.setSysInfoView(null);
        self.InfoGroup.$setVisible(false);
        //       self.btnInfoOut.$setVisible(true);
        /*   var movieClip = new UIMovieClip();
          // movieClip.scaleX = 0.5
          // movieClip.scaleY = 0.5;
           movieClip.x = 100;
           movieClip.y = 300;
           movieClip.source = "greenanimation.animation";
           movieClip.gotoAndPlay("play1",-1);
           this.addChild(movieClip);*/
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.playBGM = data.hasOwnProperty("playBGM") ? data.playBGM : false;
    };
    HallView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    HallView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    //设置道具
    HallView.prototype.setSysInfoView = function (infoAry) {
        if (infoAry == null)
            return;
        // self.cleanArray(self.groupPropItem);
        if (this.arrInfoItem.length > 0) {
            //ExternalFun.prototype.cleanArray(this.groupPropItem);
            return;
        }
        var self = this;
        var hMaxCount = 5;
        var width = self.scrPropItem.width / hMaxCount;
        var length = infoAry["length"];
        var vIndex = 0;
        for (var i = 0; i < length; i++) {
            var view = new InfoItemView();
            var data = infoAry[i];
            view.initData(data);
            self.groupPropItem.addChild(view);
            self.arrInfoItem.push(view);
            view.x = 0;
            view.y = vIndex * (view.getViewHeight() + 6);
            view.setGroupName("groupPI_" + i);
            vIndex++;
        }
    };
    HallView.prototype.updateHead = function () {
        var self = this;
        // 填写用户数据
        var account = GlobalDataManager.getInstance().getAccountData();
        self.comHead["nickname"].text = account.getNick().substring(0, 7); //字太长了做截断
        self.comHead["leveltxt"].text = account.getLvl() + "";
        var upexp = account.getUpexp();
        var muexp = account.getMuexp();
        self.comHead["lblProgress"].text = account.getExp() + "/" + account.getUpexp();
        self.comHead["prbLoading"].value = (account.getExp() / account.getUpexp()) * 100;
        self.comHead["hptxt"].text = account.getHp() + "";
        self.comHead["hptxt_btnum"].text = account.getHp() + "";
        //   self.comHead["prbLoading0"].value = 1;
        if (account.getHead_Url() == "") {
            account.setHead_Url("headicon_json.head_01");
        }
        self.setHeadIcon(account.getHead_Url());
        //头像圆形遮罩
        var iconMaskShape = new egret.Shape();
        iconMaskShape.graphics.beginFill(0x000000);
        var width = self.comHead["groupIcon"].width / 2;
        var height = self.comHead["groupIcon"].height / 2;
        iconMaskShape.x = width;
        iconMaskShape.y = height;
        iconMaskShape.graphics.drawCircle(0, 0, width);
        iconMaskShape.graphics.endFill();
        self.comHead["groupIcon"].addChild(iconMaskShape);
        self.comHead["headimag"].mask = iconMaskShape;
    };
    HallView.prototype.setHeadIcon = function (iconUrl) {
        if (iconUrl == "")
            iconUrl = "headicon_json.head_01";
        this.comHead["headimag"].source = iconUrl;
    };
    HallView.prototype.updateGold = function () {
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
        // this.comStar["txt0"].text = account.getXWGCoin();
    };
    HallView.prototype.startTimer = function () {
        var self = this;
        if (self.timer == null) {
            self.timer = new egret.Timer(300000, 0);
            self.timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
            // self.timeCounter = 0;
        }
        self.timer.start();
    };
    HallView.prototype.stopTimer = function () {
        var self = this;
        if (self.timer != null) {
            self.timer.stop();
        }
    };
    HallView.prototype.timerFunc = function () {
        var self = this;
        var objabc1 = new Object();
        objabc1["param"] = "跑马灯";
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Notice, objabc1, false);
    };
    //当load网络图片完成事件
    HallView.prototype.onLoadImgCompleteHandler = function (evt) {
        var self = this;
        if (evt.currentTarget.data) {
            var texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            var bitmap = new egret.Bitmap(texture);
            bitmap.x = 0;
            bitmap.y = 0;
            bitmap.width = self.comHead["groupIcon"].width;
            bitmap.height = self.comHead["groupIcon"].height;
            self.comHead["groupIcon"].addChild(bitmap);
            //头像圆形遮罩
            var iconMaskShape = new egret.Shape();
            iconMaskShape.graphics.beginFill(0x000000);
            var width = self.comHead["groupIcon"].width / 2;
            var height = self.comHead["groupIcon"].height / 2;
            iconMaskShape.x = width;
            iconMaskShape.y = height;
            iconMaskShape.graphics.drawCircle(0, 0, width);
            iconMaskShape.graphics.endFill();
            self.comHead["groupIcon"].addChild(iconMaskShape);
            bitmap.mask = iconMaskShape;
        }
    };
    HallView.prototype.sleep = function () {
        var self = this;
        self.stopTimer();
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrPropItem.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrPropItem.removeEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateGold, self, self.updateGold);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateUserInfo, self, self.onUpdateAccountData);
    };
    HallView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_Notice://获取队伍配置
                var i = 0;
                HallView.arrMsg = []; // 清理
                var num = data["msg"]["length"];
                for (var k = 0; k < num; k++) {
                    var obj3 = { nna: data["msg"][k]["tittle"] + ": ", nde: data["msg"][k]["disc"] };
                    var tp = LanguageManager.getInstance().getCurLanguageType();
                    if (tp == 1) {
                        obj3 = { nna: data["msg"][k]["tittleEn"] + ": ", nde: data["msg"][k]["discEn"] };
                    }
                    HallView.arrMsg.push(obj3);
                }
                self.infoAry = [];
                num = data["info"]["length"];
                for (var k = 0; k < num; k++) {
                    self.infoAry[data["info"][k]["noticeId"] - 1] = data["info"][k]; // 0 开始作为下表
                }
                self.setSysInfoView(self.infoAry);
                self.showHorseRaceLamp();
                break;
            case HallCmdDef.CMD_GETUPADTEGOLD:
                self.updateGold();
                break;
            case HallCmdDef.CMD_SetHead:
                var headurl = data["msg"];
                var account = GlobalDataManager.getInstance().getAccountData();
                account.setHead_Url(headurl);
                self.setHeadIcon(headurl);
                break;
        }
    };
    HallView.prototype.gotoView = function (view) {
        switch (view) {
            case "CardView":
                UIManager.getInstance().showUI(CardView);
                break;
            case "MatchingView":
                UIManager.getInstance().showUI(MatchingView);
                break;
            case "CardGroupView":
                UIManager.getInstance().showUI(CardGroupView);
                break;
            case "ExtractView":
                UIManager.getInstance().showUI(ExtractView);
                break;
            case "MallView":
                UIManager.getInstance().showUI(MallView);
                break;
            case "PackageView":
                UIManager.getInstance().showUI(PackageView);
                break;
            case "RecycleView":
                UIManager.getInstance().showUI(RecycleView);
                //    UIManager.getInstance().showUI(CardGroupUploadView);  // 测试
                //     UIManager.getInstance().showUI(CardGroupUploadView);
                break;
            case "FettersView":
                UIManager.getInstance().showUI(FettersView);
                break;
            case "ActivetyView":
                // PopManager.getInstance().showPromptBox("活动暂未开放",2,Handler.create(self,function(confirm:boolean){
                //     console.log(`回调函数被调用`);
                // }));
                var labelObj = LanguageManager.getInstance().getLabelLanguage(this);
                PopManager.getInstance().showPromptBox(labelObj["lbl_0"], 2);
                break;
            case "Change":
                //   PopManager.getInstance().showPromptBox(this.errorTxt,2,Handler.create(self,function(confirm:boolean){
                //          console.log(`回调函数被调用`);
                //       }));
                UIManager.getInstance().showUI(ExchangeView);
                break;
            case "Exchange":
                UIManager.getInstance().showUI(ExchangeView);
                break;
            case "TurnCard":
                UIManager.getInstance().showUI(CardGroupUploadView);
                break;
            case "CombatRecordView":
                UIManager.getInstance().showUI(CombatRecordView);
                break;
            case "SetView":
                UIManager.getInstance().showUI(SetView);
                // UIManager.getInstance().showUI(TaskView);  
                // UIManager.getInstance().showUI(GuideView,GameScene.EFFECT_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{step:"0"});
                break;
            case "TaskView":
                UIManager.getInstance().showUI(TaskView);
                break;
        }
    };
    HallView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Group) {
            self.checkBGMPlay();
            var group = event.target;
            if (group.name.substr(0, 8) == "groupPI_") {
                if (self.movingState)
                    return;
                var strArr = group.name.split("_");
                /*  if(strArr.length!=2){
                      return;
                  }*/
                var cIndex = Number(strArr[1]);
                var data = this.infoAry[cIndex];
                console.log(group.name);
                this.gotoView(data["view"]);
                // UIManager.getInstance().showUI(SetView);  // 设置
            }
        }
        else if (tar instanceof eui.Button) {
            self.checkBGMPlay();
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnCard) {
                // 卡牌
                // UIManager.getInstance().showUI(CardView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_MOVE_RIGHT);
                //UIManager.getInstance().showUI(CardView);
                this.gotoView("CardView");
            }
            else if (tar == self.btnCombat) {
                //UIManager.getInstance().showUI(MatchingView);
                this.gotoView("MatchingView");
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (tar == self.btnCardGroup) {
                //UIManager.getInstance().showUI(CardGroupView);
                this.gotoView("CardGroupView");
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (tar == self.btnExtract) {
                //UIManager.getInstance().showUI(ExtractView);
                this.gotoView("ExtractView");
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (tar == self.btnMall) {
                //UIManager.getInstance().showUI(MallView);
                this.gotoView("MallView");
            }
            else if (tar == self.btnRetrieve) {
                // 回收
                //UIManager.getInstance().showUI(MallView); 
                this.gotoView("RecycleView");
            }
            else if (tar == self.btnCharge) {
                // 充值
                //UIManager.getInstance().showUI(MallView);  
                this.gotoView("Change");
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (tar == self.btnTurnCard) {
                // 充值
                //UIManager.getInstance().showUI(MallView);  
                this.gotoView("TurnCard");
            }
            else if (tar == self.btnExchange) {
                // 充值
                //UIManager.getInstance().showUI(MallView);  
                this.gotoView("Exchange");
            }
            else if (tar == self.btnPackage) {
                // 背包
                //UIManager.getInstance().showUI(PackageView);
                this.gotoView("PackageView");
            }
            else if (tar == self.btnActivity) {
                // // 活动
                // this.gotoView("RecycleView")
                this.gotoView("ActivetyView");
            }
            else if (tar == self.btnFetters) {
                //UIManager.getInstance().showUI(FettersView);
                this.gotoView("FettersView");
            }
            else if (tar == self.btnCombatRecord) {
                //UIManager.getInstance().showUI(CombatRecordView);
                this.gotoView("CombatRecordView");
            }
            else if (tar == self.btnSetUp) {
                //UIManager.getInstance().showUI(SetView);  // 设置
                this.gotoView("SetView");
            }
            else if (tar == self.btnTask) {
                this.gotoView("TaskView");
            }
            else if (tar == self.btnInfoInto) {
                self.InfoGroup.$setVisible(false);
                self.btnInfoOut.$setVisible(true);
            }
            else if (tar == self.btnInfoOut) {
                self.InfoGroup.$setVisible(true);
                self.btnInfoOut.$setVisible(false);
            }
            else if (tar == self.HeadButton || tar == self.comHead["upbtn"]) {
                UIManager.getInstance().showUI(RoleUpgradeView);
            }
            else if (tar.name == "btnUserItem") {
                // PublicMethodManager.getInstance().openWallet();
                this.gotoView("Change");
            }
        }
        else if (tar instanceof eui.Label) {
            if (tar == self.txturl) {
                SoundManager.getInstance().PlayClickSound();
            }
        }
    };
    //显示跑马灯
    HallView.prototype.showHorseRaceLamp = function () {
        var self = this;
        HorseRaceLamp.getInstance().closeHorseRaceLamp();
        for (var p = 0; p < HallView.arrMsg.length; p++) {
            var d = HallView.arrMsg[p];
            var c_title = d.nna;
            var c_desc = d.nde;
            var size = 20;
            var bold = false;
            var left = 85;
            var right = 85;
            var lab = new eui.Label();
            lab.x = 10;
            lab.y = 5;
            lab.fontFamily = "SimHei";
            lab.textColor = 0xFFFFFF;
            lab.size = size;
            lab.bold = bold;
            lab.text = c_title + c_desc;
            var speed = 10000;
            var w = this.comNotable.width - right - left;
            w = w < 1 ? 1 : w;
            speed += speed * (lab.width / w);
            HorseRaceLamp.getInstance().showHorseRaceLamp(this.comNotable, d.nna + d.nde, 8, left, right, false, speed, 0xFFFFFF, size, bold, 2, 1500, null, true);
        }
    };
    //请求战斗数据
    HallView.prototype.reqMatchInfo = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_HALL_GET_MATCH_PVP_INFO, {}, false);
    };
    HallView.prototype.onUpdateAccountData = function () {
        var self = this;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        self.comHead["leveltxt"].text = accountData.getLvl() + "";
        var exp = accountData.getExp();
        var upexp = accountData.getUpexp();
        self.comHead["lblProgress"].text = accountData.getExp() + "/" + accountData.getUpexp();
        self.comHead["prbLoading"].value = (accountData.getExp() / accountData.getUpexp()) * 100;
        self.comHead["hptxt"].text = accountData.getHp() + "";
    };
    HallView.prototype.checkBGMPlay = function () {
        var self = this;
        if (self.playBGM)
            return;
        SoundManager.getInstance().PlayBgm("datingBGM_mp3");
        // SoundManager.getInstance().setBGMVolume(0.7);
        self.playBGM = true;
    };
    // //当获取到匹敌信息
    // private onGetMatchInfo(data:any):void{
    //     var self = this;
    //     if(data==null||data==0){
    //         return;
    //     }
    //     self.openWebSocket(data);
    // }
    // private openWebSocket(data:any):void{
    //     if(data==null)
    //         return;
    //     var ruuid:string = data.ruuid;
    //     GlobalDataManager.getInstance().setRUUID(ruuid);
    //     var room:string = data.room;
    //     GlobalDataManager.getInstance().setRoom(room);
    //     GlobalDataManager.getInstance().setThredID(0);
    //     var scode:string = data.scode;
    //     GlobalDataManager.getInstance().setGameServerName(scode);
    //     var surl:string = data.surl;
    //     let server: ServerData = new ServerData();
    //     server.setSname(scode);
    //     server.setSurl(surl);
    //     server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
    //     WebSocketManager.getInstance().registerServer(server);
    //     WebSocketManager.getInstance().connectServer(scode, true);
    // }
    //返回大厅层
    HallView.prototype.getHallGroup = function () {
        return this.groupHall;
    };
    //返回充值按钮
    HallView.prototype.getChargeBtn = function () {
        return this.btnCharge;
    };
    //返回十连抽按钮
    HallView.prototype.getExtractBtn = function () {
        return this.btnExtract;
    };
    //返回商城按钮
    HallView.prototype.getMallBtn = function () {
        return this.btnMall;
    };
    //返回卡牌按钮
    HallView.prototype.getCardBtn = function () {
        return this.btnCard;
    };
    //返回卡组按钮
    HallView.prototype.getCardGroupBtn = function () {
        return this.btnCardGroup;
    };
    //返回战斗按钮
    HallView.prototype.getCombatBtn = function () {
        return this.btnCombat;
    };
    HallView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupHall == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupHall.scaleX =
                self.groupHall.scaleY = 1;
            return;
        }
        self.groupHall.scaleX =
            self.groupHall.scaleY = gapNum;
    };
    HallView.NAME = "HallSkin";
    return HallView;
}(BaseView));
__reflect(HallView.prototype, "HallView");
//# sourceMappingURL=HallView.js.map