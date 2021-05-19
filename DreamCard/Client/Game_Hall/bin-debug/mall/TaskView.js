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
var TaskView = (function (_super) {
    __extends(TaskView, _super);
    function TaskView() {
        var _this = _super.call(this, TaskView.NAME) || this;
        _this.arrPropTypeData = new Array(); //道具类型数据
        _this.arrOptionBtn = new Array(); //选项按钮容器
        _this.arrPropItem = new Array(); //道具容器
        _this.pageNum = 1; //当前页数 下标从1开始
        _this.pageSize = 10; //一页的数量
        _this.receiveNum = 0;
        _this.needUp = false;
        _this.taskItemViewList = new Array();
        _this.awardItemViewList = new Array();
        _this.signItemViewList = new Array();
        return _this;
    }
    TaskView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        /*      self.scrPropItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
                self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        
                GameEventManager.getInstance().addEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
                GameEventManager.getInstance().addEventListener(HallEvent.updateGold,self,self.updateGold);
                GameEventManager.getInstance().addEventListener(HallEvent.updateProp,self,self.updateProp);
        */
        this.pageNum = 1;
        this.needUp = false;
        this.receiveNum = 0;
        self.updateGold();
        self.setOptionBtn();
        // self.sendGetShopList(); // 初始申请数据
        self.setDaySignItem(0);
        self.setDayTaskItem(0);
        self.setDayAwardItem(0);
    };
    TaskView.prototype.moveHandler = function (evt) {
        /*  if(this.scrPropItem.viewport.scrollV > (this.scrPropItem.viewport.contentHeight - this.scrPropItem.viewport.height)-40){
              this.needUp = true;
          }*/
    };
    TaskView.prototype.outHandler = function (evt) {
        if (this.receiveNum < this.pageSize) {
            this.needUp = false;
        }
        if (this.needUp) {
            this.needUp = false;
            this.addNewData();
        }
    };
    TaskView.prototype.addNewData = function () {
        var self = this;
        // 2 申请下一页的数据
        self.pageNum = self.pageNum + 1;
        var propType = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if (propType == null)
            return;
        var arrPropData = self.propData[propType.code];
        //  if(arrPropData.length<=(self.pageNum-1)*self.pageSize)   //如果本地没有数据则去请求数据
        //this.reqGetShopPropList();
        //   else
        //this.updatePropShow();
    };
    TaskView.prototype.updateGold = function () {
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    };
    TaskView.prototype.sleep = function () {
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrPropItem);
        self.curChooseOptionBtnIndex = null;
        this.pageNum = 1;
        self.propData = null;
        self.shopInfoData = null;
        self.curSelPropData = null;
        /*      GameEventManager.getInstance().removeEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
              GameEventManager.getInstance().removeEventListener(HallEvent.updateGold,self,self.updateGold);
              GameEventManager.getInstance().removeEventListener(HallEvent.updateProp,self,self.updateProp);*/
    };
    TaskView.prototype.cleanArray = function (arr) {
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
    TaskView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_GET_SHOP_PROP_LIST:
                // self.onGetShowPropList(data);
                break;
            case HallCmdDef.CMD_GET_SHOP_PROP_INFO:
                // self.onGetShopPropInfo(data);
                break;
        }
    };
    TaskView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            if (btn.name.substr(0, 10) == "btnOption_") {
                var strArr = btn.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex); // 按钮被按下
                // console.log(`选择按钮被按下：${cIndex}`);
            }
            else if (btn.name.substr(0, 7) == "btnDay_") {
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
        }
        if (event.target instanceof eui.Group) {
            var bt1 = event.target;
            if (bt1.name.substr(0, 6) == "btnDay_") {
                var a = 0;
            }
        }
    };
    TaskView.prototype.setOptionBtn = function () {
        var self = this;
        var imgName = ["mrqiandao", "mrrenwu", "lvjiangli"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            imgName = ["e_zrdyx", "e_zcdqb", "jilu"];
        }
        var num = imgName["length"];
        for (var i = 0; i < num; i++) {
            var btnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(imgName[i]);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
        self.updateOptionBtnPos();
        self.setCurChooseOptionBtnByIndex(0);
    };
    TaskView.prototype.updateOptionBtn = function () {
        var self = this;
        for (var i = 0, lengthI = self.arrPropTypeData.length; i < lengthI; i++) {
            var item = self.arrPropTypeData[i];
            if (item == null)
                continue;
            // code:"3"
            // name:"牌背"
            // res_url:"bag_paibei"
            var resUrl = item.resUrl;
            var btnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            //btnView.setBtnContent(self.typeName[i]);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            // btnView.y = btnView.getViewHeight()*i + 10*(i+1);
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    };
    //设置当前选中选项按钮下标
    TaskView.prototype.setCurChooseOptionBtnByIndex = function (index) {
        var self = this;
        var btnView = null;
        if (self.curChooseOptionBtnIndex != null) {
            if (self.curChooseOptionBtnIndex == index) {
                return;
            }
            btnView = self.getOptionBtnViewByIndex(self.curChooseOptionBtnIndex);
            if (btnView == null)
                return;
            btnView.setCurChoose(0, true);
        }
        self.curChooseOptionBtnIndex = index;
        btnView = self.getOptionBtnViewByIndex(index);
        if (btnView == null)
            return;
        btnView.setCurChoose(1, true);
        self.updateOptionBtnPos();
        self.cleanArray(self.arrPropItem);
        self.setPageItem(index); // 传kind
    };
    TaskView.prototype.setPageItem = function (index) {
        this.signpage.$setVisible(false);
        this.signpage1.$setVisible(false);
        this.awardpage.$setVisible(false);
        this.taskpage.$setVisible(false);
        if (index == 0) {
            this.signpage.$setVisible(true);
            this.signpage1.$setVisible(true);
        }
        else if (index == 1) {
            this.taskpage.$setVisible(true);
        }
        else if (index == 2) {
            this.awardpage.$setVisible(true);
        }
    };
    // 设置每日登录界面
    TaskView.prototype.setDaySignItem = function (index) {
        for (var i = 0; i < 7; i++) {
            var btnView;
            if (i < 6)
                btnView = new SignItemView();
            else
                btnView = new SignItemView2();
            btnView.init();
            var data = { "tittle": i,
                num: 10 + i,
                isget: 0,
                isloss: 0,
                islight: 0 // 0,1
            };
            btnView.setData(data);
            this.signpage.addChild(btnView);
            btnView.setBtnName("btnDay_" + i);
            var xx = i % 4;
            var yy = Math.floor(i / 4);
            btnView.x = 66 + 220 * xx;
            btnView.y = 40 + 240 * yy;
        }
    };
    // 设置每日任务界面
    TaskView.prototype.setDayTaskItem = function (index) {
        var self = this;
        var num = 5;
        for (var i = 0; i < num; i++) {
            var btnView = new TaskItemView();
            btnView.init();
            var data = { Lv: "Lv" + i,
                desc: "desc" + i,
                awardnum: i,
                islight: 0
            };
            btnView.setData(data);
            self.taskgroupPropItem.addChild(btnView);
            btnView.setBtnName("btnTask_" + i);
            //   btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 2;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight() + 2;
            btnView.y = btnView.getViewHeight() * i;
            self.taskItemViewList.push(btnView);
        }
    };
    // 设置没惹奖励界面
    TaskView.prototype.setDayAwardItem = function (index) {
        var self = this;
        var num = 5;
        for (var i = 0; i < num; i++) {
            var btnView = new AwardtemView();
            btnView.init();
            var data = { tittle: "name" + i,
                desc: "desc" + i,
                awardnum: i,
                islight: 0
            };
            btnView.setData(data);
            self.awardgroupPropItem.addChild(btnView);
            btnView.setBtnName("btnAward_" + i);
            //   btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 2;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight() + 2;
            btnView.y = btnView.getViewHeight() * i;
            self.awardItemViewList.push(btnView);
        }
    };
    //返回选项按钮视图根据下标
    TaskView.prototype.getOptionBtnViewByIndex = function (index) {
        var retView = null;
        var self = this;
        for (var i = 0, lengthI = self.arrOptionBtn.length; i < lengthI; i++) {
            var btnView = self.arrOptionBtn[i];
            if (btnView == null)
                continue;
            var btnName = btnView.getBtnName();
            var strArr = btnName.split("_");
            if (strArr.length != 2) {
                continue;
            }
            var cIndex = Number(strArr[1]);
            if (index == cIndex) {
                retView = btnView;
                break;
            }
        }
        return retView;
    };
    //更新选项按钮坐标信息
    TaskView.prototype.updateOptionBtnPos = function () {
        var self = this;
        var posY = 0;
        for (var i = 0, lengthI = self.arrOptionBtn.length; i < lengthI; i++) {
            var item = self.arrOptionBtn[i];
            if (item == null)
                continue;
            item.y = posY;
            posY += item.getViewHeight() + 10;
        }
        self.scrOptionBtn.height = posY;
    };
    TaskView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.mallskingroup == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.mallskingroup.scaleX =
                self.mallskingroup.scaleY = 1;
            return;
        }
        self.mallskingroup.scaleX =
            self.mallskingroup.scaleY = gapNum;
    };
    TaskView.NAME = "TaskSkin";
    return TaskView;
}(BaseView));
__reflect(TaskView.prototype, "TaskView");
//# sourceMappingURL=TaskView.js.map