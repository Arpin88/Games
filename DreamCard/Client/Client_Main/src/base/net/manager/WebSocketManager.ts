// TypeScript file
class WebSocketManager extends NetBase{

    private static m_manager:WebSocketManager = new WebSocketManager();
    public static getInstance():WebSocketManager{
        return WebSocketManager.m_manager;
    }


    private m_sname:string;
    private m_timer_heart_beat:egret.Timer = new egret.Timer(8000,0);
    private checkOvertime:number = 10000;
    private recordServerTime:number = -1;
    private m_needPop:boolean = true;
    private reconnectHandler:Handler;

    //设置是否弹框
    public setPopStatus(pstatus:boolean):void{
        this.m_needPop = pstatus;
    }

    //设置重连回调
    public setReconnectHandler(reconnectHandler:Handler):void{
        this.reconnectHandler = reconnectHandler;
    }


    //连接服务器
    public connectServer(sname:string,showModel:boolean = true){
        //添加LOAD界面!
        if(showModel){
            UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
        }

        let server:ServerData = this.getServerByName(sname);
        let resolerType:string = server.getResolverType();
        let socket:egret.WebSocket = server.getSocket();
        this.close(sname);

        this.recordServerTime = -1;
        
        server.setSocket(new egret.WebSocket());
        if(resolerType==ProtoBufResolver.NAME)
        {
            server.getSocket().type = egret.WebSocket.TYPE_BINARY;
        }
        else if(resolerType==JsonResolver.NAME)
        {
            server.getSocket().type = egret.WebSocket.TYPE_STRING;
        }

        if(!server.getSocket().hasEventListener(egret.ProgressEvent.SOCKET_DATA)){
            server.getSocket().addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        }
        if(!server.getSocket().hasEventListener(egret.Event.CONNECT)){
            server.getSocket().addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        }
        if(!server.getSocket().hasEventListener(egret.IOErrorEvent.IO_ERROR)){
            server.getSocket().addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        }
        if(!server.getSocket().hasEventListener(egret.Event.CLOSE)){
            server.getSocket().addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
        }

        this.m_sname = sname;
        server.getSocket().connectByUrl(server.getSurl());

        if(!this.m_timer_heart_beat.hasEventListener(egret.TimerEvent.TIMER)){
            this.m_timer_heart_beat.addEventListener(egret.TimerEvent.TIMER,this.onTimerSendHeartBeat,this);
        }

    }

    //连接成功返回;
    private onSocketOpen(e: egret.Event):void{

        let socket:egret.WebSocket =e.currentTarget;
        let self = this;

        this.setPopStatus(true);
        // let custom:CustomGameData = GlobaDataManager.getInstance().GetMyBureauData();
        let obj = new Object();
        // obj["key"] = new MD5().hex_md5(GlobalDataManager.getInstance().getAccountData().getTicket() + "_" + GameConfig.key);
        // obj["t"] = GlobalDataManager.getInstance().getAccountData().getTicket();
        obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
        obj["room"] = GlobalDataManager.getInstance().getRoom();
        let server:ServerData = self.getServerBySocket(socket);
        WebSocketManager.getInstance().sendMessage(server.getSname(),CmdDef.CMD_GAME_CONNECT,obj,false,false);

        try{
            if(!this.m_timer_heart_beat.running){
                this.m_timer_heart_beat.start();
            }
        }catch(error){

        }

    }

    //接受函数;
    private onReceiveMessage(e:egret.Event):void{
        let socket:egret.WebSocket = e.currentTarget;
        let server:ServerData = this.getServerBySocket(socket);
        if(!server){
            this.onIOError();
        }else{
            let data:string = socket.readUTF();
            server.getResolver().decode(data);
        }
    }

    //关闭函数;
    private onSocketClose():void{
        var self = this;
        if(self.m_timer_heart_beat.running){
            self.m_timer_heart_beat.stop();
        }
        if(GlobalDataManager.getInstance().getGameOver())   //如果是游戏结束服务器强制关闭socket则不需要检测弹框
            return;
        
        this.onIOError();
    }

    //错误函数;
    private onIOError():void{
        let self = this;
        if(self.m_timer_heart_beat.running){
            self.m_timer_heart_beat.stop();
        }

        if(self.m_needPop){
            self.showReconnectPopup();
        }
    }

