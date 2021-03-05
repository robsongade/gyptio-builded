"use strict";
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
//import {app} from './socket/src'
var run = function () {
    typeorm_1.createConnection().then(function () {
        var cors = require('cors');
        var app = express_1.default();
        var http = require("http").Server(app);
        // set up socket.io and bind it to our
        // http server.
        var io = require("socket.io")(http);
        var RouterAdmin = express_1.Router();
        var RouterHomeSite = express_1.Router();
        RouterAdmin.use('/admin', express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || '/../public')));
        RouterAdmin.use(express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || "/../public")));
        RouterHomeSite.use('/', express_1.default.static(__dirname + '/custons/home_site'));
        RouterHomeSite.use(express_1.default.static(__dirname + '/custons/home_site'));
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
        app.use(cors());
        app.use(express_1.default.json());
        app.use(routes_1.default.routerApi);
        app.use(handler_1.default);
        installer_1.Installer();
        var port = process.env.PORT || 3003;
        http.listen(port, '0.0.0.0', function () {
            console.log("Server load in port " + port + " ");
        });
    });
};
run();
