// TypeScript file
class RegisterView extends BaseView{
    public static NAME:string = "RegisterSkin";
    public constructor(){
        super(RegisterView.NAME);
    }

    private groupRegister:eui.Group;

    private btnClose:eui.Button;    
    private groupPhone:eui.Group;
    private editUsername:eui.EditableText;
    private editPhone:eui.EditableText;
    private editVCode:eui.EditableText;
    private editPassword0:eui.EditableText;
    private editPassword1:eui.EditableText;
    private imgWatch:eui.Image;
    private lblVCodeTime:eui.Label;
    private lblAreano:eui.Label;
    private btnGetVCode:eui.Button;

    private groupEmail:eui.Group;
    private editUsername0:eui.EditableText;
    private editEmail:eui.EditableText;
    private editEmailVCode:eui.EditableText;
    private btnGetEmailVCode:eui.Button;
    private imgWatch0:eui.Image;
    private lblEmailVCodeTime:eui.Label;
    private editPassword2:eui.EditableText;
    private editPassword3:eui.EditableText;

    private btnRegister:eui.Button;

    private groupAreano:eui.Group;
    private scrAreanoList:eui.Scroller;
    private groupAreanoList:eui.Group;

    private curPWInputType:number;  //当前密码输入类型 0不可视 1可视
    private curAreano:string;   //当前选择的区号
    private curAreanoItemView:AreanoItemView;   //当前选择的区号视图

    private timeCounter:number;     //时间计数器
    private timer:egret.Timer;      //定时器
    private timeDuration:number = 60;  //60秒

    private timeCounter1:number;     //时间计数器
    private timer1:egret.Timer;      //定时器

    private curRegisterType:number;
    private movingState:boolean = false;   //移动状态

    private labelObj:any;   //语言包

    protected week():void{
        
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }

        self.scrAreanoList.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrAreanoList.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        // self.editPasswordText.displayAsPassword = true;
        // GMDManager.addGMDInfo(0,"HeiHongCaoFang",0,null,"0");        

        // var uname = egret.localStorage.getItem("uname");
        // var password = egret.localStorage.getItem("password");
        
