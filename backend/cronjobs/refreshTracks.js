/**
 * 
 * refreshTracks.js
 * 
 * @author Rick Arts
 * @since v0.0.1
 * 
 */

let CronJob = require('cron').CronJob;
let pug = require("pug");

(new CronJob('5 */15 * * * *', function () {
	LAST_FM_CONTROLLER.reloadTopTracks((tracks) => {
		FRONTEND_CONTROLLER.refreshTopChart(tracks, 'top_tracks');
	})
}, null, true, 'UTC')).start();

