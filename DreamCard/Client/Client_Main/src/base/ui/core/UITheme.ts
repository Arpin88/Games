// TypeScript file
eui.Component.prototype.$parseSkinName = function(){
    var skinName = this.skinName;
    var skin;
    if(skinName){
        if(skinName.prototype){
            skin = new skinName();
        }else if(typeof(skinName)=="string"){
            var clazz = UITheme.getTheme(skinName);
            skin = new clazz();
        }else{
            skin = skinName;
        }
    }
    this.setSkin(skin);
};

module UITheme{
    
    export var allSkin;
    let _skinMap:Object = {};
    let _skinConfs:Object = {};
    let _initFin:Function;
    let _initTar:any;

    export function loadConf(configURL:string,initFin?:Function,initTar?:any):void{
        if(window["allSkins"]){
            _skinMap = window["allSkins"];
            if(initFin)
                initFin.call(initTar);
            return;
        }
        var self = this;
        _initFin = initFin;
        _initTar = initTar;
        RES.getResByUrl(configURL,onConfigLoaded,self,RES.ResourceItem.TYPE_JSON);
    }

    function addSkinConf(data:any):void{
        var skinConfs = _skinConfs;
        if(skinConfs){
            for(var key in data){
                var addConfs = data[key];
                var conf = skinConfs[key];
                if(conf){
                    for(var subkey in addConfs){
                        conf[subkey] = addConfs[subkey];
                    }
                }else{
                    skinConfs[key] = addConfs;
                }
            }
        }else{
            _skinConfs = data;
        }
    }

    export function getTheme(name:string):any{
        var cls = _skinMap[name];
        if(cls)
            return cls;
        cls = parseSkin(_skinConfs,name);
        return cls;
    }

    export function hasTheme(name:string):boolean{
        var cls = _skinMap[name];
        if(cls)
            return true;
        if(_skinConfs[name]){
            return true;
        }
        return false;
    }

    function getSkinNames(skinName:string):{first:string,secound:string}{
        var startIdx = skinName.indexOf(".")+1;
        var dotIdx = skinName.indexOf(".",startIdx);
        return {first:skinName.substring(startIdx,dotIdx),secound:skinName.substring(dotIdx+1)};
    }

    function onConfigLoaded(data:any,url:string):void{
        if(DEBUG){
            if(!data){
                egret.$error(3000);
            }
        }
        addSkinConf(data);
        RES.destroyRes(url);
        if(_initFin){
            _initFin.call(_initTar);
            _initFin = null;
            _initFin = null;
        }
    }

    function parseSkin(parseSkins,name:string):any{
        var skinData = parseSkins[name];
        if(!skinData)
            return null;
        
        delete parseSkins[name];
        skinData = skinData.replace(/#!/g,"this.");
        skinData = skinData.replace(/#b/g,"function(");
        var cls = parse(skinData);
        _skinMap[name] = cls;
        return cls;
    }

    function parse(code:string):void{
        try{
            var clazz = eval(code);
            code = null;
        }catch(e){
            if(DEBUG){
                egret.log(e);
            }
            return null;
        }
        return clazz;
    }
}