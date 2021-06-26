// TypeScript file
module GameConfig{

    export var isDebug:boolean = false;

    export var isOnLine:boolean = navigator.onLine;
    export var ticket: string = "cwt_123456789";
    export var serverId:number = 0;
    export var key = "8818181818181898";
    export var vi = "8818181818181898";



    var curScene:GameScene;
    export function gameScene():GameScene{
        if(this.curScene==null){
            this.curScene = new GameScene(egret.MainContext.instance.stage);
        }
        return this.curScene;
    }

    export function curWidth():number{
        return egret.MainContext.instance.stage.stageWidth;
    }
    export function curHeight():number{
        return egret.MainContext.instance.stage.stageHeight;
    }
    export function isVertical():boolean{
        var angle = window["orientation"];
        return angle!=90;
    }
}