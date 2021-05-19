var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var HorseRaceLamp = (function () {
    function HorseRaceLamp() {
        this.objHorseRaceLamp = new Array();
        this.isHRL = false;
    }
    HorseRaceLamp.getInstance = function () {
        return HorseRaceLamp.m_manager;
    };
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
    HorseRaceLamp.prototype.showHorseRaceLamp = function (container, txt, offY, left, right, immediately, speed, color, size, bold, stroke, wait, mask, loop) {
        if (offY === void 0) { offY = 10; }
        if (left === void 0) { left = 165; }
        if (right === void 0) { right = 100; }
        if (immediately === void 0) { immediately = false; }
        if (speed === void 0) { speed = 10000; }
        if (color === void 0) { color = 0xFFFFFF; }
        if (size === void 0) { size = 20; }
        if (bold === void 0) { bold = false; }
        if (stroke === void 0) { stroke = 2; }
        if (wait === void 0) { wait = 1500; }
        if (mask === void 0) { mask = null; }
        if (loop === void 0) { loop = false; }
        var obj = new Object();
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
        if (immediately) {
            this.OutHorseRaceLamp(obj);
        }
        else {
            this.objHorseRaceLamp.push(obj);
            if (!this.isHRL) {
                this.OutHorseRaceLamp();
            }
        }
    };
    /**
     * 关闭所有跑马灯，并删除
     */
    HorseRaceLamp.prototype.closeHorseRaceLamp = function () {
        if (this.HorseM && this.HorseM.parent)
            this.HorseM.parent.removeChild(this.HorseM);
        if (this.HorseBG) {
            egret.Tween.removeTweens(this.HorseBG);
            if (this.HorseBG.parent) {
                this.HorseBG.parent.removeChild(this.HorseBG);
            }
        }
        while (this.objHorseRaceLamp.length)
            this.objHorseRaceLamp.pop();
        this.isHRL = false;
    };
    HorseRaceLamp.prototype.OutHorseRaceLamp = function (obj) {
        if (obj === void 0) { obj = null; }
        var cobj = null;
        if (obj == null) {
            if (this.isHRL)
                return;
            if (this.objHorseRaceLamp.length == 0)
                return;
            cobj = this.objHorseRaceLamp.shift();
        }
        else {
            cobj = obj;
        }
        var textFlow = cobj["textFlow"];
        var txt = cobj["txt"];
        var offY = cobj["offY"];
        var left = cobj["left"];
        var right = cobj["right"];
        var speed = cobj["speed"];
        var color = cobj["color"];
        var size = cobj["size"];
        var bold = cobj["bold"];
        var stroke = cobj["stroke"];
        var container = cobj["container"];
        var mask = cobj["mask"];
        var wait = cobj["wait"];
        var loop = cobj["loop"];
        if (loop) {
            this.objHorseRaceLamp.push(cobj);
        }
        if (!container)
            return;
        if (!container.stage) {
            egret.Tween.get(container).wait(1000).call(function () {
                this.OutHorseRaceLamp(null);
            }, this, null);
            return;
        }
        var lab = new eui.Label();
        lab.x = 0;
        lab.y = 0;
        lab.touchEnabled = false;
        if (textFlow == undefined) {
            lab.fontFamily = "SimHei";
            lab.size = size;
            lab.textColor = color;
            lab.bold = bold;
            lab.text = txt;
            lab.stroke = stroke;
        }
        else {
            lab.textFlow = textFlow;
        }
        var bg = new egret.Sprite();
        bg.graphics.beginFill(0, 0);
        bg.addChild(lab);
        bg.graphics.drawRect(0, 0, lab.width, lab.height);
        bg.y = offY;
        bg.x = container.stage.stageWidth;
        bg.touchEnabled = false;
        bg.mask = mask;
        var m = null;
        if (mask == null && left != 0 && right != 0) {
            m = new eui.Rect();
            m.left = left;
            m.right = right;
            m.height = lab.height;
            m.fillColor = 0;
            m.y = offY;
            bg.mask = m;
            m.y = offY;
            container.addChild(m);
            if (this.HorseM && this.HorseM.parent)
                this.HorseM.parent.removeChild(this.HorseM);
            this.HorseM = m;
        }
        container.addChild(bg);
        if (this.HorseBG && this.HorseBG.parent)
            this.HorseBG.parent.removeChild(this.HorseBG);
        this.HorseBG = bg;
        if (obj == null)
            this.isHRL = true;
        var showWidth = container.width - left - right;
        var toX = lab.width > showWidth ? showWidth + left - lab.width : left;
        var moveTWidth = container.width + lab.width + 20;
        var toSpeed = speed * (container.width - toX + left) / moveTWidth;
        toSpeed = toSpeed > speed ? speed / 2 : toSpeed;
        egret.Tween.get(bg).to({ x: toX }, toSpeed).wait(wait).to({ x: 0 - lab.width - 20 }, speed - toSpeed).call(function (bg, m, b) {
            if (bg.parent) {
                bg.parent.removeChild(bg);
                this.HorseBG = null;
            }
            if (b) {
                this.isHRL = false;
                this.OutHorseRaceLamp(null);
            }
            if (m && m.parent) {
                m.parent.removeChild(m);
                this.HorseM = null;
            }
        }, this, [bg, m, obj == null ? true : false]);
    };
    HorseRaceLamp.m_manager = new HorseRaceLamp();
    return HorseRaceLamp;
}());
__reflect(HorseRaceLamp.prototype, "HorseRaceLamp");
//# sourceMappingURL=HorseRaceLamp.js.map