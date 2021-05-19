// TypeScript file
class CombatConstants{
    //操作类型
    public static readonly OPT_TYPE_NO_ACTION:number = 0;       //无任何操作
    public static readonly OPT_TYPE_SEND_CARD:number = 1;       //发牌
    public static readonly OPT_TYPE_REDUCE_ROUND:number = 2;    //减少手牌回合
    public static readonly OPT_TYPE_OUT_CARD:number = 3;        //出牌
    public static readonly OPT_TYPE_ATK_NOR:number = 4;         //普通攻击
    public static readonly OPT_TYPE_ATK_SKILL:number = 5;       //技能攻击
    public static readonly OPT_TYPE_DEATH:number = 6;           //死亡
    public static readonly OPT_TYPE_REVIVE:number = 7;          //复活
    public static readonly OPT_TYPE_ROUND_RECOVER:number = 8;   //回合回血
    public static readonly OPT_TYPE_ROUND_LOST:number = 9;       //回合扣血
    public static readonly OPT_TYPE_MODIFY_ATTRIBUTE:number = 10;    //修改属性
    public static readonly OPT_TYPE_PERSUADE_BACK:number = 11;  //劝退
    
    public static readonly OPT_TYPE_OUT_CARD_BACK:number = 13;      //出牌返回到手牌
    public static readonly OPT_TYPE_SORT_HAND_CARD:number = 14;     //整理手牌
    public static readonly OPT_TYPE_SORT_OUT_CARD:number = 15;      //整理出牌
    public static readonly OPT_TYPE_SORT_DEATH_CARD:number = 16;    //整理死亡牌
    public static readonly OPT_TYPE_SEL_CARD:number = 17;          //选择出牌
    public static readonly OPT_TYPE_FORCE_DESEL_CARD:number = 18;  //强制全部取消选择出牌
    public static readonly OPT_TYPE_SET_NON_CLICKABLE:number = 19; //设置不能点击状态用于正方形卡牌
    public static readonly OPT_TYPE_ATK_SKILL_CONT:number = 20;     //持续技能
    public static readonly OPT_TYPE_ATK_SKILL_DECONT:number = 21;   //取消持续技能
    public static readonly OPT_TYPE_BUFF_ADD:number = 23;           //BUFF添加
    public static readonly OPT_TYPE_BUFF_REMOVE:number = 24;        //BUFF移除
    public static readonly OPT_TYPE_BUFF_UPDATE:number = 25;        //BUFF更新
    public static readonly OPT_TYPE_FETTER_ADD:number = 26;         //羁绊添加
    public static readonly OPT_TYPE_FETTER_REMOVE:number = 27;      //羁绊移除

    public static readonly FIGHT_ACCELERATION_MULTIPLE = 1;         //战斗加速倍数

    //位置字符
    public static readonly PLACE_ATK:number = 0;
    public static readonly PLACE_DFD:number = 1;
    //卡牌层类型
    public static readonly CARD_GROUP_ATK_HAND:number = 0;           //手牌层
    public static readonly CARD_GROUP_DFD_HAND:number = 1;           
    public static readonly CARD_GROUP_ATK_OUT:number = 2;            //出牌层
    public static readonly CARD_GROUP_DFD_OUT:number = 3;            
    public static readonly CARD_GROUP_ATK_DEATH:number = 4;          //死亡牌层
    public static readonly CARD_GROUP_DFD_DEATH:number = 5;          

    //卡牌数量
    public static readonly CARD_HAND_MAX_COUNT:number = 5;          //手牌最大数量
    public static readonly CARD_OUT_MAX_COUNT:number = 5;           //出牌最大数量

    public static readonly REQ_QUICK_SETTLEMENT_MAX_COUNT = 3;          //最多请求快速结算次数;


    public static readonly CARD_SQUARE_GROUP_PREFIX:string = "groupCS_";   //正方形卡牌层前缀
    public static readonly CARD_RECTANGLE_GROUP_PREFIX:string = "groupRS_";//长方形卡牌层前缀

    public static readonly FIGHT_TYPE_USER:number = 0;       //攻击用户类型
    public static readonly FIGHT_TYPE_OUT_CARD:number = 1;        //攻击卡牌类型
    public static readonly FIGHT_TYPE_HAND_CARD:number = 2;       //手牌类型
    public static readonly FIGHT_TYPE_READY_CARD:number = 3;      //等待池类型

