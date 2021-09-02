"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FileUploadSchema = new mongoose_1.Schema({
    user: String,
    transaction: String,
    uri: String,
    confirmed_txn_note: {
        cid: String,
        filename: String,
        fileHash: String,
        extension: String
    },
    file_id: String,
    form_data: {
        image: String,
        description: String,
        album: String,
        music_file: String,
        title: String
    }
});
const FileUpload = mongoose_1.model('FileUpload', FileUploadSchema);
exports.default = FileUpload;
//# sourceMappingURL=fileUpload.schema.js.map