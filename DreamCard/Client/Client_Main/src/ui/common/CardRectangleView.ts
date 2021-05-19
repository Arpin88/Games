// TypeScript file
class CardRectangleView extends IBaseView{
    public static NAME:string = "CardRectangleSkin";

     public constructor(){
        super(CardRectangleView.NAME);
    }

    private groupCR:eui.Group;          //长方形卡牌层
    private imgBG:eui.Image;            //背景图片
    private imgIcon:eui.Image;          //图标图片
    private imgRarity:eui.Image;        //稀有度图片
    private levelbg:eui.Image; 
    private imgElement:eui.Image;       //五行图片
    private lblRound:eui.Label;         //回合文本
    private lblName:eui.Label;          //名称文本
    private imgGeneration:eui.Image;    //代数图片
    private groupLevel:eui.Group;       //等级层
    private imgChoose:eui.Image;        //选中图片
    // private imgLv1:eui.Image;           //等级星星图片
    // private imgLv2:eui.Image;
    // private imgLv3:eui.Image;
    // private imgLv4:eui.Image;
    // private imgLv5:eui.Image;
    // private imgLv6:eui.Image;

    private lblAtk:eui.Label;           //攻击力文本
    private lblHp:eui.Label;            //血量文本

    private groupCRB:eui.Group;     //长方形卡牌背面层

    private curRound:number;    //当前回合
    private origHp:number;      //原本血量
    private curHp:number;       //当前血量

    protected week():void{
        var self = this;
        var data = super.getData();
        if(data==null)
            return;
        var arr:Array<any> = Object.keys(data);
        if(arr.length<=0){
            self.setVisible(false);
            return;
        }
        //icon rarity element round generation level name atk hp
        var icon:string = data.icon;
        self.setIcon(icon);
        var rarity:string = data.rarity;
        self.setRarity(rarity);
        var element:string = data.element;
        self.setElement(element);
        var att:number = data.att;
        self.setRound(att);
        var generation:number = data.generation;
        self.setGeneration(generation);
        var level:number = data.level;
        self.setLevel(level);
        var name:string = data.name;
        self.setName(name);
        var atk:number = data.atk;
        self.setAtk(atk);

        var hp:number = data.hp;
        self.origHp = data.origHp!=null?data.origHp:hp;
        self.curHp = data.curHp!=null?data.curHp:hp;
        self.setHp(self.curHp);
        
        var groupName:string = data.groupName;
        self.setGroupName(groupName);

        var canTouch:boolean = data.canTouch;
        canTouch= (canTouch==null||canTouch==undefined)?true:canTouch;
        self.groupCR.touchEnabled = canTouch;

        var visible:boolean = data.visible;
        visible= (visible==null||visible==undefined)?true:visible;
        self.setVisible(visible);

        var grey:number = data.grey;
        if(grey!=null&&grey==1)
            self.setViewColor(self,true);

        self.setChoose(false);
    }

    protected sleep():void{

    }

    //设置显示背面还是正面
    private setVisible(visible:boolean):void{
        var self = this;
        self.groupCR.visible = visible;
        self.groupCRB.visible = !visible;
    }

    public showSimple():void{

        // this.imgRarity.$setVisible(false);      //稀有度图片
       // this.imgRound.$setVisible(false);        //回合图片
        this.imgElement.$setVisible(false);      //五行图片
        this.lblRound.$setVisible(false);       //回合文本
       // this.lblName.$setVisible(false);      //名称文本
      //  this.lblCost.$setVisible(false);          //Cost文本
        this.imgGeneration.$setVisible(false);    //代数图片
        this.groupLevel.$setVisible(false);     //等级层
        this.lblAtk.$setVisible(false);
        this.lblHp.$setVisible(false);
        this.imgChoose.$setVisible(false);
    }

    //设置图标
    private setIcon(data:string):void{
        let str:string  = data==null||data==undefined?"":data.toString();
        this.imgIcon.source = str+"_json.r";
    }

    //设置稀有度
    private setRarity(data:string):void{
        if(data==null||data==undefined)
            return;
        var str:string = "1";
        switch(data){
            case "common":
                str="1";
            break;
            case "rare":
                str="2";
            break;
            case "epic":
                str="3";
            break;
            case "legendary":
                str="4";
            break;
            case "mythical":
                str="5";
            break;
        }
        this.imgRarity.source = "cardCommonImg1Sheet_json.r_rb"+str;
    }

