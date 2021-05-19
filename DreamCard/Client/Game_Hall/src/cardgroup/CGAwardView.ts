// TypeScript file
class CGAwardView extends BaseView{
    public static NAME:string = "CGAwardSkin";

     public constructor(){
        super(CGAwardView.NAME);
    }

    private rectBG:eui.Rect;
    private btnClose:eui.Button;

    private groupCard:eui.Group;            //卡牌显示层

    private imgAttribute:eui.Image;         //属性背景图片
    private imgAttributeLabel:eui.Image;    //属性文本图片
    private imgSkill:eui.Image;             //技能背景图片
    private imgSkillLabel:eui.Image;        //技能背景图片
    private imgFetter:eui.Image;            //羁绊背景图片
    private imgFetterLabel:eui.Image;       //羁绊背景图片

    private groupAttribute:eui.Group;       //属性层
    private groupAttTextField:eui.Group;    //属性富文本层

    private groupSkill:eui.Group;           //技能层
    private scrSkillItem:eui.Scroller;      //技能滚动区域
    private groupSkillItem:eui.Group;       //技能滚动层

    private groupFetter:eui.Group;           //羁绊层
    private scrFetterItem:eui.Scroller;      //羁绊滚动区域
    private groupFetterItem:eui.Group;       //羁绊滚动层

    private btnUnload:eui.Button;           //卸下按钮

    private curTypeIndex:number = 0;            //当前类型下标 0属性 1技能 2羁绊
    private attributeTextField:egret.TextField; //属性描述文本;

    private arrFetterItemView:Array<CGDFetterItemView> = new Array<CGDFetterItemView>();    //羁绊选项视图集合
    private arrSkillItemView:Array<CGDSkillItemView> = new Array<CGDSkillItemView>();       //技能选项视图集合

    private callBackRemove:Handler;
    private cardCode:string;

    protected week():void{
        var self =this;
        

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        var data = super.getData();
        if(data==null)
            return;
        self.setCard(data);
        self.setFetter(data.txt,data.name);

    }

    private initView():void{
        var self = this;
        // self.curTypeIndex = 0;
        self.btnUnload.visible = true;
        self.callBackRemove = null;
        self.cardCode = "";
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        if(self.attributeTextField!=null){
            self.attributeTextField.parent.removeChild(self.attributeTextField);
            self.attributeTextField = null;
        }

        self.cleanArray(self.arrFetterItemView);
        self.cleanArray(self.arrSkillItemView);
    }

    private cleanArray(arr:Array<IBaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i=arr.length-1;i>=0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>tar;
            if(btn==self.btnClose){
                self.hiden();
            }else if(btn==self.btnUnload){
                if(self.callBackRemove!=null){
                    self.callBackRemove.run();
                }
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
    }

    //显示卡牌
    private setCard(data:any):void{
        var self = this;
        var view:CardintroduceView = new CardintroduceView();
        view.initData(data);
        view.horizontalCenter= "0";
        view.verticalCenter = "0";
        self.groupCard.addChild(view);
    }

    private attributeTextField0:egret.TextField;
    private attributeTextField1:egret.TextField;


    //设置羁绊
    private setFetter(txt:string,namestr:string):void{
        var self = this;

        self.groupFetterItem.removeChildren();
        txt = txt.replace("/r/","\r")
        var view:eui.Label = new eui.Label("\r" + txt);
        view.$setWidth(484);
        view.lineSpacing = 26;
        view.fontFamily = "SimHei";
        view.size = 20;
        view.y = 20;
        self.groupFetterItem.addChild(view);
        self.groupFetterItem.scrollV = 0;
   /*     var a = txt.split(namestr)
         if(a["length"] > 1){
            view.textFlow = [
                {text: a[0], style: {textColor:0xFFFFFF}},
                {text:namestr,style:{textColor:0xfced63}},
                {text:a[1],style:{textColor:0xFFFFFF}},
            ];
         }else{
            view.textFlow = [
                {text: txt, style: {textColor:0x8bc2d5}},
            ];
        }*/
    }

}