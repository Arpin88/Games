// TypeScript file
class HeadItemView extends BaseView{
    public static NAME:string = "HeadItemSkin";

     public constructor(){
        super(HeadItemView.NAME);
    }

    private groupPI:eui.Group;
    private labItemNum:eui.Label;
    private imgItem:eui.Image;
    private selcetLight:eui.Image;    
    private labItemName:eui.Label;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        self.setName(data["name"]);
        self.setItemNum(data["num"]);
        self.setIcon(data["icon"]);
        self.selcetLight.$setVisible(false);
    }

    protected sleep():void{
        
    }

    private setName(str:string):void{
       // this.labItemName.text = str;
    }
    private setIcon(str:string):void{
        if(str == "")
            return;
        this.imgItem.source = str;
    }
    private setItemNum(index:number):void{

    }
    
    //返回视图宽度
    public getViewWidth():number{
        return this.groupPI.width;
    }

    public setBeenSelect(isSelect:boolean):void{
        this.selcetLight.$setVisible(isSelect);
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupPI.height;
    }

    //设置层级name
    public setGroupName(str:string):void{
        this.groupPI.name = str;
    }
}