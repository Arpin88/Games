// TypeScript file
class CGSFetterItemView extends IBaseView{
    public static NAME:string = "CGSFetterItemSkin";

     public constructor(){
        super(CGSFetterItemView.NAME);
    }


    private imgBG:eui.Image;
    private groupFetter:eui.Group;
    

    private fetterView:CardFetterView;

    protected week():void{
        var self =this;
        var data = super.getData();
        if(data==null)
            return;
            
        var type:number = data.type;
        if(type==0){
            self.removeFetter(); 
        }else{
            self.setFetter(data.fdata);
        }
    }

    protected sleep():void{
        var self = this;
        self.removeFetter();
    }


    private setFetter(data:Object):void{
        var self = this;

        self.removeFetter();

        self.imgBG.visible = false;
        var view:CardFetterView = new CardFetterView();
        view.initData(data);
        view.scaleX = Number((self.groupFetter.width/view.width).toFixed(2));
        view.scaleY = Number((self.groupFetter.height/view.height).toFixed(2));
        self.groupFetter.addChild(view);
        self.fetterView = view;
    }

    private removeFetter():void{
        var self = this;
        if(self.fetterView!=null){
            self.fetterView.parent.removeChild(self.fetterView);
            self.fetterView = null;
        }
        self.imgBG.visible = true;
    }
}