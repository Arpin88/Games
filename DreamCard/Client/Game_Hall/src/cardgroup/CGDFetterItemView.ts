// TypeScript file
class CGDFetterItemView extends IBaseView{
    public static NAME:string = "CGDFetterItemSkin";

     public constructor(){
        super(CGDFetterItemView.NAME);
    }

    private groupFetterIcon:eui.Group;  //羁绊图标
    private lblName:eui.Label;          //羁绊名称
    private lblDes:eui.Label;           //羁绊描述
    // private lblCompose:eui.Label;       //羁绊组成

    private cardFetterView:CardFetterView;  //羁绊图标视图

    protected week():void{
        var self =this;
        
        var data = super.getData();
        if(data==null)
            return;
        var name:string = data.name;
        self.setName(name);
        self.setDesc(data);
        
        // self.setCompose(compose,cname);
        var fdata = data.fdata;
        self.setFetterIcon(fdata);
    }

    protected sleep():void{
        var self = this;
        if(self.cardFetterView!=null){
            self.cardFetterView.parent.removeChild(self.cardFetterView);
            self.cardFetterView = null;
        }
    }

    //设置名称
    private setName(data:string):void{
        var str:string = (data==null||data==undefined)?"":data;
        this.lblName.text = str;
    }

    //设置名称
    private setDesc(data:any):void{
        if(data==null)
            return;

        var desc:string = data.desc;
        var cname:string =data.cname;
        var compose:string = data.compose;

        var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);

        var arrTextFlow:Array<any> = new Array<any>();
        // arrTextFlow.push({text: "效果:", style: {textColor:0x8bc2d5}});
        arrTextFlow.push({text: labelObj["lbl_0"], style: {textColor:0x8bc2d5}});
        arrTextFlow.push({text: desc+"\n", style: {textColor:0xffffff}});

        var self = this;
        var str:string = (compose==null||compose==undefined)?"":compose;
        if(str!=""&&cname!=""){
            var arr:Array<string> = compose.split(cname);
            // arrTextFlow.push({text: "组成:", style: {textColor:0x8bc2d5}});
            arrTextFlow.push({text: labelObj["lbl_1"], style: {textColor:0x8bc2d5}});
            if(arr.length>1){
                arrTextFlow.push({text:arr[0], style: {textColor:0xFFFFFF}});
                arrTextFlow.push({text:cname,style:{textColor:0xfced63}});
                arrTextFlow.push({text:arr[1]+"\n",style:{textColor:0xFFFFFF}});
            }else{
                arrTextFlow.push({text:str+"\n",style:{textColor:0xFFFFFF}});
            }
        }
        
        self.lblDes.textFlow = arrTextFlow;
        // self.lblDes.textFlow = [
        //     {text: "效果:", style: {textColor:0x8bc2d5}},
        //     {text: desc+"\n", style: {textColor:0xffffff}},
        //     {text: "组成:" + arr[0], style: {textColor:0x8bc2d5}},
        //     {text:cname,style:{"size":18,textColor:0xfced63}},
        //     {text:arr[1],style:{"size":18,textColor:0xFFFFFF}}];
        
    }

    //设置羁绊图标
    private setFetterIcon(data:Object):void{
        var self = this;
        var view:CardFetterView = new CardFetterView();
        view.initData(data);
        self.groupFetterIcon.addChild(view);
        view.scaleX = view.scaleY = 0.46;
        self.cardFetterView = view;
    }
}