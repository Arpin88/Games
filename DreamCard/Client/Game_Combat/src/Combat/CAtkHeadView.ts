// TypeScript file
class CAtkHeadView extends IBaseView implements ExpFromImpl{ 
    public static NAME:string = "CAtkHeadSkin";

     public constructor(){
        super(CAtkHeadView.NAME);
    }

    private groupBack:eui.Group;        //后面层
    private groupHead:eui.Group;        //头像层
    private groupFront:eui.Group;       //前面层

    private groupHp:eui.Group;      //血条层
    private imgHp:eui.Image;        //血条图片

    private groupIcon:eui.Group;    //头像层
    private imgIcon:eui.Image;      //头像图片

    private lblHp:eui.Label;        //血量文本
    private lblLv:eui.Label;        //等级文本
    private lblName:eui.Label;      //名称文本
    private lblPower:eui.Label;     //战力文本

    private groupFetter0:eui.Group; //羁绊层
    private groupFetter1:eui.Group;
    private groupFetter2:eui.Group;
    private groupFetter3:eui.Group;
    
    private origHp:number;      //原本血量
    private curHp:number;       //当前血量

    private iconMaskShape:egret.Shape;  //头像圆形遮罩;
    private hpMaskShape:egret.Shape;  //头像圆形遮罩;

    private ticket:string;  //用户ticket

    protected week():void{
        var self = this;
        self.setImgMask();

        var data = super.getData();
        if(data==null)
            return;
        
        var name:string = data.name;
        self.setName(name);
        var hp:number = data.hp;
        self.origHp = hp;
        var leftHp:number = data.leftHp;
        self.setHp(leftHp);
        var lv:number = data.lv;
        self.setLv(lv);
        var power:number = data.power;
        self.setPower(power);
        var ticket:string = data.ticket;
        self.ticket = ticket;

        var iconUrl:string = data.iconUrl;
        iconUrl = iconUrl==null||iconUrl==""?"headicon_json.head_01":iconUrl;
        self.imgIcon.source = iconUrl;
        // if(iconUrl!=null&&iconUrl!=""){
        //     var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        //     egret.ImageLoader.crossOrigin = "anonymous";
        //     imgLoader.load(iconUrl);
        //     imgLoader.once(egret.Event.COMPLETE, self.onLoadImgCompleteHandler, self);
        //     imgLoader.once(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent){
        //     console.log("加载网络图片:"+iconUrl+" 出现错误!")},self);
        // }

        // self.setViewColor(self,true);
    }

    protected sleep():void{
        var self = this;

        if(self.iconMaskShape!=null){
            self.iconMaskShape.parent.removeChild(self.iconMaskShape);
            self.iconMaskShape = null;
        }

        if(self.hpMaskShape!=null){
            self.hpMaskShape.parent.removeChild(self.hpMaskShape);
            self.hpMaskShape = null;
        }

        self.origHp = null;
    }

    //设置图片的遮罩
    private setImgMask():void{
        var self = this;
        //血条圆形遮罩
        var hpMaskShape = new egret.Shape();
        hpMaskShape.graphics.beginFill( 0x000000);
        var width:number = self.imgHp.width/2;
        var height:number = self.imgHp.height/2;
        hpMaskShape.x = width;
        hpMaskShape.y = height;
        hpMaskShape.rotation = -90;
        hpMaskShape.graphics.drawCircle( 0,  0,  height);
        hpMaskShape.graphics.endFill();
        self.groupHp.addChild(hpMaskShape);
        self.hpMaskShape = hpMaskShape;
        self.imgHp.mask = hpMaskShape;

        //头像圆形遮罩
        var iconMaskShape = new egret.Shape();
        iconMaskShape.graphics.beginFill( 0x000000);
        width = self.imgIcon.width/2;
        height = self.imgIcon.height/2;
        iconMaskShape.x = width;
        iconMaskShape.y = height;
        iconMaskShape.graphics.drawCircle( 0, 0,  width);
        iconMaskShape.graphics.endFill();
        self.groupIcon.addChild(iconMaskShape);
        self.iconMaskShape = iconMaskShape;
        self.imgIcon.mask = iconMaskShape;

    }

