// TypeScript file
class FilterItemView extends IBaseView{
    public static NAME:string = "FilterItemSkin";

     public constructor(){
        super(FilterItemView.NAME);
    }

    private groupFilterItem:eui.Group;   //排序选项层
    private imgBG:eui.Image;    //背景图片
    private lblDes:eui.Label;   //描述文本


    protected week():void{
        var data = super.getData();
        if(data==null)
            return;

        var self =this;
        var des:string = data.des;
        self.setDes(des);
        var gName:string = data.gName;
        self.setGroupName(gName);
    }

    protected sleep():void{
        
    }
    
    //设置描述
    private setDes(data:string):void{
        let str:string = (data==null||data==undefined)?"":data;
        this.lblDes.text = str;
    }

    //设置层级名称
    private setGroupName(data:string):void{
        let str:string = (data==null||data==undefined)?"":data;
        this.groupFilterItem.name = str;
    }

    private setImgBG():void{
        
    }
}