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
var TaskItemView = (function (_super) {
    __extends(TaskItemView, _super);
    function TaskItemView() {
        return _super.call(this, TaskItemView.NAME) || this;
    }
    TaskItemView.prototype.week = function () {
        var self = this;
        //    this.thename.text = this.showName;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var name = data.name;
        //   self.setIcon(data["icon"]);
    };
    TaskItemView.prototype.sleep = function () {
    };
    TaskItemView.prototype.setData = function (obj) {
        var Lv = obj["Lv"];
        this.labelLv.text = Lv;
        var desc = obj["desc"];
        this.labelDsc.text = desc;
        var awardnum = obj["awardnum"];
        this.labelNum.text = "X " + awardnum;
    };
    TaskItemView.prototype.setisBagShow = function (isShow) {
        /* if(isShow == 1){
             this.imgItem.$setVisible(true);
         }else{
             this.imgItem.$setVisible(false);
         }*/
    };
    //返回视图宽度
    TaskItemView.prototype.getViewWidth = function () {
        return this.groupPI.width;
    };
    //返回视图高度
    TaskItemView.prototype.getViewHeight = function () {
        return this.groupPI.height;
    };
    //设置层级name
    TaskItemView.prototype.setBtnName = function (str) {
        //  this.btnBuy.name = str;
    };
    TaskItemView.NAME = "TaskItemSkin";
    return TaskItemView;
}(BaseView));
__reflect(TaskItemView.prototype, "TaskItemView");
//# sourceMappingURL=TaskItemView.js.map