    public static readonly COMBAT_TYPE_ATK_NOR:number = 0;      //战斗普通攻击类型
    public static readonly COMBAT_TYPE_ATK_SKILL:number = 1;    //战斗普通攻击类型
    public static readonly COMBAT_TYPE_BUFF_ADD:number = 2;     //战斗buff添加类型
    public static readonly COMBAT_TYPE_BUFF_REMOVE:number = 3;  //战斗buff移除类型
    public static readonly COMBAT_TYPE_BUFF_UPDATE:number = 4;  //战斗buff移除类型
    public static readonly COMBAT_TYPE_REVIVE:number = 5;       //战斗复活类型
    public static readonly COMBAT_TYPE_ROUND_RECOVER:number = 6;//战斗回合回血类型
    public static readonly COMBAT_TYPE_ROUND_LOST:number = 7;   //战斗回合回血类型
    public static readonly COMBAT_TYPE_MODIFY_ATTRIBUTE:number = 8; //战斗普通修改属性类型
    public static readonly COMBAT_TYPE_PERSUADE_BACK:number = 9;//战斗劝退类型
    public static readonly COMBAT_TYPE_FETTER_ADD:number = 10;//战斗羁绊添加类型
    public static readonly COMBAT_TYPE_FETTER_REMOVE:number = 11;//战斗羁绊移除类型

    //卡牌状态
    public static readonly CARD_STATE_NOR:number = 0;                //无状态
    public static readonly CARD_STATE_CLICKABLE:number = 1;          //可点击状态
    public static readonly CARD_STATE_CLICKED:number = 2;            //已点击状态
    public static readonly CARD_STATE_NON_CLICKABLE:number = 3;      //不可点击状态
    // public static readonly CARD_STATE_DEATH:number = 3;              //死亡状态

    //战斗配置解析字段
    public static readonly COMBAT_CONFIG_JSON:string = "combatConfig_json";
    public static readonly SEND_CARD:string = "Send_Card";                  //发牌配置
    public static readonly OUT_CARD:string = "Out_Card";                    //出牌配置
    public static readonly DEATH_CARD:string = "Death_Card";                //死亡牌配置
    public static readonly HEAD_COMMON_EXP_FORMS:string = "Head_Common_ExpForms";   //头像普通表现形式
    public static readonly HEAD_SKILL_EXP_FORMS:string = "Head_Skill_ExpForms";   //头像技能表现形式
    public static readonly HEAD_FETTER_EXP_FORMS:string = "Head_Fetter_ExpForms";  //头像羁绊表现形式
    public static readonly RC_COMMON_EXP_FORMS:string = "RC_Common_ExpForms";   //长方形卡牌普通表现形式
    public static readonly RC_BUFF_EXP_FORMS:string = "RC_Buff_ExpForms";       //长方形卡牌BUFF表现形式
    public static readonly RC_SKILL_EXP_FORMS:string = "RC_Skill_ExpForms";     //长方形卡牌技能表现形式
    public static readonly RC_FETTER_EXP_FORMS:string = "RC_Fetter_ExpForms";     //长方形卡牌技能表现形式
    public static readonly SC_SKILL_EXP_FORMS:string = "SC_Skill_ExpForms";     //正方形卡牌技能表现形式
    // public static readonly EFF_MOVIECLIPS:string = "Eff_MovieClips";        //特效动画
    public static readonly EFF_COMPONENTS:string = "Eff_Components";        //特效组件
    public static readonly COMMON_ACTIONS:string = "Common_Actions";        //常用动作集合

    public static readonly EXP_FORM_ATK:string = "atk";          //攻击
    public static readonly EXP_FORM_HIT:string = "hit";          //受击
    public static readonly EXP_FORM_RECOVER:string = "recover";  //恢复
    public static readonly EXP_FORM_LOST:string = "lost";        //丢失血量
    public static readonly EXP_FORM_EVASIVE:string = "evasive";  //闪避
    public static readonly EXP_FORM_DEATH:string = "death";      //死亡
    public static readonly EXP_FORM_RELEASE:string = "release";  //释放
    public static readonly EXP_FORM_MODIFY:string = "modify";    //修改

    public static readonly SKILL_RES_ATTR:string = "res_attr";      //技能释放者属性
    public static readonly SKILL_REC_ATTR:string = "rec_attr";      //技能接收者属性

    // public static readonly MC_ATTR:string = "mc_attr";              //动画属性
    public static readonly EFF_COMP:string = "eff_comp";            //特效组件
    // public static readonly SKILL_ATTR:string = "skill_attr";        //技能属性
    public static readonly USAGE_TIME:string = "usage_time";        //花费时间

    public static readonly ATKC_ATTR:string = "atkc_attr";          //攻击者卡牌属性
    public static readonly DFDC_ATTR:string = "dfdc_attr";          //防御者卡牌属性

