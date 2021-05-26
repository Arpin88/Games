// TypeScript file
class GlobalDataManager{
    private static m_manager:GlobalDataManager = new GlobalDataManager();
    public static getInstance():GlobalDataManager{
        return GlobalDataManager.m_manager;
    }

    //客户端配置信息;
    private gameConfig:any = null;
    //当前中心服务器信息
    private centerServer: ServerData = null;

    private status:number;

    // private accountText:string;  //记录账户;
    // private passWordText:string; //记录密码;
    private isConnect:boolean;  //是否为重连;

    //分配线程的编号;
    private thredID:number;   
    //游戏服务器名称;  
    private gameServerName:string;  

    //人物信息;
    private account:AccountData = new AccountData();
    // 羁绊信息
    private jibanData:JiBanData = new JiBanData();

    //房间的UID
    private ruuid:string;
    //房间号
    private room:string;
    //游戏结算
    private gameover:boolean;
    //钱包初始化
    private walletinit:boolean;

    //钱包名称
    private walletName:string = "";

    private walletaddress:string;

    // 注册状态
    private isRegist:number = 0;
    public setIsRegist(isRegist:any):void{
        this.isRegist = isRegist;
    }

    public getIsRegist(): number {
        return this.isRegist;
    }

    public setWalletAddress(walletaddress:any):void{
        this.walletaddress = walletaddress;
    }

    public getWalletAddress(): string {
        return this.walletaddress;
    }

    public getGameConfig():any{
        return this.gameConfig;
    }

    public setGameConfig(gameConfig:any):void{
        this.gameConfig = gameConfig;
    }

    public getCenterServer(): ServerData {
        return this.centerServer;
    }

    public setCenterServer(centerServer: ServerData) {
        this.centerServer = centerServer;
    }

    public getStatus():number{
        return this.status;
    }

    public setStatus(status:number){
        this.status = status;
    }

    // public setAccountText(str:string):void{
    //     this.accountText = str;
    // }

    // public getAccountText():string{
    //     return this.accountText;
    // }

    // public setPassWordText(str:string):void{
    //     this.passWordText = str;
    // }
    
    // public getPassWordText():string{
    //     return this.passWordText;
    // }

    public getAccountData():AccountData{
        return this.account;
    }

    public getJiBanData():JiBanData{
        return this.jibanData;
    }

    public getIsConnect():boolean{
        return this.isConnect;
    }

    public setIsConnect(isConnect:boolean){
        this.isConnect = isConnect;
    }

    public getThredID():number{
        return this.thredID;
    }

    public setThredID(thredID:number){
        this.thredID = thredID;
    }

    public getGameServerName():string{
        return this.gameServerName;
    }

    public setGameServerName(name:string):void{
        this.gameServerName = name;
    }

    public getRUUID():string{
        return this.ruuid;
    }

    public setRUUID(ruuid:string):void{
        this.ruuid = ruuid;
    }

    public getRoom():string{
        return this.room;
    }

    public setRoom(room:string):void{
        this.room = room;
    }

    public getGameOver():boolean{
        return this.gameover;
    }

    public setGameOver(gameover:boolean):void{
        this.gameover = gameover;
    }

    public getWalletInit():boolean{
        return this.walletinit;
    }
    public setWalletInit(isInit:boolean):void{
        this.walletinit = isInit;
    }


    public getWalletName():string{
        if(this.walletName==null)
            return "";
        if(this.walletName==""){
            var wName:string = egret.localStorage.getItem("walletName");
            if(wName!=null)
                this.walletName = wName;
        }
        return this.walletName;
    }
    public setWalletName(walletName:string):void{
        egret.localStorage.setItem("walletName",walletName);
        this.walletName = walletName;
    }
}