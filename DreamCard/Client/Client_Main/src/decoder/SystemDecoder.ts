// TypeScript file
class SystemDecoder extends BaseDecoder{

    //方法前缀 
    public funcPrefix:string = "method_";

    //请重写该方法;
    public initDecoderFunction():void{
        //这里使用遍历枚举注册服务器监听方法
        let self = this;
        for(var key in CmdDef){
            var keyToAny:any = key;
            if(isNaN(keyToAny)){
                var anyType:any = CmdDef[key];
                var cEnum:CmdDef = anyType;
                var func:Function = self[self.funcPrefix+cEnum];
                if(func){
                    self.registerCmd(cEnum,func);
                }
            }
        }
    }

    public removeDecoderFunction():void{
        let self = this;
        for(var key in CmdDef){
            var keyToAny:any = key;
            if(isNaN(keyToAny)){
                var anyType:any = CmdDef[key];
                var cEnum:CmdDef = anyType;
                var func:Function = self[self.funcPrefix+cEnum];
                if(func){
                    self.unRegisterFunction(cEnum);
                }
            }
        }
    }
    
    //登录;
    private method_1(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var msg = data.msg;
        if(msg==null)
            return;

        var userInfo:any = msg.userInfo;
        if(userInfo){
            var account:AccountData = GlobalDataManager.getInstance().getAccountData();
            let ticket:string = userInfo.ticket;
            account.setTicket(ticket);
            GameConfig.ticket = ticket;
            egret.localStorage.setItem("ticket",ticket);
            let username: string = userInfo.username;
            account.setUName(username);
            let head_url:string = userInfo.head_url;
            account.setHead_Url(head_url);
            let nickName:string = userInfo.nickName;
            account.setNick(nickName);
            let gold:number = userInfo.gold;
            account.setGold(gold);
            let points:number = userInfo.points;
            account.setPoints(points);
            let lvl:number = userInfo.lvl;
            account.setLvl(lvl);
            let exp:number = userInfo.exp;
            account.setExp(exp);
            let upexp:number = userInfo.upexp;
            account.setUpexp(upexp);
            let muexp:number = userInfo.muexp;
            account.setMuexp(muexp);
            let etime:number = userInfo.etime;
            account.setEtime(etime);
            let vip:number = userInfo.vip;
            account.setVip(vip);
            let vip_st:number = userInfo.vip_st;
            account.setVip_St(vip_st);
            let hp:number = userInfo.hp;
            account.setHp(hp);
            let cost:number = userInfo.cost;
            account.setCost(cost);
            let guide_step = userInfo.guide_step;
            account.setGuide_Step(guide_step);
            //   GlobalDataManager.getInstance().setWalletAddress(userInfo.wallet);
            GlobalDataManager.getInstance().setBindAddress(userInfo.wallet);
        }

        var appConfig:any = msg.navigateTo;
        if(appConfig!=null){
            //跳转信息
            let id:number = appConfig.id;
            let name:string= appConfig.name;
            let ori:number = appConfig.ori;
            let jsVer:string = appConfig.jsVer;
            let resVer:string = appConfig.resVer;
            let attRes:string = appConfig.attRes;
            let pathStr:string = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
            let obj = new Object();
            obj["param"] = {playBGM:true};
            GMDManager.startGMD(id,obj);
        }else{
            var reconnect:any = msg.reconnect;
            if(reconnect!=null){
                var ruuid:string = reconnect.ruuid;
                GlobalDataManager.getInstance().setRUUID(ruuid);
                var room:string = reconnect.room;
                GlobalDataManager.getInstance().setRoom(room);

                GlobalDataManager.getInstance().setThredID(0);
                var scode:string = reconnect.scode;
                GlobalDataManager.getInstance().setGameServerName(scode);
                GlobalDataManager.getInstance().setGameOver(false);

                var surl:string = reconnect.surl;
                let server: ServerData = new ServerData();
                server.setSname(scode);
                server.setSurl(surl);
                server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                WebSocketManager.getInstance().registerServer(server);
                WebSocketManager.getInstance().connectServer(scode, true);
            }
        }

        UIManager.getInstance().hideUI(LoginView);

        


        
        // GameConfig.uid = ticket;

        // let sid:string = data.sid;
        // let surl:string = data.surl;
        // var server:ServerData = new ServerData();
        // server.setSname(sid);
        // GlobalDataManager.getInstance().setGameServerSID(sid);
        // server.setSurl(surl);
        // server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        // WebSocketManager.getInstance().registerServer(server);
        // if(WebSocketManager.getInstance().isConnect(sid)){
        //     WebSocketManager.getInstance().close(sid);
        // }
        
        // WebSocketManager.getInstance().connectServer(server.getSname(),true);

    }

