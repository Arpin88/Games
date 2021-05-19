// TypeScript file
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
var HallDecoder = (function (_super) {
    __extends(HallDecoder, _super);
    function HallDecoder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //方法前缀 
        _this.funcPrefix = "method_";
        return _this;
    }
    //请重写该方法;
    HallDecoder.prototype.initDecoderFunction = function () {
        var self = this;
        for (var key in HallCmdDef) {
            var keyToAny = key;
            if (isNaN(keyToAny)) {
                var anyType = HallCmdDef[key];
                var cEnum = anyType;
                var func = self[self.funcPrefix + cEnum];
                if (func) {
                    self.registerCmd(cEnum, func);
                }
            }
        }
    };
    HallDecoder.prototype.removeDecoderFunction = function () {
        var self = this;
        for (var key in HallCmdDef) {
            var keyToAny = key;
            if (isNaN(keyToAny)) {
                var anyType = HallCmdDef[key];
                var cEnum = anyType;
                var func = self[self.funcPrefix + cEnum];
                if (func) {
                    self.unRegisterFunction(cEnum);
                }
            }
        }
    };
    HallDecoder.prototype.method_100 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        console.log(data);
    };
    // // 消息
    // private method_103(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // 设置界面
    //     console.log(data);
    //     let mallview: MallView = UIManager.getInstance().getViewByName(MallView) as MallView;
    //     if(mallview)
    //         mallview.recvData(HallCmdDef.CMD_GET_MOLL_CONFIG,data.msg);
    // }
    //  // 购买消息
    // private method_104(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // 购买
    //     console.log(data);
    //     let mallview: MallView = UIManager.getInstance().getViewByName(MallView) as MallView;
    //     if(mallview)
    //         mallview.recvData(HallCmdDef.CMD_GET_MOLLBY_CONFIG,data);
    //     let hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
    //     if(hallView)
    //         hallView.recvData(HallCmdDef.CMD_GETUPADTEGOLD,data);
    // }
    //  // 背包消息
    //     private method_105(data:any):void{
    //         if(ErrorMananger.getInstance().checkReqResult(data))
    //             return;
    //         // 设置界面
    //         console.log(data);
    //         let mallview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
    //         if(mallview)
    //             mallview.recvData(HallCmdDef.CMD_Bag,data.msg);
    //     }
    //      // 使用背包消息
    //     private method_106(data:any):void{
    //         if(ErrorMananger.getInstance().checkReqResult(data))
    //             return;
    //         // 设置界面
    //         console.log(data);
    //         let mallview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
    //         if(mallview)
    //             mallview.recvData(HallCmdDef.CMD_Baguse,data);
    //         let view:CardOperationView = UIManager.getInstance().getViewByName(CardOperationView) as CardOperationView;
    //         if(view)
    //             view.recvData(HallCmdDef.CMD_Baguse,data);
    //     }
    // // 使用背包升级
    // private method_216(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // 设置界面
    //     console.log(data);
    //     let view:CardOperationView = UIManager.getInstance().getViewByName(CardOperationView) as CardOperationView;
    //     if(view)
    //         view.recvData(HallCmdDef.CMD_BaguseUp,data);
    //     let mallview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
    //     if(mallview)
    //         mallview.recvData(HallCmdDef.CMD_BaguseUp,data);
    // }
    //  // 摧毁背包道具消息
    // private method_206(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // 设置界面
    //     let mallview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
    //     if(mallview)
    //         mallview.recvData(HallCmdDef.CMD_BagDestory,data);
    // }
    // 跑马灯
    HallDecoder.prototype.method_107 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        // 设置界面
        var hallView = UIManager.getInstance().getViewByName(HallView);
        if (hallView)
            hallView.recvData(HallCmdDef.CMD_Notice, data);
    };
    // 使用背包消息
    HallDecoder.prototype.method_208 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        // 战绩
        var recordView = UIManager.getInstance().getViewByName(CombatRecordView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_Record, data);
    };
    //抽奖
    HallDecoder.prototype.method_125 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        // 抽奖主界面
        var recordView = UIManager.getInstance().getViewByName(ExtractView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_Award, data);
    };
    //抽奖 结果
    HallDecoder.prototype.method_126 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        // 抽奖结果界面
        var recordView = UIManager.getInstance().getViewByName(ChouCardView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_Award10, data);
    };
    //新抽奖结果
    HallDecoder.prototype.method_127 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        // 我的卡牌
        var chouView = UIManager.getInstance().getViewByName(ChouCardView);
        if (chouView)
            chouView.recvData(HallCmdDef.CMD_MyCardList, data);
        // 十连抽界面
        var recordView = UIManager.getInstance().getViewByName(ExtractView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_MyCardList, data);
        // 大厅界面
        var hallView = UIManager.getInstance().getViewByName(HallView);
        if (hallView)
            hallView.recvData(HallCmdDef.CMD_GETUPADTEGOLD, data);
    };
    //新抽奖结果
    HallDecoder.prototype.method_129 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
    };
    HallDecoder.prototype.method_110 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupView = UIManager.getInstance().getViewByName(CardGroupView);
        if (cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_GET_TEAM_CONFIG, data.msg);
    };
    HallDecoder.prototype.method_501 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(ExchangeView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_Change, data.msg); // 充值转入
    };
    HallDecoder.prototype.method_502 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(ExchangeView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_InChange, data.msg);
    };
    HallDecoder.prototype.method_503 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(ExchangeView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_OutChange, data.msg);
    };
    HallDecoder.prototype.method_504 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        //let recoreView: RecordView = UIManager.getInstance().getViewByName(RecordView) as RecordView;
        //if(recoreView)
        //    recoreView.recvData(HallCmdDef.CMD_ChangeRecord,data); 
        var recoreView = UIManager.getInstance().getViewByName(ExchangeView);
        if (recoreView)
            recoreView.recvData(HallCmdDef.CMD_ChangeRecord, data);
    };
    HallDecoder.prototype.method_505 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(ExchangeView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_ChangeCash, data);
    };
    HallDecoder.prototype.method_506 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(CardGroupUploadView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_TurnCard, data);
    };
    HallDecoder.prototype.method_507 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(CardRecordView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_CardRecord, data.msg);
    };
    HallDecoder.prototype.method_508 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var changeView = UIManager.getInstance().getViewByName(CardGroupUploadView);
        if (changeView)
            changeView.recvData(HallCmdDef.CMD_CardProgress, data.msg);
    };
    HallDecoder.prototype.method_111 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupView = UIManager.getInstance().getViewByName(CardGroupView);
        if (cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_GET_TEAM_LIST, data.msg);
    };
    HallDecoder.prototype.method_112 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupView = UIManager.getInstance().getViewByName(CardGroupView);
        if (cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_CHANGE_BATTLE_TEAM, data.msg);
    };
    HallDecoder.prototype.method_302 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupView = UIManager.getInstance().getViewByName(CardGroupView);
        if (cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_WalletResult, data.msg);
    };
    HallDecoder.prototype.method_113 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        console.log(data);
        var cardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView);
        if (cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_GET_CARD_LIST_TEAMSET, data.msg);
        var cardUploadView = UIManager.getInstance().getViewByName(CardGroupUploadView);
        if (cardUploadView)
            cardUploadView.recvData(HallCmdDef.CMD_GET_CARD_LIST_TEAMSET, data.msg);
    };
    HallDecoder.prototype.method_228 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        console.log(data);
        // 我的卡牌走的是同一个通道
        var recordView = UIManager.getInstance().getViewByName(CardView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_CardViewLists, data.msg);
    };
    HallDecoder.prototype.method_232 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        console.log(data);
        // 我的卡牌走的是同一个通道
        var setView = UIManager.getInstance().getViewByName(SetView);
        if (setView)
            setView.recvData(HallCmdDef.CMD_SetHead, data);
        var hallView = UIManager.getInstance().getViewByName(HallView);
        if (hallView)
            hallView.recvData(HallCmdDef.CMD_SetHead, data);
    };
    HallDecoder.prototype.method_114 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        console.log(data);
        var cardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView);
        if (cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET, data.msg);
        // 我的卡牌走的是同一个通道
        var recordView = UIManager.getInstance().getViewByName(CardView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET, data.msg);
    };
    HallDecoder.prototype.method_115 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView);
        if (cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_SAVE_TEAMSET, data.msg);
    };
    HallDecoder.prototype.method_116 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupView = UIManager.getInstance().getViewByName(CardGroupView);
        if (cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_GET_FROM_FETTER_TEAM, data.msg);
    };
    HallDecoder.prototype.method_117 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var cardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView);
        if (cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_GET_FROM_FETTER_TEAMSET, data.msg);
    };
    // private method_124(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // 我的卡牌走的是同一个通道
    //     let recordView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
    //     if(recordView)
    //        recordView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL,data.msg);
    // }
    // 设置
    HallDecoder.prototype.method_128 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var setView = UIManager.getInstance().getViewByName(SetView);
        if (setView)
            setView.recvData(HallCmdDef.CMD_SetConfig, data.msg);
    };
    HallDecoder.prototype.method_150 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var recordView = UIManager.getInstance().getViewByName(CardView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_GET_CARD_LIST, data.msg);
    };
    HallDecoder.prototype.method_151 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var recordView = UIManager.getInstance().getViewByName(CardView);
        if (recordView)
            recordView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL, data.msg);
    };
    HallDecoder.prototype.method_152 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var view = UIManager.getInstance().getViewByName(CardOperationView);
        if (view)
            view.recvData(HallCmdDef.CMD_UPGRADE_CARD, data);
    };
    // 羁绊消息
    HallDecoder.prototype.method_160 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var aa = GlobalDataManager.getInstance().getJiBanData();
        var num1 = data["msg"]["length"]; // 羁绊表
        for (var k = 0; k < num1; k++) {
            var obj = data["msg"][k];
            // var jbconfigId:number = data["jbconfig"][k]["id"]
            // self.jbList[jbconfigId] = obj
            aa.setJBnode(obj.code, obj.jbName, obj.zc);
        }
        var Jiban = UIManager.getInstance().getViewByName(FettersView);
        if (Jiban)
            Jiban.recvData(HallCmdDef.CMD_GET_FETTERS_CONFIG, data.msg);
    };
    //回收获取卡牌列表
    HallDecoder.prototype.method_170 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var recycleView = UIManager.getInstance().getViewByName(RecycleView);
        if (recycleView)
            recycleView.recvData(HallCmdDef.CMD_GET_CARD_LIST_RECYCLE, data.msg);
    };
    //回收卡牌
    HallDecoder.prototype.method_171 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var recycleView = UIManager.getInstance().getViewByName(RecycleView);
        if (recycleView)
            recycleView.recvData(HallCmdDef.CMD_RECYCLE_CARD, data.msg);
    };
    //回收卡牌
    HallDecoder.prototype.method_175 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var recycleView = UIManager.getInstance().getViewByName(RecycleView);
        if (recycleView)
            recycleView.recvData(HallCmdDef.CMD_GET_CUR_XWG_PRICE, data.msg);
    };
    HallDecoder.prototype.method_180 = function (data) {
        // if(ErrorMananger.getInstance().checkReqResult(data))
        //     return;
        // let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        // if(matchingView)
        //     matchingView.recvData(HallCmdDef.CMD_MATCH_PVP,data.msg);
        var matchingView = UIManager.getInstance().getViewByName(MatchingView);
        if (matchingView)
            matchingView.recvData(HallCmdDef.CMD_MATCH_PVP, data);
    };
    HallDecoder.prototype.method_181 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var matchingView = UIManager.getInstance().getViewByName(MatchingView);
        if (matchingView)
            matchingView.recvData(HallCmdDef.CMD_DISMATCH_PVP, data.msg);
    };
    HallDecoder.prototype.method_182 = function (data) {
        // if(ErrorMananger.getInstance().checkReqResult(data))
        //     return;
        // let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        // if(matchingView)
        //     matchingView.recvData(HallCmdDef.CMD_GET_MATCH_PVP_INFO,data.msg);
        var matchingView = UIManager.getInstance().getViewByName(MatchingView);
        if (matchingView)
            matchingView.recvData(HallCmdDef.CMD_GET_MATCH_PVP_INFO, data);
    };
    HallDecoder.prototype.method_183 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var hallView = UIManager.getInstance().getViewByName(HallView);
        if (hallView)
            hallView.recvData(HallCmdDef.CMD_HALL_GET_MATCH_PVP_INFO, data.msg);
    };
    HallDecoder.prototype.method_200 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var roleUpgradeViewView = UIManager.getInstance().getViewByName(RoleUpgradeView);
        if (roleUpgradeViewView)
            roleUpgradeViewView.recvData(HallCmdDef.CMD_UPGRADE_COMMANDER, data.msg);
    };
    HallDecoder.prototype.method_201 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var roleUpgradeViewView = UIManager.getInstance().getViewByName(RoleUpgradeView);
        if (roleUpgradeViewView)
            roleUpgradeViewView.recvData(HallCmdDef.CMD_GET_UPGRADE_MATERIAL_LIST, data.msg);
    };
    HallDecoder.prototype.method_250 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        GameEventManager.getInstance().dispatchEvent(HallEvent.onGetProptypeComplete, data.msg);
    };
    HallDecoder.prototype.method_260 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var mallview = UIManager.getInstance().getViewByName(MallView);
        if (mallview)
            mallview.recvData(HallCmdDef.CMD_GET_SHOP_PROP_LIST, data.msg);
    };
    HallDecoder.prototype.method_261 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg = data.msg;
        if (msg == null || msg.gold == null)
            return;
        var gold = msg.gold;
        GlobalDataManager.getInstance().getAccountData().setGold(gold);
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateGold);
        var shopCode = msg.shopCode;
        var propCode = msg.propCode;
        var count = msg.count;
        var obj = { shopCode: shopCode, propCode: propCode, count: count };
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateProp, obj);
    };
    HallDecoder.prototype.method_262 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var mallview = UIManager.getInstance().getViewByName(MallView);
        if (mallview)
            mallview.recvData(HallCmdDef.CMD_GET_SHOP_PROP_INFO, data.msg);
    };
    HallDecoder.prototype.method_270 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var packageview = UIManager.getInstance().getViewByName(PackageView);
        if (packageview)
            packageview.recvData(HallCmdDef.CMD_GET_BAG_PROP_LIST, data.msg);
    };
    HallDecoder.prototype.method_271 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var packageview = UIManager.getInstance().getViewByName(PackageView);
        if (packageview)
            packageview.recvData(HallCmdDef.CMD_GET_BAG_PROP_INFO, data.msg);
    };
    HallDecoder.prototype.method_272 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var packageview = UIManager.getInstance().getViewByName(PackageView);
        if (packageview)
            packageview.recvData(HallCmdDef.CMD_DESTORY_BAG_PROP, data.msg);
    };
    HallDecoder.prototype.method_273 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        // let packageview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
        // if(packageview)
        //     packageview.recvData(HallCmdDef.CMD_DESTORY_BAG_PROP,data.msg);
    };
    HallDecoder.prototype.method_350 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var guideView = UIManager.getInstance().getViewByName(GuideView);
        if (guideView)
            guideView.recvData(HallCmdDef.CMD_SET_GUIDE_STEP, data.msg);
    };
    return HallDecoder;
}(BaseDecoder));
__reflect(HallDecoder.prototype, "HallDecoder");
//# sourceMappingURL=HallDecoder.js.map