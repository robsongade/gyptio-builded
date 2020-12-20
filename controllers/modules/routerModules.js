"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ServerGameController_1 = __importDefault(require("./ServerGame/ServerGameController"));
var Router = express_1.default.Router;
var routerModules = Router();
routerModules.get('/servergame', ServerGameController_1.default.list);
routerModules.get('/servergame/:id', ServerGameController_1.default.loadById);
routerModules.post('/servergame/edit', ServerGameController_1.default.edit);
exports.default = routerModules;
//# sourceMappingURL=routerModules.js.map