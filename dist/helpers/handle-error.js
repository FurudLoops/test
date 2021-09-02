"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong! ", err);
};
exports.default = handleError;
//# sourceMappingURL=handle-error.js.map