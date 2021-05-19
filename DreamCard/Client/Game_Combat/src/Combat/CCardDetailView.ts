// TypeScript file
class CCardDetailView extends BaseView{
    public static NAME:string = "CCardDetailSkin";

     public constructor(){
        super(CCardDetailView.NAME);
    }

    private groupCCardDetail:eui.Group;

    private rectBG:eui.Rect;
    private btnClose:eui.Button;

    private groupCard:eui.Group;            //卡牌显示层

    private imgAttribute:eui.Image;         //属性背景图片
    private imgAttributeLabel:eui.Image;    //属性文本图片
    private imgSkill:eui.Image;             //技能背景图片
    private imgSkillLabel:eui.Image;        //技能背景图片
    private imgFetter:eui.Image;            //羁绊背景图片
    private imgFetterLabel:eui.Image;       //羁绊背景图片

    private groupAttribute:eui.Group;       //属性层
    private groupAttTextField:eui.Group;    //属性富文本层

    private groupSkill:eui.Group;           //技能层
    private scrSkillItem:eui.Scroller;      //技能滚动区域
    private groupSkillItem:eui.Group;       //技能滚动层

    private groupFetter:eui.Group;           //羁绊层
    private scrFetterItem:eui.Scroller;      //羁绊滚动区域
    private groupFetterItem:eui.Group;       //羁绊滚动层

    private curTypeIndex:number = 0;            //当前类型下标 0属性 1技能 2羁绊
    private attributeTextField:egret.TextField; //属性描述文本;

    private arrFetterItemView:Array<CCardFetterItemView> = new Array<CCardFetterItemView>();    //羁绊选项视图集合
    private arrSkillItemView:Array<CCardSkillItemView> = new Array<CCardSkillItemView>();       //技能选项视图集合

    private cardCode:string;
    private cardName:string;

    private labelObj:any;   //语言包

    protected week():void{
        var self =this;
        
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);

        self.initView();

        var data = super.getData();
        if(data==null)
            return;

        var cdata:any = data.cdata;
        if(cdata==null)
            return;

        var cardDetail:any = cdata.cardDetail;
        if(cardDetail!=null){
            var attribute:any = cardDetail.attribute;
            if(attribute!=null){
                self.setCard(attribute);
                self.setAttribute(attribute); 
                
                self.cardName = attribute.name;
            }
            
            var skills:any = cardDetail.skills;
            if(skills!=null){
                self.setSkill(skills);
            }

            var fetters:any = cardDetail.fetters;
            if(fetters!=null){
                self.setFetter(fetters);
            }
        }

