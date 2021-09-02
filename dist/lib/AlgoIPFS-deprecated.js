"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const path = require('path');
const AlgoWrapper_1 = __importDefault(require("./AlgoWrapper"));
const IPFSWrapper_1 = __importDefault(require("./IPFSWrapper"));
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
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
class AlgoIPFS {
    constructor(algodConfig = algodConfigTEST) {
        this.algodConfig = algodConfig;
        this.encryptionPassword = algodConfig.encryptionPassword;
    }
    async init() {
        console.log('INITIALISING...');
        this.algow = new AlgoWrapper_1.default(this.algodConfig);
        this.ipfsw = new IPFSWrapper_1.default(this.encryptionPassword);
        await this.ipfsw.init();
    }
    async pushFile(filepath) {
        // UPLOAD file to the IPFS
        console.log('STARTING UPLOAD FILE');
        const fileAdded = await this.ipfsw.uploadFile(filepath);
        // console.log('File added ==> ', fileAdded)
        // APPEND information to Algorand
        await this.algow.appendFileInfo(fileAdded);
        console.log('Finished pushing file');
    }
    async pullFile(filepath) {
        const filename = path.basename(filepath);
        let retries = 3;
        let fileInfo = null;
        do {
            if (retries !== 3 && !fileInfo) {
                console.log(`Couldn't find ${filename} information, trying again in 5 sec`);
                await sleep(5000);
            }
            fileInfo = await this.algow.searchFileInfo(filename);
        } while (retries-- > 0 && !fileInfo);
        const fileName = await this.ipfsw.downloadFile(fileInfo);
        return fileName;
    }
}
exports.default = AlgoIPFS;
//# sourceMappingURL=AlgoIPFS-deprecated.js.map