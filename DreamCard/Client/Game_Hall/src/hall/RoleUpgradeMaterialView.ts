// TypeScript file
class RoleUpgradeMaterialView extends IBaseView{
    public static NAME:string = "RoleUpgradeMaterialSkin";

     public constructor(){
        super(RoleUpgradeMaterialView.NAME);
    }

    private groupRUM:eui.Group;

    private imgIcon:eui.Image;
    private lblCount:eui.Label;
    private imgSelect:eui.Image;
    private lblName:eui.Label;

    private propCode:string;
    private count:number;

    protected week():void{
        var self =this;
        
        self.imgIcon.source = "";
        self.lblCount.text = "";
        // self.imgSelect.visible = false;
        self.lblName.text = "";
        self.count = 0;
        self.propCode = "";

        var data = super.getData();
        if(data==null)
            return;
        var mdata = data.mdata;
        if(mdata!=null){
            if(mdata.icon!=null)
                self.imgIcon.source = "propSheet_json." + mdata.icon;
            if(mdata.count!=null){
                self.count = mdata.count;
                self.lblCount.text = mdata.count;
            }
            if(mdata.name!=null)
                self.lblName.text = mdata.name;
            if(mdata.propCode!=null)
                self.propCode = mdata.propCode;
        }

        if(data.gname!=null)
            self.groupRUM.name = data.gname;
        
    }

    protected sleep():void{
        
    }

    public setSelect(sel:boolean):void{
        this.imgSelect.source = sel?"hallBtn1Sheet_json.a40x40_1":"hallBtn1Sheet_json.a40x40_0";
    }

    public setCount(count:number):void{
        var self = this;
        self.count = count;
        self.lblCount.text = count+"";
        // if(count==0)
        //     self.setSelect(false);
    }

    public getCount():number{
        return this.count;
    }

    public getPropCode():string{
        return this.propCode;
    }

    public getViewWidth():number{
        return this.groupRUM.width;
    }
}