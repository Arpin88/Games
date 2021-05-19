// TypeScript file
class JiBanData {
	//羁绊描述
	private dsc:string;
	private tittle:string;

	private jbList:Object = []
	
	public getDsc(key:string):string {
		return this.jbList[key].dsc;
	}
	public setDsc(uname:string):void {
		//this.jbList[key].dsc;
	}

	public getTittle(key:string):string {
		return this.jbList[key].tittle;
	}
	public setTittle(uname:string):void {
		this.tittle = uname;
	}

	public setJBnode(key:string,tittle:string,dsc:string)
	{
		this.jbList[key] = [];
		this.jbList[key].tittle = tittle;
		this.jbList[key].dsc = dsc;
	}

}