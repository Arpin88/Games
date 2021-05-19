// TypeScript file
class PPropItemView2 extends BaseView{
    public static NAME:string = "PPropItemSkin2";

     public constructor(){
        super(PPropItemView2.NAME);
    }

    private groupPI:eui.Group;
    private labItemNum:eui.Label;
    private imgItem:eui.Image;
    private selcetLight:eui.Image;
    
    private labItemName:eui.Label;

    private propCode:String = "";

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        self.setName(data["name"]);
        self.setItemNum(data["count"]);
        self.setIcon(data["icon"]);
        self.selcetLight.$setVisible(false);
        self.propCode = data.propCode;
    }

    protected sleep():void{
        var self = this;
        self.propCode = "";
    }

    private setName(str:string):void{
       // this.labItemName.text = str;
    }
    private setIcon(str:string):void{
        if(str == "")
            return;
            this.imgItem.source = "propSheet_json." + str;
        
    }
    private setItemNum(index:number):void{
        this.labItemNum.text = ""+index;
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


    public getPropCode():String{
        return this.propCode;
    }

    public updateCountShow(count:number):void{
        this.setItemNum(count);
    }
}