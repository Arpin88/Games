// TypeScript file
class CardGroupView extends BaseView{
    public static NAME:string = "CardGroupSkin";

    public constructor(){
        super(CardGroupView.NAME);
    }

    private groupCardGroup:eui.Group;

    private btnBack:eui.Button;     //返回按钮

    // private imgCGBG:eui.Image;      //卡组名称背景图片
    private lblCGName:eui.Label;    //卡组名称文本

    private groupIcon:eui.Group;    //头像图标层
    private imgIcon:eui.Image;  //头像图片
    
    
    private btnAddLv:eui.Button;        //添加等级按钮;
    private groupAttribute:eui.Group;   //卡组属性描述层;

    private scrCardItem:eui.Scroller;   //卡牌图滚动区域
    private groupCardItem:eui.Group;    //卡牌图区域层

    private btnCGChoose:eui.Button; //卡组选择按钮
    private btnCGEdit:eui.Button;   //卡组配置按钮

    private lblLvl:eui.Label;   //等级文本
    private lblHp:eui.Label;    //血量HP文本
    private prbHp:eui.ProgressBar;      //HP进度条
    private lblExpProgress:eui.Label;   //经验进度文本
    private prbExp:eui.ProgressBar;      //等级进度条
    // private lblExp:eui.Label;   //等级文本
    private lblCCost:eui.Label; //卡牌总Cost文本
    private lblCHp:eui.Label;   //卡牌总hp文本
    private lblCAtk:eui.Label;  //卡牌总攻击力文本
    private lblCCapacity:eui.Label; //卡牌总战力
    private lblCEle:eui.Label;  //卡牌五行文本
    private lblCFetters:eui.Label;  //卡牌羁绊文本
    
    


    // private attributeTextField:egret.TextField; //卡组属性描述文本;

    // private arrCardItem:Array<CGSCardItemView> = new Array<CGSCardItemView>();    //卡牌容器
    private arrCardItem:Array<CGCardItemView> = new Array<CGCardItemView>();    //卡牌容器

    private arrTeamConfig:Array<Object>;    //组队配置
    // private arrTeamData:Array<Object>;      //组队信息
    private teamData:Object;      //组队信息
    // private curBattleTeam:Object;           //当前战斗队伍信息
    private arrTeamList:Array<Object>;      //组队列表
    private arrDefaultTeamList:Array<Object> = [];      //默认组队列表

    // private iconMaskShape:egret.Shape;  //头像圆形遮罩;
    private labelObj:any;   //语言包

    protected week():void{
        var self = this;
        
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        GameEventManager.getInstance().addEventListener(HallEvent.updateUserInfo,self,self.onUpdateAccountData);

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);

