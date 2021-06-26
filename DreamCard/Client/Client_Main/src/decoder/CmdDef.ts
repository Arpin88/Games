// TypeScript file

enum CmdDef{


    // // CMD_CS_LOGIN = 
    // CMD_GAME_LOGIN = 1000,  //登录到游戏服务器;

    CMD_GAME_LOGIN = 1,     //登录
    CMD_GAME_REGISTER = 2,    //注册;
    CMD_GAME_SMSCODE =3,    //获取短信验证码
    CMD_GAME_FORGOT = 4,    //忘记密码
    CMD_CHECK_LOGIN = 5,    //检测登录 用于游戏开始是否自动登录或者是跳转到登录界面登录

    CMD_GAME_AUTO_LOGIN =6, //自动登录 测试用 后期删除
    CMD_WALLET_LOGIN = 7,   //钱包登录
    CMD_GAME_EMAILVCODE =8,    //获取邮箱验证码

    CMD_LOGIN_DATA = 11,    //登录信息
    CMD_UPDATE_ACCOUNT_GOLD = 12,   //更新用户金额

    CMD_GAME_LOGOUT = 99,    //退出登录

    // CMD_Hall = 100,  //大厅CMD;

    CMD_GAME_CONNECT = 1000,       // 链接游戏服务器
    CMD_CLIENT_HEART_BEAT = 1100,         //客户端心跳
    
    //测试战斗 后期删除
    CMD_DEBUG_SINGLE_CREATE_ROOM = 960,       //单个创建房间
    CMD_DEBUG_CLOSE_ROOM = 961,        //强制关闭房间
    CMD_DEBUG_REQ_USER_COMBAT_STATE = 962,  //请求用户战斗状态

    CMD_DEBUG_MANY_CREATE_ROOM = 965,       //多个创建房间

    CMD_DEBUG_GAME_CONNECT = 980,          // 测试链接游戏服务器
    CMD_DEBUG_GET_ROOM_DATA = 981,         // 测试返回房间信息
    CMD_DEBUG_GET_ROOM_DETAIL = 982,       // 测试返回房间详情
    CMD_DEBUG_GET_ROOM_RESERVE_DATA = 983, // 测试返回房间数据
    CMD_DEBUG_REMOVE_ROOM_RECORD = 984,    //移除房间记录
    CMD_DEBUG_GET_BATTLE_INFO = 985,       //获取战斗记录

    CMD_BIND_CHAIN_WALLET = 300,    //绑定钱包
    CMD_WALLET_TRANSFER = 301,  //钱包转账通知
    CMD_WALLET_TRANSFER_RESULT = 302,  //钱包转账结果通知
    // CMD_CARD_OFFLINE = 303, //钱包卡牌下链通知
    // CMD_CARD_OFFLINE_RESULT = 304,  //钱包卡牌下链结果通知
}