"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const { Server } = require("socket.io");
//routes
const upload_1 = __importDefault(require("./routes/upload"));
const download_1 = __importDefault(require("./routes/download"));
const explore_1 = __importDefault(require("./routes/explore"));
const recenelty_played_1 = __importDefault(require("./routes/recenelty-played"));
const statics_1 = __importDefault(require("./routes/statics"));
const packs_1 = __importDefault(require("./routes/packs"));
const tokens_1 = __importDefault(require("./routes/tokens"));
const MongoDB_1 = __importDefault(require("./lib/MongoDB"));
const timePlayed_socket_1 = __importDefault(require("./routes/sockets/timePlayed.socket"));
// Init DB => 
MongoDB_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log('REQUEST INCOMING');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token, language');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
app.use('/api/upload', upload_1.default);
app.use('/api/download', download_1.default);
app.use('/api/explore', explore_1.default);
app.use('/api/recently-played', recenelty_played_1.default);
app.use('/api/statics', statics_1.default);
app.use('/api/packs', packs_1.default);
app.use('/api/tokens', tokens_1.default);
app.use('api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
//Sockets
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('getTokens', () => {
        io.emit('tokensPrize', 'reset');
    });
    timePlayed_socket_1.default(io, socket);
});
//# sourceMappingURL=app.js.map