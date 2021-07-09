// TypeScript file
declare class Wallet{
    static SDK:any;
};
class WalletManager{
    private static m_manager:WalletManager = new WalletManager();
    public static getInstance():WalletManager{
        return WalletManager.m_manager;
    }

    public openWallet():void{
        /*
        var isInit = GlobalDataManager.getInstance().getWalletInit();
        var lang = LanguageManager.getInstance().getCurLanguageType();
        // var url = "http://wallet.xwgapi.com/";
        var url = GlobalDataManager.getInstance().getGameConfig().walletUrl;
        url += lang==0?"?chs":"?en";
        var walletName = egret.localStorage.getItem('walletName');
        if(walletName)
        {
            url += "/"+walletName
        }
        console.log(url);
        UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
        if(isInit)
        {
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){
                UIManager.getInstance().hideUI(LoadingRView);
                XWG.SDK.open();},this);
        }else{
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){XWG.SDK.init(url, function(data){
            UIManager.getInstance().hideUI(LoadingRView);
            let res = JSON.parse(data);
            switch(res.cmd){
                case "init":
                    GlobalDataManager.getInstance().setWalletInit(true);
                    XWG.SDK.open();
                    break;
                case "bind":
                    var bindaddress = GlobalDataManager.getInstance().getBindAddress();
                    if(bindaddress)
                    {
                        return;
                    }
                    var obj = new Object();
                    obj["address"] = res.data;
                    var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_BIND_CHAIN_WALLET,obj,true);
                    break;
                case "transfer":
                    var obj = new Object();
                    obj["hash"] = res.data.hash;
                    obj["chain"] = res.data.chain;
                    var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_WALLET_TRANSFER,obj,true);
                    break;
                case "transferResult":
                    var obj = new Object();
                    obj["hash"] = res.data;
                    var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_WALLET_TRANSFER_RESULT,obj,true);
                    GameEventManager.getInstance().dispatchEvent("changefirsttime",null); // 首充埋点
                    
                    break;
                case "offLine":
                    var obj = new Object();
                    obj["tokenid"] = res.data;
                    var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_CARD_OFFLINE,obj,true);
                    break;
                case "offLineResult":
                    var obj = new Object();
                    obj["tokenid"] = res.data;
                    var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_CARD_OFFLINE_RESULT,obj,true);
                    break;
                case "getAddress":
                    var address = GlobalDataManager.getInstance().getWalletAddress();
                    XWG.SDK.setAddress(address);
                    break;
                }
            });},this);
        }*/
    }

