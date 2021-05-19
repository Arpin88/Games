// TypeScript file
class TaskView extends BaseView{

    public static NAME:string = "TaskSkin";

     public constructor(){
        super(TaskView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮

    private scrOptionBtn:eui.Scroller;  //选项按钮下拉滚动区域
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层

    private imgRBG:eui.Image;   //右边背景
    

    private mallskingroup:eui.Group;
    private comStar:eui.Component;      //星星


    private arrPropTypeData:Array<Object> = new Array<Object>();    //道具类型数据
    private propData:any;        //道具数据(根据道具类型获取的道具信息本地存储容器)
    private shopInfoData:any;    //商品信息数据(根据商品标识获取的道具详情信息本地存储容器)

    private curSelPropData:any; //当前选择的道具数据

    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();  //选项按钮容器
    private curChooseOptionBtnIndex:number; //当前选中选项按钮下标

    private arrPropItem:Array<MPropItemView> = new Array<MPropItemView>();    //道具容器
    

    private pageNum:number = 1;     //当前页数 下标从1开始
    private pageSize:number = 10;   //一页的数量
    private receiveNum:number = 0;
    private needUp:boolean = false;

    private taskpage:eui.Group;    //道具下拉区域层
    private taskPropItem:eui.Scroller;      //技能滚动区域
    private taskgroupPropItem:eui.Group;       //技能滚动层
    private awardpage:eui.Group;    //道具下拉区域层
    private awardPropItem:eui.Scroller;      //技能滚动区域
    private awardgroupPropItem:eui.Group;       //技能滚动层
    private signpage:eui.Group;    //道具下拉区域层
    private signpage1:eui.Group;
    
    private taskItemViewList:Array<TaskItemView> = new Array<TaskItemView>();   
    private awardItemViewList:Array<AwardtemView> = new Array<AwardtemView>();   
    private signItemViewList:Array<SignItemView> = new Array<SignItemView>();

    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        
/*      self.scrPropItem.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);

        GameEventManager.getInstance().addEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
        GameEventManager.getInstance().addEventListener(HallEvent.updateGold,self,self.updateGold);
        GameEventManager.getInstance().addEventListener(HallEvent.updateProp,self,self.updateProp);
*/
        this.pageNum = 1;
        this.needUp = false;
        this.receiveNum = 0;
        self.updateGold();
        self.setOptionBtn();
        // self.sendGetShopList(); // 初始申请数据
        
        self.setDaySignItem(0);
        self.setDayTaskItem(0);
        self.setDayAwardItem(0);
    }


    private moveHandler(evt: eui.UIEvent): void {
      /*  if(this.scrPropItem.viewport.scrollV > (this.scrPropItem.viewport.contentHeight - this.scrPropItem.viewport.height)-40){
			this.needUp = true;
		}*/
    }

    private outHandler(evt:eui.UIEvent):void{
        if(this.receiveNum < this.pageSize){
            this.needUp = false;
        }
        
        if(this.needUp){
			this.needUp = false;
			this.addNewData();
		}
    }

    private addNewData():void{
        var self = this;
       // 2 申请下一页的数据
       self.pageNum = self.pageNum + 1;
       
       var propType:any = self.arrPropTypeData[self.curChooseOptionBtnIndex];
        if(propType==null)
            return;

        var arrPropData:Array<any> = self.propData[propType.code];
      //  if(arrPropData.length<=(self.pageNum-1)*self.pageSize)   //如果本地没有数据则去请求数据
            //this.reqGetShopPropList();
     //   else
            //this.updatePropShow();

       
    }

    private updateGold():void{
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.cleanArray(self.arrPropItem);
        self.curChooseOptionBtnIndex = null;
        this.pageNum = 1;
        self.propData = null;
        self.shopInfoData = null;
        self.curSelPropData = null;

  /*      GameEventManager.getInstance().removeEventListener(HallEvent.onGetProptypeComplete,self,self.onGetProptypeComplete);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateGold,self,self.updateGold);
        GameEventManager.getInstance().removeEventListener(HallEvent.updateProp,self,self.updateProp);*/
    }

    private cleanArray(arr:Array<BaseView>):void{
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


    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_GET_SHOP_PROP_LIST:
               // self.onGetShowPropList(data);
            break;
            case HallCmdDef.CMD_GET_SHOP_PROP_INFO:
               // self.onGetShopPropInfo(data);
            break;

        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
            if(btn.name.substr(0,10)=="btnOption_"){
                var strArr:Array<string> = btn.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex);  // 按钮被按下
                // console.log(`选择按钮被按下：${cIndex}`);
            }else if(btn.name.substr(0,7)=="btnDay_"){

            }else if(btn==self.btnBack){
                self.hiden();
            }
        }if(event.target instanceof eui.Group){
            var bt1:eui.Group = <eui.Group>event.target;
            if(bt1.name.substr(0,6)=="btnDay_"){
                var a = 0;
            }
        }
    }

    

    private setOptionBtn():void{
        var self = this;
        var imgName = ["mrqiandao","mrrenwu","lvjiangli"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           imgName = ["e_zrdyx","e_zcdqb","jilu"];
        }
        var num:number = imgName["length"];
        for(var i:number=0; i < num; i++){
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            btnView.setBtnImgContent(imgName[i]);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }

        self.updateOptionBtnPos();
        self.setCurChooseOptionBtnByIndex(0); 
    }



    private updateOptionBtn():void{
        var self = this;
        for(var i:number=0,lengthI=self.arrPropTypeData.length;i<lengthI;i++){
            var item:any = self.arrPropTypeData[i];
            if(item==null)
                continue;
            // code:"3"
            // name:"牌背"
            // res_url:"bag_paibei"
            var resUrl:string = item.resUrl;
            var btnView:OptionBtnView = new OptionBtnView();
            btnView.init();
            self.groupOptionBtn.addChild(btnView);
            //btnView.setBtnContent(self.typeName[i]);
            btnView.setBtnImgContent(resUrl);
            btnView.setBtnName("btnOption_" + i);
            btnView.x = 20;
            // btnView.y = btnView.getViewHeight()*i + 10*(i+1);
            self.arrOptionBtn.push(btnView);
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
        }
    }

    //设置当前选中选项按钮下标
    private setCurChooseOptionBtnByIndex(index:number):void{
        var self = this;
        var btnView:OptionBtnView = null;
        if(self.curChooseOptionBtnIndex!=null){
            if(self.curChooseOptionBtnIndex==index){
                return;
            }
            btnView = self.getOptionBtnViewByIndex(self.curChooseOptionBtnIndex);
            if(btnView==null)
                return;
            btnView.setCurChoose(0,true);
        }
        self.curChooseOptionBtnIndex = index;
        btnView = self.getOptionBtnViewByIndex(index);
        if(btnView==null)
            return;
        btnView.setCurChoose(1,true);
        self.updateOptionBtnPos();
        self.cleanArray(self.arrPropItem);

        self.setPageItem(index);  // 传kind
    }

    private setPageItem(index:number):void{
        this.signpage.$setVisible(false);
        this.signpage1.$setVisible(false);
        this.awardpage.$setVisible(false);
        this.taskpage.$setVisible(false);
        if(index == 0){
            this.signpage.$setVisible(true);
            this.signpage1.$setVisible(true);
        }else if(index == 1){
            this.taskpage.$setVisible(true);
        }else if(index == 2){
            this.awardpage.$setVisible(true);
        }
    }

    // 设置每日登录界面
    private setDaySignItem(index:number):void{

        for(var i:number = 0; i < 7; i++){
            var btnView:any;
            if(i < 6) btnView = new SignItemView();
            else btnView = new SignItemView2();
            btnView.init();
            var data:Object = {"tittle":i,
                num:10+i,
                isget:0,
                isloss:0,
                islight:0   // 0,1
             };
            btnView.setData(data);
            this.signpage.addChild(btnView);
            btnView.setBtnName("btnDay_" + i);
            var xx = i%4;
            var yy = Math.floor(i/4);
            btnView.x = 66 + 220*xx;
            btnView.y = 40 + 240*yy;
        }
    }

    // 设置每日任务界面
    private setDayTaskItem(index:number):void{
        var self = this;
        var num = 5;
        for(var i:number = 0; i < num; i++){
            var btnView:TaskItemView = new TaskItemView();
            btnView.init();
             var data:Object = {Lv:"Lv"+i,
             desc:"desc"+i,
             awardnum:i,
             islight:0
             };
            btnView.setData(data);
            self.taskgroupPropItem.addChild(btnView);
            btnView.setBtnName("btnTask_" + i);

         //   btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 2;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight()+2;
            btnView.y = btnView.getViewHeight() * i;
            self.taskItemViewList.push(btnView);
        }
    }

    // 设置没惹奖励界面
    private setDayAwardItem(index:number):void{
        var self = this;
        var num = 5;
        for(var i:number = 0; i < num; i++){
            var btnView:AwardtemView = new AwardtemView();
            btnView.init();
            var data:Object = {tittle:"name"+i,
             desc:"desc"+i,
             awardnum:i,
             islight:0
             };
            btnView.setData(data);
            self.awardgroupPropItem.addChild(btnView);
            btnView.setBtnName("btnAward_" + i);
         //   btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 2;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight()+2;
            btnView.y = btnView.getViewHeight() * i;
            self.awardItemViewList.push(btnView);
        }
    }

    //返回选项按钮视图根据下标
    private getOptionBtnViewByIndex(index:number):OptionBtnView{
        var retView:OptionBtnView = null;
        var self = this;
        for(var i:number=0,lengthI = self.arrOptionBtn.length;i<lengthI;i++){
            var btnView:OptionBtnView = self.arrOptionBtn[i];
            if(btnView==null)
                continue;
            var btnName:string = btnView.getBtnName();
            var strArr:Array<string> = btnName.split("_");
            if(strArr.length!=2){
                continue;
            }
            var cIndex:number = Number(strArr[1]);
            if(index==cIndex){
                retView = btnView;
                break;
            }
        }

        return retView;
    }

    //更新选项按钮坐标信息
    private updateOptionBtnPos():void{
        var self = this;
        var posY:number = 0;
        for(var i:number=0,lengthI:number = self.arrOptionBtn.length;i<lengthI;i++){
            var item:OptionBtnView = self.arrOptionBtn[i];
            if(item==null)
                continue;
            item.y = posY;
            posY += item.getViewHeight() + 10;
        }
        self.scrOptionBtn.height = posY;
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.mallskingroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.mallskingroup.scaleX = 
            self.mallskingroup.scaleY = 1;
            return;
        }
        self.mallskingroup.scaleX = 
        self.mallskingroup.scaleY = gapNum;
    }
}
