var voicelocalId = "";
var voiceserverId = "";
var voicesender = 0;
var voicecansel = false;
var voicestatus = 0;

//alert(returnCitySN["cip"]);ps -ef|grep nginx /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.config
function getGameUrl(){
    return "http://cc.wenzhennet.net/wxinfo/mygame.php";
}
function getWxInfoUrl(){
    return "http://cc.wenzhennet.net/wxinfo/getweixininfo.php";
}
function getWxGameUrl(){
    return "http://cc.wenzhennet.net/startegretgame.php";
}
function getWebUrl(){
    return "http://wenzhennet.com";
}
function getSingPackageUrl(){
    return "http://cc.wenzhennet.net/wxinfo/getsignpackage.php";
}
function getLoalcationUrl(){
    return "http://cc.wenzhennet.net/wxinfo/getlocation.php";
}

function getWxPayUrl(){
    return "http://cc.wenzhennet.net/weixinpay.php";
}
function getDefaulEwmUrl(){
    return "http://cc.wenzhennet.net/sharegameurl/123pyq.jpg";
}

function onCheckStart(callback){
    localStorage.removeItem('cid');
    var channelId = getStr("cid");
    if(channelId != null && channelId != "" && channelId != "0"){
        localStorage.setItem('cid',channelId);
    }
    var isnext = true;

    //检查微信等第三方登入
    if(GameConfig.isWeiXin()){
        var lasttime = localStorage.getItem('lastlogintime');
        var newtime = Date.parse(new Date());
        if(lasttime == null){
            lasttime = newtime;
            localStorage.setItem('lastlogintime',newtime);
        }
        if((newtime-lasttime)/86400000>=5){//大于5天则重新拉去登入信息
            localStorage.removeItem("openiddata");
            localStorage.setItem('lastlogintime',newtime);
        }
        var openiddata = localStorage.getItem('openiddata');
        if(openiddata==null){
            weixinlogingzh(callback);
			isnext = false;
        }else{
            getExdataInfo();
        }
    }
    if(isnext){
        callback();
    }
}

function getExdataInfo() {
	var exdata = getStr("state");
	if(exdata != "" && exdata != null && exdata != "no"){
		var exdataex = exdata.split('_')
		var invit = exdataex[0];
		var roomkey = exdataex[1];
		var roompas = exdataex[2];
		localStorage.setItem('cid',exdataex[3]);
		if(invit != null && invit!="0" && invit!=""){
			localStorage.setItem('invit',invit);
		}
		if(roomkey != null && roomkey!="0" && roomkey!=""){
			localStorage.setItem('roomkey',roomkey);
			localStorage.setItem('roompas',roompas);
		}
	}
}

function wxgetLocation(){
    if(!GameConfig.isWeiXin()){return;}
    //获取地理位置
    wx.getLocation({
        type:'wgs84',
        success: function (res) {
            var posx = res.latitude;
            var posy = res.longitude;
            $.get(getLoalcationUrl()+"?location="+posx+","+posy,function(data){
                var jsonData = JSON.parse(data);
                if(jsonData.status == 0){
                    var address = jsonData.result.address+"_"+jsonData.result.address_component.city+"_"+posx+"_"+posy;
                    localStorage.setItem('address',address);
                }else{
                    localStorage.setItem('address',"");
                }
            });
        },
        cancel:function(res){
            //alert("用户拒绝授权");
            localStorage.setItem('address',"");
        }
    });
}

function payWeiXin(title,fee,attach,gold) {
    if(!GameConfig.isWeiXin()){alert("请在微信公众号里支付！");return;}
    //alert("pay start:"+returnCitySN["cip"]);
    var openiddata = localStorage.getItem('openiddata');
    var openid = JSON.parse(openiddata).openid;
    var ip = returnCitySN["cip"];
    if(ip == null || ip == ""){
        ip = "127.0.0.1";
    }
    var link = "?ip="+ip+"&openid="+openid+"&name="+title+"&fee="+fee+"&attach="+attach;
    $.get(getWxPayUrl()+link,function(data){
        var payinfo = JSON.parse(data);
        if(payinfo.nonceStr){
            WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":payinfo.appId,     //公众号名称，由商户传入     
                "timeStamp":payinfo.timeStamp,  //时间戳，自1970年以来的秒数     
                "nonceStr": payinfo.nonceStr, //随机串     
                "package": payinfo.package,   
                "signType":payinfo.signType, //微信签名方式：     
                "paySign": payinfo.paySign //微信签名 
            },
            function(res){ 
                //alert("paycode:"+res.err_code+"  msg:"+res.err_msg);
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    CompanelVecView.updataUserInfo(gold,title);
                }
            });
        }
    });
}

