// TypeScript file
class LoginView extends BaseView{
    public static NAME:string = "LoginSkin";
    public constructor(){
        super(LoginView.NAME);
    }

    private groupLogin:eui.Group;

    private groupNormalLogin:eui.Group;     //正常账号登录层
    
    private groupPhone:eui.Group;
    private editPhone:eui.EditableText;
    private editVCode:eui.EditableText;
    private btnGetVCode:eui.Button;
    private lblVCodeTime:eui.Label;
    private groupSelAreano:eui.Group;
    private lblAreano:eui.Label;
    private groupAreano:eui.Group;
    private scrAreanoList:eui.Scroller;
    private groupAreanoList:eui.Group;
    
    private groupEmail:eui.Group;
    private editEmail:eui.EditableText;
    private editEmailVCode:eui.EditableText;
    private btnGetEmailVCode:eui.Button;
    private lblEmailVCodeTime:eui.Label;

    private groupPassword:eui.Group;
    private editUsername:eui.EditableText;
    private editPassword:eui.EditableText;
    private imgWatch:eui.Image;

    private btnLogin:eui.Button;
    private lblVCode:eui.Label;
    private lblPassword:eui.Label;
    private lblLicense:eui.Label;
    private lblAgreement:eui.Label;
    private imgCheckAgreement:eui.Image;

    private btnRegist:eui.Button;
    private btnForgot:eui.Button;

    private lblVersion:eui.Label;
    private lblBottom:eui.Label;
    private btnBackSLogin:eui.Button;   //返回选择登录按钮

    private groupSwitchLogin:eui.Group;     //选择登录层
    private btnXWGLogin:eui.Button;         //XWG登录按钮
    private btnMetaMaskLogin:eui.Button;   //MetaMask登录按钮
    private btnBinanceLogin:eui.Button;    //Binance登录按钮
    private btnPhoneLogin:eui.Button;      //手机登录按钮
    private btnEmailLogin:eui.Button;      //邮箱登录按钮
    private groupBtnPhoneLogin:eui.Group;
    private groupBtnEmailLogin:eui.Group;

    private curLoginType:number;   //当前选择登录方式 -手机登录 1邮箱登录
    private curPhoneLoginType:number;   //当前手机登录方式 0验证码登录 1密码登录 
    private curEmailLoginType:number;   //当前邮箱登录方式 0验证码登录 1密码登录
    private curConsentAgreement:boolean;    //当前是否同意协议
    private curPWInputType:number;  //当前密码输入类型 0不可视 1可视
    private curAreano:string;   //当前选择的区号
    private curAreanoItemView:AreanoItemView;   //当前选择的区号视图

    private timeCounter:number;     //时间计数器
    private timer:egret.Timer;      //定时器
    private timeDuration:number = 60;  //60秒
    
    private timeCounter1:number;     //时间计数器
    private timer1:egret.Timer;      //定时器

    private movingState:boolean = false;   //移动状态
    
    private labelObj:any;   //语言包

    protected week():void{
        var self = this;
        self.stage.orientation = egret.OrientationMode.LANDSCAPE;
        self.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        self.stage.setContentSize(width,height);

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }     

