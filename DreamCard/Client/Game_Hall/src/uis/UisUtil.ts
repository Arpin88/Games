
declare var uis:any;

/**
 * 初始化任务
 */
export async function init(language:String,token:String,expiresTime:Number){
	try{
		if('zh_CN'==language){
			uis.initZH({
				appId: '238685257602228224',
				appKey: '08241592430cca97551a1a66',
				encryptionKey: 'AQABAwKlJFCxH29lkeha4UgTItMYWBgNfHfns1sVZLwagjXYliSWBaJ40CUzDyUstFIFnqc6NYimYrHYk+L+EE0svvep9yUjYeBbY2Ko6Ih760S/Mp/TFWLmCOv0MO21JAtpmjHl9uNpKTA5K8GZkPQT0nrpjBaTHtxcJYVHcmIk/n/xoQCBgQKJgTAAjYEDAAUBAQEN94ZIhioJBg0wn4Ew/10AogE=',
				language: 'zh_CN',
			})
		}else{
			uis.initZH({
				appId: '238685257602228224',
				appKey: '08241592430cca97551a1a66',
				encryptionKey: 'AQABAwKlJFCxH29lkeha4UgTItMYWBgNfHfns1sVZLwagjXYliSWBaJ40CUzDyUstFIFnqc6NYimYrHYk+L+EE0svvep9yUjYeBbY2Ko6Ih760S/Mp/TFWLmCOv0MO21JAtpmjHl9uNpKTA5K8GZkPQT0nrpjBaTHtxcJYVHcmIk/n/xoQCBgQKJgTAAjYEDAAUBAQEN94ZIhioJBg0wn4Ew/10AogE=',
				language: 'en_US',
			})
		}
        await this.setGatewayAccessToken(token,expiresTime);
        // 注册任务完成的监听事件
	}catch(e){
		console.error(e);
	}
}

// 设置用户的token
async function setGatewayAccessToken(token:String,expiresTime:Number) {
	// console.log(token)
	if (token) {
		return await uis.setGatewayAccessToken(token, expiresTime);
	}
	return await Promise.resolve();
}

/**
 * 获取每日任务列表
 */
export function getDailyMissionTasks() {
	uis.request.getGroupedTaskables('239441082461515776').then(response => {
        if (response.items && response.items.length !== 0) {
          return response.items;
        }
    })
}

/**
 * 获取签到任务列表
 */
export function getDailySigninTasks() {
	uis.request.getGroupedTaskables('239685607616471040').then(response => {
        if (response.items && response.items.length !== 0) {
          return response.items;
        }
    })
}

/**
 * 获取升级奖励任务列表
 */
export function getLevelRewardTasks() {
	uis.request.getGroupedTaskables('239685725094731776').then(response => {
        if (response.items && response.items.length !== 0) {
          return response.items;
        }
    })
}

// 获取用户未领取的奖励列表
export function getUserUnclaimedRewards(page = 1, perPage = 3) {
	uis.request.listUserUnclaimedRewards(page, perPage).then(response => {
		console.log(response)
		return response;
	})
}

// 获取用户的奖励列表
export function getUserRewardsList(page = 1, perPage = 30, rewardType = 1) {
	return uis.request.listUserRewards(page, perPage, rewardType).then(response => {
		// console.log(response)
		return response;
	})
}

// 领取奖励
export function claimUserReward(rewardId,callBack=null) {
	uis.request.claimUserUnclaimedReward(rewardId).then(response => {
		// console.log(response)
		if (typeof callBack == 'function') {
			callBack(response);
		}
	})
}


// 推送签到事件
export function pushSignInEvent(callBack = null) {
	uis.request.pushEvent('SignIn').then(response => {
		if (typeof callBack == 'function') {
			callBack(response);
		}
	})
}

// 推送首充事件
export function pushRechargeEvent(callBack = null) {
	uis.request.pushEvent('Recharge').then(response => {
		if (typeof callBack == 'function') {
			callBack(response);
		}
	})
}

// 推送每日战斗完成事件(异步的，防止出现不能访问而造成的报错)
export async function pushBattleEvent(callBack = null) {
	await uis.request.pushEvent('Battle').then(response => {
		if (callBack!=null&&typeof callBack == 'function') {
			callBack(response);
		}
	})
}


// 推送等级提升事件(注意填写增量,异步的，防止出现不能访问而造成的报错)
export async function pushUpLvlEvent(lvl,callBack = null) {
	await uis.request.pushEventWithParams('Lvl',  {lvl: lvl}).then(response => {
		// console.log(response)
		if (callBack!=null&&typeof callBack == 'function') {
			callBack(response);
		}
	})
}



    // 吊销 UIS 访问令牌。
export function revokeAccessToken() {
	uis.request.revokeAccessToken()
}
