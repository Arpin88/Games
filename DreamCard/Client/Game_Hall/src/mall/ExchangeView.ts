// TypeScript file
class ExchangeView extends BaseView{

    public static NAME:string = "ExchangeSkin";

     public constructor(){
        super(ExchangeView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮
    private btnInAll:eui.Button;
    private btnInConfirm:eui.Button;
    private btnOutAll:eui.Button;
    private btnCash:eui.Button;
    private btnCharge:eui.Button;
    private btnOutCharge:eui.Button;
    private btnInCharge:eui.Button;
    private btnOutConfirm:eui.Button;
    private namstring:eui.Label;
    private namstring2:eui.Label;
    private namstring3:eui.Label;
    private namstring0:eui.Label;
    private InGameNum:eui.Label;
    private OutGameNum:eui.Label;
    private editCount:eui.EditableText;
    private editCountOut:eui.EditableText;    
    private ourRatestring:eui.Label;
    private lbcashaddr:eui.Label;   // 提现地址
    private lbgamewalletaddr:eui.Label;  // 钱包地址
    private lbchargewalletnum:eui.Label;
    private lbcashwalletnum:eui.Label;

    private mallskingroup:eui.Group;
    private scrOptionBtn:eui.Scroller;  //选项按钮下拉滚动区域
    private groupOptionBtn:eui.Group;   //选项按钮下拉区域层

    private imgRBG:eui.Image;   //右边背景
    private InGroup:eui.Group;
    private OutGroup:eui.Group;
    private ChargeGroup:eui.Group;
    private CashGroup:eui.Group;
    private RecordGroup:eui.Group;
    private comStar:eui.Component;      //星星

    private arrOptionBtn:Array<OptionBtnView>= new Array<OptionBtnView>();  //选项按钮容器
    private curChooseOptionBtnIndex:number; //当前选中选项按钮下标
    private curBtnIdx:number = 0;
    private oldString:string = "";
    private oldOutString:string = "";
    private turnRate:number = 0;
    private walletObj:Object;

    private scrPropItem:eui.Scroller;      //记录滚动区域
    private groupPropItem:eui.Group;       //记录滚动层
    private pageId:number = 1; 
    private pageSize:number = 15;
    private recordListData:Object = []
    private recordItemViewList:Array<RecordItemView> = new Array<RecordItemView>();    //流水记录item


    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        // 输入框
        self.editCountOut.addEventListener(eui.UIEvent.CHANGE, self.moveHandlerOut, self);
        self.editCountOut.addEventListener(eui.UIEvent.CHANGE_END, self.outHandlerOut, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.editCount.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);

        // 记录滚动区域
        self.scrPropItem.addEventListener(eui.UIEvent.CHANGE_END, self.outRecordHandler, self);

        self.updateGold();
        self.setOptionBtn();
        self.sendGetWalletInfo(); // 初始申请数据        
    }


    private sendGetWalletInfo():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let obj = new Object();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Change,obj,true); // ok
    }

    private updateGold():void{
        var account = GlobalDataManager.getInstance().getAccountData();
        this.comStar["txt"].text = account.getGold();
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrOptionBtn);
        self.curChooseOptionBtnIndex = null;

        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        if(account.getGuide_Step()!=null&&account.getGuide_Step()!="")
            UIManager.getInstance().showUI(GuideView,GameScene.EFFECT_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{step:account.getGuide_Step()});
        
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.cleanArray(self.recordItemViewList);
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
            case HallCmdDef.CMD_Change:
                if(data["data"] == null)
                {
                    var sum = function(){
                        self.hiden();
                    }
                    var data1:Object = {name:data["msg"],fun:sum};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                    return;
                }
                var obj = data["data"][0]  
                this.walletObj = obj["balance"] 
                this.turnRate = data["turnRate"] /100
                self.setViewByData();
                self.moveHandlerOut(null);
            break;
            case HallCmdDef.CMD_InChange:
                var gold = data["gold"]  
                var total_amount = data["total_amount"] 

                this.walletObj["available"] = this.walletObj["available"] - total_amount;
                
                self.setViewByData();  // 这里语句位置不能乱
                self.setGoldByData(data);
            break;
            case HallCmdDef.CMD_OutChange:
                var gold = data["gold"]  
                var total_amount = data["total_amount"] 

                this.walletObj["available"] = this.walletObj["available"] + total_amount;
                
                self.setViewByData();  // 这里语句位置不能乱
                self.setGoldByData(data);

            break;
            case HallCmdDef.CMD_ChangeCash:
                if(data["result"] == 0)
                {
                    var total_amount = data["total_amount"] 
                    this.walletObj["available"] = this.walletObj["available"] - total_amount;
                    
                    self.setViewByData();  // 这里语句位置不能乱
                    self.setGoldByData(data);

                    var data1:Object = {name:data["msg"],fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 

                }else{
                    var data1:Object = {name:data["msg"],fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                }
            break;
            case HallCmdDef.CMD_WalletResult:
                if(data["data"] == null)
                {
                    var sum = function(){
                        self.hiden();
                    }
                    var data1:Object = {name:data["msg"],fun:sum};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                    return;
                }

            break;  
            case HallCmdDef.CMD_ChangeRecord:
                var num = data["msg"]["length"]   // 记录
                for(var k:number = 0; k < num; k++)
                {
                    var obj = data["msg"][k]
                    self.recordListData[k + (self.pageId-1) * this.pageSize] = obj;
                }

                if(num > 0){
                    this.setRecordBtn();
                }
            break;          
        }
    }

    private setRecordBtn():void{
        var self = this;
        var num = self.recordListData["length"];
        var curNum = self.recordItemViewList.length;
        for(var i:number = 0; i < (num-curNum); i++){
            var btnView:RecordItemView = new RecordItemView();
            btnView.init();
            var isshow = (i+1)%2 + 1;
            btnView.setisBagShow(isshow);
            var objData = self.recordListData[curNum + i];
            var data:Object = {
                ordorId:objData["ordorId"],
                orderNo:objData["orderNo"],
                symbol:objData["symbol"],
                feeSymbol:objData["feeSymbol"],
                feeAmount:objData["feeAmount"],
                rate:objData["rate"],
                outOrdoerNo:objData["outOrderNo"],
                createdAt:objData["createdAt"],
                payeeId:objData["payeeId"],
                type:objData["type"],
                payableAmount:objData["payableAmount"],
                status:objData["status"],
            };
            btnView.setData(data);
            self.groupPropItem.addChild(btnView);
            btnView.x = 0;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight()+2;
            btnView.y = btnView.getViewHeight() * i;
            self.recordItemViewList.push(btnView);
        }
    }

    private setGoldByData(data:any): void
    {

        var gold = data["gold"]  
        this.comStar["txt"].text = gold;
        this.InGameNum.text = gold;
        this.OutGameNum.text = gold;
        
    }

    private setViewByData(): void
    {
        GlobalDataManager.getInstance().setWalletAddress(this.walletObj["eth_address"]);  // 链上地址
        this.namstring.text = this.walletObj["eth_address"];
        this.namstring2.text = this.walletObj["eth_address"];

        var binaddr:string =  GlobalDataManager.getInstance().getBindAddress();  // 服务端来的地址
        this.lbgamewalletaddr.text = this.walletObj["eth_address"];
        this.lbcashaddr.text = binaddr;

        var num = parseFloat(this.walletObj["available"])/100000000;
        var available = num.toFixed(2);
        this.namstring3.text = available;
        this.namstring0.text = available;
        this.lbchargewalletnum.text = available;
        this.lbcashwalletnum.text = available;

        var account = GlobalDataManager.getInstance().getAccountData();
        this.InGameNum.text = account.getGold() + "";
        this.OutGameNum.text = account.getGold() + "";
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
                console.log(`选择按钮被按下：${cIndex}`);

            }else if(btn==self.btnBack){
                self.hiden();
            }else if(btn==self.btnInAll){
                if(UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);
                    var num = parseFloat(this.walletObj["available"])/100000000;
                    var available = num.toFixed(2);
                    this.editCount.text = available + "";
                


            }else if(btn==self.btnInConfirm){  // 转入到游戏                

                var sum1 = function(pw:string){
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    let obj = new Object();
                    var num = parseFloat(self.editCount.text);
                    obj["num"] = num;
                    obj["password"] = pw;
                    HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_InChange,obj,true); 
                };

                var num = parseFloat(self.editCount.text);
                if(num <= 0 ){
                    var data1:Object = {name:"输入数值不对",fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                }else{
                    var data:Object = {"name":"请输入支付密码",fun:sum1};
                    UIManager.getInstance().showUI(WalletPwView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
                }
                
                if(UIManager.getInstance().checkHasViewByName(GuideView))
                    GameEventManager.getInstance().dispatchEvent(HallEvent.updateGuideNextStep);

            }else if(btn==self.btnOutAll){
                // 游戏内转出到钱包
                var account = GlobalDataManager.getInstance().getAccountData();
                this.editCountOut.text = (1 - this.turnRate) * account.getGold() + "";
                
                var num = parseFloat(this.editCountOut.text);
                if(this.isNumber(this.editCountOut.text) == true)
                {
                    var shownum:number = account.getGold() * this.turnRate;
                    this.ourRatestring.text = shownum.toFixed(2) +" XWG";
                }

            }else if(btn==self.btnOutConfirm){  // 游戏中转出                

                var num = parseFloat(self.editCountOut.text);
                if(num <= 0){
                    var data1:Object = {name:"输入数值不对",fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                }else{
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    let obj = new Object();
                    var num = parseFloat(this.editCountOut.text);
                    obj["num"] = num;
                    obj["rate"] = this.turnRate*100;
                    HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_OutChange,obj,true); // ok
                }
                
            }else if(btn == self.btnInCharge || btn == self.btnCharge){  // 充值
                PublicMethodManager.getInstance().openWallet();

            }else if(btn == self.btnOutCharge || btn == self.btnCash ){  // 提现
                    var cash_fun = function(txt:string){
                        var num = parseFloat(txt);
                        this.CashtObj_num = num;
                        self.showOil(num);
                    };
                var data:Object = {"name":"提现金额",walletObj:this.walletObj,fun:cash_fun};
                UIManager.getInstance().showUI(CashDailogView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
            }
        }
    }

    private showOil(num:number):void{
        if(isNaN(num) || num <= 0){
            var data1:Object = {name:"输入数值不对",fun:null};
            UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
        }else{

            var oil_fun = function(oil:string,num:string,addr:string){
                var password_fun = function(pw:number,num:number,oil:number){
                    let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                    let obj = new Object();
                    obj["num"] = num;
                    obj["oil"] = oil;
                    obj["password"] = pw;
                    obj["addr"] = addr;
                    HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_ChangeCash,obj,true);                
                };
                var oilNum:number = parseFloat(oil);
                if(isNaN(oilNum) || oilNum <= 0){
                    var data1:Object = {name:"输入数值不对",fun:null};
                    UIManager.getInstance().showUI(DailogView2,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data1); 
                }else{
                    var data:Object = {"num":num,"oil":oil,walletObj:this.walletObj,fun:password_fun};
                    UIManager.getInstance().showUI(WalletPwView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
                }
            };
            var data:Object = {"num":num,walletObj:this.walletObj,fun:oil_fun};
            UIManager.getInstance().showUI(OilDailogView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
        }
        
    }

    

    private  isNumber(val):boolean {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
    　　if(val === "" || val ==null){
            return false;
    　　}
        if(!isNaN(val)){　　　　
        　　//对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
        　　　 return true; 
        　　}

        　else{ 
        　　　　return false; 
        　　} 
	}

    // 己算提出的手续费
    private calOutRate():void{
        var num = parseFloat(this.editCountOut.text);
        if(this.isNumber(this.editCountOut.text) == true)
        {
            var shownum:number = num * this.turnRate
            this.ourRatestring.text = shownum.toFixed(2) +" XWG"
        }
    }

    private moveHandler(evt: eui.UIEvent): void {
        var self = this;
      
        if(this.editCount.text.length > 7) {
            this.editCount.text = self.oldString;
        }
        if(this.editCount.text != ""){
             if(self.isNumber(this.editCount.text) == true) {
                let x = String(this.editCount.text).indexOf('.') + 1; // x point的位置
                if(x == 0) x = this.editCount.text.length;
                let pointendnum = String(this.editCount.text).length - x;  // 小数点后面的位置
                if(pointendnum > 2){
                    this.editCount.text = self.oldString;
                } 
                else self.oldString = this.editCount.text;
            }
            else this.editCount.text = self.oldString;
            
        }
    }

    private outHandler(evt:eui.UIEvent):void{
        var self = this;
        var num = parseFloat(this.editCountOut.text);
        if(self.isNumber(this.editCountOut.text) == true)
        {
            this.ourRatestring.text = num * this.turnRate +" XWG"
        }

    }

    private outRecordHandler(evt:eui.UIEvent):void{

		this.addNewData();
    }

    private addNewData():void{
        var self = this;
       // 2 申请下一页的数据
       self.pageId = self.pageId + 1;
       var num =self.recordListData["length"];
        if(num <= (self.pageId-1)*self.pageSize)   //如果本地没有数据则去请求数据
            self.reqGetChangeRecordList();
    }

    private moveHandlerOut(evt: eui.UIEvent): void {
        var self = this;
        if(this.editCountOut.text.length > 7) {
            this.editCountOut.text = self.oldOutString;
        }
        if(this.editCountOut.text != ""){
            if(self.isNumber(this.editCount.text) == true) {
                let x = String(this.editCountOut.text).indexOf('.') + 1; // x point的位置
                if(x == 0) x = this.editCountOut.text.length;
                let pointendnum = String(this.editCountOut.text).length - x;  // 小数点后面的位置
                if(pointendnum > 2){
                    this.editCountOut.text = self.oldString;
                } 
                else self.oldString = this.editCountOut.text;
            }
            else this.editCountOut.text = self.oldOutString;
        }       
        
        this.calOutRate();
    }

    private outHandlerOut(evt:eui.UIEvent):void{
        this.calOutRate();
    }

    private setOptionBtn():void{
        var self = this;
        var imgName = ["zrdyx","zcdqb","chongzhi","tixian","jilu"];
        //var imgName = ["zhaunru","zhuanchu","chongzhi","tixian"];
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           imgName = ["e_zrdyx","e_zcdqb","chongzhi","tixian","jilu"];
        }
        var num = imgName["length"];
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
        self.curBtnIdx = index
        self.setPropItem(index);  // 传kind
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
            posY += item.getViewHeight() + 20;
        }
        self.scrOptionBtn.height = posY;
    }

    //设置道具
    private setPropItem(kind:number):void{
        var self = this;
        self.InGroup.$setVisible(false)
        self.OutGroup.$setVisible(false)
        self.ChargeGroup.$setVisible(false)
        self.CashGroup.$setVisible(false)
        self.RecordGroup.$setVisible(false)
        
        if(kind == 0){
            self.InGroup.$setVisible(true)

        }else if(kind == 1){

            self.OutGroup.$setVisible(true)
        }else if(kind == 2){  // 充值
            self.ChargeGroup.$setVisible(true)

        }else if(kind == 3){   // 提现
            self.CashGroup.$setVisible(true);

        }else{
            self.RecordGroup.$setVisible(true);
            self.reqGetChangeRecordList();
        }
    }

    public reqGetChangeRecordList():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        let obj = new Object();
        obj["pageid"] = this.pageId;
        obj["pageSize"] = this.pageSize;
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_ChangeRecord,obj,true);

    }

    public getExchangeGroup():eui.Group{
        return this.mallskingroup;
    }

    public getOutAllBtn():eui.Button{
        return this.btnOutAll;
    }

    public getOutConfirmBtn():eui.Button{
        return this.btnOutConfirm;
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
