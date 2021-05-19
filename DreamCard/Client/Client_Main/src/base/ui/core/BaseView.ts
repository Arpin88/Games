// TypeScript file
//自适应基类;
class BaseView extends IBaseView{
    public constructor(name?:string,data?:Object){
        super(name,data);
        let self = this;
        // self.addEventListener(egret.Event.ADDED_TO_STAGE,self.onAddToStage,self);
        self.addEventListener(egret.Event.REMOVED_FROM_STAGE,self.onRemoveFromStage,self);
        // self.addEventListener(egret.Event.RENDER,self.onRender,self);
        self.addEventListener(eui.UIEvent.COMPLETE,self.onComplete,self);

    }

    //皮肤打开完成
    protected onComplete(event?:egret.Event):void{
        let self = this;
        if(self.$stage==null)
            return;
        self.$stage.addEventListener(egret.Event.RESIZE,self.onResize,self);
        self.onResize();
    }

    // //添加到舞台
    // protected onAddToStage(event?:egret.Event):void{
    //     let self = this;
    //     self.$stage.addEventListener(egret.Event.RESIZE,self.onResize,self);
    //     self.onResize();
    // }

    //从舞台移除
    protected onRemoveFromStage(event?:egret.Event):void{
        let self = this;
        if(self.$stage==null)
            return;
        self.$stage.removeEventListener(egret.Event.RESIZE,self.onResize,self);
    }

    //舞台尺寸改变
    protected onResize(event?:egret.Event):void{
        let self = this;
        let stage = self.$stage;
        self.$setWidth(stage.$stageWidth);
        self.$setHeight(stage.$stageHeight);
    }
}