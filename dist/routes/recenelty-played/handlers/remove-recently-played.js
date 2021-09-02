"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const wallet_video_watch_schema_1 = __importDefault(require("../../sockets/schemas/wallet-video-watch.schema"));
const removeRecentlyPlayed = async (req, res) => {
    try {
        const { wallet, currentFile } = req.params;
        await wallet_video_watch_schema_1.default.updateMany({ wallet, currentFile }, { "$set": { "isActive": false } }, { "multi": true });
        res
            .status(200)
            .contentType("text/json")
            .json({ status: 'ok' });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = removeRecentlyPlayed;
//# sourceMappingURL=remove-recently-played.js.map