// TypeScript file
class HallEvent extends egret.Event{

    public static Data:string = "dispData";
    //更新金币
    public static updateGold:string = "updateGold";
    //更新用户信息
    public static updateUserInfo:string = "updateUserInfo";
    //更新道具
    public static updateProp:string = "updateProp";
    
    //当获取到道具类型
    public static onGetProptypeComplete:string = "onGetProptypeComplete";


    //更新新手引导下一步操作
    public static updateGuideNextStep:string = "updateGuideNextStep";

    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
}