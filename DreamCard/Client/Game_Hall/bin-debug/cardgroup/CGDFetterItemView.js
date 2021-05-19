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
var CGDFetterItemView = (function (_super) {
    __extends(CGDFetterItemView, _super);
    function CGDFetterItemView() {
        return _super.call(this, CGDFetterItemView.NAME) || this;
    }
    CGDFetterItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var name = data.name;
        self.setName(name);
        self.setDesc(data);
        // self.setCompose(compose,cname);
        var fdata = data.fdata;
        self.setFetterIcon(fdata);
    };
    CGDFetterItemView.prototype.sleep = function () {
        var self = this;
        if (self.cardFetterView != null) {
            self.cardFetterView.parent.removeChild(self.cardFetterView);
            self.cardFetterView = null;
        }
    };
    //设置名称
    CGDFetterItemView.prototype.setName = function (data) {
        var str = (data == null || data == undefined) ? "" : data;
        this.lblName.text = str;
    };
    //设置名称
    CGDFetterItemView.prototype.setDesc = function (data) {
        if (data == null)
            return;
        var desc = data.desc;
        var cname = data.cname;
        var compose = data.compose;
        var labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var arrTextFlow = new Array();
        // arrTextFlow.push({text: "效果:", style: {textColor:0x8bc2d5}});
        arrTextFlow.push({ text: labelObj["lbl_0"], style: { textColor: 0x8bc2d5 } });
        arrTextFlow.push({ text: desc + "\n", style: { textColor: 0xffffff } });
        var self = this;
        var str = (compose == null || compose == undefined) ? "" : compose;
        if (str != "" && cname != "") {
            var arr = compose.split(cname);
            // arrTextFlow.push({text: "组成:", style: {textColor:0x8bc2d5}});
            arrTextFlow.push({ text: labelObj["lbl_1"], style: { textColor: 0x8bc2d5 } });
            if (arr.length > 1) {
                arrTextFlow.push({ text: arr[0], style: { textColor: 0xFFFFFF } });
                arrTextFlow.push({ text: cname, style: { textColor: 0xfced63 } });
                arrTextFlow.push({ text: arr[1] + "\n", style: { textColor: 0xFFFFFF } });
            }
            else {
                arrTextFlow.push({ text: str + "\n", style: { textColor: 0xFFFFFF } });
            }
        }
        self.lblDes.textFlow = arrTextFlow;
        // self.lblDes.textFlow = [
        //     {text: "效果:", style: {textColor:0x8bc2d5}},
        //     {text: desc+"\n", style: {textColor:0xffffff}},
        //     {text: "组成:" + arr[0], style: {textColor:0x8bc2d5}},
        //     {text:cname,style:{"size":18,textColor:0xfced63}},
        //     {text:arr[1],style:{"size":18,textColor:0xFFFFFF}}];
    };
    //设置羁绊图标
    CGDFetterItemView.prototype.setFetterIcon = function (data) {
        var self = this;
        var view = new CardFetterView();
        view.initData(data);
        self.groupFetterIcon.addChild(view);
        view.scaleX = view.scaleY = 0.46;
        self.cardFetterView = view;
    };
    CGDFetterItemView.NAME = "CGDFetterItemSkin";
    return CGDFetterItemView;
}(IBaseView));
__reflect(CGDFetterItemView.prototype, "CGDFetterItemView");
//# sourceMappingURL=CGDFetterItemView.js.map