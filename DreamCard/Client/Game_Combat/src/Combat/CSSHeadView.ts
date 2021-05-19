// TypeScript file
// TypeScript file
class CSSHeadView extends IBaseView{
    public static NAME:string = "CSSHeadSkin";

    public constructor(){
        super(CSSHeadView.NAME);
    }

    private imgHead:eui.Image;  //头像
    private imgHeadFrame:eui.Image;   //头像框
    private imgAttr:eui.Image;  //属性

    private labCardNameColor:number;
    private labCombatColor:number;

    private groupStar:eui.Group;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        var icon:string = data.icon;
        self.setCardHead(icon);
        var rarity:string = data.rarity;
        self.setCardHeadFrame(rarity);
        var element:string = data.element;
        self.setAttr(element);
        var lvl:number = data.level;
        self.setLvl(lvl);
    }

    protected sleep():void{
       
    }

    private cleanArray(arr:Array<IBaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i=arr.length-1;i>=0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }


    //设置头像
    private setCardHead(str:string):void{
        if(str == null || str == undefined)
        {
            return;
        }
        this.imgHead.source = "headImg0Sheet_json."+str;
    }
    //设置头像框 品质
    private setCardHeadFrame(data:string):void{
        switch(data){
            case "common":
                this.imgHeadFrame.source = "combatImg1Sheet_json.a82x82";
                break;
            case "rare":
                this.imgHeadFrame.source = "combatImg1Sheet_json.b82x82";
                break;
            case "epic":
                this.imgHeadFrame.source = "combatImg1Sheet_json.c82x82";
                break;
            case "legendary":
                this.imgHeadFrame.source = "combatImg1Sheet_json.d82x82";
                break;
            case "mythical":
                this.imgHeadFrame.source = "combatImg1Sheet_json.e82x82";
                break;
        }
        
    }


    //设置属性
    private setAttr(data:string):void{
        switch(data){
            case "metal":
                this.imgAttr.source = "combatImg1Sheet_json.a28x28";
                break;
            case "wood":
                this.imgAttr.source = "combatImg1Sheet_json.b28x28";
                break;
            case "water":
                this.imgAttr.source = "combatImg1Sheet_json.c28x28";
                break;
            case "fire":
                this.imgAttr.source = "combatImg1Sheet_json.d28x28";
                break;
            case "earth":
                this.imgAttr.source = "combatImg1Sheet_json.e28x28";
                break;
        }
        
    }


    //设置等级代数
    private setLvl(lvl:number):void{
        var lvlN:number = this.levelnumTo5lvl(lvl);
        for(var i:number=0;i<lvlN;i++){
            var img:eui.Image = new eui.Image();
            this.groupStar.addChild(img);
            img.source = "combatImg1Sheet_json.a15x15";
            img.width=8;
            img.height=8;
            img.x = i*8;
            img.y = 0;
        }
    }

    // 把level等级转化为1-5的星级，可多次使用
    private levelnumTo5lvl(levelnum:number):number{
        return ((levelnum-1)%5 + 1);
    }

}