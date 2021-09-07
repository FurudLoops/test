"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const wallet_video_watch_schema_1 = __importDefault(require("../../sockets/schemas/wallet-video-watch.schema"));
const fileUpload_schema_1 = __importDefault(require("../../upload/handlers/schemas/fileUpload.schema"));
const getDashboardStatics = async (req, res) => {
    try {
        const { userId } = req.params;
        const filesToSearch = await fileUpload_schema_1.default.find({ user: userId }).select("_id");
        const videosData = await wallet_video_watch_schema_1.default.find()
            .where('currentFile')
            .in([...filesToSearch]);
        const totalViews = videosData.length;
        const uniqViews = new Set();
        const uniqViewsSession = new Set();
        videosData.forEach(({ wallet, session }) => {
            uniqViews.add(wallet);
            uniqViewsSession.add(wallet + session);
        });
        const totalTimeView = videosData.reduce((acc, val) => ({ timeViewed: acc.timeViewed + val.timeViewed })).timeViewed;
        const tokensEarned = totalTimeView * 0.02;
        const avgTokensEarnedPerVideo = (totalTimeView / totalViews) * 0.02;
        const accountInfo = {
            accountType: 'normal'
        };
        const videosInfo = {
            totalViews,
            uniqViews: [...uniqViews.values()].length,
            uniqViewsSession: [...uniqViewsSession.values()].length,
            totalTimeView,
            avgTimeViewPerVideo: totalTimeView / totalViews,
            totalActiveVideos: filesToSearch.length
        };
        const tokensInfo = {
            tokensEarned,
            avgTokensEarnedPerVideo
        };
        res
            .status(200)
            .json({ accountInfo, videosInfo, tokensInfo });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = getDashboardStatics;
//# sourceMappingURL=getDashboardStatics.js.map