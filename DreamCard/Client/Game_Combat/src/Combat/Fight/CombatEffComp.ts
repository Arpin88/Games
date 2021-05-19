// TypeScript file
class CombatEffComp{

    //添加动画根据配置
    public static addMovieClipByConfig(config:MovieClipConfig,parent:egret.DisplayObjectContainer):UIMovieClip{
        if(config==null||parent==null)
            return null;

        var movieClip:UIMovieClip = new UIMovieClip();
        movieClip.scaleX = config.scaleX;
        movieClip.scaleY = config.scaleY;
        movieClip.x = config.posX + config.gapX;
        movieClip.y = config.posY + config.gapY;
        movieClip.source = config.jsName+"."+config.mcName;
        movieClip.gotoAndPlay(config.actName,config.playTimes);
        var sound:string = config.sound;
        if(sound!=null&&sound!="")
            SoundManager.getInstance().PlaySound(sound);
        
        if(config.frameRate!=-1)
            movieClip.frameRate = config.frameRate;
            
        parent.addChild(movieClip);
        if(config.anchorCenter){
            movieClip.anchorOffsetX = movieClip.width/2;
            movieClip.anchorOffsetY = movieClip.height/2;
        }
        if(config.posCenter){
            movieClip.x = parent.width/2 + config.gapX;
            movieClip.y = parent.height/2 + config.gapY;
        }
        return movieClip;
    }

    public static addImageByConfig(config:ImageConfig,parent:egret.DisplayObjectContainer):eui.Image{
        if(config==null||parent==null)
            return null;

        var image:eui.Image = new eui.Image();
        image.scaleX = config.scaleX;
        image.scaleY = config.scaleY;
        image.x = config.posX + config.gapX;
        image.y = config.posY + config.gapY;
        image.source = config.res;
        parent.addChild(image);
        if(config.anchorCenter){
            image.anchorOffsetX = image.width/2;
            image.anchorOffsetY = image.height/2;
        }
        if(config.posCenter){
            image.x = parent.width/2 + config.gapX;
            image.y = parent.height/2 + config.gapY;
        }
        return image;
    }
    
    public static addBitmapLabelByConfig(config:BitmapLabelConfig,parent:egret.DisplayObjectContainer,text:string = ""):eui.BitmapLabel{
        if(config==null||parent==null)
            return null;

        var bitmapLabel:eui.BitmapLabel = new eui.BitmapLabel();
        bitmapLabel.scaleX = config.scaleX;
        bitmapLabel.scaleY = config.scaleY;
        bitmapLabel.x = config.posX + config.gapX;
        bitmapLabel.y = config.posY + config.gapY;
        bitmapLabel.font = config.res;
        bitmapLabel.text = text;
        parent.addChild(bitmapLabel);
        if(config.anchorCenter){
            bitmapLabel.anchorOffsetX = bitmapLabel.width/2;
            bitmapLabel.anchorOffsetY = bitmapLabel.height/2;
        }
        if(config.posCenter){
            bitmapLabel.x = parent.width/2 + config.gapX;
            bitmapLabel.y = parent.height/2 + config.gapY;
        }
        return bitmapLabel;
    }

    public static addLabelByConfig(config:LabelConfig,parent:egret.DisplayObjectContainer,text:string = ""):eui.Label{
        if(config==null||parent==null)
            return null;

        var label:eui.Label = new eui.Label();
        label.scaleX = config.scaleX;
        label.scaleY = config.scaleY;
        label.x = config.posX + config.gapX;
        label.y = config.posY + config.gapY;
        label.text = text==""?config.text:text;
        label.size = config.size;
        label.textColor = config.textColor;
        label.fontFamily = config.fontFamily;
        label.stroke = config.stroke;
        label.strokeColor = config.strokeColor;
        label.bold = config.bold;
        label.lineSpacing = config.lineSpacing;
        label.textAlign = config.textAlign;
        label.wordWrap = config.wordWrap;
        parent.addChild(label);
        if(config.width!=-1)
            label.width = config.width;
            
        if(config.height!=-1)
            label.height = config.height;
            
        if(config.anchorCenter){
            label.anchorOffsetX = label.width/2;
            label.anchorOffsetY = label.height/2;
        }
        if(config.posCenter){
            label.x = parent.width/2 + config.gapX;
            label.y = parent.height/2 + config.gapY;
        }

        
        return label;
    }
}