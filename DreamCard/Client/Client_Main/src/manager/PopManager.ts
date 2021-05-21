// TypeScript file
class PopManager{
    private static m_manager:PopManager = new PopManager();
    public static getInstance():PopManager{
        return PopManager.m_manager;
    }

    //content：显示内容 uiparam：1.两个按钮 2.一个按钮 的类型 callbackHandler：回调
    public showPromptBox(content:string,uiparam:number =1,callbackHandler:Handler = null,btnLbls:any = null,conColor?:number){
        SoundManager.getInstance().PlaySound("tanchukuang_mp3");
        UIManager.getInstance().showUI(PromptBoxView,GameScene.POP_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,uiparam);
        let pbv:PromptBoxView = UIManager.getInstance().getView(PromptBoxView) as PromptBoxView;
        pbv.setContent(content,callbackHandler,btnLbls,conColor);

    }

}