import WalletVideoWatch from "./schemas/wallet-video-watch.schema";

export default function timePlayedSocket(io, socket): void {
    let timeStarted = new Map<string, number>();
    let timeStartedDB = new Map<string, number>();
    let timePlayed = new Map<string, number>();
    let currentWallet: string;
    let currentFile: string;

    socket.on('timePlayed', async (data: { active: boolean, wallet: string, currentFileId: string }) => {
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
        }


        if (data.active) {
            const videoWatchDBObject = await WalletVideoWatch.findOne({ wallet: currentWallet, session: socket.id, currentFile: data.currentFileId });
            if (!videoWatchDBObject) {
                await new WalletVideoWatch(videoWatch).save();
            }
            timeStarted.set(currentWallet, new Date().getTime() / 1000);
            timeStartedDB.set(currentWallet, new Date().getTime() / 1000);
        } else {
            const videoWatchDBObject = await WalletVideoWatch.findOne({ wallet: currentWallet, session: socket.id, currentFile: data.currentFileId }) as any;
            const playedFor = new Date().getTime() / 1000 - timeStartedDB.get(currentWallet);
            videoWatch.timeViewed = (videoWatchDBObject?.timeViewed || 0) + playedFor;
            await WalletVideoWatch.findOneAndUpdate({ wallet: currentWallet, session: socket.id, currentFile: data.currentFileId }, videoWatch) as any;
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
    }, 1000)

    socket.on('disconnect', () => {
        timeStarted.set(currentWallet, 0);
        timeStartedDB.set(currentWallet, 0);
    });


}