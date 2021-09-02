"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const wallet_video_watch_schema_1 = __importDefault(require("../../sockets/schemas/wallet-video-watch.schema"));
const recentlyPlayed = async (req, res) => {
    try {
        const { wallet } = req.params;
        const fiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 5));
        const recentlyPlayed = await wallet_video_watch_schema_1.default.find({
            wallet,
            lastUpdate: {
                $gte: fiveDaysAgo,
                $lt: new Date()
            },
            isActive: true
        }).populate('currentFile');
        const filteredRecentlyPlayed = recentlyPlayed
            .reverse()
            .filter((v, i, a) => a.findIndex(t => (t.currentFile._id === v.currentFile._id)) === i);
        res
            .status(200)
            .contentType("text/json")
            .json({ recentlyPlayed: filteredRecentlyPlayed, totalItems: filteredRecentlyPlayed.length });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = recentlyPlayed;
//# sourceMappingURL=recently-played.js.map