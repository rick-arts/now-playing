/**
 * 
 * refreshSong.js
 * 
 * @author Rick Arts
 * @since v0.0.1
 * 
 */

let CronJob = require('cron').CronJob;

(new CronJob('*/5 * * * * *', function () {
	LAST_FM_CONTROLLER.reloadLatestSong((song, needs_refresh) => {
		if (needs_refresh) {
			WEBSOCKET_CONTROLLER.broadcastMessage('latest_song', song);
			FRONTEND_CONTROLLER.reloadLatestTracks();
			FRONTEND_CONTROLLER.reloadUserInfo();
		}
	})
}, null, true, 'UTC')).start();


(new CronJob('5 */5 * * * *', function () {
	FRONTEND_CONTROLLER.reloadLatestTracks();
}, null, true, 'UTC')).start();


