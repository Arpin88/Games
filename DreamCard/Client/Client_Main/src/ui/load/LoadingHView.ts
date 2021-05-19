// TypeScript file

class LoadingHView extends BaseView implements IGMDLoadProgress{
    public static NAME:string = "LoadingHSkin";

    private lblProgress:eui.Label;
    private prbLoading:eui.ProgressBar;


    private load_timer:egret.Timer;
    private _stepList:Object;
    private _finBack:Function;
    private _finTar:any;
    private progres:number = 0;
    private loadProgres:number = 0;

    private defaultSpeed:number = 100/150;
    private fastSpeed:number = 100/50;
    private slowSpeed:number = 100/500;

    public constructor(){
        super(LoadingHView.NAME);
    }

    protected week():void{
        var self = this;
        let load_timer = new egret.Timer(20,0);
        load_timer.addEventListener(egret.TimerEvent.TIMER,self.onTimeProgress,self);
        load_timer.start();
        self.load_timer = load_timer;
        self.progres = 0;
        self.loadProgres = 0;
        self.prbLoading.value = 0;
        self.weekComplete();
    }

    public weekComplete():void{
        var self = this;
        var stage = self.stage;
        if(stage&&stage.orientation!=egret.OrientationMode.LANDSCAPE){
            stage.orientation = egret.OrientationMode.LANDSCAPE;
            stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
            var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
            stage.setContentSize(width,height);
        }
    }

    protected sleep():void{
        var self = this;
        let load_timer = self.load_timer;
        if(!load_timer)
            return;
        
        load_timer.stop();
        load_timer.removeEventListener(egret.TimerEvent.TIMER,self.onTimeProgress,self);
        self.load_timer = null;
        self._finTar = null;
        self._finBack = null;
        self.prbLoading.value = 0;
    }

    private onTimeProgress(e:egret.TimerEvent):void{
        var self = this;
        if(self.progres>=100){
            self.load_timer.stop();
            if(self._finBack)
                self._finBack.call(self._finTar);
                return;
        }

        var speed = self.defaultSpeed;
        if(self.loadProgres>=100||self.progres+10<self.loadProgres){
            speed = self.fastSpeed;
        }else if(self.progres>self.loadProgres+10){
            speed = self.slowSpeed;
        }

        var tmpVal = self.progres+speed;
        if(tmpVal>99){
            if(self.loadProgres<100)
                tmpVal = 99;
            else if(tmpVal>100)
                tmpVal = 100;
        }

        self.progres = tmpVal;
        self.prbLoading.value = tmpVal;
        self.lblProgress.text = tmpVal.toFixed(0) + "%";
    }

    public setStepInfo(stepList:Object,finBack:Function,target:any):void{
        var self = this;
        self._stepList = stepList;
        self._finBack = finBack;
        self._finTar = target;

        if(DEBUG){
            let totalPer = 0;
            for(let step in stepList){
                totalPer+=stepList[step];
            }
            if(totalPer<100){
                egret.error("totalPer is little than 100");
            }
        }
    }

    public finStep(step:string):void{
        this.loadProgres+=this._stepList[step];
    }

    public finAllStep():void{
        this.loadProgres = 100;
    }

}