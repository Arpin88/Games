	
window.addEventListener('message', function(event){
	// console.log(event.data)
	switch(event.data.method)
	{
		case "onBind":
			onInit(event.data.data);
			break;
        case "onLogin":
            onLogin(event.data.data);
            break;
        case "onLogout":
            onLogout(event.data.data);
            break;
		case "getAuthCode":
			getAuthCode(event.data.data);
			break;
        case "onPay":
            onPay(event.data.data);
            break;
        // 新增方法
        case "onClose":
            onClose(event.data.data);
            break;
	}
}, false);

function onInit(data)
{
    XWG.Main.listenerCallback("bind",data);
}

function onLogin(data)
{
    XWG.Main.listenerCallback("login",data);
}
function onLogout(data)
{
    XWG.Main.listenerCallback("logout",data);
}

function getAuthCode(data)
{

    XWG.Main.listenerCallback("getAuthCode",data);
}

function onPay(data)
{
    XWG.Main.listenerCallback("pay",data);}


function onSetKV(data)
{
    window.localStorage.setItem(data.key,data.defaultObject);
}

function onGetKV(data)
{
    var data = window.localStorage.getItem(data.key);
    return data;
}

function onShowIcon()
{
    XWG.Main.showIcon();
}

// var wallet_url = "http://192.168.1.106/xwgwallet/node-test/weAPP/index.html";
function onClose(data)
{
    // XWG.Main.listenerCallback("init",data);
    // XWG.Main.showIcon();
    XWG.SDK.showIcon();
}

var wallet_url = "http://wallet.xwgapi.com/";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var XWG;
(function (XWG) {
    var BC_scriptSrc = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1].src;
    var BC_scriptName = BC_scriptSrc.split('/')[BC_scriptSrc.split('/').length - 1];
    var BC_path = BC_scriptSrc.replace(BC_scriptName, '');
    class Main {
        constructor() {
            Main.viewMgr = new XWG.ViewMgr();
            Main.update_timeout_max = 5000;
            Main.update_timeout_min = 300;
            Main.isCreated = false;
            Main.isStart = false;
            Main.isInit = false;
        }

        static clearTimeout() {
            if (Main.s_update) {
                clearTimeout(Main.s_update);
                Main.update();
            }
        }

        init(listener){
        	// console.log(123);
            // Main.appid = appid;
            Main.callback = listener;

            Main.viewMgr.mainView.iframe.onload=function(){  
                if(!Main.isInit){
                    // document.getElementById("iframe").contentWindow.postMessage({method: "init",data:{appid:appid,timestamp:timestamp},devId:2},wallet_url);
					Main.isInit = true;
                    Main.listenerCallback("init",{init:true});
                }
                
            }
        }
        start(language){
        	Main.isStart = true;
            Main.viewMgr.mainView.createMask();
            Main.viewMgr.mainView.createIframe(language);
        }
        login(callback = null)
        {
            // console.log("login");
            this.showMain();
            // document.getElementById("iframe").contentWindow.IframeEventClass.login();
			document.getElementById("iframe").src=wallet_url;
			Main.viewMgr.mainView.iframe.onload=function(){
				document.getElementById("iframe").contentWindow.postMessage({method: "login"},wallet_url);
			}
		}
        goLogin(authCode,callback = null)
        {
            // document.getElementById("iframe").contentWindow.IframeEventClass.goLogin(authCode);
            // console.log(authCode);
			document.getElementById("iframe").contentWindow.postMessage({method: "goLogin",data:authCode},wallet_url);
        }
        pay(orderid,callback=null)
        {
            this.showMain();
            // console.log(orderid);
            // document.getElementById("iframe").contentWindow.IframeEventClass.pay(orderid);
			document.getElementById("iframe").src=wallet_url;
			Main.viewMgr.mainView.iframe.onload=function(){
				document.getElementById("iframe").contentWindow.postMessage({method: "pay",data:orderid},wallet_url);
			}
		}
        logout(callback = null)
        {
            this.showMain();
            // document.getElementById("iframe").contentWindow.IframeEventClass.logout();
			document.getElementById("iframe").src=wallet_url;
			Main.viewMgr.mainView.iframe.onload=function(){
				document.getElementById("iframe").contentWindow.postMessage({method: "logout"},wallet_url);
			}
		}
        open(language,callback = null)
        {
            this.showMain();
            // document.getElementById("iframe").contentWindow.IframeEventClass.logout();
            document.getElementById("iframe").src=wallet_url+"?"+language;
        }
        showMain() {
            if (Main.viewMgr.mainView.div.innerHTML == "") {
                return;
            }
            if (Main.viewMgr.iconView) {
                Main.viewMgr.iconView.hidden();
            }
            Main.viewMgr.mainView.show();
        }
        showIcon() {
            if (Main.viewMgr.mainView.div.innerHTML == "") {
                return;
            }
            Main.viewMgr.mainView.hidden();
            // Main.viewMgr.change("IconView");
        }
        hiddenIcon(){
            if (Main.viewMgr.iconView) {
                Main.viewMgr.iconView.hidden();
            }
        }
        static listenerCallback(cmd, data) {
            return __awaiter(this, void 0, void 0, function* () {
                var callback_data = {
                    cmd: cmd,
                    data: data
                };
                Main.callback(JSON.stringify(callback_data));
            });
        }
    }
    Main.platName = "XWG";
    Main.platLoginType = 0;
    Main.resHost = BC_path + "../";
    Main.liveTimeMax = 60 * 60 * 1000;
    XWG.Main = Main;
})(XWG || (XWG = {}));

