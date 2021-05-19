// TypeScript file
class IBaseView extends eui.Component implements GameProcedure{

    private m_data:any;
    private m_state:number = 1;
    private m_layer:number = 0;
    private m_effectType:number = 0;
    private m_viewExml:string = null;
    private m_viewUrl:string = null;
    private m_oriMode:string = egret.OrientationMode.AUTO;
    

    public constructor(name?:string,data?:Object){
        super();
        var self = this;
        self.name = name;
        self.m_data =data;
    }

    public setData(data:any):void{
        this.m_data = data;
    }
    
    public getData():any{
        return this.m_data;
    }

    public getOriMode():string{
        return this.m_oriMode;
    }

    public getEffectType():number{
        return this.m_effectType;
    }

    private HasRES(name:any):string{
        if(UITheme.hasTheme(name + "Skin")){
            return name + "Skin";
        }else if(UITheme.hasTheme(name + "skin")){
            return name + "Skin";
        }else if(UITheme.hasTheme(name + "Skin_exml")){
            return name + "Skin_exml";
        }else if(UITheme.hasTheme(name + "skin_exml")){
            return name + "skin_exml";
        }
        return "";
    }

    //视图界面初始化
    public init(type:number = 1,layer:number = 0,popUpWidth:number=0,popUpHeight:number = 0,
        effectType:ShowViewEffectType = ShowViewEffectType.TYPE_NOR,data:Object = null):void{
        var self = this;
        self.m_state = 1;
        self.m_layer = layer;
        if(popUpWidth!=0)
            self.width = popUpWidth;
        if(popUpHeight!=0)
            self.height =popUpHeight;
        self.m_effectType = effectType;
        if(data!=null)
            self.m_data = data;
        
        //不填写name则寻找对应的皮肤文件
        if(self.name == null){
            var rname:string = this["__proto__"]["__class__"];
            var mname:string = "";
            if((mname=self.HasRES(rname))!=""){
                self.name = mname;
            }else if(rname.indexOf("view")!=-1&&(mname=self.HasRES(rname.substr(0,rname.indexOf("view"))))!=""){
                self.name = mname;
            }else if(rname.indexOf("View")!=-1&&(mname=self.HasRES(rname.substr(0,rname.indexOf("View"))))!=""){
                self.name = mname;
            }else{
                egret.log("找不到皮肤文件:" + rname);
                return;
            }
        }

        self.skinName = UITheme.getTheme(self.name);
        self.m_state = 2;
        self.openView();
    }

    public initData(data:Object):void{
        this.init(1,GameScene.VIEW_LAYER_NUMBER,0,0,0,data);
    }

    public show():void{
        var self = this;
        if(self.m_state==2){
            self.openView();
        }
    }

    public weekComplete():void{

    }

    protected week():void{

    }

    public reWeek():void{
        this.week();
    }

    private openView():void{
        var self = this;
        self.m_state=3;
        self.lPackAssignment();
        self.week();
        if(self.m_layer!=GameScene.HIDE_LAYER_NUMBER){
            self.visible = true;
        }else{
            self.visible =false;
        }

        UIManager.getInstance().openViewEffect(self);
    }

    public hiden():void{
        var self = this;
        self.sleep();
        self.m_state = 2;
        self.visible = false;
    }


    protected sleep():void{
        
    }

    //文本语言包赋值
    private lPackAssignment(){
        var labelObj:Object = LanguageManager.getInstance().getLabelLanguage(this);
        if(labelObj==null)
            return;

        for(var lbl in labelObj){
            this[lbl] = labelObj[lbl];
        }
    }

    protected registerTouchEvent(func:Function):void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,func,self);
        } 
    }

    protected removeTouchEvent(func:Function):void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,func,self);
        } 
    }

}