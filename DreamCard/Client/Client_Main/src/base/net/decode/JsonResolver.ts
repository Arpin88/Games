// TypeScript file
class JsonResolver extends BaseResolver{
    public static NAME:string = "JSON_RESOLVER";

    public constructor(name:string){
        super(name);
    }

    public decode(data:any):void{
        var msg:string[] = data.split("@~m@");
        var obj = null;
        if(msg[0]=="1"){
            var res = new newaes();
            obj = res.dx(msg[1],GameConfig.key,GameConfig.vi);
        }else{
            obj = msg[1];
        }

        if(obj==null){
            return;
        }

        obj = JSON.parse(obj);
        BaseDecode.getInstance().decode(obj["cmd"],obj["data"]);
    }

    public parse(cmd:number,trd:number,data:any,m:boolean = false):any{
        var jsonObj:Object = new Object();
        jsonObj["cmd"] = cmd;
        jsonObj["t"] = GameConfig.ticket;
        jsonObj["trd"] = trd;
        jsonObj["data"] = data;
        var str:string = JSON.stringify(jsonObj);
        if(m){
            var res = new newaes();
            str = res.ex(str,GameConfig.key,GameConfig.vi);
            str = "1@~m@".concat(str);
        }else{
            str = "0@~m@".concat(str);
        }
        return str;
    }
}