// TypeScript file
class CombatAction{

    //播放动作集合
    public static playActions(configs:CActionConfig[],target:any,callBack:Handler):void{
        if(configs==null||configs.length<=0)
            return;
        
        var firstConfig:CActionConfig = configs[0];
        var loop:boolean = firstConfig.loop;
        var tw:egret.Tween = egret.Tween.get(target,{loop:loop});

        for(var key in configs){
            var config:CActionConfig = configs[key];
            if(config==null)
                continue;

            var props:any = {};
            if(config.moveX!=null){
                props.x = target.x+config.moveX;
            }else if(config.moveToX!=null){
                props.x = config.moveToX;
            }

            if(config.moveY!=null){
                props.y = target.y+config.moveY;
            }else if(config.moveToY!=null){
                props.y = config.moveToY;
            }

            if(config.rotateRange!=null){
                props.rotation = config.rotateRange;
            }
            if(config.alpha!=null){
                props.alpha = config.alpha;
            }

            var arr:Array<any> = Object.keys(props);
            var len:number=arr.length;

            if(len>0){
                tw.wait(config.preDelay).to(props,config.speed).wait(config.postDelay);
            }else{
                tw.wait(config.preDelay).wait(config.postDelay);
            }
        }

        if(callBack!=null)
            tw.call(function(){callBack.run()});
        
        if(firstConfig.remove){
            tw.call(function(){
                if(target.parent)
                    target.parent.removeChild(target);
            });
        }
    }

    //播放动作
    public static playAction(config:CActionConfig,target:any,callBack:Handler):void{
        if(config==null)
            return null;
        
        var tw:egret.Tween = egret.Tween.get(target,{loop:config.loop});

        var props:any = {};
        if(config.moveX!=null){
            props.x = target.x+config.moveX;
        }else if(config.moveToX!=null){
            props.x = config.moveToX;
        }

        if(config.moveY!=null){
            props.y = target.y+config.moveY;
        }else if(config.moveToY!=null){
            props.y = config.moveToY;
        }

        if(config.rotateRange!=null){
            props.rotation = config.rotateRange;
        }
        if(config.alpha!=null){
            props.alpha = config.alpha;
        }


        tw.wait(config.preDelay).to(props,config.speed).wait(config.postDelay);

        if(callBack!=null)
            tw.call(function(){callBack.run()});
        
        if(config.remove){
            tw.call(function(){
                if(target.parent)
                    target.parent.removeChild(target);
            });
        }
    }

    public static recoverAction(actContent:ActionContent):void{
        if(actContent==null||actContent.target==null||actContent.oriData==null)
            return;

        var target:any = actContent.target;
        var oriData:any = actContent.oriData;
        egret.Tween.removeTweens(target);
        if(oriData.x!=null)
            target.x = oriData.x;
        if(oriData.y!=null)
            target.y = oriData.y;
        if(oriData.rotation!=null)
            target.rotation = oriData.rotation;
        if(oriData.alpha!=null)
            target.alpha = oriData.alpha;
    }


    public static completeAction(actContent:ActionContent){
        if(actContent==null||actContent.target==null||actContent.endData==null)
            return;

        var target:any = actContent.target;
        var endData:any = actContent.endData;
        egret.Tween.removeTweens(target);
        if(endData.x!=null)
            target.x = endData.x;
        if(endData.y!=null)
            target.y = endData.y;
        if(endData.rotation!=null)
            target.rotation = endData.rotation;
        if(endData.alpha!=null)
            target.alpha = endData.alpha;
    }
}