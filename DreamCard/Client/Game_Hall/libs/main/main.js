var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// TypeScript file
var IBaseView = (function (_super) {
    __extends(IBaseView, _super);
    function IBaseView(name, data) {
        var _this = _super.call(this) || this;
        _this.m_state = 1;
        _this.m_layer = 0;
        _this.m_effectType = 0;
        _this.m_viewExml = null;
        _this.m_viewUrl = null;
        _this.m_oriMode = egret.OrientationMode.AUTO;
        var self = _this;
        self.name = name;
        self.m_data = data;
        return _this;
    }
    IBaseView.prototype.setData = function (data) {
        this.m_data = data;
    };
    IBaseView.prototype.getData = function () {
        return this.m_data;
    };
    IBaseView.prototype.getOriMode = function () {
        return this.m_oriMode;
    };
    IBaseView.prototype.getEffectType = function () {
        return this.m_effectType;
    };
    IBaseView.prototype.HasRES = function (name) {
        if (UITheme.hasTheme(name + "Skin")) {
            return name + "Skin";
        }
        else if (UITheme.hasTheme(name + "skin")) {
            return name + "Skin";
        }
        else if (UITheme.hasTheme(name + "Skin_exml")) {
            return name + "Skin_exml";
        }
        else if (UITheme.hasTheme(name + "skin_exml")) {
            return name + "skin_exml";
        }
        return "";
    };
    //视图界面初始化
    IBaseView.prototype.init = function (type, layer, popUpWidth, popUpHeight, effectType, data) {
        if (type === void 0) { type = 1; }
        if (layer === void 0) { layer = 0; }
        if (popUpWidth === void 0) { popUpWidth = 0; }
        if (popUpHeight === void 0) { popUpHeight = 0; }
        if (effectType === void 0) { effectType = 0 /* TYPE_NOR */; }
        if (data === void 0) { data = null; }
        var self = this;
        self.m_state = 1;
        self.m_layer = layer;
        if (popUpWidth != 0)
            self.width = popUpWidth;
        if (popUpHeight != 0)
            self.height = popUpHeight;
        self.m_effectType = effectType;
        if (data != null)
            self.m_data = data;
        //不填写name则寻找对应的皮肤文件
        if (self.name == null) {
            var rname = this["__proto__"]["__class__"];
            var mname = "";
            if ((mname = self.HasRES(rname)) != "") {
                self.name = mname;
            }
            else if (rname.indexOf("view") != -1 && (mname = self.HasRES(rname.substr(0, rname.indexOf("view")))) != "") {
                self.name = mname;
            }
            else if (rname.indexOf("View") != -1 && (mname = self.HasRES(rname.substr(0, rname.indexOf("View")))) != "") {
                self.name = mname;
            }
            else {
                egret.log("找不到皮肤文件:" + rname);
                return;
            }
        }
        self.skinName = UITheme.getTheme(self.name);
        self.m_state = 2;
        self.openView();
    };
    IBaseView.prototype.initData = function (data) {
        this.init(1, GameScene.VIEW_LAYER_NUMBER, 0, 0, 0, data);
    };
    IBaseView.prototype.show = function () {
        var self = this;
        if (self.m_state == 2) {
            self.openView();
        }
    };
    IBaseView.prototype.weekComplete = function () {
    };
    IBaseView.prototype.week = function () {
    };
    IBaseView.prototype.reWeek = function () {
        this.week();
    };
    IBaseView.prototype.openView = function () {
        var self = this;
        self.m_state = 3;
        self.lPackAssignment();
        self.week();
        if (self.m_layer != GameScene.HIDE_LAYER_NUMBER) {
            self.visible = true;
        }
        else {
            self.visible = false;
        }
        UIManager.getInstance().openViewEffect(self);
    };
    IBaseView.prototype.hiden = function () {
        var self = this;
        self.sleep();
        self.m_state = 2;
        self.visible = false;
    };
    IBaseView.prototype.sleep = function () {
    };
    //文本语言包赋值
    IBaseView.prototype.lPackAssignment = function () {
        var labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        if (labelObj == null)
            return;
        for (var lbl in labelObj) {
            this[lbl] = labelObj[lbl];
        }
    };
    IBaseView.prototype.registerTouchEvent = function (func) {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, func, self);
        }
    };
    IBaseView.prototype.removeTouchEvent = function (func) {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, self);
        }
    };
    return IBaseView;
}(eui.Component));
__reflect(IBaseView.prototype, "IBaseView");
// TypeScript file
var GameScene = (function () {
    function GameScene(_stage) {
        //游戏层;
        this.m_gameLayer = new eui.UILayer();
        //视图层;
        this.m_viewLayer = new eui.UILayer();
        //特效层;
        this.m_effectLayer = new eui.UILayer();
        //头部层;
        this.m_headLayer = new eui.UILayer();
        //底部层;
        this.m_bomLayer = new eui.UILayer();
        //弹窗层;
        this.m_popLayer = new eui.UILayer();
        this.init(_stage);
    }
    GameScene.prototype.init = function (_stage) {
        _stage.addChild(this.m_gameLayer);
        this.m_gameLayer.touchEnabled = true;
        _stage.addChild(this.m_viewLayer);
        this.m_viewLayer.touchEnabled = true;
        this.m_viewLayer.y = 0;
        _stage.addChild(this.m_effectLayer);
        this.m_effectLayer.touchEnabled = false;
        this.m_effectLayer.touchThrough = true;
        _stage.addChild(this.m_headLayer);
        this.m_headLayer.touchThrough = true;
        this.m_headLayer.top = 0;
        _stage.addChild(this.m_bomLayer);
        this.m_bomLayer.touchThrough = true;
        this.m_bomLayer.bottom = 0;
        _stage.addChild(this.m_popLayer);
        this.m_popLayer.touchThrough = true;
    };
    GameScene.prototype.getGameLayer = function () {
        return this.m_gameLayer;
    };
    GameScene.prototype.getViewLayer = function () {
        return this.m_viewLayer;
    };
    GameScene.prototype.getEffectLayer = function () {
        return this.m_effectLayer;
    };
    GameScene.prototype.getHeadLayer = function () {
        return this.m_headLayer;
    };
    GameScene.prototype.getBomLayer = function () {
        return this.m_bomLayer;
    };
    GameScene.prototype.getPopLayer = function () {
        return this.m_popLayer;
    };
    GameScene.GAME_LAYER_NUMBER = 0; //游戏层;
    GameScene.VIEW_LAYER_NUMBER = 1; //视图层;
    GameScene.EFFECT_LAYER_NUMBER = 2; //特效层;
    GameScene.HEAD_LAYER_NUMBER = 3; //头部层;
    GameScene.BOM_LAYER_NUMBER = 4; //底部层;
    GameScene.POP_LAYER_NUMBER = 5; //弹窗层;
    GameScene.HIDE_LAYER_NUMBER = 10; //隐藏层;
    return GameScene;
}());
__reflect(GameScene.prototype, "GameScene");
// TypeScript file
var NetBase = (function () {
    function NetBase() {
        //解析器;
        this.m_resolvers = new Object();
        //服务器列表;
        this.m_serverMap = new Object();
        this.m_servers = new Array();
    }
    NetBase.prototype.registerResolver = function (resolver) {
        this.m_resolvers[resolver.name()] = resolver;
    };
    NetBase.prototype.getResolver = function (name) {
        return this.m_resolvers[name];
    };
    //注册服务器,必须要在resolver添加后才能添加服务器;
    NetBase.prototype.registerServer = function (server) {
        var sname = this.m_serverMap[server.getSname()];
        if (sname == null) {
            this.m_servers.push(server);
            this.m_serverMap[server.getSname()] = server;
        }
    };
    //获取服务器信息;
    NetBase.prototype.getServerByName = function (sname) {
        return this.m_serverMap[sname];
    };
    NetBase.prototype.getServerByRequest = function (request) {
        var server = null;
        for (var i = 0; i < this.m_servers.length; i++) {
            server = this.m_servers[i];
            if (request == server.getRequest()) {
                break;
            }
        }
        return server;
    };
    NetBase.prototype.getServerBySocket = function (socket) {
        var server = null;
        for (var i = 0; i < this.m_servers.length; i++) {
            server = this.m_servers[i];
            if (socket == server.getSocket()) {
                break;
            }
        }
        return server;
    };
    NetBase.prototype.getWebSocketServers = function () {
        var array_server_data = new Array();
        var server = null;
        var socket = null;
        for (var i = 0; i < this.m_servers.length; i++) {
            server = this.m_servers[i];
            socket = server.getSocket();
            if (socket != null && socket.connected) {
                array_server_data.push(server);
            }
        }
        return array_server_data;
    };
    NetBase.prototype.removeServerByName = function (sname) {
        if (this.m_serverMap.hasOwnProperty(sname)) {
            delete this.m_serverMap[sname];
            return true;
        }
        return false;
    };
    return NetBase;
}());
__reflect(NetBase.prototype, "NetBase");
// TypeScript file
var BaseDecoder = (function () {
    function BaseDecoder() {
    }
    //请重写该方法;
    BaseDecoder.prototype.initDecoderFunction = function () {
    };
    BaseDecoder.prototype.removeDecoderFunction = function () {
    };
    //注册命令;
    BaseDecoder.prototype.registerCmd = function (cmd, func) {
        var decode = BaseDecode.getInstance();
        if (decode) {
            decode.registerFunction(cmd, func);
        }
    };
    //取消注册命令;
    BaseDecoder.prototype.unRegisterFunction = function (cmd) {
        var decode = BaseDecode.getInstance();
        if (decode) {
            decode.unRegisterFunction(cmd);
        }
    };
    return BaseDecoder;
}());
__reflect(BaseDecoder.prototype, "BaseDecoder");
// TypeScript file
var BaseResolver = (function () {
    function BaseResolver(name) {
        this.m_protoMap = new Object();
        //存放命令-proto的键值对
        this.m_cmdToProtoMap = new Object();
        //存放proto协议名-proto的键值对
        this.m_classToProtoMap = new Object();
        this.m_name = name;
    }
    BaseResolver.prototype.name = function () {
        return this.m_name;
    };
    BaseResolver.prototype.registerProto = function (protoName) {
        if (this.m_name == ProtoBufResolver.NAME) {
            var protoStr = RES.getRes(protoName);
            // this.m_protoMap[protoName] = dcodeIO.ProtoBuf.loadProto(protoStr);
        }
    };
    BaseResolver.prototype.registerCmdToProto = function (configs) {
        if (this.m_name == ProtoBufResolver.NAME) {
            if (configs != null && configs != undefined) {
                var config = null;
                for (var i = 0; i < configs.length; i++) {
                    config = configs[i];
                    this.doCmdToProto(config);
                }
            }
        }
    };
    BaseResolver.prototype.doCmdToProto = function (config) {
        if (this.m_name == ProtoBufResolver.NAME) {
            if (config && config.cmd != undefined) {
                var config = this.m_cmdToProtoMap[config.cmd];
                if (!config) {
                    this.m_classToProtoMap[config.cmd] = config;
                }
            }
        }
    };
    BaseResolver.prototype.registerClassNameToProto = function (className, protoName) {
        if (this.m_name == ProtoBufResolver.NAME) {
            if (className != null && className != undefined) {
                var protoName2 = this.m_classToProtoMap[className];
                if (protoName2 == null || protoName2 == undefined) {
                    this.m_classToProtoMap[className] = protoName;
                }
            }
        }
    };
    BaseResolver.prototype.cloneProtoResolverClassByCmd = function (cmd) {
        var config = this.m_cmdToProtoMap[cmd];
        return this.cloneProtoResolverClassByName(config.className);
    };
    BaseResolver.prototype.cloneProtoResolverClassByName = function (className) {
        var clazzInstance = null;
        if (this.m_name == ProtoBufResolver.NAME) {
            if (className != null && className != undefined) {
                var protoName2 = this.m_classToProtoMap[className];
                if (protoName2 != null && protoName2 != undefined) {
                    var proto = RES.getRes(protoName2);
                    // var builder:any = decodeIO.ProtoBuf.loadProto(proto);
                    // var clazz = builder.build(className);
                    // clazzInstance = new clazz();
                }
            }
        }
        return clazzInstance;
    };
    BaseResolver.prototype.registerPackageData = function (pag) {
        this.m_packageData = pag;
    };
    BaseResolver.prototype.getPackageData = function () {
        return this.m_packageData;
    };
    BaseResolver.prototype.parse = function (cmd, data, m) {
        if (m === void 0) { m = false; }
    };
    BaseResolver.prototype.decode = function (data) {
    };
    return BaseResolver;
}());
__reflect(BaseResolver.prototype, "BaseResolver", ["IResolver"]);
// TypeScript file
//自适应基类;
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView(name, data) {
        var _this = _super.call(this, name, data) || this;
        var self = _this;
        // self.addEventListener(egret.Event.ADDED_TO_STAGE,self.onAddToStage,self);
        self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self);
        // self.addEventListener(egret.Event.RENDER,self.onRender,self);
        self.addEventListener(eui.UIEvent.COMPLETE, self.onComplete, self);
        return _this;
    }
    //皮肤打开完成
    BaseView.prototype.onComplete = function (event) {
        var self = this;
        if (self.$stage == null)
            return;
        self.$stage.addEventListener(egret.Event.RESIZE, self.onResize, self);
        self.onResize();
    };
    // //添加到舞台
    // protected onAddToStage(event?:egret.Event):void{
    //     let self = this;
    //     self.$stage.addEventListener(egret.Event.RESIZE,self.onResize,self);
    //     self.onResize();
    // }
    //从舞台移除
    BaseView.prototype.onRemoveFromStage = function (event) {
        var self = this;
        if (self.$stage == null)
            return;
        self.$stage.removeEventListener(egret.Event.RESIZE, self.onResize, self);
    };
    //舞台尺寸改变
    BaseView.prototype.onResize = function (event) {
        var self = this;
        var stage = self.$stage;
        self.$setWidth(stage.$stageWidth);
        self.$setHeight(stage.$stageHeight);
    };
    return BaseView;
}(IBaseView));
__reflect(BaseView.prototype, "BaseView");
// TypeScript file
var AccountData = (function () {
    function AccountData() {
        //性别;0为男1为女;
        this.sex = 0;
    }
    AccountData.prototype.getUName = function () {
        return this.uname;
    };
    AccountData.prototype.setUName = function (uname) {
        this.uname = uname;
    };
    AccountData.prototype.getPSD = function () {
        return this.psd;
    };
    AccountData.prototype.setPSD = function (psd) {
        this.psd = psd;
    };
    AccountData.prototype.getTicket = function () {
        return this.ticket;
    };
    AccountData.prototype.setTicket = function (ticket) {
        this.ticket = ticket;
    };
    AccountData.prototype.getNick = function () {
        return this.nick;
    };
    AccountData.prototype.setNick = function (nick) {
        this.nick = nick;
    };
    AccountData.prototype.getGold = function () {
        return this.gold;
    };
    AccountData.prototype.setGold = function (gold) {
        this.gold = gold;
    };
    AccountData.prototype.getPoints = function () {
        return this.points;
    };
    AccountData.prototype.setPoints = function (points) {
        this.points = points;
    };
    AccountData.prototype.getLvl = function () {
        return this.lvl;
    };
    AccountData.prototype.setLvl = function (lvl) {
        this.lvl = lvl;
    };
    AccountData.prototype.getExp = function () {
        return this.exp;
    };
    AccountData.prototype.setExp = function (exp) {
        this.exp = exp;
    };
    AccountData.prototype.getUpexp = function () {
        return this.upexp;
    };
    AccountData.prototype.setUpexp = function (upexp) {
        this.upexp = upexp;
    };
    AccountData.prototype.getMuexp = function () {
        return this.muexp;
    };
    AccountData.prototype.setMuexp = function (muexp) {
        this.muexp = muexp;
    };
    AccountData.prototype.getEtime = function () {
        return this.etime;
    };
    AccountData.prototype.setEtime = function (etime) {
        this.etime = etime;
    };
    AccountData.prototype.getVip = function () {
        return this.vip;
    };
    AccountData.prototype.setVip = function (vip) {
        this.vip = vip;
    };
    AccountData.prototype.getVip_St = function () {
        return this.vip_st;
    };
    AccountData.prototype.setVip_St = function (vip_st) {
        this.vip_st = vip_st;
    };
    AccountData.prototype.getCost = function () {
        return this.cost;
    };
    AccountData.prototype.setCost = function (cost) {
        this.cost = cost;
    };
    AccountData.prototype.getHp = function () {
        return this.hp;
    };
    AccountData.prototype.setHp = function (hp) {
        this.hp = hp;
    };
    AccountData.prototype.getSex = function () {
        return this.sex;
    };
    AccountData.prototype.setSex = function (sex) {
        this.sex = sex;
    };
    AccountData.prototype.getHead_Url = function () {
        return this.head_url;
    };
    AccountData.prototype.setHead_Url = function (head_url) {
        this.head_url = head_url;
    };
    return AccountData;
}());
__reflect(AccountData.prototype, "AccountData");
// TypeScript file
var JiBanData = (function () {
    function JiBanData() {
        this.jbList = [];
    }
    JiBanData.prototype.getDsc = function (key) {
        return this.jbList[key].dsc;
    };
    JiBanData.prototype.setDsc = function (uname) {
        //this.jbList[key].dsc;
    };
    JiBanData.prototype.getTittle = function (key) {
        return this.jbList[key].tittle;
    };
    JiBanData.prototype.setTittle = function (uname) {
        this.tittle = uname;
    };
    JiBanData.prototype.setJBnode = function (key, tittle, dsc) {
        this.jbList[key] = [];
        this.jbList[key].tittle = tittle;
        this.jbList[key].dsc = dsc;
    };
    return JiBanData;
}());
__reflect(JiBanData.prototype, "JiBanData");
/**
 *
 * @author lxq
 *  用于动画管理的类
 *
 */
