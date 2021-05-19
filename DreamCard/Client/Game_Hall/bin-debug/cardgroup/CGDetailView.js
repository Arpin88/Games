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
var CGDetailView = (function (_super) {
    __extends(CGDetailView, _super);
    function CGDetailView() {
        var _this = _super.call(this, CGDetailView.NAME) || this;
        _this.curTypeIndex = 0; //当前类型下标 0属性 1技能 2羁绊
        _this.arrFetterItemView = new Array(); //羁绊选项视图集合
        _this.arrSkillItemView = new Array(); //技能选项视图集合
        return _this;
    }
    CGDetailView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.initView();
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var cdata = data.cdata;
        if (cdata == null)
            return;
        var cardDetail = cdata.cardDetail;
        if (cardDetail != null) {
            var attribute = cardDetail.attribute;
            if (attribute != null) {
                self.setCard(attribute);
                self.setAttribute(attribute);
                self.cardName = attribute.name;
            }
            var skills = cardDetail.skills;
            if (skills != null) {
                self.setSkill(skills);
            }
            var fetters = cardDetail.fetters;
            if (fetters != null) {
                self.setFetter(fetters);
            }
        }
        self.cardCode = cdata.code;
        self.callBackRemove = data.cbRemove;
        self.btnUnload.visible = self.callBackRemove != null;
    };
    CGDetailView.prototype.initView = function () {
        var self = this;
        // self.curTypeIndex = 0;
        self.btnUnload.visible = true;
        self.callBackRemove = null;
        self.cardCode = "";
        self.cardName = "";
        self.selTypeGroup(0);
    };
    CGDetailView.prototype.sleep = function () {
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
        self.labelObj = null;
    };
    CGDetailView.prototype.cleanArray = function (arr) {
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
    CGDetailView.prototype.touchTap = function (event) {
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
        else if (tar instanceof eui.Image) {
            if (tar == self.imgAttribute) {
                SoundManager.getInstance().PlayClickSound();
                if (self.curTypeIndex != 0)
                    self.selTypeGroup(0);
            }
            else if (tar == self.imgSkill) {
                SoundManager.getInstance().PlayClickSound();
                if (self.curTypeIndex != 1)
                    self.selTypeGroup(1);
            }
            else if (tar == self.imgFetter) {
                SoundManager.getInstance().PlayClickSound();
                if (self.curTypeIndex != 2)
                    self.selTypeGroup(2);
            }
        }
    };
    //返回类型背景图片
    CGDetailView.prototype.getTypeBGImage = function (index) {
        var self = this;
        var img;
        if (index == 0) {
            img = self.imgAttribute;
        }
        else if (index == 1) {
            img = self.imgSkill;
        }
        else if (index == 2) {
            img = self.imgFetter;
        }
        return img;
    };
    //返回类型文本图片
    CGDetailView.prototype.getTypeLabelImage = function (index) {
        var self = this;
        var img;
        if (index == 0) {
            img = self.imgAttributeLabel;
        }
        else if (index == 1) {
            img = self.imgSkillLabel;
        }
        else if (index == 2) {
            img = self.imgFetterLabel;
        }
        return img;
    };
    //选择当前选择面板 0属性 1技能 2羁绊
    CGDetailView.prototype.selTypeGroup = function (index) {
        var self = this;
        var imgBG;
        var imgLabel;
        if (self.curTypeIndex != null) {
            imgBG = self.getTypeBGImage(self.curTypeIndex);
            if (imgBG != null) {
                imgBG.source = self.getImgSourcePrefix(imgBG) + "_0";
            }
            imgLabel = self.getTypeLabelImage(self.curTypeIndex);
            if (imgLabel != null) {
                imgLabel.source = self.getImgSourcePrefix(imgLabel) + "_0";
            }
        }
        self.curTypeIndex = index;
        imgBG = self.getTypeBGImage(self.curTypeIndex);
        if (imgBG != null) {
            imgBG.source = self.getImgSourcePrefix(imgBG) + "_1";
        }
        imgLabel = self.getTypeLabelImage(self.curTypeIndex);
        if (imgLabel != null) {
            imgLabel.source = self.getImgSourcePrefix(imgLabel) + "_1";
        }
        self.groupAttribute.visible = self.curTypeIndex == 0;
        self.groupSkill.visible = self.curTypeIndex == 1;
        self.groupFetter.visible = self.curTypeIndex == 2;
    };
    //返回图片资源前缀
    CGDetailView.prototype.getImgSourcePrefix = function (img) {
        var str = "";
        var sourceObj = img.source;
        var arr = sourceObj.toString().split(".");
        if (arr.length == 2) {
            var arrSource = arr[1].split("_");
            if (arrSource.length == 2) {
                str = arr[0] + "." + arrSource[0];
            }
        }
        return str;
    };
    //显示卡牌
    CGDetailView.prototype.setCard = function (data) {
        var self = this;
        var objData = data;
        objData["canTouch"] = false;
        // var data = {"icon":"caocao", "rarity":"common","element":"water","round":6, "generation" :1, level:1,"name":"诸葛村夫", "atk":66, "hp":66,"canTouch":false};
        var view = new CardRectangleView();
        view.initData(objData);
        view.horizontalCenter = "0";
        view.verticalCenter = "0";
        self.groupCard.addChild(view);
    };
    //设置属性
    CGDetailView.prototype.setAttribute = function (data) {
        var self = this;
        var txt0 = null;
        if (self.attributeTextField0 == null) {
            txt0 = new egret.TextField();
            txt0.textColor = 0xffffff;
            txt0.size = 26;
            txt0.lineSpacing = 40;
            self.groupAttTextField.addChild(txt0);
            txt0.fontFamily = "SimHei";
            self.attributeTextField0 = txt0;
        }
        else {
            txt0 = self.attributeTextField0;
        }
        var txt1 = null;
        if (self.attributeTextField1 == null) {
            txt1 = new egret.TextField();
            txt1.textColor = 0xffffff;
            txt1.size = 26;
            txt1.lineSpacing = 40;
            txt1.x = 240;
            self.groupAttTextField.addChild(txt1);
            txt1.fontFamily = "SimHei";
            self.attributeTextField1 = txt1;
        }
        else {
            txt1 = self.attributeTextField1;
        }
        var rarity = data.rarity;
        var rarityStr = PublicMethodManager.getInstance().getCardRarity(rarity);
        var generation = data.generation;
        var level = ExternalFun.prototype.levelnumTo5lvl(data.level);
        level = (level - 1) % 1 + 1;
        var glStr = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_3"], [generation + "", level + ""]); //generation+"代"+level+"星"
        var atk = data.atk;
        var cost = data.cost;
        var att = data.att;
        var hp = data.hp;
        var hit = data.hit;
        var agl = data.agl;
        var cri_chance = data.cri_chance;
        var cri_multiplier = data.cri_multiplier;
        var rgn = data.rgn;
        // txt0.textFlow = [
        //       {text: "品质: ", style: {textColor:0x8bc2d5}},
        //       {text: rarityStr+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "星级: ", style: {textColor:0x8bc2d5}},
        //       {text: glStr+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "战力: ", style: {textColor:0x8bc2d5}},
        //       {text: (atk+hp)+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "费用: ", style: {textColor:0x8bc2d5}},
        //       {text: cost+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "等待回合: ", style: {textColor:0x8bc2d5}},
        //       {text: att+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "生命: ", style: {textColor:0x8bc2d5}},
        //       {text: hp+'\n',style:{textColor:0xFFFFFF}},
        // ]
        // txt1.textFlow = [
        //       {text: "攻击: ", style: {textColor:0x8bc2d5}},
        //       {text: atk+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "命中率: ", style: {textColor:0x8bc2d5}},
        //       {text: hit+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "闪避率: ", style: {textColor:0x8bc2d5}},
        //       {text: agl+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "暴击率: ", style: {textColor:0x8bc2d5}},
        //       {text: cri_chance+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "暴击倍数: ", style: {textColor:0x8bc2d5}},
        //       {text: cri_multiplier+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "回复: ", style: {textColor:0x8bc2d5}},
        //       {text: rgn+'\n',style:{textColor:0xFFFFFF}},
        // ]
        txt0.textFlow = [
            { text: self.labelObj["lbl_4"], style: { textColor: 0x8bc2d5 } },
            { text: rarityStr + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_6"], style: { textColor: 0x8bc2d5 } },
            { text: (atk + hp) + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_9"], style: { textColor: 0x8bc2d5 } },
            { text: hp + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_11"], style: { textColor: 0x8bc2d5 } },
            { text: hit + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_13"], style: { textColor: 0x8bc2d5 } },
            { text: cri_chance + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_7"], style: { textColor: 0x8bc2d5 } },
            { text: cost + '\n', style: { textColor: 0xFFFFFF } },
        ];
        txt1.textFlow = [
            { text: self.labelObj["lbl_5"], style: { textColor: 0x8bc2d5 } },
            { text: glStr + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_8"], style: { textColor: 0x8bc2d5 } },
            { text: att + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_10"], style: { textColor: 0x8bc2d5 } },
            { text: atk + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_12"], style: { textColor: 0x8bc2d5 } },
            { text: agl + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_14"], style: { textColor: 0x8bc2d5 } },
            { text: cri_multiplier + '\n', style: { textColor: 0xFFFFFF } },
            { text: self.labelObj["lbl_15"], style: { textColor: 0x8bc2d5 } },
            { text: rgn + '\n', style: { textColor: 0xFFFFFF } },
        ];
    };
    //设置技能
    CGDetailView.prototype.setSkill = function (data) {
        if (data == null)
            return;
        var self = this;
        for (var key in data) {
            var item = data[key];
            if (item == null)
                continue;
            self.setSkillItem(item);
        }
    };
    //设置羁绊
    CGDetailView.prototype.setFetter = function (data) {
        if (data == null)
            return;
        var self = this;
        for (var key in data) {
            var item = data[key];
            if (item == null)
                continue;
            self.setFetterItem(item);
        }
    };
    CGDetailView.prototype.setSkillItem = function (data) {
        if (data == null)
            return;
        var self = this;
        var objData = { name: data.name, level: data.level, type: data.type, desc: data.desc, fdata: { icon: data.icon, level: data.level, canTouch: false } };
        var view = new CGDSkillItemView();
        view.initData(objData);
        self.groupSkillItem.addChild(view);
        self.arrSkillItemView.push(view);
    };
    CGDetailView.prototype.setFetterItem = function (data) {
        if (data == null)
            return;
        // var data = {name:"羁绊名称"+i,desc:"羁绊描述羁绊描述羁绊描述羁绊描述羁绊描述"+i,fdata:{type:"jbmingcheng"+(i%4+1),canTouch:false}};
        var self = this;
        var objData = { name: data.name, desc: data.desc, cname: self.cardName, compose: data.zc, fdata: { icon: data.icon, color: data.color, canTouch: false } };
        var view = new CGDFetterItemView();
        view.initData(objData);
        self.groupFetterItem.addChild(view);
        self.arrFetterItemView.push(view);
    };
    CGDetailView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupCGDetail == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupCGDetail.scaleX =
                self.groupCGDetail.scaleY = 1;
            return;
        }
        self.groupCGDetail.scaleX =
            self.groupCGDetail.scaleY = gapNum;
    };
    CGDetailView.NAME = "CGDetailSkin";
    return CGDetailView;
}(BaseView));
__reflect(CGDetailView.prototype, "CGDetailView");
//# sourceMappingURL=CGDetailView.js.map