// TypeScript file
enum CombatCmdDef{
    // 断线
    CMD_DISCONNECT_GAME = 1001,
    //断线重连
    CMD_RECONNECT_GAME = 1002,
    // 进入游戏
    CMD_ENTER_GAME = 1003,
    // 游戏开始倒计时
    CMD_ENTER_COUNT_TIME = 1004,
    //同步对方数据
    CMD_SYN_OTHER_DATA_GAME = 1005,
    //同步己方数据
    CMD_SYN_ME_DATA_GAME = 1006,
    //发牌
    CMD_SNED_CARD = 1007,
    //同步房间上牌倒计时
    CMD_SYN_PLAY_CARD_TIME = 1008,
    //出牌
    CMD_OUT_CARD = 1009,
    //同步房间上牌数据
    CMD_SYN_PLAY_CARD_DATA = 1010,
    //同步房间结算消息
    CMD_SYN_GAME_RESULT_DATA = 1011,
    //同步回合切换数据
    CMD_SYN_CHANGE_ROUND_DATA_GAME = 1012,
    //同步战斗初始化数据
    CMD_SYN_BATTLE_DATA_GAME = 1013,
    //同步战斗攻击数据
    CMD_SYN_ATK_DATA_GAME = 1014,
    //认输
    CMD_SURRENDER_GAME = 1015,
    //开始战斗
    CMD_START_BATTLE = 1016,
    //同步托管
    CMD_SYN_HOSTING = 1017,
    //同步游戏开始时候的羁绊
    CMD_SYN_START_FETTER = 1018,
    //请求快速结算
    CMD_REQ_QUICK_SETTLEMENT=1019,
    //快速结算处理
    CMD_PRO_QUICK_SETTLEMENT=1020,

    //强制解散房间
    CMD_SYN_DISSOLUTION_GAME = 1099,

    //测试返回buffcd
    CMD_DEBUG_GET_BUFF_CD = 1030,



    //http请求强制重连游戏
    CMD_FORCE_RECONNECT_GAME = 900,
    //http请求返回卡牌数据
    CMD_GET_CARD_DETAIL = 910,
}