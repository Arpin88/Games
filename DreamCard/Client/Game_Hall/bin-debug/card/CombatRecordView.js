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
var CombatRecordView = (function (_super) {
    __extends(CombatRecordView, _super);
    function CombatRecordView() {
        var _this = _super.call(this, CombatRecordView.NAME) || this;
        _this.arrRecordBtn = new Array(); //记录选项按钮容器
        // private labLeftFetters:eui.Label;
        // private labRightFetters:eui.Label;
        _this.arrCardHeadView = new Array();
        _this.arrCardFetters = new Array();
        _this.arrCircle = new Array();
        _this.needUp = false;
        _this.mallName = [];
        _this.jbList = [];
        _this.pageId = 0; //下标从0开始，为了*方便，0代表第一个页面
        _this.pageSize = 8;
        _this.duizhanTxt = "对战ID:";
        return _this;
    }
    CombatRecordView.prototype.week = function () {
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if (tp == 1) {
            self.duizhanTxt = "Combat ID:";
        }
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrRecordBtn.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrRecordBtn.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);
        self.initView(false);
        self.sendGetRecordList(); // 初始申请数据
    };
    CombatRecordView.prototype.initView = function (isShow) {
        this.groupDetails.$setVisible(isShow);
        ExternalFun.prototype.setImgGray(this.imgRightHead);
        ExternalFun.prototype.setImgGray(this.rightFrame);
    };
    //发送请求卡牌列表
    CombatRecordView.prototype.sendGetRecordList = function () {
        //战绩
        var account123 = GlobalDataManager.getInstance().getAccountData();
        var namestr = account123["uname"];
        var obj = { ratity: namestr, pageid: 1, pageSize: 8 };
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Record, obj, true);
    };
    CombatRecordView.prototype.sleep = function () {
        this.cleanArray(this.arrRecordBtn);
        this.cleanRecord();
    };
    CombatRecordView.prototype.cleanRecord = function () {
        this.cleanArray(this.arrCardHeadView);
        this.cleanArrayLabel(this.arrCardFetters);
        this.cleanArrayShape(this.arrCircle);
    };
    CombatRecordView.prototype.cleanArray = function (arr) {
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
    CombatRecordView.prototype.cleanArrayLabel = function (arr) {
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
    CombatRecordView.prototype.cleanArrayShape = function (arr) {
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
    CombatRecordView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_Record://获取队伍配置
                self.pageId = parseInt(data["pageId"]); // 页面id
                var num = data["msg"]["length"]; // 10 条记录
                for (var k = 0; k < num; k++) {
                    var obj = data["msg"][k];
                    self.mallName[k + (self.pageId - 1) * this.pageSize] = obj;
                }
                var num1 = data["jbconfig"]["length"]; // 羁绊表
                for (var k = 0; k < num1; k++) {
                    var obj = data["jbconfig"][k];
                    var jbconfigId = data["jbconfig"][k]["code"];
                    self.jbList[jbconfigId] = obj;
                }
                if (num > 0) {
                    self.initView(true);
                    this.setRecordBtn();
                    self.setDetails(0);
                }
                break;
        }
    };
    CombatRecordView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            if (btn.name.substr(0, 10) == "btnRecord_") {
                var strArr = btn.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex);
                self.cleanRecord();
                self.setDetails(cIndex);
            }
            else if (btn == self.btnBack) {
                self.hiden();
                // UIManager.getInstance().hideUI(self,HideViewEffectType.TYPE_MOVE_LEFT);
            }
        }
    };
    CombatRecordView.prototype.moveHandler = function (evt) {
        if (this.scrRecordBtn.viewport.scrollV > (this.scrRecordBtn.viewport.contentHeight - this.scrRecordBtn.viewport.height) - 40) {
            this.needUp = true;
        }
    };
    CombatRecordView.prototype.outHandler = function (evt) {
        if (this.needUp) {
            this.needUp = false;
            //this.addRecord();  // 拉到底
            // 这里是拉到底了
            var account123 = GlobalDataManager.getInstance().getAccountData();
            var namestr = account123["uname"];
            var obj = { ratity: namestr, pageid: this.pageId + 1, pageSize: this.pageSize };
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_Record, obj, false);
        }
    };
    CombatRecordView.prototype.addRecord = function () {
        this.setRecordBtn();
    };
    //字符串转日期格式，strDate要转为日期格式的字符串 
    //测试 
    //alert(getDate("2016-6-14 11:20:00")); 
    CombatRecordView.prototype.getDate = function (strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("-");
        var c = a[1].split(":");
        var date = new Date(parseInt(b[0]), parseInt(b[1]) - 1, parseInt(b[2]), parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));
        return date;
    };
    CombatRecordView.prototype.setRecordBtn = function () {
        var self = this;
        var num = self.mallName["length"];
        var curNum = self.arrRecordBtn.length;
        var account = GlobalDataManager.getInstance().getAccountData();
        for (var i = 0; i < (num - curNum); i++) {
            var btnView = new RecordBtnView();
            btnView.init();
            self.groupRecordBtn.addChild(btnView);
            var dateString = self.mallName[i]["createDate"];
            var dateStart = new Date(dateString);
            var miniStr = ExternalFun.prototype.add0(dateStart.getMinutes().toString(), 2);
            var hourStr = ExternalFun.prototype.add0(dateStart.getHours().toString(), 2);
            var monthStr = ExternalFun.prototype.add0((dateStart.getMonth() + 1), 2);
            var dayStr = ExternalFun.prototype.add0(dateStart.getDate(), 2);
            btnView.setBtnTmContent1(hourStr + ":" + miniStr);
            btnView.setBtnTmContent(monthStr + "-" + dayStr);
            var winname = self.mallName[i + curNum]["winName"];
            if (account.getNick() == winname) {
                btnView.setBtnRewardImg(1);
                btnView.setBtnScoreContent("+" + self.mallName[i + curNum]["resultNum"]);
            }
            else {
                btnView.setBtnRewardImg(0);
                btnView.setBtnScoreContent("-" + self.mallName[i + curNum]["resultNumlost"]);
            }
            btnView.setBtnName("btnRecord_" + (i + curNum));
            btnView.x = 10;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
            btnView.y = btnView.getViewHeight() * i;
            self.arrRecordBtn.push(btnView);
        }
        //没有默认选中按钮 更新选项坐标即可
        self.updateOptionBtnPos();
        self.setCurChooseOptionBtnByIndex(0);
    };
    //设置当前选中选项按钮下标
    CombatRecordView.prototype.setCurChooseOptionBtnByIndex = function (index) {
        var self = this;
        var btnView = null;
        if (self.curChooseRecordBtnIndex != null && self.curChooseRecordBtnIndex != -1) {
            btnView = self.getOptionBtnViewByIndex(self.curChooseRecordBtnIndex);
            if (btnView == null)
                return;
            btnView.setCurChoose();
            if (self.curChooseRecordBtnIndex == index) {
                self.curChooseRecordBtnIndex = -1;
                return;
            }
        }
        self.curChooseRecordBtnIndex = index;
        btnView = self.getOptionBtnViewByIndex(index);
        if (btnView == null)
            return;
        btnView.setCurChoose(1);
        self.updateOptionBtnPos();
    };
    //返回选项按钮视图根据下标
    CombatRecordView.prototype.getOptionBtnViewByIndex = function (index) {
        var retView = null;
        var self = this;
        for (var i = 0, lengthI = self.arrRecordBtn.length; i < lengthI; i++) {
            var btnView = self.arrRecordBtn[i];
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
    CombatRecordView.prototype.updateOptionBtnPos = function () {
        var self = this;
        var posY = 0;
        for (var i = 0, lengthI = self.arrRecordBtn.length; i < lengthI; i++) {
            var item = self.arrRecordBtn[i];
            if (item == null)
                continue;
            item.y = posY + 5;
            posY += item.getViewHeight() + 22;
        }
        // self.scrOptionBtn.height = posY;
    };
    //0 胜   1 败
    CombatRecordView.prototype.setCombatResult = function (index) {
        if (index == 0) {
            /*  this.imgLeftBG.source = "combatRecordSheet_json.a60x78_0";
              this.imgLeftRes.source = "combatRecordSheet_json.a54x58_1";
              this.imgRightBG.source = "combatRecordSheet_json.a60x78_1";
              this.imgRightRes.source = "combatRecordSheet_json.a54x58_0";*/
            var leftshape = new egret.Shape();
            this.groupLeftHeadFrame.addChild(leftshape);
            //   leftshape.graphics.lineStyle(2,0x3d87f7);
            //  leftshape.graphics.drawCircle(39,39,35);
            var rightshape = new egret.Shape();
            this.groupRightHeadFrame.addChild(rightshape);
            /* rightshape.graphics.lineStyle(2,0xb7092f);
             rightshape.graphics.drawCircle(39,39,35);
             this.arrCircle.push(leftshape);
             this.arrCircle.push(rightshape);*/
        }
        else {
            /*this.imgLeftBG.source = "combatRecordSheet_json.a60x78_1";
            this.imgLeftRes.source = "combatRecordSheet_json.a54x58_0";
            this.imgRightBG.source = "combatRecordSheet_json.a60x78_0";
            this.imgRightRes.source = "combatRecordSheet_json.a54x58_1";*/
            var leftshape = new egret.Shape();
            this.groupLeftHeadFrame.addChild(leftshape);
            //   leftshape.graphics.lineStyle(2,0xb7092f);
            //   leftshape.graphics.drawCircle(39,39,35);
            var rightshape = new egret.Shape();
            this.groupRightHeadFrame.addChild(rightshape);
            /* rightshape.graphics.lineStyle(2,0x3d87f7);
             rightshape.graphics.drawCircle(39,39,35);
             this.arrCircle.push(leftshape);
             this.arrCircle.push(rightshape);*/
        }
    };
    CombatRecordView.prototype.setLeftName = function (str) {
        this.labLeftName.text = str;
    };
    CombatRecordView.prototype.setRightName = function (str) {
        this.labRightName.text = str;
    };
    CombatRecordView.prototype.setLeftHead = function (str) {
        if (str == "")
            str = "headicon_json.head_01";
        this.imgLeftHead.source = str;
    };
    CombatRecordView.prototype.setRightHead = function (str) {
        if (str == "")
            str = "headicon_json.head_01";
        this.imgRightHead.source = str;
    };
    CombatRecordView.prototype.setLeftCombat = function (index) {
        this.labLeftCombat.text = "" + index;
    };
    CombatRecordView.prototype.setRightCombat = function (index) {
        this.labRightCombat.text = "" + index;
    };
    CombatRecordView.prototype.setRecordId = function (str) {
        this.labRecordId.text = this.duizhanTxt + str;
    };
    CombatRecordView.prototype.setLeftFetters = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var lab = new eui.Label();
            this.groupleftFetters.addChild(lab);
            lab.text = arr[i];
            lab.x = 0;
            lab.y = i * 25;
            lab.width = 420;
            lab.height = 25;
            lab.textAlign = "left";
            lab.verticalAlign = "middle";
            lab.size = 20;
            lab.fontFamily = "SimHei";
            this.arrCardFetters.push(lab);
        }
    };
    CombatRecordView.prototype.setRightFetters = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var lab = new eui.Label();
            this.groupRightFetters.addChild(lab);
            lab.text = arr[i];
            lab.x = 0;
            lab.y = i * 25;
            lab.width = 420;
            lab.height = 25;
            lab.textAlign = "left";
            lab.verticalAlign = "middle";
            lab.size = 20;
            lab.fontFamily = "SimHei";
            this.arrCardFetters.push(lab);
        }
    };
    CombatRecordView.prototype.setLeftCardHeads = function (index) {
        var str = this.mallName[index]["winCards"];
        var arr1 = str.split('|');
        var num = arr1.length;
        for (var i = 0; i < num; i++) {
            //以"· "为分隔符，截取上面的字符串。结果为五段
            var str = arr1[i];
            var arr = str.split(',');
            var data = { "icon": arr[0], name: arr[1], "rarity": arr[2], "element": arr[3], "generation": arr[4], "level": ExternalFun.prototype.levelnumTo5lvl(parseInt(arr[5])), combat: arr[6] };
            var headView = new CardHeadView();
            headView.initData(data);
            this.groupLeftCardHeads.addChild(headView);
            this.arrCardHeadView.push(headView);
            if (i < 5) {
                headView.x = i * this.groupLeftCardHeads.width / 5;
                headView.y = 0;
            }
            else {
                headView.x = (i - 5) * this.groupLeftCardHeads.width / 5;
                headView.y = 160;
            }
        }
    };
    CombatRecordView.prototype.setRightCardHeads = function (index) {
        var str = this.mallName[index]["loseCards"];
        var arr1 = str.split('|');
        var num = arr1.length;
        for (var i = 0; i < num; i++) {
            var str = arr1[i];
            var arr = str.split(',');
            var data = { "icon": arr[0], name: arr[1], "rarity": arr[2], "element": arr[3], "generation": arr[4], "level": ExternalFun.prototype.levelnumTo5lvl(parseInt(arr[5])), combat: arr[6] };
            var headView = new CardHeadView();
            headView.initData(data);
            headView.setGrayHead();
            this.groupRightCardHeads.addChild(headView);
            this.arrCardHeadView.push(headView);
            if (i < 5) {
                headView.x = i * this.groupRightCardHeads.width / 5;
                headView.y = 0;
            }
            else {
                headView.x = (i - 5) * this.groupRightCardHeads.width / 5;
                headView.y = 160;
            }
        }
    };
    //设置记录显示;
    CombatRecordView.prototype.setDetails = function (index) {
        var self = this;
        var curIdx = index;
        self.setLeftName(self.mallName[curIdx]["winName"]);
        self.setRightName(self.mallName[curIdx]["loseName"]);
        self.setLeftHead(self.mallName[curIdx]["winIcon"]);
        self.setRightHead(self.mallName[curIdx]["loseIcon"]);
        self.setLeftCombat(self.mallName[curIdx]["winCap"]);
        self.setRightCombat(self.mallName[curIdx]["loseCap"]);
        self.setRecordId(self.mallName[curIdx]["settId"]);
        self.setLeftCardHeads(curIdx);
        self.setRightCardHeads(curIdx);
        var winjbidx = self.mallName[curIdx]["winJbid"];
        //  winjbidx =  "SKL10000000|SKL10000000"
        // 赢家羁绊
        var arr = winjbidx.split('|');
        var jblist = [];
        for (var i = 0; i < arr.length; i++) {
            var idx = "0";
            if (arr[i] != "") {
                idx = arr[i]; //"SKL1" + ExternalFun.prototype.add0(arr[i],7);
                jblist.push(self.jbList[idx]["name"]);
            }
        }
        if (jblist.length > 0) {
            self.setLeftFetters(jblist);
        }
        // 输家羁绊
        arr = [];
        jblist = [];
        var losejbidx = self.mallName[curIdx]["loseJbid"];
        //     losejbidx =  "SKL10000000|SKL10000000"
        arr = losejbidx.split('|');
        for (var i = 0; i < arr.length; i++) {
            var idx = "0";
            if (arr[i] != "") {
                idx = arr[i]; //"SKL1" + ExternalFun.prototype.add0(arr[i],7);
                jblist.push(self.jbList[idx]["name"]);
            }
        }
        if (jblist.length > 0) {
            self.setRightFetters(jblist);
        }
    };
    CombatRecordView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.recordskingroup == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.recordskingroup.scaleX =
                self.recordskingroup.scaleY = 1;
            return;
        }
        self.recordskingroup.scaleX =
            self.recordskingroup.scaleY = gapNum;
    };
    CombatRecordView.NAME = "CombatRecordSkin";
    return CombatRecordView;
}(BaseView));
__reflect(CombatRecordView.prototype, "CombatRecordView");
//# sourceMappingURL=CombatRecordView.js.map