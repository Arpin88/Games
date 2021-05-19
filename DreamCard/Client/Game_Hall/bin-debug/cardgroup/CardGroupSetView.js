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
var CardGroupSetView = (function (_super) {
    __extends(CardGroupSetView, _super);
    function CardGroupSetView() {
        var _this = _super.call(this, CardGroupSetView.NAME) || this;
        // private attributeTextField:egret.TextField; //卡组属性描述文本;
        _this.arrCardFetters = new Array(); //卡牌羁绊容器
        _this.arrSCardItem = new Array(); //小卡牌容器
        _this.arrRCardItem = new Array(); //长方形卡牌容器
        _this.bRCardScale = 0.5; //大图长方形卡牌缩放比例
        _this.cRCardScale = 0.35; //中图长方形卡牌缩放比例
        _this.onChangeStart = false; //当开始长方形卡牌切换
        _this.arrRCardPosX = new Array(); //长方形卡牌坐标
        // private arrSort1:Array<string> = ["战力由高到低","战力由低到高","攻击由高到低","攻击由低到高","生命由高到低","生命由低到高","费用由低到高","费用由高到低"];
        // private arrSort2:Array<string> = ["全品质","普通","稀有","史诗","传说","神话"];
        // private arrSort3:Array<string> = ["全五行","金","木","水","火","土"];
        _this.arrSort1 = [];
        _this.arrSort2 = [];
        _this.arrSort3 = [];
        _this.arrSortBtn1 = ["zhanligd_0", "zhanlidg_0", "gongjigd_0", "gongjidg_0", "smgd_0", "smdg_0", "fydg_0", "fygd_0"];
        _this.arrSortBtn2 = ["qpz_0", "pt_0", "xy_0", "ss_0", "cq_0", "sh_0"];
        _this.arrSortBtn3 = ["qwx_0", "j_0", "mu_0", "s_0", "h_0", "t_0"];
        _this.sortFactor = { sort: 0, rarity: 0, element: 0 };
        _this.pageNum = 1; //当前页数
        _this.pageSize = 10; //一页的数量
        _this.cardCostStr = ""; //总花费
        _this.movingState = false; //移动状态
        return _this;
    }
    CardGroupSetView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrCCardItem.addEventListener(eui.UIEvent.CHANGE_START, self.onChangeStartHandler, self);
        self.scrCCardItem.addEventListener(egret.Event.CHANGE, self.onChangeHanlder, self);
        self.scrCCardItem.addEventListener(eui.UIEvent.CHANGE_END, self.onChangeEndHandler, self);
        self.scrCCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrCCardItem.addEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        // self.editName.addEventListener(egret.Event.CHANGE, self.onEditNameChange, self);
        // self.setSCardItem();
        // self.setCardFetters();
        // self.setBCardItem();
        // self.setBCardItem();
        // self.setCardGroupAttribute();
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.initView();
        self.sendGetCardList();
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var arrTeamConfig = data.arrTeamConfig;
        self.initTeamConfig(arrTeamConfig);
        var teamData = data.teamData;
        self.setTeamItem(teamData);
        if (teamData != null) {
            var cardGroupName = teamData["name"];
            self.setCardGroupName(cardGroupName);
        }
        self.callBackUpdateTeam = data.cbUpdateTeam;
    };
    CardGroupSetView.prototype.initView = function () {
        var self = this;
        self.pageNum = 1;
        // self.imgChoose.visible = false;
        self.btnDetails.visible = false;
        self.curChooseRCardIndex = -1;
        // arrSort1:Array<string> = ["战力由高到低","战力由低到高","攻击由高到低","攻击由低到高","生命由高到低","生命由低到高","费用由低到高","费用由高到低"];
        // arrSort2:Array<string> = ["全品质","普通","稀有","史诗","传说","神话"];
        // arrSort3:Array<string> = ["全五行","金","木","水","火","土"];
        for (var i = 0; i < 20; i++) {
            if (i < 8)
                self.arrSort1.push(self.labelObj["lbl_" + i]);
            else if (i < 14)
                self.arrSort2.push(self.labelObj["lbl_" + i]);
            else if (i < 20)
                self.arrSort3.push(self.labelObj["lbl_" + i]);
        }
        self.lblCCost.text = "0/0";
        self.lblCHp.text = "0";
        self.lblCAtk.text = "0";
        self.lblCCapacity.text = "0";
        self.lblCEle.text = "";
        self.lblCFetters.text = "";
        // self.btnSort.label = self.arrSortBtn1[self.sortFactor["sort"]];
        // self.btnQuality.label = self.arrSortBtn2[self.sortFactor["rarity"]];
        // self.btnElements.label = self.arrSortBtn3[self.sortFactor["element"]];
        self.changeBtnImage(self.btnSort, self.arrSortBtn1[self.sortFactor["sort"]]);
        self.changeBtnImage(self.btnQuality, self.arrSortBtn2[self.sortFactor["rarity"]]);
        self.changeBtnImage(self.btnElements, self.arrSortBtn3[self.sortFactor["element"]]);
        self.removeRCardItem();
        self.setUserInfo();
    };
    CardGroupSetView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchTap, self);
        }
        self.scrCCardItem.removeEventListener(eui.UIEvent.CHANGE_START, self.onChangeStartHandler, self);
        self.scrCCardItem.removeEventListener(egret.Event.CHANGE, self.onChangeHanlder, self);
        self.scrCCardItem.removeEventListener(eui.UIEvent.CHANGE_END, self.onChangeEndHandler, self);
        self.scrCCardItem.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onCancelHandler, self);
        self.scrCCardItem.removeEventListener(egret.TouchEvent.TOUCH_END, self.onEndHandler, self);
        // self.editName.removeEventListener(egret.Event.CHANGE, self.onEditNameChange, self);
        // if(self.attributeTextField!=null){
        //     self.attributeTextField.parent.removeChild(self.attributeTextField);
        //     self.attributeTextField = null;
        // }
        while (self.arrSort1.length != 0)
            self.arrSort1.pop();
        while (self.arrSort2.length != 0)
            self.arrSort2.pop();
        while (self.arrSort3.length != 0)
            self.arrSort3.pop();
        self.labelObj = null;
        if (self.cCardScrViewGroup != null) {
            self.cCardScrViewGroup.parent.removeChild(self.cCardScrViewGroup);
            self.cCardScrViewGroup = null;
        }
        self.cleanArray(self.arrSCardItem);
        self.cleanArray(self.arrCardFetters);
        self.cleanArray(self.arrRCardItem);
        while (self.arrRCardPosX.length) {
            self.arrRCardPosX.pop();
        }
    };
    CardGroupSetView.prototype.cleanArray = function (arr) {
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
    CardGroupSetView.prototype.touchTap = function (event) {
        var self = this;
        if (event.target instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            var btn = event.target;
            // if(btn==self.btnEdit){
            //     self.editName.setFocus();
            // }else if(btn==self.btnSort){
            if (btn == self.btnSort) {
                var data = { desArr: self.arrSort1, cbHandler: Handler.create(self, self.onChooseCardSort1), selIndex: self.sortFactor["sort"] };
                UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
            }
            else if (btn == self.btnQuality) {
                var data = { desArr: self.arrSort2, cbHandler: Handler.create(self, self.onChooseCardSort2), selIndex: self.sortFactor["rarity"] };
                UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
            }
            else if (btn == self.btnElements) {
                var data = { desArr: self.arrSort3, cbHandler: Handler.create(self, self.onChooseCardSort3), selIndex: self.sortFactor["element"] };
                UIManager.getInstance().showUI(FilterView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
            }
            else if (btn == self.btnSave) {
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                self.sendSaveTeam();
            }
            else if (btn == self.btnBack) {
                self.hiden();
            }
            else if (btn == self.btnDetails) {
                if (self.curChooseRCardIndex != -1) {
                    var view = self.arrRCardItem[self.curChooseRCardIndex];
                    var vdata = view.getData();
                    if (vdata == null)
                        return;
                    var code = vdata.code;
                    if (code != null)
                        self.showCardDetailView(code);
                }
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name.substr(0, 8) == "groupCR_") {
                if (self.movingState)
                    return;
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                var strArr = group.name.split("_");
                if (strArr.length != 2)
                    return;
                var cIndex = Number(strArr[1]);
                self.onClickRCardItem(cIndex);
                if (UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }
            else if (group.name.substr(0, 11) == "groupCGSCI_") {
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                var strArr = group.name.split("_");
                if (strArr.length != 2)
                    return;
                var cIndex = Number(strArr[1]);
                self.onClickSCardItem(cIndex);
            }
        }
    };
    CardGroupSetView.prototype.onClickRCardItem = function (index) {
        var self = this;
        if (self.curChooseRCardIndex != index) {
            self.scrollToItem(index);
            return;
        }
        var view = self.arrRCardItem[index];
        if (view == null)
            return;
        var cdata = view.getData();
        if (cdata != null && cdata.code != null) {
            var code = cdata.code;
            var cIndex = self.getSCardItemIndex(code);
            if (cIndex != -1) {
                self.onRemoveSCardItem(cIndex);
            }
            else {
                var objData = null;
                for (var i = 0, lengthI = self.arrSCardItem.length; i < lengthI; i++) {
                    var item = self.arrSCardItem[i];
                    if (item == null)
                        continue;
                    if (item.getType() == 1) {
                        cIndex = i;
                        break;
                    }
                }
                if (cIndex != -1) {
                    self.setSCardItem(cIndex, cdata);
                    self.updateBCardSelShow();
                    self.updateCardGroupAttribute();
                }
            }
        }
    };
    CardGroupSetView.prototype.onChangeCardSort = function (type, index) {
        var self = this;
        if (self.sortFactor == null)
            return;
        var param = "";
        if (type == 1) {
            param = "sort";
        }
        else if (type == 2) {
            param = "rarity";
        }
        else {
            param = "element";
        }
        var val = self.sortFactor[param];
        var sendData = true;
        if (val == null || val == index) {
            sendData = false;
        }
        if (sendData) {
            self.sortFactor[param] = index;
            self.pageNum = 1;
            self.sendGetCardList();
            // self.btnSort.label = self.arrSortBtn1[self.sortFactor["sort"]];
            // self.btnQuality.label = self.arrSortBtn2[self.sortFactor["rarity"]];
            // self.btnElements.label = self.arrSortBtn3[self.sortFactor["element"]];
            self.changeBtnImage(self.btnSort, self.arrSortBtn1[self.sortFactor["sort"]]);
            self.changeBtnImage(self.btnQuality, self.arrSortBtn2[self.sortFactor["rarity"]]);
            self.changeBtnImage(self.btnElements, self.arrSortBtn3[self.sortFactor["element"]]);
        }
        else {
            UIManager.getInstance().hideUI(FilterView);
        }
    };
    CardGroupSetView.prototype.onChooseCardSort1 = function (index) {
        this.onChangeCardSort(1, index);
    };
    CardGroupSetView.prototype.onChooseCardSort2 = function (index) {
        this.onChangeCardSort(2, index);
    };
    CardGroupSetView.prototype.onChooseCardSort3 = function (index) {
        this.onChangeCardSort(3, index);
    };
    //当点击卡牌
    CardGroupSetView.prototype.onClickSCardItem = function (index) {
        var self = this;
        if (self.arrSCardItem == null)
            return;
        var view = self.arrSCardItem[index];
        if (view == null || view.getType() == null || view.getType() != 0)
            return;
        // UIManager.getInstance().showUI(CardGroupSetView);
        var cardData = view.getCardData();
        if (cardData == null)
            return;
        var code = cardData["code"];
        self.showCardDetailView(code);
    };
    CardGroupSetView.prototype.showCardDetailView = function (code) {
        if (code == null || code == "")
            return;
        var self = this;
        var obj = null;
        var lengthI = self.arrCardDetailData == null ? 0 : self.arrCardDetailData.length;
        for (var i = 0; i < lengthI; i++) {
            var item = self.arrCardDetailData[i];
            if (item == null)
                continue;
            if (item.code == code) {
                obj = item;
                break;
            }
        }
        //如果本地没有数据则去请求服务器
        if (obj == null) {
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            var reqObj = { code: code };
            HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET, reqObj);
            return;
        }
        var index = -1;
        for (var i = 0, lengthI = self.arrSCardItem.length; i < lengthI; i++) {
            var item0 = self.arrSCardItem[i];
            if (item0 == null || item0.getType() != 0 || item0.getCardData() == null)
                continue;
            if (item0.getCardData()["code"] == code) {
                index = i;
                break;
            }
        }
        var objData = { cdata: obj };
        if (index != -1) {
            objData.cbRemove = Handler.create(self, self.onRemoveSCardItem, [index]);
        }
        UIManager.getInstance().showUI(CGDetailView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, objData);
    };
    //当卸下正方形卡牌回调
    CardGroupSetView.prototype.onRemoveSCardItem = function (index) {
        if (index == null || index < 0)
            return;
        var self = this;
        var view = self.arrSCardItem[index];
        if (view == null)
            return;
        view.updateShow({ type: 1 });
        self.updateBCardSelShow();
        UIManager.getInstance().hideUI(CGDetailView);
        self.updateCardGroupAttribute();
    };
    //设置卡组属性
    CardGroupSetView.prototype.setCardGroupAttribute = function (costStr, hp, atk, ele) {
        var self = this;
        self.lblCCost.text = costStr;
        self.lblCHp.text = hp + "";
        self.lblCAtk.text = atk + "";
        self.lblCCapacity.text = (hp + atk) + "";
        self.lblCEle.text = ele;
    };
    //设置组成羁绊
    CardGroupSetView.prototype.setFromFetter = function (fetters) {
        this.lblCFetters.text = fetters;
    };
    //切换按钮图片
    CardGroupSetView.prototype.changeBtnImage = function (btn, source) {
        var prefix = "hallBtn2Sheet_json.";
        var btnNor_Image = btn.getChildAt(0);
        btnNor_Image.source = prefix + source;
        var downSource = source;
        var arrStr = source.split('_');
        if (arrStr.length == 2) {
            downSource = prefix + arrStr[0] + "_1";
        }
        var arr2States = btn.skin.states;
        var property2Down = arr2States[1].overrides[0];
        property2Down.value = downSource;
    };
    CardGroupSetView.prototype.initTeamConfig = function (data) {
        var self = this;
        self.arrTeamConfig = data;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        var hMaxCount = 5;
        var hIndex = 0;
        var widthGap = self.scrSCardItem.width / hMaxCount;
        var vIndex = 0;
        for (var i = 0, lengthI = data.length; i < lengthI; i++) {
            var item = data[i];
            if (item == null)
                continue;
            var unlocklvl = item.unlocklvl;
            if (unlocklvl == null)
                continue;
            var type = 2;
            if (accountData != null && accountData.getLvl() >= unlocklvl) {
                type = 1;
            }
            var groupName = "groupCGSCI_" + i;
            var obj = { type: type, sdata: unlocklvl, gname: groupName };
            var view = new CGSCardItemView();
            view.initData(obj);
            self.groupSCardItem.addChild(view);
            view.x = hIndex * widthGap;
            var height = view.getViewHeight();
            view.y = vIndex * (height + 10);
            self.arrSCardItem.push(view);
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
    };
    CardGroupSetView.prototype.setTeamItem = function (data) {
        var self = this;
        var curBattleTeam = data;
        for (var i = 0, lengthI = self.arrTeamConfig.length; i < lengthI; i++) {
            var itemConfig = self.arrTeamConfig[i];
            if (itemConfig == null)
                continue;
            var codeC = itemConfig.code;
            if (curBattleTeam != null && curBattleTeam[codeC] != null) {
                var itemBT = curBattleTeam[codeC];
                self.setSCardItem(i, itemBT);
            }
        }
        self.updateCardGroupAttribute();
    };
    CardGroupSetView.prototype.updateCardGroupAttribute = function () {
        var self = this;
        var tHp = 0;
        var tAtk = 0;
        var tCosk = 0;
        var fele = "";
        var sele = "";
        var codes = new Array();
        for (var i = 0, lengthI = self.arrSCardItem.length; i < lengthI; i++) {
            var item = self.arrSCardItem[i];
            if (item == null || item.getCardData() == null)
                continue;
            var cardData = item.getCardData();
            var code = cardData.code;
            codes.push(code);
            var hp = cardData.hp;
            var atk = cardData.atk;
            var cost = cardData.cost;
            var ele = cardData.element;
            tHp += hp;
            tAtk += atk;
            tCosk += cost;
            if (i < 5)
                fele += PublicMethodManager.getInstance().getCardElement(ele);
            else
                sele += PublicMethodManager.getInstance().getCardElement(ele);
        }
        var accountData = GlobalDataManager.getInstance().getAccountData();
        self.cardCostStr = tCosk + "/" + accountData.getCost();
        self.setCardGroupAttribute(self.cardCostStr, tHp, tAtk, fele + "\n" + sele);
        if (codes.length <= 0) {
            self.setFromFetter("");
        }
        else {
            self.sendGetTeamFromFetters(codes);
        }
    };
    //设置正方形卡牌
    CardGroupSetView.prototype.setSCardItem = function (index, data) {
        var self = this;
        if (self.arrSCardItem == null)
            return;
        var cardItem = self.arrSCardItem[index];
        if (cardItem == null)
            return;
        var obj = { type: 0, sdata: data };
        cardItem.updateShow(obj);
    };
    //设置长方形卡牌
    CardGroupSetView.prototype.setRCardItem = function (data) {
        var self = this;
        if (self.pageNum == 1) {
            self.removeRCardItem();
        }
        var hIndex = 0;
        var gapWidth = 10;
        var width = 0;
        var sCount = self.arrRCardItem.length;
        var count = data == null ? sCount : sCount + data.length;
        for (var i = sCount; i < count; i++) {
            var index = i - sCount;
            var item = data[index];
            if (item == null)
                continue;
            var view = new CardRectangleView();
            var obj = item;
            obj.groupName = "groupCR_" + i;
            view.initData(obj);
            self.groupCCardItem.addChild(view);
            if (width == 0)
                width = view.getViewWidth();
            var posX = i * (width * self.cRCardScale + gapWidth);
            view.x = posX;
            view.y = 0;
            view.scaleX = view.scaleY = self.cRCardScale;
            self.arrRCardItem.push(view);
            self.arrRCardPosX.push(posX);
        }
        if (count - sCount < self.pageSize && self.cCardScrViewGroup == null) {
            var group = new eui.Group();
            if (width == 0 && self.arrRCardItem.length > 0) {
                width = self.arrRCardItem[0].getViewWidth();
            }
            group.x = width * self.cRCardScale * (count + 1);
            group.y = 0;
            group.width = self.scrCCardItem.width;
            group.height = 0;
            self.groupCCardItem.addChild(group);
            self.cCardScrViewGroup = group;
        }
        if (self.curChooseRCardIndex == -1 && self.arrRCardItem.length > 0) {
            if (UIManager.getInstance().checkHasViewByName(GuideView))
                GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
        }
        self.checkScale();
        self.updateBCardSelShow();
    };
    //设置用户数据
    CardGroupSetView.prototype.setUserInfo = function () {
        var self = this;
        var accountData = GlobalDataManager.getInstance().getAccountData();
        // if(self.groupIcon.numChildren<=1){
        //头像圆形遮罩
        // if(self.iconMaskShape==null){
        //     var iconMaskShape = new egret.Shape();
        //     iconMaskShape.graphics.beginFill( 0x000000);
        //     var width:number = self.groupIcon.width/2;
        //     var height:number = self.groupIcon.height/2;
        //     iconMaskShape.x = width;
        //     iconMaskShape.y = height;
        //     iconMaskShape.graphics.drawCircle( 0, 0,  width);
        //     iconMaskShape.graphics.endFill();
        //     self.groupIcon.addChild(iconMaskShape);
        //     self.iconMaskShape = iconMaskShape;
        // }
        self.imgIcon.source = accountData.getHead_Url();
        self.lblLvl.text = accountData.getLvl() + "";
        // if(self.iconMaskShape!=null)
        //     self.imgIcon.mask = self.iconMaskShape;
        //   var iconUrl:string = accountData.getHead_Url();
        // var iconUrl:string = "http://dl.bbs.9game.cn/attachments/forum/202002/24/163438cmy1qemiieaefmym.png";
        // if(iconUrl!=null&&iconUrl!=""){
        //     var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        //     egret.ImageLoader.crossOrigin = "anonymous";
        //     imgLoader.load(iconUrl);
        //     imgLoader.once(egret.Event.COMPLETE, self.onLoadImgCompleteHandler, self);
        //     imgLoader.once(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent){
        //     console.log("加载网络图片:"+iconUrl+" 出现错误!")},self);
        // }
        // }        
    };
    // //当load网络图片完成事件
    // private onLoadImgCompleteHandler(evt: egret.Event): void {
    //     var self = this;
    //     if (evt.currentTarget.data) {
    //         // egret.log("加载头像成功: " + evt.currentTarget.data);
    //         let texture = new egret.Texture();
    //         texture.bitmapData = evt.currentTarget.data;
    //         let bitmap = new egret.Bitmap(texture);
    //         bitmap.x = 0;
    //         bitmap.y = 0;
    //         bitmap.width = self.groupIcon.width;
    //         bitmap.height = self.groupIcon.height;
    //         self.groupIcon.addChild(bitmap);
    //         if(self.iconMaskShape!=null)
    //             bitmap.mask = self.iconMaskShape;
    //     }
    // }
    CardGroupSetView.prototype.removeRCardItem = function () {
        var self = this;
        while (self.arrRCardPosX.length) {
            self.arrRCardPosX.pop();
        }
        self.cleanArray(self.arrRCardItem);
        if (self.cCardScrViewGroup != null) {
            self.cCardScrViewGroup.parent.removeChild(self.cCardScrViewGroup);
            self.cCardScrViewGroup = null;
        }
        self.curChooseRCardIndex = -1;
        self.scrCCardItem.viewport.scrollH = 0;
    };
    CardGroupSetView.prototype.addCardDetail = function (data) {
        var self = this;
        if (self.arrCardDetailData == null)
            self.arrCardDetailData = new Array();
        var code = data.code;
        var hasData = false;
        for (var i = 0, lengthI = self.arrCardDetailData.length; i < lengthI; i++) {
            var item = self.arrCardDetailData[i];
            if (item == null)
                continue;
            if (code == item.code) {
                hasData = true;
                break;
            }
        }
        if (!hasData) {
            self.arrCardDetailData.push(data);
        }
        // var objData:Object = {data:data};
        // UIManager.getInstance().showUI(CGDetailView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,objData);
        self.showCardDetailView(code);
    };
    //接收数据
    CardGroupSetView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case HallCmdDef.CMD_GET_CARD_LIST_TEAMSET://获取队伍配置
                self.setRCardItem(data);
                UIManager.getInstance().hideUI(FilterView);
                break;
            case HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET:
                self.addCardDetail(data);
                break;
            case HallCmdDef.CMD_SAVE_TEAMSET:
                self.onSaveTeamComplete();
                break;
            case HallCmdDef.CMD_GET_FROM_FETTER_TEAMSET:
                self.onGetTeamFromFetters(data);
                break;
        }
    };
    CardGroupSetView.prototype.onSaveTeamComplete = function () {
        var self = this;
        var objData = {};
        var data = _super.prototype.getData.call(this);
        if (data != null) {
            var cardGroupName = data.cardGroupName;
            objData.name = self.editName.text;
            var teamData = data.teamData;
            if (teamData != null) {
                var c_index = teamData.c_index;
                objData.c_index = c_index;
                for (var i = 0, lengthI = self.arrTeamConfig.length; i < lengthI; i++) {
                    var itemConfig = self.arrTeamConfig[i];
                    if (itemConfig == null || self.arrSCardItem[i] == null)
                        continue;
                    var codeC = itemConfig.code;
                    var cardData = self.arrSCardItem[i].getCardData();
                    if (cardData != null) {
                        objData[codeC] = cardData;
                    }
                }
            }
        }
        //更新卡组页面信息;
        if (self.callBackUpdateTeam != null)
            self.callBackUpdateTeam.runWith(objData);
        PopManager.getInstance().showPromptBox(self.labelObj["lbl_20"], 1, Handler.create(self, function (confirm) {
            if (confirm) {
                self.hiden();
            }
        }), [self.labelObj["lbl_21"], self.labelObj["lbl_22"]]);
    };
    //发送请求卡牌列表
    CardGroupSetView.prototype.sendGetCardList = function () {
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        var obj = { rarity: self.sortFactor["rarity"], element: self.sortFactor["element"], sort: self.sortFactor["sort"], pageNum: self.pageNum, pageSize: self.pageSize, detail: 0 };
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_CARD_LIST_TEAMSET, obj);
    };
    //发送获取队伍组成羁绊
    CardGroupSetView.prototype.sendGetTeamFromFetters = function (codes) {
        if (codes == null || codes.length <= 0)
            return;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_GET_FROM_FETTER_TEAMSET, { codes: codes }, false);
    };
    //请求保存数据
    CardGroupSetView.prototype.sendSaveTeam = function () {
        var self = this;
        var teamName = self.editName.text;
        if (teamName == "") {
            // PopManager.getInstance().showPromptBox("保存失败!卡组名称不能为空!",2);
            PopManager.getInstance().showPromptBox(self.labelObj["lbl_23"], 2);
            // console.log("保存失败!队伍的cost大于用户目前最大的cost!");
            return;
        }
        var costList = self.cardCostStr.split("/");
        if (costList == null || costList.length != 2)
            return;
        var costA = Number(costList[1]);
        var costT = Number(costList[0]);
        if (costA < costT) {
            // PopManager.getInstance().showPromptBox("保存失败!队伍的cost大于用户目前最大的cost!",2);
            PopManager.getInstance().showPromptBox(self.labelObj["lbl_24"], 2);
            // console.log("保存失败!队伍的cost大于用户目前最大的cost!");
            return;
        }
        var objData = {};
        var data = _super.prototype.getData.call(this);
        if (data != null) {
            var cardGroupName = data.cardGroupName;
            // if(cardGroupName!=null&&self.editName.text!=cardGroupName){
            // }
            objData.name = teamName;
            var teamData = data.teamData;
            var curTeamData = {};
            if (teamData != null) {
                var c_index = teamData.c_index;
                curTeamData.c_index = c_index;
                var hasData = false;
                for (var i = 0, lengthI = self.arrTeamConfig.length; i < lengthI; i++) {
                    var itemConfig = self.arrTeamConfig[i];
                    if (itemConfig == null || self.arrSCardItem[i] == null)
                        continue;
                    var codeC = itemConfig.code;
                    var cardData = self.arrSCardItem[i].getCardData();
                    var code = "";
                    if (cardData != null && cardData.code != null) {
                        code = cardData.code;
                        hasData = true;
                    }
                    curTeamData[codeC] = code;
                }
                if (!hasData) {
                    // PopManager.getInstance().showPromptBox("保存失败!配置卡组不能为空!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_23"], 2);
                    // console.log("保存失败!队伍的cost大于用户目前最大的cost!");
                    return;
                }
            }
            objData.curTeamData = curTeamData;
        }
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), HallCmdDef.CMD_SAVE_TEAMSET, objData);
    };
    // private removeSCardItem():void{
    //     var self = this;
    //     if(self.arrCardItem==null)
    //         return;
    //     var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
    //     for(var i:number=0,lengthI:number = self.arrCardItem.length;i<lengthI;i++){
    //         var item:CGCardItemView =self.arrCardItem[i];
    //         if(item==null)
    //             continue;
    //         var type:number = 2;
    //         var cItem:any = self.arrTeamConfig[i];
    //         if(cItem==null)
    //             continue;
    //         var unlocklvl:number = cItem.unlocklvl;
    //         if(accountData!=null&&accountData.getLvl()>=unlocklvl){
    //             type = 1;
    //         }
    //         var obj:Object = {type:type,sdata:unlocklvl};
    //         item.updateShow(obj);
    //     }
    // }
    CardGroupSetView.prototype.setCardFetters = function (data) {
        if (data == null)
            return;
        var self = this;
        self.cleanArray(self.arrCardFetters);
        var hMaxCount = 3;
        var hIndex = 0;
        var width = self.scrCardFetters.width / hMaxCount;
        var vIndex = 0;
        var count = 6;
        var lengthI = data.length < count ? count : data.length;
        for (var i = 0; i < lengthI; i++) {
            var objData = { type: 0, fdata: null };
            var item = data[i];
            if (item != null) {
                objData.type = 1;
                objData.fdata = { icon: item.icon, color: item.color, canTouch: false };
            }
            var view = new CGSFetterItemView();
            view.initData(objData);
            self.groupCardFetters.addChild(view);
            view.x = hIndex * (width + 5);
            view.y = vIndex * (view.height + 20);
            self.arrCardFetters.push(view);
            hIndex++;
            if (hIndex >= hMaxCount) {
                hIndex = 0;
                vIndex++;
            }
        }
    };
    /**拖动开始*/
    CardGroupSetView.prototype.onChangeStartHandler = function () {
        var self = this;
        self.onChangeStart = true;
        // if(self.imgChoose.visible)
        //     self.imgChoose.visible = false;
        if (self.btnDetails.visible)
            self.btnDetails.visible = false;
    };
    CardGroupSetView.prototype.onChangeHanlder = function (e) {
        var self = this;
        self.checkScale();
    };
    CardGroupSetView.prototype.onChangeEndHandler = function () {
        var self = this;
        if (self.onChangeStart) {
            self.onChangeStart = false;
            self.autoScrollToItem();
        }
        if (self.cCardScrViewGroup == null && (self.scrCCardItem.viewport.scrollH + self.scrCCardItem.width) >= self.scrCCardItem.viewport.contentWidth) {
            self.pageNum++;
            self.sendGetCardList();
        }
    };
    CardGroupSetView.prototype.onCancelHandler = function () {
        this.movingState = true;
    };
    CardGroupSetView.prototype.onEndHandler = function () {
        this.movingState = false;
    };
    /**
     * 自动选择
     */
    CardGroupSetView.prototype.autoScrollToItem = function () {
        var self = this;
        self.scrollToItem(self.curChooseRCardIndex);
    };
    CardGroupSetView.prototype.scrollToItem = function (index) {
        var self = this;
        if (index == -1) {
            return;
        }
        self.curChooseRCardIndex = index;
        var scrollH = self.arrRCardPosX[index];
        egret.Tween.removeTweens(self.scrCCardItem.viewport);
        SoundManager.getInstance().PlaySound("kapaihuadong_mp3");
        egret.Tween.get(self.scrCCardItem.viewport).to({ scrollH: scrollH }, 100).call(self.checkScale, self);
        self.updateBCardSelShow();
    };
    CardGroupSetView.prototype.updateBCardSelShow = function () {
        var self = this;
        // if(self.curChooseRCardIndex!=-1){
        //     // var view:CardRectangleView = self.arrRCardItem[self.curChooseRCardIndex];
        //     // self.imgChoose.visible = self.getSCardItemIndex(code)!=-1;
        //     self.btnDetails.visible = true;  
        // }else{
        //     // self.imgChoose.visible = false;
        //     self.btnDetails.visible = false;   
        // }
        self.btnDetails.visible = self.curChooseRCardIndex != -1;
        for (var i = 0, lengthI = self.arrRCardItem.length; i < lengthI; i++) {
            var item = self.arrRCardItem[i];
            if (item == null)
                continue;
            var vdata = item.getData();
            if (vdata == null)
                return;
            var code = vdata.code;
            if (code == null)
                return;
            item.setChoose(self.getSCardItemIndex(code) != -1);
        }
    };
    CardGroupSetView.prototype.getSCardItemIndex = function (code) {
        var self = this;
        for (var i = 0, lengthI = self.arrSCardItem.length; i < lengthI; i++) {
            var item = self.arrSCardItem[i];
            if (item == null || item.getType() != 0)
                continue;
            if (item.getCardData() != null && code == item.getCardData()["code"]) {
                return i;
            }
        }
        return -1;
    };
    CardGroupSetView.prototype.checkScale = function () {
        var self = this;
        var sc = self.scrCCardItem;
        var gapX = 22;
        var gapWidth = 100 - gapX;
        for (var i = 0, lengthI = self.arrRCardItem.length; i < lengthI; i++) {
            var item = self.arrRCardItem[i];
            item.x = self.arrRCardPosX[i] + gapX;
            var chaz = (item.x - sc.viewport.scrollH);
            if (Math.abs(chaz) < gapWidth && Math.abs(chaz) >= 0) {
                if (chaz < 0) {
                    item.scaleX =
                        item.scaleY = self.bRCardScale + chaz / 1000;
                }
                else if (chaz > 0) {
                    item.scaleX =
                        item.scaleY = self.bRCardScale - chaz / 1000;
                }
                else if (Math.abs(chaz) == 0) {
                    item.scaleX =
                        item.scaleY = self.bRCardScale;
                }
                // console.log(chaz);
                // item.scaleX = 
                // item.scaleY = self.bRCardScale+chaz/1000;
                item.y = 0;
                gapX = item.width * (self.bRCardScale - self.cRCardScale) + 40;
                if (self.curChooseRCardIndex != i)
                    SoundManager.getInstance().PlaySound("kapaihuadong_mp3");
                self.curChooseRCardIndex = i;
                if (i != 0) {
                    var item1 = self.arrRCardItem[i - 1];
                    item1.x = self.arrRCardPosX[i - 1] - 25;
                }
            }
            else {
                item.scaleX =
                    item.scaleY = self.cRCardScale;
                item.y = 40;
            }
        }
    };
    //设置卡组名称
    CardGroupSetView.prototype.setCardGroupName = function (name) {
        if (name == null)
            return;
        var self = this;
        self.editName.text = name;
        // self.updateCGNameBGImage();
    };
    // private onEditNameChange(e:eui.UIEvent):void{
    //     this.updateCGNameBGImage();
    // }
    // private updateCGNameBGImage():void{
    //     var self = this;
    //     self.editName.text = self.editName.text;
    //     // self.lblCGName.text = self.editName.text;
    //     // var width:number = 34+self.lblCGName.width;
    //     // width = width>220?220:width;
    //     // self.imgCGBG.width = width;
    //     // self.lblCGName.visible = false;
    // }
    //获取队伍组成羁绊
    CardGroupSetView.prototype.onGetTeamFromFetters = function (data) {
        if (data == null)
            return;
        var self = this;
        var fetters = data.fetters;
        var str = "";
        var arr = new Array();
        if (fetters != null) {
            for (var key in fetters) {
                var fetter = fetters[key];
                if (fetter == null)
                    continue;
                var name = fetter.name;
                str += (name + "\n");
                var fetterObj = { icon: fetter.icon, color: fetter.color };
                arr.push(fetterObj);
            }
        }
        self.setFromFetter(str);
        self.setCardFetters(arr);
    };
    CardGroupSetView.prototype.getCardGroupSetGroup = function () {
        return this.groupCardGroupSet;
    };
    CardGroupSetView.prototype.getCardRectangleViewItem = function () {
        var self = this;
        if (self.curChooseRCardIndex == -1 || self.arrRCardItem == null || self.arrRCardItem[self.curChooseRCardIndex] == null)
            return null;
        return self.arrRCardItem[self.curChooseRCardIndex];
    };
    CardGroupSetView.prototype.getSaveBtn = function () {
        return this.btnSave;
    };
    CardGroupSetView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupCardGroupSet == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupCardGroupSet.scaleX =
                self.groupCardGroupSet.scaleY = 1;
            return;
        }
        self.groupCardGroupSet.scaleX =
            self.groupCardGroupSet.scaleY = gapNum;
    };
    CardGroupSetView.NAME = "CardGroupSetSkin";
    return CardGroupSetView;
}(BaseView));
__reflect(CardGroupSetView.prototype, "CardGroupSetView");
//# sourceMappingURL=CardGroupSetView.js.map