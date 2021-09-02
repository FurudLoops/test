"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_video_watch_schema_1 = __importDefault(require("./schemas/wallet-video-watch.schema"));
function timePlayedSocket(io, socket) {
    let timeStarted = new Map();
    let timeStartedDB = new Map();
    let timePlayed = new Map();
    let currentWallet;
    let currentFile;
    socket.on('timePlayed', async (data) => {
        currentWallet = data.wallet;
        currentFile = data.currentFileId;
        let videoWatch = {
            wallet: data.wallet,
            active: data.active,
            session: socket.id,
            currentFile,
            timeViewed: timePlayed.get(currentWallet) || 0,
            lastUpdate: new Date(),
            isActive: true
        };
        if (data.active) {
            const videoWatchDBObject = await wallet_video_watch_schema_1.default.findOne({ wallet: currentWallet, session: socket.id, currentFile: data.currentFileId });
            if (!videoWatchDBObject) {
                await new wallet_video_watch_schema_1.default(videoWatch).save();
            }
            timeStarted.set(currentWallet, new Date().getTime() / 1000);
            timeStartedDB.set(currentWallet, new Date().getTime() / 1000);
        }
        else {
            const videoWatchDBObject = await wallet_video_watch_schema_1.default.findOne({ wallet: currentWallet, session: socket.id, currentFile: data.currentFileId });
            const playedFor = new Date().getTime() / 1000 - timeStartedDB.get(currentWallet);
            videoWatch.timeViewed = ((videoWatchDBObject === null || videoWatchDBObject === void 0 ? void 0 : videoWatchDBObject.timeViewed) || 0) + playedFor;
            await wallet_video_watch_schema_1.default.findOneAndUpdate({ wallet: currentWallet, session: socket.id, currentFile: data.currentFileId }, videoWatch);
            timeStarted.set(currentWallet, 0);
            timeStartedDB.set(currentWallet, 0);
        }
    });
    setInterval(function () {
        if (timeStarted.get(currentWallet) > 0) {
            const playedFor = new Date().getTime() / 1000 - timeStarted.get(currentWallet);
            timeStarted.set(currentWallet, -1);
            // add the new number of seconds played
            timePlayed.set(currentWallet, playedFor);
            io.emit(currentWallet, (timePlayed.get(currentWallet) / 10));
            timeStarted.set(currentWallet, new Date().getTime() / 1000);
            timePlayed.set(currentWallet, 0);
        }
    }, 1000);
    socket.on('disconnect', () => {
        timeStarted.set(currentWallet, 0);
        timeStartedDB.set(currentWallet, 0);
    });
}
exports.default = timePlayedSocket;
//# sourceMappingURL=timePlayed.socket.js.map