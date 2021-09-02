"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const AlgoIPFS_1 = require("../../../AlgoIPFS");
const fs_1 = __importDefault(require("fs"));
const sha256_1 = __importDefault(require("../../../helpers/sha256"));
const uploadIPFSAlgo = async (req, res) => {
    try {
        const { path, originalname } = req.file;
        const extension = originalname.split(/\.(?=[^\.]+$)/)[1];
        const fileContents = fs_1.default.readFileSync(path);
        const fileHash = sha256_1.default(fileContents);
        //Upload file to ipfs
        const { fileAdded } = await AlgoIPFS_1.ipfsw.uploadFile(path);
        console.log(fileAdded);
        // Add file hash to blockahin
        // If we want the txn to be signed from backend just check all this function.
        // const { confirmationTxId, confirmedTxnNote } = await algow.appendFileInfo(fileAdded, { fileHash, extension });
        // const response: UploadResponse = {
        //     transaction: confirmationTxId,
        //     uri: `https://testnet.algoexplorer.io/tx/${confirmationTxId}`,
        //     confirmed_txn_note: confirmedTxnNote,
        //     file_id: confirmedTxnNote.filename
        // };
        fileAdded.cid = `${fileAdded.cid}`;
        const response = {
            file_added: fileAdded,
            file_hash: fileHash,
            extension
        };
        res
            .status(200)
            .contentType("text/json")
            .json(response);
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = uploadIPFSAlgo;
//# sourceMappingURL=uploadIPFSAlgo.js.map