        self.cardCode = cdata.code;

    }

    private initView():void{
        var self = this;
        self.cardCode = "";
        self.cardName = "";

        self.selTypeGroup(0);
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        if(self.attributeTextField!=null){
            self.attributeTextField.parent.removeChild(self.attributeTextField);
            self.attributeTextField = null;
        }

        self.cleanArray(self.arrFetterItemView);
        self.cleanArray(self.arrSkillItemView);

        self.labelObj = null;
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
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>tar;
            if(btn==self.btnClose){
                self.hiden();
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }else if(tar instanceof eui.Image){
            if(tar==self.imgAttribute){
                SoundManager.getInstance().PlayClickSound();
                if(self.curTypeIndex!=0)
                    self.selTypeGroup(0);
            }else if(tar==self.imgSkill){
                SoundManager.getInstance().PlayClickSound();
                if(self.curTypeIndex!=1)
                    self.selTypeGroup(1);
            }else if(tar==self.imgFetter){
                SoundManager.getInstance().PlayClickSound();
                if(self.curTypeIndex!=2)
                    self.selTypeGroup(2);
            }
        }
    }

    //返回类型背景图片
    private getTypeBGImage(index:number):eui.Image{
        var self = this;
        var img:eui.Image;
        if(index==0){
            img = self.imgAttribute;
        }else if(index==1){
            img = self.imgSkill;
        }else if(index==2){
            img = self.imgFetter;
        }
        return img;
    }

    //返回类型文本图片
    private getTypeLabelImage(index:number):eui.Image{
        var self = this;
        var img:eui.Image;
        if(index==0){
            img = self.imgAttributeLabel;
        }else if(index==1){
            img = self.imgSkillLabel;
        }else if(index==2){
            img = self.imgFetterLabel;
        }
        return img;
    }

    //选择当前选择面板 0属性 1技能 2羁绊
    private selTypeGroup(index:number):void{
        var self = this;
        var imgBG:eui.Image;
        var imgLabel:eui.Image;
        if(self.curTypeIndex!=null){
            imgBG = self.getTypeBGImage(self.curTypeIndex);
            if(imgBG!=null){
                imgBG.source = self.getImgSourcePrefix(imgBG)+"_0";
            }
            imgLabel = self.getTypeLabelImage(self.curTypeIndex);
            if(imgLabel!=null){
                imgLabel.source = self.getImgSourcePrefix(imgLabel)+"_0";
            }
        }
        self.curTypeIndex = index;
        imgBG = self.getTypeBGImage(self.curTypeIndex);
        if(imgBG!=null){
            imgBG.source = self.getImgSourcePrefix(imgBG)+"_1";
        }
        imgLabel = self.getTypeLabelImage(self.curTypeIndex);
        if(imgLabel!=null){
            imgLabel.source = self.getImgSourcePrefix(imgLabel)+"_1";
        }
        
        self.groupAttribute.visible = self.curTypeIndex==0;
        self.groupSkill.visible = self.curTypeIndex==1;
        self.groupFetter.visible = self.curTypeIndex==2;
    }

    //返回图片资源前缀
    private getImgSourcePrefix(img:eui.Image):string{
        var str:string = "";
        var sourceObj = img.source;
        var arr:Array<string> = sourceObj.toString().split(".");
        if(arr.length==2){
            var arrSource:Array<string> = arr[1].split("_");
            if(arrSource.length==2){
                str = arr[0]+"."+arrSource[0];
            }
        }
        return str;
    }

    //显示卡牌
    private setCard(data:any):void{
        var self = this;
        var objData:any = data;
        objData["canTouch"] = false;
        // var data = {"icon":"caocao", "rarity":"common","element":"water","round":6, "generation" :1, level:1,"name":"诸葛村夫", "atk":66, "hp":66,"canTouch":false};
        var view:CardRectangleView = new CardRectangleView();
        view.initData(objData);
        view.horizontalCenter= "0";
        view.verticalCenter = "0";
        self.groupCard.addChild(view);
    }

    private attributeTextField0:egret.TextField;
    private attributeTextField1:egret.TextField;
    //设置属性
    private setAttribute(data:any):void{
        var self = this;
        var txt0:egret.TextField = null;
        if(self.attributeTextField0==null){
            txt0 = new egret.TextField();
            txt0.textColor = 0xffffff;
            txt0.size = 26;
            txt0.lineSpacing = 40;
            self.groupAttTextField.addChild(txt0);
            txt0.fontFamily="SimHei";

            self.attributeTextField0 = txt0;
        }else{
            txt0 = self.attributeTextField0;
        }

        var txt1:egret.TextField = null;
        if(self.attributeTextField1==null){
            txt1 = new egret.TextField();
            txt1.textColor = 0xffffff;
            txt1.size = 26;
            txt1.lineSpacing = 40;
            txt1.x = 240;
            self.groupAttTextField.addChild(txt1);
            txt1.fontFamily="SimHei";

            self.attributeTextField1 = txt1;
        }else{
            txt1 = self.attributeTextField1;
        }

        var rarity:string = data.rarity;
        var rarityStr:string = PublicMethodManager.getInstance().getCardRarity(rarity);
        
        var generation:number = data.generation;
        var level:number = ((data.level-1)%5 + 1);
        level = (level-1)%1 + 1;
        var glStr:string = PublicMethodManager.getInstance().getProbabilityStr(self.labelObj["lbl_3"],[generation+"",level+""]);//generation+"代"+level+"星"

        var atk:number = data.atk;
        var cost:number = data.cost;
        var att:number = data.att;
        var hp:number = data.hp;
        var hit:number =data.hit;
        var agl:number = data.agl;
        var cri_chance:number = data.cri_chance;
        var cri_multiplier:number =data.cri_multiplier;
        var rgn:number =data.rgn;
        
        // txt0.textFlow = [
        //       {text: "品质: ", style: {textColor:0x8bc2d5}},
        //       {text: rarityStr+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "星级: ", style: {textColor:0x8bc2d5}},
        //       {text: glStr+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "战力: ", style: {textColor:0x8bc2d5}},
        //       {text: (atk+hp)+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "费用: ", style: {textColor:0x8bc2d5}},
        //       {text: cost+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "等待回合: ", style: {textColor:0x8bc2d5}},
        //       {text: att+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "生命: ", style: {textColor:0x8bc2d5}},
        //       {text: hp+'\n',style:{textColor:0xFFFFFF}},
        // ]

        // txt1.textFlow = [
        //       {text: "攻击: ", style: {textColor:0x8bc2d5}},
        //       {text: atk+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "命中率: ", style: {textColor:0x8bc2d5}},
        //       {text: hit+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "闪避率: ", style: {textColor:0x8bc2d5}},
        //       {text: agl+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "暴击率: ", style: {textColor:0x8bc2d5}},
        //       {text: cri_chance+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "暴击倍数: ", style: {textColor:0x8bc2d5}},
        //       {text: cri_multiplier+'\n',style:{textColor:0xFFFFFF}},
        //       {text: "回复: ", style: {textColor:0x8bc2d5}},
        //       {text: rgn+'\n',style:{textColor:0xFFFFFF}},
        // ]

        txt0.textFlow = [
              {text: self.labelObj["lbl_4"], style: {textColor:0x8bc2d5}},
              {text: rarityStr+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_6"], style: {textColor:0x8bc2d5}},
              {text: (atk+hp)+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_9"], style: {textColor:0x8bc2d5}},
              {text: hp+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_11"], style: {textColor:0x8bc2d5}},
              {text: hit+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_13"], style: {textColor:0x8bc2d5}},
              {text: cri_chance+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_7"], style: {textColor:0x8bc2d5}},
              {text: cost+'\n',style:{textColor:0xFFFFFF}},
        ]

        txt1.textFlow = [
              {text: self.labelObj["lbl_5"], style: {textColor:0x8bc2d5}},
              {text: glStr+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_8"], style: {textColor:0x8bc2d5}},
              {text: att+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_10"], style: {textColor:0x8bc2d5}},
              {text: atk+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_12"], style: {textColor:0x8bc2d5}},
              {text: agl+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_14"], style: {textColor:0x8bc2d5}},
              {text: cri_multiplier+'\n',style:{textColor:0xFFFFFF}},
              {text: self.labelObj["lbl_15"], style: {textColor:0x8bc2d5}},
              {text: rgn+'\n',style:{textColor:0xFFFFFF}},
        ]
    }


    
    //设置技能
    private setSkill(data:any):void{
        if(data==null)
            return;
            
        var self = this;
        for(var key in data){
            var item = data[key];
            if(item==null)
                continue;
            
            self.setSkillItem(item);
        }
    }

    //设置羁绊
    private setFetter(data:any):void{
        if(data==null)
            return;

        var self = this;
        for(var key in data){
            var item = data[key];
            if(item==null)
                continue;

            self.setFetterItem(item);
        }
    }

    private setSkillItem(data:any):void{
        if(data==null)
            return;
        
        var self =this;
        var objData:Object = {name:data.name,level:data.level,type:data.type,desc:data.desc,fdata:{icon:data.icon,level:data.level,canTouch:false}}
        var view:CCardSkillItemView = new CCardSkillItemView();
        view.initData(objData);
        self.groupSkillItem.addChild(view);
        self.arrSkillItemView.push(view);
    }

    private setFetterItem(data:any):void{
        if(data==null)
            return;
        // var data = {name:"羁绊名称"+i,desc:"羁绊描述羁绊描述羁绊描述羁绊描述羁绊描述"+i,fdata:{type:"jbmingcheng"+(i%4+1),canTouch:false}};
        var self =this;
        var objData:Object = {name:data.name,desc:data.desc,cname:self.cardName,compose:data.zc,fdata:{icon:data.icon,color:data.color,canTouch:false}}
        var view:CCardFetterItemView = new CCardFetterItemView();
        view.initData(objData);
        self.groupFetterItem.addChild(view);
        self.arrFetterItemView.push(view);
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupCCardDetail==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupCCardDetail.scaleX = 
            self.groupCCardDetail.scaleY = 1;
            return;
        }
        self.groupCCardDetail.scaleX = 
        self.groupCCardDetail.scaleY = gapNum;
    }

}