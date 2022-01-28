/**
 * 
 * refreshArtists.js
 * 
 * @author Rick Arts
 * @since v0.0.1
 * 
 */

let CronJob = require('cron').CronJob;

(new CronJob('5 */15 * * * *', function () {
	LAST_FM_CONTROLLER.reloadTopArtists((artists) => {
		FRONTEND_CONTROLLER.refreshTopChart('top_artists', artists);
	})
}, null, true, 'UTC')).start();