function CheckImgExists(imgurl){
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    if(ImgObj.fileSize > 0 || (ImgObj.width> 0 && ImgObj.height > 0)){
        return true;
    }else{
        return false;
    }
}

function hideErWeiMa(){
    var img = document.getElementById("alertimg");
    if(img)
    img.style.display = 'none';
}

function showErWeiMa(){
    var img = document.getElementById("alertimg");
    if(img){
        img.style.display = 'block';
    }
}

function showmessage(lvl,msg){
    if(lvl != 5){
        alert("msg:"+msg);
    }
}

//状态：0-无，1-正录音中 2-停止录音 3-正在上传 4-正在下载 5-正在播放
function getRecordStatus(){
    return voicestatus;
}

function startWxRecord(sender){
    if(!GameConfig.isWeiXin()){return -1;}
    voicelocalId = "";
    voicesender = sender;
    voicecansel = false;
    voicestatus = 1;
    wx.startRecord({
        success: function (res) {
            if(localStorage.getItem('wxcanrecoder') == null){
                localStorage.setItem('wxcanrecoder',1);
            }
        },
        cancel:function(res){
            if(localStorage.getItem('wxcanrecoder') != null){
                localStorage.removeItem('wxcanrecoder');
            }
            alert("用户拒绝授权录音");
            voicestatus = 0;
        }
    });

    // wx.onVoiceRecordEnd({
    // // 录音时间超过一分钟没有停止的时候会执行 complete 回调
    //     complete: function (res) {
    //         voicelocalId = res.localId; 
    //         uploadWxRecord();
    //     }
    // });
}

function stopWxRecord(){
    if(!GameConfig.isWeiXin()){return;}
    if(localStorage.getItem('wxcanrecoder') == null){return;}
    voicestatus = 2;
    wx.stopRecord({
    success: function (res) {
        if(!voicecansel){
            voicelocalId = res.localId;
            uploadWxRecord();
        }
        voicestatus=0;
    }
    });
}

function cancelWxRecord(){
    voicelocalId = "";
    voicecansel = true;
    stopWxRecord();
}

function uploadWxRecord(){
    if(!GameConfig.isWeiXin()){return;}
    if(voicelocalId == "" || voicecansel){return;}
    voicestatus = 3;
    wx.uploadVoice({
    localId: voicelocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: 0, // 默认为1，显示进度提示
    success: function (res) {
        voiceserverId = res.serverId; // 返回音频的服务器端ID
        //同步消息到游戏中
        //var context = egret.MainContext.instance;
        //context.stage.dispatchEventWith("jsCallYuYin", false,voiceserverId+"_"+voicesender);
        GameRecordView.playerVoiceSend(voiceserverId,voicesender);
        //alert("已上传："+voiceserverId);
        voicestatus=0;
    }
    });

}

function downAndPlayWxRecord(voiceid){
    if(!GameConfig.isWeiXin()){return;}   
    if(voiceid == "" || voiceid == null){return;}
    if(voiceid == voiceserverId){
		//alert(voiceid);
        playWxRecord(voicelocalId);
        return;
    }
    voicestatus = 4;
    wx.downloadVoice({
    serverId: voiceid, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
    isShowProgressTips: 0, // 默认为1，显示进度提示
    success: function (res) {
        var localId = res.localId; // 返回音频的本地ID
        voicestatus=0;
        playWxRecord(localId);
    }
    });
}

function playWxRecord(voiceid){
    if(!GameConfig.isWeiXin()){return;}
    if(voiceid == null || voiceid==""){return;}
    voicestatus = 5;
    wx.playVoice({
        localId: voiceid // 需要播放的音频的本地ID，由stopRecord接口获得
    });
    wx.onVoicePlayEnd({
        complete:function(res){
           voicestatus = 0;
        }
    })
    //alert(voiceid);
}

