// TypeScript file
class FilterView extends BaseView{
    public static NAME:string = "FilterSkin";

     public constructor(){
        super(FilterView.NAME);
    }

    private groupCGPSort:eui.Group;

    private rectBG:eui.Rect;    //背景遮罩

    private scrFilterItem:eui.Scroller;       //排序选项滚动区域
    private groupFilterItem:eui.Group;        //排序选项滚动层
    
    private filterItemViewHeight:number;    //排序选项视图高度

    private onChangeStart:boolean;        //当选中排序开始改变
    private curChooseSIIndex:number;      //当前选中排序下标
    private constChooseSIIndex:number;    //最开始选择的下标
    private arrFetterItem:Array<FilterItemView> = new Array<FilterItemView>();     //长方形卡牌容器
    private arrSIPosY:Array<number> = new Array<number>();   //长方形卡牌坐标

    private sortItemScrViewGroup0:eui.Group;        //排序选项滚动区域生成顶用层;
    private sortItemScrViewGroup1:eui.Group;        //排序选项滚动区域生成顶用层;

    // private arrTeamList:Array<Object>;
    private callBackHandler:Handler;
    private clickMove:boolean;
    // private isTouchMove:boolean = false;
    private movingState:boolean = false;   //移动状态

    protected week():void{
        var self =this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.scrFilterItem.addEventListener(eui.UIEvent.CHANGE_START,self.onChangeStartHandler,self);
        self.scrFilterItem.addEventListener(egret.Event.CHANGE,self.onChangeHanlder,self);
        self.scrFilterItem.addEventListener(eui.UIEvent.CHANGE_END,self.onChangeEndHandler,self);
        self.scrFilterItem.addEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrFilterItem.addEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        var data = super.getData();
        if(data==null)
            return;
        
        // self.arrTeamList = data.teamList;
        // self.setSortItem(self.arrTeamList);
        var desArr:Array<string> = data.desArr;
        self.setSortItem(desArr);
        var selIndex:number = data.selIndex;
        var selStr:string = data.selStr;
        //如果选择下标为null则判断是否有选择文字;
        if(desArr!=null&&selIndex==null&&selStr!=null){
            for(var i:number=0,lengthI:number = desArr.length;i<lengthI;i++){
                var item:string = desArr[i];
                if(item==null)
                    continue;
                if(item==selStr){
                    selIndex = i;
                    break;
                }
            }
        }
        selIndex = (selIndex==null||selIndex==undefined)?-1:selIndex;
        self.scrollToItem(selIndex,false);
        //点击选项层移动
        var clickMove:boolean = data.clickMove;
        clickMove = clickMove==null?true:clickMove;
        self.clickMove = clickMove;

        self.callBackHandler = data.cbHandler;
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.scrFilterItem.removeEventListener(eui.UIEvent.CHANGE_START,self.onChangeStartHandler,self);
        self.scrFilterItem.removeEventListener(egret.Event.CHANGE,self.onChangeHanlder,self);
        self.scrFilterItem.removeEventListener(eui.UIEvent.CHANGE_END,self.onChangeEndHandler,self);
        self.scrFilterItem.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,self.onCancelHandler,self);
        self.scrFilterItem.removeEventListener(egret.TouchEvent.TOUCH_END,self.onEndHandler,self);

        if(self.sortItemScrViewGroup0!=null){
            self.sortItemScrViewGroup0.parent.removeChild(self.sortItemScrViewGroup0);
            self.sortItemScrViewGroup0 = null;
        }

        if(self.sortItemScrViewGroup1!=null){
            self.sortItemScrViewGroup1.parent.removeChild(self.sortItemScrViewGroup1);
            self.sortItemScrViewGroup1 = null;
        }

        self.cleanArray(self.arrFetterItem);

        while(self.arrSIPosY.length){
            self.arrSIPosY.pop();
        }
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


    private onCancelHandler():void{
        this.movingState = true;
    }

