const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 80;

const { version } = require('./package.json');
global.VERSION = version;

app.use(cors());

const http = require('http');
const server = http.createServer(app);
const {WebSocketServer} = require('ws');
global.WEBSOCKET = new WebSocketServer({server});

global.LAST_FM_CONTROLLER = require("./backend/controllers/lastfm.controller");
global.FRONTEND_CONTROLLER = require("./frontend/controllers/frontend.controller");
global.WEBSOCKET_CONTROLLER = require("./backend/controllers/websocket.controller.js");
global.SETTINGS_CONTROLLER = require("./backend/controllers/settings.controller.js");

app.use("/api", require("./backend/routers/main.router"));
app.use("", require("./frontend/routers/main.router"));


app.set('view engine', 'pug');
app.set('views', './frontend/views')

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('./backend/cronjobs/cronjobs');

LAST_FM_CONTROLLER.preLoad();