class GameEvent extends egret.Event{

    public static UpdateBindAddress:string = "updateBindAddress";       //更新钱包绑定地址

    public static MetaMaskChainChanged:string =  "metaMaskChainChanged";           //metamask切换链
    public static MetaMaskAccountsChanged:string =  "metaMaskAccountsChanged";     //metamask切换用户
    public static BinanceChainChanged:string =  "binanceChainChanged";             //binance切换链
    public static BinanceAccountsChanged:string =  "binanceAccountsChanged";       //binance切换用户
    // public static ConnectWalletComplete:string = "connectWalletComplete"            //链接钱包完成
    
    public static OnConnectWebSocketComplete:string = "onConnectWebSocketComplete";   //当链接socket完成

    public static NeedInputPayPassword:string = "needInputPayPassword";         //需要输入支付密码

    public static NeedGetLoginData:string = "needGetLoginData";         //需要获取登录信息

    public static OnLogout:string = "onLogout"; //当退出登录
   
    public static updateGold:string = "updateGold";  //更新金币
    public static chargesucc:string = "chargesucc";  //充值成功


    //当XWG钱包连接成功
    public static XWGWalletConnect:string = "XWGWalletConnect"
    //当发起交易回调
    public static onErc20TransferCallback:string = "onErc20TransferCallback";
    //当发起交易结果
    public static onErc20TransferReceipt:string = "onErc20TransferReceipt";
    //当发起nft授权回调
    public static onSetNFTSwapApprovalCallback:string = "onSetNFTSwapApprovalCallback";
    //当发起nft授权结果
    public static onSetNFTSwapApprovalReceipt:string = "onSetNFTSwapApprovalReceipt";
    //当卡牌下链回调
    public static onOffLineListCallback:string = "onOffLineListCallback";
    //当卡牌下链结果
    public static onOffLineListReceipt:string = "onOffLineListReceipt";
    //当远征授权回调
    public static onSetNFTMineApprovalCallback:string = "onSetNFTMineApprovalCallback";
    //当远征授权结果
    public static onSetNFTMineApprovalReceipt:string = "onSetNFTMineApprovalReceipt";
    //当发起远征回调
    public static onNftMineLockCallback:string = "onNftMineLockCallback";
    //当发起远征结果
    public static onNftMineLockReceipt:string = "onNftMineLockReceipt";
    //当领取远征奖励回调
    public static onNftMineWithdrawalRewardCallback:string = "onNftMineWithdrawalRewardCallback";
    //当领取远征奖励结果
    public static onNftMineWithdrawalRewardReceipt:string = "onNftMineWithdrawalRewardReceipt";
    //当结束远征回调
    public static onNftMineUnlockCallback:string = "onNftMineUnlockCallback";
    //当结束远征结果
    public static onNftMineUnlockReceipt:string = 'onNftMineUnlockReceipt';



    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
}

class GameEventData{
    public eventName:string = "";
    public gameEvent:any;
    // public paramArr:Array<GameEventParam> = new Array<GameEventParam>();
    public paramObj:Object = new Object();
}

class GameEventParam{
    public event:string;
    public caller:any;
    public listener:Function;
    public args:Object;
    public priority:number;
}