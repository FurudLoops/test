"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packSchema = new mongoose_1.Schema({
    user: String,
    transaction: String,
    uri: String,
    pack_id: String
});
const Pack = mongoose_1.model('Pack', packSchema);
exports.default = Pack;
//# sourceMappingURL=pack.schema.js.map