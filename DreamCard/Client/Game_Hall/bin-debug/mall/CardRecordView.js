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
var CardRecordView = (function (_super) {
    __extends(CardRecordView, _super);
    function CardRecordView() {
        var _this = _super.call(this, CardRecordView.NAME) || this;
        _this.jbList = [];
        _this.pageId = 1; //下标从0开始，为了*方便，0代表第一个页面
        _this.pageSize = 15;
        _this.mallName = [];
        _this.recordItemViewList = new Array(); //羁绊选项视图集合
        return _this;
    }
    CardRecordView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        /*  var data = super.getData();
          if(data==null)
              return;*/
        // self.setRecordBtn();
        self.initView();
    };
    CardRecordView.prototype.initView = function () {
        var self = this;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var obj = new Object();
        obj["pageid"] = this.pageId;
        obj["pageSize"] = this.pageSize;
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_CardRecord, obj, true);
    };
    CardRecordView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_CardRecord:
                var obj = data["data"];
                // self.pageId = parseInt(data["pageId"]) // 页面id
                var num = data["length"]; // 10 条记录
                for (var k = 0; k < num; k++) {
                    var obj = data[k];
                    self.mallName[k + (self.pageId - 1) * this.pageSize] = obj;
                }
                if (num > 0) {
                    this.setRecordBtn();
                }
                break;
        }
    };
    CardRecordView.prototype.setRecordBtn = function () {
        var self = this;
        var num = self.mallName["length"];
        for (var i = 0; i < num; i++) {
            var btnView = new CardRecordItemView();
            btnView.init();
            var isshow = (i + 1) % 2 + 1;
            btnView.setisBagShow(isshow);
            var data = { "ordorId": self.mallName[i]["cid"],
                orderNo: self.mallName[i]["orderid"],
                turntype: self.mallName[i]["turntype"],
                status: self.mallName[i]["status"],
                cardname: self.mallName[i]["name"],
                grade: self.mallName[i]["grade"],
                five: self.mallName[i]["five"],
                generations: self.mallName[i]["generations"],
                star: self.mallName[i]["star"],
                experience: self.mallName[i]["experience"],
                blood: self.mallName[i]["blood"],
                attack: self.mallName[i]["attack"],
                createtime: self.mallName[i]["createtime"],
                oil: self.mallName[i]["oil"]
            };
            btnView.setData(data);
            self.groupPropItem.addChild(btnView);
            //   btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 0;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight() + 2;
            btnView.y = btnView.getViewHeight() * i;
            self.recordItemViewList.push(btnView);
        }
        //self.updateOptionBtnPos();
    };
    //更新选项按钮坐标信息
    CardRecordView.prototype.updateOptionBtnPos = function () {
        var self = this;
        var posY = 0;
        for (var i = 0, lengthI = self.recordItemViewList.length; i < lengthI; i++) {
            var item = self.recordItemViewList[i];
            if (item == null)
                continue;
            item.y = posY + 5;
            posY += item.getViewHeight() + 22;
        }
    };
    CardRecordView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.cleanArray(self.recordItemViewList);
    };
    CardRecordView.prototype.cleanArray = function (arr) {
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
    CardRecordView.prototype.touchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            var btn = tar;
            if (btn == self.btnBack) {
                self.hiden();
            }
        }
        else if (tar instanceof eui.Rect) {
            if (tar == self.rectBG) {
                self.hiden();
            }
        }
    };
    CardRecordView.NAME = "CardRecordSkin";
    return CardRecordView;
}(BaseView));
__reflect(CardRecordView.prototype, "CardRecordView");
//# sourceMappingURL=CardRecordView.js.map