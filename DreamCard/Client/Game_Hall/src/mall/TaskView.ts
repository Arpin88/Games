// TypeScript file
class TaskView extends BaseView{

    public static NAME:string = "TaskSkin";

     public constructor(){
        super(TaskView.NAME);
    }

    private btnBack:eui.Button;   
    private btnSign:eui.Button;
    private scrOptionBtn:eui.Scroller;  
    private groupOptionBtn:eui.Group;   

    private imgRBG:eui.Image;  
    private mallskingroup:eui.Group;
    private comStar:eui.Component;     
    private arrPropTypeData:Array<Object> = new Array<Object>();   
    private propData:any;     
    private shopInfoData:any;   
    private curSelPropData:any; 
    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>(); 
    private curChooseOptionBtnIndex:number; 
    private arrPropItem:Array<MPropItemView> = new Array<MPropItemView>();    
    private receiveNum:number = 0;
    private needUp:boolean = false;
    private curBtnIdx:number = 0;

    private taskpage:eui.Group;   
    private taskPropItem:eui.Scroller;   
    private taskgroupPropItem:eui.Group;   
    private awardPropItem:eui.Scroller;    
    private awardgroupPropItem:eui.Group;   
    private awardlistpage:eui.Group;   
    private awardListItem:eui.Scroller;  
    private awardgroupListItem:eui.Group;  
    private signpage:eui.Group;    
    private signpage1:eui.Group;
    
    private taskItemViewList:Array<TaskItemView> = new Array<TaskItemView>();   
    private awardItemViewList:Array<AwardtemView> = new Array<AwardtemView>();   
    private awardiewList:Array<GetAwardtemView> = new Array<GetAwardtemView>();  
    private signItemViewList:Array<SignItemView> = new Array<SignItemView>();
    private signItem2:SignItemView2 = null;
    private dailyObjAry:Object;
    private dailyTaskData:Object;
    private LvAwardkData:Object;
    private awardData:Object;
    private signDay:number = 0;
    private isRegist:boolean = false;
    private getStr:string = "";
    private origStr:string = "";
    private gettaskStr:string = "";
    private hasgetStr:string = "";
    private rewardStr:string = "";
    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        
        GameEventManager.getInstance().addEventListener(HallEvent.updateGold,self,self.updateGold);
        GameEventManager.getInstance().addEventListener(HallEvent.taskitemclick,self,self.TaskItemCallBack);

