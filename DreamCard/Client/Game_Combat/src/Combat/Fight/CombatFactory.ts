// TypeScript file
class CombatFactory{

    //创建战斗节点
    public static createCombatNode(optType:number,data:any = null):CombatNode{
        let combatNode:CombatNode = new CombatNode();
        combatNode.optType = optType;
        combatNode.optRankId = CombatUtils.getRankId();
        switch(optType){
            case CombatConstants.OPT_TYPE_SEND_CARD:    //发牌
                var place:number = data.place;
                var card:any = data.card;
                combatNode.senderPlace = place;
                combatNode.optCardData = card;
            break;
            case CombatConstants.OPT_TYPE_REDUCE_ROUND: //减少回合
                var place:number = data.place;
                combatNode.receiverPlace = place;  //当前回合位置 用来判断是否可以改变卡牌状态为发光可点击状态
                combatNode.senderPlace = CombatConstants.PLACE_ATK;
            break;

            case CombatConstants.OPT_TYPE_OUT_CARD: //出牌
                var place:number = data.place;
                var card:any = data.card;
                combatNode.senderPlace = place;
                combatNode.optCardData = card;
                // combatNode.fromTarget = card.code;
                combatNode.removeCard = true;
            break;
            
            case CombatConstants.OPT_TYPE_SORT_HAND_CARD:   //整理手牌
            case CombatConstants.OPT_TYPE_SORT_OUT_CARD:   //整理出牌
            case CombatConstants.OPT_TYPE_SORT_DEATH_CARD:   //整理死亡牌
                var place:number = data.place;
                combatNode.senderPlace = place;
            break;

            case CombatConstants.OPT_TYPE_SEL_CARD:     //选中上牌
                var place:number = data.place;
                var code:string = data.code;
                combatNode.senderPlace = place;
                combatNode.fromTarget = code;
            break;
            case CombatConstants.OPT_TYPE_FORCE_DESEL_CARD: //强制取消选择上牌
            break;
            case CombatConstants.OPT_TYPE_SET_NON_CLICKABLE:   //设置成不可点击状态
            break;
            case CombatConstants.OPT_TYPE_ATK_NOR:  //普通攻击
                // var place:number =data.place;
                var fightData:any = data[CombatConstants.FIGHT_DATA];
                var fromTarget:string = fightData.fromTarget;
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var showDrift:boolean = fightData.showDrift;

                for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                    var item:FightNode = fightNodeArr[i];
                    if(item==null)
                        continue;
                    if(showDrift){
                        var showStr:string = CombatUtils.getSymbolStr(item.damage);
                        if(item.damage<=0){
                            if(item.damage==0&&showStr.length>0&&showStr.substr(0, 1)!="-")
                                showStr = "-"+showStr;
                            item.damageShow = showStr;
                        }
                        else
                            item.recoverShow = showStr;
                    }
                }

                // combatNode.senderPlace = place;
                combatNode.fromTarget = fromTarget;
                combatNode.fightNodeArr = fightNodeArr;
            break;
            case CombatConstants.OPT_TYPE_ATK_SKILL:  //技能攻击
                // var place:number =data.place;
                var fightData:any = data[CombatConstants.FIGHT_DATA];
                var fromTarget:string = fightData.fromTarget;
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var skillKey:string = fightData.skillKey;
                var showDrift:boolean = fightData.showDrift;
                if(showDrift){
                    for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                        var item:FightNode = fightNodeArr[i];
                        if(item==null)
                            continue;
                        var showStr:string = CombatUtils.getSymbolStr(item.damage);
                        if(item.damage<=0){
                            if(item.damage==0&&showStr.length>0&&showStr.substr(0, 1)!="-")
                                showStr = "-"+showStr;
                            item.damageShow = showStr;
                        }
                        else
                            item.recoverShow = showStr; 
                    }
                }

                combatNode.fromTarget = fromTarget;
                combatNode.fightNodeArr = fightNodeArr;
                combatNode.skillKey = skillKey;
            break;
            case CombatConstants.OPT_TYPE_REVIVE:
            case CombatConstants.OPT_TYPE_PERSUADE_BACK:
                var fightData:any = data[CombatConstants.FIGHT_DATA];
                var fromTarget:string = fightData.fromTarget;
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var skillKey:string = fightData.skillKey;
                var showDrift:boolean = fightData.showDrift;