var MCManager = (function () {
    function MCManager() {
        //用于存放MovieClipDataFactory 
        this._mcFactorys = new Object();
        //-------------------------------------------------------------------------------------------
        this._loadings = {}; //key->[{fun,tar,mcName}]
    }
    MCManager.getInstance = function () {
        return MCManager._manager;
    };
    MCManager.prototype.getMCDataAsync = function (jsName, mcName, callback, tar) {
        var self = this;
        var mcFactory = self._mcFactorys[jsName];
        if (mcFactory) {
            var mcData = mcFactory.generateMovieClipData(mcName);
            egret.setTimeout(callback, tar, 0, mcData, jsName, mcName);
            return;
        }
        var loadData = { fun: callback, tar: tar, mc: mcName };
        var loadInfo = self._loadings[jsName];
        if (loadInfo) {
            loadInfo.datas.push(loadData);
            return;
        }
        self._loadings[jsName] = { datas: [loadData], js: null, img: null };
        RES.getResAsync(jsName + "_json", self.onGetMCResFin, self);
        RES.getResAsync(jsName + "_png", self.onGetMCResFin, self);
    };
    MCManager.prototype.onGetMCResFin = function (data, source) {
        var index = source.lastIndexOf("_");
        var name = source.substr(0, index);
        var loadings = this._loadings;
        var loadInfo = loadings[name];
        if (loadInfo) {
            if (data) {
                if (source.substr(index + 1) == "json") {
                    loadInfo.js = data;
                    RES.destroyRes(source);
                }
                else {
                    loadInfo.img = data;
                }
                if (loadInfo.js && loadInfo.img) {
                    var mcFactory = new egret.MovieClipDataFactory(loadInfo.js, loadInfo.img);
                    this._mcFactorys[name] = mcFactory;
                    var loadDatas = loadInfo.datas;
                    for (var i = 0, len = loadDatas.length; i < len; ++i) {
                        var loadData = loadDatas[i];
                        var mcData = mcFactory.generateMovieClipData(loadData.mc);
                        loadData.fun.call(loadData.tar, mcData, name, loadData.mc);
                    }
                    delete loadings[name];
                }
            }
            else {
                delete loadings[name];
            }
        }
    };
    //-------------------------------------------------------------------------------------------
    //注册生成MovieClipDataFactory
    // public registerMovieClipDataFactory(jsonName:string,jsonPath:string,txtrPath:string) : void
    // {
    //     if(jsonName == null || jsonPath == null || txtrPath == null)
    //     {
    //         console.log("json或者图片路径为空");
    //         return;
    //     }
    //     var data = RES.getRes(jsonPath);
    //     var txtr = RES.getRes(txtrPath);
    //     if(data == null || txtr == null)
    //     {
    //         console.log("data或者txtr为空");
    //         return;
    //     }
    //     var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
    //     this._mcFactorys[jsonName] = mcFactory;
    // }
    MCManager.prototype.registerMovieClipDataFactoryAuto = function (name) {
        if (name == null || name == "") {
            egret.log("json或者图片路径为空");
            return;
        }
        var json = RES.getRes(name + "_json");
        var data = RES.getRes(name + "_png");
        if (json == null || data == null) {
            egret.log("data或者txtr为空");
            return;
        }
        var mcFactory = new egret.MovieClipDataFactory(json, data);
        this._mcFactorys[name] = mcFactory;
    };
    //获取MovieClip
    MCManager.prototype.getMovieClipByName = function (jsonName, mcName) {
        if (jsonName == null || mcName == null) {
            egret.log("jsonName或者mcName不能为空");
            return null;
        }
        var mcFactory = this._mcFactorys[jsonName];
        if (mcFactory == null) {
            this.registerMovieClipDataFactoryAuto(jsonName);
            mcFactory = this._mcFactorys[jsonName];
        }
        if (mcFactory != null) {
            var movieClipData = mcFactory.generateMovieClipData(mcName);
            if (movieClipData == null) {
                egret.log("mcName没找到");
                return null;
            }
            var mc = new egret.MovieClip(movieClipData);
            if (mc != null)
                return mc;
        }
        return null;
    };
    //获取当前movieclip的总帧数
    MCManager.prototype.getMovieClipNumFramesByName = function (jsonName, mcName) {
        if (jsonName == null || mcName == null) {
            egret.log("jsonName或者mcName不能为空");
            return null;
        }
        var mcFactory = this._mcFactorys[jsonName];
        if (mcFactory != null) {
            var movieClipData = mcFactory.generateMovieClipData(mcName);
            if (movieClipData != null) {
                return movieClipData.numFrames;
            }
        }
        return 0;
    };
    MCManager._manager = new MCManager();
    return MCManager;
}());
__reflect(MCManager.prototype, "MCManager");
// TypeScript file
var WebVerController = (function () {
    function WebVerController() {
    }
    WebVerController.prototype.fetchVersion = function (callback) {
        var self = this;
        if (self._allVers) {
            if (callback != null)
                callback.onSuccess(null);
            return;
        }
        self._callback = callback;
        var request = new egret.HttpRequest();
        request.addEventListener(egret.Event.COMPLETE, self.onLoadFinish, self);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadFinish, self);
        request.responseType = egret.HttpResponseType.TEXT;
        // request.open(Main.url + "webver.json?v=" + Main.ver);
        var pathRes = Main.res + LanguageManager.getInstance().getLanguagePath() + "/";
        request.open(Main.url + pathRes + "webver.json?v=" + Main.ver);
        request.send();
    };
    WebVerController.prototype.onLoadFinish = function (event) {
        var self = this;
        var loadSucess = false;
        if (event.type == egret.Event.COMPLETE) {
            try {
                var request = (event.target);
                self._allVers = JSON.parse(request.response);
                loadSucess = true;
            }
            catch (e) {
                egret.log("version parse fail");
            }
        }
        else {
            egret.log("version load fail");
        }
        if (loadSucess) {
            self._callback.onSuccess(null);
        }
        else {
            self._callback.onFail(1, null);
        }
        self._callback = null;
    };
    WebVerController.prototype.addWebVer = function (addVers) {
        var allVers = this._allVers;
        for (var postfix in allVers) {
            var vers = allVers[postfix];
            var addList = addVers[postfix];
            if (vers) {
                for (var pathName in addList) {
                    vers[pathName] = addList[pathName];
                }
            }
            else {
                allVers[postfix] = addList;
            }
        }
    };
    //获取所有有变化的文件
    WebVerController.prototype.getChangeList = function () {
        return [];
    };
    WebVerController.prototype.getVirtualUrl = function (url) {
        var idx = url.lastIndexOf(".");
        var postfix = url.substring(idx + 1);
        var verStr;
        var typeVerMap = this._allVers[postfix];
        if (typeVerMap) {
            if (typeof typeVerMap == "number") {
                verStr = String(typeVerMap);
            }
            else {
                var pathStr = url.substring(0, idx);
                verStr = typeVerMap[pathStr];
            }
        }
        url = Main.url + url;
        if (!verStr)
            verStr = Main.defVer;
        if (verStr)
            url += "?v=" + verStr;
        return url;
    };
    WebVerController.prototype.init = function () {
        return null;
    };
    return WebVerController;
}());
__reflect(WebVerController.prototype, "WebVerController", ["RES.IVersionController"]);
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    // public static Test:string = "test";
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
var GameEventData = (function () {
    function GameEventData() {
        this.eventName = "";
        // public paramArr:Array<GameEventParam> = new Array<GameEventParam>();
        this.paramObj = new Object();
    }
    return GameEventData;
}());
__reflect(GameEventData.prototype, "GameEventData");
var GameEventParam = (function () {
    function GameEventParam() {
    }
    return GameEventParam;
}());
__reflect(GameEventParam.prototype, "GameEventParam");
// TypeScript file
var GameEventManager = (function () {
    function GameEventManager() {
        this.arrData = new Array();
    }
    GameEventManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameEventManager();
        }
        return this.instance;
    };
    GameEventManager.prototype.addEventListener = function (event, caller, listener, args, priority) {
        if (args === void 0) { args = null; }
        if (priority === void 0) { priority = 0; }
        var self = this;
        if (self.hasEventListener(event, caller, listener)) {
            return;
        }
        var gameEventData = self.getGameEventData(event);
        var paramNew = new GameEventParam();
        paramNew.event = event;
        paramNew.caller = caller;
        paramNew.listener = listener;
        paramNew.args = args;
        paramNew.priority = priority;
        paramNew.caller.addEventListener(event, listener, caller, args);
        var priorityStr = priority + "";
        if (!gameEventData.paramObj.hasOwnProperty(priorityStr)) {
            gameEventData.paramObj[priorityStr] = new Array();
        }
        var paramArr = gameEventData.paramObj[priorityStr];
        paramArr.push(paramNew);
    };
    GameEventManager.prototype.dispatchEvent = function (event, args) {
        if (args === void 0) { args = null; }
        var self = this;
        var gameEventData = self.getGameEventData(event);
        for (var priority in gameEventData.paramObj) {
            var paramArr = gameEventData.paramObj[priority];
            if (paramArr.length <= 0)
                continue;
            var i = 0, lengthI = 0;
            for (i = 0, lengthI = paramArr.length; i < lengthI; i++) {
                if (paramArr[i] != null) {
                    var param = paramArr[i];
                    if (args != null) {
                        if (param.args == null) {
                            param.args = new Object();
                        }
                        param.args["dispData"] = args;
                        param.listener.call(param.caller, param.args);
                        continue;
                    }
                    param.caller.dispatchEvent(gameEventData.gameEvent);
                }
            }
        }
    };
    GameEventManager.prototype.removeEventListener = function (event, caller, listener) {
        var self = this;
        if (!self.hasEventListener(event, caller, listener)) {
            return;
        }
        var gameEventData = self.getGameEventData(event);
        for (var priority in gameEventData.paramObj) {
            var paramArr = gameEventData.paramObj[priority];
            if (paramArr.length <= 0)
                continue;
            var i = 0, lengthI = 0;
            for (i = 0, lengthI = paramArr.length; i < lengthI; i++) {
                if (paramArr[i] != null) {
                    var param = paramArr[i];
                    if (param.caller == caller && param.listener == listener) {
                        param.caller.removeEventListener(event, caller, listener);
                        paramArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    GameEventManager.prototype.hasEventListener = function (event, caller, listener) {
        var self = this;
        var gameEventData = self.getGameEventData(event);
        for (var priority in gameEventData.paramObj) {
            var paramArr = gameEventData.paramObj[priority];
            if (paramArr.length <= 0)
                continue;
            var hasListener = false;
            var i = 0, lengthI = 0;
            for (i = 0, lengthI = paramArr.length; i < lengthI; i++) {
                if (paramArr[i].caller == caller && paramArr[i].listener == listener) {
                    hasListener = true;
                    break;
                }
            }
            return hasListener;
        }
        return false;
    };
    GameEventManager.prototype.getGameEventData = function (event) {
        var self = this;
        var gameEventData = null;
        var i = 0, lengthI = self.arrData.length;
        for (i; i < lengthI; i++) {
            var data = self.arrData[i];
            if (data.eventName == event) {
                gameEventData = data;
                break;
            }
        }
        if (gameEventData == null) {
            gameEventData = new GameEventData();
            gameEventData.eventName = event;
            gameEventData.gameEvent = egret.Event.create(GameEvent, event);
            self.arrData.push(gameEventData);
        }
        return gameEventData;
    };
    return GameEventManager;
}());
__reflect(GameEventManager.prototype, "GameEventManager");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            RES.registerVersionController(new WebVerController());
        }
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameConfig.gameScene();
        //注入自定义的素材解析器;
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        //-1自动识别系统语言 0中文 1英文
        egret.localStorage.setItem("langtype", "-1");
        var resPath = Main.res + LanguageManager.getInstance().getLanguagePath() + "/";
        //初始化Resource资源加载;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(resPath + "default.res.json", resPath);
    };
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        UITheme.loadConf(Main.res + LanguageManager.getInstance().getLanguagePath() + "/theme.json", this.onThemeLoadComplete, this);
    };
    Main.prototype.onThemeLoadComplete = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.loadGroup("login");
        }
        else if (event.groupName == "login") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    Main.prototype.onResourceLoadError = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    };
    Main.prototype.onResourceProgress = function (event) {
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.initData();
        //检测自动登录
        var ticket = egret.localStorage.getItem("ticket");
        if (ticket == null || ticket == "")
            UIManager.getInstance().showUI(LoginView);
        else {
            GameConfig.ticket = ticket;
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_CHECK_LOGIN, {}, true);
        }
    };
    //初始化数据;
    Main.prototype.initData = function () {
        this.initDecoder();
        this.initManager();
        this.initResolver();
    };
    Main.prototype.initDecoder = function () {
        var decode = BaseDecode.getInstance();
        decode.registerDecoder(new SystemDecoder());
        // decode.registerDecoder(new ErrorDecoder());
    };
    Main.prototype.initManager = function () {
        UIManager.getInstance();
        HttpManager.getInstance();
        WebSocketManager.getInstance();
    };
    Main.prototype.initResolver = function () {
        var configs = RES.getRes("gameConfig_json");
        GlobalDataManager.getInstance().setGameConfig(configs);
        var index = Math.floor(Math.random() * configs.servers.length);
        var config = configs.servers[index];
        //注册JSON解析器;
        var resolver = new JsonResolver(JsonResolver.NAME);
        resolver.registerPackageData(new TextPackageData());
        HttpManager.getInstance().registerResolver(resolver);
        WebSocketManager.getInstance().registerResolver(resolver);
        DebugWebSocketManager.getInstance().registerResolver(resolver);
        //新的服务器设置开始,以后弄个文件下载;
        var server = new ServerData();
        server.setSname(config.sname);
        server.setHost(config.host);
        server.setPort(config.port);
        server.setType(config.type);
        server.setResolver(HttpManager.getInstance().getResolver(JsonResolver.NAME));
        server.setHurl(config.hurl);
        HttpManager.getInstance().registerServer(server);
        GlobalDataManager.getInstance().setCenterServer(server);
        // var self =this;
        // var curWidth:number = self.$stage.stageWidth;
        // var curHeight:number = self.$stage.stageHeight;
        // console.log(curWidth+"  "+curHeight );
    };
    Main.ver = "";
    Main.defVer = "1";
    Main.url = "";
    Main.res = "resource";
    Main.gRes = "res-";
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
// TypeScript file
var ProtoPackageData = (function () {
    function ProtoPackageData() {
        this.m_cmd = 0;
        this.m_headLen = 8;
        this.m_len = 0;
        this.m_curPostion = 0;
        this.m_dataArray = new egret.ByteArray();
        this.m_data = null;
    }
    ProtoPackageData.prototype.clear = function () {
        this.m_cmd = 0;
        this.m_len = 0;
        this.m_curPostion = 0;
        this.m_dataArray.clear();
        this.m_data = null;
    };
    ProtoPackageData.prototype.getCurPostion = function () {
        return this.m_curPostion;
    };
    ProtoPackageData.prototype.setCurPostion = function (curPostion) {
        this.m_curPostion = curPostion;
    };
    ProtoPackageData.prototype.getCmd = function () {
        return this.m_cmd;
    };
    ProtoPackageData.prototype.setCmd = function (cmd) {
        this.m_cmd = cmd;
    };
    ProtoPackageData.prototype.getHeadLen = function () {
        return this.m_headLen;
    };
    ProtoPackageData.prototype.setHeadLen = function (headLen) {
        this.m_headLen = headLen;
    };
    ProtoPackageData.prototype.getLen = function () {
        return this.m_len;
    };
    ProtoPackageData.prototype.setLen = function (len) {
        this.m_len = len;
    };
    ProtoPackageData.prototype.getDataArray = function () {
        return this.m_dataArray;
    };
    ProtoPackageData.prototype.getData = function () {
        return this.m_data;
    };
    ProtoPackageData.prototype.setData = function (data) {
        this.m_data = data;
    };
    return ProtoPackageData;
}());
__reflect(ProtoPackageData.prototype, "ProtoPackageData");
// TypeScript file
var ServerData = (function () {
    function ServerData() {
    }
    ServerData.prototype.setSname = function (sname) {
        this.m_sname = sname;
    };
    ServerData.prototype.getSname = function () {
        return this.m_sname;
    };
    ServerData.prototype.setType = function (type) {
        this.m_type = type;
    };
    ServerData.prototype.getType = function () {
        return this.m_type;
    };
    ServerData.prototype.setResolverType = function (resolverType) {
        this.m_resolverType = resolverType;
    };
    ServerData.prototype.getResolverType = function () {
        return this.m_resolverType;
    };
    ServerData.prototype.setHost = function (host) {
        this.m_host = host;
    };
    ServerData.prototype.getHost = function () {
        return this.m_host;
    };
    ServerData.prototype.setPort = function (port) {
        this.m_port = port;
    };
    ServerData.prototype.getPort = function () {
        return this.m_port;
    };
    ServerData.prototype.setSurl = function (surl) {
        this.m_surl = surl;
    };
    ServerData.prototype.getSurl = function () {
        return this.m_surl;
    };
    ServerData.prototype.setHurl = function (hurl) {
        this.m_hurl = hurl;
    };
    ServerData.prototype.getHurl = function () {
        return this.m_hurl;
    };
    ServerData.prototype.setSocket = function (socket) {
        this.m_socket = socket;
    };
    ServerData.prototype.getSocket = function () {
        return this.m_socket;
    };
    ServerData.prototype.setRequest = function (request) {
        this.m_request = request;
    };
    ServerData.prototype.getRequest = function () {
        return this.m_request;
    };
    ServerData.prototype.setResolver = function (resolver) {
        this.setResolverType(resolver.name());
        this.m_resolver = resolver;
    };
    ServerData.prototype.getResolver = function () {
        return this.m_resolver;
    };
    ServerData.SERVER_HTTP_TYPE = 1;
    ServerData.SERVER_SOCKET_TYPE = 2;
    return ServerData;
}());
__reflect(ServerData.prototype, "ServerData");
// TypeScript file
var TextPackageData = (function () {
    function TextPackageData() {
    }
    TextPackageData.prototype.clear = function () {
        this.m_cmd = 0;
        this.m_data = null;
    };
    TextPackageData.prototype.getCmd = function () {
        return this.m_cmd;
    };
    TextPackageData.prototype.setCmd = function (cmd) {
        this.m_cmd = cmd;
    };
    TextPackageData.prototype.getData = function () {
        return this.m_data;
    };
    TextPackageData.prototype.setData = function (data) {
        this.m_data = data;
    };
    return TextPackageData;
}());
__reflect(TextPackageData.prototype, "TextPackageData");
// TypeScript file
/*回调操作类
*1.由于貌似反射无法反射方法,所有只有两种解决方案,通过事件,让程序员直接自己注册方法,目前选择后者.
*2.目前设置cmd=300以内为json格式,300-500以上为protobuf.
*
*/
var BaseDecode = (function () {
    function BaseDecode() {
        this.m_decoderMap = new Object();
    }
    BaseDecode.getInstance = function () {
        return BaseDecode.m_decode;
    };
    BaseDecode.prototype.registerFunction = function (cmd, func) {
        this.m_decoderMap[cmd] = func;
    };
    BaseDecode.prototype.unRegisterFunction = function (cmd) {
        this.m_decoderMap[cmd] = null;
    };
    BaseDecode.prototype.registerDecoder = function (decoder) {
        decoder.initDecoderFunction();
    };
    BaseDecode.prototype.removeDecoder = function (decoder) {
        decoder.removeDecoderFunction();
    };
    BaseDecode.prototype.getFunction = function (cmd) {
        var func2 = this.m_decoderMap[cmd];
        return func2;
    };
    BaseDecode.prototype.decode = function (cmd, data) {
        //回调,目前不考虑用列表了
        var func = this.getFunction(cmd);
        if (func) {
            func(data, cmd);
        }
    };
    BaseDecode.m_decode = new BaseDecode();
    return BaseDecode;
}());
__reflect(BaseDecode.prototype, "BaseDecode");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
// TypeScript file
var GameConfig;
(function (GameConfig) {
    GameConfig.isDebug = false;
    GameConfig.isOnLine = navigator.onLine;
    GameConfig.ticket = "cwt_123456789";
    GameConfig.key = "8818181818181898";
    GameConfig.vi = "8818181818181898";
    var curScene;
    function gameScene() {
        if (this.curScene == null) {
            this.curScene = new GameScene(egret.MainContext.instance.stage);
        }
        return this.curScene;
    }
    GameConfig.gameScene = gameScene;
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    GameConfig.curWidth = curWidth;
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    GameConfig.curHeight = curHeight;
    function isVertical() {
        var angle = window["orientation"];
        return angle != 90;
    }
    GameConfig.isVertical = isVertical;
})(GameConfig || (GameConfig = {}));
// TypeScript file
var JsonResolver = (function (_super) {
    __extends(JsonResolver, _super);
    function JsonResolver(name) {
        return _super.call(this, name) || this;
    }
    JsonResolver.prototype.decode = function (data) {
        var msg = data.split("@~m@");
        var obj = null;
        if (msg[0] == "1") {
            var res = new newaes();
            obj = res.dx(msg[1], GameConfig.key, GameConfig.vi);
        }
        else {
            obj = msg[1];
        }
        if (obj == null) {
            return;
        }
        obj = JSON.parse(obj);
        BaseDecode.getInstance().decode(obj["cmd"], obj["data"]);
    };
    JsonResolver.prototype.parse = function (cmd, trd, data, m) {
        if (m === void 0) { m = false; }
        var jsonObj = new Object();
        jsonObj["cmd"] = cmd;
        jsonObj["t"] = GameConfig.ticket;
        jsonObj["trd"] = trd;
        jsonObj["data"] = data;
        var str = JSON.stringify(jsonObj);
        if (m) {
            var res = new newaes();
            str = res.ex(str, GameConfig.key, GameConfig.vi);
            str = "1@~m@".concat(str);
        }
        else {
            str = "0@~m@".concat(str);
        }
        return str;
    };
    JsonResolver.NAME = "JSON_RESOLVER";
    return JsonResolver;
}(BaseResolver));
__reflect(JsonResolver.prototype, "JsonResolver");
// TypeScript file
var ProtoBufResolver = (function (_super) {
    __extends(ProtoBufResolver, _super);
    function ProtoBufResolver(name) {
        return _super.call(this, name) || this;
    }
    ProtoBufResolver.prototype.decode = function (data) {
        var bytes = data;
        var pag = this.getPackageData();
        var allBytes = pag.getDataArray();
        allBytes.position = 0;
        allBytes.writeBytes(bytes, 0, bytes.length);
        if (pag.getCurPostion() == 0) {
            if (pag.getDataArray().length >= pag.getHeadLen()) {
                allBytes.position = 0;
                pag.setCmd(allBytes.readInt());
                pag.setLen(allBytes.readInt());
                pag.setCurPostion(pag.getHeadLen() - 1);
                allBytes.position = allBytes.length - 1;
            }
        }
        else if (pag.getCurPostion() == (pag.getHeadLen() - 1)) {
            var allLen = pag.getLen() + pag.getHeadLen();
            if (pag.getDataArray().length >= allLen) {
                allBytes.position = pag.getHeadLen() - 1;
                var dataBytes = new egret.ByteArray();
                dataBytes.writeBytes(allBytes, allBytes.position, pag.getLen());
                var protoClass = this.cloneProtoResolverClassByCmd(pag.getCmd());
                var msg = dataBytes.dataView.buffer;
                pag.setData(protoClass.decode(msg));
                dataBytes.clear();
                if (pag.getDataArray().length > allLen) {
                    dataBytes.writeBytes(allBytes, allLen - 1, pag.getDataArray().length - allLen);
                    dataBytes.position = 0;
                    BaseDecode.getInstance().decode(pag.getCmd(), pag.getData());
                    pag.clear();
                    allBytes.writeBytes(dataBytes, 0, dataBytes.length);
                }
                else if (pag.getDataArray().length == allLen) {
                    BaseDecode.getInstance().decode(pag.getCmd(), pag.getData());
                    pag.clear();
                }
            }
        }
    };
    ProtoBufResolver.prototype.parse = function (cmd, data) {
        var arraybuffer = data.toArrayBuffer();
        var len = arraybuffer.byteLength;
        var dataArray = new egret.ByteArray(arraybuffer);
        var byteArray = new egret.ByteArray();
        byteArray.writeInt(cmd);
        byteArray.writeInt(len);
        byteArray.writeBytes(dataArray, 0, len);
        return byteArray;
    };
    ProtoBufResolver.NAME = "PROTO_RESOLVER";
    return ProtoBufResolver;
}(BaseResolver));
__reflect(ProtoBufResolver.prototype, "ProtoBufResolver");
// TypeScript file
var ProtoResolverConfig = (function () {
    function ProtoResolverConfig() {
    }
    return ProtoResolverConfig;
}());
__reflect(ProtoResolverConfig.prototype, "ProtoResolverConfig");
// TypeScript file
var DebugWebSocketManager = (function (_super) {
    __extends(DebugWebSocketManager, _super);
    function DebugWebSocketManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_timer_heart_beat = new egret.Timer(8000, 0);
        _this.m_needPop = true;
        return _this;
    }
    DebugWebSocketManager.getInstance = function () {
        return DebugWebSocketManager.m_manager;
    };
    DebugWebSocketManager.prototype.setPopStatus = function (pstatus) {
        this.m_needPop = pstatus;
    };
    //连接服务器
    DebugWebSocketManager.prototype.connectServer = function (sname, showModel) {
        if (showModel === void 0) { showModel = true; }
        //添加LOAD界面!
        if (showModel) {
            UIManager.getInstance().showUI(LoadingRView, GameScene.POP_LAYER_NUMBER, 0.5);
        }
        var server = this.getServerByName(sname);
        var resolerType = server.getResolverType();
        var socket = server.getSocket();
        this.close(sname);
        server.setSocket(new egret.WebSocket());
        if (resolerType == ProtoBufResolver.NAME) {
            server.getSocket().type = egret.WebSocket.TYPE_BINARY;
        }
        else if (resolerType == JsonResolver.NAME) {
            server.getSocket().type = egret.WebSocket.TYPE_STRING;
        }
        if (!server.getSocket().hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
            server.getSocket().addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        }
        if (!server.getSocket().hasEventListener(egret.Event.CONNECT)) {
            server.getSocket().addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        }
        if (!server.getSocket().hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
            server.getSocket().addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        }
        if (!server.getSocket().hasEventListener(egret.Event.CLOSE)) {
            server.getSocket().addEventListener(egret.Event.CLOSE, this.onIOError, this);
        }
        this.m_sname = sname;
        server.getSocket().connectByUrl(server.getSurl());
        // if(!this.m_timer_heart_beat.hasEventListener(egret.TimerEvent.TIMER)){
        //     this.m_timer_heart_beat.addEventListener(egret.TimerEvent.TIMER,this.onTimerSendHeartBeat,this);
        // }
    };
    //连接成功返回;
    DebugWebSocketManager.prototype.onSocketOpen = function (e) {
        var socket = e.currentTarget;
        var self = this;
        this.setPopStatus(true);
        // let custom:CustomGameData = GlobaDataManager.getInstance().GetMyBureauData();
        var obj = new Object();
        // obj["key"] = new MD5().hex_md5(GlobalDataManager.getInstance().getAccountData().getTicket() + "_" + GameConfig.key);
        // obj["t"] = GlobalDataManager.getInstance().getAccountData().getTicket();
        obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
        obj["room"] = GlobalDataManager.getInstance().getRoom();
        var server = self.getServerBySocket(socket);
        DebugWebSocketManager.getInstance().sendMessage(server.getSname(), CmdDef.CMD_DEBUG_GAME_CONNECT, obj, false, false);
        // try{
        //     if(!this.m_timer_heart_beat.running){
        //         this.m_timer_heart_beat.start();
        //     }
        // }catch(error){
        // }
    };
    //接受函数;
    DebugWebSocketManager.prototype.onReceiveMessage = function (e) {
        var socket = e.currentTarget;
        var server = this.getServerBySocket(socket);
        if (!server) {
            this.onIOError();
        }
        else {
            var data = socket.readUTF();
            server.getResolver().decode(data);
        }
    };
    //错误函数;
    DebugWebSocketManager.prototype.onIOError = function () {
        var self = this;
        // if(self.m_timer_heart_beat.running){
        //     self.m_timer_heart_beat.stop();
        // }
        if (self.m_needPop) {
            //弹出提示UI
            // PopManager.getInstance().showPromptBox("您已断开连接. \n重新连接游戏还是返回登录?",1,(a:Array<boolean>)=>{
            //     if(a!=null&&a.length>0){
            //         let isAgree:boolean = a[0];
            //         if(isAgree){
            //             GlobalDataManager.getInstance().setIsConnect(true);
            //             self.reconnet();
            //         }else{
            //             UIManager.getInstance().removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
            //             UIManager.getInstance().removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
            //             UIManager.getInstance().removeLayerUI(GameScene.BOM_LAYER_NUMBER);
            //             UIManager.getInstance().removeLayerUI(GameScene.POP_LAYER_NUMBER);
            //             UIManager.getInstance().removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
            //             GMDManager.closeGMD();
            //             UIManager.getInstance().showUI(LoginView,GameScene.VIEW_LAYER_NUMBER);
            //         }
            //     }
            // },[],["重连游戏","返回登录"]);
        }
    };
    //重连;
    DebugWebSocketManager.prototype.reconnet = function () {
    };
    //向服务器端发送消息;
    DebugWebSocketManager.prototype.sendMessage = function (sname, cmd, data, showModel, m) {
        if (showModel === void 0) { showModel = false; }
        if (m === void 0) { m = false; }
        var server = this.getServerByName(sname);
        if (!server) {
            return;
        }
        //添加LOAD界面
        if (showModel) {
            UIManager.getInstance().showUI(LoadingRView, GameScene.POP_LAYER_NUMBER, 0.5);
        }
        var socket = server.getSocket();
        if (socket) {
            data = server.getResolver().parse(cmd, GlobalDataManager.getInstance().getThredID(), data, m);
            var resolverType = server.getResolverType();
            if (resolverType == JsonResolver.NAME) {
                server.getSocket().writeUTF(data);
            }
            else if (resolverType == ProtoBufResolver.NAME) {
                server.getSocket().writeBytes(data);
            }
            server.getSocket().flush();
        }
    };
    DebugWebSocketManager.prototype.sendCSMsg = function (cmd, data, showModel, m) {
        if (showModel === void 0) { showModel = false; }
        if (m === void 0) { m = false; }
    };
    DebugWebSocketManager.prototype.sendGSMsg = function (cmd, data, showModel, m) {
        if (showModel === void 0) { showModel = false; }
        if (m === void 0) { m = false; }
    };
    DebugWebSocketManager.prototype.isConnect = function (sname) {
        var server = this.getServerByName(sname);
        if (server && server.getSocket()) {
            return server.getSocket().connected;
        }
        return false;
    };
    DebugWebSocketManager.prototype.close = function (sname) {
        // if(this.m_timer_heart_beat.running){
        //     this.m_timer_heart_beat.stop();
        // }
        var server = this.getServerByName(sname);
        if (server && server.getSocket()) {
            server.getSocket().close();
            if (server.getSocket().hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                server.getSocket().removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            }
            if (server.getSocket().hasEventListener(egret.Event.CONNECT)) {
                server.getSocket().removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            }
            if (server.getSocket().hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                server.getSocket().removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            }
            if (server.getSocket().hasEventListener(egret.Event.CLOSE)) {
                server.getSocket().removeEventListener(egret.Event.CLOSE, this.onIOError, this);
            }
            server.setSocket(null);
        }
    };
    DebugWebSocketManager.prototype.onTimerSendHeartBeat = function (e) {
        var a = this.isConnect(this.m_sname);
        if (!a) {
            this.onIOError();
        }
        // let array_server_data:Array<ServerData> = this.getWebSocketServers();
        // for(let key in array_server_data){
        //     let server:ServerData = array_server_data[key];
        //     let obj:Object = new Object();
        //     this.sendMessage(server.getSname(),CmdDef.CMD_HEART_BEAT,obj,false);
        // }
    };
    DebugWebSocketManager.prototype.reconnect = function () {
    };
    DebugWebSocketManager.m_manager = new DebugWebSocketManager();
    return DebugWebSocketManager;
}(NetBase));
__reflect(DebugWebSocketManager.prototype, "DebugWebSocketManager");
// TypeScript file
var HttpManager = (function (_super) {
    __extends(HttpManager, _super);
    function HttpManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定时器;
        _this.m_timer = new egret.Timer(500, 3);
        return _this;
    }
    HttpManager.getInstance = function () {
        return HttpManager.m_manager;
    };
    HttpManager.prototype.timerRun = function () {
        return this.m_timer.running;
    };
    HttpManager.prototype.reSend = function () {
        if (this.m_nowReqTask != null && this.m_nowReqTask.sendCount > 0 && (!this.m_timer.running)) {
            this.m_timer.start();
        }
        else {
            if (this.m_nowReqTask.showModel) {
                // UIManager.getInstance.hide(LoadRotationView);
            }
        }
        this.clearSend();
    };
    //清空重发消息;
    HttpManager.prototype.clearSend = function () {
        this.m_nowReqTask = null;
        this.m_timer.stop();
        this.m_timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.m_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    /*发送http消息,消息体是JSON字符串
    *@url:发送路径
    *@data:发送内容
    *@showModel:是否开启遮罩
    *@m:是否加密
    *@sendCount:发送次数
    */
    HttpManager.prototype.send = function (sname, cmd, data, showModel, m, sendCount) {
        if (showModel === void 0) { showModel = true; }
        if (m === void 0) { m = false; }
        if (sendCount === void 0) { sendCount = 1; }
        if (sname == "" || sname == null || cmd == 0) {
            alert("no sname");
            return;
        }
        var server = this.getServerByName(sname);
        if (!server) {
            alert("no server");
            return;
        }
        if (data == null)
            data = new Object();
        data["language"] = LanguageManager.getInstance().getCurLanguageType();
        if (sendCount > 1 && !(this.m_timer.running)) {
            this.m_nowReqTask = new RequestTask;
            this.m_nowReqTask.sname = sname;
            this.m_nowReqTask.cmd = cmd;
            this.m_nowReqTask.data = data;
            this.m_nowReqTask.showModel = showModel;
            this.m_nowReqTask.m = m;
            this.m_nowReqTask.sendCount = sendCount;
            this.m_timer.delay = 6000;
            this.m_timer.repeatCount = this.m_nowReqTask.sendCount;
            if (!this.m_timer.hasEventListener(egret.TimerEvent.TIMER)) {
                this.m_timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            }
            if (!this.m_timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
                this.m_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this.reSend();
            //添加Load界面;
            if (showModel) {
                UIManager.getInstance().showUI(LoadingRView, GameScene.POP_LAYER_NUMBER, 0.5);
            }
            return;
        }
        //添加load界面;
        if (showModel) {
            UIManager.getInstance().showUI(LoadingRView, GameScene.POP_LAYER_NUMBER, 0.5);
        }
        var request = server.getRequest();
        if (!request) {
            request = new egret.HttpRequest();
            request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
            var resolverType = server.getResolverType();
            if (resolverType == JsonResolver.NAME) {
                request.responseType = egret.HttpResponseType.TEXT;
            }
            else if (resolverType == ProtoBufResolver.NAME) {
                request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            }
        }
        var resolver = server.getResolver();
        data = resolver.parse(cmd, 0, data, m);
        request.open(server.getHurl(), egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(data);
    };
    HttpManager.prototype.sendLS = function (cmd, data, showModel, m, sendCount) {
        if (showModel === void 0) { showModel = true; }
        if (m === void 0) { m = false; }
        if (sendCount === void 0) { sendCount = 1; }
    };
    HttpManager.prototype.sendCS = function (cmd, data, showModel, m, sendCount) {
        if (showModel === void 0) { showModel = true; }
        if (m === void 0) { m = false; }
        if (sendCount === void 0) { sendCount = 1; }
    };
    HttpManager.prototype.onPostComplete = function (e) {
        var request = e.currentTarget;
        //隐藏Load界面;
        UIManager.getInstance().hideUI(LoadingRView);
        var server = this.getServerByRequest(request);
        if (!server) {
            this.onPostIOError();
        }
        else {
            var pag = server.getResolver().getPackageData();
            if (pag) {
                pag.clear();
            }
            server.getResolver().decode(request.response);
        }
    };
    HttpManager.prototype.onPostIOError = function (e) {
        if (e === void 0) { e = null; }
        // console.log("post error :");
        //隐藏Load界面;
        UIManager.getInstance().hideUI(LoadingRView);
        // let status = GlobalDataManager.getInstance().getStatus();
        // if(status==1){
        //     PopManager.getInstance().showPromptBox("您已断开连接,重新连接 还是 返回大厅!",1,(a:Array<boolean>)=>{
        //         if(a!=null&&a.length>0){
        //             let isAgree:boolean = a[0];
        //             if(isAgree){
        //                 WebSocketManager.getInstance().reconnect();
        //             }else{
        //                 UIManager.getInstance().removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.BOM_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.POP_LAYER_NUMBER);
        //                 UIManager.getInstance().removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
        //                 GMDManager.closeGMD();
        //                 UIManager.getInstance().showUI(LoginView,GameScene.VIEW_LAYER_NUMBER);
        //             }
        //         }
        //     },[],["重连游戏,返回登录"]);
        // }else{
        var context = "亲!您的网络不稳定,请重新尝试!";
        var errors = RES.getRes("error_json");
        if (errors != null && errors != undefined)
            context = errors["-998"] == null ? context : errors["-998"];
        PopManager.getInstance().showPromptBox(context, 2);
        // }
    };
    HttpManager.prototype.timerFunc = function (e) {
        console.log("timerFunc count" + e.target.currentCount);
        this.send(this.m_nowReqTask.sname, this.m_nowReqTask.cmd, this.m_nowReqTask.data, this.m_nowReqTask.showModel, this.m_nowReqTask.m, this.m_nowReqTask.sendCount);
    };
    HttpManager.prototype.timerComFunc = function (e) {
        console.log("timerComFunc count" + e.target.currentCount);
        this.clearSend();
    };
    HttpManager.prototype.locationUrl = function () {
        // var loginform:string = localStorage.getItem("loginform");
        // var loginform1:string = localStorage.getItem("isweiduan");
        // if(loginform=="0"&&loginform1=="0"){
        //     var url:string = getGameUrl();
        // }else{
        // }
    };
    HttpManager.m_manager = new HttpManager();
    return HttpManager;
}(NetBase));
__reflect(HttpManager.prototype, "HttpManager");
var RequestTask = (function () {
    function RequestTask() {
        this.showModel = true;
        this.m = false;
        this.sendCount = 1;
    }
    return RequestTask;
}());
__reflect(RequestTask.prototype, "RequestTask");
// TypeScript file
var WebSocketManager = (function (_super) {
    __extends(WebSocketManager, _super);
    function WebSocketManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_timer_heart_beat = new egret.Timer(8000, 0);
        _this.checkOvertime = 10000;
        _this.recordServerTime = -1;
        _this.m_needPop = true;
        return _this;
    }
    WebSocketManager.getInstance = function () {
        return WebSocketManager.m_manager;
    };
    //设置是否弹框
    WebSocketManager.prototype.setPopStatus = function (pstatus) {
        this.m_needPop = pstatus;
    };
    //设置重连回调
    WebSocketManager.prototype.setReconnectHandler = function (reconnectHandler) {
        this.reconnectHandler = reconnectHandler;
    };
    //连接服务器
    WebSocketManager.prototype.connectServer = function (sname, showModel) {
        if (showModel === void 0) { showModel = true; }
        //添加LOAD界面!
        if (showModel) {
            UIManager.getInstance().showUI(LoadingRView, GameScene.POP_LAYER_NUMBER, 0.5);
        }
        var server = this.getServerByName(sname);
        var resolerType = server.getResolverType();
        var socket = server.getSocket();
        this.close(sname);
        this.recordServerTime = -1;
        server.setSocket(new egret.WebSocket());
        if (resolerType == ProtoBufResolver.NAME) {
            server.getSocket().type = egret.WebSocket.TYPE_BINARY;
        }
        else if (resolerType == JsonResolver.NAME) {
            server.getSocket().type = egret.WebSocket.TYPE_STRING;
        }
        if (!server.getSocket().hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
            server.getSocket().addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        }
        if (!server.getSocket().hasEventListener(egret.Event.CONNECT)) {
            server.getSocket().addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        }
        if (!server.getSocket().hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
            server.getSocket().addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        }
        if (!server.getSocket().hasEventListener(egret.Event.CLOSE)) {
            server.getSocket().addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        }
        this.m_sname = sname;
        server.getSocket().connectByUrl(server.getSurl());
        if (!this.m_timer_heart_beat.hasEventListener(egret.TimerEvent.TIMER)) {
            this.m_timer_heart_beat.addEventListener(egret.TimerEvent.TIMER, this.onTimerSendHeartBeat, this);
        }
    };
    //连接成功返回;
    WebSocketManager.prototype.onSocketOpen = function (e) {
        var socket = e.currentTarget;
        var self = this;
        this.setPopStatus(true);
        // let custom:CustomGameData = GlobaDataManager.getInstance().GetMyBureauData();
        var obj = new Object();
        // obj["key"] = new MD5().hex_md5(GlobalDataManager.getInstance().getAccountData().getTicket() + "_" + GameConfig.key);
        // obj["t"] = GlobalDataManager.getInstance().getAccountData().getTicket();
        obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
        obj["room"] = GlobalDataManager.getInstance().getRoom();
        var server = self.getServerBySocket(socket);
        WebSocketManager.getInstance().sendMessage(server.getSname(), CmdDef.CMD_GAME_CONNECT, obj, false, false);
        try {
            if (!this.m_timer_heart_beat.running) {
                this.m_timer_heart_beat.start();
            }
        }
        catch (error) {
        }
    };
    //接受函数;
    WebSocketManager.prototype.onReceiveMessage = function (e) {
        var socket = e.currentTarget;
        var server = this.getServerBySocket(socket);
        if (!server) {
            this.onIOError();
        }
        else {
            var data = socket.readUTF();
            server.getResolver().decode(data);
        }
    };
    //关闭函数;
    WebSocketManager.prototype.onSocketClose = function () {
        var self = this;
        if (self.m_timer_heart_beat.running) {
            self.m_timer_heart_beat.stop();
        }
        if (GlobalDataManager.getInstance().getGameOver())
            return;
        this.onIOError();
    };
    //错误函数;
    WebSocketManager.prototype.onIOError = function () {
        var self = this;
        if (self.m_timer_heart_beat.running) {
            self.m_timer_heart_beat.stop();
        }
        if (self.m_needPop) {
            self.showReconnectPopup();
        }
    };
    WebSocketManager.prototype.showReconnectPopup = function () {
        var self = this;
        var context = "您已断开连接. \n请重新连接游戏!";
        var errors = RES.getRes("error_json");
        if (errors != null && errors != undefined)
            context = errors["-997"] == null ? context : errors["-997"];
        //弹出提示UI
        PopManager.getInstance().showPromptBox(context, 2, Handler.create(self, function (confirm) {
            // if(confirm){
            GlobalDataManager.getInstance().setIsConnect(true);
            self.reconnect();
            // }else{
            //     UIManager.getInstance().removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.BOM_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.POP_LAYER_NUMBER);
            //     UIManager.getInstance().removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
            //     GMDManager.closeGMD();
            //     UIManager.getInstance().showUI(LoginView,GameScene.VIEW_LAYER_NUMBER);
            // }
        }), [errors["-996"] == null ? "重连游戏" : errors["-996"]]);
    };
    //向服务器端发送消息;
    WebSocketManager.prototype.sendMessage = function (sname, cmd, data, showModel, m) {
        if (showModel === void 0) { showModel = false; }
        if (m === void 0) { m = false; }
        var server = this.getServerByName(sname);
        if (!server) {
            return;
        }
        //添加LOAD界面
        if (showModel) {
            UIManager.getInstance().showUI(LoadingRView, GameScene.POP_LAYER_NUMBER, 0.5);
        }
        var socket = server.getSocket();
        if (socket) {
            data = server.getResolver().parse(cmd, GlobalDataManager.getInstance().getThredID(), data, m);
            var resolverType = server.getResolverType();
            if (resolverType == JsonResolver.NAME) {
                server.getSocket().writeUTF(data);
            }
            else if (resolverType == ProtoBufResolver.NAME) {
                server.getSocket().writeBytes(data);
            }
            server.getSocket().flush();
        }
    };
    WebSocketManager.prototype.sendCSMsg = function (cmd, data, showModel, m) {
        if (showModel === void 0) { showModel = false; }
        if (m === void 0) { m = false; }
    };
    WebSocketManager.prototype.sendGSMsg = function (cmd, data, showModel, m) {
        if (showModel === void 0) { showModel = false; }
        if (m === void 0) { m = false; }
    };
    WebSocketManager.prototype.isConnect = function (sname) {
        var server = this.getServerByName(sname);
        if (server && server.getSocket()) {
            return server.getSocket().connected;
        }
        return false;
    };
    WebSocketManager.prototype.close = function (sname) {
        if (this.m_timer_heart_beat.running) {
            this.m_timer_heart_beat.stop();
        }
        var server = this.getServerByName(sname);
        if (server && server.getSocket()) {
            server.getSocket().close();
            if (server.getSocket().hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                server.getSocket().removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            }
            if (server.getSocket().hasEventListener(egret.Event.CONNECT)) {
                server.getSocket().removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            }
            if (server.getSocket().hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                server.getSocket().removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            }
            if (server.getSocket().hasEventListener(egret.Event.CLOSE)) {
                server.getSocket().removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            }
            server.setSocket(null);
        }
    };
    WebSocketManager.prototype.onTimerSendHeartBeat = function (e) {
        var a = this.isConnect(this.m_sname);
        if (!a) {
            this.onIOError();
        }
        var array_server_data = this.getWebSocketServers();
        for (var key in array_server_data) {
            var server = array_server_data[key];
            var obj = new Object();
            obj["cmd"] = CmdDef.CMD_CLIENT_HEART_BEAT;
            obj["data"] = {};
            obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
            obj["room"] = GlobalDataManager.getInstance().getRoom();
            this.sendMessage(server.getSname(), CmdDef.CMD_CLIENT_HEART_BEAT, obj, false);
        }
    };
    WebSocketManager.prototype.onRecvHeartBeat = function (data) {
        if (data == null)
            return;
        var ctime = data.ctime;
        var self = this;
        if (self.recordServerTime != -1 && (ctime - self.recordServerTime) > self.checkOvertime) {
            self.showReconnectPopup();
        }
        self.recordServerTime = ctime;
    };
    //重连
    WebSocketManager.prototype.reconnect = function () {
        var self = this;
        self.recordServerTime = -1;
        if (self.reconnectHandler == null)
            return;
        self.reconnectHandler.run();
    };
    WebSocketManager.m_manager = new WebSocketManager();
    return WebSocketManager;
}(NetBase));
__reflect(WebSocketManager.prototype, "WebSocketManager");
// TypeScript file
var SoundManager = (function () {
    function SoundManager() {
        this._bgmVolume = 1;
        this.time_stop_bgm = 3000;
        this.canPlayCombatBGM = false;
        var self = this;
        var soundSet = localStorage.getItem("soundSet");
        self.yinxiao = soundSet == null ? true : soundSet == "on";
        var musicSet = localStorage.getItem("musicSet");
        self.yinyue = musicSet == null ? true : musicSet == "on";
        //GameConfig.gameScene().addDebugLog( "yinxiao=" + self.yinxiao + "  yinyue=" + self.yinyue + "  fangyan=" + self.fangyan );
    }
    SoundManager.getInstance = function () {
        if (!SoundManager._instance) {
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    };
    SoundManager.prototype.PlaySound = function (sound_name, playcnt) {
        if (playcnt === void 0) { playcnt = 1; }
        var self = this;
        if (!self.yinxiao)
            return;
        // Sound 允许您在应用程序中使用声音。
        // 使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
        // 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
        // egret.log("播放" + sound_name + "，共" + loops + "次");
        var sound = RES.getRes(sound_name);
        if (sound) {
            self.playSoundImpl(sound, sound_name, playcnt);
        }
        else {
            RES.getResAsync(sound_name, function (sound, source) { self.playSoundImpl(sound, source, playcnt); }, self);
        }
    };
    SoundManager.prototype.PlayClickSound = function () {
        var self = this;
        self.PlaySound("click_mp3");
    };
    SoundManager.prototype.playSoundImpl = function (sound, source, playcnt) {
        var self = this;
        //GameConfig.gameScene().addDebugLog( "sound=" + (!!sound) + "  yinxiao=" + self.yinxiao );
        if (!sound || !self.yinxiao)
            return;
        //BY 小放 选牌间隔很短，所以这限制没用处，注释
        // if(this.lastSource == source && this.pchannel.position != 0 && this.pchannel.position < 0.5) {  //BY小放 前面同一个音效没有放完，间隔小于0.5秒，防止重复播放
        //     return;
        // }
        this.lastSource = source;
        this.pchannel = sound.play(0, playcnt);
        this.pchannel.volume = 1;
        this.pchannel.time = Date.now;
        //GameConfig.gameScene().addDebugLog( "sound play" );
    };
    SoundManager.prototype.PlaySound_WaitDuration = function (sound_name, playcnt, duration) {
        if (playcnt === void 0) { playcnt = 1; }
        if (duration === void 0) { duration = 100; }
        var self = this;
        if (!self.yinxiao)
            return;
        // Sound 允许您在应用程序中使用声音。
        // 使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
        // 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
        if (duration <= 0) {
            self.PlaySound(sound_name, playcnt);
        }
        else {
            egret.setTimeout(function () {
                self.PlaySound(sound_name, playcnt);
            }, self, duration);
        }
    };
    SoundManager.prototype.PlayBgm = function (bgm_name) {
        var self = this;
        if (!self.yinyue)
            return;
        self._bgmName = bgm_name;
        if (self._bgmChannel) {
            self.CloseBgm();
        }
        var sound = RES.getRes(bgm_name);
        if (sound) {
            self.playBgmImpl(sound, bgm_name);
        }
        else {
            RES.getResAsync(bgm_name, self.playBgmImpl, self);
        }
    };
    SoundManager.prototype.playBgmImpl = function (sound, source) {
        var self = this;
        if (!sound || !self.yinyue || source != self._bgmName)
            return;
        self._bgmSound = sound;
        self._bgmChannel = sound.play(0, 0);
        self._bgmChannel.volume = self._bgmVolume;
    };
    SoundManager.prototype.setBGMVolume = function (volume) {
        var self = this;
        self._bgmVolume = volume;
        if (self._bgmChannel == null)
            return;
        self._bgmChannel.volume = volume;
    };
    SoundManager.prototype.PlayBgmExist = function () {
        var self = this;
        if (!self.yinyue)
            return;
        if (!self._bgmChannel && self._bgmSound) {
            self._bgmChannel = self._bgmSound.play(0, 0);
        }
    };
    SoundManager.prototype.CloseBgm = function () {
        var bgmChannel = this._bgmChannel;
        if (bgmChannel) {
            bgmChannel.stop();
            this._bgmChannel = null;
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
// TypeScript file
var GameProcedure = (function () {
    function GameProcedure() {
    }
    return GameProcedure;
}());
__reflect(GameProcedure.prototype, "GameProcedure");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
// TypeScript file
var UIManager = (function () {
    function UIManager() {
        //保存构造函数;
        this.uiUsedContainer = new Object();
        //保存实例对象
        this.uiContainer = new Object();
        //id-ui_name
        this.gkid_vname = new Object();
        //遮罩层;
        this.m_maskSpriteLayer = GameScene.VIEW_LAYER_NUMBER;
        //遮罩图;
        this.m_maskSprite = new egret.Sprite();
    }
    UIManager.getInstance = function () {
        return UIManager.m_manager;
    };
    /*显示UI;
    *ui         UI名称或者是类名;
    *layer      层级;
    *maskAlpha  遮罩透明度-1为没有遮罩;
    *popUpWidth 弹窗宽度,定位使用
    *popUpHeight弹窗高度,定位使用
    *effectType 打开特效类型;
    *data       传递数据;

    */
    UIManager.prototype.showUI = function (ui, layer, maskAlpha, popUpWidth, popUpHeight, effectType, data) {
        if (layer === void 0) { layer = GameScene.VIEW_LAYER_NUMBER; }
        if (maskAlpha === void 0) { maskAlpha = -1; }
        if (popUpWidth === void 0) { popUpWidth = 0; }
        if (popUpHeight === void 0) { popUpHeight = 0; }
        if (effectType === void 0) { effectType = 0 /* TYPE_NOR */; }
        if (data === void 0) { data = null; }
        if (ui == null) {
            console.log("UI名称或者面板路径为空");
            return;
        }
        var self = this;
        var uiname = self.GetAndRegView(ui);
        var view = self.uiUsedContainer[uiname];
        if (view == null) {
            view = new self.uiContainer[uiname]();
            self.uiUsedContainer[uiname] = view;
        }
        else {
            if (view.visible) {
                if (data != null) {
                    view.initData(data);
                }
                return;
            }
        }
        self.openView(uiname, view, layer, maskAlpha);
        view.weekComplete();
        view.init(2, layer, popUpWidth, popUpHeight, effectType, data);
    };
    //打开视图特效;
    UIManager.prototype.openViewEffect = function (view) {
        var popUpWidth = view.width;
        var popUpHeight = view.height;
        var pWidth = GameConfig.curWidth() / 2 - popUpWidth / 2;
        var pHeight = GameConfig.curHeight() / 2 - popUpHeight / 2;
        // if(popUpWidth!=0){
        //     view.x = pWidth;
        //     view.y = pHeight;
        // }
        switch (view.getEffectType()) {
            case 0 /* TYPE_NOR */:
                {
                    view.alpha = 1;
                    view.scaleX = 1;
                    view.scaleY = 1;
                }
                break;
            case 1 /* TYPE_SCALE_CENTER */:
                {
                    view.alpha = 0;
                    view.scaleX = 0.5;
                    view.scaleY = 0.5;
                    view.x = view.x + popUpWidth / 4;
                    view.y = view.y + popUpHeight / 4;
                    egret.Tween.get(view).to({ alpha: 1, scaleX: 1, scaleY: 1, x: view.x - popUpWidth / 4, y: view.y - popUpHeight / 4 }, 500, egret.Ease.backOut);
                }
                break;
            case 2 /* TYPE_MOVE_LEFT */:
            case 3 /* TYPE_MOVE_RIGHT */:
                {
                    view.x = view.getEffectType() == 2 /* TYPE_MOVE_LEFT */ ? -popUpWidth : popUpWidth;
                    egret.Tween.get(view).to({ x: 0 }, 500, egret.Ease.cubicOut);
                }
                break;
            case 4 /* TYPE_MOVE_TOP */:
            case 5 /* TYPE_MOVE_BOTTOM */:
                {
                    view.y = view.getEffectType() == 5 /* TYPE_MOVE_BOTTOM */ ? -popUpHeight : popUpHeight;
                    egret.Tween.get(view).to({ y: 0 }, 500, egret.Ease.cubicOut);
                }
                break;
            case 6 /* TYPE_SHADOW */:
                {
                    view.alpha = 0;
                    egret.Tween.get(view).to({ alpha: 1 }, 500, egret.Ease.backOut);
                }
                break;
        }
    };
    //移除视图;
    UIManager.prototype.hideUI = function (ui, effectType) {
        if (effectType === void 0) { effectType = 0 /* TYPE_NOR */; }
        var uiname = this.GetAndRegView(ui);
        var view = this.uiUsedContainer[uiname];
        if (view == null)
            return;
        var tweenComplete = function () {
            var view2 = view;
            view2.hiden();
            if (view2.parent) {
                view2.parent.removeChild(view2);
            }
            UIManager.getInstance().hidenDarkSprite();
        };
        switch (effectType) {
            case 0 /* TYPE_NOR */:
                {
                    tweenComplete();
                }
                break;
            case 1 /* TYPE_SCALE_CENTER */:
                {
                    egret.Tween.get(view).to({ alpha: 0, scaleX: 0, scaleY: 0, x: view.x + view.width / 2, y: view.y + view.height / 2 }, 500).call(tweenComplete, this);
                }
                break;
            case 2 /* TYPE_MOVE_LEFT */:
            case 3 /* TYPE_MOVE_RIGHT */:
                {
                    var moveX = view.getEffectType() == 2 /* TYPE_MOVE_LEFT */ ? -GameConfig.curWidth() : GameConfig.curWidth();
                    egret.Tween.get(view).to({ x: moveX }, 500).call(tweenComplete, this);
                }
                break;
            case 4 /* TYPE_MOVE_TOP */:
            case 5 /* TYPE_MOVE_BOTTOM */:
                {
                    var moveY = view.getEffectType() == 5 /* TYPE_MOVE_BOTTOM */ ? -GameConfig.curHeight() : GameConfig.curHeight();
                    egret.Tween.get(view).to({ y: moveY }, 500).call(tweenComplete, this);
                }
                break;
            case 6 /* TYPE_SHADOW */:
                {
                    egret.Tween.get(view).to({ alpha: 0 }, 500).call(tweenComplete, this);
                }
                break;
        }
    };
    //显示load界面;
    UIManager.prototype.showLoading = function (oriMode, data) {
        if (oriMode === void 0) { oriMode = egret.OrientationMode.AUTO; }
        if (data === void 0) { data = null; }
        var uiname = null;
        var view = null;
        var loadView = null;
        if (oriMode == egret.OrientationMode.AUTO) {
            loadView = LoadingSView;
        }
        else if (oriMode == egret.OrientationMode.PORTRAIT) {
            loadView = LoadingSView;
        }
        else if (oriMode == egret.OrientationMode.LANDSCAPE) {
            loadView = LoadingHView;
        }
        else if (oriMode == egret.OrientationMode.LANDSCAPE_FLIPPED) {
            loadView = LoadingRView;
        }
        uiname = this.GetAndRegView(loadView);
        view = this.getViewByName(loadView);
        if (view && view.visible) {
            this.hideUI(view);
        }
        if (view == null) {
            view = new this.uiContainer[uiname]();
            this.uiUsedContainer[uiname] = view;
        }
        this.openView(uiname, view, GameScene.POP_LAYER_NUMBER, -1);
        view.weekComplete();
        view.init(2, GameScene.POP_LAYER_NUMBER, 0, 0, 0 /* TYPE_NOR */, data);
        return view;
    };
    UIManager.prototype.hideLoading = function () {
        this.hideUI(LoadingSView);
        this.hideUI(LoadingRView);
        this.hideUI(LoadingHView);
    };
    UIManager.prototype.registerViewNameByGkid = function (gkid, ui, g_name) {
        var name = this.GetUIName(ui);
        this.gkid_vname[gkid] = name;
    };
    UIManager.prototype.getViewNameByGkid = function (gkid) {
        var v_name = this.gkid_vname[gkid];
        if (v_name != null) {
            return v_name;
        }
        return null;
    };
    //根据名字返回视图;
    UIManager.prototype.getViewByName = function (ui) {
        var uiname = this.GetAndRegView(ui);
        var view = this.uiUsedContainer[uiname];
        if (view != null) {
            return view;
        }
        return null;
    };
    UIManager.prototype.checkHasViewByName = function (ui) {
        var uiname = this.GetUIName(ui);
        return this.uiUsedContainer.hasOwnProperty(uiname);
    };
    //返回并注册视图;
    UIManager.prototype.GetAndRegView = function (ui) {
        var uiname = this.GetUIName(ui);
        if (this.uiContainer[uiname] != null) {
            return uiname;
        }
        if (uiname == "") {
            egret.log("找不到此名对应的类:" + uiname);
            return "";
        }
        if (this.uiContainer[uiname] == null) {
            this.uiContainer[uiname] = ui;
        }
        return uiname;
    };
    //返回UI名称;
    UIManager.prototype.GetUIName = function (ui) {
        if (ui == null)
            return "";
        if (typeof ui == "string")
            return ui.toString();
        else
            return egret.getQualifiedClassName(ui);
    };
    /*打开视图
    * uiname:UI名称
    *layer: 视图层级;
    *maskAlpha:遮罩透明度;
    */
    UIManager.prototype.openView = function (uiname, view, layer, maskAlpha, effectType) {
        if (layer === void 0) { layer = GameScene.VIEW_LAYER_NUMBER; }
        if (maskAlpha === void 0) { maskAlpha = -1; }
        if (effectType === void 0) { effectType = 0 /* TYPE_NOR */; }
        var uiLayer = null;
        switch (layer) {
            case GameScene.GAME_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getGameLayer();
                break;
            case GameScene.VIEW_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getViewLayer();
                break;
            case GameScene.EFFECT_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getEffectLayer();
                break;
            case GameScene.HEAD_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getHeadLayer();
                break;
            case GameScene.BOM_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getBomLayer();
                break;
            case GameScene.POP_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getPopLayer();
                break;
            case GameScene.HIDE_LAYER_NUMBER:
                return;
        }
        var self = this;
        self.m_maskSpriteLayer = layer;
        if (maskAlpha >= 0) {
            self.m_maskSprite.graphics.clear();
            self.m_maskSprite.graphics.beginFill(0x000000, maskAlpha);
            self.m_maskSprite.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
            self.m_maskSprite.graphics.endFill();
            self.m_maskSprite.width = GameConfig.curWidth();
            self.m_maskSprite.height = GameConfig.curHeight();
            if (!uiLayer.contains(self.m_maskSprite)) {
                uiLayer.addChild(self.m_maskSprite);
            }
            self.m_maskSprite.touchEnabled = true;
            self.m_maskSprite.visible = true;
        }
        uiLayer.addChild(view);
    };
    //隐藏遮罩;
    UIManager.prototype.hidenDarkSprite = function () {
        if (this.m_maskSprite) {
            var container = this.m_maskSprite.parent;
            if (container) {
                if (container.contains(this.m_maskSprite)) {
                    container.removeChild(this.m_maskSprite);
                }
            }
        }
    };
    UIManager.prototype.removeAllLayerUI = function () {
        var self = this;
        self.removeLayerUI(GameScene.GAME_LAYER_NUMBER);
        self.removeLayerUI(GameScene.VIEW_LAYER_NUMBER);
        self.removeLayerUI(GameScene.EFFECT_LAYER_NUMBER);
        self.removeLayerUI(GameScene.HEAD_LAYER_NUMBER);
        self.removeLayerUI(GameScene.BOM_LAYER_NUMBER);
        self.removeLayerUI(GameScene.POP_LAYER_NUMBER);
    };
    UIManager.prototype.removeLayerUI = function (layer) {
        if (layer === void 0) { layer = GameScene.VIEW_LAYER_NUMBER; }
        var uiLayer = null;
        switch (layer) {
            case GameScene.GAME_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getGameLayer();
                break;
            case GameScene.VIEW_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getViewLayer();
                break;
            case GameScene.EFFECT_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getEffectLayer();
                break;
            case GameScene.HEAD_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getHeadLayer();
                break;
            case GameScene.BOM_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getBomLayer();
                break;
            case GameScene.POP_LAYER_NUMBER:
                uiLayer = GameConfig.gameScene().getPopLayer();
                break;
            case GameScene.HIDE_LAYER_NUMBER:
                return;
        }
        if (uiLayer == null)
            return;
        for (var i = 0, lengthI = uiLayer.numChildren; i < lengthI; i++) {
            if (uiLayer.numChildren > 0) {
                var child = uiLayer.getChildAt(0);
                if (child instanceof IBaseView) {
                    var view = child;
                    view.hiden();
                    uiLayer.removeChild(view);
                }
            }
        }
    };
    UIManager.m_manager = new UIManager();
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
var UIMovieClip = (function (_super) {
    __extends(UIMovieClip, _super);
    function UIMovieClip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UIMovieClip.prototype, "source", {
        get: function () {
            return this._source;
        },
        //格式： jsname.mcname
        set: function (val) {
            var self = this;
            if (self._source == val)
                return;
            self._source = val;
            if (val) {
                var tmps = val.split(".");
                if (tmps.length < 2)
                    return;
                MCManager.getInstance().getMCDataAsync(tmps[0], tmps[1], self.onLoadMCDataFin, self);
            }
            else {
                self.movieClipData = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    UIMovieClip.prototype.onLoadMCDataFin = function (mcData, jsName, mcName) {
        var self = this;
        var source = jsName + "." + mcName;
        if (self._source == source) {
            var frameRate = self.frameRate;
            self.movieClipData = mcData;
            if (frameRate)
                self.frameRate = frameRate;
            var params = self._params;
            if (params) {
                if (params.play) {
                    if (params.frame) {
                        _super.prototype.gotoAndPlay.call(this, params.frame, params.times);
                    }
                    else {
                        _super.prototype.play.call(this, params.times);
                    }
                }
                else {
                    _super.prototype.gotoAndStop.call(this, params.frame);
                }
            }
            self._params = null;
            self.dispatchEventWith(UIMovieClip.LOAD_FIN_EVENT);
        }
    };
    UIMovieClip.prototype.play = function (playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
        var self = this;
        if (self.$movieClipData) {
            _super.prototype.play.call(this, playTimes);
        }
        else {
            self._params = { times: playTimes, play: 1 };
        }
    };
    UIMovieClip.prototype.stop = function () {
        var self = this;
        if (self.$movieClipData) {
            _super.prototype.stop.call(this);
        }
        else {
            self._params = null;
        }
    };
    UIMovieClip.prototype.prevFrame = function () {
        if (this.$movieClipData) {
            _super.prototype.prevFrame.call(this);
        }
    };
    UIMovieClip.prototype.nextFrame = function () {
        if (this.$movieClipData) {
            _super.prototype.nextFrame.call(this);
        }
    };
    UIMovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
        var self = this;
        if (self.$movieClipData) {
            _super.prototype.gotoAndPlay.call(this, frame, playTimes);
        }
        else {
            self._params = { times: playTimes, frame: frame, play: 1 };
        }
    };
    UIMovieClip.prototype.gotoAndStop = function (frame) {
        var self = this;
        if (self.$movieClipData) {
            _super.prototype.gotoAndStop.call(this, frame);
        }
        else {
            self._params = { frame: frame, play: 0 };
        }
    };
    UIMovieClip.LOAD_FIN_EVENT = "load_fin";
    return UIMovieClip;
}(egret.MovieClip));
__reflect(UIMovieClip.prototype, "UIMovieClip");
// TypeScript file
eui.Component.prototype.$parseSkinName = function () {
    var skinName = this.skinName;
    var skin;
    if (skinName) {
        if (skinName.prototype) {
            skin = new skinName();
        }
        else if (typeof (skinName) == "string") {
            var clazz = UITheme.getTheme(skinName);
            skin = new clazz();
        }
        else {
            skin = skinName;
        }
    }
    this.setSkin(skin);
};
var UITheme;
(function (UITheme) {
    var _skinMap = {};
    var _skinConfs = {};
    var _initFin;
    var _initTar;
    function loadConf(configURL, initFin, initTar) {
        if (window["allSkins"]) {
            _skinMap = window["allSkins"];
            if (initFin)
                initFin.call(initTar);
            return;
        }
        _initFin = initFin;
        _initTar = initTar;
        RES.getResByUrl(configURL, onConfigLoaded, self, RES.ResourceItem.TYPE_JSON);
    }
    UITheme.loadConf = loadConf;
    function addSkinConf(data) {
        var skinConfs = _skinConfs;
        if (skinConfs) {
            for (var key in data) {
                var addConfs = data[key];
                var conf = skinConfs[key];
                if (conf) {
                    for (var subkey in addConfs) {
                        conf[subkey] = addConfs[subkey];
                    }
                }
                else {
                    skinConfs[key] = addConfs;
                }
            }
        }
        else {
            _skinConfs = data;
        }
    }
    function getTheme(name) {
        var cls = _skinMap[name];
        if (cls)
            return cls;
        cls = parseSkin(_skinConfs, name);
        return cls;
    }
    UITheme.getTheme = getTheme;
    function hasTheme(name) {
        var cls = _skinMap[name];
        if (cls)
            return true;
        if (_skinConfs[name]) {
            return true;
        }
        return false;
    }
    UITheme.hasTheme = hasTheme;
    function getSkinNames(skinName) {
        var startIdx = skinName.indexOf(".") + 1;
        var dotIdx = skinName.indexOf(".", startIdx);
        return { first: skinName.substring(startIdx, dotIdx), secound: skinName.substring(dotIdx + 1) };
    }
    function onConfigLoaded(data, url) {
        if (true) {
            if (!data) {
                egret.$error(3000);
            }
        }
        addSkinConf(data);
        RES.destroyRes(url);
        if (_initFin) {
            _initFin.call(_initTar);
            _initFin = null;
            _initFin = null;
        }
    }
    function parseSkin(parseSkins, name) {
        var skinData = parseSkins[name];
        if (!skinData)
            return null;
        delete parseSkins[name];
        skinData = skinData.replace(/#!/g, "this.");
        skinData = skinData.replace(/#b/g, "function(");
        var cls = parse(skinData);
        _skinMap[name] = cls;
        return cls;
    }
    function parse(code) {
        try {
            var clazz = eval(code);
            code = null;
        }
        catch (e) {
            if (true) {
                egret.log(e);
            }
            return null;
        }
        return clazz;
    }
})(UITheme || (UITheme = {}));
// TypeScript file
/**
 * <p><code>Handler</code> 是事件处理器类。</p>
 * <p>推荐使用 Handler.create() 方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。</p>
 * <p><b>注意：</b>由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。</p>
 */
var Handler = (function () {
    /**
     * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
     * @param	caller 执行域。
     * @param	method 处理函数。
     * @param	args 函数参数。
     * @param	once 是否只执行一次。
     */
    function Handler(caller, method, args, once) {
        if (caller === void 0) { caller = null; }
        if (method === void 0) { method = null; }
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
        this.once = false;
        /**@private */
        this._id = 0;
        this.setTo(caller, method, args, once);
    }
    /**
     * 设置此对象的指定属性值。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
     * @return  返回 handler 本身。
     */
    Handler.prototype.setTo = function (caller, method, args, once) {
        var self = this;
        self._id = Handler._gid++;
        self.caller = caller;
        self.method = method;
        self.args = args;
        self.once = once;
        return self;
    };
    /**
     * 执行处理器。
     */
    Handler.prototype.run = function () {
        var self = this;
        if (self.method == null)
            return null;
        var id = self._id;
        var result = self.method.apply(self.caller, self.args);
        self._id === id && self.once && self.recover();
        return result;
    };
    /**
     * 执行处理器，携带额外数据。
     * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
     */
    Handler.prototype.runWith = function (data) {
        var self = this;
        if (self.method == null)
            return null;
        var id = self._id;
        if (data == null)
            var result = self.method.apply(self.caller, self.args);
        else if (!self.args && !(data instanceof Array))
            result = self.method.call(self.caller, data);
        else if (self.args)
            result = self.method.apply(self.caller, self.args.concat(data));
        else
            result = self.method.apply(self.caller, data);
        self._id === id && self.once && self.recover();
        return result;
    };
    /**
     * 清理对象引用。
     */
    Handler.prototype.clear = function () {
        var self = this;
        self.caller = null;
        self.method = null;
        self.args = null;
        return self;
    };
    /**
     * 清理并回收到 Handler 对象池内。
     */
    Handler.prototype.recover = function () {
        var self = this;
        if (self._id > 0) {
            self._id = 0;
            Handler._pool.push(self.clear());
        }
    };
    /**
     * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
     * @return  返回创建的handler实例。
     */
    Handler.create = function (caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = true; }
        var self = this;
        if (Handler._pool.length)
            return Handler._pool.pop().setTo(caller, method, args, once);
        return new Handler(caller, method, args, once);
    };
    /*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
    /**@private handler对象池*/
    Handler._pool = [];
    /**@private */
    Handler._gid = 1;
    return Handler;
}());
__reflect(Handler.prototype, "Handler");
// TypeScript file
var GlobalDataManager = (function () {
    function GlobalDataManager() {
        //客户端配置信息;
        this.gameConfig = null;
        //当前中心服务器信息
        this.centerServer = null;
        //人物信息;
        this.account = new AccountData();
        // 羁绊信息
        this.jibanData = new JiBanData();
    }
    GlobalDataManager.getInstance = function () {
        return GlobalDataManager.m_manager;
    };
    GlobalDataManager.prototype.getGameConfig = function () {
        return this.gameConfig;
    };
    GlobalDataManager.prototype.setGameConfig = function (gameConfig) {
        this.gameConfig = gameConfig;
    };
    GlobalDataManager.prototype.getCenterServer = function () {
        return this.centerServer;
    };
    GlobalDataManager.prototype.setCenterServer = function (centerServer) {
        this.centerServer = centerServer;
    };
    GlobalDataManager.prototype.getStatus = function () {
        return this.status;
    };
    GlobalDataManager.prototype.setStatus = function (status) {
        this.status = status;
    };
    // public setAccountText(str:string):void{
    //     this.accountText = str;
    // }
    // public getAccountText():string{
    //     return this.accountText;
    // }
    // public setPassWordText(str:string):void{
    //     this.passWordText = str;
    // }
    // public getPassWordText():string{
    //     return this.passWordText;
    // }
    GlobalDataManager.prototype.getAccountData = function () {
        return this.account;
    };
    GlobalDataManager.prototype.getJiBanData = function () {
        return this.jibanData;
    };
    GlobalDataManager.prototype.getIsConnect = function () {
        return this.isConnect;
    };
    GlobalDataManager.prototype.setIsConnect = function (isConnect) {
        this.isConnect = isConnect;
    };
    GlobalDataManager.prototype.getThredID = function () {
        return this.thredID;
    };
    GlobalDataManager.prototype.setThredID = function (thredID) {
        this.thredID = thredID;
    };
    GlobalDataManager.prototype.getGameServerName = function () {
        return this.gameServerName;
    };
    GlobalDataManager.prototype.setGameServerName = function (name) {
        this.gameServerName = name;
    };
    GlobalDataManager.prototype.getRUUID = function () {
        return this.ruuid;
    };
    GlobalDataManager.prototype.setRUUID = function (ruuid) {
        this.ruuid = ruuid;
    };
    GlobalDataManager.prototype.getRoom = function () {
        return this.room;
    };
    GlobalDataManager.prototype.setRoom = function (room) {
        this.room = room;
    };
    GlobalDataManager.prototype.getGameOver = function () {
        return this.gameover;
    };
    GlobalDataManager.prototype.setGameOver = function (gameover) {
        this.gameover = gameover;
    };
    GlobalDataManager.prototype.getWalletInit = function () {
        return this.walletinit;
    };
    GlobalDataManager.prototype.setWalletInit = function (isInit) {
        this.walletinit = isInit;
    };
    GlobalDataManager.prototype.getBindAddress = function () {
        return this.bindaddress;
    };
    GlobalDataManager.prototype.setBindAddress = function (address) {
        this.bindaddress = address;
    };
    GlobalDataManager.m_manager = new GlobalDataManager();
    return GlobalDataManager;
}());
__reflect(GlobalDataManager.prototype, "GlobalDataManager");
// TypeScript file
var GlobalDef = (function () {
    function GlobalDef() {
    }
    //屏幕宽高
    GlobalDef.SCREEN_WIDTH = 1334;
    GlobalDef.SCREEN_HEIGHT = 750;
    //请求结果
    GlobalDef.REQUEST_SUCCESS = 0;
    GlobalDef.REQUEST_FAIL = 1;
    return GlobalDef;
}());
__reflect(GlobalDef.prototype, "GlobalDef");
// TypeScript file
var MD5 = (function () {
    function MD5() {
        this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    }
    /*
    * These are the privates you'll usually want to call
    * They take string arguments and return either hex or base-64 encoded strings
    */
    MD5.prototype.hex_md5 = function (s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); }; //这个函数就行了，  
    MD5.prototype.b64_md5 = function (s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); };
    MD5.prototype.any_md5 = function (s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); };
    MD5.prototype.hex_hmac_md5 = function (k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
    MD5.prototype.b64_hmac_md5 = function (k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
    MD5.prototype.any_hmac_md5 = function (k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); };
    /*
    * Perform a simple self-test to see if the VM is working
    */
    MD5.prototype.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
    * Calculate the MD5 of a raw string
    */
    MD5.prototype.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    MD5.prototype.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
    * Convert a raw string to a hex string
    */
    MD5.prototype.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
    * Convert a raw string to a base-64 string
    */
    MD5.prototype.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
    * Convert a raw string to an arbitrary string encoding
    */
    MD5.prototype.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
        * Repeatedly perform a long division. The binary array forms the dividend,
        * the length of the encoding is the divisor. Once computed, the quotient
        * forms the dividend for the next step. All remainders are stored for later
        * use.
        */
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
    * Encode a string as utf-8.
    * For efficiency, this assumes the input is valid utf-16.
    */
    MD5.prototype.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
    * Encode a string as utf-16
    */
    MD5.prototype.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    MD5.prototype.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    MD5.prototype.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
    * Convert an array of little-endian words to a string
    */
    MD5.prototype.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    MD5.prototype.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
    * These privates implement the four basic operations the algorithm uses.
    */
    MD5.prototype.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    MD5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    MD5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    MD5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    MD5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    MD5.prototype.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    MD5.prototype.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    return MD5;
}());
__reflect(MD5.prototype, "MD5");
// TypeScript file
var CmdDef;
(function (CmdDef) {
    // // CMD_CS_LOGIN = 
    // CMD_GAME_LOGIN = 1000,  //登录到游戏服务器;
    CmdDef[CmdDef["CMD_GAME_LOGIN"] = 1] = "CMD_GAME_LOGIN";
    CmdDef[CmdDef["CMD_GAME_REGISTER"] = 2] = "CMD_GAME_REGISTER";
    CmdDef[CmdDef["CMD_GAME_SMSCODE"] = 3] = "CMD_GAME_SMSCODE";
    CmdDef[CmdDef["CMD_GAME_FORGOT"] = 4] = "CMD_GAME_FORGOT";
    CmdDef[CmdDef["CMD_CHECK_LOGIN"] = 5] = "CMD_CHECK_LOGIN";
    CmdDef[CmdDef["CMD_GAME_AUTO_LOGIN"] = 6] = "CMD_GAME_AUTO_LOGIN";
    // CMD_Hall = 100,  //大厅CMD;
    CmdDef[CmdDef["CMD_GAME_CONNECT"] = 1000] = "CMD_GAME_CONNECT";
    CmdDef[CmdDef["CMD_CLIENT_HEART_BEAT"] = 1100] = "CMD_CLIENT_HEART_BEAT";
    //测试战斗 后期删除
    CmdDef[CmdDef["CMD_DEBUG_SINGLE_CREATE_ROOM"] = 960] = "CMD_DEBUG_SINGLE_CREATE_ROOM";
    CmdDef[CmdDef["CMD_DEBUG_CLOSE_ROOM"] = 961] = "CMD_DEBUG_CLOSE_ROOM";
    CmdDef[CmdDef["CMD_DEBUG_REQ_USER_COMBAT_STATE"] = 962] = "CMD_DEBUG_REQ_USER_COMBAT_STATE";
    CmdDef[CmdDef["CMD_DEBUG_MANY_CREATE_ROOM"] = 965] = "CMD_DEBUG_MANY_CREATE_ROOM";
    CmdDef[CmdDef["CMD_DEBUG_GAME_CONNECT"] = 980] = "CMD_DEBUG_GAME_CONNECT";
    CmdDef[CmdDef["CMD_DEBUG_GET_ROOM_DATA"] = 981] = "CMD_DEBUG_GET_ROOM_DATA";
    CmdDef[CmdDef["CMD_DEBUG_GET_ROOM_DETAIL"] = 982] = "CMD_DEBUG_GET_ROOM_DETAIL";
    CmdDef[CmdDef["CMD_DEBUG_GET_ROOM_RESERVE_DATA"] = 983] = "CMD_DEBUG_GET_ROOM_RESERVE_DATA";
    CmdDef[CmdDef["CMD_DEBUG_REMOVE_ROOM_RECORD"] = 984] = "CMD_DEBUG_REMOVE_ROOM_RECORD";
    CmdDef[CmdDef["CMD_DEBUG_GET_BATTLE_INFO"] = 985] = "CMD_DEBUG_GET_BATTLE_INFO";
    CmdDef[CmdDef["CMD_BIND_CHAIN_WALLET"] = 300] = "CMD_BIND_CHAIN_WALLET";
    CmdDef[CmdDef["CMD_WALLET_TRANSFER"] = 301] = "CMD_WALLET_TRANSFER";
    CmdDef[CmdDef["CMD_WALLET_TRANSFER_RESULT"] = 302] = "CMD_WALLET_TRANSFER_RESULT";
    CmdDef[CmdDef["CMD_CARD_OFFLINE"] = 303] = "CMD_CARD_OFFLINE";
    CmdDef[CmdDef["CMD_CARD_OFFLINE_RESULT"] = 304] = "CMD_CARD_OFFLINE_RESULT";
})(CmdDef || (CmdDef = {}));
// TypeScript file
var SystemDecoder = (function (_super) {
    __extends(SystemDecoder, _super);
    function SystemDecoder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //方法前缀 
        _this.funcPrefix = "method_";
        return _this;
    }
    //请重写该方法;
    SystemDecoder.prototype.initDecoderFunction = function () {
        //这里使用遍历枚举注册服务器监听方法
        var self = this;
        for (var key in CmdDef) {
            var keyToAny = key;
            if (isNaN(keyToAny)) {
                var anyType = CmdDef[key];
                var cEnum = anyType;
                var func = self[self.funcPrefix + cEnum];
                if (func) {
                    self.registerCmd(cEnum, func);
                }
            }
        }
    };
    SystemDecoder.prototype.removeDecoderFunction = function () {
        var self = this;
        for (var key in CmdDef) {
            var keyToAny = key;
            if (isNaN(keyToAny)) {
                var anyType = CmdDef[key];
                var cEnum = anyType;
                var func = self[self.funcPrefix + cEnum];
                if (func) {
                    self.unRegisterFunction(cEnum);
                }
            }
        }
    };
    //登录;
    SystemDecoder.prototype.method_1 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg = data.msg;
        if (msg == null)
            return;
        var userInfo = msg.userInfo;
        if (userInfo) {
            var account = GlobalDataManager.getInstance().getAccountData();
            var ticket = userInfo.ticket;
            account.setTicket(ticket);
            GameConfig.ticket = ticket;
            egret.localStorage.setItem("ticket", ticket);
            var username = userInfo.username;
            account.setUName(username);
            var head_url = userInfo.head_url;
            account.setHead_Url(head_url);
            var nickName = userInfo.nickName;
            account.setNick(nickName);
            var gold = userInfo.gold;
            account.setGold(gold);
            var points = userInfo.points;
            account.setPoints(points);
            var lvl = userInfo.lvl;
            account.setLvl(lvl);
            var exp = userInfo.exp;
            account.setExp(exp);
            var upexp = userInfo.upexp;
            account.setUpexp(upexp);
            var muexp = userInfo.muexp;
            account.setMuexp(muexp);
            var etime = userInfo.etime;
            account.setEtime(etime);
            var vip = userInfo.vip;
            account.setVip(vip);
            var vip_st = userInfo.vip_st;
            account.setVip_St(vip_st);
            var hp = userInfo.hp;
            account.setHp(hp);
            var cost = userInfo.cost;
            account.setCost(cost);
        }
        var appConfig = msg.navigateTo;
        if (appConfig != null) {
            //跳转信息
            var id = appConfig.id;
            var name_1 = appConfig.name;
            var ori = appConfig.ori;
            var jsVer = appConfig.jsVer;
            var resVer = appConfig.resVer;
            var attRes = appConfig.attRes;
            var pathStr = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id, name_1, ori, jsVer, resVer, pathStr, attRes);
            var obj = new Object();
            obj["param"] = { playBGM: true };
            GMDManager.startGMD(id, obj);
        }
        else {
            var reconnect = msg.reconnect;
            if (reconnect != null) {
                var ruuid = reconnect.ruuid;
                GlobalDataManager.getInstance().setRUUID(ruuid);
                var room = reconnect.room;
                GlobalDataManager.getInstance().setRoom(room);
                GlobalDataManager.getInstance().setThredID(0);
                var scode = reconnect.scode;
                GlobalDataManager.getInstance().setGameServerName(scode);
                GlobalDataManager.getInstance().setGameOver(false);
                var surl = reconnect.surl;
                var server = new ServerData();
                server.setSname(scode);
                server.setSurl(surl);
                server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                WebSocketManager.getInstance().registerServer(server);
                WebSocketManager.getInstance().connectServer(scode, true);
            }
        }
        UIManager.getInstance().hideUI(LoginView);
        // GameConfig.uid = ticket;
        // let sid:string = data.sid;
        // let surl:string = data.surl;
        // var server:ServerData = new ServerData();
        // server.setSname(sid);
        // GlobalDataManager.getInstance().setGameServerSID(sid);
        // server.setSurl(surl);
        // server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        // WebSocketManager.getInstance().registerServer(server);
        // if(WebSocketManager.getInstance().isConnect(sid)){
        //     WebSocketManager.getInstance().close(sid);
        // }
        // WebSocketManager.getInstance().connectServer(server.getSname(),true);
    };
    //注册;
    SystemDecoder.prototype.method_2 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg = data.msg;
        if (msg == null)
            return;
        var userInfo = msg.userInfo;
        if (userInfo) {
            var account = GlobalDataManager.getInstance().getAccountData();
            var ticket = userInfo.ticket;
            account.setTicket(ticket);
            GameConfig.ticket = ticket;
            egret.localStorage.setItem("ticket", ticket);
            var username = userInfo.username;
            account.setUName(username);
            var head_url = userInfo.head_url;
            account.setHead_Url(head_url);
            var nickName = userInfo.nickName;
            account.setNick(nickName);
            var gold = userInfo.gold;
            account.setGold(gold);
            var points = userInfo.points;
            account.setPoints(points);
            var lvl = userInfo.lvl;
            account.setLvl(lvl);
            var exp = userInfo.exp;
            account.setExp(exp);
            var upexp = userInfo.upexp;
            account.setUpexp(upexp);
            var muexp = userInfo.muexp;
            account.setMuexp(muexp);
            var etime = userInfo.etime;
            account.setEtime(etime);
            var vip = userInfo.vip;
            account.setVip(vip);
            var vip_st = userInfo.vip_st;
            account.setVip_St(vip_st);
            var hp = userInfo.hp;
            account.setHp(hp);
            var cost = userInfo.cost;
            account.setCost(cost);
        }
        var appConfig = msg.navigateTo;
        if (appConfig != null) {
            //跳转信息
            var id = appConfig.id;
            var name_2 = appConfig.name;
            var ori = appConfig.ori;
            var jsVer = appConfig.jsVer;
            var resVer = appConfig.resVer;
            var attRes = appConfig.attRes;
            var pathStr = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id, name_2, ori, jsVer, resVer, pathStr, attRes);
            var obj = new Object();
            obj["param"] = { playBGM: true };
            GMDManager.startGMD(id, obj);
        }
        else {
            var reconnect = msg.reconnect;
            if (reconnect != null) {
                var ruuid = reconnect.ruuid;
                GlobalDataManager.getInstance().setRUUID(ruuid);
                var room = reconnect.room;
                GlobalDataManager.getInstance().setRoom(room);
                GlobalDataManager.getInstance().setThredID(0);
                var scode = reconnect.scode;
                GlobalDataManager.getInstance().setGameServerName(scode);
                GlobalDataManager.getInstance().setGameOver(false);
                var surl = reconnect.surl;
                var server = new ServerData();
                server.setSname(scode);
                server.setSurl(surl);
                server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                WebSocketManager.getInstance().registerServer(server);
                WebSocketManager.getInstance().connectServer(scode, true);
            }
        }
        UIManager.getInstance().hideUI(LoginView);
        UIManager.getInstance().hideUI(RegisterView);
        // if(data.result==undefined||data.result!=GlobalDef.REQUEST_SUCCESS){
        //     var errors:any = RES.getRes("error_json");
        //     if(errors!=null&&errors!=undefined){
        //         var context:string = errors[data.result];
        //         if(context==null||context==undefined){
        //             context = "亲!发生未知错误,请重新尝试!";
        //         }
        //         PopManager.getInstance().showPromptBox(context,2,null,null);
        //     }
        //     return;
        // }
        // var account:AccountData = GlobalDataManager.getInstance().getAccountData();
        // let ticket:string = data.ticket;
        // account.setTicket(ticket);
        // GameConfig.uid = ticket;
        // egret.localStorage.setItem("uname",GlobalDataManager.getInstance().getAccountText());
        // egret.localStorage.setItem("password",GlobalDataManager.getInstance().getPassWordText());
        // let sid:string = data.sid;
        // let surl:string = data.surl;
        // var server:ServerData = new ServerData();
        // server.setSname(sid);
        // GlobalDataManager.getInstance().setGameServerSID(sid);
        // server.setSurl(surl);
        // server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        // WebSocketManager.getInstance().registerServer(server);
        // if(WebSocketManager.getInstance().isConnect(sid)){
        //     WebSocketManager.getInstance().close(sid);
        // }
        // WebSocketManager.getInstance().connectServer(server.getSname(),true);
    };
    SystemDecoder.prototype.method_3 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg = data.msg;
        if (msg == null || msg.type == null)
            return;
        var type = msg.type;
        if (type == 0) {
            var loginView = UIManager.getInstance().getViewByName(LoginView);
            if (loginView)
                loginView.setSMSCode(msg.code);
        }
        else if (type == 1) {
            var registerView = UIManager.getInstance().getViewByName(RegisterView);
            if (registerView)
                registerView.setSMSCode(msg.code);
        }
        else if (type == 2) {
            var forgotView = UIManager.getInstance().getViewByName(ForgotView);
            if (forgotView)
                forgotView.setSMSCode(msg.code);
        }
    };
    SystemDecoder.prototype.method_4 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var forgotView = UIManager.getInstance().getViewByName(ForgotView);
        if (forgotView)
            forgotView.onResetPasswordComplete();
    };
    SystemDecoder.prototype.method_5 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var msg = data.msg;
        if (msg == null)
            return;
        var state = msg.state;
        if (state != null && state == 0) {
            egret.localStorage.setItem("ticket", "");
            UIManager.getInstance().showUI(LoginView);
        }
        else {
            var userInfo = msg.userInfo;
            if (userInfo) {
                var account = GlobalDataManager.getInstance().getAccountData();
                var ticket = userInfo.ticket;
                account.setTicket(ticket);
                GameConfig.ticket = ticket;
                egret.localStorage.setItem("ticket", ticket);
                var username = userInfo.username;
                account.setUName(username);
                var head_url = userInfo.head_url;
                account.setHead_Url(head_url);
                var nickName = userInfo.nickName;
                account.setNick(nickName);
                var gold = userInfo.gold;
                account.setGold(gold);
                var points = userInfo.points;
                account.setPoints(points);
                var lvl = userInfo.lvl;
                account.setLvl(lvl);
                var exp = userInfo.exp;
                account.setExp(exp);
                var upexp = userInfo.upexp;
                account.setUpexp(upexp);
                var muexp = userInfo.muexp;
                account.setMuexp(muexp);
                var etime = userInfo.etime;
                account.setEtime(etime);
                var vip = userInfo.vip;
                account.setVip(vip);
                var vip_st = userInfo.vip_st;
                account.setVip_St(vip_st);
                var hp = userInfo.hp;
                account.setHp(hp);
                var cost = userInfo.cost;
                account.setCost(cost);
            }
            var appConfig = msg.navigateTo;
            if (appConfig != null) {
                //跳转信息
                var id = appConfig.id;
                var name_3 = appConfig.name;
                var ori = appConfig.ori;
                var jsVer = appConfig.jsVer;
                var resVer = appConfig.resVer;
                var attRes = appConfig.attRes;
                var pathStr = appConfig.path;
                //直接进游戏,后面需要合并其他游戏的时候再做处理;
                GMDManager.addGMDInfo(id, name_3, ori, jsVer, resVer, pathStr, attRes);
                var obj = new Object();
                obj["param"] = { playBGM: false };
                GMDManager.startGMD(id, obj);
            }
            else {
                var reconnect = msg.reconnect;
                if (reconnect != null) {
                    var ruuid = reconnect.ruuid;
                    GlobalDataManager.getInstance().setRUUID(ruuid);
                    var room = reconnect.room;
                    GlobalDataManager.getInstance().setRoom(room);
                    GlobalDataManager.getInstance().setThredID(0);
                    var scode = reconnect.scode;
                    GlobalDataManager.getInstance().setGameServerName(scode);
                    GlobalDataManager.getInstance().setGameOver(false);
                    var surl = reconnect.surl;
                    var server = new ServerData();
                    server.setSname(scode);
                    server.setSurl(surl);
                    server.setResolver(WebSocketManager.getInstance().getResolver(JsonResolver.NAME));
                    WebSocketManager.getInstance().registerServer(server);
                    WebSocketManager.getInstance().connectServer(scode, true);
                }
            }
            UIManager.getInstance().hideUI(LoginView);
        }
    };
    // private method_100(data:any):void{
    //     if(ErrorMananger.getInstance().checkReqResult(data))
    //         return;
    //     // var account:AccountData = GlobalDataManager.getInstance().getAccountData();
    //     // let head_image:string = data.head_image;
    //     // account.setHead_Image(head_image);
    //     // let sex:number = data.sex;
    //     // account.setSex(sex);
    //     // let gkid:number = data.gkid;
    //     // var gameName:string= data.gn;
    //     // let startGKID:number = data.sgkid;
    //     // //直接进游戏,后面需要合并其他游戏的时候再做处理;
    //     // console.log(`**********从这里进去**********`);
    //     // GMDManager.addGMDInfo(gkid,gameName,0,null,"0");  
    //     // let obj = new Object();
    //     // obj["dt"] = 2;
    //     // obj["param"] = {};
    //     // GMDManager.startGMD(startGKID,obj);
    //     // UIManager.getInstance().hideUI(LoginView);
    // }
    //绑定钱包;
    SystemDecoder.prototype.method_300 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data)) {
            XWG.SDK.disconnect();
            return;
        }
        GlobalDataManager.getInstance().setBindAddress(data.msg.address);
    };
    SystemDecoder.prototype.method_301 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
    };
    SystemDecoder.prototype.method_302 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
    };
    SystemDecoder.prototype.method_303 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
    };
    SystemDecoder.prototype.method_304 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
    };
    SystemDecoder.prototype.method_1000 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var obj = data.msg;
        // var gameInfo:any = obj.gameInfo;
        var appConfig = obj.navigateTo;
        if (appConfig) {
            GMDManager.closeGMD();
            //跳转信息
            var id = appConfig.id;
            var name_4 = appConfig.name;
            var ori = appConfig.ori;
            var jsVer = appConfig.jsVer;
            var resVer = appConfig.resVer;
            var attRes = appConfig.attRes;
            var pathStr = appConfig.path;
            //直接进游戏,后面需要合并其他游戏的时候再做处理;
            GMDManager.addGMDInfo(id, name_4, ori, jsVer, resVer, pathStr, attRes);
            var obj_1 = new Object();
            obj_1["param"] = { playBGM: true }; //gameInfo;
            GMDManager.startGMD(id, obj_1);
            UIManager.getInstance().hideUI(LoadingRView);
            if (UIManager.getInstance().checkHasViewByName("MatchingView"))
                UIManager.getInstance().hideUI("MatchingView");
        }
        else {
            //这里写不能跳转的错误提示;
        }
    };
    SystemDecoder.prototype.method_1100 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        WebSocketManager.getInstance().onRecvHeartBeat(data.msg);
    };
    SystemDecoder.prototype.method_960 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM, data.msg);
    };
    SystemDecoder.prototype.method_961 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_CLOSE_ROOM, data.msg);
    };
    SystemDecoder.prototype.method_962 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE, data.msg);
    };
    SystemDecoder.prototype.method_965 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_MANY_CREATE_ROOM, data.msg);
    };
    SystemDecoder.prototype.method_980 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        UIManager.getInstance().hideUI(LoadingRView);
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GAME_CONNECT, data.msg);
    };
    SystemDecoder.prototype.method_981 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_DATA, data.msg);
    };
    SystemDecoder.prototype.method_982 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        UIManager.getInstance().hideUI(LoadingRView);
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_DETAIL, data.msg);
    };
    SystemDecoder.prototype.method_983 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA, data.msg);
    };
    SystemDecoder.prototype.method_984 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD, data.msg);
    };
    SystemDecoder.prototype.method_985 = function (data) {
        if (ErrorMananger.getInstance().checkReqResult(data))
            return;
        var debugView = UIManager.getInstance().getViewByName(DebugView);
        if (debugView)
            debugView.recvData(CmdDef.CMD_DEBUG_GET_BATTLE_INFO, data.msg);
    };
    return SystemDecoder;
}(BaseDecoder));
__reflect(SystemDecoder.prototype, "SystemDecoder");
// TypeScript file
//游戏模块管理;
var GMDManager;
(function (GMDManager) {
    //key:string/info:GMDInfo;
    var _modInfos = {};
    //同时只能一个GMD在使用;
    var _curGMD = null;
    var _oldGMD = null;
    var _loadSt = 0;
    var _loadProgress;
    var _loadGps;
    var _loadCnt = 0;
    function addGMDInfo(gid, name, ori, jsVer, resVer, path, attRes) {
        var modInfo = _modInfos[gid];
        if (!modInfo) {
            var src;
            if (path) {
                src = path + "/" + name + ".js";
            }
            else {
                src = name + ".js";
            }
            if (jsVer) {
                src += "?v=" + jsVer;
            }
            var oriMode;
            switch (ori) {
                case 1:
                    oriMode = egret.OrientationMode.PORTRAIT;
                    break;
                case 2:
                    oriMode = egret.OrientationMode.LANDSCAPE;
                    break;
                case 3:
                    oriMode = egret.OrientationMode.LANDSCAPE_FLIPPED;
                    break;
                default:
                    oriMode = egret.OrientationMode.AUTO;
                    break;
            }
            var objAttRes = null;
            if (attRes != null) {
                objAttRes = (typeof attRes == 'string' && attRes != "") ? JSON.parse(attRes) : attRes;
            }
            _modInfos[gid] = { gid: gid, name: name, src: src, ori: oriMode, resVer: resVer, gm: null, attRes: objAttRes };
        }
    }
    GMDManager.addGMDInfo = addGMDInfo;
    function getCurGMD() {
        return _curGMD ? _curGMD.gm : null;
    }
    GMDManager.getCurGMD = getCurGMD;
    function startGMD(gid, data) {
        if (_curGMD) {
            if (true) {
                egret.log("还有模块没结束");
            }
            return;
        }
        var modInfo = _modInfos[gid];
        if (!modInfo) {
            egret.error("modinfo no find, check server table js");
        }
        modInfo.gm = window[modInfo.name];
        modInfo.data = data;
        _curGMD = modInfo;
        if (_oldGMD) {
            _oldGMD = null;
        }
        if (data.hasOwnProperty("gdir")) {
            var gdir = data["gdir"];
            if (gdir == 0) {
                modInfo.ori = egret.OrientationMode.LANDSCAPE_FLIPPED;
            }
            else if (gdir == 1) {
                modInfo.ori = egret.OrientationMode.AUTO;
            }
            else if (gdir == 2) {
                modInfo.ori = egret.OrientationMode.LANDSCAPE;
            }
            else if (gdir == 3) {
                modInfo.ori = egret.OrientationMode.LANDSCAPE_FLIPPED;
            }
        }
        _loadProgress = UIManager.getInstance().showLoading(modInfo.ori, null);
        _loadProgress.setStepInfo({ spt: 10, thm: 30, res: 40, ares: 20 }, loadGMDFined, self);
        _loadSt = 0 /* none */;
        if (modInfo.gm) {
            _loadSt = 2 /* loadScriptEnd */;
            _loadProgress.finStep("spt");
        }
        if (modInfo.theme && modInfo.resConf) {
            _loadSt = 4 /* loadThemeEnd */;
            _loadProgress.finStep("thm");
        }
        loadGMDImpl();
    }
    GMDManager.startGMD = startGMD;
    function closeGMD() {
        if (_curGMD) {
            _curGMD.gm.dispose();
            _oldGMD = _curGMD;
            _curGMD = null;
        }
        GlobalDataManager.getInstance().setStatus(0);
        SoundManager.getInstance().CloseBgm();
    }
    GMDManager.closeGMD = closeGMD;
    //load__
    function loadGMDImpl() {
        switch (_loadSt) {
            case 0 /* none */:
                startLoadGMDScript();
                break;
            case 2 /* loadScriptEnd */:
                _loadProgress.finStep("spt");
                startLoadGMDTheme();
                break;
            case 4 /* loadThemeEnd */:
                _loadProgress.finStep("thm");
                startLoadGMDRes();
                break;
            case 6 /* loadResEnd */:
                _loadProgress.finStep("res");
                startLoadGMDAttRes();
                break;
            case 8 /* loadAttResEnd */:
                _loadSt = 9 /* loaded */;
                _loadProgress.finAllStep();
                break;
        }
    }
    function startLoadGMDScript() {
        _loadSt = 1 /* loadScriptStart */;
        var s = document.createElement('script');
        s.async = false;
        s.src = _curGMD.src;
        var gid = _curGMD.id;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            if (_curGMD && _curGMD.id == gid) {
                _loadSt = 2 /* loadScriptEnd */;
                var gm = window[_curGMD.name];
                if (!gm) {
                    egret.error("GMD object not find name = " + _curGMD.name);
                }
                _curGMD.gm = gm;
                _loadSt = 2 /* loadScriptEnd */;
                loadGMDImpl();
            }
        }, false);
        document.body.appendChild(s);
    }
    function startLoadGMDTheme() {
        _loadSt = 3 /* loadThemeStart */;
        var gid = _curGMD.id;
        var path = Main.gRes + _curGMD.name + LanguageManager.getInstance().getLanguagePath() + "/";
        var resUrl;
        if (!_curGMD.resConf) {
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, arguments.callee, GMDManager);
                if (_curGMD && _curGMD.id == gid) {
                    _curGMD.resConf = true;
                    loadThemeFin();
                }
            }, GMDManager);
            resUrl = path + "default.res.json";
            if (_curGMD.resVer) {
                resUrl += "?v=" + _curGMD.resVer;
            }
            RES.loadConfig(resUrl, path);
        }
        if (!_curGMD.theme) {
            resUrl = path + "theme.json";
            if (_curGMD.resVer) {
                resUrl += "?v=" + _curGMD.resVer;
            }
            UITheme.loadConf(resUrl, function () {
                if (_curGMD && _curGMD.id == gid) {
                    _curGMD.theme = true;
                    loadThemeFin();
                }
            }, GMDManager);
        }
        if (!_curGMD.verLoad) {
            resUrl = path + "webver.json";
            if (_curGMD.resVer) {
                resUrl += "?v=" + _curGMD.resVer;
            }
            RES.getResByUrl(resUrl, function (data, source) {
                if (_curGMD && _curGMD.id == gid) {
                    if (data) {
                        RES.getVersionController().addWebVer(data);
                        RES.destroyRes(source);
                    }
                    _curGMD.verLoad = true;
                    loadThemeFin();
                }
            }, GMDManager, RES.ResourceItem.TYPE_JSON);
        }
    }
    function loadThemeFin() {
        if (_curGMD.resConf && _curGMD.theme && _curGMD.verLoad) {
            _loadSt = 4 /* loadThemeEnd */;
            loadGMDImpl();
        }
    }
    function startLoadGMDRes() {
        _loadSt = 5 /* loadResStart */;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadFin, GMDManager);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResLoadFin, GMDManager);
        RES.loadGroup(_curGMD.name);
    }
    function onResLoadFin(event) {
        if (_curGMD && event.groupName == _curGMD.name) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadFin, GMDManager);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResLoadFin, GMDManager);
            _loadSt = 6 /* loadResEnd */;
            loadGMDImpl();
        }
    }
    function startLoadGMDAttRes() {
        if (_curGMD) {
            if (!_curGMD.attRes) {
                _loadSt = 8 /* loadAttResEnd */;
                loadGMDImpl();
            }
            else {
                _loadSt = 7 /* loadAttResStart */;
                if (RES.createGroup(_curGMD.attRes.gName, _curGMD.attRes.arr2Res, true)) {
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onAttResLoadFin, GMDManager);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onAttResLoadFin, GMDManager);
                    RES.loadGroup(_curGMD.attRes.gName);
                }
                else {
                    _loadSt = 8 /* loadAttResEnd */;
                    loadGMDImpl();
                }
            }
        }
    }
    function onAttResLoadFin(event) {
        if (_curGMD && _curGMD.attRes && event.groupName == _curGMD.attRes.gName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onAttResLoadFin, GMDManager);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onAttResLoadFin, GMDManager);
            _loadSt = 8 /* loadAttResEnd */;
            loadGMDImpl();
        }
    }
    function loadGMDFined() {
        var data = _curGMD.data;
        var param;
        if (data != null) {
            var dt = data.dt;
            param = data.param;
            if (dt) {
                if (dt == 1) {
                }
                else if (dt == 2) {
                }
                else {
                }
            }
        }
        // _curGMD.gm.init(data?data.param:null,gmdInitFin);
        _curGMD.gm.init(param, gmdInitFin);
        GlobalDataManager.getInstance().setStatus(1);
    }
    function gmdInitFin(delMS) {
        delMS = delMS || 1000;
        if (delMS > 0) {
            egret.setTimeout(closeLoadUI, GMDManager, delMS);
        }
        else {
            closeLoadUI();
        }
    }
    function closeLoadUI() {
        _loadSt = 10 /* end */;
        _loadProgress = null;
        UIManager.getInstance().hideLoading();
    }
})(GMDManager || (GMDManager = {}));
// TypeScript file
var ErrorMananger = (function () {
    function ErrorMananger() {
    }
    ErrorMananger.getInstance = function () {
        return ErrorMananger.m_manager;
    };
    ErrorMananger.prototype.checkReqResult = function (data, errorPopup, callbackHandler) {
        if (errorPopup === void 0) { errorPopup = true; }
        if (callbackHandler === void 0) { callbackHandler = null; }
        var error = false;
        if (data.result == undefined || data.result != GlobalDef.REQUEST_SUCCESS) {
            error = true;
            if (errorPopup) {
                var errors = RES.getRes("error_json");
                if (errors != null && errors != undefined) {
                    var context = null;
                    var msg = data.msg;
                    if (msg != null)
                        context = errors[msg];
                    if (context == null || context == undefined)
                        context = errors["-999"] == null ? "亲!发生未知错误,请重新尝试!" : errors["-999"]; //"亲!发生未知错误,请重新尝试!";
                    if (msg == -5) {
                        PopManager.getInstance().showPromptBox(context, 2, Handler.create(self, function (confirm) {
                            PublicMethodManager.getInstance().loginOut();
                        }), ["Back to login"]);
                    }
                    else
                        PopManager.getInstance().showPromptBox(context, 2, callbackHandler, null);
                }
            }
        }
        return error;
    };
    ErrorMananger.m_manager = new ErrorMananger();
    return ErrorMananger;
}());
__reflect(ErrorMananger.prototype, "ErrorMananger");
// TypeScript file
var HTMLElementManager = (function () {
    function HTMLElementManager() {
        this.configs = new Object();
    }
    HTMLElementManager.getInstance = function () {
        return HTMLElementManager.m_manager;
    };
    HTMLElementManager.prototype.startLoadJson = function (jsonStr, completeFunc, target) {
        if (this.hasJsonData(jsonStr)) {
            completeFunc.call(target);
            return;
        }
        var resObj = RES.getRes(jsonStr);
        if (resObj == null) {
            completeFunc.call(target);
            return;
        }
        var self = this;
        var obj = new HTMLElementObj();
        obj.resObj = resObj["HTMLElementObj"];
        obj.completeFunc = completeFunc;
        obj.target = target;
        self.configs[jsonStr] = obj;
        this.addHTMLElement(obj);
    };
    HTMLElementManager.prototype.getHTMLElementObj = function (jsonStr) {
        return this.configs.hasOwnProperty(jsonStr) ? this.configs[jsonStr] : null;
    };
    HTMLElementManager.prototype.hasJsonData = function (jsonStr) {
        return this.configs.hasOwnProperty(jsonStr);
    };
    HTMLElementManager.prototype.addHTMLElement = function (obj) {
        var self = this;
        var linkArrSrc = [];
        var scriptArrSrc = [];
        var curModelStr = "PHONE";
        if (egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS") {
            curModelStr = "WIN";
        }
        var htmlElementObj = obj.resObj;
        for (var o in htmlElementObj) {
            var heObj = htmlElementObj[o];
            if (heObj == null)
                continue;
            var model = heObj["model"];
            var modelArr = model.split(',');
            var canApply = false;
            for (var i = modelArr.length - 1; i >= 0; i--) {
                if (modelArr[i] == curModelStr) {
                    canApply = true;
                    break;
                }
            }
            if (!canApply)
                continue;
            var type = heObj["type"];
            var path = heObj["path"];
            if (type == "HTMLLink") {
                linkArrSrc.push(path);
            }
            else if (type == "HTMLScript") {
                scriptArrSrc.push(path);
            }
        }
        obj.loadCompleteCount = linkArrSrc.length + scriptArrSrc.length;
        for (var i = 0, lengthI = linkArrSrc.length; i < lengthI; i++) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = linkArrSrc[i];
            link.type = "text/css";
            link.addEventListener('load', function () {
                this.onLoadJSComplete(obj);
                link.removeEventListener('load', arguments.callee, false);
            }.bind(this), false);
            document.body.appendChild(link);
        }
        for (var i = 0, lengthI = scriptArrSrc.length; i < lengthI; i++) {
            var script = document.createElement("script");
            script.src = scriptArrSrc[i];
            script.addEventListener('load', function () {
                this.onLoadJSComplete(obj);
                script.removeEventListener('load', arguments.callee, false);
            }.bind(this), false);
            document.body.appendChild(script);
        }
    };
    HTMLElementManager.prototype.onLoadJSComplete = function (obj) {
        var self = this;
        obj.loadCompleteCount--;
        if (obj.loadCompleteCount <= 0) {
            obj.completeFunc.call(obj.target);
        }
    };
    HTMLElementManager.m_manager = new HTMLElementManager();
    return HTMLElementManager;
}());
__reflect(HTMLElementManager.prototype, "HTMLElementManager");
var HTMLElementObj = (function () {
    function HTMLElementObj() {
    }
    return HTMLElementObj;
}());
__reflect(HTMLElementObj.prototype, "HTMLElementObj");
// TypeScript file
var LanguageManager = (function () {
    function LanguageManager() {
        this.curLType = -1;
        // private curLCount:number = 3;
        //皮肤文本语言包
        this.languagePackage_json = null;
    }
    LanguageManager.getInstance = function () {
        if (LanguageManager.m_manager == null) {
            LanguageManager.m_manager = new LanguageManager();
            LanguageManager.m_manager.init();
        }
        return LanguageManager.m_manager;
    };
    LanguageManager.prototype.init = function () {
        var ltype = -1;
        var ltypeStr = egret.localStorage.getItem("langtype");
        if (ltypeStr != null && ltypeStr != "") {
            ltype = Number(ltypeStr);
        }
        if (ltype == -1) {
            var curLanguage = egret.Capabilities.language; //简体中文 zh-CN 繁体中文 zh-TW 英语 en 日语 ja 韩语 ko
            if (curLanguage == "zh-CN" || curLanguage == "zh-TW")
                ltype = 0;
            else
                ltype = 1;
        }
        // else{
        //     //egret.log(egret.Capabilities.language); //简体中文 zh-CN 繁体中文 zh-TW 英语 en 日语 ja 韩语 ko
        //     var curLanguage:string = egret.Capabilities.language;
        //     if(curLanguage=="zh-CN"||curLanguage=="zh-TW")
        //         ltype = 0;
        //     else //if(curLanguage=="en")
        //         ltype = 1;
        //     egret.localStorage.setItem("langtype",ltype+"");
        // }
        this.curLType = ltype;
    };
    LanguageManager.prototype.getLanguagePath = function () {
        if (this.curLType == 0)
            return "";
        else
            return "_en";
    };
    // public changeLanguage(languageType:number,needUpdateSkin:boolean = true):void{
    //     var self =this;
    //     if(self.curLType!=-1&&self.curLType==languageType){
    //         return;
    //     }
    //     if(needUpdateSkin){
    //         UIManager.getInstance().showUI(LoadingRView,GameScene.POP_LAYER_NUMBER);
    //     }
    //     self.curLType = languageType;
    //     var oldLType:number = platform.PlatformLanguage;
    //     platform.PlatformLanguage = languageType;
    //     egret.localStorage.setItem("ltype",languageType+"");
    //     if(!needUpdateSkin)
    //         return;
    //     self.onThemeLoadComplete();
    //     // NeoManager.getInstance().setLang(platform.PlatformLanguage);
    // }
    // private onThemeLoadComplete(){
    //     UIManager.getInstance().ReopenAllView();
    //     UIManager.getInstance().hideUI(LoadingRView);
    // }
    // public getCurLanguageCount():number{
    //     return this.curLCount;
    // }
    LanguageManager.prototype.getLabelLanguage = function (view) {
        if (this.languagePackage_json == null) {
            var configs = RES.getRes("languagePackage_json");
            this.languagePackage_json = configs;
        }
        var json = this.languagePackage_json["language"]; //this.languagePackage_json["language" + this.curLType];
        if (json == null)
            return;
        if (typeof view == "string") {
            if (json[view.toString()] == null) {
                return null;
            }
            return json[view.toString()];
        }
        else {
            if (json[view.name] == null) {
                // console.log("找不到View:" + view.name + " 的文本语言包!");
                return null;
            }
            return json[view.name];
        }
    };
    LanguageManager.prototype.setLanguagePackage = function (gameName) {
        if (this.languagePackage_json == null) {
            var configs = RES.getRes("languagePackage_json");
            this.languagePackage_json = configs;
        }
        if (gameName == "")
            return;
        var configsGame = RES.getRes("languagePackage-" + gameName + "_json");
        if (configsGame == null)
            return;
        for (var obj in configsGame) {
            if (this.languagePackage_json.hasOwnProperty(obj)) {
                var json = configsGame[obj];
                for (var skinName in json) {
                    this.languagePackage_json[obj][skinName] = json[skinName];
                }
            }
            else {
                this.languagePackage_json[obj] = configsGame[obj];
            }
        }
    };
    LanguageManager.prototype.getCurLanguageType = function () {
        return this.curLType;
    };
    return LanguageManager;
}());
__reflect(LanguageManager.prototype, "LanguageManager");
// TypeScript file
var PopManager = (function () {
    function PopManager() {
    }
    PopManager.getInstance = function () {
        return PopManager.m_manager;
    };
    //content：显示内容 uiparam：1.两个按钮 2.一个按钮 的类型 callbackHandler：回调
    PopManager.prototype.showPromptBox = function (content, uiparam, callbackHandler, btnLbls, conColor) {
        if (uiparam === void 0) { uiparam = 1; }
        if (callbackHandler === void 0) { callbackHandler = null; }
        if (btnLbls === void 0) { btnLbls = null; }
        SoundManager.getInstance().PlaySound("tanchukuang_mp3");
        UIManager.getInstance().showUI(PromptBoxView, GameScene.POP_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, uiparam);
        var pbv = UIManager.getInstance().getViewByName(PromptBoxView);
        pbv.setContent(content, callbackHandler, btnLbls, conColor);
    };
    PopManager.m_manager = new PopManager();
    return PopManager;
}());
__reflect(PopManager.prototype, "PopManager");
;
var PublicMethodManager = (function () {
    function PublicMethodManager() {
    }
    PublicMethodManager.getInstance = function () {
        return PublicMethodManager.m_manager;
    };
    PublicMethodManager.prototype.getOSType = function () {
        var type = egret.Capabilities.os;
        var ret = -1;
        switch (type) {
            case "Unknow": ret = 0;
            case "Windows PC": ret = 1;
            case "iOS": ret = 2;
            case "Android": ret = 3;
            case "Windows Phone": ret = 4;
            case "Mac OS": ret = 5;
        }
        return ret;
    };
    PublicMethodManager.prototype.checkRegex = function (regex, param) {
        var reg = new RegExp(regex);
        return reg.test(param);
    };
    PublicMethodManager.prototype.loginOut = function () {
        egret.localStorage.setItem("ticket", "");
        GMDManager.closeGMD();
        UIManager.getInstance().removeAllLayerUI();
        UIManager.getInstance().showUI(LoginView);
    };
    //获取卡牌品质
    PublicMethodManager.prototype.getCardRarity = function (rarity) {
        var str = rarity;
        switch (rarity) {
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
        var labelObj = LanguageManager.getInstance().getLabelLanguage("Common");
        if (labelObj == null)
            return rarity;
        return labelObj[str];
    };
    //获取卡牌五行
    PublicMethodManager.prototype.getCardElement = function (element) {
        var str = element;
        switch (element) {
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
        var labelObj = LanguageManager.getInstance().getLabelLanguage("Common");
        if (labelObj == null)
            return element;
        return labelObj[str];
    };
    //返回概率字符串 (xxoo%s,10) => xxoo10
    PublicMethodManager.prototype.getProbabilityStr = function (data, pro) {
        var str = data;
        var strArr = str.split('%s');
        if (strArr.length < 2)
            return data;
        if (strArr.length <= pro.length + 1) {
            str = "";
            for (var i = 0, lengthI = strArr.length; i < lengthI; i++) {
                str += (i != lengthI - 1 ? (strArr[i] + pro[i]) : strArr[i]);
            }
        }
        else {
            for (var i = 0, lengthI = pro.length; i < lengthI; i++) {
                str += (strArr[i] + pro[i]);
            }
            for (var i = pro.length, lengthI = strArr.length; i < lengthI; i++) {
                str += strArr[i];
            }
        }
        return str;
    };
    PublicMethodManager.prototype.openWallet = function () {
        var isInit = GlobalDataManager.getInstance().getWalletInit();
        var lang = LanguageManager.getInstance().getCurLanguageType();
        if (isInit) {
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json", function () { XWG.SDK.open(lang == 0 ? "chs" : "en"); }, this);
        }
        else {
            HTMLElementManager.getInstance().startLoadJson("walletConfig_json", function () {
                XWG.SDK.init(lang == 0 ? "chs" : "en", function (data) {
                    var res = JSON.parse(data);
                    switch (res.cmd) {
                        case "init":
                            GlobalDataManager.getInstance().setWalletInit(true);
                            HTMLElementManager.getInstance().startLoadJson("walletConfig_json", function () { XWG.SDK.open(lang == 0 ? "chs" : "en"); }, this);
                            break;
                        case "bind":
                            var bindaddress = GlobalDataManager.getInstance().getBindAddress();
                            if (bindaddress == res.data) {
                                return;
                            }
                            var obj = new Object();
                            obj["address"] = res.data;
                            var centerServer = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_BIND_CHAIN_WALLET, obj, true);
                            break;
                        case "transfer":
                            var obj = new Object();
                            obj["hash"] = res.data.hash;
                            obj["chain"] = res.data.chain;
                            var centerServer = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_WALLET_TRANSFER, obj, true);
                            break;
                        case "transferResult":
                            var obj = new Object();
                            obj["hash"] = res.data;
                            var centerServer = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_WALLET_TRANSFER_RESULT, obj, true);
                            break;
                        case "offLine":
                            var obj = new Object();
                            obj["tokenid"] = res.data;
                            var centerServer = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_CARD_OFFLINE, obj, true);
                            break;
                        case "offLineResult":
                            var obj = new Object();
                            obj["tokenid"] = res.data;
                            var centerServer = GlobalDataManager.getInstance().getCenterServer();
                            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_CARD_OFFLINE_RESULT, obj, true);
                            break;
                        case "getAddress":
                            var address = "";
                            XWG.SDK.setAddress(address);
                            break;
                    }
                });
            }, this);
        }
    };
    PublicMethodManager.m_manager = new PublicMethodManager();
    // public static REGEX_TO_USER:string = "^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$";
    PublicMethodManager.REGEX_TO_USER = "^[a-zA-Z0-9_]{6,22}$";
    PublicMethodManager.REGEX_TO_PHONE = "^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[2-7])|(17[0-8])|(18[0-9])|(19[0-9]))\\d{8}$"; //"^[1][3,4,5,7,8][0-9]{9}$";
    PublicMethodManager.REGEX_TO_NICK = "^[0-9a-zA-Z\u4e00-\u9fa5]{1,16}$";
    PublicMethodManager.REGEX_TO_PSD = "^[a-zA-Z0-9_-]{6,18}$";
    return PublicMethodManager;
}());
__reflect(PublicMethodManager.prototype, "PublicMethodManager");
// TypeScript file
var CardFetterView = (function (_super) {
    __extends(CardFetterView, _super);
    function CardFetterView() {
        return _super.call(this, CardFetterView.NAME) || this;
    }
    CardFetterView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var icon = data.icon;
        self.setIcon(icon);
        self.setClr(data.color);
        var canTouch = data.canTouch;
        canTouch = (canTouch == null || canTouch == undefined) ? true : canTouch;
        self.btnFetter.touchEnabled = canTouch;
        var visible = data.visible;
        visible = (visible == null || visible == undefined) ? true : visible;
        self.btnFetter.visible = visible;
        var name = data.name;
        self.setBtnName(name);
    };
    CardFetterView.prototype.sleep = function () {
    };
    CardFetterView.prototype.setIcon = function (data) {
        var self = this;
        var source = "jibanshuoming_json.";
        var btnNor_Image = self.btnFetter.getChildAt(0);
        btnNor_Image.source = source + data;
        var arr2States = self.btnFetter.skin.states;
        var property2Down = arr2States[1].overrides[0];
        property2Down.value = source + data;
    };
    CardFetterView.prototype.setClr = function (data) {
        this.imgBG.source = "jibanshuoming_json.jb" + data + "_0";
    };
    //设置按钮名称;
    CardFetterView.prototype.setBtnName = function (name) {
        var str = (name == null || name == undefined) ? "" : name;
        this.btnFetter.name = str;
    };
    CardFetterView.NAME = "CardFetterSkin";
    return CardFetterView;
}(IBaseView));
__reflect(CardFetterView.prototype, "CardFetterView");
// TypeScript file
var CardRectangleView = (function (_super) {
    __extends(CardRectangleView, _super);
    function CardRectangleView() {
        return _super.call(this, CardRectangleView.NAME) || this;
    }
    CardRectangleView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var arr = Object.keys(data);
        if (arr.length <= 0) {
            self.setVisible(false);
            return;
        }
        //icon rarity element round generation level name atk hp
        var icon = data.icon;
        self.setIcon(icon);
        var rarity = data.rarity;
        self.setRarity(rarity);
        var element = data.element;
        self.setElement(element);
        var att = data.att;
        self.setRound(att);
        var generation = data.generation;
        self.setGeneration(generation);
        var level = data.level;
        self.setLevel(level);
        var name = data.name;
        self.setName(name);
        var atk = data.atk;
        self.setAtk(atk);
        var hp = data.hp;
        self.origHp = data.origHp != null ? data.origHp : hp;
        self.curHp = data.curHp != null ? data.curHp : hp;
        self.setHp(self.curHp);
        var groupName = data.groupName;
        self.setGroupName(groupName);
        var canTouch = data.canTouch;
        canTouch = (canTouch == null || canTouch == undefined) ? true : canTouch;
        self.groupCR.touchEnabled = canTouch;
        var visible = data.visible;
        visible = (visible == null || visible == undefined) ? true : visible;
        self.setVisible(visible);
        var grey = data.grey;
        if (grey != null && grey == 1)
            self.setViewColor(self, true);
        self.setChoose(false);
    };
    CardRectangleView.prototype.sleep = function () {
    };
    //设置显示背面还是正面
    CardRectangleView.prototype.setVisible = function (visible) {
        var self = this;
        self.groupCR.visible = visible;
        self.groupCRB.visible = !visible;
    };
    CardRectangleView.prototype.showSimple = function () {
        // this.imgRarity.$setVisible(false);      //稀有度图片
        // this.imgRound.$setVisible(false);        //回合图片
        this.imgElement.$setVisible(false); //五行图片
        this.lblRound.$setVisible(false); //回合文本
        // this.lblName.$setVisible(false);      //名称文本
        //  this.lblCost.$setVisible(false);          //Cost文本
        this.imgGeneration.$setVisible(false); //代数图片
        this.groupLevel.$setVisible(false); //等级层
        this.lblAtk.$setVisible(false);
        this.lblHp.$setVisible(false);
        this.imgChoose.$setVisible(false);
    };
    //设置图标
    CardRectangleView.prototype.setIcon = function (data) {
        var str = data == null || data == undefined ? "" : data.toString();
        this.imgIcon.source = str + "_json.r";
    };
    //设置稀有度
    CardRectangleView.prototype.setRarity = function (data) {
        if (data == null || data == undefined)
            return;
        var str = "1";
        switch (data) {
            case "common":
                str = "1";
                break;
            case "rare":
                str = "2";
                break;
            case "epic":
                str = "3";
                break;
            case "legendary":
                str = "4";
                break;
            case "mythical":
                str = "5";
                break;
        }
        this.imgRarity.source = "cardCommonImg1Sheet_json.r_rb" + str;
    };
    //设置五行
    CardRectangleView.prototype.setElement = function (data) {
        if (data == null || data == undefined)
            return;
        var str = "1";
        switch (data) {
            case "metal":
                str = "1";
                break;
            case "wood":
                str = "2";
                break;
            case "water":
                str = "3";
                break;
            case "fire":
                str = "4";
                break;
            case "earth":
                str = "5";
                break;
        }
        var self = this;
        self.imgElement.source = "cardCommonImg2Sheet_json.r_e" + str;
        self.imgBG.source = "cardCommonImg2Sheet_json.r_eb" + str;
    };
    //设置代数
    CardRectangleView.prototype.setGeneration = function (data) {
        var str = data == null || data == undefined ? "1" : data.toString();
        this.imgGeneration.source = "cardCommonText0Sheet_json.r_g" + str;
    };
    //设置回合
    CardRectangleView.prototype.setRound = function (data) {
        var num = data == null || data == undefined ? 0 : data;
        var self = this;
        if (self.curRound == null || self.curRound == undefined)
            self.curRound = num;
        self.lblRound.text = num.toString();
    };
    //设置星级
    CardRectangleView.prototype.setLevel = function (data) {
        var num = data == null || data == undefined ? 0 : data;
        num = (num - 1) % 5 + 1;
        var self = this;
        var showCount = 0;
        for (var i = 1; i <= 6; i++) {
            var show = num >= i;
            self["imgLv" + i].visible = show;
            if (show)
                showCount++;
        }
        var generationWidth = self.imgGeneration.width;
        var starWidth = self["imgLv1"].width;
        var totalWidth = generationWidth + showCount * starWidth;
        var generationX = Number((self.groupLevel.width / 2 - totalWidth / 2).toFixed(2));
        self.imgGeneration.x = generationX;
        for (var i = 1; i <= 6; i++) {
            self["imgLv" + i].x = generationX + generationWidth + starWidth * (i - 1);
        }
    };
    //设置名称
    CardRectangleView.prototype.setName = function (name) {
        var str = name == null || name == undefined ? "" : name.toString();
        this.lblName.text = str;
    };
    //设置攻击力
    CardRectangleView.prototype.setAtk = function (data) {
        var str = data == null || data == undefined ? "0" : data.toString();
        this.lblAtk.text = str;
    };
    CardRectangleView.prototype.getAtk = function () {
        return Number(this.lblAtk.text);
        ;
    };
    //设置血量
    CardRectangleView.prototype.setHp = function (data) {
        var self = this;
        self.curHp = data;
        var str = data == null || data == undefined ? "0" : data.toString();
        self.lblHp.text = str;
    };
    //返回血量
    CardRectangleView.prototype.getHp = function () {
        return this.curHp;
    };
    //设置层名称
    CardRectangleView.prototype.setGroupName = function (data) {
        var str = data == null || data == undefined ? "" : data.toString();
        this.groupCR.name = str;
    };
    //设置视图为灰色
    CardRectangleView.prototype.setViewColor = function (view, grey) {
        var self = this;
        //灰色颜色矩阵数组
        var colorMatrix = null;
        if (grey) {
            colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
        }
        for (var i = 0, lengthI = view.numChildren; i < lengthI; i++) {
            var item = view.getChildAt(i);
            if (item == null)
                continue;
            if (item instanceof eui.Image) {
                self.setImgColor(item, colorMatrix);
            }
            else {
                self.setViewColor(item, grey);
            }
        }
    };
    //设置图片为灰色
    CardRectangleView.prototype.setImgColor = function (image, colorMatrix) {
        if (image == null)
            return;
        if (colorMatrix != null) {
            var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            image.filters = [colorFilter];
        }
        else {
            image.filters = [];
        }
    };
    //外部接口改变视图颜色
    CardRectangleView.prototype.changeViewColor = function (grey) {
        var self = this;
        self.setViewColor(self, grey);
    };
    //外部调用减少回合接口
    CardRectangleView.prototype.reduceRound = function () {
        var self = this;
        self.curRound--;
        self.setRound(self.curRound);
    };
    //外部调用设置伤害
    CardRectangleView.prototype.setDamage = function (damage) {
        var self = this;
        var curHp = self.curHp + damage;
        curHp = curHp >= self.origHp ? self.origHp : curHp;
        curHp = curHp <= 0 ? 0 : curHp;
        self.setHp(curHp);
    };
    //外部调用修改生命上限
    CardRectangleView.prototype.modifyLimitHp = function (hp) {
        var self = this;
        self.origHp += hp;
    };
    //外部调用修改生命上限
    CardRectangleView.prototype.modifyAtk = function (atk) {
        var self = this;
        var curAtk = Number(self.lblAtk.text);
        curAtk += atk;
        self.setAtk(curAtk);
    };
    //外部调用设置选中状态
    CardRectangleView.prototype.setChoose = function (choose) {
        if (choose === void 0) { choose = false; }
        this.imgChoose.visible = choose;
    };
    //返回视图宽度
    CardRectangleView.prototype.getViewWidth = function () {
        return this.groupCR.width;
    };
    //返回视图高度
    CardRectangleView.prototype.getViewHeight = function () {
        return this.groupCR.height;
    };
    CardRectangleView.NAME = "CardRectangleSkin";
    return CardRectangleView;
}(IBaseView));
__reflect(CardRectangleView.prototype, "CardRectangleView");
// TypeScript file
var CardSkillView = (function (_super) {
    __extends(CardSkillView, _super);
    function CardSkillView() {
        return _super.call(this, CardSkillView.NAME) || this;
    }
    CardSkillView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        //icon rarity canTouch
        var icon = data.icon;
        self.setIcon(icon);
        var rarity = data.rarity;
        self.setRarity(rarity);
        var groupName = data.groupName;
        self.setGroupName(groupName);
        var canTouch = data.canTouch;
        canTouch = (canTouch == null || canTouch == undefined) ? true : canTouch;
        self.groupCSK.touchEnabled = canTouch;
    };
    CardSkillView.prototype.sleep = function () {
    };
    //设置图标
    CardSkillView.prototype.setIcon = function (data) {
        // let str:string  = data==null||data==undefined?"":data.toString();
        // this.imgIcon.source = str+"_json.r";
        /*  var str = "1";
        switch (data) {
            case "common":
                str = "1";
                break;
            case "rare":
                str = "2";
                break;
            case "epic":
                str = "3";
                break;
            case "legendary":
                str = "4";
                break;
            case "mythical":
                str = "5";
                break;
        }*/
        if (data == null || data == undefined || data == "")
            return;
        this.imgIcon.source = "skill_json." + data;
        this.imgIcon.scaleX = this.imgIcon.scaleY = 0.8;
    };
    //设置稀有度
    CardSkillView.prototype.setRarity = function (data) {
        if (data == null || data == undefined)
            return;
        /*  var str = "1";
          switch (data) {
              case "common":
                  str = "1";
                  break;
              case "rare":
                  str = "2";
                  break;
              case "epic":
                  str = "3";
                  break;
              case "legendary":
                  str = "4";
                  break;
              case "mythical":
                  str = "5";
                  break;
          }*/
        // this.imgBG.source = "cardOperationSheet_json.a62x62_" + str;
        if (parseInt(data) > 0 && parseInt(data) < 5) {
            this.imgBG.source = "cardCommonImg4Sheet_json.sk_b" + data;
        }
    };
    //设置层名称
    CardSkillView.prototype.setGroupName = function (data) {
        var str = data == null || data == undefined ? "" : data.toString();
        this.groupCSK.name = data;
    };
    CardSkillView.NAME = "CardSkillSkin";
    return CardSkillView;
}(IBaseView));
__reflect(CardSkillView.prototype, "CardSkillView");
// TypeScript file
var CardSquareView = (function (_super) {
    __extends(CardSquareView, _super);
    function CardSquareView() {
        return _super.call(this, CardSquareView.NAME) || this;
    }
    CardSquareView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        var arr = Object.keys(data);
        if (arr.length <= 0) {
            self.setVisible(false);
            return;
        }
        //icon rarity element round generation name cost atk hp
        var icon = data.icon;
        self.setIcon(icon);
        var rarity = data.rarity;
        self.setRarity(rarity);
        var element = data.element;
        self.setElement(element);
        var att = data.att;
        self.setRound(att);
        var generation = data.generation;
        self.setGeneration(generation);
        var level = data.level;
        self.setLevel(level);
        var name = data.name;
        self.setName(name);
        var cost = data.cost;
        self.setCost(cost);
        var atk = data.atk;
        self.setAtk(atk);
        var hp = data.hp;
        self.origHp = data.origHp != null ? data.origHp : hp;
        self.curHp = data.curHp != null ? data.curHp : hp;
        self.setHp(self.curHp);
        var groupName = data.groupName;
        self.setGroupName(groupName);
        var canTouch = data.canTouch;
        canTouch = (canTouch == null || canTouch == undefined) ? true : canTouch;
        self.groupCS.touchEnabled = canTouch;
        var visible = data.visible;
        visible = (visible == null || visible == undefined) ? true : visible;
        self.setVisible(visible);
        var grey = data.grey;
        if (grey != null && grey == 1)
            self.setViewColor(self, true);
        self.setChoose(false);
    };
    CardSquareView.prototype.sleep = function () {
    };
    //设置显示背面还是正面
    CardSquareView.prototype.setVisible = function (visible) {
        var self = this;
        self.groupCS.visible = visible;
        self.groupCSB.visible = !visible;
    };
    CardSquareView.prototype.showSimple = function () {
        this.flag.$setVisible(false);
        this.imgRound.$setVisible(false); //回合图片
        this.imgElement.$setVisible(false); //五行图片
        this.lblRound.$setVisible(false); //回合文本
        // this.lblName.$setVisible(false);      //名称文本
        this.lblCost.$setVisible(false); //Cost文本
        this.imgGeneration.$setVisible(false); //代数图片
        this.groupLevel.$setVisible(false); //等级层
        this.lblAtk.$setVisible(false);
        this.lblHp.$setVisible(false);
    };
    //设置图标
    CardSquareView.prototype.setIcon = function (data) {
        var str = data == null || data == undefined ? "" : data.toString();
        this.imgIcon.source = str + "_json.s";
    };
    //设置稀有度
    CardSquareView.prototype.setRarity = function (data) {
        if (data == null || data == undefined)
            return;
        var str = "1";
        switch (data) {
            case "common":
                str = "1";
                break;
            case "rare":
                str = "2";
                break;
            case "epic":
                str = "3";
                break;
            case "legendary":
                str = "4";
                break;
            case "mythical":
                str = "5";
                break;
        }
        var self = this;
        self.imgRarity.source = "cardCommonImg0Sheet_json.s_rb" + str;
        self.imgRound.source = "cardCommonImg0Sheet_json.s_r" + str;
    };
    //设置五行
    CardSquareView.prototype.setElement = function (data) {
        if (data == null || data == undefined)
            return;
        var str = "1";
        switch (data) {
            case "metal":
                str = "1";
                break;
            case "wood":
                str = "2";
                break;
            case "water":
                str = "3";
                break;
            case "fire":
                str = "4";
                break;
            case "earth":
                str = "5";
                break;
        }
        var self = this;
        self.imgElement.source = "cardCommonImg2Sheet_json.s_e" + str;
        self.imgBG.source = "cardCommonImg2Sheet_json.s_eb" + str;
    };
    //设置代数
    CardSquareView.prototype.setGeneration = function (data) {
        var str = data == null || data == undefined ? "0" : data.toString();
        this.imgGeneration.source = "cardCommonText0Sheet_json.s_g" + str;
    };
    //设置回合
    CardSquareView.prototype.setRound = function (data) {
        var num = data == null || data == undefined ? 0 : data;
        var self = this;
        if (self.curRound == null || self.curRound == undefined)
            self.curRound = num;
        self.lblRound.text = num.toString();
    };
    //设置星级
    CardSquareView.prototype.setLevel = function (data) {
        var num = data == null || data == undefined ? 0 : data;
        num = (num - 1) % 5 + 1;
        var self = this;
        var showCount = 0;
        for (var i = 1; i <= 6; i++) {
            var show = num >= i;
            self["imgLv" + i].visible = show;
            if (show)
                showCount++;
        }
        var generationWidth = self.imgGeneration.width;
        var starWidth = self["imgLv1"].width;
        var totalWidth = generationWidth + showCount * starWidth;
        var generationX = Number((self.groupLevel.width / 2 - totalWidth / 2).toFixed(2));
        self.imgGeneration.x = generationX;
        for (var i = 1; i <= 6; i++) {
            self["imgLv" + i].x = generationX + generationWidth + starWidth * (i - 1);
        }
    };
    //设置名称
    CardSquareView.prototype.setName = function (name) {
        var str = name == null || name == undefined ? "" : name.toString();
        this.lblName.text = str;
    };
    //设置Cost
    CardSquareView.prototype.setCost = function (data) {
        var str = data == null || data == undefined ? "0" : data.toString();
        this.lblCost.text = str;
    };
    //设置攻击力
    CardSquareView.prototype.setAtk = function (data) {
        var str = data == null || data == undefined ? "0" : data.toString();
        this.lblAtk.text = str;
    };
    //设置血量
    CardSquareView.prototype.setHp = function (data) {
        var self = this;
        self.curHp = data;
        var str = data == null || data == undefined ? "0" : data.toString();
        self.lblHp.text = str;
    };
    //设置层名称
    CardSquareView.prototype.setGroupName = function (data) {
        var str = data == null || data == undefined ? "" : data.toString();
        this.groupCS.name = str;
    };
    //设置视图为灰色
    CardSquareView.prototype.setViewColor = function (view, grey) {
        var self = this;
        //灰色颜色矩阵数组
        var colorMatrix = null;
        if (grey) {
            colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
        }
        for (var i = 0, lengthI = view.numChildren; i < lengthI; i++) {
            var item = view.getChildAt(i);
            if (item == null)
                continue;
            if (item instanceof eui.Image) {
                self.setImgColor(item, colorMatrix);
            }
            else {
                self.setViewColor(item, grey);
            }
        }
    };
    //设置图片为灰色
    CardSquareView.prototype.setImgColor = function (image, colorMatrix) {
        if (image == null)
            return;
        if (colorMatrix != null) {
            var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            image.filters = [colorFilter];
        }
        else {
            image.filters = [];
        }
    };
    //外部接口改变视图颜色
    CardSquareView.prototype.changeViewColor = function (grey) {
        var self = this;
        self.setViewColor(self, grey);
    };
    //外部调用减少回合接口*返回当前回合
    CardSquareView.prototype.reduceRound = function () {
        var self = this;
        if (self.curRound > 0) {
            self.curRound--;
            self.setRound(self.curRound);
        }
        return self.curRound;
    };
    //返回当前回合
    CardSquareView.prototype.getCurRound = function () {
        return this.curRound;
    };
    //外部调用设置选中状态
    CardSquareView.prototype.setChoose = function (choose) {
        if (choose === void 0) { choose = false; }
        this.imgChoose.visible = choose;
    };
    //返回视图宽度
    CardSquareView.prototype.getViewWidth = function () {
        return this.groupCS.width;
    };
    //返回视图高度
    CardSquareView.prototype.getViewHeight = function () {
        return this.groupCS.height;
    };
    CardSquareView.NAME = "CardSquareSkin";
    return CardSquareView;
}(IBaseView));
__reflect(CardSquareView.prototype, "CardSquareView");
// TypeScript file
var LoadingHView = (function (_super) {
    __extends(LoadingHView, _super);
    function LoadingHView() {
        var _this = _super.call(this, LoadingHView.NAME) || this;
        _this.progres = 0;
        _this.loadProgres = 0;
        _this.defaultSpeed = 100 / 150;
        _this.fastSpeed = 100 / 50;
        _this.slowSpeed = 100 / 500;
        return _this;
    }
    LoadingHView.prototype.week = function () {
        var self = this;
        var load_timer = new egret.Timer(20, 0);
        load_timer.addEventListener(egret.TimerEvent.TIMER, self.onTimeProgress, self);
        load_timer.start();
        self.load_timer = load_timer;
        self.progres = 0;
        self.loadProgres = 0;
        self.prbLoading.value = 0;
        self.weekComplete();
    };
    LoadingHView.prototype.weekComplete = function () {
        var self = this;
        var stage = self.stage;
        if (stage && stage.orientation != egret.OrientationMode.LANDSCAPE) {
            stage.orientation = egret.OrientationMode.LANDSCAPE;
            stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
            var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
            stage.setContentSize(width, height);
        }
    };
    LoadingHView.prototype.sleep = function () {
        var self = this;
        var load_timer = self.load_timer;
        if (!load_timer)
            return;
        load_timer.stop();
        load_timer.removeEventListener(egret.TimerEvent.TIMER, self.onTimeProgress, self);
        self.load_timer = null;
        self._finTar = null;
        self._finBack = null;
        self.prbLoading.value = 0;
    };
    LoadingHView.prototype.onTimeProgress = function (e) {
        var self = this;
        if (self.progres >= 100) {
            self.load_timer.stop();
            if (self._finBack)
                self._finBack.call(self._finTar);
            return;
        }
        var speed = self.defaultSpeed;
        if (self.loadProgres >= 100 || self.progres + 10 < self.loadProgres) {
            speed = self.fastSpeed;
        }
        else if (self.progres > self.loadProgres + 10) {
            speed = self.slowSpeed;
        }
        var tmpVal = self.progres + speed;
        if (tmpVal > 99) {
            if (self.loadProgres < 100)
                tmpVal = 99;
            else if (tmpVal > 100)
                tmpVal = 100;
        }
        self.progres = tmpVal;
        self.prbLoading.value = tmpVal;
        self.lblProgress.text = tmpVal.toFixed(0) + "%";
    };
    LoadingHView.prototype.setStepInfo = function (stepList, finBack, target) {
        var self = this;
        self._stepList = stepList;
        self._finBack = finBack;
        self._finTar = target;
        if (true) {
            var totalPer = 0;
            for (var step in stepList) {
                totalPer += stepList[step];
            }
            if (totalPer < 100) {
                egret.error("totalPer is little than 100");
            }
        }
    };
    LoadingHView.prototype.finStep = function (step) {
        this.loadProgres += this._stepList[step];
    };
    LoadingHView.prototype.finAllStep = function () {
        this.loadProgres = 100;
    };
    LoadingHView.NAME = "LoadingHSkin";
    return LoadingHView;
}(BaseView));
__reflect(LoadingHView.prototype, "LoadingHView", ["IGMDLoadProgress"]);
// TypeScript file
var LoadingRView = (function (_super) {
    __extends(LoadingRView, _super);
    function LoadingRView() {
        return _super.call(this, LoadingRView.NAME) || this;
    }
    LoadingRView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.Event.ENTER_FRAME)) {
            self.addEventListener(egret.Event.ENTER_FRAME, self.onEnterFrame, self);
        }
        self.imgZQ.anchorOffsetX = self.imgZQ.width / 2;
        self.imgZQ.anchorOffsetY = self.imgZQ.height / 2;
        self.imgZQ.x = GameConfig.curWidth() / 2;
        self.imgZQ.y = GameConfig.curHeight() / 2;
    };
    LoadingRView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.Event.ENTER_FRAME)) {
            self.removeEventListener(egret.Event.ENTER_FRAME, self.onEnterFrame, self);
        }
    };
    LoadingRView.prototype.onEnterFrame = function (e) {
        var self = this;
        if (self.imgZQ) {
            self.imgZQ.rotation += 10;
        }
    };
    LoadingRView.NAME = "LoadingRSkin";
    return LoadingRView;
}(BaseView));
__reflect(LoadingRView.prototype, "LoadingRView");
// TypeScript file
var LoadingSView = (function (_super) {
    __extends(LoadingSView, _super);
    function LoadingSView() {
        var _this = _super.call(this, LoadingHView.NAME) || this;
        _this.progres = 0;
        _this.loadProgres = 0;
        _this.defaultSpeed = 100 / 150;
        _this.fastSpeed = 100 / 50;
        _this.slowSpeed = 100 / 500;
        return _this;
    }
    LoadingSView.prototype.week = function () {
        var self = this;
        var load_timer = new egret.Timer(20, 0);
        load_timer.addEventListener(egret.TimerEvent.TIMER, self.onTimeProgress, self);
        load_timer.start();
        self.load_timer = load_timer;
        self.progres = 0;
        self.loadProgres = 0;
        self.prbLoading.value = 0;
        self.weekComplete();
    };
    LoadingSView.prototype.weekComplete = function () {
        var self = this;
        var stage = self.stage;
        if (stage && stage.orientation != egret.OrientationMode.AUTO) {
            stage.orientation = egret.OrientationMode.AUTO;
            stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
            var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
            stage.setContentSize(width, height);
        }
    };
    LoadingSView.prototype.sleep = function () {
        var self = this;
        var load_timer = self.load_timer;
        if (!load_timer)
            return;
        load_timer.stop();
        load_timer.removeEventListener(egret.TimerEvent.TIMER, self.onTimeProgress, self);
        self.load_timer = null;
        self._finTar = null;
        self._finBack = null;
        self.prbLoading.value = 0;
    };
    LoadingSView.prototype.onTimeProgress = function (e) {
        var self = this;
        if (self.progres >= 100) {
            self.load_timer.stop();
            if (self._finBack)
                self._finBack.call(self._finTar);
            return;
        }
        var speed = self.defaultSpeed;
        if (self.loadProgres >= 100 || self.progres + 10 < self.loadProgres) {
            speed = self.fastSpeed;
        }
        else if (self.progres > self.loadProgres + 10) {
            speed = self.slowSpeed;
        }
        var tmpVal = self.progres + speed;
        if (tmpVal > 99) {
            if (self.loadProgres < 100)
                tmpVal = 99;
            else if (tmpVal > 100)
                tmpVal = 100;
        }
        self.progres = tmpVal;
        self.prbLoading.value = tmpVal;
        self.lblProgress.text = tmpVal.toFixed(0) + "%";
    };
    LoadingSView.prototype.setStepInfo = function (stepList, finBack, target) {
        var self = this;
        self._stepList = stepList;
        self._finBack = finBack;
        self._finTar = target;
        if (true) {
            var totalPer = 0;
            for (var step in stepList) {
                totalPer += stepList[step];
            }
            if (totalPer < 100) {
                egret.error("totalPer is little than 100");
            }
        }
    };
    LoadingSView.prototype.finStep = function (step) {
        this.loadProgres += this._stepList[step];
    };
    LoadingSView.prototype.finAllStep = function () {
        this.loadProgres = 100;
    };
    LoadingSView.NAME = "LoadingSSkin";
    return LoadingSView;
}(BaseView));
__reflect(LoadingSView.prototype, "LoadingSView", ["IGMDLoadProgress"]);
// TypeScript file
var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        return _super.call(this, TextView.NAME) || this;
    }
    TextView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.Event.ENTER_FRAME)) {
            self.addEventListener(egret.Event.ENTER_FRAME, self.onEnterFrame, self);
        }
        self.text.anchorOffsetX = self.text.width / 2;
        self.text.anchorOffsetY = self.text.height / 2;
        self.text.x = GameConfig.curWidth() / 2;
        self.text.y = GameConfig.curHeight() / 2;
    };
    TextView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.Event.ENTER_FRAME)) {
            self.removeEventListener(egret.Event.ENTER_FRAME, self.onEnterFrame, self);
        }
    };
    TextView.prototype.onEnterFrame = function (e) {
        var self = this;
        if (self.text) {
            self.text.rotation += 20;
        }
    };
    TextView.NAME = "TextSkin";
    return TextView;
}(BaseView));
__reflect(TextView.prototype, "TextView");
// TypeScript file
var DebugItemView = (function (_super) {
    __extends(DebugItemView, _super);
    function DebugItemView() {
        var _this = _super.call(this, DebugItemView.NAME) || this;
        _this.rid = -1;
        _this.state = -1;
        return _this;
    }
    DebugItemView.prototype.week = function () {
        var self = this;
        var data = _super.prototype.getData.call(this);
        if (data == null)
            return;
        self.groupDebugItem.name = data.groupName;
    };
    DebugItemView.prototype.updateShow = function (data) {
        var self = this;
        var rid = data.rid;
        self.rid = rid;
        var ridStr = rid == null ? "" : rid + "";
        ridStr = "房间号:" + ridStr;
        self.lblRoom.text = ridStr;
        var state = data.state;
        state = state == null ? -1 : state;
        var stateStr = "";
        var color = 0xFFFFFF;
        if (state == -1)
            stateStr = "未开启";
        else if (state == 0)
            stateStr = "正常";
        else if (state == 1)
            stateStr = "完成";
        else if (state == 2) {
            stateStr = "异常";
            color = 0xFF0000;
        }
        stateStr = "状态:" + stateStr;
        self.lblState.text = stateStr;
        self.lblState.textColor = color;
        self.state = state;
    };
    DebugItemView.prototype.getRid = function () {
        return this.rid;
    };
    DebugItemView.prototype.getState = function () {
        return this.state;
    };
    DebugItemView.prototype.getGroupName = function () {
        return this.groupDebugItem.name;
    };
    DebugItemView.NAME = "DebugItemSkin";
    return DebugItemView;
}(IBaseView));
__reflect(DebugItemView.prototype, "DebugItemView");
// TypeScript file
var DebugView = (function (_super) {
    __extends(DebugView, _super);
    function DebugView() {
        var _this = _super.call(this, DebugView.NAME) || this;
        _this.countDown = 5;
        return _this;
    }
    DebugView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        self.group1.visible = false;
        self.group2.visible = false;
        var configs = RES.getRes("combatDebug_json");
        self.configs = configs;
        var data = _super.prototype.getData.call(this);
        var type = data.type;
        if (type == 1) {
            self.group1.visible = true;
            self.setBtnState(0);
            var user0 = self.configs["user0"];
            var user1 = self.configs["user1"];
            var cards0 = self.configs["cards0"];
            var cards1 = self.configs["cards1"];
            self.lblAccount0.text = "用户1： 账户:" + user0.account + "  昵称：" + user0.nick + "  上场卡牌数量：" + cards0.length + "  血量：" + user0.hp;
            self.lblAccount1.text = "用户2： 账户:" + user1.account + "  昵称：" + user1.nick + "  上场卡牌数量：" + cards1.length + "  血量：" + user1.hp;
            self.reqUserCombatState();
        }
        else if (type == 2) {
            self.group2.visible = true;
            // self.btnRCreate.visible = true;
            self.groupRCreate.visible = true;
            self.groupRData.visible = false;
            self.groupRDetail.visible = false;
            var roomSection = self.configs["roomSection"];
            var curCSIndex = roomSection["curCSIndex"];
            var curCSIndexObj = egret.localStorage.getItem("curCSIndex");
            if (curCSIndexObj != null && Number(curCSIndexObj) > curCSIndex)
                curCSIndex = Number(curCSIndexObj);
            self.updateCSShow(curCSIndex);
            self.editCCurCSIndex.text = curCSIndex + "";
            self.arrDebugItemView = new Array();
            self.arrDebugRoomData = new Array();
            self.arrWaitRemoveRid = new Array();
            // self.arrCreateDebugRoomData = new Array<DebugRoomData>();
            self.curDebugRoomData = null;
            self.connectServer();
        }
    };
    DebugView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
    };
    DebugView.prototype.TouchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            if (tar == self.btnCreate) {
                var user0 = self.configs["user0"];
                var user1 = self.configs["user1"];
                var cards0 = self.configs["cards0"];
                var cards1 = self.configs["cards1"];
                var skills = self.configs["skills"];
                var cardSection = self.configs["cardSection"];
                var cards2 = [];
                if (cards0.length > 0) {
                    for (var j = 0, lengthJ = cards0.length; j < lengthJ; j++) {
                        var cardItem = cards0[j];
                        if (typeof cardItem == "number") {
                            for (var i = 0, lengthI = cardSection.length; i < lengthI; i++) {
                                var itemCS = cardSection[i];
                                if (itemCS == null)
                                    continue;
                                var code = itemCS.code;
                                if (code == null)
                                    continue;
                                if (Number(code) == Number(cardItem)) {
                                    cards2.push(itemCS);
                                    break;
                                }
                            }
                        }
                        else {
                            cards2.push(cardItem);
                        }
                    }
                }
                var cards3 = [];
                if (cards1.length > 0) {
                    for (var j = 0, lengthJ = cards1.length; j < lengthJ; j++) {
                        var cardItem = cards1[j];
                        if (typeof cardItem == "number") {
                            for (var i = 0, lengthI = cardSection.length; i < lengthI; i++) {
                                var itemCS = cardSection[i];
                                if (itemCS == null)
                                    continue;
                                var code = itemCS.code;
                                if (code == null)
                                    continue;
                                if (Number(code) == Number(cardItem)) {
                                    cards3.push(itemCS);
                                    break;
                                }
                            }
                        }
                        else {
                            cards3.push(cardItem);
                        }
                    }
                }
                var obj = new Object();
                obj["user0"] = user0;
                obj["user1"] = user1;
                // if(cards2.length<=0)
                //     obj["cards0"] = cards0;
                // else
                obj["cards0"] = cards2;
                // if(cards3.length<=0)
                //     obj["cards1"] = cards1;
                // else
                obj["cards1"] = cards3;
                obj["skills"] = skills;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM, obj, true);
            }
            else if (tar == self.btnOpen) {
                var href = "";
                if (window.location) {
                    var search = location.search;
                    if (search != "") {
                        href = location.href;
                        href = href.substring(0, href.length - search.length);
                    }
                }
                if (href != "") {
                    var user0 = self.configs["user0"];
                    var user1 = self.configs["user1"];
                    var accountStr0 = "account=" + user0.account;
                    var accountStr1 = "account=" + user1.account;
                    // var match:string = "&match=1";
                    // window.open(href+"?"+accountStr0+match,"_blank");
                    // window.open(href+"?"+accountStr1+match,"_blank");
                    window.open(href + "?" + accountStr0, "_blank");
                    window.open(href + "?" + accountStr1, "_blank");
                }
            }
            else if (tar == self.btnClose) {
                var user = self.configs["user0"];
                var obj = new Object();
                obj["user"] = user;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_CLOSE_ROOM, obj, true);
            }
            else if (tar == self.btnRCreate) {
                self.onClickCreateRoomBtn();
            }
            else if (tar == self.btnRBack) {
                self.groupRData.visible = true;
                self.groupRDetail.visible = false;
                self.startTimer();
            }
            else if (tar == self.btnROpen) {
                if (self.curDebugRoomData == null)
                    return;
                var href = "";
                if (window.location) {
                    var search = location.search;
                    if (search != "") {
                        href = location.href;
                        href = href.substring(0, href.length - search.length);
                    }
                }
                if (href != "") {
                    var user0 = self.curDebugRoomData.user0;
                    var user1 = self.curDebugRoomData.user1;
                    var accountStr0 = "account=" + user0.account;
                    var accountStr1 = "account=" + user1.account;
                    var match = "&match=1";
                    window.open(href + "?" + accountStr0 + match, "_blank");
                    window.open(href + "?" + accountStr1 + match, "_blank");
                }
            }
            else if (tar == self.btnRClose) {
                if (self.curDebugRoomData == null)
                    return;
                var user = self.curDebugRoomData.user0;
                var obj = new Object();
                obj["user"] = user;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_CLOSE_ROOM, obj, true);
            }
            else if (tar == self.btnRRecovery) {
                self.onClickRecoveryBtn();
            }
            else if (tar == self.btnChangeCurCSIndex) {
                var newCSIndex = Number(self.editCCurCSIndex.text);
                self.curCSIndex = newCSIndex;
                self.editCurCSIndex.text = newCSIndex + "";
                egret.localStorage.setItem("curCSIndex", newCSIndex + "");
            }
            else if (tar == self.btnRGetBattleInfo) {
                if (self.curDebugRoomData == null)
                    return;
                self.reqGetBattleInfo(self.curDebugRoomData.rid);
            }
        }
        else if (event.target instanceof eui.Group) {
            var group = event.target;
            if (group.name == null)
                return;
            if (group.name.substr(0, 8) == "groupDI_") {
                var strArr = group.name.split("_");
                if (strArr.length != 2) {
                    return;
                }
                var cIndex = Number(strArr[1]);
                self.onClickDebugItem(cIndex);
            }
        }
    };
    DebugView.prototype.reqUserCombatState = function () {
        var self = this;
        var user = self.configs["user0"];
        var obj = new Object();
        obj["user"] = user;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE, obj, true);
    };
    DebugView.prototype.recvData = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case CmdDef.CMD_DEBUG_SINGLE_CREATE_ROOM:
                self.setBtnState(data);
                break;
            case CmdDef.CMD_DEBUG_CLOSE_ROOM:
                self.setBtnState(data);
                break;
            case CmdDef.CMD_DEBUG_REQ_USER_COMBAT_STATE:
                self.setBtnState(data);
                break;
            case CmdDef.CMD_DEBUG_MANY_CREATE_ROOM:
                self.onCreateMRoom(data);
                break;
            case CmdDef.CMD_DEBUG_GAME_CONNECT:
                self.onConnectGame(data);
                break;
            case CmdDef.CMD_DEBUG_GET_ROOM_DATA:
                self.setRoomData(data);
                break;
            case CmdDef.CMD_DEBUG_GET_ROOM_DETAIL:
                self.setRoomDetail(data);
                break;
            case CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA:
                self.setRoomReserveData(data);
                break;
            case CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD:
                self.onRemoveRoomRecord(data);
                break;
            case CmdDef.CMD_DEBUG_GET_BATTLE_INFO:
                self.onGetBattleInfo(data);
                break;
        }
    };
    DebugView.prototype.setBtnState = function (state) {
        var self = this;
        self.btnCreate.visible = state == 0;
        self.btnOpen.visible = state == 1;
        self.btnClose.visible = state == 1;
    };
    DebugView.prototype.onClickCreateRoomBtn = function () {
        var self = this;
        var userSection = self.configs["userSection"];
        var accountPrefix = userSection["accountPrefix"];
        var start = userSection["start"];
        var count = userSection["count"];
        var ticketPrefix = userSection["ticketPrefix"];
        var uidPrefix = userSection["uidPrefix"];
        var arrCards = new Array();
        var cardSection = self.configs["cardSection"];
        var countGap = 25;
        for (var i = 0, lengthI = cardSection.length; i < lengthI; i += countGap) {
            var arrCard = new Array();
            for (var j = 0; j < countGap; j++) {
                var cardItem = cardSection[i + j];
                arrCard.push(cardItem);
            }
            arrCards.push(arrCard);
        }
        var roomSection = self.configs["roomSection"];
        // var curCSIndex:number = roomSection["curCSIndex"];
        var curCSIndex = self.curCSIndex;
        var roomCount = roomSection["count"];
        var cuser0 = self.configs["user0"];
        var cuser1 = self.configs["user1"];
        var arrDebugRoomData = new Array();
        var rid = 0;
        for (var i = start, lengthI = roomCount * 2 + start; i < lengthI; i += 2) {
            var user0 = {};
            for (var key in cuser0) {
                user0[key] = cuser0[key];
            }
            var user1 = {};
            for (var key in cuser1) {
                user1[key] = cuser1[key];
            }
            var index = i;
            var str = "" + index;
            if (index < 10)
                str = "00" + index;
            else if (index < 100)
                str = "0" + index;
            user0.nick = index + "";
            user0.ticket = ticketPrefix + str;
            user0.uid = uidPrefix + str;
            user0.account = accountPrefix + str;
            index = i + 1;
            str = "" + index;
            if (index < 10)
                str = "00" + index;
            else if (index < 100)
                str = "0" + index;
            user1.nick = index + "";
            user1.ticket = ticketPrefix + str;
            user1.uid = uidPrefix + str;
            user1.account = accountPrefix + str;
            var debugRoomData = new DebugRoomData();
            debugRoomData.rid = rid;
            debugRoomData.user0 = user0;
            debugRoomData.user1 = user1;
            debugRoomData.csindex = curCSIndex;
            var cards0 = new Array();
            var arrSort = self.getIndexArrByCurCardSectionIndex(curCSIndex, arrCards.length);
            for (var j = 0, lengthJ = arrSort.length; j < lengthJ; j++) {
                var itemIndex = arrSort[j];
                var arrCard = arrCards[itemIndex];
                var randIndex = self.getRandomInterval(0, arrCard.length - 1);
                cards0.push(arrCard[randIndex]);
            }
            debugRoomData.cards0 = cards0;
            var cards1 = new Array();
            arrSort = self.getIndexArrByCurCardSectionIndex(curCSIndex + 1, arrCards.length);
            for (var j = 0, lengthJ = arrSort.length; j < lengthJ; j++) {
                var itemIndex = arrSort[j];
                var arrCard = arrCards[itemIndex];
                var randIndex = self.getRandomInterval(0, arrCard.length - 1);
                cards1.push(arrCard[randIndex]);
            }
            debugRoomData.cards1 = cards1;
            curCSIndex += 2;
            rid++;
            arrDebugRoomData.push(debugRoomData);
            if (curCSIndex > self.curCSIndex)
                self.updateCSShow(curCSIndex);
        }
        // self.arrCreateDebugRoomData = arrDebugRoomData;
        for (var i = 0, lengthI = arrDebugRoomData.length; i < lengthI; i++) {
            var debugRoomDataItem = arrDebugRoomData[i];
            // egret.Tween.get(this).wait(1000*i).call(function(debugRoomDataItemParam:DebugRoomData,showModel:boolean){
            //     let obj = new Object();
            //     obj["user0"] = debugRoomDataItemParam.user0;
            //     obj["user1"] = debugRoomDataItemParam.user1;
            //     obj["cards0"] = debugRoomDataItemParam.cards0;
            //     obj["cards1"] = debugRoomDataItemParam.cards1;
            //     obj["csindex"] = debugRoomDataItemParam.csindex;
            //     obj["androidDebug"] = true;
            //     let centerServer:ServerData = GlobalDataManager.getInstance().getCenterServer();
            //     HttpManager.getInstance().send(centerServer.getSname(),CmdDef.CMD_DEBUG_MANY_CREATE_ROOM,obj,showModel);
            // }.bind(self,debugRoomDataItem,i==0))
            var showModel = i == 0;
            var obj = new Object();
            obj["user0"] = debugRoomDataItem.user0;
            obj["user1"] = debugRoomDataItem.user1;
            obj["cards0"] = debugRoomDataItem.cards0;
            obj["cards1"] = debugRoomDataItem.cards1;
            obj["csindex"] = debugRoomDataItem.csindex;
            obj["androidDebug"] = true;
            var centerServer = GlobalDataManager.getInstance().getCenterServer();
            HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_MANY_CREATE_ROOM, obj, showModel);
        }
        // self.reqGetRoomReserveData();
    };
    DebugView.prototype.onClickRecoveryBtn = function () {
        var self = this;
        if (self.curDebugRoomData == null)
            return;
        var user = self.curDebugRoomData.user0;
        var obj = new Object();
        obj["user"] = user;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_CLOSE_ROOM, obj, true);
        var rid = self.curDebugRoomData.rid;
        self.resetCreateDebugRoom(rid);
        self.groupRData.visible = true;
        self.groupRDetail.visible = false;
        self.startTimer();
    };
    DebugView.prototype.getIndexArrByCurCardSectionIndex = function (curCSIndex, count) {
        var index = 0;
        var arrIndex = new Array();
        for (var i = 0; i < count; i++) {
            arrIndex.push(i);
        }
        //n个数中任取m个数的不同取法的个数
        //C(n，m)=n×(n-1)×…×(n-m+1)/m×(m-1)×…×1
        var start = 0;
        var subIndex = 0;
        for (var z = 0; z < count; z++) {
            var x = count - z - 1;
            var y = 4;
            var num1 = x;
            var num2 = y;
            for (var i = 1; i < y; i++) {
                num1 *= (x - i);
                num2 *= (y - i);
            }
            var num = num1 / num2;
            subIndex += num;
            if (subIndex > curCSIndex) {
                start = z;
                break;
            }
            index += num;
        }
        var result = new Array();
        for (var a = start, lengthA = arrIndex.length; a < lengthA; a++) {
            for (var b = a + 1; b < lengthA; b++) {
                for (var c = b + 1; c < lengthA; c++) {
                    for (var d = c + 1; d < lengthA; d++) {
                        for (var e = d + 1; e < lengthA; e++) {
                            if (index == curCSIndex) {
                                result.push(a);
                                result.push(b);
                                result.push(c);
                                result.push(d);
                                result.push(e);
                            }
                            index++;
                        }
                    }
                }
            }
        }
        return result;
    };
    DebugView.prototype.recursionIndex = function (index, arr) {
        for (var i = 0, lengthI = arr.length; i < lengthI; i++) {
            if (i == index)
                continue;
            return i;
        }
    };
    DebugView.prototype.getRandomInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    DebugView.prototype.connectServer = function () {
        var self = this;
        var user = self.configs["user666"];
        if (user == null)
            return;
        GameConfig.ticket = user.ticket;
        GlobalDataManager.getInstance().setRUUID("1234567890");
        GlobalDataManager.getInstance().setRoom("999999");
        var scode = "192.168.0.48";
        GlobalDataManager.getInstance().setThredID(0);
        GlobalDataManager.getInstance().setGameServerName(scode);
        var surl = "ws://" + scode + ":5000/GameServer/gateway";
        var server = new ServerData();
        server.setSname(scode);
        server.setSurl(surl);
        server.setResolver(DebugWebSocketManager.getInstance().getResolver(JsonResolver.NAME));
        DebugWebSocketManager.getInstance().registerServer(server);
        DebugWebSocketManager.getInstance().connectServer(scode, true);
    };
    DebugView.prototype.onCreateMRoom = function (data) {
        var self = this;
        self.startTimer();
        self.onConnectGame({ result: 2 });
        // self.arrCreateDebugRoomData
    };
    DebugView.prototype.onConnectGame = function (data) {
        if (data == null)
            return;
        var result = data.result;
        var self = this;
        if (result == 1) {
            // self.btnRCreate.visible = true;
            self.groupRCreate.visible = true;
            self.groupRData.visible = false;
        }
        else if (result == 2) {
            self.reqUpdateRoomData();
            self.startTimer();
            // self.btnRCreate.visible = false;
            self.groupRCreate.visible = false;
            self.groupRData.visible = true;
            var reserveData = data.reserveData;
            if (reserveData == null)
                return;
            var userSection = self.configs["userSection"];
            var accountPrefix = userSection["accountPrefix"];
            var curCSIndex = 0;
            var arrDebugRoomData = new Array();
            for (var key in reserveData) {
                var rid = Number(key);
                var debugItemView = self.getDebugItemView(rid);
                if (debugItemView == null)
                    continue;
                var roomDetail = reserveData[key];
                var debugRoomData = new DebugRoomData();
                debugRoomData.rid = rid;
                var csindex = roomDetail.csindex;
                debugRoomData.csindex = csindex;
                if (csindex > curCSIndex)
                    curCSIndex = csindex;
                debugRoomData.user0 = roomDetail.users[0];
                var uid0 = debugRoomData.user0.uid;
                var mantissa0 = uid0.substring(uid0.length - 3, uid0.length);
                debugRoomData.user0.nick = Number(mantissa0) + "";
                debugRoomData.user0.account = accountPrefix + mantissa0;
                debugRoomData.user1 = roomDetail.users[1];
                var uid1 = debugRoomData.user1.uid;
                var mantissa1 = uid1.substring(uid1.length - 3, uid1.length);
                debugRoomData.user1.nick = Number(mantissa1) + "";
                debugRoomData.user1.account = accountPrefix + mantissa1;
                debugRoomData.cards0 = roomDetail.cards[0];
                debugRoomData.cards1 = roomDetail.cards[1];
                arrDebugRoomData.push(debugRoomData);
            }
            self.arrDebugRoomData = arrDebugRoomData;
            self.updateCSShow(curCSIndex);
        }
    };
    DebugView.prototype.setRoomData = function (data) {
        if (data == null)
            return;
        var self = this;
        self.startTimer();
        var roomData = data.roomData;
        if (roomData == null || roomData.length <= 0)
            return;
        self.cleanRoomData(roomData);
        for (var key in roomData) {
            var state = roomData[key];
            var rid = Number(key);
            var item = { rid: rid, state: state };
            var debugItemView = self.getDebugItemView(rid);
            if (debugItemView == null)
                continue;
            debugItemView.updateShow(item);
            // if(hasDeatilData&&self.getDebugRoomDataByRid(rid)==null){
            //     hasDeatilData = false;
            // }
            if (Number(state) == 1) {
                self.resetCreateDebugRoom(rid);
            }
        }
        // if(!hasDeatilData)
        //     self.reqGetRoomReserveData();
    };
    DebugView.prototype.resetCreateDebugRoom = function (rid) {
        var self = this;
        var debugRoomData = null;
        var dIndex = -1;
        for (var i = 0, lengthI = self.arrDebugRoomData.length; i < lengthI; i++) {
            var debugRoomDataItem = self.arrDebugRoomData[i];
            if (debugRoomDataItem == null)
                continue;
            if (debugRoomDataItem.rid == rid) {
                debugRoomData = debugRoomDataItem;
                dIndex = i;
                break;
            }
        }
        if (debugRoomData == null) {
            var hasData = false;
            for (var i = 0, lengthI = self.arrWaitRemoveRid.length; i < lengthI; i++) {
                var numItem = self.arrWaitRemoveRid[i];
                if (numItem == rid) {
                    hasData = true;
                    break;
                }
            }
            if (hasData)
                return;
            self.arrWaitRemoveRid.push(rid);
            self.reqGetRoomReserveData();
            return;
        }
        self.reqRemoveRoomRecord(rid);
    };
    DebugView.prototype.getDebugItemView = function (rid) {
        var debugItemView = null;
        var self = this;
        for (var i = 0, lengthI = self.arrDebugItemView.length; i < lengthI; i++) {
            var item = self.arrDebugItemView[i];
            if (item == null)
                continue;
            if (item.getRid() == rid) {
                debugItemView = item;
                break;
            }
        }
        if (debugItemView == null) {
            debugItemView = new DebugItemView();
            debugItemView.initData({ groupName: "groupDI_" + rid });
            self.groupRoom.addChild(debugItemView);
            self.arrDebugItemView.push(debugItemView);
        }
        return debugItemView;
    };
    DebugView.prototype.cleanRoomData = function (roomData) {
        var self = this;
        if (self.arrDebugItemView.length <= 0)
            return;
        for (var i = self.arrDebugItemView.length - 1; i >= 0; i--) {
            var item = self.arrDebugItemView[i];
            if (item == null)
                continue;
            var rid = item.getRid();
            if (roomData[rid + ""] == null) {
                if (item.parent != null)
                    item.parent.removeChild(item);
                self.arrDebugItemView.splice(i, 1);
            }
        }
    };
    DebugView.prototype.cleanRoomDataByRid = function (rid) {
        var self = this;
        if (self.arrDebugItemView.length <= 0)
            return;
        for (var i = self.arrDebugItemView.length - 1; i >= 0; i--) {
            var item = self.arrDebugItemView[i];
            if (item == null)
                continue;
            if (rid == item.getRid()) {
                if (item.parent != null)
                    item.parent.removeChild(item);
                self.arrDebugItemView.splice(i, 1);
            }
        }
    };
    DebugView.prototype.onClickDebugItem = function (rid) {
        var self = this;
        var debugItemView = self.getDebugItemView(rid);
        if (debugItemView == null || debugItemView.getState() == 1)
            return;
        // self.reqGetRoomDetail(rid);
        var debugRoomData = null;
        for (var i = 0, lengthI = self.arrDebugRoomData.length; i < lengthI; i++) {
            var debugRoomDataItem = self.arrDebugRoomData[i];
            if (debugRoomDataItem == null)
                continue;
            if (debugRoomDataItem.rid == rid) {
                debugRoomData = debugRoomDataItem;
                break;
            }
        }
        if (debugRoomData == null) {
            self.reqGetRoomDetail(rid);
            return;
        }
        self.setRoomDetailByData(debugRoomData, debugItemView.getState());
    };
    DebugView.prototype.setRoomDetailByData = function (debugRoomData, state) {
        var self = this;
        self.curDebugRoomData = debugRoomData;
        self.stopTimer();
        self.groupRData.visible = false;
        self.groupRDetail.visible = true;
        var user0 = debugRoomData.user0;
        var user1 = debugRoomData.user1;
        var cards0 = debugRoomData.cards0;
        var cards1 = debugRoomData.cards1;
        self.lblRAccount0.text = "用户1： 账户:" + user0.account + "  昵称：" + user0.nick + "  上场卡牌数量：" + cards0.length + "  血量：" + user0.hp;
        self.lblRAccount1.text = "用户2： 账户:" + user1.account + "  昵称：" + user1.nick + "  上场卡牌数量：" + cards1.length + "  血量：" + user1.hp;
        var stateStr = "";
        var color = 0xFFFFFF;
        if (state == -1)
            stateStr = "未开启";
        else if (state == 0)
            stateStr = "正常";
        else if (state == 1)
            stateStr = "完成";
        else if (state == 2)
            stateStr = "异常";
        stateStr = "状态:" + stateStr;
        stateStr += "  测试下标:" + debugRoomData.csindex;
        stateStr += "  房间号:" + debugRoomData.rid;
        self.lblRState.text = stateStr;
        var jsonStr = JSON.stringify(cards0) + "," + JSON.stringify(cards1);
        self.editJson.text = jsonStr;
    };
    DebugView.prototype.startTimer = function () {
        var self = this;
        if (self.timer == null) {
            self.timeCounter = self.countDown;
            self.timer = new egret.Timer(1000, 0);
            self.timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
        }
        self.updateTimeShow();
        self.timer.start();
    };
    DebugView.prototype.stopTimer = function () {
        var self = this;
        if (self.timer != null) {
            self.timer.stop();
        }
    };
    DebugView.prototype.timerFunc = function () {
        var self = this;
        self.timeCounter--;
        self.updateTimeShow();
        if (self.timeCounter == 0) {
            self.stopTimer();
            self.timeCounter = self.countDown;
            self.reqUpdateRoomData();
        }
    };
    DebugView.prototype.updateTimeShow = function () {
        var self = this;
        self.lblTime.text = "刷新倒计时: " + self.parseTime(self.timeCounter);
    };
    DebugView.prototype.parseTime = function (counter) {
        if (counter < 0)
            counter = 0;
        var second = counter % 60;
        var minute = Math.floor(counter / 60);
        var secondStr = second < 10 ? "0" + second : "" + second;
        var minuteStr = minute < 10 ? "0" + minute : "" + minute;
        return minuteStr + ":" + secondStr;
    };
    DebugView.prototype.updateCSShow = function (csindex) {
        var self = this;
        if (self.curCSIndex > csindex)
            return;
        self.curCSIndex = csindex;
        self.editCurCSIndex.text = csindex + "";
        egret.localStorage.setItem("curCSIndex", csindex + "");
    };
    DebugView.prototype.reqUpdateRoomData = function () {
        this.sendRequst(CmdDef.CMD_DEBUG_GET_ROOM_DATA);
    };
    DebugView.prototype.reqGetRoomDetail = function (rid) {
        this.sendRequst(CmdDef.CMD_DEBUG_GET_ROOM_DETAIL, { rid: rid }, true);
    };
    DebugView.prototype.reqGetRoomReserveData = function () {
        this.sendRequst(CmdDef.CMD_DEBUG_GET_ROOM_RESERVE_DATA);
    };
    DebugView.prototype.reqRemoveRoomRecord = function (rid) {
        this.sendRequst(CmdDef.CMD_DEBUG_REMOVE_ROOM_RECORD, { rid: rid });
    };
    DebugView.prototype.reqGetBattleInfo = function (rid) {
        this.sendRequst(CmdDef.CMD_DEBUG_GET_BATTLE_INFO, { rid: rid });
    };
    DebugView.prototype.setRoomDetail = function (data) {
        if (data == null)
            return;
        var roomDetails = data.roomDetail;
        var roomDetail = null;
        for (var key in roomDetails) {
            roomDetail = roomDetails[key];
            break;
        }
        if (roomDetail == null)
            return;
        var rid = roomDetail.room;
        var self = this;
        var debugItemView = self.getDebugItemView(rid);
        if (debugItemView == null)
            return;
        var userSection = self.configs["userSection"];
        var accountPrefix = userSection["accountPrefix"];
        var debugRoomData = new DebugRoomData();
        debugRoomData.rid = rid;
        debugRoomData.user0 = roomDetail.users[0];
        var uid0 = debugRoomData.user0.uid;
        var mantissa0 = uid0.substring(uid0.length - 3, uid0.length);
        debugRoomData.user0.nick = Number(mantissa0) + "";
        debugRoomData.user0.account = accountPrefix + mantissa0;
        debugRoomData.user1 = roomDetail.users[1];
        var uid1 = debugRoomData.user1.uid;
        var mantissa1 = uid1.substring(uid1.length - 3, uid1.length);
        debugRoomData.user1.nick = Number(mantissa1) + "";
        debugRoomData.user1.account = accountPrefix + mantissa1;
        if (roomDetail.cards == null)
            return;
        debugRoomData.cards0 = roomDetail.cards[0];
        debugRoomData.cards1 = roomDetail.cards[1];
        self.setRoomDetailByData(debugRoomData, debugItemView.getState());
    };
    DebugView.prototype.getDebugRoomDataByRid = function (rid) {
        var debugRoomData = null;
        var self = this;
        for (var i = 0, lengthI = self.arrDebugRoomData.length; i < lengthI; i++) {
            var debugRoomDataItem = self.arrDebugRoomData[i];
            if (debugRoomDataItem == null)
                continue;
            if (debugRoomDataItem.rid == rid) {
                debugRoomData = debugRoomDataItem;
                break;
            }
        }
        return debugRoomData;
    };
    DebugView.prototype.setRoomReserveData = function (data) {
        if (data == null)
            return;
        var reserveData = data.reserveData;
        if (reserveData == null || reserveData.length <= 0)
            return;
        var self = this;
        var userSection = self.configs["userSection"];
        var accountPrefix = userSection["accountPrefix"];
        var arrCards = new Array();
        var cardSection = self.configs["cardSection"];
        var countGap = 25;
        for (var i = 0, lengthI = cardSection.length; i < lengthI; i += countGap) {
            var arrCard = new Array();
            for (var j = 0; j < countGap; j++) {
                var cardItem = cardSection[i + j];
                arrCard.push(cardItem);
            }
            arrCards.push(arrCard);
        }
        var curCSIndex = 0;
        for (var key in reserveData) {
            var rid = Number(key);
            var debugItemView = self.getDebugItemView(rid);
            if (debugItemView == null)
                continue;
            var debugRoomData = self.getDebugRoomDataByRid(rid);
            if (debugRoomData == null) {
                debugRoomData = new DebugRoomData();
                debugRoomData.rid = rid;
                var roomDetail = reserveData[key];
                var csindex = roomDetail.csindex;
                debugRoomData.csindex = csindex;
                if (csindex > curCSIndex) {
                    self.updateCSShow(curCSIndex);
                }
                debugRoomData.user0 = roomDetail.users[0];
                var uid0 = debugRoomData.user0.uid;
                var mantissa0 = uid0.substring(uid0.length - 3, uid0.length);
                debugRoomData.user0.nick = Number(mantissa0) + "";
                debugRoomData.user0.account = accountPrefix + mantissa0;
                debugRoomData.user1 = roomDetail.users[1];
                var uid1 = debugRoomData.user1.uid;
                var mantissa1 = uid1.substring(uid1.length - 3, uid1.length);
                debugRoomData.user1.nick = Number(mantissa1) + "";
                debugRoomData.user1.account = accountPrefix + mantissa1;
                debugRoomData.cards0 = roomDetail.cards[0];
                debugRoomData.cards1 = roomDetail.cards[1];
                self.arrDebugRoomData.push(debugRoomData);
            }
            var needRemove = false;
            if (self.arrWaitRemoveRid.length > 0) {
                for (var i = 0, lengthI = self.arrWaitRemoveRid.length; i < lengthI; i++) {
                    if (self.arrWaitRemoveRid[i] == rid) {
                        needRemove = true;
                        self.arrWaitRemoveRid.splice(i, 1);
                        break;
                    }
                }
            }
            if (!needRemove)
                continue;
            self.resetCreateDebugRoom(rid);
        }
    };
    DebugView.prototype.onRemoveRoomRecord = function (data) {
        if (data == null)
            return;
        var result = data.result;
        if (result != 1)
            return;
        var rid = data.rid;
        var self = this;
        self.cleanRoomDataByRid(rid);
        var debugRoomData = null;
        for (var i = 0, lengthI = self.arrDebugRoomData.length; i < lengthI; i++) {
            var debugRoomDataItem = self.arrDebugRoomData[i];
            if (debugRoomDataItem == null)
                continue;
            if (debugRoomDataItem.rid == rid) {
                debugRoomData = debugRoomDataItem;
                self.arrDebugRoomData.splice(i, 1);
                break;
            }
        }
        var arrCards = new Array();
        var cardSection = self.configs["cardSection"];
        var countGap = 25;
        for (var i = 0, lengthI = cardSection.length; i < lengthI; i += countGap) {
            var arrCard = new Array();
            for (var j = 0; j < countGap; j++) {
                var cardItem = cardSection[i + j];
                arrCard.push(cardItem);
            }
            arrCards.push(arrCard);
        }
        var curCSIndex = self.curCSIndex;
        debugRoomData.csindex = curCSIndex;
        var cards0 = new Array();
        var arrSort = self.getIndexArrByCurCardSectionIndex(curCSIndex, arrCards.length);
        for (var j = 0, lengthJ = arrSort.length; j < lengthJ; j++) {
            var itemIndex = arrSort[j];
            var arrCard = arrCards[itemIndex];
            var randIndex = self.getRandomInterval(0, arrCard.length - 1);
            cards0.push(arrCard[randIndex]);
        }
        debugRoomData.cards0 = cards0;
        var cards1 = new Array();
        arrSort = self.getIndexArrByCurCardSectionIndex(curCSIndex + 1, arrCards.length);
        for (var j = 0, lengthJ = arrSort.length; j < lengthJ; j++) {
            var itemIndex = arrSort[j];
            var arrCard = arrCards[itemIndex];
            var randIndex = self.getRandomInterval(0, arrCard.length - 1);
            cards1.push(arrCard[randIndex]);
        }
        debugRoomData.cards1 = cards1;
        curCSIndex += 2;
        self.updateCSShow(curCSIndex);
        var obj = new Object();
        obj["user0"] = debugRoomData.user0;
        obj["user1"] = debugRoomData.user1;
        obj["cards0"] = debugRoomData.cards0;
        obj["cards1"] = debugRoomData.cards1;
        obj["csindex"] = debugRoomData.csindex;
        obj["androidDebug"] = true;
        var centerServer = GlobalDataManager.getInstance().getCenterServer();
        HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_DEBUG_MANY_CREATE_ROOM, obj, false);
    };
    DebugView.prototype.onGetBattleInfo = function (data) {
        if (data == null)
            return;
        var battleInfo = data.battleInfo;
        if (battleInfo == null || battleInfo.length <= 0)
            return;
        var self = this;
        self.editBattleInfo.text = JSON.stringify(battleInfo);
    };
    DebugView.prototype.sendRequst = function (reqCmd, data, showModel) {
        if (data === void 0) { data = {}; }
        if (showModel === void 0) { showModel = false; }
        var server = DebugWebSocketManager.getInstance().getServerByName(GlobalDataManager.getInstance().getGameServerName());
        if (server == null)
            return;
        var obj = new Object();
        obj["cmd"] = reqCmd;
        obj["data"] = data;
        obj["ruuid"] = GlobalDataManager.getInstance().getRUUID();
        obj["room"] = GlobalDataManager.getInstance().getRoom();
        DebugWebSocketManager.getInstance().sendMessage(server.getSname(), reqCmd, obj, showModel);
    };
    DebugView.NAME = "DebugSkin";
    return DebugView;
}(BaseView));
__reflect(DebugView.prototype, "DebugView");
var DebugRoomData = (function () {
    function DebugRoomData() {
    }
    return DebugRoomData;
}());
__reflect(DebugRoomData.prototype, "DebugRoomData");
// TypeScript file
var ForgotView = (function (_super) {
    __extends(ForgotView, _super);
    function ForgotView() {
        var _this = _super.call(this, ForgotView.NAME) || this;
        _this.timeDuration = 60; //60秒
        return _this;
    }
    ForgotView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        // self.editPasswordText.displayAsPassword = true;
        // GMDManager.addGMDInfo(0,"HeiHongCaoFang",0,null,"0");        
        // var uname = egret.localStorage.getItem("uname");
        // var password = egret.localStorage.getItem("password");
        // self.editAccountText.text = uname;
        // self.editPasswordText.text = password;
        // self.editPasswordText.displayAsPassword = true;
        self.curPWInputType = 0;
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.initView();
    };
    ForgotView.prototype.initView = function () {
        var self = this;
        self.editPhone.inputType = egret.TextFieldInputType.TEL;
        self.btnGetVCode.visible = true;
        self.lblVCodeTime.visible = false;
        self.editPhone.text = "";
        self.editVCode.text = "";
        self.editPassword0.text = "";
        self.editPassword1.text = "";
        self.updatePWInputTypeShow();
        // self.setVCodeCountDownShow();
    };
    ForgotView.prototype.updatePWInputTypeShow = function () {
        var self = this;
        var norSource = "loginSheet_json.biyan";
        var selSource = "loginSheet_json.kaiyan";
        var pwHide = self.curPWInputType == 0;
        self.imgWatch.source = pwHide ? norSource : selSource;
        self.editPassword0.displayAsPassword =
            self.editPassword1.displayAsPassword = pwHide;
    };
    // private setVCodeCountDownShow():void{
    //     var self = this;
    //     var ltime = egret.localStorage.getItem("rtime");
    //     var vcodeTime:number = ltime!=null?Number(ltime)+self.timeDuration-Math.floor(new Date().getTime()/1000):-1;
    //     var showVCodeCD:boolean = vcodeTime>0;
    //     if(showVCodeCD)
    //         self.openVCodeCountDown(vcodeTime);
    //     self.btnGetVCode.visible  =!showVCodeCD;
    //     self.lblVCodeTime.visible = showVCodeCD;
    // }
    ForgotView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        self.labelObj = null;
    };
    // private checkValidate(input:string):boolean{
    //     var self =this;
    //     if(GlobalDef.getInstance().checkRegex(GlobalDef.REGEX_TO_USER,self.editAccountText.text)
    //         &&GlobalDef.getInstance().checkRegex(GlobalDef.REGEX_TO_PSD,self.editPasswordText.text)){
    //             return true;
    //     }
    //     return false;
    // }
    ForgotView.prototype.TouchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnConfirm) {
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE, self.editPhone.text)) {
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_1"], 2);
                    return;
                }
                if (self.editVCode.text.length <= 0) {
                    // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_2"], 2);
                    return;
                }
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PSD, self.editPassword0.text)) {
                    // PopManager.getInstance().showPromptBox("密码不符合要求!\n(6-18位数字或字母组合)",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"], 2);
                    return;
                }
                if (self.editPassword0.text != self.editPassword1.text) {
                    // PopManager.getInstance().showPromptBox("两次密码输入不一致!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"], 2);
                    return;
                }
                var phoneStr = self.editPhone.text;
                var vcodeStr = self.editVCode.text;
                var pw0Str = new MD5().hex_md5(self.editPassword0.text);
                var pw1Str = new MD5().hex_md5(self.editPassword1.text);
                var obj = new Object();
                obj["phone"] = phoneStr;
                obj["vcode"] = vcodeStr;
                obj["pw0"] = pw0Str;
                obj["pw1"] = pw1Str;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_FORGOT, obj, true);
                egret.localStorage.setItem("uphone", phoneStr);
            }
            else if (tar == self.btnGetVCode) {
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE, self.editPhone.text)) {
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_1"], 2);
                    return;
                }
                var accountStr = self.editPhone.text;
                var obj = new Object();
                obj["username"] = accountStr;
                obj["type"] = 2;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_SMSCODE, obj, true);
            }
            else if (tar == self.btnClose) {
                self.hiden();
            }
        }
        else if (tar instanceof eui.Image) {
            if (tar == self.imgWatch) {
                self.curPWInputType = self.curPWInputType == 0 ? 1 : 0;
                SoundManager.getInstance().PlayClickSound();
                self.updatePWInputTypeShow();
            }
        }
    };
    ForgotView.prototype.setSMSCode = function (code) {
        var self = this;
        if (self.editVCode) {
            self.editVCode.text = code;
        }
        // egret.localStorage.setItem("rtime",Math.floor(new Date().getTime()/1000)+"");
        self.openVCodeCountDown(self.timeDuration);
        self.btnGetVCode.visible = false;
        self.lblVCodeTime.visible = true;
    };
    ForgotView.prototype.openVCodeCountDown = function (time) {
        var self = this;
        if (self.timer == null) {
            self.timer = new egret.Timer(1000, 0);
            self.timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
        }
        self.timeCounter = time;
        self.updateTimeShow();
        self.timer.start();
    };
    ForgotView.prototype.stopTimer = function () {
        var self = this;
        if (self.timer != null) {
            self.timer.stop();
        }
    };
    ForgotView.prototype.timerFunc = function () {
        var self = this;
        self.timeCounter--;
        self.updateTimeShow();
        if (self.timeCounter <= 0) {
            self.stopTimer();
            self.lblVCodeTime.visible = false;
            self.btnGetVCode.visible = true;
        }
    };
    ForgotView.prototype.updateTimeShow = function () {
        var self = this;
        self.lblVCodeTime.text = self.timeCounter + "S";
    };
    ForgotView.prototype.onResetPasswordComplete = function () {
        var self = this;
        // PopManager.getInstance().showPromptBox("修改成功!",2,Handler.create(self,function(confirm:boolean){
        //     self.hiden();
        // }));
        PopManager.getInstance().showPromptBox(self.labelObj["lbl_0"], 2, Handler.create(self, function (confirm) {
            self.hiden();
        }));
    };
    ForgotView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupForgot == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupForgot.scaleX =
                self.groupForgot.scaleY = 1;
            return;
        }
        self.groupForgot.scaleX =
            self.groupForgot.scaleY = gapNum;
    };
    ForgotView.NAME = "ForgotSkin";
    return ForgotView;
}(BaseView));
__reflect(ForgotView.prototype, "ForgotView");
// TypeScript file
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this, LoginView.NAME) || this;
        _this.timeDuration = 60; //60秒
        return _this;
    }
    LoginView.prototype.week = function () {
        var self = this;
        self.stage.orientation = egret.OrientationMode.LANDSCAPE;
        self.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        self.stage.setContentSize(width, height);
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        // self.editPasswordText.displayAsPassword = true;
        var ltype = egret.localStorage.getItem("ltype");
        self.curLoginType = ltype != null ? Number(ltype) : 0;
        self.curConsentAgreement = true;
        self.curPWInputType = 0;
        self.initView();
        self.autoLogin();
        self.autoDebug();
    };
    LoginView.prototype.initView = function () {
        var self = this;
        var agreementUrl = "";
        var gameConfig = GlobalDataManager.getInstance().getGameConfig();
        if (gameConfig.agreementUrl != null) {
            agreementUrl = gameConfig.agreementUrl;
        }
        //加下划线
        self.lblLicense.textFlow = [
            { text: self.lblLicense.text, style: { underline: true, "href": agreementUrl } }
        ];
        self.lblAgreement.textFlow = [
            { text: self.lblAgreement.text, style: { underline: true, "href": agreementUrl } }
        ];
        self.editPhone.inputType = egret.TextFieldInputType.TEL;
        var uname = egret.localStorage.getItem("uname");
        self.editUsername.text = uname != null ? uname : "";
        self.editVCode.text = "";
        var uphone = egret.localStorage.getItem("uphone");
        self.editPhone.text = uphone != null ? uphone : "";
        self.editPassword.text = "";
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.lblVersion.text = self.labelObj["lbl_1"] + Main.ver; //"版本号:"+Main.ver;
        self.btnGetVCode.visible = true;
        self.lblVCodeTime.visible = false;
        self.updateCurLoginType();
        self.updateAgreementShow();
        self.updatePWInputTypeShow();
        // self.setVCodeCountDownShow();
        self.lblBottom.text = self.labelObj["lbl_0"];
        // self.lblBottom.text = "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防上当受骗。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。"
    };
    LoginView.prototype.updateCurLoginType = function () {
        var self = this;
        var VCodeShow = self.curLoginType == 0;
        self.groupVCode.visible = VCodeShow;
        self.groupPassword.visible = !VCodeShow;
        var norColor = 0xFFFFFF;
        var selColor = 0x42D9FF;
        self.lblVCode.textColor = VCodeShow ? selColor : norColor;
        self.lblPassword.textColor = VCodeShow ? norColor : selColor;
        egret.localStorage.setItem("ltype", self.curLoginType + "");
    };
    LoginView.prototype.updateAgreementShow = function () {
        var self = this;
        var norSource = "loginSheet_json.xuankuang00";
        var selSource = "loginSheet_json.xuankuang01";
        self.imgCheckAgreement.source = self.curConsentAgreement ? selSource : norSource;
    };
    LoginView.prototype.updatePWInputTypeShow = function () {
        var self = this;
        var norSource = "loginSheet_json.biyan";
        var selSource = "loginSheet_json.kaiyan";
        var pwHide = self.curPWInputType == 0;
        self.imgWatch.source = pwHide ? norSource : selSource;
        self.editPassword.displayAsPassword = pwHide;
    };
    // private setVCodeCountDownShow():void{
    //     var self = this;
    //     var ltime = egret.localStorage.getItem("ltime");
    //     var vcodeTime:number = ltime!=null?Number(ltime)+self.timeDuration-Math.floor(new Date().getTime()/1000):-1;
    //     var showVCodeCD:boolean = vcodeTime>0;
    //     if(showVCodeCD)
    //         self.openVCodeCountDown(vcodeTime);
    //     self.btnGetVCode.visible  =!showVCodeCD;
    //     self.lblVCodeTime.visible = showVCodeCD;
    // }
    //自动登录 后期删除
    LoginView.prototype.autoLogin = function () {
        if (window.location) {
            var search = location.search;
            if (search == "") {
                return;
            }
            search = search.slice(1);
            var self = this;
            var searchArr = search.split("&");
            var length_1 = searchArr.length;
            for (var i = 0; i < length_1; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == "account") {
                    var obj = new Object();
                    obj["username"] = arr[1];
                    var centerServer = GlobalDataManager.getInstance().getCenterServer();
                    HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_AUTO_LOGIN, obj, true);
                }
            }
        }
    };
    //自动跳转调试模式
    LoginView.prototype.autoDebug = function () {
        if (window.location) {
            var search = location.search;
            if (search == "") {
                return;
            }
            search = search.slice(1);
            var self = this;
            var searchArr = search.split("&");
            var length_2 = searchArr.length;
            for (var i = 0; i < length_2; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == "debug")
                    UIManager.getInstance().showUI(DebugView, GameScene.VIEW_LAYER_NUMBER, -1, 0, 0, 0 /* TYPE_NOR */, { type: Number(arr[1]) });
                else if (arr[0] == "combat") {
                    var gkid = 2;
                    var gameName = "Combat";
                    var attData = '{"gName":"CardRes","arr2Res":["cardCommonImg0Sheet_json","cardCommonImg1Sheet_json","cardCommonImg2Sheet_json","cardCommonImg3Sheet_json","cardCommonImg4Sheet_json","headImg0Sheet_json"]}';
                    //直接进游戏,后面需要合并其他游戏的时候再做处理;
                    GMDManager.addGMDInfo(gkid, gameName, 2, null, "0", "", attData);
                    var obj = new Object();
                    obj["dt"] = 2;
                    obj["param"] = { debug: true };
                    obj["gdir"] = 2;
                    GMDManager.startGMD(gkid, obj);
                    UIManager.getInstance().hideUI(LoginView);
                }
            }
        }
    };
    LoginView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        self.labelObj = null;
    };
    LoginView.prototype.TouchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnLogin) {
                if (!self.curConsentAgreement) {
                    // PopManager.getInstance().showPromptBox("请先详细阅读并同意使用许可和服务协议!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_2"], 2);
                    return;
                }
                var accountStr = "";
                var type = self.curLoginType;
                var code = "";
                if (type == 0) {
                    if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE, self.editPhone.text)) {
                        // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"], 2);
                        return;
                    }
                    if (self.editVCode.text.length <= 0) {
                        // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"], 2);
                        return;
                    }
                    accountStr = self.editPhone.text;
                    code = self.editVCode.text;
                    egret.localStorage.setItem("uphone", accountStr);
                }
                else {
                    if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_USER, self.editUsername.text)) {
                        // PopManager.getInstance().showPromptBox("用户名不符合要求!\n(6-22位数字或字母组合,不含特殊字符)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_5"], 2);
                        return;
                    }
                    if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PSD, self.editPassword.text)) {
                        // PopManager.getInstance().showPromptBox("密码不符合要求!\n(6-18位数字或字母组合)",2);
                        PopManager.getInstance().showPromptBox(self.labelObj["lbl_6"], 2);
                        return;
                    }
                    accountStr = self.editUsername.text;
                    code = new MD5().hex_md5(self.editPassword.text);
                    egret.localStorage.setItem("uname", accountStr);
                }
                var obj = new Object();
                obj["username"] = accountStr;
                obj["code"] = code;
                obj["type"] = type;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_LOGIN, obj, true);
            }
            else if (tar == self.btnGetVCode) {
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE, self.editPhone.text)) {
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"], 2);
                    return;
                }
                var accountStr = self.editPhone.text;
                var obj = new Object();
                obj["username"] = accountStr;
                obj["type"] = 0;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_SMSCODE, obj, true);
            }
            else if (tar == self.btnRegist) {
                // // let gkid:number = 1;
                // // let gameName:string= "Hall";
                // let gkid:number = 2;
                // let gameName:string= "Combat";
                // let attData:string = '{"gName":"CardRes","arr2Res":["cardCommonImg0Sheet_json","cardCommonImg1Sheet_json","cardCommonImg2Sheet_json","cardCommonImg3Sheet_json","cardCommonImg4Sheet_json","headImg0Sheet_json"]}';
                // //直接进游戏,后面需要合并其他游戏的时候再做处理;
                // GMDManager.addGMDInfo(gkid,gameName,2,null,"0","",attData);
                // let obj = new Object();
                // obj["dt"] = 2;
                // obj["param"] = {debug:true};
                // obj["gdir"] =2;
                // GMDManager.startGMD(gkid,obj);
                // UIManager.getInstance().hideUI(LoginView);
                UIManager.getInstance().showUI(RegisterView);
            }
            else if (tar == self.btnForgot) {
                UIManager.getInstance().showUI(ForgotView);
            }
        }
        else if (tar instanceof eui.Label) {
            if (tar == self.lblVCode) {
                SoundManager.getInstance().PlayClickSound();
                if (self.curLoginType == 0)
                    return;
                self.curLoginType = 0;
                self.updateCurLoginType();
            }
            else if (tar == self.lblPassword) {
                SoundManager.getInstance().PlayClickSound();
                if (self.curLoginType == 1)
                    return;
                self.curLoginType = 1;
                self.updateCurLoginType();
            }
            else if (tar == self.lblLicense || tar == self.lblAgreement) {
                SoundManager.getInstance().PlayClickSound();
            }
        }
        else if (tar instanceof eui.Image) {
            if (tar == self.imgCheckAgreement) {
                self.curConsentAgreement = !self.curConsentAgreement;
                SoundManager.getInstance().PlayClickSound();
                self.updateAgreementShow();
            }
            else if (tar == self.imgWatch) {
                self.curPWInputType = self.curPWInputType == 0 ? 1 : 0;
                SoundManager.getInstance().PlayClickSound();
                self.updatePWInputTypeShow();
            }
        }
    };
    LoginView.prototype.setSMSCode = function (code) {
        var self = this;
        if (self.editVCode) {
            self.editVCode.text = code;
        }
        // egret.localStorage.setItem("ltime",Math.floor(new Date().getTime()/1000)+"");
        self.openVCodeCountDown(self.timeDuration);
        self.btnGetVCode.visible = false;
        self.lblVCodeTime.visible = true;
    };
    LoginView.prototype.openVCodeCountDown = function (time) {
        var self = this;
        if (self.timer == null) {
            self.timer = new egret.Timer(1000, 0);
            self.timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
        }
        self.timeCounter = time;
        self.updateTimeShow();
        self.timer.start();
    };
    LoginView.prototype.stopTimer = function () {
        var self = this;
        if (self.timer != null) {
            self.timer.stop();
        }
    };
    LoginView.prototype.timerFunc = function () {
        var self = this;
        self.timeCounter--;
        self.updateTimeShow();
        if (self.timeCounter <= 0) {
            self.stopTimer();
            self.lblVCodeTime.visible = false;
            self.btnGetVCode.visible = true;
        }
    };
    LoginView.prototype.updateTimeShow = function () {
        var self = this;
        self.lblVCodeTime.text = self.timeCounter + "S";
    };
    LoginView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupLogin == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupLogin.scaleX =
                self.groupLogin.scaleY = 1;
            return;
        }
        self.groupLogin.scaleX =
            self.groupLogin.scaleY = gapNum;
    };
    LoginView.NAME = "LoginSkin";
    return LoginView;
}(BaseView));
__reflect(LoginView.prototype, "LoginView");
// TypeScript file
var RegisterView = (function (_super) {
    __extends(RegisterView, _super);
    function RegisterView() {
        var _this = _super.call(this, RegisterView.NAME) || this;
        _this.timeDuration = 60; //60秒
        return _this;
    }
    RegisterView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        // self.editPasswordText.displayAsPassword = true;
        // GMDManager.addGMDInfo(0,"HeiHongCaoFang",0,null,"0");        
        // var uname = egret.localStorage.getItem("uname");
        // var password = egret.localStorage.getItem("password");
        // self.editAccountText.text = uname;
        // self.editPasswordText.text = password;
        // self.editPasswordText.displayAsPassword = true;
        self.curPWInputType = 0;
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
        self.initView();
    };
    RegisterView.prototype.initView = function () {
        var self = this;
        self.editPhone.inputType = egret.TextFieldInputType.TEL;
        self.btnGetVCode.visible = true;
        self.lblVCodeTime.visible = false;
        self.editUsername.text = "";
        self.editPhone.text = "";
        self.editVCode.text = "";
        self.editPassword0.text = "";
        self.editPassword1.text = "";
        self.updatePWInputTypeShow();
        // self.setVCodeCountDownShow();
    };
    RegisterView.prototype.updatePWInputTypeShow = function () {
        var self = this;
        var norSource = "loginSheet_json.biyan";
        var selSource = "loginSheet_json.kaiyan";
        var pwHide = self.curPWInputType == 0;
        self.imgWatch.source = pwHide ? norSource : selSource;
        self.editPassword0.displayAsPassword =
            self.editPassword1.displayAsPassword = pwHide;
    };
    // private setVCodeCountDownShow():void{
    //     var self = this;
    //     var ltime = egret.localStorage.getItem("rtime");
    //     var vcodeTime:number = ltime!=null?Number(ltime)+self.timeDuration-Math.floor(new Date().getTime()/1000):-1;
    //     var showVCodeCD:boolean = vcodeTime>0;
    //     if(showVCodeCD)
    //         self.openVCodeCountDown(vcodeTime);
    //     self.btnGetVCode.visible  =!showVCodeCD;
    //     self.lblVCodeTime.visible = showVCodeCD;
    // }
    RegisterView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        self.labelObj = null;
    };
    RegisterView.prototype.TouchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnRegister) {
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_USER, self.editUsername.text)) {
                    // PopManager.getInstance().showPromptBox("用户名不符合要求!\n(6-22位数字或字母组合,不含特殊字符)",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_0"], 2);
                    return;
                }
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE, self.editPhone.text)) {
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_1"], 2);
                    return;
                }
                if (self.editVCode.text.length <= 0) {
                    // PopManager.getInstance().showPromptBox("验证码不能为空!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_2"], 2);
                    return;
                }
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PSD, self.editPassword0.text)) {
                    // PopManager.getInstance().showPromptBox("密码不符合要求!\n(6-18位数字或字母组合)",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_3"], 2);
                    return;
                }
                if (self.editPassword0.text != self.editPassword1.text) {
                    // PopManager.getInstance().showPromptBox("两次密码输入不一致!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_4"], 2);
                    return;
                }
                var accountStr = self.editUsername.text;
                var phoneStr = self.editPhone.text;
                var vcodeStr = self.editVCode.text;
                var pw0Str = new MD5().hex_md5(self.editPassword0.text);
                var pw1Str = new MD5().hex_md5(self.editPassword1.text);
                var obj = new Object();
                obj["username"] = accountStr;
                obj["phone"] = phoneStr;
                obj["vcode"] = vcodeStr;
                obj["pw0"] = pw0Str;
                obj["pw1"] = pw1Str;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_REGISTER, obj, true);
                egret.localStorage.setItem("uname", accountStr);
                egret.localStorage.setItem("uphone", phoneStr);
                // var accountStr:string = self.editAccountText.text;
                // var passwordStr:string = self.editPasswordText.text;
                // let md5_psd:string = new MD5().hex_md5(passwordStr);
                // var obj = new Object();
                // obj["name"] = accountStr;
                // obj["psd"] = md5_psd;
                // obj["psdTemp"] = md5_psd;
                // obj["ident"] = self.editCodeText.text;
                // obj["nick"] = self.editNickText.text;
                // obj["sex"] = 0;
                // obj["from"] = 1;
                // obj["cid"] = localStorage.getItem('cid');
                // obj["sid"] =1;
                // obj["kind"] = GlobalDef.getInstance().getOSType();
                // obj["image_suffx"] = Main.res+"assets/123.jpg";
                // obj["key"] = new MD5().hex_md5(accountStr + "_"+obj["from"]+"_"+GameConfig.vi);
                // let ls = GlobalDataManager.getInstance().getLoginServer();
                // if(ls!=null){
                //     HttpManager.getInstance().send(ls.getSname(),CmdDef.CMD_LS_REGISTER,obj);
                //     GlobalDataManager.getInstance().setAccountText(accountStr);
                //     GlobalDataManager.getInstance().setPassWordText(passwordStr);
                // }
            }
            else if (tar == self.btnGetVCode) {
                if (!PublicMethodManager.getInstance().checkRegex(PublicMethodManager.REGEX_TO_PHONE, self.editPhone.text)) {
                    // PopManager.getInstance().showPromptBox("手机号码不符合要求!",2);
                    PopManager.getInstance().showPromptBox(self.labelObj["lbl_1"], 2);
                    return;
                }
                var accountStr = self.editPhone.text;
                var obj = new Object();
                obj["username"] = accountStr;
                obj["type"] = 1;
                var centerServer = GlobalDataManager.getInstance().getCenterServer();
                HttpManager.getInstance().send(centerServer.getSname(), CmdDef.CMD_GAME_SMSCODE, obj, true);
            }
            else if (tar == self.btnClose) {
                this.hiden();
            }
        }
        else if (tar instanceof eui.Image) {
            if (tar == self.imgWatch) {
                self.curPWInputType = self.curPWInputType == 0 ? 1 : 0;
                SoundManager.getInstance().PlayClickSound();
                self.updatePWInputTypeShow();
            }
        }
    };
    RegisterView.prototype.setSMSCode = function (code) {
        var self = this;
        if (self.editVCode) {
            self.editVCode.text = code;
        }
        // egret.localStorage.setItem("rtime",Math.floor(new Date().getTime()/1000)+"");
        self.openVCodeCountDown(self.timeDuration);
        self.btnGetVCode.visible = false;
        self.lblVCodeTime.visible = true;
    };
    RegisterView.prototype.openVCodeCountDown = function (time) {
        var self = this;
        if (self.timer == null) {
            self.timer = new egret.Timer(1000, 0);
            self.timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
        }
        self.timeCounter = time;
        self.updateTimeShow();
        self.timer.start();
    };
    RegisterView.prototype.stopTimer = function () {
        var self = this;
        if (self.timer != null) {
            self.timer.stop();
        }
    };
    RegisterView.prototype.timerFunc = function () {
        var self = this;
        self.timeCounter--;
        self.updateTimeShow();
        if (self.timeCounter <= 0) {
            self.stopTimer();
            self.lblVCodeTime.visible = false;
            self.btnGetVCode.visible = true;
        }
    };
    RegisterView.prototype.updateTimeShow = function () {
        var self = this;
        self.lblVCodeTime.text = self.timeCounter + "S";
    };
    RegisterView.prototype.onResize = function (event) {
        _super.prototype.onResize.call(this, event);
        var self = this;
        if (self.groupRegister == null)
            return;
        var width = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_WIDTH : GlobalDef.SCREEN_HEIGHT;
        var height = GlobalDef.SCREEN_WIDTH > GlobalDef.SCREEN_HEIGHT ? GlobalDef.SCREEN_HEIGHT : GlobalDef.SCREEN_WIDTH;
        var curWidth = self.$stage.stageWidth;
        var curHeight = self.$stage.stageHeight;
        var gapNum = Number(((curWidth / curHeight) / (width / height)).toFixed(2));
        if (gapNum > 1 || gapNum < 0) {
            self.groupRegister.scaleX =
                self.groupRegister.scaleY = 1;
            return;
        }
        self.groupRegister.scaleX =
            self.groupRegister.scaleY = gapNum;
    };
    RegisterView.NAME = "RegisterSkin";
    return RegisterView;
}(BaseView));
__reflect(RegisterView.prototype, "RegisterView");
// TypeScript file
var PromptBoxView = (function (_super) {
    __extends(PromptBoxView, _super);
    function PromptBoxView() {
        return _super.call(this, PromptBoxView.NAME) || this;
    }
    PromptBoxView.prototype.week = function () {
        var self = this;
        if (!self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        self.labelObj = LanguageManager.getInstance().getLabelLanguage(this);
    };
    PromptBoxView.prototype.sleep = function () {
        var self = this;
        if (self.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.TouchTap, self);
        }
        self.labelObj = null;
    };
    PromptBoxView.prototype.TouchTap = function (event) {
        var self = this;
        var tar = event.target;
        if (tar instanceof eui.Button) {
            SoundManager.getInstance().PlayClickSound();
            if (tar == self.btnConfirm) {
                if (self.callbackHandler != null) {
                    self.callbackHandler.runWith(true);
                }
            }
            else if (tar == self.btnCancel) {
                if (self.callbackHandler != null) {
                    self.callbackHandler.runWith(false);
                }
            }
            else if (tar == self.btnConfirmCenter) {
                if (self.callbackHandler != null) {
                    self.callbackHandler.runWith(true);
                }
            }
            self.hiden();
        }
    };
    PromptBoxView.prototype.setContent = function (content, callbackHandler, btnLbls, conColor) {
        if (btnLbls === void 0) { btnLbls = null; }
        var self = this;
        self.content = content;
        self.callbackHandler = callbackHandler;
        self.btnLbls = btnLbls;
        self.contextColor = conColor;
        self.updateUI();
    };
    PromptBoxView.prototype.updateUI = function () {
        var self = this;
        if (self.lblContent == null)
            return;
        self.lblContent.text = self.content;
        var confirm_state = _super.prototype.getData.call(this);
        self.btnConfirm.visible = false;
        self.btnCancel.visible = false;
        self.btnConfirmCenter.visible = false;
        if (confirm_state == 1) {
            self.btnConfirm.visible = true;
            self.btnCancel.visible = true;
            if (self.btnLbls && self.btnLbls.length == 2) {
                self.btnConfirm.label = self.btnLbls[0];
                self.btnCancel.label = self.btnLbls[1];
            }
            else {
                self.btnConfirm.label = self.labelObj["lbl_0"]; //"确定";
                self.btnCancel.label = self.labelObj["lbl_1"]; //"取消"
            }
        }
        else if (confirm_state == 2) {
            self.btnConfirmCenter.visible = true;
            if (self.btnLbls && self.btnLbls.length > 0) {
                self.btnConfirmCenter.label = self.btnLbls[0];
            }
            else {
                self.btnConfirmCenter.label = self.labelObj["lbl_0"]; //"确定";
            }
        }
        if (self.contextColor != null) {
            self.lblContent.textColor = self.contextColor;
        }
        else {
            self.lblContent.textColor = 0xFFFFFF;
        }
    };
    PromptBoxView.NAME = "PromptBoxSkin";
    return PromptBoxView;
}(BaseView));
__reflect(PromptBoxView.prototype, "PromptBoxView");
//# sourceMappingURL=main.js.map