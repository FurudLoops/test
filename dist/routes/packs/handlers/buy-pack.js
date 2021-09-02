"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const pack_schema_1 = __importDefault(require("../schemas/pack.schema"));
const buyPack = async (req, res) => {
    try {
        const fileUpload = new pack_schema_1.default(req.body);
        await fileUpload.save();
        res
            .status(201)
            .contentType("text/json")
            .json({ response: 'pack added' });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = buyPack;
//# sourceMappingURL=buy-pack.js.map