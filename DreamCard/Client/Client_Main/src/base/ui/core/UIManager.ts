// TypeScript file
class UIManager{
    private static m_manager:UIManager = new UIManager();
    public static getInstance():UIManager{
        return UIManager.m_manager;
    }

    //保存构造函数;
    private uiUsedContainer:Object = new Object();
    //保存实例对象
    private uiContainer:Object = new Object();
    //id-ui_name
    private gkid_vname:Object = new Object();
    
    //遮罩层;
    private m_maskSpriteLayer:number = GameScene.VIEW_LAYER_NUMBER;
    //遮罩图;
    private m_maskSprite:egret.Sprite = new egret.Sprite();

    
    /*显示UI;
    *ui         UI名称或者是类名;
    *layer      层级;
    *maskAlpha  遮罩透明度-1为没有遮罩;
    *popUpWidth 弹窗宽度,定位使用
    *popUpHeight弹窗高度,定位使用
    *effectType 打开特效类型;
    *data       传递数据;

    */
    public showUI(ui:any,layer:number = GameScene.VIEW_LAYER_NUMBER,maskAlpha:number = -1,
        popUpWidth:number = 0,popUpHeight:number = 0,effectType :ShowViewEffectType = ShowViewEffectType.TYPE_NOR,
        data:Object = null):void{
        
        if(ui==null){
            console.log("UI名称或者面板路径为空");
            return;
        }
        var self =this;
        var uiname:string = self.GetAndRegView(ui);
        var view:IBaseView = self.uiUsedContainer[uiname];
        if(view==null){
            view = new self.uiContainer[uiname]();
            self.uiUsedContainer[uiname] = view;
        }else{
            if(view.visible){
                if(data!=null){
                    view.initData(data);
                }
                return;
            }
        }
        self.openView(uiname,view,layer,maskAlpha);
        view.weekComplete();
        view.init(2,layer,popUpWidth,popUpHeight,effectType,data);

    }


    //打开视图特效;
    public openViewEffect(view:IBaseView):void{
        var popUpWidth:number = view.width;
        var popUpHeight:number = view.height;

        var pWidth:number = GameConfig.curWidth()/2 - popUpWidth/2;
        var pHeight:number = GameConfig.curHeight()/2 - popUpHeight/2;
        // if(popUpWidth!=0){
        //     view.x = pWidth;
        //     view.y = pHeight;
        // }

        switch(view.getEffectType()){
            case ShowViewEffectType.TYPE_NOR:{
                view.alpha = 1;
                view.scaleX = 1;
                view.scaleY = 1;
            }
            break;
            case ShowViewEffectType.TYPE_SCALE_CENTER:{
                view.alpha = 0;
                view.scaleX = 0.5;
                view.scaleY = 0.5;
                view.x = view.x+popUpWidth/4;
                view.y = view.y+popUpHeight/4;
                egret.Tween.get(view).to({alpha:1,scaleX:1,scaleY:1,x:view.x-popUpWidth/4,y:view.y-popUpHeight/4},500,egret.Ease.backOut);
            }
            break;
            case ShowViewEffectType.TYPE_MOVE_LEFT:
            case ShowViewEffectType.TYPE_MOVE_RIGHT:{
                view.x = view.getEffectType()==ShowViewEffectType.TYPE_MOVE_LEFT?-popUpWidth:popUpWidth;
                egret.Tween.get(view).to({x:0},500,egret.Ease.cubicOut);
            }
            break;
            case ShowViewEffectType.TYPE_MOVE_TOP:
            case ShowViewEffectType.TYPE_MOVE_BOTTOM:{
                view.y = view.getEffectType()==ShowViewEffectType.TYPE_MOVE_BOTTOM?-popUpHeight:popUpHeight;
                egret.Tween.get(view).to({y:0},500,egret.Ease.cubicOut);
            }
            break;
            case ShowViewEffectType.TYPE_SHADOW:{
                view.alpha = 0;
                egret.Tween.get(view).to({alpha:1},500,egret.Ease.backOut);
            }
            break;
        }
    }

