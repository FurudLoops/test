"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_1 = __importDefault(require("ipfs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is always 16
class IPFSWrapper {
    constructor(encryptionPassword = undefined) {
        this._fileHash = filePath => {
            let file_buffer = filePath;
            let sum = crypto_1.default.createHash('sha256');
            sum.update(file_buffer);
            const hex = sum.digest('hex');
            return hex;
        };
        if (encryptionPassword) {
            this.encryptionPassword = crypto_1.default.createHash('sha256').update(String(encryptionPassword)).digest('base64').substr(0, 32);
        }
    }
    async init() {
        this.node = await ipfs_1.default.create();
        const version = await this.node.version();
        // console.log('IPFS node:', this.node)
        console.log('IPFS version:', version.version);
    }
    async uploadFile(filepath) {
        // console.log('filepath ==> ', filepath);
        let fileContents = fs_1.default.readFileSync(filepath);
        const fileHash = this._fileHash(fileContents);
        if (Boolean(this.encryptionPassword)) {
            console.log('Encrypting file');
            fileContents = this._encryptBuffer(fileContents);
        }
        const fileAdded = await this.node.add({
            path: path_1.default.basename(filepath),
            content: fileContents
        });
        return { fileAdded, fileHash };
    }
    async downloadFile({ cid, filename, extension }) {
        var e_1, _a;
        console.log('Looking for contents of hash:', cid);
        const chunks = [];
        try {
            for (var _b = __asyncValues(this.node.cat(cid)), _c; _c = await _b.next(), !_c.done;) {
                const chunk = _c.value;
                chunks.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        let fileContents = Buffer.concat(chunks);
        if (Boolean(this.encryptionPassword)) {
            console.log('Unencrypting file =>', fileContents);
            fileContents = this._decryptBuffer(fileContents);
        }
        const dir = './downloads';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        console.log('File contents retrieved with buffer length:', fileContents.length);
        fs_1.default.writeFileSync(`${dir}/_${filename}.${extension}`, fileContents);
        return `_${filename}`;
    }
    _encryptBuffer(buffer) {
        console.log('Running encryption on file before uploading');
        let iv = crypto_1.default.randomBytes(IV_LENGTH);
        let cipher = crypto_1.default.createCipheriv(ALGORITHM, this.encryptionPassword, iv);
        let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
        return Buffer.from(iv.toString('hex') + ':' + encrypted.toString('hex'));
    }
    _decryptBuffer(buffer) {
        console.log('Running decryption on downloaded file');
        let textParts = String(buffer).split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto_1.default.createDecipheriv(ALGORITHM, this.encryptionPassword, iv);
        let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted;
    }
}
exports.default = IPFSWrapper;
//# sourceMappingURL=IPFSWrapper.js.map