// TypeScript file
class HorseRaceLamp{
    private static m_manager:HorseRaceLamp = new HorseRaceLamp();
    public static getInstance():HorseRaceLamp{
        return HorseRaceLamp.m_manager;
    }


    private objHorseRaceLamp:Array<Object> = new Array<Object>();
    private isHRL:boolean = false;

    private HorseM:any;
    private HorseBG:any;

    /**
     * 显示跑马灯效果
     * container 跑马灯显示载体，容器
     * txt 显示内容
     * offY 坐标Y轴 默认10
     * left 跑马灯左边边界，边界外不显示 mask为NULL时有效
     * right 跑马灯右边边界，边界外不显示 mask为NULL时有效
     * immediately 是否立即发动，默认为FALSE，等上一个跑完后播放下一个
     * mask 使用对象遮罩，使跑马灯显示在指定遮罩内
     * speed 速度 默认8000 即5秒
     * color 字体颜色 默认0xFFFFFF 白色
     * size 字体大小 默认18
     * wait 等待时间 默认1500
     * bold 是否粗体 默认FALSE
     * loop 是否循环播放
     */
    public showHorseRaceLamp(container:egret.DisplayObjectContainer, txt:string, offY:number = 10,
        left:number = 165, right:number = 100, immediately:boolean = false,speed:number = 10000,
        color:number = 0xFFFFFF, size:number = 20, bold:boolean = false,stroke:number = 2,wait:number=1500, mask:egret.DisplayObject | egret.Rectangle = null,
        loop:boolean = false):void {

        var obj:Object = new Object();
        obj["txt"] = txt;
        obj["offY"] = offY;
        obj["left"] = left;
        obj["right"] = right;
        obj["color"] = color;
        obj["speed"] = speed;
        obj["size"] = size;
        obj["stroke"] = stroke;
        obj["bold"] = bold;
        obj["container"] = container;
        obj["mask"] = mask;
        obj["wait"] = wait;
        obj["loop"] = loop;
        

        if(immediately) {
            this.OutHorseRaceLamp(obj);
        } else {
            this.objHorseRaceLamp.push(obj);
            if(!this.isHRL) {
                this.OutHorseRaceLamp();
            }
        }
    }


    /**
     * 关闭所有跑马灯，并删除
     */
    public closeHorseRaceLamp():void {
        if(this.HorseM && this.HorseM.parent)
            this.HorseM.parent.removeChild(this.HorseM);
        if(this.HorseBG) {
            egret.Tween.removeTweens(this.HorseBG);
            if(this.HorseBG.parent) {
                this.HorseBG.parent.removeChild(this.HorseBG);
            }
        }
        while(this.objHorseRaceLamp.length)
            this.objHorseRaceLamp.pop();
        this.isHRL = false;
    }

    private OutHorseRaceLamp(obj:Object = null):void {

        var cobj:Object = null;
        if(obj == null) {
            if(this.isHRL)
                return;
            if(this.objHorseRaceLamp.length == 0)
                return;
            cobj = this.objHorseRaceLamp.shift();
        } else {
            cobj = obj;
        }

        var textFlow:Array<egret.ITextElement> = cobj["textFlow"];
        var txt:string = cobj["txt"];
        var offY:number = cobj["offY"];
        var left:number = cobj["left"];
        var right:number = cobj["right"];
        var speed:number = cobj["speed"];
        var color:number = cobj["color"];
        var size:number = cobj["size"];
        var bold:boolean = cobj["bold"];
        var stroke:number = cobj["stroke"];
        var container:egret.DisplayObjectContainer = cobj["container"];
        var mask:egret.DisplayObject | egret.Rectangle = cobj["mask"];
        var wait:number = cobj["wait"];
        var loop:boolean = cobj["loop"];
        

        if(loop) {
            this.objHorseRaceLamp.push(cobj);
        }

        if(!container)
            return;
        if (!container.stage) {
            egret.Tween.get(container).wait(1000).call(function () {
                this.OutHorseRaceLamp(null);
            }, this, null);
            return;
        }
        
        var lab:eui.Label = new eui.Label();
        lab.x = 0;
        lab.y = 0;
        lab.touchEnabled = false;
        if(textFlow == undefined) {
            lab.fontFamily = "SimHei";
            lab.size = size;
            lab.textColor = color;
            lab.bold = bold;
            lab.text = txt;
            lab.stroke = stroke;
        } else {
            lab.textFlow = textFlow;
        }

        var bg:egret.Sprite = new egret.Sprite();
        bg.graphics.beginFill(0, 0);
        bg.addChild(lab);
        bg.graphics.drawRect(0, 0, lab.width, lab.height);
        bg.y = offY;
        bg.x = container.stage.stageWidth;
        bg.touchEnabled = false;
        bg.mask = mask;

        var m:eui.Rect = null;
        if(mask == null && left != 0 && right != 0)
        {
            m = new eui.Rect();
            m.left = left;
            m.right = right;
            m.height = lab.height;
            m.fillColor = 0;
            m.y = offY;
            bg.mask = m;
            m.y = offY;
            container.addChild(m);
            if(this.HorseM && this.HorseM.parent)
                this.HorseM.parent.removeChild(this.HorseM);
            this.HorseM = m;

        }

        container.addChild(bg);
        if(this.HorseBG && this.HorseBG.parent)
            this.HorseBG.parent.removeChild(this.HorseBG);
        this.HorseBG = bg;

        if(obj == null)
            this.isHRL = true;
        
        var showWidth:number = container.width-left-right;
        var toX:number = lab.width>showWidth?showWidth+left-lab.width:left;
        var moveTWidth = container.width+lab.width + 20;
        var toSpeed = speed*(container.width-toX + left)/moveTWidth;
        toSpeed = toSpeed>speed?speed/2:toSpeed;
        egret.Tween.get(bg).to({x:toX},toSpeed).wait(wait).to({x:0 - lab.width - 20}, speed-toSpeed).call(
            function(bg:egret.Sprite, m:egret.Shape, b:boolean):void {
                if(bg.parent){
                    bg.parent.removeChild(bg);
                    this.HorseBG = null;
                }
                if(b) {
                    this.isHRL = false;
                    this.OutHorseRaceLamp(null);
                }
                if(m && m.parent) {
                    m.parent.removeChild(m);
                    this.HorseM = null;
                }
            }
            , this, [bg, m, obj == null ? true : false]);
    }

}