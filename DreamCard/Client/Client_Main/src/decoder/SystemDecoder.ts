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
            let s_id:number = userInfo.s_id;
            GameConfig.serverId = s_id;
            egret.localStorage.setItem("server_id",s_id+"");
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
            let guide_step = GlobalDef.OPEN_GUIDE?userInfo.guide_step:"";
            account.setGuide_Step(guide_step);
            let ppsd:string = userInfo.ppsd;
            account.setPSD(ppsd); // 支付密码
            let token:string = userInfo.token;
            account.setToken(token);
            let wallet:string = userInfo.wallet;
            account.setWallet(wallet);
            let phone:string = userInfo.phone;
            account.setPhone(phone); 
            let areano:string = userInfo.areano;
            account.setAreano(areano); 
            let email:string = userInfo.email;
            account.setEmail(email);
            let wallet_secret:string = userInfo.wallet_secret;
            account.setWalletSecret(wallet_secret);
        }

        GameEventManager.getInstance().dispatchEvent(GameEvent.NeedGetLoginData);

        // var appConfig:any = msg.navigateTo;
        // if(appConfig!=null){
        //     //跳转信息
        //     let id:number = appConfig.id;
        //     let name:string= appConfig.name;
        //     let ori:number = appConfig.ori;
        //     let jsVer:string = appConfig.jsVer;
        //     let resVer:string = appConfig.resVer;
        //     let attRes:string = appConfig.attRes;
        //     let pathStr:string = appConfig.path;
        //     //直接进游戏,后面需要合并其他游戏的时候再做处理;
        //     GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
        //     let obj = new Object();
        //     obj["param"] = {playBGM:true};
        //     GMDManager.startGMD(id,obj);
        // }else{
        //     var reconnect:any = msg.reconnect;
        //     if(reconnect!=null){
        //         var ruuid:string = reconnect.ruuid;
        //         GlobalDataManager.getInstance().setRUUID(ruuid);
        //         var room:string = reconnect.room;
        //         GlobalDataManager.getInstance().setRoom(room);

        //         GlobalDataManager.getInstance().setThredID(0);
        //         var scode:string = reconnect.scode;
        //         GlobalDataManager.getInstance().setGameServerName(scode);
        //         GlobalDataManager.getInstance().setGameOver(false);

        //         var surl:string = reconnect.surl;
        //         let server: ServerData = new ServerData();
        //         server.setSname(scode);
        //         server.setSurl(surl);
        //         server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        //         WebSocketManager.getInstance().registerServer(server);
        //         WebSocketManager.getInstance().connectServer(scode, true);
        //     }
        // }

        // UIManager.getInstance().hideUI(LoginView);

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
            let s_id:number = userInfo.s_id;
            GameConfig.serverId = s_id;
            egret.localStorage.setItem("server_id",s_id+"");
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
            let guide_step:string = GlobalDef.OPEN_GUIDE?userInfo.guide_step:"";
            account.setGuide_Step(guide_step);
            let ppsd:string = userInfo.ppsd;
            account.setPSD(ppsd); // 支付密码
            let token:string = userInfo.token;
            account.setToken(token);
            let wallet:string = userInfo.wallet;
            account.setWallet(wallet);
            let phone = userInfo.phone;
            account.setPhone(phone); 
            let areano:string = userInfo.areano;
            account.setAreano(areano); 
            let email:string = userInfo.email;
            account.setEmail(email); 
            let wallet_secret:string = userInfo.wallet_secret;
            account.setWalletSecret(wallet_secret);
        }

         GameEventManager.getInstance().dispatchEvent(GameEvent.NeedGetLoginData);
        // var appConfig:any = msg.navigateTo;
        // if(appConfig!=null){
        //     //跳转信息
        //     let id:number = appConfig.id;
        //     let name:string= appConfig.name;
        //     let ori:number = appConfig.ori;
        //     let jsVer:string = appConfig.jsVer;
        //     let resVer:string = appConfig.resVer;
        //     let attRes:string = appConfig.attRes;
        //     let pathStr:string = appConfig.path;
        //     //直接进游戏,后面需要合并其他游戏的时候再做处理;
        //     GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
        //     let obj = new Object();
        //     obj["param"] = {playBGM:true};
        //     GMDManager.startGMD(id,obj);
        // }else{
        //     var reconnect:any = msg.reconnect;
        //     if(reconnect!=null){
        //         var ruuid:string = reconnect.ruuid;
        //         GlobalDataManager.getInstance().setRUUID(ruuid);
        //         var room:string = reconnect.room;
        //         GlobalDataManager.getInstance().setRoom(room);

        //         GlobalDataManager.getInstance().setThredID(0);
        //         var scode:string = reconnect.scode;
        //         GlobalDataManager.getInstance().setGameServerName(scode);
        //         GlobalDataManager.getInstance().setGameOver(false);

        //         var surl:string = reconnect.surl;
        //         let server: ServerData = new ServerData();
        //         server.setSname(scode);
        //         server.setSurl(surl);
        //         server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        //         WebSocketManager.getInstance().registerServer(server);
        //         WebSocketManager.getInstance().connectServer(scode, true);
        //     }
        // }

        // UIManager.getInstance().hideUI(LoginView);
        // UIManager.getInstance().hideUI(RegisterView);
        

    }

    private method_3(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var msg = data.msg;
        if(msg==null||msg.type==null)
            return;
        var type:number = msg.type;
        if(type==0){
            let loginView: LoginView = UIManager.getInstance().getView(LoginView) as LoginView;
            if(loginView)
                loginView.setSMSCode(msg.code);
            
            let LoginPhonView1: LoginPhonView = UIManager.getInstance().getView(LoginPhonView) as LoginPhonView;
            if(LoginPhonView1)
                LoginPhonView1.setSMSCode(msg.code);
        }else if(type==1){
            let registerView: RegisterView = UIManager.getInstance().getView(RegisterView) as RegisterView;
            if(registerView)
                registerView.setSMSCode(msg.code);
        }else if(type==2){
            let forgotView: ForgotView = UIManager.getInstance().getView(ForgotView) as ForgotView;
            if(forgotView)
                forgotView.setSMSCode(msg.code);
        }
    }


    private method_4(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let forgotView: ForgotView = UIManager.getInstance().getView(ForgotView) as ForgotView;
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
            egret.localStorage.setItem("server_id","0");
            GameConfig.ticket = "";
            GameConfig.serverId = 0;
            var type = PublicMethodManager.getInstance().getOSType()
            if(type != 1){
                UIManager.getInstance().showUI(LoginPhonView);  
            }else{
                UIManager.getInstance().showUI(LoginView);  // pc
            }
        }else{
            var userInfo:any = msg.userInfo;
            if(userInfo){
                var account:AccountData = GlobalDataManager.getInstance().getAccountData();
                let s_id:number = userInfo.s_id;
                GameConfig.serverId = s_id;
                egret.localStorage.setItem("server_id",s_id+"");
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
                let guide_step = GlobalDef.OPEN_GUIDE?userInfo.guide_step:"";
                account.setGuide_Step(guide_step);
                let ppsd:string = userInfo.ppsd;
                account.setPSD(ppsd); // 支付密码
                let token:string = userInfo.token;
                account.setToken(token);
                let wallet:string = userInfo.wallet;
                account.setWallet(wallet);
                let phone:string = userInfo.phone;
                account.setPhone(phone); 
                let areano:string = userInfo.areano;
                account.setAreano(areano); 
                let email:string = userInfo.email;
                account.setEmail(email); 
                let wallet_secret:string = userInfo.wallet_secret;
                account.setWalletSecret(wallet_secret);
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
            let s_id:number = userInfo.s_id;
            GameConfig.serverId = s_id;
            egret.localStorage.setItem("server_id",s_id+"");
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
            let guide_step:string = GlobalDef.OPEN_GUIDE?userInfo.guide_step:"";
            account.setGuide_Step(guide_step);
            let ppsd:string = userInfo.ppsd;
            account.setPSD(ppsd); // 支付密码
            let token:string = userInfo.token;
            account.setToken(token);
            let wallet:string = userInfo.wallet;
            account.setWallet(wallet);
            let phone:string = userInfo.phone;
            account.setPhone(phone); 
            let areano:string = userInfo.areano;
            account.setAreano(areano); 
            let email:string = userInfo.email;
            account.setEmail(email); 
            let wallet_secret:string = userInfo.wallet_secret;
            account.setWalletSecret(wallet_secret);
        }

        GameEventManager.getInstance().dispatchEvent(GameEvent.NeedGetLoginData);
        // var appConfig:any = msg.navigateTo;
        // if(appConfig!=null){
        //     //跳转信息
        //     let id:number = appConfig.id;
        //     let name:string= appConfig.name;
        //     let ori:number = appConfig.ori;
        //     let jsVer:string = appConfig.jsVer;
        //     let resVer:string = appConfig.resVer;
        //     let attRes:string = appConfig.attRes;
        //     let pathStr:string = appConfig.path;
        //     //直接进游戏,后面需要合并其他游戏的时候再做处理;
        //     GMDManager.addGMDInfo(id,name,ori,jsVer,resVer,pathStr,attRes);
        //     let obj = new Object();
        //     obj["param"] = {playBGM:true};
        //     GMDManager.startGMD(id,obj);
        // }else{
        //     var reconnect:any = msg.reconnect;
        //     if(reconnect!=null){
        //         var ruuid:string = reconnect.ruuid;
        //         GlobalDataManager.getInstance().setRUUID(ruuid);
        //         var room:string = reconnect.room;
        //         GlobalDataManager.getInstance().setRoom(room);

        //         GlobalDataManager.getInstance().setThredID(0);
        //         var scode:string = reconnect.scode;
        //         GlobalDataManager.getInstance().setGameServerName(scode);
        //         GlobalDataManager.getInstance().setGameOver(false);

        //         var surl:string = reconnect.surl;
        //         let server: ServerData = new ServerData();
        //         server.setSname(scode);
        //         server.setSurl(surl);
        //         server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        //         WebSocketManager.getInstance().registerServer(server);
        //         WebSocketManager.getInstance().connectServer(scode, true);
        //     }
        // }

        // UIManager.getInstance().hideUI(LoginView);
    }

    private method_8(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var msg = data.msg;
        if(msg==null||msg.type==null)
            return;
        var type:number = msg.type;
        if(type==0){
            let loginView: LoginView = UIManager.getInstance().getView(LoginView) as LoginView;
            if(loginView)
                loginView.setEmailVCode(msg.code);

                let LoginPhonView1: LoginPhonView = UIManager.getInstance().getView(LoginPhonView) as LoginPhonView;
            if(LoginPhonView1)
                LoginPhonView1.setSMSCode(msg.code);
                
        }else if(type==1){
            let registerView: RegisterView = UIManager.getInstance().getView(RegisterView) as RegisterView;
            if(registerView)
                registerView.setEmailVCode(msg.code);
        }else if(type==2){
            let forgotView: ForgotView = UIManager.getInstance().getView(ForgotView) as ForgotView;
            if(forgotView)
                forgotView.setEmailVCode(msg.code);
        }
    }

    //注册;
    private method_11(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        var msg = data.msg;
        if(msg==null)
            return;
        
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
    }


    //更新用户金额
    private method_12(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
            
        var msg:any = data.msg;
        if(msg!=null){
            var gold:number = msg.gold;
            var account:AccountData = GlobalDataManager.getInstance().getAccountData();
            if(account!=null&&gold!=null){
                GlobalDataManager.getInstance().getAccountData().setGold(gold);
                GameEventManager.getInstance().dispatchEvent(GameEvent.updateGold);
            }
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
            // XWG.SDK.disconnect();
            return;
        }

        GlobalDataManager.getInstance().getAccountData().setWallet(data.msg.address);
        GameEventManager.getInstance().dispatchEvent(GameEvent.UpdateBindAddress);
    }
    private method_301(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
    }
    private method_302(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg:any = data.msg;
        if(msg!=null){
            var gold:number = msg.gold;
            var account:AccountData = GlobalDataManager.getInstance().getAccountData();
            if(account!=null&&gold!=null){
                GlobalDataManager.getInstance().getAccountData().setGold(gold);
                GameEventManager.getInstance().dispatchEvent(GameEvent.updateGold);
            }
        }

    }
    // private method_303(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    // }
    // private method_304(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    // }

    private method_1000(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        var obj:any = data.msg;
        // var gameInfo:any = obj.gameInfo;^
        var appConfig:any = obj.navigateTo;
        if(appConfig){
            GMDManager.closeGMD();
            UIManager.getInstance().hideUI(LoadingRView);
            GameEventManager.getInstance().dispatchEvent(GameEvent.OnConnectWebSocketComplete);

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
        
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM,data.msg);
    }

    private method_961(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_CLOSE_ROOM,data.msg);
    }

    private method_962(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE,data.msg);
    }

    private method_965(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_MANY_CREATE_ROOM,data.msg);
    }

    private method_980(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        UIManager.getInstance().hideUI(LoadingRView);
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GAME_CONNECT,data.msg);
    }

    private method_981(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_DATA,data.msg);
    }

    private method_982(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;
        UIManager.getInstance().hideUI(LoadingRView);
        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_DETAIL,data.msg);
    }

    private method_983(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA,data.msg);
    }

    private method_984(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD,data.msg);
    }

    private method_985(data:any):void{
        if(ErrorMananger.getInstance().checkReqResult(data))
            return;

        let debugView: DebugView = UIManager.getInstance().getView(DebugView) as DebugView;
        if(debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_BATTLE_INFO,data.msg);
    }
    
}