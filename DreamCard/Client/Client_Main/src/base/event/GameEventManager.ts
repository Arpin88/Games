// TypeScript file
class GameEventManager{
    private static instance:GameEventManager;
    public static getInstance():GameEventManager{
        if(this.instance==null){
            this.instance = new GameEventManager();
        }
        return this.instance;
    }

    private arrData:Array<GameEventData> = new Array<GameEventData>();

    public addEventListener(event:string,caller:any, listener:Function, args:Object = null, priority:number = 0){
        var self = this;
        if(self.hasEventListener(event,caller,listener)){
            return;
        }
        var gameEventData:GameEventData = self.getGameEventData(event);
        var paramNew:GameEventParam = new GameEventParam();
        paramNew.event = event;
        paramNew.caller = caller;
        paramNew.listener = listener;
        paramNew.args = args;
        paramNew.priority = priority;
        paramNew.caller.addEventListener(event,listener,caller,args);
        var priorityStr:string = priority+"";
        if(!gameEventData.paramObj.hasOwnProperty(priorityStr)){
            gameEventData.paramObj[priorityStr] = new Array<GameEventParam>();
        }
        var paramArr:Array<GameEventParam> = gameEventData.paramObj[priorityStr];
        paramArr.push(paramNew);
    }

    public dispatchEvent(event:string,args:Object = null):void{
        var self = this;
        var gameEventData:GameEventData = self.getGameEventData(event);
        for(var priority in gameEventData.paramObj){
            var paramArr:Array<GameEventParam> = gameEventData.paramObj[priority];
            if(paramArr.length<=0)
                continue;
            var i:number=0,lengthI:number =0;
            for(i=0,lengthI = paramArr.length;i<lengthI;i++){
                if(paramArr[i]!=null){
                    var param:GameEventParam = paramArr[i];
                    if(args!=null){
                        if(param.args==null){
                            param.args = new Object();
                        }
                        param.args["dispData"] = args;
                        param.listener.call(param.caller,param.args);
                        continue;
                    }
                    param.caller.dispatchEvent(gameEventData.gameEvent);
                }
            }
        }
    }

    public removeEventListener(event:string,caller:any, listener:Function){
        var self = this;
        if(!self.hasEventListener(event,caller,listener)){
            return;
        }
        var gameEventData:GameEventData = self.getGameEventData(event);
        for(var priority in gameEventData.paramObj){
            var paramArr:Array<GameEventParam> = gameEventData.paramObj[priority];
            if(paramArr.length<=0)
                continue;

            var i:number=0,lengthI:number =0;
            for(i=0,lengthI = paramArr.length;i<lengthI;i++){
                if(paramArr[i]!=null){
                    var param:GameEventParam = paramArr[i];
                    if(param.caller==caller&&param.listener==listener){
                        param.caller.removeEventListener(event,caller,listener);
                        paramArr.splice(i,1);
                        break;
                    }
                }
            }

        }
    }

    public hasEventListener(event:string,caller:any,listener:Function){
        var self = this;
        var gameEventData = self.getGameEventData(event);

        for(var priority in gameEventData.paramObj){
            var paramArr:Array<GameEventParam> = gameEventData.paramObj[priority];
            if(paramArr.length<=0)
                continue;
            var hasListener:boolean = false;
            var i:number=0,lengthI:number= 0;
            for(i=0,lengthI=paramArr.length;i<lengthI;i++){
                if(paramArr[i].caller==caller&&paramArr[i].listener==listener){
                    hasListener = true;
                    break;
                }
            }
            return hasListener;
        }
        return false;
    }

    private getGameEventData(event:string):GameEventData{
        var self =this;
        var gameEventData:GameEventData = null;
        var i:number=0,lengthI:number= self.arrData.length;
        for(i;i<lengthI;i++){
            var data:GameEventData = self.arrData[i];
            if(data.eventName == event){
                gameEventData = data;
                break;
            }
        }
        if(gameEventData==null){
            gameEventData = new GameEventData();
            gameEventData.eventName = event;
            gameEventData.gameEvent = egret.Event.create(GameEvent,event);
            self.arrData.push(gameEventData);
        }
        return gameEventData;
    }

}