var XWG;
(function (XWG) {
    class ViewBase {
        constructor() {
            this.isCreated = false;
            this.reset();
        }
        create() { }
        toRefer() { }
        reset() { }
        key_esc() {
            this.return();
        }
        key_enter() { }
        start() {
            if (this.isCreated === false) {
                this.create();
                this.isCreated = true;
                this.parentAdd(this.div);
            }
            this.show();
        }
        remove(timeout = 0, fadeClass = "pc_fadeindown") {
            if (this.s_timeout_remove) {
                return;
            }
            if (timeout) {
                if (fadeClass)
                    this.div.classList.add("pc_fadeindown");
                this.s_timeout_remove = setTimeout(() => {
                    this._remove();
                }, timeout);
            }
            else {
                this._remove();
            }
        }
        _remove() {
            this.s_timeout_remove = null;
            this.parentRemove(this.div);
            this.isCreated = false;
            this.reset();
        }
        return(timeout = 0) {
            this.remove(timeout);
            this.toRefer();
        }
        hidden() {
            this.div.style.display = "none";
        }
        show() {
            this.div.style.display = "";
        }
        isHidden() {
            if (this.div && this.div.style.display == "none") {
                return true;
            }
            return false;
        }
        update() {
            this.parentRemove(this.div);
            this.create();
            this.parentAdd(this.div);
        }
        objCreate(tag) {
            var addElement = document.createElement(tag);
            return addElement;
        }
        ObjAppend(o, tag) {
            o.appendChild(tag);
        }
        objRemove(o, tag) {
            o.removeChild(tag);
        }
        parentAdd(tag) {
            this.ObjAppend(XWG.Main.viewMgr.mainView.div, tag);
        }
        parentRemove(tag) {
            this.objRemove(XWG.Main.viewMgr.mainView.div, tag);
        }
        bodyAppend(tag) {
            document.body.appendChild(tag);
        }
        bodyRemove(tag) {
            document.body.removeChild(tag);
        }
    }
    XWG.ViewBase = ViewBase;
})(XWG || (XWG = {}));

