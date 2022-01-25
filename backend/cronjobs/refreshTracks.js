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
 
 (new CronJob('5 30 */4 * * *', function () {
	 LAST_FM_CONTROLLER.reloadTopTracks((artists) => {
		 let html = pug.renderFile('./frontend/views/responses/top-chart.pug', {content: artists});
		 WEBSOCKET_CONTROLLER.broadcastMessage('top_tracks', {html});
	 })
 }, null, true, 'UTC')).start();
 
