import { model, Schema } from "mongoose";

const walletVideoWatchSchema = new Schema({
    wallet: String,
    timePlayed: Number,
    session: String,
    timeViewed: Number,
    currentFile: {
        type: Schema.Types.ObjectId,
        ref: 'FileUpload'
    },
    lastUpdate: Date,
    isActive: Boolean
})

const WalletVideoWatch = model('WalletVideoWatch', walletVideoWatchSchema)

export default WalletVideoWatch;