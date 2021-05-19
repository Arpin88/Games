// TypeScript file
class TextPackageData{
    private m_cmd:number;
    private m_data:any;

    public clear():void{
        this.m_cmd = 0;
        this.m_data = null;
    }

    public getCmd():number{
        return this.m_cmd;
    }

    public setCmd(cmd:number):void{
        this.m_cmd = cmd;
    }

    public getData():number{
        return this.m_data;
    }

    public setData(data:number):void{
        this.m_data = data;
    }
}