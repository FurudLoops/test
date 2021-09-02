"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const fileUpload_schema_1 = __importDefault(require("./schemas/fileUpload.schema"));
const uploadDBSync = async (req, res) => {
    try {
        const fileUpload = new fileUpload_schema_1.default(req.body);
        await fileUpload.save();
        res
            .status(201)
            .contentType("text/json")
            .json({ response: 'sync done' });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = uploadDBSync;
//# sourceMappingURL=uploadDBSync.js.map