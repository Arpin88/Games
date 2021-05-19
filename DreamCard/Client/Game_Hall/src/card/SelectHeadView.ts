// TypeScript file
class SelectHeadView extends BaseView{

    public static NAME:string = "SelectHeadSkin";

     public constructor(){
        super(SelectHeadView.NAME);
    }
    private rectBG:eui.Rect;
    private btnConfirm:eui.Button;
    private btnCancel:eui.Button;
    private showTxt:eui.Label;
    private func:any = null;
    private scrPropItem:eui.Scroller; 
    private groupPropItem:eui.Group; 
    private hIndex:number = 0;
    private vIndex:number = 0;
    private arrPropItem:Array<HeadItemView> = new Array<HeadItemView>();   
    private selectHeadStr:string = "";

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        var data = super.getData();
        if(data==null)
            return;
        var type = data.name;
        this.func = data.fun;
        this.selectHeadStr = data.iconUrl;
        
        this.initView();
    }

    private cleanArray(arr:Array<BaseView>):void{
        if(arr==null||arr.length<=0)
            return;
        for(var i = arr.length - 1; i >= 0; i--){
            var item = arr[i];
            if(item!=null){
                var parent:egret.DisplayObjectContainer = item.parent;
                parent.removeChild(item);
            }
            arr.splice(i,1);
        }
    }

    private setLight(cIndex:number):void{
        var namestring:string = "groupPI_" + cIndex;

        for(var i = this.arrPropItem.length; i >= 0; i--){
             var item:HeadItemView = this.arrPropItem[i-1];
            if(item!=null){
                if(i == cIndex){
                    item.setBeenSelect(true);
                }else{
                    item.setBeenSelect(false);
                }                
            }
        }
    }

    private initView():void{
        var self = this;
        var hMaxCount:number = 5;
       
        var width:number = self.scrPropItem.width/hMaxCount;
        var lenght:number = 46
        var hIndex:number = 0;
        var vIndex:number = 0;
        for(var i:number = 1 ;i < lenght; i++){
            var view:HeadItemView = new HeadItemView();
            var headStr = "headicon_json.head_" + ExternalFun.prototype.add0(i,2);
            var data:Object = {"icon":headStr,"name":"a","num":0};
            view.initData(data);
            self.groupPropItem.addChild(view);
            view.x = hIndex*(width - 6) + 20;
            view.y = vIndex*(view.getViewHeight() + 12);
            view.width = view.getViewWidth();
            view.height = view.getViewHeight();
            view.setGroupName("groupPI_" + i);
            self.arrPropItem.push(view);
            hIndex++;
            if(hIndex >= hMaxCount){
                hIndex=0;
                vIndex++;
            }
        }
    }

    protected sleep():void{
        this.cleanArray(this.arrPropItem);
        this.scrPropItem.viewport.scrollV = 0;
        this.scrPropItem.viewport.scrollH = 0;
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            if(tar==self.btnConfirm){
                self.hiden();
 
                if(this.func != null)
                {
                    this.func(this.selectHeadStr);
                }
                
            }else if(tar==self.btnCancel){
                self.hiden();

            }
        }else if(tar instanceof eui.Rect){
            if(tar==self.rectBG){
                self.hiden();
            }
        }
        else if(event.target instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,8)=="groupPI_"){
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2){
                    return;
                }

                var cIndex:number = Number(strArr[1]);
                this.selectHeadStr = "headicon_json.head_" + ExternalFun.prototype.add0(cIndex,2);
                this.setLight(cIndex);
            }
        }
    }
}