    //注册;
    private method_2(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        var msg = data.msg;
        if(msg==null)
            return;
        var userInfo:any = msg.userInfo;
        if(userInfo){
            var account:AccountData = GlobalDataManager.getInstance().getAccountData();
            let ticket:string = userInfo.ticket;
            account.setTicket(ticket);
            GameConfig.ticket = ticket;
            egret.localStorage.setItem("ticket",ticket);
            let username: string = userInfo.username;
            account.setUName(username);
            let head_url:string = userInfo.head_url;
            account.setHead_Url(head_url);
            let nickName:string = userInfo.nickName;
            account.setNick(nickName);
            let gold:number = userInfo.gold;
            account.setGold(gold);
            let points:number = userInfo.points;
            account.setPoints(points);
            let lvl:number = userInfo.lvl;
            account.setLvl(lvl);
            let exp:number = userInfo.exp;
            account.setExp(exp);
            let upexp:number = userInfo.upexp;
            account.setUpexp(upexp);
            let muexp:number = userInfo.muexp;
            account.setMuexp(muexp);
            let etime:number = userInfo.etime;
            account.setEtime(etime);
            let vip:number = userInfo.vip;
            account.setVip(vip);
            let vip_st:number = userInfo.vip_st;
            account.setVip_St(vip_st);
            let hp:number = userInfo.hp;
            account.setHp(hp);
            let cost:number = userInfo.cost;
            account.setCost(cost);
            let guide_step = userInfo.guide_step;
            account.setGuide_Step(guide_step);
            //   GlobalDataManager.getInstance().setWalletAddress(userInfo.wallet);
            GlobalDataManager.getInstance().setBindAddress(userInfo.wallet);
        }

        var appConfig:any = msg.navigateTo;
        if(appConfig!=null){
            //跳转信息
            let id:number = appConfig.id;
            let name:string= appConfig.name;
            let ori:number = appConfig.ori;
            let jsVer:string = appConfig.jsVer;
            let resVer:string = appConfig.resVer;
            let attRes:string = appConfig.attRes;
            let pathStr:string = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
            let obj = new Object();
            obj["param"] = {playBGM:true};
            GMDManager.startGMD(id,obj);
        }else{
            var reconnect:any = msg.reconnect;
            if(reconnect!=null){
                var ruuid:string = reconnect.ruuid;
                GlobalDataManager.getInstance().setRUUID(ruuid);
                var room:string = reconnect.room;
                GlobalDataManager.getInstance().setRoom(room);

                GlobalDataManager.getInstance().setThredID(0);
                var scode:string = reconnect.scode;
                GlobalDataManager.getInstance().setGameServerName(scode);
                GlobalDataManager.getInstance().setGameOver(false);

                var surl:string = reconnect.surl;
                let server: ServerData = new ServerData();
                server.setSname(scode);
                server.setSurl(surl);
                server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                WebSocketManager.getInstance().registerServer(server);
                WebSocketManager.getInstance().connectServer(scode, true);
            }
        }

        UIManager.getInstance().hideUI(LoginView);
        UIManager.getInstance().hideUI(RegisterView);
        // if(data.result==undefined||data.result!=GlobalDef.REQUEST_SUCCESS){
        //     var errors:any = RES.getRes("error_json");
        //     if(errors!=null&&errors!=undefined){
        //         var context:string = errors[data.result];
        //         if(context==null||context==undefined){
        //             context = "亲!发生未知错误,请重新尝试!";
        //         }
        //         PopManager.getInstance().showPromptBox(context,2,null,null);
        //     }
        //     return;
        // }

        // var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        // let ticket:string = data.ticket;
        // account.setTicket(ticket);
        // GameConfig.uid = ticket;

        // egret.localStorage.setItem("uname",GlobalDataManager.getInstance().getAccountText());
        // egret.localStorage.setItem("password",GlobalDataManager.getInstance().getPassWordText());

        

        // let sid:string = data.sid;
        // let surl:string = data.surl;
        // var server:ServerData = new ServerData();
        // server.setSname(sid);
        // GlobalDataManager.getInstance().setGameServerSID(sid);
        // server.setSurl(surl);
        // server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        // WebSocketManager.getInstance().registerServer(server);
        // if(WebSocketManager.getInstance().isConnect(sid)){
        //     WebSocketManager.getInstance().close(sid);
        // }
        // WebSocketManager.getInstance().connectServer(server.getSname(),true);

    }

