// TypeScript file
//游戏模块管理;
module GMDManager{
    const enum LoadStep{
        none = 0,
        loadScriptStart = 1,
        loadScriptEnd = 2,
        loadThemeStart = 3,
        loadThemeEnd = 4,
        loadResStart = 5,
        loadResEnd = 6,
        loadAttResStart = 7,
        loadAttResEnd = 8,
        loaded = 9,
        end = 10,
    }

    export interface IGameModule{
        init(data:any,fincallBack:(delayMS?:number)=>void):void;
        dispose():void;
    }

    interface GMDInfo{
        id:number;
        name:string;
        src:string;
        gm:IGameModule;
        ori:string;
        data:Object;
        theme:boolean;
        resConf:boolean;
        verLoad:boolean;
        resVer:string;
        attRes:any;
    }

    interface AttGroupRes{
        gName:string;
        arr2Res:Array<string>;
    }

    interface LoadInfo{
        info:GMDInfo;
        st:LoadStep;
    }

    
    //key:string/info:GMDInfo;
    let _modInfos = {};

    //同时只能一个GMD在使用;
    let _curGMD:GMDInfo = null;
    let _oldGMD:GMDInfo = null;
    let _loadSt:LoadStep = 0;
    let _loadProgress:IGMDLoadProgress; 
    let _loadGps:Array<string>;
    let _loadCnt = 0;


    export function addGMDInfo(gid:number,name:string,ori:number,jsVer?:string,resVer?:string,path?:string,attRes?:any):void{
        var modInfo = _modInfos[gid];
        if(!modInfo){
            var src;
            if(path){
                src = path + "/" + name + ".js";
            }else{
                src = name + ".js";
            }

            if(jsVer){
                src +="?v=" + jsVer;
            }
            var oriMode:string;
            switch(ori){
                case 1:
                oriMode = egret.OrientationMode.PORTRAIT;
                break;
                case 2:
                oriMode = egret.OrientationMode.LANDSCAPE;
                break;
                case 3:
                oriMode = egret.OrientationMode.LANDSCAPE_FLIPPED;
                break;
            default:
                oriMode = egret.OrientationMode.AUTO;
                break;
            }

            var objAttRes = null;
            if(attRes!=null){
                objAttRes = (typeof attRes=='string'&&attRes!="")?JSON.parse(attRes):attRes;
            }
            _modInfos[gid] = {gid:gid,name:name,src:src,ori:oriMode,resVer:resVer,gm:null,attRes:objAttRes};
        }
    }

    export function getCurGMD():IGameModule{
        return _curGMD?_curGMD.gm:null;
    }

    export function startGMD(gid:number,data?:Object):void{
        if(_curGMD){
            if(DEBUG){
                egret.log("还有模块没结束");
            }
            return;
        }

        var modInfo = _modInfos[gid];
        if(!modInfo){
            egret.error("modinfo no find, check server table js");
        }
        modInfo.gm = window[modInfo.name];
        modInfo.data = data;

        _curGMD = modInfo;
        if(_oldGMD){
            _oldGMD = null;
        }

        if(data.hasOwnProperty("gdir")){
            let gdir = data["gdir"];
            if(gdir ==0){
                modInfo.ori = egret.OrientationMode.LANDSCAPE_FLIPPED;
            }else if(gdir ==1){
                modInfo.ori = egret.OrientationMode.AUTO;
            }else if(gdir==2){
                modInfo.ori = egret.OrientationMode.LANDSCAPE;
            }else if(gdir==3){
                modInfo.ori = egret.OrientationMode.LANDSCAPE_FLIPPED;
            }
        }

        _loadProgress = UIManager.getInstance().showLoading(modInfo.ori,null);
        _loadProgress.setStepInfo({spt:10,thm:30,res:40,ares:20},loadGMDFined,self);
        _loadSt = LoadStep.none;

        if(modInfo.gm){
            _loadSt = LoadStep.loadScriptEnd;
            _loadProgress.finStep("spt");
        }
        if(modInfo.theme&&modInfo.resConf){
            _loadSt = LoadStep.loadThemeEnd;
            _loadProgress.finStep("thm");
        }

        loadGMDImpl();
    }

    export function closeGMD():void{
        if(_curGMD){
            _curGMD.gm.dispose();

            _oldGMD = _curGMD;
            _curGMD = null;
        }

        GlobalDataManager.getInstance().setStatus(0);
        SoundManager.getInstance().CloseBgm();
    }

    //load__

    function loadGMDImpl():void{
        switch(_loadSt){
            case LoadStep.none:
            startLoadGMDScript();
            break;
            case LoadStep.loadScriptEnd:
            _loadProgress.finStep("spt");
            startLoadGMDTheme();
            break;
            case LoadStep.loadThemeEnd:
            _loadProgress.finStep("thm");
            startLoadGMDRes();
            break;
            case LoadStep.loadResEnd:
            _loadProgress.finStep("res");
            startLoadGMDAttRes();
            break;
            case LoadStep.loadAttResEnd:
            _loadSt = LoadStep.loaded;
            _loadProgress.finAllStep();
            break;
        }
    }

