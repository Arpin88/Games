// TypeScript file
class FightExpForm{
    public constructor(view:ExpFromImpl){
        this.view = view;
    }
    
    //卡牌变现视图
    private view:ExpFromImpl;
    //buff集合
    private arrBuffView:Array<CRBuffItemView>;
    //羁绊集合
    private arrFetterView:Array<CRFetterItemView>;
    //战斗技能持续
    private arrFightSkillContent:Array<FightSkillContent>;
    //表现动作集合
    private arrExpFormsActions:Array<ActionContent>;

    //移动表现
    public moveExpForm(x:number,y:number,speed:number,callback:Handler = null):void{
        var self = this;
        var caconfig:CActionConfig = new CActionConfig();
        caconfig.moveToX = x;
        caconfig.moveToY = y;
        caconfig.speed = speed;
        CombatAction.playAction(caconfig,self.view,callback);
    }
    

    //根据类型播放普通表现形式
    public playHeadCommonExpFromByType(type:string,place:number,fn:FightNode = null,callback:Handler = null):void{
         if(type==null||type==""){
             if(callback!=null)
                callback.run();
            return;
         }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getHeadCommonExpFormsConfig();
        var expFormAttrs:any = expForms[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }
            
        
        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];
        self.setEffComponent(eff_comp,place,fn);

        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var attr:any = expFormAttrs[attrStr];
        if(attr!=null)
            self.parseExpFormsAction(attr,self.view);

        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){callback.run()});
        }
    }

     //根据类型播放技能表现形式
    public playHeadSkillExpFromByType(skillKey:string,type:string,place:number,fn:FightNode = null,callback:Handler = null):void{
        if(skillKey==null||skillKey==""||type==null||type==""){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getHeadSkillExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null){
            //如果头像不存在对应的技能则播放普攻效果
            this.playHeadCommonExpFromByType(CombatConstants.EXP_FORM_HIT,CombatConstants.PLACE_ATK, fn, callback);
            return;
        }
            
        
        fn=fn==null?new FightNode():fn;
        //这里给技能名称赋值 以方便下面配置显示
        if(fn.skillNameShow==null){
            var ltype:number = LanguageManager.getInstance().getCurLanguageType();
            if(expFormSkillAttrs.name!=null&&expFormSkillAttrs.name[ltype]!=null)
                fn.skillNameShow = expFormSkillAttrs.name[ltype];
        }

        var expFormAttrs:any = expFormSkillAttrs[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }
        
        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];
        self.setEffComponent(eff_comp,place,fn);


        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var attr:any = expFormAttrs[attrStr];
        if(attr!=null)
            self.parseExpFormsAction(attr,self.view);

        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){
            //     callback.run()});
        }
    }

    //根据类型播放头像羁绊表现形式
    public playHeadFetterExpFrom(skillKey:string,type:string,place:number,callback:Handler = null,showEff:boolean = true):void{
        if(skillKey==null||skillKey==""||type==null||type==""){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getHeadFetterExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var expFormAttrs:any = expFormSkillAttrs[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];

        var showDelay:number = 0;
        var iconRes:string = "";
        var imageData:any = eff_comp[CombatConstants.EFF_COMP_IMAGE];
        if(imageData!=null){
            var imageConfig:ImageConfig = CombatConfig.getInstance().getEffComponentConfig(imageData,CombatConstants.EFF_COMP_IMAGES) as ImageConfig;
            iconRes = imageConfig.res;
            showDelay = imageConfig.showDelay;
        }
        
        if(self.arrFetterView==null){
            self.arrFetterView = new Array<CRFetterItemView>();
        }

        var fetterView:CRFetterItemView = null;
        
        for(var i:number=0,lengthI=self.arrFetterView.length;i<lengthI;i++){
            var itemView:CRFetterItemView = self.arrFetterView[i];
            if(itemView==null)
                continue;
            if(itemView.getCurFetterKey()==skillKey){
                fetterView = itemView;
                break;
            }
        }

        if(fetterView!=null){
            if(callback!=null){
                callback.run();
            }
            return;
        }else{
            if(showEff){
                var fn:FightNode = new FightNode();
                //这里给技能名称赋值 以方便下面配置显示
                var ltype:number = LanguageManager.getInstance().getCurLanguageType();
                if(expFormSkillAttrs.name!=null&&expFormSkillAttrs.name[ltype]!=null)
                    fn.skillNameShow = expFormSkillAttrs.name[ltype];
                self.setEffComponent(eff_comp,place,fn);
            }else
                showDelay = 0;
            
            fetterView = new CRFetterItemView();
            fetterView.initData({iconRes:iconRes,skillKey:skillKey});
            
            //返回羁绊层
            var parent:egret.DisplayObjectContainer = self.view.getParentByType(2);
            parent.addChild(fetterView);
            self.delayDisplay(fetterView,showDelay,Handler.create(self, function(fetterViewParam){
                self.arrFetterView.push(fetterViewParam);
            },[fetterView]));
        }
        
        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){
            //     callback.run()});
        }
    }


    //根据类型播放普通表现形式
    public playRCCommonExpFromByType(type:string,place:number,fn:FightNode = null,callback:Handler = null):void{
        if(type==null||type==""){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getRCCommonExpFormsConfig();
        var expFormAttrs:any = expForms[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }
        
        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];
        self.setEffComponent(eff_comp,place,fn);

        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var attr:any = expFormAttrs[attrStr];
        if(attr!=null)
            self.parseExpFormsAction(attr,self.view);

        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){callback.run()});
        }

    }

     //长方形卡牌修改属性表现形式
    public playRCModifyAttributeExpFrom(skillKey:string,type:string,place:number,fn:FightNode = null,callback:Handler = null):void{
        var self = this;
        if(skillKey==""){
            self.playRCCommonExpFromByType(CombatConstants.EXP_FORM_MODIFY,place,fn,callback);
        }else{
            self.playRCSkillExpFromByType(skillKey,type,place,fn,callback);
        }
    }

    //根据类型播放普通表现形式
    public playRCSkillExpFromByType(skillKey:string,type:string,place:number,fn:FightNode = null,callback:Handler = null):void{
        if(skillKey==null||skillKey==""||type==null||type==""){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getRCSkillExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }
        
        fn=fn==null?new FightNode():fn;
        //这里给技能名称赋值 以方便下面配置显示
        if(fn.skillNameShow==null){
            var ltype:number = LanguageManager.getInstance().getCurLanguageType();
            if(expFormSkillAttrs.name!=null&&expFormSkillAttrs.name[ltype]!=null)
                fn.skillNameShow = expFormSkillAttrs.name[ltype];
        }

        var expFormAttrs:any = expFormSkillAttrs[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }
        
        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];
        self.setEffComponent(eff_comp,place,fn);


        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var attr:any = expFormAttrs[attrStr];
        if(attr!=null)
            self.parseExpFormsAction(attr,self.view);

        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call();
        }
    }

    //根据类型播放长方形卡牌羁绊表现形式
    public playRCFetterExpFrom(skillKey:string,type:string,place:number,fn:FightNode = null,callback:Handler = null):void{
        if(skillKey==null||skillKey==""||type==null||type==""){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getRCFetterExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var expFormAttrs:any = expFormSkillAttrs[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];

        // var fn:FightNode = new FightNode();
        // //这里给技能名称赋值 以方便下面配置显示
        // fn.skillNameShow = expFormSkillAttrs.name;
        // self.setEffComponent(eff_comp,place,fn);

        if(eff_comp.hasOwnProperty(CombatConstants.EFF_COMP_LABELS)){
            var labelsData:any = eff_comp[CombatConstants.EFF_COMP_LABELS];
            var reduceLabelData:any = null;
            var increaseLabelData:any = null;
            var reduceLabelStr:string = "";
            var increaseLabelStr:string = "";
            if(fn!=null&&fn[CombatConstants.EFF_COMP_LABEL_REDUCE]!=null){
                reduceLabelStr = fn[CombatConstants.EFF_COMP_LABEL_REDUCE];
                reduceLabelData = labelsData[CombatConstants.EFF_COMP_LABEL_REDUCE];
            }
            if(fn!=null&&fn[CombatConstants.EFF_COMP_LABEL_INCREASE]!=null){
                increaseLabelStr = fn[CombatConstants.EFF_COMP_LABEL_INCREASE];
                increaseLabelData = labelsData[CombatConstants.EFF_COMP_LABEL_INCREASE];
            }

            if(reduceLabelStr!=""||increaseLabelStr!=""){
                var reduceLabelConfig:LabelConfig = null;
                var increaseLabelConfig:LabelConfig = null;

                if(reduceLabelData!=null)
                    reduceLabelConfig = CombatConfig.getInstance().getEffComponentConfig(reduceLabelData,CombatConstants.EFF_COMP_LABELS) as LabelConfig;
                if(increaseLabelData!=null)
                    increaseLabelConfig = CombatConfig.getInstance().getEffComponentConfig(increaseLabelData,CombatConstants.EFF_COMP_LABELS) as LabelConfig;
                
                var label:eui.Label = null;
                if(reduceLabelConfig!=null)
                    label = CombatEffComp.addLabelByConfig(reduceLabelConfig,self.view.getParentByZIndex(reduceLabelConfig.zIndex),reduceLabelStr+increaseLabelStr);
                else if(increaseLabelData!=null)
                    label = CombatEffComp.addLabelByConfig(increaseLabelConfig,self.view.getParentByZIndex(increaseLabelConfig.zIndex),reduceLabelStr+increaseLabelStr);
                
                if(label!=null){
                    var arrTextFlow:Array<any> = [];
                    if(reduceLabelStr!=""){
                        arrTextFlow.push({text: reduceLabelStr, style: {size:reduceLabelConfig.size,textColor:reduceLabelConfig.textColor,strokeColor:reduceLabelConfig.strokeColor}});
                    }
                    if(increaseLabelStr!=""){
                        arrTextFlow.push({text: increaseLabelStr,style:{size:increaseLabelConfig.size,textColor:increaseLabelConfig.textColor,strokeColor:increaseLabelConfig.strokeColor}});
                    }
                    if(arrTextFlow.length!=0){
                        label.textFlow = arrTextFlow;
                        if(reduceLabelConfig!=null){
                            self.delayDisplay(label,reduceLabelConfig.showDelay,Handler.create(self, function(labelDataParam,labelParam){
                                self.parseAction(labelDataParam,labelParam);
                            },[reduceLabelData,label]));
                        }else if(increaseLabelConfig!=null){
                            self.delayDisplay(label,increaseLabelConfig.showDelay,Handler.create(self, function(labelDataParam,labelParam){
                                self.parseAction(labelDataParam,labelParam);
                            },[increaseLabelData,label]));
                        }
                    }
                }
            }
            
        }


        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){
            //     callback.run()});
        }
    }

    //添加buff
    public addRCBuff(skillKey:string,fn:FightNode = null,callback:Handler = null):void{
        if(skillKey==null||skillKey==""){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        var expForms:any = CombatConfig.getInstance().getRCBuffExpFormsConfig();
        var expFormBuffAttrs:any = expForms[skillKey];
        if(expFormBuffAttrs==null)
            return;
        
        var eff_comp:any = expFormBuffAttrs[CombatConstants.EFF_COMP];

        var iconRes:string = "";

        var imageData:any = eff_comp[CombatConstants.EFF_COMP_IMAGE];
        if(imageData!=null){
            var imageConfig:ImageConfig = CombatConfig.getInstance().getEffComponentConfig(imageData,CombatConstants.EFF_COMP_IMAGES) as ImageConfig;
            iconRes = imageConfig.res;
        }
        
        var buffRound:number = fn.buffRound;
        
        if(self.arrBuffView==null){
            self.arrBuffView = new Array<CRBuffItemView>();
        }

        var buffView:CRBuffItemView = null;
        
        for(var i:number=0,lengthI=self.arrBuffView.length;i<lengthI;i++){
            var itemView:CRBuffItemView = self.arrBuffView[i];
            if(itemView==null)
                continue;
            if(itemView.getCurBuffKey()==skillKey){
                buffView = itemView;
                break;
            }
        }

        if(buffView!=null){
            buffView.updateShow(buffRound,iconRes);
        }else{
            buffView = new CRBuffItemView();
            buffView.initData({iconRes:iconRes,buffRound:buffRound,skillKey:skillKey});
            //返回BUFF层
            var parent:egret.DisplayObjectContainer = self.view.getParentByType(2);
            parent.addChild(buffView);
            self.arrBuffView.push(buffView);

            self.sortRCBuff();
        }

        if(callback!=null){
            callback.run();
        }
    }

    //排序BUFF
    private sortRCBuff():void{
        var self = this;
        if(self.arrBuffView==null||self.arrBuffView.length<=0)
            return;

        for(var i:number=0,lengthI=self.arrBuffView.length;i<lengthI;i++){
            var itemView:CRBuffItemView = self.arrBuffView[i];
            if(itemView==null)
                continue;
            itemView.x = i*itemView.getViewWidth();
        }
    }

    //移除buff
    public removeRCBuff(skillKey:string,callback:Handler = null){
        var self = this;

        if(self.arrBuffView==null){
            if(callback!=null)
                callback.run();
            return;
        }

        // var buffView:CRBuffItemView = null;
        for(var i:number=self.arrBuffView.length-1;i>=0;i--){
            var itemView:CRBuffItemView = self.arrBuffView[i];
            if(itemView==null)
                continue;
            if(itemView.getCurBuffKey()==skillKey){
                itemView.parent.removeChild(itemView);
                self.arrBuffView.splice(i,1);
            }
        }

        self.sortRCBuff();

        if(callback!=null){
            callback.run()
        }
    }

    //更新buff
    public updateRCBuff(skillKey:string,fn:FightNode = null,callback:Handler = null){
        var self = this;

        var buffView:CRBuffItemView = null;
        if(self.arrBuffView!=null){
            for(var i:number=self.arrBuffView.length-1;i>=0;i--){
                var itemView:CRBuffItemView = self.arrBuffView[i];
                if(itemView==null)
                    continue;
                if(itemView.getCurBuffKey()==skillKey){
                    buffView = itemView;
                    itemView.updateShow(fn.buffRound,"");
                    break;
                }
            }
        }

        if(buffView==null){
            self.addRCBuff(skillKey,fn,callback);
            return;
        }

        self.sortRCBuff();

        if(callback!=null){
            callback.run()
        }
    }

    //添加持续技能
    public addRCContinueSkill(skillKey:string,type:string,place:number,callback:Handler = null){
        var self = this;
        if(self.checkHasContinueSkill(skillKey)){
            if(callback!=null)
                callback.run();
            return;
        }

        var expForms:any = CombatConfig.getInstance().getRCSkillExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var expFormAttrs:any = expFormSkillAttrs[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];

        if(eff_comp.hasOwnProperty(CombatConstants.EFF_COMP_MOVIECLIPS)){
            var movieClipsData:any = eff_comp[CombatConstants.EFF_COMP_MOVIECLIPS];
            var mcs:Array<UIMovieClip> = new Array<UIMovieClip>();
            for(var key in movieClipsData){
                var movieClipData:any = movieClipsData[key]
                if(movieClipData==null)
                    continue;
                
                var mc:UIMovieClip = self.addMovieClipByData(movieClipData,place);
                mcs.push(mc);
            }
            if(mcs.length>0)
                self.addFightSkillContent(skillKey,mcs);
        }

        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){callback.run()});
        }
    }

    //移除持续技能
    public removeContinueSkill(skillKey:string):void{
        this.removeFightSkillContent(skillKey);
    }


     //添加持续技能
    public addSCContinueSkill(skillKey:string,type:string,place:number = -1,callback:Handler = null):void{
        var self = this;
        if(self.checkHasContinueSkill(skillKey)){
            if(callback!=null)
                callback.run();
            return;
        }

        var expForms:any = CombatConfig.getInstance().getSCSkillExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var expFormAttrs:any = expFormSkillAttrs[type];
        if(expFormAttrs==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var eff_comp:any = expFormAttrs[CombatConstants.EFF_COMP];
        if(eff_comp.hasOwnProperty(CombatConstants.EFF_COMP_MOVIECLIPS)){
            var movieClipsData:any = eff_comp[CombatConstants.EFF_COMP_MOVIECLIPS];
            var mcs:Array<UIMovieClip> = new Array<UIMovieClip>();
            for(var key in movieClipsData){
                var movieClipData:any = movieClipsData[key]
                if(movieClipData==null)
                    continue;
                
                var mc:UIMovieClip = self.addMovieClipByData(movieClipData,place);
                mcs.push(mc);
            }
            if(mcs.length>0)
                self.addFightSkillContent(skillKey,mcs);
        }

        //使用时间
        var usageTime:number = expFormAttrs[CombatConstants.USAGE_TIME];
        usageTime = usageTime = null? 0:CombatUtils.getAMSpeed(usageTime);
        if(callback!=null){
            egret.setTimeout(function(callbackParam){
                callbackParam.run()}.bind(self,callback), self, usageTime);
            // egret.Tween.get(self).wait(usageTime).call(function(){callback.run()});
        }
    }

    //延迟显示
    private delayDisplay(target:any,delay:number,callback:Handler = null):void{
        if(target==null){
            if(callback!=null)
                callback.run();
            return;
        }
        var showDelay:number = CombatUtils.getAMSpeed(delay);
        if(showDelay!=0){
            var parent:egret.DisplayObjectContainer = target.parent;
            if(parent==null){
                if(callback!=null)
                    callback.run();
                return;
            }
            parent.removeChild(target);
            
            var hand:Handler = Handler.create(self,function(callbackParam,parentParam,targetParam){
                parentParam.addChild(targetParam);
                if(callbackParam!=null)
                    callbackParam.run();
            },[callback,parent,target]);

            egret.setTimeout(function(handParam){
                handParam.run();
            }.bind(self,hand), self, showDelay);

            // egret.Tween.get(target).wait(showDelay).call(function():void{
            //     parent.addChild(target);
            //     if(callback!=null)
            //         callback.run();
            // }.bind(self));
        }else{
            if(callback!=null)
                callback.run();
        }
    }
    //设置特效组件
    private setEffComponent(data:any,place:number,fn:FightNode = null):void{
        if(data==null)
            return;

        var self = this;
        if(data.hasOwnProperty(CombatConstants.EFF_COMP_IMAGES)){
            var imagesData:any = data[CombatConstants.EFF_COMP_IMAGES];
            for(var key in imagesData){
                var imageData:any = imagesData[key]
                if(imageData==null)
                    continue;
                
                var imageConfig:ImageConfig = CombatConfig.getInstance().getEffComponentConfig(imageData,CombatConstants.EFF_COMP_IMAGES) as ImageConfig;
                var image:eui.Image = CombatEffComp.addImageByConfig(imageConfig,self.view.getParentByZIndex(imageConfig.zIndex));
                self.delayDisplay(image,imageConfig.showDelay,Handler.create(self, function(imageDataParam,imageParam){
                    self.parseAction(imageDataParam,imageParam);
                },[imageData,image]));
            }
        }

        if(data.hasOwnProperty(CombatConstants.EFF_COMP_BITMAP_LABELS)){
            var bitmapLabelsData:any = data[CombatConstants.EFF_COMP_BITMAP_LABELS];
            for(var key in bitmapLabelsData){
                var bitmapLabelData:any = bitmapLabelsData[key]
                if(bitmapLabelData==null)
                    continue;
                
                var showText:any = null;
                if(fn!=null&&fn[key]!=null)
                    showText = fn[key];
                else{
                    var attr_text = labelData[CombatConstants.ATTR_TEXT];
                    if(attr_text!=null&&attr_text!="") //文本显示不为空也需要显示
                        showText = attr_text;
                }
                if(showText!=null){
                    var bitmapLabelConfig:BitmapLabelConfig = CombatConfig.getInstance().getEffComponentConfig(bitmapLabelData,CombatConstants.EFF_COMP_BITMAP_LABELS) as BitmapLabelConfig;
                    var bitmapLabel:eui.BitmapLabel = CombatEffComp.addBitmapLabelByConfig(bitmapLabelConfig,self.view.getParentByZIndex(bitmapLabelConfig.zIndex),showText);
                    self.delayDisplay(bitmapLabel,bitmapLabelConfig.showDelay,Handler.create(self, function(bitmapLabelDataParam,bitmapLabelParam){
                        self.parseAction(bitmapLabelData,bitmapLabel);
                    },[bitmapLabelData,bitmapLabel]));
                }
                
            }
        }

        if(data.hasOwnProperty(CombatConstants.EFF_COMP_LABELS)){
            var labelsData:any = data[CombatConstants.EFF_COMP_LABELS];
            for(var key in labelsData){
                var labelData:any = labelsData[key]
                if(labelData==null)
                    continue;
                
                var showText:any = null;
                if(fn!=null&&fn[key]!=null)
                    showText = fn[key];
                else{
                    var attr_text = labelData[CombatConstants.ATTR_TEXT];
                    if(attr_text!=null&&attr_text!="") //文本显示不为空也需要显示
                        showText = attr_text;
                }
                if(showText!=null){
                    var labelConfig:LabelConfig = CombatConfig.getInstance().getEffComponentConfig(labelData,CombatConstants.EFF_COMP_LABELS) as LabelConfig;
                    var label:eui.Label = CombatEffComp.addLabelByConfig(labelConfig,self.view.getParentByZIndex(labelConfig.zIndex),showText);
                    self.delayDisplay(label,labelConfig.showDelay,Handler.create(self, function(labelDataParam,labelParam){
                        self.parseAction(labelDataParam,labelParam);
                    },[labelData,label]));
                }
                
            }
        }

        if(data.hasOwnProperty(CombatConstants.EFF_COMP_MOVIECLIPS)){
            var movieClipsData:any = data[CombatConstants.EFF_COMP_MOVIECLIPS];
            for(var key in movieClipsData){
                var movieClipData:any = movieClipsData[key]
                if(movieClipData==null)
                    continue;
                
                self.addMovieClipByData(movieClipData,place);
            }
        }

    }

    //返回动画根据数据
    private addMovieClipByData(data:any,place:number):UIMovieClip{
        if(data==null)  
            return;

        var self = this;
        var config:MovieClipConfig = CombatConfig.getInstance().getEffComponentConfig(data,CombatConstants.EFF_COMP_MOVIECLIPS) as MovieClipConfig;
        var movieClip:UIMovieClip = CombatEffComp.addMovieClipByConfig(config,self.view.getParentByZIndex(config.zIndex));
        self.delayDisplay(movieClip,config.showDelay,Handler.create(self, function(){
            self.parseAction(data,movieClip);
        }));
        
        //动画配置特殊字段处理
        if(config!=null){
            if(config.directionX!=null&&config.directionX){
                if(place==CombatConstants.PLACE_ATK)
                    movieClip.scaleX = -1;
            }
            if(config.directionY!=null&&config.directionY){
                if(place==CombatConstants.PLACE_ATK)
                    movieClip.scaleY = -1;
            }

            if(config.remove!=null&&config.remove){
                movieClip.once(egret.Event.COMPLETE, function (e) {
                    movieClip.parent.removeChild(movieClip);
                }, self);
            }
        }

        return movieClip;
    }

    //添加战斗技能内容
    private addFightSkillContent(skillKey:string,mcs:Array<UIMovieClip>):void{
        var self = this;
        if(self.arrFightSkillContent==null){
            self.arrFightSkillContent = new Array<FightSkillContent>();
        }

        var fightSkillContent:FightSkillContent = new FightSkillContent();
        fightSkillContent.skillKey = skillKey;
        fightSkillContent.mcs = mcs;
        self.arrFightSkillContent.push(fightSkillContent);
    }

    //移除战斗技能内容
    private removeFightSkillContent(skillKey:string):void{
        var self = this;
        if(skillKey==null||skillKey==""||self.arrFightSkillContent==null)
            return;

        
        for(var i:number=self.arrFightSkillContent.length-1;i>=0;i--){
            var item:FightSkillContent = self.arrFightSkillContent[i];
            if(item==null)
                continue;
            if(item.skillKey==skillKey){
                // item.mcs.parent.removeChild(item.mc);
                var mcs:Array<UIMovieClip> = item.mcs;
                for(var j:number=mcs.length-1;j>=0;j--){
                    var mc:UIMovieClip = mcs[i];
                    if(mc.parent!=null){
                         mc.parent.removeChild(mc);
                    }
                    mcs.splice(i,1);
                }
                self.arrFightSkillContent.splice(i,1);
            }
        }
    }

    //检测是否含有技能
    private checkHasContinueSkill(skillKey:string):boolean{
        if(skillKey==null||skillKey=="")
            return false;
        var self = this;
        if(self.arrFightSkillContent==null)
            return false;
        var hasSkill:boolean = false;
        for(var i:number=self.arrFightSkillContent.length-1;i>=0;i--){
            var item:FightSkillContent = self.arrFightSkillContent[i];
            if(item==null)
                continue;
            if(item.skillKey==skillKey){
                hasSkill = true;
                break;
            }
        }
        return hasSkill;
    }

    
    //解析表现动作 如果存在旧动作则恢复成原样播放新动作
    private parseExpFormsAction(data:any,target:any,callback:Handler = null):void{
        if(data==null||target==null){
            if(callback!=null)
                callback.run();
            return;
        }

        var self = this;
        if(self.arrExpFormsActions==null){
            self.arrExpFormsActions = new Array<ActionContent>();
        }

        for(var i:number=self.arrExpFormsActions.length-1;i>=0;i--){
            var item:ActionContent = self.arrExpFormsActions[i];
            if(item==null)
                continue;
            if(item.target==target){
                CombatAction.recoverAction(item);
                self.arrExpFormsActions.splice(i,1);
            }
        }

        var act:ActionContent = new ActionContent();
        act.oriData = {x:target.x,y:target.y,rotation:target.rotation,alpha:target.alpha};
        act.target = target;
        self.arrExpFormsActions.push(act);

        var cbHandler:Handler = Handler.create(self, function(){
            for(var i:number=0,lengthI:number = self.arrExpFormsActions.length;i<lengthI;i++){
                var item:ActionContent = self.arrExpFormsActions[i];
                if(item==null)
                    continue;
                if(item==act){
                    self.arrExpFormsActions.splice(i,1);
                    break;
                }
            }
            if(callback!=null)
                callback.run();
        });
        self.parseAction(data,target,cbHandler);
    }


    //解析配置表动作
    private parseAction(data:any,target:any,callback:Handler = null):void{
        if(data==null||target==null){
            if(callback!=null)
                callback.run();
            return;
        }
        
        var configData:any = data;
        if(data.hasOwnProperty(CombatConstants.ACTION_ID)){
            configData = CombatConfig.getInstance().getCommonActionDataById(data[CombatConstants.ACTION_ID]);
        }
        var actionAttrConfig:CActionConfig = CombatConfig.getInstance().getActionAttrConfig(configData);
        var actConfigArr:CActionConfig[] = [];
        if(configData.hasOwnProperty(CombatConstants.EFF_ACTS)){
            var actConfigs:any = configData[CombatConstants.EFF_ACTS];
            for(var key in actConfigs){
                var item:any = actConfigs[key];
                if(item==null)
                    continue;

                var actConfig:CActionConfig = CombatConfig.getInstance().getActionConfig(item,actionAttrConfig);
                actConfigArr.push(actConfig);
            }
        }else if(actionAttrConfig!=null){
            actConfigArr.push(actionAttrConfig);
        }
        CombatAction.playActions(actConfigArr,target,callback);
    }


    // //添加表现动作
    // private addAction():void{
    //     var self = this;



    // }


    // //动作集合
    // private arrActions:Array<ActionContent>;

    // //添加动作操作标记
    // private addActionNote(code:string):boolean{
    //     var self = this;
    //     var hadOpt:boolean = false;
    //     var combatOptNote:CombatOptNote = self.getCombatOptNote(code);
    //     if(combatOptNote==null){    //如果是新的操作 则加入操作标记容器
    //         combatOptNote = new CombatOptNote();
    //         combatOptNote.code = code;
    //         combatOptNote.arrCombatNode = new Array<CombatNode>();
    //         combatOptNote.curCombatNode = combatNode;
    //         self.arrCombatOptNote.push(combatOptNote);

    //         hadOpt=false;
    //     }else{//否则加入操作标记池中
    //         hadOpt = combatOptNote.curCombatNode!=combatNode;
    //         if(hadOpt){
    //             combatOptNote.arrCombatNode.push(combatNode);
    //         }
                
    //     }
    //     return hadOpt;
    // }

    // //移除战斗操作标记
    // private removeCombatOptNote(code:string,combatNode:CombatNode){
    //     var self = this;
    //     var combatOptNote:CombatOptNote = self.getCombatOptNote(code);
    //     if(combatOptNote==null)
    //         return;
    //     if(combatOptNote.curCombatNode==combatNode){    //如果已经是最新的
    //         if(combatOptNote.arrCombatNode.length<=0){
    //             for(var i:number=0,lengthI:number=self.arrCombatOptNote.length;i<lengthI;i++){
    //                 var item:CombatOptNote = self.arrCombatOptNote[i];
    //                 if(item==null)
    //                     continue;
    //                 if(item.code==code){
    //                     self.arrCombatOptNote.splice(i,1);
    //                     break;
    //                 }
    //             }
    //         }else{
    //             combatOptNote.curCombatNode = combatOptNote.arrCombatNode.shift();
    //             self.parse(combatOptNote.curCombatNode);
    //         }
    //     }else{
    //         for(var i:number=0,lengthI:number=combatOptNote.arrCombatNode.length;i<lengthI;i++){
    //             var cn:CombatNode = combatOptNote.arrCombatNode[i];
    //             if(cn==null)
    //                 continue;
    //             if(cn.optType==combatNode.optType){
    //                 combatOptNote.arrCombatNode.splice(i,1);
    //                 break;
    //             }
    //         }
    //     }
    // }

    // //返回动作操作标记
    // private getActionOptNote(code:string):ActionContent{
    //     var self = this;
    //     var actionContent:ActionContent = null;
    //     for(var i:number=0,lengthI:number=self.arrActions.length;i<lengthI;i++){
    //         var item:ActionContent = self.arrActions[i];
    //         if(item==null)
    //             continue;
    //         if(item.code==code){
    //             combatOptNote = item;
    //             break;
    //         }
    //     }
    //     return combatOptNote;
    // }
}