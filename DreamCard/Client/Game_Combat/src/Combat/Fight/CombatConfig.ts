// TypeScript file
class CombatConfig{
    private static m_manager:CombatConfig;
    public static getInstance():CombatConfig{
        var self = this;
        if(self.m_manager==null){
            self.m_manager = new CombatConfig();
            self.m_manager.initConfig();
        }
        return self.m_manager;
    }

    private configs:any;

    private initConfig():void{
        var self = this;

        var configs:any = RES.getRes(CombatConstants.COMBAT_CONFIG_JSON);
        self.configs = configs;
    }

    //返回头像普通表现形式配置
    public getHeadCommonExpFormsConfig():any{
        return this.configs[CombatConstants.HEAD_COMMON_EXP_FORMS];
    }

    //返回头像技能表现形式配置
    public getHeadSkillExpFormsConfig():any{
        return this.configs[CombatConstants.HEAD_SKILL_EXP_FORMS];
    }

    //返回头像羁绊表现形式配置
    public getHeadFetterExpFormsConfig():any{
        return this.configs[CombatConstants.HEAD_FETTER_EXP_FORMS];
    }

    //返回长方形卡牌Buff表现形式配置
    public getRCBuffExpFormsConfig():any{
        return this.configs[CombatConstants.RC_BUFF_EXP_FORMS];
    }

    //返回长方形卡牌普通表现形式配置
    public getRCCommonExpFormsConfig():any{
        return this.configs[CombatConstants.RC_COMMON_EXP_FORMS];
    }

    //返回长方形卡牌技能表现形式配置
    public getRCSkillExpFormsConfig():any{
        return this.configs[CombatConstants.RC_SKILL_EXP_FORMS];
    }

    //返回长方形羁绊表现形式配置
    public getRCFetterExpFormsConfig():any{
        return this.configs[CombatConstants.RC_FETTER_EXP_FORMS];
    }

    //返回正方形卡牌技能表现形式配置
    public getSCSkillExpFormsConfig():any{
        return this.configs[CombatConstants.SC_SKILL_EXP_FORMS];
    }
    

    //返回发牌配置根据位置
    public getSendCardConfigByPlace(place:number):SendCardConfig{
        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var config:any = this.configs[CombatConstants.SEND_CARD];
        var attr:any = config[attrStr];
        return CombatUtils.getConfig(attr,SendCardConfig);
    }

    //返回出牌配置根据位置
    public getOutCardConfigByPlace(place:number):OutCardConfig{
        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var config:any = this.configs[CombatConstants.OUT_CARD];
        var attr:any = config[attrStr];
        return CombatUtils.getConfig(attr,OutCardConfig);
    }

    //返回死亡牌配置根据位置
    public getDeathCardConfigByPlace(place:number):DeathCardConfig{
        var attrStr:string = place==CombatConstants.PLACE_ATK?CombatConstants.ATKC_ATTR:CombatConstants.DFDC_ATTR;
        var config:any = this.configs[CombatConstants.DEATH_CARD];
        var attr:any = config[attrStr];
        return CombatUtils.getConfig(attr,DeathCardConfig);
    }
    
    // //返回正方形卡牌特效配置
    // public getSCMCConfigByEffName(name:string):MovieClipConfig{
    //     var config:any = this.configs[CombatConstants.SC_EXP_FORMS];
    //     var eff:any = config[name];
    //     var attr:any = this.getEffMovieClipConfig(eff[CombatConstants.MOVIECLIP_ID]);
    //     return CombatUtils.getConfig(attr,MovieClipConfig);
    // }

    //返回常用动作数据根据id
    public getCommonActionDataById(actId:string):any{
        if(actId==null||actId=="")
            return null;
        var config:any = this.configs[CombatConstants.COMMON_ACTIONS];
        return config[actId];
    }

    //返回动作属性配置 这里需要加速倍数 所以需要手动解析
    public getActionAttrConfig(data:any):CActionConfig{
        if(data==null)
            return null;

        var actionAttrConfig:CActionConfig = CombatUtils.getConfig(data[CombatConstants.ATTR_ACT],CActionConfig);
        if(actionAttrConfig==null)
            return null;

        actionAttrConfig.speed = CombatUtils.getAMSpeed(actionAttrConfig.speed);
        actionAttrConfig.preDelay = CombatUtils.getAMSpeed(actionAttrConfig.preDelay);
        actionAttrConfig.postDelay = CombatUtils.getAMSpeed(actionAttrConfig.postDelay);
        return actionAttrConfig;
    }

