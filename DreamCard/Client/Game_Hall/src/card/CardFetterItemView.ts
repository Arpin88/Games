// TypeScript file
class CardFetterItemView extends BaseView{
    public static NAME:string = "CardFetterItemSkin";

     public constructor(){
        super(CardFetterItemView.NAME);
    }

    private groupFetterItem:eui.Group;
    private groupFetterIcon:eui.Group;
    private labFetterName:eui.Label;
    private labFetterTip1:eui.Label;
    private labFetterTip2:eui.Label;
    private zcTxt:string = "组成: ";
    private xgTxt:string = "效果: ";
    private errorTxt:string = "暂无数据";

    protected week():void{
        var self =this;
        
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.zcTxt = "Formation: ";
            self.xgTxt = "Effects: ";
            self.errorTxt = "Temporarily no data";
        }

        var data = super.getData();
        if(data==null)
            return;
        var name:string = data.name;
        self.setFetterName(name);
        var desc:string = data.desc;
        self.setFetterTip1(desc);
        var zc:string = data.zc;
        self.setFetterTip2(zc,data.hero);
        var icon = data.icon;
        self.setFetterIcon(icon,data.color);
    }

    protected sleep():void{
        
    }

    private setFetterTip1(str:string):void{
        this.labFetterTip1.textFlow = [
            {text: this.xgTxt, style: {"size": 20,textColor:0x8bc2d5}},
            {text: str, style: {"size": 20,textColor:0xFFFFFF}},
        ];
    }
    private setFetterTip2(str:string,substring:string):void{
       var a = str.split(substring)

       if(a["length"] > 1){
           this.labFetterTip2.textFlow = [
            {text: this.zcTxt, style: {"size": 20,textColor:0x8bc2d5}},
            {text: a[0], style: {"size": 20,textColor:0xFFFFFF}},
            {text:substring,style:{"size":20,textColor:0xfced63}},
            {text:a[1] + "\n",style:{"size":20,textColor:0xFFFFFF}},
        ];
       }else{
           this.labFetterTip2.textFlow = [
                {text: this.zcTxt, style: {"size": 20,textColor:0x8bc2d5}},
                {text: str + "\n", style: {"size": 20,textColor:0xFFFFFF}},
            ];
       }
        
    }
    private setFetterName(str:string):void{
        this.labFetterName.text = str;
    }

    private setFetterIcon(icon:Object,color:Object):void{
        var view:CardFetterView = new CardFetterView();
        var data= {icon:icon,color:color,canTouch:false};
        view.initData(data);
        this.groupFetterIcon.addChild(view);
        view.scaleX = view.scaleY = this.groupFetterIcon.width/view.width;
    }

    

    //返回视图宽度
    public getViewWidth():number{
        return this.groupFetterItem.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupFetterItem.height;
    }
}