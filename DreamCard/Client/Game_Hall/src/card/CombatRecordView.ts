// TypeScript file
class CombatRecordView extends BaseView{

    public static NAME:string = "CombatRecordSkin";

     public constructor(){
        super(CombatRecordView.NAME);
    }

    private btnBack:eui.Button;     //返回按钮

    private scrRecordBtn:eui.Scroller;  //选项按钮下拉滚动区域
    private groupRecordBtn:eui.Group;   //选项按钮下拉区域层

    private arrRecordBtn:Array<RecordBtnView>= new Array<RecordBtnView>();  //记录选项按钮容器
    private curChooseRecordBtnIndex:number; //当前选中选项按钮下标

    private groupDetails:eui.Group; //详情区域

    private labRecordId:eui.Label;
    private labLeftCombat:eui.Label;
    private labRightCombat:eui.Label;
    private imgLeftBG:eui.Image;
    private imgRightBG:eui.Image;
    private labLeftName:eui.Label;
    private labRightName:eui.Label;
    private imgLeftHead:eui.Image;
    private imgRightHead:eui.Image;
    private imgLeftRes:eui.Image;
    private imgRightRes:eui.Image;
    private rightFrame:eui.Image;    

    private recordskingroup:eui.Group;
    private groupLeftHeadFrame:eui.Group;
    private groupRightHeadFrame:eui.Group;
    private groupleftFetters:eui.Group;
    private groupRightFetters:eui.Group;
    private groupLeftCardHeads:eui.Group;
    private groupRightCardHeads:eui.Group;
    // private labLeftFetters:eui.Label;

    // private labRightFetters:eui.Label;
    private arrCardHeadView:Array<CardHeadView> = new Array<CardHeadView>();
    private arrCardFetters:Array<eui.Label> = new Array<eui.Label>();
    private arrCircle:Array<egret.Shape> = new Array<egret.Shape>();

    private needUp:boolean = false;
    private mallName:Object = []
    private jbList:Object = []
    private pageId:number = 0; //下标从0开始，为了*方便，0代表第一个页面
    private pageSize:number = 8;
    private duizhanTxt = "对战ID:";

    protected week():void{
        var self = this;
        var tp = LanguageManager.getInstance().getCurLanguageType();
        if(tp == 1){
           self.duizhanTxt = "Combat ID:";
        }

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }
        self.scrRecordBtn.addEventListener(eui.UIEvent.CHANGE, self.moveHandler, self);
        self.scrRecordBtn.addEventListener(eui.UIEvent.CHANGE_END, self.outHandler, self);

