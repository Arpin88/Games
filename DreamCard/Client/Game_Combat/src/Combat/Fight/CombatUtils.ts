// TypeScript file
class CombatUtils{

    //泛型创建返回配置
    public static getConfig<T>(data:any,c: {new(): T; }):T{
        if(data==null)
            return null;

        var newClass = new c();
        CombatUtils.assignmentObj(newClass,data);
        return newClass;
    }

    //根据classObj含有属性进行赋值
    public static assignmentObj(classObj:any,configObj:any):any{
        if(classObj==null)
            return;

        var proArr:string[] = Object.getOwnPropertyNames(classObj);
        for(var key in proArr){
            var item:string = proArr[key];
            if(configObj.hasOwnProperty(item)){
                classObj[item] = configObj[item];
            }
        }
    }

    //泛型创建
    public static create<T>(c: {new(): T; }): T {
        return new c();
    }

    //整理卡牌坐标
    public static sortCardPos(viewArr:Array<IBaseView>,space:number,gapPoint:egret.Point):void{
        for(var i:number=0,lengthI:number = viewArr.length;i<lengthI;i++){
            var item:IBaseView = viewArr[i];
            if(item==null)
                continue;
            item.x = i*(item.width+space)+gapPoint.x+item.anchorOffsetX;
            item.y = 0+gapPoint.y+item.anchorOffsetY;
        }
    }

    //返回卡牌下标根据卡牌id
    public static getCardIndexByCardCode(code:string,viewArr:Array<IBaseView>):number{
        var index:number = -1;
        for(var i:number=0,lengthI=viewArr.length;i<lengthI;i++){
            var item:IBaseView = viewArr[i];
            var data:any = item.getData().cdata;
            if(data.code!=null&&data.code==code){
                index = i;
                break;
            }
        }
        return index;
    }

    //返回卡牌视图根据卡牌id
    public static getCardViewByCardCode(code:string,viewArr:Array<IBaseView>):any{
        var view:IBaseView;
        for(var i:number=0,lengthI=viewArr.length;i<lengthI;i++){
            var item:IBaseView = viewArr[i];
            var data:any = item.getData().cdata;
            if(data!=null&&data.code!=null&&data.code==code){
                view = item;
                break;
            }
        }
        return view;
    }

    //改变卡牌层级名称
    public static changeCardGroupName(cardGroup:number,cardData:any):any{
        var newCardData:any = {};
        var groupName:string = cardData.groupName;
        var newPrefix:string = "";
        switch(cardGroup){
            case CombatConstants.CARD_GROUP_ATK_HAND:   //手牌跟死亡牌都是正方形卡牌
            case CombatConstants.CARD_GROUP_DFD_HAND:
            case CombatConstants.CARD_GROUP_ATK_DEATH:
            case CombatConstants.CARD_GROUP_DFD_DEATH:
                 if(groupName==null)
                     cardData.groupName = groupName = CombatConstants.CARD_SQUARE_GROUP_PREFIX+cardData.code;
                 if(groupName.substr(0,8)!=CombatConstants.CARD_SQUARE_GROUP_PREFIX){
                     newPrefix = CombatConstants.CARD_SQUARE_GROUP_PREFIX;
                 }
            break;
            case CombatConstants.CARD_GROUP_ATK_OUT:    //出牌是长方形卡牌
            case CombatConstants.CARD_GROUP_DFD_OUT:
                if(groupName==null)
                     cardData.groupName = groupName = CombatConstants.CARD_RECTANGLE_GROUP_PREFIX+cardData.code;
                if(groupName.substr(0,8)!=CombatConstants.CARD_RECTANGLE_GROUP_PREFIX){
                    newPrefix = CombatConstants.CARD_RECTANGLE_GROUP_PREFIX;
                 }
            break;
        }
        
        if(newPrefix!=""){
            var strArr:Array<string> = groupName.split("_");
            if(strArr.length!=2){
                return;
            }
            var code:string = strArr[1];
            for(var i in cardData) {    //深拷贝
                newCardData[i] = cardData[i];
            }
            newCardData.groupName = newPrefix+code;
        }else{
            newCardData = cardData;
        }
        return newCardData;
    }

    //返回带符号的字符
    public static getSymbolStr(data:number):string{
        return data<=0?""+data:"+"+data;
    }

    //返回带符号的字符ATTRIBUTE
    public static getSymbolAttributeStr(key:string,data:number):string{
        var addStr:string = "";
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage("CombatCommon");
        if(key==CombatConstants.MODIFY_ATTRIBUTE_HP)
            addStr = labelObj["lbl_0"];//"生命";
        else if(key==CombatConstants.MODIFY_ATTRIBUTE_ATK)
            addStr = labelObj["lbl_1"];//"攻击力";
        else if(key==CombatConstants.MODIFY_ATTRIBUTE_LIMIT_HP)
            addStr = labelObj["lbl_2"];//"生命上限";
        else if(key==CombatConstants.MODIFY_ATTRIBUTE_SKILL_CD)
            addStr = labelObj["lbl_3"];//"CD";
        else if(key==CombatConstants.MODIFY_ATTRIBUTE_REDUCE_DAMAGE)
            addStr = labelObj["lbl_4"];//"伤害减免";
        addStr += CombatUtils.getSymbolStr(data)+"\n";
        return addStr;
    }


    //返回加倍速度
    public static getAMSpeed(speed:number,decimal:number = -1):number{
        if(speed==null||speed<=0)
            return speed;

        var num:number = speed/CombatConstants.FIGHT_ACCELERATION_MULTIPLE;
        if(decimal!=-1){
            num = Number(num.toFixed(decimal));
        }
        return num;
    }

    //返回加倍帧率
    public static getAMFrameRate(frameRate:number,decimal:number = -1):number{
        if(frameRate==null||frameRate<=0)
            return frameRate;
            
        var num:number = frameRate*CombatConstants.FIGHT_ACCELERATION_MULTIPLE;
        if(decimal!=-1){
            num = Number(num.toFixed(decimal));
        }
        return num;
    }

    //检测是否含有数据
    public static checkHasData(data:any,arr:Array<any>){
        var hasData:boolean = false;
        for(var i:number = 0,lengthI:number = arr.length;i<lengthI;i++){
            var item:any = arr[i];
            if(item==null)
                continue;
            if(item==data){
                hasData = true;
                break;
            }
        }
        return hasData;
    }

    //返回倒计时显示内容00:00
    public static getCutDownShowContent(count:number):string{
        var str:string = "00:00";
        if(count>0){
            var minute:number = Math.floor(count/60);
            var mPrefix:string = minute<10?"0":"";
            var second:number = count%60;
            var sPrefix:string = second<10?"0":"";
            str = mPrefix+mPrefix+":"+sPrefix+second;
        }
        return str;
    }

    //生成随机ID
    public static getRankId(count:number = 8):string{
        var genUid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var length = count;
        var soupLength = genUid.length
        var id = []
        for (var i = 0; i < length; i++) {
            id[i] = genUid.charAt(Math.random() * soupLength)
        }
        return id.join('')
    }
}