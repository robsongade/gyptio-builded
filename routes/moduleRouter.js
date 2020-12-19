"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_1 = require("../controllers/User");
var Module_1 = require("../controllers/Module");
var module = new Module_1.ModuleController();
var Router = express_1.default.Router;
var moduleRouter = Router();
var User = new User_1.UserController();
moduleRouter.get('/module', module.list);
moduleRouter.get('/module/edit/:id', module.load);
moduleRouter.get('/module/delete/:id', module.delete);
moduleRouter.post('/module/create', module.create);
exports.default = moduleRouter;
//# sourceMappingURL=moduleRouter.js.map