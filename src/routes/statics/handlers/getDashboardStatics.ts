import { Types } from "mongoose";
import handleError from "../../../helpers/handle-error";
import WalletVideoWatch from "../../sockets/schemas/wallet-video-watch.schema";
import FileUpload from "../../upload/handlers/schemas/fileUpload.schema";

const getDashboardStatics = async (req, res) => {
    try {
        const { userId } = req.params;

        const filesToSearch = await FileUpload.find({ user: userId }).select("_id");

        const videosData = await WalletVideoWatch.find()
            .where('currentFile')
            .in([...filesToSearch]) as any;

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
        }

        res
            .status(200)
            .json({ accountInfo, videosInfo, tokensInfo })
    } catch (err) {
        handleError(err, res)
    }

}

export default getDashboardStatics;