// TypeScript file
class ServerData{
    public static SERVER_HTTP_TYPE: number = 1;
    public static SERVER_SOCKET_TYPE: number = 2;
    private m_sname: string;

    private m_type:number;
    private m_resolverType:string;
    private m_host:string;
    private m_port:number;
    private m_surl:string;
    private m_hurl:string;
    private m_socket:egret.WebSocket;
    private m_request:egret.HttpRequest;
    private m_resolver:IResolver;


    public setSname(sname:string):void{
        this.m_sname = sname;
    }

    public getSname():string{
        return this.m_sname;
    }

    public setType(type:number):void{
        this.m_type = type;
    }

    public getType():number{
        return this.m_type;
    }

    public setResolverType(resolverType:string):void{
        this.m_resolverType = resolverType;
    }

    public getResolverType():string{
        return this.m_resolverType;
    }

    public setHost(host:string):void{
        this.m_host = host;
    }

    public getHost():string{
        return this.m_host;
    }

    public setPort(port:number):void{
        this.m_port = port;
    }

    public getPort():number{
        return this.m_port;
    }

    public setSurl(surl:string):void{
        this.m_surl = surl;
    }

    public getSurl():string{
        return this.m_surl;
    }

    public setHurl(hurl:string):void{
        this.m_hurl = hurl;
    }

    public getHurl():string{
        return this.m_hurl;
    }

    public setSocket(socket:egret.WebSocket):void{
        this.m_socket = socket;
    }

    public getSocket():egret.WebSocket{
        return this.m_socket;
    }

    public setRequest(request:egret.HttpRequest):void{
        this.m_request = request;
    }

    public getRequest():egret.HttpRequest{
        return this.m_request;
    }

    public setResolver(resolver:IResolver):void{
        this.setResolverType(resolver.name())
        this.m_resolver = resolver;
    }

    public getResolver():IResolver{
        return this.m_resolver;
    }
}