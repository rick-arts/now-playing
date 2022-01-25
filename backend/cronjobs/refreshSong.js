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
 
 (new CronJob('*/5 * * * * *', function () {
	 LAST_FM_CONTROLLER.reloadLatestSong((song, needs_refresh) => {
		 if(needs_refresh) WEBSOCKET_CONTROLLER.broadcastMessage('latest_song', song);
	 })
 }, null, true, 'UTC')).start();
 
