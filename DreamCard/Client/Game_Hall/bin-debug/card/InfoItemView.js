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
var InfoItemView = (function (_super) {
    __extends(InfoItemView, _super);
    function InfoItemView() {
        var _this = _super.call(this, InfoItemView.NAME) || this;
        _this.huodongTxt = "【活动】";
        _this.xiongTxt = "【系统】";
        return _this;
    }
    InfoItemView.prototype.week = function () {
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.huodongTxt = "[Activity]";
            self.xiongTxt = "[System]";
        }
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var name = data.tittle;
        var issys = data.issys;
        var desc = data.disc;
        if (tp == 1) {
            name = data.tittleEn;
            desc = data.discEn;
        }
        self.setName(name, issys);
        self.setDisc(desc);
        //  self.setInfoIcon(issys);
        var ispoint = data.ispoint;
        self.setInfoPoint(ispoint);
    };
    InfoItemView.prototype.sleep = function () {
    };
    InfoItemView.prototype.setInfoIcon = function (issys) {
        if (issys == 0) {
            this.imgSys.source = "hallText0Sheet_json.hd";
        }
        else {
            this.imgSys.source = "hallText0Sheet_json.xitong2";
        }
    };
    InfoItemView.prototype.setInfoPoint = function (ispoint) {
        if (ispoint == 0) {
            this.imgPoint.$setVisible(false);
        }
        else {
            this.imgPoint.$setVisible(true);
        }
    };
    InfoItemView.prototype.setDisc = function (str) {
        this.labInfoDesc.text = str;
    };
    InfoItemView.prototype.setName = function (str, issys) {
        if (issys == 0) {
            this.labInfoName.text = this.huodongTxt + str;
            this.labInfoName.textColor = 0x6fe9ff;
        }
        else {
            this.labInfoName.text = this.xiongTxt + str;
            this.labInfoName.textColor = 0xFFD76A;
        }
    };
    //设置层级name
    InfoItemView.prototype.setGroupName = function (str) {
        this.groupPI.name = str;
    };
    //返回视图宽度
    InfoItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    InfoItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    InfoItemView.NAME = "InfoItemSkin";
    return InfoItemView;
}(BaseView));
__reflect(InfoItemView.prototype, "InfoItemView");
//# sourceMappingURL=InfoItemView.js.map