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
var src_1 = require("./socket/src");
var run = function () {
    typeorm_1.createConnection().then(function () {
        var cors = require('cors');
        //const app = express();
        var RouterAdmin = express_1.Router();
        var RouterHomeSite = express_1.Router();
        RouterAdmin.use('/admin', express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || __dirname + '/../public')));
        RouterAdmin.use(express_1.default.static(__dirname + (process.env.GYPTIO_FOLDER_PUBLIC || "/../public")));
        RouterHomeSite.use('/', express_1.default.static(__dirname + '/custons/home_site'));
        RouterHomeSite.use(express_1.default.static(__dirname + '/custons/home_site'));
        src_1.app.use(RouterHomeSite);
        src_1.app.use(RouterAdmin);
        src_1.app.use(cors());
        src_1.app.use(express_1.default.json());
        src_1.app.use(routes_1.default.routerApi);
        src_1.app.use(handler_1.default);
        installer_1.Installer();
        var port = process.env.PORT || 3003;
        src_1.app.listen(port, '0.0.0.0', function () {
            console.log("Server load in port " + port + " ");
        });
    });
};
run();
