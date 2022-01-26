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
let pug = require("pug");

(new CronJob('*/2 * * * * *', function () {
	let disco = SETTINGS_CONTROLLER.getSetting('disco');
	WEBSOCKET_CONTROLLER.broadcastMessage('disco', {disco});	
}, null, true, 'UTC')).start();


