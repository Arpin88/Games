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
var RoleUpgradeView = (function (_super) {
    __extends(RoleUpgradeView, _super);
    function RoleUpgradeView() {
        return _super.call(this, RoleUpgradeView.NAME) || this;
    }
    RoleUpgradeView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.groupUpgrade.visible =
            self.imgTitleUpgrade.visible = true;
        self.groupLevelUp.visible =
            self.imgTitleLevelUp.visible = false;
        self.upgradeMaterialViewArr = new Array();
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.updateView();
        self.reqUpgradeMaterialList();
    };
    RoleUpgradeView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.cleanUpgradeMaterialViewArr();
        self.labelObj = null;
    };
    RoleUpgradeView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = tar;
            if (btn == self.btnUCancel) {
                self.hiden();
            }
            else if (btn == self.btnUUser) {
                if (self.curSelMaterialView == null || self.curSelMaterialView.getCount() <= 0) {
                    // PopManager.getInstance().showPromptBox("药品不足,请前往商城购买!",2,Handler.create(self,function(confirm:boolean){
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"], 2, Handler.create(self, function (confirm) {
                        self.hiden();
                        UIManager.getInstance().showUI(MallView);
                    }));
                    return;
                }
                // var exp:number = self.editExp.text==""?5:Number(self.editExp.text);
                // exp = exp==null||exp==0?5:exp;
                // //暂时先发送升级请求 等后面修改
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_UPGRADE_COMMANDER, { propCode: self.curSelMaterialView.getPropCode(), count: 1 }, true);
            }
            else if (btn == self.btnClose) {
                if (!self.groupUpgrade.visible) {
                    self.imgTitleUpgrade.visible =
                        self.groupUpgrade.visible = true;
                    self.imgTitleLevelUp.visible =
                        self.groupLevelUp.visible = false;
                    return;
                }
                self.hiden();
            }
            else if (btn == self.btnGoShop) {
                self.hiden();
                UIManager.getInstance().showUI(MallView);
            }
            // }else if(tar instanceof eui.Rect){
            // if(tar==self.rectBG){
            //     self.hiden();
            // }
        }
        else if (tar instanceof eui.Group) {
            var group = event.target;
            if (group.name.substr(0, 9) == "groupRUM_") {
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var index = Number(strArr[1]);
                var uview = self.upgradeMaterialViewArr[index];
                if (uview == null || uview == self.curSelMaterialView)
                    return;
                if (self.curSelMaterialView != null)
                    self.curSelMaterialView.setSelect(false);
                uview.setSelect(true);
                self.curSelMaterialView = uview;
            }
        }
    };
    RoleUpgradeView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_UPGRADE_COMMANDER:
                self.onUpgradeCommander(data);
                break;
            case HallCmdDef.CMD_GET_UPGRADE_MATERIAL_LIST:
                self.onGetUpgradeMaterialList(data);
                break;
        }
    };
    RoleUpgradeView.prototype.updateView = function () {
        var self = this;
        var account = GlobalDataManager.getInstance().getAccountData();
        self.lblLvl.text = account.getLvl() + "";
        self.lblLvProgress.text = account.getExp() + "/" + account.getUpexp();
        // self.groupGoShop.visible = true;
    };
    RoleUpgradeView.prototype.reqUpgradeMaterialList = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_UPGRADE_MATERIAL_LIST, {}, true);
    };
    RoleUpgradeView.prototype.onUpgradeCommander = function (data) {
        if (data == null)
            return;
        var self = this;
        var lvl = data.lvl;
        var exp = data.exp;
        var upexp = data.upexp;
        var hp = data.hp;
        var count = data.count;
        var propCode = data.propCode;
        var cost = data.cost;
        var account = GlobalDataManager.getInstance().getAccountData();
        if (lvl != account.getLvl()) {
            self.imgTitleUpgrade.visible =
                self.groupUpgrade.visible = false;
            self.imgTitleLevelUp.visible =
                self.groupLevelUp.visible = true;
            self.lblOLvl.text = account.getLvl() + "";
            self.lblNLvl.text = lvl + "";
            self.lblOHp.text = account.getHp() + "";
            self.lblNHp.text = hp + "";
            self.lblOCost.text = account.getCost() + "";
            self.lblNCost.text = cost + "";
        }
        if (lvl != null)
            account.setLvl(lvl);
        if (exp != null)
            account.setExp(exp);
        if (upexp != null)
            account.setUpexp(upexp);
        if (hp != null)
            account.setHp(hp);
        if (cost != null)
            account.setCost(cost);
        if (count != null && propCode != null) {
            var totalCount = 0;
            for (var i = 0, lengthI = self.upgradeMaterialViewArr.length; i < lengthI; i++) {
                var uview = self.upgradeMaterialViewArr[i];
                if (uview == null)
                    continue;
                if (uview.getPropCode() == propCode + "")
                    uview.setCount(count);
                // if(count==0&&self.curSelMaterialView==uview)
                //     self.curSelMaterialView = null;
                totalCount += uview.getCount();
            }
        }
        self.updateView();
        self.groupGoShop.visible = totalCount <= 0;
        var full = data.full;
        if (full != 0)
            PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"], 2);
        // PopManager.getInstance().showPromptBox("已达到满级,使用失败!",2);
        // if(full==0)
        //     PopManager.getInstance().showPromptBox("使用成功!",2);
        // else
        //     PopManager.getInstance().showPromptBox("已达到满级,使用失败!",2);
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateUserInfo);
    };
    RoleUpgradeView.prototype.onGetUpgradeMaterialList = function (data) {
        if (data == null)
            return;
        var self = this;
        self.cleanUpgradeMaterialViewArr();
        var gapX = 25;
        var count = 0;
        for (var i = 0, lengthI = data.length; i < lengthI; i++) {
            var item = data[i];
            if (item == null)
                continue;
            var umView = new RoleUpgradeMaterialView();
            umView.initData({ mdata: item, gname: "groupRUM_" + i });
            self.groupUMaterial.addChild(umView);
            umView.x = (i * (umView.getViewWidth() + gapX));
            if (item.count != null) {
                count += item.count;
                if (self.curSelMaterialView == null && item.count != 0) {
                    self.curSelMaterialView = umView;
                    umView.setSelect(true);
                }
            }
            self.upgradeMaterialViewArr.push(umView);
        }
        if (count == 0) {
            self.curSelMaterialView = self.upgradeMaterialViewArr[0];
            self.curSelMaterialView.setSelect(true);
        }
        self.groupGoShop.visible = count == 0;
    };
    RoleUpgradeView.prototype.cleanUpgradeMaterialViewArr = function () {
        var self = this;
        self.curSelMaterialView = null;
        if (self.upgradeMaterialViewArr != null && self.upgradeMaterialViewArr.length != 0) {
            for (var i = self.upgradeMaterialViewArr.length - 1; i >= 0; i--) {
                var item = self.upgradeMaterialViewArr[i];
                if (item != null && item.parent != null) {
                    item.parent.removeChild(item);
                }
                self.upgradeMaterialViewArr.splice(i, 1);
            }
        }
    };
    RoleUpgradeView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupRoleUpgrade == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupRoleUpgrade.scaleX =
                self.groupRoleUpgrade.scaleY = 1;
            return;
        }
        self.groupRoleUpgrade.scaleX =
            self.groupRoleUpgrade.scaleY = gapNum;
    };
    RoleUpgradeView.NAME = "RoleUpgradeSkin";
    return RoleUpgradeView;
}(BaseView));
__reflect(RoleUpgradeView.prototype, "RoleUpgradeView");
//# sourceMappingURL=RoleUpgradeView.js.map