    private onEndHandler():void{
        this.movingState = false;
    }


    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                SoundManager.getInstance().PlayClickSound();
                self.hiden();
            }
        }else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>tar;
            if(group.name.substr(0,16)=="groupFetterItem_"){
                if(self.movingState)
                    return;
                SoundManager.getInstance().PlayClickSound();
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var cIndex:number = Number(strArr[1]);
                self.onClickFetterItem(cIndex);
            }
        }
    }

    private onClickFetterItem(index:number):void{
        var self = this;
        if(self.curChooseSIIndex==index){
            if(self.callBackHandler!=null)
                self.callBackHandler.runWith([index]);
        }else{//点击选项层自动选择效果
            if(self.clickMove)
                self.scrollToItem(index);
        } 
    }


    private setSortItem(data:Array<Object>):void{
        if(data==null)
            return;
        var self = this;
        self.filterItemViewHeight = 0;
        var gapHeight:number = 0;
        var count:number = data.length;
        var selIndex:number = 0;
        for(var i:number=0;i<count;i++){
            var view:FilterItemView = new FilterItemView();
            view.initData({des:data[i],gName:"groupFetterItem_"+i});;
            self.groupFilterItem.addChild(view);
            if(self.filterItemViewHeight==0)
                self.filterItemViewHeight = view.height;
            if(gapHeight==0)
                gapHeight = self.scrFilterItem.height/2-self.filterItemViewHeight/2;
            
            view.horizontalCenter = "0";
            var posY:number = i*view.height+gapHeight;
            view.y = posY;
            self.arrFetterItem.push(view);
            self.arrSIPosY.push(posY);
        }

        var group0:eui.Group = new eui.Group();
        group0.x = 0;
        group0.y = 0;
        group0.width = 0;
        group0.height = self.scrFilterItem.height/2-self.filterItemViewHeight/2;
        self.groupFilterItem.addChild( group0 );
        self.sortItemScrViewGroup0 = group0;

        var group1:eui.Group = new eui.Group();
        group1.x = 0;
        group1.y = self.filterItemViewHeight*count+gapHeight;
        group1.width = 0;
        group1.height = self.scrFilterItem.height/2-self.filterItemViewHeight/2;
        self.groupFilterItem.addChild( group1 );
        self.sortItemScrViewGroup1 = group1;

        self.constChooseSIIndex = selIndex;
        self.scrollToItem(selIndex,false);
    }

    /**拖动开始*/
    private onChangeStartHandler() {
        this.onChangeStart = true;
    }

    private onChangeHanlder(e:eui.UIEvent):void{
        this.checkScale();
    }

    private onChangeEndHandler():void{
        var self = this;
        if(self.onChangeStart){
            self.onChangeStart = false;
            this.autoScrollToItem();
        }
    }

    /*** 自动选择*/
    private autoScrollToItem(): void {
        var self = this;
        self.scrollToItem(self.curChooseSIIndex);
    }

    private scrollToItem(index:number,playAni:boolean = true){
        var self = this;
        if(index==-1){
            return;
        }
        self.curChooseSIIndex = index;
        let scrollV:number =  self.arrSIPosY[index]-self.scrFilterItem.height/2+self.filterItemViewHeight/2;
        egret.Tween.removeTweens(self.scrFilterItem.viewport);
        if(playAni){
            SoundManager.getInstance().PlaySound("shaixuan_mp3");
            egret.Tween.get(self.scrFilterItem.viewport).to({ scrollV: scrollV },100).call(self.checkScale,self);
        }else{
            self.scrFilterItem.viewport.scrollV = scrollV;
            self.checkScale();
        }
    }

    private checkScale():void{
        var self = this;
        let sc = self.scrFilterItem;
        // var 
        for(var i:number=0,lengthI=self.arrFetterItem.length;i<lengthI;i++){
            let item = self.arrFetterItem[i];
            // let chaz = item.y-sc.viewport.scrollV-sc.height/2 + self.filterItemViewHeight/2;
            let chaz = self.arrSIPosY[i]-sc.viewport.scrollV-sc.height/2 + self.filterItemViewHeight/2;
            var scale:number = 1;
            var alpha:number = 1;
            var gapHeight:number = 0;
            if(Math.abs(chaz)<=self.filterItemViewHeight/2 && Math.abs(chaz)>=0){
                if(chaz<0){
                    scale = 1+chaz/1000;
                }else if(chaz>0){
                    scale = 1-chaz/1000;
                }else if(Math.abs(chaz)==0){
                    scale = 1;
                }
                alpha = 1-(Math.abs(chaz)/1000);
                if(self.curChooseSIIndex!=i)
                    SoundManager.getInstance().PlaySound("shaixuan_mp3");
                self.curChooseSIIndex = i;
            } else if(Math.abs(chaz)<=(self.filterItemViewHeight*1.5)){
                scale = Number((1-((1-0.88)*(Math.abs(chaz)/(self.filterItemViewHeight)))).toFixed(2));
                alpha = Number((1-((1-0.64)*(Math.abs(chaz)/(self.filterItemViewHeight)))).toFixed(2));
            } else {
                scale = Number((1-((1-0.76)*(Math.abs(chaz)/(self.filterItemViewHeight*2)))).toFixed(2));
                alpha = Number((1-((1-0.26)*(Math.abs(chaz)/(self.filterItemViewHeight*2)))).toFixed(2));
            }
            item.scaleX =
            item.scaleY =  scale;
            item.alpha = alpha;
            item.y = self.arrSIPosY[i]+(1-scale)*self.filterItemViewHeight/2;
        }
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupCGPSort==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupCGPSort.scaleX = 
            self.groupCGPSort.scaleY = 1;
            return;
        }
        self.groupCGPSort.scaleX = 
        self.groupCGPSort.scaleY = gapNum;
    }
}