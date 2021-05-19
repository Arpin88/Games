// TypeScript file
class ErrorMananger{
    private static m_manager:ErrorMananger = new ErrorMananger();
    public static getInstance():ErrorMananger{
        return ErrorMananger.m_manager;
    }


    public checkReqResult(data:any,errorPopup:boolean = true,callbackHandler:Handler = null):boolean{
        var error:boolean = false;
        if(data.result==undefined||data.result!=GlobalDef.REQUEST_SUCCESS){
            error = true;
            if(errorPopup){
                var errors:any = RES.getRes("error_json");
                if(errors!=null&&errors!=undefined){
                    var context:string = null;
                    var msg = data.msg;
                    if(msg!=null)
                        context = errors[msg];
                    if(context==null||context==undefined)
                        context = errors["-999"]==null?"亲!发生未知错误,请重新尝试!":errors["-999"];//"亲!发生未知错误,请重新尝试!";
                    
                    if(msg==-5){    //session过期 需要重新登录
                        PopManager.getInstance().showPromptBox(context,2,Handler.create(self,function(confirm:boolean){
                            PublicMethodManager.getInstance().loginOut();
                        }),["Back to login"]);
                    }else
                        PopManager.getInstance().showPromptBox(context,2,callbackHandler,null);
                }
            }
        }
        return error;
    }
}