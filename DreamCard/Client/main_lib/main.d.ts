declare class IBaseView extends eui.Component implements GameProcedure {
    private m_data;
    private m_state;
    private m_layer;
    private m_effectType;
    private m_viewExml;
    private m_viewUrl;
    private m_oriMode;
    constructor(name?: string, data?: Object);
    setData(data: any): void;
    getData(): any;
    getOriMode(): string;
    getEffectType(): number;
    private HasRES(name);
    init(type?: number, layer?: number, popUpWidth?: number, popUpHeight?: number, effectType?: ShowViewEffectType, data?: Object): void;
    initData(data: Object): void;
    show(): void;
    weekComplete(): void;
    protected week(): void;
    reWeek(): void;
    private openView();
    hiden(): void;
    protected sleep(): void;
    private lPackAssignment();
    protected registerTouchEvent(func: Function): void;
    protected removeTouchEvent(func: Function): void;
}
declare class GameScene {
    static GAME_LAYER_NUMBER: number;
    static VIEW_LAYER_NUMBER: number;
    static EFFECT_LAYER_NUMBER: number;
    static HEAD_LAYER_NUMBER: number;
    static BOM_LAYER_NUMBER: number;
    static POP_LAYER_NUMBER: number;
    static HIDE_LAYER_NUMBER: number;
    private m_gameLayer;
    private m_viewLayer;
    private m_effectLayer;
    private m_headLayer;
    private m_bomLayer;
    private m_popLayer;
    constructor(_stage: egret.Stage);
    private init(_stage);
    getGameLayer(): eui.UILayer;
    getViewLayer(): eui.UILayer;
    getEffectLayer(): eui.UILayer;
    getHeadLayer(): eui.UILayer;
    getBomLayer(): eui.UILayer;
    getPopLayer(): eui.UILayer;
}
declare class NetBase {
    private m_resolvers;
    private m_serverMap;
    private m_servers;
    registerResolver(resolver: IResolver): void;
    getResolver(name: string): IResolver;
    registerServer(server: ServerData): void;
    getServerByName(sname: string): ServerData;
    getServerByRequest(request: egret.HttpRequest): ServerData;
    getServerBySocket(socket: egret.WebSocket): ServerData;
    getWebSocketServers(): Array<ServerData>;
    removeServerByName(sname: string): boolean;
}
declare class BaseDecoder {
    initDecoderFunction(): void;
    removeDecoderFunction(): void;
    protected registerCmd(cmd: number, func: Function): void;
    protected unRegisterFunction(cmd: number): void;
}
declare class BaseResolver implements IResolver {
    private m_protoMap;
    private m_cmdToProtoMap;
    private m_classToProtoMap;
    private m_packageData;
    private m_name;
    constructor(name: string);
    name(): string;
    registerProto(protoName: string): void;
    registerCmdToProto(configs: Array<ProtoResolverConfig>): void;
    private doCmdToProto(config);
    registerClassNameToProto(className: string, protoName: string): void;
    cloneProtoResolverClassByCmd(cmd: number): any;
    cloneProtoResolverClassByName(className: string): any;
    registerPackageData(pag: any): void;
    getPackageData(): any;
    parse(cmd: number, data: any, m?: boolean): any;
    decode(data: any): void;
}
declare class BaseView extends IBaseView {
    constructor(name?: string, data?: Object);
    protected onComplete(event?: egret.Event): void;
    protected onRemoveFromStage(event?: egret.Event): void;
    protected onResize(event?: egret.Event): void;
}
declare class AccountData {
    private uname;
    private psd;
    private ticket;
    private nick;
    private gold;
    private points;
    private lvl;
    private exp;
    private upexp;
    private muexp;
    private etime;
    private vip;
    private vip_st;
    private cost;
    private hp;
    private head_url;
    private sex;
    private guide_step;
    getUName(): string;
    setUName(uname: string): void;
    getPSD(): string;
    setPSD(psd: string): void;
    getTicket(): string;
    setTicket(ticket: string): void;
    getNick(): string;
    setNick(nick: string): void;
    getGold(): number;
    setGold(gold: number): void;
    getPoints(): number;
    setPoints(points: number): void;
    getLvl(): number;
    setLvl(lvl: number): void;
    getExp(): number;
    setExp(exp: number): void;
    getUpexp(): number;
    setUpexp(upexp: number): void;
    getMuexp(): number;
    setMuexp(muexp: number): void;
    getEtime(): number;
    setEtime(etime: number): void;
    getVip(): number;
    setVip(vip: number): void;
    getVip_St(): number;
    setVip_St(vip_st: number): void;
    getCost(): number;
    setCost(cost: number): void;
    getHp(): number;
    setHp(hp: number): void;
    getSex(): number;
    setSex(sex: number): void;
    getHead_Url(): string;
    setHead_Url(head_url: string): void;
    getGuide_Step(): string;
    setGuide_Step(guide_step: string): void;
}
declare class JiBanData {
    private dsc;
    private tittle;
    private jbList;
    getDsc(key: string): string;
    setDsc(uname: string): void;
    getTittle(key: string): string;
    setTittle(uname: string): void;
    setJBnode(key: string, tittle: string, dsc: string): void;
}
declare class UIManager {
    private static m_manager;
    static getInstance(): UIManager;
    private uiUsedContainer;
    private uiContainer;
    private gkid_vname;
    private m_maskSpriteLayer;
    private m_maskSprite;
    showUI(ui: any, layer?: number, maskAlpha?: number, popUpWidth?: number, popUpHeight?: number, effectType?: ShowViewEffectType, data?: Object): void;
    openViewEffect(view: IBaseView): void;
    hideUI(ui: any, effectType?: HideViewEffectType): void;
    showLoading(oriMode?: string, data?: Object): IGMDLoadProgress;
    hideLoading(): void;
    registerViewNameByGkid(gkid: number, ui: any, g_name: string): void;
    getViewNameByGkid(gkid: number): string;
    getViewByName(ui: any): IBaseView;
    checkHasViewByName(ui: any): boolean;
    private GetAndRegView(ui);
    private GetUIName(ui);
    private openView(uiname, view, layer?, maskAlpha?, effectType?);
    private hidenDarkSprite();
    removeAllLayerUI(): void;
    removeLayerUI(layer?: number): void;
}
declare const enum ShowMaskType {
    TYPE_NOR = 0,
    TYPE_ALPHA_ZERO = 1,
    TYPE_ALPHA_HALF = 2,
    TYPE_ALPHA_ALL = 3,
}
declare const enum ShowViewEffectType {
    TYPE_NOR = 0,
    TYPE_SCALE_CENTER = 1,
    TYPE_MOVE_LEFT = 2,
    TYPE_MOVE_RIGHT = 3,
    TYPE_MOVE_TOP = 4,
    TYPE_MOVE_BOTTOM = 5,
    TYPE_SHADOW = 6,
}
declare const enum HideViewEffectType {
    TYPE_NOR = 0,
    TYPE_SCALE_CENTER = 1,
    TYPE_MOVE_LEFT = 2,
    TYPE_MOVE_RIGHT = 3,
    TYPE_MOVE_TOP = 4,
    TYPE_MOVE_BOTTOM = 5,
    TYPE_SHADOW = 6,
}
interface IGMDLoadProgress {
    setStepInfo(stepList: Object, finBack: Function, target: any): void;
    finStep(step: string): void;
    finAllStep(): void;
}
declare class WebVerController implements RES.IVersionController {
    private _allVers;
    private _callback;
    fetchVersion(callback: {
        onSuccess: (data: any) => any;
        onFail: (error: number, data: any) => any;
    }): void;
    private onLoadFinish(event);
    addWebVer(addVers: Object): void;
    getChangeList(): Array<{
        url: string;
        size: number;
    }>;
    getVirtualUrl(url: string): string;
    init(): Promise<any>;
}
declare class GameEvent extends egret.Event {
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
}
declare class GameEventData {
    eventName: string;
    gameEvent: any;
    paramObj: Object;
}
declare class GameEventParam {
    event: string;
    caller: any;
    listener: Function;
    args: Object;
    priority: number;
}
declare class GameEventManager {
    private static instance;
    static getInstance(): GameEventManager;
    private arrData;
    addEventListener(event: string, caller: any, listener: Function, args?: Object, priority?: number): void;
    dispatchEvent(event: string, args?: Object): void;
    removeEventListener(event: string, caller: any, listener: Function): void;
    hasEventListener(event: string, caller: any, listener: Function): boolean;
    private getGameEventData(event);
}
interface IResolver {
    name(): string;
    registerProto(protoName: string): void;
    registerCmdToProto(configs: Array<ProtoResolverConfig>): void;
    registerClassNameToProto(className: string, protoName: string): void;
    cloneProtoResolverClassByCmd(cmd: number): any;
    cloneProtoResolverClassByName(className: string): any;
    registerPackageData(pag: any): void;
    getPackageData(): any;
    parse(cmd: number, trd: number, data: any, m: boolean): any;
    decode(data: any): void;
}
declare class Main extends eui.UILayer {
    static ver: string;
    static defVer: string;
    static url: string;
    static res: string;
    static gRes: string;
    constructor();
    protected createChildren(): void;
    private onConfigComplete(event);
    private onThemeLoadComplete();
    private onResourceLoadComplete(event);
    private onResourceLoadError(event);
    private onResourceProgress(event);
    private textfield;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene();
    private initData();
    private initDecoder();
    private initManager();
    private initResolver();
}
declare class ProtoPackageData {
    private m_cmd;
    private m_headLen;
    private m_len;
    private m_curPostion;
    private m_dataArray;
    private m_data;
    clear(): void;
    getCurPostion(): number;
    setCurPostion(curPostion: number): void;
    getCmd(): number;
    setCmd(cmd: number): void;
    getHeadLen(): number;
    setHeadLen(headLen: number): void;
    getLen(): number;
    setLen(len: number): void;
    getDataArray(): egret.ByteArray;
    getData(): any;
    setData(data: any): void;
}
declare class ServerData {
    static SERVER_HTTP_TYPE: number;
    static SERVER_SOCKET_TYPE: number;
    private m_sname;
    private m_type;
    private m_resolverType;
    private m_host;
    private m_port;
    private m_surl;
    private m_hurl;
    private m_socket;
    private m_request;
    private m_resolver;
    setSname(sname: string): void;
    getSname(): string;
    setType(type: number): void;
    getType(): number;
    setResolverType(resolverType: string): void;
    getResolverType(): string;
    setHost(host: string): void;
    getHost(): string;
    setPort(port: number): void;
    getPort(): number;
    setSurl(surl: string): void;
    getSurl(): string;
    setHurl(hurl: string): void;
    getHurl(): string;
    setSocket(socket: egret.WebSocket): void;
    getSocket(): egret.WebSocket;
    setRequest(request: egret.HttpRequest): void;
    getRequest(): egret.HttpRequest;
    setResolver(resolver: IResolver): void;
    getResolver(): IResolver;
}
declare class TextPackageData {
    private m_cmd;
    private m_data;
    clear(): void;
    getCmd(): number;
    setCmd(cmd: number): void;
    getData(): number;
    setData(data: number): void;
}
declare class BaseDecode {
    private static m_decode;
    static getInstance(): BaseDecode;
    private m_decoderMap;
    registerFunction(cmd: number, func: Function): void;
    unRegisterFunction(cmd: number): void;
    registerDecoder(decoder: BaseDecoder): void;
    removeDecoder(decoder: BaseDecoder): void;
    getFunction(cmd: number): Function;
    decode(cmd: number, data: any): void;
}
/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
interface Platform {
    getUserInfo(): Promise<any>;
    login(): Promise<any>;
}
declare class DebugPlatform implements Platform {
    getUserInfo(): Promise<{
        nickName: string;
    }>;
    login(): Promise<void>;
}
declare let platform: Platform;
interface Window {
    platform: Platform;
}
declare module GameConfig {
    var isDebug: boolean;
    var isOnLine: boolean;
    var ticket: string;
    var key: string;
    var vi: string;
    function gameScene(): GameScene;
    function curWidth(): number;
    function curHeight(): number;
    function isVertical(): boolean;
}
declare class JsonResolver extends BaseResolver {
    static NAME: string;
    constructor(name: string);
    decode(data: any): void;
    parse(cmd: number, trd: number, data: any, m?: boolean): any;
}
declare class ProtoBufResolver extends BaseResolver {
    static NAME: string;
    constructor(name: string);
    decode(data: any): void;
    parse(cmd: number, data: any): any;
}
declare class ProtoResolverConfig {
    cmd: number;
    protoName: string;
    className: string;
}
declare class DebugWebSocketManager extends NetBase {
    private static m_manager;
    static getInstance(): DebugWebSocketManager;
    private m_sname;
    private m_timer_heart_beat;
    private m_needPop;
    setPopStatus(pstatus: boolean): void;
    connectServer(sname: string, showModel?: boolean): void;
    private onSocketOpen(e);
    private onReceiveMessage(e);
    private onIOError();
    private reconnet();
    sendMessage(sname: string, cmd: number, data: any, showModel?: boolean, m?: boolean): void;
    sendCSMsg(cmd: number, data: any, showModel?: boolean, m?: boolean): void;
    sendGSMsg(cmd: number, data: any, showModel?: boolean, m?: boolean): void;
    isConnect(sname: string): boolean;
    close(sname: string): void;
    private onTimerSendHeartBeat(e);
    reconnect(): void;
}
declare class HttpManager extends NetBase {
    private static m_manager;
    static getInstance(): HttpManager;
    private m_nowReqTask;
    private m_timer;
    timerRun(): boolean;
    reSend(): void;
    clearSend(): void;
    send(sname: string, cmd: number, data: any, showModel?: boolean, m?: boolean, sendCount?: number): void;
    sendLS(cmd: number, data: any, showModel?: boolean, m?: boolean, sendCount?: number): void;
    sendCS(cmd: number, data: any, showModel?: boolean, m?: boolean, sendCount?: number): void;
    private onPostComplete(e);
    private onPostIOError(e?);
    private timerFunc(e);
    private timerComFunc(e);
    locationUrl(): void;
}
declare class RequestTask {
    sname: string;
    cmd: number;
    data: any;
    showModel: boolean;
    m: boolean;
    sendCount: number;
}
declare class WebSocketManager extends NetBase {
    private static m_manager;
    static getInstance(): WebSocketManager;
    private m_sname;
    private m_timer_heart_beat;
    private checkOvertime;
    private recordServerTime;
    private m_needPop;
    private reconnectHandler;
    setPopStatus(pstatus: boolean): void;
    setReconnectHandler(reconnectHandler: Handler): void;
    connectServer(sname: string, showModel?: boolean): void;
    private onSocketOpen(e);
    private onReceiveMessage(e);
    private onSocketClose();
    private onIOError();
    private showReconnectPopup();
    sendMessage(sname: string, cmd: number, data: any, showModel?: boolean, m?: boolean): void;
    sendCSMsg(cmd: number, data: any, showModel?: boolean, m?: boolean): void;
    sendGSMsg(cmd: number, data: any, showModel?: boolean, m?: boolean): void;
    isConnect(sname: string): boolean;
    close(sname: string): void;
    private onTimerSendHeartBeat(e);
    onRecvHeartBeat(data: any): void;
    reconnect(): void;
}
declare class SoundManager {
    private static _instance;
    static getInstance(): SoundManager;
    private _bgmName;
    private _bgmSound;
    private _bgmChannel;
    private _bgmVolume;
    private time_stop_bgm;
    yinxiao: boolean;
    yinyue: boolean;
    canPlayCombatBGM: boolean;
    constructor();
    PlaySound(sound_name: string, playcnt?: number): void;
    PlayClickSound(): void;
    private pchannel;
    private lastSource;
    private playSoundImpl(sound, source, playcnt);
    PlaySound_WaitDuration(sound_name: string, playcnt?: number, duration?: number): void;
    PlayBgm(bgm_name: string): void;
    private playBgmImpl(sound, source);
    setBGMVolume(volume: number): void;
    PlayBgmExist(): void;
    CloseBgm(): void;
}
declare abstract class GameProcedure {
}
declare class AssetAdapter implements eui.IAssetAdapter {
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    getAsset(source: string, compFunc: Function, thisObject: any): void;
}
/**
 *
 * @author lxq
 *  用于动画管理的类
 *
 */
