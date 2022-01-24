const ws = new WebSocket(`ws://${location.host}:8080`);

ws.onmessage = function (event) {
	const data = JSON.parse(event.data);

	if(data.channel == "latest_song"){
		refreshSong(data);
	}
	else if(data.channel == "user_info"){
		refreshScrobbles(data);
	}
	
};

ws.onclose = function(){
	setTimeout(function(){
		location.reload();
	},5000)
}

ws.onerror = function(){
	setTimeout(function(){
		location.reload();
	},5000)
}

function refreshSong(data){
	$("#latest_song .stats-song").html(data.song);
	$("#latest_song .stats-artist").html(data.artist);
	$("#latest_song .stats-title").html(data.title);
	$("#latest_song .stats-content_left").css('background-image', 'url("'+data.image+'")')
}

function refreshScrobbles(data){
	$("#scrobbles .stats-value").html(data.scrobbles);
}

