/**
 * 
 * auth.cronjob.js
 * 
 * Auth cronjobs
 * 
 * @author Rick Arts
 * @since v0.0.1
 * 
 */

 let CronJob = require('cron').CronJob;
 
 (new CronJob('10 */5 * * * *', function () {
	 LAST_FM_CONTROLLER.reloadUserInfo((info) => {
		 WEBSOCKET_CONTROLLER.broadcastMessage('user_info', info);
	 })
 }, null, true, 'UTC')).start();
 