    public walletLogin(walletName:string,showModel:boolean = true):void{
        var self = this;
        
        if(showModel)
            UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
        if(walletName == 'XWG'){
            var lang = LanguageManager.getInstance().getCurLanguageType();
            var Lang = lang==0?"zh-CN":"en";
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){
                Wallet.SDK.XWGconnect(self.onWalletListener,Lang);
            },this);
            return;
        }
        var time = Date.now();
        var loginmsg = "login"+time;
        HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){
            if(showModel)
                UIManager.getInstance().hideUI(LoadingRView);
            Wallet.SDK.login(loginmsg,walletName,function(result){
                if(ErrorMananger.getInstance().checkReqResult(result))
                    return;
                
                var obj = new Object();
                obj["address"] = result.account;
                obj["sign"] = result.sign;
                obj["time"] = time;
                obj["platform"] = Main.platform;
                var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_WALLET_LOGIN,obj,true);
                GlobalDataManager.getInstance().setWalletName(walletName);
            });
        },this);
    }

    //钱包回调
    private onWalletListener(data:any){
        if(data==null)
            return;
        var res = JSON.parse(data);
        var cmd:string = res.cmd;
        if(cmd==null)
            return;
        var self = this;
        switch (cmd) {
            case "MetaMaskChainChanged":    //metamask切换链
                GameEventManager.getInstance().dispatchEvent(GameEvent.MetaMaskChainChanged);
                break;
            case "MetaMaskAccountsChanged": //metamask切换用户
                GameEventManager.getInstance().dispatchEvent(GameEvent.MetaMaskAccountsChanged);
                break;
            case "BinanceChainChanged": //Binnance切换链
                GameEventManager.getInstance().dispatchEvent(GameEvent.BinanceChainChanged);
                break;
            case "BinanceAccountsChanged":  //Binnance切换用户
                GameEventManager.getInstance().dispatchEvent(GameEvent.BinanceAccountsChanged);
                break;
            case "onConnect":
                var ticket:string = egret.localStorage.getItem("ticket");
                if(ticket==null||ticket==""){
                    var time = Date.now();
                    var loginmsg = "login"+time;
                    Wallet.SDK.login(loginmsg,'XWG');
                }else{
                    var address:string = res.data.data.address;
                    if(address==null||address=="")
                    return;
                    var curAddress:string = GlobalDataManager.getInstance().getAccountData().getWallet();
                    var curWalletSecret:string = GlobalDataManager.getInstance().getAccountData().getWalletSecret();
                    var walletSecret:string = res.data.data.secret;
                    if(curAddress==""){
                        var obj = new Object();
                        obj["address"] = address;
                        if(walletSecret)
                            obj["secret"] = walletSecret;
                        var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_BIND_CHAIN_WALLET,obj,true);
                    }else{
                        if(curAddress.toLowerCase() == address.toLowerCase() && walletSecret && curWalletSecret != walletSecret){
                            var obj = new Object();
                            obj["address"] = address;
                            obj["secret"] = walletSecret;
                            var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_BIND_CHAIN_WALLET,obj,true);
                            break;
                        }
                        if(curAddress.toLowerCase()!=address.toLowerCase()){    //绑定地址跟本地地址不一致
                            ErrorMananger.getInstance().checkReqResult({result:GlobalDef.REQUEST_FAIL,msg:"-19000"});
                            Wallet.SDK.disconnect();
                            break;
                        }
                        GameEventManager.getInstance().dispatchEvent(GameEvent.XWGWalletConnect);
                    }
                }
                break;
            case "sign": //签名
                break;
            case "onErc20TransferCallback": //erc20转账
                GameEventManager.getInstance().dispatchEvent(GameEvent.onErc20TransferCallback,res.data.data);
                break;
            case "onErc20TransferReceipt": //erc20转账完成
                GameEventManager.getInstance().dispatchEvent(GameEvent.onErc20TransferReceipt,res.data.data);
                break;
            case "onSetNFTSwapApprovalCallback"://nft授权
                GameEventManager.getInstance().dispatchEvent(GameEvent.onSetNFTSwapApprovalCallback,res.data.data);
                break;
            case "onSetNFTSwapApprovalReceipt"://nft授权完成
                GameEventManager.getInstance().dispatchEvent(GameEvent.onSetNFTSwapApprovalReceipt,res.data.data);
                break;
            case "onOffLineListCallback"://卡牌下链
                GameEventManager.getInstance().dispatchEvent(GameEvent.onOffLineListCallback,res.data.data);
                break;
            case "onOffLineListReceipt"://卡牌下链完成
                GameEventManager.getInstance().dispatchEvent(GameEvent.onOffLineListReceipt,res.data.data);
                break;
            case "onSetNFTMineApprovalCallback"://授权远征回调
                GameEventManager.getInstance().dispatchEvent(GameEvent.onSetNFTMineApprovalCallback,res.data.data);
                break;
            case "onSetNFTMineApprovalReceipt"://授权远征结果
                GameEventManager.getInstance().dispatchEvent(GameEvent.onSetNFTMineApprovalReceipt,res.data.data);
                break;
            case "onNftMineLockCallback"://发起远征回调
                GameEventManager.getInstance().dispatchEvent(GameEvent.onNftMineLockCallback,res.data.data);
                break;
            case "onNftMineLockReceipt"://发起远征结果
                GameEventManager.getInstance().dispatchEvent(GameEvent.onNftMineLockReceipt,res.data.data);
                break;
            case "onNftMineWithdrawalRewardCallback"://领取远征奖励回调
                GameEventManager.getInstance().dispatchEvent(GameEvent.onNftMineWithdrawalRewardCallback,res.data.data);
                break;
            case "onNftMineWithdrawalRewardReceipt"://领取远征奖励结果
                GameEventManager.getInstance().dispatchEvent(GameEvent.onNftMineWithdrawalRewardReceipt);
                break;
            case "onNftMineUnlockCallback"://结束远征回调
                GameEventManager.getInstance().dispatchEvent(GameEvent.onNftMineUnlockCallback);
                break;
            case "onNftMineUnlockReceipt"://结束远征结果
                GameEventManager.getInstance().dispatchEvent(GameEvent.onNftMineUnlockReceipt);
                break;
		}
    }
    
    public walletClose(){
        if (typeof(Wallet) == 'undefined') {
            return;
        }else{
            Wallet.SDK.XWGClose();
        }
    }

    //钱包连接
    public walletConnect(walletName:string,callBack:Handler,showModel:boolean=true):void{
        var self = this;
        if(showModel)
            UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
        HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){
            if(showModel)
                UIManager.getInstance().hideUI(LoadingRView);
            if(walletName == 'XWG'){
                var lang = LanguageManager.getInstance().getCurLanguageType();
                var Lang = lang==0?"zh-CN":"en";
                var address = GlobalDataManager.getInstance().getAccountData().getWallet();
                var walletSecret = GlobalDataManager.getInstance().getAccountData().getWalletSecret();
                Wallet.SDK.XWGconnect(self.onWalletListener,Lang,address,walletSecret);
                return;
            }

            Wallet.SDK.connect(walletName,self.onWalletListener,function(result){
                if(ErrorMananger.getInstance().checkReqResult(result))
                    return;
                var address:string = result.msg;
                if(address==null||address=="")
                    return;
                var curAddress:string = GlobalDataManager.getInstance().getAccountData().getWallet();
                if(curAddress==""){
                    var obj = new Object();
                    obj["address"] = address;
                    var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_BIND_CHAIN_WALLET,obj,true);
                    return;
                }else{
                    if(curAddress!=address){    //绑定地址跟本地地址不一致
                        ErrorMananger.getInstance().checkReqResult({result:GlobalDef.REQUEST_FAIL,msg:"-19000"});
                        return;
                    }
                }
                GlobalDataManager.getInstance().setWalletName(walletName);
                if(callBack!=null)
                    callBack.run();
                
            });
        },this);
    }
}