    //解析动作配置*这个配置特殊一点 创建对象时有为null的属性 所以需要手动解析
    public getActionConfig(data:any,actionAttrConfig:CActionAttrConfig = null):CActionConfig{
        if(data==null)
            return null;
        
        var ac:CActionConfig = new CActionConfig();
        if(data.hasOwnProperty(CombatConstants.ATTR_MOVE_X)){
            ac.moveX = data[CombatConstants.ATTR_MOVE_X];
        }else if(data.hasOwnProperty(CombatConstants.ATTR_MOVE_TO_X)){
            ac.moveToX = data[CombatConstants.ATTR_MOVE_TO_X];
        }

        if(data.hasOwnProperty(CombatConstants.ATTR_MOVE_Y)){
            ac.moveY = data[CombatConstants.ATTR_MOVE_Y];
        }else if(data.hasOwnProperty(CombatConstants.ATTR_MOVE_TO_Y)){
            ac.moveToY = data[CombatConstants.ATTR_MOVE_TO_Y];
        }

        if(data.hasOwnProperty(CombatConstants.ATTR_ROTATE_RANGE)){
            ac.rotateRange = data[CombatConstants.ATTR_ROTATE_RANGE];
        }
        if(data.hasOwnProperty(CombatConstants.ATTR_ALPHA)){
            ac.alpha = data[CombatConstants.ATTR_ALPHA];
        }
        
        //判断是否有该属性 没有再判断是否有父类参数
        if(data.hasOwnProperty(CombatConstants.ATTR_LOOP)){
            ac.loop = data[CombatConstants.ATTR_LOOP];
        }else if(actionAttrConfig!=null){
            ac.loop = actionAttrConfig.loop;
        }

        if(data.hasOwnProperty(CombatConstants.ATTR_SPEED)){
            ac.speed = CombatUtils.getAMSpeed(data[CombatConstants.ATTR_SPEED]);
        }else if(actionAttrConfig!=null){
            ac.speed = actionAttrConfig.speed;
        }

        if(data.hasOwnProperty(CombatConstants.ATTR_PRE_DELAY)){
            ac.preDelay = CombatUtils.getAMSpeed(data[CombatConstants.ATTR_PRE_DELAY]);
        }else if(actionAttrConfig!=null){
            ac.preDelay = actionAttrConfig.preDelay;
        }

        if(data.hasOwnProperty(CombatConstants.ATTR_POST_DELAY)){
            ac.postDelay = CombatUtils.getAMSpeed(data[CombatConstants.ATTR_POST_DELAY]);
        }else if(actionAttrConfig!=null){
            ac.postDelay = actionAttrConfig.postDelay;
        }

        if(data.hasOwnProperty(CombatConstants.ATTR_REMOVE)){
            ac.remove = data[CombatConstants.ATTR_REMOVE];
        }else if(actionAttrConfig!=null){
            ac.remove = actionAttrConfig.remove;
        }

        return ac;
    }

    //返回特效组件
    public getEffComponentConfig(data:any,type:string):EffCompBaseConfig{
        if(data==null)
            return null;
        
        var id:any = data[CombatConstants.COMPONENT_ID];

        var eff_components:any = this.configs[CombatConstants.EFF_COMPONENTS];
        if(eff_components==null)
            return null;

        var compData:any = eff_components[type];
        if(compData==null)
            return null;
        
        var classObj:any;
        switch(type){
            case CombatConstants.EFF_COMP_IMAGE:
                classObj = ImageConfig;
            break;
            case CombatConstants.EFF_COMP_IMAGES:
                classObj = ImageConfig;
            break;
            case CombatConstants.EFF_COMP_BITMAP_LABELS:
                classObj = BitmapLabelConfig;
            break;
            case CombatConstants.EFF_COMP_LABELS:
                classObj = LabelConfig;
            break;
            case CombatConstants.EFF_COMP_MOVIECLIPS:
                classObj = MovieClipConfig;
            break;
        }
        var config:any = CombatUtils.getConfig(compData[id],classObj);
        CombatUtils.assignmentObj(config,data);
        if(config.frameRate!=null){
            config.frameRate = CombatUtils.getAMFrameRate(config.frameRate);
        }
        return config;
    }

    //后期删除
    public getConfigs():any{
        return this.configs;
    }
}