    private method_3(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var msg = data.msg;
        if(msg==null||msg.type==null)
            return;
        var type:number = msg.type;
        if(type==0){
            let loginView: LoginView = UIManager.getInstance().getViewByName(LoginView) as LoginView;
            if(loginView)
                loginView.setSMSCode(msg.code);
        }else if(type==1){
            let registerView: RegisterView = UIManager.getInstance().getViewByName(RegisterView) as RegisterView;
            if(registerView)
                registerView.setSMSCode(msg.code);
        }else if(type==2){
            let forgotView: ForgotView = UIManager.getInstance().getViewByName(ForgotView) as ForgotView;
            if(forgotView)
                forgotView.setSMSCode(msg.code);
        }
    }


    private method_4(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let forgotView: ForgotView = UIManager.getInstance().getViewByName(ForgotView) as ForgotView;
        if(forgotView)
            forgotView.onResetPasswordComplete();
    }


    private method_5(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var msg:any = data.msg;
        if(msg==null)
            return;
        
        var state:number = msg.state;
        if(state!=null&&state==0){
            egret.localStorage.setItem("ticket","");
            UIManager.getInstance().showUI(LoginView);
        }else{
            var userInfo:any = msg.userInfo;
            if(userInfo){
                var account:AccountData = GlobalDataManager.getInstance().getAccountData();
                let ticket:string = userInfo.ticket;
                account.setTicket(ticket);
                GameConfig.ticket = ticket;
                egret.localStorage.setItem("ticket",ticket);
                let username: string = userInfo.username;
                account.setUName(username);
                let head_url:string = userInfo.head_url;
                account.setHead_Url(head_url);
                let nickName:string = userInfo.nickName;
                account.setNick(nickName);
                let gold:number = userInfo.gold;
                account.setGold(gold);
                let points:number = userInfo.points;
                account.setPoints(points);
                let lvl:number = userInfo.lvl;
                account.setLvl(lvl);
                let exp:number = userInfo.exp;
                account.setExp(exp);
                let upexp:number = userInfo.upexp;
                account.setUpexp(upexp);
                let muexp:number = userInfo.muexp;
                account.setMuexp(muexp);
                let etime:number = userInfo.etime;
                account.setEtime(etime);
                let vip:number = userInfo.vip;
                account.setVip(vip);
                let vip_st:number = userInfo.vip_st;
                account.setVip_St(vip_st);
                let hp:number = userInfo.hp;
                account.setHp(hp);
                let cost:number = userInfo.cost;
                account.setCost(cost);
                let guide_step = userInfo.guide_step;
                account.setGuide_Step(guide_step);
                //   GlobalDataManager.getInstance().setWalletAddress(userInfo.wallet);
            GlobalDataManager.getInstance().setBindAddress(userInfo.wallet);
            }

            var appConfig:any = msg.navigateTo;
            if(appConfig!=null){
                //跳转信息
                let id:number = appConfig.id;
                let name:string= appConfig.name;
                let ori:number = appConfig.ori;
                let jsVer:string = appConfig.jsVer;
                let resVer:string = appConfig.resVer;
                let attRes:string = appConfig.attRes;
                let pathStr:string = appConfig.path;
                //直接进游戏,后面需要合并其他游戏的时候再做处理;
                GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
                let obj = new Object();
                obj["param"] = {playBGM:false};
                GMDManager.startGMD(id,obj);
            }else{
                var reconnect:any = msg.reconnect;
                if(reconnect!=null){
                    var ruuid:string = reconnect.ruuid;
                    GlobalDataManager.getInstance().setRUUID(ruuid);
                    var room:string = reconnect.room;
                    GlobalDataManager.getInstance().setRoom(room);

                    GlobalDataManager.getInstance().setThredID(0);
                    var scode:string = reconnect.scode;
                    GlobalDataManager.getInstance().setGameServerName(scode);
                    GlobalDataManager.getInstance().setGameOver(false);

                    var surl:string = reconnect.surl;
                    let server: ServerData = new ServerData();
                    server.setSname(scode);
                    server.setSurl(surl);
                    server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                    WebSocketManager.getInstance().registerServer(server);
                    WebSocketManager.getInstance().connectServer(scode, true);
                }
            }

            UIManager.getInstance().hideUI(LoginView);
        }
    }
    private method_7(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg = data.msg;
        if(msg==null)
            return;

        var userInfo:any = msg.userInfo;
        if(userInfo){
            var account:AccountData = GlobalDataManager.getInstance().getAccountData();
            let ticket:string = userInfo.ticket;
            account.setTicket(ticket);
            GameConfig.ticket = ticket;
            egret.localStorage.setItem("ticket",ticket);
            let username: string = userInfo.username;
            account.setUName(username);
            let head_url:string = userInfo.head_url;
            account.setHead_Url(head_url);
            let nickName:string = userInfo.nickName;
            account.setNick(nickName);
            let gold:number = userInfo.gold;
            account.setGold(gold);
            let points:number = userInfo.points;
            account.setPoints(points);
            let lvl:number = userInfo.lvl;
            account.setLvl(lvl);
            let exp:number = userInfo.exp;
            account.setExp(exp);
            let upexp:number = userInfo.upexp;
            account.setUpexp(upexp);
            let muexp:number = userInfo.muexp;
            account.setMuexp(muexp);
            let etime:number = userInfo.etime;
            account.setEtime(etime);
            let vip:number = userInfo.vip;
            account.setVip(vip);
            let vip_st:number = userInfo.vip_st;
            account.setVip_St(vip_st);
            let hp:number = userInfo.hp;
            account.setHp(hp);
            let cost:number = userInfo.cost;
            account.setCost(cost);
            let guide_step = userInfo.guide_step;
            account.setGuide_Step(guide_step);
            //   GlobalDataManager.getInstance().setWalletAddress(userInfo.wallet);
            GlobalDataManager.getInstance().setBindAddress(userInfo.wallet);
        }

        var appConfig:any = msg.navigateTo;
        if(appConfig!=null){
            //跳转信息
            let id:number = appConfig.id;
            let name:string= appConfig.name;
            let ori:number = appConfig.ori;
            let jsVer:string = appConfig.jsVer;
            let resVer:string = appConfig.resVer;
            let attRes:string = appConfig.attRes;
            let pathStr:string = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
            let obj = new Object();
            obj["param"] = {playBGM:true};
            GMDManager.startGMD(id,obj);
        }else{
            var reconnect:any = msg.reconnect;
            if(reconnect!=null){
                var ruuid:string = reconnect.ruuid;
                GlobalDataManager.getInstance().setRUUID(ruuid);
                var room:string = reconnect.room;
                GlobalDataManager.getInstance().setRoom(room);

                GlobalDataManager.getInstance().setThredID(0);
                var scode:string = reconnect.scode;
                GlobalDataManager.getInstance().setGameServerName(scode);
                GlobalDataManager.getInstance().setGameOver(false);

                var surl:string = reconnect.surl;
                let server: ServerData = new ServerData();
                server.setSname(scode);
                server.setSurl(surl);
                server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                WebSocketManager.getInstance().registerServer(server);
                WebSocketManager.getInstance().connectServer(scode, true);
            }
        }

        UIManager.getInstance().hideUI(LoginView);
    }

