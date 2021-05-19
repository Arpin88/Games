// TypeScript file
class HttpManager extends NetBase{
    private static m_manager:HttpManager = new HttpManager();
    public static getInstance():HttpManager{
        return HttpManager.m_manager;
    }

    //当前请求内容;
    private m_nowReqTask:RequestTask;

    //定时器;
    private m_timer:egret.Timer = new egret.Timer(500,3);

    public timerRun():boolean{
        return this.m_timer.running;
    }

    public reSend():void{
        if(this.m_nowReqTask!=null&&this.m_nowReqTask.sendCount>0&&(!this.m_timer.running)){
            this.m_timer.start();
        }else {
            if(this.m_nowReqTask.showModel){
                // UIManager.getInstance.hide(LoadRotationView);
            }
        }
        this.clearSend();
    }

    //清空重发消息;
    public clearSend():void{
        this.m_nowReqTask = null;
        this.m_timer.stop();
        this.m_timer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.m_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    }

    /*发送http消息,消息体是JSON字符串
    *@url:发送路径
    *@data:发送内容
    *@showModel:是否开启遮罩
    *@m:是否加密
    *@sendCount:发送次数
    */

    public send(sname:string,cmd:number,data:any,showModel:boolean = true,m:boolean = false,sendCount = 1):void{
        if(sname==""||sname==null||cmd==0){
            alert("no sname");
            return;
        }
        var server:ServerData = this.getServerByName(sname);
        if(!server){
            alert("no server");
            return;
        }
        if(data==null)
            data = new Object();
        data["language"] = LanguageManager.getInstance().getCurLanguageType();
        if(sendCount>1&&!(this.m_timer.running)){
            this.m_nowReqTask = new RequestTask;
            this.m_nowReqTask.sname = sname;
            this.m_nowReqTask.cmd = cmd;
            this.m_nowReqTask.data = data;
            this.m_nowReqTask.showModel =showModel;
            this.m_nowReqTask.m = m;
            this.m_nowReqTask.sendCount = sendCount;
            this.m_timer.delay = 6000;
            this.m_timer.repeatCount = this.m_nowReqTask.sendCount;
            if(!this.m_timer.hasEventListener(egret.TimerEvent.TIMER)){
                this.m_timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
            }
            if(!this.m_timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)){
                this.m_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
            }
            this.reSend();
            //添加Load界面;
            if(showModel){
                UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
            }
            return;
        }

        //添加load界面;
        if(showModel){
            UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER,0.5);
        }

        var request = server.getRequest();
        if(!request){
            request = new egret.HttpRequest();
            request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
            
            var resolverType:string = server.getResolverType();
            if(resolverType==JsonResolver.NAME){
                request.responseType = egret.HttpResponseType.TEXT;
            } else if(resolverType==ProtoBufResolver.NAME){
                request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            }
        }

        var resolver:IResolver = server.getResolver();
        data = resolver.parse(cmd,0,data,m);
        request.open(server.getHurl(),egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.send(data);
    }

    public sendLS(cmd:number,data:any,showModel:boolean = true,m:boolean =false,sendCount:number = 1){

    }

    public sendCS(cmd:number,data:any,showModel:boolean = true,m:boolean = false,sendCount:number = 1){

    }
    
    private onPostComplete(e:egret.Event){
        var request = <egret.HttpRequest>e.currentTarget;
        //隐藏Load界面;
        UIManager.getInstance().hideUI(LoadingRView);
        var server:ServerData = this.getServerByRequest(request);
        if(!server){
            this.onPostIOError();
        }else{
            var pag = server.getResolver().getPackageData();
            if(pag){
                pag.clear();
            }
            server.getResolver().decode(request.response);
        }
    }

    private onPostIOError(e:egret.IOErrorEvent = null):void{
        // console.log("post error :");
        //隐藏Load界面;
        UIManager.getInstance().hideUI(LoadingRView);

        // let status = GlobalDataManager.getInstance().getStatus();
        // if(status==1){
        //     PopManager.getInstance().showPromptBox("您已断开连接,重新连接 还是 返回大厅!",1,(a:Array<boolean>)=>{
        //         if(a!=null&&a.length>0){
        //             let isAgree:boolean = a[0];
        //             if(isAgree){
        //                 WebSocketManager.getInstance().reconnect();
        //             }else{
        //                 UIManager.getInstance().removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.BOM_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.POP_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
        //                 GMDManager.closeGMD();

        //                 UIManager.getInstance().showUI(LoginView,GameScene.VIEW_LAYER_NUMBER);
        //             }
        //         }

        //     },[],["重连游戏,返回登录"]);
        // }else{
        
        var context:string = "亲!您的网络不稳定,请重新尝试!";
        var errors:any = RES.getRes("error_json");
        if(errors!=null&&errors!=undefined)
            context = errors["-998"]==null?context:errors["-998"];
        PopManager.getInstance().showPromptBox(context,2);
        // }
        
    }

    private timerFunc(e:egret.TimerEvent):void{
        console.log("timerFunc count" + (<egret.Timer>e.target).currentCount);
        this.send(this.m_nowReqTask.sname,this.m_nowReqTask.cmd,this.m_nowReqTask.data,this.m_nowReqTask.showModel,this.m_nowReqTask.m,this.m_nowReqTask.sendCount);
    }

    private timerComFunc(e:egret.TimerEvent):void{
        console.log("timerComFunc count" + (<egret.Timer>e.target).currentCount);
        this.clearSend();
    }

    public locationUrl():void{
        // var loginform:string = localStorage.getItem("loginform");
        // var loginform1:string = localStorage.getItem("isweiduan");
        // if(loginform=="0"&&loginform1=="0"){
        //     var url:string = getGameUrl();
        // }else{

        // }
    }

}

class RequestTask{
    public sname:string;
    public cmd:number;
    public data:any;
    public showModel:boolean = true;
    public m:boolean =false;
    public sendCount:number =1;

}