    function startLoadGMDScript():void{
        _loadSt = LoadStep.loadScriptStart;
        var s = document.createElement('script');
        s.async = false;
        s.src = _curGMD.src;
        var gid = _curGMD.id;
        s.addEventListener('load',function(){
            s.parentNode.removeChild(s);
            s.removeEventListener('load',<any>arguments.callee,false);

            if(_curGMD&&_curGMD.id==gid){
                _loadSt = LoadStep.loadScriptEnd;
                var gm = window[_curGMD.name];
                if(!gm){
                    egret.error("GMD object not find name = " + _curGMD.name);
                }
                _curGMD.gm = gm;
                _loadSt = LoadStep.loadScriptEnd;
                loadGMDImpl();
            }
        },false);

        document.body.appendChild(s);
    }

    function startLoadGMDTheme():void{
        _loadSt = LoadStep.loadThemeStart;

        let gid = _curGMD.id;
        let path = Main.gRes + _curGMD.name+ LanguageManager.getInstance().getLanguagePath() +"/";
        let resUrl:string;
        if(!_curGMD.resConf){
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,function(){
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,<any>arguments.callee,GMDManager);
                if(_curGMD&&_curGMD.id ==gid){
                    _curGMD.resConf = true;
                    loadThemeFin();
                }
            },GMDManager);

            resUrl = path + "default.res.json";
            if(_curGMD.resVer){
                resUrl +="?v=" + _curGMD.resVer;
            }
            RES.loadConfig(resUrl,path);
        }

        if(!_curGMD.theme){
            resUrl = path+"theme.json";
            if(_curGMD.resVer){
                resUrl += "?v="+_curGMD.resVer;
            }
            UITheme.loadConf(resUrl,function(){
                if(_curGMD&&_curGMD.id==gid){
                    _curGMD.theme = true;
                    loadThemeFin();
                }
            }, GMDManager);
        }

        if(!_curGMD.verLoad){
            resUrl = path+"webver.json";
            if(_curGMD.resVer){
                resUrl += "?v=" + _curGMD.resVer;
            }
            RES.getResByUrl(resUrl,function(data:any,source:string){
                if(_curGMD&& _curGMD.id==gid){
                    if(data){
                        (<WebVerController>RES.getVersionController()).addWebVer(data);
                        RES.destroyRes(source);
                    }
                    _curGMD.verLoad = true;
                    loadThemeFin();
                }
            },GMDManager,RES.ResourceItem.TYPE_JSON);
        }
    }

    function loadThemeFin():void{
        if(_curGMD.resConf&&_curGMD.theme&&_curGMD.verLoad){
            _loadSt = LoadStep.loadThemeEnd;
            loadGMDImpl();
        }
    }

    function startLoadGMDRes():void{
        _loadSt = LoadStep.loadResStart;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,onResLoadFin,GMDManager);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,onResLoadFin,GMDManager);
        RES.loadGroup(_curGMD.name);
    }

    function onResLoadFin(event:RES.ResourceEvent):void{
        if(_curGMD&&event.groupName==_curGMD.name){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,onResLoadFin,GMDManager);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,onResLoadFin,GMDManager);
            _loadSt = LoadStep.loadResEnd;
            loadGMDImpl();
        }
    }

    function startLoadGMDAttRes():void{
        if(_curGMD){
            if(!_curGMD.attRes){
                _loadSt = LoadStep.loadAttResEnd;
                loadGMDImpl();
            }else{
                _loadSt = LoadStep.loadAttResStart;
                if(RES.createGroup(_curGMD.attRes.gName, _curGMD.attRes.arr2Res,true)){
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,onAttResLoadFin,GMDManager);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,onAttResLoadFin,GMDManager);
                    RES.loadGroup(_curGMD.attRes.gName);
                }else{
                    _loadSt = LoadStep.loadAttResEnd;
                    loadGMDImpl();
                }
            }
        }
    }

    function onAttResLoadFin(event:RES.ResourceEvent):void{
        if(_curGMD&&_curGMD.attRes&&event.groupName==_curGMD.attRes.gName){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,onAttResLoadFin,GMDManager);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,onAttResLoadFin,GMDManager);
            _loadSt = LoadStep.loadAttResEnd;
            loadGMDImpl();
        }
    }

    function loadGMDFined():void{
        let data:any = _curGMD.data;
        var param;
        if(data!=null){
            var dt = data.dt;
            param = data.param;
            if(dt){
                if(dt==1){
                
                }else if(dt==2){
                    
                }else{

                }
            }
        }
        // _curGMD.gm.init(data?data.param:null,gmdInitFin);
        _curGMD.gm.init(param,gmdInitFin);
        GlobalDataManager.getInstance().setStatus(1);
    }

    function gmdInitFin(delMS?:number):void{
        delMS = delMS||1000;
        if(delMS>0){
            egret.setTimeout(closeLoadUI,GMDManager,delMS);
        }else{
            closeLoadUI();
        }
    }

    function closeLoadUI():void{
        _loadSt = LoadStep.end;
        _loadProgress = null;
        UIManager.getInstance().hideLoading();
    }


}