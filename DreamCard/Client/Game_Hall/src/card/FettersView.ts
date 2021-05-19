// TypeScript file
class FettersView extends BaseView{

    public static NAME:string = "JiBanSkin";

     public constructor(){
        super(FettersView.NAME);
    }

    private btnBack:eui.Button;  //返回按钮
    private PanelButton:eui.Button; 
    private infoPanel:eui.Group;
    private jibanskingruop:eui.Group;
    private scrCardItem:eui.Scroller;   
    private groupCardItem:eui.Group;  
    private JibanBtnGroup:eui.Group
    private arrCardFetters:Array<FetterItemView> = new Array<FetterItemView>();  //卡牌羁绊容器

    private xiaoguo1:eui.Label;
    private jiban1:eui.Label;
    private labItemName:eui.Label;
    private imgItem:eui.Image;
    private bgClr:eui.Image;
    private movingState:boolean = false;   //移动状态
    private fettersDataList:Array<Object> = new Array<Object>();
    private zcTxt:string = "组成: ";
    private xgTxt:string = "效果: ";
    private errorTxt:string = "暂无数据";

    protected week():void{
        var self = this;
        this.infoPanel.visible = false;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
            self.zcTxt = "Formation: ";
            self.xgTxt = "Effects: ";
            self.errorTxt = "Temporarily no data";
        }

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)){
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN,self.touchBegin,self);
        }
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_END)){
            self.addEventListener(egret.TouchEvent.TOUCH_END,self.touchEnd,self);
        }

        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrCardItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        self.requestInitDataFromSvr(); //初始申请数据
    }

    // 初始申请数据
    private requestInitDataFromSvr():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_FETTERS_CONFIG,{},true);
    }

   public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_FETTERS_CONFIG:  //获取队伍配置
                 var num = data["length"]
                 for(var i:number = 0; i < num; i++)
                 {
                     var mydata = data[i]
                     var fetId:number = mydata.fetId;
                     this.fettersDataList[fetId - 1] = mydata;
                 }
                 self.setFettersViewByData();
            break;
        }
    }

    protected sleep():void{
        this.cleanArray(this.arrCardFetters);
    }

    private cleanArray(arr:Array<IBaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i = arr.length - 1; i >= 0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }
    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        var group:eui.Group = <eui.Group>event.target;
        if(group.name.substr(0,8)=="groupPI_"){
            if(self.movingState) return;
            SoundManager.getInstance().PlayClickSound();
            var strArr:Array<string> = group.name.split("_");
            var cIndex:number = Number(strArr[1]);
            
            this.setFetterInfoPanelByIdx(cIndex);
        }
    }

    private setFettersViewByData():void{
        var self = this;
        var hMaxCount:number = 6;
        var cellWidth:number = self.scrCardItem.width/hMaxCount;
        var cellHeight:number = self.scrCardItem.height/4;
        var vIndex:number = 0;
        var hIndex:number = 0;
        var hIndex:number = 0;
        var showNum:number = this.fettersDataList["length"]
        for(var i:number=0; i < showNum; i++)
        {
            var FettersData = this.fettersDataList[i];  
            var icontest:string = "fetterSheet_json.djb" + ExternalFun.prototype.add0(i+1,2);
            var data = {icon:FettersData["icon"] , color:FettersData["color"], visible:(i < showNum) , name:FettersData["name"]};
            var view:FetterItemView = new FetterItemView();
            view.initData(data);
            self.groupCardItem.addChild(view);
            
            var scale:number = 1.0;
            view.scaleX = view.scaleY = scale;
            view.x = hIndex*(cellWidth - 4) + 32;
            view.y = vIndex*(view.getViewHeight() + 32) + 2;
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            self.arrCardFetters.push(view);
            view.setGroupName("groupPI_" + (i+1));
            hIndex++;
            if(hIndex>=hMaxCount)
            {
                hIndex = 0;
                vIndex++;
            }
        }
    }


    private touchEnd(event:egret.TouchEvent):void
    {
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button)
        {
            if(tar == self.PanelButton){
                SoundManager.getInstance().PlayClickSound();
                this.setFetterInfoPanelByIdx(0);
            }else
            {
                SoundManager.getInstance().PlayClickSound();
                let idx:number = Number(tar.name);
                this.setFetterInfoPanelByIdx(idx);
            }
        }
    }

    /*
        Fun：显示羁绊说明面板
        idx = 0 的时候面板不隐藏
        idx > 0 的时候面板显示
    */
    private setFetterInfoPanelByIdx(idx:number)
    {
        if(idx <= 0){
            this.infoPanel.visible = false;
            return;
        }else{
            this.infoPanel.visible = true;
        }
        
        var num:number = this.fettersDataList["length"]
        if(idx <= num)
        {
            var icontest:string = "fetterSheet_json.djb" + ExternalFun.prototype.add0(idx,2);
            this.imgItem.source = this.fettersDataList[idx-1]["icon"];
            this.labItemName.text = this.fettersDataList[idx-1]["name"];
            var bgurl = "fetterCommonImg0Sheet_json.jb" + this.fettersDataList[idx-1]["color"] + "_0";
            this.bgClr.source = bgurl;
            this.xiaoguo1.textFlow = [
                {text: this.xgTxt, style: {"size":26,textColor:0x8bc2d5}},
                {text:this.fettersDataList[idx-1]["fetDesc"] , style:{"size":26,textColor:0xe1e1e1}},
            ];
            this.jiban1.textFlow = [
                {text: this.zcTxt, style: {"size":26,textColor:0x8bc2d5}},
                {text:this.fettersDataList[idx-1]["fetZc"] , style:{"size":26,textColor:0xe1e1e1}},
            ];
        }
        else
        {
            this.xiaoguo1.text = this.errorTxt;
            this.jiban1.text = this.errorTxt;
        }
    }

    private touchBegin(event:egret.TouchEvent):void
    {
        var self = this;
        let tar:Object = event.target as Object;

        if(tar instanceof eui.Button)
        {
            if(tar == self.btnBack)
            {
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.jibanskingruop==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.jibanskingruop.scaleX = 
            self.jibanskingruop.scaleY = 1;
            return;
        }
        self.jibanskingruop.scaleX = 
        self.jibanskingruop.scaleY = gapNum;
    }
}