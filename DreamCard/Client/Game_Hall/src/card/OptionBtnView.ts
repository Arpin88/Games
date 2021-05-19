// TypeScript file
class OptionBtnView extends BaseView{
    public static NAME:string = "OptionBtnSkin";

     public constructor(){
        super(OptionBtnView.NAME);
    }

    private groupOB:eui.Group;
    private btnOption:eui.Button;
    private lblDes:eui.Label;
    private imgChooseState:eui.Image;
    private groupItem:eui.Group;

    private imgLabel:eui.Image;
    private imgLabelStr:string = "";
    private curChooseState:number = 0;
    private lblDesNColor:number;
    private lblDesStrokeNColor:number;
    private lblDesCColor:number;
    private lblDesStrokeCColor:number;

    private arrOptionBtnItem:Array<OptionBtnItemView>= new Array<OptionBtnItemView>();  //选项子按钮容器
    private curChooseOptionBtnItemIndex:number; //当前选中选项子按钮下标

    private ItemGroupHeight:number = 0;

    protected week():void{
        var self = this;
        self.lblDesNColor = 0xbbafb9;
        self.lblDesStrokeNColor = 0x13131b;
        self.lblDesCColor = 0xfffce1;
        self.lblDesStrokeCColor = 0xffc926;

        self.setCurChoose();
    }

    protected sleep():void{
        var self = this;
        self.cleanArray(self.arrOptionBtnItem);
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

    //返回视图%
    public getViewWidth():number{
        return this.groupOB.width;
    }

    //返回视图高度
    public getViewHeight():number{
        var self = this;
        var height:number = self.groupOB.height;
        return height;
    }

    // //设置按钮内容;
    // public setBtnContent(str:string):void{
    //     this.lblDes.text = str;
    // }

    public setBtnImgContent(str:string):void{
         this.lblDes.$setVisible(false);
         this.imgLabel.$setVisible(true);
         this.imgLabelStr = str;
         this.imgLabel.source = "hallText0Sheet_json." + this.imgLabelStr  + "00";
    }

    //设置选中状态 换图片
    public setChooseState():void{
        var btnNor_Image:eui.Image = <eui.Image>this.btnOption.getChildAt(0);
        var arr2States = this.btnOption.skin.states;
        var property2Down:eui.SetProperty = <eui.SetProperty>arr2States[1].overrides[0];
        btnNor_Image.source = property2Down.value;
    }

    //返回按钮内容;
    public getBtnContent():string{
        return this.lblDes.text;
    }

    //设置按钮name
    public setBtnName(name:string):void{
        this.btnOption.name = name;
    }

    //返回按钮name
    public getBtnName():string{
        return this.btnOption.name;
    }

    public setItemGroupHeight(num:number):void{
        this.ItemGroupHeight = num;
    }


    //设置当前是否为选择状态;0为正常状态,1为选中状态 按钮是否可以点击 
    public setCurChoose(state:number = 0,btnTouchEnabled:boolean = false):void{
        var self = this;
        if(self.curChooseState==state)
            return;
        self.curChooseState = state;
        self.lblDes.textColor = state==0?self.lblDesNColor:self.lblDesCColor;
        self.lblDes.strokeColor = state==0?self.lblDesStrokeNColor:self.lblDesStrokeCColor;

        if(this.imgLabelStr != ""){
            var str = "";
            str = state==0?this.imgLabelStr + "00":this.imgLabelStr + "01";
            this.imgLabel.source = "hallText0Sheet_json." + str;
        }
        

        if(btnTouchEnabled)
            self.btnOption.touchEnabled = state==0;

        self.imgChooseState.visible = state==1;
        // self.groupItem.visible = state==1;

        if(state==0&&self.curChooseOptionBtnItemIndex!=null){
            var btnView:OptionBtnItemView = self.getOptionBtnItemViewByIndex(self.curChooseOptionBtnItemIndex);
            if(btnView==null)
                return;
            btnView.setCurChoose();
            self.curChooseOptionBtnItemIndex = -1;
        }
    }

    //返回当前选择状态
    public getCurChooseState():number{
        return this.curChooseState;
    }

    //返回选择的子按钮下标
    public getCurChooseOptionBtnItemIndex():number{
        return this.curChooseOptionBtnItemIndex;
    }

    //添加子选项
    public addItem(optionBtnItemView:OptionBtnItemView):void{
        var self =this;
        self.arrOptionBtnItem.push(optionBtnItemView);
        self.groupItem.addChild(optionBtnItemView);
    }

    //设置子选项选中状态
    public setItemChooseState(index:number,btnTouchEnabled:boolean = false):void{
        var self = this;
        var btnView:OptionBtnItemView = null;
        if(self.curChooseOptionBtnItemIndex!=null&&self.curChooseOptionBtnItemIndex!=-1){
            btnView = self.getOptionBtnItemViewByIndex(self.curChooseOptionBtnItemIndex);
            if(btnView==null)
                return;
            btnView.setCurChoose(0,btnTouchEnabled);
            if(self.curChooseOptionBtnItemIndex==index){
                self.curChooseOptionBtnItemIndex = -1
                return;
            }
        }
        self.curChooseOptionBtnItemIndex = index;
        btnView = self.getOptionBtnItemViewByIndex(index);
        if(btnView==null)
            return;
        btnView.setCurChoose(1,btnTouchEnabled);
    }

    //返回选项子按钮视图根据下标
    private getOptionBtnItemViewByIndex(index:number):OptionBtnItemView{
        var self = this;
        if(index<0||index>=self.arrOptionBtnItem.length)
            return null;
        var retView:OptionBtnItemView = null;
        for(var i:number=0,lengthI = self.arrOptionBtnItem.length;i<lengthI;i++){
            var btnView:OptionBtnItemView = self.arrOptionBtnItem[i];
            if(btnView==null)
                continue;
            var btnName:string = btnView.getBtnName();
            var strArr:Array<string> = btnName.split("_");
            if(strArr.length!=3){
                continue;
            }
            var cIndex:number = Number(strArr[2]);
            if(index==cIndex){
                retView = btnView;
                break;
            }
        }

        return retView;
    }

    public hiddenGroupItem():void{
        this.groupItem.height = 0;
        this.groupItem.visible = false;
    }

    public showGroupItem():void{
        this.groupItem.height = this.ItemGroupHeight;
        this.groupItem.visible = true;
    }

    public setBtnOptionEnable(state:boolean):void{
        this.btnOption.enabled = state;
    }

}