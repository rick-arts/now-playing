/**
 * 
 * reloadUserInfo.js
 * 
 * @author Rick Arts
 * @since v0.0.1
 * 
 */

let CronJob = require('cron').CronJob;

(new CronJob('10 */5 * * * *', function () {
	FRONTEND_CONTROLLER.reloadUserInfo();
}, null, true, 'UTC')).start();
