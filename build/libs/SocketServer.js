"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
var http_1 = require("http");
var SocketServer = /** @class */ (function () {
    function SocketServer() {
    }
    SocketServer.prototype.init = function (app) {
        return new http_1.Server(app);
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
