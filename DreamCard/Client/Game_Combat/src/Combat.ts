
// export interface IGameModule{
//         init( callback:()=>void ):void;
//         dispose():void;
//     }

module Combat{
    var _gameShowCB:Function;
    export function getResConf():Object{
        return {};
    }

    //游戏初始化
    export function init( data:any, finCallBack:(delayMs?:number)=>void ):void{
        LanguageManager.getInstance().setLanguagePackage("Combat");
        UIManager.getInstance().registerViewNameByGkid(0,CombatView,"战斗场景");
        _gameShowCB = finCallBack;
        regCmdHandler();
        //初始化战斗配置;
        CombatConfig.getInstance();
        // CDebugConfig.getInstance();
        showUI( data );
    }

    //在游戏主界面类中加入 上面代码
    export function onGameShow():void{
        if( _gameShowCB != null ){
            _gameShowCB();
            _gameShowCB = null;
        }
    }

    export function dispose():void{
        hideUI();
        unRegCmdHandler();
    }

    //------------------------------------- ui -------------------------------------
    function showUI( data:any ):void{
         UIManager.getInstance().showUI(CombatView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
    }

    function hideUI():void{
        UIManager.getInstance().hideUI(CombatView);
        UIManager.getInstance().hideUI(SettlementView);
    }


    //------------------------------------- 消息处理 start -------------------------------------
    var combatDecoder:CombatDecoder;
    
    function regCmdHandler(){
        if(!combatDecoder)
            combatDecoder = new CombatDecoder();
        var decode:BaseDecode = BaseDecode.getInstance();
        decode.registerDecoder(combatDecoder);
    }

    function unRegCmdHandler(){
        var decode = BaseDecode.getInstance();
        if(decode){
            decode.removeDecoder(combatDecoder);
        }
    }


    //------------------------------------- 消息处理 end -------------------------------------
}