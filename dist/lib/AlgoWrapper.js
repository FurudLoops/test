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
Object.defineProperty(exports, "__esModule", { value: true });
const algosdk = __importStar(require("algosdk"));
class AlgoWrapper {
    constructor({ algodToken, algodServer, indexerServer, algodPort, passphrase }) {
        const account = algosdk.mnemonicToSecretKey(passphrase);
        if (!this._isValidAccount(account)) {
            console.log(account);
            throw 'Invalid account, expected: {addr:"", sk:""}';
        }
        this.account = account;
        this.algodPort = algodPort;
        this.algodToken = algodToken;
        this.algodServer = algodServer;
        this.indexerServer = indexerServer;
        this.algodClient = new algosdk.Algodv2(this.algodToken, this.algodServer, this.algodPort);
    }
    _isValidAccount(account) {
        return account && account.addr && account.sk;
    }
    async appendFileInfo({ path, cid }, options) {
        const { fileHash, extension } = options;
        const noteContents = {
            cid: `${cid}`, filename: `${path}`, fileHash, extension
        };
        console.log(noteContents);
        let note = algosdk.encodeObj(noteContents);
        //Check your balance
        // let accountInfo = await this.algodClient.accountInformation(this.account.addr).do()
        // console.log("Account balance: %d microAlgos", accountInfo.amount)
        // // Construct the transaction
        // let params = await this.algodClient.getTransactionParams().do()
        // params.fee = 1000
        // params.flatFee = true
        // // from, to, amount, closeRemainderTo, note, suggestedParams
        // let txn = algosdk.makePaymentTxnWithSuggestedParams(this.account.addr, this.account.addr, 0, undefined, note, params)
        // // Sign the transaction
        // let signedTxn = txn.signTxn(this.account.sk)
        // let txId = txn.txID().toString()
        // console.log("Signed transaction with txID: %s", txId)
        // // Submit the transaction
        // await this.algodClient.sendRawTransaction(signedTxn).do()
        const txId = '12';
        // // Wait for confirmation
        const confirmationTxId = await this._waitForConfirmation(txId);
        // // Read the transaction from the blockchain
        let confirmedTxn = await this.algodClient.pendingTransactionInformation(txId).do();
        return {
            confirmationTxId,
            confirmedTxnNote: algosdk.decodeObj(confirmedTxn.txn.txn.note)
        };
    }
    async _waitForConfirmation(txId) {
        let status = await this.algodClient.status().do();
        let lastRound = status["last-round"];
        console.log('status', status);
        while (true) {
            const pendingInfo = await this.algodClient.pendingTransactionInformation(txId).do();
            console.log('pendingInfo', pendingInfo);
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                return txId;
            }
            lastRound++;
            await this.algodClient.statusAfterBlock(lastRound).do();
        }
    }
    async searchFileInfo(filename) {
        console.log("Looking for", filename);
        const indexerClient = new algosdk.Indexer(this.algodToken, this.indexerServer, this.algodPort);
        let accountTxns = await indexerClient.lookupAccountTransactions(this.account.addr).do();
        let transactions = accountTxns.transactions.sort((a, b) => { return b['confirmed-round'] - a['confirmed-round']; });
        console.log("Number of txns for account:", transactions.length);
        for (let txn of transactions) {
            if (txn.note !== undefined) {
                try {
                    const noteBase64 = Buffer.from(txn.note, 'base64').toString();
                    const note = JSON.parse(Buffer.from(noteBase64, 'base64').toString());
                    console.log(note);
                    if (note.filename === filename) {
                        console.log('FOUND!', filename);
                        console.log('ID:', txn.id);
                        console.log('Note:', note);
                        return note;
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }
}
exports.default = AlgoWrapper;
//# sourceMappingURL=AlgoWrapper.js.map