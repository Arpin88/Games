class GameEvent extends egret.Event{

    // public static Test:string = "test";

    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
}

class GameEventData{
    public eventName:string = "";
    public gameEvent:any;
    // public paramArr:Array<GameEventParam> = new Array<GameEventParam>();
    public paramObj:Object = new Object();
}

class GameEventParam{
    public event:string;
    public caller:any;
    public listener:Function;
    public args:Object;
    public priority:number;
}