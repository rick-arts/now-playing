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

(new CronJob('*/5 * * * * *', function () {
	LAST_FM_CONTROLLER.reloadLatestSong((song, needs_refresh) => {
		if (needs_refresh) {
			WEBSOCKET_CONTROLLER.broadcastMessage('latest_song', song);

			LAST_FM_CONTROLLER.reloadLatestTracks((tracks) => {
				if (tracks.length == 0) return;
				let html = pug.renderFile('./frontend/views/responses/top-chart.pug', { content: tracks, force_images: true });
				WEBSOCKET_CONTROLLER.broadcastMessage('latest_tracks', { html });
			})

			LAST_FM_CONTROLLER.reloadUserInfo((info) => {
				WEBSOCKET_CONTROLLER.broadcastMessage('user_info', info);
			})

		}
	})
}, null, true, 'UTC')).start();