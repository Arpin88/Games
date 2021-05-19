// TypeScript file
class CombatParser{
    public constructor(contextData:any){
        this.initData(contextData);
    }

    private contextData:any;

    private arrAtkHandCardView:Array<CSCardItemView>;  //攻击者正方形卡牌视图集合*手上握的牌
    private arrDfdHandCardView:Array<CSCardItemView>;  //防御者正方形卡牌视图集合

    private arrAtkOutCardView:Array<CRCardItemView>;  //攻击者长方形卡牌视图集合*桌上出的牌
    private arrDfdOutCardView:Array<CRCardItemView>;  //防御者长方形卡牌视图集合

    private arrAtkDeathCardView:Array<CSCardItemView>;  //攻击者死亡卡牌视图集合*已经死亡的牌
    private arrDfdDeathCardView:Array<CSCardItemView>;  //防御者死亡卡牌视图集合

    private atkHeadView:CAtkHeadView;   //下方头像视图
    private dfdHeadView:CDfdHeadView;   //上方头像视图

    private arrCombatOptNote:Array<CombatOptNote>;  //战斗操作标记

    private initData(contextData:any):void{
        var self =  this;

        self.contextData = contextData;

        self.arrAtkHandCardView = new Array<CSCardItemView>();
        self.arrDfdHandCardView = new Array<CSCardItemView>();
        self.arrAtkOutCardView = new Array<CRCardItemView>();
        self.arrDfdOutCardView = new Array<CRCardItemView>();
        self.arrAtkDeathCardView = new Array<CSCardItemView>();
        self.arrDfdDeathCardView = new Array<CSCardItemView>();
        self.atkHeadView = null;
        self.dfdHeadView = null;
        self.arrCombatOptNote = new Array<CombatOptNote>();

        self.createCardViewByArr(CombatConstants.CARD_GROUP_ATK_HAND,contextData.atkHandCard);
        self.createCardViewByArr(CombatConstants.CARD_GROUP_DFD_HAND,contextData.dfdHandCard);
        self.createCardViewByArr(CombatConstants.CARD_GROUP_ATK_OUT,contextData.atkOutCard);
        self.createCardViewByArr(CombatConstants.CARD_GROUP_DFD_OUT,contextData.dfdOutCard);
        self.createCardViewByArr(CombatConstants.CARD_GROUP_ATK_DEATH,contextData.atkDeathCard);
        self.createCardViewByArr(CombatConstants.CARD_GROUP_DFD_DEATH,contextData.dfdDeathCard);
    }

    public cleanData():void{
        var self = this;
        self.cleanArray(self.arrAtkHandCardView);
        self.cleanArray(self.arrDfdHandCardView);
        self.cleanArray(self.arrAtkOutCardView);
        self.cleanArray(self.arrDfdOutCardView);
        self.cleanArray(self.arrAtkDeathCardView);
        self.cleanArray(self.arrDfdDeathCardView);
        self.atkHeadView = null;
        self.dfdHeadView = null;
        self.arrCombatOptNote = null;
    }

