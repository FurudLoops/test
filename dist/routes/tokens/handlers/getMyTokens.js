"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const AlgoIPFS_1 = require("../../../AlgoIPFS");
const algosdk = __importStar(require("algosdk"));
const getMyTokens = async (req, res) => {
    try {
        // Construct the transaction
        let params = await AlgoIPFS_1.algow.algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;
        // from, to, amount, closeRemainderTo, note, suggestedParams
        const note = algosdk.encodeObj({ marc: 'note' });
        let txn = algosdk.makeAssetTransferTxn(AlgoIPFS_1.algow.account.addr, req.body.wallet, undefined, undefined, params.fee, req.body.quantity, params.firstRound, params.lastRound, note, params.genesisHash, params.genesisID, 19267953);
        txn.fee = params.fee;
        // Sign the transaction
        let signedTxn = txn.signTxn(AlgoIPFS_1.algow.account.sk);
        let txId = txn.txID().toString();
        // Submit the transaction
        await AlgoIPFS_1.algow.algodClient.sendRawTransaction(signedTxn).do();
        res
            .status(200)
            .json({ result: 'OK' });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = getMyTokens;
//# sourceMappingURL=getMyTokens.js.map