// TypeScript file
class BaseResolver implements IResolver{
    private m_protoMap:Object = new Object();
    //存放命令-proto的键值对
    private m_cmdToProtoMap: Object = new Object();
    //存放proto协议名-proto的键值对
    private m_classToProtoMap:Object = new Object();

    private m_packageData:any;
    private m_name:string;

    public constructor(name:string){
        this.m_name = name;
    }

    public name():string{
        return this.m_name;
    }

    public registerProto(protoName:string):void{
        if(this.m_name==ProtoBufResolver.NAME){
            var protoStr: string = RES.getRes(protoName);
            // this.m_protoMap[protoName] = dcodeIO.ProtoBuf.loadProto(protoStr);
        }
    }

    public registerCmdToProto(configs: Array<ProtoResolverConfig>):void{
        if(this.m_name == ProtoBufResolver.NAME){
            if(configs != null && configs!=undefined){
                var config :ProtoResolverConfig = null;
                for(var i:number = 0;i<configs.length;i++){
                    config = configs[i];
                    this.doCmdToProto(config);
                }
            }
        }
    }

    private doCmdToProto(config:ProtoResolverConfig):void{
        if(this.m_name ==ProtoBufResolver.NAME){
            if(config&&config.cmd!=undefined){
                var config:ProtoResolverConfig = this.m_cmdToProtoMap[config.cmd];
                if(!config){
                    this.m_classToProtoMap[config.cmd] = config;
                }
            }
        }
    }


    public registerClassNameToProto(className:string,protoName:string):void{
        if(this.m_name==ProtoBufResolver.NAME){
            if(className!=null && className!=undefined){
                var protoName2 :string = this.m_classToProtoMap[className];
                if(protoName2==null||protoName2==undefined){
                    this.m_classToProtoMap[className] = protoName;
                }
            }
        }
    }

    public cloneProtoResolverClassByCmd(cmd:number):any{
        var config:ProtoResolverConfig = this.m_cmdToProtoMap[cmd];
        return this.cloneProtoResolverClassByName(config.className);
    }

    public cloneProtoResolverClassByName(className:string):any{
        var clazzInstance:any = null;
        if(this.m_name==ProtoBufResolver.NAME){
            if(className!=null&&className!=undefined){
                var protoName2:string = this.m_classToProtoMap[className];
                if(protoName2!=null&&protoName2!=undefined){
                    var proto:string = RES.getRes(protoName2);
                    // var builder:any = decodeIO.ProtoBuf.loadProto(proto);
                    // var clazz = builder.build(className);
                    // clazzInstance = new clazz();
                }
            }
        }
        return clazzInstance;
    }

    public registerPackageData(pag:any):void{
        this.m_packageData = pag;
    }

    public getPackageData():any{
        return this.m_packageData;
    }

    public parse(cmd:number,data:any,m:boolean = false):any{

    }

    public decode(data:any):void{
        
    }
}