// TypeScript file

class CombatDecoder extends BaseDecoder{

    // //方法前缀 
    // public funcPrefix:string = "method_";

    //请重写该方法;
    public initDecoderFunction():void{
        let self = this;
        for(var key in CombatCmdDef){
            var keyToAny:any = key;
            if(isNaN(keyToAny)){
                var anyType:any = CombatCmdDef[key];
                var cEnum:CombatCmdDef = anyType;
                var func:Function = self.method_Combat;//self[self.funcPrefix+cEnum];
                if(func){
                    self.registerCmd(cEnum,func);
                }
            }
        }
    }

    public removeDecoderFunction():void{
        let self = this;
        for(var key in CombatCmdDef){
            var keyToAny:any = key;
            if(isNaN(keyToAny)){
                var anyType:any = CombatCmdDef[key];
                var cEnum:CombatCmdDef = anyType;
                var func:Function = self.method_Combat;//self[self.funcPrefix+cEnum];
                if(func){
                    self.unRegisterFunction(cEnum);
                }
            }
        }
    }

    private method_Combat(data: any, cmd:CombatCmdDef):void {
        let cmbatView: CombatView = <CombatView>UIManager.getInstance().getViewByName(CombatView);
        if(cmbatView != null){
            cmbatView.recvData(cmd,data.msg);
        }
    }

}