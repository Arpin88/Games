// TypeScript file
class CardItemView extends IBaseView{
    public static NAME:string = "CardItemSkin";

     public constructor(){
        super(CardItemView.NAME);
    }


    private groupCI:eui.Group;
    private imgBG:eui.Image;

    protected week():void{

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
}