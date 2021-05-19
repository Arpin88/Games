// TypeScript file
class ECardItemView extends BaseView{
    public static NAME:string = "ECardItemSkin";

     public constructor(){
        super(ECardItemView.NAME);
    }

    private groupCI:eui.Group;
    private imgBG:eui.Image;
    private groupNotOwn:eui.Group;
    private groupCard:eui.Group;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        
        var own:number = data.own;
        
        var idx:number = data.index;

        var obj = data.obj;
        var data1:Object = {
            "icon":obj.icon,
            "rarity":obj.rarity,
            "element":obj.element,
            "round":obj.round,
            "generation":obj.generation,
            "name":obj.name,
            "cost":obj.cost,
            "level":obj.level,
            "atk":obj.atk,
            "hp":obj.hp,
            "groupName":"groupCR_"+idx,
            "canTouch":true};
        this.setSCard(data1);
        if(obj.cantouch == 1) self.groupNotOwn.visible = false;
        else self.groupNotOwn.visible = true;
        
        
    }

    private setSCard(data:Object):void{
        var self = this;
        var view:CardSquareView = new CardSquareView();
        view.initData(data);
        view.scaleX = Number((self.groupCard.width/view.width).toFixed(2));
        view.scaleY = Number((self.groupCard.height/view.height).toFixed(2));
        view.showSimple();
        self.groupCard.addChild(view);
    }

    protected sleep():void{
        
    }

    private arrLetter:string[] = ["a","b","c","d","e","f","g"];
    public setImgBG(index:number):void{
        var self = this;
        self.imgBG.source ="lobbyImg1Sheet_json."+self.arrLetter[index-1]+"196x194";
    }

    //返回视图宽度
    public getViewWidth():number{
        return this.groupCI.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupCI.height;
    }

    public showSimple():void
    {

    }

}