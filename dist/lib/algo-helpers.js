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
require('dotenv').config();
// const algodToken = process.env.ALGO_TOKEN;
// const algodServer = process.env.ALGO_SERVER;
// const algodPort = process.env.ALGO_PORT;
const indexerServer = process.env.INDEXER_SERVER;
const algodToken = '';
const algodServer = 'https://testnet.algoexplorerapi.io/';
const algodPort = '';
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const indexerClient = new algosdk.Indexer(algodToken, indexerServer, algodPort);
const walletPassphrase = process.env.WALLET_PASSPHRASE;
const getStatus = async () => {
    try {
        const status = (await algodClient.status().do());
        console.log("Algorand network status: %o", status);
    }
    catch (e) {
        console.log('error ===> ', e);
    }
};
const getEndpoints = async () => {
    try {
        let status = (await algodClient.healthCheck().do());
        console.log("Algorand network status: %o", status);
    }
    catch (e) {
        console.log('error ===> ', e);
    }
};
const getTransactionParams = async () => {
    try {
        let params = await algodClient.getTransactionParams().do();
        console.log("Algorand suggested parameters: %o", params);
    }
    catch (e) {
        console.log('error ===> ', e);
    }
};
const checkAccountBalanca = async () => {
    try {
        const passphrase = walletPassphrase;
        let myAccount = algosdk.mnemonicToSecretKey(passphrase);
        console.log("My address: %s", myAccount.addr);
        let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Account balance: %d microAlgos", accountInfo.amount);
    }
    catch (e) {
        console.log('error ===> ', e);
    }
};
const getIndexedApplications = async () => {
    try {
        const applications = await indexerClient.searchForApplications().do();
        console.log(applications);
    }
    catch (e) {
        console.log('error ===> ', e);
    }
};
const lookupAccountTransactions = async () => {
    try {
        const passphrase = walletPassphrase;
        let myAccount = algosdk.mnemonicToSecretKey(passphrase);
        let accountTxns = await indexerClient.lookupAccountTransactions(myAccount.addr).do();
        console.log(accountTxns);
    }
    catch (e) {
        console.log('error ===> ', e);
    }
};
lookupAccountTransactions();
//# sourceMappingURL=algo-helpers.js.map