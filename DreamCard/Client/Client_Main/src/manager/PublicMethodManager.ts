// TypeScript file
declare class XWG{
    static SDK:any;
};
class PublicMethodManager{
    private static m_manager:PublicMethodManager = new PublicMethodManager();
    public static getInstance():PublicMethodManager{
        return PublicMethodManager.m_manager;
    }


    public getOSType():number{
        var type:string = egret.Capabilities.os;
        var ret:number = -1;
        switch(type){
            case "Unknow":ret =0;
            case "Windows PC":ret =1;
            case "iOS": ret =2;
            case "Android": ret = 3;
            case "Windows Phone": ret =4;
            case "Mac OS": ret = 5;
        }
        return ret;
    }

    // public static REGEX_TO_USER:string = "^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$";
    public static REGEX_TO_USER:string = "^[a-zA-Z0-9_]{6,22}$";
    public static REGEX_TO_PHONE:string = "^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[2-7])|(17[0-8])|(18[0-9])|(19[0-9]))\\d{8}$";//"^[1][3,4,5,7,8][0-9]{9}$";
    public static REGEX_TO_NICK:string = "^[0-9a-zA-Z\u4e00-\u9fa5]{1,16}$";
    public static REGEX_TO_PSD:string = "^[a-zA-Z0-9_-]{6,18}$";
    public static REGEX_TO_EMAIL:string = "^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$";
    public checkRegex(regex:string,param:string):boolean{
        var reg:RegExp = new RegExp(regex);
        return reg.test(param);
    }

    public loginOut():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_LOGOUT,{});
        egret.localStorage.setItem("ticket","");
        GMDManager.closeGMD();
        UIManager.getInstance().removeAllLayerUI();
        UIManager.getInstance().showUI(LoginView);
    }

    //获取卡牌品质
    public getCardRarity(rarity:string):string{
        var str:string = rarity;
        switch(rarity){
            case "common":
            str = "lbl_0";
            break;
            case "rare":
            str = "lbl_1";
            break;
            case "epic":
            str = "lbl_2";
            break;
            case "legendary":
            str = "lbl_3";
            break;
            case "mythical":
            str = "lbl_4";
            break;
        }
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage("Common");
        if(labelObj==null)
            return rarity;
        return labelObj[str];
    }

    //获取卡牌五行
    public getCardElement(element:string):string{
        var str:string = element;
        switch(element){
            case "metal":
            str = "lbl_5";
            break;
            case "wood":
            str = "lbl_6";
            break;
            case "water":
            str = "lbl_7";
            break;
            case "fire":
            str = "lbl_8";
            break;
            case "earth":
            str = "lbl_9";
            break;
        }
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage("Common");
        if(labelObj==null)
            return element;
        return labelObj[str];
    }

    //返回概率字符串 (xxoo%s,10) => xxoo10
    public getProbabilityStr(data:any,pro:Array<any>):string{
        var str :string = data;
        var strArr:Array<string> = str.split('%s');
        if(strArr.length<2)
            return data;
        
        if(strArr.length<=pro.length+1){
            str = "";
            for(var i:number=0,lengthI:number = strArr.length;i<lengthI;i++){
                str+=  (i!=lengthI-1?(strArr[i] + pro[i]):strArr[i])
            }
        }else{
            for(var i:number=0,lengthI:number = pro.length;i<lengthI;i++){
                str+=  (strArr[i] + pro[i]);
            }
            for(var i:number=pro.length,lengthI:number = strArr.length;i<lengthI;i++){
                str+= strArr[i];
            }
        }
        return str;
    }

    public openWallet():void{
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
        if(isInit)
        {
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){XWG.SDK.open();},this);
        }else{
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){XWG.SDK.init(url, function(data){
            let res = JSON.parse(data);
            switch(res.cmd){
                case "init":
                    GlobalDataManager.getInstance().setWalletInit(true);
                    XWG.SDK.open();
                    break;
                case "bind":
                    var bindaddress = GlobalDataManager.getInstance().getBindAddress();
                    if(bindaddress == res.data)
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
        }
    }

    public walletLogin(walletName):void{
        var time = Date.now();
        var loginmsg = "login"+time;
        HTMLElementManager.getInstance().startLoadJson("walletConfig_json",function(){XWG.SDK.login(loginmsg,walletName,function(result){
            if(ErrorMananger.getInstance().checkReqResult(result)){
                return;
            }
            var obj = new Object();
            obj["address"] = result.account;
            obj["sign"] = result.sign;
            obj["time"] = time;
            var centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_WALLET_LOGIN,obj,true);
        });},this);
    }
}