        self.initView(false);
        self.sendGetRecordList(); // 初始申请数据
    }
    private initView(isShow:boolean):void{
        this.groupDetails.$setVisible(isShow);
        ExternalFun.prototype.setImgGray(this.imgRightHead);
        ExternalFun.prototype.setImgGray(this.rightFrame);        
    }

    //发送请求卡牌列表
    private sendGetRecordList():void{
        //战绩
        var account123 = GlobalDataManager.getInstance().getAccountData();
        var namestr = account123["uname"]
        let obj:Object = {ratity:namestr, pageid:1, pageSize:8}
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Record,obj,true);
    }

    protected sleep():void{
        this.cleanArray(this.arrRecordBtn);
        this.cleanRecord();
    }

    private cleanRecord()
    {
        this.cleanArray(this.arrCardHeadView);
        this.cleanArrayLabel(this.arrCardFetters);
        this.cleanArrayShape(this.arrCircle);
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

    private cleanArrayLabel(arr:Array<eui.Label>):void{
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

    private cleanArrayShape(arr:Array<egret.Shape>):void{
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
            case HallCmdDef.CMD_Record:  //获取队伍配置

                self.pageId = parseInt(data["pageId"]) // 页面id

                var num = data["msg"]["length"]   // 10 条记录
                for(var k:number = 0; k < num; k++)
                {
                    var obj = data["msg"][k]
                    self.mallName[k + (self.pageId-1) * this.pageSize] = obj
                }

                var num1 = data["jbconfig"]["length"]  // 羁绊表
                for(var k:number = 0; k < num1; k++)
                {
                    var obj = data["jbconfig"][k]
                    var jbconfigId:number = data["jbconfig"][k]["code"]
                    self.jbList[jbconfigId] = obj
                }

                if(num > 0){
                    self.initView(true);
                    this.setRecordBtn();
                    self.setDetails(0);
                }
                
            break;
        }
     }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        if(event.target instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>event.target;
            if(btn.name.substr(0,10)=="btnRecord_"){
                var strArr:Array<string> = btn.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.setCurChooseOptionBtnByIndex(cIndex);
                self.cleanRecord();
                self.setDetails(cIndex);
            }else if(btn==self.btnBack){
                self.hiden();
                // UIManager.getInstance().hideUI(self,HideViewEffectType.TYPE_MOVE_LEFT);
            }

        }
    }

    private moveHandler(evt: eui.UIEvent): void {
        if(this.scrRecordBtn.viewport.scrollV > (this.scrRecordBtn.viewport.contentHeight - this.scrRecordBtn.viewport.height) - 40){
			this.needUp = true;
		}
    }

    private outHandler(evt:eui.UIEvent):void{
        if(this.needUp){
			this.needUp = false;
			//this.addRecord();  // 拉到底
            // 这里是拉到底了
            var account123 = GlobalDataManager.getInstance().getAccountData();
            var namestr = account123["uname"]
            let obj:Object = {ratity:namestr, pageid:this.pageId+1, pageSize:this.pageSize}
            let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_Record,obj,false);
		}
    }
    private addRecord():void
    {
        this.setRecordBtn();        
    }


    //字符串转日期格式，strDate要转为日期格式的字符串 
    //测试 
    //alert(getDate("2016-6-14 11:20:00")); 
    private  getDate(strDate:string):Date { 
        var st = strDate; 
        var a = st.split(" "); 
        var b = a[0].split("-"); 
        var c = a[1].split(":"); 
        var date = new Date(parseInt(b[0]), parseInt(b[1])-1, parseInt(b[2]), parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));
        return date; 
    } 

    private setRecordBtn():void{
        var self = this;
        var num = self.mallName["length"];
        var curNum = self.arrRecordBtn.length;
        var account = GlobalDataManager.getInstance().getAccountData();
        for(var i:number = 0; i < (num-curNum); i++){
            var btnView:RecordBtnView = new RecordBtnView();
            btnView.init();
            self.groupRecordBtn.addChild(btnView);
            
            var dateString = self.mallName[i]["createDate"]
            var dateStart:Date = new Date(dateString);
            var miniStr = ExternalFun.prototype.add0(dateStart.getMinutes().toString(),2);
            var hourStr = ExternalFun.prototype.add0(dateStart.getHours().toString(),2);
            var monthStr = ExternalFun.prototype.add0((dateStart.getMonth() + 1),2)
            var dayStr = ExternalFun.prototype.add0(dateStart.getDate(),2)
            btnView.setBtnTmContent1(hourStr + ":" + miniStr);
            btnView.setBtnTmContent(monthStr + "-" + dayStr);
            
            var winname =  self.mallName[i + curNum]["winName"]
            if(account.getNick() == winname) {
                btnView.setBtnRewardImg(1);
                btnView.setBtnScoreContent("+" + self.mallName[i+curNum]["resultNum"]);
            }
            else {
                btnView.setBtnRewardImg(0);
                btnView.setBtnScoreContent("-" + self.mallName[i+curNum]["resultNumlost"]);
            }

            
            btnView.setBtnName("btnRecord_" + (i+curNum));
            btnView.x = 10;
            btnView.width = btnView.getViewWidth();
            btnView.height = btnView.getViewHeight();
            btnView.y = btnView.getViewHeight() * i;
            self.arrRecordBtn.push(btnView);
        }
        
        //没有默认选中按钮 更新选项坐标即可
        self.updateOptionBtnPos();
        self.setCurChooseOptionBtnByIndex(0);
    }

    //设置当前选中选项按钮下标
    private setCurChooseOptionBtnByIndex(index:number):void{
        var self = this;
        var btnView:RecordBtnView = null;
        if(self.curChooseRecordBtnIndex!=null&&self.curChooseRecordBtnIndex!=-1){
            btnView = self.getOptionBtnViewByIndex(self.curChooseRecordBtnIndex);
            if(btnView==null)
                return;
            btnView.setCurChoose();
            if(self.curChooseRecordBtnIndex==index){
                self.curChooseRecordBtnIndex= -1;
                return;
            }
        }
        self.curChooseRecordBtnIndex = index;
        btnView = self.getOptionBtnViewByIndex(index);
        if(btnView==null)
            return;
        btnView.setCurChoose(1);

        self.updateOptionBtnPos();
    }

    //返回选项按钮视图根据下标
    private getOptionBtnViewByIndex(index:number):RecordBtnView{
        var retView:RecordBtnView = null;
        var self = this;
        for(var i:number=0,lengthI = self.arrRecordBtn.length;i<lengthI;i++){
            var btnView:RecordBtnView = self.arrRecordBtn[i];
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
        for(var i:number=0,lengthI:number = self.arrRecordBtn.length;i<lengthI;i++){
            var item:RecordBtnView = self.arrRecordBtn[i];
            if(item==null)
                continue;
            item.y = posY + 5;
            posY += item.getViewHeight() + 22;
        }
        // self.scrOptionBtn.height = posY;
    }


    //0 胜   1 败
    private setCombatResult(index:number):void{
        if(index == 0)
        {
          /*  this.imgLeftBG.source = "combatRecordSheet_json.a60x78_0";
            this.imgLeftRes.source = "combatRecordSheet_json.a54x58_1"; 
            this.imgRightBG.source = "combatRecordSheet_json.a60x78_1";
            this.imgRightRes.source = "combatRecordSheet_json.a54x58_0";*/
            var leftshape:egret.Shape = new egret.Shape();
            this.groupLeftHeadFrame.addChild(leftshape);
         //   leftshape.graphics.lineStyle(2,0x3d87f7);
          //  leftshape.graphics.drawCircle(39,39,35);
            
            var rightshape:egret.Shape = new egret.Shape();
            this.groupRightHeadFrame.addChild(rightshape);
           /* rightshape.graphics.lineStyle(2,0xb7092f);
            rightshape.graphics.drawCircle(39,39,35);
            this.arrCircle.push(leftshape);
            this.arrCircle.push(rightshape);*/
        }else{
            /*this.imgLeftBG.source = "combatRecordSheet_json.a60x78_1";
            this.imgLeftRes.source = "combatRecordSheet_json.a54x58_0";
            this.imgRightBG.source = "combatRecordSheet_json.a60x78_0";
            this.imgRightRes.source = "combatRecordSheet_json.a54x58_1";*/

            var leftshape:egret.Shape = new egret.Shape();
            this.groupLeftHeadFrame.addChild(leftshape);
         //   leftshape.graphics.lineStyle(2,0xb7092f);
         //   leftshape.graphics.drawCircle(39,39,35);
            var rightshape:egret.Shape = new egret.Shape();
            this.groupRightHeadFrame.addChild(rightshape);
           /* rightshape.graphics.lineStyle(2,0x3d87f7);
            rightshape.graphics.drawCircle(39,39,35);
            this.arrCircle.push(leftshape);
            this.arrCircle.push(rightshape);*/
        }  
    }

    private setLeftName(str:string):void{
        this.labLeftName.text = str;
    }

    private setRightName(str:string):void{
        this.labRightName.text = str;
    }

    private setLeftHead(str:string):void{
        if(str == "") str = "headicon_json.head_01";
        this.imgLeftHead.source = str;
    }

    private setRightHead(str:string):void{
        if(str == "") str = "headicon_json.head_01";
        this.imgRightHead.source = str;
    }

    private setLeftCombat(index:number):void{
        this.labLeftCombat.text = "" + index;
    }

    private setRightCombat(index:number):void{
        this.labRightCombat.text = "" + index;
    }

    private setRecordId(str:string):void{
        this.labRecordId.text = this.duizhanTxt + str;
    }


    private setLeftFetters(arr:Array<string>){
        for(var i:number=0;i<arr.length;i++)
        {
            var lab:eui.Label = new eui.Label();
            this.groupleftFetters.addChild(lab);
            lab.text = arr[i];
            lab.x = 0;
            lab.y = i*25;
            lab.width = 420;
            lab.height = 25;
            lab.textAlign = "left";
            lab.verticalAlign = "middle";
            lab.size = 20;
            lab.fontFamily = "SimHei";
            this.arrCardFetters.push(lab);
        }
    }

    private setRightFetters(arr:Array<string>){
        for(var i:number=0;i<arr.length;i++)
        {
            var lab:eui.Label = new eui.Label();
            this.groupRightFetters.addChild(lab);
            lab.text = arr[i];
            lab.x = 0;
            lab.y = i*25;
            lab.width = 420;
            lab.height = 25;
            lab.textAlign = "left";
            lab.verticalAlign = "middle";
            lab.size = 20;
            lab.fontFamily = "SimHei";
            this.arrCardFetters.push(lab);
        }
    }

    private setLeftCardHeads(index:number):void
    {

        var str:string =  this.mallName[index]["winCards"];
        let arr1 = str.split('|')
        var num = arr1.length;
         for(var i:number=0;i<num;i++){
            //以"· "为分隔符，截取上面的字符串。结果为五段
            var str:string =  arr1[i];
            let arr = str.split(',')
            var data:Object = {"icon":arr[0],name:arr[1],"rarity":arr[2],"element":arr[3],"generation":arr[4],"level":ExternalFun.prototype.levelnumTo5lvl(parseInt(arr[5])),combat:arr[6]};
            var headView:CardHeadView = new CardHeadView();
            headView.initData(data);
            
            this.groupLeftCardHeads.addChild(headView);

            this.arrCardHeadView.push(headView);
            if(i<5){
                headView.x = i*this.groupLeftCardHeads.width/5;
                headView.y=0;
            }else{
                headView.x = (i-5)*this.groupLeftCardHeads.width/5;
                headView.y = 160;
            }  
        }
    }

    private setRightCardHeads(index:number)
    {
        var str:string =  this.mallName[index]["loseCards"];
        let arr1 = str.split('|')
        var num = arr1.length;
        for(var i:number = 0; i < num; i++){
            var str:string =  arr1[i];
            let arr = str.split(',')
            var data:Object = {"icon":arr[0],name:arr[1],"rarity":arr[2],"element":arr[3],"generation":arr[4],"level":ExternalFun.prototype.levelnumTo5lvl(parseInt(arr[5])),combat:arr[6]};

            var headView:CardHeadView = new CardHeadView();
            headView.initData(data);
            headView.setGrayHead();
            this.groupRightCardHeads.addChild(headView);
            this.arrCardHeadView.push(headView);
            if(i<5){
                headView.x = i*this.groupRightCardHeads.width/5;
                headView.y=0;
            }else{
                headView.x = (i-5)*this.groupRightCardHeads.width/5;
                headView.y = 160;
            }
        }
    }

    //设置记录显示;
    private setDetails(index:number):void{

        var self = this;
        var curIdx:number = index
        self.setLeftName(self.mallName[curIdx]["winName"]);
        self.setRightName(self.mallName[curIdx]["loseName"]);
        self.setLeftHead(self.mallName[curIdx]["winIcon"]);
        self.setRightHead(self.mallName[curIdx]["loseIcon"]);
        self.setLeftCombat(self.mallName[curIdx]["winCap"]);
        self.setRightCombat(self.mallName[curIdx]["loseCap"]);
        self.setRecordId(self.mallName[curIdx]["settId"]);
        self.setLeftCardHeads(curIdx);
        self.setRightCardHeads(curIdx);
        var winjbidx:string = self.mallName[curIdx]["winJbid"];
      //  winjbidx =  "SKL10000000|SKL10000000"
        // 赢家羁绊
        var arr = winjbidx.split('|');
        var jblist: string[] = []
        for(var i:number = 0; i < arr.length; i++)
        {
            var idx = "0";
            if(arr[i] != ""){
                idx = arr[i] //"SKL1" + ExternalFun.prototype.add0(arr[i],7);
                jblist.push(self.jbList[idx]["name"])
            }
        }
       if(jblist.length > 0){
            self.setLeftFetters(jblist);
        }

        // 输家羁绊
        arr= [];
        jblist = []
        var losejbidx = self.mallName[curIdx]["loseJbid"];
   //     losejbidx =  "SKL10000000|SKL10000000"
        arr = losejbidx.split('|');
        for(var i:number = 0; i < arr.length; i++)
        {
           var idx = "0";
           if(arr[i] != ""){
                idx = arr[i] //"SKL1" + ExternalFun.prototype.add0(arr[i],7);
                jblist.push(self.jbList[idx]["name"])
           }
        }
        if(jblist.length > 0){
            self.setRightFetters(jblist);
        }
        
        
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.recordskingroup==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.recordskingroup.scaleX = 
            self.recordskingroup.scaleY = 1;
            return;
        }
        self.recordskingroup.scaleX = 
        self.recordskingroup.scaleY = gapNum;
    }
}
