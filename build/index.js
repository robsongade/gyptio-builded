"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importStar(require("express"));
require("express-async-errors");
require("dotenv");
require("./libs/GioConnector");
var routes_1 = __importDefault(require("./routes"));
var handler_1 = __importDefault(require("./errors/handler"));
var typeorm_1 = require("typeorm");
var installer_1 = require("./libs/installer");
var path_1 = __importDefault(require("path"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var ExtractDataUrl_1 = require("./libs/ExtractDataUrl");
//import {app} from './socket/src'
var run = function () {
    typeorm_1.createConnection().then(function () {
        var cors = require('cors');
        var app = express_1.default();
        app.use(cors({
            origin: '*'
        }));
        var http = require("http").Server(app);
        // set up socket.io and bind it to our
        // http server.
        var io = require("socket.io")(http);
        var RouterAdmin = express_1.Router();
        var RouterHomeSite = express_1.Router();
        RouterAdmin.use('/admin', express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || __dirname + '/../appdobicho-build/build/public')));
        RouterAdmin.use(express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || "/../public")));
        RouterHomeSite.use('/', express_1.default.static(__dirname + '/custons/home_site'));
        RouterHomeSite.use(express_1.default.static(__dirname + '/custons/home_site'));
        var proxy = require('express-http-proxy');
        //app.use('/admin', proxy('http://localhost:15003'));
        app.get("/socket/chat", function (req, res) {
            var public_chat = (process.env.GYPTIO_FOLDER_PUBLIC || '/../public') + '/chat/index.html';
            res.sendFile(path_1.default.resolve(__dirname + public_chat));
        });
        // whenever a user connects on port 3000 via
        // a websocket, log that a user has connected
        io.on("connection", function (socket) {
            console.log("a user connected");
            // whenever we receive a 'message' we log it out
            socket.on("message", function (message) {
                console.log(message);
            });
        });
        app.use(RouterHomeSite);
        app.use(RouterAdmin);
        //  app.use(cors())
        app.use(express_1.default.json());
        app.use(routes_1.default.routerApi);
        app.use(handler_1.default);
        installer_1.Installer();
        var port = process.env.PORT || 3003;
        http.listen(port, '0.0.0.0', function () { return __awaiter(_this, void 0, void 0, function () {
            var socketclient;
            var _this = this;
            return __generator(this, function (_a) {
                console.log("Server load in port " + port + " ");
                try {
                    if (process.env['BAK']) {
                        socketclient = socket_io_client_1.default('http://localhost:' + port);
                        socketclient.on('connect', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, node_fetch_1.default('http://localhost:' + port + '/cron/start')];
                                    case 1:
                                        _a.sent();
                                        console.log("Connected in socket server");
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (process.env['CRON_JOGO'] && process.env['CRON_JOGO']) {
                        ExtractDataUrl_1.loadCronJogoDoBicho();
                    }
                }
                catch (e) {
                }
                return [2 /*return*/];
            });
        }); });
    });
};
run();
