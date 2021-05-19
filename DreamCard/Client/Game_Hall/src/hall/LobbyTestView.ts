// TypeScript file
class LobbyTestView extends BaseView{

    public static NAME:string = "SetSkin";
  //  public static NAME:string = "LobbySkin";

     public constructor(){
        super(LobbyTestView.NAME);
    }

    public $onAddToStage(stage:egret.Stage,nestLevel:number):void{
        super.$onAddToStage(stage,nestLevel);
        Hall.onGameShow();
    }

    private BtnZhuXiao:eui.Button;      //注销并退出
    private btnCard:eui.Button;         //卡牌按钮
    private btnCombat:eui.Button;       //战斗按钮
    private btnCardGroup:eui.Button;    //卡组按钮
    private btnExtract:eui.Button;      //十连抽按钮

    private btnMall:eui.Button;         //商城按钮
    private btnPackage:eui.Button;      //背包按钮
    private btnActivity:eui.Button;     //活动按钮
    private btnFetters:eui.Button;      //羁绊按钮
    private btnCombatRecord:eui.Button; //战斗记录按钮
    private btnSetUp:eui.Button;        //设置按钮

    private comHead:eui.Component;      //头像
    private comNotable:eui.Component;   //跑马灯
    private comStar:eui.Component;      //星星

    public static arrMsg: Array<any>;   //跑马灯消息列表

    protected week():void{
        var self = this;

        if(!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.touchTap,self);
        }

        LobbyTestView.arrMsg = new Array<any>();
        var obj = {nna:"标题:",nde:"内容内容内容内容内容内容内容内容66"};
        LobbyTestView.arrMsg.push(obj);

    }

    protected sleep():void{
        
    }

    public recvData(data:any):void{
        //  var self = this;
        // switch(data.cmd){

        // }

    }

    private touchTap(event:egret.TouchEvent):void{
        var self = this;
        let tar:Object = event.target as Object;
        if(tar instanceof eui.Button){
            SoundManager.getInstance().PlayClickSound();
           if(tar==self.BtnZhuXiao){
                UIManager.getInstance().showUI(LobbyTestView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,{});
            }
        }
    }
  /*  private showUI( data:any ):void{
         UIManager.getInstance().showUI(LobbyTestView,GameScene.VIEW_LAYER_NUMBER,-1,0,0,ShowViewEffectType.TYPE_NOR,data);
    }*/

}