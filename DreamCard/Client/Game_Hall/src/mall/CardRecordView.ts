// TypeScript file
class CardRecordView extends BaseView{

    public static NAME:string = "CardRecordSkin";

     public constructor(){
        super(CardRecordView.NAME);
    }

    private rectBG:eui.Rect;
    private btnBack:eui.Button;


    private scrPropItem:eui.Scroller;      //技能滚动区域
    private groupPropItem:eui.Group;       //技能滚动层
    private jbList:Object = []
    private pageId:number = 1; //下标从0开始，为了*方便，0代表第一个页面
    private pageSize:number = 15;
    private mallName:Object = []
    private recordItemViewList:Array<CardRecordItemView> = new Array<CardRecordItemView>();    //羁绊选项视图集合


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
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_CardRecord,obj,true);

    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_CardRecord:
                var obj = data["data"]
            // self.pageId = parseInt(data["pageId"]) // 页面id

                var num = data["length"]   // 10 条记录
                for(var k:number = 0; k < num; k++)
                {
                    var obj = data[k]
                    self.mallName[k + (self.pageId-1) * this.pageSize] = obj
                }

                if(num > 0){
                    this.setRecordBtn();
                }
            break;

        }
    }

    private setRecordBtn():void{
        var self = this;
        var num = self.mallName["length"];
        for(var i:number = 0; i < num; i++){
            var btnView:CardRecordItemView = new CardRecordItemView();
            btnView.init();
            var isshow = (i+1)%2 + 1;
            btnView.setisBagShow(isshow);
            var data:Object = {"ordorId":self.mallName[i]["cid"],
                orderNo:self.mallName[i]["orderid"],  
                turntype:self.mallName[i]["turntype"],
                status:self.mallName[i]["status"],
                cardname:self.mallName[i]["name"],
                grade:self.mallName[i]["grade"],// 品质
                five:self.mallName[i]["five"],
                generations:self.mallName[i]["generations"],
                star:self.mallName[i]["star"],
                experience:self.mallName[i]["experience"],
                blood:self.mallName[i]["blood"],
                attack:self.mallName[i]["attack"],
                createtime:self.mallName[i]["createtime"],
                oil:self.mallName[i]["oil"]
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

    
    //更新选项按钮坐标信息
    private updateOptionBtnPos():void{
        var self = this;
        var posY:number = 0;
        for(var i:number=0,lengthI:number = self.recordItemViewList.length;i<lengthI;i++){
            var item:CardRecordItemView = self.recordItemViewList[i];
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