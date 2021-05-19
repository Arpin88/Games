// TypeScript file

class DebugView extends BaseView{
    public static NAME:string = "DebugSkin";
    
    public constructor(){
        super(DebugView.NAME);
    }

    private group1:eui.Group;
    private group2:eui.Group;

    private btnCreate:eui.Button;
    private btnOpen:eui.Button;
    private btnClose:eui.Button;
    private lblAccount0:eui.Label;
    private lblAccount1:eui.Label;

    private scrRoom:eui.Scroller;
    private groupRoom:eui.Group;
    private groupRData:eui.Group;
    private groupRDetail:eui.Group;
    private groupRCreate:eui.Group;
    private editCCurCSIndex:eui.EditableText;
    private btnChangeCurCSIndex:eui.Button;
    private btnRCreate:eui.Button;
    private lblTime:eui.Label;
    private editCurCSIndex:eui.EditableText;
    private lblRAccount0:eui.Label;
    private lblRAccount1:eui.Label;
    private lblRState:eui.Label;
    private editJson:eui.EditableText;
    private btnROpen:eui.Button;
    private btnRClose:eui.Button;
    private btnRBack:eui.Button;
    private btnRRecovery:eui.Button;
    private btnRGetBattleInfo:eui.Button;
    private editBattleInfo:eui.EditableText;

    private configs:any;

    private arrDebugItemView:Array<DebugItemView>;
    private arrDebugRoomData:Array<DebugRoomData>;
    private arrWaitRemoveRid:Array<number>;
    // private arrCreateDebugRoomData:Array<DebugRoomData>;
    private curDebugRoomData:DebugRoomData;
    private curCSIndex:number;


