wss = WEBSOCKET;

const controller = this;

exports.broadcastMessage = (channel, data) => {
	wss.clients.forEach(function each(client) {
		if (client.readyState) client.send(JSON.stringify({...data, channel}));
	});
}