        self.initView();
    }

    private initView():void{
        var self = this;
        if(self.arrTeamConfig!=null){
            self.initTeamConfig(self.arrTeamConfig);
        }

        self.arrDefaultTeamList.push({name:self.labelObj["lbl_0"],data:new Object()});
        self.arrDefaultTeamList.push({name:self.labelObj["lbl_1"],data:new Object()});
        self.arrDefaultTeamList.push({name:self.labelObj["lbl_2"],data:new Object()});


        self.lblCCost.text = "0/0";
        self.lblCHp.text = "0";
        self.lblCAtk.text = "0";
        self.lblCCapacity.text = "0";
        self.lblCEle.text = "";
        self.lblCFetters.text = "";

        if(self.teamData!=null){
            self.initTeamData(self.teamData);
        }else{
            self.sendGetTeamList();
        }

        self.setUserInfo();
    }

    protected sleep():void{
        var self = this;
        
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        GameEventManager.getInstance().removeEventListener(HallEvent.updateUserInfo,self,self.onUpdateAccountData);

        self.cleanArray(self.arrCardItem);

        self.teamData = null;

        while(self.arrDefaultTeamList.length!=0)
            self.arrDefaultTeamList.pop();
        
        self.labelObj = null;
        // if(self.attributeTextField!=null){
        //     self.attributeTextField.parent.removeChild(self.attributeTextField);
        //     self.attributeTextField = null;
        // }
        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        if(account.getGuide_Step()!=null&&account.getGuide_Step()!="")
            UIManager.getInstance().showUI(GuideView,GameScene.EFFECT_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{step:account.getGuide_Step()});
    }

    private cleanArray(arr:Array<IBaseView>):void{
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
            if(btn==self.btnCGChoose){
                var desArr:Array<string> = new Array<string>();
                var selIndex:number = -1;
                for(var i:number = 0,lengthI:number = self.arrTeamList.length;i<lengthI;i++){
                    var item:any = self.arrTeamList[i];
                    if(item==null)
                        continue;
                    desArr.push(item.name);
                    var dataI:any = item.data;
                    if(dataI!=null){
                        var battle:number = dataI.battle;
                        if(battle!=null&&battle==1){
                            selIndex = i;
                        }
                    }
                }
                var data:Object = {desArr:desArr,selIndex:selIndex,cbHandler:Handler.create(self,self.onChooseTeamListItem)};
                UIManager.getInstance().showUI(FilterView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
            }else if(btn==self.btnCGEdit){
                self.showCardGroupSetView();
            }else if(btn==self.btnAddLv){
                UIManager.getInstance().showUI(RoleUpgradeView);
            }else if(btn==self.btnBack){
                self.hiden();
            }
        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name==null)
                return;
            if(group.name.substr(0,10)=="groupCGCI_"){
                SoundManager.getInstance().PlayClickSound();
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.onClickCardItem(cIndex);
            }
        }
    }

    //显示卡组设置界面
    private showCardGroupSetView():void{
        var self = this;
        var temaData:any = self.teamData["curBattleTeam"];
        if(temaData==null||temaData.name==null){
            temaData = {};
            var name = self.lblCGName.text;
            temaData.name = name;
            var index:number = 0;
            for(var i:number = 0,lengthI:number = self.arrDefaultTeamList.length;i<lengthI;i++){
                var item:any = self.arrDefaultTeamList[i];
                if(item==null||item.name==null)
                    continue;
                
                if(item.name==name){
                    index = i;
                    break;
                }
            }
            temaData.c_index = index;
        }
            
        var data:Object = {teamData:temaData,arrTeamConfig:self.arrTeamConfig,cbUpdateTeam:Handler.create(self,self.onUpdateTeamData)}
        UIManager.getInstance().showUI(CardGroupSetView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
    }

    private onUpdateTeamData(data:any):void{
        this.changeBattleTeam(data);
    }

    //当选择组队列表中的选项
    private onChooseTeamListItem(index:number):void{
        var self = this;
        var obj:any = self.arrTeamList[index];
        var data:any = obj.data;
        var sendData:boolean = true;
        if(data!=null&&data.c_index!=null&&data.battle!=null&&data.battle!=0)
            sendData = false;
        
        if(sendData){
            var fIndex:number = -1;
            for(var i:number = 0,lengthI:number = self.arrTeamList.length;i<lengthI;i++){
                var item:any = self.arrTeamList[i];
                if(item==null)
                    continue;
                var dataI:any = item.data;
                if(dataI!=null){
                    var battle:number = dataI.battle;
                    if(battle!=null&&battle==1){
                        fIndex = i;
                        break;
                    }
                }
            }
            if(fIndex==index)
                sendData = false;
        }
        
        if(sendData){
            //发送切换战斗队伍请求
            let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CHANGE_BATTLE_TEAM,{c_index:index});
        }else{
            UIManager.getInstance().hideUI(FilterView);
        }
    }

    //当点击卡牌
    private onClickCardItem(index:number):void{
        var self = this;
        if(self.arrCardItem==null)
            return;
        
        var view:CGCardItemView = self.arrCardItem[index];
        if(view==null||view.getType()==null||view.getType()!=1)
            return;
        
        // UIManager.getInstance().showUI(CardGroupSetView);
        self.showCardGroupSetView();
    }

    //设置用户数据
    private setUserInfo():void{
        var self = this;
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        
        self.onUpdateAccountData(false);
        // self.prbLv.value = Number((exp/upexp*100).toFixed(2));
        // if(self.groupIcon.numChildren<=0){
            //头像圆形遮罩
        // if(self.iconMaskShape==null){
        //     var iconMaskShape = new egret.Shape();
        //     iconMaskShape.graphics.beginFill( 0x000000);
        //     var width:number = self.groupIcon.width/2;
        //     var height:number = self.groupIcon.height/2;
        //     iconMaskShape.x = width;
        //     iconMaskShape.y = height;
        //     iconMaskShape.graphics.drawCircle( 0, 0,  width);
        //     iconMaskShape.graphics.endFill();
        //     self.groupIcon.addChild(iconMaskShape);
        //     self.iconMaskShape = iconMaskShape;
        // }

        self.imgIcon.source = accountData.getHead_Url();
        // if(self.iconMaskShape!=null)
        //     self.imgIcon.mask = self.iconMaskShape;

         //   var iconUrl:string = accountData.getHead_Url();
            // var iconUrl:string = "http://dl.bbs.9game.cn/attachments/forum/202002/24/163438cmy1qemiieaefmym.png";
            // if(iconUrl!=null&&iconUrl!=""){
            //     var imgLoader: egret.ImageLoader = new egret.ImageLoader;
            //     egret.ImageLoader.crossOrigin = "anonymous";
            //     imgLoader.load(iconUrl);
            //     imgLoader.once(egret.Event.COMPLETE, self.onLoadImgCompleteHandler, self);
            //     imgLoader.once(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent){
            //     console.log("加载网络图片:"+iconUrl+" 出现错误!")},self);
            // }


        // }        
    }

    // //当load网络图片完成事件
    // private onLoadImgCompleteHandler(evt: egret.Event): void {
    //     var self = this;
    //     if (evt.currentTarget.data) {
    //         // egret.log("加载头像成功: " + evt.currentTarget.data);
    //         let texture = new egret.Texture();
    //         texture.bitmapData = evt.currentTarget.data;
    //         let bitmap = new egret.Bitmap(texture);
    //         bitmap.x = 0;
    //         bitmap.y = 0;
    //         bitmap.width = self.groupIcon.width;
    //         bitmap.height = self.groupIcon.height;
    //         self.groupIcon.addChild(bitmap);
    //         if(self.iconMaskShape!=null)
    //             bitmap.mask = self.iconMaskShape;
    //     }
    // }

    
    //设置卡组属性
    private setCardGroupAttribute(costStr:string,hp:number,atk:number,ele:string):void{
        var self = this;
        self.lblCCost.text = costStr;
        self.lblCHp.text = hp+"";
        self.lblCAtk.text = atk+"";
        self.lblCEle.text = ele;
        self.lblCCapacity.text = (hp+atk)+"";
        // self.lblCFetters.text = fetters;
    }

    //设置组成羁绊
    private setFromFetter(fetters:string):void{
        this.lblCFetters.text = fetters;
    }

    //设置卡组名称
    private setCardGroupName(name:string):void{
        var self = this;
        self.lblCGName.text = name;
        // var width:number = 34+self.lblCGName.width;
        // width = width>200?200:width;
        // self.imgCGBG.width = width;
    }


    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_TEAM_CONFIG:  //获取队伍配置
                self.initTeamConfig(data);
                self.sendGetTeamList();
            break;
            case HallCmdDef.CMD_GET_TEAM_LIST:  //获取队伍列表
                self.initTeamData(data);
            break;
            case HallCmdDef.CMD_CHANGE_BATTLE_TEAM:  //切换战斗队伍
                self.changeBattleTeam(data); 
                UIManager.getInstance().hideUI(FilterView);
            break;
            case HallCmdDef.CMD_GET_FROM_FETTER_TEAM:   //获取队伍组成羁绊
                self.onGetTeamFromFetters(data);
            break;
        }
    }

    //发送获取队伍列表
    private sendGetTeamList():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        var reqCmd:HallCmdDef = HallCmdDef.CMD_GET_TEAM_LIST;
        if(self.arrTeamConfig==null){   //先判断是否有队伍配置
            reqCmd = HallCmdDef.CMD_GET_TEAM_CONFIG;
        }
        HttpManager.getInstance().send(centerServer.getSname(),reqCmd,new Object());
    }

    //发送获取队伍组成羁绊
    private sendGetTeamFromFetters(codes:Array<string>){
        if(codes==null||codes.length<=0)
            return;

        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        var self = this;
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_FROM_FETTER_TEAM,{codes:codes},false);
    }


    //初始化组队配置
    private initTeamConfig(data:any):void{
        if(data==null)
            return;
        var self = this;
        self.arrTeamConfig = data;
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        var hMaxCount:number = 5;
        var hIndex:number = 0;
        var width:number = self.scrCardItem.width/hMaxCount;
        var gapX:number = -1;
        var vIndex:number = 0;
        for(var i:number=0,lengthI = data.length;i<lengthI;i++){
            var item:any = data[i];
            if(item==null)
                continue;
            var unlocklvl:number = item.unlocklvl;
            if(unlocklvl==null)
                continue;
            
            var type:number = 2;
            if(accountData!=null&&accountData.getLvl()>=unlocklvl){
                type = 1;
            }
            var groupName:string = "groupCGCI_"+i;
            var obj:Object = {type:type,sdata:unlocklvl,gname:groupName};
            var view:CGCardItemView = new CGCardItemView();
            view.initData(obj);
            self.groupCardItem.addChild(view);
            if(gapX==-1)
                gapX = width-view.getViewWidth()>0?Math.floor((width-view.getViewWidth())/(hMaxCount-1)):0;
            view.x = hIndex*width+gapX;
            view.y = vIndex*(view.getViewHeight()+10);;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            self.arrCardItem.push(view);
            hIndex++;
            if(hIndex>=hMaxCount){
                hIndex=0;
                vIndex++;
            }
            
        }
    }

    private initTeamData(data:any):void{
        if(data==null)
            return;
        var self = this;
        self.teamData = data;

        self.setTeamList(data.list);
        self.setTeamItem(data.curBattleTeam);
        
    }

    private setTeamItem(data:any):void{
        // if(data==null)
        //     return;
        var self = this;
        self.removeCardItem();
        var curBattleTeam:any = data;
        // self.curBattleTeam = curBattleTeam;
        for(var i:number=0,lengthI=self.arrTeamConfig.length;i<lengthI;i++){
            var itemConfig:any = self.arrTeamConfig[i];
            if(itemConfig==null)
                continue;
            var codeC:string = itemConfig.code;
            if(curBattleTeam!=null&&curBattleTeam[codeC]!=null){
                var itemBT:any = curBattleTeam[codeC];
                self.setCardItem(i,itemBT);
            }
        }

        var name:string = curBattleTeam!=null?curBattleTeam.name:"";
        if(name==null||name==""){
            var cIndex:number = curBattleTeam!=null?curBattleTeam.c_index:0;
            cIndex = cIndex==null?0:cIndex;
            var tl:any = self.arrTeamList[cIndex];
            if(tl!=null){
                name = tl.name;
            }
        }
        
        self.setCardGroupName(name);
        self.updateCardGroupAttribute();
    }

    private updateCardGroupAttribute():void{
        var self = this;
        var tHp:number = 0;
        var tAtk:number = 0;
        var tCosk:number = 0;
        var fele:string = "";
        var sele:string = "";
        var codes:Array<string> = new Array<string>();
        for(var i:number=0,lengthI:number = self.arrCardItem.length;i<lengthI;i++){
            var item:CGCardItemView = self.arrCardItem[i];
            if(item==null||item.getCardData()==null)
                continue;
            var cardData:any = item.getCardData();
            var code:string = cardData.code;
            codes.push(code);
            var hp:number = cardData.hp;
            var atk:number = cardData.atk;
            var cost:number = cardData.cost;
            var ele:string = cardData.element;
            tHp += hp;
            tAtk += atk;
            tCosk += cost;
            if(i<5)
                fele += PublicMethodManager.getInstance().getCardElement(ele);
            else
                sele += PublicMethodManager.getInstance().getCardElement(ele);
        }
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        self.setCardGroupAttribute(tCosk+"/"+accountData.getCost(),tHp,tAtk,fele+"\n"+sele);

        if(codes.length<=0){
            self.setFromFetter("");
        }else{
            self.sendGetTeamFromFetters(codes);
        }
    }
    
    private setTeamList(data:any):void{
        if(data==null)
            return;
        var self = this;
        self.arrTeamList = self.arrDefaultTeamList;
        var lengthI:number = data.length;
        for(var i:number=0;i<lengthI;i++){
            var item:any = data[i];
            if(item==null)
                continue;

            var cIndex:number = item.c_index;
            var obj:any = self.arrTeamList[cIndex];
            if(obj==null)
                continue;
            obj.name = item.name;
            obj.data = item;
        }
    }

    private changeBattleTeam(data:any):void{
        if(data==null)
            return;
        var self = this;
        self.setTeamItem(data);

        var cIndex:number =data.c_index;
        if(self.arrTeamList!=null){
            var lengthI:number = self.arrTeamList.length;
            for(var i:number=0;i<lengthI;i++){
                var item:any = self.arrTeamList[i];
                if(item==null)
                    continue;
                var objData:any = item.data;
                var battle:number = 0;
                if(i==cIndex){
                    battle=1;
                    if(data.name!=null)
                        item.name = data.name;
                }
                if(objData.battle==null||objData.battle!=battle){
                    objData.battle = battle;
                }
            }
        }

        if(self.teamData!=null){
            self.teamData["curBattleTeam"] = data;
        }
    }

    //设置卡牌
    private setCardItem(index:number,data:any):void{
        var self = this;
        if(self.arrCardItem==null)
            return;
        
        var cardItem:CGCardItemView = self.arrCardItem[index];
        if(cardItem==null)
            return;
        
        var obj:Object = {type:0,sdata:data};
        cardItem.updateShow(obj);
    }

    private removeCardItem():void{
        var self = this;
        if(self.arrCardItem==null)
            return;
        
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        for(var i:number=0,lengthI:number = self.arrCardItem.length;i<lengthI;i++){
            var item:CGCardItemView =self.arrCardItem[i];
            if(item==null)
                continue;
            var type:number = 2;
            var cItem:any = self.arrTeamConfig[i];
            if(cItem==null)
                continue;
            var unlocklvl:number = cItem.unlocklvl;
            if(accountData!=null&&accountData.getLvl()>=unlocklvl){
                type = 1;
            }
            var obj:Object = {type:type,sdata:unlocklvl};
            item.updateShow(obj);
        }
    }


    //获取队伍组成羁绊
    private onGetTeamFromFetters(data:any):void{
        if(data==null)
            return;

        var self = this;
        var fetters = data.fetters;
        var str:string = "";
        if(fetters!=null){
            for(var key in fetters){
                var fetter:any = fetters[key];
                if(fetter==null)
                    continue;
                var name:string = fetter.name;
                str+=(name+"\n");
            }
        }
        self.setFromFetter(str);
    }

    private onUpdateAccountData(dispatchEvent:boolean=true):void{
        var self  = this;
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        self.lblLvl.text = accountData.getLvl()+"";
        var exp:number = accountData.getExp();
        var upexp:number = accountData.getUpexp();
        self.lblExpProgress.text = exp+"/"+upexp;
        self.prbExp.value = Math.floor(exp/upexp*100);
        self.lblHp.text = accountData.getHp()+"";

        var cost:string = self.lblCCost.text;
        if(cost!=""){
            var arrStr:Array<string> = cost.split('/');
            if(arrStr!=null&&arrStr.length==2){
                self.lblCCost.text = arrStr[0]+"/"+accountData.getCost();
            }
        }

        self.updateCardItem();

        if(dispatchEvent)
            GameEventManager.getInstance().dispatchEvent(HallEvent.updateUserInfo);
    }

    private updateCardItem():void{
        var self = this;
        if(self.arrCardItem==null||self.arrCardItem.length<=0)
            return;
        
        var accountData:AccountData = GlobalDataManager.getInstance().getAccountData();
        for(var i:number=0,lengthI=self.arrCardItem.length;i<lengthI;i++){
            var item:CGCardItemView = self.arrCardItem[i];
            if(item==null||item.getType()!=2)
                continue;
            
            var type:number = 2;
            var cItem:any = self.arrTeamConfig[i];
            if(cItem==null)
                continue;
            var unlocklvl:number = cItem.unlocklvl;
            if(accountData!=null&&accountData.getLvl()>=unlocklvl){
                type = 1;
            }
            var obj:Object = {type:type,sdata:unlocklvl};
            item.updateShow(obj);
        }
    }


    public getCardGroupGroup():eui.Group{
        return this.groupCardGroup;
    }

    public getCGEditBtn():eui.Button{
        return this.btnCGEdit;
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupCardGroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupCardGroup.scaleX = 
            self.groupCardGroup.scaleY = 1;
            return;
        }
        self.groupCardGroup.scaleX = 
        self.groupCardGroup.scaleY = gapNum;
    }
}