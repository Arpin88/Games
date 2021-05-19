// TypeScript file

class BaseDecoder{
    //请重写该方法;
    public initDecoderFunction():void{
    }

    public removeDecoderFunction():void{
    }

    //注册命令;
    protected registerCmd(cmd:number,func:Function):void{
        var decode:BaseDecode = BaseDecode.getInstance();
        if(decode){
            decode.registerFunction(cmd,func);
        }
    }

    //取消注册命令;
    protected unRegisterFunction(cmd:number):void{
        var decode:BaseDecode = BaseDecode.getInstance();
        if(decode){
            decode.unRegisterFunction(cmd);
        }
    }

}