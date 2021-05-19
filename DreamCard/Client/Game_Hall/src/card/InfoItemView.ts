// TypeScript file
class InfoItemView extends BaseView{
    public static NAME:string = "InfoItemSkin";

     public constructor(){
        super(InfoItemView.NAME);
    }

    private imgSys:eui.Image;
    private groupPI:eui.Group;
    private imgPoint:eui.Image;
    private labInfoName:eui.Label;
    private labInfoDesc:eui.Label;
    private huodongTxt:string = "【活动】";
    private xiongTxt:string = "【系统】";

    protected week():void{
        var self =this;
        
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.huodongTxt = "[Activity]";
            self.xiongTxt = "[System]";
        }

        var data = super.getData();
        if(data==null)
            return;
        var name:string = data.tittle;
        var issys:number = data.issys;
        var desc:string = data.disc;

        if(tp == 1){
            name = data.tittleEn;
            desc = data.discEn;
        }
        self.setName(name,issys);
        
        self.setDisc(desc);
        
      //  self.setInfoIcon(issys);
        var ispoint:number = data.ispoint;
        self.setInfoPoint(ispoint);
    }

    protected sleep():void{
        
    }

    private setInfoIcon(issys:number):void{
      if(issys == 0){
          this.imgSys.source = "hallText0Sheet_json.hd";
      }else{
          this.imgSys.source = "hallText0Sheet_json.xitong2";
      } 
    }

    private setInfoPoint(ispoint:number):void{
      if(ispoint == 0){
          this.imgPoint.$setVisible(false);
      }else{
          this.imgPoint.$setVisible(true);
      } 
    }

    private setDisc(str:string):void{
      this.labInfoDesc.text = str;
        
    }
    private setName(str:string,issys:number):void{
        if(issys == 0){
          this.labInfoName.text = this.huodongTxt + str;
          this.labInfoName.textColor = 0x6fe9ff;
      }else{
          this.labInfoName.text = this.xiongTxt + str;
          this.labInfoName.textColor = 0xFFD76A;
      } 
    }


    //设置层级name
    public setGroupName(str:string):void{
        this.groupPI.name = str;
    }
    
    //返回视图宽度
    public getViewWidth():number{
        return this.groupPI.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupPI.height;
    }
}