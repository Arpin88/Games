// TypeScript file
class CardOperationView extends BaseView{
    public static NAME:string = "CardOperationSkin";

     public constructor(){
        super(CardOperationView.NAME);
    }

    private groupLeft:eui.Group;
    private labCardName:eui.Label;
    private groupCardView:eui.Group;
    private groupSkillList:eui.Group;   //技能表
    private labPrice:eui.Label;
    private groupSkillExplain:eui.Group;    //技能说明
    private cardoperationgruop:eui.Group;    
    private labSkillName:eui.Label;
    private labeffect:eui.Label;
    private labSkillType:eui.Label;
    private labSkillExplain:eui.Label;
    private labLockState:eui.Label;

    private imgGene:eui.Image; //代数
    private groupStar:eui.Group; //星数
    private imgCurEXP:eui.Image;
    private imgMaxEXP:eui.Image;
    private kuang:eui.Image;

    private btnLvlUp:eui.Button;
    private btnGeneUp:eui.Button;
    private btnZhanshi:eui.Button;

    private btnClose:eui.Button;
    private groupRight:eui.Group;
    private scrAttrListPanel:eui.Group;  //属性列表
    private groupAttrList:eui.Group;  //属性列表
    private groupShow:eui.Group;    //展示
    private groupCardShow:eui.Group;  //卡片展示
    private groupFetter:eui.Group;  //羁绊
    private scrFetterPanel:eui.Group;  //羁绊panel    
    private groupGeneUp:eui.Group;  //升阶
    private groupGeneUpPanel:eui.Group;  //升阶
    private groupLvlUp:eui.Group;   //升级
    private groupSold:eui.Group;    //出售
    private groupShopPanel:eui.Group;
    private scrAttrList:eui.Scroller;
    private scrFetter:eui.Scroller;
    private prbLoading0:eui.Scroller;

    private imgAttribute:eui.Image;         //属性背景图片
    private imgAttributeLabel:eui.Image;    //属性文本图片
    private imgFetter:eui.Image;        
    private imgFetterLabel:eui.Image;
    private imgShow:eui.Image;        
    private imgShowLabel:eui.Image;       
    private imgSell:eui.Image;         
    private imgSellLabel:eui.Image;   
    //升级界面
    private groupLvlStar:eui.Group;
    private imgMaxExp:eui.Image;
    private imgCurExp:eui.Image;
    private labExp:eui.Label;
    private labExp_left:eui.Label;    
    private lvUp_level:eui.Label;
    private ImgChoose:eui.Image;
    private bagItemChoose:number = 1;
    private btnUserItem:eui.Button;
    
    private imgExpItem1:eui.Image;
    private imgExpItem2:eui.Image;
    private imgExpItem3:eui.Image;
    //交易
    private btnGoTrace:eui.Button;

    //升阶界面
    private imgGeneUpItem:eui.Image;
    private btnUseGeneItem:eui.Button;
    private labGeneUpItem:eui.Label;

    private arrBtnGroup:Array<eui.Group> = new Array<eui.Group>();  //列表存储
    private arrSkillList:Array<CardSkillView> = new Array<CardSkillView>(); //技能组
    private curBtnIndex:number = -1;

    private cardInfo:Object;
    private cardJBInfo:Object;
    private upLvlInfo:Object;
    private upBagInfo:Object;
    private rarityObj:Object;

    private cardAttrInit:boolean = false;
    private cardFetterInit:boolean = false;
    private cardShowInit:boolean = false;

    private arrFetterItemView:Array<CardFetterItemView> = new Array<CardFetterItemView>();
    private cardRectangleView:CardRectangleView;
    private cardSquareView:CardSquareView;
    private arrAttrList:Array<eui.Label> = new Array<eui.Label>();
    private arrAttrLine:Array<egret.Shape> = new Array<egret.Shape>();
    private isTouchMove:boolean = false;
    private btnUserItem0:eui.Component;
    private btnUserItem1:eui.Component;
    private btnUserItem2:eui.Component;
    private BtnGeneUpItem:eui.Component;
    private code:string;
    private curCardView:Object = null;
    private myCardView:Object = null;

