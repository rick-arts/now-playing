/**
 * 
 * lastfm.controller.js
 * 
 * This is the lastfm controller
 * 
 * @author Rick Arts
 * @since v1.0.0
 * 
 */

const https = require("https");
const func = require('../../lib/main.func');
const controller = this;

let latest_track = {};
let user_info = {};
let reload_tick = -1;
let top_artists = [];
let top_tracks = [];
let latest_tracks = [];

exports.callApi = (api_route, data = {}, resolve) => {
	if (api_route == "" || api_route == null || api_route === undefined) resolve(null);

	headers = {
		...{
			"Content-Type": "application/json",
		},
	};

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
		resolve({ success: "error" });
	});

	req.end();
};


exports.getLatestSong = (resolve) => resolve(latest_track)

exports.reloadLatestSong = (resolve) => {

	if (reload_tick == '-1' || latest_track.nowplaying || (reload_tick > 2)) {
		reload_tick = 0;

		controller.callApi('user.getrecenttracks', { limit: 2 }, (response) => {
			if (!response.recenttracks || !response.recenttracks.track || !response.recenttracks.track[0]) return resolve(null);

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
			if (current_track.attr) current_track.nowplaying = current_track.attr.nowplaying;
			if (current_track.nowplaying) current_track.title = "Now Playing";

			if (track.image) {
				let image = track.image[3];
				if (image == undefined) image = track.image[0];
				current_track.image = image["#text"].replace('300x300', '600x600');
			}

			needs_refresh = (latest_track.artist != current_track.artist || latest_track.song != current_track.song || latest_track.title != current_track.title)

			latest_track = current_track;

			resolve(current_track,needs_refresh);
		})
	}
	else reload_tick++;

	resolve(latest_track, false);
}

exports.preLoad = () => {
	if(process.env.DEVELOPMENT) return;
	controller.reloadLatestSong(() => { });
	controller.reloadUserInfo(() => { });
	controller.reloadTopArtists(() => {});
	controller.reloadTopTracks(() => {});
	controller.reloadLatestTracks(() => {});
}

exports.getUserInfo = (resolve) => resolve(user_info);

exports.reloadUserInfo = (resolve) => {
	controller.callApi('user.getinfo', {}, (response) => {
		if (!response || !response.user) return resolve({ name: '', scrobbles: 0 });
		user_info = { name: response.user.realname, scrobbles: response.user.playcount };
		resolve(user_info)
	})
} 

exports.getTopArtists = (resolve) => resolve(top_artists);
exports.getTopTracks = (resolve) => resolve(top_tracks);


exports.reloadTopArtists = (resolve) => {

	controller.callApi('user.gettopartists', {limit: 6, period: '7day'}, (response) => {
		if (!response || !response.topartists) return resolve([]);

		top_artists = [];

		for(artist of response.topartists.artist){
			let object = {name: artist.name};
			let image = artist.image[3];
			if (image == undefined) image = artist.image[0];
			object.image = image["#text"].replace('300x300', '600x600');
			top_artists.push(object);
		}

		resolve(top_artists);
	})
} 

exports.reloadTopTracks = (resolve) => {

	controller.callApi('user.gettoptracks', {limit: 6, period: '7day'}, (response) => {
		if (!response || !response.toptracks) return resolve([]);
		
		top_tracks = [];

		for(track of response.toptracks.track){
			let object = {name: track.name,artist: track.artist.name};
			let image = track.image[3];
			if (image == undefined) image = track.image[0];
			object.image = image["#text"].replace('300x300', '600x600');
			top_tracks.push(object);
		}
		resolve(top_tracks);
	})
} 


exports.getLatestTracks  = (resolve) => resolve(latest_tracks)


exports.reloadLatestTracks = (resolve) => {
		controller.callApi('user.getrecenttracks', { limit: 13 }, (response) => {
			if (!response.recenttracks || !response.recenttracks.track) return resolve([]);
			if(response.recenttracks.track.length > 12)	delete response.recenttracks.track[0];
			if(response.recenttracks.track.length > 13)	delete response.recenttracks.track[13];
			latest_tracks = [];
			for(track of response.recenttracks.track){
				if(track == undefined) continue;
				let object = {name: track.name,artist: track.artist["#text"]};
				let image = track.image[3];
				if (image == undefined) image = track.image[0];
				object.image = image["#text"].replace('300x300', '600x600');
				latest_tracks.push(object);
			}
			resolve(latest_tracks);
		})
}