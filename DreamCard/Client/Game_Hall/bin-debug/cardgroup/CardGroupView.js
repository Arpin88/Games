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
var CardGroupView = (function (_super) {
    __extends(CardGroupView, _super);
    function CardGroupView() {
        var _this = _super.call(this, CardGroupView.NAME) || this;
        // private attributeTextField:egret.TextField; //卡组属性描述文本;
        // private arrCardItem:Array<CGSCardItemView> = new Array<CGSCardItemView>();    //卡牌容器
        _this.arrCardItem = new Array(); //卡牌容器
        _this.arrDefaultTeamList = []; //默认组队列表
        return _this;
    }
    CardGroupView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        GameEventManager.getInstance().addEventListener(HallEvent.updateUserInfo, self, self.onUpdateAccountData);
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.initView();
    };
    CardGroupView.prototype.initView = function () {
        var self = this;
        if (self.arrTeamConfig != null) {
            self.initTeamConfig(self.arrTeamConfig);
        }
        self.arrDefaultTeamList.push({ name: self.labelObj["lbl_0"], data: new Object() });
        self.arrDefaultTeamList.push({ name: self.labelObj["lbl_1"], data: new Object() });
        self.arrDefaultTeamList.push({ name: self.labelObj["lbl_2"], data: new Object() });
        self.lblCCost.text = "0/0";
        self.lblCHp.text = "0";
        self.lblCAtk.text = "0";
        self.lblCCapacity.text = "0";
        self.lblCEle.text = "";
        self.lblCFetters.text = "";
        if (self.teamData != null) {
            self.initTeamData(self.teamData);
        }
        else {
            self.sendGetTeamList();
        }
        self.setUserInfo();
    };
    CardGroupView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        GameEventManager.getInstance().removeEventListener(HallEvent.updateUserInfo, self, self.onUpdateAccountData);
        self.cleanArray(self.arrCardItem);
        self.teamData = null;
        while (self.arrDefaultTeamList.length != 0)
            self.arrDefaultTeamList.pop();
        self.labelObj = null;
        // if(self.attributeTextField!=null){
        //     self.attributeTextField.parent.removeChild(self.attributeTextField);
        //     self.attributeTextField = null;
        // }
        var account = GlobalDataManager.getInstance().getAccountData();
        if (account.getGuide_Step() != null && account.getGuide_Step() != "")
            UIManager.getInstance().showUI(GuideView, GameScene.EFFECT_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { step: account.getGuide_Step() });
    };
    CardGroupView.prototype.cleanArray = function (arr) {
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
    CardGroupView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            if (btn == self.btnCGChoose) {
                var desArr = new Array();
                var selIndex = -1;
                for (var i = 0, lengthI = self.arrTeamList.length; i < lengthI; i++) {
                    var item = self.arrTeamList[i];
                    if (item == null)
                        continue;
                    desArr.push(item.name);
                    var dataI = item.data;
                    if (dataI != null) {
                        var battle = dataI.battle;
                        if (battle != null && battle == 1) {
                            selIndex = i;
                        }
                    }
                }
                var data = { desArr: desArr, selIndex: selIndex, cbHandler: Handler.create(self, self.onChooseTeamListItem) };
                UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
            }
            else if (btn == self.btnCGEdit) {
                self.showCardGroupSetView();
            }
            else if (btn == self.btnAddLv) {
                UIManager.getInstance().showUI(RoleUpgradeView);
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name == null)
                return;
            if (group.name.substr(0, 10) == "groupCGCI_") {
                SoundManager.getInstance().PlayClickSound();
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.onClickCardItem(cIndex);
            }
        }
    };
    //显示卡组设置界面
    CardGroupView.prototype.showCardGroupSetView = function () {
        var self = this;
        var temaData = self.teamData["curBattleTeam"];
        if (temaData == null || temaData.name == null) {
            temaData = {};
            var name = self.lblCGName.text;
            temaData.name = name;
            var index = 0;
            for (var i = 0, lengthI = self.arrDefaultTeamList.length; i < lengthI; i++) {
                var item = self.arrDefaultTeamList[i];
                if (item == null || item.name == null)
                    continue;
                if (item.name == name) {
                    index = i;
                    break;
                }
            }
            temaData.c_index = index;
        }
        var data = { teamData: temaData, arrTeamConfig: self.arrTeamConfig, cbUpdateTeam: Handler.create(self, self.onUpdateTeamData) };
        UIManager.getInstance().showUI(CardGroupSetView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
    };
    CardGroupView.prototype.onUpdateTeamData = function (data) {
        this.changeBattleTeam(data);
    };
    //当选择组队列表中的选项
    CardGroupView.prototype.onChooseTeamListItem = function (index) {
        var self = this;
        var obj = self.arrTeamList[index];
        var data = obj.data;
        var sendData = true;
        if (data != null && data.c_index != null && data.battle != null && data.battle != 0)
            sendData = false;
        if (sendData) {
            var fIndex = -1;
            for (var i = 0, lengthI = self.arrTeamList.length; i < lengthI; i++) {
                var item = self.arrTeamList[i];
                if (item == null)
                    continue;
                var dataI = item.data;
                if (dataI != null) {
                    var battle = dataI.battle;
                    if (battle != null && battle == 1) {
                        fIndex = i;
                        break;
                    }
                }
            }
            if (fIndex == index)
                sendData = false;
        }
        if (sendData) {
            //发送切换战斗队伍请求
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_CHANGE_BATTLE_TEAM, { c_index: index });
        }
        else {
            UIManager.getInstance().hideUI(FilterView);
        }
    };
    //当点击卡牌
    CardGroupView.prototype.onClickCardItem = function (index) {
        var self = this;
        if (self.arrCardItem == null)
            return;
        var view = self.arrCardItem[index];
        if (view == null || view.getType() == null || view.getType() != 1)
            return;
        // UIManager.getInstance().showUI(CardGroupSetView);
        self.showCardGroupSetView();
    };
    //设置用户数据
    CardGroupView.prototype.setUserInfo = function () {
        var self = this;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        self.onUpdateAccountData(false);
        // self.prbLv.value = Number((exp/upexp*100).toFixed(2));
        // if(self.groupIcon.numChildren<=0){
        //头像圆形遮罩
        // if(self.iconMaskShape==null){
        //     var iconMaskShape = new egret.Shape();
        //     iconMaskShape.graphics.beginFill( 0x000000);
        //     var width:number = self.groupIcon.width/2;
        //     var height:number = self.groupIcon.height/2;
        //     iconMaskShape.x = width;
        //     iconMaskShape.y = height;
        //     iconMaskShape.graphics.drawCircle( 0, 0,  width);
        //     iconMaskShape.graphics.endFill();
        //     self.groupIcon.addChild(iconMaskShape);
        //     self.iconMaskShape = iconMaskShape;
        // }
        self.imgIcon.source = accountData.getHead_Url();
        // if(self.iconMaskShape!=null)
        //     self.imgIcon.mask = self.iconMaskShape;
        //   var iconUrl:string = accountData.getHead_Url();
        // var iconUrl:string = "http://dl.bbs.9game.cn/attachments/forum/202002/24/163438cmy1qemiieaefmym.png";
        // if(iconUrl!=null&&iconUrl!=""){
        //     var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        //     egret.ImageLoader.crossOrigin = "anonymous";
        //     imgLoader.load(iconUrl);
        //     imgLoader.once(egret.Event.COMPLETE, self.onLoadImgCompleteHandler, self);
        //     imgLoader.once(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent){
        //     console.log("加载网络图片:"+iconUrl+" 出现错误!")},self);
        // }
        // }        
    };
    // //当load网络图片完成事件
    // private onLoadImgCompleteHandler(evt: egret.Event): void {
    //     var self = this;
    //     if (evt.currentTarget.data) {
    //         // egret.log("加载头像成功: " + evt.currentTarget.data);
    //         let texture = new egret.Texture();
    //         texture.bitmapData = evt.currentTarget.data;
    //         let bitmap = new egret.Bitmap(texture);
    //         bitmap.x = 0;
    //         bitmap.y = 0;
    //         bitmap.width = self.groupIcon.width;
    //         bitmap.height = self.groupIcon.height;
    //         self.groupIcon.addChild(bitmap);
    //         if(self.iconMaskShape!=null)
    //             bitmap.mask = self.iconMaskShape;
    //     }
    // }
    //设置卡组属性
    CardGroupView.prototype.setCardGroupAttribute = function (costStr, hp, atk, ele) {
        var self = this;
        self.lblCCost.text = costStr;
        self.lblCHp.text = hp + "";
        self.lblCAtk.text = atk + "";
        self.lblCEle.text = ele;
        self.lblCCapacity.text = (hp + atk) + "";
        // self.lblCFetters.text = fetters;
    };
    //设置组成羁绊
    CardGroupView.prototype.setFromFetter = function (fetters) {
        this.lblCFetters.text = fetters;
    };
    //设置卡组名称
    CardGroupView.prototype.setCardGroupName = function (name) {
        var self = this;
        self.lblCGName.text = name;
        // var width:number = 34+self.lblCGName.width;
        // width = width>200?200:width;
        // self.imgCGBG.width = width;
    };
    CardGroupView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_GET_TEAM_CONFIG://获取队伍配置
                self.initTeamConfig(data);
                self.sendGetTeamList();
                break;
            case HallCmdDef.CMD_GET_TEAM_LIST://获取队伍列表
                self.initTeamData(data);
                break;
            case HallCmdDef.CMD_CHANGE_BATTLE_TEAM://切换战斗队伍
                self.changeBattleTeam(data);
                UIManager.getInstance().hideUI(FilterView);
                break;
            case HallCmdDef.CMD_GET_FROM_FETTER_TEAM://获取队伍组成羁绊
                self.onGetTeamFromFetters(data);
                break;
        }
    };
    //发送获取队伍列表
    CardGroupView.prototype.sendGetTeamList = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        var reqCmd = HallCmdDef.CMD_GET_TEAM_LIST;
        if (self.arrTeamConfig == null) {
            reqCmd = HallCmdDef.CMD_GET_TEAM_CONFIG;
        }
        HttpManager.getInstance().send(centerServer.getSname(), reqCmd, new Object());
    };
    //发送获取队伍组成羁绊
    CardGroupView.prototype.sendGetTeamFromFetters = function (codes) {
        if (codes == null || codes.length <= 0)
            return;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_FROM_FETTER_TEAM, { codes: codes }, false);
    };
    //初始化组队配置
    CardGroupView.prototype.initTeamConfig = function (data) {
        if (data == null)
            return;
        var self = this;
        self.arrTeamConfig = data;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        var hMaxCount = 5;
        var hIndex = 0;
        var width = self.scrCardItem.width / hMaxCount;
        var gapX = -1;
        var vIndex = 0;
        for (var i = 0, lengthI = data.length; i < lengthI; i++) {
            var item = data[i];
            if (item == null)
                continue;
            var unlocklvl = item.unlocklvl;
            if (unlocklvl == null)
                continue;
            var type = 2;
            if (accountData != null && accountData.getLvl() >= unlocklvl) {
                type = 1;
            }
            var groupName = "groupCGCI_" + i;
            var obj = { type: type, sdata: unlocklvl, gname: groupName };
            var view = new CGCardItemView();
            view.initData(obj);
            self.groupCardItem.addChild(view);
            if (gapX == -1)
                gapX = width - view.getViewWidth() > 0 ? Math.floor((width - view.getViewWidth()) / (hMaxCount - 1)) : 0;
            view.x = hIndex * width + gapX;
            view.y = vIndex * (view.getViewHeight() + 10);
            ;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            self.arrCardItem.push(view);
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
    };
    CardGroupView.prototype.initTeamData = function (data) {
        if (data == null)
            return;
        var self = this;
        self.teamData = data;
        self.setTeamList(data.list);
        self.setTeamItem(data.curBattleTeam);
    };
    CardGroupView.prototype.setTeamItem = function (data) {
        // if(data==null)
        //     return;
        var self = this;
        self.removeCardItem();
        var curBattleTeam = data;
        // self.curBattleTeam = curBattleTeam;
        for (var i = 0, lengthI = self.arrTeamConfig.length; i < lengthI; i++) {
            var itemConfig = self.arrTeamConfig[i];
            if (itemConfig == null)
                continue;
            var codeC = itemConfig.code;
            if (curBattleTeam != null && curBattleTeam[codeC] != null) {
                var itemBT = curBattleTeam[codeC];
                self.setCardItem(i, itemBT);
            }
        }
        var name = curBattleTeam != null ? curBattleTeam.name : "";
        if (name == null || name == "") {
            var cIndex = curBattleTeam != null ? curBattleTeam.c_index : 0;
            cIndex = cIndex == null ? 0 : cIndex;
            var tl = self.arrTeamList[cIndex];
            if (tl != null) {
                name = tl.name;
            }
        }
        self.setCardGroupName(name);
        self.updateCardGroupAttribute();
    };
    CardGroupView.prototype.updateCardGroupAttribute = function () {
        var self = this;
        var tHp = 0;
        var tAtk = 0;
        var tCosk = 0;
        var fele = "";
        var sele = "";
        var codes = new Array();
        for (var i = 0, lengthI = self.arrCardItem.length; i < lengthI; i++) {
            var item = self.arrCardItem[i];
            if (item == null || item.getCardData() == null)
                continue;
            var cardData = item.getCardData();
            var code = cardData.code;
            codes.push(code);
            var hp = cardData.hp;
            var atk = cardData.atk;
            var cost = cardData.cost;
            var ele = cardData.element;
            tHp += hp;
            tAtk += atk;
            tCosk += cost;
            if (i < 5)
                fele += PublicMethodManager.getInstance().getCardElement(ele);
            else
                sele += PublicMethodManager.getInstance().getCardElement(ele);
        }
        var accountData = GlobalDataManager.getInstance().getAccountData();
        self.setCardGroupAttribute(tCosk + "/" + accountData.getCost(), tHp, tAtk, fele + "\n" + sele);
        if (codes.length <= 0) {
            self.setFromFetter("");
        }
        else {
            self.sendGetTeamFromFetters(codes);
        }
    };
    CardGroupView.prototype.setTeamList = function (data) {
        if (data == null)
            return;
        var self = this;
        self.arrTeamList = self.arrDefaultTeamList;
        var lengthI = data.length;
        for (var i = 0; i < lengthI; i++) {
            var item = data[i];
            if (item == null)
                continue;
            var cIndex = item.c_index;
            var obj = self.arrTeamList[cIndex];
            if (obj == null)
                continue;
            obj.name = item.name;
            obj.data = item;
        }
    };
    CardGroupView.prototype.changeBattleTeam = function (data) {
        if (data == null)
            return;
        var self = this;
        self.setTeamItem(data);
        var cIndex = data.c_index;
        if (self.arrTeamList != null) {
            var lengthI = self.arrTeamList.length;
            for (var i = 0; i < lengthI; i++) {
                var item = self.arrTeamList[i];
                if (item == null)
                    continue;
                var objData = item.data;
                var battle = 0;
                if (i == cIndex) {
                    battle = 1;
                    if (data.name != null)
                        item.name = data.name;
                }
                if (objData.battle == null || objData.battle != battle) {
                    objData.battle = battle;
                }
            }
        }
        if (self.teamData != null) {
            self.teamData["curBattleTeam"] = data;
        }
    };
    //设置卡牌
    CardGroupView.prototype.setCardItem = function (index, data) {
        var self = this;
        if (self.arrCardItem == null)
            return;
        var cardItem = self.arrCardItem[index];
        if (cardItem == null)
            return;
        var obj = { type: 0, sdata: data };
        cardItem.updateShow(obj);
    };
    CardGroupView.prototype.removeCardItem = function () {
        var self = this;
        if (self.arrCardItem == null)
            return;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        for (var i = 0, lengthI = self.arrCardItem.length; i < lengthI; i++) {
            var item = self.arrCardItem[i];
            if (item == null)
                continue;
            var type = 2;
            var cItem = self.arrTeamConfig[i];
            if (cItem == null)
                continue;
            var unlocklvl = cItem.unlocklvl;
            if (accountData != null && accountData.getLvl() >= unlocklvl) {
                type = 1;
            }
            var obj = { type: type, sdata: unlocklvl };
            item.updateShow(obj);
        }
    };
    //获取队伍组成羁绊
    CardGroupView.prototype.onGetTeamFromFetters = function (data) {
        if (data == null)
            return;
        var self = this;
        var fetters = data.fetters;
        var str = "";
        if (fetters != null) {
            for (var key in fetters) {
                var fetter = fetters[key];
                if (fetter == null)
                    continue;
                var name = fetter.name;
                str += (name + "\n");
            }
        }
        self.setFromFetter(str);
    };
    CardGroupView.prototype.onUpdateAccountData = function (dispatchEvent) {
        if (dispatchEvent === void 0) { dispatchEvent = true; }
        var self = this;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        self.lblLvl.text = accountData.getLvl() + "";
        var exp = accountData.getExp();
        var upexp = accountData.getUpexp();
        self.lblExpProgress.text = exp + "/" + upexp;
        self.prbExp.value = Math.floor(exp / upexp * 100);
        self.lblHp.text = accountData.getHp() + "";
        var cost = self.lblCCost.text;
        if (cost != "") {
            var arrStr = cost.split('/');
            if (arrStr != null && arrStr.length == 2) {
                self.lblCCost.text = arrStr[0] + "/" + accountData.getCost();
            }
        }
        self.updateCardItem();
        if (dispatchEvent)
            GameEventManager.getInstance().dispatchEvent(HallEvent.updateUserInfo);
    };
    CardGroupView.prototype.updateCardItem = function () {
        var self = this;
        if (self.arrCardItem == null || self.arrCardItem.length <= 0)
            return;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        for (var i = 0, lengthI = self.arrCardItem.length; i < lengthI; i++) {
            var item = self.arrCardItem[i];
            if (item == null || item.getType() != 2)
                continue;
            var type = 2;
            var cItem = self.arrTeamConfig[i];
            if (cItem == null)
                continue;
            var unlocklvl = cItem.unlocklvl;
            if (accountData != null && accountData.getLvl() >= unlocklvl) {
                type = 1;
            }
            var obj = { type: type, sdata: unlocklvl };
            item.updateShow(obj);
        }
    };
    CardGroupView.prototype.getCardGroupGroup = function () {
        return this.groupCardGroup;
    };
    CardGroupView.prototype.getCGEditBtn = function () {
        return this.btnCGEdit;
    };
    CardGroupView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupCardGroup == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupCardGroup.scaleX =
                self.groupCardGroup.scaleY = 1;
            return;
        }
        self.groupCardGroup.scaleX =
            self.groupCardGroup.scaleY = gapNum;
    };
    CardGroupView.NAME = "CardGroupSkin";
    return CardGroupView;
}(BaseView));
__reflect(CardGroupView.prototype, "CardGroupView");
//# sourceMappingURL=CardGroupView.js.map