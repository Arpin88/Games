// TypeScript file
class LanguageManager{
    private static m_manager:LanguageManager;
    public static getInstance():LanguageManager{
        if(LanguageManager.m_manager==null){
            LanguageManager.m_manager = new LanguageManager();
            LanguageManager.m_manager.init();
        }
        return LanguageManager.m_manager;
    }

    private curLType:number = -1;
    // private curLCount:number = 3;
    //皮肤文本语言包
    private languagePackage_json:any = null;

    private init():void{
        var ltype:number = -1;
        var ltypeStr:string = egret.localStorage.getItem("langtype");
        if(ltypeStr!=null&&ltypeStr!=""){
            ltype = Number(ltypeStr);
        }
        
        if(ltype==-1){
            var curLanguage:string = egret.Capabilities.language;//简体中文 zh-CN 繁体中文 zh-TW 英语 en 日语 ja 韩语 ko
            if(curLanguage=="zh-CN"||curLanguage=="zh-TW")
                ltype = 0;
            else //if(curLanguage=="en")
                ltype = 1;
        }
        // else{
        //     //egret.log(egret.Capabilities.language); //简体中文 zh-CN 繁体中文 zh-TW 英语 en 日语 ja 韩语 ko
        //     var curLanguage:string = egret.Capabilities.language;
        //     if(curLanguage=="zh-CN"||curLanguage=="zh-TW")
        //         ltype = 0;
        //     else //if(curLanguage=="en")
        //         ltype = 1;
        //     egret.localStorage.setItem("langtype",ltype+"");
        // }
        this.curLType = ltype;
    }

    public getLanguagePath():string{
        if(this.curLType==0)
            return "";
        else
            return "_en";
    }

    // public changeLanguage(languageType:number,needUpdateSkin:boolean = true):void{
    //     var self =this;
    //     if(self.curLType!=-1&&self.curLType==languageType){
    //         return;
    //     }

    //     if(needUpdateSkin){
    //         UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER);
    //     }
        
    //     self.curLType = languageType;
    //     var oldLType:number = platform.PlatformLanguage;
    //     platform.PlatformLanguage = languageType;
    //     egret.localStorage.setItem("ltype",languageType+"");
    //     if(!needUpdateSkin)
    //         return;
    //     self.onThemeLoadComplete();
    //     // NeoManager.getInstance().setLang(platform.PlatformLanguage);
    // }


    // private onThemeLoadComplete(){
    //     UIManager.getInstance().ReopenAllView();
    //     UIManager.getInstance().hideUI(LoadingRView);
        
    // }


    // public getCurLanguageCount():number{
    //     return this.curLCount;
    // }

    public getLabelLanguage(view:any):any{
        if(this.languagePackage_json==null){
            var configs:any = RES.getRes("languagePackage_json");
            this.languagePackage_json = configs;
        }
        var json:Object = this.languagePackage_json["language"];//this.languagePackage_json["language" + this.curLType];
        if(json==null)
            return;
        
        if(typeof view=="string"){
            if(json[view.toString()]==null){
                return null;
            }
            return json[view.toString()];
        }else{
            if(json[view.name]==null){
                // console.log("找不到View:" + view.name + " 的文本语言包!");
                return null;
            }
            return json[view.name];
        }
    }

    public setLanguagePackage(gameName:string){
        if(this.languagePackage_json==null){
            var configs:any = RES.getRes("languagePackage_json");
            this.languagePackage_json = configs;
        }
        if(gameName=="")
            return;
        var configsGame:any = RES.getRes("languagePackage-" + gameName + "_json");
        if(configsGame==null)
            return;
        
        for(var obj in configsGame){
            if(this.languagePackage_json.hasOwnProperty(obj)){
                var json = configsGame[obj];
                for(var skinName in json){
                    this.languagePackage_json[obj][skinName] = json[skinName];
                }
            }else{
                this.languagePackage_json[obj] = configsGame[obj];
            }
        }
    }

    public getCurLanguageType():number{
        return this.curLType;
    }
}