// TypeScript file
class CResManager{
    private static m_manager:CResManager;
    public static getInstance():CResManager{
        var self = this;
        if(self.m_manager==null){
            self.m_manager = new CResManager();
        }
        return self.m_manager;
    }

    private arrRCSkillKey:Array<string>; //长方形卡牌技能键值容器
    private arrMCSource:Array<string>;  //已完成的动画资源路径集合
    private arrSound:Array<string>;     //已完成的动画声音路径集合
    private arrLoadMCSource:Array<string>; //正在加载中的动画路径集合

    //添加长方形卡牌技能id;
    public addResByRCSkillKey(skillKey:string):void{
        if(skillKey==null||skillKey=="")
            return;
        
        var self = this;
        if(self.arrRCSkillKey==null)
            self.arrRCSkillKey = new Array<string>();
        
        if(CombatUtils.checkHasData(skillKey,self.arrRCSkillKey))
            return;
        self.arrRCSkillKey.push(skillKey);

        
        var expForms:any = CombatConfig.getInstance().getRCSkillExpFormsConfig();
        var expFormSkillAttrs:any = expForms[skillKey];
        if(expFormSkillAttrs==null)
            return;

        var rec_attr:Object  = expFormSkillAttrs[CombatConstants.SKILL_REC_ATTR];
        self.parseSkillMCConfig(rec_attr);

        var res_attr:Object  = expFormSkillAttrs[CombatConstants.SKILL_RES_ATTR];
        self.parseSkillMCConfig(res_attr);

    }

    //解析技能动画配置
    private parseSkillMCConfig(data:any):void{
        if(data==null||!data.hasOwnProperty(CombatConstants.EFF_COMP))
            return;
        
        var eff_comp:Object = data[CombatConstants.EFF_COMP];
        if(eff_comp==null&&!eff_comp.hasOwnProperty(CombatConstants.EFF_COMP_MOVIECLIPS))
            return;
        
        var self = this;
        var movieClips:Array<Object> = eff_comp[CombatConstants.EFF_COMP_MOVIECLIPS];
        for(var key in movieClips){
            var item:Object = movieClips[key];
            if(item==null||!item.hasOwnProperty(CombatConstants.COMPONENT_ID))
                continue;
            var config:MovieClipConfig = self.getMCConfig(item);
            var mcSource:string = config.jsName+"."+config.mcName;
            self.addMCSource(mcSource);
            var sound:string = config.sound;
            self.addSound(sound);
        }
    }

    // //根据动画配置返回资源名称
    // private getSourceByMCConfig(data:any):string{
    //     if(data==null)
    //         return "";
    //     var config:MovieClipConfig = CombatConfig.getInstance().getEffComponentConfig(data,CombatConstants.EFF_COMP_MOVIECLIPS) as MovieClipConfig;
    //     return config.jsName+"."+config.mcName;
    // }

    //返回动画配置
    private getMCConfig(data:any):MovieClipConfig{
        if(data==null)
            return null;
        return CombatConfig.getInstance().getEffComponentConfig(data,CombatConstants.EFF_COMP_MOVIECLIPS) as MovieClipConfig;
    }

    //添加动画资源路径
    private addMCSource(source:string):void{
        var self = this;
        if(self.arrMCSource==null)
            self.arrMCSource = new Array<string>();
        
        if(CombatUtils.checkHasData(source,self.arrMCSource))
            return;
        self.arrMCSource.push(source);


        if(self.arrLoadMCSource==null)
            self.arrLoadMCSource = new Array<string>();
        self.arrLoadMCSource.push(source);
        if(self.arrLoadMCSource.length<=1){
            self.onLoadMCData(self.arrLoadMCSource);
        }
    }

    //当开始下载动画资源
    private onLoadMCData(arr:Array<string>,removeSource:string = null):void{
        var self = this;
        if(arr==null)
            return;
        if(removeSource!=null){
            for(var i:number=0,lengthI:number = arr.length;i<lengthI;i++){
                var item:string = arr[i];
                if(item==null)
                    continue;
                if(item==removeSource){
                    arr.splice(i,1);
                    break;
                }
            }
        }
        if(arr.length<=0)
            return;

        var source:string = arr[0];//.shift();
        var mc:UIMovieClip = new UIMovieClip();
        mc.source = source;
        mc.once(UIMovieClip.LOAD_FIN_EVENT,self.onLoadMCData.bind(self,arr,source),mc);
    }
    
    //添加动画声音路径
    private addSound(source:string):void{
        var self = this;
        if(self.arrSound==null)
            self.arrSound = new Array<string>();
        
        if(CombatUtils.checkHasData(source,self.arrSound))
            return;
            
        let sound = RES.getRes( source );
        if( sound==null ){
            RES.getResAsync( source, function(sound:egret.Sound, source:string){
                self.arrSound.push(source);
            }, self );
        }  
    }
}