"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const explore_1 = __importDefault(require("./handlers/explore"));
const explore_artists_1 = __importDefault(require("./handlers/explore-artists"));
router
    .route('/')
    .get(explore_1.default);
router
    .route('/artists')
    .get(explore_artists_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map