"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ServerGameController_1 = __importDefault(require("./ServerGame/ServerGameController"));
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
exports.default = routerModules;
//# sourceMappingURL=routerModules.js.map