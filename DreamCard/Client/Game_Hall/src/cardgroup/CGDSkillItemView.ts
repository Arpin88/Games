// TypeScript file
class CGDSkillItemView extends IBaseView{
    public static NAME:string = "CGDSkillItemSkin";

     public constructor(){
        super(CGDSkillItemView.NAME);
    }

    private imgBG:eui.Image;            //背景图片
    private groupSkillIcon:eui.Group;   //技能图标
    private groupSTextField:eui.Group;  //技能富文本层
    private lblDes:eui.Label;           //技能描述文本

    private skillTextField:egret.TextField; //技能富文本
    private cardSkillView:CardSkillView;    //技能图标视图
    
    private labelObj:any;   //语言包

    protected week():void{
        var self =this;
        
        var data = super.getData();
        if(data==null)
            return;
        var name:string = data.name;
        var level:number = data.level;
        var type:number = data.type;
        self.setSkillTextField(name,level,type);

        var des:string = data.desc;
        self.setDes(des);
        var fdata = data.fdata;
        self.setSkillIcon(fdata);

    }

    protected sleep():void{
        var self = this;
        if(self.skillTextField!=null){
            self.skillTextField.parent.removeChild(self.skillTextField);
            self.skillTextField = null;
        }

        if(self.cardSkillView!=null){
            self.cardSkillView.parent.removeChild(self.cardSkillView);
            self.cardSkillView = null;
        }
    }

    //设置技能富文本
    private setSkillTextField(name:string,level:number,type:number):void{
        var self = this;

        var nameStr:string = (name==null||name==undefined)?"":name;
        var levelStr:string = (level==null||level==undefined)?"LV.0":"LV."+level;
        type = (type==null||type==undefined)?2:type;
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);
        var typeStr:string = type==2?labelObj["lbl_0"]:labelObj["lbl_1"];
        // var typeStr:string = type==2?"被动技能":"主动技能";
        var typeStrColor:number = type==2?0x2dc1ff:0xff531e;

        var txt:egret.TextField = new egret.TextField();
        txt.textColor = 0xffffff;
        txt.size = 22;
        txt.stroke = 2;
        txt.strokeColor = 0x000000;
        self.groupSTextField.addChild(txt);
        txt.fontFamily="SimHei";
        txt.textFlow = [
              {text: nameStr+"   "+levelStr+"   ", style: {textColor:0xffffff}},
              {text: typeStr, style: {textColor:typeStrColor}}
        ]
        self.skillTextField = txt;

        // var imgSoucePrefix:string = "";
        // var sourceObj = self.imgBG.source;
        // var arr:Array<string> = sourceObj.toString().split(".");
        // if(arr.length==2){
        //    imgSoucePrefix = arr[0];
        // }
        // var imgSource:string = type==2?imgSoucePrefix+".a98x140":imgSoucePrefix+".b98x140";
        // self.imgBG.source = imgSource;
    }

     //设置名称
    private setDes(data:string):void{
        var str:string = (data==null||data==undefined)?"":data;
        this.lblDes.text = str+"\n";
    }

    //设置技能图标
    private setSkillIcon(data:Object):void{
        var self = this;
        var view:CardSkillView = new CardSkillView();
        view.initData(data);
        self.groupSkillIcon.addChild(view);
        self.cardSkillView = view;
    }
}