    //设置五行
    private setElement(data:string):void{
        if(data==null||data==undefined)
            return;
        var str:string = "1";
        switch(data){
            case "metal":
                str="1";
            break;
            case "wood":
                str="2";
            break;
            case "water":
                str="3";
            break;
            case "fire":
                str="4";
            break;
            case "earth":
                str="5";
            break;
        }
        var self = this;
        self.imgElement.source = "cardCommonImg2Sheet_json.r_e"+str;
        self.imgBG.source = "cardCommonImg2Sheet_json.r_eb"+str;
    }
    
    //设置代数
    private setGeneration(data:number):void{
        let str:string  = data==null||data==undefined?"1":data.toString();
        this.imgGeneration.source = "cardCommonText0Sheet_json.r_g"+str;
    }

    //设置回合
    private setRound(data:number):void{
        let num:number  = data==null||data==undefined?0:data;
        var self = this;

        if(self.curRound==null||self.curRound==undefined)
            self.curRound = num;

        self.lblRound.text = num.toString();
    }

    //设置星级
    private setLevel(data:number):void{
        let num:number = data==null||data==undefined?0:data;
        num = (num-1)%5 + 1;
        var self = this;
        var showCount:number = 0;
        for(var i:number=1;i<=6;i++){
            var show:boolean = num>=i;
            self["imgLv"+i].visible = show;
            if(show)
                showCount++;
        }
        var generationWidth:number = self.imgGeneration.width;
        var starWidth:number = self["imgLv1"].width;
        var totalWidth:number = generationWidth+showCount*starWidth;
        var generationX:number = Number((self.groupLevel.width/2-totalWidth/2).toFixed(2));
        self.imgGeneration.x = generationX;
        for(var i:number=1;i<=6;i++){
            self["imgLv"+i].x = generationX+generationWidth+starWidth*(i-1);
        }
    }

    //设置名称
    private setName(name:string):void{
        let str:string = name==null||name==undefined?"":name.toString();
        this.lblName.text = str;
    }
    
    //设置攻击力
    public setAtk(data:number):void{
        let str:string = data==null||data==undefined?"0":data.toString();
        this.lblAtk.text = str;
    }

    public getAtk():number{
        return Number(this.lblAtk.text);;
    }

    //设置血量
    public setHp(data:number):void{
        var self = this;
        self.curHp = data;
        let str:string = data==null||data==undefined?"0":data.toString();
        self.lblHp.text = str;
    }

    //返回血量
    public getHp():number{
        return this.curHp;
    }

    //设置层名称
    private setGroupName(data:string):void{
        let str:string = data==null||data==undefined?"":data.toString();
        this.groupCR.name = str;
    }

    //设置视图为灰色
    private setViewColor(view:any,grey:boolean){
        var self = this;

        //灰色颜色矩阵数组
        var colorMatrix = null;
        if(grey){
            colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        }

        for(var i:number=0,lengthI:number = view.numChildren;i<lengthI;i++){
            var item= view.getChildAt(i);
            if(item==null)
                continue;
            if(item instanceof eui.Image){
                self.setImgColor(item,colorMatrix);
            }else{
                self.setViewColor(item,grey);
            }
        }
    }

    //设置图片为灰色
    private setImgColor(image: eui.Image,colorMatrix:any) {
        if(image==null)
            return;
        
        if(colorMatrix!=null){
            let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            image.filters = [colorFilter];
        }else{
            image.filters = [];
        }
    }

    //外部接口改变视图颜色
    public changeViewColor(grey:boolean):void{
        var self = this;
        self.setViewColor(self,grey);
    }

    //外部调用减少回合接口
    public reduceRound():void{
        var self = this;
        self.curRound--;
        self.setRound(self.curRound);
    }

    //外部调用设置伤害
    public setDamage(damage:number):void{
        var self = this;
        var curHp = self.curHp+damage;
        curHp = curHp>=self.origHp?self.origHp:curHp;
        curHp = curHp<=0?0:curHp;
        self.setHp(curHp);
    }

    //外部调用修改生命上限
    public modifyLimitHp(hp:number):void{
        var self = this;
        self.origHp += hp;
    }

    //外部调用修改生命上限
    public modifyAtk(atk:number):void{
        var self = this;
        var curAtk:number = Number(self.lblAtk.text);
        curAtk+=atk;
        self.setAtk(curAtk);
    }

    //外部调用设置选中状态
    public setChoose(choose:boolean = false):void{
        this.imgChoose.visible = choose;
    }

    //返回视图宽度
    public getViewWidth():number{
        return this.groupCR.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupCR.height;
    }

    
}