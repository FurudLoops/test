"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsw = exports.algow = void 0;
require('dotenv').config();
const AlgoWrapper_1 = __importDefault(require("./lib/AlgoWrapper"));
const IPFSWrapper_1 = __importDefault(require("./lib/IPFSWrapper"));
const algodConfigTEST = {
    'algodToken': {
        'X-API-Key': ''
    },
    'algodServer': 'https://testnet.algoexplorerapi.io/',
    'indexerServer': 'https://testnet.algoexplorerapi.io/idx2',
    'algodPort': '',
    'passphrase': process.env.WALLET_PASSPHRASE,
    'encryptionPassword': 'ecryptedtst'
};
let algow;
exports.algow = algow;
let ipfsw;
exports.ipfsw = ipfsw;
let init = false;
if (!init) {
    (async () => {
        try {
            exports.algow = algow = new AlgoWrapper_1.default(algodConfigTEST);
            exports.ipfsw = ipfsw = new IPFSWrapper_1.default(algodConfigTEST.encryptionPassword);
            await ipfsw.init();
            init = true;
        }
        catch (error) {
            console.log(error);
        }
    })();
}
//# sourceMappingURL=AlgoIPFS.js.map