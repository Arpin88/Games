// TypeScript file
class CSHeadView extends BaseView{
    public static NAME:string = "CSHeadSkin";

    public constructor(){
        super(CSHeadView.NAME);
    }

    private groupCardHead:eui.Group;
    private imgHead:eui.Image;  //头像
    private imgHeadFrame:eui.Image;   //头像框
    private labCardName:eui.Label;  //名称
    private imgAttr:eui.Image;  //属性


    private GroupStar:eui.Group;
    private labGene:eui.Label;

    private prbExp:eui.ProgressBar;
    // private imgCurExp:eui.Image;
    // private imgMaxExp:eui.Image;
    private labExp:eui.Label;
    private labLvlChange:eui.Label;

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        self.updateData(data);
    }

    protected sleep():void{

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

    //设置名称
    private setCardName(str:string):void{
        this.labCardName.text = str;
    }


    //设置等级代数
    private setLvl(lvl:number,gene:number):void{
        // var star:number = lvl%5;
        // if(star == 0)
        //     star = 5;
        var self = this;
        if(self.GroupStar.numChildren>0){
            for(var i:number=self.GroupStar.numChildren-1;i>=0;i--){
                self.GroupStar.removeChildAt(i);
            }
        }
        var lvlN:number = self.levelnumTo5lvl(lvl);
        for(var i:number=0;i<lvlN;i++){
            var img:eui.Image = new eui.Image();
            self.GroupStar.addChild(img);
            img.source = "combatImg1Sheet_json.a15x15";
            img.x = i*15;
            img.y = 0;
        }
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);
        self.labGene.text = gene+labelObj["lbl_2"];//"代";

        var totalWidth:number = self.labGene.width+15*lvlN;
        var generationX:number = Number((self.groupCardHead.width/2-totalWidth/2).toFixed(2));

        self.labGene.x = generationX;
        self.GroupStar.x = generationX+self.labGene.width;
    }

    // 把level等级转化为1-5的星级，可多次使用
    private levelnumTo5lvl(levelnum:number):number{
        return ((levelnum-1)%5 + 1);
    }

    //设置经验条
    private setExpPrb(expPercent:number):void{
        // this.imgCurExp.width = this.imgMaxExp.width*expPercent;
        this.prbExp.value = expPercent*100;
        // this.imgCurExp.width = 50;
        // var a = 0;
    }

    //设置经验变化
    private setExpChange(changeExp:number):void{
        if(changeExp == null || changeExp == undefined||changeExp==0){
            this.labExp.visible = false;
            return;
        }
        this.labExp.visible = true;
        var str = changeExp>0?"+"+changeExp:changeExp;
        this.labExp.text = "EXP"+str;
    }

    //设置等级变化
    private setLvlChange(index:number):void{
        switch(index){
            case 0:
                this.labLvlChange.visible = false;
                break;
            case 1:
                this.labLvlChange.visible = true;
                var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);
                this.labLvlChange.text = labelObj["lbl_0"];//"降星";
                break;
            case 2:
                this.labLvlChange.visible = true;
                var labelObj:any = LanguageManager.getInstance().getLabelLanguage(this);
                this.labLvlChange.text = labelObj["lbl_1"];//"升星";
                break;
        }
    }

    public updateData(data:any):void{
        var self = this;
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
        var expPercent:number = data.expPercent;
        self.setExpPrb(expPercent);
        var expChange:number = data.expChange;
        self.setExpChange(expChange);
        var lvlChange:number = data.lvlChange;
        self.setLvlChange(lvlChange);
    }
    
    public getViewHeight():number{
        return this.groupCardHead.height;
    }

    public getViewWidth():number{
        return this.groupCardHead.width;
    }
}