    private showReconnectPopup():void{
        var self = this;
        var context:string = "您已断开连接. \n请重新连接游戏!";
        var errors:any = RES.getRes("error_json");
        if(errors!=null&&errors!=undefined)
            context = errors["-997"]==null?context:errors["-997"];
        //弹出提示UI
        PopManager.getInstance().showPromptBox(context,2,Handler.create(self,function(confirm:boolean){
            // if(confirm){
                GlobalDataManager.getInstance().setIsConnect(true);
                self.reconnect();
            // }else{
            //     UIManager.getInstance().removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.BOM_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.POP_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
            //     GMDManager.closeGMD();

            //     UIManager.getInstance().showUI(LoginView,GameScene.VIEW_LAYER_NUMBER);
            // }
        }),[errors["-996"]==null?"重连游戏":errors["-996"]]);
    }

    //向服务器端发送消息;
    public sendMessage(sname:string,cmd:number,data:any,showModel:boolean = false,m:boolean = false):void{
        let server:ServerData = this.getServerByName(sname);
        if(!server){
            return;
        }

        //添加LOAD界面
        if(showModel){
            UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
        }
        let socket = server.getSocket();
        if(socket){
            data = server.getResolver().parse(cmd,GlobalDataManager.getInstance().getThredID(),data,m);
            let resolverType:string = server.getResolverType();
            if(resolverType==JsonResolver.NAME){
                server.getSocket().writeUTF(data);
            } else if(resolverType == ProtoBufResolver.NAME){
                server.getSocket().writeBytes(data);
            }
            server.getSocket().flush();
        }
    }

    public sendCSMsg(cmd:number,data:any,showModel:boolean =false,m:boolean =false):void{
        
    }

    public sendGSMsg(cmd:number,data:any,showModel:boolean =false,m:boolean = false):void{

    }

    public isConnect(sname:string):boolean{
        let server:ServerData = this.getServerByName(sname);
        if(server&&server.getSocket()){
            return server.getSocket().connected;
        }
        return false;
    }

    public close(sname:string):void{
        if(this.m_timer_heart_beat.running){
            this.m_timer_heart_beat.stop();
        }
        let server:ServerData = this.getServerByName(sname);
        if(server&&server.getSocket()){
            server.getSocket().close();
            if(server.getSocket().hasEventListener(egret.ProgressEvent.SOCKET_DATA)){
                server.getSocket().removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
            }
            if(server.getSocket().hasEventListener(egret.Event.CONNECT)){
                server.getSocket().removeEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
            }
            if(server.getSocket().hasEventListener(egret.IOErrorEvent.IO_ERROR)){
                server.getSocket().removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
            }
            if(server.getSocket().hasEventListener(egret.Event.CLOSE)){
                server.getSocket().removeEventListener(egret.Event.CLOSE,this.onSocketClose,this);
            }
            server.setSocket(null);
        }
    }

    private onTimerSendHeartBeat(e:egret.TimerEvent):void{
        var a:boolean = this.isConnect(this.m_sname);
        if(!a){
            this.onIOError();
        }
        let array_server_data:Array<ServerData> = this.getWebSocketServers();
        for(let key in array_server_data){
            let server:ServerData = array_server_data[key];
            let obj:Object = new Object();
            obj["cmd"] = CmdDef.CMD_CLIENT_HEART_BEAT;
            obj["data"] = {};
            obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
            obj["room"] = GlobalDataManager.getInstance().getRoom();
            this.sendMessage(server.getSname(),CmdDef.CMD_CLIENT_HEART_BEAT,obj,false);
        }
    }

    public onRecvHeartBeat(data:any):void{
        if(data==null)
            return;
        
        var ctime:number = data.ctime;
        var self = this;
        if(self.recordServerTime!=-1&&(ctime-self.recordServerTime)>self.checkOvertime){
            self.showReconnectPopup();
        }
        self.recordServerTime = ctime;
    }

    //重连
    public reconnect():void{
        var self = this;
        self.recordServerTime=-1;
        if(self.reconnectHandler==null)
            return;
        
        self.reconnectHandler.run();
    }
}