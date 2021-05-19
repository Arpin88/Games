// TypeScript file

class ProtoPackageData{
    private m_cmd:number = 0;
    private m_headLen:number = 8;
    private m_len:number = 0;
    private m_curPostion:number = 0;
    private m_dataArray:egret.ByteArray = new egret.ByteArray();
    private m_data:any = null;

    public clear():void{
        this.m_cmd = 0;
        this.m_len = 0;
        this.m_curPostion = 0;
        this.m_dataArray.clear();
        this.m_data = null;
    }

    public getCurPostion():number{
        return this.m_curPostion;
    }

    public setCurPostion(curPostion:number):void{
        this.m_curPostion = curPostion;
    }

    public getCmd():number{
        return this.m_cmd;
    }

    public setCmd(cmd:number):void{
        this.m_cmd = cmd;
    }

    public getHeadLen():number{
        return this.m_headLen;
    }

    public setHeadLen(headLen:number){
        this.m_headLen = headLen;
    }

    public getLen():number{
        return this.m_len;
    }

    public setLen(len:number):void{
        this.m_len = len;
    }

    public getDataArray():egret.ByteArray{
        return this.m_dataArray;
    }

    public getData():any{
        return this.m_data;
    }

    public setData(data:any){
        this.m_data = data;
    }
}