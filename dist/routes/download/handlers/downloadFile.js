"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AlgoIPFS_1 = require("../../../AlgoIPFS");
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const path = require('path');
const fs = require('fs');
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const getFileInfo = async (id) => {
    const fileName = path.basename(id);
    let retries = 3;
    let fileInfo = null;
    do {
        if (retries !== 3 && !fileInfo) {
            console.log(`Couldn't find ${fileName} information, trying again in 5 sec`);
            await sleep(5000);
        }
        fileInfo = await AlgoIPFS_1.algow.searchFileInfo(fileName);
    } while (retries-- > 0 && !fileInfo);
    return fileInfo;
};
const downloadFile = async (req, res) => {
    console.log('Downloading...');
    try {
        const fileInfo = req.query;
        // const fileInfo = await getFileInfo(id);
        const fileName = await AlgoIPFS_1.ipfsw.downloadFile(fileInfo);
        const filePath = `./downloads/${fileName}.${fileInfo.extension}`;
        // var stat = fs.statSync(filePath);
        res
            .status(200)
            .download(filePath);
        // res.writeHead(200, {
        //     'Content-Type': 'audio/mpeg',
        //     'Content-Length': stat.size
        // });
        // var readStream = fs.createReadStream(filePath);
        // // We replaced all the event handlers with a simple call to readStream.pipe()
        // readStream.pipe(res);
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = downloadFile;
//# sourceMappingURL=downloadFile.js.map