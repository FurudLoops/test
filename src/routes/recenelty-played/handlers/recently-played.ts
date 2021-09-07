import handleError from "../../../helpers/handle-error";
import WalletVideoWatch from '../../sockets/schemas/wallet-video-watch.schema';

const recentlyPlayed = async (req, res) => {
    try {
        const { wallet } = req.params;
        const fiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 5));
        const recentlyPlayed = await WalletVideoWatch.find({
            wallet,
            lastUpdate: {
                $gte: fiveDaysAgo,
                $lt: new Date()
            },
            isActive: true
        }).populate('currentFile') as any;

        const filteredRecentlyPlayed = recentlyPlayed
            .reverse()
            .filter((v, i, a) => a.findIndex(t => (t.currentFile._id === v.currentFile._id)) === i);

        res
            .status(200)
            .contentType("text/json")
            .json({ recentlyPlayed: filteredRecentlyPlayed, totalItems: filteredRecentlyPlayed.length });

    } catch (err) {
        handleError(err, res)
    }
}

export default recentlyPlayed;