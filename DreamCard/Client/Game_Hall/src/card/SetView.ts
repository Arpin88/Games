// TypeScript file
class SetView extends BaseView{

    public static NAME:string = "SetSkin";

     public constructor(){
        super(SetView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮
    private BtnZhuXiao:eui.Button;  //注销并退出
    private changeIconBtn:eui.Button;
    private useridtxt:eui.Label;
    private nicknametxt:eui.Label;
    private headgroup:eui.Component;      //头像

    private SwitchSound:eui.ToggleSwitch;    //音效开关
    private SwitchMusic:eui.ToggleSwitch;    //背景音乐开关
    private SwitchNotify:eui.ToggleSwitch;   //通知开关
    private discDataist:Array<Object> = new Array<Object>();

    private kefuwxLabel:eui.Label;
    private kefuqqLabel:eui.Label;
    private label1:eui.Label;
    private label2:eui.Label;
    private label3:eui.Label;
    private versiontxt:eui.Label;

    private soundtxt:eui.Label;
    private musictxt:eui.Label;
    public headImg:eui.Image;   //右边背景
    public soundImg:eui.Image;
    public musicImg:eui.Image;
    private iconUrl:string = "";
    private nickTxt = "昵称：";
    protected week():void{
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           self.nickTxt = "Name:";
        }

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.InitView(); // 初始化界面
        self.requestInitDataFromSvr(); // 初始申请数据
    }

    private InitView():void{
        var self = this;
        // 公共数据设置个人信息
        var account123 = GlobalDataManager.getInstance().getAccountData();
        self.useridtxt.text = "ID: " + account123["uname"];
        self.nicknametxt.text = self.nickTxt + account123["nick"];

        var iconUrl:string = account123.getHead_Url();
        this.setHeadIcon(iconUrl,false);

        // 本地数据设置按钮
        self.SwitchSound.selected = true;
        if(localStorage.getItem("soundSet") == "off"){self.SwitchSound.selected = false;}
        self.SwitchMusic.selected = true;
        if(localStorage.getItem("musicSet") == "off"){self.SwitchMusic.selected = false;}
        self.freshMusicSet();
        self.freshSoundSet();

        self.versiontxt.text = "Version:"+Main.ver;
    }

    public setHeadIcon(iconUrl:string,isReset:boolean):void{
         this.iconUrl = iconUrl;
         this.headImg.source = this.iconUrl;

         // 发送到服务器
        if(isReset == true){
            this.requestSetHeadToSvr(this.headImg.source)
        }
    }

    //发送更改头像请求
    private requestSetHeadToSvr(headStr:string):void{
        if(headStr == "") return;

        let obj = new Object();
        obj["headurl"] = headStr;
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SetHead,obj,true);
    }

    //发送请求
    private requestInitDataFromSvr():void{
        let obj = new Object();
        obj["param"] = "设置";
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SetConfig,obj,true);
    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_SetConfig:  //获取队伍配置
                var num = data["length"]
                for(var k:number = 0; k < num; k++)
                 {
                   var mydata = data[k];
                   this.discDataist[mydata.position] = mydata;
                 }

                 this.setViewByData();
            break;
            case HallCmdDef.CMD_SetHead:
                var headurl = data["msg"];
                var account = GlobalDataManager.getInstance().getAccountData();                
                account.setHead_Url(headurl);
                this.setHeadIcon(headurl,false);
            break;
        }
    }

    private setViewByData(): void
    {
        this.kefuwxLabel.text = this.discDataist[1]["tittle"] + this.discDataist[1]["disc"];
        this.kefuqqLabel.text = this.discDataist[2]["tittle"] + this.discDataist[2]["disc"];

        this.label1.text = this.discDataist[3]["tittle"] + this.discDataist[3]["disc"];
        this.label2.text = this.discDataist[4]["tittle"] + this.discDataist[4]["disc"];
        this.label3.text = this.discDataist[5]["tittle"] + this.discDataist[5]["disc"];
    }

    protected sleep():void{
        
    }
    private freshSoundSet()
    {
        if(this.SwitchSound.selected == true){
            this.soundtxt.textColor = 0xFFFFFF;
            localStorage.setItem("soundSet","on");
            this.soundImg.source  = "hallText0Sheet_json.sy00";
        }else{
            this.soundtxt.textColor = 0x5DFA6B;
            localStorage.setItem("soundSet","off");
            this.soundImg.source  = "hallText0Sheet_json.sy01";
        }
    }
    private freshMusicSet()
    {
        if(this.SwitchMusic.selected == true){
            this.musictxt.textColor = 0xFFFFFF;
            localStorage.setItem("musicSet","on");
            this.musicImg.source  = "hallText0Sheet_json.yy00";            
        }else{
            this.musictxt.textColor = 0x5DFA6B;
            localStorage.setItem("musicSet","off");
            this.musicImg.source  = "hallText0Sheet_json.yy01";
        }
    }
    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
          SoundManager.getInstance().PlayClickSound();
          if(tar == self.btnBack){
                self.hiden();
          }else if(tar == self.BtnZhuXiao)
          {
            //  console.log(`注销退出`);
            PublicMethodManager.getInstance().loginOut();

             
          }else if(tar == self.changeIconBtn)
          {
              var sum = function(iconUrl:string){
                    self.setHeadIcon(iconUrl,true);                    
                };
                var data:Object = {"iconUrl":this.iconUrl,fun:sum};
                UIManager.getInstance().showUI(SelectHeadView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
          }else if(tar == self.SwitchMusic)
          {
              console.log(`背景音乐开关：${self.SwitchMusic.selected}`);
              this.freshMusicSet();
              SoundManager.getInstance().yinyue = self.SwitchMusic.selected;
              if(self.SwitchMusic.selected)
                SoundManager.getInstance().PlayBgm("datingBGM_mp3");
              else
                SoundManager.getInstance().CloseBgm();
              
          }else if(tar == self.SwitchSound)
          {
              console.log(`音效开关：${self.SwitchSound.selected}`);
              this.freshSoundSet();
              SoundManager.getInstance().yinxiao = self.SwitchSound.selected;
              
          }else if(tar == self.SwitchNotify)
          {
              console.log(`通知开关：${self.SwitchNotify.selected}`);
          }
        }
    }

}