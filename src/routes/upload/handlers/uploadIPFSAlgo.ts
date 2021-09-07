import handleError from "../../../helpers/handle-error";
import { ipfsw } from '../../../AlgoIPFS'
import fs from 'fs';
import _fileHash from "../../../helpers/sha256";
import { UploadResponse } from "./models/UploadResponse.model";

const uploadIPFSAlgo = async (req, res) => {
    try {
        const { path, originalname } = req.file;
        const extension = originalname.split(/\.(?=[^\.]+$)/)[1];

        const fileContents = fs.readFileSync(path);
        const fileHash = _fileHash(fileContents);

        //Upload file to ipfs
        const { fileAdded } = await ipfsw.uploadFile(path);
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
        const response: UploadResponse = {
            file_added: fileAdded,
            file_hash: fileHash,
            extension
        };

        res
            .status(200)
            .contentType("text/json")
            .json(response);

    } catch (err) {
        handleError(err, res);
    }
}

export default uploadIPFSAlgo;