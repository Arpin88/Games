// TypeScript file
enum HallCmdDef{
    CMD_Hall = 100,  //大厅CMD;
    // CMD_Shop = 103,  //商城;
    // CMD_ShopBy = 104,  //购买商品;
    // CMD_Bag = 105,  //背包;
    // CMD_Baguse = 106,  //使用背包;
    CMD_Notice = 107,  //msg;
    CMD_CardViewLists = 228,
    CMD_SetHead = 232,  // 设置头像
    CMD_Change = 501,  // 转入



    CMD_InChange = 502,  // 转入
    CMD_OutChange = 503,  // 转出
    CMD_ChangeRecord = 504,  // 记录
    CMD_ChangeCash = 505,  // 提现

    CMD_TurnCard = 506,  // 转卡
    CMD_CardRecord = 507,  // 记录
    CMD_CardProgress = 508,
    CMD_WalletResult = 302,  

    CMD_GET_TEAM_CONFIG = 110,          //获取队伍配置
    CMD_GET_TEAM_LIST = 111,            //获取队伍列表信息
    CMD_CHANGE_BATTLE_TEAM = 112,       //切换战斗队伍
    CMD_GET_CARD_LIST_TEAMSET = 113,    //卡组设置获取用户卡牌列表
    CMD_GET_CARD_DETAIL_TEAMSET = 114,  //卡组设置获取用户卡牌详情
    CMD_SAVE_TEAMSET = 115,             //卡组设置保存
    CMD_GET_FROM_FETTER_TEAM = 116,     //卡组获取组成羁绊信息
    CMD_GET_FROM_FETTER_TEAMSET = 117,  //卡组设置获取组成羁绊信息

    // CMD_GET_MOLLBY_CONFIG = 124,      //购买商品
    CMD_Award = 125,  //是连抽卡牌;
    CMD_Award10 = 126,  //是连抽抽奖结果;
    CMD_MyCardList = 127,  //我的卡牌
    CMD_SetConfig = 128,  //设置;
    CMD_CreateCardPool = 129,  //生成奖池
    CMD_GETUPADTEGOLD = 130,      //购买商品

    CMD_GET_CARD_LIST = 150,    //获取用户卡牌列表
    CMD_GET_CARD_DETAIL = 151,  //获取用户卡牌详情
    CMD_UPGRADE_CARD = 152,     //卡牌升级

    CMD_GET_FETTERS_CONFIG = 160,  //获取羁绊配置;

    CMD_GET_CARD_LIST_RECYCLE = 170,    //回收获取用户卡牌列表
    CMD_RECYCLE_CARD = 171,             //回收卡牌
    CMD_GET_CUR_XWG_PRICE = 175,        //获取实时XWG价格

    CMD_MATCH_PVP = 180,            //匹配
    CMD_DISMATCH_PVP = 181,         //取消匹配
    CMD_GET_MATCH_PVP_INFO = 182,   //获取匹敌信息
    CMD_HALL_GET_MATCH_PVP_INFO=183,//大厅获取匹敌信息

    CMD_UPGRADE_COMMANDER = 200,        //升级角色
    CMD_GET_UPGRADE_MATERIAL_LIST = 201,        //升级材料列表
    
    // CMD_BagDestory = 206,  //摧毁背包道具;
    CMD_Record = 208, // 战绩
    // CMD_GET_MOLL_CONFIG = 213,      //商城配置
    // CMD_BaguseUp = 216,  //使用背包;


    CMD_GET_PROP_TYPE_LIST = 250,       //获取道具类型列表

    CMD_GET_SHOP_PROP_LIST = 260,       //获取商城道具列表
    CMD_CREATE_SHOP_PROP_TRADE = 261,   //创建商城道具交易
    CMD_GET_SHOP_PROP_INFO = 262,       //获取商城道具信息

    CMD_GET_BAG_PROP_LIST = 270,        //获取背包道具列表
    CMD_GET_BAG_PROP_INFO = 271,        //获取背包道具信息
    CMD_DESTORY_BAG_PROP = 272,         //销毁背包道具
    CMD_USE_BAG_PROP = 273,             //使用背包道具

    CMD_SET_GUIDE_STEP = 350,           //设置新手引导步骤
}