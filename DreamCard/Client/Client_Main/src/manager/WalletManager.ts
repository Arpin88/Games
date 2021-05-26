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
            var Lang = lang==0?"?chs":"?en";
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
                    var address:string = res.data.address;
                    if(address==null||address=="")
                    return;
                    var curAddress:string = GlobalDataManager.getInstance().getAccountData().getWallet();
                    var curWalletSecret:string = GlobalDataManager.getInstance().getAccountData().getWalletSecret();
                    var walletSecret:string = res.data.secret;
                    if(curAddress==""){
                        var obj = new Object();
                        obj["address"] = address;
                        obj["secret"] = walletSecret;
                        var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_BIND_CHAIN_WALLET,obj,true);
                    }else{
                        if(curAddress == address && curWalletSecret != walletSecret){
                            var obj = new Object();
                            obj["address"] = address;
                            obj["secret"] = walletSecret;
                            var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_BIND_CHAIN_WALLET,obj,true);
                        }
                        if(curAddress!=address){    //绑定地址跟本地地址不一致
                            ErrorMananger.getInstance().checkReqResult({result:GlobalDef.REQUEST_FAIL,msg:"-19000"});
                            Wallet.SDK.disconnect();
                        }
                    }
                }
                break;
            case "login":
                var obj = new Object();
                obj["address"] = res.data.address;
                obj["sign"] = res.data.signdata;
                obj["time"] = res.data.msg.substr(5);
                var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_WALLET_LOGIN,obj,true);
                GlobalDataManager.getInstance().setWalletName('XWG');
                break;
            case "onErc20TransferCallback": //erc20转账
                var txhash = res.data.txhash;

                break;
            case "onErc20TransferReceipt": //erc20转账完成
                var receipt = res.data;

                break;
            case "onSetNftApprovalCallback"://nft授权
                var obj = new Object();
                obj["txhash"] = res.data.txhash;

                break;
            case "onSetNftApprovalRectipt"://nft授权完成
                var receipt = res.data;

                break;
            case "onOffLineListCallback"://卡牌下链
                var tokenIdList = res.data.tokenIdList;
                var txhash = res.data.txhash;

                break;
            case "onOffLineListRectipt"://卡牌下链完成
                var tokenIdList = res.data.tokenIdList;
                var receipt = res.data.receipt;

                break;
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
                var Lang = lang==0?"?chs":"?en";
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
                }else{
                    if(curAddress!=address){    //绑定地址跟本地地址不一致
                        ErrorMananger.getInstance().checkReqResult({result:GlobalDef.REQUEST_FAIL,msg:"-19000"});
                        return;
                    }
                }
                if(callBack!=null)
                    callBack.run();
            });
        },this);
    }
}