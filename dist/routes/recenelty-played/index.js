"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const recently_played_1 = __importDefault(require("./handlers/recently-played"));
const remove_recently_played_1 = __importDefault(require("./handlers/remove-recently-played"));
router
    .route('/:wallet')
    .get(recently_played_1.default);
router
    .route('/:wallet/:currentFile')
    .delete(remove_recently_played_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map