// TypeScript file
class AccountData {
	//用户名
	private uname:string;
	//密码
    private psd:string;
	//唯一标识符
    private ticket:string;
	//昵称
    private nick:string;
	//金币
	private gold:number;
	//积分
	private points:number;
	//等级
	private lvl:number;
	//经验
	private exp:number;
	//升级需要的经验
	private upexp:number;
	//经验卡倍数
	private muexp:number;
	//到期时间
	private etime:number;
	//vip
	private vip:number;
	//vip开始时间
	private vip_st:number;
	//花费
	private cost:number;
	//血量
	private hp:number;
	//头像资源路径
	private head_url:string;
	//性别;0为男1为女;
	private sex:number = 0;	
	//引导步骤
	private guide_step:string = "";
	
	public getUName():string {
		return this.uname;
	}
	public setUName(uname:string):void {
		this.uname = uname;
	}

    public getPSD():string {
		return this.psd;
	}
	public setPSD(psd:string):void {
		this.psd = psd;
	}

    public getTicket():string {
		return this.ticket;
	}
	public setTicket(ticket:string):void {
		this.ticket = ticket;
	}
	
    public getNick():string {
		return this.nick;
	}
	public setNick(nick:string):void {
		this.nick = nick;
	}

	public getGold():number {
		return this.gold;
	}
	public setGold(gold:number):void {
		this.gold = gold;
	}

	public getPoints():number {
		return this.points;
	}
	public setPoints(points:number):void {
		this.points = points;
	}

	public getLvl():number {
		return this.lvl;
	}
	public setLvl(lvl:number):void {
		this.lvl = lvl;
	}

	public getExp():number {
		return this.exp;
	}
	public setExp(exp:number):void {
		this.exp = exp;
	}

	public getUpexp():number {
		return this.upexp;
	}
	public setUpexp(upexp:number):void {
		this.upexp = upexp;
	}

	public getMuexp():number {
		return this.muexp;
	}
	public setMuexp(muexp:number):void {
		this.muexp = muexp;
	}

	public getEtime():number {
		return this.etime;
	}
	public setEtime(etime:number):void {
		this.etime = etime;
	}

	public getVip():number {
		return this.vip;
	}
	public setVip(vip:number):void {
		this.vip = vip;
	}

	public getVip_St():number {
		return this.vip_st;
	}
	public setVip_St(vip_st:number):void {
		this.vip_st = vip_st;
	}

	public getCost():number {
		return this.cost;
	}
	public setCost(cost:number):void {
		this.cost = cost;
	}

	public getHp():number {
		return this.hp;
	}
	public setHp(hp:number):void {
		this.hp = hp;
	}

    public getSex():number {
		return this.sex;
	}
	public setSex(sex:number):void {
		this.sex = sex;
	}

    public getHead_Url():string {
		return this.head_url;
	}
	public setHead_Url(head_url:string):void {
		this.head_url = head_url;
	}

	public getGuide_Step():string {
		return this.guide_step;
	}
	public setGuide_Step(guide_step:string):void {
		this.guide_step = guide_step;
	}
}