var XWG;
(function (XWG) {
    class IconView extends XWG.ViewBase {
        start() {
            if (this.isCreated === false) {
                this.create();
                this.isCreated = true;
                this.bodyAppend(this.div);
                this.onResize();
            }
            this.show();
        }
        show() {
            this.div.style.display = "";
        }
        reset() {
            this.doDragMove = false;
            if (this.div)
                this.flushProcess(0);
        }
        update() {
        }
        create() {
            this.div = this.objCreate("div");
            this.div.classList.add("pc_icon");
            this.showFail();
            this.div.onclick = () => {
                console.log("[XWG]", '[IconView]', 'onclick, this.doDragMove => ', this.doDragMove);
                if (this.doDragMove == true) {
                    return false;
                }
                this.hidden();
                XWG.Main.viewMgr.mainView.div.classList.remove("pc_windowhide");
                XWG.Main.viewMgr.mainView.show();
                // document.getElementById("iframe").contentWindow.IframeEventClass.openWindow();
				document.getElementById("iframe").src=wallet_url;
				// XWG.Main.viewMgr.mainView.iframe.onload=function(){
				// 		document.getElementById("iframe").contentWindow.postMessage({method: "openWindow"},wallet_url);
				// }
			};
            this.div.onmousemove = () => {
                this.drag();
            };
            this.div.ontouchstart = (ev) => {
                this.dragTouch(ev);
            };
            this.processDiv = this.objCreate("div");
            this.ObjAppend(this.div, this.processDiv);
        }
        remove() {
            this.bodyRemove(this.div);
        }
        removeState() {
            if (this.stateDiv)
                this.objRemove(this.div, this.stateDiv);
        }
        hiddenState() {
            if (this.stateDiv)
                this.stateDiv.style.display = "none";
        }
        showFail() {
            this.div.classList.add("pc_iconfail");
        }
        showSucc() {
            this.div.classList.remove("pc_iconfail");
        }
        flushProcess(count) {
            if (count > 0) {
                this.div.classList.add("pc_iconRecord");
            }
            else {
                this.div.classList.remove("pc_iconRecord");
            }
        }
        dragTouch(ev) {
            var sent = {
                l: 0,
                r: window.innerWidth - this.div.offsetWidth,
                t: 0,
                b: window.innerHeight - this.div.offsetHeight
            };
            var dmW = document.documentElement.clientWidth || document.body.clientWidth;
            var dmH = document.documentElement.clientHeight || document.body.clientHeight;
            var l = sent.l || 0;
            var r = sent.r || dmW - this.div.offsetWidth;
            var t = sent.t || 0;
            var b = sent.b || dmH - this.div.offsetHeight;
            this.doDragMove = false;
            var oEvent = ev.touches[0];
            var sentX = oEvent.clientX - this.div.offsetLeft;
            var sentY = oEvent.clientY - this.div.offsetTop;
            document.ontouchmove = (ev) => {
                var mEvent = ev.touches[0];
                var slideLeft = mEvent.clientX - sentX;
                var slideTop = mEvent.clientY - sentY;
                if (slideLeft <= l) {
                    slideLeft = l;
                }
                if (slideLeft >= r) {
                    slideLeft = r;
                }
                if (slideTop <= t) {
                    slideTop = t;
                }
                if (slideTop >= b) {
                    slideTop = b;
                }
                this.div.style.left = slideLeft + 'px';
                this.div.style.top = slideTop + 'px';
                if (oEvent.clientX != mEvent.clientX || oEvent.clientY != mEvent.clientY) {
                    this.doDragMove = true;
                }
            };
            document.ontouchend = () => {
                document.ontouchmove = null;
            };
        }
        drag() {
            var sent = {
                l: 0,
                r: window.innerWidth - this.div.offsetWidth,
                t: 0,
                b: window.innerHeight - this.div.offsetHeight
            };
            var dmW = document.documentElement.clientWidth || document.body.clientWidth;
            var dmH = document.documentElement.clientHeight || document.body.clientHeight;
            var l = sent.l || 0;
            var r = sent.r || dmW - this.div.offsetWidth;
            var t = sent.t || 0;
            var b = sent.b || dmH - this.div.offsetHeight;
            this.div.onmousedown = (ev) => {
                this.doDragMove = false;
                var oEvent = ev;
                var sentX = oEvent.clientX - this.div.offsetLeft;
                var sentY = oEvent.clientY - this.div.offsetTop;
                document.onmousemove = (ev) => {
                    var mEvent = ev;
                    var slideLeft = mEvent.clientX - sentX;
                    var slideTop = mEvent.clientY - sentY;
                    if (slideLeft <= l) {
                        slideLeft = l;
                    }
                    if (slideLeft >= r) {
                        slideLeft = r;
                    }
                    if (slideTop <= t) {
                        slideTop = t;
                    }
                    if (slideTop >= b) {
                        slideTop = b;
                    }
                    this.div.style.left = slideLeft + 'px';
                    this.div.style.top = slideTop + 'px';
                    if (oEvent.clientX != mEvent.clientX || oEvent.clientY != mEvent.clientY) {
                        this.doDragMove = true;
                    }
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            };
        }
        onResize() {
            window.onresize = () => {
                var windowWidth = window.innerWidth;
                if (parseInt(this.div.style.left) + 64 >= windowWidth) {
                    this.div.style.left = "auto";
                }
            };
        }
    }
    XWG.IconView = IconView;
})(XWG || (XWG = {}));

var XWG;
(function (XWG) {
    class MainView extends XWG.ViewBase {
        start() {
            if (this.isCreated === false) {
                this.create();
                this.isCreated = true;
                this.bodyAppend(this.div);
            }
            if (/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
                if (window.location.href.indexOf("?mobile") < 0) {
                    try {
                        if (/iPad/i.test(navigator.userAgent)) {
                        }
                        else {
                            this.div.classList.add("pc_mobile");
                        }
                    }
                    catch (e) { }
                }
            }
        }
        create() {
            this.div = this.objCreate("div");
            this.div.classList.add("pc_window");
            this.div.style.display = "none";
            this.div.onclick = () => {
                event.stopPropagation();
                // XWG.Main.setLiveTime();
            };
        }
        createMask() {
            if (!this.divMask) {
                // XWG.Main.viewMgr.change("IconView");
                this.divMask = this.objCreate("div");
                this.divMask.classList.add("pc_window_mask");
                this.divMask.onclick = () => {
                    XWG.SDK.showIcon();
                };
                this.ObjAppend(this.div, this.divMask);
            }
        }
        createIframe(language) {
            if (!this.iframe) {
                this.iframe = this.objCreate("iframe");
                this.iframe.setAttribute("src",wallet_url+'?'+language);
                this.iframe.setAttribute("id","iframe");

                if (/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
                    if (window.location.href.indexOf("?mobile") < 0) {
                        try {
                            if (/iPad/i.test(navigator.userAgent)) {
                            }
                            else {
                                this.iframe.classList.add("iframe_mobile");
                            }
                        }
                        catch (e) { }
                    }
                }else{
                    this.iframe.classList.add("iframe_pc");
                }

                this.ObjAppend(this.div,this.iframe);
            }
        }

        changNetType() {
            switch (XWG.Main.netMgr.type) {
                case 1:
                    this.div.classList.remove("pc_windowtest2");
                    break;
                case 2:
                    this.div.classList.add("pc_windowtest2");
                    break;
            }
        }
        remove() {
            this.bodyRemove(this.div);
        }
        hidden() {
            this.div.classList.add("pc_windowhide");
            this.s_timeout_hidden = setTimeout(() => {
                this.div.style.display = "none";
            }, 300);
        }
        show() {
            if (this.s_timeout_hidden)
                clearTimeout(this.s_timeout_hidden);
            this.div.classList.remove("pc_windowhide");
            this.div.style.display = "";
        }
    }
    XWG.MainView = MainView;
})(XWG || (XWG = {}));


var XWG;
(function (XWG) {
    class ViewMgr {
        constructor() {
            this.mainView = new XWG.MainView();
            this.mainView.start();
            this.views = {};
        }
        change(type) {
            switch (type) {
                case "IconView":                
                    if (!this.iconView) {
                        this.iconView = new XWG.IconView();
                        this.views[type] = this.iconView;
                    }
                    this.iconView.start();
                    break;
                // case "LoginView":
                //     if (!this.loginView) {
                //         this.loginView = new XWG.LoginView();
                //         this.views[type] = this.loginView;
                //     }
                //     this.loginView.start();
                //     break;
                // case "PayView":
                //     if (!this.PayView) {
                //         this.PayView = new XWG.PayView();
                //         this.views[type] = this.PayView;
                //     }
                //     if(this.loginView)
                //         this.loginView.hidden();
                //     this.PayView.start();
                //     break;
            }
        }
        removeAll() {
            for (let className in this.views) {
                let v = this.views[className];
                switch (className) {
                    case "IconView":
                        v.reset();
                        break;
                    default:
                        if (v.isCreated) {
                            v.remove();
                        }
                        break;
                }
            }
        }
        update() {
            for (let className in this.views) {
                let v = this.views[className];
                switch (className) {
                    case "PayView":
                        if (v.isCreated) {
                            v.update();
                        }
                        break;
                    default:
                        if (v.isCreated && !v.isHidden()) {
                            v.update();
                        }
                        break;
                }
            }
        }
    }
    XWG.ViewMgr = ViewMgr;
})(XWG || (XWG = {}));

var XWG;
(function(XWG){
	class SDK{
		static init(language,listener){
			if (SDK.is_init === false) {
                SDK.main = new XWG.Main();
                SDK.main.start(language);
                SDK.main.init(listener);
            }
            SDK.is_init = true;
		}
		static showIcon() {
            if (SDK.is_init === false) {
                return;
            }
            this.main.showIcon();
        }
        static hiddenIcon() {
            if (SDK.is_init === false) {
                return;
            }
            this.main.hiddenIcon();
        }
        static login(callback = null) {
            if (SDK.is_init === false) {
                return;
            }
            this.main.login();
        }
        static goLogin(authCode,callback = null) {
            if (SDK.is_init === false) {
                return;
            }
            this.main.goLogin(authCode);
        }
        static pay(orderid,callback = null) {
            if (SDK.is_init === false) {
                return;
            }
            this.main.pay(orderid);
        }
        static logout(callback = null) {
            if (SDK.is_init === false) {
                return;
            }
            this.main.logout();
        }
        static open(language,callback = null) {
            if (SDK.is_init === false) {
                return;
            }
            this.main.open(language);
        }
	}
	SDK.is_init = false;
	XWG.SDK = SDK;
})(XWG || (XWG = {}));
