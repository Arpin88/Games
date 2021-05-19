// TypeScript file
class NetBase{
    //解析器;
    private m_resolvers: Object = new Object();
    //服务器列表;
    private m_serverMap: Object = new Object();
    private m_servers: Array<ServerData> = new Array<ServerData>();
    

    public registerResolver(resolver: IResolver):void{
        this.m_resolvers[resolver.name()] = resolver;
    }

    public getResolver(name: string): IResolver{
        return this.m_resolvers[name];
    }

    //注册服务器,必须要在resolver添加后才能添加服务器;
    public registerServer(server: ServerData):void{
        var sname:string = this.m_serverMap[server.getSname()];
        if(sname==null){
            this.m_servers.push(server);
            this.m_serverMap[server.getSname()] = server;
        }
    }

    //获取服务器信息;
    public getServerByName(sname:string):ServerData{
        return this.m_serverMap[sname];
    }

    public getServerByRequest(request:egret.HttpRequest):ServerData{
        var server:ServerData = null;
        for(var i:number=0;i<this.m_servers.length;i++){
            server = this.m_servers[i];
            if(request==server.getRequest()){
                break;
            }
        }
        return server;
    }

    public getServerBySocket(socket:egret.WebSocket):ServerData{
        var server:ServerData = null;
        for(var i:number=0;i<this.m_servers.length;i++){
            server = this.m_servers[i];
           if(socket==server.getSocket()){
                break;
            }
        }
        return server;
    }

    public getWebSocketServers():Array<ServerData>{
        var array_server_data:Array<ServerData> = new Array<ServerData>();
        var server:ServerData = null;
        var socket: egret.WebSocket = null;
        for(var i:number= 0;i<this.m_servers.length;i++){
            server = this.m_servers[i];
            socket = server.getSocket();
            if(socket!=null&&socket.connected){
                array_server_data.push(server);
            }
        }
        return array_server_data;
    }

    public removeServerByName(sname:string):boolean{
        if(this.m_serverMap.hasOwnProperty(sname)){
            delete this.m_serverMap[sname];
            return true;
        }
        return false;
    }
}