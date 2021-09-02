const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer({
    dest: "uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

import uploadDBSync from "./handlers/uploadDBSync";
import uploadIPFSAlgo from "./handlers/uploadIPFSAlgo";

router
    .route('/')
    .post(upload.single("file"), uploadIPFSAlgo);

router
    .route('/db-sync')
    .post(uploadDBSync)

export default router;

