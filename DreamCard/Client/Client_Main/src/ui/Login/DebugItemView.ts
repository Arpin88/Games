// TypeScript file
class DebugItemView extends IBaseView{
    public static NAME:string = "DebugItemSkin";

     public constructor(){
        super(DebugItemView.NAME);
    }

    private groupDebugItem:eui.Group;
    private lblRoom:eui.Label;
    private lblState:eui.Label;

    private rid:number = -1;
    private state:number = -1;

    protected week():void{
        var self = this;
        var data:any = super.getData();
        if(data==null)
            return;
        
        self.groupDebugItem.name = data.groupName;

    }
    public updateShow(data:any):void{
        var self = this;
        var rid:number = data.rid;
        self.rid = rid;
        var ridStr:string = rid==null?"":rid+"";
        ridStr = "房间号:"+ridStr;
        self.lblRoom.text = ridStr;
        

        var state:number = data.state;
        state = state==null?-1:state;
        var stateStr:string ="";
        var color:number = 0xFFFFFF;
        if(state==-1)
            stateStr = "未开启"
        else if(state==0)
            stateStr = "正常";
        else if(state==1)
            stateStr = "完成";
        else if(state==2){
            stateStr = "异常";
            color = 0xFF0000;
        }
        stateStr = "状态:"+stateStr;
        self.lblState.text = stateStr;
        self.lblState.textColor = color;
        self.state = state;

    }

    public getRid():number{
        return this.rid;
    }


    public getState():number{
        return this.state;
    }

    public getGroupName():string{
        return this.groupDebugItem.name;
    }
}