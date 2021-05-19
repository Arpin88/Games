
// export interface IGameModule{
//         init( callback:()=>void ):void;
//         dispose():void;
//     }

module Hall{
    var _gameShowCB:Function;
    export function getResConf():Object{
        return {};
    }

    //游戏初始化
    export function init( data:any, finCallBack:(delayMs?:number)=>void ):void{
        LanguageManager.getInstance().setLanguagePackage("Hall");
        UIManager.getInstance().registerViewNameByGkid(1,HallView,"大厅");
        if(data.hasOwnProperty("playBGM")&&data.playBGM){
            SoundManager.getInstance().PlayBgm("datingBGM_mp3");
            // SoundManager.getInstance().setBGMVolume(0.7);
        }
        _gameShowCB = finCallBack;
        regCmdHandler();
        showUI( data );
        HTMLElementManager.getInstance().startLoadJson("uisConfig_json",function(){},this);
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
         UIManager.getInstance().showUI(HallView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
    }

    function hideUI():void{
        UIManager.getInstance().hideUI(HallView);
    }


    //------------------------------------- 消息处理 start -------------------------------------

    var hallDecoder:HallDecoder;

    function regCmdHandler(){
        if(!hallDecoder)
            hallDecoder = new HallDecoder();
        var decode:BaseDecode = BaseDecode.getInstance();
        decode.registerDecoder(hallDecoder);
    }

    function unRegCmdHandler(){
        var decode:BaseDecode = BaseDecode.getInstance();
        decode.removeDecoder(hallDecoder);
    }

    //------------------------------------- 消息处理 end -------------------------------------
}