declare class MCManager {
    private static _manager;
    static getInstance(): MCManager;
    private _mcFactorys;
    private _loadings;
    getMCDataAsync(jsName: string, mcName: string, callback: (mcData: egret.MovieClipData, jsName: string, mcName: string) => void, tar: any): void;
    private onGetMCResFin(data, source);
    registerMovieClipDataFactoryAuto(name: string): void;
    getMovieClipByName(jsonName: string, mcName: string): egret.MovieClip;
    getMovieClipNumFramesByName(jsonName: string, mcName: string): number;
}
declare class LoadingUI extends egret.Sprite {
    constructor();
    private textField;
    private createView();
    onProgress(current: number, total: number): void;
}
declare class UIMovieClip extends egret.MovieClip {
    static LOAD_FIN_EVENT: string;
    private _source;
    private _params;
    source: string;
    private onLoadMCDataFin(mcData, jsName, mcName);
    play(playTimes?: number): void;
    stop(): void;
    prevFrame(): void;
    nextFrame(): void;
    gotoAndPlay(frame: string | number, playTimes?: number): void;
    gotoAndStop(frame: string | number): void;
}
declare module UITheme {
    var allSkin: any;
    function loadConf(configURL: string, initFin?: Function, initTar?: any): void;
    function getTheme(name: string): any;
    function hasTheme(name: string): boolean;
}
/**
 * <p><code>Handler</code> 是事件处理器类。</p>
 * <p>推荐使用 Handler.create() 方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。</p>
 * <p><b>注意：</b>由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。</p>
 */