/**
 * 分享接口
 * @param title 标题
 * @param desc 描述
 * @param imgurl 分享消息的图片
 * @param linke 可携带邀请码,形式invit=数值&name=数值 多个参数用&形式链接起来
 */

function wxweiduanShare(title, desc, imgurl, linke) { 
    if (imgurl == null || imgurl == ""){
        imgurl = getDefaulEwmUrl();
    }

    var shareurl = getGameUrl();
    linke = shareurl+"?state="+linke;
    if(!GameConfig.isWeiXin()){
        var isweiduan = localStorage.getItem('isweiduan');
        if(isweiduan == "1"){
            myInterfaceName.wxshare(title, desc, imgurl, linke);
        }
        return;
    }
}

function wxShare(title, desc, imgurl, linke) { 
    if (imgurl == null || imgurl == ""){
        imgurl = getDefaulEwmUrl();
    }

    var shareurl = getGameUrl();
    linke = shareurl+"?state="+linke;
    //alert(linke);
    var shareData = {
    title: title,                         //必填,分享标题
    desc: desc,                          //选填,分享描述
    imgUrl: imgurl,   //选填,分享图片
    link: linke, //必填,可跟get参数,禁止直接使用location.href
    success: function () {
        // 用户确认分享后执行的回调函数
        //alert("已分享");
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
        //alert("已取消");
    }
    };
    wx.ready(function () {
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        //wx.onMenuShareQZone(shareData);
    });
    wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //alert("errorMSG:"+res);
    });
}

function qqlogin(){
    alert("暂未开放！");
}

function weixinlogin(){
	//微端的微信 
	var openiddata = localStorage.getItem('openiddata');
	if(openiddata==null){
		CallJavaMethod("1");
	}else{
		LoginView.onWeiXinlogin(openiddata);
	}
}

function weiduanlocation(){
    CallJavaMethod("4");
}

function weixinlogingzh(callback){
	var code = getStr("code");
	if(code != ""){
		$.get(getWxInfoUrl()+"?code="+code+"&from=weixin",function(data){
			var userinfo = JSON.parse(data);
			if(userinfo.unionid){
				localStorage.setItem('openiddata',data);
				jsonData = data;
				getExdataInfo();
				callback();
			}
		});
	}else{
		window.location.href = getWxGameUrl()+"?state="+getStr("state");
		return;
	}
}

function guestlogin() {
    var openid = localStorage.getItem('uuid');
    if(openid == null) {
        openid = uuid();
        localStorage.setItem('uuid',openid);
    }
}

function CallJavaMethod(parm){//1-微端登入，2-获取gps坐标
    myInterfaceName.showToast(parm);
}

function showInfoFromJava(parm){
    //微端登入
    var code = parm;
    if(code != ""){
        $.get(getWxInfoUrl()+"?code="+code+"&from=weiduan",function(data){
            var userinfo = JSON.parse(data);
            if(userinfo.unionid){
                localStorage.setItem('openiddata',data);
                LoginView.onWeiXinlogin(data);
            }else{
                alert(data);
                return;
            }
        });
    }
}

function posInfoFromWeiDuan(str){//gps坐标
    if(str.search("_") >= 0){
        var info = str.split('_');
        var posx = info[0];
        var posy = info[1];
        $.get(getLoalcationUrl()+"?location="+posx+","+posy,function(data){
            var jsonData = JSON.parse(data);
            if(jsonData.status == 0){
                var address = jsonData.result.address+"_"+jsonData.result.address_component.city+"_"+posx+"_"+posy;
                localStorage.setItem('address',address);
            }else{
                localStorage.setItem('address',"");
            }
        });
    }
}

function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getUid() {
    var uuid = localStorage.getItem('uuid');
    if (uuid == null) {
        uuid = uuid();
        localStorage.setItem('uuid', uuid);
    }
    return uuid;
}

function getStr(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return decodeURI(decodeURIComponent(decodeURI(r[2]))); return "";
}

function cleanAlldata() {
    localStorage.removeItem("openiddata");
    localStorage.removeItem("invit");
    localStorage.removeItem("roomkey");
}