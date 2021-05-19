/**
 *
 * @author lxq
 *  用于动画管理的类
 *
 */
class MCManager {
    
    private static _manager: MCManager = new MCManager();
    public static getInstance(): MCManager {
        return MCManager._manager;
    }


    //用于存放MovieClipDataFactory 
    private _mcFactorys: Object = new Object();
    //-------------------------------------------------------------------------------------------
    private _loadings:any = {}; //key->[{fun,tar,mcName}]
    public getMCDataAsync( jsName:string, mcName:string, callback:(mcData:egret.MovieClipData,jsName:string, mcName:string)=>void, tar:any ) : void{
        let self = this;
        var mcFactory:egret.MovieClipDataFactory = self._mcFactorys[jsName];
        if( mcFactory ){
            let mcData = mcFactory.generateMovieClipData(mcName);
            egret.setTimeout( callback, tar, 0, mcData, jsName, mcName );
            return;
        }

        let loadData = {fun:callback,tar:tar,mc:mcName};
        let loadInfo = self._loadings[jsName];
        if( loadInfo ){
            loadInfo.datas.push( loadData );
            return;
        }

        self._loadings[jsName] = {datas:[loadData],js:null,img:null};


        RES.getResAsync(jsName + "_json", self.onGetMCResFin, self );
        RES.getResAsync(jsName + "_png",  self.onGetMCResFin, self );
    }

    private onGetMCResFin( data:any, source:string ):void{
        let index = source.lastIndexOf( "_" );
        let name = source.substr( 0, index );
        let loadings = this._loadings; 
        let loadInfo = loadings[name]; 
        if( loadInfo ){
            if( data ){
                if( source.substr( index+1 ) == "json" ) {
                    loadInfo.js = data;
                    RES.destroyRes( source );
                }
                else{
                    loadInfo.img = data;
                }

                if( loadInfo.js && loadInfo.img ){
                    var mcFactory = new egret.MovieClipDataFactory(loadInfo.js,loadInfo.img);
                    this._mcFactorys[name] = mcFactory;

                    let loadDatas = loadInfo.datas;
                    for( let i=0, len=loadDatas.length; i<len; ++i ){
                        let loadData = loadDatas[i];
                        let mcData = mcFactory.generateMovieClipData(loadData.mc);
                        loadData.fun.call( loadData.tar, mcData, name, loadData.mc );
                    }

                    delete loadings[name];
                }
            }
            else{
                delete loadings[name];
            }
        }
    }

    //-------------------------------------------------------------------------------------------
    //注册生成MovieClipDataFactory
    // public registerMovieClipDataFactory(jsonName:string,jsonPath:string,txtrPath:string) : void
    // {
    //     if(jsonName == null || jsonPath == null || txtrPath == null)
    //     {
    //         console.log("json或者图片路径为空");
    //         return;
    //     }
    //     var data = RES.getRes(jsonPath);
    //     var txtr = RES.getRes(txtrPath);
    //     if(data == null || txtr == null)
    //     {
    //         console.log("data或者txtr为空");
    //         return;
    //     }
    //     var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
    //     this._mcFactorys[jsonName] = mcFactory;
    // }
    
    public registerMovieClipDataFactoryAuto(name:string) : void
    {
        if(name == null || name == "")
        {
            egret.log("json或者图片路径为空");
            return;
        }
        var json = RES.getRes(name + "_json");
        var data = RES.getRes(name + "_png");
        if(json == null || data == null)
        {
            egret.log("data或者txtr为空");
            return;
        }
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,data);
        this._mcFactorys[name] = mcFactory;
    }
    
    //获取MovieClip
    public getMovieClipByName(jsonName:string,mcName:string) : egret.MovieClip
    {
        if(jsonName == null || mcName == null)
        {
            egret.log("jsonName或者mcName不能为空");
            return null;
        }
        var mcFactory: egret.MovieClipDataFactory = this._mcFactorys[jsonName] as egret.MovieClipDataFactory;

        if(mcFactory == null) {
            this.registerMovieClipDataFactoryAuto(jsonName);
            mcFactory = this._mcFactorys[jsonName] as egret.MovieClipDataFactory;
        }

        if(mcFactory != null)
        {
            var movieClipData:egret.MovieClipData = mcFactory.generateMovieClipData(mcName);
            if(movieClipData == null)
            {
                egret.log("mcName没找到");
                return null;
            }
            var mc: egret.MovieClip = new egret.MovieClip(movieClipData);
            if(mc != null)
                return mc;
                
        }
        return null;
    }
    
    //获取当前movieclip的总帧数
    public getMovieClipNumFramesByName(jsonName: string,mcName: string) : number
    {
        if(jsonName == null || mcName == null) 
        {
            egret.log("jsonName或者mcName不能为空");
            return null;
        }
        var mcFactory: egret.MovieClipDataFactory = this._mcFactorys[jsonName] as egret.MovieClipDataFactory;
        if(mcFactory != null)
        {
            var movieClipData: egret.MovieClipData = mcFactory.generateMovieClipData(mcName);
            if(movieClipData != null) 
            {
                return movieClipData.numFrames;
            }
        }
        return 0;
    }
}
