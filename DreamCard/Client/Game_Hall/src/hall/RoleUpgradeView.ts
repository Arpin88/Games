// TypeScript file
class RoleUpgradeView extends BaseView{
    public static NAME:string = "RoleUpgradeSkin";

     public constructor(){
        super(RoleUpgradeView.NAME);
    }

    private groupRoleUpgrade:eui.Group;

    private rectBG:eui.Rect;
    private btnClose:eui.Button;

    private lblOLvl:eui.Label;  //旧等级文本
    private lblNLvl:eui.Label;  //新等级文本
    private lblOHp:eui.Label;   //旧Hp文本
    private lblNHp:eui.Label;   //新Hp文本
    private lblOCost:eui.Label; //旧总费用文本
    private lblNCost:eui.Label; //新总费用文本
    private imgTitleUpgrade:eui.Image;   //标题角色升级图片
    private imgTitleLevelUp:eui.Image;   //标题升级详情图片

    private groupUpgrade:eui.Group;     //角色升级面板
    private groupUMaterial:eui.Group;   //提升材料面板
    // private prbLv:eui.ProgressBar;      //等级进度条
    private lblLvl:eui.Label;           //等级文本
    private lblLvProgress:eui.Label;    //等级进度文本
    private btnUCancel:eui.Button;      //角色升级取消按钮
    private btnUUser:eui.Button;        //角色使用按钮
    private btnGoShop:eui.Button;       //前往商城层
    private groupGoShop:eui.Group;      //前往商城层

    private groupLevelUp:eui.Group;     //角色等级提升面板

    private upgradeMaterialViewArr:Array<RoleUpgradeMaterialView>;  //升级材料视图
    private curSelMaterialView:RoleUpgradeMaterialView; //当前选中升级材料视图

    private labelObj:any;   //语言包

    protected week():void{
        var self =this;
        

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.groupUpgrade.visible = 
        self.imgTitleUpgrade.visible = true;
        self.groupLevelUp.visible = 
        self.imgTitleLevelUp.visible = false;

        self.upgradeMaterialViewArr = new Array<RoleUpgradeMaterialView>();

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);

