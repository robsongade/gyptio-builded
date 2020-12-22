"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv");
require("./libs/GioConnector");
var routes_1 = __importDefault(require("./routes"));
var handler_1 = __importDefault(require("./errors/handler"));
var typeorm_1 = require("typeorm");
var installer_1 = require("./libs/installer");
var cors = require('cors');
var started = false;
var run = function () {
    var app = express_1.default();
    app.use('/', express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || __dirname + '/../public')));
    app.use(express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || "/../public")));
    app.use(cors());
    app.use(express_1.default.json());
    app.use(handler_1.default);
    app.get('/started', function (req, res) {
        if (!started) {
            typeorm_1.createConnection().then(function () {
                installer_1.Installer();
                app.use(routes_1.default);
                res.status(200).json({
                    success: 1
                });
            });
        }
        else {
            res.status(200).json({
                success: 2
            });
        }
    });
    var port = process.env.PORT || 3003;
    app.listen(port, '0.0.0.0', function () {
        console.log("Server load in port " + port);
    });
};
run();
