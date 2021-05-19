// TypeScript file
class MatchingView extends BaseView{
    public static NAME:string = "MatchingSkin";

    public constructor(){
        super(MatchingView.NAME);
    }

    private groupCenter:eui.Group;  //中心圈层
    private imgRotate:eui.Image;    //旋转图片
    private lblTime:eui.Label;      //时间文本
    private groupHint:eui.Group;    //提示文本层
    private btnStop:eui.Button;     //停止匹敌按钮;

    private timeCounter:number;     //时间计数器
    private timer:egret.Timer;      //定时器
    private hintTextField:egret.TextField;  //提示富文本;

    private loopReqMatchInfoIndex:number = -1;
    private loopReqTime:number = 3;

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        
        SoundManager.getInstance().PlayBgm("kaishipipei_mp3");
        self.initView();
        self.sendMatch();
    }

    private initView():void{
        var self = this;
        self.loopReqMatchInfoIndex = -1;
        self.timeCounter = 0;
        self.updateTimeShow();
        
        self.startRotate();
        self.startTimer();
        self.setHintTextField();
    }

    protected sleep():void{
        var self = this;

        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.stopRotate();
        self.stopTimer();

        if(self.timer!=null){
            self.timer.removeEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
            self.timer = null;
        }

        if(self.hintTextField!=null){
            self.hintTextField.parent.removeChild(self.hintTextField);
            self.hintTextField = null;
        }
    }


    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnStop){
                // self.hiden();
                self.sendDisMatch();
            }
        }
    }

    //开始旋转
    private startRotate():void{
        var self = this;
        self.stopRotate();
        self.imgRotate.rotation = 0;
        egret.Tween.get(self.imgRotate,{loop:true}).to({ rotation: 360 },2500);
    }

    private stopRotate():void{
        egret.Tween.removeTweens(this.imgRotate);
    }

    private startTimer():void{
        var self = this;
        if(self.timer==null){
            self.timer = new egret.Timer(1000,0);
            self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
            self.timeCounter = 0;
        }
        self.timer.start();  
    }

    private stopTimer():void{
        var self = this;
        if(self.timer!=null){
            self.timer.stop();
        }
    }
    
    private timerFunc(){
        var self = this;
        self.timeCounter++;
        self.updateTimeShow();

        if(self.loopReqMatchInfoIndex!=-1){
            self.loopReqMatchInfoIndex--;
            if(self.loopReqMatchInfoIndex==0){
                self.sendGetMatchInfo();
            }
        }
    }

    private updateTimeShow():void{
        var self = this;
        self.lblTime.text = self.parseTime(self.timeCounter); 
    }

    private parseTime(counter:number):string{
        if(counter<0)
            counter = 0;
        var second:number = counter%60;
        var minute:number = Math.floor(counter/60);
        var secondStr:string = second<10?"0"+second:""+second;
        var minuteStr:string = minute<10?"0"+minute:""+minute;
        return minuteStr+":"+secondStr;
    }

    //设置提示文本
    private setHintTextField():void{
        var self = this;

        var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);
        var txt:egret.TextField = new egret.TextField();
        txt.textColor = 0xffffff;
        txt.size = 36;
        self.groupHint.addChild(txt);
        txt.fontFamily="SimHei";
        txt.textFlow = [
            //   {text: "温馨提示:", style: {"size": 36,textColor:0xffe399}},
            //   {text:'点击下面按钮可关闭界面',style:{"size":30,textColor:0x80d5fc}}
            {text: labelObj["lbl_0"], style: {"size": 36,textColor:0xffe399}},
            {text: labelObj["lbl_1"], style:{"size":30,textColor:0x80d5fc}}
        ]
        self.hintTextField = txt;
        // txt.textAlign = egret.HorizontalAlign.CENTER;
        self.groupHint.width = txt.width;   //设置层级宽度可以自适应居中
    }

    private sendMatch():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_MATCH_PVP,{gcid:0},false);
    }

    private sendDisMatch():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_DISMATCH_PVP,{});
    }

    private sendGetMatchInfo():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_MATCH_PVP_INFO,{},false);
    }

    //接收数据
    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_MATCH_PVP:  //匹敌
                self.onGetMatchPvp(data);
            break;
            case HallCmdDef.CMD_DISMATCH_PVP: //取消匹敌
                SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                self.hiden();
            break;
            case HallCmdDef.CMD_GET_MATCH_PVP_INFO: //获取匹敌信息
                self.onGetMatchInfo(data);
            break;
        }
    }

    private onGetMatchPvp(data:any):void{
        if(data==null)
            return;

        var self = this;
        var msg:any = data.msg;
        if(data.result!=null&&data.result!=GlobalDef.REQUEST_SUCCESS){
            self.stopTimer();
            var handler:Handler = null;
            if(msg==-108){
                handler = Handler.create(self,function(){
                    SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                    self.hiden();
                    UIManager.getInstance().showUI(CardGroupView);
                });
            }else{
                handler = Handler.create(self,function(){
                    SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                    self.hiden();
                });
            }
            if(ErrorMananger.getInstance().checkReqResult(data,true,handler))
                return;
        }
        
        if(msg!=null&&msg.ruuid!=null){
            self.openWebSocket(msg);
        }else{
            self.sendGetMatchInfo();
        }
    }


    private onGetMatchInfo(data:any):void{
        if(data==null)
            return;

        var self = this;
        var msg:any = data.msg;
        if(data.result!=null&&data.result!=GlobalDef.REQUEST_SUCCESS){
            self.stopTimer();
            var handler:Handler = Handler.create(self,function(){
                SoundManager.getInstance().PlayBgm("datingBGM_mp3");
                self.hiden();
            });
            if(ErrorMananger.getInstance().checkReqResult(data,true,handler))
                return;
        }

        if(msg==null||msg==0){
            self.loopSendGetMatchInfo();
            return;
        }
        
        self.openWebSocket(msg);
        // console.log(data);
    }

    private openWebSocket(data:any):void{
        if(data==null)
            return;
        
        SoundManager.getInstance().PlaySound("pipeichenggong_mp3");

        var ruuid:string = data.ruuid;
        GlobalDataManager.getInstance().setRUUID(ruuid);
        var room:string = data.room;
        GlobalDataManager.getInstance().setRoom(room);

        GlobalDataManager.getInstance().setThredID(0);
        var scode:string = data.scode;
        GlobalDataManager.getInstance().setGameServerName(scode);
        GlobalDataManager.getInstance().setGameOver(false);

        SoundManager.getInstance().canPlayCombatBGM = true;

        var surl:string = data.surl;
        let server: ServerData = new ServerData();
        server.setSname(scode);
        server.setSurl(surl);
        server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        WebSocketManager.getInstance().registerServer(server);
        WebSocketManager.getInstance().connectServer(scode, true);
    }

    private loopSendGetMatchInfo():void{
        var self = this;
        self.loopReqMatchInfoIndex = self.loopReqTime;
    }
}