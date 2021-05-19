// TypeScript file
class WebVerController implements RES.IVersionController{
    
    private _allVers:Object;
    private _callback:{
        onSuccess:(data:any)=>any;
        onFail:(error:number,data:any)=>any;
    };

    public fetchVersion(callback:{
        onSuccess:(data:any)=>any;
        onFail:(error:number,data:any)=>any;
    }):void{
        var self = this;
        if(self._allVers){
            if(callback!=null)
                callback.onSuccess(null);
            return;
        }

        self._callback = callback;
        var request:egret.HttpRequest = new egret.HttpRequest();
        request.addEventListener(egret.Event.COMPLETE,self.onLoadFinish,self);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,self.onLoadFinish,self);

        request.responseType = egret.HttpResponseType.TEXT;
        // request.open(Main.url + "webver.json?v=" + Main.ver);
        let pathRes:string = Main.res +  LanguageManager.getInstance().getLanguagePath() +"/";
        request.open(Main.url+ pathRes + "webver.json?v=" + Main.ver);
        request.send();
    }

    private onLoadFinish(event:egret.Event):void{
        var self = this;
        var loadSucess = false;
        if(event.type==egret.Event.COMPLETE){
            try{
                var request:egret.HttpRequest = <egret.HttpRequest>(event.target);
                self._allVers = JSON.parse(request.response);
                loadSucess = true;
            }catch(e){
                egret.log("version parse fail");
            }
        }else {
            egret.log("version load fail");
        }

        if(loadSucess){
            self._callback.onSuccess(null);
        }else{
            self._callback.onFail(1,null);
        }
        self._callback = null;
    }

    public addWebVer(addVers:Object):void{
        var allVers = this._allVers;
        for(let postfix in allVers){
            var vers = allVers[postfix];
            var addList = addVers[postfix];
            if(vers){
                for(let pathName in addList){
                    vers[pathName] = addList[pathName];
                }
            }else{
                allVers[postfix] = addList;
            }
        }
    }

    //获取所有有变化的文件
    public getChangeList():Array<{url:string;size:number}>{
        return[];
    }

    public getVirtualUrl(url:string):string{
        var idx = url.lastIndexOf(".");
        var postfix = url.substring(idx + 1);

        var verStr:string;
        var typeVerMap = this._allVers[postfix];
        if(typeVerMap){
            if(typeof typeVerMap =="number"){
                verStr = String(typeVerMap);
            }else{
                var pathStr = url.substring(0,idx);
                verStr = typeVerMap[pathStr];
            }
        }
        url = Main.url + url;
        if(!verStr)
            verStr = Main.defVer;
        if(verStr)
            url+="?v="+verStr;
        
        return url;
    }
    
    public init(): Promise<any>{
        return null;
    }
}