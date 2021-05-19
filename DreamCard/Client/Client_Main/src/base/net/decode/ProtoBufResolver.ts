// TypeScript file
class ProtoBufResolver extends BaseResolver{
    public static NAME:string = "PROTO_RESOLVER";
    public constructor(name:string){
        super(name);
    }

    public decode(data:any):void{
        var bytes:egret.ByteArray = data;
        var pag:ProtoPackageData = this.getPackageData();
        var allBytes:egret.ByteArray = pag.getDataArray();

        allBytes.position = 0;
        allBytes.writeBytes(bytes,0,bytes.length);
        if(pag.getCurPostion()==0){
            if(pag.getDataArray().length>=pag.getHeadLen()){
                allBytes.position = 0;
                pag.setCmd(allBytes.readInt());
                pag.setLen(allBytes.readInt());
                pag.setCurPostion(pag.getHeadLen()-1);
                allBytes.position = allBytes.length-1;
            }
        }else if(pag.getCurPostion()==(pag.getHeadLen()-1)){
            var allLen:number = pag.getLen()+pag.getHeadLen();
            if(pag.getDataArray().length>=allLen){
                allBytes.position = pag.getHeadLen()-1;
                var dataBytes:egret.ByteArray = new egret.ByteArray();
                dataBytes.writeBytes(allBytes,allBytes.position,pag.getLen());
                var protoClass = this.cloneProtoResolverClassByCmd(pag.getCmd());
                var msg:ArrayBuffer = dataBytes.dataView.buffer;
                pag.setData(protoClass.decode(msg));

                dataBytes.clear();

                if(pag.getDataArray().length>allLen){
                    dataBytes.writeBytes(allBytes,allLen-1,pag.getDataArray().length-allLen);
                    dataBytes.position = 0;
                    BaseDecode.getInstance().decode(pag.getCmd(),pag.getData());
                    pag.clear();
                    allBytes.writeBytes(dataBytes,0,dataBytes.length);
                } else if(pag.getDataArray().length==allLen){

                    BaseDecode.getInstance().decode(pag.getCmd(),pag.getData());
                    pag.clear();
                }
            }
        }
    }

    public parse(cmd:number,data:any):any{
        var arraybuffer:ArrayBuffer = data.toArrayBuffer();
        var len:number = arraybuffer.byteLength;
        var dataArray:egret.ByteArray = new egret.ByteArray(arraybuffer);
        var byteArray:egret.ByteArray = new egret.ByteArray();
        byteArray.writeInt(cmd);
        byteArray.writeInt(len);
        byteArray.writeBytes(dataArray,0,len);
        return byteArray;
    }
}