"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var chat_1 = require("./chat");
// import { Message } from './model';
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.initial();
        this.listen();
        this.chat = new chat_1.Chat(this.server);
    }
    ChatServer.prototype.initial = function () {
        this.app = express_1.default();
        var public_chat = (process.env.GYPTIO_FOLDER_PUBLIC || __dirname + '/../../../public') + '/chat';
        this.app.use('/chat', express_1.default.static(public_chat));
        this.server = http_1.createServer(this.app);
        this.port = process.env.SOCKET_PORT || ChatServer.PORT;
    };
    ChatServer.prototype.listen = function () {
        /*this.server.listen(this.port, () => {
          console.log('Running server on port %s', this.port);
        });
        */
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 4040;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
