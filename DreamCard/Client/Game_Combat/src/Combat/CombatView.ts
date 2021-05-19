// TypeScript file
class CombatView extends BaseView{

    public static NAME:string = "CombatSkin";

     public constructor(){
        super(CombatView.NAME);
    }

    public $onAddToStage(stage:egret.Stage,nestLevel:number):void{
        super.$onAddToStage(stage,nestLevel);
        Combat.onGameShow();
    }

    private groupCombat:eui.Group;  //战斗层

    private btnSet:eui.Button;          //设置按钮;

    private groupAtkHead:eui.Group;     //攻击者头像层
    private groupDfdHead:eui.Group;     //防御者头像层

    private groupAtkFetter:eui.Group;   //攻击者羁绊
    private groupDfdFetter:eui.Group;   //防御者羁绊

    public groupAtkRCard:eui.Group;    //攻击者长方形卡牌层
    public groupDfdRCard:eui.Group;    //防御者长方形卡牌层

    public groupAtkSCard:eui.Group;    //攻击者正方形卡牌层
    public groupDfdSCard:eui.Group;    //防御者正方形卡牌层

    public groupAtkSendCard:eui.Group; //攻击者正方形卡牌发牌点
    public groupDfdSendCard:eui.Group; //防御者正方形卡牌发牌点

    public groupAtkDCard:eui.Group;    //攻击者死亡层
    public groupDfdDCard:eui.Group;    //防御者死亡层

    private btnAtkDeath:eui.Button;     //攻击者死亡卡牌按钮
    private btnDfdDeath:eui.Button;     //防御者死亡卡牌按钮

    private lblAtkReadyCount:eui.Label; //攻击者发牌池剩余数量文本
    private lblDfdReadyCount:eui.Label; //防御者发牌池剩余数量文本

    private lblOutCardCutDown:eui.Label;    //出牌倒计时文本
    private lblRound:eui.Label;         //回合文本
    // private imgDirIndicator:eui.Image;  //出牌方向标识
    private imgDirMoon:eui.Image;
    private imgDirSun:eui.Image;

    private groupAtkDeath:eui.Group;    //攻击者死亡卡牌层
    public groupAtkDList:eui.Group;    //攻击者死亡卡牌列表层
    private groupDfdDeath:eui.Group;    //防御者死亡卡牌层
    public groupDfdDList:eui.Group;    //防御者死亡卡牌列表层

    private btnQuick:eui.Button;        //快速结算按钮;
    private btnUnHosting:eui.Button;    //取消托管按钮;
    private btnHosting:eui.Button;      //托管按钮;
    private btnEnd:eui.Button;          //结束按钮;
    private btnAtk:eui.Button;          //攻击按钮;

    
    private cWaitStartView:CWaitStartView;  //游戏开始视图
    // private cAtkHeadView:CAtkHeadView;  //攻击者头像视图
    // private cDfdHeadView:CDfdHeadView;  //防御者头像视图
    

    // private arrAtkRCardView:Array<CRCardItemView> = new Array<CRCardItemView>();  //攻击者长方形卡牌视图集合
    // private arrDfdRCardView:Array<CRCardItemView> = new Array<CRCardItemView>();  //防御者长方形卡牌视图集合
    // private arrAtkSCardView:Array<CSCardItemView> = new Array<CSCardItemView>();  //攻击者正方形卡牌视图集合
    // private arrDfdSCardView:Array<CSCardItemView> = new Array<CSCardItemView>();  //防御者正方形卡牌视图集合
    private remainReqQuickSettleCount:number;   //剩下请求快速结算次数；


    //长按时间; 用于查看卡牌详情
    private longPressTime:number = 1.5;
    //点击定时器;
    private clickTimer:egret.Timer;
    //当前点击目标
    private curClickTarget:egret.DisplayObject;


    //战斗解析
    private _combatParser:CombatParser;
    //战斗序列
    public combatSerial:CombatSerial;

    private playBGM:boolean = false;

    private isDebug:boolean = false;
    
    private editSkillId:eui.EditableText;
    private editSpeed:eui.EditableText;
    private editFrameRate:eui.EditableText;
    private editTFrameRate:eui.EditableText;
    private groupDebug:eui.Group;

