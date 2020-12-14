"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (error, request, response, next) {
    console.error(error);
    return response.json({ message: 'Internal error!', error: error });
};
exports.default = errorHandler;
//# sourceMappingURL=handler.js.map