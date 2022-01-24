
const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
  }
});

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