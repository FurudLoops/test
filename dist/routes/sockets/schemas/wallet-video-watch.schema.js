"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletVideoWatchSchema = new mongoose_1.Schema({
    wallet: String,
    timePlayed: Number,
    session: String,
    timeViewed: Number,
    currentFile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FileUpload'
    },
    lastUpdate: Date,
    isActive: Boolean
});
const WalletVideoWatch = mongoose_1.model('WalletVideoWatch', walletVideoWatchSchema);
exports.default = WalletVideoWatch;
//# sourceMappingURL=wallet-video-watch.schema.js.map