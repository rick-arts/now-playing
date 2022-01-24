wss = WEBSOCKET;

const controller = this;

wss.on('connection', function connection(ws) {
  //ws.send(JSON.stringify({test: "yesrs"}));
	//controller.broadcastMessage('testchannel', {test: 1});
});


exports.broadcastMessage = (channel, data) => {
	wss.clients.forEach(function each(client) {
		if (client.readyState) client.send(JSON.stringify({...data, channel}));
	});
}