        self.updateView();
        self.reqUpgradeMaterialList();
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        self.cleanUpgradeMaterialViewArr();
        self.labelObj = null;
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
            var btn:eui.Button = <eui.Button>tar;
            if(btn==self.btnUCancel){
                self.hiden();
            }else if(btn==self.btnUUser){
                if(self.curSelMaterialView==null||self.curSelMaterialView.getCount()<=0){
                    // PopManager.getInstance().showPromptBox("药品不足,请前往商城购买!",2,Handler.create(self,function(confirm:boolean){
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"],2,Handler.create(self,function(confirm:boolean){
                        self.hiden();
                        UIManager.getInstance().showUI(MallView);
                    }));
                    return;
                }
                // var exp:number = self.editExp.text==""?5:Number(self.editExp.text);
                // exp = exp==null||exp==0?5:exp;
                // //暂时先发送升级请求 等后面修改
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_UPGRADE_COMMANDER,{propCode:self.curSelMaterialView.getPropCode(),count:1},true);
            }else if(btn==self.btnClose){
                if(!self.groupUpgrade.visible){
                    self.imgTitleUpgrade.visible =
                    self.groupUpgrade.visible = true;
                    self.imgTitleLevelUp.visible = 
                    self.groupLevelUp.visible = false;
                    return;
                }
                self.hiden();
            }else if(btn==self.btnGoShop){ 
                self.hiden();
                UIManager.getInstance().showUI(MallView);
            }
        // }else if(tar instanceof eui.Rect){
            // if(tar==self.rectBG){
            //     self.hiden();
            // }
        }else if(tar instanceof eui.Group){
            var group:eui.Group = <eui.Group>event.target;
            if(group.name.substr(0,9)=="groupRUM_"){
                var strArr:Array<string> = group.name.split("_");
                if(strArr.length!=2){
                    return;
                }
                var index:number = Number(strArr[1]);
                var uview:RoleUpgradeMaterialView = self.upgradeMaterialViewArr[index];
                if(uview==null||uview==self.curSelMaterialView)
                    return;

                if(self.curSelMaterialView!=null)
                    self.curSelMaterialView.setSelect(false);

                uview.setSelect(true);
                self.curSelMaterialView = uview;
            }
        }
    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_UPGRADE_COMMANDER:  
                self.onUpgradeCommander(data);
            break;
            case HallCmdDef.CMD_GET_UPGRADE_MATERIAL_LIST:
                self.onGetUpgradeMaterialList(data);
            break;
        }
    }

    private updateView():void{
        var self = this;
        var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        self.lblLvl.text = account.getLvl()+"";
        self.lblLvProgress.text = account.getExp()+"/"+account.getUpexp();
        // self.groupGoShop.visible = true;
    }

    private reqUpgradeMaterialList():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_GET_UPGRADE_MATERIAL_LIST,{},true);
    }

    private onUpgradeCommander(data:any):void{
        if(data==null)
            return;

        var self = this;
        var lvl:number = data.lvl;
        var exp:number = data.exp;
        var upexp:number = data.upexp;
        var hp:number = data.hp;
        var count:number =data.count;
        var propCode:string = data.propCode;
        var cost:number = data.cost;

        var account:AccountData = GlobalDataManager.getInstance().getAccountData();

        if(lvl!=account.getLvl()){
            self.imgTitleUpgrade.visible = 
            self.groupUpgrade.visible = false;
            self.imgTitleLevelUp.visible = 
            self.groupLevelUp.visible = true;

            self.lblOLvl.text = account.getLvl()+"";
            self.lblNLvl.text = lvl+"";
            self.lblOHp.text = account.getHp()+"";
            self.lblNHp.text = hp+"";
            self.lblOCost.text = account.getCost()+"";
            self.lblNCost.text = cost+"";
        }


        if(lvl!=null)
            account.setLvl(lvl);
        if(exp!=null)
            account.setExp(exp);
        if(upexp!=null)
            account.setUpexp(upexp);
        if(hp!=null)
            account.setHp(hp);
        if(cost!=null)
            account.setCost(cost);
        if(count!=null&&propCode!=null){
            var totalCount:number = 0;
            for(var i:number=0,lengthI=self.upgradeMaterialViewArr.length;i<lengthI;i++){
                var uview:RoleUpgradeMaterialView = self.upgradeMaterialViewArr[i];
                if(uview==null)
                    continue;
                if(uview.getPropCode()==propCode+"")
                    uview.setCount(count);
                // if(count==0&&self.curSelMaterialView==uview)
                //     self.curSelMaterialView = null;
                totalCount+=uview.getCount();
            }
        }

        
        self.updateView();
        self.groupGoShop.visible = totalCount<=0;

        var full:number = data.full;        
        if(full!=0)
            PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"],2);
            // PopManager.getInstance().showPromptBox("已达到满级,使用失败!",2);
        // if(full==0)
        //     PopManager.getInstance().showPromptBox("使用成功!",2);
        // else
        //     PopManager.getInstance().showPromptBox("已达到满级,使用失败!",2);

        
        GameEventManager.getInstance().dispatchEvent(HallEvent.updateUserInfo);

    }

    private onGetUpgradeMaterialList(data:any):void{
        if(data==null)
            return;

        var self = this;
        self.cleanUpgradeMaterialViewArr();
        var gapX:number = 25;
        var count:number = 0;
        for(var i:number=0,lengthI=data.length;i<lengthI;i++){
            var item:any = data[i];
            if(item==null)
                continue;
            var umView:RoleUpgradeMaterialView = new RoleUpgradeMaterialView();
            umView.initData({mdata:item,gname:"groupRUM_"+i});
            self.groupUMaterial.addChild(umView);

            umView.x = (i*(umView.getViewWidth()+gapX));
            if(item.count!=null){
                count+=item.count;

                if(self.curSelMaterialView==null&&item.count!=0){
                    self.curSelMaterialView = umView;
                    umView.setSelect(true);
                }
            }
                
            self.upgradeMaterialViewArr.push(umView);
        }

        if(count==0){
            self.curSelMaterialView = self.upgradeMaterialViewArr[0];
            self.curSelMaterialView.setSelect(true);
        }

        self.groupGoShop.visible = count==0;
    }

    

    private cleanUpgradeMaterialViewArr():void{
        var self = this;
        self.curSelMaterialView = null;
        if(self.upgradeMaterialViewArr!=null&&self.upgradeMaterialViewArr.length!=0){
            for(var i:number=self.upgradeMaterialViewArr.length-1;i>=0;i--){
                var item:RoleUpgradeMaterialView = self.upgradeMaterialViewArr[i];
                if(item!=null&&item.parent!=null){
                    item.parent.removeChild(item);
                }
                self.upgradeMaterialViewArr.splice(i,1);
            }
        }
        
    }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupRoleUpgrade==null)
            return;
        var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        var curWidth:number = self.$stage.stageWidth;
        var curHeight:number = self.$stage.stageHeight;
        var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        if(gapNum>1||gapNum<0){
            self.groupRoleUpgrade.scaleX = 
            self.groupRoleUpgrade.scaleY = 1;
            return;
        }
        self.groupRoleUpgrade.scaleX = 
        self.groupRoleUpgrade.scaleY = gapNum;
    }
}