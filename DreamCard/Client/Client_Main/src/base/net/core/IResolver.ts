// TypeScript file
interface IResolver{
    name(): string;
    //用来注册proto
    registerProto(protoName:string):void;
    //用来注册cmd和对应的proto,协议的类的关系
    registerCmdToProto(configs: Array<ProtoResolverConfig>):void;
    //注册协议类和proto的关系
    registerClassNameToProto(className:string,protoName:string):void;

    cloneProtoResolverClassByCmd(cmd:number):any;
    cloneProtoResolverClassByName(className:string):any;

    registerPackageData(pag:any): void;
    getPackageData():any;

    parse(cmd:number,trd:number,data:any,m:boolean): any;
    decode(data:any):void;
}