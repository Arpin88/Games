// TypeScript file
// TypeScript file
class CardHeadView extends BaseView{
    public static NAME:string = "CardHeadViewSkin";

     public constructor(){
        super(CardHeadView.NAME);
    }

    private imgHead:eui.Image;  //头像
    private imgHeadFrame:eui.Image;   //头像框
    private labCardName:eui.Label;  //名称
    private labCombat:eui.Label;  //战力
    private zhanlitxt:eui.Label;  
    
    private imgAttr:eui.Image;  //属性

    // private labCardNameColor:number;
    // private labCombatColor:number;

    // private imgLvl:eui.Image;
    private groupLevel:eui.Group;
    private labGene:eui.Label;

    protected week():void{
        // var self = this;
        // self.labCardNameColor = 0xffffff;
        // self.labCombatColor = 0xffc000;
        // self.labCardName.textColor = self.labCardNameColor;
        // self.labCombat.textColor = self.labCombatColor;
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
        var gene:number = data.generation;
        self.setLvl(lvl,gene);
        var name:string = data.name;
        self.setCardName(name);
        var combat:number = data.combat;
        self.setCombat(combat);
        self.showSimple();
    }

    public showSimple():void{
        this.labGene.$setVisible(false);
        this.groupLevel.$setVisible(false);
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

    public setGrayHead():void{
        this.labCardName.textColor  = 0xb0b0b0;
        this.zhanlitxt.textColor  = 0xb0b0b0;
        ExternalFun.prototype.setImgGray(this.imgHeadFrame);
        ExternalFun.prototype.setImgGray(this.imgAttr);
        ExternalFun.prototype.setImgGray(this.imgHead);
        
    }

    //设置头像框 品质
    private setCardHeadFrame(data:string):void{
        switch(data)
        {
            case "common":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_0";
                break;
            case "rare":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_1";
                break;
            case "epic":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_2";
                break;
            case "legendary":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_3";
                break;
            case "mythical":
                this.imgHeadFrame.source = "combatRecordSheet_json.a86x86_4";
                break;
        }
    }


    //设置属性
    private setAttr(data:string):void{
        switch(data)
        {
            case "fire":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_0";
                break;
            case "metal":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_1";
                break;
            case "wood":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_2";
                break;
            case "water":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_3";
                break;
            case "earth":
                this.imgAttr.source = "combatRecordSheet_json.a28x28_4";
                break;
        }
        
    }

    //设置名称
    private setCardName(str:string):void{
        this.labCardName.text = str;
    }

    //设置战力
    private setCombat(index:number):void{
        this.labCombat.text = "" + index;
    }


    //设置等级代数
    private setLvl(lvl:number,gene:number):void{
        for(var i:number=0;i<lvl;i++){
            var img:eui.Image = new eui.Image();
            this.groupLevel.addChild(img);
            img.source = "combatRecordSheet_json.a15x15_1";
            img.x = i*15;
            img.y = 0;
        }
        this.labGene.text = gene+"代";
    }
}