// TypeScript file
class PublicMethodManager{
    private static m_manager:PublicMethodManager = new PublicMethodManager();
    public static getInstance():PublicMethodManager{
        return PublicMethodManager.m_manager;
    }


    public getOSType():number{
        var type:string = egret.Capabilities.os;
        var ret:number = -1;
        switch(type){
            case "Unknow":ret =0;
            case "Windows PC":ret =1;
            case "iOS": ret =2;
            case "Android": ret = 3;
            case "Windows Phone": ret =4;
            case "Mac OS": ret = 5;
        }
        return ret;
    }

    // public static REGEX_TO_USER:string = "^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$";
    public static REGEX_TO_USER:string = "^[a-zA-Z0-9_]{6,22}$";
    public static REGEX_TO_PHONE:string = "^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[2-7])|(17[0-8])|(18[0-9])|(19[0-9]))\\d{8}$";//"^[1][3,4,5,7,8][0-9]{9}$";
    public static REGEX_TO_NICK:string = "^[0-9a-zA-Z\u4e00-\u9fa5]{1,16}$";
    public static REGEX_TO_PSD:string = "^[a-zA-Z0-9_-]{6,18}$";
    public static REGEX_TO_EMAIL:string = "^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$";
    public checkRegex(regex:string,param:string):boolean{
        var reg:RegExp = new RegExp(regex);
        return reg.test(param);
    }

    public loginOut():void{
        let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_GAME_LOGOUT,{});
        egret.localStorage.setItem("ticket","");
        GMDManager.closeGMD();
        UIManager.getInstance().removeAllLayerUI();
        UIManager.getInstance().showUI(LoginView);
    }

    //获取卡牌品质
    public getCardRarity(rarity:string):string{
        var str:string = rarity;
        switch(rarity){
            case "common":
            str = "lbl_0";
            break;
            case "rare":
            str = "lbl_1";
            break;
            case "epic":
            str = "lbl_2";
            break;
            case "legendary":
            str = "lbl_3";
            break;
            case "mythical":
            str = "lbl_4";
            break;
        }
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage("Common");
        if(labelObj==null)
            return rarity;
        return labelObj[str];
    }

    //获取卡牌五行
    public getCardElement(element:string):string{
        var str:string = element;
        switch(element){
            case "metal":
            str = "lbl_5";
            break;
            case "wood":
            str = "lbl_6";
            break;
            case "water":
            str = "lbl_7";
            break;
            case "fire":
            str = "lbl_8";
            break;
            case "earth":
            str = "lbl_9";
            break;
        }
        var labelObj:any = LanguageManager.getInstance().getLabelLanguage("Common");
        if(labelObj==null)
            return element;
        return labelObj[str];
    }

    //返回概率字符串 (xxoo%s,10) => xxoo10
    public getProbabilityStr(data:any,pro:Array<any>):string{
        var str :string = data;
        var strArr:Array<string> = str.split('%s');
        if(strArr.length<2)
            return data;
        
        if(strArr.length<=pro.length+1){
            str = "";
            for(var i:number=0,lengthI:number = strArr.length;i<lengthI;i++){
                str+=  (i!=lengthI-1?(strArr[i] + pro[i]):strArr[i])
            }
        }else{
            for(var i:number=0,lengthI:number = pro.length;i<lengthI;i++){
                str+=  (strArr[i] + pro[i]);
            }
            for(var i:number=pro.length,lengthI:number = strArr.length;i<lengthI;i++){
                str+= strArr[i];
            }
        }
        return str;
    }

    //————————————解决精确浮点数bug运算
    //digitLength 获取到数字的小数部分的位数，这是变为整数的关键。
    private digitLength(num: number): number {
        // 1.11 -> eSplit: ['1.11']
        // 1.11e-30 -> eSplit: ["1.11", "-30"]
        const eSplit = num.toString().split(/[eE]/)
        // 右边的 `|| ''` 为了防止 1e-30 -> eSplit: ["1", "-30"] 这种
        // 左边 1.11 有两个小数，右边 e 后面有 -30，所以是 2 - (-30) 为 32
        const len = (eSplit[0].split('.')[1] || '').length - Number(eSplit[1] || 0)
        return len > 0 ? len : 0
    }

    //baseNum 计算出让 num1、num2 都为整数的最小 10 的倍数
    private baseNum(num1: number, num2: number): number {
        return Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    }

    //加法计算
    public plus(num1: number, num2: number): number {
        const bn = this.baseNum(num1, num2)
        return (num1 * bn + num2 * bn) / bn
    }

    //减法计算
    public minus(num1: number, num2: number): number {
        const bn = this.baseNum(num1, num2)
        return (num1 * bn - num2 * bn) / bn
    }

    //乘法计算
    public times(num1: number, num2: number): number {
        const bn = this.digitLength(num1) + this.digitLength(num2)
        const intNum1 = num1 * Math.pow(10, this.digitLength(num1))
        const intNum2 = num2 * Math.pow(10, this.digitLength(num2))
        return (intNum1 * intNum2) / Math.pow(10, bn)
    }

    //除法计算
    public divide(num1: number, num2: number): number {
        const bn = this.baseNum(num1, num2)
        const intNum1 = num1 * bn
        const intNum2 = num2 * bn
        return intNum1 / intNum2
    }
    //————————————END————————————————

}