        self.scrAreanoList.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrAreanoList.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);
        // self.editPasswordText.displayAsPassword = true;

        var lptype = egret.localStorage.getItem("lptype");
        self.curPhoneLoginType = lptype!=null?Number(lptype):0;
        var letype = egret.localStorage.getItem("letype");
        self.curEmailLoginType = letype!=null?Number(letype):0;
        self.curConsentAgreement = true;
        self.curPWInputType = 0;

        self.curAreano = egret.localStorage.getItem("areano");
        self.curAreano = self.curAreano!=null?self.curAreano:"86";

        //初始化钱包名称为空
        GlobalDataManager.getInstance().setWalletName("");

        self.initView();

        self.autoLogin();
        self.autoDebug();
    }

    private initView():void{
        var self = this;

        self.groupSwitchLogin.visible = true;
        self.groupNormalLogin.visible = false;

        var agreementUrl:string = "";
        var gameConfig:any = GlobalDataManager.getInstance().getGameConfig();
        if(gameConfig.agreementUrl!=null){
            agreementUrl = gameConfig.agreementUrl;
        }
        
        //加下划线
        self.lblLicense.textFlow = [
            { text: self.lblLicense.text, style: {underline: true ,"href" : agreementUrl} }
        ];
        self.lblAgreement.textFlow = [
            { text: self.lblAgreement.text, style: {underline: true ,"href" : agreementUrl} }
        ];

        

        var areanoStr:string = egret.localStorage.getItem("areanoStr");
        areanoStr = areanoStr!=null?areanoStr:"+86 (CN)";
        self.lblAreano.text = areanoStr;

        self.editEmailVCode.text =
        self.editVCode.text = 
        self.editPassword.text = "";

        self.editPhone.inputType = egret.TextFieldInputType.TEL;
        var uphone = egret.localStorage.getItem("uphone");
        self.editPhone.text = uphone!=null?uphone:"";

        var uemail = egret.localStorage.getItem("uemail");
        self.editEmail.text = uemail!=null?uemail:"";

        var uname = egret.localStorage.getItem("uname");
        self.editUsername.text = uname!=null?uname:"";

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.lblVersion.text = self.labelObj["lbl_1"]+Main.ver;//"版本号:"+Main.ver;
        
        self.btnGetEmailVCode.visible = 
        self.btnGetVCode.visible  = true;
        self.lblEmailVCodeTime.visible = 
        self.lblVCodeTime.visible = false;

        // self.updateCurLoginType();
        self.updateAgreementShow();
        self.updatePWInputTypeShow();
        // self.setVCodeCountDownShow();
        
        self.lblBottom.text = self.labelObj["lbl_0"];
        // self.lblBottom.text = "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防上当受骗。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。"
    }

    private updateCurPhoneLoginType():void{
        var self = this;

        self.groupEmail.visible = false;

        var VCodeShow:boolean = self.curPhoneLoginType==0;
        self.groupPhone.visible = VCodeShow;
        self.groupPassword.visible = !VCodeShow;

        var norColor:number = 0xFFFFFF;
        var selColor:number = 0x42D9FF;
        self.lblVCode.textColor = VCodeShow?selColor:norColor;
        self.lblPassword.textColor = VCodeShow?norColor:selColor;

        egret.localStorage.setItem("lptype",self.curPhoneLoginType+"");
    }

    private updateCurEmailLoginType():void{
        var self = this;

        self.groupPhone.visible = false;

        var VCodeShow:boolean = self.curEmailLoginType==0;
        self.groupEmail.visible = VCodeShow;
        self.groupPassword.visible = !VCodeShow;

        var norColor:number = 0xFFFFFF;
        var selColor:number = 0x42D9FF;
        self.lblVCode.textColor = VCodeShow?selColor:norColor;
        self.lblPassword.textColor = VCodeShow?norColor:selColor;

        egret.localStorage.setItem("letype",self.curPhoneLoginType+"");
    }

    private updateAgreementShow():void{
        var self = this;
        var norSource:string = "loginSheet_json.xuankuang00";
        var selSource:string = "loginSheet_json.xuankuang01";
        self.imgCheckAgreement.source = self.curConsentAgreement?selSource:norSource;
    }

    private updatePWInputTypeShow():void{
        var self = this;
        var norSource:string = "loginSheet_json.biyan";
        var selSource:string = "loginSheet_json.kaiyan";
        var pwHide:boolean = self.curPWInputType==0;
        self.imgWatch.source = pwHide?norSource:selSource;
        self.editPassword.displayAsPassword = pwHide;
    }

    // private setVCodeCountDownShow():void{
    //     var self = this;

    //     var ltime = egret.localStorage.getItem("ltime");
    //     var vcodeTime:number = ltime!=null?Number(ltime)+self.timeDuration-Math.floor(new Date().getTime()/1000):-1;
    //     var showVCodeCD:boolean = vcodeTime>0;
    //     if(showVCodeCD)
    //         self.openVCodeCountDown(vcodeTime);
        
    //     self.btnGetVCode.visible  =!showVCodeCD;
    //     self.lblVCodeTime.visible = showVCodeCD;
    // }

    //自动登录 后期删除
    private autoLogin():void{
        if (window.location) {
            let search = location.search;
            if (search == "") {
                return;
            }
            search = search.slice(1);
            var self = this;
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i:number = 0; i < length; i++) {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == "account") {
                    let obj = new Object();
                    obj["username"] = arr[1];
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_AUTO_LOGIN,obj,true);
                }
            }
        }
    }

    //自动跳转调试模式
    private autoDebug():void{
        if (window.location) {
            let search = location.search;
            if (search == "") {
                return;
            }
            search = search.slice(1);
            var self = this;
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i:number = 0; i < length; i++) {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == "debug")
                    UIManager.getInstance().showUI(DebugView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{type:Number(arr[1])});
                else if(arr[0]=="combat"){
                    let gkid:number = 2;
                    let gameName:string= "Combat";
                    let attData:string = '{"gName":"CardRes","arr2Res":["cardCommonImg0Sheet_json","cardCommonImg1Sheet_json","cardCommonImg2Sheet_json","cardCommonImg3Sheet_json","cardCommonImg4Sheet_json","headImg0Sheet_json"]}';
                    //直接进游戏,后面需要合并其他游戏的时候再做处理;
                    GMDManager.addGMDInfo(gkid,gameName,2,null,"0","",attData);
                    let obj = new Object();
                    obj["dt"] = 2;
                    obj["param"] = {debug:true};
                    obj["gdir"] =2;
                    GMDManager.startGMD(gkid,obj);
                    UIManager.getInstance().hideUI(LoginView);
                }
            }
        }
    }

    protected sleep():void{
        var self = this;

        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }
        self.scrAreanoList.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrAreanoList.removeEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        self.labelObj = null;
    }
    

    private TouchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnLogin){
                if(!self.curConsentAgreement){
                    // PopManager.getInstance().showPromptBox("请先详细阅读并同意使用许可和服务协议!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_2"],2);
                    return;
                }

                
                var type:number = -1;//self.curLoginType;
                if(self.curLoginType==0)
                    type = self.curPhoneLoginType==0?0:1;
                else if(self.curLoginType==1)
                    type = self.curEmailLoginType==0?2:1;
                var unameStr:string = "";
                var phoneStr:string = "";
                var emailStr:string = "";
                var codeStr:string = "";
                var countryCode:string = "";
                if(type==0){
                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE,self.editPhone.text)){
                        // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"],2);
                        return;
                    }

                    if(self.editVCode.text.length<=0){
                        // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"],2);
                        return;
                    }

                    phoneStr = self.editPhone.text;
                    codeStr = self.editVCode.text;
                    countryCode = self.curAreano;

                    egret.localStorage.setItem("uphone",phoneStr);
                }else if(type==2){

                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_EMAIL,self.editEmail.text)){
                        // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_7"],2);
                        return;
                    }

                    if(self.editEmailVCode.text.length<=0){
                        // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"],2);
                        return;
                    }

                    emailStr = self.editEmail.text;
                    codeStr = self.editEmailVCode.text;

                    egret.localStorage.setItem("uemail",emailStr);
                }else{

                    // if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_USER,self.editUsername.text)){
                    //     // PopManager.getInstance().showPromptBox("用户名不符合要求!\n(6-22位数字或字母组合,不含特殊字符)",2);
                    //     PopManager.getInstance().showPromptBox(self.labelObj["lbl_5"],2);
                    //     return;
                    // }
                    if(self.editUsername.text==""){
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_5"],2);
                        return;
                    }

                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PSD,self.editPassword.text)){
                        // PopManager.getInstance().showPromptBox("密码不符合要求!\n(6-18位数字或字母组合)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_6"],2);
                        return;
                    }

                    unameStr = self.editUsername.text;
                    codeStr = new MD5().hex_md5(self.editPassword.text);

                    egret.localStorage.setItem("uname",unameStr);
                }
                    

                let obj = new Object();
                if(unameStr!="")
                    obj["uname"]=unameStr;
                if(countryCode!="")
                    obj["countryCode"]=countryCode;
                if(phoneStr!="")
                    obj["phone"] = phoneStr;
                if(emailStr!="")
                    obj["email"] = emailStr;
                obj["code"] = codeStr;
                obj["type"] = type;
                
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_LOGIN,obj,true);

                
            }else if(tar==self.btnGetVCode){
                if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE,self.editPhone.text)){
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"],2);
                    return;
                }
                var phoneStr:string = self.editPhone.text;
                let obj = new Object();
                obj["countryCode"] = self.curAreano;
                obj["phone"] = phoneStr;
                obj["type"] = 0;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_SMSCODE,obj,true);
            }else if(tar==self.btnGetEmailVCode){
                if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_EMAIL,self.editEmail.text)){
                    // PopManager.getInstance().showPromptBox("邮箱不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_7"],2);
                    return;
                }
                var emailStr:string = self.editEmail.text;
                let obj = new Object();
                obj["email"] = emailStr;
                obj["type"] = 0;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_EMAILVCODE,obj,true);
            }else if(tar==self.btnRegist){
                // // let gkid:number = 1;
                // // let gameName:string= "Hall";
                // let gkid:number = 2;
                // let gameName:string= "Combat";
                // let attData:string = '{"gName":"CardRes","arr2Res":["cardCommonImg0Sheet_json","cardCommonImg1Sheet_json","cardCommonImg2Sheet_json","cardCommonImg3Sheet_json","cardCommonImg4Sheet_json","headImg0Sheet_json"]}';
                // //直接进游戏,后面需要合并其他游戏的时候再做处理;
                // GMDManager.addGMDInfo(gkid,gameName,2,null,"0","",attData);
                // let obj = new Object();
                // obj["dt"] = 2;
                // obj["param"] = {debug:true};
                // obj["gdir"] =2;
                // GMDManager.startGMD(gkid,obj);
                // UIManager.getInstance().hideUI(LoginView);
                UIManager.getInstance().showUI(RegisterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{rtype:self.curLoginType});
            }else if(tar==self.btnForgot){
                UIManager.getInstance().showUI(ForgotView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{ftype:self.curLoginType});
            }else if(tar==self.btnBackSLogin){ //返回选择登录按钮点击
                self.groupSwitchLogin.visible = true;
                self.groupNormalLogin.visible = false;
            }else if(tar==self.btnPhoneLogin){ //手机登录按钮点击
                self.groupSwitchLogin.visible = false;
                self.groupNormalLogin.visible = true;
                self.curLoginType = 0;
                self.updateCurPhoneLoginType();
            }else if(tar==self.btnEmailLogin){ //邮箱登录按钮点击
                self.groupSwitchLogin.visible = false;
                self.groupNormalLogin.visible = true;
                self.curLoginType = 1;
                self.updateCurEmailLoginType();
            }else if(tar==self.btnMetaMaskLogin){ //MetaMask登录按钮点击
                WalletManager.getInstance().walletLogin('Metamask');
                // egret.localStorage.setItem("walletName",'Metamask');
            }else if(tar==self.btnBinanceLogin){ //Binance登录按钮点击
                WalletManager.getInstance().walletLogin('BinanceChain');
                // egret.localStorage.setItem("walletName",'BinanceChain');
            }else if(tar==self.btnXWGLogin){    //XWG登录按钮点击
                WalletManager.getInstance().walletLogin('XWG');
            }
        }else if(tar instanceof eui.Label){
            if(tar==self.lblVCode){
                SoundManager.getInstance().PlayClickSound();
                if(self.curLoginType==0){
                    if(self.curPhoneLoginType==0)
                        return;
                    self.curPhoneLoginType = 0;
                    self.updateCurPhoneLoginType();
                }else if(self.curLoginType==1){
                    if(self.curEmailLoginType==0)
                        return;
                    self.curEmailLoginType = 0;
                    self.updateCurEmailLoginType();
                }
            }else if(tar==self.lblPassword){
                SoundManager.getInstance().PlayClickSound();
                if(self.curLoginType==0){
                    if(self.curPhoneLoginType==1)
                        return;
                    self.curPhoneLoginType = 1;
                    self.updateCurPhoneLoginType();
                }else if(self.curLoginType==1){
                    if(self.curEmailLoginType==1)
                        return;
                    self.curEmailLoginType = 1;
                    self.updateCurEmailLoginType();
                }
            }else if(tar==self.lblLicense||tar==self.lblAgreement){
                SoundManager.getInstance().PlayClickSound();
            }
        }else if(tar instanceof eui.Image){
            if(tar==self.imgCheckAgreement){
                self.curConsentAgreement = !self.curConsentAgreement;
                SoundManager.getInstance().PlayClickSound();
                self.updateAgreementShow();
            }else if(tar==self.imgWatch){
                self.curPWInputType = self.curPWInputType==0?1:0;
                SoundManager.getInstance().PlayClickSound();
                self.updatePWInputTypeShow();
            }
        }else if(tar instanceof eui.Rect){
            if(tar.name.substr(0,4)=="ano_"){
                if(self.movingState)
                    return;
                SoundManager.getInstance().PlayClickSound();
                var strArr:Array<string> = tar.name.split("_");
                if(strArr.length!=2)
                    return;
                var cIndex:number = Number(strArr[1]);
                if(self.curAreanoItemView!=null)
                    self.curAreanoItemView.setChooseState(false);
                self.curAreanoItemView = self.groupAreanoList.getChildAt(cIndex) as AreanoItemView;
                self.curAreanoItemView.setChooseState(true);
                var content:any = self.curAreanoItemView.getData().content;
                var areanoStr:string = "+"+content.code+" ("+content.short+")";
                self.lblAreano.text = areanoStr;
                egret.localStorage.setItem("areanoStr",areanoStr);
                
                self.curAreano = content.code;
                egret.localStorage.setItem("areano",self.curAreano);
                self.groupAreano.visible = false;
            }
        }else if(tar instanceof eui.Group){
            if(tar==self.groupAreano){
                SoundManager.getInstance().PlayClickSound();
                self.groupAreano.visible = false;
            }else if(tar==self.groupSelAreano){
                SoundManager.getInstance().PlayClickSound();
                if(self.groupAreanoList.numChildren<=0)
                    self.initAreanoShow();
                else
                    self.updateAreanoShow();
            }else if(tar==self.groupBtnPhoneLogin){
                SoundManager.getInstance().PlayClickSound();
                self.groupSwitchLogin.visible = false;
                self.groupNormalLogin.visible = true;
                self.curLoginType = 0;
                self.updateCurPhoneLoginType();
            }else if(tar==self.groupBtnEmailLogin){
                SoundManager.getInstance().PlayClickSound();
                self.groupSwitchLogin.visible = false;
                self.groupNormalLogin.visible = true;
                self.curLoginType = 1;
                self.updateCurEmailLoginType();
            }
        }
    }

    public setSMSCode(code:string):void{
        var self = this;
        if(self.editVCode){
            self.editVCode.text = code;
        }

        // egret.localStorage.setItem("ltime",Math.floor(new Date().getTime()/1000)+"");
        self.openSmsCountDown(self.timeDuration);
        self.btnGetVCode.visible = false;
        self.lblVCodeTime.visible = true;
    }

    private openSmsCountDown(time:number):void{
        var self = this;
        if(self.timer==null){
            self.timer = new egret.Timer(1000,0);
            self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerSmsFunc,self);
        }
        self.timeCounter = time;
        self.updateSmsTimeShow();
        self.timer.start();  
    }

    private stopSmsTimer():void{
        var self = this;
        if(self.timer!=null){
            self.timer.stop();
        }
    }
    
    private timerSmsFunc(){
        var self = this;
        self.timeCounter--;
        self.updateSmsTimeShow();
        if(self.timeCounter<=0){
            self.stopSmsTimer();
            self.lblVCodeTime.visible = false;
            self.btnGetVCode.visible = true;
        }
    }

    private updateSmsTimeShow():void{
        var self = this;
        self.lblVCodeTime.text = self.timeCounter+"S"; 
    }


    public setEmailVCode(code:string):void{
        var self = this;
        if(self.editEmailVCode){
            self.editEmailVCode.text = code;
        }

        // egret.localStorage.setItem("ltime",Math.floor(new Date().getTime()/1000)+"");
        self.openEVCCountDown(self.timeDuration);
        self.btnGetEmailVCode.visible = false;
        self.lblEmailVCodeTime.visible = true;
    }

    private openEVCCountDown(time:number):void{
        var self = this;
        if(self.timer1==null){
            self.timer1 = new egret.Timer(1000,0);
            self.timer1.addEventListener(egret.TimerEvent.TIMER,self.timerEVCFunc,self);
        }
        self.timeCounter1 = time;
        self.updateEVCTimeShow();
        self.timer1.start();  
    }

    private stopEVCTimer():void{
        var self = this;
        if(self.timer1!=null){
            self.timer1.stop();
        }
    }
    
    private timerEVCFunc(){
        var self = this;
        self.timeCounter1--;
        self.updateEVCTimeShow();
        if(self.timeCounter1<=0){
            self.stopEVCTimer();
            self.lblEmailVCodeTime.visible = false;
            self.btnGetEmailVCode.visible = true;
        }
    }

    private updateEVCTimeShow():void{
        var self = this;
        self.lblEmailVCodeTime.text = self.timeCounter1+"S"; 
    }

    // private openEamilVCodeCountDown(time:number):void{
    //     var self = this;
    //     if(self.timer==null){
    //         self.timer = new egret.Timer(1000,0);
    //         self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
    //     }
    //     self.timeCounter = time;
    //     self.updateEmailVCodeTimeShow();
    //     self.timer.start();  
    // }

    // private stopTimer():void{
    //     var self = this;
    //     if(self.timer!=null){
    //         self.timer.stop();
    //     }
    // }
    
    // private timerFunc(){
    //     var self = this;
    //     self.timeCounter--;
    //     self.updateTimeShow();
    //     if(self.timeCounter<=0){
    //         self.stopTimer();
    //         self.lblVCodeTime.visible = false;
    //         self.btnGetVCode.visible = true;
    //     }
    // }

    // private updateTimeShow():void{
    //     var self = this;
    //     self.lblVCodeTime.text = self.timeCounter+"S"; 
    // }

    private initAreanoShow():void{
        var self = this;
        if(self.groupAreanoList.numChildren>0){
            for(var i:number=self.groupAreanoList.numChildren-1;i>=0;i--)
                self.groupAreanoList.removeChildAt(i);
        }
        // var str:string = '{"list":[';
        var configs:any = RES.getRes("areanoConfig_json");
        var list:Array<any> = configs.list;
        for(var i:number=0,lengthI:number=list.length;i<lengthI;i++){
            var item:any = list[i];
            if(item==null)
                continue;
            //+86 中国（CN）
            var data = {content:item,index:i};
            var areanoItemView:AreanoItemView = new AreanoItemView();
            areanoItemView.initData(data);
            self.groupAreanoList.addChild(areanoItemView);

            if(self.curAreano==item.code){
                self.curAreanoItemView = areanoItemView;
                areanoItemView.setChooseState(true);
            }
        }
        self.updateAreanoShow();
    }

    private updateAreanoShow():void{
        var self = this;
        if(self.curAreanoItemView==null)
            return;
        var index:number = self.curAreanoItemView.getData().index;
        var showCount:number = Math.floor(self.scrAreanoList.height/self.curAreanoItemView.height);
        index = index >=self.groupAreanoList.numChildren-showCount?self.groupAreanoList.numChildren-showCount:index;
        var height:number = index*self.curAreanoItemView.height;
        self.scrAreanoList.viewport.scrollV = height;
        self.groupAreano.visible = true;
    }

    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupLogin==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupLogin.scaleX = 
            self.groupLogin.scaleY = 1;
            return;
        }
        self.groupLogin.scaleX = 
        self.groupLogin.scaleY = gapNum;
    }
}   