    private skillAry = [];
    private skillOpenAry = [];
    private unlockOpenAry = [];
    private ckjTxt:string = "参考价:";
    private daijTxt:string = "代";
    private xingjTxt:string = "星";
    private zhudongTxt:string = "主动技能";
    private beidongTxt:string = "被动技能";
    private jiesuoTxt:string = "解锁";
    private weijiesuojTxt:string = "未解锁";
    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)){
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN,self.touchBegin,self);
        }

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_END)){
            self.addEventListener(egret.TouchEvent.TOUCH_END,self.touchEnd,self);
        }

        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.ckjTxt = "Reference Price： ";
            self.daijTxt = "Gen";
            this.xingjTxt = "Star";
            this.zhudongTxt = "Active Skill";
            this.beidongTxt = "Passive Skill";
            this.jiesuoTxt = "Unlocked";
            this.weijiesuojTxt = "Locked";
        }

        var data = super.getData();
        if(data==null)
            return;
        
        self.rarityObj = data;
        self.setCardInfo(self.rarityObj);
        self.setCurRightGroupShow(0);

        if(UIManager.getInstance().checkHasViewByName(GuideView))
            GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.myCardView = null;
        self.cleanArray([self.cardSquareView]);
        self.cleanArray(self.arrSkillList);
        if(self.cardFetterInit)
        {
            self.cardFetterInit = false;
            self.cleanArray(self.arrFetterItemView);
        }
        if(self.cardShowInit)
        {
            self.cardShowInit = false;
            self.cleanArray([self.cardRectangleView]);
        }
        if(self.cardAttrInit)
        {
            self.cleanArrayLabel(self.arrAttrList);
            self.cleanArrayShape(self.arrAttrLine);
        }    
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

    private cleanArrayLabel(arr:Array<eui.Label>):void{
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

    private cleanArrayShape(arr:Array<egret.Shape>):void{
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
            var defx:number = 62;
            var defy:number = 0;
            if(btn==self.btnClose){
                self.hiden();
            }else if(btn == self.btnLvlUp)
            {
                if(this.upBagInfo["bag1"] != null && this.upBagInfo["bag1"].count > 0){
                    self.ImgChoose.x = self.btnUserItem0.x + defx;
                    self.ImgChoose.y = self.btnUserItem0.y - defy;
                    self.bagItemChoose = 1;
                }else if(this.upBagInfo["bag2"] != null && this.upBagInfo["bag2"].count > 0){
                    self.ImgChoose.x = self.btnUserItem1.x + defx;
                    self.ImgChoose.y = self.btnUserItem1.y - defy;
                    self.bagItemChoose = 2;
                }else if(this.upBagInfo["bag3"] != null && this.upBagInfo["bag3"].count > 0){
                    self.ImgChoose.x = self.btnUserItem2.x + defx;
                    self.ImgChoose.y = self.btnUserItem2.y - defy;
                    self.bagItemChoose = 3;
                }else{
                    self.ImgChoose.x = self.btnUserItem0.x + defx;
                    self.ImgChoose.y = self.btnUserItem0.y - defy;
                    self.bagItemChoose = 1;
                }
                
                this.setCurRightGroupShow(4);

                if(UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
            }else if(btn == self.btnGeneUp){
                self.bagItemChoose = 4;
                this.setCurRightGroupShow(5);
            }else if(btn == self.btnZhanshi){
                this.setCurRightGroupShow(1);
            }else if(btn == self.btnUserItem0){
                self.ImgChoose.x = btn.x + defx;
                self.ImgChoose.y = btn.y - defy;
                self.bagItemChoose = 1;
            }else if(btn == self.btnUserItem1){
                self.ImgChoose.x = btn.x + defx;
                self.ImgChoose.y = btn.y - defy;
                self.bagItemChoose = 2;
            }else if(btn == self.btnUserItem2){
                self.ImgChoose.x = btn.x + defx;
                self.ImgChoose.y = btn.y - defy;
                self.bagItemChoose = 3;
            }else if(btn == self.btnUserItem){
                if(UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                    
                if(this.upBagInfo["bag1"] != null && this.upBagInfo["bag2"] != null && this.upBagInfo["bag3"] != null){
                    if((this.upBagInfo["bag1"].count + this.upBagInfo["bag2"].count + this.upBagInfo["bag3"].count) <= 0){
                        PopManager.getInstance().showPromptBox("道具不足,请前往商城购买!",2,Handler.create(self,function(confirm:boolean){
                            self.hiden();
                            UIManager.getInstance().showUI(MallView);
                        }));
                        return;
                    }
                }
                
                var data:Object = this.upBagInfo["bag" + self.bagItemChoose]; 
                if(data == null) return;
                let obj = new Object();
                if(data["count"] > 0){
                    this.upLvlByBag(1,data["propCode"]);
                }
                
            }else if(btn == self.btnUseGeneItem){
                var data:Object = this.upBagInfo["bag4"]; 
                if(data == null) return;
                self.bagItemChoose = 4;
                if(data["count"] > 0){
                    this.upLvlByBag(2,data["propCode"]);
                }
            }
        }

        let tar:Object = event.target as Object;
        if(tar instanceof eui.Image){
            if(tar==self.imgAttribute){
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(0);
            }else if(tar==self.imgFetter){
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(2);
            }else if(tar==self.imgShow){
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(1);
            }else if(tar==self.imgSell){
                SoundManager.getInstance().PlayClickSound();
                this.setCurRightGroupShow(3);
            }
        }
    }

    private setImgBtnBg(index:number):void
    {
        var skillAry = [this.imgAttribute,this.imgShow,this.imgFetter,this.imgSell];
        
        for(var i = 0; i < 4; i++){
            if(index != i) skillAry[i].source = "hallBtn1Sheet_json.a86x114_0";
            else skillAry[i].source = "hallBtn1Sheet_json.a86x114_1";
        }

        if(index == 1) this.kuang.$setVisible(false);
        else this.kuang.$setVisible(true);
    }

    // 向服务器发送请求： 使用道具升级卡牌
    private upLvlByBag(type:number,propCode:number):void{
        let obj = new Object();
        obj["type"] = type;
        obj["code"] = this.code;
        obj["propCode"] = propCode;
        obj["itemIdx"] = this.bagItemChoose;
        obj["usetype"] = true;
        obj["count"] = 1;
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_UPGRADE_CARD,obj,true);
    }

    private touchBegin(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,11) == "groupSkill_"){
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2)
                {
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                var obj:Object = this.skillAry[cIndex];
                var isOpen = this.skillOpenAry[cIndex];

                // 设置技能说明
                if(obj != null){
                    this.groupSkillExplain.visible = true;
                    this.groupSkillExplain.x = this.groupLeft.x+this.groupSkillList.x+this.arrSkillList[cIndex].x+72;
                    this.groupSkillExplain.y = this.groupLeft.y+this.groupSkillList.y+this.arrSkillList[cIndex].y-12;

                    this.labSkillName.text = obj["name"] + " Lv. " + obj["level"];
                    this.labSkillExplain.text = obj["desc"];
                    this.labeffect.text = "无";
                    if(obj["type"] == "1"){
                        this.labSkillType.text = this.zhudongTxt;
                        this.labSkillType.textColor = 0xFC0C3A;
                    }else{
                        this.labSkillType.text = this.beidongTxt;
                        this.labSkillType.textColor = 0x8DD3FF;
                    }
                    if(isOpen == 1){
                        this.labLockState.text = this.jiesuoTxt;
                    }else{
                        this.labLockState.text = this.weijiesuojTxt;
                    }
                }
            }
        }
    }

    private touchEnd(event:egret.TouchEvent):void{
        var self = this;
        this.groupSkillExplain.visible = false; 
    }

    private setCardName(str:string):void{
        this.labCardName.text = str;
    }

    private setCardView(data:Object):void{
        var view:CardSquareView = this.myCardView as CardSquareView;
        if(view == null){ view = new CardSquareView();}
        view.initData(data);
        view.scaleX = view.scaleY = this.groupCardView.width/view.width;
        this.groupCardView.addChild(view);
        view.x = 0;
        view.y = 0;

        // 设置升星进度条
        var exprate = 100 * this.cardInfo["exp"] / this.upLvlInfo["allexp"]
        this.prbLoading0["value"] = exprate;

        // 设置价格
        this.labPrice.text = this.ckjTxt + (parseInt(data["val_initial"]) + parseInt(data["val_growing"])) + " XWG";
    }

    private setimgGene(index:number):void{
        switch(index)
        {
            case 1:
                this.imgGene.source = "hallText0Sheet_json.daishu1";
                break;
            case 2:
                this.imgGene.source = "hallText0Sheet_json.daishu2";
                break;
            case 3:
                this.imgGene.source = "hallText0Sheet_json.daishu3";
                break;
        }
    }

    private setgroupStar(index:number):void{
        index = ExternalFun.prototype.levelnumTo5lvl(index);
        //背景
        this.groupStar.removeChildren();
        for(var i:number=0;i<5;i++)
        {
            var img:eui.Image = new eui.Image("newcardpanel_json.star0")
            this.groupStar.addChild(img);
            img.x = i*35;
            img.y = -23;
        }
        // 星星显示
        for(var i:number=0;i<index;i++)
        {
            var img:eui.Image = null;
            if(i < index - 1)
            {
                img = new eui.Image("newcardpanel_json.star1")
            }
            else
            {
                img = new eui.Image("newcardpanel_json.star2")
            }
            
            this.groupStar.addChild(img);
            img.x = i*35;
            img.y = -23;
        }
    }

    // 初始化界面
    public setCardInfo(data:Object):void{
        if(data==null)
            return;

        var cardDetail:any = data["cardDetail"];
        this.code = data["code"];
        this.curCardView = data["viewhandle"];
        if(cardDetail!=null){
            var attribute:any = cardDetail["attribute"];
            if(attribute!=null){
                this.setAttribute(attribute);     // 属性面板           
            }
        }

        data["canTouch"] = false;
        this.cardInfo = cardDetail["attribute"];
        this.cardJBInfo = cardDetail["fetters"];
        this.upLvlInfo = cardDetail["myupLvl"];
        this.upBagInfo = cardDetail["mybag"]; //
        this.setCardView(this.cardInfo);
        this.setCardName(this.cardInfo["name"]);
        this.setimgGene(this.cardInfo["generation"]);
        this.setgroupStar(this.cardInfo["level"]);

        // var skillobj = cardDetail["myskill"]; // 技能详情
        // this.skillAry = [skillobj["skil1"],skillobj["skil2"],skillobj["skil3"],skillobj["skil4"]];
        var skillobj = cardDetail["skills"]; // 技能详情
        this.skillAry = [skillobj["skil_1"],skillobj["skil_2"],skillobj["skil_3"],skillobj["skil_4"]];

        var skillOpenobj = cardDetail["skillopen"]; // 是否解锁
        this.skillOpenAry = [skillOpenobj["skillopen_1"],skillOpenobj["skillopen_2"],skillOpenobj["skillopen_3"],skillOpenobj["skillopen_4"]];

        var UnlockSkillConfig = [];
        for(var k:number = 0; k < cardDetail["UnlockSkillConfig"]["length"]; k++)
        {
            var obj = cardDetail["UnlockSkillConfig"][k];
            var curIdx:number = obj["sklIndex"]
            UnlockSkillConfig[curIdx] = obj;
        }
        this.unlockOpenAry = [UnlockSkillConfig[1],UnlockSkillConfig[2],UnlockSkillConfig[3],UnlockSkillConfig[4]];  // 解锁标准
        
        this.setCardSkill(this.skillAry,this.skillOpenAry,this.unlockOpenAry,this.cardInfo["level"],this.cardInfo["generation"]);
        this.setGroupLvlUp(this.cardInfo); // 升星
        this.refreshUpBtns();
    }

    private refreshUpBtns(){
        if(this.cardInfo["level"] >= 15 || this.cardInfo["generation"] >= 4){
            this.btnUserItem.enabled = false;
            this.btnGeneUp.enabled = false;
            this.btnLvlUp.enabled = false;
            this.btnUseGeneItem.enabled = false;
            return;
        }
        // 如果leve 大于 generation*5 则可以升阶了
        if(this.cardInfo["generation"]*5 <= this.cardInfo["level"]){
            // 升阶按钮这时候能用
            this.btnUserItem.enabled = false;
            this.btnGeneUp.enabled = true;
            this.btnLvlUp.enabled = false;
            this.btnUseGeneItem.enabled = true;
        }else{
            this.btnUserItem.enabled = true;
            this.btnGeneUp.enabled = false;
            this.btnLvlUp.enabled = true;
            this.btnUseGeneItem.enabled = false;
        }
    }

    public setImgEXP(cur:number,max:number):void{
        this.imgCurEXP.width = this.imgMaxEXP.width*cur/max;
    }

    private setCardSkill(arr:Array<Object>,arropen:Array<Object>,unlockarr:Array<Object>,mylvl:number,mygene:number):void{

        this.groupSkillList.removeChildren()
        var idx:number = 0;
        for(var i:number=0;i<4;i++)
        {
             var data = {icon:"",level:"",canTouch:true,groupName:"groupSkill_"+i};
            if(arr[i] != null){
                data = {icon:arr[i]["icon"],level:arr[i]["level"],canTouch:true,groupName:"groupSkill_"+i};
            }
            var view:CardSkillView = new CardSkillView();
            view.initData(data);
            this.groupSkillList.addChild(view);
            this.arrSkillList[i] = view;
            if(idx > 1) idx = idx - 2;
            view.x=idx*85;
            view.y=Math.floor(i/2)*82;
            idx++;

            if(arr[i] != null){
                // 上锁图片
                var lockstr:string = this.judjeSkillLock(i,mylvl,mygene,unlockarr);
               if(arropen[i] == 0)
                {
                    var shapeImg:eui.Image = new eui.Image();
                    this.groupSkillList.addChild(shapeImg);
                    shapeImg.source = "newcardpanel_json.suo";
                    shapeImg.x = view.x;
                    shapeImg.y = view.y;
                    shapeImg.touchEnabled = false;
                    var labLockstr:eui.Label = new eui.Label();
                    this.groupSkillList.addChild(labLockstr);
                    labLockstr.x = view.x + 5;
                    labLockstr.y = view.y;
                    labLockstr.width = view.width - 10;
                    labLockstr.height = view.height;
                    labLockstr.textAlign = "center";
                    labLockstr.verticalAlign = "middle";
                    labLockstr.lineSpacing = 5;
                    labLockstr.fontFamily = "SimHei";
                    labLockstr.size = 18;
                    labLockstr.text = lockstr;
                    labLockstr.touchEnabled = false;
                }   
            }else{ // 显示 无
                var emptyImg:eui.Image = new eui.Image();
                this.groupSkillList.addChild(emptyImg);
                emptyImg.source = "hallText0Sheet_json.jineng0";
                emptyImg.x = view.x;
                emptyImg.y = view.y;
            }        
        }
    }

    private judjeSkillLock(idx:number,lvl:number,gene:number,unlockarr:Array<Object>):string{
        var str:string = "";
        str = unlockarr[idx]["gen"] + this.daijTxt + unlockarr[idx]["star"] + this.xingjTxt + this.jiesuoTxt;
        return str;
    }

     // 接收
     public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_UPGRADE_CARD:
                self.onUpgradeCardComplete(data);
            break;
            // case HallCmdDef.CMD_BaguseUp:
            //     var aaa = data
            //     var idx = data["itemIdx"] 
            //     var bagId = data["bagId"]
            //     var cardData = data["msg"]

            //     self.bagItemChoose = idx;
            //     this.upBagInfo["bag" + self.bagItemChoose].count = data["bagNum"];
            //     this.cardInfo["exp"] = cardData["exp"];
            //     this.upLvlInfo["allexp"] = data["allexp"];
            //     this.cardInfo["generation"] = cardData["gen"];
            //     this.cardInfo["level"] = cardData["level"]; // 做转换
            //     this.cardInfo["val_initial"] = cardData["valInitial"];
            //     this.cardInfo["val_growing"] = cardData["valGrowing"];

            //     var cardDetail:any = self.rarityObj["cardDetail"];
            //     var attribute:any = cardDetail["attribute"];
            //     attribute["atk"] = cardData["atk"];
            //     attribute["hp"] = cardData["hp"];
            //     this.setAttribute(attribute); 

            //     this.skillOpenAry = [cardData["open_1"],cardData["open_2"],cardData["open_3"],cardData["open_4"]];
            //     // 刷新
            //     this.setGroupLvlUp(this.cardInfo);
            //     this.setCardView(this.cardInfo);
            //     this.setgroupStar(this.cardInfo["level"]);
            //     this.setimgGene(this.cardInfo["generation"]);
            //     this.setCardSkill(this.skillAry,this.skillOpenAry,this.unlockOpenAry,this.cardInfo["level"],this.cardInfo["generation"]);

            //     // 回调
            //     var cardview:CardSquareView  = this.curCardView  as CardSquareView;
            //     cardview.setLevel(this.cardInfo["level"]);
            //     cardview.setHp(this.cardInfo["hp"]);
            //     cardview.setAtk(this.cardInfo["atk"]);
            //     cardview.setGeneration(this.cardInfo["generation"]);
            //     this.refreshUpBtns();
            // break;
        }
    }

    //设置属性
    private setAttribute(data:any):void{
        var rarity:string = data["rarity"];
        var rarityStr:string = PublicMethodManager.getInstance().getCardRarity(rarity);   
        var generation:number = data["generation"];
        var level:number = ExternalFun.prototype.levelnumTo5lvl(data["level"]);
        var glStr:string = generation + this.daijTxt + level + this.xingjTxt
        var atk:number = data["atk"];
        var hit:number =data["hit"];
        var hp:number = data["hp"];
        var agl:number = data["agl"];
        var att:number = data["att"];
        var cri_chance:number = data["cri_chance"];
        var cri_multiplier:number = data["cri_multiplier"];
        var rgn:number = data["rgn"];

        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           this.setGroupAttrList({"Quality":rarityStr,"Lv":glStr,"Power":(atk+hp),"Waiting":att,"HP":hp,"Atk":atk,"Accuracy":hit,"Dodge Rate":agl,"Crit Rate":cri_chance,"Crit Multipler":cri_multiplier,"Recovery":rgn});
        }else{
            this.setGroupAttrList({"品质":rarityStr,"星级":glStr,"战力":(atk+hp),"等待回合":att,"生命":hp,"攻击":atk,"命中率":hit,"闪避率":agl,"暴击率":cri_chance,"暴击倍数":cri_multiplier,"回复":rgn});
        }
        
    }

    

    public setCurRightGroupShow(index:number):void
    {
        
        if(this.curBtnIndex == index)
        {
            return;
        }
        this.curBtnIndex = index;
        switch(index)
        {
            case 1:
                this.setGroupShow();
                break;
            case 2:
                if(!this.cardFetterInit){ this.setGroupFetter(); }
                break;
            case 3:
                this.setGroupSold();
                break;
        }
        this.groupAttrList.visible = index==0;
        this.scrAttrListPanel.visible = index==0;        
        this.scrAttrList.visible = index==0;
        this.groupShow.visible = index==1;
        this.groupFetter.visible = index==2;
        this.scrFetterPanel.visible = index==2;        
        this.scrFetter.visible = index==2;
        this.groupShopPanel.visible = index==3;
        this.groupLvlUp.visible = index==4;
        this.groupGeneUp.visible = index==5;
        this.groupGeneUpPanel.visible = index==5;  

        this.setImgBtnBg(index); 
    }

    private setGroupAttrList(attrList:Object):void{
        this.cardAttrInit = true;
        var index:number = 0;

        this.cleanArrayLabel(this.arrAttrList);
        this.cleanArrayShape(this.arrAttrLine);

       for(var key in attrList)
        {
            var def = index%2
            var attrKey:eui.Label = new eui.Label();
            attrKey.x = def*240 + 54;
            attrKey.y = 60*Math.floor(index/2) + 42;
            attrKey.textColor = 0x8bc2d5;
            attrKey.textAlign = "left";
            attrKey.fontFamily = "SimHei";
            attrKey.size = 26;
            attrKey.text = key+"：";
            this.groupAttrList.addChild(attrKey);
            var attrValue:eui.Label = new eui.Label();
            attrValue.x = def*230 + 54 + attrKey.width;
            attrValue.y = 60*Math.floor(index/2) + 42;
            attrValue.textColor = 0xffffff;
            attrValue.textAlign = "left";
            attrValue.fontFamily = "SimHei";
            attrValue.size = 26;
            attrValue.stroke = 1;
            attrValue.text = attrList[key];
            this.groupAttrList.addChild(attrValue);
            
            this.arrAttrList.push(attrKey);
            this.arrAttrList.push(attrValue);

            index++;
        }
    }

    private setGroupShow():void{
        this.cardShowInit = true;
        var data = this.cardInfo;
        var view:CardRectangleView = new CardRectangleView();
        view.initData(data);
        view.scaleX = this.groupCardShow.width/view.width;
        view.scaleY = this.groupCardShow.height/view.height;
        this.groupCardShow.addChild(view);    
        this.groupCardShow.$setVisible(true)  
        view.x=-8;
        view.y=0;
        
        this.cardRectangleView = view;
    }
    
    // 设置羁绊
    private setGroupFetter():void{
        this.cardFetterInit = true;
        var data1 = this.cardInfo;
        this.scrFetter.scrollPolicyH="OFF";
        this.cleanArray(this.arrFetterItemView);

        var aa:JiBanData = GlobalDataManager.getInstance().getJiBanData();
        var arr = this.cardJBInfo;
        var jblist: string[] = []
        var yy = 0;
        for(var i:number = 0; i < arr["length"]; i++)
        {
            var obj = arr[i]

            var view:CardFetterItemView = new CardFetterItemView();
            var data = {hero:this.cardInfo["name"],name:obj["name"],desc:obj["desc"],icon:obj["icon"],color:obj["color"],zc:obj["zc"]};
            view.initData(data);
            this.groupFetter.addChild(view);
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.x = 22;
            view.y = yy;
            yy = yy + view.height + 17;
            
            
            this.arrFetterItemView.push(view);
        }
    }
    
    private setGroupLvlUp(data:Object):void{
        // 设置星级
        this.lvUp_level.text = this.cardInfo["generation"] + this.daijTxt + ExternalFun.prototype.levelnumTo5lvl(this.cardInfo["level"])+ this.xingjTxt;
        this.labExp.text = this.cardInfo["exp"] + "/" + this.upLvlInfo["allexp"];
        this.labExp_left.text = this.cardInfo["exp"] + "/" + this.upLvlInfo["allexp"];
        
        // 初始化图片
        this.btnUserItem0["imgIcon"].source = "propSheet_json.1" ;
        this.btnUserItem1["imgIcon"].source = "propSheet_json.2";
        this.btnUserItem2["imgIcon"].source = "propSheet_json.3";
        this.BtnGeneUpItem["imgItem"].source = "propSheet_json.5";
        
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            this.btnUserItem0["lblName"].text = "Exp book";
            this.btnUserItem1["lblName"].text = "Exp stone";
            this.btnUserItem2["lblName"].text = "Exp potions";
        }else{
            this.btnUserItem0["lblName"].text = "经验书";
            this.btnUserItem1["lblName"].text = "经验石";
            this.btnUserItem2["lblName"].text = "经验药水";
        }
        
        //
        if(this.upBagInfo["bag1"] != null){
            this.btnUserItem0["imgIcon"].source = "propSheet_json." + this.upBagInfo["bag1"].resUrl;
            this.btnUserItem0["lblCount"].text = this.upBagInfo["bag1"].count;
            this.btnUserItem0["lblName"].text = this.upBagInfo["bag1"].name;
        }
        
        if(this.upBagInfo["bag2"] != null){
            this.btnUserItem1["imgIcon"].source = "propSheet_json." + this.upBagInfo["bag2"].resUrl;
            this.btnUserItem1["lblCount"].text = this.upBagInfo["bag2"].count;
             this.btnUserItem1["lblName"].text = this.upBagInfo["bag2"].name;
        }
        
        if(this.upBagInfo["bag3"] != null)
        {
            this.btnUserItem2["imgIcon"].source = "propSheet_json." + this.upBagInfo["bag3"].resUrl;
            this.btnUserItem2["lblCount"].text = this.upBagInfo["bag3"].count;
             this.btnUserItem2["lblName"].text = this.upBagInfo["bag3"].name;
        }
        
        if(this.upBagInfo["bag4"] != null)
        {
            this.BtnGeneUpItem["imgItem"].source = "propSheet_json." + this.upBagInfo["bag4"].resUrl;
            this.BtnGeneUpItem["labItemNum"].text = this.upBagInfo["bag4"].count;
            this.labGeneUpItem.text = this.upBagInfo["bag4"].name;  
        }
    }

    private setGroupSold():void{
        
    }


    private onUpgradeCardComplete(data:any):void{
        if(data==null)
            return;

        var self = this;
        var idx = data["itemIdx"] 
        var cardData = data["msg"]

        self.bagItemChoose = idx;
        self.upBagInfo["bag" + self.bagItemChoose].count = data["bagNum"];
        self.cardInfo["exp"] = cardData["exp"];
        self.upLvlInfo["allexp"] = data["allexp"];
        self.cardInfo["generation"] = cardData["gen"];
        self.cardInfo["level"] = cardData["level"]; // 做转换
        self.cardInfo["val_initial"] = cardData["valInitial"];
        self.cardInfo["val_growing"] = cardData["valGrowing"];

        var cardDetail:any = self.rarityObj["cardDetail"];
        var attribute:any = cardDetail["attribute"];
        attribute["atk"] = cardData["atk"];
        attribute["hp"] = cardData["hp"];
        self.setAttribute(attribute); 

        self.skillOpenAry = [cardData["open_1"],cardData["open_2"],cardData["open_3"],cardData["open_4"]];
        // 刷新
        self.setGroupLvlUp(self.cardInfo);
        self.setCardView(self.cardInfo);
        self.setgroupStar(self.cardInfo["level"]);
        self.setimgGene(self.cardInfo["generation"]);
        self.setCardSkill(self.skillAry,self.skillOpenAry,self.unlockOpenAry,self.cardInfo["level"],self.cardInfo["generation"]);

        // 回调
        var cardview:CardSquareView  = self.curCardView  as CardSquareView;
        cardview.setLevel(self.cardInfo["level"]);
        cardview.setHp(self.cardInfo["hp"]);
        cardview.setAtk(self.cardInfo["atk"]);
        cardview.setGeneration(self.cardInfo["generation"]);
        self.refreshUpBtns();

        let obj:any = {propCode:data["propCode"],count:data["bagNum"]};
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateProp,obj);
    }


    public getCardOperationGroup():eui.Group{
        return this.cardoperationgruop;
    }

    public getLvlUpBtn():eui.Button{
        return this.btnLvlUp;
    }

    public getUserItemBtn():eui.Button{
        return this.btnUserItem;
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.cardoperationgruop==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.cardoperationgruop.scaleX = 
            self.cardoperationgruop.scaleY = 1;
            return;
        }
        self.cardoperationgruop.scaleX = 
        self.cardoperationgruop.scaleY = gapNum;
    }
}