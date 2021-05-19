// TypeScript file
interface ExpFromImpl{
    //战斗变现
    fightExpForm:FightExpForm;
    //返回战斗表现
    getFightExpForm():FightExpForm;
    //返回父类根据深度
    getParentByZIndex(zIndex:number):egret.DisplayObjectContainer;
    //返回父类根据类型
    getParentByType(type:number):egret.DisplayObjectContainer;
}

/**
 * 战斗流程的一个节点
 */
class CombatNode{
    //操作随机id 预防判断相同节点
    public optRankId:string;
    //操作类型
    public optType:number = CombatConstants.OPT_TYPE_NO_ACTION;
    //发起者位置
    public senderPlace:number = -1;
    //接收者位置
    public receiverPlace:number = -1;
    //发起卡牌id
    public fromTarget:string = "";
    
    //操作卡牌信息
    public optCardData:Object = null;
    //需要移除卡牌
    public removeCard:boolean = false;

    //技能键值
    public skillKey:string = "";
    //战况集合
    public fightNodeArr:FightNode[] = [];
    //花费时间
    public usageTime:number = -1;
    //回调
    public callBack:Handler = null;
}

//战斗节点
class FightNode{
    //类型0-将领/1-卡牌
    public type:number;
    //目标 被击卡牌code或者将领ticket
    public toTarget:string;
    //目标数据
    public toTargetObj:Object;
    //是否命中
    public hited:boolean = true;
    // 伤害 <0，表示攻击型伤害，>0表示加血技能，=0表示闪避或不造成血量变化的技能 
    public damage:number = 0;
    // 伤害字符 null为不显示伤害
    public damageShow:string;
    // 治疗字符 null为不显示治疗
    public recoverShow:string;
    // 减少字符
    public reduceShow:string;
    // 增加字符
    public increaseShow:string;
    //技能名称显示
    public skillNameShow:string;
    //buff回合数
    public buffRound:number = 0;
    //是接收者
    public recipient:boolean = true;
    //是否死亡
    public died:boolean = false;
}

//战斗操作标记 有些不能同时播放的节点记录 例如上牌跟攻击不能同时播放
class CombatOptNote{
    //卡牌编号
    public code:string;
    //战斗节点集合
    public arrCombatNode:Array<CombatNode>;
    //当前战斗节点
    public curCombatNode:CombatNode;
}

//战斗技能内容
class FightSkillContent{
    public skillKey:string;
    public mcs:Array<UIMovieClip>;
}

//动作内容
class ActionContent{
    public target:any;
    public oriData:Object;
    public endData:Object;
}

//卡牌表现配置
class CardFormsConfig{
    public posX:number = 0;
    public posY:number = 0;
    public gapX:number = 0;
    public gapY:number = 0;
    public scaleX:number = 1;
    public scaleY:number = 1;
    public zIndex:number = 0;
}

//发牌配置
class SendCardConfig extends CardFormsConfig{
    public space:number = 0;
    public act_attr:any = {"spead":0};
}

//出牌配置
class OutCardConfig extends CardFormsConfig{
    public space:number = 0;
    public act_attr:any = {"spead":0};
}

//死亡牌配置
class DeathCardConfig extends CardFormsConfig{
    public space:number = 0;
    public act_attr:any = {"spead":0};
}



//特效基类配置
class EffCompBaseConfig{
    public note:string = "";
    public compId:string = "";
    public posX:number = 0;
    public posY:number = 0;
    public gapX:number = 0;
    public gapY:number = 0;
    public scaleX:number = 1;
    public scaleY:number = 1;
    public zIndex:number = 0;
    public anchorCenter:boolean = true;
    public posCenter:boolean = true;
    public showDelay:number = 0;
}

//图片配置
class ImageConfig extends EffCompBaseConfig{
    public res:string = "";
}

//富文本配置
class BitmapLabelConfig extends EffCompBaseConfig{
    public res:string = "";
}

//文本配置
class LabelConfig extends EffCompBaseConfig{
    public text:string = "";
    public size:number = 0;
    public textColor:number = 0x000000;
    public fontFamily:string = "";
    public stroke:number = 0;
    public strokeColor:number = 0x000000;
    public bold:boolean = false;
    public lineSpacing:number = 0;
    public textAlign:string = "left";
    public wordWrap:boolean = false;
    public width:number = -1;
    public height:number = -1;
}

//动画属性配置
class MovieClipConfig extends EffCompBaseConfig{
    public jsName:string = "";
    public mcName:string = "";
    public actName:string = "";
    public sound:string = "";
    public frameRate:number = -1;
    public playTimes:number = -1;
    public remove:boolean = false;
    public directionX:boolean = false;
    public directionY:boolean = false;
}



//动作属性配置
class CActionAttrConfig{
    public loop:boolean = false;
    public speed:number = 200;
    public preDelay:number = 0;
    public postDelay:number = 0;
    public remove:boolean = false;
}

//动作配置
class CActionConfig extends CActionAttrConfig{
    public moveX:number;
    public moveY:number;
    public moveToX:number;
    public moveToY:number;
    public rotateRange:number;
    public alpha:number;
}

