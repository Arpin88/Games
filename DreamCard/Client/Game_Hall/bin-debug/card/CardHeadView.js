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
// TypeScript file
var CardHeadView = (function (_super) {
    __extends(CardHeadView, _super);
    function CardHeadView() {
        return _super.call(this, CardHeadView.NAME) || this;
    }
    CardHeadView.prototype.week = function () {
        // var self = this;
        // self.labCardNameColor = 0xffffff;
        // self.labCombatColor = 0xffc000;
        // self.labCardName.textColor = self.labCardNameColor;
        // self.labCombat.textColor = self.labCombatColor;
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var icon = data.icon;
        self.setCardHead(icon);
        var rarity = data.rarity;
        self.setCardHeadFrame(rarity);
        var element = data.element;
        self.setAttr(element);
        var lvl = data.level;
        var gene = data.generation;
        self.setLvl(lvl, gene);
        var name = data.name;
        self.setCardName(name);
        var combat = data.combat;
        self.setCombat(combat);
        self.showSimple();
    };
    CardHeadView.prototype.showSimple = function () {
        this.labGene.$setVisible(false);
        this.groupLevel.$setVisible(false);
    };
    CardHeadView.prototype.sleep = function () {
    };
    CardHeadView.prototype.cleanArray = function (arr) {
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
    //设置头像
    CardHeadView.prototype.setCardHead = function (str) {
        if (str == null || str == undefined) {
            return;
        }
        this.imgHead.source = "headImg0Sheet_json." + str;
    };
    CardHeadView.prototype.setGrayHead = function () {
        this.labCardName.textColor = 0xb0b0b0;
        this.zhanlitxt.textColor = 0xb0b0b0;
        ExternalFun.prototype.setImgGray(this.imgHeadFrame);
        ExternalFun.prototype.setImgGray(this.imgAttr);
        ExternalFun.prototype.setImgGray(this.imgHead);
    };
    //设置头像框 品质
    CardHeadView.prototype.setCardHeadFrame = function (data) {
        switch (data) {
            case "common":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_0";
                break;
            case "rare":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_1";
                break;
            case "epic":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_2";
                break;
            case "legendary":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_3";
                break;
            case "mythical":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_4";
                break;
        }
    };
    //设置属性
    CardHeadView.prototype.setAttr = function (data) {
        switch (data) {
            case "fire":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_0";
                break;
            case "metal":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_1";
                break;
            case "wood":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_2";
                break;
            case "water":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_3";
                break;
            case "earth":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_4";
                break;
        }
    };
    //设置名称
    CardHeadView.prototype.setCardName = function (str) {
        this.labCardName.text = str;
    };
    //设置战力
    CardHeadView.prototype.setCombat = function (index) {
        this.labCombat.text = "" + index;
    };
    //设置等级代数
    CardHeadView.prototype.setLvl = function (lvl, gene) {
        for (var i = 0; i < lvl; i++) {
            var img = new eui.Image();
            this.groupLevel.addChild(img);
            img.source = "combatRecordSheet_json.a15x15_1";
            img.x = i * 15;
            img.y = 0;
        }
        this.labGene.text = gene + "代";
    };
    CardHeadView.NAME = "CardHeadViewSkin";
    return CardHeadView;
}(BaseView));
__reflect(CardHeadView.prototype, "CardHeadView");
//# sourceMappingURL=CardHeadView.js.map