// TypeScript file
class CardSquareView extends IBaseView{
    public static NAME:string = "CardSquareSkin";

     public constructor(){
        super(CardSquareView.NAME);
    }

    private groupCS:eui.Group;          //正方形卡牌层
    private imgBG:eui.Image;            //背景图片
    private imgIcon:eui.Image;          //图标图片
    private imgRarity:eui.Image;        //稀有度图片
    private imgElement:eui.Image;       //五行图片

    private imgCostBG:eui.Image;        //cost背景图片
    private bitRound:eui.BitmapLabel;   //回合图片文本
    private bitCost:eui.BitmapLabel;    //Cost图片文本

    // private lblName:eui.Label;          //名称文本
    private imgName:eui.Image;          //名称图片
    // private lblCost:eui.Label;          //Cost文本
    private imgGeneration:eui.Image;    //代数图片
    // private groupLevel:eui.Group;       //等级层
    private imgChoose:eui.Image;        //选中图片
    // private imgLv1:eui.Image;           //等级星星图片
    // private imgLv2:eui.Image;
    // private imgLv3:eui.Image;
    // private imgLv4:eui.Image;
    // private imgLv5:eui.Image;
    // private imgLv6:eui.Image;

    private bitAtk:eui.Label;           //攻击力图片文本
    private bitHp:eui.Label;            //血量图片文本

    private groupCSB:eui.Group;     //正方形卡牌背面层

    private curRound:number;        //当前回合
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
        //icon rarity element round generation name cost atk hp
        var icon:string = data.icon;
        self.setIcon(icon);
        self.setName(icon);
        var rarity:string = data.rarity;
        self.setRarity(rarity);
        var element:string = data.element;
        self.setElement(element);
        var att:number = data.att;
        self.setRound(att);
        var generation:number = data.generation;
        self.setGeneration(generation);
        // var level:number = data.level;
        // self.setLevel(level);
        var star:number = data.star;
        self.setStar(star);
        // var name:string = data.name;
        // self.setName(name);
        var cost:number = data.cost;
        self.setCost(cost);
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
        self.groupCS.touchEnabled = canTouch;

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
        self.groupCS.visible = visible;
        self.groupCSB.visible = !visible;
    }

    public showSimple():void{
        // this.flag.$setVisible(false);     
        // this.imgRound.$setVisible(false);        //回合图片
        this.imgElement.$setVisible(false);      //五行图片
        this.bitRound.$setVisible(false);       //回合文本

       // this.lblName.$setVisible(false);      //名称文本
        this.bitCost.$setVisible(false);          //Cost文本
        this.imgGeneration.$setVisible(false);    //代数图片
        // this.groupLevel.$setVisible(false);     //等级层
        this.bitAtk.$setVisible(false);
        this.bitHp.$setVisible(false);
    }

    //设置图标
    private setIcon(data:string):void{
        let str:string  = data==null||data==undefined?"":data.toString();
        this.imgIcon.source = str+"_json.s";
    }

    //设置稀有度
    private setRarity(data:string):void{
        if(data==null||data==undefined)
            return;
        var str:string = "1";
        var strbg = "5";
        switch(data){
            case "common":
                str="1";
                strbg = "5";
            break;
            case "rare":
                str="2";
                strbg = "2";
            break;
            case "epic":
                str="3";
                strbg = "3";
            break;
            case "legendary":
                str="4";
                strbg = "4";
            break;
            case "mythical":
                str="5";
                strbg = "1";
            break;
        }
        var self = this;
        self.imgRarity.source = "cardCommonImg0Sheet_json.s_rb"+str;
        // self.imgRound.source = "cardCommonImg0Sheet_json.s_r"+str;
        self.imgCostBG.source = "cardCommonImg2Sheet_json.s_ecb"+str;
        self.imgBG.source = "cardCommonImg2Sheet_json.s_eb"+strbg;
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
        self.imgElement.source = "cardCommonImg2Sheet_json.s_e"+str;
       // self.imgBG.source = "cardCommonImg2Sheet_json.s_eb"+str;
    }
    
    //设置代数
    public setGeneration(data:number):void{
        let str:string  = data==null||data==undefined?"":"cardCommonText0Sheet_json.s_g"+data.toString();
        this.imgGeneration.source = str;
    }

    //设置回合
    private setRound(data:number):void{
        let num:number  = data==null||data==undefined?0:data;
        var self = this;

        if(self.curRound==null||self.curRound==undefined)
            self.curRound = num;

        self.bitRound.text = num.toString();
    }

    // //设置星级
    // public setLevel(data:number):void{
    //     let num:number = data==null||data==undefined?0:data;
    //     num = (num-1)%5 + 1;
    //     var self = this;
    //     // var showCount:number = 0;
    //     for(var i:number=1;i<=5;i++){
    //         var show:boolean = num>=i;
    //         self["imgLv"+i].visible = show;
    //     }
    // }

    //设置星级
    public setStar(data:number):void{
        let num:number = data==null||data==undefined?0:data;
        var self = this;
        for(var i:number=1;i<=5;i++){
            var show:boolean = num>=i;
            self["imgStar"+i].visible = show;
        }
    }

    //设置名称
    private setName(data:string):void{
        // let str:string = name==null||name==undefined?"":name.toString();
        let str:string = data==null||data==undefined?"":"nameImg0Sheet_json."+data;
        this.imgName.source = str;
    }


    //设置Cost
    private setCost(data:number):void{
        let str:string = data==null||data==undefined?"0":data.toString();
        this.bitCost.text = str;
    }

    //设置攻击力
    public setAtk(data:number):void{
        let str:string = data==null||data==undefined?"0":data.toString();
        this.bitAtk.text = str;
    }

    //设置血量
    public setHp(data:number):void{
        var self = this;
        self.curHp = data;
        let str:string = data==null||data==undefined?"0":data.toString();
        self.bitHp.text = str;
    }

    //设置层名称
    private setGroupName(data:string):void{
        let str:string = data==null||data==undefined?"":data.toString();
        this.groupCS.name = str;
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
            if(item instanceof eui.Image||item instanceof eui.BitmapLabel){
                self.setImgColor(item,colorMatrix);
            }else{
                self.setViewColor(item,grey);
            }
        }
    }

    //设置图片为灰色
    private setImgColor(component: egret.DisplayObject,colorMatrix:any) {
        if(component==null)
            return;
        
        if(colorMatrix!=null){
            let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            component.filters = [colorFilter];
        }else{
            component.filters = [];
        }
    }

    //外部接口改变视图颜色
    public changeViewColor(grey:boolean):void{
        var self = this;
        self.setViewColor(self,grey);
    }

    //外部调用减少回合接口*返回当前回合
    public reduceRound():number{
        var self = this;
        if(self.curRound>0){
            self.curRound--;
            self.setRound(self.curRound);
        }
        return self.curRound;
    }

    //返回当前回合
    public getCurRound():number{
        return this.curRound;
    }

    //外部调用设置选中状态
    public setChoose(choose:boolean = false):void{
        this.imgChoose.visible = choose;
    }

    //返回视图宽度
    public getViewWidth():number{
        return this.groupCS.width;
    }

    //返回视图高度
    public getViewHeight():number{
        return this.groupCS.height;
    }

}