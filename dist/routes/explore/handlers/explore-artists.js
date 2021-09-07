"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = __importDefault(require("../../../helpers/handle-error"));
const fileUpload_schema_1 = __importDefault(require("../../upload/handlers/schemas/fileUpload.schema"));
const exploreArtists = async (req, res) => {
    try {
        const filesToSearch = await fileUpload_schema_1.default.find().select('user');
        const artists = new Set();
        filesToSearch.forEach(({ user }) => artists.add(user));
        res
            .status(200)
            .json({ artists: [...artists.values()] });
    }
    catch (err) {
        handle_error_1.default(err, res);
    }
};
exports.default = exploreArtists;
//# sourceMappingURL=explore-artists.js.map