"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({
    dest: "uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
const uploadDBSync_1 = __importDefault(require("./handlers/uploadDBSync"));
const uploadIPFSAlgo_1 = __importDefault(require("./handlers/uploadIPFSAlgo"));
router
    .route('/')
    .post(upload.single("file"), uploadIPFSAlgo_1.default);
router
    .route('/db-sync')
    .post(uploadDBSync_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map