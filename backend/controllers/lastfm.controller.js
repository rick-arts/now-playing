/**
 * 
 * lastfm.controller.js
 * 
 * This is the lastfm controller
 * 
 * @author Roefja
 * @since v1.0.0
 * 
 */

const https = require("https");
const func = require('../../lib/main.func');
const controller = this;

let latest_track = {};
let user_info = {};

exports.callApi = (api_route, data = {}, resolve) => {
	if (api_route == "" || api_route == null || api_route === undefined) resolve(null);

	headers = {
		...{
			"Content-Type": "application/json",
		},
	};

	// $endpoint = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' . $user . '&limit=2&api_key=' . $key . '&format=json';

	data = {
		...data,
		method: api_route,
		user: process.env.LAST_FM_USER,
		api_key: process.env.LAST_FM_API_KEY,
		format: "json"
	}

	const options = {
		hostname: "ws.audioscrobbler.com",
		port: 443,
		method: "GET",
		path: '/2.0/?' + (new URLSearchParams(data)).toString(),
		headers,
		timeout: 1
	};

	const req = https.request(options, (res) => {
		const body = [];
		res.on("data", (chunk) => {
			body.push(chunk);
		});
		res.on("end", (data) => {
			response = func.parseValidJSON(Buffer.concat(body).toString("utf8"));
			response.statusCode = res.statusCode;
			resolve(response);
		});
	});

	req.on("error", (error) => {
		console.error(error);
		resolve({ success: "error" });
	});

	req.end();
};


exports.getLatestSong = (resolve) => resolve(latest_track)

exports.reloadLatestSong = (resolve) => {
	controller.callApi('user.getrecenttracks', { limit: 2 }, (response) => {
		if(!response.recenttracks || !response.recenttracks.track || !response.recenttracks.track[0]) return resolve(null);
		
		const track = response.recenttracks.track[0];
		
		let current_track = {
			artist: track.artist['#text'],
			song: track.name,
			url: track.url,
			attr: track['@attr'],
			title: "Last Played",
			nowplaying: false,
			image: null
			
		};
		if(current_track.attr) current_track.nowplaying = current_track.attr.nowplaying;
		if(current_track.nowplaying) current_track.title = "Now Playing";
		
		if(track.image){
			let image = track.image[3];
			if(image == undefined) image = track.image[0];
			current_track.image = image["#text"].replace('300x300', '600x600');
		}

		latest_track = current_track;
		
		resolve(current_track);
	})
}

exports.preLoad = () => {
	controller.reloadLatestSong(() => {});
	controller.reloadUserInfo(() => {});
}

exports.getUserInfo = (resolve) => resolve(user_info);

exports.reloadUserInfo = (resolve) => {
	controller.callApi('user.getinfo', { }, (response) => {
		if(!response || !response.user) return resolve({name: '', scrobbles: 0});
		user_info = {name: response.user.realname, scrobbles: response.user.playcount};
		resolve(user_info)
	})
} 