"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const downloadFile_1 = __importDefault(require("./handlers/downloadFile"));
const downloadFilesArtist_1 = __importDefault(require("./handlers/downloadFilesArtist"));
router
    .route('/artist/:id')
    .get(downloadFilesArtist_1.default);
router
    .route('/artist-file/:id')
    .get(downloadFilesArtist_1.default);
router
    .route('/file')
    .get(downloadFile_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map