                if(showDrift){
                    for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                        var item:FightNode = fightNodeArr[i];
                        if(item==null)
                            continue;
                        var showStr:string = CombatUtils.getSymbolStr(item.damage);
                        if(item.damage<0)
                            item.damageShow = showStr;
                        else{
                            if(item.damage==0&&showStr.length>0&&showStr.substr(0, 1)!="+")
                                showStr = "+"+showStr;
                            item.recoverShow = showStr;
                        }
                    }
                }
                
                combatNode.fromTarget = fromTarget;
                combatNode.fightNodeArr = fightNodeArr;
                combatNode.skillKey = skillKey;
                combatNode.removeCard = true;
            break;
            case CombatConstants.OPT_TYPE_ROUND_RECOVER:
                var fightData:any = data[CombatConstants.FIGHT_DATA];
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var showDrift:boolean = fightData.showDrift;
                if(showDrift){
                    for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                        var item:FightNode = fightNodeArr[i];
                        if(item==null)
                            continue;
                        
                        var showStr:string = CombatUtils.getSymbolStr(item.damage);
                        if(item.damage<0)
                            item.damageShow = showStr;
                        else{
                            if(item.damage==0&&showStr.length>0&&showStr.substr(0, 1)!="+")
                                showStr = "+"+showStr;
                            item.recoverShow = showStr;
                        }
                    }
                }

                combatNode.fightNodeArr = fightNodeArr;
            break;
            case CombatConstants.OPT_TYPE_ROUND_LOST:
                var fightData:any = data[CombatConstants.FIGHT_DATA];
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var showDrift:boolean = fightData.showDrift;
                if(showDrift){
                    for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                        var item:FightNode = fightNodeArr[i];
                        if(item==null)
                            continue;
                        
                        var showStr:string = CombatUtils.getSymbolStr(item.damage);
                        if(item.damage<=0){
                            if(item.damage==0&&showStr.length>0&&showStr.substr(0, 1)!="-")
                                showStr = "-"+showStr;
                            item.damageShow = showStr;
                        }
                        else
                            item.recoverShow = showStr;
                        
                    }
                }

                combatNode.fightNodeArr = fightNodeArr;
            break;
            case CombatConstants.OPT_TYPE_MODIFY_ATTRIBUTE:
                var fightData:any = data[CombatConstants.FIGHT_DATA];
                var fromTarget:string = fightData.fromTarget;
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var skillKey:string = fightData.skillKey;
                var showDrift:boolean = fightData.showDrift;

                if(showDrift){
                    for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                        var item:FightNode = fightNodeArr[i];
                        if(item==null)
                            continue;
                        var attributeData:Object = item.toTargetObj;
                        if(attributeData==null)
                            continue;
                        
                        var hpAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_HP;
                        var lHpAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_LIMIT_HP;
                        var atkAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_ATK;
                        var skillCdAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_SKILL_CD;

                        var showAtt:string = "";
                        var num:number = 0;

                        if(attributeData[hpAttStr]!=null){
                            num = attributeData[hpAttStr];
                            showAtt = hpAttStr;
                        }else if(attributeData[lHpAttStr]!=null){
                            num = attributeData[lHpAttStr];
                            showAtt = lHpAttStr;
                        }else if(attributeData[atkAttStr]!=null){
                            num = attributeData[atkAttStr];
                            showAtt = atkAttStr;
                        }else if(attributeData[skillCdAttStr]!=null){
                            num = attributeData[skillCdAttStr];
                            showAtt = skillCdAttStr;
                        }

                        if(showAtt!=""){
                            var showStr:string = CombatUtils.getSymbolAttributeStr(showAtt,num);
                            if(num<0)
                                item.reduceShow = showStr;
                            else
                                item.increaseShow = showStr;
                        }
                    }
                }

                combatNode.fromTarget = fromTarget;
                combatNode.fightNodeArr = fightNodeArr;
                combatNode.skillKey = skillKey;
            break;

            case CombatConstants.OPT_TYPE_FETTER_ADD:
                var fightData:any = data[CombatConstants.FETTER_DATA];
                // var senderPlace:number = fightData.senderPlace;
                var fromTarget:string = fightData.fromTarget;
                var fightNodeArr:Array<FightNode> = fightData.fightNodeArr;
                var skillKey:string = fightData.skillKey;
                var showDrift:boolean = fightData.showDrift;

                if(showDrift){
                    for(var i:number=0,lengthI:number = fightNodeArr.length;i<lengthI;i++){
                        var item:FightNode = fightNodeArr[i];
                        if(item==null)
                            continue;
                        var attributeData:Object = item.toTargetObj;
                        if(attributeData==null)
                            continue;
                        
                        var hpAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_HP;
                        var lHpAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_LIMIT_HP;
                        var atkAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_ATK;
                        var skillCdAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_SKILL_CD;
                        var rdAttStr:string = CombatConstants.MODIFY_ATTRIBUTE_REDUCE_DAMAGE;

                        var showRStr:string = "";
                        var showIStr:string = "";

                        if(attributeData[hpAttStr]!=null){
                            // num = attributeData[hpAttStr];
                            var num:number = attributeData[hpAttStr];
                            var str0:string = CombatUtils.getSymbolAttributeStr(hpAttStr,num);
                            if(num<0)
                                showRStr += str0;
                            else
                                showIStr += str0;
                        }
                        if(attributeData[lHpAttStr]!=null){
                            // num = attributeData[lHpAttStr];
                            var num:number = attributeData[lHpAttStr];
                            var str0:string = CombatUtils.getSymbolAttributeStr(lHpAttStr,num);
                            if(num<0)
                                showRStr += str0;
                            else
                                showIStr += str0;
                        }
                        if(attributeData[atkAttStr]!=null){
                            // num = attributeData[atkAttStr];
                            var num:number = attributeData[atkAttStr];
                            var str0:string = CombatUtils.getSymbolAttributeStr(atkAttStr,num);
                            if(num<0)
                                showRStr += str0;
                            else
                                showIStr += str0;
                        }
                        if(attributeData[skillCdAttStr]!=null){
                            // num = attributeData[skillCdAttStr];
                            var num:number = attributeData[skillCdAttStr];
                            var str0:string = CombatUtils.getSymbolAttributeStr(skillCdAttStr,num);
                            if(num<0)
                                showRStr += str0;
                            else
                                showIStr += str0;
                        }
                        if(attributeData[rdAttStr]!=null){
                            // num = attributeData[skillCdAttStr];
                            var num:number = attributeData[rdAttStr];
                            var str0:string = CombatUtils.getSymbolAttributeStr(rdAttStr,num);
                            if(num<0)
                                showRStr += str0;
                            else
                                showIStr += str0;
                        }

                        if(showIStr!="")
                            item.increaseShow = showIStr;
                        if(showRStr!="")
                            item.reduceShow = showRStr;
                    }
                }
                
                // combatNode.senderPlace = senderPlace;
                combatNode.fromTarget = fromTarget;
                combatNode.fightNodeArr = fightNodeArr;
                combatNode.skillKey = skillKey;
            break;

            
            case CombatConstants.OPT_TYPE_ATK_SKILL_CONT:
            case CombatConstants.OPT_TYPE_ATK_SKILL_DECONT:
            case CombatConstants.OPT_TYPE_BUFF_ADD:
            case CombatConstants.OPT_TYPE_BUFF_REMOVE:
            case CombatConstants.OPT_TYPE_BUFF_UPDATE:
                var buffData:any = data[CombatConstants.BUFF_DATA];
                var fightNodeArr:Array<FightNode> = buffData.fightNodeArr;
                var skillKey:string = buffData.skillKey;

                combatNode.fightNodeArr = fightNodeArr;
                combatNode.skillKey = skillKey;
            break;
        }

        return combatNode;
    }

    //创建战斗序列
    public static createCombatSerial(combatParser:CombatParser,arr:Array<CombatNode>,callBack:Handler = null):CombatSerial{
        var combatSerial:CombatSerial = new CombatSerial(combatParser,callBack);
        for(var i:number=0,lengthI=arr.length;i<lengthI;i++){
            var item:CombatNode = arr[i];
            if(item==null)
                continue;
            combatSerial.addNode(item);
        }
        combatSerial.startPlay();
        return combatSerial;
    }
}