"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ServerGameController_1 = __importDefault(require("./ServerGame/ServerGameController"));
var Player_1 = __importDefault(require("./Player/Player"));
var Auth_1 = __importDefault(require("./../Auth"));
var Router = express_1.default.Router;
var routerModules = Router();
routerModules.use(Auth_1.default.permission, Auth_1.default.authorize);
routerModules.get('/servergame', ServerGameController_1.default.list);
routerModules.get('/servergame/status', ServerGameController_1.default.status);
routerModules.get('/servergame/:id', ServerGameController_1.default.loadById);
routerModules.get('/servergame/delete/:id', ServerGameController_1.default.delete);
routerModules.post('/servergame/edit', ServerGameController_1.default.edit);
routerModules.post('/servergame/create', ServerGameController_1.default.create);
routerModules.post('/servergame/token', ServerGameController_1.default.validate_token);
routerModules.post('/servergame/player_validate_token', ServerGameController_1.default.player_validate_token);
//Player
routerModules.get('/player', ServerGameController_1.default.validate_token);
routerModules.post('/player/character', Player_1.default.character);
routerModules.post('/player/characters', Player_1.default.characters);
routerModules.post('/player/create', Player_1.default.create);
//Email
var EmailController_1 = __importDefault(require("./Email/EmailController"));
routerModules.get('/email/forgot-password', EmailController_1.default.forgot_password);
routerModules.get('/email/confirm', EmailController_1.default.confirm_email);
routerModules.get('/email/test', EmailController_1.default.test);
//Network
var NetworkController_1 = __importDefault(require("./Network/NetworkController"));
var NetworkCron_1 = __importDefault(require("./Network/NetworkCron"));
routerModules.get('/network', NetworkController_1.default.create);
routerModules.get('/network/test/to', NetworkCron_1.default.test_check_users_to_donation);
//routerModules.get('/network/cron',new NetworkCron().start)
routerModules.get('/network/config', NetworkController_1.default.config);
//Comprovantes
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var path_1 = __importDefault(require("path"));
var ComprovanteController_1 = require("./Comprovante/ComprovanteController");
var comprovante = new ComprovanteController_1.ComprovanteController();
routerModules.get('/comprovante/all', comprovante.all);
routerModules.get('/comprovante/dados/:id', comprovante.dados);
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        var id = req.params.id;
        cb(null, id + '-' + uuid_1.v4() + path_1.default.extname(file.originalname));
    },
});
var upload = multer_1.default({
    storage: storage
});
routerModules.post('/comprovante/imagem/:id', upload.single('arquivo'), comprovante.upload);
routerModules.post('/comprovante/criar-por-id-upline/:id', comprovante.create_por_upline);
exports.default = routerModules;
