const express = require('express');
const router = express.Router();

import downloadFile from "./handlers/downloadFile";
import downloadFilesArtist from "./handlers/downloadFilesArtist";

router
    .route('/artist/:id')
    .get(downloadFilesArtist)
router
    .route('/artist-file/:id')
    .get(downloadFilesArtist)

router
    .route('/file')
    .get(downloadFile);

export default router;
