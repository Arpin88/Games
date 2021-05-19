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
var CGDSkillItemView = (function (_super) {
    __extends(CGDSkillItemView, _super);
    function CGDSkillItemView() {
        return _super.call(this, CGDSkillItemView.NAME) || this;
    }
    CGDSkillItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var name = data.name;
        var level = data.level;
        var type = data.type;
        self.setSkillTextField(name, level, type);
        var des = data.desc;
        self.setDes(des);
        var fdata = data.fdata;
        self.setSkillIcon(fdata);
    };
    CGDSkillItemView.prototype.sleep = function () {
        var self = this;
        if (self.skillTextField != null) {
            self.skillTextField.parent.removeChild(self.skillTextField);
            self.skillTextField = null;
        }
        if (self.cardSkillView != null) {
            self.cardSkillView.parent.removeChild(self.cardSkillView);
            self.cardSkillView = null;
        }
    };
    //设置技能富文本
    CGDSkillItemView.prototype.setSkillTextField = function (name, level, type) {
        var self = this;
        var nameStr = (name == null || name == undefined) ? "" : name;
        var levelStr = (level == null || level == undefined) ? "LV.0" : "LV." + level;
        type = (type == null || type == undefined) ? 2 : type;
        var labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var typeStr = type == 2 ? labelObj["lbl_0"] : labelObj["lbl_1"];
        // var typeStr:string = type==2?"被动技能":"主动技能";
        var typeStrColor = type == 2 ? 0x2dc1ff : 0xff531e;
        var txt = new egret.TextField();
        txt.textColor = 0xffffff;
        txt.size = 22;
        txt.stroke = 2;
        txt.strokeColor = 0x000000;
        self.groupSTextField.addChild(txt);
        txt.fontFamily = "SimHei";
        txt.textFlow = [
            { text: nameStr + "   " + levelStr + "   ", style: { textColor: 0xffffff } },
            { text: typeStr, style: { textColor: typeStrColor } }
        ];
        self.skillTextField = txt;
        // var imgSoucePrefix:string = "";
        // var sourceObj = self.imgBG.source;
        // var arr:Array<string> = sourceObj.toString().split(".");
        // if(arr.length==2){
        //    imgSoucePrefix = arr[0];
        // }
        // var imgSource:string = type==2?imgSoucePrefix+".a98x140":imgSoucePrefix+".b98x140";
        // self.imgBG.source = imgSource;
    };
    //设置名称
    CGDSkillItemView.prototype.setDes = function (data) {
        var str = (data == null || data == undefined) ? "" : data;
        this.lblDes.text = str + "\n";
    };
    //设置技能图标
    CGDSkillItemView.prototype.setSkillIcon = function (data) {
        var self = this;
        var view = new CardSkillView();
        view.initData(data);
        self.groupSkillIcon.addChild(view);
        self.cardSkillView = view;
    };
    CGDSkillItemView.NAME = "CGDSkillItemSkin";
    return CGDSkillItemView;
}(IBaseView));
__reflect(CGDSkillItemView.prototype, "CGDSkillItemView");
//# sourceMappingURL=CGDSkillItemView.js.map