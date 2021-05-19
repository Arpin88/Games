// TypeScript file
class CombatSerial{
    public constructor(combatParser:CombatParser,callBack:Handler = null){
        this.initData(combatParser,callBack);
    }

    private combatParser:CombatParser;
    private combatNodeList:Array<CombatNode>;
    private serialData:any;
    private timer:egret.Timer;
    private timeDelay:number = 500;
    private timeCounter:number;
    private timeCBack:Handler;
    private callBack:Handler;

    private initData(combatParser:CombatParser,callBack:Handler = null):void{
        var self = this;
        self.combatParser = combatParser;
        self.combatNodeList = new Array<CombatNode>();
        self.timeCounter = 0;
        self.callBack = callBack;
    }
    
    public parse(serialData:any):void{
        if(serialData==null)
            return;

        // var self = this;
        // self.serialData = serialData;

        // for(var key in serialData){
        //     var item:any = serialData[key];
        //     if(item==null)
        //         continue;

        //     var combatNode:CombatNode = new CombatNode();
        //     combatNode.optType = item.optType;
        //     combatNode.senderId = item.senderId;
        //     combatNode.skillKey = item.skillKey;
        //     combatNode.fromCardId = item.skillKey;
        //     var fightNodeArr = item.fightNodeArr;
        //     var arr:Array<FightNode> = new Array<FightNode>();
        //     for(var key0 in fightNodeArr){
        //         var item0:any = fightNodeArr[key0];
        //         if(item0==null)
        //             continue;
                
        //          var fn:FightNode = new FightNode();
        //          fn.toCardId = item0.toCardId;
        //          fn.hited = item0.hited;
        //          fn.damage = item0.damage;
        //          fn.damageShow = CombatUtils.getSymbolStr(fn.damage);
        //          arr.push(fn);
        //     }
        //     combatNode.fightNodeArr = arr;
        //     combatNode.callBack = self.playNext;
        //     // self.addNode(combatNode);
        //     self.combatNodeList.push(combatNode);
        // }

        // self.playNext();

    }

    public addNode(node:CombatNode):void {
        var self = this;
        node.callBack = Handler.create(self,self.playNext);//self.playNext.bind(self);
        self.combatNodeList.push(node);
    }

    public addNodeAndPlay(node:CombatNode):void {
        var self = this;
        node.callBack = Handler.create(self,self.playNext);//self.playNext.bind(self);
        self.combatNodeList.push(node);
        if(self.combatNodeList.length==1)
            self.startPlay();
    }

    public startPlay():void{
        this.playNext();
    }
    
    private playNext():void{
        var self = this;

        if(self.combatNodeList.length<=0){
            if(self.callBack!=null)
                self.callBack.run();
            return;
        }

        var combatNode:CombatNode = self.combatNodeList.shift();
        if(combatNode!=null){
            self.combatParser.parse(combatNode);

            //如果有使用时间则需要开启时间检测强制完成该战斗节点解析
            if(combatNode.usageTime!=-1){
                self.startTimer(combatNode.usageTime,combatNode.callBack);
            }
        }
    }

    private stopTimer():void{
        var self = this;
        if(self.timer!=null){
            self.timer.stop();
        }
    }

    private startTimer(counter:number = 0,func:Handler = null):void{
        var self = this;
        self.stopTimer();
        self.timeCounter = counter;
        if(func!=null){
            self.timeCBack = func;
        }
        if(self.timer==null){
            var timer = new egret.Timer(self.timeDelay);
            timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
            self.timer = timer;
        }
        self.timer.start();
    }

    private timerFunc(){
        var self = this;
        self.timeCounter -= self.timeDelay;
        if(self.timeCounter<=0){
            self.stopTimer();
            if(self.timeCBack!=null){
                self.timeCBack.run();
            }
        }
    }

    public getCombatNodeListLength():number{
        var self = this;
        if(self.combatNodeList==null)
            return 0;
        return this.combatNodeList.length;
    }
}