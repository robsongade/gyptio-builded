"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router;
var Auth_1 = __importDefault(require("../controllers/Auth"));
var Instances_1 = __importDefault(require("../controllers/Instances"));
var routerAuth = Router();
routerAuth.post('/instances', Auth_1.default.verify, Instances_1.default.list);
routerAuth.post('/instances/create', Auth_1.default.authorize, Instances_1.default.create);
routerAuth.get('/instances', Auth_1.default.authorize, Instances_1.default.list);
routerAuth.get('/instances/all', Auth_1.default.authorize, Instances_1.default.all);
routerAuth.get('/instance/all_instances', Auth_1.default.permission, Auth_1.default.authorize, Instances_1.default.all_instances);
routerAuth.get('/instances/:instance_id', Auth_1.default.authorize, Instances_1.default.instance);
routerAuth.post('/instances/edit/:instance_id', Auth_1.default.authorize, Instances_1.default.edit);
routerAuth.get('/instances/pin/:instance_id', Auth_1.default.authorize, Instances_1.default.pin);
routerAuth.get('/instances/pin/cancel/:user_id_instance', Auth_1.default.authorize, Instances_1.default.cancel);
routerAuth.get('/instances/pin/delete/:user_id', Auth_1.default.authorize, Instances_1.default.pin_delete_on_have_permission);
routerAuth.post('/instances/check-txt', Auth_1.default.authorize, Instances_1.default.check_text);
exports.default = routerAuth;
//# sourceMappingURL=authInstances.js.map