    protected week():void{
        var self = this;
        

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)){
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN,self.touchBegin,self);
        }
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
            self.addEventListener(egret.TouchEvent.TOUCH_MOVE,self.touchMove,self);
        }
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_END)){
            self.addEventListener(egret.TouchEvent.TOUCH_END,self.touchEnd,self);
        }

        
        // self.setFetterList();
        // self.setRCardList();
        // self.setSCardList();
        // self.setDeathList();
        
        // UIManager.getInstance().showUI(CWaitStartView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{type:0});
        // egret.Tween.get(self).wait(3000).call(function(){
        //     UIManager.getInstance().showUI(CWaitStartView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{type:1});
        // },self)

        var data = super.getData();
        if(data!=null&&data.debug!=null){
            self.isDebug = data.debug;
        }

        self.initView();
        self.sendRequst(CombatCmdDef.CMD_ENTER_GAME);
        
        WebSocketManager.getInstance().setReconnectHandler(Handler.create(self,self.reqForceReconnectGame));

        self.playBGM = false;
        if(SoundManager.getInstance().canPlayCombatBGM)
            self.checkBGMPlay(); 
    }
    

    private initView():void{
        var self = this;
        self.cleanHead();
        // self.initCombatParser();

        self.updateOutCardCutDown(0);
        self.updateReadyCount(-1,0);
        self.updateRound(0);
        self.updateDirIndicator(0);
        self.updateOptBtnState();

        // self.editSkillId.visible = false;
        // self.editSpeed.visible = false;
        // self.editTFrameRate.visible =false;
        // self.editFrameRate.visible = false;
        self.groupDebug.visible = false;
        if(self.isDebug){
            self.initCombatParser();
            self.btnHosting.visible = true;
            self.btnAtk.visible = true;
            // self.editSkillId.visible = true;
            // self.editSpeed.visible = true;
            // self.editTFrameRate.visible =true;
            // self.editFrameRate.visible = true;
            self.groupDebug.visible =true;
            // if(this.timer_heart_beat.hasEventListener(egret.TimerEvent.TIMER)==false){
            //     this.timer_heart_beat.addEventListener(egret.TimerEvent.TIMER, this.onTimerSendHeartBeat, this);
            // }
            // this.timer_heart_beat.start();
            self.remainReqQuickSettleCount = 3;
        }
        
    }
    // private timer_heart_beat: egret.Timer = new egret.Timer(1000, 0);
    // private timeCount:number=0;
    // private onTimerSendHeartBeat(e: egret.TimerEvent): void{
        
    //     console.log(this.timeCount);
    //     this.timeCount++;
    //     this.editSkillId.text = this.timeCount+"";
    // }

    protected sleep():void{
        var self = this;

        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        if(self.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)){
            self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,self.touchBegin,self);
        }
        if(self.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
            self.removeEventListener(egret.TouchEvent.TOUCH_MOVE,self.touchMove,self);
        }
        if(self.hasEventListener(egret.TouchEvent.TOUCH_END)){
            self.removeEventListener(egret.TouchEvent.TOUCH_END,self.touchEnd,self);
        }


        self.combatParser.cleanData();
        self.combatParser = null;

        if(self.cWaitStartView!=null){
            UIManager.getInstance().hideUI(CWaitStartView);
            self.cWaitStartView = null;
        }
        // self.cleanArray(self.arrAtkRCardView);
        // self.cleanArray(self.arrDfdRCardView);
        // self.cleanArray(self.arrAtkSCardView);
        // self.cleanArray(self.arrDfdSCardView);
    }

    

    public recvData(cmd:CombatCmdDef,data:any):void{
        // console.log("recvData："+data);
        var self = this;
        switch(cmd){
            case CombatCmdDef.CMD_DISCONNECT_GAME:
                self.onDisconnectGame(data);
            break;
            case CombatCmdDef.CMD_RECONNECT_GAME:
                self.onReconnectGame(data);
            break;
            case CombatCmdDef.CMD_ENTER_GAME:
                self.onEnterGame(data);
            break;
            case CombatCmdDef.CMD_ENTER_COUNT_TIME:
                self.onSynStartGameCutDown(data);
            break;
            case CombatCmdDef.CMD_SYN_OTHER_DATA_GAME:
                self.onSynPlayerData(CombatConstants.PLACE_DFD,data);
            break;
            case CombatCmdDef.CMD_SYN_ME_DATA_GAME:
                self.onSynPlayerData(CombatConstants.PLACE_ATK,data);
            break;
            case CombatCmdDef.CMD_SNED_CARD:
                self.onSendCard(data);
            break;
            case CombatCmdDef.CMD_SYN_PLAY_CARD_TIME:
                self.onSynOutCardCutDown(data);
            break;
            case CombatCmdDef.CMD_SYN_PLAY_CARD_DATA:
                self.onSynOutCardsData(data);
            break;
            case CombatCmdDef.CMD_SYN_GAME_RESULT_DATA:
                self.onSynGameResultData(data);
            break;
            case CombatCmdDef.CMD_SYN_CHANGE_ROUND_DATA_GAME:
                self.onSynChangeRoundData(data);
            break;
            case CombatCmdDef.CMD_SYN_BATTLE_DATA_GAME:
            break;
            case CombatCmdDef.CMD_SYN_ATK_DATA_GAME:
                self.onSynBattleData(data);
            break;
            case CombatCmdDef.CMD_SURRENDER_GAME:
            break;
            case CombatCmdDef.CMD_START_BATTLE:
                self.onStartBattle(data);
            break;
            case CombatCmdDef.CMD_SYN_HOSTING:
                self.onSynHosting(data);
            break;
            case CombatCmdDef.CMD_SYN_START_FETTER:
                self.onSynStartFetter(data);
            break;
            case CombatCmdDef.CMD_REQ_QUICK_SETTLEMENT:
                self.onReqQuickSettlement(data);
            break;
            case CombatCmdDef.CMD_PRO_QUICK_SETTLEMENT:
                self.onProQuickSettlement(data);
            break;
            case CombatCmdDef.CMD_SYN_DISSOLUTION_GAME:
                self.onSynDissolution(data);
            break;
            case CombatCmdDef.CMD_DEBUG_GET_BUFF_CD:
                self.onSynBuffCD(data);
            break;
            case CombatCmdDef.CMD_FORCE_RECONNECT_GAME:
                self.onForceReconnectGame(data);
            break;
            case CombatCmdDef.CMD_GET_CARD_DETAIL:
                self.onGetCardDetail(data);
            break;
        }
    }

    private sendRequst(reqCmd:CombatCmdDef,data:any = {},showModel:boolean=false):void{
        var server: ServerData = WebSocketManager.getInstance().getServerByName(GlobalDataManager.getInstance().getGameServerName());
        if(server == null)
            return;
        var obj = new Object();
        obj["cmd"] = reqCmd;
        obj["data"] = data;
        obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
        obj["room"] = GlobalDataManager.getInstance().getRoom();
        WebSocketManager.getInstance().sendMessage(server.getSname(),reqCmd,obj,showModel);
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            self.checkBGMPlay();
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnAtkDeath){
                if(self.isDebug)
                    self.onClickAtkDBtn();
                else{
                    self.groupAtkDeath.visible = true;
                }
            }else if(tar==self.btnDfdDeath){
                if(self.isDebug)
                    self.onClickDfdDBtn();
                else{
                    self.groupDfdDeath.visible = true;
                }
            }else if(tar==self.btnSet){
                
                if(self.isDebug)
                    self.onClickSetBtn();
                else{
                    // self.sendRequst(CombatCmdDef.CMD_DEBUG_GET_BUFF_CD,{});
                    UIManager.getInstance().showUI(CSetView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{surrenderGameHandler:Handler.create(self,self.surrenderGame)});
                }
            }else if(tar==self.btnHosting){
                if(self.isDebug)
                    self.onClickHostBtn();
                else{
                    self.updateOptBtnState(0);
                    self.sendRequst(CombatCmdDef.CMD_SYN_HOSTING,{auto:true});
                }
            }else if(tar==self.btnUnHosting){
                self.sendRequst(CombatCmdDef.CMD_SYN_HOSTING,{auto:false});
            }else if(tar==self.btnEnd){
                self.updateOptBtnState(0);
                self.sendRequst(CombatCmdDef.CMD_OUT_CARD,{codeList:[]});
            }else if(tar==self.btnAtk){
                if(self.isDebug)
                    self.onClickAtkBtn();
                else{
                    self.updateOptBtnState(0);
                    self.sendRequst(CombatCmdDef.CMD_OUT_CARD,{codeList:self.combatParser.getCurSelCardsCode()});
                }
            }else if(tar==self.btnQuick){
                UIManager.getInstance().showUI(CPopupView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,
                    {type:0,countStr:"("+self.remainReqQuickSettleCount+"/"+CombatConstants.REQ_QUICK_SETTLEMENT_MAX_COUNT+")",
                    callbackHandler:Handler.create(self,function(){
                        self.remainReqQuickSettleCount--;
                        self.updateOptBtnState(-1,-1, 1);
                        self.sendRequst(CombatCmdDef.CMD_REQ_QUICK_SETTLEMENT);
                    })});
            }
        }else if(tar instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group==self.groupAtkDeath){
                SoundManager.getInstance().PlayClickSound();
                self.groupAtkDeath.visible = false;
            }else if(group==self.groupDfdDeath){
                SoundManager.getInstance().PlayClickSound();
                self.groupDfdDeath.visible = false;
            }else if(group.name.substr(0,8)==CombatConstants.CARD_SQUARE_GROUP_PREFIX){
                self.checkBGMPlay();
                SoundManager.getInstance().PlaySound("kapaidianji_mp3");
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var code:string = strArr[1];
                
                // var combatNode:CombatNode = new CombatNode();
                // combatNode.optType = CombatConstants.OPT_TYPE_SEL_CARD;
                // combatNode.senderPlace = CombatConstants.PLACE_ATK;
                // combatNode.fromCardCode = code;
                // self.combatParser.parse(combatNode);
                var combatNode:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_SEL_CARD,{place:CombatConstants.PLACE_ATK,code:code});
                self.combatParser.parse(combatNode);
                self.updateOptBtnState(self.combatParser.getOptBtnAtkType(CombatConstants.PLACE_ATK));
            }
        }
    }

    private touchBegin(event:egret.TouchEvent):void{
        var self = this;
        let curClickTarget = null;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,8)==CombatConstants.CARD_SQUARE_GROUP_PREFIX||group.name.substr(0,8)==CombatConstants.CARD_RECTANGLE_GROUP_PREFIX){
                self.cancelTimer();

                self.clickTimer = new egret.Timer(self.longPressTime*1000,1);
                self.clickTimer.addEventListener(egret.TimerEvent.TIMER, self.OpenTimer, this);
                self.clickTimer.start();

                curClickTarget = tar;
            }
        }

        self.curClickTarget = curClickTarget;
    }

    private touchMove(event:egret.TouchEvent):void{
        var self = this;

        if(self.curClickTarget==null)
            return;

        //判断是否移出目标;
        var point:egret.Point = self.curClickTarget.localToGlobal();
        var widthMin:number = point.x;
        var widthMax:number = point.x+self.curClickTarget.width*self.curClickTarget.scaleX;
        var heightMin:number = point.y;
        var heightMax:number = point.y+self.curClickTarget.height*self.curClickTarget.scaleY;
        
        // egret.log(widthMin+" XMin   "+widthMax + "  Xmax  " + heightMin+" YMin   "+heightMax + "  Ymax  " 
        //  +  event.stageX +" stageX   "+event.stageY + "  stageY  "+  event.localX +" localX   "+event.localY + "  localY  ")
        if(event.stageX>widthMax||event.stageX<widthMin||event.stageY>heightMax||event.stageY<heightMin)
            self.cancelTimer();
    }

    private touchEnd(event:egret.TouchEvent):void{
        var self = this;
        self.cancelTimer();
    }

    private touchCancel(e:egret.TouchEvent):void{   
        let self = this;
        self.cancelTimer();
    }

    private cancelTimer():void{
        var self = this;
        if(self.clickTimer!=null){
            if(self.clickTimer.hasEventListener(egret.TimerEvent.TIMER))
                self.clickTimer.removeEventListener(egret.TimerEvent.TIMER, self.OpenTimer, this);
            self.clickTimer = null;
        }

        if(self.curClickTarget!=null)
            self.curClickTarget=null
    }

    private OpenTimer():void{
        var self = this;
        if(self.curClickTarget==null)
            return;
        var strArr:Array<string> = self.curClickTarget.name.split("_");
        if(strArr.length!=2){
            return;
        }
        var code:string = strArr[1];
        // var code:string = "46ffac30-8be0-4f10-ad13-224b8a525d9f";
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CombatCmdDef.CMD_GET_CARD_DETAIL,{code:code,detail:0},true);
    }

    //断线
    private onDisconnectGame(data:any):void{
        if(data==null)
            return;
        var self = this;
        var tk:string = data.tk;
        var bl:number = data.bl;
        if(self.combatParser.getDfdHeadView().getTicket()==tk){
            self.combatParser.getDfdHeadView().setBreakLineState(bl);
        }
    }


    //断线重连
    private onReconnectGame(data:any):void{
        if(data==null)
            return;
        var self = this;
        
        var cardData:any = data.cardData;
        if(cardData!=null){
            for(var key in cardData){
                var cards:any = cardData[key];
                var place:number = Number(key);

                //初始化手牌集合
                var handCards:Array<Object> = cards.handCards;
                var type:number = place==CombatConstants.PLACE_ATK?CombatConstants.CARD_GROUP_ATK_HAND:CombatConstants.CARD_GROUP_DFD_HAND;
                self.combatParser.initCards(type,handCards);
                
                //初始化出牌集合
                var outCards:Array<Object> = cards.outCards;
                type = place==CombatConstants.PLACE_ATK?CombatConstants.CARD_GROUP_ATK_OUT:CombatConstants.CARD_GROUP_DFD_OUT;
                self.combatParser.initCards(type,outCards);

                //初始化死亡牌集合
                var deathCards:Array<Object> = cards.deathCards;
                type = place==CombatConstants.PLACE_ATK?CombatConstants.CARD_GROUP_ATK_DEATH:CombatConstants.CARD_GROUP_DFD_DEATH;
                self.combatParser.initCards(type,deathCards);

                //buff集合
                var buffDatas:Array<any> = cards.buffDatas;
                if(buffDatas!=null&&buffDatas.length>0){
                    for(var i:number=0,lengthI=buffDatas.length;i<lengthI;i++){
                        var buffs:Array<Object> = buffDatas[i];
                        if(buffs!=null&&buffs.length>0){
                            for(var b:number=0,lengthB=buffs.length;b<lengthB;b++){
                                var buffItem:any = buffs[b];
                                if(buffItem==null)
                                    continue;
                                self.onSynBattleData(buffItem);
                            }
                        }
                    }
                }
            }
        }


        //预下载需要用到的特效
        var effUrl:Array<string> = data.effUrl;
        if(effUrl!=null&&effUrl.length>0){
            for(var i:number=0,lengthI=effUrl.length;i<lengthI;i++){
                var item:string = effUrl[i];
                if(item==null||item=="")
                    continue;
                CResManager.getInstance().addResByRCSkillKey(item);
            }
        }


        var hostState:boolean = data.hostState;
        if(hostState!=null){
            self.updateOptBtnState(0,hostState?1:0);
        }

        //重连游戏快速结算按钮为可点
        self.updateOptBtnState(-1,-1,0);
        
        //当前游戏步骤
        var curStep:number = data.curStep;
        var synData:any = data.synData;
        if(curStep==0){     //双方玩家刚进入房间

        }else if(curStep==1){ //游戏倒计时开始

        }else if(curStep==2){ //游戏发牌步骤

        }else if(curStep==3){   //游戏等待玩家上牌步骤
            var fromPlace:number = synData.fromPlace;
            var isFromPlace:boolean = fromPlace==CombatConstants.PLACE_ATK;
            self.updateOptBtnState(isFromPlace?1:0,-1,0);
            self.combatParser.setHandCardTouchState(isFromPlace);
        }else if(curStep==4){   //游戏卡牌战斗步骤
            var deathCardCodes:any = synData.deathCardCodes;
            if(deathCardCodes!=null){
                for(var key in deathCardCodes){
                    var arrDeathCardCodes:Array<string> = deathCardCodes[key];
                    if(arrDeathCardCodes==null||arrDeathCardCodes.length<=0)
                        continue;
                    
                    var place:number = Number(key);
                    for(var i:number=0,lengthI=arrDeathCardCodes.length;i<lengthI;i++){
                        var itemCode:string = arrDeathCardCodes[i];
                        if(itemCode==null||itemCode=="")
                            continue;
                        
                        var combatNode:CombatNode = new CombatNode();
                        combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
                        combatNode.senderPlace = place;
                        combatNode.fromTarget = itemCode;
                        combatNode.removeCard = true;
                        self.combatParser.parse(combatNode);
                    }
                }
                
            }

        }else if(curStep==5){   //游戏结束结算步骤
            
        }
    }


    //当进入游戏
    private onEnterGame(data:any):void{
        if(data==null)
            return;
        var self = this;
        if(data==0){    //第一次进入游戏则在原地等待别的玩家进入
            self.setWaitStartView({type:0});
        }
    }

    //同步游戏开始倒计时
    private onSynStartGameCutDown(data:any):void{
        this.setWaitStartView({type:1,cutdown:data});
    }

    //同步玩家信息;
    private onSynPlayerData(place:number,data:any):void{
        var self = this;
        if(data==null)
            return;
        
        //用户头像数据
        var user:any = data.user;
        self.setHead(place,user);
        
        //发牌池数量
        var readyCount:number = data.readyCount;
        self.updateReadyCount(place,readyCount);

        if(place==CombatConstants.PLACE_ATK){
            var quickSettleCount = data.quickSettleCount;
            self.remainReqQuickSettleCount = quickSettleCount;
            if(self.btnQuick.visible)
                self.updateOptBtnState(-1,-1,0);
        }
    }

    //发牌
    private onSendCard(data:any):void{
        if(data==null)
            return;
        var self =this;

        var place:number = data.place;
        //更新发牌池数量
        var readyCount:number = data.readyCount;
        self.updateReadyCount(place,readyCount);

        //更新按钮状态
        self.updateOptBtnState(0);

        //先减少回合
        var combatNode0:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_REDUCE_ROUND,{place:place});
        //发牌
        var combatNode1:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_SEND_CARD,{place:place,card:data.card});
        //再整理手牌
        var combatNode2:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_SORT_HAND_CARD,{place:place});
        CombatFactory.createCombatSerial(self.combatParser,[combatNode0,combatNode1,combatNode2]);

        //预下载需要用到的特效
        var effUrl:Array<string> = data.effUrl;
        if(effUrl!=null&&effUrl.length>0){
            for(var i:number=0,lengthI=effUrl.length;i<lengthI;i++){
                var item:string = effUrl[i];
                if(item==null||item=="")
                    continue;
                CResManager.getInstance().addResByRCSkillKey(item);
            }
        }

    }
    
    //同步出牌倒计时
    private onSynOutCardCutDown(data:any):void{
        var self = this;
        if(data==null)
            return;
        var count:number = 0;
        if(typeof data === 'number')
            count = data;
        else{
             count = data.count;
            
            var place = data.place;
            if(place!=null)        //更新按钮状态
                self.updateOptBtnState(self.combatParser.getOptBtnAtkType(place));
        }
        if(count!=null)
            this.updateOutCardCutDown(count);
    }  

    //同步出牌数据
    private onSynOutCardsData(data:any):void{
        var self = this;
        var arr:Array<CombatNode> = new Array<CombatNode>();
        //先全部取消选牌
        var combatNode0:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_FORCE_DESEL_CARD);
        // arr.push(combatNode0);
        self.addCombatNodeToSerial(combatNode0);
        if(data.cards!=null){
            var cards:Array<Object> = data.cards;
            for(var i:number = 0,lengthI:number = cards.length;i<lengthI;i++){
                var card:any = cards[i];
                if(card==null)
                    continue;
                //一张张的出牌
                let combatNode1:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_OUT_CARD,{place:data.place,card:card});
                // arr.push(combatNode1);
                self.addCombatNodeToSerial(combatNode1);
            }
        }

        egret.setTimeout(function(placeParam){
            //等待200毫秒 再整理手牌
            var combatNode2:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_SORT_HAND_CARD,{place:placeParam});
            self.addCombatNodeToSerial(combatNode2);
        }.bind(self,data.place), self, 200);    

        
        

        //预下载需要用到的特效
        var effUrl:Array<string> = data.effUrl;
        if(effUrl!=null&&effUrl.length>0){
            for(var i:number=0,lengthI=effUrl.length;i<lengthI;i++){
                var item:string = effUrl[i];
                if(item==null||item=="")
                    continue;
                CResManager.getInstance().addResByRCSkillKey(item);
            }
        }
        
        // CombatFactory.createCombatSerial(self.combatParser,arr,Handler.create(self,function(){
        //     //更新手牌排序
        //     self.combatParser.sortHandCard(data.place);
        // }));
    }

    private onSynGameResultData(data:any):void{
        GlobalDataManager.getInstance().setGameOver(true);
        UIManager.getInstance().hideUI(CPopupView);
        UIManager.getInstance().showUI(SettlementView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
    }

    //同步切换回合数据
    private onSynChangeRoundData(data:any):void{
        var self = this;

        //更新回合
        var round:number = data.round;
        self.updateRound(round);

        var atkTk:string  = data.atkTk;
        var atkPlace:number = CombatConstants.PLACE_ATK;

        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        var users:Array<Object> = data.users;
        for(var i:number=0,lengthI:number = users.length;i<lengthI;i++){
            var item:any = users[i];
            if(item==null)
                continue;
            
            var tk:string = item.tk;
            var place:number = tk==account.getTicket()?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD;
            
            if(atkTk==tk)
                atkPlace = place;
            

            // var hasDeath:boolean = item.hasDeath;
            // if(hasDeath){
            //     var combatNode:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_SORT_OUT_CARD,{place:place});
            //     // self.combatParser.parse(combatNode);
            //     self.addCombatNodeToSerial(combatNode);
            // }

            //检测一下剩余血量
            var lefthp:number = item.lefthp;
            if(place==CombatConstants.PLACE_ATK){
                var cAtkHeadView:CAtkHeadView = self.combatParser.getAtkHeadView();
                var curHp:number = cAtkHeadView.getHp();
                if(lefthp!=curHp){
                    cAtkHeadView.setDamage(lefthp-curHp);
                }
            }else{
                var cDfdHeadView:CDfdHeadView = self.combatParser.getDfdHeadView();
                var curHp:number = cDfdHeadView.getHp();
                if(lefthp!=curHp){
                    cDfdHeadView.setDamage(lefthp-curHp);
                }
            }
            
            //出了的卡牌
            var cards:Array<Object> = item.cards;
            self.combatParser.synUpdateOutCards(place,cards);
            for(var c:number=0,lengthC=cards.length;c<lengthC;c++){
                var itemCard:any = cards[c];
                if(itemCard==null)
                    continue;
                
                //如果有buff数据
                var buffs:any = itemCard.buffs;
                if(buffs!=null&&buffs.length>0){
                    for(var b:number=0,lengthB=buffs.length;b<lengthB;b++){
                        var buffItem:any = buffs[b];
                        if(buffItem==null)
                            continue;
                        self.onSynBattleData(buffItem);
                    }
                }
                
            }
        }


        self.updateDirIndicator(atkPlace);
    }

    //同步战斗数据
    private onSynBattleData(data:any):void{
        if(data==null)
            return;
        
        var self = this;
        var fightData:any = data[CombatConstants.FIGHT_DATA];
        if(fightData!=null){
            var combatType:number = fightData.type;
            var optType:number = CombatConstants.OPT_TYPE_NO_ACTION;
            if(combatType==CombatConstants.COMBAT_TYPE_ATK_NOR){
                optType =  CombatConstants.OPT_TYPE_ATK_NOR;
            }else if(combatType==CombatConstants.COMBAT_TYPE_ATK_SKILL){
                optType =  CombatConstants.OPT_TYPE_ATK_SKILL;
            }else if(combatType==CombatConstants.COMBAT_TYPE_REVIVE){
                optType =  CombatConstants.OPT_TYPE_REVIVE;
            }else if(combatType==CombatConstants.COMBAT_TYPE_ROUND_RECOVER){
                optType =  CombatConstants.OPT_TYPE_ROUND_RECOVER;
            }else if(combatType==CombatConstants.COMBAT_TYPE_ROUND_LOST){
                optType =  CombatConstants.OPT_TYPE_ROUND_LOST;
            }else if(combatType==CombatConstants.COMBAT_TYPE_MODIFY_ATTRIBUTE){
                optType =  CombatConstants.OPT_TYPE_MODIFY_ATTRIBUTE;
            }else if(combatType==CombatConstants.COMBAT_TYPE_PERSUADE_BACK){
                optType =  CombatConstants.OPT_TYPE_PERSUADE_BACK;
            }
            
            var combatNode0:CombatNode = CombatFactory.createCombatNode(optType,{fightData:fightData});
            self.addCombatNodeToSerial(combatNode0);
        }

        var buffData:any = data[CombatConstants.BUFF_DATA];
        if(buffData){
            var combatType:number = buffData.type;
            var optType:number = CombatConstants.OPT_TYPE_NO_ACTION;
            if(combatType==CombatConstants.COMBAT_TYPE_BUFF_ADD){
                optType =  CombatConstants.OPT_TYPE_BUFF_ADD;
            }else if(combatType==CombatConstants.COMBAT_TYPE_BUFF_REMOVE){
                optType =  CombatConstants.OPT_TYPE_BUFF_REMOVE;
            }else if(combatType==CombatConstants.COMBAT_TYPE_BUFF_UPDATE){
                optType =  CombatConstants.OPT_TYPE_BUFF_UPDATE;
            }else if(combatType==CombatConstants.COMBAT_TYPE_MODIFY_ATTRIBUTE){
                optType =  CombatConstants.OPT_TYPE_MODIFY_ATTRIBUTE;
            }

            var combatNode1:CombatNode = CombatFactory.createCombatNode(optType,{buffData:buffData});
            self.addCombatNodeToSerial(combatNode1);
        }

        var fetterData:any = data[CombatConstants.FETTER_DATA];
        if(fetterData){
            var combatType:number = fetterData.type;
            var optType:number = CombatConstants.OPT_TYPE_NO_ACTION;

            if(combatType==CombatConstants.COMBAT_TYPE_FETTER_ADD){
                optType =  CombatConstants.OPT_TYPE_FETTER_ADD;
            }else if(combatType==CombatConstants.COMBAT_TYPE_FETTER_REMOVE){
                optType =  CombatConstants.OPT_TYPE_FETTER_REMOVE;
            }

            var combatNode2:CombatNode = CombatFactory.createCombatNode(optType,{fetterData:fetterData});
            self.addCombatNodeToSerial(combatNode2);
        }
    }

    //当可以开始出牌
    private onStartOutCard(data:any):void{
        var self = this;
        //更新按钮状态
        self.updateOptBtnState(self.combatParser.getOptBtnAtkType(data.place));
    }

    //当开始战斗
    private onStartBattle(data:any):void{
        var self = this;

        //更新按钮状态
        self.updateOptBtnState(0);
        //全部取消选牌
        var combatNode0:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_FORCE_DESEL_CARD);
        //再设置成不可点击状态
        var combatNode1:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_SET_NON_CLICKABLE);

        CombatFactory.createCombatSerial(self.combatParser,[combatNode0,combatNode1]);
    }

    //同步托管状态
    private onSynHosting(data:any):void{
        var self = this;
        var auto:boolean = data==null?false:data;
        self.updateOptBtnState(-1,auto?1:0);
    }

    //同步游戏开始触发的羁绊
    private onSynStartFetter(data:any):void{
        if(data==null)
            return;
        var self = this;

        var fData0:any = data.fData0;
        var fData1:any = data.fData1;

        var period:number = 0;

        var tk:string = fData0.tk;
        var effUrlArr:Array<string> = fData0.effUrlArr;
        var effTimeArr:Array<number> = fData0.effTimeArr;
        for(var j:number=0,lengthJ=effUrlArr.length;j<lengthJ;j++){
            var effUrl:string = effUrlArr[j];
            if(effUrl==null||effUrl=="")
                continue;
            
            var combatNode:CombatNode = new CombatNode();
            combatNode.fromTarget = tk;
            combatNode.optType = CombatConstants.OPT_TYPE_FETTER_ADD;
            combatNode.skillKey = effUrl;
            egret.setTimeout(function(combatNodeParam){
                // self.combatParser.parse(combatNodeParam);
                self.addCombatNodeToSerial(combatNodeParam);
            }.bind(self,combatNode), self, period);

            var effTime:number = effTimeArr[j];
            if(effTime!=null)
                period+=effTime;
        }
        

        var tk:string = fData1.tk;
        var effUrlArr:Array<string> = fData1.effUrlArr;
        var effTimeArr:Array<number> = fData1.effTimeArr;
        for(var j:number=0,lengthJ=effUrlArr.length;j<lengthJ;j++){
            var effUrl:string = effUrlArr[j];
            if(effUrl==null||effUrl=="")
                continue;
            
            var combatNode:CombatNode = new CombatNode();
            combatNode.fromTarget = tk;
            combatNode.optType = CombatConstants.OPT_TYPE_FETTER_ADD;
            combatNode.skillKey = effUrl;
            egret.setTimeout(function(combatNodeParam){
                // self.combatParser.parse(combatNodeParam);
                self.addCombatNodeToSerial(combatNodeParam);
            }.bind(self,combatNode), self, period);

            var effTime:number = effTimeArr[j];
            if(effTime!=null)
                period+=effTime;
        }
        
    }

    //请求快速结算
    private onReqQuickSettlement(data:any):void{
        var self = this;
        self.updateOptBtnState(-1,-1,1);    //先把快速结算按钮设置成不可点状态
        UIManager.getInstance().showUI(CPopupView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,
            {type:1,callbackHandler:Handler.create(self,function(bool){
                var state:number = 1;
                if(!bool){
                    state = 0;
                    self.updateOptBtnState(-1,-1,0);
                }
                self.sendRequst(CombatCmdDef.CMD_PRO_QUICK_SETTLEMENT,{state:state});
            })});
    }

    //快速结算处理
    private onProQuickSettlement(data:any):void{
        if(data==null)
            return;

        var self = this;
        var state:number = data.state;
        UIManager.getInstance().showUI(CPopupView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{type:2,state:state});
        if(state==0)
            self.updateOptBtnState(-1,-1,0);
    }

    //同步解散房间
    private onSynDissolution(data:any):void{
        if(data==null)
            return;

        GlobalDataManager.getInstance().setGameOver(true);

        var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);
        PopManager.getInstance().showPromptBox(labelObj["lbl_0"],2,Handler.create(self,function(){
        // PopManager.getInstance().showPromptBox("房间已解散,请返回大厅!",2,Handler.create(self,function(){
            var appConfig:any = data.navigateTo;
            if(appConfig!=null){
                GMDManager.closeGMD();

                //跳转信息
                let id:number = appConfig.id;
                let name:string= appConfig.name;
                let ori:number = appConfig.ori;
                let jsVer:string = appConfig.jsVer;
                let resVer:string = appConfig.resVer;
                let attRes:string = appConfig.attRes;
                let pathStr:string = appConfig.path;
                //直接进游戏,后面需要合并其他游戏的时候再做处理;
                GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
                let obj = new Object();
                obj["param"] = {};//gameInfo;
                GMDManager.startGMD(id,obj);

            }else{
                //这里写不能跳转的错误提示;
            }

        }));
    }

    //同步buffCD
    private onSynBuffCD(data:any):void{
        if(data==null)
            return;

        var self = this;
        var str:string = "";
        for(var code in data){
            var cardJson = data[code];
            if(cardJson==null||cardJson.length<=0)
                return;
            str += "{卡牌编号:"+code+"  BUFF:{ ";

            var buffs:Array<any> = cardJson.buffs;
            for(var i:number=0,lengthI=buffs.length;i<lengthI;i++){

                var buffItem:any = buffs[i];
                if(buffItem==null)
                    continue;

                var fromCode:string = buffItem.fromCode;
                var buffName:string = buffItem.buffName;
                var buffCode:string = buffItem.buffCode;
                var buffCd:string = buffItem.buffCd;
                var buffRound:string = buffItem.buffRound;

                str+="[ 发起编号:"+fromCode+"  ";
                str+="BUFF编号:"+buffCode+"  ";
                str+="BUFF名称:"+buffName+"  ";
                str+="BUFFCD:"+buffCd+"  ";
                str+="BUFF回合:"+buffRound+"  ]";
            }
            
            str+="}  技能:{ "
            var skills:Array<any> = cardJson.skills;
            for(var i:number=0,lengthI=skills.length;i<lengthI;i++){

                var skillItem:any = skills[i];
                if(skillItem==null)
                    continue;

                var skillName:string = skillItem.skillName;
                var skillCode:string = skillItem.skillCode;
                var skillCd:string = skillItem.skillCd;
                var skillRound:string = skillItem.skillRound;

                str+="[技能编号:"+skillName+"  ";
                str+="技能名称:"+skillCode+"  ";
                str+="技能CD:"+skillCd+"  ";
                str+="技能回合:"+skillRound+"  ]";
            }
            str+="}}\n"
        }

        console.log(str);
    }
    
    //设置等待游戏开始视图
    private setWaitStartView(data:any):void{
        var self = this;
        if(self.cWaitStartView==null){
            UIManager.getInstance().showUI(CWaitStartView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
            self.cWaitStartView = UIManager.getInstance().getViewByName(CWaitStartView) as CWaitStartView;
        }else{
            self.cWaitStartView.updateShow(data);
        }

        if(data!=null&&data.type==1&&data.cutdown==0){
            this.onGameStart();
        }
    }

    //当游戏开始
    private onGameStart():void{
        var self = this;
        
        if(self.remainReqQuickSettleCount==0)
            self.remainReqQuickSettleCount = CombatConstants.REQ_QUICK_SETTLEMENT_MAX_COUNT;

        self.updateOptBtnState(0,0,0);

        SoundManager.getInstance().PlaySound("zhandoukaihsi_mp3");
    }

    //设置头像
    private setHead(place:number,data:any):void{
        if(data==null)
            return;

        var self = this;
        switch(place){
            case CombatConstants.PLACE_ATK:
                var cAtkHeadView:CAtkHeadView = new CAtkHeadView();
                var objData:any = {};
                var account:AccountData = GlobalDataManager.getInstance().getAccountData();
                // objData.hp = account.getHp();
                objData.name = account.getNick();
                objData.lv = account.getLvl();
                objData.iconUrl = account.getHead_Url();
                objData.ticket = account.getTicket();

                objData.hp = data.hp;
                objData.leftHp = data.leftHp;
                objData.power = data.rank;

                cAtkHeadView.initData(objData);
                // cAtkHeadView.initData({name:"王二蛋",hp:66,lv:6,power:123,iconUrl:"http://dl.bbs.9game.cn/attachments/forum/202002/24/163438cmy1qemiieaefmym.png"});
                self.groupAtkHead.addChild(cAtkHeadView);
                // self.cAtkHeadView = cAtkHeadView;
                self.combatParser.setAtkHeadView(cAtkHeadView);
                
                var fetterDatas:Array<string> = data.fetterDatas;
                self.combatParser.initFetters(place,fetterDatas);

            break;
            case CombatConstants.PLACE_DFD:
                var cDfdHeadView:CDfdHeadView = new CDfdHeadView();
                var objData:any = {};
                objData.hp = data.hp;
                objData.leftHp = data.leftHp;
                objData.power = data.rank;
                objData.name = data.nick;
                objData.lv = data.lvl
                objData.iconUrl = data.head_url;
                objData.ticket = data.tk;
                objData.bl = data.bl==null?0:data.bl;

                cDfdHeadView.initData(objData);
                self.groupDfdHead.addChild(cDfdHeadView);
                // self.cDfdHeadView = cDfdHeadView;
                self.combatParser.setDfdHeadView(cDfdHeadView);
                
                var fetterDatas:Array<string> = data.fetterDatas;
                self.combatParser.initFetters(place,fetterDatas);
            break;
        }
    }

    private cleanHead():void{
        var self = this;
        if(self.groupAtkHead!=null&&self.groupAtkHead.numChildren>0){
            self.groupAtkHead.removeChildren();
        }
        if(self.groupDfdHead!=null&&self.groupDfdHead.numChildren>0){
            self.groupDfdHead.removeChildren();
        }
    }
 
    
    //更新发牌池剩余数量显示
    private updateReadyCount(place:number,count:number):void{
        var self = this;
        var prefix:string = ""
        switch(place){
            case CombatConstants.PLACE_ATK:
                self.lblAtkReadyCount.text = prefix+count;//剩余：66
            break;
            case CombatConstants.PLACE_DFD:
                self.lblDfdReadyCount.text = prefix+count;
            break;
            default:
                self.lblDfdReadyCount.text = prefix+count;
                self.lblAtkReadyCount.text = prefix+count;
            break;
        }
    }

    //更新回合数文本
    private updateRound(count:number):void{
        this.lblRound.text = count+"";
    }
    
    //更新出牌方向标识
    private updateDirIndicator(place:number):void{
        // this.imgDirIndicator.scaleY = place==CombatConstants.PLACE_ATK?-1:1;
        var self = this;
        var topPos:number = -10;
        var botPos:number = 80;
        self.imgDirSun.y=place==CombatConstants.PLACE_ATK?topPos:botPos;
        self.imgDirMoon.y=place==CombatConstants.PLACE_ATK?botPos:topPos;
    }

    //更新出牌倒计时文本
    private updateOutCardCutDown(count:number):void{
        this.lblOutCardCutDown.text = CombatUtils.getCutDownShowContent(count);
    }

    
    //更新操作按钮状态
    private updateOptBtnState(atkType:number = -1,hostType:number = -1,quickType:number = -1){
        var self = this;

        if(atkType==-1&&hostType==-1&&quickType==-1){   //所有按钮都隐藏
            self.btnQuick.visible = 
            self.btnUnHosting.visible = 
            self.btnHosting.visible = 
            self.btnAtk.visible = 
            self.btnEnd.visible = false;
            return;
        }

        if(hostType==0){  //取消托管状态
            self.btnUnHosting.visible = false;
            self.btnHosting.visible = true;
        }else if(hostType==1){  //托管状态
            self.btnUnHosting.visible = true;
            self.btnHosting.visible = false;
        }

        if(atkType==0){  //攻击按钮不显示 结束按钮不可点状态
            self.btnAtk.visible = false;
            self.btnEnd.visible = true;
            self.btnEnd.enabled = false;
        }else if(atkType==1){  //攻击按钮不显示 结束按钮可点状态
            self.btnAtk.visible = false;
            self.btnEnd.visible = true;
            self.btnEnd.enabled = true;
        }else if(atkType==2){  //攻击按钮显示 结束按钮不显示状态
            self.btnAtk.visible = true;
            self.btnEnd.visible = false;
        }

        if(quickType==0){   //快速结算按钮显示 可点状态
            self.btnQuick.visible = true;   
            self.btnQuick.enabled = self.remainReqQuickSettleCount>0;//可申请次数不能小于0
        }else if(quickType==1){ //快速结算按钮显示 不可点状态
            self.btnQuick.visible = true;
            self.btnQuick.enabled = false;
        }
    }

    //添加战斗节点到战斗序列
    private addCombatNodeToSerial(combatNode:CombatNode):void{
        if(combatNode==null)
            return;
        var self = this;
        
        // if(combatSerial!=null&&combatSerial.getCombatNodeListLength()<=0){
        //     combatSerial.addNodeAndPlay(combatNode);
        // }else{
        //     var ass:boolean = true;
        //     combatSerial = CombatFactory.createCombatSerial(self.combatParser,[combatNode],Handler.create(self,function(){
        //         ass = false;
        //     }));
        //     if(ass)
        //         self.combatSerial = combatSerial;
        // }
        // var combatSerial:CombatSerial = self.combatSerial;

        if(self.combatSerial!=null&&self.combatSerial.getCombatNodeListLength()<=0){
            self.combatSerial = null;
        }

        if(self.combatSerial==null){
            self.combatSerial = CombatFactory.createCombatSerial(self.combatParser,[combatNode]);
        }else{
            self.combatSerial.addNodeAndPlay(combatNode);
        }
        // self.combatSerial = combatSerial;
    }

    private surrenderGame():void{
        var self = this;
        self.sendRequst(CombatCmdDef.CMD_SURRENDER_GAME,{});
    }

    //请求强制重连游戏
    private reqForceReconnectGame():void{
        // self.
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CombatCmdDef.CMD_FORCE_RECONNECT_GAME,{},false);
    }

    //当强制重连游戏
    private onForceReconnectGame(data:any):void{
        if(data==null)
            return;
        
        var appConfig:any = data.navigateTo;
        if(appConfig!=null){
            GMDManager.closeGMD();

            //跳转信息
            let id:number = appConfig.id;
            let name:string= appConfig.name;
            let ori:number = appConfig.ori;
            let jsVer:string = appConfig.jsVer;
            let resVer:string = appConfig.resVer;
            let attRes:string = appConfig.attRes;
            let pathStr:string = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
            let obj = new Object();
            obj["param"] = {};
            GMDManager.startGMD(id,obj);
        }else{
            var reconnect:any = data.reconnect;
            if(reconnect!=null){
                var ruuid:string = reconnect.ruuid;
                GlobalDataManager.getInstance().setRUUID(ruuid);
                var room:string = reconnect.room;
                GlobalDataManager.getInstance().setRoom(room);

                GlobalDataManager.getInstance().setThredID(0);
                var scode:string = reconnect.scode;
                GlobalDataManager.getInstance().setGameServerName(scode);
                GlobalDataManager.getInstance().setGameOver(false);

                var surl:string = reconnect.surl;
                let server: ServerData = new ServerData();
                server.setSname(scode);
                server.setSurl(surl);
                server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                WebSocketManager.getInstance().registerServer(server);
                WebSocketManager.getInstance().connectServer(scode, true);
            }
        }
        
    }

    //当获取卡牌详情
    private onGetCardDetail(data:any):void{
        if(data==null)
            return;

        UIManager.getInstance().showUI(CCardDetailView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{cdata:data,});
    }

    // //设置长方形卡牌列表
    // private setRCardList():void{
    //     var self = this;
    //     var data:Object ={cdata:{"icon":"liubei", "rarity":"common","element":"metal","round":6, "generation" :1,"name":"诸葛村夫", "atk":66, "hp":66,"groupName":"groupCRCI_"}};
    //     for(var i:number=0;i<3;i++){
    //         var view0:CRCardItemView = new CRCardItemView();
    //         view0.initData(data);
    //         self.groupAtkRCard.addChild(view0);
    //         self.arrAtkRCardView.push(view0);

    //         var view1:CRCardItemView = new CRCardItemView();
    //         view1.initData(data);
    //         self.groupDfdRCard.addChild(view1);
    //         self.arrDfdRCardView.push(view1);
    //     }
    // }

    // //设置正方形卡牌列表
    // private setSCardList():void{
    //     var self = this;
    //     var data0:Object ={cdata:{"icon":"sunquan", "rarity":"common","element":"metal","round":6, "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66}};
    //     var data1:Object ={cdata:{"visible":false}};
    //     for(var i:number=0;i<3;i++){
    //         var view0:CSCardItemView = new CSCardItemView();
    //         view0.initData(data0);
    //         self.groupAtkSCard.addChild(view0);
    //         self.arrAtkSCardView.push(view0);

    //         var view1:CSCardItemView = new CSCardItemView();
    //         view1.initData(data1);
    //         self.groupDfdSCard.addChild(view1);
    //         self.arrDfdSCardView.push(view1);
    //     }
    // }

    // //设置死亡卡牌列表
    // private setDeathList():void{
    //     var self = this;
    //     var data:Object ={cdata:{"icon":"caocao", "rarity":"common","element":"metal","round":6, "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66,"grey":1}};
    //     for(var i:number=0;i<3;i++){
    //         var view0:CSCardItemView = new CSCardItemView();
    //         view0.initData(data);
    //         self.groupAtkDList.addChild(view0);

    //         var view1:CSCardItemView = new CSCardItemView();
    //         view1.initData(data);
    //         self.groupDfdDList.addChild(view1);
    //     }
        

    // }
    
    //设置羁绊列表
    private setFetterList():void{
        var self = this;
        for(var i:number=0;i<4;i++){
            var data= {type:"jbmingcheng"+(i%4+1),canTouch:false,visible:i<5};
            var view0:CardFetterView = new CardFetterView();
            view0.initData(data);
            self.groupAtkFetter.addChild(view0);
            view0.scaleX = view0.scaleY = 0.38;

            var view1:CardFetterView = new CardFetterView();
            view1.initData(data);
            self.groupDfdFetter.addChild(view1);
            view1.scaleX = view1.scaleY = 0.38;
        }
        
    }
    
    

    private initCombatParser():void{
        var self = this;
        // var obj:Object = {"cid":9,"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66,"groupName":CombatConstants.CARD_SQUARE_GROUP_PREFIX+"9"};

        // var obj0:Object = {"cid":10,"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // var obj1:Object = {"cid":11,"icon":"liubei", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // var obj2:Object = {"cid":12,"icon":"caocao", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};

        // var obj3:Object = {"cid":13,"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // var obj4:Object = {"cid":14,"icon":"liubei", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // var obj5:Object = {"cid":15,"icon":"caocao", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // // var obj:Object = {"cid":0,"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // // var obj1:Object = {"visible":false};
        // // var contextData:any = {view:self,playerId:0,atkHandCard:[obj,obj,obj],atkOutCard:[obj,obj],atkDeathCard:[],dfdHandCard:[obj1,obj1],dfdOutCard:[obj],dfdDeathCard:[]};
        // // var contextData:any = {view:self,playerId:0}
        // var contextData:any = {view:self,playerId:0,atkHandCard:[obj],atkOutCard:[obj0,obj1,obj2],dfdOutCard:[obj3,obj4,obj5]}
        // var combatParser:CombatParser = new CombatParser(contextData);
        // self.combatParser = combatParser;
        self.combatParser = CDebugConfig.getInstance().getCombatParser(self);

        var cAtkHeadView:CAtkHeadView = new CAtkHeadView();
        var objData0:any = {};
        objData0.hp = 666;
        objData0.leftHp = 666;
        objData0.power = 666;
        objData0.name = "测试1";
        objData0.lv = 66
        // objData.iconUrl = data.head_url;
        objData0.ticket = "123";

        cAtkHeadView.initData(objData0);
        self.groupAtkHead.addChild(cAtkHeadView);
        // self.cDfdHeadView = cDfdHeadView;
        self.combatParser.setAtkHeadView(cAtkHeadView);

        var cDfdHeadView:CDfdHeadView = new CDfdHeadView();
        var objData1:any = {};
        objData1.hp = 666;
        objData1.leftHp = 666;
        objData1.power = 666;
        objData1.name = "测试2";
        objData1.lv = 66
        // objData1.iconUrl = data.head_url;
        objData1.ticket = "456";

        cDfdHeadView.initData(objData1);
        self.groupDfdHead.addChild(cDfdHeadView);
        // self.cDfdHeadView = cDfdHeadView;
        self.combatParser.setDfdHeadView(cDfdHeadView);
        // self.combatParser.setAtkHeadView()
       
    }

    
    // private storeX:number; //TOUCH_BEGIN时存储的拖拽对象位置X
    // private storeY:number; //TOUCH_BEGIN时存储的拖拽对象位置Y
    // private xTouch: number;
    // private yTouch: number;

    // private curChooseImg:eui.Image;

    // private touchBegin(event:egret.TouchEvent):void{
    //     var self = this;
    //     var img:eui.Image = <eui.Image>event.target;
    //     if(img==self.img0||img==self.img1||img==self.img2){
    //         self.storeX = img.x;
    //         self.storeY = img.y;
    //         self.xTouch = event.stageX;
    //         self.yTouch = event.stageY;
    //         self.curChooseImg = img;
    //     }
        
    // }

    // private touchMove(event:egret.TouchEvent):void{
    //     var self = this;
    //     if(self.curChooseImg==null)
    //         return;

    //     self.curChooseImg.x = self.storeX + (event.stageX - self.xTouch);
    //     self.curChooseImg.y = self.storeY + (event.stageY - self.yTouch);
    // }

    // private touchEnd(event:egret.TouchEvent):void{
    //     var self = this;
    //     if(self.curChooseImg!=null){
    //         egret.Tween.get(self.curChooseImg).to({alpha:0},500)
    //         self.curChooseImg = null;
    //         return;
    //     }
    // }


    // //下面方法测试用 后期删除
    // private tIndex:number = 0;
    // //点击攻击按钮
    // private onClickAtkBtn():void{
    //     var self = this;
    //     // //发牌
    //     // var combatNode0:CombatNode = new CombatNode();
    //     // combatNode0.optType = CombatConstants.OPT_TYPE_SEND_CARD;
    //     // combatNode0.senderPlace = 0;
    //     //  var obj:Object = {"cid":9,"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
    //     // combatNode0.optCardData = obj;
    //     // self.combatParser.parse(combatNode0);

    //     // //出牌
    //     // var combatNode:CombatNode = new CombatNode();
    //     // combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD;
    //     // combatNode.senderPlace = 0;
    //     // // combatNode.optCardData = {"cid":"9","icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
    //     // combatNode.fromCardCode = "1";
    //     // combatNode.removeCard = true;
    //     // // self.combatParser.parse(combatNode);

    //     //普通攻击
    //     var combatNode1:CombatNode = new CombatNode();
    //     combatNode1.optType = CombatConstants.OPT_TYPE_ATK_NOR;
    //     combatNode1.senderPlace = 0;
    //     // combatNode1.usageTime = 1000;
    //     combatNode1.fromCardCode = "10";

    //     // var fn0:FightNode = new FightNode();
    //     // fn0.toCardCode = "20";
    //     // fn0.hited = true;
    //     // fn0.damage = -6666;
    //     // fn0.damageShow = CombatUtils.getSymbolStr(fn0.damage);

    //     // var fn1:FightNode = new FightNode();
    //     // fn1.toCardCode = "21";
    //     // fn1.hited = true;
    //     // fn1.damage = 6666;
    //     // fn1.damageShow = CombatUtils.getSymbolStr(fn1.damage);

    //     // var fn2:FightNode = new FightNode();
    //     // fn2.toCardCode = "22";
    //     // fn2.hited = false;


    //     // // combatNode1.fightNodeArr = [fn0,fn1,fn2];
    //     // combatNode1.fightNodeArr = [fn0];
    //     // // self.combatParser.parse(combatNode1);
        
    //     // //技能攻击
    //     // var combatNode2:CombatNode = new CombatNode();
    //     // combatNode2.optType = CombatConstants.OPT_TYPE_ATK_SKILL;
    //     // combatNode2.senderPlace = 1;
    //     // // combatNode2.usageTime = 1000;
    //     // combatNode2.skillKey = "3";
    //     // combatNode2.fromCardCode = "10";

    //     // var fn3:FightNode = new FightNode();
    //     // fn3.toCardCode = "9";
    //     // fn3.hited = true;
    //     // fn3.damage = -6666;
    //     // fn3.damageShow = CombatUtils.getSymbolStr(fn3.damage);

    //     // var fn4:FightNode = new FightNode();
    //     // fn4.toCardCode = "10";
    //     // fn4.hited = true;
    //     // fn4.damage = +6666;
    //     // fn4.damageShow = CombatUtils.getSymbolStr(fn4.damage);

    //     // var fn5:FightNode = new FightNode();
    //     // fn5.toCardCode = "11";
    //     // fn5.hited = false;

    //     // var fn6:FightNode = new FightNode();
    //     // fn6.toCardCode = "12";
    //     // fn6.damage = 0;
    //     // fn6.hited = true;
    //     // fn6.damageShow = CombatUtils.getSymbolStr(fn6.damage);

    //     // combatNode2.fightNodeArr = [fn3,fn4,fn5,fn6];
    //     // // self.combatParser.parse(combatNode);

    //     // // 减少手牌回合
    //     // var combatNode3:CombatNode = new CombatNode();
    //     // combatNode3.optType = CombatConstants.OPT_TYPE_REDUCE_ROUND;
    //     // combatNode3.senderPlace = 0;
    //     // combatNode3.usageTime = 1000;
    //     // self.combatParser.parse(combatNode);
        
    //     //  //持续技能
    //     // var combatNode4:CombatNode = new CombatNode();
    //     // combatNode4.optType = CombatConstants.OPT_TYPE_ATK_SKILL_CONT;
    //     // combatNode4.skillKey = "100";
    //     // combatNode4.fightNodeArr = [fn3,fn4,fn5,fn6];

    //     //  //取消持续技能
    //     // var combatNode5:CombatNode = new CombatNode();
    //     // combatNode5.optType = CombatConstants.OPT_TYPE_ATK_SKILL_DECONT;
    //     // combatNode5.skillKey = "100";
    //     // combatNode5.fightNodeArr = [fn3,fn4,fn5,fn6];

    //     // //牌死亡
    //     // var combatNode6:CombatNode = new CombatNode();
    //     // combatNode6.optType = CombatConstants.OPT_TYPE_DEATH;
    //     // combatNode6.senderPlace = 0;
    //     // combatNode6.fromCardCode = "9";
    //     // combatNode6.removeCard = true;
    //     // // self.combatParser.parse(combatNode);

    //     // //牌复活
    //     // var combatNode7:CombatNode = new CombatNode();
    //     // combatNode7.optType = CombatConstants.OPT_TYPE_REVIVE;
    //     // combatNode7.senderPlace = 0;
    //     // combatNode7.fromCardCode = "9";
    //     // combatNode7.removeCard = true;


    //     // var combatSerial:CombatSerial = new CombatSerial(self.combatParser);
    //     // for(var i:number=1;i<4;i++){
    //     //     //技能攻击
    //     //     var combatNode8:CombatNode = new CombatNode();
    //     //     combatNode8.optType = CombatConstants.OPT_TYPE_ATK_SKILL;
    //     //     combatNode8.senderPlace = 1;
    //     //     // combatNode8.usageTime = 1000;
    //     //     combatNode8.skillKey = i+"";
    //     //     combatNode8.fromCardCode = "20";
            
    //     //     var fn3:FightNode = new FightNode();
    //     //     fn3.toCardCode = "10";
    //     //     fn3.hited = true;
    //     //     fn3.damage = -6666;
    //     //     fn3.damageShow = CombatUtils.getSymbolStr(fn3.damage);

    //     //     var fn4:FightNode = new FightNode();
    //     //     fn4.toCardCode = "11";
    //     //     fn4.hited = true;
    //     //     fn4.damage = +6666;
    //     //     fn4.damageShow = CombatUtils.getSymbolStr(fn4.damage);

    //     //     var fn5:FightNode = new FightNode();
    //     //     fn5.toCardCode = "12";
    //     //     fn5.hited = false;

    //     //     var fn6:FightNode = new FightNode();
    //     //     fn6.toCardCode = "1";
    //     //     fn6.damage = 0;
    //     //     fn6.hited = true;
    //     //     fn6.damageShow = CombatUtils.getSymbolStr(fn6.damage);

    //     //     combatNode8.fightNodeArr = [fn3,fn4,fn5,fn6];
    //     //     combatSerial.addNode(combatNode8);
    //     // }
        

    //     // // var combatSerial:CombatSerial = new CombatSerial(self.combatParser);
    //     // // combatSerial.parse(obj);
    //     // // combatSerial.addNode(combatNode0);
    //     // // combatSerial.addNode(combatNode3);
    //     // // combatSerial.addNode(combatNode);
    //     // // combatSerial.addNode(combatNode2);
    //     // // combatSerial.addNode(combatNode4);
    //     // // combatSerial.addNode(combatNode1);
    //     // // combatSerial.addNode(combatNode5);
    //     // // combatSerial.addNode(combatNode6);
    //     // // combatSerial.addNode(combatNode7);
    //     // combatSerial.startPlay();
        
    //     //当出牌的时候由服务器返回牌的技能id可以使用此接口提前去下载动画资源
    //     // CResManager.getInstance().addResByRCSkillKey("1");
    //     // CResManager.getInstance().addResByRCSkillKey("2");
    //     // CResManager.getInstance().addResByRCSkillKey("3");
    //     // CResManager.getInstance().addResByRCSkillKey("100");
        
    // }

    
    //点击托管按钮
    private onClickHostBtn():void{
        var self = this;
        var skillid:string = this.editSkillId.text;
        skillid = skillid==null||skillid==""?"0":skillid;
        
        var optType:number = 5;
        if(Number(skillid)>1000){
            optType = CombatConstants.OPT_TYPE_ATK_SKILL_CONT;
        }
        var fightNodeArr = [
                {"toTarget":"10","hited":true,"damage":-6666,"damageShow":"-6666","recoverShow":"+666"},
                {"toTarget":"11","hited":true,"damage":6666,"damageShow":"+6666","recoverShow":"+666"},
                {"toTarget":"12","hited":false}
            ];
        
        var obj1:any = null;
        var skillNum:number = Number(skillid);
        if(skillNum==43){
            obj1 =  {"toTarget":"123","type":CombatConstants.FIGHT_TYPE_USER,"hited":true,"damage":-66,"damageShow":"-66","recoverShow":"+666"};
            fightNodeArr.push(obj1);
        }else if(skillNum==45||skillNum==46||skillNum==47){
            obj1 = {"toTarget":"20","recipient":false,"type":CombatConstants.FIGHT_TYPE_OUT_CARD,"hited":true,"damage":66,"damageShow":"-66","recoverShow":"+666"};
            fightNodeArr.push(obj1);
        }
        
        var obj = [{"note":"技能攻击 上方攻击","optType":optType,"senderPlace":1,"skillKey":skillid,"fromTarget":"20",
            "fightNodeArr":fightNodeArr
        }]
        // var obj = [{"note":"技能攻击 上方攻击","optType":CombatConstants.OPT_TYPE_ATK_SKILL,"senderPlace":1,"skillKey":skillid,"fromTarget":"20",
        //     "fightNodeArr":[
        //         {"toTarget":"456","hited":true,"damage":6666,"recoverShow":"+6666","type":CombatConstants.FIGHT_TYPE_USER}
        //     ]
        // }]

        var combatSerial:CombatSerial = new CombatSerial(self.combatParser);

        for(var key in obj){
            var item:Object = obj[key];
            if(item==null)
                continue;
            
            var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
            self.addCombatNodeToSerial(combatNode);
            // combatSerial.addNode(combatNode);
        }

        if(skillid==""){
            return;
        }

        var configs:any = CombatConfig.getInstance().getConfigs();
        var rcskillexpfroms:any = configs[CombatConstants.RC_SKILL_EXP_FORMS];
        if(rcskillexpfroms==null)
            return null;
        
        var skillData:any = rcskillexpfroms[skillid];
        if(skillData==null)
            return null;

        var usetime:number = 0;
        var resAttr = skillData[CombatConstants.SKILL_RES_ATTR];
        if(resAttr!=null){
            var time:number = resAttr[CombatConstants.USAGE_TIME];
            if(time!=null&&time>usetime)
                usetime = time;
        }

        var recAttr = skillData[CombatConstants.SKILL_REC_ATTR];
        if(recAttr!=null){
            var time:number = recAttr[CombatConstants.USAGE_TIME];
            if(time!=null&&time>usetime)
                usetime = time;
        }



        // combatSerial.startPlay();
        egret.Tween.get(this).wait(usetime).call(function(){
            
            var fightNodeArr = [
                {"toTarget":"20","hited":true,"damage":-6666,"damageShow":"-6666","recoverShow":"+666"},
                {"toTarget":"21","hited":true,"damage":6666,"damageShow":"+6666","recoverShow":"+666"},
                {"toTarget":"22","hited":false}
            ];

            var obj1:any = null;
            var skillNum:number = Number(skillid);
            if(skillNum==43){
                obj1 =  {"toTarget":"456","type":CombatConstants.FIGHT_TYPE_USER,"hited":true,"damage":-66,"damageShow":"-66","recoverShow":"+666"};
                fightNodeArr.push(obj1);
            }else if(skillNum==45||skillNum==46||skillNum==47){
                obj1 = {"toTarget":"10","recipient":false,"type":CombatConstants.FIGHT_TYPE_OUT_CARD,"hited":true,"damage":66,"damageShow":"-66","recoverShow":"+666"};
                fightNodeArr.push(obj1);
            }
            
            var obj = [{"note":"技能攻击 下方攻击","optType":optType,"senderPlace":0,"skillKey":skillid,"fromTarget":"10",
                "fightNodeArr":fightNodeArr
            }]

            for(var key in obj){
                var item:Object = obj[key];
                if(item==null)
                    continue;
                
                var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
                self.addCombatNodeToSerial(combatNode);
                // combatSerial.addNode(combatNode);
            }
        })
        

        // // 发牌
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_SEND_CARD;
        // combatNode.senderPlace = 1;
        // combatNode.optCardData = {"visible":false};
        // self.combatParser.parse(combatNode);

        // //取消选择出的牌
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_DESEL_CARD;
        // combatNode.senderPlace = 0;
        // combatNode.callBack = function():void{
            
        // }.bind(self);
        // self.combatParser.parse(combatNode);

        // //发牌
        // var combatNode0:CombatNode = new CombatNode();
        // combatNode0.optType = CombatConstants.OPT_TYPE_SEND_CARD;
        // combatNode0.senderPlace = 0;
        // combatNode0.optCardData = {"cid":self.tIndex,"icon":"sunquan", "rarity":"common","element":"metal","round":1, "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66,"groupName":CombatConstants.CARD_SQUARE_GROUP_PREFIX+self.tIndex};
        // self.tIndex++;
        // self.combatParser.parse(combatNode0);

        // //牌死亡
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
        // combatNode.senderPlace = 0;
        // combatNode.fromCardCode = "10";
        // combatNode.removeCard = true;
        // self.combatParser.parse(combatNode);

        // var combatSerial:CombatSerial = new CombatSerial(self.combatParser);
        // for(var i:number=1;i<4;i++){
        //     //技能攻击
        //     var combatNode8:CombatNode = new CombatNode();
        //     combatNode8.optType = CombatConstants.OPT_TYPE_ATK_SKILL;
        //     combatNode8.senderPlace = 0;
        //     // combatNode8.usageTime = 1000;
        //     combatNode8.skillKey = i+"";
        //     combatNode8.fromCardCode = "10";

        //     var fn3:FightNode = new FightNode();
        //     fn3.toCardCode = "20";
        //     fn3.hited = true;
        //     fn3.damage = -6666;
        //     fn3.damageShow = CombatUtils.getSymbolStr(fn3.damage);

        //     var fn4:FightNode = new FightNode();
        //     fn4.toCardCode = "21";
        //     fn4.hited = true;
        //     fn4.damage = +6666;
        //     fn4.damageShow = CombatUtils.getSymbolStr(fn4.damage);

        //     var fn5:FightNode = new FightNode();
        //     fn5.toCardCode = "22";
        //     fn5.hited = false;

        //     combatNode8.fightNodeArr = [fn3,fn4,fn5];
        //     combatSerial.addNode(combatNode8);
        // }
        
        // combatSerial.startPlay();
    }


    // //点击攻击方卡牌
    // private onClickAtkDBtn():void{
    //     var self = this;
    //     // //出牌
    //     // var combatNode:CombatNode = new CombatNode();
    //     // combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD;
    //     // combatNode.senderPlace = 0;
    //     // combatNode.optCardData = {"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
    //     // combatNode.fromCardCode = 0;
    //     // combatNode.removeCard = true;
    //     // self.combatParser.parse(combatNode);

    //     // // 减少手牌回合
    //     // var combatNode:CombatNode = new CombatNode();
    //     // combatNode.optType = CombatConstants.OPT_TYPE_REDUCE_ROUND;
    //     // combatNode.senderPlace = 0;
    //     // self.combatParser.parse(combatNode);

    //     //牌死亡
    //     // var combatNode:CombatNode = new CombatNode();
    //     // combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
    //     // combatNode.senderPlace = 0;
    //     // combatNode.fromCardCode = "10";
    //     // combatNode.removeCard = true;
    //     // self.combatParser.parse(combatNode);

    //     // var combatNode:CombatNode = new CombatNode();
    //     // combatNode.optType = CombatConstants.OPT_TYPE_ATK_SKILL_DECONT;
    //     // combatNode.skillKey = "100";
    //     // combatNode.fightNodeArr = [fn3,fn4,fn5,fn6];
    // }
    //点击防御方死亡卡牌
    private onClickDfdDBtn():void{
        var self = this;

        // 减少手牌回合
        var combatNode3:CombatNode = new CombatNode();
        combatNode3.optType = CombatConstants.OPT_TYPE_REDUCE_ROUND;
        var place:number = CombatConstants.PLACE_ATK;
        // combatNode3.senderPlace = 0;
        // combatNode3.usageTime = 1000;
        combatNode3.receiverPlace = place;  //当前回合位置 用来判断是否可以改变卡牌状态为发光可点击状态
        combatNode3.senderPlace = CombatConstants.PLACE_ATK;
        self.combatParser.parse(combatNode3);
        return;

                // //牌死亡
        var combatNode:CombatNode = new CombatNode();
        combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
        combatNode.senderPlace = 0;
        combatNode.fromTarget = "10";
        combatNode.removeCard = true;
        self.combatParser.parse(combatNode);
        return;
        //  //出牌
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD;
        // combatNode.senderPlace = 1;
        // combatNode.optCardData = {"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // combatNode.fromCardCode = 0;
        // combatNode.removeCard = true;
        // self.combatParser.parse(combatNode);

        // // //出牌
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD;
        // combatNode.senderPlace = 0;
        // // combatNode.optCardData = {"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"诸葛村夫", "cost":66, "atk":66, "hp":66};
        // combatNode.fromCardCode = "0";
        // combatNode.removeCard = true;
        // self.combatParser.parse(combatNode);

        // //牌复活
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_REVIVE;
        // combatNode.senderPlace = 0;
        // combatNode.fromCardCode = "10";
        // combatNode.removeCard = true;
        // self.combatParser.parse(combatNode);


        // var self = this;
        // var skillid:string = this.editSkillId.text;
        // skillid = skillid==null||skillid==""?"0":skillid;
        // var obj = [{"note":"取消持续技能","optType":CombatConstants.OPT_TYPE_ATK_SKILL_DECONT,"skillKey":skillid,
        //         "fightNodeArr":[
        //             {"toTarget":"10"},
        //             {"toTarget":"11"},
        //             {"toTarget":"12"}
        //         ]
        //     },

        //     {"note":"取消持续技能","optType":CombatConstants.OPT_TYPE_ATK_SKILL_DECONT,"skillKey":skillid,
        //         "fightNodeArr":[
        //             {"toTarget":"20","hited":true,"damage":-6666,"damageShow":"-6666"},
        //             {"toTarget":"21","hited":true,"damage":6666,"damageShow":"+6666"},
        //             {"toTarget":"22","hited":false}
        //         ]
        //     }]

        // var combatSerial:CombatSerial = new CombatSerial(self.combatParser);

        // for(var key in obj){
        //     var item:Object = obj[key];
        //     if(item==null)
        //         continue;
            
        //     var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
        //     combatSerial.addNode(combatNode);
        // }
        // combatSerial.startPlay();

        // var arr:Array<CombatNode> = new Array<CombatNode>();//[combatNode0,combatNode1];
        // var place:number = CombatConstants.PLACE_ATK;
        // for(var i:number = 1;i<3;i++){
        //     var combatNode1:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_OUT_CARD,{place:place,card:{"code":i,"icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"孙权", "cost":66, "atk":66, "hp":66}});
        //     arr.push(combatNode1);
        //  }
        //  CombatFactory.createCombatSerial(self.combatParser,arr,Handler.create(self,function(){
        //     // 
        //     self.combatParser.sortHandCard(place);
        // }));

        // var damage:number = 66;
        // var combatNode:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_ATK_NOR,{place:CombatConstants.PLACE_DFD,code:"20",fightNodeArr:[{target:"456",type:CombatConstants.FIGHT_TYPE_USER,damage:damage,damageShow:CombatUtils.getSymbolStr(damage),hited:true}]});
        // self.combatParser.parse(combatNode);


        // // 牌死亡
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
        // combatNode.senderPlace = 0;
        // combatNode.fromTarget = "10";
        // combatNode.removeCard = true;
        // self.combatParser.parse(combatNode);

        // //出牌
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD;
        // combatNode.senderPlace = 0;
        // combatNode.optCardData = {"code":"1","icon":"sunquan", "rarity":"common","element":"metal", "generation" :1,"name":"孙权", "cost":66, "atk":66, "hp":66};
        // combatNode.fromTarget = "1";
        // combatNode.removeCard = true;
        // self.combatParser.parse(combatNode);

        

        // //普通攻击
        // var combatNode1:CombatNode = new CombatNode();
        // combatNode1.optType = CombatConstants.OPT_TYPE_ATK_NOR;
        // combatNode1.senderPlace = 0;
        // combatNode1.fromTarget = "11";

        // var fn0:FightNode = new FightNode();
        // fn0.toTarget = "21";
        // // fn0.toTarget = "456";
        // // fn0.type = CombatConstants.FIGHT_TYPE_USER;
        // fn0.hited = false;
        // fn0.damage = -66;
        // fn0.damageShow = CombatUtils.getSymbolStr(fn0.damage);

        // combatNode1.fightNodeArr = [fn0];
        // self.combatParser.parse(combatNode1);

        //  //修改属性
        // var combatNode1:CombatNode = new CombatNode();
        // combatNode1.optType = CombatConstants.OPT_TYPE_MODIFY_ATTRIBUTE;

        // var fn0:FightNode = new FightNode();
        // fn0.toTarget = "21";
        // fn0.toTargetObj = {mlhp:-1000};

        // var fn1:FightNode = new FightNode();
        // fn1.toTarget = "22";
        // fn1.toTargetObj = {mhp:-10};

        // var fn2:FightNode = new FightNode();
        // fn2.toTarget = "20";
        // fn2.toTargetObj = {mhp:+10};

        // combatNode1.fightNodeArr = [fn0,fn1,fn2];
        // self.combatParser.parse(combatNode1);

        // //劝退
        // var combatNode1:CombatNode = new CombatNode();
        // combatNode1.optType = CombatConstants.OPT_TYPE_PERSUADE_BACK;
        // combatNode1.fromTarget = "11";
        // combatNode1.skillKey = "5";
        // combatNode1.removeCard = true;

        // var fn0:FightNode = new FightNode();
        // fn0.toTarget = "21";
        // fn0.toTargetObj = {"code":"21","icon":"diaochan", "rarity":"mythical","element":"metal", "generation" :1,"name":"貂蝉", "cost":66, "atk":66, "hp":60};
        // fn0.type = CombatConstants.FIGHT_TYPE_HAND_CARD;

        // combatNode1.fightNodeArr = [fn0];
        // self.combatParser.parse(combatNode1);

        // //技能攻击
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_ATK_SKILL;
        // combatNode.senderPlace = 0;
        // // combatNode8.usageTime = 1000;
        // combatNode.skillKey = "14";
        // combatNode.fromTarget = "10";

        // var fn3:FightNode = new FightNode();
        // fn3.toTarget = "20";
        // fn3.hited = true;
        // fn3.damage = -6666;
        // fn3.damageShow = CombatUtils.getSymbolStr(fn3.damage);

        // var fn4:FightNode = new FightNode();
        // fn4.toTarget = "21";
        // fn4.hited = true;
        // fn4.damage = +6666;
        // fn4.damageShow = CombatUtils.getSymbolStr(fn4.damage);

        // var fn4:FightNode = new FightNode();
        // fn4.toTarget = "21";
        // fn4.hited = true;
        // fn4.damage = -6666;
        // fn4.damageShow = CombatUtils.getSymbolStr(fn4.damage);

        // var fn5:FightNode = new FightNode();
        // fn5.toTarget = "456";
        // fn5.type = 0;
        // fn5.hited = true;
        // fn5.damage = -6666;
        // fn5.damageShow = CombatUtils.getSymbolStr(fn5.damage);

        // combatNode.fightNodeArr = [fn3,fn4,fn5];
        // self.combatParser.parse(combatNode);

        // var urlloader:egret.URLLoader = new egret.URLLoader();
        // var urlreq: egret.URLRequest = new egret.URLRequest();
        // urlreq.url = "resource/conf/test.json";
        // urlloader.load(urlreq);
        // urlloader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        
        // window.open("http://192.168.0.68:3004/index.html","_blank");
        // window.open("http://192.168.0.68:3004/index.html","_blank");


        if(self.editSkillId.text=="")
            return;
        
        var skillKey:string = self.editSkillId.text;
        // var expForms:any = CombatConfig.getInstance().getRCSkillExpFormsConfig();
        // var expFormSkillAttrs:any = expForms[skillKey];
        // if(expFormSkillAttrs==null){
        //     return;
        // }

        

        var configs:any = CombatConfig.getInstance().getConfigs();
        var eff_components:any = configs[CombatConstants.EFF_COMPONENTS];
        if(eff_components==null)
            return null;
        
        var compData:any = eff_components[CombatConstants.EFF_COMP_MOVIECLIPS];
        if(compData==null)
            return null;

        var config:MovieClipConfig = CombatUtils.getConfig(compData[skillKey],MovieClipConfig);

        // var data = RES.getRes(config.jsName+"_json");
        // var txtr = RES.getRes(config.mcName+"_png");
        // var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        // var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( config.jsName ) );
        // var oFrameRate:number = mc1.frameRate;
        // self.editTFrameRate.text = oFrameRate+"";


        var cFrameRate:number = config.frameRate;
        self.editFrameRate.text = cFrameRate+"";

        if(self.editTFrameRate.text!=""){
            var oFrameRate:number = Number(self.editTFrameRate.text);
            self.editSpeed.text = Number((oFrameRate/cFrameRate).toFixed(2))*1000 +"";
        }else{
            self.editSpeed.text ="";
        }
        

        // this.addChild(movieClip);
        // console.log(movieClip.frameRate);
        // CombatUtils.assignmentObj(config,data);
        // if(config.frameRate!=null){
        //     config.frameRate = CombatUtils.getAMFrameRate(config.frameRate);
        // }

        // var expFormAttrs:any = expFormSkillAttrs[type];
        // if(expFormAttrs==null){
        //     return;
        // }

        // var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];
        // var config:MovieClipConfig = CombatConfig.getInstance().getEffComponentConfig(eff_comp,CombatConstants.EFF_COMP_MOVIECLIPS) as MovieClipConfig;




    }


    private onClickAtkDBtn():void{
        var self =this;
        if(self.editTFrameRate.text ==""||self.editSkillId.text==""||self.editFrameRate.text=="")
            return;
        
        var oFrameRate:number = Number(self.editTFrameRate.text);
        var cFrameRate:number = Number(self.editFrameRate.text);
        if(self.editSpeed.text==""){
            self.editSpeed.text = Number((oFrameRate/cFrameRate).toFixed(2))*1000 +"";
            return;
        }
        
        var skillKey:string = self.editSkillId.text;

        var configs:any = CombatConfig.getInstance().getConfigs();
        var eff_components:any = configs[CombatConstants.EFF_COMPONENTS];
        if(eff_components==null)
            return null;
        
        var compData:any = eff_components[CombatConstants.EFF_COMP_MOVIECLIPS];
        if(compData==null)
            return null;

        // var config:MovieClipConfig = CombatUtils.getConfig(compData[skillKey],MovieClipConfig);

        
        // var speed:number = Number(self.editSpeed.text);
        // var num:number = Math.floor(oFrameRate/(speed/1000));
        // // config["frameRate"] = num;
        // compData[skillKey]["frameRate"] = num;
        // self.editFrameRate.text = num+"";

        var frameRate:number = Number(self.editFrameRate.text);
        compData[skillKey]["frameRate"] = frameRate;
        self.editSpeed.text = Math.floor(oFrameRate/frameRate*1000)+"";

        // var obj = {fightData:{"note":"技能攻击 上方攻击","optType":CombatConstants.OPT_TYPE_FETTER_ADD,"senderPlace":0,"skillKey":"20000",showDrift:true,
        //         "fightNodeArr":[
        //             {"toTarget":"10","toTargetObj":{"mhp":66,"matk":-666,"mlhp":-66}},
        //             {"toTarget":"11","toTargetObj":{"mhp":-66,"matk":6666,"mlhp":666}},
        //             {"toTarget":"12","toTargetObj":{"mhp":666}}
        //         ]
        // }}

        // var combatNode:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_FETTER_ADD,obj);
        // self.addCombatNodeToSerial(combatNode);

        // this.testTimeout(Handler.create(self,function(){
        //     console.log("1");
        // }),1000);
        
        // this.testTimeout(Handler.create(self,function(){
        //     console.log("2");
        // }),5000);


        // var obj = {fightData:{"note":"技能攻击 上方攻击","optType":CombatConstants.OPT_TYPE_FETTER_ADD,"senderPlace":0,"skillKey":"20000",showDrift:true,
        //         "fightNodeArr":[
        //             {"toTarget":"10","toTargetObj":{"mhp":66,"matk":-666,"mlhp":-66}},
        //             {"toTarget":"11","toTargetObj":{"mhp":-66,"matk":6666,"mlhp":666}},
        //             {"toTarget":"12","toTargetObj":{"mhp":666}}
        //         ]
        // }}
        
        // // for(var key in obj){
        // //     var item:Object = obj[key];
        // //     if(item==null)
        // //         continue;
            
        // //     var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
        // //     self.addCombatNodeToSerial(combatNode);
        // //     // combatSerial.addNode(combatNode);
        // // }
        // var combatNode:CombatNode = CombatFactory.createCombatNode(CombatConstants.OPT_TYPE_FETTER_ADD,obj);
        // self.addCombatNodeToSerial(combatNode);
        // // 牌羁绊
        // var combatNode:CombatNode = new CombatNode();
        // combatNode.optType = CombatConstants.OPT_TYPE_FETTER_ADD;
        // combatNode.senderPlace = 0;
        // combatNode.skillKey = "20000";
        
        // var fn0:FightNode = new FightNode();
        // fn0.type = CombatConstants.FIGHT_TYPE_OUT_CARD;
        // fn0.toTarget = "11";
        // fn0.toTargetObj = {"matk":100,"mhp":66};
        // // fn0.hited = true;
        // // fn0.damage = +6666;
        // // fn0.damageShow = CombatUtils.getSymbolStr(fn0.damage);

        // var fn1:FightNode = new FightNode();
        // fn1.type = CombatConstants.FIGHT_TYPE_OUT_CARD;
        // fn1.toTarget = "12";
        // fn1.toTargetObj = {"matk":-100,"mhp":-66};

        // // var fn4:FightNode = new FightNode();
        // // fn4.toTarget = "21";
        // // fn4.hited = true;
        // // fn4.damage = -6666;
        // // fn4.damageShow = CombatUtils.getSymbolStr(fn4.damage);

        // // var fn5:FightNode = new FightNode();
        // // fn5.toTarget = "456";
        // // fn5.type = 0;
        // // fn5.hited = true;
        // // fn5.damage = -6666;
        // // fn5.damageShow = CombatUtils.getSymbolStr(fn5.damage);

        // combatNode.fightNodeArr = [fn0,fn1];
        // self.combatParser.parse(combatNode);

        
        // egret.Tween.get(this).wait(2000).call(function(){
            
        //    // 牌羁绊
        //     var combatNode0:CombatNode = new CombatNode();
        //     combatNode0.optType = CombatConstants.OPT_TYPE_FETTER_ADD;
        //     combatNode0.senderPlace = 0;
        //     combatNode0.skillKey = "20001";

        //     var fn2:FightNode = new FightNode();
        //     fn2.type = CombatConstants.FIGHT_TYPE_OUT_CARD;
        //     fn2.toTarget = "11";
        //     fn2.toTargetObj = {"matk":-100,"mhp":-66};

        //     combatNode0.fightNodeArr = [fn2];

        //     self.combatParser.parse(combatNode0);
        // })

    }

    private testTimeout(handler:Handler,showDelay:number){
        var self = this;
        // egret.setTimeout(function(handParam){
        //     handParam.run();
        // }.bind(self,handler), self, showDelay);
        egret.Tween.get(self).wait(showDelay).call(function(){handler.run()});
    }

    private onClickAtkBtn():void{
        var self = this;
        var skillid:string = this.editSkillId.text;
        skillid = skillid==null||skillid==""?"0":skillid;
        
        var optType:number = CombatConstants.OPT_TYPE_ATK_SKILL;

        var obj = [{"note":"技能攻击 上方攻击","optType":optType,"senderPlace":1,"skillKey":skillid,"fromTarget":"20",
            "fightNodeArr":[
                {"toTarget":"10","hited":true}//,
                // {"toTarget":"11","hited":true},
                // {"toTarget":"12","hited":false}
            ]
        }];

        var combatSerial:CombatSerial = new CombatSerial(self.combatParser);
        for(var key in obj){
            var item:Object = obj[key];
            if(item==null)
                continue;
            
            var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
            self.addCombatNodeToSerial(combatNode);
            // combatSerial.addNode(combatNode);
        }
        

        var configs:any = CombatConfig.getInstance().getConfigs();
        var rcskillexpfroms:any = configs[CombatConstants.RC_SKILL_EXP_FORMS];
        if(rcskillexpfroms==null)
            return null;
        
        var skillData:any = rcskillexpfroms[skillid];
        if(skillData==null)
            return null;

        var usetime:number = 0;
        var resAttr = skillData[CombatConstants.SKILL_RES_ATTR];
        if(resAttr!=null){
            var time:number = resAttr[CombatConstants.USAGE_TIME];
            if(time!=null&&time>usetime)
                usetime = time;
        }

        var recAttr = skillData[CombatConstants.SKILL_REC_ATTR];
        if(recAttr!=null){
            var time:number = recAttr[CombatConstants.USAGE_TIME];
            if(time!=null&&time>usetime)
                usetime = time;
        }

        // egret.Tween.get(this).wait(usetime).call(function(){
        //     // var obj = [{"note":"技能攻击 上方攻击","optType":CombatConstants.OPT_TYPE_MODIFY_ATTRIBUTE,"senderPlace":1,"skillKey":"","fromTarget":"20",
        //     //         "fightNodeArr":[
        //     //             {"toTarget":"10","hited":true,"damage":-6666,"reduceShow":CombatUtils.getSymbolAttributeStr(CombatConstants.MODIFY_ATTRIBUTE_HP,-666),"toTargetObj":{"mhp":-666}},
        //     //             {"toTarget":"11","hited":true,"damage":6666,"increaseShow":CombatUtils.getSymbolAttributeStr(CombatConstants.MODIFY_ATTRIBUTE_ATK,666),"toTargetObj":{"mhp":666}},
        //     //             {"toTarget":"12","hited":true,"damage":6666,"increaseShow":CombatUtils.getSymbolAttributeStr(CombatConstants.MODIFY_ATTRIBUTE_LIMIT_HP,666),"toTargetObj":{"mhp":666}}
        //     //         ]
        //     // }]
            
        //     // for(var key in obj){
        //     //     var item:Object = obj[key];
        //     //     if(item==null)
        //     //         continue;
                
        //     //     var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
        //     //     self.addCombatNodeToSerial(combatNode);
        //     //     // combatSerial.addNode(combatNode);
        //     // }
        //     var fightNodeArr = [
        //             {"toTarget":"10","hited":true,"damage":-6666,"damageShow":"-6666","recoverShow":"+666"},
        //             {"toTarget":"11","hited":true,"damage":6666,"damageShow":"+6666","recoverShow":"+666"},
        //             {"toTarget":"12","hited":false}
        //         ];
            
        //     var obj1:any = null;
        //     var skillNum:number = Number(skillid);
        //     if(skillNum==43){
        //         obj1 =  {"toTarget":"123","type":CombatConstants.FIGHT_TYPE_USER,"hited":true,"damage":-66,"damageShow":"-66","recoverShow":"+666"};
        //         fightNodeArr.push(obj1);
        //     }else if(skillNum==45||skillNum==46||skillNum==47){
        //         obj1 = {"toTarget":"20","recipient":false,"type":CombatConstants.FIGHT_TYPE_OUT_CARD,"hited":true,"damage":66,"damageShow":"-66","recoverShow":"+666"};
        //         fightNodeArr.push(obj1);
        //     }
            
        //     var obj = [{"note":"技能攻击 上方攻击","optType":optType,"senderPlace":1,"skillKey":skillid,"fromTarget":"21",
        //         "fightNodeArr":fightNodeArr
        //     }]

        //     var combatSerial:CombatSerial = new CombatSerial(self.combatParser);

        //     for(var key in obj){
        //         var item:Object = obj[key];
        //         if(item==null)
        //             continue;
                
        //         var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
        //         self.addCombatNodeToSerial(combatNode);
        //         // combatSerial.addNode(combatNode);
        //     }
        // })

        // var obj = [{"note":"技能攻击 上方攻击","optType":CombatConstants.OPT_TYPE_ATK_SKILL,"senderPlace":1,"skillKey":skillid,"fromTarget":"20",
        //     "fightNodeArr":[
        //         {"toTarget":"456","hited":true,"damage":6666,"recoverShow":"+6666","type":CombatConstants.FIGHT_TYPE_USER}
        //     ]
        // }]

        
        

        // var obj1 = [{"note":"技能攻击 上方攻击","optType":optType,"senderPlace":1,"skillKey":skillid,"fromTarget":"20",
        //     "fightNodeArr":[
        //         {"toTarget":"10","hited":true,"damage":-6666,"damageShow":"-6666","recoverShow":"+666"},
        //         {"toTarget":"11","hited":true,"damage":6666,"damageShow":"+6666","recoverShow":"+666"},
        //         {"toTarget":"12","hited":false}
        //     ]
        // }]
    }

    private onClickSetBtn():void{
        // var hand0:Handler = Handler.create(self,function(){
        //     console.log("0000000");
        // })

        // var hand1:Handler = Handler.create(self,function(){
        //     console.log("111111");
        // })

        // egret.setTimeout(function(handParam){
        //         handParam.run()}.bind(self,hand0), self, 1000);
        
        // egret.setTimeout(function(handParam){
        //         handParam.run()}.bind(self,hand1), self, 5000);
            
        CResManager.getInstance().addResByRCSkillKey("0");
    }

    // //读取配置文件完成
    // private onComplete(event: egret.Event): void{      
    //     var data = event.target.data;
    //     var obj =  JSON.parse(data);
    //     console.log(obj[1].ID );   //打印开结果，下角标自己测试时从0开始还是从1开始
    // }

    private checkBGMPlay():void{
        var self = this;
        if(self.playBGM)
            return;

        SoundManager.getInstance().PlayBgm("zhandouBGM_mp3");
        SoundManager.getInstance().setBGMVolume(1);
        self.playBGM = true;
    }
    
    //返回战斗解析类
    private get combatParser(){
        var self = this;
        if(self._combatParser==null){
            var contextData:any = {view:self}
            self._combatParser = new CombatParser(contextData);
        }
        return self._combatParser;
    }

    //返回战斗解析类
    private set combatParser(combatParser:CombatParser){
        this._combatParser = combatParser;
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupCombat==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupCombat.scaleX = 
            self.groupCombat.scaleY = 1;
            return;
        }
        self.groupCombat.scaleX = 
        self.groupCombat.scaleY = gapNum;
    }
}