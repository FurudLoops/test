import { algow, ipfsw } from "../../../AlgoIPFS";
import handleError from "../../../helpers/handle-error";
const path = require('path');
const fs = require('fs');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const getFileInfo = async (id: string) => {
    const fileName = path.basename(id)
    let retries = 3
    let fileInfo = null
    do {
        if (retries !== 3 && !fileInfo) {
            console.log(`Couldn't find ${fileName} information, trying again in 5 sec`)
            await sleep(5000)
        }
        fileInfo = await algow.searchFileInfo(fileName)
    } while (retries-- > 0 && !fileInfo)
    return fileInfo;
}

const downloadFile = async (req, res) => {
    console.log('Downloading...');
    try {
        const fileInfo = req.query;

        // const fileInfo = await getFileInfo(id);

        const fileName = await ipfsw.downloadFile(fileInfo)

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

    } catch (err) {
        handleError(err, res)
    }

}

export default downloadFile;