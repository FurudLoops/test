"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const _fileHash = (filePath) => {
    let file_buffer = filePath;
    let sum = crypto_1.default.createHash('sha256');
    sum.update(file_buffer);
    const hex = sum.digest('hex');
    return hex;
};
exports.default = _fileHash;
//# sourceMappingURL=sha256.js.map