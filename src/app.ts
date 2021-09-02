import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const { Server } = require("socket.io");
var mongoose = require("mongoose");
var Model = require("./models/Schema.model").Model;

//routes
import routeUpload from './routes/upload';
import routeDownload from './routes/download';
import routeExplore from './routes/explore';
import routeRecentlyPlayed from './routes/recenelty-played';
import routeStatics from './routes/statics';
import routePacks from './routes/packs';
import routeTokens from './routes/tokens';
import routeCategories from './routes/categories';
import initDBConnection from './lib/MongoDB';
import timePlayedSocket from './routes/sockets/timePlayed.socket';

// Init DB => 
initDBConnection();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use((req, res, next) => {
    console.log('REQUEST INCOMING')
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

app.use('/api/upload', routeUpload);
app.use('/api/download', routeDownload);
app.use('/api/explore', routeExplore);
app.use('/api/recently-played', routeRecentlyPlayed);
app.use('/api/statics', routeStatics);
app.use('/api/packs', routePacks);
app.use('/api/tokens', routeTokens);
app.use('/api/categories', routeCategories);
app.use('api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
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

    timePlayedSocket(io, socket);
});

//schema mongoose
var User = require("")
var Model = mongoose.Model("Model", categorie_schema);
module.exports.Model = Model;
