"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var events = __importStar(require("events"));
var url = __importStar(require("url"));
var Chat = /** @class */ (function () {
    function Chat(server) {
        this.io = socket_io_1.default(server);
        this.listen();
        this.ev = new events.EventEmitter();
        return this;
    }
    Chat.prototype.listen = function () {
        var _this_1 = this;
        this.io.on('connect', function (socket) {
            var _this = _this_1;
            var u = url.parse(socket.handshake.url, true);
            var ch = String(u.query.ch);
            console.log('TCL: Chat -> ch', ch);
            socket.join(ch);
            socket.on('message', function (data) {
                _this.onMessage(socket, ch, data);
            });
            socket.on('disconnect', _this_1.onDisconnect);
        });
    };
    Chat.prototype.onMessage = function (socket, ch, data) {
        socket.broadcast.to(ch).emit('message', data);
    };
    Chat.prototype.onDisconnect = function (m) {
        console.log('TCL: SocketIO -> privateonDisconnect -> m', m);
    };
    return Chat;
}());
exports.Chat = Chat;
