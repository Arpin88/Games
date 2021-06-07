// TypeScript file
class RecordView extends BaseView{

    public static NAME:string = "recordSkin";

     public constructor(){
        super(RecordView.NAME);
    }

    private rectBG:eui.Rect;
    private btnBack:eui.Button;

    private scrPropItem:eui.Scroller;     
    private groupPropItem:eui.Group;     
    private jbList:Object = []
    private pageId:number = 1; 
    private pageSize:number = 15;
    private mallName:Object = []
    private recordItemViewList:Array<RecordItemView> = new Array<RecordItemView>();  

    protected week():void{
        var self =this;
        

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

      /*  var data = super.getData();
        if(data==null)
            return;*/

       // self.setRecordBtn();
        self.initView();
    }

    private initView():void{
        var self = this;
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let obj = new Object();
        obj["pageid"] = this.pageId;
        obj["pageSize"] = this.pageSize;
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_ChangeRecord,obj,true);

    }

    public recvData(cmd:HallCmdDef,data:any):void{
    var self = this;
    switch(cmd){
        case HallCmdDef.CMD_ChangeRecord:
            var obj = data["data"]
            self.pageId = parseInt(data["pageId"])

                var num = data["msg"]["length"]   
                for(var k:number = 0; k < num; k++)
                {
                    var obj = data["msg"][k]
                    self.mallName[k + (self.pageId-1) * this.pageSize] = obj
                }


                if(num > 0){
                  //  self.initView(true);
                    this.setRecordBtn();
                }
        break;

    }
    }

    private setRecordBtn():void{
        var self = this;
        var num = self.mallName["length"];
        for(var i:number = 0; i < num; i++){
            var btnView:RecordItemView = new RecordItemView();
            btnView.init();
            var isshow = (i+1)%2 + 1;
            btnView.setisBagShow(isshow);
             var data:Object = {"ordorId":self.mallName[i]["ordorId"],
             orderNo:self.mallName[i]["orderNo"],
             symbol:self.mallName[i]["symbol"],
             feeSymbol:self.mallName[i]["feeSymbol"],
             feeAmount:self.mallName[i]["feeAmount"],
             rate:self.mallName[i]["rate"],
             outOrdoerNo:self.mallName[i]["outOrderNo"],
             createdAt:self.mallName[i]["createdAt"],
             payeeId:self.mallName[i]["payeeId"],
             type:self.mallName[i]["type"],
             payableAmount:self.mallName[i]["payableAmount"],
             status:self.mallName[i]["status"],
             };
            btnView.setData(data);
            self.groupPropItem.addChild(btnView);
            
         //   btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 0;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight()+2;
            btnView.y = btnView.getViewHeight() * i;
            self.recordItemViewList.push(btnView);
        }
        
        //self.updateOptionBtnPos();
    }

    

    private updateOptionBtnPos():void{
        var self = this;
        var posY:number = 0;
        for(var i:number=0,lengthI:number = self.recordItemViewList.length;i<lengthI;i++){
            var item:RecordItemView = self.recordItemViewList[i];
            if(item==null)
                continue;
            item.y = posY + 5;
            posY += item.getViewHeight() + 22;
        }
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.cleanArray(self.recordItemViewList);

    }

    private cleanArray(arr:Array<IBaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i=arr.length-1;i>=0;i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            var btn:eui.Button = <eui.Button>tar;
            if(btn==self.btnBack){
                self.hiden();
            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
    }



}