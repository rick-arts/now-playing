const ws = new WebSocket(WEBSOCKET_URL);

ws.onmessage = function (event) {
	const data = JSON.parse(event.data);

	if (data.channel == "latest_song") {
		refreshSong(data);
	}
	else if (data.channel == "user_info") {
		refreshScrobbles(data);
	}
	else if (data.channel == "top_artists") {
		refreshTopArtists(data);
	}
	else if (data.channel == "top_tracks") {
		refreshTopTracks(data);
	}

	else if (data.channel == "latest_tracks") {
		refreshLatestTracks(data);
	}

	else if (data.channel == "disco") {
		setDisco(data);
	}

	else{
		console.log(data);
	}
};

ws.onclose = function () {
	setTimeout(function () {
		location.reload();
	}, 5000)
}

ws.onerror = function () {
	setTimeout(function () {
		location.reload();
	}, 5000)
}

function refreshSong(data) {
	$("#latest_song .stats-song").html(data.song);
	$("#latest_song .stats-artist").html(data.artist);
	$("#latest_song .stats-title").html(data.title);
	if(data.image !== null && data.image != '') $("#latest_song .stats-content_left").removeClass("hide")
	else $("#latest_song .stats-content_left").addClass('hide');
	$("#latest_song .stats-content_left").css('background-image', 'url("' + data.image + '")')
}

function refreshScrobbles(data) {
	$("#scrobbles .stats-value").html(data.scrobbles);
}

function refreshTopArtists(data) {
	$("#top-artists .top-chart-content").replaceWith(data.html);
}

function refreshTopTracks(data) {
	$("#top-tracks .top-chart-content").replaceWith(data.html);
}


function refreshLatestTracks(data) {
	$("#latest-tracks .top-chart-content").replaceWith(data.html);
}

function setDisco(data){
	if(data.disco === true) $("body").addClass('disco');
	else $("body").removeClass('disco');
}
