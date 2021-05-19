// TypeScript file

class HallDecoder extends BaseDecoder{

    //方法前缀 
    public funcPrefix:string = "method_";

    //请重写该方法;
    public initDecoderFunction():void{
        let self = this;
        for(var key in HallCmdDef){
            var keyToAny:any = key;
            if(isNaN(keyToAny)){
                var anyType:any = HallCmdDef[key];
                var cEnum:HallCmdDef = anyType;
                var func:Function = self[self.funcPrefix+cEnum];
                if(func){
                    self.registerCmd(cEnum,func);
                }
            }
        }
    }

    public removeDecoderFunction():void{
        let self = this;
        for(var key in HallCmdDef){
            var keyToAny:any = key;
            if(isNaN(keyToAny)){
                var anyType:any = HallCmdDef[key];
                var cEnum:HallCmdDef = anyType;
                var func:Function = self[self.funcPrefix+cEnum];
                if(func){
                    self.unRegisterFunction(cEnum);
                }
            }
        }
    }



    private method_100(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        console.log(data);
    }

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
    private method_107(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        // 设置界面

        let hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
        if(hallView)
            hallView.recvData(HallCmdDef.CMD_Notice,data);

    }

    // 使用背包消息
    private method_208(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        // 战绩

        let recordView:CombatRecordView = UIManager.getInstance().getViewByName(CombatRecordView) as CombatRecordView;
        if(recordView)
            recordView.recvData(HallCmdDef.CMD_Record,data);

    }

    //抽奖
    private method_125(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        // 抽奖主界面

       let recordView:ExtractView = UIManager.getInstance().getViewByName(ExtractView) as ExtractView;
       if(recordView)
           recordView.recvData(HallCmdDef.CMD_Award,data);

    }

    //抽奖 结果
    private method_126(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
       // 抽奖结果界面

       let recordView:ChouCardView = UIManager.getInstance().getViewByName(ChouCardView) as ChouCardView;
       if(recordView)
           recordView.recvData(HallCmdDef.CMD_Award10,data);

    }

    //新抽奖结果
    private method_127(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
       // 我的卡牌

        let chouView:ChouCardView = UIManager.getInstance().getViewByName(ChouCardView) as ChouCardView;
        if(chouView)
            chouView.recvData(HallCmdDef.CMD_MyCardList,data);

        // 十连抽界面
       let recordView:ExtractView = UIManager.getInstance().getViewByName(ExtractView) as ExtractView;
       if(recordView)
           recordView.recvData(HallCmdDef.CMD_MyCardList,data);

           // 大厅界面
        let hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
        if(hallView)
            hallView.recvData(HallCmdDef.CMD_GETUPADTEGOLD,data);
    }

    //新抽奖结果
    private method_129(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        

    }

    private method_110(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupView: CardGroupView = UIManager.getInstance().getViewByName(CardGroupView) as CardGroupView;
        if(cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_GET_TEAM_CONFIG,data.msg);
    }


