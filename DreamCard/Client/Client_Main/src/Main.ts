//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    public static ver:string = "";
    public static defVer:string = "1";
    public static url:string = "";
    public static res:string = "resource";
    public static gRes:string = "res-";

    public constructor(){
        super();
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB){
            RES.registerVersionController( new WebVerController() );
        }
    }

    protected createChildren(): void {
        super.createChildren();

        GameConfig.gameScene();
        //注入自定义的素材解析器;
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);

        //-1自动识别系统语言 0中文 1英文
        egret.localStorage.setItem("langtype","-1");
        var resPath:string = Main.res + LanguageManager.getInstance().getLanguagePath()+"/";

        //初始化Resource资源加载;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig(resPath + "default.res.json",resPath);
    }

    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        
        UITheme.loadConf(Main.res + LanguageManager.getInstance().getLanguagePath() + "/theme.json",this.onThemeLoadComplete,this);
    }


    private onThemeLoadComplete():void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);

        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void{
        if(event.groupName=="preload"){
            RES.loadGroup("login");
        }else if(event.groupName=="login"){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);

            this.createGameScene();
        }
    }

    private onResourceLoadError(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
    }

    private onResourceProgress(event:RES.ResourceEvent):void{
        
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.initData();

        //检测自动登录
        var ticket:string = egret.localStorage.getItem("ticket");
        if(ticket==null||ticket=="")
            UIManager.getInstance().showUI(LoginView);
        else{
            GameConfig.ticket = ticket;
            let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_CHECK_LOGIN,{},true);
        }
    }

    //初始化数据;
    private initData():void{
        this.initDecoder();
        this.initManager();
        this.initResolver();
    }

    private initDecoder():void{
        var decode:BaseDecode = BaseDecode.getInstance();
        decode.registerDecoder(new SystemDecoder());
        // decode.registerDecoder(new ErrorDecoder());
    }

    private initManager(){
        UIManager.getInstance();
        HttpManager.getInstance();
        WebSocketManager.getInstance();
    }

    private initResolver(){
        var configs:any = RES.getRes("gameConfig_json");
        GlobalDataManager.getInstance().setGameConfig(configs);

        var index:number = Math.floor(Math.random()*configs.servers.length);
        var config:any = configs.servers[index];
        //注册JSON解析器;
        var resolver:IResolver = new JsonResolver(JsonResolver.NAME);
        resolver.registerPackageData(new TextPackageData());
        HttpManager.getInstance().registerResolver(resolver);
        WebSocketManager.getInstance().registerResolver(resolver);
        DebugWebSocketManager.getInstance().registerResolver(resolver);
        //新的服务器设置开始,以后弄个文件下载;
        var server:ServerData = new ServerData();
        server.setSname(config.sname);
        server.setHost(config.host);
        server.setPort(config.port);
        server.setType(config.type);
        server.setResolver(HttpManager.getInstance().getResolver(JsonResolver.NAME));
        server.setHurl(config.hurl);
        HttpManager.getInstance().registerServer(server);

        GlobalDataManager.getInstance().setCenterServer(server);

        // var self =this;
        // var curWidth:number = self.$stage.stageWidth;
        // var curHeight:number = self.$stage.stageHeight;
        // console.log(curWidth+"  "+curHeight );
    }

}