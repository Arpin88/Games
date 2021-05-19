
// export interface IGameModule{
//         init( callback:()=>void ):void;
//         dispose():void;
//     }

module xxx{
    var _gameShowCB:Function;
    export function getResConf():Object{
        return {};
    }

    //游戏初始化
    export function init( data:any, finCallBack:(delayMs?:number)=>void ):void{
        //UIManager.getInstance().registerViewNameByGkid(Gkid.ChaoDiPi, ChaoDiPiView.NAME, "炒地皮");
        _gameShowCB = finCallBack;

        regCmdHandler();

        showUI( data );
    }


    // public $onAddToStage(stage:egret.Stage, nestLevel: number):void{
    //     super.$onAddToStage( stage, nestLevel );

    //     ChaoDipi.onGameShow();
    // }
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
        //  UIManager.getInstance().showUI(ChaoDiPiView.NAME, null, GameScene.VIEW_LAYER_NUMBER, false, 0, 0, 0, false,data);

        // var bv:BaseView = UIManager.getInstance().curGameView = UIManager.getInstance().getViewByName(ChaoDiPiView.NAME);
        // GameViewCF.SetGameFunction(bv);
        // switch(data.gk_id){
        //     case Gkid.NiuNiu:
        //         //GameViewCF.SetGameViewFun(bv, NiuniuDef.GAME_PLAYER, data);
        //         break;
        //     case Gkid.DouDiZhu:
        //         GameViewCF.SetGameViewFun(bv, 3, data);
        //         break;
        // }
    }

    function hideUI():void{
        // UIManager.getInstance().hiden(ChaoDiPiView.NAME);
        // //UIManager.getInstance().hiden(BaiRenCommonUiView.NAME);
        // // UIManager.getInstance().showUIWithHide(HallHomePageView.NAME, null,
        // //     GameScene.VIEW_LAYER_NUMBER, false, HeadShowWay.Head,BottomShowWay.Bottom);

        // // UIManager.getInstance().addBackViewList(HallHomePageView.NAME, null,
        // //     false, HeadShowWay.Head, BottomShowWay.Bottom);

        // UIManager.getInstance().hiden(SetUpView.NAME);
        // UIManager.getInstance().hiden(ZongHeView.NAME);
        // UIManager.getInstance().hiden(OwnerReviewView.NAME);
        // UIManager.getInstance().hiden(OwnerFunctionView.NAME);
        // UIManager.getInstance().hiden(PauseGameView.NAME);
        // UIManager.getInstance().hiden(KickPlayerView.NAME);
        // UIManager.getInstance().hiden(PromptBoxView.NAME);
    }


    //------------------------------------- 消息处理 start -------------------------------------
    function regCmdHandler(){
       // var decode = BaseDecode.getInstance();
        //if(decode){
            //decode.registerFunction(CmdDef.CMD_CDP_CHAODIPI, method_ChaoDiPi);
        //}
    }

    function unRegCmdHandler(){
        //var decode = BaseDecode.getInstance();
        //if(decode){
            //decode.unRegisterFunction(CmdDef.CMD_CDP_CHAODIPI);
        //}
    }


    function method_ChaoDiPi(data: any):void {
        // let chaodipi_view: ChaoDiPiView = <ChaoDiPiView>UIManager.getInstance().getViewByName(ChaoDiPiView.NAME);
        // if(chaodipi_view != null){
        //     chaodipi_view.RecvData(data);
        // }
    }


    //------------------------------------- 消息处理 end -------------------------------------
}

window["xxx"] = xxx;