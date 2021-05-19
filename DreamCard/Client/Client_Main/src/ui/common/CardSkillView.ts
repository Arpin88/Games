// TypeScript file
class CardSkillView extends IBaseView{
    public static NAME:string = "CardSkillSkin";

     public constructor(){
        super(CardSkillView.NAME);
    }

    private groupCSK:eui.Group;     //卡牌技能层
    private imgIcon:eui.Image;      //图标图片
    private imgBG:eui.Image;        //背景图片


    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        //icon level canTouch
        var icon:string = data.icon;
        self.setIcon(icon);
        var level:string = data.level;
        self.setLevel(level);
        var groupName:string = data.groupName;
        self.setGroupName(groupName);
        

        var canTouch:boolean = data.canTouch;
        canTouch= (canTouch==null||canTouch==undefined)?true:canTouch;
        self.groupCSK.touchEnabled = canTouch;
    }

    protected sleep():void{

    }

    //设置图标
    private setIcon(data:string):void{
       if(data == null || data == undefined || data== "") return;
       this.imgIcon.source = "skillSheet_json." +  data;
    //    this.imgIcon.scaleX = this.imgIcon.scaleY = 0.8;
    }

    //设置等级
    private setLevel(data:string):void{
        if (data == null || data == undefined|| data== "")
            return;
        this.imgBG.source = "skillCommonImg0Sheet_json.jineng" + data;
    }

    //设置层名称
    private setGroupName(data:string):void{
        let str:string = data==null||data==undefined?"":data.toString();
        this.groupCSK.name = data;
    }
}