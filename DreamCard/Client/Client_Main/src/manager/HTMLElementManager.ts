// TypeScript file
class HTMLElementManager{
    private static m_manager:HTMLElementManager = new HTMLElementManager();
    public static getInstance():HTMLElementManager{
        return HTMLElementManager.m_manager;
    }

    private configs:Object = new Object();

    public startLoadJson(jsonStr:string,completeFunc:Function,target:any){
        if(this.hasJsonData(jsonStr)){
            completeFunc.call(target);
            return;
        }
        var resObj = RES.getRes(jsonStr);
        if(resObj==null){
            completeFunc.call(target);
            return;
        }
        var self =this;
        var obj:HTMLElementObj = new HTMLElementObj();
        obj.resObj = resObj["HTMLElementObj"];
        obj.completeFunc = completeFunc;
        obj.target = target;
        self.configs[jsonStr] = obj;
        this.addHTMLElement(obj);
    }

    private getHTMLElementObj(jsonStr:string):HTMLElementObj{
        return this.configs.hasOwnProperty(jsonStr)?this.configs[jsonStr]:null;
    }

    public hasJsonData(jsonStr:string){
        return this.configs.hasOwnProperty(jsonStr);
    }

    private addHTMLElement(obj:HTMLElementObj):void{
        var self =this;
        var linkArrSrc:Array<string> = [];
        var scriptArrSrc:Array<string> = [];
        var curModelStr:string = "PHONE";
        if(egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS"){
            curModelStr = "WIN";
        }

        var htmlElementObj:Object = obj.resObj;
        for(var o in htmlElementObj){
            var heObj:Object = htmlElementObj[o];
            if(heObj==null)
                continue;
            var model:string = heObj["model"];
            var modelArr:Array<string> = model.split(',');
            var canApply:boolean = false;
            for(var i:number = modelArr.length-1;i>=0;i--){
                if(modelArr[i]==curModelStr){
                    canApply = true;
                    break;
                }
            }
            if(!canApply)
                continue;

            var type:string = heObj["type"];
            var path:string = heObj["path"];
            if(type=="HTMLLink"){
                linkArrSrc.push(path);
            }else if(type=="HTMLScript"){
                scriptArrSrc.push(path);
            }
        }

        obj.loadCompleteCount = linkArrSrc.length + scriptArrSrc.length;

        for(var i:number=0,lengthI=linkArrSrc.length;i<lengthI;i++){
            var link:HTMLLinkElement = document.createElement("link");
            link.rel = "stylesheet";
            link.href = linkArrSrc[i];
            link.type = "text/css";
            link.addEventListener('load',function(){
                this.onLoadJSComplete(obj);
                link.removeEventListener('load', <any>arguments.callee, false);
            }.bind(this),false);
            document.body.appendChild(link);
        }

        for(var i:number=0,lengthI=scriptArrSrc.length;i<lengthI;i++){
            var script:HTMLScriptElement = document.createElement("script");
            script.src = scriptArrSrc[i];
            script.addEventListener('load',function(){
                this.onLoadJSComplete(obj);
                script.removeEventListener('load', <any>arguments.callee, false);
            }.bind(this),false);
            document.body.appendChild(script);
        }
    }
    
    private onLoadJSComplete(obj:HTMLElementObj):void{
        var self =this;
        obj.loadCompleteCount--;
        if(obj.loadCompleteCount<=0){
            obj.completeFunc.call(obj.target);
        }
    }
}

class HTMLElementObj{
    public resObj:any;
    public completeFunc:Function;
    public target:any;
    public loadCompleteCount:number;
}