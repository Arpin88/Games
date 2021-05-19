// TypeScript file
class GameScene{
    public static GAME_LAYER_NUMBER:number = 0;     //游戏层;
    public static VIEW_LAYER_NUMBER:number = 1;     //视图层;
    public static EFFECT_LAYER_NUMBER:number = 2;   //特效层;
    public static HEAD_LAYER_NUMBER:number = 3;     //头部层;
    public static BOM_LAYER_NUMBER:number = 4;      //底部层;
    public static POP_LAYER_NUMBER:number = 5;      //弹窗层;

    public static HIDE_LAYER_NUMBER:number = 10;    //隐藏层;


    //游戏层;
    private m_gameLayer:eui.UILayer = new eui.UILayer();
    //视图层;
    private m_viewLayer:eui.UILayer = new eui.UILayer();
    //特效层;
    private m_effectLayer:eui.UILayer = new eui.UILayer();
    //头部层;
    private m_headLayer:eui.UILayer = new eui.UILayer();
    //底部层;
    private m_bomLayer:eui.UILayer = new eui.UILayer();
    //弹窗层;
    private m_popLayer:eui.UILayer = new eui.UILayer();
    

    public constructor(_stage:egret.Stage){
        this.init(_stage);
    }

    private init(_stage:egret.Stage){
        _stage.addChild(this.m_gameLayer);
        this.m_gameLayer.touchEnabled = true;
        _stage.addChild(this.m_viewLayer);
        this.m_viewLayer.touchEnabled = true;
        this.m_viewLayer.y = 0;
        _stage.addChild(this.m_effectLayer);
        this.m_effectLayer.touchEnabled = false;
        this.m_effectLayer.touchThrough = true;
        _stage.addChild(this.m_headLayer);
        this.m_headLayer.touchThrough = true;
        this.m_headLayer.top = 0;
        _stage.addChild(this.m_bomLayer);
        this.m_bomLayer.touchThrough = true;
        this.m_bomLayer.bottom = 0;
        _stage.addChild(this.m_popLayer);
        this.m_popLayer.touchThrough = true;
    }

    public getGameLayer():eui.UILayer{
        return this.m_gameLayer;
    }

    public getViewLayer():eui.UILayer{
        return this.m_viewLayer;
    }

    public getEffectLayer():eui.UILayer{
        return this.m_effectLayer;
    }

    public getHeadLayer():eui.UILayer{
        return this.m_headLayer;
    }

    public getBomLayer():eui.UILayer{
        return this.m_bomLayer;
    }

    public getPopLayer():eui.UILayer{
        return this.m_popLayer;
    }
}