    //移除视图;
    public hideUI(ui:any,effectType:HideViewEffectType = HideViewEffectType.TYPE_NOR):void{
        var uiname:string = this.GetAndRegView(ui);
        var view:IBaseView = this.uiUsedContainer[uiname];
        if(view==null)
            return;
        
        var tweenComplete:Function = function(){
            var view2:IBaseView = view;
            view2.hiden();
            if(view2.parent){
                view2.parent.removeChild(view2);
            }
            UIManager.getInstance().hidenDarkSprite();
        }

        switch(effectType)
        {
            case HideViewEffectType.TYPE_NOR:{
                tweenComplete();
            }
            break;
            case HideViewEffectType.TYPE_SCALE_CENTER:{
                egret.Tween.get(view).to({alpha:0,scaleX:0,scaleY:0,x:view.x+view.width/2,y:view.y+view.height/2},500).call(tweenComplete,this);
            }
            break;
            case HideViewEffectType.TYPE_MOVE_LEFT:
            case HideViewEffectType.TYPE_MOVE_RIGHT:{
                var moveX:number = view.getEffectType()==ShowViewEffectType.TYPE_MOVE_LEFT?-GameConfig.curWidth():GameConfig.curWidth();
                egret.Tween.get(view).to({x:moveX},500).call(tweenComplete,this);
            }
            break;
            case HideViewEffectType.TYPE_MOVE_TOP:
            case HideViewEffectType.TYPE_MOVE_BOTTOM:{
                var moveY:number = view.getEffectType()==ShowViewEffectType.TYPE_MOVE_BOTTOM?-GameConfig.curHeight():GameConfig.curHeight();
                egret.Tween.get(view).to({y:moveY},500).call(tweenComplete,this);
            }
            break;
            case HideViewEffectType.TYPE_SHADOW:{
                egret.Tween.get(view).to({alpha:0},500).call(tweenComplete,this);
            }
            break;
        }
    }


    //显示load界面;
    public showLoading(oriMode:string = egret.OrientationMode.AUTO,data:Object = null):IGMDLoadProgress{
        var uiname:string = null;
        var view:IBaseView = null;
        var loadView = null;
        if(oriMode ==egret.OrientationMode.AUTO){
            loadView = LoadingSView;
        }else if(oriMode ==egret.OrientationMode.PORTRAIT){
            loadView = LoadingSView;
        }else if(oriMode ==egret.OrientationMode.LANDSCAPE){
            loadView = LoadingHView;
        }else if(oriMode ==egret.OrientationMode.LANDSCAPE_FLIPPED){
            loadView = LoadingRView;
        }
        
        uiname = this.GetAndRegView(loadView);
        view = this.getView(loadView);
        if(view&&view.visible){
            this.hideUI(view);
        }

        if(view ==null){
            view = new this.uiContainer[uiname]();
            this.uiUsedContainer[uiname] = view;
        }

        this.openView(uiname,view,GameScene.POP_LAYER_NUMBER,-1);
        view.weekComplete();
        view.init(2,GameScene.POP_LAYER_NUMBER,0,0,ShowViewEffectType.TYPE_NOR,data);
        return <any>view;
    }

    public hideLoading():void{
        this.hideUI(LoadingSView);
        this.hideUI(LoadingRView);
        this.hideUI(LoadingHView);
    }

    public registerViewNameByGkid(gkid:number,ui:any,g_name:string):void{
        var name:string = this.GetUIName(ui);
        this.gkid_vname[gkid] = name;
    }

    public getViewNameByGkid(gkid:number):string{
        var v_name :string = this.gkid_vname[gkid];
        if(v_name!=null){
            return v_name;
        }
        return null;
    }

    //根据名字返回视图;
    public getView(ui:any):IBaseView{
        var self = this;
        var uiname:string = self.GetAndRegView(ui);
        var view:IBaseView = self.uiUsedContainer[uiname];
        if(view !=null){
            return view;
        }       
        return null;
    }

    //检测是否包含视图
    public checkHasView(ui:any):boolean{
        var uiname:string = this.GetUIName(ui);
        return this.uiUsedContainer.hasOwnProperty(uiname);
    }

    //检测视图是否打开
    public checkViewIsOpen(ui:any):boolean{
        var self = this;
        var view:IBaseView = self.getView(ui);
        if(view==null)
            return false;
            
        return view.getViewState()==3;
    }

    //返回并注册视图;
    private GetAndRegView(ui:any):string{
        var uiname:string = this.GetUIName(ui);
        if(this.uiContainer[uiname]!=null){
            return uiname;
        }
        if(uiname==""){
            egret.log("找不到此名对应的类:" + uiname);
            return "";
        }
        if(this.uiContainer[uiname] ==null){
            this.uiContainer[uiname]= ui;
        }
        return uiname;
    }

    //返回UI名称;
    private GetUIName(ui:any):string{
        if(ui==null)
            return "";
        if(typeof ui=="string")
            return ui.toString();
        else
            return egret.getQualifiedClassName(ui);
    }