    private cleanArray(arr:Array<IBaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i=arr.length-1;i>=0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    public initCards(type:number,arr:Array<Object>):void{
        this.createCardViewByArr(type,arr);
    }

    public initFetters(place:number,arr:Array<string>){
        if(arr==null||arr.length<=0)
            return;
        var self = this;
        var fightExpForm:FightExpForm = place==CombatConstants.PLACE_ATK?self.atkHeadView.getFightExpForm():self.dfdHeadView.getFightExpForm();
        if(fightExpForm==null)
            return;
        for(var i:number=0,lengthI=arr.length;i<lengthI;i++){
            var item:string = arr[i];
            if(item==null||item=="")
                continue;
            fightExpForm.playHeadFetterExpFrom(item,CombatConstants.SKILL_RES_ATTR,place,null,false);
        }
    }

    public setHandCardTouchState(canTouch:boolean):void{
        var self = this;
        for(var i:number=0,lengthI:number = self.arrAtkHandCardView.length;i<lengthI;i++){
            var item:CSCardItemView = self.arrAtkHandCardView[i];
            if(item==null)
                continue;
            item.setTouchState(canTouch);
        }
    }

    public setAtkHeadView(view:CAtkHeadView){
        var self = this;
        if(self.atkHeadView!=null){
            self.atkHeadView.parent.removeChild(self.atkHeadView);
            self.atkHeadView = null;
        }
        self.atkHeadView = view;
    }

    public getAtkHeadView():CAtkHeadView{
        return this.atkHeadView;
    }

    public setDfdHeadView(view:CDfdHeadView){
        var self = this;
        if(self.dfdHeadView!=null){
            self.dfdHeadView.parent.removeChild(self.dfdHeadView);
            self.dfdHeadView = null;
        }
        self.dfdHeadView = view;
    }

    public getDfdHeadView():CDfdHeadView{
        return this.dfdHeadView;
    }

    //同步更新卡牌信息 回合切换的时候强制刷新出牌的数据
    public synUpdateOutCards(place:number,data:any):void{
        if(data==null)
            return;

        var cards:Array<Object> = data;
        if(cards==null)
            return;

        var self = this;
        var arrOutCards:Array<CRCardItemView> = place==CombatConstants.PLACE_ATK?self.arrAtkOutCardView:self.arrDfdOutCardView;
        if(arrOutCards.length!=cards.length){   //如果数量不对 则表示需要全部重新生成
            var outCardsData:Array<Object> = new Array<Object>();
            for(var c:number=0,lengthC=cards.length;c<lengthC;c++){
                var itemCard:any = cards[c];
                if(itemCard==null)
                    continue;
                var code:string = itemCard.code;
                if(code==null)
                    continue;
                var cardData:any = itemCard.cardData;
                if(cardData!=null)
                    outCardsData.push(cardData);
            }
            self.cleanArray(arrOutCards);
            var type:number = place==CombatConstants.PLACE_ATK?CombatConstants.CARD_GROUP_ATK_OUT:CombatConstants.CARD_GROUP_DFD_OUT;
            self.initCards(type,outCardsData);
        }else{
            for(var c:number=0,lengthC=cards.length;c<lengthC;c++){
                var itemCard:any = cards[c];
                if(itemCard==null)
                    continue;

                var code:string = itemCard.code;
                if(code==null)
                    continue;
                var cardData:any = itemCard.cardData;

                var view:CRCardItemView = arrOutCards[c];
                var curCardData:any = view.getCardData();
                if(curCardData==null)
                    continue;
                var curCode:string = curCardData.code;
                if(curCode!=code){
                    var parent:egret.DisplayObjectContainer = view.parent;
                    var cardGroup:number = place==CombatConstants.PLACE_ATK?CombatConstants.CARD_GROUP_ATK_OUT:CombatConstants.CARD_GROUP_DFD_OUT;

                    var optCardData = CombatUtils.changeCardGroupName(cardGroup,cardData);
                    var config:OutCardConfig = CombatConfig.getInstance().getOutCardConfigByPlace(place);

                    parent.removeChild(view);

                    var nview:CRCardItemView = new CRCardItemView();
                    nview.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
                    parent.addChild(nview);

                    arrOutCards[c] = nview;
                }else{
                    view.forceUpdateAtk(cardData.atk);
                    view.forceUpdateHp(cardData.curHp);
                }
            }
        }
        self.sortOutCard(place);
    }

    //创建卡牌视图根据类型集合
    private createCardViewByArr(cardGroup:number,arr:Array<Object>):void{
        if(arr==null||arr.length<=0)
            return;

        var self = this;
        var contextData:any = self.contextData;
        var combatView:CombatView = contextData.view;
        if(combatView==null)
            return;
        
        var classView:any;
        var parent:eui.Group;
        var viewArr:Array<IBaseView>;
        var config:CardFormsConfig;
        var place:number = (cardGroup+1)%2!=0?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD;
        switch(cardGroup){
            case CombatConstants.CARD_GROUP_ATK_HAND:
                parent = combatView.groupAtkSCard;
                classView = CSCardItemView;
                viewArr= self.arrAtkHandCardView;
                config = CombatConfig.getInstance().getSendCardConfigByPlace(place);
            break;
            case CombatConstants.CARD_GROUP_DFD_HAND:
                parent = combatView.groupDfdSCard;
                classView = CSCardItemView;
                viewArr= self.arrDfdHandCardView;
                config = CombatConfig.getInstance().getSendCardConfigByPlace(place);
            break;
            case CombatConstants.CARD_GROUP_ATK_OUT:
                parent = combatView.groupAtkRCard;
                classView = CRCardItemView;
                viewArr= self.arrAtkOutCardView;
                config = CombatConfig.getInstance().getOutCardConfigByPlace(place);
            break;
            case CombatConstants.CARD_GROUP_DFD_OUT:
                parent = combatView.groupDfdRCard;
                classView = CRCardItemView;
                viewArr= self.arrDfdOutCardView;
                config = CombatConfig.getInstance().getOutCardConfigByPlace(place);
            break;
            case CombatConstants.CARD_GROUP_ATK_DEATH:
                parent = combatView.groupAtkDList;
                classView = CSCardItemView;
                viewArr= self.arrAtkDeathCardView;
                config = CombatConfig.getInstance().getDeathCardConfigByPlace(place);
            break;
            case CombatConstants.CARD_GROUP_DFD_DEATH:
                parent = combatView.groupDfdDList;
                classView = CSCardItemView;
                viewArr= self.arrDfdDeathCardView;
                config = CombatConfig.getInstance().getDeathCardConfigByPlace(place);
            break;
        }

        for(var i:number=0,lengthI:number = arr.length;i<lengthI;i++){
            var item:any = arr[i];
            if(item==null)
                continue;
            var view:IBaseView = CombatUtils.create<IBaseView>(classView);
            var optCardData = item;
            if(optCardData!=null){
                var arrKey:Array<any> = Object.keys(optCardData);
                if(arrKey.length>0)
                    optCardData = CombatUtils.changeCardGroupName(cardGroup,optCardData);
            }
            
            view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
            parent.addChild(view);
            viewArr.push(view);

            if(cardGroup==CombatConstants.CARD_GROUP_ATK_DEATH||cardGroup==CombatConstants.CARD_GROUP_DFD_DEATH){
                var viewA:CSCardItemView = view as CSCardItemView;
                viewA.changeCardViewColor(true);
            }

        }

        
        if(cardGroup==CombatConstants.CARD_GROUP_ATK_HAND||cardGroup==CombatConstants.CARD_GROUP_DFD_HAND){
            self.sortHandCard(place);
        }else if(cardGroup==CombatConstants.CARD_GROUP_ATK_OUT||cardGroup==CombatConstants.CARD_GROUP_DFD_OUT){
            self.sortOutCard(place);
        }else if(cardGroup==CombatConstants.CARD_GROUP_ATK_HAND||cardGroup==CombatConstants.CARD_GROUP_DFD_HAND){
            self.sortDeathCard(place);
        }
    }

    //整理手牌(位置)
    private sortHandCard(place:number=-1):void{
        var self = this;
        var sc:SendCardConfig;
        if(place==-1||place==CombatConstants.PLACE_ATK){
            sc = CombatConfig.getInstance().getSendCardConfigByPlace(CombatConstants.PLACE_ATK);
            CombatUtils.sortCardPos(self.arrAtkHandCardView,sc.space,new egret.Point(sc.gapX,sc.gapY));
        }
        if(place==-1||place==CombatConstants.PLACE_DFD){
            sc = CombatConfig.getInstance().getSendCardConfigByPlace(CombatConstants.PLACE_DFD);
            CombatUtils.sortCardPos(self.arrDfdHandCardView,sc.space,new egret.Point(sc.gapX,sc.gapY));
        }
    }

    //整理出牌(位置)
    private sortOutCard(place:number=-1):void{
        var self = this;
        var sc:SendCardConfig;
        if(place==-1||place==CombatConstants.PLACE_ATK){
            sc = CombatConfig.getInstance().getOutCardConfigByPlace(CombatConstants.PLACE_ATK);
            CombatUtils.sortCardPos(self.arrAtkOutCardView,sc.space,new egret.Point(sc.gapX,sc.gapY));
        }
        if(place==-1||place==CombatConstants.PLACE_DFD){
            sc = CombatConfig.getInstance().getOutCardConfigByPlace(CombatConstants.PLACE_DFD);
            CombatUtils.sortCardPos(self.arrDfdOutCardView,sc.space,new egret.Point(sc.gapX,sc.gapY));
        }
    }

    //整理死亡牌(位置)
    private sortDeathCard(place:number=-1):void{
        var self = this;
        var sc:SendCardConfig;
        if(place==-1||place==CombatConstants.PLACE_ATK){
            sc = CombatConfig.getInstance().getDeathCardConfigByPlace(CombatConstants.PLACE_ATK);
            CombatUtils.sortCardPos(self.arrAtkDeathCardView,sc.space,new egret.Point(sc.gapX,sc.gapY));
        }
        if(place==-1||place==CombatConstants.PLACE_DFD){
            sc = CombatConfig.getInstance().getDeathCardConfigByPlace(CombatConstants.PLACE_DFD);
            CombatUtils.sortCardPos(self.arrDfdDeathCardView,sc.space,new egret.Point(sc.gapX,sc.gapY));
        }
    }

    //添加战斗操作标记
    private addCombatOptNote(code:string,combatNode:CombatNode):boolean{
        var self = this;
        var hadOpt:boolean = false;
        var combatOptNote:CombatOptNote = self.getCombatOptNote(code);
        if(combatOptNote==null){    //如果是新的操作 则加入操作标记容器
            combatOptNote = new CombatOptNote();
            combatOptNote.code = code;
            combatOptNote.arrCombatNode = new Array<CombatNode>();
            combatOptNote.curCombatNode = combatNode;
            self.arrCombatOptNote.push(combatOptNote);

            hadOpt=false;
        }else{//否则加入操作标记池中
            hadOpt = combatOptNote.curCombatNode!=combatNode;
            //检测如果是同操作类型的则直接播放
            if(combatOptNote.curCombatNode.optType==combatNode.optType)
                hadOpt = false;
            else   
                combatOptNote.arrCombatNode.push(combatNode);
        }
        return hadOpt;
    }

    //移除战斗操作标记
    private removeCombatOptNote(code:string,combatNode:CombatNode){
        var self = this;
        var combatOptNote:CombatOptNote = self.getCombatOptNote(code);
        if(combatOptNote==null)
            return;
        if(combatOptNote.curCombatNode==combatNode){    //如果已经是最新的
            if(combatOptNote.arrCombatNode.length<=0){
                for(var i:number=0,lengthI:number=self.arrCombatOptNote.length;i<lengthI;i++){
                    var item:CombatOptNote = self.arrCombatOptNote[i];
                    if(item==null)
                        continue;
                    if(item.code==code){
                        self.arrCombatOptNote.splice(i,1);
                        break;
                    }
                }
            }else{
                var curCombatNode:CombatNode = combatOptNote.arrCombatNode.shift();
                combatOptNote.curCombatNode = curCombatNode;
                self.parse(curCombatNode);

                var removeIndexArr:Array<number> = new Array<number>();
                //如果是同类型的则直接一起播放
                var optType:number = curCombatNode.optType;
                for(var i:number=0,lengthI:number=combatOptNote.arrCombatNode.length;i<lengthI;i++){
                    var itemCombatNode:CombatNode = combatOptNote.arrCombatNode[i];
                    if(itemCombatNode==null||itemCombatNode.optType!=optType)
                        break;
                    removeIndexArr.push(i);
                    self.parse(itemCombatNode);
                }

                for(var i:number=removeIndexArr.length-1;i>=0;i--){
                    combatOptNote.arrCombatNode.splice(removeIndexArr[i],1);
                }
                
            }
        }else{
            for(var i:number=0,lengthI:number=combatOptNote.arrCombatNode.length;i<lengthI;i++){
                var cn:CombatNode = combatOptNote.arrCombatNode[i];
                if(cn==null)
                    continue;
                if(cn.optType==combatNode.optType){
                    combatOptNote.arrCombatNode.splice(i,1);
                    break;
                }
            }
        }
    }

    //返回战斗操作标记
    private getCombatOptNote(code:string):CombatOptNote{
        var self = this;
        var combatOptNote:CombatOptNote = null;
        for(var i:number=0,lengthI:number=self.arrCombatOptNote.length;i<lengthI;i++){
            var item:CombatOptNote = self.arrCombatOptNote[i];
            if(item==null)
                continue;
            if(item.code==code){
                combatOptNote = item;
                break;
            }
        }
        return combatOptNote;
    }


    //解析战斗节点
    public parse(node:CombatNode):void{
        if(node==null)
            return;
        var self = this;
        var optType:number = node.optType;
        switch(optType){
            case CombatConstants.OPT_TYPE_NO_ACTION:
            break;
            case CombatConstants.OPT_TYPE_SEND_CARD:
                self.onSendCard(node);
            break;
            case CombatConstants.OPT_TYPE_REDUCE_ROUND:
                self.onReduceRound(node);
            break;
            case CombatConstants.OPT_TYPE_OUT_CARD:
                self.onOutCard(node);
            break;
            case CombatConstants.OPT_TYPE_ATK_NOR:
                self.onCardGeneralAttack(node);
            break;
            case CombatConstants.OPT_TYPE_ATK_SKILL:
                self.onCardSkillAttack(node);
            break;
            case CombatConstants.OPT_TYPE_DEATH:
                self.onCardDeath(node);
            break;
            case CombatConstants.OPT_TYPE_REVIVE:
                self.onCardRevive(node);
            break;
            case CombatConstants.OPT_TYPE_PERSUADE_BACK:
                self.onCardPersuadeBack(node);
            break;
            case CombatConstants.OPT_TYPE_ROUND_RECOVER:
                self.onRoundRecover(node);
            break;
            case CombatConstants.OPT_TYPE_ROUND_LOST:
                self.onRoundLost(node);
            break;
            case CombatConstants.OPT_TYPE_MODIFY_ATTRIBUTE:
                self.onModifyAttribute(node);
            break;
            case CombatConstants.OPT_TYPE_OUT_CARD_BACK:
                self.onOutCardBack(node);
            break;
            case CombatConstants.OPT_TYPE_SORT_HAND_CARD:
                self.onSortHandCard(node);
            break;
            case CombatConstants.OPT_TYPE_SORT_OUT_CARD:
                self.onSortOutCard(node);
            break;
            case CombatConstants.OPT_TYPE_SORT_DEATH_CARD:
                self.onSortDeathCard(node);
            break;
            case CombatConstants.OPT_TYPE_SEL_CARD:
                self.onSelCard(node);
            break;
            case CombatConstants.OPT_TYPE_FORCE_DESEL_CARD:
                self.onForceDeselCard(node);
            break;
            case CombatConstants.OPT_TYPE_SET_NON_CLICKABLE:
                self.onSetNonClickable(node);
            break;
            case CombatConstants.OPT_TYPE_ATK_SKILL_CONT:
                self.onCardSkillContinue(node);
            break;
            case CombatConstants.OPT_TYPE_ATK_SKILL_DECONT:
                self.onCardSkillDeContinue(node);
            break;
            case CombatConstants.OPT_TYPE_BUFF_ADD:
                self.onAddBuff(node);
            break;
            case CombatConstants.OPT_TYPE_BUFF_REMOVE:
                self.onRemoveBuff(node);
            break;
            case CombatConstants.OPT_TYPE_BUFF_UPDATE:
                self.onUpdateBuff(node);
            break;
            case CombatConstants.OPT_TYPE_FETTER_ADD:
                self.onAddFetter(node);
            break;
            case CombatConstants.OPT_TYPE_FETTER_REMOVE:
                self.onRemoveFetter(node);
            break;
        }
    }   
    
    //发牌*发到手牌
    private onSendCard(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null)
            return;

        
        var optCardData:Object = node.optCardData;
        if(optCardData==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var isAtkPlayer:boolean = CombatConstants.PLACE_ATK==node.senderPlace;
        //改变卡牌层级名称 其实是添加groupName用于点击事件
        if(isAtkPlayer){
            optCardData = CombatUtils.changeCardGroupName(CombatConstants.CARD_GROUP_ATK_HAND,optCardData);
        }

        var place:number = isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD;
        var config:SendCardConfig = CombatConfig.getInstance().getSendCardConfigByPlace(place);

        var view:CSCardItemView = new CSCardItemView();
        view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
        var parent:eui.Group = isAtkPlayer?combatView.groupAtkSendCard:combatView.groupDfdSendCard;
        parent.addChild(view);

        var arr:Array<CSCardItemView> = isAtkPlayer?self.arrAtkHandCardView:self.arrDfdHandCardView;
        arr.push(view);

        var toGroup:eui.Group = isAtkPlayer?combatView.groupAtkSCard:combatView.groupDfdSCard;
        var toX:number = (arr.length-1)*(view.width+config.space) + view.anchorOffsetX;
        var toY:number = 0 + view.anchorOffsetY;
        var absX:number = parent.x-toGroup.x-toGroup.parent.x;
        var absY:number = parent.y-toGroup.y-toGroup.parent.y;
        egret.Tween.removeTweens(view);
        egret.Tween.get(view).to({x:toX+config.gapX-absX,y:toY+config.gapY-absY},CombatUtils.getAMSpeed(config.act_attr.speed)).call(function():void{
            toGroup.addChild(view);
            if(node.callBack)
                node.callBack.run();
        },self);
    }

    //出牌*出到桌面
    private onOutCard(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var optCardData:any = node.optCardData;//isAtkPlayer?self.arrAtkHandCardView[fromCardIndex].getCardData():node.optCardData;
        if(optCardData==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var fromCardCode:string = optCardData.code;//node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;
        

        var isAtkPlayer:boolean = CombatConstants.PLACE_ATK==node.senderPlace;
        var arrSC:Array<CSCardItemView> = isAtkPlayer?self.arrAtkHandCardView:self.arrDfdHandCardView;
        var fromCardIndex:number = 0;
        if(isAtkPlayer)
            fromCardIndex = CombatUtils.getCardIndexByCardCode(fromCardCode,arrSC);

        var handCard:CSCardItemView = arrSC[fromCardIndex];
        if(handCard==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        //改变卡牌层级名称
        var cardGroup:number = isAtkPlayer?CombatConstants.CARD_GROUP_ATK_OUT:CombatConstants.CARD_GROUP_DFD_OUT;
        optCardData = CombatUtils.changeCardGroupName(cardGroup,optCardData);

        var place:number = isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD;
        var config:OutCardConfig = CombatConfig.getInstance().getOutCardConfigByPlace(place);

        var view:CRCardItemView = new CRCardItemView();
        view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
        var parent:eui.Group = isAtkPlayer?combatView.groupAtkSCard:combatView.groupDfdSCard;
        parent.addChild(view);
        view.x = handCard.x;
        view.y = handCard.y;
        
        var arr:Array<CRCardItemView> = isAtkPlayer?self.arrAtkOutCardView:self.arrDfdOutCardView;
        arr.push(view);

        if(node.removeCard){
            handCard.parent.removeChild(handCard);
            arrSC.splice(fromCardIndex,1);
        }

        var toGroup:eui.Group = isAtkPlayer?combatView.groupAtkRCard:combatView.groupDfdRCard;
        var toX:number = (arr.length-1)*(view.width+config.space)+view.anchorOffsetX;
        var toY:number = 0+view.anchorOffsetY;
        var absX:number = parent.parent.x+parent.x-toGroup.x;
        var absY:number = parent.parent.y+parent.y-toGroup.y;
        // egret.Tween.removeTweens(view);
        view.getFightExpForm().moveExpForm(toX+config.gapX-absX,toY+config.gapY-absY,CombatUtils.getAMSpeed(config.act_attr.speed),Handler.create(self,function(){
            var needAdd:boolean = !isAtkPlayer;
            if(!needAdd){
                var index:number = CombatUtils.getCardIndexByCardCode(optCardData.code,arr);
                needAdd = index!=-1;
            }//解决手速快会在已经删除掉卡牌的情况下又加到出牌层里面

            if(needAdd){
                toGroup.addChild(view);
                self.sortOutCard(place);
            }

            self.removeCombatOptNote(fromCardCode,node);
            if(node.callBack)
                node.callBack.run();
        }))
        // egret.Tween.get(view).to({x:toX+config.gapX-absX,y:toY+config.gapY-absY},CombatUtils.getAMSpeed(config.act_attr.speed)).call(function():void{
        //     var needAdd:boolean = !isAtkPlayer;
        //     if(!needAdd){
        //         var index:number = CombatUtils.getCardIndexByCardCode(optCardData.code,arr);
        //         needAdd = index!=-1;
        //     }//解决手速快会在已经删除掉卡牌的情况下又加到出牌层里面

        //     if(needAdd){
        //         toGroup.addChild(view);
        //         self.sortOutCard(place);
        //     }

        //     // self.removeCombatOptNote(fromCardCode,node);
        //     if(node.callBack)
        //         node.callBack.run();
        // },self);
    }

    //减少手牌回合
    private onReduceRound(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var senderPlace:number = node.senderPlace;
        var receiverPlace:number = node.receiverPlace;

        for(var i:number=0,lengthI:number = self.arrAtkHandCardView.length;i<lengthI;i++){
            var item:CSCardItemView = self.arrAtkHandCardView[i];
            if(item==null)
                continue;
            item.reduceRound(senderPlace==receiverPlace);
        }

        if(node.callBack)
            node.callBack.run();
        
    }

    //当卡牌死亡
    private onCardDeath(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var isAtkPlayer:boolean = CombatConstants.PLACE_ATK==node.senderPlace;
        var fromCardCode:string = node.fromTarget;
        var arrRC:Array<CRCardItemView> = isAtkPlayer?self.arrAtkOutCardView:self.arrDfdOutCardView;
        var outCardIndex:number = CombatUtils.getCardIndexByCardCode(fromCardCode,arrRC);
        if(outCardIndex==-1){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var outCard:CRCardItemView = arrRC[outCardIndex];
        if(outCard==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
            
        
        var optCardData:Object = outCard.getCardData();
        var place:number = isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD;
        var config:DeathCardConfig = CombatConfig.getInstance().getDeathCardConfigByPlace(place);

        var view:CSCardItemView = new CSCardItemView();
        view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
        var parent:eui.Group = isAtkPlayer?combatView.groupAtkRCard:combatView.groupDfdRCard;
        parent.addChild(view);
        view.changeCardViewColor(true);
        view.x = outCard.x;
        view.y = outCard.y;

        var arr:Array<CSCardItemView> = isAtkPlayer?self.arrAtkDeathCardView:self.arrDfdDeathCardView;
        arr.push(view);

        if(node.removeCard){
            outCard.parent.removeChild(outCard);
            arrRC.splice(outCardIndex,1);
        }
        
        var oconfig:OutCardConfig = CombatConfig.getInstance().getOutCardConfigByPlace(place);
        var toGroup:eui.Group = isAtkPlayer?combatView.groupAtkDCard:combatView.groupDfdDCard;
        var toX:number = toGroup.width/2;
        var toY:number = toGroup.height/2;
        var absX:number = parent.x-toGroup.x;
        var absY:number = parent.y-toGroup.y;

        egret.Tween.removeTweens(view);
        egret.Tween.get(view).to({x:toX+config.gapX-absX,y:toY+config.gapY-absY},CombatUtils.getAMSpeed(oconfig.act_attr.speed)).call(function():void{
            var newParent:eui.Group = isAtkPlayer?combatView.groupAtkDList:combatView.groupDfdDList;
            newParent.addChild(view);
            if(node.callBack)
                node.callBack.run();
        },self);
    }

    //当卡牌复活
    private onCardRevive(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var fromCardCode:string = node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;

        var isAtkPlayer:boolean = true;
        //判断是否在攻击方出牌中
        var outCard0:CRCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrAtkOutCardView);
        if(outCard0==null){
            outCard0 = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrDfdOutCardView);
            isAtkPlayer = false;
        }

        if(outCard0==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var fnArr:FightNode[] = node.fightNodeArr;
        var count:number = fnArr.length+1;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                self.removeCombatOptNote(fromCardCode,node);
                if(node.callBack)
                    node.callBack.run();
            }
                
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        outCard0.getFightExpForm().playRCSkillExpFromByType(node.skillKey,CombatConstants.SKILL_RES_ATTR,isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD,null,countHandler);

        var arrSC:Array<CSCardItemView> = isAtkPlayer?self.arrAtkDeathCardView:self.arrDfdDeathCardView;
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var code:string = item.toTarget;
            var deathCardIndex:number = CombatUtils.getCardIndexByCardCode(code,arrSC);
            var deathCard:CSCardItemView = arrSC[deathCardIndex];
            if(deathCard==null)
                continue;
            
            var optCardData:Object = item.toTargetObj;
            //改变卡牌层级名称
            var cardGroup:number = isAtkPlayer?CombatConstants.CARD_GROUP_ATK_HAND:CombatConstants.CARD_GROUP_DFD_HAND;
            optCardData = isAtkPlayer?CombatUtils.changeCardGroupName(cardGroup,optCardData):{visible:false};
            // var optCardData:Object = isAtkPlayer?deathCard.getCardData():{visible:false};
            var place:number = isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD;

            var config:SendCardConfig = CombatConfig.getInstance().getSendCardConfigByPlace(place);
            var view:CSCardItemView = new CSCardItemView();
            view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
            var parent:eui.Group = isAtkPlayer?combatView.groupAtkDCard:combatView.groupDfdDCard;
            parent.addChild(view);
            view.x = parent.width/2;
            view.y = parent.height/2;

            if(node.removeCard){
                deathCard.parent.removeChild(deathCard);
                arrSC.splice(deathCardIndex,1);
            }

            var toGroup:eui.Group = isAtkPlayer?combatView.groupAtkSendCard:combatView.groupDfdSendCard;
            var toX:number = 0;
            var toY:number = 0;
            var absX:number = parent.x-toGroup.x;
            var absY:number = parent.y-toGroup.y;

            var toHand:boolean = false;

            var type:number = item.type;
            if(type==CombatConstants.FIGHT_TYPE_HAND_CARD){
                var arrHand:Array<CSCardItemView> = isAtkPlayer?self.arrAtkHandCardView:self.arrDfdHandCardView;
                toGroup = isAtkPlayer?combatView.groupAtkSCard:combatView.groupDfdSCard;
                toX = (arrHand.length)*(view.width+config.space)+view.anchorOffsetX;
                toY = 0+view.anchorOffsetY;
                absX = parent.x-toGroup.x-toGroup.parent.x;
                absY = parent.y-toGroup.y-toGroup.parent.y;
                toHand = true;
            }

            egret.Tween.removeTweens(view);
            egret.Tween.get(view).to({x:toX+config.gapX-absX,y:toY+config.gapY-absY},CombatUtils.getAMSpeed(config.act_attr.speed)).call(function(toHandParam,toGroupParam,arrHandParam,viewParam,countHandlerParam):void{
                if(toHandParam){
                    toGroupParam.addChild(viewParam);
                    arrHandParam.push(viewParam);
                    self.sortHandCard();
                }else{
                    viewParam.parent.removeChild(viewParam);
                }
                countHandlerParam.run();
            }.bind(self,toHand,toGroup,arrHand,view,countHandler),self);

        }

    }

    //劝退
    private onCardPersuadeBack(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var fromCardCode:string = node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;

        var isAtkPlayer:boolean = true;
        //判断是否在攻击方出牌中
        var outCard0:CRCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrAtkOutCardView);
        if(outCard0==null){
            outCard0 = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrDfdOutCardView);
            isAtkPlayer = false;
        }

        if(outCard0==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var fnArr:FightNode[] = node.fightNodeArr;
        var count:number = fnArr.length;
        if(node.skillKey!=null&&node.skillKey!="")
            count++;

        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                self.removeCombatOptNote(fromCardCode,node);
                if(node.callBack)
                    node.callBack.run();
            }
                
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);

