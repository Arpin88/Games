class GameEvent extends egret.Event{

    public static UpdateBindAddress:string = "updateBindAddress";       //更新钱包绑定地址

    public static MetaMaskChainChanged:string =  "metaMaskChainChanged";           //metamask切换链
    public static MetaMaskAccountsChanged:string =  "metaMaskAccountsChanged";     //metamask切换用户
    public static BinanceChainChanged:string =  "binanceChainChanged";             //binance切换链
    public static BinanceAccountsChanged:string =  "binanceAccountsChanged";       //binance切换用户
    // public static ConnectWalletComplete:string = "connectWalletComplete"            //链接钱包完成
    
    // public static Bi

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