        this.needUp = false;
        this.receiveNum = 0;
        self.updateGold();
        self.setOptionBtn(); 
        

        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            this.getStr = "Completed";
            this.origStr = "Sign";
            this.gettaskStr = "Reward registration is successful";
            this.hasgetStr = "Rewards have been received";
            this.rewardStr = "You get contributions by doing tasks，the higher the contribution, the more the reward, and the reward will be issue the next day";
        }
        this.btnSign.$setEnabled(true);
        this.btnSign.$setVisible(false);
        this.btnSign.label = this.origStr;

        var sum2 = function(obj:any){
            var data = obj;
            self.setDailyTaskItem(data);
            self.setPageItem(0); 
        }
        UisManager.getInstance().getDailyMissionTasks(sum2);

        
        var sum3 = function(obj:any){
            var data = obj;
            self.setLvAwardItem(data); 
            self.setPageItem(0); 
        }
        UisManager.getInstance().getLevelRewardTasks(sum3);
        
        var sum1 = function(obj:any){
            this.btnSign.$setVisible(true);
            var data = obj[0];
            self.setDaySignItem(obj[0]);  
            self.setPageItem(0); 
        }
        UisManager.getInstance().getDailySigninTasks(sum1);

    //    UisManager.getInstance().pushRechargeEvent(null);
    //    UisManager.getInstance().pushUpLvlEvent(1,null); 

  /*      var sum4 = function(obj:any){
            var data = obj;
        }
        UisManager.getInstance().getUserRewardsList(sum4); */
        
        var sum5 = function(obj:any){
            var data = obj;
             self.setAwardView(data);
            self.setPageItem(0); 
        }
        UisManager.getInstance().getUserUnclaimedRewards(sum5); 

        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_REGISTER_GIFT_PACK_STATE,{},false);
    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_REGISTER_GIFT_PACK:
               // self.onGetShowPropList(data);
               var state = data["state"];
               if(state == 0){
                    var data1:Object = {name:this.gettaskStr,fun:null,closeCallBack:function(){
                        if(UIManager.getInstance().checkViewIsOpen(GuideView))
                            GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                    }};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
               }else{
                    var data1:Object = {name:this.hasgetStr,fun:null,closeCallBack:function(){
                        if(UIManager.getInstance().checkViewIsOpen(GuideView))
                            GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                    }};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
               }
	       
               if(UIManager.getInstance().checkViewIsOpen(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            break;
            case HallCmdDef.CMD_GET_REGISTER_GIFT_PACK_STATE:
                var state = data["state"];
                this.isRegist = state;
            break;

        }
    }



    private updateGold():void{
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.signItemViewList);
        self.cleanArray(self.taskItemViewList); 
        self.cleanArray(self.awardItemViewList);
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrPropItem);
        self.curChooseOptionBtnIndex = null;
        self.propData = null;
        self.shopInfoData = null;
        self.curSelPropData = null;
        GameEventManager.getInstance().removeEventListener(HallEvent.updateGold,self,self.updateGold);
        GameEventManager.getInstance().removeEventListener(HallEvent.taskitemclick,self,self.TaskItemCallBack);

	var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        if(account.getGuide_Step()!=null&&account.getGuide_Step()!="")
            UIManager.getInstance().showUI(GuideView,GameScene.EFFECT_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{step:account.getGuide_Step()});
    }

    private cleanArray(arr:Array<BaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i=arr.length-1;i>=0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
            if(btn.name.substr(0,10)=="btnOption_"){
                var strArr:Array<string> = btn.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
               // self.setPageItem(cIndex); 
                self.setCurChooseOptionBtnByIndex(cIndex); 

                if(cIndex==1&&UIManager.getInstance().checkViewIsOpen(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }else if(btn.name.substr(0,7)=="btnDay_"){
                var a = 0;
            }else if(btn==self.btnBack){
                self.hiden();
            }else if(btn == self.btnSign){
                var sum = function(obj:any){
                    if(obj == true){
                        self.SingIn();
                    }
                }
                UisManager.getInstance().pushSignInEvent(sum);
            }
        }if(event.target instanceof eui.Group){
            var bt1:eui.Group = <eui.Group>event.target;
            if(bt1.name.substr(0,6)=="btnDay_"){
                var a = 0;
            }
        }
    }

    private SingIn():void{
        var idx = this.signDay;
        if(idx < 6){
            this.signItemViewList[idx].setGet();
        }else{
            this.signItem2.setGet();
        }

        this.btnSign.$setEnabled(false);
        this.btnSign.label = this.getStr;
        var data1:Object = {name:this.rewardStr,fun:null};
        UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
    }

    private setOptionBtn():void{
        var self = this;
        var imgName = ["mrqiandao","mrrenwu","lvjiangli","lqjl"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           imgName = ["mrqiandao","mrrenwu","lvjiangli","e_lqjl"];
        }
        var num:number = imgName["length"];
        for(var i:number=0; i < num; i++){
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(imgName[i]);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }

	if(UIManager.getInstance().checkViewIsOpen(GuideView))
            GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);

        self.updateOptionBtnPos();
        self.setCurChooseOptionBtnByIndex(0); 
    }

    private setCurChooseOptionBtnByIndex(index:number):void{
        var self = this;
        var btnView:OptionBtnView = null;
        if(self.curChooseOptionBtnIndex!=null){
            if(self.curChooseOptionBtnIndex==index){
                return;
            }
            btnView = self.getOptionBtnViewByIndex(self.curChooseOptionBtnIndex);
            if(btnView==null)
                return;
            btnView.setCurChoose(0,true);
        }
        self.curChooseOptionBtnIndex = index;
        btnView = self.getOptionBtnViewByIndex(index);
        if(btnView==null)
            return;

        btnView.setCurChoose(1,true);
        self.updateOptionBtnPos();
        self.curBtnIdx = index
        self.setPageItem(index); 
    }

    private updateOptionBtn():void{
        var self = this;
        for(var i:number=0,lengthI=self.arrPropTypeData.length;i<lengthI;i++){
            var item:any = self.arrPropTypeData[i];
            if(item==null)
                continue;

            var resUrl:string = item.resUrl;
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;

            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    }

    

    private setPageItem(index:number):void{
        this.signpage.$setVisible(false);
        this.signpage1.$setVisible(false);
        this.awardpage.$setVisible(false);
        this.taskpage.$setVisible(false);
        this.awardlistpage.$setVisible(false);
        if(index == 0){
            this.signpage.$setVisible(true);
            this.signpage1.$setVisible(true);
        }else if(index == 1){
            this.taskpage.$setVisible(true);
            this.taskPropItem.viewport.scrollV = 0;
        }else if(index == 2){
            this.awardpage.$setVisible(true);
            this.awardPropItem.viewport.scrollV = 0;
        }else if(index == 3){  
            this.awardlistpage.$setVisible(true);
            this.awardListItem.viewport.scrollV = 0;
        }
    }


    private setDaySignItem(obj:Object):void{
        for(var i:number = 0; i < 7; i++){
            var btnView:any;
            if(i < 6) {
                btnView = new SignItemView();
                this.signItemViewList.push(btnView);
            }
            else {
                btnView = new SignItemView2();
                this.signItem2 = btnView;
            }
            
            btnView.init();
            var islight = 0;
            var islost = 0;
            var isget = 0;
           
            var days:number = obj["stats"]["~days"];
            
            var isComplete:boolean = obj["completed"];
            var num = obj["rewards"][i]["items"][0]["value"];
            var dayidx = i + 1;  

//-----test
 //           days = 7;
 //           isComplete = true;
//-----
            this.signDay = days;

            if(isComplete == true){
                this.btnSign.$setEnabled(false);
                this.btnSign.label = this.getStr;
                if(dayidx < days) islost = 1;
                else if(dayidx == days){
                    isget = 1;
                    islight = 1;
                }                
            }else{
                if(i < days) islost = 1;
                else if(i == days) islight = 1;
            }
           
            if(i == 6) num = num/2;
            
            var data:Object = {"tittle":i,
                num:num,
                isget:isget,   
                isloss:islost,  
                islight:islight  
             };
             
            btnView.setData(data);
            this.signpage.addChild(btnView);
            btnView.setBtnName("btnDay_" + i);
            var xx = i%4;
            var yy = Math.floor(i/4);
            btnView.x = 35 + 246*xx;
            btnView.y = 30 + 255*yy;
        }
    }

    private setDailyTaskItem(data:Object):void{
        var self = this;
        var length = data["length"];
        this.dailyTaskData = data;
        var account = GlobalDataManager.getInstance().getAccountData();

        for(var i:number = 0; i < length; i++){
            var btnView:TaskItemView = new TaskItemView();

            var obj:Object = this.dailyTaskData[i];
            var num = obj["rewards"][0]["items"][0]["value"];
            var tittle = obj["conditions"][0]["title"];
            var desc = obj["conditions"][0]["description"];
            var completed = obj["completed"];  
            var isGetward:boolean = false;
            var icon = obj["description"];
            var id = obj["id"];
            var tdata = (obj["action"]["data"]).split("|");
            var turnview = tdata[1];//obj["action"]["text"];
            if(icon == "yaoqing") completed = this.isRegist;
            btnView.init();
            var data:Object = {
                tittle:tittle,
                desc:desc,
                awardnum:num,
                islight:0,
                icon:icon,
                turnview:turnview,
                completed:completed,
                func:null,
                id:id
             };
            btnView.setData(data);
            self.taskgroupPropItem.addChild(btnView);
            btnView.setBtnName("btnTask_" + i);

            btnView.x = 28;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
            btnView.y = (btnView.getViewHeight() + 22) * i;
            self.taskItemViewList.push(btnView);
        }
    }

    private TaskItemCallBack(){
        this.hiden();
    }

    private setAwardView(data:Object):void{
        var self = this;
        var length = data["length"];
        this.awardData = data;

        for(var i:number = 0; i < length; i++){
            var btnView:GetAwardtemView = new GetAwardtemView();
            btnView.init();
            var obj:Object = this.awardData[i];

            var tittle = obj["rewardable"]["title"];
            var desc = obj["rewardable"]["title"];
            var completed = false;
            var icon = "";
            var value = obj["reward"]["value"];
            var needlv = obj["reward"]["value"];
            var turnview = "";
            var obj = obj;
            var data:Object = {
                tittle:tittle,
                desc:desc,
                icon:icon,
                obj:obj,
                awardnum:value,
                completed:completed,
                needlv:needlv,
                turnview:turnview,
                hander:this,
                islight:0
            };
            btnView.setData(data);
            self.awardgroupListItem.addChild(btnView);
            btnView.setBtnName("btnAward_" + i);
            btnView.x = 28;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
            btnView.y = (btnView.getViewHeight() + 22) * i;
            self.awardiewList.push(btnView);
        }
    }

    private setLvAwardItem(data:Object):void{
        var self = this;
        var length = data["length"];

        this.LvAwardkData = data;
        var objlvl:Object = this.LvAwardkData[0];
        var maxtasklvl = objlvl["conditions"][0]["result"];
        
      
        for(var i:number = 0; i < length; i++){
            var obj:Object = this.LvAwardkData[i];
            var curlvl = obj["conditions"][0]["result"];
            if(curlvl > maxtasklvl) maxtasklvl = curlvl;
            var btnView:AwardtemView = new AwardtemView();
            btnView.init();
            
            var tittle = obj["title"];
            var desc = obj["description"];
            var completed = obj["completed"];
            var tdata = (obj["action"]["data"]).split("|");
            var icon = tdata[0];
            var value = obj["rewards"][0]["items"][0]["value"];
            var needlv = obj["conditions"][0]["rule"]["value"];
            var turnview = tdata[1];
            var data:Object = {
                tittle:tittle,
                desc:desc,
                icon:icon,
                awardnum:value,
                completed:completed,
                needlv:needlv,
                turnview:turnview,
                hander:this,
                islight:0
            };
            btnView.setData(data);
            self.awardgroupPropItem.addChild(btnView);
            btnView.setBtnName("btnAward_" + i);
            btnView.x = 28;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
            btnView.y = (btnView.getViewHeight() + 22) * i;
            self.awardItemViewList.push(btnView);
        }

        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        if(maxtasklvl < accountData.getLvl()){
            var deff = accountData.getLvl() - maxtasklvl;
            UisManager.getInstance().pushUpLvlEvent(deff);
        }
    }

    private getOptionBtnViewByIndex(index:number):OptionBtnView{
        var retView:OptionBtnView = null;
        var self = this;
        for(var i:number=0,lengthI = self.arrOptionBtn.length;i<lengthI;i++){
            var btnView:OptionBtnView = self.arrOptionBtn[i];
            if(btnView==null)
                continue;
            var btnName:string = btnView.getBtnName();
            var strArr:Array<string> = btnName.split("_");
            if(strArr.length!=2){
                continue;
            }
            var cIndex:number = Number(strArr[1]);
            if(index==cIndex){
                retView = btnView;
                break;
            }
        }

        return retView;
    }

    private updateOptionBtnPos():void{
        var self = this;
        var posY:number = 0;
        for(var i:number=0,lengthI:number = self.arrOptionBtn.length;i<lengthI;i++){
            var item:OptionBtnView = self.arrOptionBtn[i];
            if(item==null)
                continue;
            item.y = posY;
            posY += item.getViewHeight() + 32;
        }
        self.scrOptionBtn.height = posY;
    }


    public getTaskGroup():eui.Group{
        return this.mallskingroup;
    }

    public getOptionBtn():OptionBtnView{
        var self = this;
        if(self.arrOptionBtn==null||self.arrOptionBtn.length<2)
            return null;
        return self.arrOptionBtn[1];
    }

    public getBackBtn():eui.Button{
        return this.btnBack;
    }

    public getRegisterGiftPackBtn():eui.Button{
        var self = this;
        if(self.taskItemViewList==null||self.taskItemViewList.length<1)
            return null;
        var taskItem:TaskItemView = self.taskItemViewList[0];
        if(taskItem==null)
            return null;
        
        return taskItem.getConfirmBtn();
    }
    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.mallskingroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.mallskingroup.scaleX = 
            self.mallskingroup.scaleY = 1;
            return;
        }
        self.mallskingroup.scaleX = 
        self.mallskingroup.scaleY = gapNum;
    }
}