    private countDown:number = 5;  
    private timeCounter:number;     
    private timer:egret.Timer;   

    

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }     

        self.group1.visible = false;
        self.group2.visible = false;
        
        var configs:any = RES.getRes("combatDebug_json");
        self.configs = configs;

        var data = super.getData();
        var type = data.type;
        if(type==1){
            self.group1.visible = true;
            self.setBtnState(0);
            var user0 = self.configs["user0"];
            var user1 = self.configs["user1"];
            var cards0 = self.configs["cards0"];
            var cards1 = self.configs["cards1"];
            self.lblAccount0.text = "用户1： 账户:"+user0.account+"  昵称："+user0.nick + "  上场卡牌数量："+cards0.length +"  血量："+user0.hp;
            self.lblAccount1.text = "用户2： 账户:"+user1.account+"  昵称："+user1.nick + "  上场卡牌数量："+cards1.length +"  血量："+user1.hp;
            self.reqUserCombatState();
        }else if(type==2){
            self.group2.visible = true;
            // self.btnRCreate.visible = true;
            self.groupRCreate.visible = true;
            self.groupRData.visible = false;
            self.groupRDetail.visible = false;
            
            var roomSection = self.configs["roomSection"];
            var curCSIndex:number = roomSection["curCSIndex"];
            var curCSIndexObj = egret.localStorage.getItem("curCSIndex");
            if(curCSIndexObj!=null&&Number(curCSIndexObj)>curCSIndex)
                curCSIndex = Number(curCSIndexObj);
            self.updateCSShow(curCSIndex);
            self.editCCurCSIndex.text = curCSIndex+"";

            self.arrDebugItemView = new Array<DebugItemView>();
            self.arrDebugRoomData = new Array<DebugRoomData>();
            self.arrWaitRemoveRid = new Array<number>();
            // self.arrCreateDebugRoomData = new Array<DebugRoomData>();
            self.curDebugRoomData = null;
            self.connectServer();
        }
        
    }

    protected sleep():void{
        var self = this;

        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.TouchTap,self);
        }
    }


    private TouchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            if(tar==self.btnCreate){
                var user0 = self.configs["user0"];
                var user1 = self.configs["user1"];
                var cards0:Array<any> = self.configs["cards0"];
                var cards1:Array<any> = self.configs["cards1"];
                var skills = self.configs["skills"];

                var cardSection:Array<any> = self.configs["cardSection"];

                var cards2:Array<any> = [];
                if(cards0.length>0){

                    for(var j:number=0,lengthJ=cards0.length;j<lengthJ;j++){
                        var cardItem = cards0[j];
                        if(typeof cardItem == "number"){
                            for(var i:number=0,lengthI=cardSection.length;i<lengthI;i++){
                                var itemCS:any = cardSection[i];
                                if(itemCS==null)
                                    continue;
                                var code = itemCS.code;
                                if(code==null)
                                    continue;
                                if(Number(code)==Number(cardItem)){
                                    cards2.push(itemCS);
                                    break;
                                }
                            }
                        }else{
                            cards2.push(cardItem);
                        }
                    }
                    
                }

                var cards3:Array<any> = [];
                if(cards1.length>0){
                    for(var j:number=0,lengthJ=cards1.length;j<lengthJ;j++){
                        var cardItem = cards1[j];
                        if(typeof cardItem == "number"){
                            for(var i:number=0,lengthI=cardSection.length;i<lengthI;i++){
                                var itemCS:any = cardSection[i];
                                if(itemCS==null)
                                    continue;
                                var code = itemCS.code;
                                if(code==null)
                                    continue;
                                if(Number(code)==Number(cardItem)){
                                    cards3.push(itemCS);
                                    break;
                                }
                            }
                        }else{
                            cards3.push(cardItem);
                        }
                    }
                    
                }

                let obj = new Object();
                obj["user0"] = user0;
                obj["user1"] = user1;
                // if(cards2.length<=0)
                //     obj["cards0"] = cards0;
                // else
                    obj["cards0"] = cards2;
                // if(cards3.length<=0)
                //     obj["cards1"] = cards1;
                // else
                    obj["cards1"] = cards3;
                obj["skills"] = skills;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM,obj,true);
            }else if(tar==self.btnOpen){
                var href:string = "";
                if (window.location) {
                    let search:string = location.search;
                    if (search != "") {
                        href = location.href;
                        href = href.substring(0, href.length-search.length);
                    }
                }
                if(href!=""){
                    var user0 = self.configs["user0"];
                    var user1 = self.configs["user1"];
                    var accountStr0:string ="account="+user0.account;
                    var accountStr1:string ="account="+user1.account;
                    // var match:string = "&match=1";
                    // window.open(href+"?"+accountStr0+match,"_blank");
                    // window.open(href+"?"+accountStr1+match,"_blank");
                    window.open(href+"?"+accountStr0,"_blank");
                    window.open(href+"?"+accountStr1,"_blank");
                }
            }else if(tar==self.btnClose){
                var user = self.configs["user0"];
                let obj = new Object();
                obj["user"] = user;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_CLOSE_ROOM,obj,true);

            }else if(tar==self.btnRCreate){
                self.onClickCreateRoomBtn();
            }else if(tar==self.btnRBack){
                self.groupRData.visible = true;
                self.groupRDetail.visible = false;
                self.startTimer();
            }else if(tar==self.btnROpen){
                if(self.curDebugRoomData==null)
                    return;
                var href:string = "";
                if (window.location) {
                    let search:string = location.search;
                    if (search != "") {
                        href = location.href;
                        href = href.substring(0, href.length-search.length);
                    }
                }
                if(href!=""){
                    var user0 = self.curDebugRoomData.user0;
                    var user1 = self.curDebugRoomData.user1;
                    var accountStr0:string ="account="+user0.account;
                    var accountStr1:string ="account="+user1.account;
                    var match:string = "&match=1";
                    window.open(href+"?"+accountStr0+match,"_blank");
                    window.open(href+"?"+accountStr1+match,"_blank");
                }
            }else if(tar==self.btnRClose){
                if(self.curDebugRoomData==null)
                    return;
                var user = self.curDebugRoomData.user0;
                let obj = new Object();
                obj["user"] = user;
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_CLOSE_ROOM,obj,true);

            }else if(tar==self.btnRRecovery){
                self.onClickRecoveryBtn();
            }else if(tar==self.btnChangeCurCSIndex){
                var newCSIndex:number = Number(self.editCCurCSIndex.text);
                self.curCSIndex = newCSIndex;
                self.editCurCSIndex.text = newCSIndex+"";
                egret.localStorage.setItem("curCSIndex",newCSIndex+"");   
            }else if(tar==self.btnRGetBattleInfo){
                if(self.curDebugRoomData==null)
                    return;
                
                self.reqGetBattleInfo(self.curDebugRoomData.rid);
            }
        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name==null)
                return;
            if(group.name.substr(0,8)=="groupDI_"){
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.onClickDebugItem(cIndex);
            }
        }
    }


    private reqUserCombatState():void{
        var self = this;
        var user = self.configs["user0"];

        let obj = new Object();
        obj["user"] = user;
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE,obj,true);
    }

    public recvData(cmd:CmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM:
            self.setBtnState(data);
            break;
            case CmdDef.CMD_DEBUG_CLOSE_ROOM:
            self.setBtnState(data);
            break;
            case CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE:
            self.setBtnState(data);
            break;
            case CmdDef.CMD_DEBUG_MANY_CREATE_ROOM:
            self.onCreateMRoom(data);
            break;
            case CmdDef.CMD_DEBUG_GAME_CONNECT:
            self.onConnectGame(data);
            break;
            case CmdDef.CMD_DEBUG_GET_ROOM_DATA:
            self.setRoomData(data);
            break;
            case CmdDef.CMD_DEBUG_GET_ROOM_DETAIL:
            self.setRoomDetail(data);
            break;
            case CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA:
            self.setRoomReserveData(data);
            break;
            case CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD:
            self.onRemoveRoomRecord(data);
            break;
            case CmdDef.CMD_DEBUG_GET_BATTLE_INFO:
            self.onGetBattleInfo(data);
            break;
        }
    }

    private setBtnState(state:number){
        var self = this;
        self.btnCreate.visible = state==0;
        self.btnOpen.visible = state==1;
        self.btnClose.visible = state==1;
    }

    private onClickCreateRoomBtn():void{
        var self = this;

        var userSection = self.configs["userSection"];
        var accountPrefix:string = userSection["accountPrefix"];
        var start:number = userSection["start"];
        var count:number = userSection["count"];
        var ticketPrefix:string = userSection["ticketPrefix"];
        var uidPrefix:string = userSection["uidPrefix"];


        var arrCards:Array<any> = new Array<any>();
        var cardSection = self.configs["cardSection"];
        var countGap:number = 25;
        for(var i:number= 0,lengthI:number = cardSection.length;i<lengthI;i+=countGap){
            var arrCard:Array<any> = new Array<any>();
            for(var j:number=0;j<countGap;j++){
                var cardItem = cardSection[i+j];
                arrCard.push(cardItem);
            }
            arrCards.push(arrCard);
        }

        var roomSection = self.configs["roomSection"];
        // var curCSIndex:number = roomSection["curCSIndex"];
        var curCSIndex:number = self.curCSIndex;
        var roomCount:number = roomSection["count"];

        var cuser0 = self.configs["user0"];
        var cuser1 = self.configs["user1"];
        var arrDebugRoomData:Array<DebugRoomData> = new Array<DebugRoomData>();
        var rid = 0;
        for(var i:number = start,lengthI:number=roomCount*2+start;i<lengthI;i+=2){
            
            var user0:any = {};
            for(var key in cuser0){
                user0[key] = cuser0[key]
            }
            var user1:any = {};
            for(var key in cuser1){
                user1[key] = cuser1[key]
            }
            var index:number = i;
            var str:string = ""+index;
            if(index<10)
                str = "00"+index;
            else if(index<100)
                str = "0"+index;
            user0.nick = index+"";
            user0.ticket = ticketPrefix+str;
            user0.uid = uidPrefix+str;
            user0.account = accountPrefix+str;

            index = i+1;
            str = ""+index;
            if(index<10)
                str = "00"+index;
            else if(index<100)
                str = "0"+index;
            user1.nick = index+"";
            user1.ticket = ticketPrefix+str;
            user1.uid = uidPrefix+str;
            user1.account = accountPrefix+str;

            var debugRoomData:DebugRoomData = new DebugRoomData();
            debugRoomData.rid = rid;
            debugRoomData.user0 = user0;
            debugRoomData.user1 = user1;
            debugRoomData.csindex = curCSIndex;
            

            var cards0:Array<any> = new Array<any>();
            var arrSort:Array<number> = self.getIndexArrByCurCardSectionIndex(curCSIndex,arrCards.length);
            for(var j:number=0,lengthJ=arrSort.length;j<lengthJ;j++){
                var itemIndex:number = arrSort[j];
                var arrCard:Array<any> = arrCards[itemIndex];
                var randIndex:number = self.getRandomInterval(0,arrCard.length-1);
                cards0.push(arrCard[randIndex]);
            }
            debugRoomData.cards0 = cards0;

            var cards1:Array<any> = new Array<any>();
            arrSort = self.getIndexArrByCurCardSectionIndex(curCSIndex+1,arrCards.length);
            for(var j:number=0,lengthJ=arrSort.length;j<lengthJ;j++){
                var itemIndex:number = arrSort[j];
                var arrCard:Array<any> = arrCards[itemIndex];
                var randIndex:number = self.getRandomInterval(0,arrCard.length-1);
                cards1.push(arrCard[randIndex]);
            }

            debugRoomData.cards1 = cards1;
            
            curCSIndex+=2;
            rid++;
            arrDebugRoomData.push(debugRoomData);

            if(curCSIndex>self.curCSIndex)
                self.updateCSShow(curCSIndex);
        }

        // self.arrCreateDebugRoomData = arrDebugRoomData;
        
        for(var i:number = 0,lengthI:number=arrDebugRoomData.length;i<lengthI;i++){
            var debugRoomDataItem:DebugRoomData = arrDebugRoomData[i];
            // egret.Tween.get(this).wait(1000*i).call(function(debugRoomDataItemParam:DebugRoomData,showModel:boolean){
            //     let obj = new Object();
            //     obj["user0"] = debugRoomDataItemParam.user0;
            //     obj["user1"] = debugRoomDataItemParam.user1;
            //     obj["cards0"] = debugRoomDataItemParam.cards0;
            //     obj["cards1"] = debugRoomDataItemParam.cards1;
            //     obj["csindex"] = debugRoomDataItemParam.csindex;
            //     obj["androidDebug"] = true;
            //     let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            //     HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_MANY_CREATE_ROOM,obj,showModel);
            // }.bind(self,debugRoomDataItem,i==0))
            var showModel:boolean = i==0;
            let obj = new Object();
            obj["user0"] = debugRoomDataItem.user0;
            obj["user1"] = debugRoomDataItem.user1;
            obj["cards0"] = debugRoomDataItem.cards0;
            obj["cards1"] = debugRoomDataItem.cards1;
            obj["csindex"] = debugRoomDataItem.csindex;
            obj["androidDebug"] = true;
            let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_MANY_CREATE_ROOM,obj,showModel);
        }

        // self.reqGetRoomReserveData();
    }

    private onClickRecoveryBtn():void{
        var self = this;
        if(self.curDebugRoomData==null)
            return;
        
        var user = self.curDebugRoomData.user0;
        let obj = new Object();
        obj["user"] = user;
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_CLOSE_ROOM,obj,true);

        var rid:number = self.curDebugRoomData.rid;
        self.resetCreateDebugRoom(rid);

        self.groupRData.visible = true;
        self.groupRDetail.visible = false;
        self.startTimer();        
    }

    private getIndexArrByCurCardSectionIndex(curCSIndex:number,count:number):Array<number>{
        var index:number = 0;
        var arrIndex:Array<number> = new Array<number>();
        for(var i:number= 0;i<count;i++){
            arrIndex.push(i);
        }

        //n个数中任取m个数的不同取法的个数
        //C(n，m)=n×(n-1)×…×(n-m+1)/m×(m-1)×…×1
        var start:number = 0;    
        var subIndex:number = 0;
        for(var z:number=0;z<count;z++){
            var x = count-z-1;
            var y = 4;
            var num1 = x;
            var num2 = y;
            for(var i=1;i<y;i++){
                num1*=(x-i);
                num2*=(y-i);
            }
            var num = num1/num2;
            subIndex+=num;
            if(subIndex>curCSIndex){
                start = z;
                break;
            }
            index+=num;
        }

        var result:Array<number> = new Array<number>();
        for(var a:number=start,lengthA=arrIndex.length;a<lengthA;a++){
            for(var b:number=a+1;b<lengthA;b++){
                for(var c:number=b+1;c<lengthA;c++){
                    for(var d:number=c+1;d<lengthA;d++){
                        for(var e:number=d+1;e<lengthA;e++){
                            if(index==curCSIndex){
                                result.push(a);
                                result.push(b);
                                result.push(c);
                                result.push(d);
                                result.push(e);
                            }
                            index++;
                        }
                    }
                }
            }
        }
        
        return result;
    }

    private recursionIndex(index:number,arr:Array<number>){
        for(var i:number= 0,lengthI=arr.length;i<lengthI;i++){
            if(i==index)
                continue;
            return i;
        }
    }

    private getRandomInterval(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }

    private connectServer():void{

        var self = this;

        var user:any = self.configs["user666"];
        if(user==null)
            return;
        GameConfig.ticket = user.ticket;

        GlobalDataManager.getInstance().setRUUID("1234567890");
        GlobalDataManager.getInstance().setRoom("999999");
        var scode:string = "192.168.0.48";
        GlobalDataManager.getInstance().setThredID(0);
        GlobalDataManager.getInstance().setGameServerName(scode);
        var surl:string = "ws://"+scode+":5000/GameServer/gateway";
        let server: ServerData = new ServerData();
        server.setSname(scode);
        server.setSurl(surl);
        server.setResolver(DebugWebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        DebugWebSocketManager.getInstance().registerServer(server);
        DebugWebSocketManager.getInstance().connectServer(scode, true);
    }

    
    private onCreateMRoom(data:any):void{
        var self = this;
        self.startTimer();
        self.onConnectGame({result:2});

        // self.arrCreateDebugRoomData
    }


    private onConnectGame(data:any):void{
        if(data==null)
            return;
        var result = data.result;
        var self = this;
        if(result==1){
            // self.btnRCreate.visible = true;
            self.groupRCreate.visible = true;
            self.groupRData.visible = false;
            
        }else if(result==2){
            
            self.reqUpdateRoomData();
            self.startTimer();
            // self.btnRCreate.visible = false;
            self.groupRCreate.visible = false;
            self.groupRData.visible = true;

            var reserveData = data.reserveData;
            if(reserveData==null)
                return;

            var userSection = self.configs["userSection"];
            var accountPrefix:string = userSection["accountPrefix"];

            var curCSIndex:number = 0;

            var arrDebugRoomData:Array<DebugRoomData> = new Array<DebugRoomData>();
            for(var key in reserveData){
                var rid:number = Number(key);
                var debugItemView:DebugItemView = self.getDebugItemView(rid);
                if(debugItemView==null)
                    continue;
                
                var roomDetail = reserveData[key];

                var debugRoomData:DebugRoomData = new DebugRoomData();
                debugRoomData.rid = rid;
                var csindex:number = roomDetail.csindex;
                debugRoomData.csindex = csindex;
                if(csindex>curCSIndex)
                    curCSIndex = csindex;

                debugRoomData.user0 = roomDetail.users[0];

                var uid0:string = debugRoomData.user0.uid;
                var mantissa0:string = uid0.substring(uid0.length-3,uid0.length);
                debugRoomData.user0.nick = Number(mantissa0)+"";
                debugRoomData.user0.account = accountPrefix+mantissa0;

                debugRoomData.user1 = roomDetail.users[1];

                var uid1:string = debugRoomData.user1.uid;
                var mantissa1:string = uid1.substring(uid1.length-3,uid1.length);
                debugRoomData.user1.nick = Number(mantissa1)+"";
                debugRoomData.user1.account = accountPrefix+mantissa1;

                debugRoomData.cards0 = roomDetail.cards[0];
                debugRoomData.cards1 = roomDetail.cards[1];

                arrDebugRoomData.push(debugRoomData);
            }

            self.arrDebugRoomData = arrDebugRoomData;
            self.updateCSShow(curCSIndex);
        }

        
    }

    private setRoomData(data:any):void{
        if(data==null)
            return;
        
        var self=  this;
        self.startTimer();

        var roomData:any = data.roomData;
        if(roomData==null||roomData.length<=0)
            return;
        
        self.cleanRoomData(roomData);
        for(var key in roomData){
            var state:string = roomData[key];
            var rid:number = Number(key);
            var item = {rid:rid,state:state};
            var debugItemView:DebugItemView = self.getDebugItemView(rid);
            if(debugItemView==null)
                continue;
            debugItemView.updateShow(item);

            // if(hasDeatilData&&self.getDebugRoomDataByRid(rid)==null){
            //     hasDeatilData = false;
            // }

            if(Number(state)==1){
                self.resetCreateDebugRoom(rid);
            }
        }

        // if(!hasDeatilData)
        //     self.reqGetRoomReserveData();
    }

    private resetCreateDebugRoom(rid:number):void{
        var self = this;
        
        var debugRoomData:DebugRoomData = null;
        var dIndex:number = -1;
        for(var i:number = 0,lengthI:number=self.arrDebugRoomData.length;i<lengthI;i++){
            var debugRoomDataItem:DebugRoomData= self.arrDebugRoomData[i];
            if(debugRoomDataItem==null)
                continue;
            if(debugRoomDataItem.rid==rid){
                debugRoomData = debugRoomDataItem;
                dIndex = i;
                break;
            }
        }
        if(debugRoomData==null){
            var hasData:boolean = false;
            for(var i:number=0,lengthI:number =self.arrWaitRemoveRid.length;i<lengthI;i++){
                var numItem:number = self.arrWaitRemoveRid[i];
                if(numItem==rid){
                    hasData = true;
                    break;
                }
            }
            if(hasData)
                return;
            self.arrWaitRemoveRid.push(rid);
            self.reqGetRoomReserveData();
            return;
        }

        self.reqRemoveRoomRecord(rid);
    }

    private getDebugItemView(rid:number):DebugItemView{
        var debugItemView:DebugItemView = null;
        var self = this;

        for(var i:number=0,lengthI:number=self.arrDebugItemView.length;i<lengthI;i++){
            var item:DebugItemView = self.arrDebugItemView[i];
            if(item==null)
                continue;
            if(item.getRid()==rid){
                debugItemView = item;
                break;
            }
        }

        if(debugItemView==null){
            debugItemView = new DebugItemView();
            debugItemView.initData({groupName:"groupDI_"+rid});
            self.groupRoom.addChild(debugItemView);
            self.arrDebugItemView.push(debugItemView);
        }

        return debugItemView;
    }

    private cleanRoomData(roomData:any):void{
        var self = this;
        if(self.arrDebugItemView.length<=0)
            return;
        for(var i:number=self.arrDebugItemView.length-1;i>=0;i--){
             var item:DebugItemView = self.arrDebugItemView[i];
            if(item==null)
                continue;
            var rid:number = item.getRid();
            if(roomData[rid+""]==null){
                if(item.parent!=null)
                    item.parent.removeChild(item);
                self.arrDebugItemView.splice(i,1);
            }
        }
        
    }

    private cleanRoomDataByRid(rid:number):void{
        var self = this;
        if(self.arrDebugItemView.length<=0)
            return;
        for(var i:number=self.arrDebugItemView.length-1;i>=0;i--){
             var item:DebugItemView = self.arrDebugItemView[i];
            if(item==null)
                continue;
            if(rid==item.getRid()){
                if(item.parent!=null)
                    item.parent.removeChild(item);
                self.arrDebugItemView.splice(i,1);
            }
        }
        
    }

    private onClickDebugItem(rid:number):void{
        var self = this;
        var debugItemView:DebugItemView = self.getDebugItemView(rid);
        if(debugItemView==null||debugItemView.getState()==1)
            return;
        
        // self.reqGetRoomDetail(rid);

        var debugRoomData:DebugRoomData = null;
        for(var i:number = 0,lengthI:number=self.arrDebugRoomData.length;i<lengthI;i++){
            var debugRoomDataItem:DebugRoomData= self.arrDebugRoomData[i];
            if(debugRoomDataItem==null)
                continue;
            if(debugRoomDataItem.rid==rid){
                debugRoomData = debugRoomDataItem;
                break;
            }
        }

        if(debugRoomData==null){
            self.reqGetRoomDetail(rid);
            return;
        }

        self.setRoomDetailByData(debugRoomData,debugItemView.getState());
    }

    private setRoomDetailByData(debugRoomData:DebugRoomData,state:number):void{
        var self = this;
        self.curDebugRoomData = debugRoomData;
        self.stopTimer();

        self.groupRData.visible = false;
        self.groupRDetail.visible = true;

        var user0 = debugRoomData.user0;
        var user1 = debugRoomData.user1;
        var cards0 = debugRoomData.cards0;
        var cards1 = debugRoomData.cards1;
        self.lblRAccount0.text = "用户1： 账户:"+user0.account+"  昵称："+user0.nick + "  上场卡牌数量："+cards0.length +"  血量："+user0.hp;
        self.lblRAccount1.text = "用户2： 账户:"+user1.account+"  昵称："+user1.nick + "  上场卡牌数量："+cards1.length +"  血量："+user1.hp;
        
        var stateStr:string ="";
        var color:number = 0xFFFFFF;
        if(state==-1)
            stateStr = "未开启"
        else if(state==0)
            stateStr = "正常";
        else if(state==1)
            stateStr = "完成";
        else if(state==2)
            stateStr = "异常";
        stateStr = "状态:"+stateStr;

        stateStr += "  测试下标:"+debugRoomData.csindex;

        stateStr += "  房间号:"+debugRoomData.rid;
        self.lblRState.text = stateStr;



        var jsonStr = JSON.stringify(cards0)+","+JSON.stringify(cards1);
        self.editJson.text = jsonStr;
    }

    private startTimer():void{
        var self = this;
        if(self.timer==null){
            self.timeCounter = self.countDown;
            self.timer = new egret.Timer(1000,0);
            self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
        }
        self.updateTimeShow();
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
        self.timeCounter--;
        self.updateTimeShow();

        if(self.timeCounter==0){
            self.stopTimer();
            self.timeCounter = self.countDown;
            self.reqUpdateRoomData();
        }   
    }

    private updateTimeShow():void{
        var self = this;
        self.lblTime.text = "刷新倒计时: "+self.parseTime(self.timeCounter); 
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

    private updateCSShow(csindex:number):void{
        var self = this;
        if(self.curCSIndex>csindex)
            return;
        self.curCSIndex = csindex;
        self.editCurCSIndex.text = csindex+"";
        egret.localStorage.setItem("curCSIndex",csindex+"");
    }

    private reqUpdateRoomData():void{
        this.sendRequst(CmdDef.CMD_DEBUG_GET_ROOM_DATA);
    }

    private reqGetRoomDetail(rid:number):void{
        this.sendRequst(CmdDef.CMD_DEBUG_GET_ROOM_DETAIL,{rid:rid},true);
    }

    private reqGetRoomReserveData():void{
        this.sendRequst(CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA);
    }

    private reqRemoveRoomRecord(rid:number):void{
        this.sendRequst(CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD,{rid:rid});
    }

    private reqGetBattleInfo(rid:number):void{
        this.sendRequst(CmdDef.CMD_DEBUG_GET_BATTLE_INFO,{rid:rid});
    }

    private setRoomDetail(data:any):void{
        if(data==null)
            return;

        var roomDetails = data.roomDetail;
        var roomDetail = null;
        for(var key in roomDetails){
            roomDetail = roomDetails[key];
            break;
        }
        if(roomDetail==null)
            return;
            
        var rid = roomDetail.room;

        var self = this;
        var debugItemView:DebugItemView = self.getDebugItemView(rid);
        if(debugItemView==null)
            return;
        
        var userSection = self.configs["userSection"];
        var accountPrefix:string = userSection["accountPrefix"];

        var debugRoomData:DebugRoomData = new DebugRoomData();
        debugRoomData.rid = rid;
        debugRoomData.user0 = roomDetail.users[0];

        var uid0:string = debugRoomData.user0.uid;
        var mantissa0:string = uid0.substring(uid0.length-3,uid0.length);
        debugRoomData.user0.nick = Number(mantissa0)+"";
        debugRoomData.user0.account = accountPrefix+mantissa0;

        debugRoomData.user1 = roomDetail.users[1];

        var uid1:string = debugRoomData.user1.uid;
        var mantissa1:string = uid1.substring(uid1.length-3,uid1.length);
        debugRoomData.user1.nick = Number(mantissa1)+"";
        debugRoomData.user1.account = accountPrefix+mantissa1;

        if(roomDetail.cards==null)
            return;

        debugRoomData.cards0 = roomDetail.cards[0];
        debugRoomData.cards1 = roomDetail.cards[1];
        self.setRoomDetailByData(debugRoomData,debugItemView.getState());
    }

    private getDebugRoomDataByRid(rid:number):DebugRoomData{
        var debugRoomData:DebugRoomData = null;
        var self = this;
        for(var i:number=0,lengthI:number=self.arrDebugRoomData.length;i<lengthI;i++){
            var debugRoomDataItem:DebugRoomData = self.arrDebugRoomData[i];
            if(debugRoomDataItem==null)
                continue;
            if(debugRoomDataItem.rid==rid){
                debugRoomData = debugRoomDataItem;
                break;
            }
        }
        return debugRoomData;
    }

    private setRoomReserveData(data:any):void{
        if(data==null)
            return;
        
        var reserveData = data.reserveData;
        if(reserveData==null||reserveData.length<=0)
            return;
        var self = this;
        var userSection = self.configs["userSection"];
        var accountPrefix:string = userSection["accountPrefix"];

        var arrCards:Array<any> = new Array<any>();
        var cardSection = self.configs["cardSection"];
        var countGap:number = 25;
        for(var i:number= 0,lengthI:number = cardSection.length;i<lengthI;i+=countGap){
            var arrCard:Array<any> = new Array<any>();
            for(var j:number=0;j<countGap;j++){
                var cardItem = cardSection[i+j];
                arrCard.push(cardItem);
            }
            arrCards.push(arrCard);
        }

        var curCSIndex:number = 0;
        for(var key in reserveData){
            var rid:number = Number(key);
            var debugItemView:DebugItemView = self.getDebugItemView(rid);
            if(debugItemView==null)
                continue;
             
            var debugRoomData:DebugRoomData = self.getDebugRoomDataByRid(rid);
            if(debugRoomData==null){
                debugRoomData = new DebugRoomData();
                debugRoomData.rid = rid;

                var roomDetail = reserveData[key];

                var csindex:number = roomDetail.csindex;
                debugRoomData.csindex = csindex;
                if(csindex>curCSIndex){
                    self.updateCSShow(curCSIndex);
                }

                debugRoomData.user0 = roomDetail.users[0];

                var uid0:string = debugRoomData.user0.uid;
                var mantissa0:string = uid0.substring(uid0.length-3,uid0.length);
                debugRoomData.user0.nick = Number(mantissa0)+"";
                debugRoomData.user0.account = accountPrefix+mantissa0;

                debugRoomData.user1 = roomDetail.users[1];

                var uid1:string = debugRoomData.user1.uid;
                var mantissa1:string = uid1.substring(uid1.length-3,uid1.length);
                debugRoomData.user1.nick = Number(mantissa1)+"";
                debugRoomData.user1.account = accountPrefix+mantissa1;

                debugRoomData.cards0 = roomDetail.cards[0];
                debugRoomData.cards1 = roomDetail.cards[1];

                self.arrDebugRoomData.push(debugRoomData);
            }

            var needRemove:boolean = false;
            if(self.arrWaitRemoveRid.length>0){
                for(var i:number=0,lengthI=self.arrWaitRemoveRid.length;i<lengthI;i++){
                    if(self.arrWaitRemoveRid[i]==rid){
                        needRemove = true;
                        self.arrWaitRemoveRid.splice(i,1);
                        break;
                    }
                }
            }

            if(!needRemove)
                continue;
            
            self.resetCreateDebugRoom(rid);
        }
    }

    private onRemoveRoomRecord(data:any):void{
        if(data==null)
            return;
        
        var result =data.result;
        if(result!=1)
            return;
        
        var rid:number =data.rid;

        var self =this;

        self.cleanRoomDataByRid(rid);
        var debugRoomData:DebugRoomData = null;
        for(var i:number = 0,lengthI:number=self.arrDebugRoomData.length;i<lengthI;i++){
            var debugRoomDataItem:DebugRoomData= self.arrDebugRoomData[i];
            if(debugRoomDataItem==null)
                continue;
            if(debugRoomDataItem.rid==rid){
                debugRoomData = debugRoomDataItem;
                self.arrDebugRoomData.splice(i,1);
                break;
            }
        }

        var arrCards:Array<any> = new Array<any>();
        var cardSection = self.configs["cardSection"];
        var countGap:number = 25;
        for(var i:number= 0,lengthI:number = cardSection.length;i<lengthI;i+=countGap){
            var arrCard:Array<any> = new Array<any>();
            for(var j:number=0;j<countGap;j++){
                var cardItem = cardSection[i+j];
                arrCard.push(cardItem);
            }
            arrCards.push(arrCard);
        }

        var curCSIndex:number = self.curCSIndex;
        debugRoomData.csindex = curCSIndex;
        var cards0:Array<any> = new Array<any>();
        var arrSort:Array<number> = self.getIndexArrByCurCardSectionIndex(curCSIndex,arrCards.length);
        for(var j:number=0,lengthJ=arrSort.length;j<lengthJ;j++){
            var itemIndex:number = arrSort[j];
            var arrCard:Array<any> = arrCards[itemIndex];
            var randIndex:number = self.getRandomInterval(0,arrCard.length-1);
            cards0.push(arrCard[randIndex]);
        }
        debugRoomData.cards0 = cards0;

        var cards1:Array<any> = new Array<any>();
        arrSort = self.getIndexArrByCurCardSectionIndex(curCSIndex+1,arrCards.length);
        for(var j:number=0,lengthJ=arrSort.length;j<lengthJ;j++){
            var itemIndex:number = arrSort[j];
            var arrCard:Array<any> = arrCards[itemIndex];
            var randIndex:number = self.getRandomInterval(0,arrCard.length-1);
            cards1.push(arrCard[randIndex]);
        }

        debugRoomData.cards1 = cards1;
        
        curCSIndex+=2;
        self.updateCSShow(curCSIndex);

        let obj = new Object();
        obj["user0"] = debugRoomData.user0;
        obj["user1"] = debugRoomData.user1;
        obj["cards0"] = debugRoomData.cards0;
        obj["cards1"] = debugRoomData.cards1;
        obj["csindex"] = debugRoomData.csindex;
        obj["androidDebug"] = true;
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_MANY_CREATE_ROOM,obj,false);
    }

    private onGetBattleInfo(data:any):void{
        if(data==null)
            return;
        
        var battleInfo = data.battleInfo;
        if(battleInfo==null||battleInfo.length<=0)
            return;
        var self = this;
        self.editBattleInfo.text =  JSON.stringify(battleInfo);
    }

    private sendRequst(reqCmd:CmdDef,data:any = {},showModel:boolean=false):void{
        var server: ServerData = DebugWebSocketManager.getInstance().getServerByName(GlobalDataManager.getInstance().getGameServerName());
        if(server == null)
            return;
        var obj = new Object();
        obj["cmd"] = reqCmd;
        obj["data"] = data;
        obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
        obj["room"] = GlobalDataManager.getInstance().getRoom();
        DebugWebSocketManager.getInstance().sendMessage(server.getSname(),reqCmd,obj,showModel);
    }
}


class DebugRoomData{
    public rid:number;
    public csindex:number;
    public user0:any;
    public user1:any;
    public cards0:any;
    public cards1:any;
}