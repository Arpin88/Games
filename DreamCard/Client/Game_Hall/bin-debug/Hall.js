// export interface IGameModule{
//         init( callback:()=>void ):void;
//         dispose():void;
//     }
var Hall;
(function (Hall) {
    var _gameShowCB;
    function getResConf() {
        return {};
    }
    Hall.getResConf = getResConf;
    //游戏初始化
    function init(data, finCallBack) {
        LanguageManager.getInstance().setLanguagePackage("Hall");
        UIManager.getInstance().registerViewNameByGkid(1, HallView, "大厅");
        if (data.hasOwnProperty("playBGM") && data.playBGM) {
            SoundManager.getInstance().PlayBgm("datingBGM_mp3");
            // SoundManager.getInstance().setBGMVolume(0.7);
        }
        _gameShowCB = finCallBack;
        regCmdHandler();
        showUI(data);
        HTMLElementManager.getInstance().startLoadJson("uisConfig_json", function () { }, this);
    }
    Hall.init = init;
    //在游戏主界面类中加入 上面代码
    function onGameShow() {
        if (_gameShowCB != null) {
            _gameShowCB();
            _gameShowCB = null;
        }
    }
    Hall.onGameShow = onGameShow;
    function dispose() {
        hideUI();
        unRegCmdHandler();
    }
    Hall.dispose = dispose;
    //------------------------------------- ui -------------------------------------
    function showUI(data) {
        UIManager.getInstance().showUI(HallView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, data);
    }
    function hideUI() {
        UIManager.getInstance().hideUI(HallView);
    }
    //------------------------------------- 消息处理 start -------------------------------------
    var hallDecoder;
    function regCmdHandler() {
        if (!hallDecoder)
            hallDecoder = new HallDecoder();
        var decode = BaseDecode.getInstance();
        decode.registerDecoder(hallDecoder);
    }
    function unRegCmdHandler() {
        var decode = BaseDecode.getInstance();
        decode.removeDecoder(hallDecoder);
    }
    //------------------------------------- 消息处理 end -------------------------------------
})(Hall || (Hall = {}));
//# sourceMappingURL=Hall.js.map