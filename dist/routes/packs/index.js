"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const buy_pack_1 = __importDefault(require("./handlers/buy-pack"));
router
    .route('/buy')
    .post(buy_pack_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map