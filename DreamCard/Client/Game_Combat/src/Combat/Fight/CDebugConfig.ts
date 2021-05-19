// TypeScript file
class CDebugConfig{
    private static m_manager:CDebugConfig;
    public static getInstance():CDebugConfig{
        var self = this;
        if(self.m_manager==null){
            self.m_manager = new CDebugConfig();
            self.m_manager.initConfig();
        }
        return self.m_manager;
    }

    private configs:any;

    private initConfig():void{
        var self = this;

        var configs:any = RES.getRes("debugConfig_json");
        self.configs = configs;
    }

    private combatParser:CombatParser;

    public getCombatParser(view:CombatView):CombatParser{
        var self = this;

        var atkHandCard:Object = self.configs["Atkc_Hand"];
        var atkOutCard:Object = self.configs["Atkc_Out"];
        var atkDeathCard:Object = self.configs["Atkc_Death"];
        var dfdHandCard:Object = self.configs["Dfdc_Hand"];
        var dfdOutCard:Object = self.configs["Dfdc_Out"];
        var dfdDeathCard:Object = self.configs["Dfdc_Death"];

        var playerId:number = self.configs["Player_Id"];
        playerId = null?0:playerId;

        var contextData:any = {view:view,playerId:playerId,
            atkHandCard:atkHandCard,atkOutCard:atkOutCard,atkDeathCard:atkDeathCard,
            dfdHandCard:dfdHandCard,dfdOutCard:dfdOutCard,dfdDeathCard:dfdDeathCard}
        var combatParser:CombatParser = new CombatParser(contextData);
        self.combatParser = combatParser;
        return combatParser;
    }

    public onPlayCombatSerial(type:number):void{
        var self = this;
        var combatSerial:CombatSerial = new CombatSerial(self.combatParser);
        var str:string = "Click_"+type+"_Play_Key";
        var keyStr:string = self.configs[str];
        if(keyStr==null)
            return;
        var combatSerialArr:Object = self.configs["Combat_Serial"];
        if(combatSerialArr==null)
            return;
        var combatSerialObj:Object = combatSerialArr[keyStr];
        if(combatSerialObj==null)
            return;

        for(var key in combatSerialObj){
            var item:Object = combatSerialObj[key];
            if(item==null)
                continue;
            
            var combatNode:CombatNode = CombatUtils.getConfig(item,CombatNode);
            combatSerial.addNode(combatNode);
        }
        combatSerial.startPlay();
    }
}
