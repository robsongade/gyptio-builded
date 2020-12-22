"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router;
var Permission_1 = __importDefault(require("../controllers/Permission"));
var Auth_1 = __importDefault(require("../controllers/Auth"));
var routerAuth = Router();
routerAuth.get('/permission', Auth_1.default.permission, Auth_1.default.authorize, Permission_1.default.group);
routerAuth.get('/permission/:group_id', Auth_1.default.permission, Auth_1.default.authorize, Permission_1.default.group);
routerAuth.post('/permission/group_edit/:group_id', Auth_1.default.authorize, Permission_1.default.group_edit);
routerAuth.post('/permission/group_add/', Auth_1.default.permission, Auth_1.default.authorize, Permission_1.default.group_add);
routerAuth.post('/permission', Auth_1.default.authorize, Permission_1.default.group);
routerAuth.post('/permission/delete_group', Auth_1.default.permission, Auth_1.default.authorize, Permission_1.default.delete_group);
exports.default = routerAuth;
