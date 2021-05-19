// TypeScript file
/*回调操作类
*1.由于貌似反射无法反射方法,所有只有两种解决方案,通过事件,让程序员直接自己注册方法,目前选择后者.
*2.目前设置cmd=300以内为json格式,300-500以上为protobuf.
*
*/
class BaseDecode{
    private static m_decode:BaseDecode = new BaseDecode();
    public static getInstance():BaseDecode{
        return BaseDecode.m_decode;
    }

    private m_decoderMap:Object = new Object();
    public registerFunction(cmd:number,func:Function):void{
        this.m_decoderMap[cmd] = func;
    }

    public unRegisterFunction(cmd:number):void{
        this.m_decoderMap[cmd] = null;
    }

    public registerDecoder(decoder:BaseDecoder):void{
        decoder.initDecoderFunction();
    }

    public removeDecoder(decoder:BaseDecoder):void{
        decoder.removeDecoderFunction();
    }

    public getFunction(cmd:number):Function{
        var func2:Function = this.m_decoderMap[cmd];
        return func2;
    }

    public decode(cmd:number,data:any):void{
        //回调,目前不考虑用列表了
        var func:Function = this.getFunction(cmd);
        if(func){
            func(data,cmd);
        }
    }
}