        if(node.skillKey!=null&&node.skillKey!="")
            outCard0.getFightExpForm().playRCSkillExpFromByType(node.skillKey,CombatConstants.SKILL_RES_ATTR,isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD,null,countHandler);
        

        
        // var arrRC:Array<CRCardItemView> = isAtkPlayer?self.arrAtkOutCardView:self.arrDfdOutCardView;
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null){
                callbackFunc();
                continue;
            }

            var code:string = item.toTarget;
            var place:number = CombatConstants.PLACE_DFD;
            //判断是否在防御方出牌中
            var outCard1:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
            if(outCard1==null){
                outCard1 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                place = CombatConstants.PLACE_ATK;
            }
            if(outCard1==null){
                callbackFunc();
                continue;
            }

            var skillType:string = (item.recipient==null||item.recipient)?CombatConstants.SKILL_REC_ATTR:CombatConstants.SKILL_RES_ATTR;
            var moveHandler:Handler = Handler.create(self,function(outCardParam,itemParam,placeParam,codeParam){
                var isAtkPlayer0:boolean = placeParam==CombatConstants.PLACE_ATK;
                var optCardData:Object = itemParam.toTargetObj;
                //改变卡牌层级名称
                var cardGroup:number = isAtkPlayer0?CombatConstants.CARD_GROUP_ATK_HAND:CombatConstants.CARD_GROUP_DFD_HAND;
                optCardData = isAtkPlayer0?CombatUtils.changeCardGroupName(cardGroup,optCardData):{visible:false};

                var config:SendCardConfig = CombatConfig.getInstance().getSendCardConfigByPlace(place);
                var view:CSCardItemView = new CSCardItemView();
                view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
                var parent:eui.Group = isAtkPlayer0?combatView.groupAtkRCard:combatView.groupDfdRCard;
                parent.addChild(view);
                // view.x = parent.width/2;
                // view.y = parent.height/2;
                view.x = outCardParam.x;
                view.y = outCardParam.y;

                if(node.removeCard){
                    outCardParam.parent.removeChild(outCardParam);
                    var arrRC:Array<CRCardItemView> = isAtkPlayer0?self.arrAtkOutCardView:self.arrDfdOutCardView;
                    var outCardIndex:number = CombatUtils.getCardIndexByCardCode(codeParam,arrRC);
                    arrRC.splice(outCardIndex,1);
                }
                var toGroup:eui.Group = isAtkPlayer0?combatView.groupAtkSendCard:combatView.groupDfdSendCard;
                var toX:number = 0;
                var toY:number = 0;
                var absX:number = parent.x-toGroup.x;
                var absY:number = parent.y-toGroup.y;

                var toHand:boolean = false;

                var type:number = itemParam.type;
                if(type==CombatConstants.FIGHT_TYPE_HAND_CARD){
                    var arrHand:Array<CSCardItemView> = isAtkPlayer0?self.arrAtkHandCardView:self.arrDfdHandCardView;
                    toGroup = isAtkPlayer0?combatView.groupAtkSCard:combatView.groupDfdSCard;
                    toX = (arrHand.length)*(view.width+config.space)+view.anchorOffsetX;
                    toY = 0+view.anchorOffsetY;
                    absX = parent.x-toGroup.x-toGroup.parent.x;
                    absY = parent.y-toGroup.y-toGroup.parent.y;
                    toHand = true;
                }

                egret.Tween.removeTweens(view);
                egret.Tween.get(view).to({x:toX+config.gapX-absX,y:toY+config.gapY-absY},CombatUtils.getAMSpeed(config.act_attr.speed)).call(function(toHandParam,toGroupParam,arrHandParam,viewParam,countHandlerParam):void{
                    if(toHandParam){
                        toGroupParam.addChild(viewParam);
                        arrHandParam.push(viewParam);
                        self.sortHandCard();
                    }else{
                        viewParam.parent.removeChild(viewParam);
                    }
                    countHandlerParam.run();
                }.bind(self,toHand,toGroup,arrHand,view,countHandler),self);

            },[outCard1,item,place,code]);


            var callbackHandler:Handler = Handler.create(self,function(outCardParam,moveHandlerParam){
                moveHandlerParam.run();
            },[outCard1,moveHandler]);

            if(node.skillKey!=null&&node.skillKey!="")
                outCard1.getFightExpForm().playRCSkillExpFromByType(node.skillKey,skillType,place,item,callbackHandler);
            else
                callbackHandler.run();
            
            
        }
    }

    //返回出的牌*桌面的牌返回到手牌
    private onOutCardBack(node:CombatNode):void{
        var self = this;
        var combatView:CombatView = self.contextData.view;
        if(combatView==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var fromCardCode:string = node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;

        var arrSC:Array<CSCardItemView> = self.arrAtkHandCardView;

        var handCard:CSCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,arrSC);
        if(handCard==null)
            return;
        
        var hcData:any = handCard.getCardData();
        var code:string = hcData.code;
        var outCardIndex:number = CombatUtils.getCardIndexByCardCode(code,self.arrAtkOutCardView);

        var arrRC:Array<CRCardItemView> = self.arrAtkOutCardView;
        var outCard:CRCardItemView = arrRC[outCardIndex];
        if(outCard==null)
            return;
        
        var optCardData:Object = arrRC[outCardIndex].getCardData();
        var place:number = CombatConstants.PLACE_ATK;
        var config:SendCardConfig = CombatConfig.getInstance().getSendCardConfigByPlace(place);

        var view:CSCardItemView = new CSCardItemView();
        view.initData({cdata:optCardData,cscaleX:config.scaleX,cscaleY:config.scaleY});
        var parent:eui.Group = combatView.groupAtkRCard;
        parent.addChild(view);
        view.x = outCard.x;
        view.y = outCard.y;
        
        if(node.removeCard){
            outCard.parent.removeChild(outCard);
            arrRC.splice(outCardIndex,1);
        }
        
        var arr:Array<CSCardItemView> = self.arrAtkHandCardView;
        var handCardView:CSCardItemView = CombatUtils.getCardViewByCardCode(code,arr);
        if(handCardView==null)
            return;

        var oconfig:OutCardConfig = CombatConfig.getInstance().getOutCardConfigByPlace(place);
        
        var toGroup:eui.Group = combatView.groupAtkSCard;
        var toX:number = handCardView.x;
        var toY:number = handCardView.y;
        var absX:number = parent.x-toGroup.x-toGroup.parent.x;
        var absY:number = parent.y-toGroup.y-toGroup.parent.y;
        egret.Tween.removeTweens(view);
        egret.Tween.get(view).to({x:toX+config.gapX-absX,y:toY+config.gapY-absY},CombatUtils.getAMSpeed(oconfig.act_attr.speed)).call(function():void{
            view.parent.removeChild(view);
            self.removeCombatOptNote(fromCardCode,node);
            if(node.callBack)
                node.callBack.run();
        },self);
    }

    //当整理手牌
    private onSortHandCard(node:CombatNode):void{
        var self = this;
        var place:number = node.senderPlace;
        self.sortHandCard(place);
    }

    //当整理手牌
    private onSortOutCard(node:CombatNode):void{
        var self = this;
        var place:number = node.senderPlace;
        self.sortOutCard(place);
    }

    //当整理手牌
    private onSortDeathCard(node:CombatNode):void{
        var self = this;
        var place:number = node.senderPlace;
        self.sortDeathCard(place);
    }

    //当选择牌处理
    private onSelCard(node:CombatNode):void{
        var self = this;

        var fromCardCode:string = node.fromTarget;

        var arrSC:Array<CSCardItemView> = self.arrAtkHandCardView;
        var view:CSCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,arrSC);
        if(view==null)
            return;

        var state:number = view.getCardState();
        switch(state){
            case CombatConstants.CARD_STATE_NOR:
            case CombatConstants.CARD_STATE_NON_CLICKABLE:
                if(node.callBack)
                    node.callBack.run();
            break;
            case CombatConstants.CARD_STATE_CLICKABLE:  //当可点击状态的时候则出牌
                var combatNode:CombatNode = new CombatNode();
                combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD;
                combatNode.senderPlace = node.senderPlace;
                combatNode.fromTarget = fromCardCode;
                combatNode.optCardData = view.getCardData();
                combatNode.removeCard = false;
                combatNode.callBack = Handler.create(self,function(){
                    if(view.getCardState()!=CombatConstants.CARD_STATE_NON_CLICKABLE)
                        view.setCardState(CombatConstants.CARD_STATE_CLICKED);
                    if(node.callBack)
                        node.callBack.run();
                }.bind(self));
                self.parse(combatNode);
                view.setCardState(CombatConstants.CARD_STATE_CLICKED);
                view.changeCardViewColor(true);
            break;
            case CombatConstants.CARD_STATE_CLICKED:    //当已经是点击状态的时候则返回出的牌
                var combatNode:CombatNode = new CombatNode();
                combatNode.optType = CombatConstants.OPT_TYPE_OUT_CARD_BACK;
                combatNode.senderPlace = node.senderPlace;
                combatNode.fromTarget = fromCardCode;
                combatNode.removeCard = true;
                combatNode.callBack = Handler.create(self,function(){
                    if(view.getCardState()!=CombatConstants.CARD_STATE_NON_CLICKABLE)
                        view.setCardState(CombatConstants.CARD_STATE_CLICKABLE);
                    if(node.callBack)
                        node.callBack.run();
                }.bind(self));
                self.parse(combatNode);
                view.setCardState(CombatConstants.CARD_STATE_CLICKABLE);
                view.changeCardViewColor(false);
            break;
        }

    }

    //当强制取消选择出的牌处理
    private onForceDeselCard(node:CombatNode):void{
        var self = this;
        var arrRC:Array<CRCardItemView> = self.arrAtkOutCardView;

        for(var i:number=0,lengthI:number = self.arrAtkHandCardView.length;i<lengthI;i++){
            var item:CSCardItemView = self.arrAtkHandCardView[i];
            if(item==null)
                continue;
            
            // var state:number = item.getCardState();
            // if(state==CombatConstants.CARD_STATE_CLICKED){//当已经是点击状态的时候则删除已经出的牌
                
            // }
            if(item.getCardState()!=CombatConstants.CARD_STATE_NON_CLICKABLE)
                item.setCardState(CombatConstants.CARD_STATE_CLICKABLE);

            item.changeCardViewColor(false);
            
            var hcData:any = item.getCardData();
            var code:string = hcData.code;
            var outCardIndex:number = CombatUtils.getCardIndexByCardCode(code,arrRC);

            if(outCardIndex!=-1){
                var outCard:CRCardItemView = arrRC[outCardIndex];
                outCard.parent.removeChild(outCard);
                arrRC.splice(outCardIndex,1);
            }
        }
        
        if(node.callBack)
            node.callBack.run();
    }

    //设置不可点状态
    private onSetNonClickable(node:CombatNode):void{
        var self = this;
        // for(var i:number=0,lengthI:number = self.arrAtkHandCardView.length;i<lengthI;i++){
        //     var item:CSCardItemView = self.arrAtkHandCardView[i];
        //     if(item==null)
        //         continue;
            
        //     item.setNonClickable();
        // }
        self.setHandCardTouchState(false);
    }

    //卡牌普通攻击
    private onCardGeneralAttack(node:CombatNode):void{
        var self = this;

        var fromCardCode:string = node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;

        var isAtkPlayer:boolean = true;
        //判断是否在攻击方出牌中
        var outCard0:CRCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrAtkOutCardView);
        if(outCard0==null){
            outCard0 = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrDfdOutCardView);
            isAtkPlayer = false;
        }

        if(outCard0==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var fnArr:FightNode[] = node.fightNodeArr;
        var count:number = fnArr.length+1;

        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                self.removeCombatOptNote(fromCardCode,node)
                if(node.callBack)
                    node.callBack.run();
            }
                
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        outCard0.getFightExpForm().playRCCommonExpFromByType(CombatConstants.EXP_FORM_ATK,isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD,null,countHandler);

        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null){
                callbackFunc();
                continue;
            }
            
            var damage:number = item.damage;
            //受击类型
            var expType:string = CombatConstants.EXP_FORM_HIT;
            if(item.hited){
                if(damage>0)   //伤害大于0则为恢复效果
                    expType = CombatConstants.EXP_FORM_RECOVER;
            }else{//闪避类型
                expType = CombatConstants.EXP_FORM_EVASIVE;
            }

            
            if(item.type==CombatConstants.FIGHT_TYPE_USER){
                var ticket:string = item.toTarget;
                var atkHeadHandler:Handler = Handler.create(self,function(damageParam,ticketParam){
                    countHandler.run();
                    if(self.atkHeadView.getTicket()==ticketParam)
                        self.atkHeadView.setDamage(damageParam);
                    else
                        self.dfdHeadView.setDamage(damageParam);
                },[damage,ticket]);
                if(self.atkHeadView.getTicket()==ticket)
                    self.atkHeadView.getFightExpForm().playHeadCommonExpFromByType(expType,CombatConstants.PLACE_ATK,item,atkHeadHandler);
                else
                    self.dfdHeadView.getFightExpForm().playHeadCommonExpFromByType(expType,CombatConstants.PLACE_DFD,item,atkHeadHandler);
            }else{
                var code:string = item.toTarget;
                var place:number = CombatConstants.PLACE_DFD;
                //判断是否在防御方出牌中
                var outCard1:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard1==null){
                    outCard1 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                    place = CombatConstants.PLACE_ATK;
                }

                if(outCard1==null){
                    callbackFunc();
                    continue;
                }

                var atkCardHandler:Handler = Handler.create(self,function(damageParam,codeParam,placeParam,diedParam,outCardParam){
                    countHandler.run();
                    outCardParam.setDamage(damageParam);
                    if(diedParam){
                        //牌死亡
                        var combatNode:CombatNode = new CombatNode();
                        combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
                        combatNode.senderPlace = placeParam;
                        combatNode.fromTarget = codeParam;
                        combatNode.removeCard = true;
                        self.parse(combatNode);
                    }
                },[damage,code,place,item.died,outCard1]);

                outCard1.getFightExpForm().playRCCommonExpFromByType(expType,place,item,atkCardHandler);
            }
        }
    }

    //卡牌技能攻击
    private onCardSkillAttack(node:CombatNode):void{
        var self = this;

        var fromCardCode:string = node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;

        var isAtkPlayer:boolean = true;
        //判断是否在攻击方出牌中
        var outCard0:CRCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrAtkOutCardView);
        if(outCard0==null){
            outCard0 = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrDfdOutCardView);
            isAtkPlayer = false;
        }
        
        if(outCard0==null){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var fnArr:FightNode[] = node.fightNodeArr;
        var count:number = fnArr.length+1;

        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                self.removeCombatOptNote(fromCardCode,node);
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        outCard0.getFightExpForm().playRCSkillExpFromByType(node.skillKey,CombatConstants.SKILL_RES_ATTR,isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD,null,countHandler);

        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var skillType:string = (item.recipient==null||item.recipient)?CombatConstants.SKILL_REC_ATTR:CombatConstants.SKILL_RES_ATTR;
            var damage:number = item.damage;
            if(item.type==CombatConstants.FIGHT_TYPE_USER){

                var ticket:string = item.toTarget;
                var atkHeadHandler:Handler = Handler.create(self,function(damageParam,ticketParam){
                    countHandler.run();
                    if(self.atkHeadView.getTicket()==ticketParam)
                        self.atkHeadView.setDamage(damageParam);
                    else
                        self.dfdHeadView.setDamage(damageParam);
                },[damage,ticket]);

                if(self.atkHeadView.getTicket()==ticket)
                    self.atkHeadView.getFightExpForm().playHeadSkillExpFromByType(node.skillKey,skillType,CombatConstants.PLACE_ATK,item,atkHeadHandler);
                else
                    self.dfdHeadView.getFightExpForm().playHeadSkillExpFromByType(node.skillKey,skillType,CombatConstants.PLACE_DFD,item,atkHeadHandler);
            }else{
                var code:string = item.toTarget;
                var place:number = CombatConstants.PLACE_DFD;
                //判断是否在防御方出牌中
                var outCard1:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard1==null){
                    outCard1 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                    place = CombatConstants.PLACE_ATK;
                }

                if(outCard1==null){
                    callbackFunc();
                    continue;
                }

                var atkCardHandler:Handler = Handler.create(self,function(damageParam,codeParam,placeParam,diedParam,outCardParam){
                    countHandler.run();
                    outCardParam.setDamage(damageParam);
                    if(diedParam){
                        //牌死亡
                        var combatNode:CombatNode = new CombatNode();
                        combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
                        combatNode.senderPlace = placeParam;
                        combatNode.fromTarget = codeParam;
                        combatNode.removeCard = true;
                        self.parse(combatNode);
                    }
                },[damage,code,place,item.died,outCard1]);

                
                outCard1.getFightExpForm().playRCSkillExpFromByType(node.skillKey,skillType,place,item,atkCardHandler);
            }
            
        }
    }

    //当回合回血
    private onRoundRecover(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        SoundManager.getInstance().PlaySound("huixuexiaoguo_mp3");

        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var damage:number = item.damage;
            //回血类型
            var expType:string = CombatConstants.EXP_FORM_RECOVER;
            
            if(item.type==CombatConstants.FIGHT_TYPE_USER){
                var ticket:string = item.toTarget;
                var recHeadHandler:Handler = Handler.create(self,function(damageParam,ticketParam){
                    countHandler.run();
                    if(self.atkHeadView.getTicket()==ticketParam)
                        self.atkHeadView.setDamage(damageParam);
                    else
                        self.dfdHeadView.setDamage(damageParam);
                },[damage,ticket]);
                if(self.atkHeadView.getTicket()==ticket)
                    self.atkHeadView.getFightExpForm().playHeadCommonExpFromByType(expType,CombatConstants.PLACE_ATK,item,recHeadHandler);
                else
                    self.dfdHeadView.getFightExpForm().playHeadCommonExpFromByType(expType,CombatConstants.PLACE_DFD,item,recHeadHandler);
            }else{
                var code:string = item.toTarget;
                var place:number = CombatConstants.PLACE_DFD;
                //判断是否在防御方出牌中
                var outCard1:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard1==null){
                    outCard1 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                    place = CombatConstants.PLACE_ATK;
                }

                if(outCard1==null){
                    callbackFunc();
                    continue;
                }
                
                var recCardHandler:Handler = Handler.create(self,function(damageParam,codeParam,outCardParam){
                    countHandler.run();
                    outCardParam.setDamage(damageParam);
                },[damage,code,outCard1]);

                outCard1.getFightExpForm().playRCCommonExpFromByType(expType,place,item,recCardHandler);
            }
        }
    }

    //当回合扣血
    private onRoundLost(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        SoundManager.getInstance().PlaySound("huixuexiaoguo_mp3");
        
        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var damage:number = item.damage;
            //扣血类型
             var expType:string = CombatConstants.EXP_FORM_LOST;

            if(item.type==CombatConstants.FIGHT_TYPE_USER){
                var ticket:string = item.toTarget;
                var atkHeadHandler:Handler = Handler.create(self,function(damageParam,ticketParam){
                    countHandler.run();
                    if(self.atkHeadView.getTicket()==ticketParam)
                        self.atkHeadView.setDamage(damageParam);
                    else
                        self.dfdHeadView.setDamage(damageParam);
                },[damage,ticket]);
                if(self.atkHeadView.getTicket()==ticket)
                    self.atkHeadView.getFightExpForm().playHeadCommonExpFromByType(expType,CombatConstants.PLACE_ATK,item,atkHeadHandler);
                else
                    self.dfdHeadView.getFightExpForm().playHeadCommonExpFromByType(expType,CombatConstants.PLACE_DFD,item,atkHeadHandler);
            }else{
                var code:string = item.toTarget;
                var place:number = CombatConstants.PLACE_DFD;
                //判断是否在防御方出牌中
                var outCard1:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard1==null){
                    outCard1 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                    place = CombatConstants.PLACE_ATK;
                }

                if(outCard1==null){
                    callbackFunc();
                    continue;
                }

                
                var recCardHandler:Handler = Handler.create(self,function(damageParam,codeParam,placeParam,diedParam,outCardParam){
                    countHandler.run();
                    outCardParam.setDamage(damageParam);
                    if(diedParam){
                        //牌死亡
                        var combatNode:CombatNode = new CombatNode();
                        combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
                        combatNode.senderPlace = placeParam;
                        combatNode.fromTarget = codeParam;
                        combatNode.removeCard = true;
                        self.parse(combatNode);
                    }
                },[damage,code,place,item.died,outCard1]);

                outCard1.getFightExpForm().playRCCommonExpFromByType(expType,place,item,recCardHandler);
            }
        }
    }

    //修改卡牌属性
    private onModifyAttribute(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var fromCardCode:string = node.fromTarget;
        if(self.addCombatOptNote(fromCardCode,node))
            return;

        var isAtkPlayer:boolean = true;
        //判断是否在攻击方出牌中
        var outCard:CRCardItemView = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrAtkOutCardView);
        if(outCard==null){
            outCard = CombatUtils.getCardViewByCardCode(fromCardCode,self.arrDfdOutCardView);
            isAtkPlayer = false;
        }
        
        var skillKey:string = node.skillKey;

        var count:number = fnArr.length;
        if(skillKey!=null&&skillKey!="")
            count++;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                self.removeCombatOptNote(fromCardCode,node);
                if(node.callBack)
                    node.callBack.run();
            }
                
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        if(skillKey!=null&&skillKey!="")
            outCard.getFightExpForm().playRCModifyAttributeExpFrom(skillKey,CombatConstants.SKILL_RES_ATTR,isAtkPlayer?CombatConstants.PLACE_ATK:CombatConstants.PLACE_DFD,null,countHandler);

         
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var code:string = item.toTarget;

            var place:number = CombatConstants.PLACE_DFD;
            //判断是否在攻击方出牌中
            var outCard0:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
            if(outCard0==null){
                outCard0 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                place = CombatConstants.PLACE_ATK;
            }

            if(outCard0==null)
                continue;

            var attributeData:any = item.toTargetObj;
            if(attributeData==null)
                continue;

            var damage:number = item.damage;
            var skillType:string = (item.recipient==null||item.recipient)?CombatConstants.SKILL_REC_ATTR:CombatConstants.SKILL_RES_ATTR;

            var modifyHandler:Handler = Handler.create(self,function(damageParam,codeParam,placeParam,diedParam,outCardParam,attributeDataParam){
                countHandler.run();

                if(attributeDataParam!=null){
                    var mlhp:number = attributeDataParam[CombatConstants.MODIFY_ATTRIBUTE_LIMIT_HP];
                    if(mlhp!=null){
                        outCardParam.modifyLimitHp(mlhp);
                    }
                    var atk:number = attributeDataParam[CombatConstants.MODIFY_ATTRIBUTE_ATK];
                    if(atk!=null){
                        outCardParam.modifyAtk(atk);
                    }
                }

                if(damageParam!=null)
                    outCardParam.setDamage(damageParam);
                
                if(diedParam){
                    //牌死亡
                    var combatNode:CombatNode = new CombatNode();
                    combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
                    combatNode.senderPlace = placeParam;
                    combatNode.fromTarget = codeParam;
                    combatNode.removeCard = true;
                    self.parse(combatNode);
                }
            },[damage,code,place,item.died,outCard0,attributeData]);
            
            outCard0.getFightExpForm().playRCModifyAttributeExpFrom(skillKey,skillType,place,item,modifyHandler);
            // outCard0.getFightExpForm().playRCModifyAttributeExpFrom(attributeData,modifyHandler);
        }
    }

    //持续卡牌技能
    private onCardSkillContinue(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        
        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var code:string = item.toTarget;
            var place:number = CombatConstants.PLACE_DFD;
            //判断是否在防御方出牌中
            var outCard:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
            if(outCard==null){
                outCard = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                place = CombatConstants.PLACE_ATK;
            }

            if(outCard==null){
                callbackFunc();
                continue;
            }

            outCard.getFightExpForm().addRCContinueSkill(node.skillKey,CombatConstants.SKILL_REC_ATTR,place,countHandler);
        }
    }

    //取消持续卡牌技能
    private onCardSkillDeContinue(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var code:string = item.toTarget;
            //判断是否在防御方出牌中
            var outCard:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
            if(outCard==null){
                outCard = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
            }

            if(outCard==null)
                continue;

            outCard.getFightExpForm().removeContinueSkill(node.skillKey);
        }

    }


    //当添加buff
    private onAddBuff(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }

        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);
        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            var code:string = item.toTarget;
            if(item.type==CombatConstants.FIGHT_TYPE_OUT_CARD){
                //判断是否在防御方出牌中
                var outCard:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard==null){
                    outCard = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                }
                if(outCard==null)
                    continue;
                
                var addHandler:Handler = Handler.create(self,function(){
                    countHandler.run();
                });

                outCard.getFightExpForm().addRCBuff(node.skillKey,item,addHandler);
            }
        }
    }

    //当移除buff
    private onRemoveBuff(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);
        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            var code:string = item.toTarget;
            if(item.type==CombatConstants.FIGHT_TYPE_OUT_CARD){

                //判断是否在防御方出牌中
                var place:number = CombatConstants.PLACE_DFD;
                var outCard:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard==null){
                    outCard = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                    place = CombatConstants.PLACE_ATK;
                }
                if(outCard==null)
                    continue;

                
                var removeHandler:Handler = Handler.create(self,function(codeParam,placeParam,diedParam){
                    countHandler.run();
                    if(diedParam){
                        //牌死亡
                        var combatNode:CombatNode = new CombatNode();
                        combatNode.optType = CombatConstants.OPT_TYPE_DEATH;
                        combatNode.senderPlace = placeParam;
                        combatNode.fromTarget = codeParam;
                        combatNode.removeCard = true;
                        self.parse(combatNode);
                    }
                },[code,place,item.died]);

                outCard.getFightExpForm().removeRCBuff(node.skillKey,removeHandler);

                
            }
        }
    }

    //当更新buff
    private onUpdateBuff(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }
        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                if(node.callBack)
                    node.callBack.run();
            }
        }.bind(self);
        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            var code:string = item.toTarget;
            if(item.type==CombatConstants.FIGHT_TYPE_OUT_CARD){

                //判断是否在防御方出牌中
                var place:number = CombatConstants.PLACE_DFD;
                var outCard:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
                if(outCard==null){
                    outCard = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                    place = CombatConstants.PLACE_ATK;
                }
                if(outCard==null)
                    continue;

                
                var updateHandler:Handler = Handler.create(self,function(codeParam,placeParam,diedParam){
                    countHandler.run();
                },[code,place,item.died]);

                outCard.getFightExpForm().updateRCBuff(node.skillKey,item,updateHandler);

                
            }
        }
    }


    //当添加羁绊
    private onAddFetter(node:CombatNode):void{
        var self = this;
        // var fnArr:FightNode[] = node.fightNodeArr;
        // if(fnArr.length<=0){
        //     if(node.callBack)
        //         node.callBack.run();
        //     return;
        // }

        // var isAtkPlayer:boolean = CombatConstants.PLACE_ATK==node.senderPlace;
        SoundManager.getInstance().PlaySound("jibanzucheng_mp3");
        
        var ticket:string = node.fromTarget;
        var isAtkPlayer:boolean = ticket==self.atkHeadView.getTicket();

        var fnArr:FightNode[] = node.fightNodeArr;
        var count:number = fnArr.length;
        var callbackFunc:Function = function(){
            count--;
            if(count==0){
                // self.removeCombatOptNote(fromCardCode,node);
                if(node.callBack)
                    node.callBack.run();
            }
                
        }.bind(self);

        var skillKey:string = node.skillKey;

        var countHandler:Handler = Handler.create(self, callbackFunc,null,false);
        var headHandler:Handler = Handler.create(self,function(){
            countHandler.run();
        });
        if(isAtkPlayer)
            self.atkHeadView.getFightExpForm().playHeadFetterExpFrom(skillKey,CombatConstants.SKILL_RES_ATTR,CombatConstants.PLACE_ATK,headHandler);
        else
            self.dfdHeadView.getFightExpForm().playHeadFetterExpFrom(skillKey,CombatConstants.SKILL_RES_ATTR,CombatConstants.PLACE_DFD,headHandler);
        
        
        for(var i:number=0,lengthI:number = fnArr.length;i<lengthI;i++){
            var item:FightNode = fnArr[i];
            if(item==null)
                continue;
            
            var code:string = item.toTarget;

            var place:number = CombatConstants.PLACE_DFD;
            //判断是否在攻击方出牌中
            var outCard0:CRCardItemView = CombatUtils.getCardViewByCardCode(code,self.arrDfdOutCardView);
            if(outCard0==null){
                outCard0 = CombatUtils.getCardViewByCardCode(code,self.arrAtkOutCardView);
                place = CombatConstants.PLACE_ATK;
            }

            if(outCard0==null)
                continue;

            var attributeData:any = item.toTargetObj;
            if(attributeData==null)
                continue;

            var damage:number = item.damage;
            var skillType:string = (item.recipient==null||item.recipient)?CombatConstants.SKILL_REC_ATTR:CombatConstants.SKILL_RES_ATTR;

            var modifyHandler:Handler = Handler.create(self,function(damageParam,outCardParam,attributeDataParam){
                countHandler.run();

                if(attributeDataParam!=null){
                    var mlhp:number = attributeDataParam[CombatConstants.MODIFY_ATTRIBUTE_LIMIT_HP];
                    if(mlhp!=null){
                        outCardParam.modifyLimitHp(mlhp);
                    }
                    var atk:number = attributeDataParam[CombatConstants.MODIFY_ATTRIBUTE_ATK];
                    if(atk!=null){
                        outCardParam.modifyAtk(atk);
                    }
                }

                if(damageParam!=null)
                    outCardParam.setDamage(damageParam);
                
            },[damage,outCard0,attributeData]);
            
            outCard0.getFightExpForm().playRCFetterExpFrom(skillKey,skillType,place,item,modifyHandler);
            // outCard0.getFightExpForm().playRCModifyAttributeExpFrom(attributeData,modifyHandler);
        }



    }


    //当移除羁绊
    private onRemoveFetter(node:CombatNode):void{
        var self = this;
        var fnArr:FightNode[] = node.fightNodeArr;
        if(fnArr.length<=0){
            if(node.callBack)
                node.callBack.run();
            return;
        }

    }



    //返回操作按钮攻击类型
    public getOptBtnAtkType(curRoundPlace:number):number{
        var self = this;
        //-1不改变当前状态 0攻击按钮不显示 结束按钮不可点状态 1攻击按钮不显示 结束按钮可点状态 2攻击按钮显示 结束按钮不显示状态
        var atkType:number = 0;
        if(curRoundPlace==CombatConstants.PLACE_ATK){   //当前回合为自身
            var clickedCount:number = 0;    //已经点击状态数量
            var clickableCount:number = 0;  //可点击状态数量
            // var nonclickableCount:number = 0;   //不可点击状态数量
            for(var i:number=0,lengthI:number = self.arrAtkHandCardView.length;i<lengthI;i++){
                var item:CSCardItemView = self.arrAtkHandCardView[i];
                if(item==null)
                    continue;
                
                var cardState:number = item.getCardState();
                if(cardState==CombatConstants.CARD_STATE_CLICKED){
                    clickedCount++;
                    break;
                }else if(cardState==CombatConstants.CARD_STATE_CLICKABLE){
                    clickableCount++;
                }
            }
            if(clickedCount!=0){    //有已经点击了的状态 则为有上牌 则显示攻击按钮状态
                atkType = 2;
            }else if(clickableCount!=0){
                atkType = 1;
            }
        }

        return atkType;
    }

    //返回当前选择的卡牌
    public getCurSelCardsCode():Array<String>{
        var self = this;
        var arr:Array<string> = new Array<string>();
        var arr0:Array<string> = new Array<string>();
        for(var i:number=0,lengthI:number = self.arrAtkHandCardView.length;i<lengthI;i++){
            var item:CSCardItemView = self.arrAtkHandCardView[i];
            if(item==null)
                continue;
            var state:number = item.getCardState();
            if(state==CombatConstants.CARD_STATE_CLICKED){
                var cardData:any = item.getCardData();
                arr0.push(cardData.code);
            }
        }
        if(arr0.length<2)
            return arr0;

        //需要根据出牌顺序排序一下
        for(var i:number=0,lengthI:number = self.arrAtkOutCardView.length;i<lengthI;i++){
            var item0:CRCardItemView = self.arrAtkOutCardView[i];
            if(item0==null)
                continue;
            var cardData:any = item0.getCardData();
            var code:string = cardData.code;
            for(var j:number=0,lengthJ = arr0.length;j<lengthJ;j++){
                var str:string = arr0[j];
                if(str!=null&&str==code){
                    arr.push(str);
                    arr0.splice(j,1);
                    break;
                }
            }
        }
        
        return arr;
    }
}