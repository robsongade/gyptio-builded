"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router;
var routerAuth = Router();
//routerAuth.get('/permission',auth.authorize,permission.just_pass)
exports.default = routerAuth;
//# sourceMappingURL=permissionRouter.js.map