    private method_501(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_Change,data.msg);  // 充值转入
    }

    private method_502(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_InChange,data.msg);  
    }

    private method_503(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_OutChange,data.msg);  
    }

    private method_504(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        //let recoreView: RecordView = UIManager.getInstance().getViewByName(RecordView) as RecordView;
        //if(recoreView)
        //    recoreView.recvData(HallCmdDef.CMD_ChangeRecord,data); 
        let recoreView: ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
        if(recoreView)
            recoreView.recvData(HallCmdDef.CMD_ChangeRecord,data);
    }

    private method_505(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_ChangeCash,data);
    }

    private method_506(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: CardGroupUploadView = UIManager.getInstance().getViewByName(CardGroupUploadView) as CardGroupUploadView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_TurnCard,data);
    }
    private method_507(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: CardRecordView = UIManager.getInstance().getViewByName(CardRecordView) as CardRecordView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_CardRecord,data.msg);
    }

    private method_508(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let changeView: CardGroupUploadView = UIManager.getInstance().getViewByName(CardGroupUploadView) as CardGroupUploadView;
        if(changeView)
            changeView.recvData(HallCmdDef.CMD_CardProgress,data.msg);
    }
    
    private method_111(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupView: CardGroupView = UIManager.getInstance().getViewByName(CardGroupView) as CardGroupView;
        if(cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_GET_TEAM_LIST,data.msg);
    }

    private method_112(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupView: CardGroupView = UIManager.getInstance().getViewByName(CardGroupView) as CardGroupView;
        if(cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_CHANGE_BATTLE_TEAM,data.msg);
    }

    private method_302(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupView: CardGroupView = UIManager.getInstance().getViewByName(CardGroupView) as CardGroupView;
        if(cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_WalletResult,data.msg);
    }

    private method_113(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        console.log(data);
        let cardGroupSetView: CardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView) as CardGroupSetView;
        if(cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_GET_CARD_LIST_TEAMSET,data.msg);

        let cardUploadView: CardGroupUploadView = UIManager.getInstance().getViewByName(CardGroupUploadView) as CardGroupUploadView;
        if(cardUploadView)
            cardUploadView.recvData(HallCmdDef.CMD_GET_CARD_LIST_TEAMSET,data.msg);
    }

    private method_228(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        console.log(data);
        // 我的卡牌走的是同一个通道
        let recordView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
        if(recordView)
           recordView.recvData(HallCmdDef.CMD_CardViewLists,data.msg);
    }

    private method_232(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        console.log(data);
        // 我的卡牌走的是同一个通道
        let setView:SetView = UIManager.getInstance().getViewByName(SetView) as SetView;
        if(setView)
           setView.recvData(HallCmdDef.CMD_SetHead,data);
        
        let hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
        if(hallView)
            hallView.recvData(HallCmdDef.CMD_SetHead,data);
    }

    private method_114(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        console.log(data);
        let cardGroupSetView: CardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView) as CardGroupSetView;
        if(cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET,data.msg);

        // 我的卡牌走的是同一个通道
        let recordView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
        if(recordView)
           recordView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL_TEAMSET,data.msg);
    }

    private method_115(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupSetView: CardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView) as CardGroupSetView;
        if(cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_SAVE_TEAMSET,data.msg);
    }
    
    private method_116(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupView: CardGroupView = UIManager.getInstance().getViewByName(CardGroupView) as CardGroupView;
        if(cardGroupView)
            cardGroupView.recvData(HallCmdDef.CMD_GET_FROM_FETTER_TEAM,data.msg);
    }

    private method_117(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let cardGroupSetView: CardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView) as CardGroupSetView;
        if(cardGroupSetView)
            cardGroupSetView.recvData(HallCmdDef.CMD_GET_FROM_FETTER_TEAMSET,data.msg);
    }

    

    // private method_124(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // 我的卡牌走的是同一个通道
    //     let recordView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
    //     if(recordView)
    //        recordView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL,data.msg);
    // }

    // 设置
    private method_128(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let setView: SetView = UIManager.getInstance().getViewByName(SetView) as SetView;
        if(setView)
            setView.recvData(HallCmdDef.CMD_SetConfig,data.msg);
            
    }

    private method_150(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let recordView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
        if(recordView)
           recordView.recvData(HallCmdDef.CMD_GET_CARD_LIST,data.msg);
    }

    private method_151(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let recordView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
        if(recordView)
           recordView.recvData(HallCmdDef.CMD_GET_CARD_DETAIL,data.msg);
    }

    private method_152(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let view:CardOperationView = UIManager.getInstance().getViewByName(CardOperationView) as CardOperationView;
        if(view)
            view.recvData(HallCmdDef.CMD_UPGRADE_CARD,data);
    }

    // 羁绊消息
    private method_160(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var aa:JiBanData = GlobalDataManager.getInstance().getJiBanData();
        var num1 = data["msg"]["length"]  // 羁绊表
        for(var k:number = 0; k < num1; k++)
        {
            var obj = data["msg"][k]
           // var jbconfigId:number = data["jbconfig"][k]["id"]
           // self.jbList[jbconfigId] = obj
            aa.setJBnode(obj.code,obj.jbName,obj.zc);

        }

        let Jiban: FettersView = UIManager.getInstance().getViewByName(FettersView) as FettersView;
        if(Jiban)
            Jiban.recvData(HallCmdDef.CMD_GET_FETTERS_CONFIG,data.msg);
        
    }

    //回收获取卡牌列表
    private method_170(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let recycleView:RecycleView = UIManager.getInstance().getViewByName(RecycleView) as RecycleView;
        if(recycleView)
           recycleView.recvData(HallCmdDef.CMD_GET_CARD_LIST_RECYCLE,data.msg);
    }

    //回收卡牌
    private method_171(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let recycleView:RecycleView = UIManager.getInstance().getViewByName(RecycleView) as RecycleView;
        if(recycleView)
           recycleView.recvData(HallCmdDef.CMD_RECYCLE_CARD,data.msg);
    }

    //回收卡牌
    private method_175(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let recycleView:RecycleView = UIManager.getInstance().getViewByName(RecycleView) as RecycleView;
        if(recycleView)
           recycleView.recvData(HallCmdDef.CMD_GET_CUR_XWG_PRICE,data.msg);
    }
    

    private method_180(data:any):void{
        // if(ErrorMananger.getInstance().checkReqResult(data))
        //     return;
        // let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        // if(matchingView)
        //     matchingView.recvData(HallCmdDef.CMD_MATCH_PVP,data.msg);
        let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        if(matchingView)
            matchingView.recvData(HallCmdDef.CMD_MATCH_PVP,data);
    }

    private method_181(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        if(matchingView)
            matchingView.recvData(HallCmdDef.CMD_DISMATCH_PVP,data.msg);
    }
    
    private method_182(data:any):void{
        // if(ErrorMananger.getInstance().checkReqResult(data))
        //     return;
        // let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        // if(matchingView)
        //     matchingView.recvData(HallCmdDef.CMD_GET_MATCH_PVP_INFO,data.msg);
        let matchingView: MatchingView = UIManager.getInstance().getViewByName(MatchingView) as MatchingView;
        if(matchingView)
            matchingView.recvData(HallCmdDef.CMD_GET_MATCH_PVP_INFO,data);
    }

    private method_183(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let hallView: HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
        if(hallView)
            hallView.recvData(HallCmdDef.CMD_HALL_GET_MATCH_PVP_INFO,data.msg);
    }

    private method_200(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let roleUpgradeViewView: RoleUpgradeView = UIManager.getInstance().getViewByName(RoleUpgradeView) as RoleUpgradeView;
        if(roleUpgradeViewView)
            roleUpgradeViewView.recvData(HallCmdDef.CMD_UPGRADE_COMMANDER,data.msg);
    }

    private method_201(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        let roleUpgradeViewView: RoleUpgradeView = UIManager.getInstance().getViewByName(RoleUpgradeView) as RoleUpgradeView;
        if(roleUpgradeViewView)
            roleUpgradeViewView.recvData(HallCmdDef.CMD_GET_UPGRADE_MATERIAL_LIST,data.msg);
    }


    private method_250(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        GameEventManager.getInstance().dispatchEvent(HallEvent.onGetProptypeComplete,data.msg);
    }


    private method_260(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let mallview: MallView = UIManager.getInstance().getViewByName(MallView) as MallView;
        if(mallview)
            mallview.recvData(HallCmdDef.CMD_GET_SHOP_PROP_LIST,data.msg);
    }

    private method_261(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        var msg:any = data.msg;
        if(msg==null||msg.gold==null)
            return;
        
        var gold:number = msg.gold;
        GlobalDataManager.getInstance().getAccountData().setGold(gold);
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateGold);

        var shopCode:string = msg.shopCode;
        var propCode:string = msg.propCode;
        var count:number = msg.count;

        let obj:any = {shopCode:shopCode,propCode:propCode,count:count};
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateProp,obj);
    }

    private method_262(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let mallview: MallView = UIManager.getInstance().getViewByName(MallView) as MallView;
        if(mallview)
            mallview.recvData(HallCmdDef.CMD_GET_SHOP_PROP_INFO,data.msg);
    }



    private method_270(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let packageview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
        if(packageview)
            packageview.recvData(HallCmdDef.CMD_GET_BAG_PROP_LIST,data.msg);
    }

    private method_271(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let packageview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
        if(packageview)
            packageview.recvData(HallCmdDef.CMD_GET_BAG_PROP_INFO,data.msg);
    }

    private method_272(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let packageview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
        if(packageview)
            packageview.recvData(HallCmdDef.CMD_DESTORY_BAG_PROP,data.msg);
    }

    private method_273(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        // let packageview:PackageView = UIManager.getInstance().getViewByName(PackageView) as PackageView;
        // if(packageview)
        //     packageview.recvData(HallCmdDef.CMD_DESTORY_BAG_PROP,data.msg);
    }

    private method_350(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let guideView:GuideView = UIManager.getInstance().getViewByName(GuideView) as GuideView;
        if(guideView)
            guideView.recvData(HallCmdDef.CMD_SET_GUIDE_STEP,data.msg);
    }
}