    /*打开视图
    * uiname:UI名称
    *layer: 视图层级;
    *maskAlpha:遮罩透明度;
    */
    private openView(uiname:string,view:IBaseView,
        layer:number = GameScene.VIEW_LAYER_NUMBER,maskAlpha:number = -1,
        effectType :ShowViewEffectType = ShowViewEffectType.TYPE_NOR):void{
        
        var uiLayer:eui.UILayer = null;
        switch(layer){
            case GameScene.GAME_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getGameLayer();
            break;
            case GameScene.VIEW_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getViewLayer();
            break;
            case GameScene.EFFECT_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getEffectLayer();
            break;
            case GameScene.HEAD_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getHeadLayer();
            break;
            case GameScene.BOM_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getBomLayer();
            break;
            case GameScene.POP_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getPopLayer();
            break;
            case GameScene.HIDE_LAYER_NUMBER:
                return;
        }
        
        var self = this;
        self.m_maskSpriteLayer = layer;
        if(maskAlpha>=0){
            self.m_maskSprite.graphics.clear();
            self.m_maskSprite.graphics.beginFill(0x000000,maskAlpha);
            self.m_maskSprite.graphics.drawRect(0,0,GameConfig.curWidth(),GameConfig.curHeight());
            self.m_maskSprite.graphics.endFill();
            self.m_maskSprite.width = GameConfig.curWidth();
            self.m_maskSprite.height = GameConfig.curHeight();
            if(!uiLayer.contains(self.m_maskSprite)){
                uiLayer.addChild(self.m_maskSprite);
            }
            self.m_maskSprite.touchEnabled = true;
            self.m_maskSprite.visible = true;
        }

        uiLayer.addChild(view);
    }

    //隐藏遮罩;
    private hidenDarkSprite():void{
        if(this.m_maskSprite){
            var container:egret.DisplayObjectContainer = this.m_maskSprite.parent;
            if(container){
                if(container.contains(this.m_maskSprite)){
                    container.removeChild(this.m_maskSprite);
                }
            }
        }
    }

    public removeAllLayerUI():void{
        var self = this;
        self.removeLayerUI(GameScene.GAME_LAYER_NUMBER);
        self.removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
        self.removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
        self.removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
        self.removeLayerUI(GameScene.BOM_LAYER_NUMBER);
        self.removeLayerUI(GameScene.POP_LAYER_NUMBER);
    }

    public removeLayerUI(layer:number = GameScene.VIEW_LAYER_NUMBER):void{
        
        var uiLayer:eui.UILayer = null;
        switch(layer){
            case GameScene.GAME_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getGameLayer();
            break;
            case GameScene.VIEW_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getViewLayer();
            break;
            case GameScene.EFFECT_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getEffectLayer();
            break;
            case GameScene.HEAD_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getHeadLayer();
            break;
            case GameScene.BOM_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getBomLayer();
            break;
            case GameScene.POP_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getPopLayer();
            break;
            case GameScene.HIDE_LAYER_NUMBER:
                return;
        }

        if(uiLayer==null)
            return;

        for(var i:number=0,lengthI = uiLayer.numChildren;i<lengthI;i++){
            if(uiLayer.numChildren>0){
                let child:Object = uiLayer.getChildAt(0);
                if(child instanceof IBaseView){
                    let view:IBaseView = child as IBaseView;
                    view.hiden();
                    uiLayer.removeChild(view);
                }
            }
        }
    }
}

//显示遮罩类型枚举;
const enum ShowMaskType{
    TYPE_NOR = 0,        //没有遮罩;
    TYPE_ALPHA_ZERO = 1, //有遮罩全透明的;
    TYPE_ALPHA_HALF = 2, //有遮罩半透明;
    TYPE_ALPHA_ALL = 3,  //有遮罩全黑;
}

//显示视图特效方式枚举;
const enum ShowViewEffectType{
    TYPE_NOR          = 0,      //无类型;
    TYPE_SCALE_CENTER = 1,      //中间缩放;
    TYPE_MOVE_LEFT    = 2,      //左移出现;
    TYPE_MOVE_RIGHT   = 3,      //右移出现;  
    TYPE_MOVE_TOP     = 4,      //上移出现;
    TYPE_MOVE_BOTTOM  = 5,      //下移出现; 
    TYPE_SHADOW       = 6,      //渐变出现;
}

//隐藏视图特效方式枚举;
const enum HideViewEffectType{
    TYPE_NOR          = 0,      //无类型;
    TYPE_SCALE_CENTER = 1,      //中间消失;
    TYPE_MOVE_LEFT    = 2,      //左移消失;
    TYPE_MOVE_RIGHT   = 3,      //右移消失;  
    TYPE_MOVE_TOP     = 4,      //上移消失;
    TYPE_MOVE_BOTTOM  = 5,      //下移消失; 
    TYPE_SHADOW       = 6,      //渐变消失;
}


interface IGMDLoadProgress{
    setStepInfo(stepList:Object,finBack:Function,target:any):void;  //stepList 步骤/占进度 总必须为100;
    finStep(step:string):void;
    finAllStep():void;
}