/**
 * 
 * frontend.controller.js
 * 
 * Frontend controller
 * 
 * @author Rick Arts
 * @since v1.0.0
 * 
 */

var fs = require("fs");
exports.serve404 = (req, res, next) => res.render('index');
let pug = require("pug");

const controller = this;

exports.reloadLatestTracks = () => {
	LAST_FM_CONTROLLER.reloadLatestTracks((tracks) => {
		if (tracks.length == 0) return;
		controller.refreshTopChart(tracks, 'latest_tracks', true);
	})
}

exports.reloadUserInfo = () => {
	LAST_FM_CONTROLLER.reloadUserInfo((info) => {
		WEBSOCKET_CONTROLLER.broadcastMessage('user_info', info);
	})
}

exports.refreshTopChart = (content, channel = '', force_images = false) => {
	let html = pug.renderFile('./frontend/views/responses/top-chart.pug', { content, force_images });
	WEBSOCKET_CONTROLLER.broadcastMessage(channel, { html });
}