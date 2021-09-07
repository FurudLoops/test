"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const getMyTokens_1 = __importDefault(require("./handlers/getMyTokens"));
router
    .route('/get-my-tokens')
    .post(getMyTokens_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map