    //设置HP进度条值 0-1 
    private setHpProgressBar(value:number):void{
        var self = this;
        if(self.hpMaskShape==null)
            return;
        var shape = self.hpMaskShape;
        var angle:number = (1-value)*360;
        if(value==1)
            angle = 360;
        else if(value==0)
            angle = 0;
        shape.graphics.clear();
        shape.graphics.beginFill(0x000000);
        var height:number = self.imgHp.height/2;
        shape.graphics.moveTo(0,0);
        shape.graphics.lineTo(height,0);
        shape.graphics.drawArc( 0,  0,  height, 0, angle*Math.PI/180,true);
        shape.graphics.lineTo(0,0);
        shape.graphics.endFill();
    }

    //设置名称
    private setName(name:string):void{
        var str:string = name==null||name==undefined? "":name;
        this.lblName.text = str;
    }

    //设置血量
    private setHp(num:number):void{
        var self = this;
        var str:string = num==null||num==undefined? "0":num.toString();
        self.lblHp.text = `HP:`+str;
        self.curHp = num;
        self.setHpProgressBar(num/self.origHp);
    }

    //设置等级
    private setLv(num:number):void{
        var str:string = num==null||num==undefined? "0":num.toString();
        this.lblLv.text = str;
    }

    //设置战力
    private setPower(num:number):void{
        var str:string = num==null||num==undefined? "0":num.toString();
        this.lblPower.text = str;
    }

    //当load网络图片完成事件
    private onLoadImgCompleteHandler(evt: egret.Event): void {
        if (evt.currentTarget.data) {
            var self = this;
            // egret.log("加载头像成功: " + evt.currentTarget.data);
            let texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            let bitmap = new egret.Bitmap(texture);
            bitmap.x = 0;
            bitmap.y = 0;
            bitmap.width = self.imgIcon.width;
            bitmap.height = self.imgIcon.height;
            self.groupIcon.addChild(bitmap);
            self.imgIcon.visible = false;
        }
    }

    private getFetterParent():eui.Group{
        var self = this;
        if(self.groupFetter0.numChildren<=0)
            return self.groupFetter0;
        else if(self.groupFetter1.numChildren<=0)
            return self.groupFetter1;
        else if(self.groupFetter2.numChildren<=0)
            return self.groupFetter2;
        else
            return self.groupFetter3;
    }

    // //损失血量
    // private lossHp(num:number):void{
    //     var self = this;
    //     var curHp = self.curHp-num;
    //     curHp = curHp<=0?0:curHp;
    //     self.setHp(curHp);
    // }

    // //补充血量
    // private gainHp(num:number):void{
    //     var self = this;
    //     var curHp = self.curHp+num;
    //     curHp = curHp>=self.origHp?self.origHp:curHp;
    //     self.setHp(curHp);
    // }

    //设置伤害
    public setDamage(damage:number):void{
        var self = this;
        var curHp = self.curHp+damage;
        curHp = curHp>=self.origHp?self.origHp:curHp;
        curHp = curHp<=0?0:curHp;
        self.setHp(curHp);
    }

    public getTicket():string{
        return this.ticket;
    }

    public getHp():number{
        return this.curHp;
    }

    public fightExpForm:FightExpForm;
    //返回父类根据深度
    public getParentByZIndex(zIndex:number):egret.DisplayObjectContainer{
        return zIndex!=-1?this.groupFront:this.groupBack;
    }
    //返回父类根据类型
    public getParentByType(type:number):egret.DisplayObjectContainer{
        var self = this;
        var group:eui.Group = self.groupFront;
        switch(type){
            case 0:
            group = self.groupBack;
            break;
            case 1:
            group = self.groupFront;
            break;
            case 2:
            group = self.getFetterParent();
            break;
            default:
            group = self.groupFront;
            break;
        }
        return group;
    }
    //返回战斗表现
    public getFightExpForm():FightExpForm{
        var self = this;
        if(self.fightExpForm==null)
            self.fightExpForm = new FightExpForm(self);
        return self.fightExpForm;
    }
}