    public static readonly COMPONENT_ID:string = "compId";          //组件id
    // public static readonly MOVIECLIP_ID:string = "mcId";            //动画id
    public static readonly ACTION_ID:string = "actId";              //动作id

    public static readonly EFF_COMP_IMAGE:string = "image";                 //特效图片组件
    public static readonly EFF_COMP_IMAGES:string = "images";               //特效图片集合组件
    public static readonly EFF_COMP_BITMAP_LABELS:string = "bitmapLabels";  //特效文本位图集合组件
    public static readonly EFF_COMP_LABELS:string = "labels";               //特效文本集合组件
    public static readonly EFF_COMP_MOVIECLIPS:string = "movieClips";       //特效动画集合组件

    public static readonly EFF_COMP_LABEL_REDUCE = "reduceShow";        //文本减少显示
    public static readonly EFF_COMP_LABEL_INCREASE = "increaseShow";    //文本增加显示

    public static readonly EFF_ACTS:string = "acts";              //特效属性动作集合
    public static readonly ATTR_ACT:string = "act_attr";          //动作属性

    public static readonly ATTR_RES:string = "res";                    //资源路径名称
    public static readonly ATTR_JS_NAME:string = "jsName";             //资源json名称
    public static readonly ATTR_MC_NAME:string = "mcName";             //资源动画名称
    public static readonly ATTR_POS_X:string = "posX";                 //X坐标
    public static readonly ATTR_POS_Y:string = "posY";                 //Y坐标
    public static readonly ATTR_GAP_X:string = "gapX";                 //X坐标差距
    public static readonly ATTR_GAP_Y:string = "gapY";                 //Y坐标差距
    public static readonly ATTR_SCALE_X:string = "scaleX";             //X缩放
    public static readonly ATTR_SCALE_Y:string = "scaleY";             //Y缩放
    public static readonly ATTR_ROTATION:string = "rotation";          //旋转角度
    public static readonly ATTR_SPACE:string = "space";                //间距

    public static readonly ATTR_TEXT:string = "text";                  //文本文字
    public static readonly ATTR_TEXT_COLOR:string = "textColor";       //文本颜色
    public static readonly ATTR_FONT_FAMILY:string = "fontFamily";     //文本字体
    public static readonly ATTR_STROKE:string = "stroke";              //文本描边
    public static readonly ATTR_STROKE_COLOR:string = "strokeColor";   //文本描边颜色
    public static readonly ATTR_ZINDEX:string = "zIndex";              //深度
    
    public static readonly ATTR_MOVE_X:string = "moveX";               //X坐标移动距离 *加上原坐标
    public static readonly ATTR_MOVE_Y:string = "moveY";               //Y坐标移动距离
    public static readonly ATTR_MOVE_TO_X:string = "moveToX";          //X坐标移动到的距离 *新坐标
    public static readonly ATTR_MOVE_TO_Y:string = "moveToY";          //Y坐标移动到的距离
    public static readonly ATTR_ROTATE_RANGE:string = "rotateRange";   //旋转弧度
    public static readonly ATTR_ALPHA:string = "alpha";                //透明度

    public static readonly ATTR_LOOP:string = "loop";                  //是否循环
    public static readonly ATTR_SPEED:string = "speed";                //速度
    public static readonly ATTR_PRE_DELAY:string = "preDelay";         //播放前等待时间
    public static readonly ATTR_POST_DELAY:string = "postDelay";       //播放后等待时间
    public static readonly ATTR_REMOVE:string = "remove";              //播放后移除

    public static readonly ATTR_PLAYTIMES:string = "playTimes";        //播放次数
    public static readonly ATTR_FRAMERATE:string = "frameRate";        //播放帧数

    public static readonly EFF_CLICKABLE:string = "eff_clickable";      //可点击特效

    public static readonly FIGHT_DATA:string = "fightData";             //战斗数据
    public static readonly BUFF_DATA:string = "buffData";               //buff数据
    public static readonly FETTER_DATA:string = "fetterData";           //羁绊数据

    public static readonly MODIFY_ATTRIBUTE_HP:string = "mhp";          //修改生命属性
    public static readonly MODIFY_ATTRIBUTE_LIMIT_HP:string = "mlhp";   //修改生命上限属性
    public static readonly MODIFY_ATTRIBUTE_ATK:string = "matk";        //修改攻击性
    public static readonly MODIFY_ATTRIBUTE_SKILL_CD:string = "mscd";   //修改技能CD属性
    public static readonly MODIFY_ATTRIBUTE_REDUCE_DAMAGE:string = "mrda";   //修改伤害减免属性
}