        // self.editAccountText.text = uname;
        // self.editPasswordText.text = password;
        // self.editPasswordText.displayAsPassword = true;
        self.curPWInputType = 0;
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);

        self.curAreano = egret.localStorage.getItem("areano");
        self.curAreano = self.curAreano!=null?self.curAreano:"86";

        self.initView();

        var data:any = super.getData();
        if(data==null)
            return;
        self.curRegisterType = data.rtype;
        self.updateCurRegisterType();
    }

    private initView():void{
        var self = this;

        self.editPhone.inputType = egret.TextFieldInputType.TEL;
        self.btnGetVCode.visible  =
        self.btnGetEmailVCode.visible  = true;
        self.lblVCodeTime.visible =
        self.lblEmailVCodeTime.visible = false;

        self.editUsername.text =
        self.editPhone.text = 
        self.editVCode.text = 
        self.editPassword0.text = 
        self.editPassword1.text = 
        self.editUsername0.text =
        self.editEmail.text = 
        self.editEmailVCode.text = 
        self.editPassword2.text = 
        self.editPassword3.text = "";

        self.groupAreano.visible = false;

        var areanoStr:string = egret.localStorage.getItem("areanoStr");
        areanoStr = areanoStr!=null?areanoStr:"+86 (CN)";
        self.lblAreano.text = areanoStr;

        self.updatePWInputTypeShow();
        // self.setVCodeCountDownShow();
    }

    private updatePWInputTypeShow():void{
        var self = this;
        var norSource:string = "loginSheet_json.biyan";
        var selSource:string = "loginSheet_json.kaiyan";
        var pwHide:boolean = self.curPWInputType==0;
        self.imgWatch.source =
        self.imgWatch0.source = pwHide?norSource:selSource;
        self.editPassword0.displayAsPassword = 
        self.editPassword1.displayAsPassword =
        self.editPassword2.displayAsPassword = 
        self.editPassword3.displayAsPassword = pwHide;
    }

    private updateCurRegisterType():void{
        var self = this;
        self.groupPhone.visible=self.curRegisterType==0;
        self.groupEmail.visible=self.curRegisterType==1;
    }
    // private setVCodeCountDownShow():void{
    //     var self = this;

    //     var ltime = egret.localStorage.getItem("rtime");
    //     var vcodeTime:number = ltime!=null?Number(ltime)+self.timeDuration-Math.floor(new Date().getTime()/1000):-1;
    //     var showVCodeCD:boolean = vcodeTime>0;
    //     if(showVCodeCD)
    //         self.openVCodeCountDown(vcodeTime);
        
    //     self.btnGetVCode.visible  =!showVCodeCD;
    //     self.lblVCodeTime.visible = showVCodeCD;
    // }

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
            if(tar==self.btnRegister){
                var accountStr:string = "";
                var emailStr:string = "";
                var countryCode:string = "";
                var phoneStr:string = "";
                var vcodeStr:string = "";
                var pw0Str:string = "";
                var pw1Str:string = "";
                if(self.curRegisterType==0){
                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_USER,self.editUsername.text)){
                        // PopManager.getInstance().showPromptBox("用户名不符合要求!\n(6-22位数字或字母组合,不含特殊字符)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_0"],2);
                        return;
                    }

                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE,self.editPhone.text)){
                        // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_1"],2);
                        return;
                    }

                    if(self.editVCode.text.length<=0){
                        // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_2"],2);
                        return;
                    }

                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PSD,self.editPassword0.text)){
                        // PopManager.getInstance().showPromptBox("密码不符合要求!\n(6-18位数字或字母组合)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"],2);
                        return;
                    }
                    
                    if(self.editPassword0.text!=self.editPassword1.text){
                        // PopManager.getInstance().showPromptBox("两次密码输入不一致!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"],2);
                        return;
                    }

                    countryCode = self.curAreano;
                    accountStr = self.editUsername.text;
                    phoneStr = self.editPhone.text;
                    vcodeStr = self.editVCode.text;
                    
                    pw0Str = new MD5().hex_md5(self.editPassword0.text);
                    pw1Str = new MD5().hex_md5(self.editPassword1.text);

                    egret.localStorage.setItem("uname",accountStr);
                    egret.localStorage.setItem("uphone",phoneStr);
                }else if(self.curRegisterType==1){
                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_USER,self.editUsername0.text)){
                        // PopManager.getInstance().showPromptBox("用户名不符合要求!\n(6-22位数字或字母组合,不含特殊字符)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_0"],2);
                        return;
                    }

                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_EMAIL,self.editEmail.text)){
                        // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_5"],2);
                        return;
                    }

                    if(self.editEmailVCode.text.length<=0){
                        // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_2"],2);
                        return;
                    }

                    if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PSD,self.editPassword2.text)){
                        // PopManager.getInstance().showPromptBox("密码不符合要求!\n(6-18位数字或字母组合)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"],2);
                        return;
                    }
                    
                    if(self.editPassword2.text!=self.editPassword3.text){
                        // PopManager.getInstance().showPromptBox("两次密码输入不一致!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"],2);
                        return;
                    }

                    accountStr = self.editUsername0.text;
                    emailStr = self.editEmail.text;
                    vcodeStr = self.editEmailVCode.text;
                    
                    pw0Str = new MD5().hex_md5(self.editPassword2.text);
                    pw1Str = new MD5().hex_md5(self.editPassword3.text);

                    egret.localStorage.setItem("uname",accountStr);
                    egret.localStorage.setItem("uemail",emailStr);
                }
                
                
                let obj = new Object();
                obj["uname"] = accountStr;
                if(countryCode!="")
                    obj["countryCode"]=countryCode;
                if(phoneStr!="")
                    obj["phone"] = phoneStr;
                if(emailStr!="")
                    obj["email"] = emailStr;
                obj["vcode"] = vcodeStr;
                obj["pw0"] = pw0Str;
                obj["pw1"] = pw1Str;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_REGISTER,obj,true);

                // var accountStr:string = self.editAccountText.text;
                // var passwordStr:string = self.editPasswordText.text;

                // let md5_psd:string = new MD5().hex_md5(passwordStr);
                // var obj = new Object();
                // obj["name"] = accountStr;
                // obj["psd"] = md5_psd;
                // obj["psdTemp"] = md5_psd;
                // obj["ident"] = self.editCodeText.text;
                // obj["nick"] = self.editNickText.text;
                // obj["sex"] = 0;
                // obj["from"] = 1;
                // obj["cid"] = localStorage.getItem('cid');
                // obj["sid"] =1;
                // obj["kind"] = GlobalDef.getInstance().getOSType();
                // obj["image_suffx"] = Main.res+"assets/123.jpg";
                // obj["key"] = new MD5().hex_md5(accountStr + "_"+obj["from"]+"_"+GameConfig.vi);
                // let ls = GlobalDataManager.getInstance().getLoginServer();
                // if(ls!=null){
                //     HttpManager.getInstance().send(ls.getSname(),CmdDef.CMD_LS_REGISTER,obj);
                //     GlobalDataManager.getInstance().setAccountText(accountStr);
                //     GlobalDataManager.getInstance().setPassWordText(passwordStr);
                // }
            }else if(tar==self.btnGetVCode){
                if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE,self.editPhone.text)){
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_1"],2);
                    return;
                }

                var phoneStr:string = self.editPhone.text;
                let obj = new Object();
                obj["countryCode"] = self.curAreano;
                obj["phone"] = phoneStr;
                obj["type"] = 1;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_SMSCODE,obj,true);

            }else if(tar==self.btnGetEmailVCode){
                if(!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_EMAIL,self.editEmail.text)){
                    // PopManager.getInstance().showPromptBox("邮箱不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_5"],2);
                    return;
                }

                var emailStr:string = self.editEmail.text;
                let obj = new Object();
                obj["email"] = emailStr;
                obj["type"] = 1;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_EMAILVCODE,obj,true);

            }else if(tar==self.btnClose){
                this.hiden();
            }
        }else if(tar instanceof eui.Image){
            if(tar==self.imgWatch||tar==self.imgWatch0){
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
            }
        }else if(tar instanceof eui.Label){
            if(tar==self.lblAreano){
                SoundManager.getInstance().PlayClickSound();
                if(self.groupAreanoList.numChildren<=0)
                    self.initAreanoShow();
                else
                    self.updateAreanoShow();
            }
        }
    }

    public setSMSCode(code:string):void{
        var self = this;
        if(self.editVCode){
            self.editVCode.text = code;
        }

        // egret.localStorage.setItem("rtime",Math.floor(new Date().getTime()/1000)+"");
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
        if(self.groupRegister==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupRegister.scaleX = 
            self.groupRegister.scaleY = 1;
            return;
        }
        self.groupRegister.scaleX = 
        self.groupRegister.scaleY = gapNum;
    }
}