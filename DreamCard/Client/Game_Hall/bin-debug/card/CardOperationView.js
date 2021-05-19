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
var CardOperationView = (function (_super) {
    __extends(CardOperationView, _super);
    function CardOperationView() {
        var _this = _super.call(this, CardOperationView.NAME) || this;
        _this.bagItemChoose = 1;
        _this.arrBtnGroup = new Array(); //列表存储
        _this.arrSkillList = new Array(); //技能组
        _this.curBtnIndex = -1;
        _this.cardAttrInit = false;
        _this.cardFetterInit = false;
        _this.cardShowInit = false;
        _this.arrFetterItemView = new Array();
        _this.arrAttrList = new Array();
        _this.arrAttrLine = new Array();
        _this.isTouchMove = false;
        _this.curCardView = null;
        _this.myCardView = null;
        _this.skillAry = [];
        _this.skillOpenAry = [];
        _this.unlockOpenAry = [];
        _this.ckjTxt = "参考价:";
        _this.daijTxt = "代";
        _this.xingjTxt = "星";
        _this.zhudongTxt = "主动技能";
        _this.beidongTxt = "被动技能";
        _this.jiesuoTxt = "解锁";
        _this.weijiesuojTxt = "未解锁";
        return _this;
    }
    CardOperationView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBegin, self);
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            self.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEnd, self);
        }
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.ckjTxt = "Reference Price： ";
            self.daijTxt = "Gen";
            this.xingjTxt = "Star";
            this.zhudongTxt = "Active Skill";
            this.beidongTxt = "Passive Skill";
            this.jiesuoTxt = "Unlocked";
            this.weijiesuojTxt = "Locked";
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.rarityObj = data;
        self.setCardInfo(self.rarityObj);
        self.setCurRightGroupShow(0);
        if (UIManager.getInstance().checkHasViewByName(GuideView))
            GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
    };
    CardOperationView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.myCardView = null;
        self.cleanArray([self.cardSquareView]);
        self.cleanArray(self.arrSkillList);
        if (self.cardFetterInit) {
            self.cardFetterInit = false;
            self.cleanArray(self.arrFetterItemView);
        }
        if (self.cardShowInit) {
            self.cardShowInit = false;
            self.cleanArray([self.cardRectangleView]);
        }
        if (self.cardAttrInit) {
            self.cleanArrayLabel(self.arrAttrList);
            self.cleanArrayShape(self.arrAttrLine);
        }
    };
    CardOperationView.prototype.cleanArray = function (arr) {
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
    CardOperationView.prototype.cleanArrayLabel = function (arr) {
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
    CardOperationView.prototype.cleanArrayShape = function (arr) {
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
    CardOperationView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            var defx = 62;
            var defy = 0;
            if (btn == self.btnClose) {
                self.hiden();
            }
            else if (btn == self.btnLvlUp) {
                if (this.upBagInfo["bag1"] != null && this.upBagInfo["bag1"].count > 0) {
                    self.ImgChoose.x = self.btnUserItem0.x + defx;
                    self.ImgChoose.y = self.btnUserItem0.y - defy;
                    self.bagItemChoose = 1;
                }
                else if (this.upBagInfo["bag2"] != null && this.upBagInfo["bag2"].count > 0) {
                    self.ImgChoose.x = self.btnUserItem1.x + defx;
                    self.ImgChoose.y = self.btnUserItem1.y - defy;
                    self.bagItemChoose = 2;
                }
                else if (this.upBagInfo["bag3"] != null && this.upBagInfo["bag3"].count > 0) {
                    self.ImgChoose.x = self.btnUserItem2.x + defx;
                    self.ImgChoose.y = self.btnUserItem2.y - defy;
                    self.bagItemChoose = 3;
                }
                else {
                    self.ImgChoose.x = self.btnUserItem0.x + defx;
                    self.ImgChoose.y = self.btnUserItem0.y - defy;
                    self.bagItemChoose = 1;
                }
                this.setCurRightGroupShow(4);
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (btn == self.btnGeneUp) {
                self.bagItemChoose = 4;
                this.setCurRightGroupShow(5);
            }
            else if (btn == self.btnZhanshi) {
                this.setCurRightGroupShow(1);
            }
            else if (btn == self.btnUserItem0) {
                self.ImgChoose.x = btn.x + defx;
                self.ImgChoose.y = btn.y - defy;
                self.bagItemChoose = 1;
            }
            else if (btn == self.btnUserItem1) {
                self.ImgChoose.x = btn.x + defx;
                self.ImgChoose.y = btn.y - defy;
                self.bagItemChoose = 2;
            }
            else if (btn == self.btnUserItem2) {
                self.ImgChoose.x = btn.x + defx;
                self.ImgChoose.y = btn.y - defy;
                self.bagItemChoose = 3;
            }
            else if (btn == self.btnUserItem) {
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                if (this.upBagInfo["bag1"] != null && this.upBagInfo["bag2"] != null && this.upBagInfo["bag3"] != null) {
                    if ((this.upBagInfo["bag1"].count + this.upBagInfo["bag2"].count + this.upBagInfo["bag3"].count) <= 0) {
                        PopManager.getInstance().showPromptBox("道具不足,请前往商城购买!", 2, Handler.create(self, function (confirm) {
                            self.hiden();
                            UIManager.getInstance().showUI(MallView);
                        }));
                        return;
                    }
                }
                var data = this.upBagInfo["bag" + self.bagItemChoose];
                if (data == null)
                    return;
                var obj = new Object();
                if (data["count"] > 0) {
                    this.upLvlByBag(1, data["propCode"]);
                }
            }
            else if (btn == self.btnUseGeneItem) {
                var data = this.upBagInfo["bag4"];
                if (data == null)
                    return;
                self.bagItemChoose = 4;
                if (data["count"] > 0) {
                    this.upLvlByBag(2, data["propCode"]);
                }
            }
        }
        var tar = event.target;
        if (tar instanceof eui.Image) {
            if (tar == self.imgAttribute) {
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(0);
            }
            else if (tar == self.imgFetter) {
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(2);
            }
            else if (tar == self.imgShow) {
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(1);
            }
            else if (tar == self.imgSell) {
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(3);
            }
        }
    };
    CardOperationView.prototype.setImgBtnBg = function (index) {
        var skillAry = [this.imgAttribute, this.imgShow, this.imgFetter, this.imgSell];
        for (var i = 0; i < 4; i++) {
            if (index != i)
                skillAry[i].source = "hallBtn1Sheet_json.a86x114_0";
            else
                skillAry[i].source = "hallBtn1Sheet_json.a86x114_1";
        }
        if (index == 1)
            this.kuang.$setVisible(false);
        else
            this.kuang.$setVisible(true);
    };
    // 向服务器发送请求： 使用道具升级卡牌
    CardOperationView.prototype.upLvlByBag = function (type, propCode) {
        var obj = new Object();
        obj["type"] = type;
        obj["code"] = this.code;
        obj["propCode"] = propCode;
        obj["itemIdx"] = this.bagItemChoose;
        obj["usetype"] = true;
        obj["count"] = 1;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_UPGRADE_CARD, obj, true);
    };
    CardOperationView.prototype.touchBegin = function (event) {
        var self = this;
        if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name.substr(0, 11) == "groupSkill_") {
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                var obj = this.skillAry[cIndex];
                var isOpen = this.skillOpenAry[cIndex];
                // 设置技能说明
                if (obj != null) {
                    this.groupSkillExplain.visible = true;
                    this.groupSkillExplain.x = this.groupLeft.x + this.groupSkillList.x + this.arrSkillList[cIndex].x + 72;
                    this.groupSkillExplain.y = this.groupLeft.y + this.groupSkillList.y + this.arrSkillList[cIndex].y - 12;
                    this.labSkillName.text = obj["name"] + " Lv. " + obj["level"];
                    this.labSkillExplain.text = obj["desc"];
                    this.labeffect.text = "无";
                    if (obj["type"] == "1") {
                        this.labSkillType.text = this.zhudongTxt;
                        this.labSkillType.textColor = 0xFC0C3A;
                    }
                    else {
                        this.labSkillType.text = this.beidongTxt;
                        this.labSkillType.textColor = 0x8DD3FF;
                    }
                    if (isOpen == 1) {
                        this.labLockState.text = this.jiesuoTxt;
                    }
                    else {
                        this.labLockState.text = this.weijiesuojTxt;
                    }
                }
            }
        }
    };
    CardOperationView.prototype.touchEnd = function (event) {
        var self = this;
        this.groupSkillExplain.visible = false;
    };
    CardOperationView.prototype.setCardName = function (str) {
        this.labCardName.text = str;
    };
    CardOperationView.prototype.setCardView = function (data) {
        var view = this.myCardView;
        if (view == null) {
            view = new CardSquareView();
        }
        view.initData(data);
        view.scaleX = view.scaleY = this.groupCardView.width / view.width;
        this.groupCardView.addChild(view);
        view.x = 0;
        view.y = 0;
        // 设置升星进度条
        var exprate = 100 * this.cardInfo["exp"] / this.upLvlInfo["allexp"];
        this.prbLoading0["value"] = exprate;
        // 设置价格
        this.labPrice.text = this.ckjTxt + (parseInt(data["val_initial"]) + parseInt(data["val_growing"])) + " XWG";
    };
    CardOperationView.prototype.setimgGene = function (index) {
        switch (index) {
            case 1:
                this.imgGene.source = "hallText0Sheet_json.daishu1";
                break;
            case 2:
                this.imgGene.source = "hallText0Sheet_json.daishu2";
                break;
            case 3:
                this.imgGene.source = "hallText0Sheet_json.daishu3";
                break;
        }
    };
    CardOperationView.prototype.setgroupStar = function (index) {
        index = ExternalFun.prototype.levelnumTo5lvl(index);
        //背景
        this.groupStar.removeChildren();
        for (var i = 0; i < 5; i++) {
            var img = new eui.Image("newcardpanel_json.star0");
            this.groupStar.addChild(img);
            img.x = i * 35;
            img.y = -23;
        }
        // 星星显示
        for (var i = 0; i < index; i++) {
            var img = null;
            if (i < index - 1) {
                img = new eui.Image("newcardpanel_json.star1");
            }
            else {
                img = new eui.Image("newcardpanel_json.star2");
            }
            this.groupStar.addChild(img);
            img.x = i * 35;
            img.y = -23;
        }
    };
    // 初始化界面
    CardOperationView.prototype.setCardInfo = function (data) {
        if (data == null)
            return;
        var cardDetail = data["cardDetail"];
        this.code = data["code"];
        this.curCardView = data["viewhandle"];
        if (cardDetail != null) {
            var attribute = cardDetail["attribute"];
            if (attribute != null) {
                this.setAttribute(attribute); // 属性面板           
            }
        }
        data["canTouch"] = false;
        this.cardInfo = cardDetail["attribute"];
        this.cardJBInfo = cardDetail["fetters"];
        this.upLvlInfo = cardDetail["myupLvl"];
        this.upBagInfo = cardDetail["mybag"]; //
        this.setCardView(this.cardInfo);
        this.setCardName(this.cardInfo["name"]);
        this.setimgGene(this.cardInfo["generation"]);
        this.setgroupStar(this.cardInfo["level"]);
        // var skillobj = cardDetail["myskill"]; // 技能详情
        // this.skillAry = [skillobj["skil1"],skillobj["skil2"],skillobj["skil3"],skillobj["skil4"]];
        var skillobj = cardDetail["skills"]; // 技能详情
        this.skillAry = [skillobj["skil_1"], skillobj["skil_2"], skillobj["skil_3"], skillobj["skil_4"]];
        var skillOpenobj = cardDetail["skillopen"]; // 是否解锁
        this.skillOpenAry = [skillOpenobj["skillopen_1"], skillOpenobj["skillopen_2"], skillOpenobj["skillopen_3"], skillOpenobj["skillopen_4"]];
        var UnlockSkillConfig = [];
        for (var k = 0; k < cardDetail["UnlockSkillConfig"]["length"]; k++) {
            var obj = cardDetail["UnlockSkillConfig"][k];
            var curIdx = obj["sklIndex"];
            UnlockSkillConfig[curIdx] = obj;
        }
        this.unlockOpenAry = [UnlockSkillConfig[1], UnlockSkillConfig[2], UnlockSkillConfig[3], UnlockSkillConfig[4]]; // 解锁标准
        this.setCardSkill(this.skillAry, this.skillOpenAry, this.unlockOpenAry, this.cardInfo["level"], this.cardInfo["generation"]);
        this.setGroupLvlUp(this.cardInfo); // 升星
        this.refreshUpBtns();
    };
    CardOperationView.prototype.refreshUpBtns = function () {
        if (this.cardInfo["level"] >= 15 || this.cardInfo["generation"] >= 4) {
            this.btnUserItem.enabled = false;
            this.btnGeneUp.enabled = false;
            this.btnLvlUp.enabled = false;
            this.btnUseGeneItem.enabled = false;
            return;
        }
        // 如果leve 大于 generation*5 则可以升阶了
        if (this.cardInfo["generation"] * 5 <= this.cardInfo["level"]) {
            // 升阶按钮这时候能用
            this.btnUserItem.enabled = false;
            this.btnGeneUp.enabled = true;
            this.btnLvlUp.enabled = false;
            this.btnUseGeneItem.enabled = true;
        }
        else {
            this.btnUserItem.enabled = true;
            this.btnGeneUp.enabled = false;
            this.btnLvlUp.enabled = true;
            this.btnUseGeneItem.enabled = false;
        }
    };
    CardOperationView.prototype.setImgEXP = function (cur, max) {
        this.imgCurEXP.width = this.imgMaxEXP.width * cur / max;
    };
    CardOperationView.prototype.setCardSkill = function (arr, arropen, unlockarr, mylvl, mygene) {
        this.groupSkillList.removeChildren();
        var idx = 0;
        for (var i = 0; i < 4; i++) {
            var data = { icon: "", level: "", canTouch: true, groupName: "groupSkill_" + i };
            if (arr[i] != null) {
                data = { icon: arr[i]["icon"], level: arr[i]["level"], canTouch: true, groupName: "groupSkill_" + i };
            }
            var view = new CardSkillView();
            view.initData(data);
            this.groupSkillList.addChild(view);
            this.arrSkillList[i] = view;
            if (idx > 1)
                idx = idx - 2;
            view.x = idx * 85;
            view.y = Math.floor(i / 2) * 82;
            idx++;
            if (arr[i] != null) {
                // 上锁图片
                var lockstr = this.judjeSkillLock(i, mylvl, mygene, unlockarr);
                if (arropen[i] == 0) {
                    var shapeImg = new eui.Image();
                    this.groupSkillList.addChild(shapeImg);
                    shapeImg.source = "newcardpanel_json.suo";
                    shapeImg.x = view.x;
                    shapeImg.y = view.y;
                    shapeImg.touchEnabled = false;
                    var labLockstr = new eui.Label();
                    this.groupSkillList.addChild(labLockstr);
                    labLockstr.x = view.x + 5;
                    labLockstr.y = view.y;
                    labLockstr.width = view.width - 10;
                    labLockstr.height = view.height;
                    labLockstr.textAlign = "center";
                    labLockstr.verticalAlign = "middle";
                    labLockstr.lineSpacing = 5;
                    labLockstr.fontFamily = "SimHei";
                    labLockstr.size = 18;
                    labLockstr.text = lockstr;
                    labLockstr.touchEnabled = false;
                }
            }
            else {
                var emptyImg = new eui.Image();
                this.groupSkillList.addChild(emptyImg);
                emptyImg.source = "hallText0Sheet_json.jineng0";
                emptyImg.x = view.x;
                emptyImg.y = view.y;
            }
        }
    };
    CardOperationView.prototype.judjeSkillLock = function (idx, lvl, gene, unlockarr) {
        var str = "";
        str = unlockarr[idx]["gen"] + this.daijTxt + unlockarr[idx]["star"] + this.xingjTxt + this.jiesuoTxt;
        return str;
    };
    // 接收
    CardOperationView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_UPGRADE_CARD:
                self.onUpgradeCardComplete(data);
                break;
        }
    };
    //设置属性
    CardOperationView.prototype.setAttribute = function (data) {
        var rarity = data["rarity"];
        var rarityStr = PublicMethodManager.getInstance().getCardRarity(rarity);
        var generation = data["generation"];
        var level = ExternalFun.prototype.levelnumTo5lvl(data["level"]);
        var glStr = generation + this.daijTxt + level + this.xingjTxt;
        var atk = data["atk"];
        var hit = data["hit"];
        var hp = data["hp"];
        var agl = data["agl"];
        var att = data["att"];
        var cri_chance = data["cri_chance"];
        var cri_multiplier = data["cri_multiplier"];
        var rgn = data["rgn"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            this.setGroupAttrList({ "Quality": rarityStr, "Lv": glStr, "Power": (atk + hp), "Waiting": att, "HP": hp, "Atk": atk, "Accuracy": hit, "Dodge Rate": agl, "Crit Rate": cri_chance, "Crit Multipler": cri_multiplier, "Recovery": rgn });
        }
        else {
            this.setGroupAttrList({ "品质": rarityStr, "星级": glStr, "战力": (atk + hp), "等待回合": att, "生命": hp, "攻击": atk, "命中率": hit, "闪避率": agl, "暴击率": cri_chance, "暴击倍数": cri_multiplier, "回复": rgn });
        }
    };
    CardOperationView.prototype.setCurRightGroupShow = function (index) {
        if (this.curBtnIndex == index) {
            return;
        }
        this.curBtnIndex = index;
        switch (index) {
            case 1:
                this.setGroupShow();
                break;
            case 2:
                if (!this.cardFetterInit) {
                    this.setGroupFetter();
                }
                break;
            case 3:
                this.setGroupSold();
                break;
        }
        this.groupAttrList.visible = index == 0;
        this.scrAttrListPanel.visible = index == 0;
        this.scrAttrList.visible = index == 0;
        this.groupShow.visible = index == 1;
        this.groupFetter.visible = index == 2;
        this.scrFetterPanel.visible = index == 2;
        this.scrFetter.visible = index == 2;
        this.groupShopPanel.visible = index == 3;
        this.groupLvlUp.visible = index == 4;
        this.groupGeneUp.visible = index == 5;
        this.groupGeneUpPanel.visible = index == 5;
        this.setImgBtnBg(index);
    };
    CardOperationView.prototype.setGroupAttrList = function (attrList) {
        this.cardAttrInit = true;
        var index = 0;
        this.cleanArrayLabel(this.arrAttrList);
        this.cleanArrayShape(this.arrAttrLine);
        for (var key in attrList) {
            var def = index % 2;
            var attrKey = new eui.Label();
            attrKey.x = def * 240 + 54;
            attrKey.y = 60 * Math.floor(index / 2) + 42;
            attrKey.textColor = 0x8bc2d5;
            attrKey.textAlign = "left";
            attrKey.fontFamily = "SimHei";
            attrKey.size = 26;
            attrKey.text = key + "：";
            this.groupAttrList.addChild(attrKey);
            var attrValue = new eui.Label();
            attrValue.x = def * 230 + 54 + attrKey.width;
            attrValue.y = 60 * Math.floor(index / 2) + 42;
            attrValue.textColor = 0xffffff;
            attrValue.textAlign = "left";
            attrValue.fontFamily = "SimHei";
            attrValue.size = 26;
            attrValue.stroke = 1;
            attrValue.text = attrList[key];
            this.groupAttrList.addChild(attrValue);
            this.arrAttrList.push(attrKey);
            this.arrAttrList.push(attrValue);
            index++;
        }
    };
    CardOperationView.prototype.setGroupShow = function () {
        this.cardShowInit = true;
        var data = this.cardInfo;
        var view = new CardRectangleView();
        view.initData(data);
        view.scaleX = this.groupCardShow.width / view.width;
        view.scaleY = this.groupCardShow.height / view.height;
        this.groupCardShow.addChild(view);
        this.groupCardShow.$setVisible(true);
        view.x = -8;
        view.y = 0;
        this.cardRectangleView = view;
    };
    // 设置羁绊
    CardOperationView.prototype.setGroupFetter = function () {
        this.cardFetterInit = true;
        var data1 = this.cardInfo;
        this.scrFetter.scrollPolicyH = "OFF";
        this.cleanArray(this.arrFetterItemView);
        var aa = GlobalDataManager.getInstance().getJiBanData();
        var arr = this.cardJBInfo;
        var jblist = [];
        var yy = 0;
        for (var i = 0; i < arr["length"]; i++) {
            var obj = arr[i];
            var view = new CardFetterItemView();
            var data = { hero: this.cardInfo["name"], name: obj["name"], desc: obj["desc"], icon: obj["icon"], color: obj["color"], zc: obj["zc"] };
            view.initData(data);
            this.groupFetter.addChild(view);
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.x = 22;
            view.y = yy;
            yy = yy + view.height + 17;
            this.arrFetterItemView.push(view);
        }
    };
    CardOperationView.prototype.setGroupLvlUp = function (data) {
        // 设置星级
        this.lvUp_level.text = this.cardInfo["generation"] + this.daijTxt + ExternalFun.prototype.levelnumTo5lvl(this.cardInfo["level"]) + this.xingjTxt;
        this.labExp.text = this.cardInfo["exp"] + "/" + this.upLvlInfo["allexp"];
        this.labExp_left.text = this.cardInfo["exp"] + "/" + this.upLvlInfo["allexp"];
        // 初始化图片
        this.btnUserItem0["imgIcon"].source = "propSheet_json.1";
        this.btnUserItem1["imgIcon"].source = "propSheet_json.2";
        this.btnUserItem2["imgIcon"].source = "propSheet_json.3";
        this.BtnGeneUpItem["imgItem"].source = "propSheet_json.5";
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            this.btnUserItem0["lblName"].text = "Exp book";
            this.btnUserItem1["lblName"].text = "Exp stone";
            this.btnUserItem2["lblName"].text = "Exp potions";
        }
        else {
            this.btnUserItem0["lblName"].text = "经验书";
            this.btnUserItem1["lblName"].text = "经验石";
            this.btnUserItem2["lblName"].text = "经验药水";
        }
        //
        if (this.upBagInfo["bag1"] != null) {
            this.btnUserItem0["imgIcon"].source = "propSheet_json." + this.upBagInfo["bag1"].resUrl;
            this.btnUserItem0["lblCount"].text = this.upBagInfo["bag1"].count;
            this.btnUserItem0["lblName"].text = this.upBagInfo["bag1"].name;
        }
        if (this.upBagInfo["bag2"] != null) {
            this.btnUserItem1["imgIcon"].source = "propSheet_json." + this.upBagInfo["bag2"].resUrl;
            this.btnUserItem1["lblCount"].text = this.upBagInfo["bag2"].count;
            this.btnUserItem1["lblName"].text = this.upBagInfo["bag2"].name;
        }
        if (this.upBagInfo["bag3"] != null) {
            this.btnUserItem2["imgIcon"].source = "propSheet_json." + this.upBagInfo["bag3"].resUrl;
            this.btnUserItem2["lblCount"].text = this.upBagInfo["bag3"].count;
            this.btnUserItem2["lblName"].text = this.upBagInfo["bag3"].name;
        }
        if (this.upBagInfo["bag4"] != null) {
            this.BtnGeneUpItem["imgItem"].source = "propSheet_json." + this.upBagInfo["bag4"].resUrl;
            this.BtnGeneUpItem["labItemNum"].text = this.upBagInfo["bag4"].count;
            this.labGeneUpItem.text = this.upBagInfo["bag4"].name;
        }
    };
    CardOperationView.prototype.setGroupSold = function () {
    };
    CardOperationView.prototype.onUpgradeCardComplete = function (data) {
        if (data == null)
            return;
        var self = this;
        var idx = data["itemIdx"];
        var cardData = data["msg"];
        self.bagItemChoose = idx;
        self.upBagInfo["bag" + self.bagItemChoose].count = data["bagNum"];
        self.cardInfo["exp"] = cardData["exp"];
        self.upLvlInfo["allexp"] = data["allexp"];
        self.cardInfo["generation"] = cardData["gen"];
        self.cardInfo["level"] = cardData["level"]; // 做转换
        self.cardInfo["val_initial"] = cardData["valInitial"];
        self.cardInfo["val_growing"] = cardData["valGrowing"];
        var cardDetail = self.rarityObj["cardDetail"];
        var attribute = cardDetail["attribute"];
        attribute["atk"] = cardData["atk"];
        attribute["hp"] = cardData["hp"];
        self.setAttribute(attribute);
        self.skillOpenAry = [cardData["open_1"], cardData["open_2"], cardData["open_3"], cardData["open_4"]];
        // 刷新
        self.setGroupLvlUp(self.cardInfo);
        self.setCardView(self.cardInfo);
        self.setgroupStar(self.cardInfo["level"]);
        self.setimgGene(self.cardInfo["generation"]);
        self.setCardSkill(self.skillAry, self.skillOpenAry, self.unlockOpenAry, self.cardInfo["level"], self.cardInfo["generation"]);
        // 回调
        var cardview = self.curCardView;
        cardview.setLevel(self.cardInfo["level"]);
        cardview.setHp(self.cardInfo["hp"]);
        cardview.setAtk(self.cardInfo["atk"]);
        cardview.setGeneration(self.cardInfo["generation"]);
        self.refreshUpBtns();
        var obj = { propCode: data["propCode"], count: data["bagNum"] };
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateProp, obj);
    };
    CardOperationView.prototype.getCardOperationGroup = function () {
        return this.cardoperationgruop;
    };
    CardOperationView.prototype.getLvlUpBtn = function () {
        return this.btnLvlUp;
    };
    CardOperationView.prototype.getUserItemBtn = function () {
        return this.btnUserItem;
    };
    CardOperationView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.cardoperationgruop == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.cardoperationgruop.scaleX =
                self.cardoperationgruop.scaleY = 1;
            return;
        }
        self.cardoperationgruop.scaleX =
            self.cardoperationgruop.scaleY = gapNum;
    };
    CardOperationView.NAME = "CardOperationSkin";
    return CardOperationView;
}(BaseView));
__reflect(CardOperationView.prototype, "CardOperationView");
//# sourceMappingURL=CardOperationView.js.map