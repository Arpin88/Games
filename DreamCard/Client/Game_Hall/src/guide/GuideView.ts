// TypeScript file
class GuideView extends BaseView{
    public static NAME:string = "GuideSkin";

    public constructor(){
        super(GuideView.NAME);
    }

    private groupGuide:eui.Group;

    private groupFirst:eui.Group;
    private lblContent:eui.Label;
    private btnNext:eui.Button;
    private btnPass:eui.Button;

    private groupDynamic:eui.Group; //动态层

    private curStep:string; //当前步骤
    private curDStep:number;    //当前小步骤

    private labelObj:any;   //语言包

    private firstOpen:boolean = true;   //第一次打开 用于改变尺寸更新视图
    protected week():void{
        var self = this;
        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        GameEventManager.getInstance().addEventListener(HallEvent.updateGuideNextStep,self,self.onNextStep);

        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        var data = super.getData();
        if(data==null)
            return;

        self.curStep = data.step;
        self.curDStep = 0;
        // self.updateView();
        egret.setTimeout(function(){
                self.updateView();
            }.bind(self), self, 100);
    }

    protected sleep():void{
        var self = this;
        if(self.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        
        GameEventManager.getInstance().removeEventListener(HallEvent.updateGuideNextStep,self,self.onNextStep);
    }

    private updateView():void{
        var self = this;
        if(self.curStep==""){
            self.hiden();
        }else if(self.curStep=="0"){
            self.groupFirst.visible = true;
            self.lblContent.text = self.labelObj["lbl_0"];
            self.groupDynamic.visible = false;
        }else if(self.curStep=="1"){
            self.groupFirst.visible = false;
            self.groupDynamic.visible = true;
 
            self.cleanDynamicGroup();

            if(self.curDStep==0){
                var hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
                var scale:number = hallView.getHallGroup().scaleX;
                var clickBtn:eui.Button = hallView.getChargeBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX/2*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY/2*scale).toFixed(2));

                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.x = point.x+width;
                shp.y = point.y+height;
                self.drawMask(shp,0);

                var label:eui.Label = self.createLabel(self.groupDynamic);
                label.x = point.x+(250*scale);
                label.y = point.y-(200*scale);
                label.width = 300;
                label.text = self.labelObj["lbl_1"];
                label.scaleX = 
                label.scaleY = scale;

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(120*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }else if(self.curDStep==1){
                var exchangeView:ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
                var scale:number = exchangeView.getExchangeGroup().scaleX;
                var clickBtn:eui.Button = exchangeView.getOutAllBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));

                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x-(10*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 160;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));

            }else if(self.curDStep==2){
                var exchangeView:ExchangeView = UIManager.getInstance().getViewByName(ExchangeView) as ExchangeView;
                var scale:number = exchangeView.getExchangeGroup().scaleX;
                var clickBtn:eui.Button = exchangeView.getOutConfirmBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));

                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x-(20*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 160;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));
            }

        }else if(self.curStep=="2"){
            self.groupFirst.visible = false;
            self.groupDynamic.visible = true;
 
            self.cleanDynamicGroup();

            if(self.curDStep==0){
                var hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
                var scale:number = hallView.getHallGroup().scaleX;
                var clickBtn:eui.Button = hallView.getExtractBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX/2*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY/2*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width+20*scale);
                shp.graphics.endFill();
                shp.x = point.x+width;
                shp.y = point.y+height;
                self.drawMask(shp,0);

                var label:eui.Label = self.createLabel(self.groupDynamic);
                label.x = point.x-(400*scale);
                label.y = point.y;
                label.width = 300;
                label.text = self.labelObj["lbl_2"];
                label.scaleX = 
                label.scaleY = scale;

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x;
                imageFinger.y = point.y-(5*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 160;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));

            }else if(self.curDStep==1){
                var extractView:ExtractView = UIManager.getInstance().getViewByName(ExtractView) as ExtractView;
                var scale:number = extractView.getExtractGroup().scaleX;
                var clickBtn:eui.Button = extractView.getBuyBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));

                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(230*scale);
                imageFinger.y = point.y-(50*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }
        }else if(self.curStep=="3"){
            self.groupFirst.visible = false;
            self.groupDynamic.visible = true;
 
            self.cleanDynamicGroup();

            if(self.curDStep==0){
                var hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
                var scale:number = hallView.getHallGroup().scaleX;
                var clickBtn:eui.Button = hallView.getMallBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX/2*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY/2*scale).toFixed(2));

                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.x = point.x+width;
                shp.y = point.y+height;
                self.drawMask(shp,0);

                var label:eui.Label = self.createLabel(self.groupDynamic);
                label.x = point.x+(250*scale);
                label.y = point.y-(200*scale);
                label.width = 300;
                label.text = self.labelObj["lbl_3"];
                label.scaleX = 
                label.scaleY = scale;

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(120*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }else if(self.curDStep==1){
                var mallView:MallView = UIManager.getInstance().getViewByName(MallView) as MallView;
                var scale:number = mallView.getMallGroup().scaleX;
                var clickItem:MPropItemView = mallView.getExpPotionsItem();
                var point:egret.Point = clickItem.localToGlobal();
                var width:number = 90*scale;//Math.floor(clickItem.width/2);
                var height:number = 90*scale;//Math.floor(clickItem.height/2);

                var shp:egret.Shape = new egret.Shape();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width);
                shp.graphics.endFill();
                shp.x = point.x+width - 6*scale;
                shp.y = point.y+height;
                self.drawMask(shp,0);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(180*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }else if(self.curDStep==2){
                var mPropExplainView:MPropExplainView = UIManager.getInstance().getViewByName(MPropExplainView) as MPropExplainView;
                var scale:number = mPropExplainView.getMPropExplainGroup().scaleX;
                var clickBtn:eui.Button = mPropExplainView.getConfirmBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));

                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(220*scale);
                imageFinger.y = point.y-(40*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }
            
        }else if(self.curStep=="4"){
            self.groupFirst.visible = false;
            self.groupDynamic.visible = true;
 
            self.cleanDynamicGroup();

            if(self.curDStep==0){
                var hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
                var scale:number = hallView.getHallGroup().scaleX;
                var clickBtn:eui.Button = hallView.getCardBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX/2*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY/2*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width+15*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.x = point.x+width;
                shp.y = point.y+height;
                self.drawMask(shp,0);
                
                var label:eui.Label = self.createLabel(self.groupDynamic);
                label.x = point.x-(400*scale);
                label.y = point.y+(200*scale);
                label.width = 300;
                label.text = self.labelObj["lbl_4"];
                label.scaleX = 
                label.scaleY = scale;

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(20*scale);
                imageFinger.y = point.y+(100*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 80;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }else if(self.curDStep==1){
                var cardView:CardView = UIManager.getInstance().getViewByName(CardView) as CardView;
                var scale:number = cardView.getCardGroup().scaleX;
                var clickView:CardSquareView = cardView.getCardSquareViewItem();
                var point:egret.Point = clickView.localToGlobal();
                var width:number = Number((clickView.width*clickView.scaleX/2*scale).toFixed(2));
                var height:number = Number((clickView.height*clickView.scaleY/2*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width+20*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.x = point.x+width;
                shp.y = point.y+height;
                self.drawMask(shp,0);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(120*scale);
                imageFinger.y = point.y+(150*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 330;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));

            }else if(self.curDStep==2){
                var cardOperationView:CardOperationView = UIManager.getInstance().getViewByName(CardOperationView) as CardOperationView;
                var scale:number = cardOperationView.getCardOperationGroup().scaleX;
                var clickBtn:eui.Button = cardOperationView.getLvlUpBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(140*scale);
                imageFinger.y = point.y+(50*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 330;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));

            }else if(self.curDStep==3){
                var cardOperationView:CardOperationView = UIManager.getInstance().getViewByName(CardOperationView) as CardOperationView;
                var scale:number = cardOperationView.getCardOperationGroup().scaleX;
                var clickBtn:eui.Button = cardOperationView.getUserItemBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(220*scale);
                imageFinger.y = point.y-(40*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }
        }else if(self.curStep=="5"){
            self.groupFirst.visible = false;
            self.groupDynamic.visible = true;
 
            self.cleanDynamicGroup();

            if(self.curDStep==0){
                var hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
                var scale:number = hallView.getHallGroup().scaleX;
                var clickBtn:eui.Button = hallView.getCardGroupBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX/2*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY/2*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawCircle( 0, 0, width+15*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.x = point.x+width;
                shp.y = point.y+height;
                self.drawMask(shp,0);
                
                var label:eui.Label = self.createLabel(self.groupDynamic);
                label.x = point.x-(400*scale);
                label.y = point.y+(200*scale);
                label.width = 300;
                label.text = self.labelObj["lbl_5"];
                label.scaleX = 
                label.scaleY = scale;

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(20*scale);
                imageFinger.y = point.y+(100*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 80;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }else if(self.curDStep==1){
                var cardGroupView:CardGroupView = UIManager.getInstance().getViewByName(CardGroupView) as CardGroupView;
                var scale:number = cardGroupView.getCardGroupGroup().scaleX;
                var clickBtn:eui.Button = cardGroupView.getCGEditBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x-(10*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 160;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));
            }else if(self.curDStep==2){
                var cardGroupSetView:CardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView) as CardGroupSetView;
                var scale:number = cardGroupSetView.getCardGroupSetGroup().scaleX;
                var clickView0:CardRectangleView = cardGroupSetView.getCardRectangleViewItem();
                var point:egret.Point = clickView0.localToGlobal();
                var width:number = Number((clickView0.width*clickView0.scaleX*scale).toFixed(2));
                var height:number = Number((clickView0.height*clickView0.scaleY*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var label:eui.Label = self.createLabel(self.groupDynamic);
                label.x = point.x+(400*scale);
                label.y = point.y-(200*scale);
                label.width = 300;
                label.text = self.labelObj["lbl_6"];
                label.scaleX = 
                label.scaleY = scale;

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x+(230*scale);
                imageFinger.y = point.y-(50*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 280;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));

            }else if(self.curDStep==3){
                var cardGroupSetView:CardGroupSetView = UIManager.getInstance().getViewByName(CardGroupSetView) as CardGroupSetView;
                var scale:number = cardGroupSetView.getCardGroupSetGroup().scaleX;
                var clickBtn:eui.Button = cardGroupSetView.getSaveBtn();
                var point:egret.Point = clickBtn.localToGlobal();
                var width:number = Number((clickBtn.width*clickBtn.scaleX*scale).toFixed(2));
                var height:number = Number((clickBtn.height*clickBtn.scaleY*scale).toFixed(2));
                
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x000000, 1);
                shp.graphics.drawRect( 0, 0, width+8*scale, height+8*scale);
                shp.graphics.endFill();
                shp.scaleX = 
                shp.scaleY = scale;
                shp.anchorOffsetX = shp.width/2;
                shp.anchorOffsetY = shp.height/2;
                shp.x = point.x + width/2;
                shp.y = point.y + height/2;
                self.drawMask(shp,1);

                var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
                imageFinger.x = point.x-(10*scale);
                imageFinger.y = point.y-(20*scale);
                imageFinger.scaleX = 
                imageFinger.scaleY = scale;
                imageFinger.rotation = 160;
                var posX:number = imageFinger.x;
                var posY:number = imageFinger.y;
                self.setFingerImageTween(imageFinger,posX,posY,posX+(50*scale),posY+(50*scale));

            }
        }else if(self.curStep=="6"){
            self.groupFirst.visible = false;
            self.groupDynamic.visible = true;
 
            self.cleanDynamicGroup();

            var hallView:HallView = UIManager.getInstance().getViewByName(HallView) as HallView;
            var scale:number = hallView.getHallGroup().scaleX;
            var clickBtn:eui.Button = hallView.getCombatBtn();
            var point:egret.Point = clickBtn.localToGlobal();
            var width:number = Number((clickBtn.width*clickBtn.scaleX/2*scale).toFixed(2));
            var height:number = Number((clickBtn.height*clickBtn.scaleY/2*scale).toFixed(2));
            
            var shp:egret.Shape = new egret.Shape();
            shp.graphics.beginFill( 0x000000, 1);
            shp.graphics.drawCircle( 0, 0, width+20*scale);
            shp.graphics.endFill();
            shp.scaleX = 
            shp.scaleY = scale;
            shp.x = point.x+width;
            shp.y = point.y+height;
            self.drawMask(shp,0);
            
            var label:eui.Label = self.createLabel(self.groupDynamic);
            label.x = point.x-(400*scale);
            label.y = point.y+(200*scale);
            label.width = 300;
            label.text = self.labelObj["lbl_7"];
            label.scaleX = 
            label.scaleY = scale;

            var imageFinger:eui.Image = self.createFingerImage(self.groupDynamic);
            imageFinger.x = point.x+(20*scale);
            imageFinger.y = point.y+(100*scale);
            imageFinger.scaleX = 
            imageFinger.scaleY = scale;
            imageFinger.rotation = 80;
            var posX:number = imageFinger.x;
            var posY:number = imageFinger.y;
            self.setFingerImageTween(imageFinger,posX,posY,posX-(50*scale),posY+(50*scale));
        }
    }

    private cleanDynamicGroup():void{
        var self = this;
        if(self.groupDynamic==null||self.groupDynamic.numChildren<=0)
            return;
        for(var i:number=self.groupDynamic.numChildren-1;i>=0;i--){
            self.groupDynamic.removeChildAt(i);
        }
    }

    public recvData(cmd:HallCmdDef,data:any):void{
        var self = this;
        switch(cmd){
            case HallCmdDef.CMD_SET_GUIDE_STEP:
                var step:string = data.step;
                GlobalDataManager.getInstance().getAccountData().setGuide_Step(step);
                // if(step==""||step=="1"||step=="2")
                    self.hiden();       
            break;
        }
    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            if(tar==self.btnNext){
                self.onNextStep();
            }else if(tar==self.btnPass){
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":""});
                // self.hiden();
            }
        // }else if(tar instanceof eui.Rect){
            // if(tar==self.rectBG){
            //     self.hiden();
            // }
        }
    }


    private onNextStep():void{
        var self = this;
        if(self.curStep=="0"){
            self.curStep = "1";
            self.curDStep = 0;
        }else if(self.curStep=="1"){
            self.curDStep++;
            if(self.curDStep==3){
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":"2"});
            }
        }else if(self.curStep=="2"){
            self.curDStep++;
            if(self.curDStep==2){
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":"3"});
            }
        }else if(self.curStep=="3"){
            self.curDStep++;
            if(self.curDStep==3){
                // self.curDStep = 0;
                // self.curStep = "4";
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":"4"});
            }
        }else if(self.curStep=="4"){
            self.curDStep++;
            if(self.curDStep==4){
                // self.curDStep = 0;
                // self.curStep = "5"
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":"5"});
            }
        }else if(self.curStep=="5"){
            self.curDStep++;
            if(self.curDStep==4){
                // self.curDStep = 0;
                // self.curStep = "6";
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":"6"});
            }
        }else if(self.curStep=="6"){
            self.curDStep++;
            if(self.curDStep==1){
                // self.curDStep = 0;
                // self.curStep = "7";
                let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(),HallCmdDef.CMD_SET_GUIDE_STEP,{"step":""});
            }
        }

        // self.updateView();
         egret.setTimeout(function(){
                self.updateView();
            }.bind(self), self, 100);
    }

    /**
	* 绘制遮罩
	*/
	private drawMask(target: egret.DisplayObject,type:number = -1) {
        var self = this;

        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        let blendShape = new egret.Shape();					 	// 用来作为遮挡背景
        blendShape.graphics.beginFill(0x000000, 0.7);
        blendShape.graphics.drawRect(0, 0, self.groupDynamic.width, self.groupDynamic.height);
        blendShape.graphics.endFill();
        container.addChild(blendShape);
        container.addChild(target);
        target.blendMode = egret.BlendMode.ERASE;

        if(type!=-1&&target instanceof egret.Shape){
            var glowShape:egret.Shape = new egret.Shape();
            glowShape.graphics.beginFill( 0xffffff, 1);
            if(type==0)
                glowShape.graphics.drawCircle( 0, 0, target.width/2);
            else
                glowShape.graphics.drawRect( 0, 0, target.width,target.height);
            glowShape.graphics.endFill();
            glowShape.x = target.x;
            glowShape.y = target.y;
            glowShape.scaleX = 
            glowShape.scaleY = target.scaleX;
            glowShape.anchorOffsetX = target.anchorOffsetX;
            glowShape.anchorOffsetY = target.anchorOffsetY;
            const color: number = 0xffd158;                             /// 光晕的颜色，十六进制，不包含透明度
            const alpha: number = 0.8;                                  /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。  
            const blurX: number = 35;                                   /// 水平模糊量。有效值为 0 到 255.0（浮点）
            const blurY: number = 35;                                   /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            const strength: number = 3;                                 /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            const quality: number = egret.BitmapFilterQuality.HIGH;     /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
            const inner: boolean = false;                               /// 指定发光是否为内侧发光，暂未实现
            const knockout: boolean = true;                            /// 指定对象是否具有挖空效果，暂未实现
            const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
            glowShape.filters=[glowFilter];
            container.addChild(glowShape);
        }

        let renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(container);
        let blendBitmap = new egret.Bitmap(renderTexture);
        self.groupDynamic.addChild(blendBitmap);


        blendBitmap.touchEnabled = false;  // 允许点击
        blendBitmap.pixelHitTest = true;  // 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。
    }

    /**
	* 创建文本
	*/
    private createLabel(parent:egret.DisplayObjectContainer = null):eui.Label{
        var label:eui.Label = new eui.Label();
        label.size = 28;
        label.textColor = 0xffffff;
        label.fontFamily = "SimHei";
        label.lineSpacing = 10;
        if(parent!=null)
            parent.addChild(label);
        return label;
    }

    /**
	* 创建手指图片
	*/
    private createFingerImage(parent:egret.DisplayObjectContainer = null):eui.Image{
        var image:eui.Image = new eui.Image();
        image.source = "guideSheet_json.y2";
        image.touchEnabled = false;
        image.pixelHitTest = true;  //启用点击穿透属性
        image.anchorOffsetX = image.width/2;
        image.anchorOffsetY = image.height/2;
        if(parent!=null)
            parent.addChild(image);
        return image;
    }

    /**
	* 设置手指图片动画
	*/
    private setFingerImageTween(image:eui.Image,posX:number,posY:number,movePosX:number,movePosY:number):void{
        if(image==null)
            return;
        egret.Tween.get(image,{loop:true}).to({x:movePosX,y:movePosY},600).to({x:posX,y:posY},600);
    }

    // /**
	// * 创建光圈图片type 0长方形按钮光圈 1圆形按钮光圈 2长方形卡牌光圈
	// */
    // private createHaloImage(type:number,parent:egret.DisplayObjectContainer = null):eui.Image{
    //     var image:eui.Image = new eui.Image();
    //     var source:string = "y0";
    //     if(type==0)
    //         source = "y0";
    //     else if(type==1)
    //         source = "y1";
    //     else if(type==2)
    //         source = "y3";
    //     image.source = "guideSheet_json."+source;
    //     image.touchEnabled = false;
    //     image.pixelHitTest = true;    //启用点击穿透属性
    //     if(parent!=null)
    //         parent.addChild(image);
    //     return image;
    // }

    protected onResize(event?:egret.Event):void{
        super.onResize(event);
        var self = this;
        if(self.groupGuide==null)
            return;
        if(self.firstOpen)
            self.firstOpen = false;
        else
            egret.setTimeout(function(){
                    self.updateView();
                }.bind(self), self, 100);
        
        // var width:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_WIDTH:GlobalDef.SCREEN_HEIGHT;
        // var height:number = GlobalDef.SCREEN_WIDTH>GlobalDef.SCREEN_HEIGHT?GlobalDef.SCREEN_HEIGHT:GlobalDef.SCREEN_WIDTH;
        // var curWidth:number = self.$stage.stageWidth;
        // var curHeight:number = self.$stage.stageHeight;
        // var gapNum:number = Number(((curWidth/curHeight)/(width/height)).toFixed(2));
        // if(gapNum>1||gapNum<0){
        //     self.groupGuide.scaleX = 
        //     self.groupGuide.scaleY = 1;
        //     return;
        // }
        // self.groupGuide.scaleX = 
        // self.groupGuide.scaleY = gapNum;
        
    }
}