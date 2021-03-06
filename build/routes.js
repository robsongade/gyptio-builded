"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var authRouter_1 = __importDefault(require("./routes/authRouter"));
var authInstances_1 = __importDefault(require("./routes/authInstances"));
var permissionRouter_1 = __importDefault(require("./routes/permissionRouter"));
var moduleRouter_1 = __importDefault(require("./routes/moduleRouter"));
var Instances_1 = __importDefault(require("./controllers/Instances"));
var Auth_1 = __importDefault(require("./controllers/Auth"));
var itemRouter_1 = __importDefault(require("./routes/itemRouter"));
var routerModules_1 = __importDefault(require("./controllers/modules/routerModules"));
var NetworkCron_1 = __importDefault(require("./controllers/modules/Network/NetworkCron"));
var routerSocket = express_1.Router();
routerSocket.get("/socket/client", function (req, res) {
    res.sendFile(__dirname + "/socket/index.html");
});
var routerApi = express_1.Router();
var OJogoDoBichoController_1 = __importDefault(require("./controllers/modules/OJogoDoBicho/OJogoDoBichoController"));
routerApi.use('/api/ojogo', OJogoDoBichoController_1.default.resultado);
routerApi.use('/api', OJogoDoBichoController_1.default.auth);
routerApi.get('/api/jogo/dia', OJogoDoBichoController_1.default.dia);
routerApi.get('/api/jogo/auth', OJogoDoBichoController_1.default.auth_render);
routerApi.use(Instances_1.default.instance_origin);
routerApi.use('/api', userRouter_1.default);
routerApi.use('/api', authRouter_1.default);
routerApi.use('/api', authInstances_1.default);
routerApi.use('/api', permissionRouter_1.default);
routerApi.use('/api', Auth_1.default.permission, Auth_1.default.authorize, moduleRouter_1.default);
routerApi.use('/api', itemRouter_1.default);
routerApi.use('/api', Auth_1.default.permission, Auth_1.default.authorize, routerModules_1.default);
//Indicators
routerApi.get('/:id', function (req, res) {
    res.redirect("/?indicator=" + req.params.id);
});
var ComprovanteController_1 = require("./controllers/modules/Comprovante/ComprovanteController");
var comprovante = new ComprovanteController_1.ComprovanteController();
//routerApi.get('/comprovante/imagem/:imagem',comprovante.show)
routerApi.use('/cron/start', NetworkCron_1.default.startCron);
exports.default = {
    routerApi: routerApi,
    routerSocket: routerSocket
};
