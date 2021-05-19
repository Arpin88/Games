/**
 * by tmh
 */


declare function cleanAlldata();
declare function showmessage(lvl:number,msg:string);

declare function getGameUrl():string;
declare function getSingPackageUrl():string;

declare function wxgetLocation();
declare function weiduanlocation();

declare function hideErWeiMa();
declare function showErWeiMa();

declare function weixinlogin();
declare function qqlogin();
declare function payWeiXin(title:string,fee:string,attach:string,gold:number);

declare function startWxRecord(sender:number);
declare function stopWxRecord();
declare function cancelWxRecord();

declare function wxShare(v1:string,v2:string,v3:string,v4:string);
declare function wxweiduanShare(v1:string,v2:string,v3:string,v4:string);

declare function getRecordStatus():number;
declare function downAndPlayWxRecord(voiceid:string);



