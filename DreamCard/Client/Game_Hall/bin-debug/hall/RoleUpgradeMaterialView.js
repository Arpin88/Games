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
var RoleUpgradeMaterialView = (function (_super) {
    __extends(RoleUpgradeMaterialView, _super);
    function RoleUpgradeMaterialView() {
        return _super.call(this, RoleUpgradeMaterialView.NAME) || this;
    }
    RoleUpgradeMaterialView.prototype.week = function () {
        var self = this;
        self.imgIcon.source = "";
        self.lblCount.text = "";
        // self.imgSelect.visible = false;
        self.lblName.text = "";
        self.count = 0;
        self.propCode = "";
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var mdata = data.mdata;
        if (mdata != null) {
            if (mdata.icon != null)
                self.imgIcon.source = "propSheet_json." + mdata.icon;
            if (mdata.count != null) {
                self.count = mdata.count;
                self.lblCount.text = mdata.count;
            }
            if (mdata.name != null)
                self.lblName.text = mdata.name;
            if (mdata.propCode != null)
                self.propCode = mdata.propCode;
        }
        if (data.gname != null)
            self.groupRUM.name = data.gname;
    };
    RoleUpgradeMaterialView.prototype.sleep = function () {
    };
    RoleUpgradeMaterialView.prototype.setSelect = function (sel) {
        this.imgSelect.source = sel ? "hallBtn1Sheet_json.a40x40_1" : "hallBtn1Sheet_json.a40x40_0";
    };
    RoleUpgradeMaterialView.prototype.setCount = function (count) {
        var self = this;
        self.count = count;
        self.lblCount.text = count + "";
        // if(count==0)
        //     self.setSelect(false);
    };
    RoleUpgradeMaterialView.prototype.getCount = function () {
        return this.count;
    };
    RoleUpgradeMaterialView.prototype.getPropCode = function () {
        return this.propCode;
    };
    RoleUpgradeMaterialView.prototype.getViewWidth = function () {
        return this.groupRUM.width;
    };
    RoleUpgradeMaterialView.NAME = "RoleUpgradeMaterialSkin";
    return RoleUpgradeMaterialView;
}(IBaseView));
__reflect(RoleUpgradeMaterialView.prototype, "RoleUpgradeMaterialView");
//# sourceMappingURL=RoleUpgradeMaterialView.js.map