declare class Handler {
    /**@private handler对象池*/
    private static _pool;
    /**@private */
    private static _gid;
    /** 执行域(this)。*/
    caller: any;
    /** 处理方法。*/
    method: Function;
    /** 参数。*/
    args: Array<any>;
    /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
    once: boolean;
    /**@private */
    protected _id: number;
    /**
     * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
     * @param	caller 执行域。
     * @param	method 处理函数。
     * @param	args 函数参数。
     * @param	once 是否只执行一次。
     */
    constructor(caller?: any, method?: Function, args?: Array<any>, once?: boolean);
    /**
     * 设置此对象的指定属性值。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
     * @return  返回 handler 本身。
     */
    setTo(caller: any, method: Function, args: Array<any>, once: boolean): Handler;
    /**
     * 执行处理器。
     */
    run(): any;
    /**
     * 执行处理器，携带额外数据。
     * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
     */
    runWith(data: any): any;
    /**
     * 清理对象引用。
     */
    clear(): Handler;
    /**
     * 清理并回收到 Handler 对象池内。
     */
    recover(): void;
    /**
     * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
     * @return  返回创建的handler实例。
     */
    static create(caller: any, method: Function, args?: Array<any>, once?: boolean): Handler;
}
declare class GlobalDataManager {
    private static m_manager;
    static getInstance(): GlobalDataManager;
    private gameConfig;
    private centerServer;
    private status;
    private isConnect;
    private thredID;
    private gameServerName;
    private account;
    private jibanData;
    private ruuid;
    private room;
    private gameover;
    private walletinit;
    private bindaddress;
    private walletaddress;
    setWalletAddress(walletaddress: any): void;
    getWalletAddress(): string;
    getGameConfig(): any;
    setGameConfig(gameConfig: any): void;
    getCenterServer(): ServerData;
    setCenterServer(centerServer: ServerData): void;
    getStatus(): number;
    setStatus(status: number): void;
    getAccountData(): AccountData;
    getJiBanData(): JiBanData;
    getIsConnect(): boolean;
    setIsConnect(isConnect: boolean): void;
    getThredID(): number;
    setThredID(thredID: number): void;
    getGameServerName(): string;
    setGameServerName(name: string): void;
    getRUUID(): string;
    setRUUID(ruuid: string): void;
    getRoom(): string;
    setRoom(room: string): void;
    getGameOver(): boolean;
    setGameOver(gameover: boolean): void;
    getWalletInit(): boolean;
    setWalletInit(isInit: boolean): void;
    getBindAddress(): string;
    setBindAddress(address: string): void;
}
declare class GlobalDef {
    static SCREEN_WIDTH: number;
    static SCREEN_HEIGHT: number;
    static REQUEST_SUCCESS: number;
    static REQUEST_FAIL: number;
}
declare class MD5 {
    constructor();
    private hexcase;
    private b64pad;
    hex_md5(s: any): string;
    b64_md5(s: any): string;
    any_md5(s: any, e: any): string;
    hex_hmac_md5(k: any, d: any): string;
    private b64_hmac_md5(k, d);
    private any_hmac_md5(k, d, e);
    md5_vm_test(): boolean;
    rstr_md5(s: any): string;
    rstr_hmac_md5(key: any, data: any): string;
    rstr2hex(input: any): string;
    rstr2b64(input: any): string;
    rstr2any(input: any, encoding: any): string;
    str2rstr_utf8(input: any): string;
    str2rstr_utf16le(input: any): string;
    str2rstr_utf16be(input: any): string;
    rstr2binl(input: any): any[];
    binl2rstr(input: any): string;
    binl_md5(x: any, len: any): number[];
    md5_cmn(q: any, a: any, b: any, x: any, s: any, t: any): number;
    md5_ff(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    md5_gg(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    md5_hh(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    md5_ii(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    safe_add(x: any, y: any): number;
    bit_rol(num: any, cnt: any): number;
}
declare enum CmdDef {
    CMD_GAME_LOGIN = 1,
    CMD_GAME_REGISTER = 2,
    CMD_GAME_SMSCODE = 3,
    CMD_GAME_FORGOT = 4,
    CMD_CHECK_LOGIN = 5,
    CMD_GAME_AUTO_LOGIN = 6,
    CMD_WALLET_LOGIN = 7,
    CMD_GAME_EMAILVCODE = 8,
    CMD_GAME_LOGOUT = 99,
    CMD_GAME_CONNECT = 1000,
    CMD_CLIENT_HEART_BEAT = 1100,
    CMD_DEBUG_SINGLE_CREATE_ROOM = 960,
    CMD_DEBUG_CLOSE_ROOM = 961,
    CMD_DEBUG_REQ_USER_COMBAT_STATE = 962,
    CMD_DEBUG_MANY_CREATE_ROOM = 965,
    CMD_DEBUG_GAME_CONNECT = 980,
    CMD_DEBUG_GET_ROOM_DATA = 981,
    CMD_DEBUG_GET_ROOM_DETAIL = 982,
    CMD_DEBUG_GET_ROOM_RESERVE_DATA = 983,
    CMD_DEBUG_REMOVE_ROOM_RECORD = 984,
    CMD_DEBUG_GET_BATTLE_INFO = 985,
    CMD_BIND_CHAIN_WALLET = 300,
    CMD_WALLET_TRANSFER = 301,
    CMD_WALLET_TRANSFER_RESULT = 302,
    CMD_CARD_OFFLINE = 303,
    CMD_CARD_OFFLINE_RESULT = 304,
}
declare class SystemDecoder extends BaseDecoder {
    funcPrefix: string;
    initDecoderFunction(): void;
    removeDecoderFunction(): void;
    private method_1(data);
    private method_2(data);
    private method_3(data);
    private method_4(data);
    private method_5(data);
    private method_7(data);
    private method_8(data);
    private method_300(data);
    private method_301(data);
    private method_302(data);
    private method_303(data);
    private method_304(data);
    private method_1000(data);
    private method_1100(data);
    private method_960(data);
    private method_961(data);
    private method_962(data);
    private method_965(data);
    private method_980(data);
    private method_981(data);
    private method_982(data);
    private method_983(data);
    private method_984(data);
    private method_985(data);
}
declare module GMDManager {
    interface IGameModule {
        init(data: any, fincallBack: (delayMS?: number) => void): void;
        dispose(): void;
    }
    function addGMDInfo(gid: number, name: string, ori: number, jsVer?: string, resVer?: string, path?: string, attRes?: any): void;
    function getCurGMD(): IGameModule;
    function startGMD(gid: number, data?: Object): void;
    function closeGMD(): void;
}
declare class ErrorMananger {
    private static m_manager;
    static getInstance(): ErrorMananger;
    checkReqResult(data: any, errorPopup?: boolean, callbackHandler?: Handler): boolean;
}
declare class HTMLElementManager {
    private static m_manager;
    static getInstance(): HTMLElementManager;
    private configs;
    startLoadJson(jsonStr: string, completeFunc: Function, target: any): void;
    private getHTMLElementObj(jsonStr);
    hasJsonData(jsonStr: string): boolean;
    private addHTMLElement(obj);
    private onLoadJSComplete(obj);
}
declare class HTMLElementObj {
    resObj: any;
    completeFunc: Function;
    target: any;
    loadCompleteCount: number;
}
declare class LanguageManager {
    private static m_manager;
    static getInstance(): LanguageManager;
    private curLType;
    private languagePackage_json;
    private init();
    getLanguagePath(): string;
    getLabelLanguage(view: any): any;
    setLanguagePackage(gameName: string): void;
    getCurLanguageType(): number;
}
declare class PopManager {
    private static m_manager;
    static getInstance(): PopManager;
    showPromptBox(content: string, uiparam?: number, callbackHandler?: Handler, btnLbls?: any, conColor?: number): void;
}
declare class XWG {
    static SDK: any;
}
declare class PublicMethodManager {
    private static m_manager;
    static getInstance(): PublicMethodManager;
    getOSType(): number;
    static REGEX_TO_USER: string;
    static REGEX_TO_PHONE: string;
    static REGEX_TO_NICK: string;
    static REGEX_TO_PSD: string;
    static REGEX_TO_EMAIL: string;
    checkRegex(regex: string, param: string): boolean;
    loginOut(): void;
    getCardRarity(rarity: string): string;
    getCardElement(element: string): string;
    getProbabilityStr(data: any, pro: Array<any>): string;
    openWallet(): void;
    walletLogin(walletName: any): void;
}
declare class CardFetterView extends IBaseView {
    static NAME: string;
    constructor();
    private groupCF;
    private imgIcon;
    private btnFetter;
    protected week(): void;
    protected sleep(): void;
    private setIcon(data);
    private setColor(data);
    private setBtnName(name);
}
declare class CardRectangleView extends IBaseView {
    static NAME: string;
    constructor();
    private groupCR;
    private imgBG;
    private imgIcon;
    private imgRarity;
    private levelbg;
    private imgElement;
    private lblRound;
    private lblName;
    private imgGeneration;
    private groupLevel;
    private imgChoose;
    private lblAtk;
    private lblHp;
    private groupCRB;
    private curRound;
    private origHp;
    private curHp;
    protected week(): void;
    protected sleep(): void;
    private setVisible(visible);
    showSimple(): void;
    private setIcon(data);
    private setRarity(data);
    private setElement(data);
    private setGeneration(data);
    private setRound(data);
    private setLevel(data);
    private setName(name);
    setAtk(data: number): void;
    getAtk(): number;
    setHp(data: number): void;
    getHp(): number;
    private setGroupName(data);
    private setViewColor(view, grey);
    private setImgColor(image, colorMatrix);
    changeViewColor(grey: boolean): void;
    reduceRound(): void;
    setDamage(damage: number): void;
    modifyLimitHp(hp: number): void;
    modifyAtk(atk: number): void;
    setChoose(choose?: boolean): void;
    getViewWidth(): number;
    getViewHeight(): number;
}
declare class CardSkillView extends IBaseView {
    static NAME: string;
    constructor();
    private groupCSK;
    private imgIcon;
    private imgBG;
    protected week(): void;
    protected sleep(): void;
    private setIcon(data);
    private setLevel(data);
    private setGroupName(data);
}
declare class CardSquareView extends IBaseView {
    static NAME: string;
    constructor();
    private groupCS;
    private imgBG;
    private imgIcon;
    private imgRarity;
    private imgRound;
    private imgElement;
    private flag;
    private lblRound;
    private lblName;
    private lblCost;
    private imgGeneration;
    private groupLevel;
    private imgChoose;
    private lblAtk;
    private lblHp;
    private groupCSB;
    private curRound;
    private origHp;
    private curHp;
    protected week(): void;
    protected sleep(): void;
    private setVisible(visible);
    showSimple(): void;
    private setIcon(data);
    private setRarity(data);
    private setElement(data);
    setGeneration(data: number): void;
    private setRound(data);
    setLevel(data: number): void;
    private setName(name);
    private setCost(data);
    setAtk(data: number): void;
    setHp(data: number): void;
    private setGroupName(data);
    private setViewColor(view, grey);
    private setImgColor(image, colorMatrix);
    changeViewColor(grey: boolean): void;
    reduceRound(): number;
    getCurRound(): number;
    setChoose(choose?: boolean): void;
    getViewWidth(): number;
    getViewHeight(): number;
}
declare class LoadingHView extends BaseView implements IGMDLoadProgress {
    static NAME: string;
    private lblProgress;
    private prbLoading;
    private load_timer;
    private _stepList;
    private _finBack;
    private _finTar;
    private progres;
    private loadProgres;
    private defaultSpeed;
    private fastSpeed;
    private slowSpeed;
    constructor();
    protected week(): void;
    weekComplete(): void;
    protected sleep(): void;
    private onTimeProgress(e);
    setStepInfo(stepList: Object, finBack: Function, target: any): void;
    finStep(step: string): void;
    finAllStep(): void;
}
declare class LoadingRView extends BaseView {
    static NAME: string;
    private imgZQ;
    constructor();
    protected week(): void;
    protected sleep(): void;
    private onEnterFrame(e);
}
declare class LoadingSView extends BaseView implements IGMDLoadProgress {
    static NAME: string;
    private lblProgress;
    private prbLoading;
    private load_timer;
    private _stepList;
    private _finBack;
    private _finTar;
    private progres;
    private loadProgres;
    private defaultSpeed;
    private fastSpeed;
    private slowSpeed;
    constructor();
    protected week(): void;
    weekComplete(): void;
    protected sleep(): void;
    private onTimeProgress(e);
    setStepInfo(stepList: Object, finBack: Function, target: any): void;
    finStep(step: string): void;
    finAllStep(): void;
}
declare class TextView extends BaseView {
    static NAME: string;
    private text;
    constructor();
    protected week(): void;
    protected sleep(): void;
    private onEnterFrame(e);
}
declare class AreanoItemView extends BaseView {
    static NAME: string;
    constructor();
    private rectBG;
    private lblContent;
    private imgChoose;
    protected week(): void;
    protected sleep(): void;
    setChooseState(choose: boolean): void;
    get: any;
}
declare class DebugItemView extends IBaseView {
    static NAME: string;
    constructor();
    private groupDebugItem;
    private lblRoom;
    private lblState;
    private rid;
    private state;
    protected week(): void;
    updateShow(data: any): void;
    getRid(): number;
    getState(): number;
    getGroupName(): string;
}
declare class DebugView extends BaseView {
    static NAME: string;
    constructor();
    private group1;
    private group2;
    private btnCreate;
    private btnOpen;
    private btnClose;
    private lblAccount0;
    private lblAccount1;
    private scrRoom;
    private groupRoom;
    private groupRData;
    private groupRDetail;
    private groupRCreate;
    private editCCurCSIndex;
    private btnChangeCurCSIndex;
    private btnRCreate;
    private lblTime;
    private editCurCSIndex;
    private lblRAccount0;
    private lblRAccount1;
    private lblRState;
    private editJson;
    private btnROpen;
    private btnRClose;
    private btnRBack;
    private btnRRecovery;
    private btnRGetBattleInfo;
    private editBattleInfo;
    private configs;
    private arrDebugItemView;
    private arrDebugRoomData;
    private arrWaitRemoveRid;
    private curDebugRoomData;
    private curCSIndex;
    private countDown;
    private timeCounter;
    private timer;
    protected week(): void;
    protected sleep(): void;
    private TouchTap(event);
    private reqUserCombatState();
    recvData(cmd: CmdDef, data: any): void;
    private setBtnState(state);
    private onClickCreateRoomBtn();
    private onClickRecoveryBtn();
    private getIndexArrByCurCardSectionIndex(curCSIndex, count);
    private recursionIndex(index, arr);
    private getRandomInterval(min, max);
    private connectServer();
    private onCreateMRoom(data);
    private onConnectGame(data);
    private setRoomData(data);
    private resetCreateDebugRoom(rid);
    private getDebugItemView(rid);
    private cleanRoomData(roomData);
    private cleanRoomDataByRid(rid);
    private onClickDebugItem(rid);
    private setRoomDetailByData(debugRoomData, state);
    private startTimer();
    private stopTimer();
    private timerFunc();
    private updateTimeShow();
    private parseTime(counter);
    private updateCSShow(csindex);
    private reqUpdateRoomData();
    private reqGetRoomDetail(rid);
    private reqGetRoomReserveData();
    private reqRemoveRoomRecord(rid);
    private reqGetBattleInfo(rid);
    private setRoomDetail(data);
    private getDebugRoomDataByRid(rid);
    private setRoomReserveData(data);
    private onRemoveRoomRecord(data);
    private onGetBattleInfo(data);
    private sendRequst(reqCmd, data?, showModel?);
}
declare class DebugRoomData {
    rid: number;
    csindex: number;
    user0: any;
    user1: any;
    cards0: any;
    cards1: any;
}
declare class ForgotView extends BaseView {
    static NAME: string;
    constructor();
    private groupForgot;
    private btnClose;
    private groupPhone;
    private editPhone;
    private editVCode;
    private editPassword0;
    private editPassword1;
    private imgWatch;
    private lblVCodeTime;
    private lblAreano;
    private btnGetVCode;
    private groupEmail;
    private editEmail;
    private editEmailVCode;
    private btnGetEmailVCode;
    private imgWatch0;
    private lblEmailVCodeTime;
    private editPassword2;
    private editPassword3;
    private btnConfirm;
    private groupAreano;
    private scrAreanoList;
    private groupAreanoList;
    private curPWInputType;
    private curAreano;
    private curAreanoItemView;
    private timeCounter;
    private timer;
    private timeDuration;
    private timeCounter1;
    private timer1;
    private curForgotType;
    private movingState;
    private labelObj;
    protected week(): void;
    private initView();
    private updatePWInputTypeShow();
    private updateCurForgotType();
    protected sleep(): void;
    private TouchTap(event);
    setSMSCode(code: string): void;
    private openSmsCountDown(time);
    private stopSmsTimer();
    private timerSmsFunc();
    private updateSmsTimeShow();
    setEmailVCode(code: string): void;
    private openEVCCountDown(time);
    private stopEVCTimer();
    private timerEVCFunc();
    private updateEVCTimeShow();
    onResetPasswordComplete(): void;
    private initAreanoShow();
    private updateAreanoShow();
    private onCancelHandler();
    private onEndHandler();
    protected onResize(event?: egret.Event): void;
}
declare class LoginView extends BaseView {
    static NAME: string;
    constructor();
    private groupLogin;
    private groupNormalLogin;
    private groupPhone;
    private editPhone;
    private editVCode;
    private btnGetVCode;
    private lblVCodeTime;
    private groupSelAreano;
    private lblAreano;
    private groupAreano;
    private scrAreanoList;
    private groupAreanoList;
    private groupEmail;
    private editEmail;
    private editEmailVCode;
    private btnGetEmailVCode;
    private lblEmailVCodeTime;
    private groupPassword;
    private editUsername;
    private editPassword;
    private imgWatch;
    private btnLogin;
    private lblVCode;
    private lblPassword;
    private lblLicense;
    private lblAgreement;
    private imgCheckAgreement;
    private btnRegist;
    private btnForgot;
    private lblVersion;
    private lblBottom;
    private btnBackSLogin;
    private groupSwitchLogin;
    private btnMetaMaskLogin;
    private btnBinanceLogin;
    private btnPhoneLogin;
    private btnEmailLogin;
    private groupBtnPhoneLogin;
    private groupBtnEmailLogin;
    private curLoginType;
    private curPhoneLoginType;
    private curEmailLoginType;
    private curConsentAgreement;
    private curPWInputType;
    private curAreano;
    private curAreanoItemView;
    private timeCounter;
    private timer;
    private timeDuration;
    private timeCounter1;
    private timer1;
    private movingState;
    private labelObj;
    protected week(): void;
    private initView();
    private updateCurPhoneLoginType();
    private updateCurEmailLoginType();
    private updateAgreementShow();
    private updatePWInputTypeShow();
    private autoLogin();
    private autoDebug();
    protected sleep(): void;
    private TouchTap(event);
    setSMSCode(code: string): void;
    private openSmsCountDown(time);
    private stopSmsTimer();
    private timerSmsFunc();
    private updateSmsTimeShow();
    setEmailVCode(code: string): void;
    private openEVCCountDown(time);
    private stopEVCTimer();
    private timerEVCFunc();
    private updateEVCTimeShow();
    private initAreanoShow();
    private updateAreanoShow();
    private onCancelHandler();
    private onEndHandler();
    protected onResize(event?: egret.Event): void;
}
declare class RegisterView extends BaseView {
    static NAME: string;
    constructor();
    private groupRegister;
    private btnClose;
    private groupPhone;
    private editUsername;
    private editPhone;
    private editVCode;
    private editPassword0;
    private editPassword1;
    private imgWatch;
    private lblVCodeTime;
    private lblAreano;
    private btnGetVCode;
    private groupEmail;
    private editUsername0;
    private editEmail;
    private editEmailVCode;
    private btnGetEmailVCode;
    private imgWatch0;
    private lblEmailVCodeTime;
    private editPassword2;
    private editPassword3;
    private btnRegister;
    private groupAreano;
    private scrAreanoList;
    private groupAreanoList;
    private curPWInputType;
    private curAreano;
    private curAreanoItemView;
    private timeCounter;
    private timer;
    private timeDuration;
    private timeCounter1;
    private timer1;
    private curRegisterType;
    private movingState;
    private labelObj;
    protected week(): void;
    private initView();
    private updatePWInputTypeShow();
    private updateCurRegisterType();
    protected sleep(): void;
    private TouchTap(event);
    setSMSCode(code: string): void;
    private openSmsCountDown(time);
    private stopSmsTimer();
    private timerSmsFunc();
    private updateSmsTimeShow();
    setEmailVCode(code: string): void;
    private openEVCCountDown(time);
    private stopEVCTimer();
    private timerEVCFunc();
    private updateEVCTimeShow();
    private initAreanoShow();
    private updateAreanoShow();
    private onCancelHandler();
    private onEndHandler();
    protected onResize(event?: egret.Event): void;
}
declare class PromptBoxView extends BaseView {
    static NAME: string;
    constructor();
    private groupPromptBox;
    private lblContent;
    private btnConfirm;
    private btnCancel;
    private btnConfirmCenter;
    private callbackHandler;
    private btnLbls;
    private contextColor;
    private content;
    private labelObj;
    protected week(): void;
    protected sleep(): void;
    private TouchTap(event);
    setContent(content: string, callbackHandler: Handler, btnLbls?: any, conColor?: number): void;
    private updateUI();
}