    private method_8(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var msg = data.msg;
        if(msg==null||msg.type==null)
            return;
        var type:number = msg.type;
        if(type==0){
            let loginView: LoginView = UIManager.getInstance().getViewByName(LoginView) as LoginView;
            if(loginView)
                loginView.setEmailVCode(msg.code);
        }else if(type==1){
            let registerView: RegisterView = UIManager.getInstance().getViewByName(RegisterView) as RegisterView;
            if(registerView)
                registerView.setEmailVCode(msg.code);
        }else if(type==2){
            let forgotView: ForgotView = UIManager.getInstance().getViewByName(ForgotView) as ForgotView;
            if(forgotView)
                forgotView.setEmailVCode(msg.code);
        }
    }

    // private method_100(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;

    //     // var account:AccountData = GlobalDataManager.getInstance().getAccountData();

    //     // let head_image:string = data.head_image;
    //     // account.setHead_Image(head_image);
    //     // let sex:number = data.sex;
    //     // account.setSex(sex);

    //     // let gkid:number = data.gkid;
    //     // var gameName:string= data.gn;
    //     // let startGKID:number = data.sgkid;
    //     // //直接进游戏,后面需要合并其他游戏的时候再做处理;
    //     // console.log(`**********从这里进去**********`);
    //     // GMDManager.addGMDInfo(gkid,gameName,0,null,"0");  
    //     // let obj = new Object();
    //     // obj["dt"] = 2;
    //     // obj["param"] = {};
    //     // GMDManager.startGMD(startGKID,obj);
    //     // UIManager.getInstance().hideUI(LoginView);
    // }
    //绑定钱包;
    private method_300(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data)){
            XWG.SDK.disconnect();
            return;
        }

        GlobalDataManager.getInstance().setBindAddress(data.msg.address);
    }
    private method_301(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
    }
    private method_302(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
    }
    private method_303(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
    }
    private method_304(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
    }

    private method_1000(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var obj:any = data.msg;
        // var gameInfo:any = obj.gameInfo;
        var appConfig:any = obj.navigateTo;
        if(appConfig){
            GMDManager.closeGMD();

            //跳转信息
            let id:number = appConfig.id;
            let name:string= appConfig.name;
            let ori:number = appConfig.ori;
            let jsVer:string = appConfig.jsVer;
            let resVer:string = appConfig.resVer;
            let attRes:string = appConfig.attRes;
            let pathStr:string = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
            let obj = new Object();
            obj["param"] = {playBGM:true};//gameInfo;
            GMDManager.startGMD(id,obj);

            UIManager.getInstance().hideUI(LoadingRView);
            
            if(UIManager.getInstance().checkHasViewByName("MatchingView"))
                UIManager.getInstance().hideUI("MatchingView");
        }else{
            //这里写不能跳转的错误提示;
        }
    }


    private method_1100(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        WebSocketManager.getInstance().onRecvHeartBeat(data.msg);
    }

    private method_960(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM,data.msg);
    }

    private method_961(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_CLOSE_ROOM,data.msg);
    }

    private method_962(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE,data.msg);
    }

    private method_965(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_MANY_CREATE_ROOM,data.msg);
    }

    private method_980(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        UIManager.getInstance().hideUI(LoadingRView);
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GAME_CONNECT,data.msg);
    }

    private method_981(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_DATA,data.msg);
    }

    private method_982(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        UIManager.getInstance().hideUI(LoadingRView);
        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_DETAIL,data.msg);
    }

    private method_983(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA,data.msg);
    }

    private method_984(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD,data.msg);
    }

    private method_985(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let debugView: DebugView = UIManager.getInstance().getViewByName(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_BATTLE_INFO,data.msg);
    }
    
}